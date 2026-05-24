import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/components/AuthGuard';
import { useDiagnosaStore } from '@/store/diagnosaStore';
import { generateRoutine } from '@/lib/mockAi';
import { Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoutineStep } from '@/types';
import { productsUrlForDiagnosa, productsUrlForType } from '@/lib/diagnosaDisplay';

function StepCard({ step, resultType }: { step: RoutineStep; resultType: 'skin' | 'hair' }) {
  const productLink = productsUrlForType(resultType, step.productCategoryFilter);

  return (
    <div className="relative p-6 rounded-2xl bg-white border border-border hover:border-teal-bright/40 transition-colors">
      <div className="flex items-start gap-4">
        <div className="font-display text-3xl text-teal-bright/40 leading-none w-10 shrink-0">
          {String(step.step).padStart(2, '0')}
        </div>
        <div className="flex-grow">
          <h3 className="font-display text-xl text-teal-deep mb-2">{step.name}</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {step.recommendedIngredients.map((ing) => (
              <span key={ing} className="px-2.5 py-0.5 rounded-full bg-sage/20 text-forest text-xs font-medium">
                {ing}
              </span>
            ))}
          </div>
          <Link
            to={productLink}
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-bright hover:text-teal-deep"
          >
            Lihat produk yang cocok <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function RoutineInner() {
  const result = useDiagnosaStore((s) => s.currentResult);
  const routine = useDiagnosaStore((s) => s.currentRoutine);
  const setRoutine = useDiagnosaStore((s) => s.setRoutine);
  const [tab, setTab] = useState<'morning' | 'evening'>('morning');

  useEffect(() => {
    if (result && !routine) {
      setRoutine(generateRoutine(result));
    }
  }, [result, routine, setRoutine]);

  if (!result) return <Navigate to="/diagnosa" replace />;

  const activeRoutine = routine ?? generateRoutine(result);
  const steps = activeRoutine[tab];

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] py-12 bg-cream">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            <header className="text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">
                Rekomendasi Rutinitas
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-teal-deep leading-tight">
                Rutinitas untuk <span className="italic">{result.classification}</span>
              </h1>
              <p className="mt-4 text-ink/70 max-w-xl mx-auto">
                {result.type === 'hair'
                  ? 'Rutinitas keramas & perawatan harian. Tiap langkah menarget scalp atau batang rambut dengan kandungan yang tepat.'
                  : 'Ikuti urutan ini setiap hari. Tiap langkah punya ingredient utama yang cocok dengan kondisimu.'}
              </p>
            </header>

            <div className="flex justify-center">
              <div className="inline-flex p-1 rounded-xl bg-teal-50 border border-teal-100">
                <button
                  onClick={() => setTab('morning')}
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
                    tab === 'morning' ? 'bg-white text-teal-deep shadow-sm' : 'text-ink/60 hover:text-teal-deep'
                  )}
                >
                  <Sun className="h-4 w-4" /> {result.type === 'hair' ? 'Harian' : 'Pagi'}
                </button>
                <button
                  onClick={() => setTab('evening')}
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
                    tab === 'evening' ? 'bg-white text-teal-deep shadow-sm' : 'text-ink/60 hover:text-teal-deep'
                  )}
                >
                  <Moon className="h-4 w-4" /> {result.type === 'hair' ? 'Keramas' : 'Malam'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <StepCard key={`${tab}-${step.step}`} step={step} resultType={result.type} />
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-teal-deep text-cream text-center">
              <Sparkles className="h-6 w-6 text-pink-soft mx-auto mb-3" />
              <h3 className="font-display text-2xl mb-2">Mau lihat semua produk sekaligus?</h3>
              <p className="text-cream/70 mb-6 max-w-lg mx-auto">
                Filter sudah otomatis disetel berdasarkan diagnosamu — ingredient match akan muncul di tiap produk.
              </p>
              <Button asChild variant="crimson" size="lg">
                <Link to={productsUrlForDiagnosa(result)}>Lihat Semua Rekomendasi <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default function RoutineRecommendationPage() {
  return <AuthGuard requireOnboarding><RoutineInner /></AuthGuard>;
}
