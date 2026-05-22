# Phase 2: Auth + Onboarding + Diagnosa Implementation Plan

> **For agentic workers:** Use subagent-driven-development. Steps use checkbox syntax.

**Goal:** Add fake Google SSO auth, multi-step onboarding, two diagnosa methods (camera + form), and a structured diagnosa result page — all driven by a deterministic local "mock AI" engine.

**Architecture:** Two Zustand stores with `persist` middleware (userStore, diagnosaStore). Mock AI as a pure function module returning typed `DiagnosaResult` JSON. Six new pages wired into the router; an `AuthGuard` wrapper for protected routes. Webcam access via `navigator.mediaDevices.getUserMedia`.

**Tech Stack additions:** `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`.

**Spec reference:** `docs/superpowers/specs/2026-05-22-bareverse-ecommerce-design.md` §§5, 6, 9.2–9.7.

---

## File Map (Phase 2)

**Create:**
- `src/types/index.ts` — domain types (User, OnboardingData, DiagnosaResult, DiagnosaInput, etc.)
- `src/lib/mockAi.ts` — `runFormDiagnosa()`, `runCameraDiagnosa()`, `generateRoutine()` (routine used in Phase 3, exposed here)
- `src/lib/diagnosaClassifications.ts` — pre-written templates for 8 skin + 6 hair classifications
- `src/store/userStore.ts` — auth + onboarding state
- `src/store/diagnosaStore.ts` — current diagnosa result + history
- `src/components/AuthGuard.tsx` — route guard
- `src/components/diagnosa/StepProgress.tsx` — multi-step progress bar
- `src/components/diagnosa/QuestionCard.tsx` — single question UI shell
- `src/pages/AuthPage.tsx` — REWRITE fake Google SSO
- `src/pages/OnboardingPage.tsx` — multi-step onboarding
- `src/pages/DiagnosaChoicePage.tsx`
- `src/pages/CameraDiagnosaPage.tsx`
- `src/pages/FormDiagnosaPage.tsx`
- `src/pages/DiagnosaResultPage.tsx`

**Modify:**
- `src/App.tsx` — add new routes + AuthGuard
- `src/components/layout/Navbar.tsx` — show user avatar dropdown when signed in, show "Diagnosa" link route
- `src/pages/LandingPage.tsx` — none; CTAs already point at `/diagnosa`

---

## Mock AI Engine Design

### Skin classifications (8)
| Key | Indonesian classification |
|---|---|
| `acne-oily` | Kulit Berminyak dengan Jerawat Aktif |
| `dehydrated-sensitive` | Kulit Sensitif & Dehidrasi |
| `dry-mature` | Kulit Kering & Matang |
| `combination-dull` | Kulit Kombinasi Kusam |
| `normal-healthy` | Kulit Normal Sehat |
| `oily-congested` | Kulit Berminyak dengan Komedo |
| `hyperpigmented` | Kulit dengan Bekas Jerawat & Flek |
| `sensitive-reactive` | Kulit Sensitif Reaktif |

### Hair classifications (6)
| Key | Indonesian classification |
|---|---|
| `oily-scalp` | Kulit Kepala Berminyak |
| `dry-damaged` | Rambut Kering & Rusak |
| `dandruff` | Kulit Kepala Berketombe |
| `hair-fall` | Rambut Rontok |
| `color-treated` | Rambut yang Diwarnai |
| `normal-hair` | Rambut Normal Sehat |

### Form question flow
**Skin (4 steps):**
1. Keluhan utama → acne / dry / dull / sensitive / oily / aging / spots
2. Tipe kulit → oily / dry / combination / normal
3. Frekuensi jerawat → sering / kadang / jarang / nggak pernah
4. Kondisi tambahan → sensitive / hyperpig / mature / none

**Hair (3 steps):**
1. Keluhan utama → oily-scalp / dry-ends / dandruff / hair-fall / colored
2. Frekuensi keramas → daily / 2-3x / weekly
3. Treatment history → dye / chemical / none

### Classification mapping (decision rules)

```
Skin:
- complaint=acne + (frequency=sering OR sometimes) + type=oily → acne-oily
- complaint=acne + (frequency=jarang) + extra=hyperpig → hyperpigmented
- complaint=dry + type=dry + extra=mature → dry-mature
- complaint=sensitive + extra=sensitive → sensitive-reactive
- complaint=sensitive + type=dry → dehydrated-sensitive
- complaint=oily + frequency=jarang + extra=none → oily-congested
- complaint=dull + type=combination → combination-dull
- complaint=aging + extra=mature → dry-mature
- complaint=spots + extra=hyperpig → hyperpigmented
- ALL ELSE → normal-healthy

Hair:
- complaint=oily-scalp → oily-scalp
- complaint=dry-ends + history=chemical → dry-damaged
- complaint=dandruff → dandruff
- complaint=hair-fall → hair-fall
- complaint=colored OR history=dye → color-treated
- ELSE → normal-hair
```

### Camera diagnosa
Weighted random based on onboarding age + gender:
- age 18-25 + complaint=skin → 50% acne-oily, 20% oily-congested, 15% hyperpigmented, 15% normal-healthy
- age 26-35 + skin → 30% combination-dull, 25% hyperpigmented, 25% dehydrated-sensitive, 20% normal-healthy
- age 36+ + skin → 50% dry-mature, 25% hyperpigmented, 25% combination-dull
- For hair: 35% oily-scalp, 25% dry-damaged, 20% hair-fall, 10% dandruff, 10% normal-hair

---

## Tasks

### Task 1: Types + Mock AI + Stores (Group A)

**Files:** `src/types/index.ts`, `src/lib/diagnosaClassifications.ts`, `src/lib/mockAi.ts`, `src/store/userStore.ts`, `src/store/diagnosaStore.ts`

(See implementer prompt for full contents — provided inline at dispatch time.)

Install: `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`.

Verify: `npm run lint` passes.

---

### Task 2: Auth + Onboarding + Choice (Group B)

**Files:** `src/components/AuthGuard.tsx`, `src/components/diagnosa/StepProgress.tsx`, `src/pages/AuthPage.tsx` (rewrite), `src/pages/OnboardingPage.tsx`, `src/pages/DiagnosaChoicePage.tsx`. Wire routes in `App.tsx`. Update `Navbar` to show user dropdown.

Verify: dev server, click navbar user icon → Auth, click "Sign in with Google" → routes to `/onboarding`, complete onboarding → routes to `/diagnosa`.

---

### Task 3: Camera Diagnosa (Group C)

**Files:** `src/components/diagnosa/CameraScan.tsx`, `src/pages/CameraDiagnosaPage.tsx`. Adds AuthGuard wrap, getUserMedia, 3.5s loading sequence, redirects to result page.

Verify: from `/diagnosa` click Camera → permission prompt → preview → scan → loading → result.

---

### Task 4: Form Diagnosa + Result (Group D)

**Files:** `src/components/diagnosa/QuestionCard.tsx`, `src/pages/FormDiagnosaPage.tsx`, `src/pages/DiagnosaResultPage.tsx`.

Verify: from `/diagnosa` click Form → answer questions → submit → result page renders with classification, explanation, do/don't, ingredients chips. CTAs go to `/products` (Phase 3 placeholder).

---

## Phase 2 Done

- Tag `phase-2-complete`
- Smoke test all routes manually

