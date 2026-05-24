import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiagnosaResult, Routine } from '@/types';

type DiagnosaState = {
  currentResult: DiagnosaResult | null;
  currentRoutine: Routine | null;
  history: DiagnosaResult[];
  setResult: (result: DiagnosaResult) => void;
  setRoutine: (routine: Routine) => void;
  clear: () => void;
};

export const useDiagnosaStore = create<DiagnosaState>()(
  persist(
    (set, get) => ({
      currentResult: null,
      currentRoutine: null,
      history: [],
      setResult: (result) =>
        set({
          currentResult: result,
          currentRoutine: null,
          history: [result, ...get().history].slice(0, 10),
        }),
      setRoutine: (routine) => set({ currentRoutine: routine }),
      clear: () => set({ currentResult: null, currentRoutine: null }),
    }),
    { name: 'bareverse:diagnosa' }
  )
);
