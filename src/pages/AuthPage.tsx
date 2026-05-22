import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { Sparkles, Shield, ScanFace } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useUserStore((s) => s.signIn);
  const onboarding = useUserStore((s) => s.onboarding);

  const handleSignIn = () => {
    signIn({
      name: 'Demo User',
      email: 'demo@bareverse.id',
    });
    const from = (location.state as { from?: string } | null)?.from;
    if (!onboarding) {
      navigate('/onboarding', { replace: true });
    } else if (from && from !== '/auth') {
      navigate(from, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] grid md:grid-cols-2">
        <div className="hidden md:flex relative bg-teal-deep text-cream items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-sage blur-3xl" />
            <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-pink-soft blur-3xl" />
          </div>
          <div className="relative max-w-md space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="Bareverse" className="h-12 w-auto bg-cream rounded-xl p-1.5" />
              <span className="font-display text-2xl">Bareverse</span>
            </Link>
            <h1 className="font-display text-4xl leading-tight">
              Selamat datang di perjalanan kulit <span className="italic text-pink-soft">yang benar-benar kamu.</span>
            </h1>
            <ul className="space-y-4 text-cream/80">
              <li className="flex gap-3"><ScanFace className="h-5 w-5 text-pink-soft mt-0.5 shrink-0" /><span>Diagnosa skincare berbasis foto atau kuesioner</span></li>
              <li className="flex gap-3"><Sparkles className="h-5 w-5 text-pink-soft mt-0.5 shrink-0" /><span>Rekomendasi rutinitas yang dipersonalisasi</span></li>
              <li className="flex gap-3"><Shield className="h-5 w-5 text-pink-soft mt-0.5 shrink-0" /><span>Produk yang sudah terdaftar BPOM</span></li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md space-y-8">
            <div>
              <Link to="/" className="md:hidden flex items-center gap-2 mb-8">
                <img src="/assets/logo.png" alt="Bareverse" className="h-10 w-auto" />
                <span className="font-display text-xl text-teal-deep">Bareverse</span>
              </Link>
              <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Masuk / Daftar</p>
              <h2 className="font-display text-3xl text-teal-deep">Satu klik untuk mulai.</h2>
              <p className="mt-3 text-ink/70">Sign in dengan Google untuk simpan diagnosa &amp; rutinitasmu.</p>
            </div>

            <Button onClick={handleSignIn} variant="outline" size="lg" className="w-full bg-white">
              <GoogleIcon /> Sign in with Google
            </Button>

            <p className="text-xs text-ink/50 text-center leading-relaxed">
              Dengan masuk, kamu menyetujui Syarat Layanan dan Kebijakan Privasi Bareverse.
              <br />
              <span className="text-ink/40">Demo mode — tidak ada login real ke Google.</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
