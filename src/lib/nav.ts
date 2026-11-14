// Client-side navigation to the FAQ page (App listens for popstate)
export function goToFaq() {
  if (window.location.pathname !== '/faq') {
    window.history.pushState({}, '', '/faq');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}
