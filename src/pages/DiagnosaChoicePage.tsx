import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { AuthGuard } from '@/components/AuthGuard';
import { Camera, ClipboardList, ArrowUpRight } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

function DiagnosaChoiceInner() {
  const onboarding = useUserStore((s) => s.onboarding);
  const isHair = onboarding?.scope === 'hair';
  const isSkin = onboarding?.scope === 'skin' || onboarding?.scope === 'both';

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Diagnosa</p>
            <h1 className="font-display text-4xl md:text-5xl text-teal-deep leading-tight">
              Hi {onboarding?.name ?? 'kamu'}, mau diagnosa dengan cara apa?
            </h1>
            <p className="mt-4 text-ink/70 max-w-xl mx-auto">
              Pilih salah satu — keduanya butuh kurang dari 2 menit dan menghasilkan rekomendasi yang sama lengkapnya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              to="/diagnosa/camera"
              className="group relative overflow-hidden p-8 rounded-3xl border-2 border-border bg-white hover:border-teal-bright transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-pink-soft/40 flex items-center justify-center mb-6">
                <Camera className="h-6 w-6 text-pink-crimson" />
              </div>
              <h3 className="font-display text-3xl text-teal-deep mb-3">Virtual Camera</h3>
              <p className="text-ink/70 leading-relaxed mb-6">
                {isHair && !isSkin
                  ? 'Gunakan kamera untuk menganalisis scalp & rambut — hasil rutinitas haircare dalam beberapa detik.'
                  : isHair
                    ? 'Scan wajah untuk kulit, atau arahkan ke rambut/scalp lewat form jika fokus haircare.'
                    : 'Buka kamera depan, foto wajah, biarkan AI menganalisis kondisi kulit dalam beberapa detik.'}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-bright">
                Mulai scan <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>

            <Link
              to="/diagnosa/form"
              className="group relative overflow-hidden p-8 rounded-3xl border-2 border-border bg-white hover:border-teal-bright transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-sage/40 flex items-center justify-center mb-6">
                <ClipboardList className="h-6 w-6 text-forest" />
              </div>
              <h3 className="font-display text-3xl text-teal-deep mb-3">Form Diagnosa</h3>
              <p className="text-ink/70 leading-relaxed mb-6">
                Jawab 3-4 pertanyaan singkat tentang kondisi kulit/rambutmu. Cepat, akurat, dan no foto needed.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-bright">
                Mulai kuesioner <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default function DiagnosaChoicePage() {
  return <AuthGuard requireOnboarding><DiagnosaChoiceInner /></AuthGuard>;
}
