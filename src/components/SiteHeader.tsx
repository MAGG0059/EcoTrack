import Link from "next/link";
import { Leaf } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          EcoTrack
        </Link>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link className="transition hover:text-foreground" href="/">
            Inicio
          </Link>
          <Link className="transition hover:text-foreground" href="/historial">
            Historial
          </Link>
        </nav>
      </div>
    </header>
  );
}
