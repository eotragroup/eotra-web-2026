import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/**
 * The entrance used on the Team page, for every other page:
 * the hero blocks rise one after another, the title words fade in, and cards/headings appear as you scroll to them.
 * Call it once in a page component (pass something that changes when the page content changes, e.g. a slug).
 */
export function usePageAnimations(key: string = '') {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.getElementById('root');
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>('section'));
    const hero = sections[1];

    const ctx = gsap.context(() => {
      if (hero) {
        const container = hero.querySelector<HTMLElement>(':scope > div');
        const blocks = container ? Array.from(container.children) : [];
        if (blocks.length) gsap.from(blocks, { y: 35, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' });
        const words = hero.querySelectorAll('.page-title-word');
        if (words.length)
          gsap.fromTo(
            words,
            { opacity: 0, y: 18, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.14, ease: 'power3.out', delay: 0.2, clearProps: 'filter' },
          );
      }

      // Headings and cards further down: reveal when they scroll into view
      const all = sections
        .slice(2)
        .flatMap((s) => Array.from(s.querySelectorAll<HTMLElement>('h2, article, [class*="rounded-3xl"], [class*="rounded-[32px]"]')));
      const targets = all.filter((el) => !all.some((o) => o !== el && o.contains(el)));
      if (targets.length) {
        gsap.set(targets, { opacity: 0, y: 36 });
        ScrollTrigger.batch(targets, {
          start: 'top 92%',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity' }),
        });
      }
    });

    return () => ctx.revert();
  }, [key]);
}
