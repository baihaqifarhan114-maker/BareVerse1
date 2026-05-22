import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DiagnosaChoicePage from './pages/DiagnosaChoicePage';
import CameraDiagnosaPage from './pages/CameraDiagnosaPage';
import FormDiagnosaPage from './pages/FormDiagnosaPage';
import DiagnosaResultPage from './pages/DiagnosaResultPage';
import RoutineRecommendationPage from './pages/RoutineRecommendationPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/diagnosa" element={<DiagnosaChoicePage />} />
      <Route path="/diagnosa/camera" element={<CameraDiagnosaPage />} />
      <Route path="/diagnosa/form" element={<FormDiagnosaPage />} />
      <Route path="/diagnosa/result" element={<DiagnosaResultPage />} />
      <Route path="/diagnosa/routine" element={<RoutineRecommendationPage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order/confirmation" element={<OrderConfirmationPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
