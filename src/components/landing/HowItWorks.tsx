import { Link } from 'react-router-dom';
import { ScanFace, ListChecks, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

const steps = [
  {
    n: '01',
    icon: ScanFace,
    title: 'Diagnosa',
    body: 'Scan wajah lewat kamera atau jawab kuesioner singkat. Sistem kami menganalisis kondisi kulit & rambutmu dalam hitungan detik.',
  },
  {
    n: '02',
    icon: ListChecks,
    title: 'Rutinitas',
    body: 'Dapatkan rutinitas pagi & malam yang dipersonalisasi — lengkap dengan kandungan aktif yang kulitmu butuhkan.',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Produk',
    body: 'Pilih dari katalog yang sudah difilter sesuai diagnosamu. Tidak ada lagi tebak-tebakan saat checkout.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-teal-deep text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-sage blur-3xl" />
        <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-pink-soft blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-soft font-medium mb-4">Bagaimana caranya</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Tiga langkah menuju kulit yang <span className="italic text-pink-soft">benar-benar kamu.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-display text-6xl text-cream/15 leading-none mb-4">{s.n}</div>
              <div className="h-12 w-12 rounded-2xl bg-cream/10 flex items-center justify-center mb-5">
                <s.icon className="h-5 w-5 text-pink-soft" />
              </div>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-cream/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-8 border-t border-cream/10">
          <p className="text-cream/70 flex-grow">Siap mulai? Diagnosa gratis dan butuh kurang dari 2 menit.</p>
          <Button asChild variant="crimson" size="lg"><Link to="/diagnosa">Mulai Diagnosa Sekarang</Link></Button>
        </div>
      </Container>
    </section>
  );
}
