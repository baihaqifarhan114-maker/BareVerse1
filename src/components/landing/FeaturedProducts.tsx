import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { formatRupiah } from '@/lib/utils';

type StubProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  tag: string;
  imageSeed: string;
};

const featured: StubProduct[] = [
  { id: '1', name: 'Niacinamide Brightening Serum', brand: 'Bareverse Lab', price: 89000, originalPrice: 119000, rating: 4.7, reviews: 245, tag: 'Best Seller', imageSeed: 'serum1' },
  { id: '2', name: 'Hydrating Gentle Cleanser', brand: 'Bareverse Lab', price: 65000, originalPrice: null, rating: 4.8, reviews: 312, tag: 'For Sensitive', imageSeed: 'cleanser2' },
  { id: '3', name: 'Centella Soothing Toner', brand: 'Bareverse Lab', price: 75000, originalPrice: 95000, rating: 4.6, reviews: 189, tag: 'Acne-Prone', imageSeed: 'toner3' },
  { id: '4', name: 'Daily Mineral Sunscreen SPF 50', brand: 'Bareverse Lab', price: 110000, originalPrice: null, rating: 4.9, reviews: 421, tag: 'Top Rated', imageSeed: 'sunscreen4' },
];

export function FeaturedProducts() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Sorotan</p>
            <h2 className="font-display text-4xl md:text-5xl text-teal-deep">Produk yang paling dicari.</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex text-sm font-medium text-teal-bright hover:text-teal-deep">
            Lihat semua →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="group flex flex-col rounded-2xl bg-white border border-border/60 overflow-hidden hover:border-teal-bright/40 hover:shadow-md transition-all"
            >
              <div className="relative aspect-square bg-pink-soft/20">
                <img
                  src={`https://picsum.photos/seed/${p.imageSeed}/400/400`}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cream/90 backdrop-blur-sm text-[10px] font-medium tracking-wider uppercase text-teal-deep">
                  {p.tag}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-[11px] tracking-wider uppercase text-ink/50 font-medium">{p.brand}</p>
                <h3 className="mt-1 font-display text-base text-teal-deep leading-snug line-clamp-2">{p.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-ink/60">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-ink">{p.rating}</span>
                  <span>({p.reviews})</span>
                </div>
                <div className="mt-auto pt-3 flex items-baseline gap-2">
                  <span className="font-medium text-pink-crimson">{formatRupiah(p.price)}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-ink/40 line-through">{formatRupiah(p.originalPrice)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
