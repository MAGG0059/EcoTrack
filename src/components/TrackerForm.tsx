"use client";

import { useState } from "react";
import { Leaf, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCarbonStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { ParseResult } from "@/types/carbon";

const EXAMPLES = [
  "Maneje 25 km al trabajo en coche",
  "Comí una hamburguesa de res",
  "Vi Netflix 2 horas",
  "Tomé el metro 8 km",
];

export function TrackerForm() {
  const addEntry = useCarbonStore((s) => s.addEntry);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState<ParseResult | null>(null);

  async function submit(value = text) {
    const payload = value.trim();
    if (payload.length < 3) {
      setError("Describe una actividad (mín. 3 caracteres).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al parsear");
      const parsed = data as ParseResult;
      addEntry({
        id: uid(),
        rawText: payload,
        summary: parsed.summary,
        category: parsed.category,
        kgCO2e: parsed.kgCO2e,
        createdAt: new Date().toISOString(),
        source: parsed.source,
      });
      setLast(parsed);
      setText("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="animate-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Registrar en lenguaje natural
        </CardTitle>
        <CardDescription>
          Escribe lo que hiciste. EcoTrack estima kg CO₂e (IA o reglas locales si no hay API key).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ej. Fuí 12 km en bus y después tomé un café"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              void submit();
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-foreground"
              onClick={() => {
                setText(ex);
                void submit(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {last ? (
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {last.summary} · {last.source === "ai" ? "IA" : "heurística"}
          </p>
        ) : null}
        <Button className="w-full sm:w-auto" disabled={loading} onClick={() => void submit()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Registrar huella
        </Button>
      </CardContent>
    </Card>
  );
}
