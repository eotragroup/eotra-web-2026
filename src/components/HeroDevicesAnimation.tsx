import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Activity, CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import dashboardImg from '../assets/images/agency_enterprise_dashboards_1794584485278.jpg';
import mobileImg from '../assets/images/agency_mobile_dev_1794584483437.jpg';

export function HeroDevicesAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fly-down animation from above into the hero section
      gsap.from('.hero-device-laptop', {
        y: -130,
        opacity: 0,
        scale: 0.94,
        duration: 1.15,
        ease: 'back.out(1.2)',
        delay: 0.15,
      });

      gsap.from('.hero-device-phone', {
        y: -180,
        opacity: 0,
        scale: 0.88,
        duration: 1.25,
        ease: 'back.out(1.4)',
        delay: 0.3,
      });

      gsap.from('.hero-device-badge-1', {
        y: -90,
        opacity: 0,
        scale: 0.85,
        duration: 0.95,
        ease: 'back.out(1.5)',
        delay: 0.45,
      });

      gsap.from('.hero-device-badge-2', {
        y: -80,
        opacity: 0,
        scale: 0.85,
        duration: 0.95,
        ease: 'back.out(1.5)',
        delay: 0.55,
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
        <div className="relative mx-auto w-[92%] sm:w-[94%] aspect-[16/10] bg-[#1a1c23] rounded-t-2xl sm:rounded-t-3xl p-2 sm:p-2.5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.22)] border border-neutral-700/60">
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

            {/* Embedded Mini Live Status Tag */}
            <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-medium tracking-tight">
                POS &amp; WMS Live Sync
              </span>
            </div>
          </div>
        </div>

        {/* Laptop Base / Hinge */}
        <div className="relative mx-auto w-full h-3 sm:h-4 bg-[#2b2d35] rounded-b-xl shadow-lg border-t border-neutral-600/50 flex items-center justify-center">
          <div className="w-16 sm:w-20 h-1 bg-neutral-700/80 rounded-full" />
        </div>

        {/* Shadow under laptop */}
        <div className="w-[85%] mx-auto h-3 bg-neutral-900/10 blur-md rounded-full mt-1" />
      </div>

      {/* SMARTPHONE CONTAINER (Overlapping in the foreground, floating with offset) */}
      <div className="hero-device-phone animate-float-medium absolute -bottom-6 sm:-bottom-8 right-2 sm:right-4 z-20 w-[140px] sm:w-[170px] aspect-[9/18.5] bg-[#121316] rounded-[28px] sm:rounded-[34px] p-2 sm:p-2.5 shadow-[0_28px_60px_-10px_rgba(0,0,0,0.35)] border-2 border-neutral-700/70 rotate-[3deg] hover:rotate-0 transition-transform duration-500">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Mini mobile floating toast alert */}
          <div className="absolute bottom-2 inset-x-1.5 bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-md border border-neutral-200">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#0400F5] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={10} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-neutral-900 truncate">
                  POS Order #4819
                </p>
                <p className="text-[8px] text-emerald-600 font-medium">
                  Approved · 0.2s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING MICRO-WIDGET 1: Top-Left Cloud Sync Card */}
      <div className="hero-device-badge-1 animate-float-badge absolute -top-4 sm:-top-6 left-0 sm:left-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12)] border border-neutral-200/80 flex items-center gap-3 select-none">
        <div className="w-9 h-9 rounded-xl bg-[#0400F5]/10 text-[#0400F5] flex items-center justify-center shrink-0">
          <Activity size={18} className="animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-[12px] sm:text-[13px] font-semibold text-neutral-900 leading-none">
              48 Stores Active
            </p>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Omni-Channel Sync Online
          </p>
        </div>
      </div>

      {/* FLOATING MICRO-WIDGET 2: Bottom-Left Offline Cache Badge */}
      <div className="hero-device-badge-2 animate-float-badge absolute -bottom-5 sm:-bottom-7 left-4 sm:left-8 z-30 bg-neutral-900 text-white rounded-2xl p-3 sm:p-3.5 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.25)] border border-neutral-800 flex items-center gap-3 select-none">
        <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
          <Zap size={16} />
        </div>
        <div>
          <p className="text-[12px] sm:text-[13px] font-semibold text-white leading-none">
            Offline-First POS
          </p>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-1">
            Zero-downtime local cache
          </p>
        </div>
      </div>
    </div>
  );
}
