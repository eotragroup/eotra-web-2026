import React from 'react';
import { useI18n } from '../i18n';

interface PartnerBrand {
  name: string;
  viewBox: string;
  path: string;
}

const PARTNER_BRANDS: PartnerBrand[] = [];

interface PartnersMarqueeProps {
  onOpenInquiry?: (subject?: string) => void;
  className?: string;
}

export function PartnersMarquee({ className = '' }: PartnersMarqueeProps) {
  const { t } = useI18n();
  return (
    <div
      id="partners"
      dir="ltr"
      className={`relative w-full bg-white py-6 sm:py-8 overflow-hidden select-none ${className}`}
    >
      {/* Animated Brand Logo Slider (White BG, No Card Borders, Pure Logos) */}
      <div className="relative eotra-marquee-wrapper">
        {/* Soft Left & Right Edge Fades into White */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"
        />

        <div
          className="overflow-hidden"
          role="region"
          aria-label={t('Partner brands logo slider')}
        >
          <div className="animate-eotra-marquee gap-8 sm:gap-14 px-4 items-center">
            {[0, 1].map((dupIndex) => (
              <div
                key={dupIndex}
                aria-hidden={dupIndex === 1}
                className="flex items-center gap-8 sm:gap-14 shrink-0"
              >
                {/* Alternating partner brand logos, repeated 2× per track */}
                {[0, 1].map((i) => (
                  <React.Fragment key={`pair-${dupIndex}-${i}`}>
                    <div title="Eotra Menu" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/eotra-menu-logo.svg" alt="Eotra Menu" className="h-7 sm:h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                    <div title="Jamjoom Pharmacy Group" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/aistudio/jamjoom_english--logo231313_aec5cb31.png" alt="Jamjoom Pharmacy Group" className="h-7 sm:h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                    <div title="Dosur" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/dosur-logo.svg" alt="Dosur" className="h-7 sm:h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                    <div title="NEOSHE" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/neoshe-logo.png" alt="NEOSHE" className="h-5 sm:h-6 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                    <div title="IBOSH STORE" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/ibosh-logo.png" alt="IBOSH STORE" className="h-6 sm:h-7 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                    <div title="Lidya&Co" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/lidya-logo.svg" alt="Lidya&Co" className="h-6 sm:h-7 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                    <div title="TradesPilot AI" className="group px-4 py-2 flex items-center justify-center opacity-65 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <img src="/assets/tradespilot-logo.svg" alt="TradesPilot AI" className="h-7 sm:h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
