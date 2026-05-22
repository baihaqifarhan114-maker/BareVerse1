import { Link, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { formatRupiah } from '@/lib/utils';
import { CheckCircle2, Copy, Package, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function OrderConfirmationPage() {
  const order = useCartStore((s) => s.lastOrder);
  const [copied, setCopied] = useState(false);

  if (!order) return <Navigate to="/" replace />;

  const copyVA = async () => {
    try {
      await navigator.clipboard.writeText(order.payment.virtualAccountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const arrivalEstimate = new Date(order.createdAt + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-cream py-12">
        <Container className="max-w-2xl">
          <div className="text-center mb-10">
            <div className="h-20 w-20 mx-auto rounded-full bg-sage/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-forest" />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Pesanan Diterima</p>
            <h1 className="font-display text-4xl md:text-5xl text-teal-deep leading-tight mb-3">
              Terima kasih, pesanan kamu sudah kami catat.
            </h1>
            <p className="text-ink/70">
              ID Pesanan: <span className="font-medium text-teal-deep">{order.id}</span>
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-teal-deep text-cream mb-6">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-soft font-medium mb-3">Selesaikan Pembayaran</p>
            <h2 className="font-display text-2xl mb-1">{order.payment.bank.toUpperCase()} Virtual Account</h2>
            <p className="text-cream/70 text-sm mb-5">Transfer total Anda ke nomor VA di bawah dalam 24 jam.</p>
            <div className="p-4 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-between gap-3">
              <span className="font-mono text-xl tracking-wider">{order.payment.virtualAccountNumber}</span>
              <button onClick={copyVA} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cream text-teal-deep text-xs font-medium hover:bg-cream/90 transition">
                <Copy className="h-3 w-3" /> {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>
            <p className="font-display text-3xl mt-5">{formatRupiah(order.total)}</p>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-white border border-border space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-teal-deep" />
                <h3 className="font-display text-lg text-teal-deep">Pengiriman</h3>
              </div>
              <p className="text-sm text-ink/80">{order.shipping.name} · {order.shipping.estimateDays}</p>
              <p className="text-sm text-ink/60 mt-1">Estimasi tiba: {arrivalEstimate}</p>
              <div className="mt-3 p-3 rounded-lg bg-cream text-xs text-ink/70 leading-relaxed">
                <p className="font-medium text-ink mb-1">{order.address.fullName} · {order.address.phone}</p>
                <p>{order.address.detail}</p>
                <p>{order.address.district}, {order.address.city}, {order.address.province} {order.address.postalCode}</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg text-teal-deep mb-3">Item Pesanan</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-3 text-sm">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-pink-soft/10 shrink-0">
                      <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-xs text-ink/50">{item.brand}</p>
                      <p className="text-ink truncate">{item.name}</p>
                      <p className="text-xs text-ink/60">×{item.quantity} · {formatRupiah(item.unitPrice)}</p>
                    </div>
                    <p className="font-medium text-ink shrink-0">{formatRupiah(item.unitPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-ink/70">Subtotal</span><span>{formatRupiah(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-ink/70">Ongkos kirim</span><span>{formatRupiah(order.shippingCost)}</span></div>
              <div className="pt-2 mt-2 border-t border-border flex justify-between items-baseline">
                <span className="font-medium text-teal-deep">Total</span>
                <span className="font-display text-xl text-pink-crimson">{formatRupiah(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="flex-1">
              <Link to="/products">Belanja Lagi <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Kembali ke Home</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
