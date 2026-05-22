import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroScrollAnimation } from '@/components/landing/HeroScrollAnimation';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScrollAnimation />
        <section className="container-wide py-32 text-center">
          <h2 className="font-display text-3xl text-teal-deep">More sections coming…</h2>
        </section>
      </main>
      <Footer />
    </>
  );
}
