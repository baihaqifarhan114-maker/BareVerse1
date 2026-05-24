import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductReview } from '@/types';

export const ADMIN_PIN = 'bareverse';

type ReviewState = {
  reviews: ProductReview[];
  adminAuthed: boolean;
  addReview: (input: Omit<ProductReview, 'id' | 'createdAt'>) => void;
  removeReview: (id: string) => void;
  setAdminAuthed: (value: boolean) => void;
};

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      adminAuthed: false,
      addReview: (input) => {
        const review: ProductReview = {
          ...input,
          id: `rv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
        };
        set({ reviews: [review, ...get().reviews] });
      },
      removeReview: (id) => set({ reviews: get().reviews.filter((r) => r.id !== id) }),
      setAdminAuthed: (value) => set({ adminAuthed: value }),
    }),
    { name: 'bareverse:reviews' }
  )
);

export function reviewsForProduct(reviews: ProductReview[], productId: string): ProductReview[] {
  return reviews.filter((r) => r.productId === productId).sort((a, b) => b.createdAt - a.createdAt);
}
