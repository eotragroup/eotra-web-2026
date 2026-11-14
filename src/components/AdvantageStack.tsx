import posImg from '../assets/advantage/pos.jpg';
import wmsImg from '../assets/advantage/wms.jpg';
import crmImg from '../assets/advantage/crm.jpg';
import { ArrowRight } from 'lucide-react';

interface Capability {
  index: string;
  title: string;
}

interface CardStyle {
  card: string;
  index: string;
  chip: string;
  items: string[];
  btn: string;
  btnIcon: string;
  image: string;
  imageAlt: string;
}

// One picture per capability
const STYLES: CardStyle[] = [
  {
    card: 'bg-gray-950 text-white',
    index: 'text-white/40',
    chip: 'bg-white/10 border-white/20 text-white',
    items: ['POS'],
    btn: 'bg-[#0400F5] text-white hover:bg-[#0300cc]',
    btnIcon: 'bg-white text-[#0400F5]',
    image: posImg,
    imageAlt: 'Cashier using a point of sale terminal in a store',
  },
  {
    card: 'bg-[#0400F5] text-white',
    index: 'text-white/50',
    chip: 'bg-white/15 border-white/30 text-white',
    items: ['WMS', 'ERP'],
    btn: 'bg-white text-gray-900 hover:bg-gray-100',
    btnIcon: 'bg-[#0400F5] text-white',
    image: wmsImg,
    imageAlt: 'Warehouse aisles with live inventory scanning',
  },
  {
    card: 'bg-white text-gray-900 border border-gray-200',
    index: 'text-gray-400',
    chip: 'bg-gray-100 border-gray-200 text-gray-900',
    items: ['CRM', 'Analytics'],
    btn: 'bg-gray-950 text-white hover:bg-gray-800',
    btnIcon: 'bg-white text-gray-950',
    image: crmImg,
    imageAlt: 'Store team meeting a loyalty customer',
  },
];

export function AdvantageStack({
  capabilities,
  onOpenInquiry,
}: {
  capabilities: Capability[];
  onOpenInquiry: (subject?: string) => void;
}) {
  return (
    <div className="relative">
      {capabilities.map((cap, i) => {
        const st = STYLES[i % STYLES.length];
        return (
          <div
            key={cap.index}
            className={`sticky rounded-2xl overflow-hidden mb-6 sm:mb-10 last:mb-0 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] ${st.card}`}
            style={{ top: `calc(88px + ${i} * 18px)` }}
          >
            {/* Mobile: picture, number, title + button. Desktop: number top-left, title bottom-left, picture on the right */}
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_1fr] gap-y-6 md:gap-y-10 md:gap-x-8 p-6 sm:p-10 lg:p-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
              {/* Picture (top on phones, right side on desktop) */}
              <div className="order-1 md:order-none md:col-span-5 md:col-start-8 md:row-start-1 md:row-span-2 relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                <img
                  src={st.image}
                  alt={st.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Number */}
              <span className={`order-3 md:order-none md:col-start-1 md:col-span-7 md:row-start-1 text-[13px] sm:text-[14px] font-semibold tabular-nums ${st.index}`}>
                {cap.index} <span className="opacity-60">/ 0{capabilities.length}</span>
              </span>

              {/* Title + button */}
              <div className="order-4 md:order-none md:col-start-1 md:col-span-7 md:row-start-2 md:self-end">
                <div className="flex flex-wrap gap-2 mb-4">
                  {st.items.map((label) => (
                    <span
                      key={label}
                      className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[12px] sm:text-[13px] font-medium ${st.chip}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <h3 className="text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] max-w-xl">
                  {cap.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onOpenInquiry(`Inquiry: ${cap.title}`)}
                  className={`mt-6 inline-flex items-center gap-2 pl-5 pr-1.5 h-11 rounded-full text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer ${st.btn}`}
                >
                  <span>Request quote</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${st.btnIcon}`}>
                    <ArrowRight size={15} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
