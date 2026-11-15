// Cloudflare Worker: blog view counter, sitemap.xml and robots.txt. Everything else is served straight from the static assets.
//   GET  /api/views         -> { "<slug>": <count>, ... }
//   POST /api/views/<slug>  -> { "views": <new count> }   (adds one view)
import { POSTS } from '../src/data/posts';
import { PRODUCTS } from '../src/data/products';

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}
interface Env {
  VIEWS?: KV;
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
    { path: '/references' },
    { path: '/company' },
    { path: '/solutions' },
    { path: '/blog' },
    ...PRODUCTS.map((p) => ({ path: `/products/${p.id}` })),
    ...SERVICE_SLUGS.map((s) => ({ path: `/services/${s}` })),
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map((u) => `  <url><loc>${origin}${u.path}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
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
    return env.ASSETS.fetch(request);
  },
};
