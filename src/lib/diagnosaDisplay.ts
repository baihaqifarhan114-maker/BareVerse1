import type { DiagnosaResult, DiagnosaType } from '@/types';

export function diagnosaProductType(type: DiagnosaType): 'skincare' | 'haircare' {
  return type === 'hair' ? 'haircare' : 'skincare';
}

export function productsUrlForDiagnosa(result: DiagnosaResult, category?: string): string {
  return productsUrlForType(result.type, category);
}

export function productsUrlForType(type: DiagnosaType, category?: string): string {
  const params = new URLSearchParams({ type: diagnosaProductType(type) });
  if (category) params.set('category', category);
  return `/products?${params.toString()}`;
}

export function conditionLabel(result: DiagnosaResult): string {
  return result.type === 'hair' ? 'Profil rambut & scalp' : 'Profil kulit';
}
