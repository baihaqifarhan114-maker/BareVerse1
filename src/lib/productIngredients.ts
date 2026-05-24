import type { Product } from '@/types';

const HAIR_BASE: Record<string, string[]> = {
  haircare: ['Panthenol', 'Argan Oil', 'Glycerin', 'Vitamin E'],
  'hair-treatment': ['Hydrolyzed Keratin', 'Argan Oil', 'Panthenol', 'Hydrolyzed Silk'],
};

/** Hair catalog often has empty ingredient arrays — infer mock actives for demo matching. */
export function getEffectiveIngredients(product: Product): string[] {
  if (product.ingredients.length > 0) {
    return [...new Set([...product.ingredients, ...product.primaryIngredients])];
  }
  if (product.productType !== 'haircare') return product.primaryIngredients;

  const name = product.name.toLowerCase();
  const inferred: string[] = [...(HAIR_BASE[product.category] ?? HAIR_BASE.haircare)];

  if (name.includes('dandruff') || name.includes('ketombe') || name.includes('anti-dandruff')) {
    inferred.push('Zinc Pyrithione', 'Tea Tree Extract', 'Salicylic Acid', 'Piroctone Olamine');
  }
  if (name.includes('hair fall') || name.includes('fall') || name.includes('rontok')) {
    inferred.push('Biotin', 'Caffeine', 'Copper Tripeptide-1', 'Niacinamide');
  }
  if (name.includes('keratin') || name.includes('mask') || name.includes('masque')) {
    inferred.push('Hydrolyzed Keratin', 'Hydrolyzed Silk');
  }
  if (name.includes('argan') || name.includes('oil') || name.includes('serum')) {
    inferred.push('Argan Oil', 'Glycerin');
  }
  if (name.includes('color') || name.includes('dye') || name.includes('colored')) {
    inferred.push('UV Filter', 'Quaternium-22', 'Hydrolyzed Keratin');
  }
  if (name.includes('scalp') || name.includes('clarif')) {
    inferred.push('Salicylic Acid', 'Tea Tree Extract', 'Zinc PCA', 'Niacinamide');
  }
  if (name.includes('caffeine')) inferred.push('Caffeine', 'Biotin');

  return [...new Set([...inferred, ...product.primaryIngredients])];
}
