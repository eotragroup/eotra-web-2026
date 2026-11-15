import { useEffect } from 'react';
import { ArrowRight, Rocket, ShieldCheck, Users } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';
import { AppRain } from './AppRain';
import { ProductsGrid } from './ProductsGrid';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { goToConnect, goToSolutions } from '../lib/nav';

interface PageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

const VALUES = [
  {
    icon: Rocket,
    title: 'Weeks, not months',
    text: 'We move your existing systems over quickly, with minimal downtime and a dedicated person by your side.',
  },
  {
    icon: ShieldCheck,
    title: 'Built to be trusted',
    text: 'Secure, multi-region infrastructure that grows from one shop to a global chain.',
  },
  {
    icon: Users,
    title: 'Founder-led',
    text: 'The people who design your system are the engineers who build it, and they stay with you after launch.',
  },
];

export function CompanyPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '7+', label: 'Years building' },
    { value: String(PRODUCTS.length), label: 'Live references' },
    { value: String(SERVICES.length), label: 'Services' },
    { value: 'Istanbul', label: 'Headquarters' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      {/* Hero */}
      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900">
            Our Company
          </span>
          <h1 className="mt-6 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900 max-w-4xl">
            We build the software modern retail runs on.
          </h1>
          <p className="mt-6 text-[16px] sm:text-[19px] text-gray-500 leading-relaxed max-w-2xl">
            Eotra is a technology company from Istanbul. We replace five disconnected systems with one platform linking POS,
            warehouse, ERP and CRM, and we build web and mobile products for the brands we work with.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RollButton label="Work with us" variant="orange" size="hero" onClick={() => goToConnect('Book an Eotra Demo')} />
            <button
              type="button"
              onClick={() => onNavigateToTeam?.()}
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors px-6 py-3.5 text-[14px] font-medium text-gray-900 cursor-pointer"
            >
              Meet the team <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <AppRain />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-gray-50 p-6 sm:p-8">
              <div className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] text-gray-900">{s.value}</div>
              <div className="mt-2 text-[13px] sm:text-[14px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F5F5F5] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900">How we work</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-white p-6 sm:p-8 min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div className="mt-8">
                  <h3 className="text-[19px] font-medium text-gray-900 tracking-[-0.01em]">{title}</h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions teaser */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-[32px] bg-gray-950 text-white px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] leading-[1.1]">
                Every app your retail runs on. One core.
              </h2>
              <p className="mt-4 text-[15px] text-white/60 leading-relaxed">POS, warehouse, ERP and CRM, working as one system.</p>
            </div>
            <RollButton label="See our solutions" variant="light" size="hero" onClick={goToSolutions} />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-[#F5F5F5] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900 mb-10">Our references</h2>
          <ProductsGrid products={PRODUCTS} onOpenProduct={(id) => onSelectProduct?.(id)} />
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
