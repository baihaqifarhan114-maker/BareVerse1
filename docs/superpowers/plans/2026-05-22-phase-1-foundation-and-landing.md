# Phase 1: Foundation + Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Bareverse Vite + React + TS project with the full botanical design system, routing skeleton, and a polished landing page including a scroll-driven before/after hero animation.

**Architecture:** Vite SPA. Tailwind v3 with custom palette + Fraunces/DM Sans Google Fonts. shadcn/ui primitives themed to brand. React Router v6 with placeholder pages for future phases. Landing page composed of 6 self-contained section components in `src/components/landing/`. Hero animation uses a 200vh sticky-pinned section with a raw `requestAnimationFrame` scroll listener mutating `clip-path` on the "after" image — no animation library for that part, since direct DOM updates give the smoothest 60fps result.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Tailwind CSS v3, shadcn/ui, lucide-react, React Router v6, Framer Motion (microinteractions only), Google Fonts (Fraunces + DM Sans).

**Spec reference:** [`docs/superpowers/specs/2026-05-22-bareverse-ecommerce-design.md`](../specs/2026-05-22-bareverse-ecommerce-design.md)

**Non-Goal recap:** Per spec §13, no automated tests this phase. Verification is manual via the dev server + visual checks in the browser. Each task ends with a verification step rather than test step.

---

## File Map (Phase 1)

**Create:**
- `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html` — scaffold
- `tailwind.config.js`, `postcss.config.js` — Tailwind
- `components.json` — shadcn config
- `.gitignore`, `.env.example`, `README.md`
- `src/main.tsx` — React entry
- `src/App.tsx` — Router root
- `src/index.css` — Tailwind directives + CSS vars + font imports
- `src/vite-env.d.ts` — Vite types
- `src/lib/utils.ts` — `cn()` helper (shadcn standard)
- `src/components/ui/button.tsx`, `src/components/ui/card.tsx` — shadcn primitives (added via CLI but committed)
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Container.tsx`
- `src/components/landing/HeroScrollAnimation.tsx`
- `src/components/landing/BrandStory.tsx`
- `src/components/landing/CategoriesSection.tsx`
- `src/components/landing/FeaturedProducts.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/pages/LandingPage.tsx`
- `src/pages/AuthPage.tsx` (placeholder)
- `src/pages/ProductListingPage.tsx` (placeholder)
- `public/assets/logo.png`, `before.jpg`, `after.png` (copied from `C:\Users\baiha\Downloads\`)
- `public/favicon.svg`

---

## Task 1: Initialize project scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/index.css`

- [ ] **Step 1: cd into project root and init git**

Run from PowerShell:
```powershell
Set-Location "c:\Users\baiha\OneDrive\Documents\Semester 6\BareVerse"
git init
```
Expected: `Initialized empty Git repository in ...\BareVerse\.git\`

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "bareverse",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "framer-motion": "^11.3.0",
    "lucide-react": "^0.439.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.5.4",
    "vite": "^5.4.2"
  }
}
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 5173, open: true },
});
```

- [ ] **Step 6: Create `index.html`**

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bareverse — Dari ragu, ke bare confident.</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 8: Create `src/App.tsx` (router skeleton with placeholders)**

```tsx
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
```

- [ ] **Step 9: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 10: Create `src/index.css` (Tailwind + CSS vars stub — will be filled in Task 3)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: `added N packages, and audited N packages` with no errors. Takes 1-3 min.

