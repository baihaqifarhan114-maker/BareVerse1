import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroScrollAnimation } from '@/components/landing/HeroScrollAnimation';
import { BrandStory } from '@/components/landing/BrandStory';
import { CategoriesSection } from '@/components/landing/CategoriesSection';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScrollAnimation />
        <BrandStory />
        <CategoriesSection />
        <FeaturedProducts />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
