import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';

interface PageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

export function NotFoundPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>
      <section className="flex-1 bg-white pt-16 sm:pt-24 pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900">
            Error 404
          </span>
          <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900">
            Page not found
          </h1>
          <p className="mt-5 text-[16px] sm:text-[19px] text-gray-500 leading-relaxed max-w-lg">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-8">
            <RollButton label="Back to home" variant="orange" size="hero" onClick={() => onNavigateHome()} />
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
