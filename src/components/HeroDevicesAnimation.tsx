import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dashboardImg from '../assets/images/agency_enterprise_dashboards_1794584485278.jpg';
import mobileImg from '../assets/images/agency_mobile_dev_1794584483437.jpg';

export function HeroDevicesAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean fly-down animation from above into the hero section
      gsap.from('.hero-device-laptop', {
        y: -140,
        opacity: 0,
        scale: 0.93,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.15,
      });

      gsap.from('.hero-device-phone', {
        y: -190,
        opacity: 0,
        scale: 0.88,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px] lg:max-w-[620px] mx-auto lg:mr-0 pt-4 lg:pt-0"
    >
      {/* LAPTOP CONTAINER (Floats smoothly) */}
      <div className="hero-device-laptop animate-float-slow relative z-10 w-full">
        {/* Laptop Body */}
        <div className="relative mx-auto w-[92%] sm:w-[94%] aspect-[16/10] bg-[#1a1c23] rounded-t-2xl sm:rounded-t-3xl p-2 sm:p-2.5 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.25)] border border-neutral-700/60">
          {/* Camera Notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/80 animate-ping" />
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <img
              src={dashboardImg}
              alt="Eotra Enterprise Dashboard"
              className="w-full h-full object-cover object-top"
            />
            {/* Gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </div>
        </div>

        {/* Laptop Base / Hinge */}
        <div className="relative mx-auto w-full h-3 sm:h-4 bg-[#2b2d35] rounded-b-xl shadow-lg border-t border-neutral-600/50 flex items-center justify-center">
          <div className="w-16 sm:w-20 h-1 bg-neutral-700/80 rounded-full" />
        </div>

        {/* Shadow under laptop */}
        <div className="w-[85%] mx-auto h-4 bg-neutral-900/15 blur-lg rounded-full mt-1" />
      </div>

      {/* SMARTPHONE CONTAINER (Overlapping in the foreground, floating with offset) */}
      <div className="hero-device-phone animate-float-medium absolute -bottom-6 sm:-bottom-8 right-2 sm:right-6 z-20 w-[140px] sm:w-[170px] aspect-[9/18.5] bg-[#121316] rounded-[28px] sm:rounded-[34px] p-2 sm:p-2.5 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.38)] border-2 border-neutral-700/70 rotate-[3deg] hover:rotate-0 transition-transform duration-500">
        {/* Dynamic Island Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2.5 bg-black rounded-full z-20 flex items-center justify-end pr-1.5">
          <div className="w-1 h-1 rounded-full bg-blue-500/80" />
        </div>

        {/* Phone Screen */}
        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-neutral-900 border border-neutral-800">
          <img
            src={mobileImg}
            alt="Eotra Mobile Retail App"
            className="w-full h-full object-cover"
          />
          {/* Subtle phone screen gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
