import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  start?: string;
  end?: string;
}

export function ScrollRevealText({
  text,
  className = '',
  as: Component = 'div',
  start = 'top 78%',
  end = 'bottom 40%',
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>('.reveal-word');
    if (!words || words.length === 0) return;

    const tween = gsap.fromTo(
      words,
      {
        color: '#d1d5db',
        opacity: 0.22,
      },
      {
        color: '#111827',
        opacity: 1,
        stagger: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.8,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, start, end]);

  const words = text.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={`font-medium tracking-[-0.025em] leading-[1.12] ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="reveal-word inline-block mr-[0.26em] text-[#d1d5db] opacity-25 select-none transition-none"
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
