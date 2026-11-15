import { goToCompany, goToConnect, goToReferences } from './lib/nav';
import { applyMeta } from './lib/seo';
import { appPath, withLang } from './i18n/lang';
import { useI18n } from './i18n';
import { metaForPath } from './data/pageMeta';
import { LegalPage } from './components/LegalPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ServicePage } from './components/ServicePage';
import { CompanyPage } from './components/CompanyPage';
import { SolutionsPage } from './components/SolutionsPage';
import { ReferencesPage } from './components/ReferencesPage';
import { CareersPage } from './components/CareersPage';
import { ContactWidget } from './components/ContactWidget';
import { getService } from './data/services';
import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderBackground } from './components/ShaderBackground';
import { Navbar } from './components/Navbar';
import { RollButton } from './components/RollButton';
import { ProductPage } from './components/ProductPage';
import { TeamPage } from './components/TeamPage';
import { FaqPage } from './components/FaqPage';
import { ConnectPage } from './components/ConnectPage';
import { BlogPage, BlogPostPage } from './components/BlogPage';
import { ServicesSlider } from './components/ServicesSlider';
import { PartnersMarquee } from './components/PartnersMarquee';
import { TypewriterText } from './components/TypewriterText';
import { ScrollRevealText } from './components/ScrollRevealText';
import { EotraBrandSculpture } from './components/EotraBrandSculpture';
import { Footer } from './components/Footer';
import { POSTS } from './data/posts';
import { initSmoothScroll, smoothScrollTo } from './lib/smoothScroll';
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

// '/services/<slug>' -> slug
function getServiceFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/services\/([a-z0-9-]+)\/?$/);
  return m ? m[1] : null;
}

// '/company' or '/solutions'
type InfoPage = 'company' | 'solutions' | 'references' | 'careers' | 'privacy' | 'terms' | 'security';

function getInfoPageFromPath(pathname: string): InfoPage | null {
  if (/^\/careers\/?$/.test(pathname)) return 'careers';
  const legal = pathname.match(/^\/(privacy|terms|security)\/?$/);
  if (legal) return legal[1] as InfoPage;
  if (/^\/references\/?$/.test(pathname)) return 'references';
  if (/^\/company\/?$/.test(pathname)) return 'company';
  if (/^\/solutions\/?$/.test(pathname)) return 'solutions';
  return null;
}

function isTeamPath(pathname: string): boolean {
  return pathname === '/team';
}

function isFaqPath(pathname: string): boolean {
  return pathname === '/faq';
}

function isConnectPath(pathname: string): boolean {
  return pathname === '/connect';
}

// '/blog' -> '' (list), '/blog/<slug>' -> slug, anything else -> null
function getBlogFromPath(pathname: string): string | null {
  if (/^\/blog\/?$/.test(pathname)) return '';
  const m = pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/);
  return m ? m[1] : null;
}

