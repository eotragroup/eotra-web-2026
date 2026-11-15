import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getLang, withLang, appPath, type Lang } from './lang';
import { translate } from './translate';

export { translate };

interface I18n {
  lang: Lang;
  isRtl: boolean;
  /** Returns the Arabic text for an English string (and the English text itself if there is none yet) */
  t: (en: string) => string;
  /** Opens the same page in the other language */
  switchLang: () => void;
}

const Ctx = createContext<I18n>({ lang: 'en', isRtl: false, t: (s) => s, switchLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getLang());

  useEffect(() => {
    const onPop = () => setLang(getLang());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = useCallback((en: string) => translate(lang, en), [lang]);

  const switchLang = useCallback(() => {
    const next: Lang = lang === 'ar' ? 'en' : 'ar';
    const { search, hash } = window.location;
    window.history.pushState({}, '', `${withLang(appPath(), next)}${search}${hash}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [lang]);

  const value = useMemo<I18n>(() => ({ lang, isRtl: lang === 'ar', t, switchLang }), [lang, t, switchLang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
