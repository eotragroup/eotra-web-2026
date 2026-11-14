import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Code2,
  Database,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import webAppsImg from '../assets/images/agency_web_apps_1794584483920.jpg';
import mobileDevImg from '../assets/images/agency_mobile_dev_1794584483437.jpg';
import uiUxImg from '../assets/images/agency_ui_ux_design_men_1794584626063.jpg';
import ecommerceImg from '../assets/images/agency_ecommerce_dev_1794584484166.jpg';
import backendApiImg from '../assets/images/agency_backend_api_1794584484837.jpg';
import cloudDevopsImg from '../assets/images/agency_cloud_devops_men_1794584626260.jpg';
import dashboardsImg from '../assets/images/agency_enterprise_dashboards_1794584485278.jpg';
import qaSupportImg from '../assets/images/agency_qa_maintenance_men_1794584627021.jpg';

interface ServiceItem {
  index: string;
  category: string;
  title: string;
  description: string;
  deliverables: string;
  image: string;
  imageAlt: string;
  icon: typeof Code2;
}

const EOTRA_SERVICES: ServiceItem[] = [
  {
    index: '01.',
    category: 'Web Engineering',
    title: 'Custom Web Apps',
    description: 'Full-stack SaaS, portals, and modern frontends.',
    deliverables: 'Web Apps',
    image: webAppsImg,
    imageAlt: 'Laptop displaying modern web application UI and code editor',
    icon: Code2,
  },
  {
    index: '02.',
    category: 'Mobile',
    title: 'Mobile Development',
    description: 'Native and cross-platform iOS & Android apps.',
    deliverables: 'iOS & Android',
    image: mobileDevImg,
    imageAlt: 'Smartphone showing clean minimalist mobile application UI',
    icon: Smartphone,
  },
  {
    index: '03.',
    category: 'Design',
    title: 'UI / UX & Product Design',
    description: 'Design systems, prototypes, and user flows.',
    deliverables: 'Product Design',
    image: uiUxImg,
    imageAlt: 'Product designer crafting interface components and typography grids',
    icon: Layers,
  },
  {
    index: '04.',
    category: 'Commerce',
    title: 'E-Commerce Builds',
    description: 'Custom storefronts, carts, and local wallets.',
    deliverables: 'E-Commerce',
    image: ecommerceImg,
    imageAlt: 'Digital commerce storefront tablet next to curated retail goods',
    icon: ShoppingBag,
  },
  {
    index: '05.',
    category: 'Backend',
    title: 'Backend & APIs',
    description: 'Scalable REST APIs, databases, and integrations.',
    deliverables: 'API Architecture',
    image: backendApiImg,
    imageAlt: 'Developer workspace showing backend code and database schemas',
    icon: Database,
  },
  {
    index: '06.',
    category: 'Infrastructure',
    title: 'Cloud & DevOps',
    description: 'CI/CD pipelines, containers, and global scaling.',
    deliverables: 'Cloud & DevOps',
    image: cloudDevopsImg,
    imageAlt: 'Software engineering team monitoring live cloud deployment pipeline',
    icon: Cloud,
  },
  {
    index: '07.',
    category: 'Systems',
    title: 'Internal Tools & ERP',
    description: 'Custom dashboards, POS, CRM, and workflows.',
    deliverables: 'Business Systems',
    image: dashboardsImg,
    imageAlt: 'Widescreen display presenting operational analytics and KPI charts',
    icon: LayoutDashboard,
  },
  {
    index: '08.',
    category: 'Lifecycle',
    title: 'QA & Dedicated Teams',
    description: 'Automated testing, monitoring, and long-term support.',
    deliverables: 'QA & Retainers',
    image: qaSupportImg,
    imageAlt: 'Engineers reviewing automated test results together on a laptop',
    icon: ShieldCheck,
  },
];

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState<string | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 8);

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const baseOffset = cards[0].offsetLeft;
    let closestIdx = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const distance = Math.abs(card.offsetLeft - baseOffset - scrollLeft);
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
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.children[0] as HTMLElement | undefined;
    const targetCard = track.children[index] as HTMLElement | undefined;
    if (!firstCard || !targetCard) return;
    track.scrollTo({
      left: targetCard.offsetLeft - firstCard.offsetLeft,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="services"
      className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Badge Row */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
            3
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium text-gray-900 border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Our Services
          </span>
        </div>

        {/* Header + Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-[clamp(1.6rem,3.8vw,3rem)] font-medium leading-[1.1] tracking-[-0.025em] text-gray-900 max-w-2xl text-balance">
              End-to-end software services built by our{' '}
              <span className="text-[#0400F5]">
                <TypewriterText
                  words={[
                    'engineering team.',
                    'senior builders.',
                    'in-house developers.',
                    'expert founders.',
                  ]}
                />
              </span>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-600 mt-4 max-w-xl leading-relaxed">
              From custom web and mobile apps to product design, APIs, and
              dedicated engineering—everything modern software teams ship.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[13px] font-medium text-gray-500 tabular-nums mr-2">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(EOTRA_SERVICES.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous services"
              className="w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Next services"
              className="w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-900 hover:border-[#0400F5] hover:bg-[#0400F5] hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
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
        aria-label="Eotra Services Slider"
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2 pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] pr-5 sm:pr-8 lg:pr-12 scroll-pl-5 sm:scroll-pl-8 lg:scroll-pl-[max(3rem,calc((100vw-1440px)/2+3rem))]"
      >
        {EOTRA_SERVICES.map((service) => {
          const isRevealed = revealedIndex === service.index;
          return (
            <article
              key={service.index}
              tabIndex={0}
              onClick={() =>
                setRevealedIndex((prev) =>
                  prev === service.index ? null : service.index
                )
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setRevealedIndex((prev) =>
                    prev === service.index ? null : service.index
                  );
                }
              }}
              aria-label={service.title}
              className="group relative snap-start shrink-0 w-[78vw] sm:w-[320px] md:w-[330px] lg:w-[340px] xl:w-[355px] aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200/80 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0400F5]"
            >
              <ServiceCardImage
                src={service.image}
                alt={service.imageAlt}
                title={service.title}
                icon={service.icon}
              />

              {/* Minimal Hover / Focus / Tap Text Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-7 transition-opacity duration-300 ease-out ${
                  isRevealed
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                }`}
              >
                <div
                  className={`flex items-end justify-between gap-4 transition-transform duration-300 ease-out ${
                    isRevealed
                      ? 'translate-y-0'
                      : 'translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0'
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-[-0.015em]">
                      {service.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-white/80 mt-1 line-clamp-1">
                      {service.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Request ${service.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInquiry(`Service Inquiry: ${service.title}`);
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
          aria-label="Service slide navigation"
        >
          {EOTRA_SERVICES.map((service, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={service.index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to ${service.title}`}
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
