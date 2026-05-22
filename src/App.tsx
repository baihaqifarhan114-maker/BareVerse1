import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DiagnosaChoicePage from './pages/DiagnosaChoicePage';
import ProductListingPage from './pages/ProductListingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/diagnosa" element={<DiagnosaChoicePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
