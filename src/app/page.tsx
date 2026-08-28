import { HomeClient } from "@/components/HomeClient";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-primary">MVP · huella en lenguaje natural</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Mide tu CO₂e escribiendo como hablas
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          EcoTrack convierte frases cotidianas en estimaciones de carbono y un tablero
          simple. Sin formularios eternos.
        </p>
      </section>
      <HomeClient />
    </main>
  );
}
