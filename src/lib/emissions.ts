import type { Category } from "@/types/carbon";

export type Factor = {
  keys: string[];
  kgPerUnit: number;
  unit: "km" | "kwh" | "item" | "hour" | "meal";
  category: Category;
  label: string;
};

/** Approximate kg CO2e factors (educational MVP, not a certified LCA). */
export const FACTORS: Factor[] = [
  {
    keys: ["avion", "vuelo", "plane", "flight", "volar"],
    kgPerUnit: 0.255,
    unit: "km",
    category: "transporte",
    label: "vuelo",
  },
  {
    keys: ["coche", "auto", "carro", "car", "manejar", "conduc", "gasolina"],
    kgPerUnit: 0.192,
    unit: "km",
    category: "transporte",
    label: "coche",
  },
  {
    keys: ["moto", "motocicleta", "scooter"],
    kgPerUnit: 0.103,
    unit: "km",
    category: "transporte",
    label: "moto",
  },
  {
    keys: ["bus", "autobus", "autobús", "camión", "camion"],
    kgPerUnit: 0.089,
    unit: "km",
    category: "transporte",
    label: "bus",
  },
  {
    keys: ["tren", "metro", "train", "subway", "rail"],
    kgPerUnit: 0.041,
    unit: "km",
    category: "transporte",
    label: "tren",
  },
  {
    keys: ["bici", "bicicleta", "bike", "camin", "walk", "a pie"],
    kgPerUnit: 0,
    unit: "km",
    category: "transporte",
    label: "movilidad activa",
  },
  {
    keys: [
      "carne",
      "res",
      "ternera",
      "hamburguesa",
      "burger",
      "steak",
      "beef",
      "asado",
    ],
    kgPerUnit: 7.2,
    unit: "meal",
    category: "alimentacion",
    label: "comida con carne",
  },
  {
    keys: ["pollo", "chicken", "aves"],
    kgPerUnit: 1.8,
    unit: "meal",
    category: "alimentacion",
    label: "pollo",
  },
  {
    keys: ["pescado", "fish", "mariscos"],
    kgPerUnit: 1.5,
    unit: "meal",
    category: "alimentacion",
    label: "pescado",
  },
  {
    keys: ["vegetari", "ensalada", "veggie"],
    kgPerUnit: 1.7,
    unit: "meal",
    category: "alimentacion",
    label: "comida vegetariana",
  },
  {
    keys: ["vegan", "vegana"],
    kgPerUnit: 0.9,
    unit: "meal",
    category: "alimentacion",
    label: "comida vegana",
  },
  {
    keys: ["café", "cafe", "coffee", "latte"],
    kgPerUnit: 0.28,
    unit: "item",
    category: "alimentacion",
    label: "café",
  },
  {
    keys: ["electricidad", "luz", "kwh", "kwh", "corriente"],
    kgPerUnit: 0.4,
    unit: "kwh",
    category: "energia",
    label: "electricidad",
  },
  {
    keys: ["aire acondicionado", "ac ", "a/c", "calefacci"],
    kgPerUnit: 1.2,
    unit: "hour",
    category: "energia",
    label: "clima",
  },
  {
    keys: ["streaming", "netflix", "youtube", "series"],
    kgPerUnit: 0.055,
    unit: "hour",
    category: "energia",
    label: "streaming",
  },
  {
    keys: ["bolsa plast", "bolsa plást", "plastic bag"],
    kgPerUnit: 0.033,
    unit: "item",
    category: "consumo",
    label: "bolsa plástica",
  },
  {
    keys: ["ropa", "camiseta", "jeans", "fast fashion"],
    kgPerUnit: 8.5,
    unit: "item",
    category: "consumo",
    label: "prenda",
  },
];

export function extractNumber(text: string): number | null {
  const normalized = text.replace(",", ".");
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function defaultQuantity(unit: Factor["unit"]): number {
  if (unit === "km") return 10;
  if (unit === "kwh") return 1;
  if (unit === "hour") return 1;
  return 1;
}
