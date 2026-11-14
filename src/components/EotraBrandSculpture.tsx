import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function EotraBrandSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.from('.sculpture-core', {
        scale: 0.85,
        opacity: 0,
        y: -30,
        duration: 1.4,
        ease: 'power3.out',
      });

      // Infinite Continuous Kinetic Rotation ("Keep scrolling")
      gsap.to('.sculpture-infinite-spin', {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });

      // Scroll-driven 3D depth and progression
      if (containerRef.current) {
        gsap.to('.sculpture-scroll-layer', {
          y: 60,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 5%',
            scrub: 1.2,
          },
        });

        // 3 Dots dynamic parallax on scroll
        gsap.to('.eotra-dot-1', {
          y: -30,
          x: 15,
          scale: 1.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 5%',
            scrub: 1,
          },
        });

        gsap.to('.eotra-dot-2', {
          y: 25,
          x: -20,
          scale: 1.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 5%',
            scrub: 1.4,
          },
        });

        gsap.to('.eotra-dot-3', {
          y: 40,
          x: 25,
          scale: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 5%',
            scrub: 1.6,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] aspect-square mx-auto lg:mr-0 flex items-center justify-center select-none"
    >
      {/* Main Solid Stage (Fixed, Stands Solid Without Cursor Movement) */}
      <div className="sculpture-core relative w-full h-full flex items-center justify-center">
        {/* Scroll Interaction Layer */}
        <div className="sculpture-scroll-layer relative w-full h-full flex items-center justify-center">
          {/* Infinite Smooth Continuous Rotator */}
          <div className="sculpture-infinite-spin relative w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[490px] lg:h-[490px]">
            {/* Clean SVG 3D-Segmented Torus in Pure Eotra Brand Blue */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Clean Pure Eotra Brand Blue Gradients */}
                <linearGradient id="eotraPureBlue1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="22%" stopColor="#8090ff" />
                  <stop offset="50%" stopColor="#0400F5" />
                  <stop offset="85%" stopColor="#01007a" />
                  <stop offset="100%" stopColor="#0400F5" />
                </linearGradient>

                <linearGradient id="eotraPureBlue2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="25%" stopColor="#6677ff" />
                  <stop offset="55%" stopColor="#0400F5" />
                  <stop offset="85%" stopColor="#000066" />
                  <stop offset="100%" stopColor="#0400F5" />
                </linearGradient>

                <linearGradient id="eotraPureBlue3" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#01007a" />
                  <stop offset="40%" stopColor="#0400F5" />
                  <stop offset="70%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0400F5" />
                </linearGradient>
              </defs>

              {/* SEGMENT 1: Primary Upper Arc */}
              <path
                d="M 150 95 A 175 175 0 0 1 405 160"
                fill="none"
                stroke="url(#eotraPureBlue1)"
                strokeWidth="42"
                strokeLinecap="round"
              />
              {/* Crisp Chrome White Highlight Line */}
              <path
                d="M 158 98 A 175 175 0 0 1 398 162"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.92"
              />

              {/* SEGMENT 2: Right/Bottom Arc */}
              <path
                d="M 425 220 A 175 175 0 0 1 305 420"
                fill="none"
                stroke="url(#eotraPureBlue2)"
                strokeWidth="42"
                strokeLinecap="round"
              />
              {/* Crisp Chrome White Highlight Line */}
              <path
                d="M 420 228 A 175 175 0 0 1 308 412"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.88"
              />

              {/* SEGMENT 3: Left Arc completing the Eotra "O" */}
              <path
                d="M 245 425 A 175 175 0 0 1 90 205"
                fill="none"
                stroke="url(#eotraPureBlue3)"
                strokeWidth="42"
                strokeLinecap="round"
              />
              {/* Crisp Chrome White Highlight Line */}
              <path
                d="M 238 420 A 175 175 0 0 1 96 212"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.88"
              />
            </svg>

            {/* ========================================================= */}
            {/* EOTRA 3 BRAND DOTS: Clean Pure Cobalt Blue (#0400F5) Spheres */}
            {/* ========================================================= */}

            {/* DOT 1: Smallest Dot (Pure Cobalt Blue Glass Orb) */}
            <div
              className="eotra-dot-1 absolute top-[35px] left-[130px] w-8 h-8 sm:w-10 sm:h-10 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #ffffff 0%, #6677ff 25%, #0400F5 68%, #000066 100%)',
              }}
            />

            {/* DOT 2: Medium Dot (Pure Cobalt Royal Orb) */}
            <div
              className="eotra-dot-2 absolute top-[85px] right-[45px] w-12 h-12 sm:w-14 sm:h-14 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, #ffffff 0%, #8090ff 22%, #0400F5 65%, #000066 100%)',
              }}
            />

            {/* DOT 3: Largest Signature Dot (Signature Pure Cobalt Orb) */}
            <div
              className="eotra-dot-3 absolute bottom-[40px] left-[85px] w-16 h-16 sm:w-20 sm:h-20 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 30% 25%, #ffffff 0%, #8090ff 20%, #0400F5 60%, #01007a 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
