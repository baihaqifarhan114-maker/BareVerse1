# Bareverse E-Commerce — Design Spec

**Date:** 2026-05-22
**Status:** Draft for user review
**Owner:** baihaqifarhan114@gmail.com

---

## 1. Vision & Positioning

**Bareverse** is an Indonesian beauty e-commerce experience inspired by Wardah Beauty, but built around a personalized diagnosa-driven journey: user signs up → completes onboarding → runs a skin/hair diagnosa (via webcam *or* form-based DSS) → receives a structured AI-style result → gets a recommended routine + curated product list → checks out.

**Brand vibe:** Botanical / Wellness — natural, warm, trustworthy, premium-but-approachable. The lotus + wave logo drives the visual language: soft organic curves, plant accents, generous whitespace, serif display headings paired with humanist sans body.

**Audience:** Indonesian female & male skincare consumers, age 18–35, who want guided recommendations rather than browsing a flat catalog.

---

## 2. Tech Stack & Architecture Decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | React 18 + TypeScript + Vite | Brief requirement; fast dev; modern |
| Styling | Tailwind CSS v3 + shadcn/ui | Brief requirement; consistent design tokens |
| Routing | React Router v6 | Standard for SPA navigation |
| State | Zustand (with `persist` middleware) | Lighter than Redux; persists cart/user/diagnosa to localStorage out of the box |
| Animation | Framer Motion + raw scroll listener (for hero clip-path wipe) | Framer for transitions/microinteractions, scroll listener for the buttery before/after wipe |
| Data | Static JSON imported at build | XLSX/CSV converted once via a Node script to `src/data/*.json` |
| AI | **Mock engine** — deterministic local logic | No API key, no backend, no rate limits. Decided in brainstorm. |
| Auth | **Fake Google SSO** — click button → create demo user in localStorage | No real OAuth |
| Forms | react-hook-form + zod | Type-safe validation |
| Icons | lucide-react | Default with shadcn |
| Language | Mixed Indonesian / English (nav & labels EN, content & copy ID) | Per user decision |

**No backend.** Everything is client-side simulation. Cart, user, and diagnosa result persist via Zustand's `persist` middleware → localStorage.

---

## 3. Design System

### Colors (Tailwind theme extension)

```js
colors: {
  teal: {
    deep: '#015C6B',   // primary dark — heading, nav text
    bright: '#0998A3', // primary — buttons, links
  },
  pink: {
    soft: '#EDAFBA',   // accent light — backgrounds, soft highlights
    crimson: '#D14063',// accent bold — CTA, sale tag, hot
  },
  sage: '#A0CD99',     // secondary — success, secondary buttons
  forest: '#268144',   // secondary dark — text on sage, organic accents
  cream: '#FAF7F2',    // off-white background (not from palette but needed for botanical warmth)
  ink: '#1A2B2E',      // body text (near-black with teal undertone)
}
```

### Typography

- **Display / Heading:** **Fraunces** (variable serif, organic, modern) — `font-display` class
- **Body:** **DM Sans** (humanist sans, warm, very readable) — base font

Both are Google Fonts — loaded via `<link>` in `index.html`. No Inter/Roboto/Arial.

### Spacing & Rhythm
- Base unit: 4px (Tailwind default)
- Section vertical padding: `py-20 md:py-28`
- Container max-width: `max-w-7xl mx-auto px-6`

### Components (shadcn/ui)
Install only what's needed: `button`, `input`, `select`, `card`, `dialog`, `sheet`, `radio-group`, `checkbox`, `badge`, `separator`, `progress`, `toast`, `dropdown-menu`, `tabs`, `accordion`.

All shadcn components themed to the palette above via `components.json` + CSS vars in `index.css`.

---

## 4. Folder Structure

