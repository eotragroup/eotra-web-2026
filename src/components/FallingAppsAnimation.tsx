import {
  BarChart3,
  Boxes,
  CreditCard,
  Database,
  Layers,
  QrCode,
  Radio,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

interface AppTile {
  name: string;
  category: string;
  icon: typeof ShoppingBag;
  gradient: string;
}

const APPS_COL_1: AppTile[] = [
  {
    name: 'Eotra POS',
    category: 'Retail Checkout',
    icon: ShoppingBag,
    gradient: 'from-[#0400F5] to-[#2563eb]',
  },
  {
    name: 'Omni CRM',
    category: 'Loyalty & Retention',
    icon: Users,
    gradient: 'from-purple-600 to-indigo-700',
  },
  {
    name: 'Fast Pay',
    category: '0.2s Payments',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Inventory Scan',
    category: 'RFID & Barcode',
    icon: QrCode,
    gradient: 'from-slate-700 to-neutral-900',
  },
  {
    name: 'Global WMS',
    category: 'Multi-Warehouse',
    icon: Boxes,
    gradient: 'from-emerald-500 to-teal-700',
  },
];

const APPS_COL_2: AppTile[] = [
  {
    name: 'Global WMS',
    category: 'Multi-Warehouse',
    icon: Boxes,
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    name: 'Cloud ERP',
    category: 'Finance & Supply',
    icon: Database,
    gradient: 'from-cyan-600 to-blue-700',
  },
  {
    name: 'Eotra Mobile',
    category: 'Storefront App',
    icon: Smartphone,
    gradient: 'from-sky-500 to-indigo-600',
  },
  {
    name: 'BI Analytics',
    category: 'Predictive Sales',
    icon: BarChart3,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Live Ops Hub',
    category: 'Real-Time Sync',
    icon: Radio,
    gradient: 'from-violet-600 to-purple-800',
  },
];

const APPS_COL_3: AppTile[] = [
  {
    name: 'BI Analytics',
    category: 'Predictive Sales',
    icon: BarChart3,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Fast Pay',
    category: '0.2s Payments',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Eotra POS',
    category: 'Retail Checkout',
    icon: ShoppingBag,
    gradient: 'from-[#0400F5] to-[#2563eb]',
  },
  {
    name: 'Omni CRM',
    category: 'Loyalty & Retention',
    icon: Users,
    gradient: 'from-purple-600 to-indigo-700',
  },
  {
    name: 'Cloud ERP',
    category: 'Finance & Supply',
    icon: Database,
    gradient: 'from-cyan-600 to-blue-700',
  },
];

function AppCard({ app }: { app: AppTile }) {
  const Icon = app.icon;
  return (
    <div className="group flex flex-col items-center select-none cursor-pointer p-2 rounded-2xl transition-transform duration-300 hover:scale-105">
      {/* App Squircle Tile */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br ${app.gradient} p-0.5 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.22)] border border-white/20 relative overflow-hidden flex items-center justify-center`}
      >
        {/* Gloss highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />

        {/* Icon */}
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* App Name */}
      <span className="text-[11px] sm:text-[12px] font-medium text-neutral-800 mt-2 whitespace-nowrap text-center">
        {app.name}
      </span>
      <span className="text-[9px] text-neutral-500 -mt-0.5 whitespace-nowrap">
        {app.category}
      </span>
    </div>
  );
}

export function FallingAppsAnimation() {
  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] max-w-[480px] mx-auto overflow-hidden rounded-3xl [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 h-full">
        {/* COLUMN 1: Raining Downwards (Fast) */}
        <div className="relative flex flex-col overflow-hidden">
          <div className="animate-rain-fast flex flex-col gap-5 sm:gap-6">
            {/* Set 1 */}
            {APPS_COL_1.map((app, idx) => (
              <AppCard key={`col1-1-${idx}`} app={app} />
            ))}
            {/* Duplicated Set for infinite continuous loop */}
            {APPS_COL_1.map((app, idx) => (
              <AppCard key={`col1-2-${idx}`} app={app} />
            ))}
          </div>
        </div>

        {/* COLUMN 2: Raining Downwards (Medium Speed + Offset) */}
        <div className="relative flex flex-col overflow-hidden pt-8">
          <div className="animate-rain-medium flex flex-col gap-5 sm:gap-6">
            {/* Set 1 */}
            {APPS_COL_2.map((app, idx) => (
              <AppCard key={`col2-1-${idx}`} app={app} />
            ))}
            {/* Duplicated Set for infinite continuous loop */}
            {APPS_COL_2.map((app, idx) => (
              <AppCard key={`col2-2-${idx}`} app={app} />
            ))}
          </div>
        </div>

        {/* COLUMN 3: Raining Downwards (Slow Speed + Offset) */}
        <div className="relative flex flex-col overflow-hidden pt-4">
          <div className="animate-rain-slow flex flex-col gap-5 sm:gap-6">
            {/* Set 1 */}
            {APPS_COL_3.map((app, idx) => (
              <AppCard key={`col3-1-${idx}`} app={app} />
            ))}
            {/* Duplicated Set for infinite continuous loop */}
            {APPS_COL_3.map((app, idx) => (
              <AppCard key={`col3-2-${idx}`} app={app} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
