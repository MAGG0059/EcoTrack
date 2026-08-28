"use client";

import { EntryList } from "@/components/EntryList";
import { useHydrated } from "@/hooks/useHydrated";

export default function HistoryPage() {
  const hydrated = useHydrated();
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Historial</h1>
      {hydrated ? (
        <EntryList />
      ) : (
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      )}
    </main>
  );
}