```
BareVerse/
├── docs/superpowers/specs/        # this file + future plans
├── public/
│   └── assets/                    # logo, before/after images (copied from Downloads)
├── scripts/
│   └── convert-data.mjs           # one-shot XLSX/CSV → JSON converter
├── src/
│   ├── main.tsx
│   ├── App.tsx                    # router root
│   ├── index.css                  # tailwind + CSS vars
│   ├── components/
│   │   ├── ui/                    # shadcn primitives
│   │   ├── layout/                # Navbar, Footer, Container
│   │   ├── landing/               # HeroScrollAnimation, BrandStory, Categories, FeaturedProducts, HowItWorks
│   │   ├── product/               # ProductCard, ProductGrid, ProductFilters, IngredientChip
│   │   ├── diagnosa/              # CameraScan, FormQuestionnaire, DiagnosaResult, RoutineSteps
│   │   ├── checkout/              # AddressForm, ShippingPicker, PaymentPicker, OrderSummary
│   │   └── common/                # PriceTag, RatingStars, LoadingSpinner, etc.
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── OnboardingPage.tsx
│   │   ├── DiagnosaChoicePage.tsx
│   │   ├── CameraDiagnosaPage.tsx
│   │   ├── FormDiagnosaPage.tsx
│   │   ├── DiagnosaResultPage.tsx
│   │   ├── RoutineRecommendationPage.tsx
│   │   ├── ProductListingPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── OrderConfirmationPage.tsx
│   ├── store/
│   │   ├── userStore.ts           # auth + onboarding data
│   │   ├── diagnosaStore.ts       # current diagnosa result + history
│   │   └── cartStore.ts           # cart items, totals
│   ├── lib/
│   │   ├── mockAi.ts              # the "AI" engine — see §6
│   │   ├── recommendations.ts     # match diagnosa result → product list
│   │   ├── utils.ts               # cn(), formatRupiah(), etc.
│   │   └── shipping.ts            # JNT/JNE/Sicepat simulation
│   ├── data/
│   │   ├── products.json          # generated from product.xlsx + haircare csv
│   │   ├── ingredients.json       # generated from ingredients_category.xlsx
│   │   └── claims.json            # generated from product_claim_category.xlsx
│   └── types/
│       └── index.ts               # Product, Ingredient, DiagnosaResult, etc.
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── components.json                # shadcn config
```

---

## 5. Routing Map

```
/                        → LandingPage
/auth                    → AuthPage  (sign in / sign up — fake Google button)
/onboarding              → OnboardingPage  (name, age, gender, diagnosa type)
/diagnosa                → DiagnosaChoicePage  (Camera vs Form)
/diagnosa/camera         → CameraDiagnosaPage
/diagnosa/form           → FormDiagnosaPage
/diagnosa/result         → DiagnosaResultPage  (Output 1)
/diagnosa/routine        → RoutineRecommendationPage  (Output 2)
/products                → ProductListingPage  (Output 3+4)
/products/:id            → ProductDetailPage  (Output 5)
/cart                    → CartPage
/checkout                → CheckoutPage
/order/confirmation      → OrderConfirmationPage
```

**Auth guard:** `/onboarding` onward redirects to `/auth` if no user in store. `/products`, `/cart` accessible to all (so users can browse without sign-in), but `/diagnosa/*` and `/checkout` require auth.

---

## 6. Mock AI Engine — How It Works

`src/lib/mockAi.ts` exports two main functions, both returning JSON matching the brief's spec:

### `runFormDiagnosa(answers, onboarding) → DiagnosaResult`
Deterministic decision tree:
- For **skin**: primary complaint (acne / dry / dull / sensitive / oily) × frequency × skin type → maps to 1 of ~8 classifications (e.g. "Acne-Prone Oily Skin", "Dehydrated Sensitive Skin", "Mature Dull Skin").
- For **hair**: primary complaint (oily-scalp / dry-ends / dandruff / hair-fall / colored) → maps to ~6 classifications.

Each classification has a pre-written template with:
- `explanation` (2–3 sentence Indonesian copy)
- `do` (3–5 bullet points)
- `dont` (3–5 bullet points)
- `needed_ingredients` (4–6 ingredient names matching `ingredients.json`)

### `runCameraDiagnosa(onboarding) → DiagnosaResult`
After a 3-second simulated "analyzing" delay, picks a result weighted by onboarding age & gender (e.g. age 18–25 + male → higher chance of "Acne-Prone Oily Skin"; age 30+ → higher chance of "Mature Dull Skin"). Small random jitter so re-scans can yield different results, but biased to be plausible.

### `generateRoutine(diagnosaResult) → Routine`
Returns 2 arrays (`morning`, `evening`), each item:
```ts
{ step: number; name: string; recommendedIngredients: string[]; productCategoryFilter: string }
```
The category filter is used by the routine page to deep-link into product listing pre-filtered.

### Output 1 example
```json
{
  "skin_type": "Acne-Prone Oily Skin",
  "classification": "Kulit Berminyak dengan Jerawat Aktif",
  "explanation": "Kulit Anda menghasilkan sebum berlebih yang menyumbat pori-pori...",
  "do": ["Cuci muka 2x sehari dengan cleanser lembut", "..."],
  "dont": ["Hindari produk berbasis minyak komedogenik", "..."],
  "needed_ingredients": ["Niacinamide", "Salicylic Acid", "Centella Asiatica Extract", "Hyaluronic Acid"]
}
```

---

## 7. Data Pipeline

