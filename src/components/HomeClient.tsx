"use client";

import { DashboardStats } from "@/components/DashboardStats";
import { EntryList } from "@/components/EntryList";
import { TipsPanel } from "@/components/TipsPanel";
import { TrackerForm } from "@/components/TrackerForm";
import { useHydrated } from "@/hooks/useHydrated";

export function HomeClient() {
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <div className="h-40 animate-pulse rounded-xl border border-border bg-muted/40" />
    );
  }

  return (
    <div className="space-y-6">
      <TrackerForm />
      <DashboardStats />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EntryList />
        </div>
        <TipsPanel />
      </div>
    </div>
  );
}
