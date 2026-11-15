import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollRevealText } from './ScrollRevealText';
import { SERVICES as EOTRA_SERVICES } from '../data/services';
import { goToService } from '../lib/nav';
import { useI18n } from '../i18n';
import type { Code2 } from 'lucide-react';

function ServiceCardImage({
  src,
  alt,
  title,
  icon: Icon,
}: {
  src: string;
  alt: string;
  title: string;
  icon: typeof Code2;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-2 text-gray-500 p-6">
        <Icon size={28} strokeWidth={1.6} />
        <span className="text-[13px] font-medium text-gray-700 text-center">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />
  );
}

interface ServicesSliderProps {
  onOpenInquiry: (subject?: string) => void;
}

export function ServicesSlider({ onOpenInquiry }: ServicesSliderProps) {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const rtl = getComputedStyle(track).direction === 'rtl';
    const { scrollWidth, clientWidth } = track;
    // How far the track has moved from its start (right side in Arabic, where scrollLeft is negative)
    const scrolled = rtl ? -track.scrollLeft : track.scrollLeft;
    setCanScrollPrev(scrolled > 8);
    setCanScrollNext(scrolled + clientWidth < scrollWidth - 8);

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const startOf = (c: HTMLElement) => (rtl ? cards[0].offsetLeft + cards[0].offsetWidth - (c.offsetLeft + c.offsetWidth) : c.offsetLeft - cards[0].offsetLeft);
    let closestIdx = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const distance = Math.abs(startOf(card) - scrolled);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const gapValue = parseFloat(getComputedStyle(track).columnGap || '24') || 24;
    const step = firstCard ? firstCard.offsetWidth + gapValue : 360;
    const rtl = getComputedStyle(track).direction === 'rtl';
    track.scrollBy({ left: (rtl ? -1 : 1) * direction * step, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.children[0] as HTMLElement | undefined;
    const targetCard = track.children[index] as HTMLElement | undefined;
    if (!firstCard || !targetCard) return;
    const rtl = getComputedStyle(track).direction === 'rtl';
    const offset = rtl
      ? firstCard.offsetLeft + firstCard.offsetWidth - (targetCard.offsetLeft + targetCard.offsetWidth)
      : targetCard.offsetLeft - firstCard.offsetLeft;
    track.scrollTo({ left: rtl ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header + Controls */}
        <div className="flex flex-row items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <ScrollRevealText
              as="h2"
              text={t('Our Services')}
              className="text-[clamp(1.6rem,3.8vw,3rem)] text-gray-900 max-w-2xl text-balance"
              start="top 85%"
              end="bottom 55%"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label={t('Previous services')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm text-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label={t('Next services')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm text-gray-900 hover:bg-[#0400F5] hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Bleed Horizontal Slider Cards — 4+ Tall Cards in View */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        role="region"
        aria-label={t('Eotra Services Slider')}
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2 pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] pr-5 sm:pr-8 lg:pr-12 scroll-pl-5 sm:scroll-pl-8 lg:scroll-pl-[max(3rem,calc((100vw-1440px)/2+3rem))]"
      >
        {EOTRA_SERVICES.map((service) => {
          return (
            <article
              key={service.index}
              tabIndex={0}
              role="link"
              onClick={() => goToService(service.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') goToService(service.slug);
              }}
              aria-label={t(service.title)}
              className="group relative snap-start shrink-0 w-[78vw] sm:w-[320px] md:w-[330px] lg:w-[340px] xl:w-[355px] aspect-[4/5] rounded-3xl overflow-hidden bg-gray-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0400F5]"
            >
              <ServiceCardImage
                src={service.image}
                alt={t(service.imageAlt)}
                title={t(service.title)}
                icon={service.icon}
              />

              {/* Title + arrow, always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-[-0.015em]">
                      {t(service.title)}
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label={`${t('Open')} ${t(service.title)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToService(service.slug);
                    }}
                    className="w-10 h-10 rounded-full bg-[#0400F5] hover:bg-[#0300cc] text-white inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Clickable Slide Step Indicators */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div
          className="mt-6 flex items-center gap-2"
          role="tablist"
          aria-label={t('Service slide navigation')}
        >
          {EOTRA_SERVICES.map((service, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={service.index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${t('Jump to')} ${t(service.title)}`}
                onClick={() => scrollToIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 bg-[#0400F5]'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
