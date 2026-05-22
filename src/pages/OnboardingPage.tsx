import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { StepProgress } from '@/components/diagnosa/StepProgress';
import { useUserStore } from '@/store/userStore';
import { AuthGuard } from '@/components/AuthGuard';
import type { Gender, DiagnosaScope } from '@/types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type Form = {
  name: string;
  age: string;
  gender: Gender | '';
  scope: DiagnosaScope | '';
};

function OnboardingInner() {
  const navigate = useNavigate();
  const setOnboarding = useUserStore((s) => s.setOnboarding);
  const existingUser = useUserStore((s) => s.user);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>({
    name: existingUser?.name ?? '',
    age: '',
    gender: '',
    scope: '',
  });

  const canNextStep1 = form.name.trim().length >= 2 && Number(form.age) >= 13 && Number(form.age) <= 100 && form.gender !== '';
  const canNextStep2 = form.scope !== '';

  const handleFinish = () => {
    if (!canNextStep1 || !canNextStep2) return;
    setOnboarding({
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender as Gender,
      scope: form.scope as DiagnosaScope,
    });
    navigate('/diagnosa', { replace: true });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cream py-12 px-6">
        <div className="w-full max-w-xl space-y-8">
          <StepProgress current={step} total={2} />

          {step === 1 && (
            <section className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Kenalan dulu</p>
                <h1 className="font-display text-4xl text-teal-deep leading-tight">Ceritakan sedikit tentang kamu.</h1>
                <p className="mt-3 text-ink/70">Info ini membantu kami personalisasi diagnosa &amp; rekomendasi.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Nama panggilan</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Mis. Sasa"
                    className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-teal-bright focus:border-teal-bright transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Usia</label>
                  <input
                    type="number"
                    min={13}
                    max={100}
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="Mis. 24"
                    className="w-full h-12 px-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-teal-bright focus:border-teal-bright transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Jenis kelamin</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['female', 'male', 'other'] as Gender[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setForm({ ...form, gender: g })}
                        className={cn(
                          'h-12 rounded-lg border-2 transition-all text-sm font-medium',
                          form.gender === g
                            ? 'border-teal-bright bg-teal-50 text-teal-deep'
                            : 'border-border bg-white text-ink/70 hover:border-teal-bright/40'
                        )}
                      >
                        {g === 'female' ? 'Perempuan' : g === 'male' ? 'Laki-laki' : 'Lainnya'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)} disabled={!canNextStep1} size="lg">
                  Lanjut <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Apa yang ingin kamu cek?</p>
                <h1 className="font-display text-4xl text-teal-deep leading-tight">Mau diagnosa kulit atau rambut?</h1>
                <p className="mt-3 text-ink/70">Bisa keduanya — pilih satu yang paling jadi prioritas dulu.</p>
              </div>

              <div className="grid gap-3">
                {(
                  [
                    { key: 'skin', title: 'Kulit', body: 'Diagnosa kondisi wajah & rekomendasi skincare' },
                    { key: 'hair', title: 'Rambut', body: 'Diagnosa kulit kepala & rekomendasi haircare' },
                    { key: 'both', title: 'Keduanya', body: 'Mulai dari kulit, lanjut ke rambut nanti' },
                  ] as Array<{ key: DiagnosaScope; title: string; body: string }>
                ).map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setForm({ ...form, scope: o.key })}
                    className={cn(
                      'text-left p-5 rounded-2xl border-2 transition-all',
                      form.scope === o.key
                        ? 'border-teal-bright bg-teal-50/60'
                        : 'border-border bg-white hover:border-teal-bright/40'
                    )}
                  >
                    <h3 className="font-display text-xl text-teal-deep">{o.title}</h3>
                    <p className="text-sm text-ink/60 mt-1">{o.body}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button onClick={() => setStep(1)} variant="ghost" size="lg">
                  <ArrowLeft className="h-4 w-4" /> Kembali
                </Button>
                <Button onClick={handleFinish} disabled={!canNextStep2} size="lg">
                  Mulai Diagnosa <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function OnboardingPage() {
  return <AuthGuard><OnboardingInner /></AuthGuard>;
}
