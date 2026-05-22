import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-teal-deep text-cream/90 mt-24">
      <Container className="py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="" className="h-10 w-auto bg-cream rounded-lg p-1" />
            <span className="font-display text-2xl">Bareverse</span>
          </div>
          <p className="text-cream/70 max-w-md leading-relaxed">
            Rangkaian skincare dan haircare berbasis diagnosa personal. Dari ragu, ke bare confident.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="mailto:hello@bareverse.id" aria-label="Email" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-display text-lg">Jelajahi</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/products" className="hover:text-cream">Semua Produk</Link></li>
            <li><Link to="/products?type=skincare" className="hover:text-cream">Skincare</Link></li>
            <li><Link to="/products?type=haircare" className="hover:text-cream">Haircare</Link></li>
            <li><Link to="/diagnosa" className="hover:text-cream">Diagnosa</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-display text-lg">Bantuan</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><a href="#" className="hover:text-cream">FAQ</a></li>
            <li><a href="#" className="hover:text-cream">Pengiriman</a></li>
            <li><a href="#" className="hover:text-cream">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-cream">Hubungi Kami</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/60">
          <p>© 2026 Bareverse. Semua produk telah terdaftar di BPOM.</p>
          <p>Made with care in Indonesia.</p>
        </Container>
      </div>
    </footer>
  );
}
