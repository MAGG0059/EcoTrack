import type { ParseResult } from "@/types/carbon";
import { defaultQuantity, extractNumber, FACTORS } from "@/lib/emissions";

function fold(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function parseHeuristic(rawText: string): ParseResult {
  const text = fold(rawText);

  const factor = FACTORS.find((f) =>
    f.keys.some((key) => text.includes(fold(key)))
  );

  if (!factor) {
    const qty = extractNumber(text) ?? 1;
    const kg = Math.min(Math.max(qty * 0.5, 0.1), 50);
    return {
      summary: `Actividad registrada (${kg.toFixed(2)} kg CO₂e estimado)`,
      category: "otro",
      kgCO2e: Number(kg.toFixed(2)),
      source: "heuristic",
      confidence: 0.35,
    };
  }

  const qty = extractNumber(text) ?? defaultQuantity(factor.unit);
  const kg = Number((qty * factor.kgPerUnit).toFixed(2));

  return {
    summary: `${factor.label}: ${qty} ${factor.unit} → ${kg} kg CO₂e`,
    category: factor.category,
    kgCO2e: kg,
    source: "heuristic",
    confidence: 0.7,
  };
}
