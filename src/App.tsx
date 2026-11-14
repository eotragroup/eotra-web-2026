import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderBackground } from './components/ShaderBackground';
import { Navbar } from './components/Navbar';
import { RollButton } from './components/RollButton';
import { ProductPage } from './components/ProductPage';
import { TeamPage } from './components/TeamPage';
import { ServicesSlider } from './components/ServicesSlider';
import { PartnersMarquee } from './components/PartnersMarquee';
import { TypewriterText } from './components/TypewriterText';
import { ScrollRevealText } from './components/ScrollRevealText';
import { EotraBrandSculpture } from './components/EotraBrandSculpture';
import { Footer } from './components/Footer';
import { AppRain } from './components/AppRain';
import { AdvantageStack } from './components/AdvantageStack';
import { ProductsGrid } from './components/ProductsGrid';
import {
  CASE_STUDIES,
  CaseStudyData,
  PRODUCTS,
} from './data/products';
import {
  CaseStudyModal,
  InfoModal,
  InquiryModal,
} from './components/Modals';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITIES = [
  {
    index: '01.',
    title: 'Point of Sale & Order Management',
    description:
      'Offline-first omni-channel transactions and unified fulfillment across every store.',
    nodes: ['pos'],
  },
  {
    index: '02.',
    title: 'Inventory & Global WMS',
    description:
      'Real-time global stock visibility across international warehouses and retail locations.',
    nodes: ['wms', 'erp'],
  },
  {
    index: '03.',
    title: 'CRM, Loyalty & Predictive Analytics',
    description:
      'Customer retention, data-driven reporting, and seamless ERP workflow integrations.',
    nodes: ['crm', 'analytics'],
  },
];

function PartnerStarburstIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#0400F5] shrink-0"
      aria-hidden="true"
    >
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

function LinkChainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-gray-900 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function getProductIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/products\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function isTeamPath(pathname: string): boolean {
  return pathname === '/team';
}

