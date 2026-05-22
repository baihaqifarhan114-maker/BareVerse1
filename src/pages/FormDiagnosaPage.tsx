import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { StepProgress } from '@/components/diagnosa/StepProgress';
import { QuestionCard } from '@/components/diagnosa/QuestionCard';
import { AuthGuard } from '@/components/AuthGuard';
import { useUserStore } from '@/store/userStore';
import { useDiagnosaStore } from '@/store/diagnosaStore';
import { runFormSkinDiagnosa, runFormHairDiagnosa } from '@/lib/mockAi';
import type { SkinFormAnswers, HairFormAnswers } from '@/types';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

function SkinFormFlow() {
  const navigate = useNavigate();
  const setResult = useDiagnosaStore((s) => s.setResult);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<SkinFormAnswers>>({});

  const update = <K extends keyof SkinFormAnswers>(k: K, v: SkinFormAnswers[K]) => setAnswers({ ...answers, [k]: v });

  const canNext = () => {
    if (step === 1) return !!answers.complaint;
    if (step === 2) return !!answers.type;
    if (step === 3) return !!answers.acneFrequency;
    if (step === 4) return !!answers.extra;
    return false;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    const result = runFormSkinDiagnosa(answers as SkinFormAnswers);
    setResult(result);
    navigate('/diagnosa/result');
  };

  return (
    <div className="w-full max-w-xl space-y-8">
      <StepProgress current={step} total={4} />

      {step === 1 && (
        <QuestionCard
          title="Apa keluhan utama kulitmu sekarang?"
          subtitle="Pilih yang paling mengganggu — kita bisa atasi yang lain di rutinitas."
          selected={answers.complaint ?? null}
          onSelect={(v) => update('complaint', v)}
          options={[
            { value: 'acne', label: 'Jerawat aktif', hint: 'Ada beberapa jerawat yang sedang meradang' },
            { value: 'oily', label: 'Berminyak & komedo', hint: 'T-zone shiny, banyak whiteheads/blackheads' },
            { value: 'dry', label: 'Kering & ketarik', hint: 'Kulit terasa kasar, kadang mengelupas' },
            { value: 'dull', label: 'Kusam tidak merata', hint: 'Warna kulit tidak even, kurang glowing' },
            { value: 'sensitive', label: 'Sensitif & mudah memerah', hint: 'Sering perih atau kemerahan' },
            { value: 'spots', label: 'Bekas jerawat & flek', hint: 'PIH atau dark spots dari matahari' },
            { value: 'aging', label: 'Tanda penuaan', hint: 'Garis halus, kurang firm' },
          ]}
        />
      )}

      {step === 2 && (
        <QuestionCard
          title="Bagaimana tipe kulitmu sehari-hari?"
          subtitle="Cek 1-2 jam setelah cuci muka tanpa produk apa pun."
          selected={answers.type ?? null}
          onSelect={(v) => update('type', v)}
          options={[
            { value: 'oily', label: 'Berminyak', hint: 'Seluruh wajah cepat shiny' },
            { value: 'dry', label: 'Kering', hint: 'Terasa ketarik & kasar' },
            { value: 'combination', label: 'Kombinasi', hint: 'T-zone berminyak, pipi normal/kering' },
            { value: 'normal', label: 'Normal', hint: 'Tidak terlalu berminyak, tidak kering' },
          ]}
        />
      )}

      {step === 3 && (
        <QuestionCard
          title="Seberapa sering kamu berjerawat?"
          subtitle="Termasuk jerawat kecil, whitehead, atau papul."
          selected={answers.acneFrequency ?? null}
          onSelect={(v) => update('acneFrequency', v)}
          options={[
            { value: 'sering', label: 'Sering', hint: 'Hampir selalu ada jerawat baru tiap minggu' },
            { value: 'kadang', label: 'Kadang-kadang', hint: 'Hanya saat haid atau stress' },
            { value: 'jarang', label: 'Jarang', hint: '1-2 jerawat per bulan atau lebih lama' },
            { value: 'never', label: 'Hampir tidak pernah', hint: 'Bukan masalah utama buatku' },
          ]}
        />
      )}

      {step === 4 && (
        <QuestionCard
          title="Apakah ada kondisi tambahan?"
          subtitle="Pilih yang paling relevan; bisa skip kalau tidak ada."
          selected={answers.extra ?? null}
          onSelect={(v) => update('extra', v)}
          options={[
            { value: 'sensitive', label: 'Sensitif & reaktif', hint: 'Mudah iritasi dengan produk baru' },
            { value: 'hyperpig', label: 'Banyak bekas jerawat/flek', hint: 'PIH atau melasma menonjol' },
            { value: 'mature', label: 'Tanda penuaan terlihat', hint: 'Garis halus atau kulit kurang elastis' },
            { value: 'none', label: 'Tidak ada', hint: 'Hanya keluhan utama tadi saja' },
          ]}
        />
      )}

      <div className="flex items-center justify-between pt-2">
        <Button onClick={() => (step === 1 ? navigate('/diagnosa') : setStep(step - 1))} variant="ghost" size="lg">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
        <Button onClick={handleNext} disabled={!canNext()} size="lg">
          {step === 4 ? (<><Sparkles className="h-4 w-4" /> Lihat Hasil</>) : (<>Lanjut <ArrowRight className="h-4 w-4" /></>)}
        </Button>
      </div>
    </div>
  );
}

