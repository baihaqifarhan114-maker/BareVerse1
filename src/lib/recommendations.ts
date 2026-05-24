import type { Product, DiagnosaResult } from '@/types';
import { getEffectiveIngredients } from './productIngredients';

export function productsForDiagnosa(products: Product[], result: DiagnosaResult | null): Product[] {
  if (!result) return products;
  const type = result.type === 'hair' ? 'haircare' : 'skincare';
  return products.filter((p) => p.productType === type);
}

export function ingredientMatchScore(product: Product, neededIngredients: string[]): number {
  if (!neededIngredients.length) return 0;
  const set = new Set(getEffectiveIngredients(product).map((i) => i.toLowerCase()));
  let hits = 0;
  for (const needed of neededIngredients) {
    if (set.has(needed.toLowerCase())) hits += 1;
  }
  return hits;
}

export function rankByDiagnosa(products: Product[], result: DiagnosaResult): Product[] {
  const scoped = productsForDiagnosa(products, result);
  return [...scoped]
    .map((p) => ({ p, score: ingredientMatchScore(p, result.needed_ingredients) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ar = a.p.rating ?? 0;
      const br = b.p.rating ?? 0;
      return br - ar;
    })
    .map(({ p }) => p);
}

export function inPriceRange(price: number, range: 'under-50' | '50-150' | 'over-150' | 'all'): boolean {
  if (range === 'all') return true;
  if (range === 'under-50') return price < 50000;
  if (range === '50-150') return price >= 50000 && price <= 150000;
  return price > 150000;
}

export function filterProducts(
  products: Product[],
  opts: {
    category?: string | null;
    productType?: 'skincare' | 'haircare' | null;
    priceRange?: 'under-50' | '50-150' | 'over-150' | 'all';
    ingredientFilter?: string[];
  }
): Product[] {
  return products.filter((p) => {
    if (opts.productType && p.productType !== opts.productType) return false;
    if (opts.category && p.category !== opts.category) return false;
    const price = p.discountedPrice ?? p.originalPrice;
    if (opts.priceRange && !inPriceRange(price, opts.priceRange)) return false;
    if (opts.ingredientFilter && opts.ingredientFilter.length) {
      const set = new Set(getEffectiveIngredients(p).map((i) => i.toLowerCase()));
      const hasAny = opts.ingredientFilter.some((i) => set.has(i.toLowerCase()));
      if (!hasAny) return false;
    }
    return true;
  });
}
