"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CarbonEntry, Category } from "@/types/carbon";

type State = {
  entries: CarbonEntry[];
  addEntry: (entry: CarbonEntry) => void;
  removeEntry: (id: string) => void;
  clearAll: () => void;
};

export const useCarbonStore = create<State>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((s) => ({ entries: [entry, ...s.entries].slice(0, 200) })),
      removeEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      clearAll: () => set({ entries: [] }),
    }),
    { name: "ecotrack-entries" }
  )
);

export function totalsByCategory(entries: CarbonEntry[]) {
  return entries.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.kgCO2e;
      return acc;
    },
    {} as Record<Category, number>
  );
}

export function lastDaysKg(entries: CarbonEntry[], days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return entries
    .filter((e) => new Date(e.createdAt).getTime() >= cutoff)
    .reduce((sum, e) => sum + e.kgCO2e, 0);
}
