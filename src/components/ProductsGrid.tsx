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

export function ProductsGrid({ products, onOpenProduct }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
      {products.map((product) => (
        <article
          key={product.id}
          onClick={() => onOpenProduct(product.id)}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-gray-200 group-hover:border-gray-900 transition-colors duration-300 flex items-center justify-center p-10 sm:p-12">
            {product.logoUrl ? (
              <img
                src={product.logoUrl}
                alt={`${product.title} logo`}
                className="max-h-[64px] sm:max-h-[80px] w-auto max-w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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
  );
}
