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
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Bareverse" className="h-9 w-auto" />
          <span className="font-display text-xl tracking-tight text-teal-deep hidden sm:inline">Bareverse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-teal-bright',
                  isActive ? 'text-teal-deep' : 'text-ink/70'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label="Cart" className="p-2 rounded-lg hover:bg-teal-50 transition-colors">
            <ShoppingBag className="h-5 w-5 text-teal-deep" />
          </Link>
          <Link to="/auth" aria-label="Account" className="p-2 rounded-lg hover:bg-teal-50 transition-colors">
            <User className="h-5 w-5 text-teal-deep" />
          </Link>
        </div>
      </Container>
    </header>
  );
}
