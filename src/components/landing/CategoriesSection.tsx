import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const categories = [
  {
    href: '/products?type=skincare',
    label: 'Skincare',
    tagline: 'Untuk wajah yang bercerita',
    description: 'Cleanser, toner, serum, moisturizer, dan sunscreen yang diformulasi untuk berbagai kondisi kulit.',
    image: '/assets/after.png',
    accent: 'bg-pink-soft',
    text: 'text-pink-crimson',
  },
  {
    href: '/products?type=haircare',
    label: 'Haircare',
    tagline: 'Untuk rambut yang bernafas',
    description: 'Treatment & mask yang merawat kulit kepala dan ujung rambut tanpa membebani.',
    image: '/assets/before.jpg',
    accent: 'bg-sage/40',
    text: 'text-forest',
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-teal-deep/[0.03] py-24 md:py-32">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Koleksi</p>
            <h2 className="font-display text-4xl md:text-5xl text-teal-deep">Pilih perjalananmu.</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-teal-bright hover:text-teal-deep">
            Lihat semua <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[16/11]"
            >
              <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className={`inline-flex w-fit px-3 py-1 rounded-full ${c.accent} ${c.text} text-xs font-medium tracking-wider uppercase mb-3`}>
                  {c.tagline}
                </span>
                <h3 className="font-display text-4xl md:text-5xl text-cream mb-2">{c.label}</h3>
                <p className="text-cream/80 max-w-md leading-relaxed">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-cream text-sm font-medium">
                  Jelajahi koleksi <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