- [ ] **Step 12: Commit scaffold**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts index.html src/main.tsx src/App.tsx src/vite-env.d.ts src/index.css
git commit -m "chore: scaffold Vite + React + TS project"
```

---

## Task 2: Add `.gitignore`, `README`, and placeholder pages

**Files:**
- Create: `.gitignore`, `README.md`, `src/pages/LandingPage.tsx`, `src/pages/AuthPage.tsx`, `src/pages/ProductListingPage.tsx`

- [ ] **Step 1: Create `.gitignore`**

```
node_modules
dist
dist-ssr
*.local
.vite
.DS_Store
*.log
.env
.env.local
.env.*.local
.vscode/*
!.vscode/extensions.json
.idea
```

- [ ] **Step 2: Create `README.md`**

```markdown
# Bareverse

E-commerce beauty platform with AI-style skin/hair diagnosa.

## Stack
React 18 + TypeScript + Vite + Tailwind + shadcn/ui.

## Dev
\`\`\`
npm install
npm run dev
\`\`\`

See `docs/superpowers/specs/` for the design and `docs/superpowers/plans/` for the implementation plan.
```

- [ ] **Step 3: Create placeholder `src/pages/LandingPage.tsx`**

```tsx
export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">Bareverse — Landing (Phase 1 WIP)</h1>
    </main>
  );
}
```

- [ ] **Step 4: Create placeholder `src/pages/AuthPage.tsx`**

```tsx
export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">Auth (Phase 2)</h1>
    </main>
  );
}
```

- [ ] **Step 5: Create placeholder `src/pages/ProductListingPage.tsx`**

```tsx
export default function ProductListingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">Products (Phase 3)</h1>
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server starts**

Run: `npm run dev`
Expected: Browser opens at http://localhost:5173, shows "Bareverse — Landing (Phase 1 WIP)".

- [ ] **Step 7: Stop dev server (Ctrl+C) and commit**

```bash
git add .gitignore README.md src/pages
git commit -m "chore: add gitignore, README, and placeholder pages"
```

---

## Task 3: Configure Tailwind theme + design tokens

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Create `postcss.config.js`**

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

- [ ] **Step 2: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1400px' } },
    extend: {
      colors: {
        teal: {
          deep: '#015C6B',
          bright: '#0998A3',
          50:  '#E6F4F5',
          100: '#C2E2E5',
          500: '#0998A3',
          700: '#015C6B',
          900: '#013840',
        },
        pink: {
          soft: '#EDAFBA',
          crimson: '#D14063',
          50:  '#FBEFF2',
          500: '#EDAFBA',
          700: '#D14063',
        },
        sage: { DEFAULT: '#A0CD99', 500: '#A0CD99' },
        forest: { DEFAULT: '#268144', 500: '#268144' },
        cream: '#FAF7F2',
        ink: '#1A2B2E',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'fade-up': 'fade-up 0.6s ease-out' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

- [ ] **Step 3: Replace `src/index.css` with full theme**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 36 33% 97%;          /* cream */
    --foreground: 192 28% 14%;         /* ink */
    --card: 0 0% 100%;
    --card-foreground: 192 28% 14%;
    --popover: 0 0% 100%;
    --popover-foreground: 192 28% 14%;
    --primary: 187 98% 34%;            /* teal-bright */
    --primary-foreground: 36 33% 97%;
    --secondary: 109 38% 70%;          /* sage */
    --secondary-foreground: 142 56% 33%;
    --muted: 36 20% 92%;
    --muted-foreground: 192 10% 40%;
    --accent: 343 60% 60%;             /* pink-crimson */
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 36 15% 88%;
    --input: 36 15% 88%;
    --ring: 187 98% 34%;
    --radius: 0.75rem;
  }

  * { @apply border-border; }

  html {
    scroll-behavior: smooth;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  }

  body {
    @apply bg-cream text-ink font-sans antialiased;
  }

  h1, h2, h3, h4 { @apply font-display tracking-tight; }
}

@layer utilities {
  .container-narrow { @apply max-w-5xl mx-auto px-6; }
  .container-wide { @apply max-w-7xl mx-auto px-6; }
}
```

- [ ] **Step 4: Update `src/pages/LandingPage.tsx` to verify theme**

```tsx
export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-cream">
      <h1 className="font-display text-5xl text-teal-deep">Bareverse</h1>
      <p className="text-ink/70 font-sans">Theme check: cream bg, teal heading, ink body.</p>
      <div className="flex gap-2">
        <span className="px-4 py-2 rounded-lg bg-teal-bright text-cream">teal-bright</span>
        <span className="px-4 py-2 rounded-lg bg-pink-crimson text-cream">pink-crimson</span>
        <span className="px-4 py-2 rounded-lg bg-sage text-forest">sage</span>
        <span className="px-4 py-2 rounded-lg bg-pink-soft text-pink-crimson">pink-soft</span>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`
Expected: Cream background; "Bareverse" rendered in Fraunces serif (large + tracked tight); 4 colored chips visible in correct brand colors; body text in DM Sans.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css src/pages/LandingPage.tsx
git commit -m "feat(design): wire up Tailwind theme with brand palette and Fraunces/DM Sans"
```

