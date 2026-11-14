import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, ProductPageData } from '../data/products';
import { Navbar } from './Navbar';
import { RollButton } from './RollButton';
import { ShaderBackground } from './ShaderBackground';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductPageProps {
  product: ProductPageData;
  onNavigateHome: (sectionId?: string) => void;
  onSelectProduct: (productId: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
}

export function ProductPage({
  product,
  onNavigateHome,
  onSelectProduct,
  onOpenInquiry,
  onNavigateToTeam,
}: ProductPageProps) {
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-hero-anim', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('.product-gsap-fade').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    });

    return () => ctx.revert();
  }, [product.id]);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* PRODUCT HERO */}
      <section className="relative bg-[#EFEFEF] overflow-hidden pb-16 sm:pb-20 lg:pb-24">
        <ShaderBackground />

        <Navbar
          onOpenInquiry={onOpenInquiry}
          onNavigateHome={onNavigateHome}
          onNavigateToTeam={onNavigateToTeam}
        />

        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16">
          <button
            type="button"
            onClick={() => onNavigateHome('projects')}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-[#0400F5] transition-colors mb-8 sm:mb-10 cursor-pointer min-h-[40px]"
          >
            <ArrowLeft size={15} />
            <span>Back to all products</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Title, Metadata & CTAs */}
            <div className="lg:col-span-7">
              <div className="product-hero-anim flex flex-wrap items-center gap-2 text-[13px] text-gray-600 mb-4">
                <span>{product.client}</span>
                <span aria-hidden="true">·</span>
                <span>{product.year}</span>
                {product.domainLabel && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-gray-900">
                      {product.domainLabel}
                    </span>
                  </>
                )}
              </div>

              <h1 className="product-hero-anim text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-5 text-balance">
                {product.title}
              </h1>

              <p className="product-hero-anim text-[15px] sm:text-[18px] leading-[1.6] font-medium text-gray-600 max-w-2xl">
                {product.tagline}
              </p>

              <div className="product-hero-anim mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <RollButton
                  label="Book a demo"
                  variant="orange"
                  size="hero"
                  onClick={() => onOpenInquiry(product.inquirySubject)}
                />

                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-900 text-gray-900 text-[14px] font-medium rounded-full px-6 py-3.5 inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Visit {product.domainLabel}</span>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Clean Logo Showcase Card */}
            <div className="product-hero-anim lg:col-span-5">
              <div className="bg-white rounded-2xl border border-gray-200/80 aspect-[16/10] flex items-center justify-center p-10 sm:p-14 shadow-[0_6px_28px_rgba(0,0,0,0.05)]">
                {product.logoUrl ? (
                  <img
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    className="max-h-[82px] sm:max-h-[100px] w-auto max-w-[82%] object-contain"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-gray-900">
                    {product.title}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: METRICS & OVERVIEW */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Quantitative Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 border-y border-gray-200 mb-14 sm:mb-16">
            {product.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-[20px] sm:text-[26px] font-semibold text-gray-900 tracking-tight tabular-nums">
                  {metric.value}
                </div>
                <div className="text-[13px] text-gray-500 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Overview Prose + Quote */}
            <div className="lg:col-span-7">
              <p className="text-[13px] font-semibold text-[#0400F5] mb-3 tabular-nums">
                01. Product Overview
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-gray-900 mb-6 text-balance">
                Purpose-built operational architecture.
              </h2>

              <div className="space-y-4 text-[15px] sm:text-[16px] text-gray-600 leading-[1.7] max-w-2xl">
                {product.overviewParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#F8F8FA] border border-gray-200 p-6 sm:p-7">
                <p className="text-[15px] sm:text-[16px] text-gray-900 font-medium leading-relaxed">
                  &ldquo;{product.quote}&rdquo;
                </p>
                <p className="text-[13px] text-gray-500 mt-2.5">
                  {product.quoteAuthor}
                </p>
              </div>
            </div>

            {/* Specifications & Scope */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <h3 className="text-[17px] font-semibold text-gray-900 mb-5">
                  Product Specifications
                </h3>

                <div className="divide-y divide-gray-200 border-y border-gray-200">
                  {product.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="py-3.5 flex items-baseline justify-between gap-4"
                    >
                      <span className="text-[13px] text-gray-500 shrink-0">
                        {spec.label}
                      </span>
                      <span className="text-[14px] font-medium text-gray-900 text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <span className="text-[13px] text-gray-500 shrink-0">
                      Deliverables
                    </span>
                    <span className="text-[14px] font-medium text-gray-900 text-right">
                      {product.deliverables.join(' · ')}
                    </span>
                  </div>
                </div>

                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 w-full bg-gray-900 hover:bg-[#0400F5] text-white text-[13px] font-medium rounded-full px-5 py-3 inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Open live product</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CAPABILITIES & WORKFLOWS */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-14 sm:mb-16">
            <div className="lg:col-span-5">
              <p className="text-[13px] font-semibold text-[#0400F5] mb-3 tabular-nums">
                02. System Capabilities
              </p>
              <h2 className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-5 text-balance">
                Engineered for continuous daily operations.
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed max-w-md">
                Built on Eotra&apos;s unified operations core so teams manage
                catalogs, branches, languages, and transactions from one place.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-gray-300 border-y border-gray-300">
              {product.capabilities.map((cap) => (
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

          {/* Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {product.workflows.map((wf) => (
              <div
                key={wf.title}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[12px] font-medium text-gray-500 mb-1.5">
                    {wf.label}
                  </p>
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-2.5">
                    {wf.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                    {wf.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MORE PRODUCTS & QUIET FOOTER */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="text-[13px] font-semibold text-[#0400F5] mb-2">
                03. Eotra Product Suite
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-gray-900">
                Explore other products
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigateHome('projects')}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-900 hover:text-[#0400F5] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>All products &amp; projects</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {otherProducts.map((other) => (
              <article
                key={other.id}
                onClick={() => onSelectProduct(other.id)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F8FA] border border-gray-200/80 flex items-center justify-center p-10 sm:p-14">
                  {other.logoUrl && (
                    <img
                      src={other.logoUrl}
                      alt={`${other.title} logo`}
                      className="max-h-[68px] sm:max-h-[84px] w-auto max-w-[82%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 h-9 w-9 group-hover:w-[156px] bg-gray-900 text-white rounded-full flex items-center pl-4 pr-[11px] overflow-hidden transition-all duration-300 ease-in-out shadow-sm">
                    <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:delay-100">
                      Open page
                    </span>
                    <span className="absolute right-[11px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <ArrowRight
                        size={14}
                        className="text-white shrink-0 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                      {other.description}
                    </p>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                      {other.title}
                    </h3>
                  </div>
                  {other.domainLabel && (
                    <span className="text-[13px] font-medium text-[#0400F5] shrink-0">
                      {other.domainLabel}
                    </span>
                  )}
                </div>
              </article>
            ))}

            {/* Conversion CTA Card */}
            <div className="rounded-2xl bg-[#F5F5F5] border border-gray-200/80 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-2">
                  Deploy with Eotra
                </p>
                <h3 className="text-[22px] sm:text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mb-3">
                  Ready to launch your retail or hospitality platform?
                </h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed max-w-md">
                  Connect POS, inventory, multi-branch storefronts, or QR menus
                  under one architecture.
                </p>
              </div>
              <div className="mt-8">
                <RollButton
                  label="Request a demo"
                  variant="orange"
                  size="hero"
                  onClick={() => onOpenInquiry(product.inquirySubject)}
                />
              </div>
            </div>
          </div>

          <footer className="mt-16 sm:mt-20 pt-10 border-t border-gray-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-gray-600">
              <button
                type="button"
                onClick={() => onNavigateHome()}
                className="overflow-hidden inline-flex items-center mr-1 cursor-pointer"
                aria-label="Back to Eotra home"
              >
                <img
                  src="/assets/aistudio/Eotra_aef517cd.svg"
                  alt="Eotra"
                  className="h-[24px] w-auto max-w-none -ml-3 -mr-6"
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
