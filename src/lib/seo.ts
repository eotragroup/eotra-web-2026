// Keeps <title>, description, canonical and share tags in step with the page being shown.
const SITE = 'Eotra';
import { HOME_META, type PageMeta } from '../data/pageMeta';

export type { PageMeta };
export const DEFAULT_DESC = HOME_META.description;

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: 'name' | 'property', name: string) => () => {
  const m = document.createElement('meta');
  m.setAttribute(key, name);
  return m;
};

export function applyMeta({ title, description = DEFAULT_DESC, noindex }: Partial<PageMeta> & { title: string }) {
  const url = `${window.location.origin}${window.location.pathname}`;
  const image = `${window.location.origin}/og.png`;
  const full = title === SITE ? title : title.includes(SITE) ? title : `${title} — ${SITE}`;
  document.title = full;
  setTag('meta[name="description"]', meta('name', 'description'), 'content', description);
  setTag('meta[property="og:title"]', meta('property', 'og:title'), 'content', full);
  setTag('meta[property="og:description"]', meta('property', 'og:description'), 'content', description);
  setTag('meta[property="og:url"]', meta('property', 'og:url'), 'content', url);
  setTag('meta[property="og:image"]', meta('property', 'og:image'), 'content', image);
  setTag('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', full);
  setTag('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', description);
  setTag('meta[name="twitter:image"]', meta('name', 'twitter:image'), 'content', image);
  setTag(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    },
    'href',
    url,
  );
  setTag('meta[name="robots"]', meta('name', 'robots'), 'content', noindex ? 'noindex' : 'index, follow');
}

