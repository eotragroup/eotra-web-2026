import { smoothScrollTo } from './smoothScroll';

// Client-side navigation helpers (App listens for popstate and updates its page state)
export function navigateTo(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  smoothScrollTo(0, { immediate: true });
}

export const goToFaq = () => navigateTo('/faq');
export const goToBlog = () => navigateTo('/blog');
export const goToPost = (slug: string) => navigateTo(`/blog/${slug}`);
