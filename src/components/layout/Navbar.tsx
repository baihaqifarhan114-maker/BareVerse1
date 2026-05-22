import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/userStore';
import { useCartStore } from '@/store/cartStore';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Produk' },
  { to: '/diagnosa', label: 'Diagnosa' },
  { to: '/about', label: 'Tentang' },
];

export function Navbar() {
  const user = useUserStore((s) => s.user);
  const signOut = useUserStore((s) => s.signOut);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Bareverse" className="h-9 w-auto" />
          <span className="font-display text-xl tracking-tight text-teal-deep hidden sm:inline">Bareverse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                cn('text-sm font-medium transition-colors hover:text-teal-bright',
                  isActive ? 'text-teal-deep' : 'text-ink/70')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label="Cart" className="relative p-2 rounded-lg hover:bg-teal-50 transition-colors">
            <ShoppingBag className="h-5 w-5 text-teal-deep" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-[20px] px-1 rounded-full bg-pink-crimson text-cream text-[10px] font-bold flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors">
                <div className="h-7 w-7 rounded-full bg-teal-bright text-cream flex items-center justify-center text-xs font-medium">
                  {user.name.slice(0, 1).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-teal-deep">{user.name.split(' ')[0]}</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-ink">{user.name}</p>
                    <p className="text-xs text-ink/60">{user.email}</p>
                  </div>
                  <button onClick={handleSignOut}
                    className="w-full px-4 py-2.5 flex items-center gap-2 text-sm text-ink/80 hover:bg-teal-50 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" aria-label="Account" className="p-2 rounded-lg hover:bg-teal-50 transition-colors">
              <User className="h-5 w-5 text-teal-deep" />
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
