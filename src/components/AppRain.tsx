import {
  ShoppingCart,
  Warehouse,
  Boxes,
  Users,
  BarChart3,
  CreditCard,
  Truck,
  Package,
  Store,
  Receipt,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Tags,
  Barcode,
} from 'lucide-react';

const APPS = [
  { Icon: ShoppingCart, label: 'POS', color: '#0400F5' },
  { Icon: Warehouse, label: 'WMS', color: '#0F172A' },
  { Icon: Boxes, label: 'Inventory', color: '#7C3AED' },
  { Icon: Users, label: 'CRM', color: '#059669' },
  { Icon: BarChart3, label: 'Analytics', color: '#EA580C' },
  { Icon: CreditCard, label: 'Payments', color: '#0400F5' },
  { Icon: Truck, label: 'Fulfilment', color: '#0891B2' },
  { Icon: Package, label: 'Orders', color: '#DB2777' },
  { Icon: Store, label: 'Stores', color: '#0F172A' },
  { Icon: Receipt, label: 'ERP', color: '#7C3AED' },
  { Icon: Globe, label: 'Commerce', color: '#0400F5' },
  { Icon: Smartphone, label: 'Mobile', color: '#059669' },
  { Icon: Cloud, label: 'Cloud', color: '#0891B2' },
  { Icon: ShieldCheck, label: 'Security', color: '#EA580C' },
  { Icon: Tags, label: 'Pricing', color: '#DB2777' },
  { Icon: Barcode, label: 'Scanning', color: '#0F172A' },
];

const COLUMNS = 8;

// Deterministic "random" so the rain looks organic but never changes between renders
function rnd(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Each column is its own lane (no overlaps): two apps share a lane, half a cycle apart.
const DROPS = Array.from({ length: COLUMNS * 2 }, (_, i) => {
  const col = i % COLUMNS;
  const second = i >= COLUMNS;
  const duration = 7 + rnd(col + 1) * 5; // 7s – 12s, same for both apps in a lane
  const base = -rnd(col + 90) * duration;
  return {
    key: i,
    col,
    app: APPS[(i * 5 + col) % APPS.length],
    // Rain falls on the right side of the panel (start/span set per breakpoint in CSS)
    pos: col / (COLUMNS - 1),
    duration,
    delay: second ? base - duration / 2 : base, // negative: already falling on load
    tilt: (rnd(i + 21) - 0.5) * 12,
  };
});

export function AppRain() {
  return (
    <div
      className="app-rain relative w-full overflow-hidden rounded-2xl bg-gray-950"
      role="img"
      aria-label="Eotra apps — POS, WMS, ERP, CRM and more — falling like rain"
    >
      <style>{`
        .app-rain { --h: 340px; --rain-start: 62%; --rain-span: 32%; height: var(--h); }
        @media (min-width: 640px) { .app-rain { --rain-start: 46%; --rain-span: 48%; } }
        @media (min-width: 768px) { .app-rain { --h: 400px; } }
        @media (min-width: 1024px) { .app-rain { --h: 460px; } }
        @keyframes app-fall {
          0%   { transform: translate3d(0, -110px, 0) rotate(var(--tilt)); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate3d(0, calc(var(--h) + 30px), 0) rotate(var(--tilt)); opacity: 0; }
        }
        .app-rain-drop { animation: app-fall linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .app-rain-drop { animation: none; opacity: 1; transform: translate3d(0, 120px, 0); }
        }
      `}</style>

      {/* soft brand glow on the right where the rain falls */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(4,0,245,0.55),transparent_60%)]" />

      {/* Left caption */}
      <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 z-10 max-w-[44%] sm:max-w-[34%]">
        <p className="text-white text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em]">
          Every app your retail runs on. One core.
        </p>
      </div>

      {/* Falling apps */}
      {DROPS.map(({ key, col, app, pos, duration, delay, tilt }) => (
        <div
          key={key}
          className={`app-rain-drop absolute top-0 -translate-x-1/2 flex-col items-center gap-1.5 ${col % 2 ? 'hidden sm:flex' : 'flex'}`}
          style={
            {
              left: `calc(var(--rain-start) + ${pos} * var(--rain-span))`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              '--tilt': `${tilt}deg`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-[16px] sm:rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-center"
          >
            <app.Icon size={28} strokeWidth={1.8} color={app.color} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-white/80 tracking-wide">
            {app.label}
          </span>
        </div>
      ))}
    </div>
  );
}
