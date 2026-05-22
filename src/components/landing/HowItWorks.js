import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("section", { className: "relative bg-teal-deep text-cream py-24 md:py-32 overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 opacity-[0.07] pointer-events-none", "aria-hidden": true, children: [_jsx("div", { className: "absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-sage blur-3xl" }), _jsx("div", { className: "absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-pink-soft blur-3xl" })] }), _jsxs(Container, { className: "relative", children: [_jsxs("div", { className: "max-w-2xl mb-16", children: [_jsx("p", { className: "text-xs tracking-[0.3em] uppercase text-pink-soft font-medium mb-4", children: "Bagaimana caranya" }), _jsxs("h2", { className: "font-display text-4xl md:text-5xl leading-tight", children: ["Tiga langkah menuju kulit yang ", _jsx("span", { className: "italic text-pink-soft", children: "benar-benar kamu." })] })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: steps.map((s) => (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "font-display text-6xl text-cream/15 leading-none mb-4", children: s.n }), _jsx("div", { className: "h-12 w-12 rounded-2xl bg-cream/10 flex items-center justify-center mb-5", children: _jsx(s.icon, { className: "h-5 w-5 text-pink-soft" }) }), _jsx("h3", { className: "font-display text-2xl mb-3", children: s.title }), _jsx("p", { className: "text-cream/70 leading-relaxed", children: s.body })] }, s.n))) }), _jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center gap-4 pt-8 border-t border-cream/10", children: [_jsx("p", { className: "text-cream/70 flex-grow", children: "Siap mulai? Diagnosa gratis dan butuh kurang dari 2 menit." }), _jsx(Button, { asChild: true, variant: "crimson", size: "lg", children: _jsx(Link, { to: "/diagnosa", children: "Mulai Diagnosa Sekarang" }) })] })] })] }));
}
