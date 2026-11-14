import {
  ShoppingCart,
  Warehouse,
  Receipt,
  Users,
  BarChart3,
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
    items: [{ label: 'POS', Icon: ShoppingCart }],
  },
  {
    card: 'bg-[#0400F5] text-white',
    index: 'text-white/50',
    chip: 'bg-white/15 border-white/30 text-white',
    tile: 'bg-white',
    tileIcon: '#0400F5',
    Icon: Warehouse,
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
    items: [
      { label: 'CRM', Icon: Users },
      { label: 'Analytics', Icon: BarChart3 },
    ],
  },
];

export function AdvantageStack({ capabilities }: { capabilities: Capability[] }) {
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
              {/* Left: number + title */}
              <div className="md:col-span-7 flex flex-col justify-between gap-10">
                <span className={`text-[13px] sm:text-[14px] font-semibold tabular-nums ${st.index}`}>
                  {cap.index} <span className="opacity-60">/ 0{capabilities.length}</span>
                </span>
                <h3 className="text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] max-w-xl">
                  {cap.title}
                </h3>
              </div>

              {/* Right: icon tile + connected systems */}
              <div className="md:col-span-5 flex flex-col items-start md:items-end justify-between gap-8">
                <div className="flex flex-wrap gap-2 md:justify-end">
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
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-[28px] lg:rounded-[36px] flex items-center justify-center shadow-xl ${st.tile}`}
                >
                  <st.Icon
                    strokeWidth={1.5}
                    color={st.tileIcon}
                    className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
