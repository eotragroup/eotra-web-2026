import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
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
import retailPosImg from './assets/images/eotra_retail_pos_men_1794584625031.jpg';
import globalOpsImg from './assets/images/eotra_global_ops_men_1794584624835.jpg';
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
  },
  {
    index: '02.',
    title: 'Inventory & Global WMS',
    description:
      'Real-time global stock visibility across international warehouses and retail locations.',
  },
  {
    index: '03.',
    title: 'CRM, Loyalty & Predictive Analytics',
    description:
      'Customer retention, data-driven reporting, and seamless ERP workflow integrations.',
  },
];

const EDITIONS = [
  {
    name: 'Standard Edition',
    audience: 'Single-brand retailers',
    summary:
      'Powerful POS and inventory control without the complexity of a massive ERP.',
  },
  {
    name: 'Professional Edition',
    audience: 'Multi-location chains',
    summary:
      'Advanced warehousing, omni-channel synchronization, and comprehensive CRM.',
  },
  {
    name: 'Enterprise Edition',
    audience: 'Global retail networks',
    summary:
      'Custom workflows, predictive analytics, and massive data volume handling.',
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
          <p className="hero-anim text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8">
            Eotra · Enterprise Operations &amp; Transaction
          </p>

          <h1 className="hero-anim text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
            Powering modern retail,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            from source to sale across
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-[#0400F5]">
              <TypewriterText
                words={[
                  'your global operations.',
                  'omnichannel stores.',
                  'international retail.',
                  'enterprise supply chains.',
                  'unified commerce.',
                ]}
              />
            </span>
          </h1>

          {/* CTA Row */}
          <div className="hero-anim mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
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
      </section>

      {/* SECTION 2: INTRODUCING EOTRA (White background) */}
      <section
        id="company"
        className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Badge Row */}
          <div className="gsap-fade-up flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              1
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Introducing Eotra
            </span>
          </div>

          {/* Editorial Header + Summary & CTA Row */}
          <div className="gsap-fade-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.025em] text-gray-900 max-w-2xl">
                Accompanies you in your overseas{' '}
                <span className="text-[#0400F5]">
                  <TypewriterText
                    words={[
                      'expansion & growth.',
                      'market expansion.',
                      'digital retail evolution.',
                      'global operations.',
                    ]}
                  />
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:pb-1">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-600 max-w-md">
                A single unified system linking POS, WMS, ERP, and CRM to power
                your growth without limits.
              </p>
              <div className="mt-6">
                <RollButton
                  label="About our company"
                  variant="orange"
                  size="hero"
                  onClick={() => setInfoModal('company')}
                />
              </div>
            </div>
          </div>

          {/* Balanced Asymmetric Image Row */}
          <div className="gsap-fade-up grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            <div className="md:col-span-5 aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={retailPosImg}
                alt="Flagship retail checkout with Eotra POS"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 aspect-[3/2] md:aspect-auto md:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={globalOpsImg}
                alt="Eotra global operations headquarters"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PLATFORM & EDITIONS (Light gray background) */}
      <section
        id="solutions"
        className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Badge Row */}
          <div className="gsap-fade-up flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              2
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              The Eotra Advantage
            </span>
          </div>

          <div className="gsap-fade-up grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-14 sm:mb-16">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(1.5rem,3.6vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-5">
                Replacing five disconnected systems with{' '}
                <span className="text-[#0400F5]">
                  <TypewriterText
                    words={[
                      'one unified core.',
                      'real-time sync.',
                      'cloud-native scale.',
                      'seamless POS & ERP.',
                    ]}
                  />
                </span>
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed max-w-md">
                From single-brand boutiques to 50+ store global retail networks,
                Eotra deploys in weeks with bank-grade security and dedicated
                onboarding support.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-gray-300 border-y border-gray-300 gsap-stagger-parent">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.index}
                  className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                >
                  <span className="text-[13px] font-semibold text-[#0400F5] tabular-nums shrink-0">
                    {cap.index}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-semibold text-gray-900">
                      {cap.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-gray-600 mt-1.5 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Editions */}
          <div className="gsap-stagger-parent grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {EDITIONS.map((edition) => (
              <div
                key={edition.name}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[12px] font-medium text-gray-500 mb-1.5">
                    {edition.audience}
                  </p>
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-2.5">
                    Eotra {edition.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                    {edition.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openInquiry(`Inquiry: Eotra ${edition.name}`)}
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-gray-900 hover:text-[#0400F5] transition-colors cursor-pointer self-start"
                >
                  <span>Request quote</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES SLIDER (White background) */}
      <ServicesSlider onOpenInquiry={openInquiry} />

      {/* SECTION 4: OUR PARTNERS MARQUEE (Light gray background) */}
      <PartnersMarquee onOpenInquiry={openInquiry} />

      {/* SECTION 6: CASE STUDIES & CLIENT IMPACT (Light gray background) */}
      <section
        id="projects"
        className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Badge Row */}
          <div className="gsap-fade-up flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
              6
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Featured products &amp; client work
            </span>
          </div>

          {/* Heading with Typewriter */}
          <h2 className="gsap-fade-up text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16">
            Our products &amp;{' '}
            <span className="text-[#0400F5]">
              <TypewriterText
                words={[
                  'projects.',
                  'enterprise suites.',
                  'flagship platforms.',
                  'retail systems.',
                ]}
              />
            </span>
          </h2>

          {/* Live Products Row */}
          <div className="gsap-stagger-parent grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 mb-10 sm:mb-12">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group cursor-pointer"
                onClick={() => navigateToProduct(product.id)}
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-gray-200/80 flex items-center justify-center p-10 sm:p-14">
                  <img
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    className="max-h-[68px] sm:max-h-[84px] w-auto max-w-[82%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[158px] bg-gray-900 text-white rounded-full flex items-center pl-4 pr-[11px] overflow-hidden transition-all duration-300 ease-in-out shadow-sm">
                    <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:delay-100">
                      Open page
                    </span>
                    <span className="absolute right-[11px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                      <a
                        href={`/products/${product.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigateToProduct(product.id);
                        }}
                        className="hover:text-[#0400F5] transition-colors"
                      >
                        {product.title}
                      </a>
                    </h3>
                  </div>
                  {product.liveUrl && (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0400F5] hover:underline shrink-0"
                    >
                      <span>{product.domainLabel}</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 sm:mt-20 pt-10 border-t border-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center">
              <span className="overflow-hidden inline-flex items-center">
                <img
                  src="/assets/aistudio/Eotra_aef517cd.svg"
                  alt="Eotra"
                  className="h-[24px] w-auto max-w-none -ml-3 -mr-6"
                />
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
                onClick={() => openInquiry('Connect with Eotra')}
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
      )}

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
