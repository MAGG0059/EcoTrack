"use client";

import { lastDaysKg, totalsByCategory, useCarbonStore } from "@/lib/store";
import { formatKg } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types/carbon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats() {
  const entries = useCarbonStore((s) => s.entries);
  const total = entries.reduce((s, e) => s + e.kgCO2e, 0);
  const week = lastDaysKg(entries, 7);
  const byCat = totalsByCategory(entries);
  const max = Math.max(1, ...Object.values(byCat));

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total acumulado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">{formatKg(total)}</p>
          <p className="mt-1 text-xs text-muted-foreground">CO₂e estimado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Últimos 7 días
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">{formatKg(week)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{entries.length} registros</p>
        </CardContent>
      </Card>
      <Card className="sm:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Por categoría
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map(
            (key) => {
              const value = byCat[key] ?? 0;
              return (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{CATEGORY_LABELS[key]}</span>
                    <span>{formatKg(value)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${(value / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </CardContent>
      </Card>
    </div>
  );
}
