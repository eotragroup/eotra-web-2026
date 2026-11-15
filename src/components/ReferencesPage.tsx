import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';
import { ProductsGrid } from './ProductsGrid';
import { PRODUCTS } from '../data/products';
import { goToConnect } from '../lib/nav';

interface PageProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

export function ReferencesPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900">
            {PRODUCTS.length} live projects
          </span>
          <h1 className="mt-6 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900 max-w-4xl">
            References
          </h1>
          <p className="mt-6 text-[16px] sm:text-[19px] text-gray-500 leading-relaxed max-w-2xl">
            Brands that run on what we build. Open any project to see what we made and how it works.
          </p>
        </div>
      </section>

      <section className="bg-[#F5F5F5] pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <ProductsGrid products={PRODUCTS} onOpenProduct={(id) => onSelectProduct?.(id)} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-[32px] bg-gray-50 px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.02em] text-gray-900 max-w-xl leading-[1.1]">
              Want to be our next reference?
            </h2>
            <RollButton label="Start a project" variant="orange" size="hero" onClick={() => goToConnect('Book an Eotra Demo')} />
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
