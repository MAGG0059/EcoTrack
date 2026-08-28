import { NextResponse } from "next/server";
import { parseHeuristic } from "@/lib/heuristic-parser";
import type { Category, ParseResult } from "@/types/carbon";

const CATEGORIES: Category[] = [
  "transporte",
  "alimentacion",
  "energia",
  "consumo",
  "otro",
];

function isCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}

async function parseWithOpenAI(text: string): Promise<ParseResult | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Estimates kg CO2e for a daily activity described in Spanish or English.
Return JSON: {"summary": string, "category": "transporte"|"alimentacion"|"energia"|"consumo"|"otro", "kgCO2e": number, "confidence": number 0-1}.
Use typical IPCC/DEFRA-style averages. If unclear, still estimate conservatively.`,
        },
        { role: "user", content: text },
      ],
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) return null;

  const parsed = JSON.parse(raw) as {
    summary?: string;
    category?: string;
    kgCO2e?: number;
    confidence?: number;
  };

  const kg = Number(parsed.kgCO2e);
  if (!Number.isFinite(kg) || kg < 0) return null;

  return {
    summary: parsed.summary || `Estimado: ${kg.toFixed(2)} kg CO₂e`,
    category: parsed.category && isCategory(parsed.category) ? parsed.category : "otro",
    kgCO2e: Number(kg.toFixed(2)),
    source: "ai",
    confidence: Number.isFinite(Number(parsed.confidence))
      ? Number(parsed.confidence)
      : 0.8,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = String(body?.text ?? "").trim();
    if (text.length < 3) {
      return NextResponse.json(
        { error: "Escribe al menos 3 caracteres." },
        { status: 400 }
      );
    }

    try {
      const ai = await parseWithOpenAI(text);
      if (ai) return NextResponse.json(ai);
    } catch {
      // fall through to heuristic
    }

    return NextResponse.json(parseHeuristic(text));
  } catch {
    return NextResponse.json({ error: "No se pudo procesar." }, { status: 500 });
  }
}
