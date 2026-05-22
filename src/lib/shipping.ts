import type { ShippingOption } from '@/types';

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { carrier: 'jnt', name: 'J&T Express', estimateDays: '2-3 hari', price: 15000 },
  { carrier: 'jne', name: 'JNE Reguler', estimateDays: '1-2 hari', price: 18000 },
  { carrier: 'sicepat', name: 'SiCepat Halu', estimateDays: '2-4 hari', price: 12000 },
];

export const PAYMENT_BANKS = [
  { value: 'bni' as const, name: 'BNI Virtual Account', code: '8808' },
  { value: 'bri' as const, name: 'BRI Virtual Account', code: '88810' },
];

export function generateVA(bank: 'bni' | 'bri'): string {
  const code = bank === 'bni' ? '8808' : '88810';
  const rand = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
  return `${code}${rand}`;
}

export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 1e4).toString().padStart(4, '0');
  return `BV-${ts}-${rand}`;
}
