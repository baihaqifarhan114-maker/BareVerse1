import { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { useDiagnosaStore } from '@/store/diagnosaStore';
import { useCartStore } from '@/store/cartStore';
import productsData from '@/data/products.json';
import type { Product } from '@/types';
import { formatRupiah, cn } from '@/lib/utils';
import { Star, ShoppingBag, ArrowLeft, BadgeCheck, Sparkles, Check } from 'lucide-react';

const ALL_PRODUCTS = productsData as Product[];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useMemo(() => ALL_PRODUCTS.find((p) => p.id === id), [id]);
  const diagnosaResult = useDiagnosaStore((s) => s.currentResult);
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/products" replace />;

  const price = product.discountedPrice ?? product.originalPrice;
  const matchedSet = new Set((diagnosaResult?.needed_ingredients ?? []).map((i) => i.toLowerCase()));

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      imageUrl: product.imageUrl,
      unitPrice: price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-cream">
        <Container className="py-10">
          <Link to="/products" className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-teal-deep mb-8">
            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar produk
          </Link>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-pink-soft/10">
                <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                {product.discountPercent > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-pink-crimson text-cream text-xs font-medium tracking-wider uppercase">-{product.discountPercent}%</span>
                )}
              </div>
              {product.bpomId && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/15 text-forest text-xs font-medium">
                  <BadgeCheck className="h-4 w-4" /> BPOM: {product.bpomId}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-ink/50 font-medium mb-1">{product.brand}</p>
                <h1 className="font-display text-3xl md:text-4xl text-teal-deep leading-tight">{product.name}</h1>
                {product.size && <p className="text-sm text-ink/60 mt-2">{product.size}</p>}
              </div>

              <div className="flex items-center gap-4">
                {product.rating ? (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
                    <span className="text-ink/60">({product.reviewCount} reviews)</span>
                  </div>
                ) : (
                  <span className="text-sm text-ink/40">Belum ada rating</span>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl text-pink-crimson">{formatRupiah(price)}</span>
                {product.discountedPrice !== null && (
                  <span className="text-sm text-ink/40 line-through">{formatRupiah(product.originalPrice)}</span>
                )}
              </div>

              {diagnosaResult && (
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-bright/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-teal-bright" />
                    <p className="text-sm font-medium text-teal-deep">Cocok untuk diagnosamu</p>
                  </div>
                  <p className="text-xs text-ink/60">
                    {product.ingredients.filter((i) => matchedSet.has(i.toLowerCase())).length} dari {diagnosaResult.needed_ingredients.length} ingredient rekomendasi ada di produk ini.
                  </p>
                </div>
              )}

              <Button size="lg" className="w-full" onClick={handleAdd} disabled={added} variant={added ? 'sage' : 'default'}>
                {added ? (<><Check className="h-4 w-4" /> Ditambahkan ke keranjang</>) : (<><ShoppingBag className="h-4 w-4" /> Tambah ke Keranjang</>)}
              </Button>

              {product.description && (
                <div>
                  <h3 className="font-display text-lg text-teal-deep mb-2">Manfaat</h3>
                  <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}

              {product.claims.length > 0 && (
                <div>
                  <h3 className="font-display text-lg text-teal-deep mb-2">Klaim Produk</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.claims.map((c) => (
                      <span key={c} className="px-3 py-1 rounded-full bg-sage/20 text-forest text-xs font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {product.ingredients.length > 0 && (
            <div className="mt-12 p-8 rounded-3xl bg-white border border-border">
              <h2 className="font-display text-2xl text-teal-deep mb-2">Ingredients</h2>
              <p className="text-sm text-ink/60 mb-6">Ingredient yang highlight = match dengan diagnosamu.</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => {
                  const matched = matchedSet.has(ing.toLowerCase());
                  return (
                    <span key={ing}
                      className={cn('px-3 py-1.5 rounded-full text-xs font-medium',
                        matched ? 'bg-pink-crimson text-cream' : 'bg-teal-50 text-teal-deep border border-teal-100')}>
                      {ing}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
