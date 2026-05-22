import { Leaf, FlaskConical, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const pillars = [
  {
    icon: Leaf,
    title: 'Natural-first',
    body: 'Komposisi yang menghormati kulitmu. Ingredient transparan, sourcing bertanggung jawab, formulasi tanpa bahan kontroversial.',
  },
  {
    icon: FlaskConical,
    title: 'Dermatology-backed',
    body: 'Rekomendasi kami berbasis kombinasi konsultasi dermatologis dan diagnosa adaptif — bukan sekedar tren TikTok.',
  },
  {
    icon: HeartHandshake,
    title: 'Approachable',
    body: 'Premium tidak harus mahal atau membingungkan. Tiap produk punya panduan pakai yang jelas dan cocok untuk pemula.',
  },
];

export function BrandStory() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-4">Tentang Bareverse</p>
          <h2 className="font-display text-4xl md:text-5xl text-teal-deep leading-tight">
            Kulit dan rambut yang sehat dimulai dari <span className="italic text-pink-crimson">mengenali dirimu sendiri.</span>
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Bareverse lahir dari satu pertanyaan sederhana: kenapa orang harus tebak-tebakan saat memilih skincare?
            Kami membangun pengalaman belanja yang dimulai dari diagnosa — bukan dari katalog.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="relative p-8 rounded-3xl bg-white border border-border/60 hover:border-teal-bright/40 transition-colors">
              <div className="absolute -top-5 left-8 h-12 w-12 rounded-2xl bg-sage/30 flex items-center justify-center">
                <p.icon className="h-5 w-5 text-forest" />
              </div>
              <h3 className="font-display text-2xl text-teal-deep mt-4 mb-3">{p.title}</h3>
              <p className="text-ink/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
