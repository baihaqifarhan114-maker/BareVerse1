import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, OnboardingData } from '@/types';

type UserState = {
  user: User | null;
  onboarding: OnboardingData | null;
  signIn: (user: User) => void;
  signOut: () => void;
  setOnboarding: (data: OnboardingData) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      onboarding: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null, onboarding: null }),
      setOnboarding: (onboarding) => set({ onboarding }),
      reset: () => set({ user: null, onboarding: null }),
    }),
    { name: 'bareverse:user' }
  )
);
