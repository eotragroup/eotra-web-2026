import { smoothScrollTo } from './smoothScroll';
import { withLang } from '../i18n/lang';

// Client-side navigation helpers (App listens for popstate and updates its page state)
export function navigateTo(path: string) {
  const full = withLang(path);
  if (window.location.pathname !== full) {
    window.history.pushState({}, '', full);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  smoothScrollTo(0, { immediate: true });
}

export const goToFaq = () => navigateTo('/faq');
// Optional subject pre-selects the matching service on the form (read back from ?s=)
export const goToConnect = (subject?: string, notes?: string) => {
  const parts = [subject ? `s=${encodeURIComponent(subject)}` : '', notes ? `n=${encodeURIComponent(notes)}` : ''].filter(Boolean);
  const q = parts.length ? `?${parts.join('&')}` : '';
  window.history.pushState({}, '', withLang(`/connect${q}`));
  window.dispatchEvent(new PopStateEvent('popstate'));
  smoothScrollTo(0, { immediate: true });
};
export const goToBlog = () => navigateTo('/blog');
export const goToPost = (slug: string) => navigateTo(`/blog/${slug}`);
export const goToService = (slug: string) => navigateTo(`/services/${slug}`);
export const goToCompany = () => navigateTo('/company');
export const goToSolutions = () => navigateTo('/solutions');
export const goToReferences = () => navigateTo('/references');
export const goToLegal = (kind: 'privacy' | 'terms' | 'security') => navigateTo(`/${kind}`);
export const goToCareers = () => navigateTo('/careers');
