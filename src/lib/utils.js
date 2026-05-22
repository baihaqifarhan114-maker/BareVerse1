import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function formatRupiah(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}
