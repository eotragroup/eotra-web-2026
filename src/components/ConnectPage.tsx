import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InquiryForm } from './InquiryModal';

// Same brand logos as the homepage strip
const BRANDS = [
  { name: 'Eotra Menu', src: '/assets/eotra-menu-logo.svg', h: 'h-8' },
  { name: 'Jamjoom Pharmacy Group', src: '/assets/aistudio/jamjoom_english--logo231313_aec5cb31.png', h: 'h-8' },
  { name: 'Dosur', src: '/assets/dosur-logo.svg', h: 'h-8' },
  { name: 'NEOSHE', src: '/assets/neoshe-logo.png', h: 'h-6' },
  { name: 'IBOSH STORE', src: '/assets/ibosh-logo.png', h: 'h-7' },
  { name: 'Lidya&Co', src: '/assets/lidya-logo.svg', h: 'h-12' },
  { name: 'TradesPilot AI', src: '/assets/tradespilot-logo.svg', h: 'h-10' },
];

interface ConnectPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

export function ConnectPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: ConnectPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900">
              Connect
            </h1>
            <p className="mt-6 text-[15px] sm:text-[17px] text-gray-600 leading-relaxed max-w-sm">
              Tell us what you need. We reply within one business day.
            </p>
            <a href="mailto:info@eotra.com" className="mt-6 inline-block text-[15px] font-medium text-gray-900 hover:text-[#0400F5] transition-colors">
              info@eotra.com
            </a>

            <div className="mt-10 lg:mt-14 flex flex-wrap items-center gap-x-9 gap-y-7 max-w-md">
              {BRANDS.map((b) => (
                <img
                  key={b.name}
                  src={b.src}
                  alt={b.name}
                  loading="lazy"
                  className={`${b.h} w-auto object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 max-w-2xl">
              <InquiryForm subject="Connect with Eotra" onClose={() => onNavigateHome()} showClose={false} doneLabel="Back to home" />
            </div>
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
