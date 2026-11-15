// Title + description for every address. Used by the website (to keep the tab title in step) and by the
// Cloudflare Worker (so WhatsApp, LinkedIn, X and Google see the right text for each page).
import { POSTS } from './posts';
import { PRODUCTS } from './products';
import { SERVICE_DATA } from './serviceData';

export interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

export const HOME_META: PageMeta = {
  title: 'Eotra — Enterprise Operations & Transaction',
  description: 'Powering modern retail, from source to sale. A single unified system linking POS, WMS, ERP, and CRM.',
};

const STATIC: Record<string, PageMeta> = {
  '/team': { title: 'The Founder Team', description: 'Meet the founding engineers behind Eotra.' },
  '/faq': { title: 'FAQ', description: 'Answers about what Eotra builds, how projects start, pricing, timelines and support.' },
  '/connect': { title: 'Connect', description: 'Tell us about your project. We reply within one business day.' },
  '/blog': { title: 'Blog', description: 'Notes from the Eotra team on retail software, POS, inventory and building products.' },
  '/company': {
    title: 'Our Company',
    description: 'Eotra is a technology company from Istanbul building POS, warehouse, ERP and CRM systems, plus web and mobile products for modern retail.',
  },
  '/solutions': {
    title: 'Our Solutions',
    description: 'POS, inventory and warehouse, CRM and loyalty: every app your retail runs on, in one connected core.',
  },
  '/references': {
    title: 'References',
    description: 'Brands that run on what Eotra builds: Jamjoom Pharmacy, EOTRA Menu, NEOSHE, IBOSH, Lidya and TradesPilot AI.',
  },
  '/privacy': { title: 'Privacy Policy', description: 'How Eotra collects, uses and protects personal data submitted through this website.' },
  '/terms': { title: 'Terms of Service', description: 'The terms that apply when you use the Eotra website.' },
  '/security': {
    title: 'Security',
    description: 'How Eotra protects its website and the information you share with us, and how to report a vulnerability.',
  },
};

export const trim = (s: string, n = 158) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

export function metaForPath(rawPath: string): PageMeta {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  if (path === '/') return HOME_META;
  if (STATIC[path]) return STATIC[path];

  let m = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (m) {
    const s = SERVICE_DATA.find((x) => x.slug === m![1]);
    if (s) return { title: s.title, description: trim(`${s.tagline} ${s.intro}`) };
  }
  m = path.match(/^\/products\/([^/]+)$/);
  if (m) {
    const id = decodeURIComponent(m[1]);
    const p = PRODUCTS.find((x) => x.id === id);
    if (p) return { title: p.title, description: trim(p.tagline || p.description) };
  }
  m = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) {
    const post = POSTS.find((x) => x.slug === m![1]);
    if (post) return { title: post.title, description: trim(post.excerpt) };
  }
  return { title: 'Page not found', description: HOME_META.description, noindex: true };
}