`scripts/convert-data.mjs` is a one-shot Node script (uses `xlsx` + `csv-parse`) that:
1. Reads `C:\Users\baiha\Downloads\archive\product.xlsx` → extracts product rows → normalizes (price as integer rupiah, ratings as numbers, ingredients as string array)
2. Reads `C:\Users\baiha\Downloads\archive\ingredients_category.xlsx` → builds ingredient lookup table
3. Reads `C:\Users\baiha\Downloads\archive\product_claim_category.xlsx` → maps product names → claims
4. Reads `C:\Users\baiha\Downloads\haircare_hairtreatment.csv` → normalizes price (handles "Rp 95.000Rp 76.000" → original + discount), category, etc.
5. Joins all into one canonical `products.json` with shape:

```ts
type Product = {
  id: string;
  name: string;
  brand: string;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'haircare' | 'hair-treatment' | ...;
  originalPrice: number;       // in rupiah, integer
  discountedPrice: number | null;
  ingredients: string[];       // INCI names
  primaryIngredients: string[];// top 4–5 highlighted
  rating: number | null;       // 0–5
  reviewCount: number;
  imageUrl: string;            // placeholder via picsum or unsplash
  bpomId?: string;
  productType: 'skincare' | 'haircare';
  claims: string[];            // tags like "fragrance-free", "for-acne", etc.
}
```

Script run once via `npm run data:build`. Output committed to repo. Images use seeded picsum placeholders since real product photos aren't in the dataset.

---

## 8. Hero Scroll Animation (Landing)

A `HeroScrollAnimation` component implements the Apple-style wipe:

**Structure:**
```
<section ref={pinRef} className="h-[200vh] relative">
  <div className="sticky top-0 h-screen overflow-hidden">
    <img src="/assets/before.jpg" />     {/* base layer */}
    <img src="/assets/after.png"
         style={{ clipPath: `inset(0 0 0 ${progress * 100}%)` }} />
    <div className="absolute bottom-10 text-center">
      <h1>Dari ragu, ke bare confident.</h1>
      <p>Scroll untuk lihat transformasi Bareverse.</p>
    </div>
  </div>
</section>
```

A scroll listener (throttled via `requestAnimationFrame`) computes `progress = clamp(scrollY / pinHeight, 0, 1)` and sets clip-path inline. No Framer Motion for this part — direct DOM update is smoother. When the user stops scrolling, the frame freezes naturally (no inertia).

**Mobile:** falls back to a simple side-by-side static comparison if `window.innerWidth < 768`, since pinned sections are jank-prone on mobile.

---

## 9. Page-by-Page Specs

### 9.1 Landing
1. Hero with scroll animation (above)
2. Brand story section — short copy, lotus illustration, color blocks
3. Categories — 2 large tiles: "Skincare" / "Haircare"
4. Featured products — 4 cards horizontally scrollable on mobile
5. How it works — 3 steps with icons (Diagnosa → Rutinitas → Produk)
6. Footer — links, social, contact, BPOM compliance note

### 9.2 Auth
Centered card. Single button "Sign in with Google" (with Google icon). Click → fake user `{ name: "Demo User", email: "demo@bareverse.id", avatarUrl: "/assets/avatar-demo.png" }` saved to Zustand → redirect to `/onboarding` if first time, else `/`.

### 9.3 Onboarding (multi-step, progress bar)
Step 1: Name + Age + Gender
Step 2: Diagnosa type checkboxes (Kulit / Rambut / Keduanya)
Step 3: "Lanjut ke Diagnosa" CTA

### 9.4 Diagnosa Choice
Two large cards: "Virtual Camera" (icon: camera) / "Form Diagnosa" (icon: clipboard). Each with short copy explaining the method.

### 9.5 Camera Diagnosa
- `getUserMedia` with `video: { facingMode: 'user' }`
- Live preview in rounded rectangle with a soft botanical frame
- "Scan Sekarang" button → 3.5s loading animation (animated dots + status text cycling: "Menganalisis tekstur kulit..." → "Mendeteksi pola jerawat..." → "Menghitung rekomendasi...")
- On done → navigate to `/diagnosa/result` with result in store
- Permission-denied fallback: show form diagnosa CTA instead

### 9.6 Form Diagnosa
Adaptive 2–4 question flow rendered as one-question-at-a-time cards with progress bar. Branches based on prior answers. Submit → mockAi → navigate to result.

### 9.7 Diagnosa Result
- Hero card: classification name (large display serif) + skin/hair type tag
- Explanation paragraph
- Two columns: ✅ Do / ❌ Don't
- "Kandungan yang Dibutuhkan" — chip row of ingredients (each chip links to filtered listing)
- CTA: "Lihat Rekomendasi Rutinitas →"

