// Language helpers that need no React. Arabic pages live under /ar (for example /ar/faq).
export type Lang = 'en' | 'ar';

export const langFromPath = (pathname: string): Lang => (/^\/ar(\/|$)/.test(pathname) ? 'ar' : 'en');
export const getLang = (): Lang => langFromPath(window.location.pathname);

/** '/ar/faq' -> '/faq', '/ar' -> '/' */
export const stripLang = (pathname: string): string => pathname.replace(/^\/ar(?=\/|$)/, '') || '/';

/** The address without the language prefix, for routing */
export const appPath = (): string => stripLang(window.location.pathname);

/** '/faq' -> '/ar/faq' when the language is Arabic. Works with '/#section' and '/connect?s=x' too. */
export const withLang = (path: string, lang: Lang = getLang()): string => {
  if (lang === 'en') return path;
  if (path === '/') return '/ar';
  return `/ar${path.startsWith('/') ? path : `/${path}`}`;
};
