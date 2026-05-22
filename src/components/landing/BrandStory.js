import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("section", { className: "bg-cream py-24 md:py-32", children: _jsxs(Container, { children: [_jsxs("div", { className: "max-w-2xl mx-auto text-center mb-16", children: [_jsx("p", { className: "text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-4", children: "Tentang Bareverse" }), _jsxs("h2", { className: "font-display text-4xl md:text-5xl text-teal-deep leading-tight", children: ["Kulit dan rambut yang sehat dimulai dari ", _jsx("span", { className: "italic text-pink-crimson", children: "mengenali dirimu sendiri." })] }), _jsx("p", { className: "mt-6 text-ink/70 leading-relaxed", children: "Bareverse lahir dari satu pertanyaan sederhana: kenapa orang harus tebak-tebakan saat memilih skincare? Kami membangun pengalaman belanja yang dimulai dari diagnosa \u2014 bukan dari katalog." })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: pillars.map((p) => (_jsxs("div", { className: "relative p-8 rounded-3xl bg-white border border-border/60 hover:border-teal-bright/40 transition-colors", children: [_jsx("div", { className: "absolute -top-5 left-8 h-12 w-12 rounded-2xl bg-sage/30 flex items-center justify-center", children: _jsx(p.icon, { className: "h-5 w-5 text-forest" }) }), _jsx("h3", { className: "font-display text-2xl text-teal-deep mt-4 mb-3", children: p.title }), _jsx("p", { className: "text-ink/70 leading-relaxed", children: p.body })] }, p.title))) })] }) }));
}