export default function App() {
  const { t, lang } = useI18n();
  const typedWords = useMemo(
    () => ['your global operations.', 'omnichannel stores.', 'international retail.', 'enterprise supply chains.', 'unified commerce.'].map(t),
    [t],
  );
  const [activeProductId, setActiveProductId] = useState<string | null>(() =>
    getProductIdFromPath(appPath())
  );
  const [isTeamPage, setIsTeamPage] = useState<boolean>(() =>
    isTeamPath(appPath())
  );
  const [isFaqPage, setIsFaqPage] = useState<boolean>(() =>
    isFaqPath(appPath())
  );
  const [isConnectPage, setIsConnectPage] = useState<boolean>(() =>
    isConnectPath(appPath())
  );
  const [infoPage, setInfoPage] = useState<InfoPage | null>(() =>
    getInfoPageFromPath(appPath())
  );
  const [serviceSlug, setServiceSlug] = useState<string | null>(() =>
    getServiceFromPath(appPath())
  );
  const [blogRoute, setBlogRoute] = useState<string | null>(() =>
    getBlogFromPath(appPath())
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

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    const handlePopState = () => {
      setActiveProductId(getProductIdFromPath(appPath()));
      setIsTeamPage(isTeamPath(appPath()));
      setIsFaqPage(isFaqPath(appPath()));
      setIsConnectPage(isConnectPath(appPath()));
      setBlogRoute(getBlogFromPath(appPath()));
      setServiceSlug(getServiceFromPath(appPath()));
      setInfoPage(getInfoPageFromPath(appPath()));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pathname = appPath();
  const notFound =
    pathname !== '/' &&
    !(
      activeProduct ||
      isTeamPage ||
      isFaqPage ||
      isConnectPage ||
      blogRoute !== null ||
      (serviceSlug && getService(serviceSlug)) ||
      infoPage
    );

  useEffect(() => {
    applyMeta(metaForPath(appPath(), lang));
  }, [activeProduct, isTeamPage, isFaqPage, isConnectPage, blogRoute, serviceSlug, infoPage, notFound, lang]);

  // GSAP Animations
  useEffect(() => {
    if (activeProduct || isTeamPage || isFaqPage || isConnectPage || blogRoute !== null || serviceSlug || infoPage || notFound) return;

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
  }, [activeProduct, isTeamPage, isFaqPage, isConnectPage, blogRoute, serviceSlug, infoPage, notFound]);

  const navigateToProduct = (productId: string) => {
    const targetPath = `/products/${encodeURIComponent(productId)}`;
    if (appPath() !== targetPath) {
      window.history.pushState({}, '', withLang(targetPath));
    }
    setActiveProductId(productId);
    setIsTeamPage(false);
    setIsFaqPage(false);
    setBlogRoute(null);
    setIsConnectPage(false);
    setServiceSlug(null);
    setInfoPage(null);
    smoothScrollTo(0, { immediate: true });
  };

  const navigateToTeam = () => {
    window.history.pushState({}, '', withLang('/team'));
    setActiveProductId(null);
    setIsTeamPage(true);
    setIsFaqPage(false);
    setBlogRoute(null);
    setIsConnectPage(false);
    setServiceSlug(null);
    setInfoPage(null);
    smoothScrollTo(0, { immediate: true });
  };

  const navigateHome = (sectionId?: string) => {
    const targetUrl = sectionId ? `/#${sectionId}` : '/';
    window.history.pushState({}, '', withLang(targetUrl));
    setActiveProductId(null);
    setIsTeamPage(false);
    setIsFaqPage(false);
    setBlogRoute(null);
    setIsConnectPage(false);
    setServiceSlug(null);
    setInfoPage(null);

    if (sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            smoothScrollTo(el);
          }
        }, 40);
      });
    } else {
      smoothScrollTo(0);
    }
  };

  // Every "get started / book a demo / start a project" button goes to the Connect page instead of a pop-up
  const openInquiry = (subject?: string) => {
    goToConnect(subject);
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
      ) : blogRoute !== null ? (
        blogRoute === '' ? (
          <BlogPage
            onNavigateHome={navigateHome}
            onOpenInquiry={openInquiry}
            onNavigateToTeam={navigateToTeam}
            onSelectProduct={navigateToProduct}
          />
        ) : (
          <BlogPostPage
            slug={blogRoute}
            onNavigateHome={navigateHome}
            onOpenInquiry={openInquiry}
            onNavigateToTeam={navigateToTeam}
            onSelectProduct={navigateToProduct}
          />
        )
      ) : infoPage === 'company' ? (
        <CompanyPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : notFound ? (
        <NotFoundPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : infoPage === 'privacy' || infoPage === 'terms' || infoPage === 'security' ? (
        <LegalPage
          kind={infoPage}
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : infoPage === 'careers' ? (
        <CareersPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : infoPage === 'references' ? (
        <ReferencesPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : infoPage === 'solutions' ? (
        <SolutionsPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : serviceSlug ? (
        <ServicePage
          slug={serviceSlug}
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : isConnectPage ? (
        <ConnectPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
        />
      ) : isFaqPage ? (
        <FaqPage
          onNavigateHome={navigateHome}
          onOpenInquiry={openInquiry}
          onNavigateToTeam={navigateToTeam}
          onSelectProduct={navigateToProduct}
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
                {t('Eotra · Enterprise Operations & Transaction')}
              </p>

              <h1 className="hero-anim text-[clamp(1.75rem,5.5vw,3.75rem)] xl:text-[clamp(2.4rem,4.6vw,4.1rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
                {t('Powering modern retail,')}
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                {t('from source to sale across')}
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <TypewriterText
                  words={typedWords}
                />
              </h1>

              {/* CTA Row */}
              <div className="hero-anim mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <RollButton
                  label={t('Get started now')}
                  variant="orange"
                  size="hero"
                  onClick={() => openInquiry('Get Started with Eotra')}
                />
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
                text={t('Our Company')}
                className="text-[clamp(1.75rem,4vw,3.25rem)] text-gray-900 max-w-2xl"
                start="top 85%"
                end="bottom 55%"
              />
            </div>

          </div>

          {/* Raining apps panel */}
          <div className="gsap-fade-up">
            <AppRain
              cta={
                <RollButton
                  label={t('About our company')}
                  variant="orange"
                  size="hero"
                  onClick={() => goToCompany()}
                />
              }
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES SLIDER (Light gray background) */}
      <ServicesSlider onOpenInquiry={openInquiry} />

      {/* SECTION 3: THE EOTRA ADVANTAGE — stacking cards (White background) */}
      <section
        id="solutions"
        className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Editorial header + summary */}
          <div className="gsap-fade-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <ScrollRevealText
                as="h2"
                text={t('Our Solutions')}
                className="text-[clamp(1.75rem,4vw,3.25rem)] text-gray-900 max-w-2xl"
                start="top 85%"
                end="bottom 55%"
              />
            </div>
          </div>

          {/* Stacking cards: each one slides over the previous while scrolling */}
          <AdvantageStack capabilities={CAPABILITIES} onOpenInquiry={openInquiry} />
        </div>
      </section>

      {/* SECTION 4: CASE STUDIES & CLIENT IMPACT (Light gray background) */}
      <section
        id="projects"
        className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Heading with ScrollRevealText */}
          <ScrollRevealText
            as="h2"
            text={t('Our References')}
            className="text-[clamp(1.75rem,5.5vw,3.75rem)] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            start="top 85%"
            end="bottom 55%"
          />

          {/* Products grid */}
          <ProductsGrid products={PRODUCTS} onOpenProduct={navigateToProduct} />

          <div className="mt-10 flex justify-center">
            <RollButton label={t('All references')} variant="dark" size="hero" onClick={() => goToReferences()} />
          </div>
        </div>
      </section>

      {/* Full-Width Footer with Columns, Information & Sign Up */}
      <Footer
        onNavigateHome={() => smoothScrollTo(0)}
        onOpenInquiry={openInquiry}
        onNavigateToProduct={navigateToProduct}
        onNavigateToTeam={navigateToTeam}
        onOpenInfoModal={(mode) => setInfoModal(mode)}
      />
        </div>
      )}

      {/* Floating contact button: AI assistant, WhatsApp, email */}
      <ContactWidget />

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
        onStartProject={() => goToConnect()}
      />
    </>
  );
}
