import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';
import posImg from '../assets/advantage/pos.jpg';
import wmsImg from '../assets/advantage/wms.jpg';
import crmImg from '../assets/advantage/crm.jpg';
import { goToConnect } from '../lib/nav';
import { useI18n } from '../i18n';

interface PageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

const SOLUTIONS = [
  {
    tag: 'POS',
    title: 'Point of Sale & Order Management',
    text: 'Offline-first checkout and unified fulfilment across every store, region and sales channel.',
    points: ['Works without internet, syncs when back', 'Online, in-store and phone orders in one place', 'Returns, exchanges and split payments', 'Cashier roles and shift reports'],
    image: posImg,
    alt: 'Cashier using a point of sale terminal in a retail store',
    subject: 'Inquiry: Point of Sale & Order Management',
  },
  {
    tag: 'WMS',
    title: 'Inventory & Global WMS',
    text: 'One real-time stock number across warehouses, stores and distribution hubs.',
    points: ['Live stock across every location', 'Transfers, receiving and stock counts', 'Barcode and handheld scanning', 'Low-stock alerts and reorder rules'],
    image: wmsImg,
    alt: 'Large warehouse with organised shelving',
    subject: 'Inquiry: Inventory & Global WMS',
  },
  {
    tag: 'CRM',
    title: 'CRM, Loyalty & Predictive Analytics',
    text: 'Know your customers, keep them coming back, and see what to do next from your own data.',
    points: ['Customer profiles from every channel', 'Points, tiers and campaigns', 'Sales and stock dashboards', 'ERP and accounting integrations'],
    image: crmImg,
    alt: 'Customer relationship management dashboard',
    subject: 'Inquiry: CRM, Loyalty & Predictive Analytics',
  },
];

const EDITIONS = [
  { name: 'Standard', text: 'For single-brand boutiques and a first set of stores.' },
  { name: 'Professional', text: 'For growing chains that need warehouse and CRM working together.' },
  { name: 'Enterprise', text: 'For 50+ stores and global networks with custom integrations.' },
];

export function SolutionsPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: PageProps) {
  const { t } = useI18n();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      {/* Hero */}
      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900">
            {t('Our Solutions')}
          </span>
          <h1 className="mt-6 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900 max-w-4xl">
            {t('Every app your retail runs on. One core.')}
          </h1>
          <p className="mt-6 text-[16px] sm:text-[19px] text-gray-500 leading-relaxed max-w-2xl">
            {t('POS, warehouse, ERP and CRM replace five separate systems with one connected platform.')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {['POS', 'WMS', 'ERP', 'CRM'].map((t) => (
              <span key={t} className="rounded-full bg-gray-100 px-4 py-2 text-[13px] font-medium text-gray-900">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <RollButton label={t('Book a demo')} variant="orange" size="hero" onClick={() => goToConnect('Book an Eotra Demo')} />
          </div>
        </div>
      </section>

      {/* The three solutions */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-4">
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 ${
                i === 0 ? 'bg-gray-950 text-white' : i === 1 ? 'bg-[#0400F5] text-white' : 'bg-gray-50 text-gray-900'
              }`}
            >
              <div className={`p-7 sm:p-12 flex flex-col justify-center ${i % 2 ? 'lg:order-2' : ''}`}>
                <span
                  className={`self-start rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
                    i === 2 ? 'bg-white text-gray-900' : 'bg-white/15 text-white'
                  }`}
                >
                  {s.tag}
                </span>
                <h2 className="mt-6 text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em]">{t(s.title)}</h2>
                <p className={`mt-4 text-[15px] sm:text-[16px] leading-relaxed max-w-md ${i === 2 ? 'text-gray-500' : 'text-white/70'}`}>
                  {t(s.text)}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14px] sm:text-[15px]">
                      <span
                        className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${
                          i === 2 ? 'bg-white text-[#0400F5]' : 'bg-white/15 text-white'
                        }`}
                      >
                        <Check size={12} strokeWidth={2.4} />
                      </span>
                      {t(p)}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <RollButton
                    label={t('Request quote')}
                    variant={i === 0 ? 'orange' : i === 1 ? 'light' : 'dark'}
                    size="hero"
                    onClick={() => goToConnect(s.subject)}
                  />
                </div>
              </div>
              <div className={`min-h-[260px] lg:min-h-[480px] p-3 sm:p-4 ${i % 2 ? 'lg:order-1' : ''}`}>
                <img src={s.image} alt={t(s.alt)} className="w-full h-full object-cover rounded-[24px]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editions */}
      <section className="bg-[#F5F5F5] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900">{t('Editions')}</h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-gray-500 max-w-xl">{t('Start with what you need, add more as you grow.')}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            {EDITIONS.map((e, i) => (
              <div key={e.name} className="rounded-3xl bg-white p-6 sm:p-8 min-h-[200px] flex flex-col justify-between">
                <span className="text-[13px] font-medium text-[#0400F5]">0{i + 1}</span>
                <div className="mt-8">
                  <h3 className="text-[20px] font-medium text-gray-900 tracking-[-0.01em]">{t(e.name)}</h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">{t(e.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-[32px] bg-gray-50 px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900 max-w-xl leading-[1.1]">
              {t('See it running on your own stores.')}
            </h2>
            <RollButton label={t('Book a demo')} variant="orange" size="hero" onClick={() => goToConnect('Book an Eotra Demo')} />
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
