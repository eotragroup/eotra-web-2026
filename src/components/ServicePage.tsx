import { useEffect } from 'react';
import { Activity, AppWindow, ArrowRight, BarChart3, Boxes, Cloud, Code2, CreditCard, Database, GitBranch, Globe, Layers, LifeBuoy, Link2, MousePointerClick, Package, Palette, Plug, Receipt, RefreshCw, Rocket, Search, ShieldCheck, ShoppingCart, Smartphone, Sparkles, Store, TestTube2, Truck, Users, Warehouse, WifiOff, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Hammer, PencilRuler } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';
import { TechBadge } from './TechBadge';
import { SERVICES, SERVICE_STEPS, getService } from '../data/services';
import { goToConnect, goToService } from '../lib/nav';
import { useI18n } from '../i18n';

const OFFER_ICONS: Record<string, LucideIcon> = { Activity, AppWindow, BarChart3, Boxes, Cloud, CreditCard, Database, GitBranch, Globe, Layers, LifeBuoy, Link2, MousePointerClick, Package, Palette, Plug, Receipt, RefreshCw, Rocket, Search, ShieldCheck, ShoppingCart, Smartphone, Sparkles, Store, TestTube2, Truck, Users, Warehouse, WifiOff, Wrench };

const STEP_ICONS: LucideIcon[] = [Search, PencilRuler, Hammer, Rocket];

interface ServicePageProps {
  slug: string;
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

export function ServicePage({ slug, onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: ServicePageProps) {
  const { t } = useI18n();
  const service = getService(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-24">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-[-0.03em]">{t('Service not found')}</h1>
          <button type="button" onClick={() => onNavigateHome('services')} className="mt-6 text-[15px] text-[#0400F5] cursor-pointer">
            {t('See all services')}
          </button>
        </div>
      </div>
    );
  }

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      {/* Hero */}
      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-14 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => onNavigateHome('services')}
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900 cursor-pointer"
            >
              <Icon size={14} strokeWidth={1.8} />
              {t(service.category)}
            </button>
            <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.03em] text-gray-900">
              {t(service.title)}
            </h1>
            <p className="mt-5 text-[16px] sm:text-[18px] text-gray-500 leading-relaxed max-w-lg">{t(service.tagline)}</p>
            <div className="mt-8">
              <RollButton label={t('Start a project')} variant="orange" size="hero" onClick={() => goToConnect(service.inquirySubject)} />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3]">
              <img src={service.image} alt={t(service.imageAlt)} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro + what we build */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em] text-gray-900">{t('What we build')}</h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-gray-500 leading-relaxed max-w-sm">{t(service.intro)}</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.offers.map((o) => (
              <div key={o.title} className="rounded-3xl bg-gray-50 p-6 sm:p-7 min-h-[150px] flex flex-col justify-between">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0400F5]">
                  {(() => {
                    const OIcon = OFFER_ICONS[o.icon] ?? Code2;
                    return <OIcon size={16} strokeWidth={1.8} />;
                  })()}
                </span>
                <div className="mt-6">
                  <h3 className="text-[17px] font-medium text-gray-900 tracking-[-0.01em]">{t(o.title)}</h3>
                  <p className="mt-1.5 text-[14px] text-gray-500 leading-relaxed">{t(o.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-[#F5F5F5] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em] text-gray-900">{t('How we work')}</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SERVICE_STEPS.map((s, i) => (
              <div key={s.title} className="rounded-3xl bg-white p-6 sm:p-7">
                {(() => {
                  const SIcon = STEP_ICONS[i] ?? Rocket;
                  return (
                    <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#0400F5]">
                      <SIcon size={18} strokeWidth={1.7} />
                    </span>
                  );
                })()}
                <h3 className="mt-6 text-[18px] font-medium text-gray-900 tracking-[-0.01em]">{t(s.title)}</h3>
                <p className="mt-2 text-[14px] text-gray-500 leading-relaxed">{t(s.text)}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2.5">
            <span className="text-[13px] text-gray-500 mr-2">{t('Typical stack')}</span>
            {service.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em] text-gray-900">{t('Other services')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {others.slice(0, 4).map((s) => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => goToService(s.slug)}
                  className="group text-left rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors p-6 min-h-[180px] flex flex-col justify-between cursor-pointer"
                >
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900">
                    <SIcon size={18} strokeWidth={1.7} />
                  </span>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-[16px] font-medium text-gray-900 tracking-[-0.01em]">{t(s.title)}</h3>
                      <p className="mt-1 text-[13px] text-gray-500 leading-snug">{t(s.description)}</p>
                    </div>
                    <ArrowRight size={16} className="shrink-0 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-[32px] bg-gray-50 px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900 max-w-xl leading-[1.1]">
              {t('Ready to start your project?')}
            </h2>
            <RollButton label={t('Start a project')} variant="orange" size="hero" onClick={() => goToConnect(service.inquirySubject)} />
          </div>
        </div>
      </section>

      <Footer
        onNavigateHome={() => onNavigateHome()}
        onOpenInquiry={onOpenInquiry}
        onNavigateToProduct={(id) => onSelectProduct?.(id)}
        onNavigateToTeam={onNavigateToTeam}
      />
    </div>
  );
}
