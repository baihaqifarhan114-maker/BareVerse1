import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { useReviewStore } from '@/store/reviewStore';
import { Star, Trash2, LogOut, MessageSquare } from 'lucide-react';

export default function AdminReviewsPage() {
  const navigate = useNavigate();
  const adminAuthed = useReviewStore((s) => s.adminAuthed);
  const reviews = useReviewStore((s) => s.reviews);
  const removeReview = useReviewStore((s) => s.removeReview);
  const setAdminAuthed = useReviewStore((s) => s.setAdminAuthed);
  const [filterProduct, setFilterProduct] = useState('');

  const filtered = useMemo(() => {
    const list = [...reviews].sort((a, b) => b.createdAt - a.createdAt);
    if (!filterProduct.trim()) return list;
    const q = filterProduct.toLowerCase();
    return list.filter(
      (r) => r.productName.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q)
    );
  }, [reviews, filterProduct]);

  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  if (!adminAuthed) return <Navigate to="/admin" replace />;

  const signOut = () => {
    setAdminAuthed(false);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-ink text-cream">
      <header className="border-b border-cream/10">
        <Container className="py-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-pink-soft">Company view</p>
            <h1 className="font-display text-2xl text-cream">Manajemen Ulasan</h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="border-cream/20 text-cream hover:bg-cream/10">
              <Link to="/">Lihat toko</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-cream/70 hover:text-cream">
              <LogOut className="h-4 w-4" /> Keluar
            </Button>
          </div>
        </Container>
      </header>

      <Container className="py-10 space-y-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-teal-deep border border-cream/10">
            <p className="text-xs text-cream/50 uppercase tracking-wider">Total ulasan</p>
            <p className="font-display text-3xl mt-1">{reviews.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-teal-deep border border-cream/10">
            <p className="text-xs text-cream/50 uppercase tracking-wider">Rating rata-rata</p>
            <p className="font-display text-3xl mt-1 flex items-center gap-2">
              {reviews.length ? avgRating.toFixed(1) : '—'}
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-teal-deep border border-cream/10">
            <p className="text-xs text-cream/50 uppercase tracking-wider">Mode</p>
            <p className="text-sm mt-2 text-cream/80">Data dari localStorage browser ini (demo opsi 1).</p>
          </div>
        </div>

        <div>
          <input
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            placeholder="Cari produk atau nama penulis..."
            className="w-full max-w-md px-4 py-2.5 rounded-xl bg-teal-deep border border-cream/20 text-cream placeholder:text-cream/40 text-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-cream/50">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>Belum ada ulasan. Minta user tulis review di halaman produk.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-cream/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-teal-deep text-cream/60 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3">Produk</th>
                  <th className="px-4 py-3">Penulis</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Ulasan</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-cream/10">
                {filtered.map((r) => (
                  <tr key={r.id} className="bg-ink/50 hover:bg-teal-deep/30">
                    <td className="px-4 py-3 font-medium max-w-[180px]">
                      <Link to={`/products/${r.productId}`} className="hover:text-pink-soft line-clamp-2">
                        {r.productName}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{r.authorName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        {r.rating} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs text-cream/80 line-clamp-2">{r.text}</td>
                    <td className="px-4 py-3 text-cream/50 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeReview(r.id)}
                        className="p-2 rounded-lg text-pink-soft hover:bg-pink-crimson/20"
                        title="Hapus ulasan"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
