import { Navigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/components/AuthGuard';
import { useDiagnosaStore } from '@/store/diagnosaStore';
import { useUserStore } from '@/store/userStore';
import { Check, X, Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import { conditionLabel, productsUrlForDiagnosa } from '@/lib/diagnosaDisplay';

function DiagnosaResultInner() {
  const result = useDiagnosaStore((s) => s.currentResult);
  const onboarding = useUserStore((s) => s.onboarding);

  if (!result) return <Navigate to="/diagnosa" replace />;

  const methodLabel = result.method === 'camera' ? 'Virtual Camera' : 'Form Diagnosa';

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] py-12 bg-cream">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            <header className="text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">
                Hasil Diagnosa · {methodLabel}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-teal-deep leading-tight">
                Hi {onboarding?.name ?? 'kamu'}, ini hasilnya:
              </h1>
            </header>

            <div className="p-8 md:p-10 rounded-3xl bg-white border border-border shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-soft/30 text-pink-crimson text-xs font-medium tracking-wider uppercase mb-4">
                <Sparkles className="h-3 w-3" /> {result.type === 'skin' ? 'Klasifikasi Kulit' : 'Klasifikasi Rambut'}
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-teal-deep leading-tight mb-2">
                {result.classification}
              </h2>
              <p className="text-sm text-ink/50 italic mb-1">{conditionLabel(result)}</p>
              <p className="text-sm font-medium text-teal-deep/80 mb-6">{result.skin_type}</p>
              <p className="text-ink/80 leading-relaxed">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-sage/15 border border-sage/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-xl bg-forest/15 flex items-center justify-center">
                    <Check className="h-4 w-4 text-forest" />
                  </div>
                  <h3 className="font-display text-xl text-forest">Lakukan</h3>
                </div>
                <ul className="space-y-3">
                  {result.do.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink/80 leading-relaxed">
                      <span className="text-forest mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-pink-soft/15 border border-pink-soft/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-xl bg-pink-crimson/15 flex items-center justify-center">
                    <X className="h-4 w-4 text-pink-crimson" />
                  </div>
                  <h3 className="font-display text-xl text-pink-crimson">Hindari</h3>
                </div>
                <ul className="space-y-3">
                  {result.dont.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink/80 leading-relaxed">
                      <span className="text-pink-crimson mt-0.5">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-teal-deep text-cream">
              <p className="text-xs tracking-[0.3em] uppercase text-pink-soft font-medium mb-3">
                {result.type === 'hair' ? 'Kandungan haircare yang dibutuhkan' : 'Kandungan skincare yang dibutuhkan'}
              </p>
              <h3 className="font-display text-2xl mb-5">
                {result.type === 'hair'
                  ? 'Cari produk rambut dengan kandungan ini:'
                  : 'Cari produk kulit dengan kandungan ini:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.needed_ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-4 py-2 rounded-full bg-cream/10 border border-cream/20 text-sm font-medium text-cream"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button asChild size="lg" className="flex-1">
                <Link to="/diagnosa/routine">Lihat Rutinitas <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to={productsUrlForDiagnosa(result)}>Lihat Produk</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/diagnosa"><RotateCw className="h-4 w-4" /> Ulangi</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default function DiagnosaResultPage() {
  return <AuthGuard requireOnboarding><DiagnosaResultInner /></AuthGuard>;
}
