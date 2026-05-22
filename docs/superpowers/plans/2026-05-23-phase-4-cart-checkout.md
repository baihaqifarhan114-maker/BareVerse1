# Phase 4: Cart + Checkout Implementation Plan

**Goal:** Complete the e-commerce flow — cart Zustand store, cart page, multi-section checkout (address → shipping → payment → review), order confirmation. Wire the existing "Tambah ke Keranjang" button.

**Tech additions:** none. Reuses existing Zustand persist pattern.

## File Map
**Create:** `src/store/cartStore.ts`, `src/lib/shipping.ts`, `src/components/checkout/AddressForm.tsx`, `src/components/checkout/ShippingPicker.tsx`, `src/components/checkout/PaymentPicker.tsx`, `src/components/checkout/OrderSummary.tsx`, `src/pages/CartPage.tsx`, `src/pages/CheckoutPage.tsx`, `src/pages/OrderConfirmationPage.tsx`
**Modify:** `src/App.tsx` (3 new routes), `src/types/index.ts` (CartItem, Address, ShippingOption, PaymentMethod, Order), `src/components/layout/Navbar.tsx` (cart badge), `src/pages/ProductDetailPage.tsx` (wire Add to Cart)

## Tasks
- Task 1: types + cartStore + shipping lib + Navbar badge
- Task 2: ProductDetail Add to Cart wiring + Cart page
- Task 3: Checkout multi-section + Order confirmation

Tag `phase-4-complete` when done.
