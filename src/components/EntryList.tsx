"use client";

import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCarbonStore } from "@/lib/store";
import { formatKg } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types/carbon";

export function EntryList() {
  const entries = useCarbonStore((s) => s.entries);
  const removeEntry = useCarbonStore((s) => s.removeEntry);
  const clearAll = useCarbonStore((s) => s.clearAll);

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Aún no hay registros. Empieza con una frase como “manejé 10 km”.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Historial</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearAll}>
          Vaciar
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((e) => (
          <div
            key={e.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-border/80 p-3 transition hover:bg-accent/40"
          >
            <div className="min-w-0 space-y-1">
              <p className="truncate text-sm font-medium">{e.rawText}</p>
              <p className="text-xs text-muted-foreground">{e.summary}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge>{CATEGORY_LABELS[e.category]}</Badge>
                <Badge className="bg-primary/15 text-primary">
                  {formatKg(e.kgCO2e)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(e.createdAt).toLocaleString("es")}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Eliminar"
              onClick={() => removeEntry(e.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
