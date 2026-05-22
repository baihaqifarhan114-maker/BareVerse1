import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("section", { className: "bg-teal-deep/[0.03] py-24 md:py-32", children: _jsxs(Container, { children: [_jsxs("div", { className: "flex items-end justify-between mb-12", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3", children: "Koleksi" }), _jsx("h2", { className: "font-display text-4xl md:text-5xl text-teal-deep", children: "Pilih perjalananmu." })] }), _jsxs(Link, { to: "/products", className: "hidden md:inline-flex items-center gap-1 text-sm font-medium text-teal-bright hover:text-teal-deep", children: ["Lihat semua ", _jsx(ArrowUpRight, { className: "h-4 w-4" })] })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: categories.map((c) => (_jsxs(Link, { to: c.href, className: "group relative overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[16/11]", children: [_jsx("img", { src: c.image, alt: c.label, className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" }), _jsxs("div", { className: "absolute inset-0 p-8 flex flex-col justify-end", children: [_jsx("span", { className: `inline-flex w-fit px-3 py-1 rounded-full ${c.accent} ${c.text} text-xs font-medium tracking-wider uppercase mb-3`, children: c.tagline }), _jsx("h3", { className: "font-display text-4xl md:text-5xl text-cream mb-2", children: c.label }), _jsx("p", { className: "text-cream/80 max-w-md leading-relaxed", children: c.description }), _jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-cream text-sm font-medium", children: ["Jelajahi koleksi ", _jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" })] })] })] }, c.label))) })] }) }));
}
