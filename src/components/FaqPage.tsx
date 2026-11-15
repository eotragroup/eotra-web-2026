import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What does Eotra do?',
    a: 'We design and build software for retail and commerce: web and mobile apps, e-commerce, APIs, and unified POS, WMS, ERP and CRM systems.',
  },
  {
    q: 'Which services do you offer?',
    a: 'Custom web apps, mobile development, UI / UX and product design, e-commerce builds, backend and APIs, cloud and DevOps, internal tools and ERP, and QA with dedicated teams.',
  },
  {
    q: 'How does a project start?',
    a: 'Tell us about your project through the contact form or at info@eotra.com. We reply, scope the work together, and send you a quote with a clear timeline.',
  },
  {
    q: 'How much does it cost?',
    a: 'Every project is scoped on its own, so there is no fixed price list. Request a quote and we will come back with a price based on what you need.',
  },
  {
    q: 'Do you work with clients outside Türkiye?',
    a: 'Yes. We are based in Istanbul and work with clients in several countries. Our platforms support English, Arabic and Turkish, and local payment methods.',
  },
  {
    q: 'Can your POS work offline?',
    a: 'Yes. Our POS is built offline-first, so stores keep selling when the connection drops and everything syncs when it returns.',
  },
  {
    q: 'Can you connect to the systems we already use?',
    a: 'Yes. We build APIs and integrations for existing ERP, payment, delivery and inventory systems, so you do not have to start over.',
  },
  {
    q: 'Do you support us after launch?',
    a: 'Yes. We offer testing, monitoring and long-term support, including dedicated engineering teams on a retainer.',
  },
];

interface FaqPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

export function FaqPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: FaqPageProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900">
              FAQ
            </h1>
            <div className="mt-8">
              <RollButton
                label="Ask us anything"
                variant="orange"
                size="hero"
                onClick={() => onOpenInquiry('Question for Eotra')}
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-2.5">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className={`rounded-3xl px-5 sm:px-7 transition-colors duration-300 ${isOpen ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left cursor-pointer group"
                  >
                    <span className="text-[17px] sm:text-[20px] font-medium tracking-[-0.01em] text-gray-900 group-hover:text-[#0400F5] transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-gray-900 text-white rotate-45' : 'bg-white text-gray-900'
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-[15px] sm:text-[16px] text-gray-600 leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
