import { AR } from './ar';
import type { Lang } from './lang';

/** Translate outside React components (data, meta tags, the Worker) */
export const translate = (lang: Lang, en: string): string => (lang === 'ar' ? AR[en] ?? en : en);
