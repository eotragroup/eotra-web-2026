import { ArrowRight, ExternalLink } from 'lucide-react';

interface GridProduct {
  id: string;
  title: string;
  logoUrl?: string;
  liveUrl?: string;
  domainLabel?: string;
}

interface Props {
  products: GridProduct[];
  onOpenProduct: (id: string) => void;
}

// Optional product screenshots: src/assets/products/<product-id>.(jpg|jpeg|png|webp)
const COVERS = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function coverFor(id: string): string | undefined {
  const key = Object.keys(COVERS).find((k) => {
    const name = k.split('/').pop() ?? '';
    return name.replace(/\.[^.]+$/, '') === id;
  });
  return key ? COVERS[key] : undefined;
}

// Soft brand tint behind the picture area when no screenshot exists yet
const TINTS: Record<string, string> = {
  'jamjoom-online': 'from-[#e8f0fb] to-[#e6f4ea]',
  'eotra-menu': 'from-[#fff1e8] to-[#ffe3d1]',
  neoshe: 'from-[#f3ede6] to-[#e7ddd1]',
  ibosh: 'from-[#ececec] to-[#d9d9d9]',
  lidya: 'from-[#eaf0ea] to-[#d8e3d8]',
  tradespilot: 'from-[#e3f5ef] to-[#cdeee3]',
};

export function ProductsGrid({ products, onOpenProduct }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
      {products.map((product) => {
        const cover = coverFor(product.id);
        return (
          <article
            key={product.id}
            onClick={() => onOpenProduct(product.id)}
            className="group cursor-pointer"
          >
            {/* Picture of the product, logo sits inside it */}
            <div
              className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${
                TINTS[product.id] ?? 'from-gray-100 to-gray-200'
              }`}
            >
              {cover ? (
                <img
                  src={cover}
                  alt={`${product.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-70"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              )}

              {/* Logo badge, centered inside the image */}
              <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                <div className="bg-white rounded-2xl px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] flex items-center transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  {product.logoUrl ? (
                    <img
                      src={product.logoUrl}
                      alt={`${product.title} logo`}
                      className="h-9 sm:h-10 w-auto max-w-[180px] object-contain"
                    />
                  ) : (
                    <span className="text-[17px] font-semibold text-gray-900">{product.title}</span>
                  )}
                </div>
              </div>

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

            {/* Title + domain */}
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-gray-900 group-hover:text-[#0400F5] transition-colors">
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
        );
      })}
    </div>
  );
}
