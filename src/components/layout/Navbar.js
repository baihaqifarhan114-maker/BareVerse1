import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { Container } from './Container';
import { cn } from '@/lib/utils';
const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Produk' },
    { to: '/diagnosa', label: 'Diagnosa' },
    { to: '/about', label: 'Tentang' },
];
export function Navbar() {
    return (_jsx("header", { className: "sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border", children: _jsxs(Container, { className: "flex h-16 items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx("img", { src: "/assets/logo.png", alt: "Bareverse", className: "h-9 w-auto" }), _jsx("span", { className: "font-display text-xl tracking-tight text-teal-deep hidden sm:inline", children: "Bareverse" })] }), _jsx("nav", { className: "hidden md:flex items-center gap-8", children: navItems.map((item) => (_jsx(NavLink, { to: item.to, className: ({ isActive }) => cn('text-sm font-medium transition-colors hover:text-teal-bright', isActive ? 'text-teal-deep' : 'text-ink/70'), children: item.label }, item.to))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { to: "/cart", "aria-label": "Cart", className: "p-2 rounded-lg hover:bg-teal-50 transition-colors", children: _jsx(ShoppingBag, { className: "h-5 w-5 text-teal-deep" }) }), _jsx(Link, { to: "/auth", "aria-label": "Account", className: "p-2 rounded-lg hover:bg-teal-50 transition-colors", children: _jsx(User, { className: "h-5 w-5 text-teal-deep" }) })] })] }) }));
}
