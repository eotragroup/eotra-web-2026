import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingCart,
  Warehouse,
  Receipt,
  Users,
  BarChart3,
  Layers,
  type LucideIcon,
} from 'lucide-react';

interface Capability {
  index: string;
  title: string;
  description: string;
  nodes: string[]; // node ids lit up by this capability
}

interface Props {
  capabilities: Capability[];
}

const W = 100;
const CX = 50;

interface NodeDef {
  id: string;
  label: string;
  Icon: LucideIcon;
  scattered: [number, number];
}

const NODES: NodeDef[] = [
  { id: 'pos', label: 'POS', Icon: ShoppingCart, scattered: [16, 14] },
  { id: 'wms', label: 'WMS', Icon: Warehouse, scattered: [82, 12] },
  { id: 'erp', label: 'ERP', Icon: Receipt, scattered: [90, 62] },
  { id: 'crm', label: 'CRM', Icon: Users, scattered: [12, 68] },
  { id: 'analytics', label: 'Analytics', Icon: BarChart3, scattered: [56, 78] },
];

// Unified: a ring around the core
const RX = 33;
const RY = 28;
function ringPos(i: number, H: number): [number, number] {
  const k = H / 84;
  const a = (-90 + (360 / NODES.length) * i) * (Math.PI / 180);
  return [CX + RX * Math.cos(a), (42 + RY * Math.sin(a)) * k];
}

export function UnifiedCore({ capabilities }: Props) {
  const [unified, setUnified] = useState(false);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Taller diagram on phones so nodes don't crowd the core
  const H = small ? 104 : 84;
  const k = H / 84;
  const CY = 42 * k;
  const pos = (n: NodeDef, i: number): [number, number] =>
    unified ? ringPos(i, H) : [n.scattered[0], n.scattered[1] * k];

  // Play "before -> after" once when scrolled into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let t: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          t = window.setTimeout(() => setUnified(true), 1300);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t) window.clearTimeout(t);
    };
  }, []);

  // Auto-cycle capabilities while unified (until the user picks one)
  useEffect(() => {
    if (!unified || !auto) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % capabilities.length),
      3800
    );
    return () => window.clearInterval(id);
  }, [unified, auto, capabilities.length]);

  const activeNodes = unified ? capabilities[active].nodes : [];

  const CaptionBox = () => (
    <div className="rounded-xl bg-gray-900/95 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-[12px] sm:text-[13px] leading-snug min-h-[40px] flex items-center">
      {unified ? (
        <span key={active} className="animate-[fadeIn_.5s_ease]">
          <b className="font-semibold">{capabilities[active].title}</b>
          <span className="text-white/70"> — {capabilities[active].description}</span>
        </span>
      ) : (
        <span className="text-white/70">
          Data stuck in silos. Every system needs its own login, sync and fix.
        </span>
      )}
    </div>
  );

  return (
    <div ref={wrapRef} className="w-full">
      {/* Toggle */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex p-1 rounded-full bg-white border border-gray-200 text-[12px] sm:text-[13px] font-medium">
          {[
            { v: false, label: 'Disconnected' },
            { v: true, label: 'With Eotra' },
          ].map(({ v, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => setUnified(v)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full transition-colors duration-300 cursor-pointer ${
                unified === v
                  ? v
                    ? 'bg-[#0400F5] text-white'
                    : 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span
          className={`text-[11px] sm:text-[12px] font-semibold tabular-nums transition-colors duration-500 ${
            unified ? 'text-[#0400F5]' : 'text-gray-400'
          }`}
        >
          {unified ? '5 systems → 1 core' : '5 separate systems'}
        </span>
      </div>

      {/* Diagram */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white border border-gray-200"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        {/* dotted grid */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {NODES.map((n, i) => {
            const [rx, ry] = pos(n, i);
            const lit = activeNodes.includes(n.id);
            return (
              <g key={n.id}>
                <motion.line
                  x1={CX}
                  y1={CY}
                  animate={{ x2: rx, y2: ry, opacity: unified ? 1 : 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  stroke={lit ? '#0400F5' : '#a5b4fc'}
                  strokeWidth={lit ? 0.55 : 0.3}
                  strokeLinecap="round"
                />
                {unified && (
                  <motion.circle
                    r={0.9}
                    fill="#0400F5"
                    initial={{ cx: rx, cy: ry, opacity: 0 }}
                    animate={{
                      cx: [rx, CX],
                      cy: [ry, CY],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.45,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Core */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center rounded-full text-white"
          style={{ left: `${CX}%`, top: `${(CY / H) * 100}%` }}
          animate={{
            width: unified ? (small ? 78 : 104) : small ? 56 : 72,
            height: unified ? (small ? 78 : 104) : small ? 56 : 72,
            backgroundColor: unified ? '#0400F5' : '#d4d4d8',
            boxShadow: unified
              ? small ? '0 0 0 9px rgba(4,0,245,0.10), 0 0 0 20px rgba(4,0,245,0.05)' : '0 0 0 14px rgba(4,0,245,0.10), 0 0 0 30px rgba(4,0,245,0.05)'
              : '0 0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Layers size={unified ? (small ? 20 : 26) : 18} />
          <span className="text-[10px] sm:text-[11px] font-semibold mt-1 tracking-wide">
            {unified ? 'EOTRA CORE' : 'Offline'}
          </span>
        </motion.div>

        {/* System nodes */}
        {NODES.map((n, i) => {
          const [x, y] = pos(n, i);
          const lit = activeNodes.includes(n.id);
          return (
            <motion.div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              initial={false}
              animate={{ left: `${x}%`, top: `${(y / H) * 100}%` }}
              transition={{
                duration: 1,
                delay: unified ? i * 0.06 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={`flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pl-2.5 sm:pr-3.5 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-[13px] font-semibold shadow-sm transition-all duration-500 ${
                  lit
                    ? 'bg-[#0400F5] text-white border-[#0400F5] scale-110 shadow-[0_8px_24px_rgba(4,0,245,0.35)]'
                    : unified
                    ? 'bg-white text-gray-900 border-gray-200'
                    : 'bg-white text-gray-500 border-gray-300 border-dashed'
                }`}
              >
                <n.Icon size={14} />
                <span>{n.label}</span>
                {!unified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Caption (overlay on larger screens) */}
        <div className="hidden sm:block absolute left-5 right-5 bottom-4 z-30">
          <CaptionBox />
        </div>
      </div>

      {/* Caption (below the diagram on phones) */}
      <div className="sm:hidden mt-3">
        <CaptionBox />
      </div>

      {/* Capability selector */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {capabilities.map((cap, i) => (
          <button
            key={cap.index}
            type="button"
            onClick={() => {
              setUnified(true);
              setActive(i);
              setAuto(false);
            }}
            className={`text-left px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
              unified && active === i
                ? 'bg-gray-900 border-gray-900 text-white'
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-900'
            }`}
          >
            <span
              className={`block text-[11px] font-semibold tabular-nums mb-0.5 ${
                unified && active === i ? 'text-[#8b88ff]' : 'text-[#0400F5]'
              }`}
            >
              {cap.index}
            </span>
            <span className="block text-[13px] font-semibold leading-snug">
              {cap.title}
            </span>
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
