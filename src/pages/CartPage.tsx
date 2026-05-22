import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { formatRupiah } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)] bg-cream flex items-center">
          <Container className="text-center max-w-md mx-auto py-20">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-pink-soft/30 flex items-center justify-center mb-6">
              <ShoppingBag className="h-7 w-7 text-pink-crimson" />
            </div>
            <h1 className="font-display text-3xl text-teal-deep mb-3">Keranjangmu kosong</h1>
            <p className="text-ink/70 mb-8">Mulai jelajahi rekomendasi yang sudah dipersonalisasi untukmu.</p>
            <Button asChild size="lg">
              <Link to="/products">Lihat Produk <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-cream">
        <Container className="py-10">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Keranjang</p>
            <h1 className="font-display text-4xl md:text-5xl text-teal-deep">Review pesananmu</h1>
            <p className="mt-2 text-ink/60">{items.length} item dalam keranjang</p>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-8">
            <section className="space-y-3">
              {items.map((item) => (
                <article key={item.productId} className="flex gap-4 p-4 rounded-2xl bg-white border border-border">
                  <Link to={`/products/${item.productId}`} className="shrink-0 h-24 w-24 md:h-28 md:w-28 rounded-xl overflow-hidden bg-pink-soft/10">
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex-grow flex flex-col">
                    <p className="text-[11px] tracking-wider uppercase text-ink/50 font-medium">{item.brand}</p>
                    <Link to={`/products/${item.productId}`} className="font-display text-base md:text-lg text-teal-deep leading-snug line-clamp-2 hover:text-teal-bright transition-colors">
                      {item.name}
                    </Link>
                    <p className="mt-1 font-medium text-pink-crimson">{formatRupiah(item.unitPrice)}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center text-ink/70 hover:bg-teal-50 rounded-l-lg" aria-label="Kurang">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center text-ink/70 hover:bg-teal-50 rounded-r-lg" aria-label="Tambah">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.productId)} className="text-ink/50 hover:text-pink-crimson p-2 transition-colors" aria-label="Hapus">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="md:sticky md:top-20 md:self-start">
              <div className="p-6 rounded-3xl bg-white border border-border space-y-4">
                <h2 className="font-display text-xl text-teal-deep">Ringkasan</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70">Subtotal</span>
                  <span className="font-medium text-ink">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70">Ongkos kirim</span>
                  <span className="text-ink/50 italic">Dihitung saat checkout</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-baseline">
                  <span className="font-medium text-teal-deep">Total sementara</span>
                  <span className="font-display text-2xl text-pink-crimson">{formatRupiah(subtotal)}</span>
                </div>
                <Button onClick={() => navigate('/checkout')} size="lg" className="w-full">
                  Lanjut Checkout <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link to="/products">Belanja lagi</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
