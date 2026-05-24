import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { ADMIN_PIN, useReviewStore } from '@/store/reviewStore';
import { Lock, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const setAdminAuthed = useReviewStore((s) => s.setAdminAuthed);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAdminAuthed(true);
      navigate('/admin/reviews');
      return;
    }
    setError(true);
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center py-12">
      <Container className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-cream/50 hover:text-cream mb-8">
          <ArrowLeft className="h-4 w-4" /> Kembali ke toko
        </Link>
        <div className="p-8 rounded-3xl bg-teal-deep border border-cream/10 shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-pink-crimson/20 flex items-center justify-center mb-6">
            <Lock className="h-6 w-6 text-pink-soft" />
          </div>
          <h1 className="font-display text-3xl text-cream mb-2">Bareverse Admin</h1>
          <p className="text-cream/60 text-sm mb-8">Dashboard perusahaan — lihat & kelola ulasan pelanggan (demo).</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-cream/50">PIN akses</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-ink/40 border border-cream/20 text-cream placeholder:text-cream/30"
                placeholder="Masukkan PIN"
                autoComplete="off"
              />
              {error && <p className="text-pink-soft text-xs mt-2">PIN salah. Hint demo: bareverse</p>}
            </div>
            <Button type="submit" variant="crimson" className="w-full" size="lg">
              Masuk Dashboard
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
