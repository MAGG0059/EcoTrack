export type Category =
  | "transporte"
  | "alimentacion"
  | "energia"
  | "consumo"
  | "otro";

export type ParseSource = "ai" | "heuristic";

export interface CarbonEntry {
  id: string;
  rawText: string;
  summary: string;
  category: Category;
  kgCO2e: number;
  createdAt: string;
  source: ParseSource;
}

export interface ParseResult {
  summary: string;
  category: Category;
  kgCO2e: number;
  source: ParseSource;
  confidence: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  transporte: "Transporte",
  alimentacion: "Alimentación",
  energia: "Energía",
  consumo: "Consumo",
  otro: "Otro",
};
