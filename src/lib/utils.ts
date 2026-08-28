import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKg(kg: number) {
  if (kg >= 100) return `${kg.toFixed(0)} kg`;
  if (kg >= 10) return `${kg.toFixed(1)} kg`;
  return `${kg.toFixed(2)} kg`;
}

export function uid() {
  return crypto.randomUUID();
}
