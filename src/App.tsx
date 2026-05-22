import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProductListingPage from './pages/ProductListingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