### 9.8 Routine Recommendation
- Tabs: Pagi / Malam
- Step list with number, name, ingredients, "Lihat produk →" link per step
- Bottom CTA: "Lihat Semua Rekomendasi Produk →"

### 9.9 Product Listing
Sidebar filters: category, price range (radio: <50k / 50–150k / >150k), ingredient match (auto-checked from diagnosa). Grid 3-col desktop / 2-col mobile. Empty state if no match.

### 9.10 Product Detail
Two-column: left image gallery (placeholder), right info (name, brand, price w/ discount strike, rating, ingredients with highlights for diagnosa-matched ones, usage instructions, "Cocok untuk" tags, quantity + Add to Cart button).

### 9.11 Cart
Table of items (image, name, qty stepper, line total, remove). Subtotal + shipping placeholder. CTA: "Checkout".

### 9.12 Checkout (single page, accordion sections)
1. Alamat — full form (nama, no HP, provinsi, kota, kecamatan, kode pos, alamat detail)
2. Ekspedisi — radio cards (JNT Rp15k 2-3 hari / JNE Rp18k 1-2 hari / Sicepat Rp12k 2-4 hari)
3. Pembayaran — radio cards (BNI VA / BRI VA). Selecting one reveals a fake VA number.
4. Order summary sticky on right (desktop) / bottom (mobile)
5. "Bayar Sekarang" → creates order in store → redirects to confirmation

### 9.13 Order Confirmation
Success illustration, order number, estimated arrival, "Lanjut Belanja" + "Lihat Pesanan" buttons. Cart cleared.

---

## 10. State Management Detail

### `userStore`
```ts
{ user: User | null, onboarding: OnboardingData | null,
  signIn(), signOut(), setOnboarding() }
```

### `diagnosaStore`
```ts
{ currentResult: DiagnosaResult | null, currentRoutine: Routine | null,
  history: DiagnosaResult[],
  setResult(), setRoutine(), clear() }
```

### `cartStore`
```ts
{ items: CartItem[], add(), remove(), updateQty(), clear(),
  subtotal: number /* computed */ }
```

All three use `persist` middleware with key `bareverse:<store-name>`.

---

## 11. Error Handling & Edge Cases

- **Camera permission denied** → friendly card with "Use form diagnosa instead" CTA
- **No products match filters** → empty state with "Reset filters" button
- **Cart empty on /checkout** → redirect to /cart
- **Direct navigation to /diagnosa/result without a result** → redirect to /diagnosa
- **localStorage quota** → if persist fails, app continues in-memory (no crash)
- **Data file missing at build** → script exits with clear error message

---

## 12. Phasing (Implementation Plan)

| Phase | Deliverables | Demo gate |
|---|---|---|
| **1. Foundation + Landing** | Vite scaffold, Tailwind theme, shadcn install, fonts, router, Navbar/Footer, Landing page with all 6 sections including hero scroll animation | Open `/` → see polished landing, scroll animation works smoothly |
| **2. Auth + Onboarding + Diagnosa** | Fake Google SSO, multi-step onboarding, diagnosa choice, camera diagnosa, form diagnosa, diagnosa result page, mock AI engine | Click sign in → onboard → run both diagnosa methods → see result |
| **3. Products + Routine** | Data conversion script, products.json, ingredients.json, routine recommendation page, product listing with filters, product detail | From diagnosa result → see routine → click step → land on pre-filtered listing → open detail |
| **4. Cart + Checkout** | Cart page, checkout multi-section form, shipping picker, payment picker, order confirmation | Add to cart → checkout → fill address → pick shipping & payment → confirmation page with cleared cart |

Each phase ends with a verification pass: dev server runs, no console errors, key flows clickable in browser.

---

## 13. Non-Goals (Explicit Scope Exclusions)

- ❌ Real backend / database
- ❌ Real Google OAuth
- ❌ Real Anthropic API calls (mock only — decision recorded in brainstorm)
- ❌ Real payment integration
- ❌ Admin/seller dashboard
- ❌ Real shipping rate API
- ❌ Search functionality (filters only, no free-text search) — can add later if time permits
- ❌ User profile / order history pages — order confirmation only
- ❌ Reviews submission — display existing ratings only
- ❌ Internationalization framework — mixed ID/EN is hardcoded
- ❌ Dark mode
- ❌ Accessibility audit beyond basics (semantic HTML, focus states)
- ❌ Unit tests / E2E tests — manual verification per phase

---

## 14. Open Questions

None at design time. All decisions captured in brainstorm:
- Mock AI ✅
- Phased B (4 phases) ✅
- Botanical vibe ✅
- Mixed language ✅
- Asset paths confirmed ✅

---
