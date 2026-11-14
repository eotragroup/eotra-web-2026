import {
  ShoppingCart,
  Warehouse,
  Receipt,
  Users,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface Capability {
  index: string;
  title: string;
}

interface CardStyle {
  card: string;
  index: string;
  chip: string;
  tile: string;
  tileIcon: string;
  items: { label: string; Icon: LucideIcon }[];
  Icon: LucideIcon;
  btn: string;
  btnIcon: string;
}

// One quiet visual per capability: a big icon tile + the systems it connects
const STYLES: CardStyle[] = [
  {
    card: 'bg-gray-950 text-white',
    index: 'text-white/40',
    chip: 'bg-white/10 border-white/20 text-white',
    tile: 'bg-white',
    tileIcon: '#0400F5',
    Icon: ShoppingCart,
    btn: 'bg-[#0400F5] text-white hover:bg-[#0300cc]',
    btnIcon: 'bg-white text-[#0400F5]',
    items: [{ label: 'POS', Icon: ShoppingCart }],
  },
  {
    card: 'bg-[#0400F5] text-white',
    index: 'text-white/50',
    chip: 'bg-white/15 border-white/30 text-white',
    tile: 'bg-white',
    tileIcon: '#0400F5',
    Icon: Warehouse,
    btn: 'bg-white text-gray-900 hover:bg-gray-100',
    btnIcon: 'bg-[#0400F5] text-white',
    items: [
      { label: 'WMS', Icon: Warehouse },
      { label: 'ERP', Icon: Receipt },
    ],
  },
  {
    card: 'bg-white text-gray-900 border border-gray-200',
    index: 'text-gray-400',
    chip: 'bg-gray-100 border-gray-200 text-gray-900',
    tile: 'bg-gray-950',
    tileIcon: '#ffffff',
    Icon: Users,
    btn: 'bg-gray-950 text-white hover:bg-gray-800',
    btnIcon: 'bg-white text-gray-950',
    items: [
      { label: 'CRM', Icon: Users },
      { label: 'Analytics', Icon: BarChart3 },
    ],
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
            {/* Mobile: icon, number, title + button, systems. Desktop: number / systems on top, title / icon below */}
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_1fr] gap-y-6 md:gap-y-10 md:gap-x-8 p-6 sm:p-10 lg:p-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
              {/* Big icon tile (top on phones, bottom-right on desktop) */}
              <div
                className={`order-1 md:order-none md:col-span-5 md:col-start-8 md:row-start-2 md:self-end md:justify-self-end w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-[24px] lg:rounded-[36px] flex items-center justify-center shadow-xl ${st.tile}`}
              >
                <st.Icon
                  strokeWidth={1.5}
                  color={st.tileIcon}
                  className="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                />
              </div>

              {/* Number */}
              <span className={`order-2 md:order-none md:col-span-7 md:row-start-1 text-[13px] sm:text-[14px] font-semibold tabular-nums ${st.index}`}>
                {cap.index} <span className="opacity-60">/ 0{capabilities.length}</span>
              </span>

              {/* Title + button */}
              <div className="order-3 md:order-none md:col-span-7 md:row-start-2 md:self-end">
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

              {/* Connected systems */}
              <div className="order-4 md:order-none md:col-span-5 md:col-start-8 md:row-start-1 flex flex-wrap gap-2 md:justify-end md:content-start">
                {st.items.map(({ label, Icon }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-[12px] sm:text-[13px] font-medium ${st.chip}`}
                  >
                    <Icon size={14} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
