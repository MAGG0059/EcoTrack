import { parseHeuristic } from "@/lib/heuristic-parser";

describe("parseHeuristic", () => {
  it("estimates car trips from Spanish text", () => {
    const result = parseHeuristic("Maneje 25 km al trabajo en coche");
    expect(result.category).toBe("transporte");
    expect(result.kgCO2e).toBeCloseTo(25 * 0.192, 1);
    expect(result.source).toBe("heuristic");
  });

  it("estimates beef meals", () => {
    const result = parseHeuristic("Comí una hamburguesa de res");
    expect(result.category).toBe("alimentacion");
    expect(result.kgCO2e).toBeGreaterThan(5);
  });

  it("falls back for unknown activities", () => {
    const result = parseHeuristic("actividad rara 3");
    expect(result.category).toBe("otro");
    expect(result.kgCO2e).toBeGreaterThan(0);
  });
});