---

## Task 4: Add shadcn primitives (Button + Card)

**Files:**
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`

shadcn's CLI requires interactive prompts which can't run reliably in this environment, so we vendor the primitives directly. They are short and stable.

- [ ] **Step 1: Create `components.json` (for future CLI usage)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

- [ ] **Step 2: Create `src/lib/utils.ts`**

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}
```

- [ ] **Step 3: Create `src/components/ui/button.tsx`**

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-teal-bright text-cream hover:bg-teal-deep',
        crimson: 'bg-pink-crimson text-cream hover:bg-pink-crimson/90',
        outline: 'border border-teal-deep/30 bg-transparent text-teal-deep hover:bg-teal-50',
        ghost: 'text-teal-deep hover:bg-teal-50',
        sage: 'bg-sage text-forest hover:bg-sage/90',
        link: 'text-teal-bright underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { buttonVariants };
```

- [ ] **Step 4: Install `@radix-ui/react-slot`**

Run: `npm install @radix-ui/react-slot`
Expected: `added 1 package`

- [ ] **Step 5: Create `src/components/ui/card.tsx`**

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-2xl border border-border bg-card shadow-sm', className)} {...props} />
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-display text-xl text-teal-deep', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex items-center', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
```

- [ ] **Step 6: Verify build still works**

Run: `npm run lint`
Expected: No TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add components.json src/lib src/components/ui package.json package-lock.json
git commit -m "feat(ui): add Button and Card primitives themed to brand"
```

---

## Task 5: Copy assets and add favicon

**Files:**
- Create: `public/assets/logo.png`, `public/assets/before.jpg`, `public/assets/after.png`, `public/favicon.svg`

- [ ] **Step 1: Create `public/assets/` directory and copy assets**

Run (PowerShell):
```powershell
New-Item -ItemType Directory -Force -Path "public\assets"
Copy-Item "C:\Users\baiha\Downloads\logo bareverse.png" "public\assets\logo.png"
Copy-Item "C:\Users\baiha\Downloads\before.jpg" "public\assets\before.jpg"
Copy-Item "C:\Users\baiha\Downloads\after.png" "public\assets\after.png"
```

Expected: 3 files copied. Verify with: `Get-ChildItem public\assets`

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="#015C6B"/>
  <path d="M22 40c0-8 6-14 10-14s10 6 10 14" stroke="#A0CD99" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="32" cy="24" r="4" fill="#D14063"/>
</svg>
```

- [ ] **Step 3: Verify assets load**

Run: `npm run dev`
In browser open: `http://localhost:5173/assets/logo.png` — should display the Bareverse logo.
Also: `http://localhost:5173/assets/before.jpg` and `/assets/after.png` should display.
Tab favicon should show the teal circle.

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "chore(assets): add logo, before/after images, and favicon"
```

---

## Task 6: Layout components — Navbar + Footer + Container

**Files:**
- Create: `src/components/layout/Container.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/layout/Container.tsx`**

```tsx
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-wide', className)} {...props} />;
}
```

- [ ] **Step 2: Create `src/components/layout/Navbar.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `src/components/layout/Footer.tsx`**

```tsx
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
```

- [ ] **Step 4: Update `src/pages/LandingPage.tsx` to use layout**

```tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="container-wide py-32 text-center">
          <h1 className="font-display text-6xl text-teal-deep">Bareverse</h1>
          <p className="mt-4 text-ink/70 text-lg">Layout shell ready. Sections coming next.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Verify layout in browser**

Run: `npm run dev`
Expected:
- Sticky navbar at top with logo + nav links (Home/Produk/Diagnosa/Tentang) + cart & user icons
- Centered hero placeholder
- Dark teal footer at bottom with 4 columns + bottom strip
- Navigate to `/auth` — Navbar should highlight nothing (no /auth nav item), Auth placeholder shows
- Back to `/` — "Home" nav item should be highlighted teal-deep

- [ ] **Step 6: Commit**

```bash
git add src/components/layout src/pages/LandingPage.tsx
git commit -m "feat(layout): add Navbar, Footer, and Container components"
```

---

## Task 7: Hero scroll animation (before/after wipe)

**Files:**
- Create: `src/components/landing/HeroScrollAnimation.tsx`

This is the centerpiece. Pinned section, 200vh tall, sticky child fills viewport, scroll progress drives clip-path on the "after" image.

- [ ] **Step 1: Create `src/components/landing/HeroScrollAnimation.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles } from 'lucide-react';

export function HeroScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  const labelBeforeRef = useRef<HTMLDivElement>(null);
  const labelAfterRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const afterImg = afterImgRef.current;
    if (!section || !afterImg) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      // wipe from right to left: at 0% the "after" is fully hidden (inset right = 100%), at 100% fully shown
      afterImg.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
      if (labelBeforeRef.current) labelBeforeRef.current.style.opacity = String(1 - progress);
      if (labelAfterRef.current) labelAfterRef.current.style.opacity = String(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="container-wide py-12">
        <div className="grid grid-cols-2 gap-2 mb-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img src="/assets/before.jpg" alt="Sebelum" className="w-full h-full object-cover" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cream/90 text-xs font-medium text-ink">Sebelum</span>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img src="/assets/after.png" alt="Sesudah" className="w-full h-full object-cover" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-deep text-xs font-medium text-cream">Sesudah</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-display text-4xl text-teal-deep leading-tight">Dari ragu,<br/>ke <span className="text-pink-crimson italic">bare confident.</span></h1>
          <p className="mt-4 text-ink/70">Rangkaian skincare berbasis diagnosa kulitmu sendiri.</p>
          <Button asChild size="lg" className="mt-6"><Link to="/diagnosa">Mulai Diagnosa</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <img src="/assets/before.jpg" alt="Sebelum" className="absolute inset-0 w-full h-full object-cover" />
          <img
            ref={afterImgRef}
            src="/assets/after.png"
            alt="Sesudah"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-cream/40" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/80" aria-hidden />
        </div>

        <div ref={labelBeforeRef} className="absolute top-8 left-8 px-4 py-2 rounded-full bg-cream/90 backdrop-blur-sm shadow-lg">
          <span className="text-xs font-medium tracking-widest uppercase text-ink/60">Sebelum</span>
        </div>
        <div ref={labelAfterRef} className="absolute top-8 right-8 px-4 py-2 rounded-full bg-teal-deep shadow-lg" style={{ opacity: 0 }}>
          <span className="text-xs font-medium tracking-widest uppercase text-cream flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Sesudah
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 pb-20 px-6 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-teal-deep/70 mb-4">Diagnosa · Rutinitas · Hasil</p>
          <h1 className="font-display text-5xl md:text-7xl text-teal-deep leading-[1.05] max-w-4xl mx-auto">
            Dari ragu, ke <span className="text-pink-crimson italic">bare confident.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-xl mx-auto">
            Scroll untuk lihat bagaimana rutinitas Bareverse menemani perjalanan kulitmu.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg"><Link to="/diagnosa">Mulai Diagnosa</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/products">Jelajahi Produk</Link></Button>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 text-ink/40">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `LandingPage.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroScrollAnimation } from '@/components/landing/HeroScrollAnimation';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScrollAnimation />
        <section className="container-wide py-32 text-center">
          <h2 className="font-display text-3xl text-teal-deep">More sections coming…</h2>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected:
- Desktop: open `/`, see hero filling viewport with "before" image. As you scroll down, the "after" image wipes from left to right. The hero stays pinned. After ~1 screen of scroll, hero releases and next section appears below. Labels "Sebelum" fades out and "Sesudah" fades in.
- Resize to ~700px width: hero switches to mobile fallback (2 static thumbnails side-by-side + headline + button).
- No console errors. Animation should feel smooth (60fps).

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/HeroScrollAnimation.tsx src/pages/LandingPage.tsx
git commit -m "feat(landing): add scroll-driven before/after hero animation"
```

---

## Task 8: Brand Story section

**Files:**
- Create: `src/components/landing/BrandStory.tsx`

- [ ] **Step 1: Create `src/components/landing/BrandStory.tsx`**

```tsx
import { Leaf, FlaskConical, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const pillars = [
  {
    icon: Leaf,
    title: 'Natural-first',
    body: 'Komposisi yang menghormati kulitmu. Ingredient transparan, sourcing bertanggung jawab, formulasi tanpa bahan kontroversial.',
  },
  {
    icon: FlaskConical,
    title: 'Dermatology-backed',
    body: 'Rekomendasi kami berbasis kombinasi konsultasi dermatologis dan diagnosa adaptif — bukan sekedar tren TikTok.',
  },
  {
    icon: HeartHandshake,
    title: 'Approachable',
    body: 'Premium tidak harus mahal atau membingungkan. Tiap produk punya panduan pakai yang jelas dan cocok untuk pemula.',
  },
];

export function BrandStory() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-4">Tentang Bareverse</p>
          <h2 className="font-display text-4xl md:text-5xl text-teal-deep leading-tight">
            Kulit dan rambut yang sehat dimulai dari <span className="italic text-pink-crimson">mengenali dirimu sendiri.</span>
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed">
            Bareverse lahir dari satu pertanyaan sederhana: kenapa orang harus tebak-tebakan saat memilih skincare?
            Kami membangun pengalaman belanja yang dimulai dari diagnosa — bukan dari katalog.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="relative p-8 rounded-3xl bg-white border border-border/60 hover:border-teal-bright/40 transition-colors">
              <div className="absolute -top-5 left-8 h-12 w-12 rounded-2xl bg-sage/30 flex items-center justify-center">
                <p.icon className="h-5 w-5 text-forest" />
              </div>
              <h3 className="font-display text-2xl text-teal-deep mt-4 mb-3">{p.title}</h3>
              <p className="text-ink/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Mount in LandingPage**

Replace the "More sections coming…" placeholder with:
```tsx
import { BrandStory } from '@/components/landing/BrandStory';
// ...
<HeroScrollAnimation />
<BrandStory />
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Scroll past hero. See: eyebrow "TENTANG BAREVERSE" in crimson, large display headline with italic accent, intro paragraph, 3 pillar cards in a row (icon badges in sage circles at top-left of each card).

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/BrandStory.tsx src/pages/LandingPage.tsx
git commit -m "feat(landing): add brand story section with 3 pillars"
```

---

## Task 9: Categories section

**Files:**
- Create: `src/components/landing/CategoriesSection.tsx`

- [ ] **Step 1: Create `src/components/landing/CategoriesSection.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const categories = [
  {
    href: '/products?type=skincare',
    label: 'Skincare',
    tagline: 'Untuk wajah yang bercerita',
    description: 'Cleanser, toner, serum, moisturizer, dan sunscreen yang diformulasi untuk berbagai kondisi kulit.',
    image: '/assets/after.png',
    accent: 'bg-pink-soft',
    text: 'text-pink-crimson',
  },
  {
    href: '/products?type=haircare',
    label: 'Haircare',
    tagline: 'Untuk rambut yang bernafas',
    description: 'Treatment & mask yang merawat kulit kepala dan ujung rambut tanpa membebani.',
    image: '/assets/before.jpg',
    accent: 'bg-sage/40',
    text: 'text-forest',
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-teal-deep/[0.03] py-24 md:py-32">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Koleksi</p>
            <h2 className="font-display text-4xl md:text-5xl text-teal-deep">Pilih perjalananmu.</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-teal-bright hover:text-teal-deep">
            Lihat semua <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[16/11]"
            >
              <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className={`inline-flex w-fit px-3 py-1 rounded-full ${c.accent} ${c.text} text-xs font-medium tracking-wider uppercase mb-3`}>
                  {c.tagline}
                </span>
                <h3 className="font-display text-4xl md:text-5xl text-cream mb-2">{c.label}</h3>
                <p className="text-cream/80 max-w-md leading-relaxed">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-cream text-sm font-medium">
                  Jelajahi koleksi <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Mount**

```tsx
import { CategoriesSection } from '@/components/landing/CategoriesSection';
// ...
<BrandStory />
<CategoriesSection />
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Scroll to categories. See 2 large cards side-by-side desktop / stacked mobile, with image background + gradient + tagline pill + display heading + description + arrow. Hover scales image. Click → routes (will land on placeholder page — OK for now).

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/CategoriesSection.tsx src/pages/LandingPage.tsx
git commit -m "feat(landing): add categories section with skincare/haircare tiles"
```

---

## Task 10: Featured Products section (stubbed data)

**Files:**
- Create: `src/components/landing/FeaturedProducts.tsx`

Phase 3 will replace these with real data. For Phase 1, hardcode 4 products with placeholder values.

- [ ] **Step 1: Create `src/components/landing/FeaturedProducts.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { formatRupiah } from '@/lib/utils';

type StubProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  tag: string;
  imageSeed: string;
};

const featured: StubProduct[] = [
  { id: '1', name: 'Niacinamide Brightening Serum', brand: 'Bareverse Lab', price: 89000, originalPrice: 119000, rating: 4.7, reviews: 245, tag: 'Best Seller', imageSeed: 'serum1' },
  { id: '2', name: 'Hydrating Gentle Cleanser', brand: 'Bareverse Lab', price: 65000, originalPrice: null, rating: 4.8, reviews: 312, tag: 'For Sensitive', imageSeed: 'cleanser2' },
  { id: '3', name: 'Centella Soothing Toner', brand: 'Bareverse Lab', price: 75000, originalPrice: 95000, rating: 4.6, reviews: 189, tag: 'Acne-Prone', imageSeed: 'toner3' },
  { id: '4', name: 'Daily Mineral Sunscreen SPF 50', brand: 'Bareverse Lab', price: 110000, originalPrice: null, rating: 4.9, reviews: 421, tag: 'Top Rated', imageSeed: 'sunscreen4' },
];

export function FeaturedProducts() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-pink-crimson font-medium mb-3">Sorotan</p>
            <h2 className="font-display text-4xl md:text-5xl text-teal-deep">Produk yang paling dicari.</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex text-sm font-medium text-teal-bright hover:text-teal-deep">
            Lihat semua →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="group flex flex-col rounded-2xl bg-white border border-border/60 overflow-hidden hover:border-teal-bright/40 hover:shadow-md transition-all"
            >
              <div className="relative aspect-square bg-pink-soft/20">
                <img
                  src={`https://picsum.photos/seed/${p.imageSeed}/400/400`}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cream/90 backdrop-blur-sm text-[10px] font-medium tracking-wider uppercase text-teal-deep">
                  {p.tag}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-[11px] tracking-wider uppercase text-ink/50 font-medium">{p.brand}</p>
                <h3 className="mt-1 font-display text-base text-teal-deep leading-snug line-clamp-2">{p.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-ink/60">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-ink">{p.rating}</span>
                  <span>({p.reviews})</span>
                </div>
                <div className="mt-auto pt-3 flex items-baseline gap-2">
                  <span className="font-medium text-pink-crimson">{formatRupiah(p.price)}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-ink/40 line-through">{formatRupiah(p.originalPrice)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Mount**

```tsx
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
// ...
<CategoriesSection />
<FeaturedProducts />
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Scroll. See 4 product cards in a row (2-col on mobile). Picsum placeholder images load. Rating + price + strike-through visible. Hover scales image.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/FeaturedProducts.tsx src/pages/LandingPage.tsx
git commit -m "feat(landing): add featured products section with stub data"
```

---

## Task 11: How It Works section

**Files:**
- Create: `src/components/landing/HowItWorks.tsx`

- [ ] **Step 1: Create `src/components/landing/HowItWorks.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { ScanFace, ListChecks, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

const steps = [
  {
    n: '01',
    icon: ScanFace,
    title: 'Diagnosa',
    body: 'Scan wajah lewat kamera atau jawab kuesioner singkat. Sistem kami menganalisis kondisi kulit & rambutmu dalam hitungan detik.',
  },
  {
    n: '02',
    icon: ListChecks,
    title: 'Rutinitas',
    body: 'Dapatkan rutinitas pagi & malam yang dipersonalisasi — lengkap dengan kandungan aktif yang kulitmu butuhkan.',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Produk',
    body: 'Pilih dari katalog yang sudah difilter sesuai diagnosamu. Tidak ada lagi tebak-tebakan saat checkout.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-teal-deep text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-sage blur-3xl" />
        <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-pink-soft blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-soft font-medium mb-4">Bagaimana caranya</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Tiga langkah menuju kulit yang <span className="italic text-pink-soft">benar-benar kamu.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-display text-6xl text-cream/15 leading-none mb-4">{s.n}</div>
              <div className="h-12 w-12 rounded-2xl bg-cream/10 flex items-center justify-center mb-5">
                <s.icon className="h-5 w-5 text-pink-soft" />
              </div>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-cream/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-8 border-t border-cream/10">
          <p className="text-cream/70 flex-grow">Siap mulai? Diagnosa gratis dan butuh kurang dari 2 menit.</p>
          <Button asChild variant="crimson" size="lg"><Link to="/diagnosa">Mulai Diagnosa Sekarang</Link></Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Mount**

```tsx
import { HowItWorks } from '@/components/landing/HowItWorks';
// ...
<FeaturedProducts />
<HowItWorks />
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Scroll to bottom of landing (just before footer). See dark teal section with soft glowing blobs in background, 3 numbered steps with icons in pill containers, CTA bar at bottom with crimson button.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/HowItWorks.tsx src/pages/LandingPage.tsx
git commit -m "feat(landing): add how-it-works section with 3-step explainer"
```

---

## Task 12: Final landing page composition + smoke test

**Files:**
- Modify: `src/pages/LandingPage.tsx`

- [ ] **Step 1: Final composition of `src/pages/LandingPage.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroScrollAnimation } from '@/components/landing/HeroScrollAnimation';
import { BrandStory } from '@/components/landing/BrandStory';
import { CategoriesSection } from '@/components/landing/CategoriesSection';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScrollAnimation />
        <BrandStory />
        <CategoriesSection />
        <FeaturedProducts />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

Run: `npm run lint`
Expected: No errors. If any unused imports/vars, clean them up.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Builds successfully, outputs to `dist/`. No errors. Build size reasonable (<400kB gzip).

- [ ] **Step 4: Smoke test in browser (dev server)**

Run: `npm run dev`
Walk through this checklist in the browser:
- [ ] `/` loads. Navbar sticky and visible.
- [ ] Hero before image visible. Scroll slowly → after image wipes in from left to right.
- [ ] At peak scroll, hero releases, BrandStory appears.
- [ ] BrandStory: 3 pillar cards with icon badges visible.
- [ ] Categories: 2 large image cards. Hover scales. Click navigates (even if placeholder).
- [ ] FeaturedProducts: 4 cards with picsum images, prices, ratings, strike-throughs.
- [ ] HowItWorks: dark teal section, 3 numbered steps, CTA at bottom.
- [ ] Footer: 4 columns, social icons, BPOM strip at bottom.
- [ ] Resize to 600px width. Navbar nav links hide (only logo + icons visible). Hero becomes static side-by-side comparison. Sections stack to single column. Footer reflows.
- [ ] No console errors anywhere.
- [ ] Click navbar "Produk" → routes to `/products` placeholder.
- [ ] Click navbar user icon → routes to `/auth` placeholder.
- [ ] Click "Mulai Diagnosa" in hero → routes to `/diagnosa` → falls through to LandingPage (since no /diagnosa route yet). This is expected for Phase 1. Will be fixed in Phase 2.

- [ ] **Step 5: Final commit**

```bash
git add src/pages/LandingPage.tsx
git commit -m "feat(landing): compose full Phase 1 landing page"
```

- [ ] **Step 6: Tag the phase**

```bash
git tag phase-1-complete -m "Phase 1: Foundation + Landing complete"
```

---

## Phase 1 Done

Demo URL: `http://localhost:5173` after `npm run dev`.

Next: hand off to user for review. If approved, proceed to writing Phase 2 plan (Auth + Onboarding + Diagnosa).

---
