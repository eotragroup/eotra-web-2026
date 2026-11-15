import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

// Soft, eased wheel/trackpad scrolling for the whole site. Touch devices keep their native scrolling.
// Lenis is driven by GSAP's ticker so ScrollTrigger animations stay perfectly in sync.
export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const instance = new Lenis({
    // lerp mode reacts straight away and eases out, so scrolling keeps up with the hand
    lerp: 0.16,
    smoothWheel: true,
    wheelMultiplier: 1.1,
  });
  lenis = instance;

  instance.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Pause smooth scrolling while something locks page scroll (for example the mobile menu)
  const syncLock = () => {
    if (document.body.style.overflow === 'hidden') instance.stop();
    else instance.start();
  };
  const observer = new MutationObserver(syncLock);
  observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

  return () => {
    observer.disconnect();
    gsap.ticker.remove(tick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

// Smooth-scroll to the top or to an element; falls back to the browser when Lenis is off.
export function smoothScrollTo(target: number | HTMLElement, opts: { immediate?: boolean } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate: opts.immediate });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: opts.immediate ? 'auto' : 'smooth' });
  }
}
