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
      <div className="relative isolate overflow-hidden bg-[#F5F5F7]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Kept to the left and the far edges, so nothing bright sits behind the form card */}
          <div className="connect-orb absolute top-[22%] left-[-14%] w-[560px] h-[560px] rounded-full bg-[#0400F5]/15 blur-[120px]" />
          <div className="connect-orb connect-orb-b absolute bottom-[-6%] left-[12%] w-[440px] h-[440px] rounded-full bg-violet-400/20 blur-[120px]" />
          <div className="connect-orb absolute top-[4%] right-[-16%] w-[420px] h-[420px] rounded-full bg-sky-300/30 blur-[120px]" />
          <div className="connect-orb connect-orb-b absolute top-[30%] left-[22%] w-[380px] h-[380px] rounded-full bg-indigo-300/20 blur-[110px]" />
        </div>

        <section className="relative flex flex-col">
          <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
        </section>

        <section className="pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900">
                Connect
              </h1>
              <p className="mt-6 text-[15px] sm:text-[17px] text-gray-500 leading-relaxed max-w-sm">
                Tell us what you need. We reply within one business day.
              </p>
              <a href="mailto:info@eotra.com" className="mt-6 inline-block text-[15px] font-medium text-gray-900 hover:text-gray-500 transition-colors">
                info@eotra.com
              </a>

              <div className="mt-10 lg:mt-14 flex flex-wrap items-center gap-x-9 gap-y-7 max-w-md">
                {BRANDS.map((b) => (
                  <img
                    key={b.name}
                    src={b.src}
                    alt={b.name}
                    loading="lazy"
                    className={`${b.h} w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity duration-300`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Frosted-glass card */}
              <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl backdrop-saturate-150 p-6 sm:p-8 lg:p-10 max-w-2xl">
                <InquiryForm subject="Connect with Eotra" onClose={() => onNavigateHome()} showClose={false} doneLabel="Back to home" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer
        onNavigateHome={() => onNavigateHome()}
        onOpenInquiry={onOpenInquiry}
        onNavigateToProduct={(id) => onSelectProduct?.(id)}
        onNavigateToTeam={onNavigateToTeam}
      />
    </div>
  );
}
