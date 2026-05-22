import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import type { Product } from '@/types';

type Props = {
  product: Product;
  matchedIngredients?: string[];
};

export function ProductCard({ product, matchedIngredients }: Props) {
  const matchCount = matchedIngredients
    ? product.ingredients.filter((i) => matchedIngredients.some((m) => m.toLowerCase() === i.toLowerCase())).length
    : 0;
  const price = product.discountedPrice ?? product.originalPrice;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-2xl bg-white border border-border/60 overflow-hidden hover:border-teal-bright/40 hover:shadow-md transition-all"
    >
      <div className="relative aspect-square bg-pink-soft/10">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discountPercent > 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-pink-crimson text-cream text-[10px] font-medium tracking-wider uppercase">
            -{product.discountPercent}%
          </span>
        )}
        {matchCount > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-teal-deep/90 backdrop-blur-sm text-cream text-[10px] font-medium tracking-wider uppercase">
            {matchCount} match
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[11px] tracking-wider uppercase text-ink/50 font-medium">{product.brand}</p>
        <h3 className="mt-1 font-display text-base text-teal-deep leading-snug line-clamp-2">{product.name}</h3>
        {product.primaryIngredients.length > 0 && (
          <p className="mt-1.5 text-xs text-ink/60 line-clamp-1">
            {product.primaryIngredients.slice(0, 3).join(' · ')}
          </p>
        )}
        <div className="mt-2 flex items-center gap-1 text-xs text-ink/60">
          {product.rating ? (
            <>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount})</span>
            </>
          ) : (
            <span className="text-ink/30">Belum ada rating</span>
          )}
        </div>
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="font-medium text-pink-crimson">{formatRupiah(price)}</span>
          {product.discountedPrice !== null && (
            <span className="text-xs text-ink/40 line-through">{formatRupiah(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
