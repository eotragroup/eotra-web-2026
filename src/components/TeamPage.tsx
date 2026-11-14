import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { TypewriterText } from './TypewriterText';
import { ScrollRevealText } from './ScrollRevealText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Founder {
  name: string;
  role: string;
  initials: string;
  image: string;
  imageClass: string;
}

const FOUNDERS: Founder[] = [
  {
    name: 'Saed I. S. Ayyad',
    role: 'Co-Founder & Developer',
    initials: 'SA',
    image: '/team-1.jpg',
    imageClass: 'object-cover object-top',
  },
  {
    name: 'Wail Al Wesabi',
    role: 'Co-Founder & Developer',
    initials: 'WW',
    image: '/team-2.jpg',
    imageClass: 'object-cover object-top',
  },
  {
    name: 'Mansor Aljabali',
    role: 'Co-Founder & Developer',
    initials: 'MA',
    image: '/team-3.jpg',
    imageClass: 'object-cover',
  },
  {
    name: 'Ahmed Masallate',
    role: 'Co-Founder & Developer',
    initials: 'AM',
    image: '/team-4.jpg',
    imageClass: 'object-cover mix-blend-multiply',
  },
];

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '12+', label: 'Products Built' },
  { value: '30+', label: 'Clients & Partners' },
  { value: '99.9%', label: 'Uptime Reliability' },
];

interface FounderAvatarProps {
  src: string;
  name: string;
  initials: string;
  imageClass: string;
}

function FounderAvatar({ src, name, initials, imageClass }: FounderAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`w-full h-full ${imageClass}`}
    />
  );
}

interface TeamPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
}

export function TeamPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam }: TeamPageProps) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.team-anim-header', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Founder cards stagger animation
      gsap.from('.founder-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      });

      // Metrics strip reveal
      gsap.from('.team-metrics-anim', {
        scrollTrigger: {
          trigger: '.team-metrics-anim',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Navbar */}
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      {/* Team Section */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

          {/* Badge Row */}
          <div className="team-anim-header flex items-center gap-3 mb-6 sm:mb-8">
            <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              The Founder Team
            </span>
          </div>

          {/* Heading + subtext */}
          <div className="team-anim-header flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12 sm:mb-16">
            <h1 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.025em] text-gray-900">
              The core engineers<br />
              building{' '}
              <span className="text-[#0400F5]">
                <TypewriterText
                  words={[
                    'Eotra.',
                    'next-gen retail.',
                    'enterprise POS & ERP.',
                    'scalable cloud systems.',
                    'unified commerce.',
                  ]}
                />
              </span>
            </h1>
            <p className="text-[14px] sm:text-[15px] text-gray-600 max-w-md leading-relaxed">
              Dedicated to building the future of unified global retail
              management and enterprise operations.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
            {FOUNDERS.map((founder) => (
              <div key={founder.name} className="founder-card">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3.5">
                  <FounderAvatar
                    src={founder.image}
                    name={founder.name}
                    initials={founder.initials}
                    imageClass={founder.imageClass}
                  />
                </div>
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900">
                  {founder.name}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-600 mt-0.5">
                  {founder.role}
                </p>
              </div>
            ))}
          </div>

          {/* MINIMALIST METRICS STRIP WITH HOVER & ACCENT ANIMATION */}
          <div className="team-metrics-anim grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-6 sm:py-8 border-y border-gray-200 mb-16 sm:mb-20">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group relative p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:bg-gray-50/80 cursor-default select-none"
              >
                <div className="h-0.5 w-6 bg-gray-200 group-hover:w-12 group-hover:bg-[#0400F5] transition-all duration-300 rounded-full mb-3.5" />
                <div className="text-[28px] sm:text-[38px] font-semibold text-gray-900 tracking-tight tabular-nums transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0400F5]">
                  {stat.value}
                </div>
                <div className="text-[13px] sm:text-[14px] text-gray-500 font-medium mt-1 transition-colors duration-300 group-hover:text-gray-900">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Divider & Manifesto (Scroll Reveal style like pentograf.com) */}
          <div className="border-t border-gray-100 pt-16 sm:pt-20 mb-20 max-w-4xl">
            <span className="text-[12px] sm:text-[13px] font-semibold text-[#0400F5] uppercase tracking-wider mb-5 block">
              Engineering Manifesto
            </span>
            <ScrollRevealText
              text="Eotra is built by engineers with deep roots in enterprise retail technology. We combine domain expertise with modern engineering to deliver software that actually works at scale."
              className="text-[clamp(1.5rem,3.2vw,2.5rem)] text-gray-900"
              start="top 82%"
              end="bottom 50%"
            />
          </div>

          <footer className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigateHome()}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                <img
                  src="/assets/aistudio/Eotra_aef517cd.svg"
                  alt="Eotra"
                  className="h-[22px] w-auto max-w-none"
                />
              </button>
              <span className="font-semibold text-gray-900">
                Enterprise Operations &amp; Transaction
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-gray-600">
              <a
                href="mailto:info@eotra.com"
                className="text-gray-900 font-medium hover:text-[#0400F5] transition-colors"
              >
                info@eotra.com
              </a>
              <button
                type="button"
                onClick={() => onOpenInquiry('Connect with Eotra')}
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                Contact Sales
              </button>
              <span>&copy; 2026 Eotra Inc.</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
