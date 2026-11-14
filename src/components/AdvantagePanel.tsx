import {
  ShoppingCart,
  Warehouse,
  Receipt,
  Users,
  BarChart3,
  Layers,
} from 'lucide-react';

interface Capability {
  index: string;
  title: string;
  description: string;
}

// offsets (px, desktop) from the core's center where each system starts
const CHIPS = [
  { label: 'POS', Icon: ShoppingCart, x: -190, y: -120 },
  { label: 'WMS', Icon: Warehouse, x: 170, y: -130 },
  { label: 'ERP', Icon: Receipt, x: 215, y: 60 },
  { label: 'CRM', Icon: Users, x: -215, y: 95 },
  { label: 'Analytics', Icon: BarChart3, x: 20, y: 160 },
];

export function AdvantagePanel({ capabilities }: { capabilities: Capability[] }) {
  return (
    <div
      className="adv-panel relative w-full overflow-hidden rounded-2xl bg-gray-950 grid grid-cols-1 md:grid-cols-12"
      role="img"
      aria-label="Five separate systems merging into one Eotra core"
    >
      <style>{`
        .adv-panel { --k: 0.58; }
        @media (min-width: 768px) { .adv-panel { --k: 1; } }

        @keyframes adv-merge {
          0%, 28%   { transform: translate(calc(var(--x) * var(--k)), calc(var(--y) * var(--k))) scale(1); opacity: 1; }
          55%       { transform: translate(0, 0) scale(0.35); opacity: 0; }
          90%       { transform: translate(0, 0) scale(0.35); opacity: 0; }
          90.01%    { transform: translate(calc(var(--x) * var(--k)), calc(var(--y) * var(--k))) scale(1); opacity: 0; }
          100%      { transform: translate(calc(var(--x) * var(--k)), calc(var(--y) * var(--k))) scale(1); opacity: 1; }
        }
        @keyframes adv-line {
          0%, 28%   { opacity: 0.35; transform: scaleX(1); }
          55%, 90%  { opacity: 0; transform: scaleX(0); }
          100%      { opacity: 0.35; transform: scaleX(1); }
        }
        @keyframes adv-core {
          0%, 28%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(4,0,245,0.0); }
          55%       { transform: scale(1.14); box-shadow: 0 0 0 16px rgba(255,255,255,0.08), 0 0 0 36px rgba(255,255,255,0.04); }
          85%       { transform: scale(1.14); box-shadow: 0 0 0 16px rgba(255,255,255,0.08), 0 0 0 36px rgba(255,255,255,0.04); }
          100%      { transform: scale(1); box-shadow: 0 0 0 0 rgba(4,0,245,0.0); }
        }
        .adv-chip { animation: adv-merge 9s cubic-bezier(.65,0,.35,1) infinite; }
        .adv-core { animation: adv-core 9s cubic-bezier(.65,0,.35,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .adv-chip, .adv-core { animation: none; }
          .adv-chip { opacity: 0; }
        }
      `}</style>

      {/* soft brand glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(4,0,245,0.5),transparent_62%)]" />

      {/* Left: three capabilities, quiet and typographic */}
      <div className="relative z-10 md:col-span-5 p-6 sm:p-10 flex flex-col justify-end gap-6 md:min-h-[460px]">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {capabilities.map((cap) => (
            <li key={cap.index} className="py-4 flex items-baseline gap-4">
              <span className="text-[12px] font-semibold text-white/40 tabular-nums shrink-0">
                {cap.index}
              </span>
              <span className="text-white text-[15px] sm:text-[17px] font-medium tracking-[-0.01em] leading-snug">
                {cap.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: five systems merge into one core */}
      <div className="relative md:col-span-7 h-[280px] md:h-auto md:min-h-[460px]">
        {CHIPS.map((c) => (
          <div
            key={`line-${c.label}`}
            className="absolute left-1/2 top-1/2 h-px origin-left"
            style={{
              width: `max(0px, calc(${Math.hypot(c.x, c.y)}px * var(--k) - 100px))`,
              transform: `rotate(${Math.atan2(c.y, c.x)}rad) translateX(56px)`,
            }}
            aria-hidden="true"
          >
            <div
              className="h-full w-full bg-white/60 origin-left"
              style={{ animation: 'adv-line 9s cubic-bezier(.65,0,.35,1) infinite' }}
            />
          </div>
        ))}

        <div className="adv-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] md:w-[104px] md:h-[104px] rounded-full bg-white flex flex-col items-center justify-center">
          <Layers size={22} color="#0400F5" />
          <span className="mt-1 text-[10px] md:text-[11px] font-semibold tracking-wider text-gray-900">
            EOTRA
          </span>
        </div>

        {CHIPS.map((c) => (
          <div
            key={c.label}
            className="adv-chip absolute left-1/2 top-1/2 -ml-[44px] -mt-[18px]"
            style={{ ['--x' as string]: `${c.x}px`, ['--y' as string]: `${c.y}px` }}
            aria-hidden="true"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/25 text-white text-[12px] md:text-[13px] font-medium backdrop-blur-sm">
              <c.Icon size={14} />
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
