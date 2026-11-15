import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

// Eotra (Istanbul) and a client location (Jeddah)
const MARKERS = [
  { location: [41.0082, 28.9784] as [number, number], size: 0.09 },
  { location: [21.4858, 39.1925] as [number, number], size: 0.06 },
];

/** Draggable 3D Earth: spin it with the mouse or a finger; it keeps gently rotating when left alone. */
export function Globe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const state = useRef({ phi: 3.9, theta: 0.3, vPhi: 0, vTheta: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let raf = 0;

    const build = () => {
      globe?.destroy();
      const size = canvas.offsetWidth;
      if (!size) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi: state.current.phi,
        theta: state.current.theta,
        dark: 0,
        diffuse: 1.3,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.97, 0.97, 0.98],
        markerColor: [0.016, 0, 0.96],
        glowColor: [0.93, 0.93, 0.96],
        markers: MARKERS,
      });
    };
    build();

    const tick = () => {
      const s = state.current;
      if (!pointer.current) {
        s.phi += s.vPhi;
        s.theta += s.vTheta;
        s.vPhi *= 0.95;
        s.vTheta *= 0.95;
        if (!reduced && Math.abs(s.vPhi) < 0.0006) s.phi += 0.003; // idle spin
        s.theta = Math.max(-0.9, Math.min(0.9, s.theta));
      }
      globe?.update({ phi: s.phi, theta: s.theta });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      globe?.destroy();
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    state.current.vPhi = 0;
    state.current.vTheta = 0;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current = { x: e.clientX, y: e.clientY };
    const s = state.current;
    s.phi += dx / 160;
    s.theta = Math.max(-0.9, Math.min(0.9, s.theta + dy / 160));
    s.vPhi = dx / 160;
    s.vTheta = dy / 160;
  };
  const onUp = () => {
    pointer.current = null;
  };

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        aria-label="Interactive globe: drag to rotate"
        role="img"
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y select-none"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  );
}