function HairFormFlow() {
  const navigate = useNavigate();
  const setResult = useDiagnosaStore((s) => s.setResult);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<HairFormAnswers>>({});

  const update = <K extends keyof HairFormAnswers>(k: K, v: HairFormAnswers[K]) => setAnswers({ ...answers, [k]: v });

  const canNext = () => {
    if (step === 1) return !!answers.complaint;
    if (step === 2) return !!answers.washFrequency;
    if (step === 3) return !!answers.history;
    return false;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const result = runFormHairDiagnosa(answers as HairFormAnswers);
    setResult(result);
    navigate('/diagnosa/result');
  };

  return (
    <div className="w-full max-w-xl space-y-8">
      <StepProgress current={step} total={3} />

      {step === 1 && (
        <QuestionCard
          title="Apa keluhan utama rambut/kulit kepalamu?"
          selected={answers.complaint ?? null}
          onSelect={(v) => update('complaint', v)}
          options={[
            { value: 'oily-scalp', label: 'Scalp cepat berminyak', hint: 'Rambut lepek 1-2 hari setelah keramas' },
            { value: 'dry-ends', label: 'Ujung kering & bercabang', hint: 'Rambut terasa kasar di bawah' },
            { value: 'dandruff', label: 'Ketombe', hint: 'Serpihan putih di scalp atau pundak' },
            { value: 'hair-fall', label: 'Rontok berlebih', hint: 'Lebih dari segenggam saat keramas' },
            { value: 'colored', label: 'Rambut diwarnai', hint: 'Butuh perawatan color-safe' },
          ]}
        />
      )}

      {step === 2 && (
        <QuestionCard
          title="Seberapa sering kamu keramas?"
          selected={answers.washFrequency ?? null}
          onSelect={(v) => update('washFrequency', v)}
          options={[
            { value: 'daily', label: 'Setiap hari', hint: 'Karena cepat berminyak atau habit' },
            { value: '2-3x', label: '2-3 kali seminggu', hint: 'Frekuensi standar' },
            { value: 'weekly', label: 'Seminggu sekali', hint: 'Rambut kering atau alasan lain' },
          ]}
        />
      )}

      {step === 3 && (
        <QuestionCard
          title="Riwayat treatment kimia?"
          subtitle="Termasuk bleaching, smoothing, perming, dll."
          selected={answers.history ?? null}
          onSelect={(v) => update('history', v)}
          options={[
            { value: 'dye', label: 'Pewarnaan saja', hint: 'Dalam 6 bulan terakhir' },
            { value: 'chemical', label: 'Smoothing/bleaching/perming', hint: 'Treatment heavy chemical' },
            { value: 'none', label: 'Tidak ada', hint: 'Rambut natural tanpa treatment' },
          ]}
        />
      )}

      <div className="flex items-center justify-between pt-2">
        <Button onClick={() => (step === 1 ? navigate('/diagnosa') : setStep(step - 1))} variant="ghost" size="lg">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
        <Button onClick={handleNext} disabled={!canNext()} size="lg">
          {step === 3 ? (<><Sparkles className="h-4 w-4" /> Lihat Hasil</>) : (<>Lanjut <ArrowRight className="h-4 w-4" /></>)}
        </Button>
      </div>
    </div>
  );
}

function FormDiagnosaInner() {
  const onboarding = useUserStore((s) => s.onboarding)!;
  const [mode, setMode] = useState<'skin' | 'hair'>(onboarding.scope === 'hair' ? 'hair' : 'skin');

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] py-12 bg-cream">
        <Container>
          <Link to="/diagnosa" className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-teal-deep mb-6">
            <ArrowLeft className="h-4 w-4" /> Pilih metode lain
          </Link>

          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-white border border-border">
              <button
                onClick={() => setMode('skin')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
                  mode === 'skin' ? 'bg-teal-deep text-cream shadow-sm' : 'text-ink/60 hover:text-teal-deep'
                )}
              >
                Diagnosa Kulit
              </button>
              <button
                onClick={() => setMode('hair')}
                className={cn(
                  'px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
                  mode === 'hair' ? 'bg-teal-deep text-cream shadow-sm' : 'text-ink/60 hover:text-teal-deep'
                )}
              >
                Diagnosa Rambut
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {mode === 'hair' ? <HairFormFlow key="hair" /> : <SkinFormFlow key="skin" />}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default function FormDiagnosaPage() {
  return <AuthGuard requireOnboarding><FormDiagnosaInner /></AuthGuard>;
}
