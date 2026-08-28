"use client";

import { lastDaysKg, totalsByCategory, useCarbonStore } from "@/lib/store";

export function TipsPanel() {
  const entries = useCarbonStore((s) => s.entries);
  const week = lastDaysKg(entries, 7);
  const byCat = totalsByCategory(entries);
  const top = (Object.entries(byCat) as [string, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const tips: string[] = [];
  if (week > 50) {
    tips.push("Tu semana va alta. Agrupa trayectos o cambia un viaje en coche por bus/bici.");
  }
  if ((byCat.alimentacion ?? 0) > (byCat.transporte ?? 0) && (byCat.alimentacion ?? 0) > 5) {
    tips.push("La alimentación pesa más que el transporte: prueba una comida sin res esta semana.");
  }
  if (top?.[0] === "transporte") {
    tips.push("Comparte el auto o usa transporte público en el trayecto más largo del día.");
  }
  if (entries.length === 0) {
    tips.push("Registra 3 actividades reales de hoy para ver un primer panorama.");
  }
  if (tips.length === 0) {
    tips.push("Buen ritmo. Sigue registrando en lenguaje natural para detectar patrones.");
  }

  return (
    <aside className="rounded-xl border border-border bg-card p-5 text-sm">
      <h2 className="mb-3 font-semibold">Sugerencias</h2>
      <ul className="space-y-2 text-muted-foreground">
        {tips.map((t) => (
          <li key={t} className="leading-relaxed">
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}
