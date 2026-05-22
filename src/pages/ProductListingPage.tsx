import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useDiagnosaStore } from '@/store/diagnosaStore';
import { filterProducts, rankByDiagnosa } from '@/lib/recommendations';
import productsData from '@/data/products.json';
import type { Product, PriceRange, ProductCategory } from '@/types';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ALL_PRODUCTS = productsData as Product[];

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'cleanser', label: 'Cleanser' },
  { value: 'toner', label: 'Toner' },
  { value: 'serum', label: 'Serum' },
  { value: 'moisturizer', label: 'Moisturizer' },
  { value: 'sunscreen', label: 'Sunscreen' },
  { value: 'haircare', label: 'Haircare' },
  { value: 'hair-treatment', label: 'Hair Treatment' },
];

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'Semua harga' },
  { value: 'under-50', label: 'Di bawah Rp50.000' },
  { value: '50-150', label: 'Rp50.000 – Rp150.000' },
  { value: 'over-150', label: 'Di atas Rp150.000' },
];

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const diagnosaResult = useDiagnosaStore((s) => s.currentResult);

  const urlType = searchParams.get('type') as 'skincare' | 'haircare' | null;
  const urlCategory = searchParams.get('category') as ProductCategory | null;
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [ingredientFilterOn, setIngredientFilterOn] = useState(true);

  const ingredientFilter = ingredientFilterOn && diagnosaResult ? diagnosaResult.needed_ingredients : [];

  const filtered = useMemo(() => {
    const list = filterProducts(ALL_PRODUCTS, {
      productType: urlType ?? null,
      category: urlCategory ?? null,
      priceRange,
      ingredientFilter,
    });
    return diagnosaResult ? rankByDiagnosa(list, diagnosaResult) : list;
  }, [urlType, urlCategory, priceRange, ingredientFilter, diagnosaResult]);

  const setCategoryFilter = (cat: ProductCategory | null) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat); else params.delete('category');
    setSearchParams(params, { replace: true });
  };

  const setTypeFilter = (t: 'skincare' | 'haircare' | null) => {
    const params = new URLSearchParams(searchParams);
    if (t) params.set('type', t); else params.delete('type');
    setSearchParams(params, { replace: true });
  };

  const clearAll = () => {
    setSearchParams({}, { replace: true });
    setPriceRange('all');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-cream">
        <Container className="py-10">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Katalog</p>
            <h1 className="font-display text-4xl md:text-5xl text-teal-deep">
              {urlCategory ? `Produk ${CATEGORIES.find((c) => c.value === urlCategory)?.label ?? urlCategory}` : 'Semua Produk'}
            </h1>
            <p className="mt-2 text-ink/60">{filtered.length} produk ditemukan</p>
          </div>

          {diagnosaResult && (
            <div className="mb-8 p-5 rounded-2xl bg-teal-50/60 border border-teal-bright/20 flex items-center gap-4 flex-wrap">
              <Sparkles className="h-5 w-5 text-teal-bright shrink-0" />
              <div className="flex-grow min-w-[200px]">
                <p className="text-sm font-medium text-teal-deep">Difilter berdasarkan diagnosamu: {diagnosaResult.classification}</p>
                <p className="text-xs text-ink/60 mt-0.5">Match ingredient: {diagnosaResult.needed_ingredients.slice(0, 3).join(', ')}…</p>
              </div>
              <Button onClick={() => setIngredientFilterOn(!ingredientFilterOn)} variant={ingredientFilterOn ? 'default' : 'outline'} size="sm">
                {ingredientFilterOn ? 'Filter ingredient: AKTIF' : 'Aktifkan filter ingredient'}
              </Button>
            </div>
          )}

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <aside className="md:sticky md:top-20 md:self-start space-y-6">
              <div>
                <h3 className="font-display text-lg text-teal-deep mb-3">Tipe</h3>
                <div className="space-y-1">
                  {[{ v: null, l: 'Semua' }, { v: 'skincare' as const, l: 'Skincare' }, { v: 'haircare' as const, l: 'Haircare' }].map((opt) => (
                    <button key={opt.l} onClick={() => setTypeFilter(opt.v)}
                      className={cn('block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
                        urlType === opt.v ? 'bg-teal-deep text-cream font-medium' : 'text-ink/70 hover:bg-teal-50')}>
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg text-teal-deep mb-3">Kategori</h3>
                <div className="space-y-1">
                  <button onClick={() => setCategoryFilter(null)}
                    className={cn('block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
                      !urlCategory ? 'bg-teal-deep text-cream font-medium' : 'text-ink/70 hover:bg-teal-50')}>
                    Semua kategori
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button key={cat.value} onClick={() => setCategoryFilter(cat.value)}
                      className={cn('block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
                        urlCategory === cat.value ? 'bg-teal-deep text-cream font-medium' : 'text-ink/70 hover:bg-teal-50')}>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg text-teal-deep mb-3">Harga</h3>
                <div className="space-y-1">
                  {PRICE_RANGES.map((p) => (
                    <button key={p.value} onClick={() => setPriceRange(p.value)}
                      className={cn('block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
                        priceRange === p.value ? 'bg-teal-deep text-cream font-medium' : 'text-ink/70 hover:bg-teal-50')}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {(urlType || urlCategory || priceRange !== 'all') && (
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-pink-crimson">
                  <X className="h-3.5 w-3.5" /> Reset filter
                </Button>
              )}
            </aside>

            <section>
              {filtered.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-border">
                  <p className="text-ink/60 mb-4">Tidak ada produk yang cocok dengan filter ini.</p>
                  <Button onClick={clearAll} variant="outline">Reset filter</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.slice(0, 60).map((p) => (
                    <ProductCard key={p.id} product={p} matchedIngredients={diagnosaResult?.needed_ingredients} />
                  ))}
                </div>
              )}
              {filtered.length > 60 && (
                <p className="text-center text-sm text-ink/50 mt-8">
                  Menampilkan 60 dari {filtered.length} produk.
                  {!diagnosaResult && (
                    <> <Link to="/diagnosa" className="text-teal-bright hover:underline">Mulai diagnosa</Link> untuk hasil lebih relevan.</>
                  )}
                </p>
              )}
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
