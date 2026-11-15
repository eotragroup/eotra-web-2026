// Cloudflare Worker: blog view counter, sitemap.xml and robots.txt. Everything else is served straight from the static assets.
//   GET  /api/views         -> { "<slug>": <count>, ... }
//   POST /api/views/<slug>  -> { "views": <new count> }   (adds one view)
import { POSTS } from '../src/data/posts';
import { PRODUCTS } from '../src/data/products';
import { SERVICE_DATA } from '../src/data/serviceData';
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

const SERVICE_LABELS = ['Retail platform', 'Web app', 'Mobile app', 'UI / UX design', 'E-commerce', 'Backend & APIs', 'Cloud & DevOps', 'Internal tools', 'QA & dedicated team', 'Not sure yet'];

// Everything the assistant knows about Eotra. Built from the same data files as the website, so it stays up to date.
function knowledgeBase(): string {
  const services = SERVICE_DATA.map(
    (sv) => `- ${sv.title}: ${sv.tagline} ${sv.intro} Includes: ${sv.offers.map((o) => `${o.title} (${o.text})`).join('; ')}. Typical tools: ${sv.tech.join(', ')}.`,
  ).join('\n');
  const refs = PRODUCTS.map((pr) => `- ${pr.title} (${pr.domainLabel}): ${pr.tagline} Built: ${pr.deliverables.join(', ')}.`).join('\n');
  const posts = POSTS.map((po) => `- ${po.title}`).join('\n');
  return `ABOUT EOTRA
Eotra is a small, founder-led technology company based in Istanbul, Türkiye, with 7+ years of experience. Founders: Saed I. S. Ayyad, Wail Al Wesabi, Mansor Aljabali and Ahmed Masallate (all Co-Founder & Developer). The team replaces five disconnected retail systems with one unified platform and also builds web and mobile products for brands. It works with clients in several countries and its platforms support English, Arabic and Turkish and local payment methods.

THE UNIFIED RETAIL PLATFORM ("Every app your retail runs on. One core.")
- POS and order management: offline-first checkout (stores keep selling when the internet drops and everything syncs when it returns), online, in-store and phone orders in one place, returns, exchanges, split payments, cashier roles and shift reports.
- Inventory and global WMS: one real-time stock number across warehouses, stores and hubs; transfers, receiving, stock counts, barcode scanning, low-stock alerts and reorder rules.
- CRM, loyalty and analytics: customer profiles from every channel, points, tiers and campaigns, sales and stock dashboards, ERP and accounting integrations.
- Editions: Standard (single-brand boutiques and a first set of stores), Professional (growing chains that need warehouse and CRM together), Enterprise (50+ stores and global networks with custom integrations).
- It can start by connecting the systems a business already has, then replace old ones step by step.

SERVICES (all are custom, scoped per project)
${services}

HOW A PROJECT WORKS
1) Discover: learn the business, users and goals and agree the scope. 2) Design: clear flows and a clickable prototype before building. 3) Build: weekly demos and clean tested code the client owns. 4) Launch and support: ship, monitor and keep improving; dedicated teams on a retainer are available.
Pricing: every project is scoped on its own, there is no fixed price list. The team replies to a request with a price and a clear timeline within one business day.

CLIENT REFERENCES
${refs}

BLOG ARTICLES
${posts}

CONTACT
Quote form: the Connect page (/connect). Email: info@eotra.com. Replies within one business day. Careers: /careers (open applications, no fixed openings).`;
}

const SYSTEM_PROMPT = `You are the Eotra website assistant. You talk with website visitors, understand what they need, and then guide them to the Connect page (the quote form) where the team takes over.

${knowledgeBase()}

HOW TO TALK
- Be warm, short and clear: 2-4 short sentences. Same language as the visitor (Arabic, English or Turkish).
- Be consultative. Learn the visitor's needs by asking ONE short question at a time, such as: what kind of business they run, what they want to build or fix, how big it is (stores, users), and roughly when they want to start. Do not ask more than one question per message and never interrogate.
- Explain how Eotra can help using only the facts above. Mention a relevant reference or service when it fits.
- Never invent prices, timelines, discounts, clients, features or promises. For price questions say every project is scoped individually and the team replies within one business day.
- Stay on topic (Eotra, its services and software for retail and commerce). Politely decline anything else. If you do not know something, say so and offer the Connect page or info@eotra.com.

HANDOFF TO THE CONNECT PAGE
When you understand what the visitor needs (at least what they want and, if they said it, their type of business), or when they ask for a quote, a demo, a price or to talk to a person, finish your message with one short sentence inviting them to continue to the quote form, and add this marker as the very last line:
[[CONNECT|<service>|<one-line English summary of the visitor's need>]]
<service> must be exactly one of: ${SERVICE_LABELS.join(', ')}. Pick the closest one (use "Not sure yet" if unclear). The summary is for the Eotra team: plain English, one line, max 200 characters, no personal data.
Do not add the marker in your first reply unless the visitor already asked for a quote or contact. Add it at most once.`;

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
      max_tokens: 380,
      temperature: 0.4,
    });
    const raw = (out?.response ?? '').trim();
    if (!raw) return json({ error: 'empty' }, 502);
    // The assistant ends with [[CONNECT|service|summary]] when it is time to hand the visitor to the quote form
    const m = raw.match(/\[\[\s*CONNECT\s*\|([^|\]]*)\|([^\]]*)\]\]/i);
    const reply = raw.replace(/\[\[[\s\S]*?\]\]/g, '').trim();
    const picked = m ? SERVICE_LABELS.find((l) => l.toLowerCase() === m[1].trim().toLowerCase()) ?? 'Not sure yet' : null;
    return json({ reply: reply || raw, handoff: m ? { service: picked, summary: m[2].trim().slice(0, 240) } : null });
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
