import { useEffect } from 'react';
import { Code2, Handshake, Layers, Rocket, ShieldCheck, Users } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';
import { useI18n } from '../i18n';
import { RevealWords } from './RevealWords';
import { usePageAnimations } from '../lib/pageAnimations';
import { goToConnect } from '../lib/nav';

interface PageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

const WHY = [
  { icon: Rocket, title: 'Real ownership', text: 'We are a small team. What you build ships to real clients, and you own it from idea to launch.' },
  { icon: Users, title: 'Work with the founders', text: 'No layers. You work directly with the people who started Eotra and decide the direction.' },
  { icon: Handshake, title: 'Grow with us', text: 'We are early. As the company grows, your role and your impact grow with it.' },
];

const ROLES = [
  { icon: Code2, title: 'Software engineers', text: 'Web, mobile and backend, for retail and commerce products.' },
  { icon: Layers, title: 'Product designers', text: 'Clear, minimal interfaces and design systems.' },
  { icon: ShieldCheck, title: 'QA and DevOps', text: 'Testing, releases and reliable infrastructure.' },
  { icon: Handshake, title: 'Sales and customer success', text: 'Help brands choose Eotra and succeed with it.' },
];

export function CareersPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: PageProps) {
  const { t } = useI18n();
  usePageAnimations();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const apply = () => goToConnect('Careers at Eotra');

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900">
            {t('Careers')}
          </span>
          <h1 className="mt-6 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900 max-w-4xl"><RevealWords text={t('Build the future of retail with us.')} /></h1>
          <p className="mt-6 text-[16px] sm:text-[19px] text-gray-500 leading-relaxed max-w-2xl">
            {t('Eotra is a small, founder-led startup. We do not have a fixed list of openings: if you are good at what you do and want to build real products, we would like to meet you.')}
          </p>
          <div className="mt-8">
            <RollButton label={t('Send your CV')} variant="orange" size="hero" onClick={apply} />
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900">{t('Why join Eotra')}</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-gray-50 p-6 sm:p-8 min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div className="mt-8">
                  <h3 className="text-[19px] font-medium text-gray-900 tracking-[-0.01em]">{t(title)}</h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">{t(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900">{t('Who we would love to meet')}</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ROLES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-white p-6 min-h-[180px] flex flex-col gap-10">
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[16px] font-medium text-gray-900 tracking-[-0.01em]">{t(title)}</h3>
                  <p className="mt-1 text-[13px] text-gray-500 leading-snug">{t(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-[32px] bg-gray-50 px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900 leading-[1.1]">
                {t('Do not see your role? Tell us anyway.')}
              </h2>
              <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">{t('Send a short note about yourself, your CV or a link to your work.')}</p>
            </div>
            <RollButton label={t('Send your CV')} variant="orange" size="hero" onClick={apply} />
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
