import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles } from 'lucide-react';

export function HeroScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  const labelBeforeRef = useRef<HTMLDivElement>(null);
  const labelAfterRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const afterImg = afterImgRef.current;
    if (!section || !afterImg) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      afterImg.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
      if (labelBeforeRef.current) labelBeforeRef.current.style.opacity = String(1 - progress);
      if (labelAfterRef.current) labelAfterRef.current.style.opacity = String(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="container-wide py-12">
        <div className="grid grid-cols-2 gap-2 mb-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img src="/assets/before.jpg" alt="Sebelum" className="w-full h-full object-cover" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cream/90 text-xs font-medium text-ink">Sebelum</span>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img src="/assets/after.png" alt="Sesudah" className="w-full h-full object-cover" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-deep text-xs font-medium text-cream">Sesudah</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-display text-4xl text-teal-deep leading-tight">Dari ragu,<br/>ke <span className="text-pink-crimson italic">bare confident.</span></h1>
          <p className="mt-4 text-ink/70">Rangkaian skincare berbasis diagnosa kulitmu sendiri.</p>
          <Button asChild size="lg" className="mt-6"><Link to="/diagnosa">Mulai Diagnosa</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <img src="/assets/before.jpg" alt="Sebelum" className="absolute inset-0 w-full h-full object-cover" />
          <img
            ref={afterImgRef}
            src="/assets/after.png"
            alt="Sesudah"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-cream/40" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/80" aria-hidden />
        </div>

        <div ref={labelBeforeRef} className="absolute top-8 left-8 px-4 py-2 rounded-full bg-cream/90 backdrop-blur-sm shadow-lg">
          <span className="text-xs font-medium tracking-widest uppercase text-ink/60">Sebelum</span>
        </div>
        <div ref={labelAfterRef} className="absolute top-8 right-8 px-4 py-2 rounded-full bg-teal-deep shadow-lg" style={{ opacity: 0 }}>
          <span className="text-xs font-medium tracking-widest uppercase text-cream flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Sesudah
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 pb-20 px-6 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-teal-deep/70 mb-4">Diagnosa · Rutinitas · Hasil</p>
          <h1 className="font-display text-5xl md:text-7xl text-teal-deep leading-[1.05] max-w-4xl mx-auto">
            Dari ragu, ke <span className="text-pink-crimson italic">bare confident.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-xl mx-auto">
            Scroll untuk lihat bagaimana rutinitas Bareverse menemani perjalanan kulitmu.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg"><Link to="/diagnosa">Mulai Diagnosa</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/products">Jelajahi Produk</Link></Button>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 text-ink/40">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
