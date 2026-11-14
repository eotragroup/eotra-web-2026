import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface SliderProduct {
  id: string;
  title: string;
  logoUrl?: string;
  liveUrl?: string;
  domainLabel?: string;
}

interface Props {
  products: SliderProduct[];
  onOpenProduct: (id: string) => void;
}

export function ProductsSlider({ products, onOpenProduct }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;
    const base = cards[0].offsetLeft;
    let best = 0;
    let min = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - base - scrollLeft);
      if (d < min) {
        min = d;
        best = i;
      }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollByCard = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap || '24') || 24;
    track.scrollBy({
      left: dir * ((first?.offsetWidth ?? 360) + gap),
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    const target = track?.children[i] as HTMLElement | undefined;
    if (!track || !first || !target) return;
    track.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-end gap-3 mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous products"
          className="w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next products"
          className="w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-900 hover:border-[#0400F5] hover:bg-[#0400F5] hover:text-white disabled:opacity-35 disabled:pointer-events-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Slider track — full-bleed to the right edge */}
      <div
        ref={trackRef}
        onScroll={update}
        role="region"
        aria-label="Featured products slider"
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2 -mx-5 sm:-mx-8 lg:-mx-12 pl-5 sm:pl-8 lg:pl-12 pr-5 sm:pr-8 lg:pr-12 scroll-pl-5 sm:scroll-pl-8 lg:scroll-pl-12"
      >
        {products.map((product) => (
          <article
            key={product.id}
            onClick={() => onOpenProduct(product.id)}
            className="group snap-start shrink-0 w-[78vw] sm:w-[340px] lg:w-[380px] cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-gray-200 group-hover:border-gray-900 transition-colors duration-300 flex items-center justify-center p-10 sm:p-12">
              {product.logoUrl ? (
                <img
                  src={product.logoUrl}
                  alt={`${product.title} logo`}
                  className="max-h-[72px] sm:max-h-[88px] w-auto max-w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <span className="text-[22px] font-semibold text-gray-900">{product.title}</span>
              )}

              {/* Same expanding pill button */}
              <div className="absolute bottom-5 left-5 h-9 w-9 group-hover:w-[158px] bg-gray-900 text-white rounded-full flex items-center pl-4 pr-[11px] overflow-hidden transition-all duration-300 ease-in-out shadow-sm">
                <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:delay-100">
                  Open page
                </span>
                <span className="absolute right-[11px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  />
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-gray-900 group-hover:text-[#0400F5] transition-colors">
                {product.title}
              </h3>
              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-[#0400F5] shrink-0"
                >
                  <span>{product.domainLabel}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Step indicators */}
      <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Product slide navigation">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Jump to ${p.title}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex ? 'w-8 bg-[#0400F5]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
