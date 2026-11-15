// Cloudflare Worker: blog view counter, sitemap.xml and robots.txt. Everything else is served straight from the static assets.
//   GET  /api/views         -> { "<slug>": <count>, ... }
//   POST /api/views/<slug>  -> { "views": <new count> }   (adds one view)
import { POSTS } from '../src/data/posts';
import { PRODUCTS } from '../src/data/products';
import { metaForPath } from '../src/data/pageMeta';
import { langFromPath, stripLang } from '../src/i18n/lang';

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}
interface Env {
  VIEWS?: KV;
  /** Cloudflare Workers AI (no API key needed) */
  AI?: { run(model: string, input: unknown): Promise<{ response?: string }> };
  ASSETS: { fetch(request: Request): Promise<Response> };
}

// Keep in sync with src/data/services.ts (not imported here: that file pulls in images)
const SERVICE_SLUGS = ['web-apps', 'mobile-development', 'ui-ux-design', 'e-commerce', 'backend-apis', 'cloud-devops', 'internal-tools-erp', 'qa-dedicated-teams'];

const KNOWN = new Set(POSTS.map((p) => p.slug));

// sitemap.xml and robots.txt are generated from the address they are requested on, so they are always correct
function sitemap(origin: string): Response {
  const urls: { path: string; lastmod?: string }[] = [
    { path: '/' },
    { path: '/team' },
    { path: '/faq' },
    { path: '/connect' },
    { path: '/careers' },
    { path: '/references' },
    { path: '/company' },
    { path: '/privacy' },
    { path: '/terms' },
    { path: '/security' },
    { path: '/solutions' },
    { path: '/blog' },
    ...PRODUCTS.map((p) => ({ path: `/products/${p.id}` })),
    ...SERVICE_SLUGS.map((s) => ({ path: `/services/${s}` })),
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
  ];
  const all = urls.flatMap((u) => [u, { ...u, path: `/ar${u.path === '/' ? '' : u.path}` }]);
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    all
      .map((u) => `  <url><loc>${origin}${u.path}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
// Fills the tags crawlers and link-preview bots read (they do not run JavaScript), per page, with absolute addresses.
function withPageMeta(res: Response, url: URL): Response {
  const lang = langFromPath(url.pathname);
  const bare = stripLang(url.pathname);
  const meta = metaForPath(bare, lang);
  const title = meta.title.includes('Eotra') || meta.title.includes('إوترا') ? meta.title : `${meta.title} — Eotra`;
  const enUrl = `${url.origin}${bare === '/' ? '/' : bare}`;
  const arUrl = `${url.origin}/ar${bare === '/' ? '' : bare}`;
  const pageUrl = `${url.origin}${url.pathname}`;
  const image = `${url.origin}/og.png`;
  const content = (value: string) => ({
    element(e: { setAttribute(n: string, v: string): void }) {
      e.setAttribute('content', value);
    },
  });
  const rewritten = new HTMLRewriter()
    .on('title', { element(e) { e.setInnerContent(title); } })
    .on('meta[name="description"]', content(meta.description))
    .on('meta[property="og:title"]', content(title))
    .on('meta[property="og:description"]', content(meta.description))
    .on('meta[property="og:url"]', content(pageUrl))
    .on('meta[property="og:image"]', content(image))
    .on('meta[name="twitter:title"]', content(title))
    .on('meta[name="twitter:description"]', content(meta.description))
    .on('meta[name="twitter:image"]', content(image))
    .on('meta[name="robots"]', content(meta.noindex ? 'noindex' : 'index, follow'))
    .on('link[rel="canonical"]', { element(e) { e.setAttribute('href', pageUrl); } })
    .on('html', {
      element(e) {
        e.setAttribute('lang', lang);
        e.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      },
    })
    .on('head', {
      element(e) {
        if (meta.noindex) return;
        e.append(
          `<link rel="alternate" hreflang="en" href="${enUrl}" /><link rel="alternate" hreflang="ar" href="${arUrl}" /><link rel="alternate" hreflang="x-default" href="${enUrl}" /><meta property="og:locale" content="${lang === 'ar' ? 'ar_AR' : 'en_US'}" />`,
          { html: true },
        );
      },
    })
    .transform(res);
  // A wrong address gets a real 404 status (the page itself still shows the friendly "Page not found" screen)
  return new Response(rewritten.body, { status: meta.noindex ? 404 : res.status, headers: res.headers });
}

// ---- AI assistant for the floating contact button ----
const CHAT_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const CHAT_DAILY_LIMIT = 60; // messages per visitor per day (keeps the cost under control)

const SYSTEM_PROMPT = `You are the Eotra website assistant. Eotra is a small, founder-led technology company based in Istanbul, Türkiye.
What Eotra does: it builds a unified retail platform (POS and order management, inventory and warehouse management WMS, ERP, CRM, loyalty and analytics) and builds software for clients.
Services: custom web apps; mobile development (iOS and Android); UI/UX and product design; e-commerce builds; backend and APIs; cloud and DevOps; internal tools and ERP; QA and dedicated teams.
Client references: Jamjoom Pharmacy Group, EOTRA Menu (QR digital menus), NEOSHE (skincare e-commerce), IBOSH STORE (luxury bags), Lidya&Co, TradesPilot AI.
Contact: info@eotra.com, or the contact form at /connect, or WhatsApp from the contact button. Replies come within one business day.
Rules:
- Answer briefly (2-4 short sentences), friendly and clear. Use the same language as the user (Arabic, English or Turkish).
- Only state facts listed above. Never invent prices, timelines, clients, team members or promises. If asked about price, say every project is scoped on its own and offer the quote form at /connect.
- If you do not know something, or the user wants a person, point them to WhatsApp or email info@eotra.com.
- Stay on the topic of Eotra, its services and software for retail and commerce. Politely decline anything else.`;

async function chat(request: Request, env: Env): Promise<Response> {
  if (!env.AI) return json({ error: 'assistant not configured' }, 503);
  let body: { messages?: { role?: string; content?: string }[]; lang?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }
  const history = (body.messages ?? [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-10)
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: String(m.content).slice(0, 500) }));
  if (!history.length || history[history.length - 1].role !== 'user') return json({ error: 'bad request' }, 400);

  // simple per-visitor daily limit
  if (env.VIEWS) {
    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
    const key = `chat:${ip}:${new Date().toISOString().slice(0, 10)}`;
    const used = Number((await env.VIEWS.get(key)) ?? 0);
    if (used >= CHAT_DAILY_LIMIT) return json({ error: 'limit' }, 429);
    await env.VIEWS.put(key, String(used + 1));
  }

  try {
    const lang = body.lang === 'ar' ? 'The visitor is browsing the Arabic site, so answer in Arabic unless they write in another language.' : '';
    const out = await env.AI.run(CHAT_MODEL, {
      messages: [{ role: 'system', content: `${SYSTEM_PROMPT}\n${lang}` }, ...history],
      max_tokens: 320,
      temperature: 0.4,
    });
    const reply = (out?.response ?? '').trim();
    if (!reply) return json({ error: 'empty' }, 502);
    return json({ reply });
  } catch {
    return json({ error: 'assistant unavailable' }, 502);
  }
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/sitemap.xml') return sitemap(url.origin);
    if (url.pathname === '/robots.txt') {
      return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`, {
        headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
      });
    }

    if (url.pathname === '/api/chat' && request.method === 'POST') return chat(request, env);

    if (url.pathname === '/api/views' && request.method === 'GET') {
      if (!env.VIEWS) return json({ error: 'views storage not configured' }, 503);
      const entries = await Promise.all(
        [...KNOWN].map(async (slug) => [slug, Number((await env.VIEWS!.get(`views:${slug}`)) ?? 0)] as const)
      );
      return json(Object.fromEntries(entries));
    }

    const m = url.pathname.match(/^\/api\/views\/([a-z0-9-]{1,80})$/);
    if (m && request.method === 'POST') {
      const slug = m[1];
      if (!KNOWN.has(slug)) return json({ error: 'unknown post' }, 404);
      if (!env.VIEWS) return json({ error: 'views storage not configured' }, 503);
      const next = Number((await env.VIEWS.get(`views:${slug}`)) ?? 0) + 1;
      await env.VIEWS.put(`views:${slug}`, String(next));
      return json({ views: next });
    }

    if (url.pathname.startsWith('/api/')) return json({ error: 'not found' }, 404);

    const res = await env.ASSETS.fetch(request);
    const isPage = request.method === 'GET' && !/\.[a-z0-9]+$/i.test(url.pathname);
    if (!isPage || !(res.headers.get('content-type') ?? '').includes('text/html')) return res;
    return withPageMeta(res, url);
  },
};
