import { goToConnect, goToReferences } from '../lib/nav';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Languages, CreditCard, Smartphone, BarChart3, Truck, Search, QrCode, Activity, Boxes, Store, Layers, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, ProductPageData } from '../data/products';
import { Navbar } from './Navbar';
import { RollButton } from './RollButton';
import { ShaderBackground } from './ShaderBackground';
import { Footer } from './Footer';
import { ProductCard, ProductCover, screensFor } from './ProductsGrid';
import { useI18n } from '../i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Picks a fitting icon from the words in a highlight title
function iconForTitle(title: string): LucideIcon {
  const s = title.toLowerCase();
  const rules: [RegExp, LucideIcon][] = [
    [/language|locali[sz]|translation|rtl|bilingual/, Languages],
    [/checkout|payment|wallet|currency|settlement|cod/, CreditCard],
    [/mobile|touch|responsive|device/, Smartphone],
    [/analytics|telemetry|performance|metrics|equity/, BarChart3],
    [/shipping|fulfil|delivery|courier|routing|branch/, Truck],
    [/search|merchandis|catalog|curat|ingredient|routine|formula/, Search],
    [/qr|menu|template|table/, QrCode],
    [/trad|risk|drawdown|strategy|copier|broker|execution|capital/, Activity],
    [/inventory|stock|order|sync/, Boxes],
    [/guest|engagement|experience|storefront|e-commerce|commerce|flagship/, Store],
    [/architecture|platform|bridge|integration/, Layers],
  ];
  return rules.find(([re]) => re.test(s))?.[1] ?? Sparkles;
}

interface ProductPageProps {
  product: ProductPageData;
  onNavigateHome: (sectionId?: string) => void;
  onSelectProduct: (productId: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
}


function BrowserShot({
  src,
  alt,
  domain,
  className = '',
}: {
  src: string;
  alt: string;
  domain?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${className}`}>
      <div className="h-10 sm:h-11 bg-[#F3F3F5] flex items-center gap-2 px-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        {domain && (
          <span className="ml-3 flex-1 max-w-[320px] h-6 rounded-md bg-white text-[11px] text-gray-500 flex items-center px-3 truncate">
            {domain}
          </span>
        )}
      </div>
      <img src={src} alt={alt} loading="lazy" className="w-full aspect-[16/10] object-cover object-top block" />
    </div>
  );
}

function PhoneShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-2xl bg-[#EFEFEF] flex items-center justify-center p-6 sm:p-10 ${className}`}>
      <div className="w-[230px] sm:w-[260px] rounded-[38px] bg-gray-950 p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
        <img src={src} alt={alt} loading="lazy" className="w-full aspect-[9/19] object-cover object-top rounded-[30px] block" />
      </div>
    </div>
  );
}

export function ProductPage({
  product,
  onNavigateHome,
  onSelectProduct,
  onOpenInquiry,
  onNavigateToTeam,
}: ProductPageProps) {
  const { t } = useI18n();
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);
  const screens = screensFor(product.id);

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
            onClick={() => goToReferences()}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-[#0400F5] transition-colors mb-8 sm:mb-10 cursor-pointer min-h-[40px]"
          >
            <ArrowLeft size={15} />
            <span>{t('Back to references')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Title, Metadata & CTAs */}
            <div className="lg:col-span-7">
              <div className="product-hero-anim flex flex-wrap items-center gap-2 text-[13px] text-gray-600 mb-4">
                <span>{t(product.client)}</span>
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
                {t(product.tagline)}
              </p>

              <div className="product-hero-anim mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <RollButton
                  label={t('Book a demo')}
                  variant="orange"
                  size="hero"
                  onClick={() => goToConnect(product.inquirySubject)}
                />

                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 text-[14px] font-medium rounded-full px-6 py-3.5 inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>{t('Visit')} {product.domainLabel}</span>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>

            {/* Right: product picture with logo */}
            <div className="product-hero-anim lg:col-span-5">
              <ProductCover product={product} className="aspect-[4/5] w-full max-w-[460px] lg:max-w-none lg:max-h-[560px]" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: SCREENS */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Metrics strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 border-y border-gray-200 mb-14 sm:mb-16">
            {product.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-[22px] sm:text-[30px] font-semibold text-gray-900 tracking-tight tabular-nums">
                  {t(metric.value)}
                </div>
                <div className="text-[13px] text-gray-500 mt-1">{t(metric.label)}</div>
              </div>
            ))}
          </div>

          <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-8 sm:mb-12">
            {t('In action')}
          </h2>

          {screens.desktop.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              <BrowserShot
                className="product-gsap-fade lg:col-span-8"
                src={screens.desktop[0]}
                domain={product.domainLabel}
                alt={`${product.title} ${t('home page')}`}
              />
              {screens.mobile && (
                <PhoneShot
                  className="product-gsap-fade lg:col-span-4"
                  src={screens.mobile}
                  alt={`${product.title} ${t('on a phone')}`}
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: HIGHLIGHTS */}
      <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-8 sm:mb-12">
            {t('Highlights')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {product.capabilities.map((cap) => (
              <div
                key={cap.index}
                className="rounded-3xl bg-gray-50 p-6 sm:p-7 min-h-[140px] flex flex-col justify-between"
              >
                {(() => {
                  const CIcon = iconForTitle(cap.title);
                  return (
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0400F5]">
                      <CIcon size={18} strokeWidth={1.7} />
                    </span>
                  );
                })()}
                <h3 className="text-[18px] sm:text-[20px] font-medium leading-snug tracking-[-0.01em] text-gray-900 mt-6">
                  {t(cap.title)}
                </h3>
              </div>
            ))}
          </div>

          {product.deliverables.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {product.deliverables.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-[13px] font-medium text-gray-900"
                >
                  {t(d)}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: MORE PRODUCTS & QUIET FOOTER */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900">
              {t('More references')}
            </h2>

            <button
              type="button"
              onClick={() => goToReferences()}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-900 hover:text-[#0400F5] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>{t('All references')}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {otherProducts.map((other) => (
              <ProductCard key={other.id} product={other} onOpenProduct={onSelectProduct} />
            ))}

            {/* Conversion CTA Card */}
            <div className="rounded-3xl bg-[#F5F5F5] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-2">
                  {t('Deploy with Eotra')}
                </p>
                <h3 className="text-[22px] sm:text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mb-3">
                  {t('Ready to launch your retail or hospitality platform?')}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed max-w-md">
                  {t('Connect POS, inventory, multi-branch storefronts, or QR menus under one architecture.')}
                </p>
              </div>
              <div className="mt-8">
                <RollButton
                  label={t('Request a demo')}
                  variant="orange"
                  size="hero"
                  onClick={() => goToConnect(product.inquirySubject)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Columns, Information & Sign Up */}
      <Footer
        onNavigateHome={() => onNavigateHome()}
        onOpenInquiry={onOpenInquiry}
        onNavigateToProduct={(id) => onSelectProduct(id)}
        onNavigateToTeam={onNavigateToTeam}
      />
    </div>
  );
}
