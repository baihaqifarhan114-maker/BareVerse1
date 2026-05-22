import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { AuthGuard } from '@/components/AuthGuard';
import { SHIPPING_OPTIONS, PAYMENT_BANKS, generateVA, generateOrderId } from '@/lib/shipping';
import { formatRupiah, cn } from '@/lib/utils';
import type { Address, PaymentBank, ShippingCarrier, Order } from '@/types';
import { Truck, Wallet, MapPin, Check, ArrowRight } from 'lucide-react';

function CheckoutInner() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const setLastOrder = useCartStore((s) => s.setLastOrder);
  const clear = useCartStore((s) => s.clear);

  const [address, setAddress] = useState<Address>({
    fullName: '', phone: '', province: '', city: '', district: '', postalCode: '', detail: '',
  });
  const [shipping, setShipping] = useState<ShippingCarrier | null>(null);
  const [payment, setPayment] = useState<PaymentBank | null>(null);

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const addressValid =
    address.fullName.trim().length >= 2 &&
    /^[0-9+\s-]{8,}$/.test(address.phone) &&
    address.province && address.city && address.district &&
    /^\d{5}$/.test(address.postalCode) &&
    address.detail.trim().length >= 5;

  const shippingOption = SHIPPING_OPTIONS.find((s) => s.carrier === shipping) ?? null;
  const shippingCost = shippingOption?.price ?? 0;
  const total = subtotal + shippingCost;
  const canPay = addressValid && shipping && payment;

  const handlePay = () => {
    if (!canPay || !shippingOption || !payment) return;
    const order: Order = {
      id: generateOrderId(),
      items: items.slice(),
      address,
      shipping: shippingOption,
      payment: { bank: payment, virtualAccountNumber: generateVA(payment) },
      subtotal,
      shippingCost,
      total,
      createdAt: Date.now(),
    };
    setLastOrder(order);
    clear();
    navigate('/order/confirmation', { replace: true });
  };

  const updateAddress = <K extends keyof Address>(key: K, val: Address[K]) =>
    setAddress({ ...address, [key]: val });

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-cream">
        <Container className="py-10">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Checkout</p>
            <h1 className="font-display text-4xl md:text-5xl text-teal-deep">Selesaikan pesananmu</h1>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-6">
              {/* ALAMAT */}
              <section className="p-6 md:p-8 rounded-3xl bg-white border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-pink-soft/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-pink-crimson" />
                  </div>
                  <h2 className="font-display text-2xl text-teal-deep">Alamat Pengiriman</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Nama lengkap" value={address.fullName} onChange={(v) => updateAddress('fullName', v)} placeholder="Mis. Sasa Putri" />
                  <Field label="No. HP" value={address.phone} onChange={(v) => updateAddress('phone', v)} placeholder="08xxxxxxxxxx" />
                  <Field label="Provinsi" value={address.province} onChange={(v) => updateAddress('province', v)} placeholder="DKI Jakarta" />
                  <Field label="Kota / Kabupaten" value={address.city} onChange={(v) => updateAddress('city', v)} placeholder="Jakarta Selatan" />
                  <Field label="Kecamatan" value={address.district} onChange={(v) => updateAddress('district', v)} placeholder="Tebet" />
                  <Field label="Kode Pos" value={address.postalCode} onChange={(v) => updateAddress('postalCode', v)} placeholder="12810" />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-ink mb-2">Detail alamat</label>
                    <textarea
                      value={address.detail}
                      onChange={(e) => updateAddress('detail', e.target.value)}
                      placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-teal-bright focus:border-teal-bright transition resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* EKSPEDISI */}
              <section className="p-6 md:p-8 rounded-3xl bg-white border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-sage/30 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-forest" />
                  </div>
                  <h2 className="font-display text-2xl text-teal-deep">Pilih Ekspedisi</h2>
                </div>
                <div className="space-y-2">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <button
                      key={opt.carrier}
                      onClick={() => setShipping(opt.carrier)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left',
                        shipping === opt.carrier ? 'border-teal-bright bg-teal-50/60' : 'border-border bg-white hover:border-teal-bright/40')}>
                      <div>
                        <p className="font-medium text-teal-deep">{opt.name}</p>
                        <p className="text-xs text-ink/60">Estimasi {opt.estimateDays}</p>
                      </div>
                      <span className="font-medium text-pink-crimson">{formatRupiah(opt.price)}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* PEMBAYARAN */}
              <section className="p-6 md:p-8 rounded-3xl bg-white border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-teal-bright" />
                  </div>
                  <h2 className="font-display text-2xl text-teal-deep">Metode Pembayaran</h2>
                </div>
                <div className="space-y-2">
                  {PAYMENT_BANKS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPayment(opt.value)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left',
                        payment === opt.value ? 'border-teal-bright bg-teal-50/60' : 'border-border bg-white hover:border-teal-bright/40')}>
                      <div className="flex items-center gap-3">
                        <div className={cn('h-10 w-14 rounded-lg flex items-center justify-center font-bold text-sm',
                          opt.value === 'bni' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-700')}>
                          {opt.value.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-teal-deep">{opt.name}</p>
                          <p className="text-xs text-ink/60">Kode bank {opt.code}</p>
                        </div>
                      </div>
                      {payment === opt.value && <Check className="h-5 w-5 text-teal-bright" />}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* SUMMARY */}
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="p-6 rounded-3xl bg-white border border-border space-y-4">
                <h2 className="font-display text-xl text-teal-deep">Ringkasan Pesanan</h2>
                <div className="space-y-3 max-h-64 overflow-auto pr-2">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3 text-sm">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-pink-soft/10 shrink-0">
                        <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-xs text-ink/50 truncate">{item.brand}</p>
                        <p className="text-xs text-ink truncate">{item.name}</p>
                        <p className="text-xs text-ink/60">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-medium text-ink shrink-0">{formatRupiah(item.unitPrice * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/70">Subtotal</span>
                    <span className="text-ink">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/70">Ongkos kirim</span>
                    <span className="text-ink">{shippingCost > 0 ? formatRupiah(shippingCost) : '—'}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-baseline">
                  <span className="font-medium text-teal-deep">Total</span>
                  <span className="font-display text-2xl text-pink-crimson">{formatRupiah(total)}</span>
                </div>
                <Button onClick={handlePay} disabled={!canPay} variant="crimson" size="lg" className="w-full">
                  Bayar Sekarang <ArrowRight className="h-4 w-4" />
                </Button>
                {!canPay && (
                  <p className="text-xs text-ink/50 text-center">Lengkapi alamat, ekspedisi, &amp; metode pembayaran.</p>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-teal-bright focus:border-teal-bright transition"
      />
    </div>
  );
}

export default function CheckoutPage() {
  return <AuthGuard><CheckoutInner /></AuthGuard>;
}
