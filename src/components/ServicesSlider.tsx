import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { animate, motion, useMotionValue, type PanInfo } from 'motion/react';
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
  const { t, isRtl } = useI18n();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // distance from one card to the next (card width + gap)
  const [maxOffset, setMaxOffset] = useState(0); // how far the track can move
  const movedRef = useRef(false); // a drag happened, so the click that follows must not open a service
  const n = EOTRA_SERVICES.length;

  // Measure the cards and the visible width; re-measure on resize
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport || !track.children[0]) return;
      const first = track.children[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      setStep(first.offsetWidth + gap);
      setMaxOffset(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Where the track must sit to show card i. In Arabic the track starts on the right, so it moves the other way.
  const positionOf = (i: number) => (isRtl ? i * step : -i * step);

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goTo = (i: number) => {
    const target = Math.min(n - 1, Math.max(0, i));
    const to = Math.max(isRtl ? 0 : -maxOffset, Math.min(isRtl ? maxOffset : 0, positionOf(target)));
    setIndex(target);
    animate(x, to, reduced() ? { duration: 0.2 } : { type: 'spring', stiffness: 380, damping: 42, mass: 0.9 });
  };

  // Snap to the nearest card when the drag ends, taking the throw speed into account
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 6) setTimeout(() => (movedRef.current = false), 0);
    const projected = x.get() + info.velocity.x * 0.18;
    const nearest = Math.round(Math.abs(projected) / (step || 1));
    goTo(nearest);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === nextKey) goTo(index + 1);
    if (e.key === prevKey) goTo(index - 1);
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
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label={t('Previous services')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm text-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index >= n - 1}
              aria-label={t('Next services')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm text-gray-900 hover:bg-[#0400F5] hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Framer Motion carousel: drag or swipe, arrows, dots. Keyboard arrows work when a card has focus. */}
      <div
        ref={viewportRef}
        role="region"
        aria-label={t('Eotra Services Slider')}
        data-lenis-prevent
        onKeyDown={onKeyDown}
        className="overflow-hidden pb-2"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={isRtl ? { left: 0, right: maxOffset } : { left: -maxOffset, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => (movedRef.current = true)}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="flex w-max gap-5 sm:gap-6 pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] pr-5 sm:pr-8 lg:pr-12 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        >
          {EOTRA_SERVICES.map((service) => {
            return (
              <article
                key={service.index}
                tabIndex={0}
                role="link"
                onPointerDown={() => (movedRef.current = false)}
                onClick={() => {
                  if (movedRef.current) return;
                  goToService(service.slug);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') goToService(service.slug);
                }}
                aria-label={t(service.title)}
                draggable={false}
                className="group relative shrink-0 w-[78vw] sm:w-[320px] md:w-[330px] lg:w-[340px] xl:w-[355px] aspect-[4/5] rounded-3xl overflow-hidden bg-gray-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0400F5]"
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
                        if (movedRef.current) return;
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
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mt-6 flex items-center gap-2" role="tablist" aria-label={t('Service slide navigation')}>
          {EOTRA_SERVICES.map((service, idx) => {
            const isActive = idx === index;
            return (
              <button
                key={service.index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${t('Jump to')} ${t(service.title)}`}
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-8 bg-[#0400F5]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
