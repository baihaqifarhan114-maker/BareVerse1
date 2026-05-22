import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroScrollAnimation } from '@/components/landing/HeroScrollAnimation';
import { BrandStory } from '@/components/landing/BrandStory';
import { CategoriesSection } from '@/components/landing/CategoriesSection';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { HowItWorks } from '@/components/landing/HowItWorks';
export default function LandingPage() {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("main", { children: [_jsx(HeroScrollAnimation, {}), _jsx(BrandStory, {}), _jsx(CategoriesSection, {}), _jsx(FeaturedProducts, {}), _jsx(HowItWorks, {})] }), _jsx(Footer, {})] }));
}