export default function App() {
  const [activeProductId, setActiveProductId] = useState<string | null>(() =>
    getProductIdFromPath(window.location.pathname)
  );
  const [isTeamPage, setIsTeamPage] = useState<boolean>(() =>
    isTeamPath(window.location.pathname)
  );
  const [inquiryState, setInquiryState] = useState<{
    open: boolean;
    subject: string;
  }>({ open: false, subject: 'Get Started with Eotra' });
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState<CaseStudyData | null>(null);
  const [infoModal, setInfoModal] = useState<
    'company' | 'solutions' | 'suite' | null
  >(null);

  const activeProduct = activeProductId
    ? PRODUCTS.find((p) => p.id === activeProductId) ?? null
    : null;

  useEffect(() => {
    const handlePopState = () => {
      setActiveProductId(getProductIdFromPath(window.location.pathname));
      setIsTeamPage(isTeamPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (activeProduct) {
      document.title = `${activeProduct.title} — Eotra`;
    } else if (isTeamPage) {
      document.title = 'The Founder Team — Eotra';
    } else {
      document.title = 'Eotra — Enterprise Operations & Transaction';
    }
  }, [activeProduct, isTeamPage]);

  // GSAP Animations
  useEffect(() => {
    if (activeProduct || isTeamPage) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.from('.hero-anim', {
        y: 40,
        opacity: 0,
        duration: 0.95,
        stagger: 0.14,
        ease: 'power3.out',
      });

      // ScrollTrigger reveal for sections & headers
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
          y: 45,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
        });
      });

      // Staggered items (capabilities list, platform editions, products)
      gsap.utils.toArray<HTMLElement>('.gsap-stagger-parent').forEach((parent) => {
        const children = parent.children;
        if (!children || children.length === 0) return;
        gsap.from(children, {
          scrollTrigger: {
            trigger: parent,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
        });
      });
    });

    return () => ctx.revert();
  }, [activeProduct, isTeamPage]);

  const navigateToProduct = (productId: string) => {
    const targetPath = `/products/${encodeURIComponent(productId)}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setActiveProductId(productId);
    setIsTeamPage(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToTeam = () => {
    window.history.pushState({}, '', '/team');
    setActiveProductId(null);
    setIsTeamPage(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateHome = (sectionId?: string) => {
    const targetUrl = sectionId ? `/#${sectionId}` : '/';
    window.history.pushState({}, '', targetUrl);
    setActiveProductId(null);
    setIsTeamPage(false);

    if (sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 40);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openInquiry = (subject = 'Get Started with Eotra') => {
    setInquiryState({ open: true, subject });
  };

  return (
    <>
      {activeProduct ? (
        <ProductPage
          product={activeProduct}
          onNavigateHome={navigateHome}
          onSelectProduct={navigateToProduct}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
        />
      ) : isTeamPage ? (
        <TeamPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : (
        <div id="top" className="min-h-screen bg-white text-gray-900 antialiased">
      {/* SECTION 1: HERO (Full viewport height) */}
      <section className="relative min-h-screen flex flex-col bg-[#EFEFEF] overflow-hidden">
        <ShaderBackground />

        <Navbar onOpenInquiry={openInquiry} onNavigateHome={navigateHome} onNavigateToTeam={navigateToTeam} />

        <div className="flex-1" />

        {/* Hero Content (z-20) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            {/* Left Column: Heading, Subtitle & CTAs */}
            <div className="lg:col-span-7">
              <p className="hero-anim text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8">
                Eotra · Enterprise Operations &amp; Transaction
              </p>

              <h1 className="hero-anim text-[clamp(1.75rem,5.5vw,3.75rem)] xl:text-[clamp(2.4rem,4.6vw,4.1rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
                Powering modern retail,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                from source to sale across
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <TypewriterText
                  words={[
                    'your global operations.',
                    'omnichannel stores.',
                    'international retail.',
                    'enterprise supply chains.',
                    'unified commerce.',
                  ]}
                />
              </h1>

              {/* CTA Row */}
              <div className="hero-anim mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <RollButton
                  label="Get started now"
                  variant="orange"
                  size="hero"
                  onClick={() => openInquiry('Get Started with Eotra')}
                />

                <button
                  type="button"
                  onClick={() => setInfoModal('suite')}
                  className="bg-white rounded-[4px] px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <PartnerStarburstIcon />
                  <span className="text-[13px] sm:text-[14px] font-medium text-gray-900 whitespace-nowrap">
                    Unified POS · WMS · ERP · CRM
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                    Enterprise
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Eotra 3D Kinetic Brand Sculpture */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center">
              <EotraBrandSculpture />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGO BAR DOWN THE HERO (Zero Text, Pure Logos) */}
      <PartnersMarquee />

      {/* SECTION 2: INTRODUCING EOTRA (White background) */}
      <section
        id="company"
        className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Editorial Header + Summary & CTA Row */}
          <div className="gsap-fade-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <ScrollRevealText
                as="h2"
                text="Accompanies you in your overseas expansion and global retail growth."
                className="text-[clamp(1.75rem,4vw,3.25rem)] text-gray-900 max-w-2xl"
                start="top 85%"
                end="bottom 55%"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:pb-1">
              <div>
                <RollButton
                  label="About our company"
                  variant="orange"
                  size="hero"
                  onClick={() => setInfoModal('company')}
                />
              </div>
            </div>
          </div>

          {/* Raining apps panel */}
          <div className="gsap-fade-up">
            <AppRain />
          </div>
        </div>
      </section>

      {/* SECTION 3: PLATFORM & EDITIONS (Light gray background) */}
      <section
        id="solutions"
        className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Editorial header + summary */}
          <div className="gsap-fade-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <ScrollRevealText
                as="h2"
                text="Replacing five disconnected systems with one unified operational core."
                className="text-[clamp(1.75rem,4vw,3.25rem)] text-gray-900 max-w-2xl"
                start="top 85%"
                end="bottom 55%"
              />
            </div>
          </div>

          {/* Stacking cards: each one slides over the previous while scrolling */}
          <AdvantageStack capabilities={CAPABILITIES} />
        </div>
      </section>

      {/* SECTION 3: SERVICES SLIDER (White background) */}
      <ServicesSlider onOpenInquiry={openInquiry} />

      {/* SECTION 4: CASE STUDIES & CLIENT IMPACT (Light gray background) */}
      <section
        id="projects"
        className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Heading with ScrollRevealText */}
          <ScrollRevealText
            as="h2"
            text="Featured products and client platforms engineered for global scale."
            className="text-[clamp(1.75rem,5.5vw,3.75rem)] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            start="top 85%"
            end="bottom 55%"
          />

          {/* Products grid */}
          <ProductsGrid products={PRODUCTS} onOpenProduct={navigateToProduct} />
        </div>
      </section>

      {/* Full-Width Footer with Columns, Information & Sign Up */}
      <Footer
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenInquiry={openInquiry}
        onNavigateToProduct={navigateToProduct}
        onNavigateToTeam={() => {
          setView('team');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenInfoModal={(mode) => setInfoModal(mode)}
      />
        </div>
      )}

      {/* Floating Bottom-Right Chat Icon Button */}
      <aside aria-label="Quick contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => openInquiry('Quick Contact')}
          aria-label="Open contact chat"
          title="Contact Eotra"
          className="group relative flex items-center justify-center w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] bg-gray-950 hover:bg-black text-white rounded-full shadow-2xl hover:shadow-black/40 transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer border border-white/15"
        >
          <MessageSquare
            size={22}
            className="text-white shrink-0 group-hover:scale-105 transition-transform duration-200"
          />
        </button>
      </aside>

      <InquiryModal
        open={inquiryState.open}
        subject={inquiryState.subject}
        onClose={() => setInquiryState((prev) => ({ ...prev, open: false }))}
      />

      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onStartSimilar={(subject) => openInquiry(subject)}
      />

      <InfoModal
        mode={infoModal}
        onClose={() => setInfoModal(null)}
        onStartProject={() => openInquiry('Book an Eotra Demo')}
      />
    </>
  );
}
