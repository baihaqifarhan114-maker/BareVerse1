import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { CameraScan } from '@/components/diagnosa/CameraScan';
import { AuthGuard } from '@/components/AuthGuard';
import { useUserStore } from '@/store/userStore';
import { useDiagnosaStore } from '@/store/diagnosaStore';
import { runCameraDiagnosa } from '@/lib/mockAi';
import { ArrowLeft } from 'lucide-react';
import type { DiagnosaType } from '@/types';

function CameraDiagnosaInner() {
  const navigate = useNavigate();
  const onboarding = useUserStore((s) => s.onboarding)!;
  const setResult = useDiagnosaStore((s) => s.setResult);

  const handleComplete = () => {
    const type: DiagnosaType = onboarding.scope === 'hair' ? 'hair' : 'skin';
    const result = runCameraDiagnosa(onboarding, type);
    setResult(result);
    navigate('/diagnosa/result');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] py-12">
        <Container>
          <Link to="/diagnosa" className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-teal-deep mb-6">
            <ArrowLeft className="h-4 w-4" /> Pilih metode lain
          </Link>

          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Virtual Camera</p>
            <h1 className="font-display text-4xl text-teal-deep leading-tight">
              Posisikan wajahmu di dalam bingkai.
            </h1>
            <p className="mt-3 text-ink/70">
              Pastikan pencahayaan cukup, lepas kacamata jika ada, dan tatap langsung ke kamera.
            </p>
          </div>

          <CameraScan onScanComplete={handleComplete} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default function CameraDiagnosaPage() {
  return <AuthGuard requireOnboarding><CameraDiagnosaInner /></AuthGuard>;
}
