# EcoTrack

MVP para registrar huella de carbono (kg CO₂e) con **lenguaje natural**. Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui, Zustand. La IA (OpenAI) es opcional: sin API key usa un parser heurístico.

## Arranque local

```bash
npm install
copy .env.example .env   # Windows
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `OPENAI_API_KEY` | Si está definida, `/api/parse` usa GPT. Si no, heurística local. |
| `OPENAI_MODEL` | Por defecto `gpt-4o-mini` |
| `PORT` | Puerto (Replit lo inyecta) |

Nunca subas `.env` con secretos. En Replit usa **Secrets**.

## Scripts

- `npm run dev` — desarrollo en `0.0.0.0` (compatible Replit)
- `npm run build` / `npm start` — producción
- `npm test` — Jest + React Testing Library
- `npm run deploy:prep` — copia `.env.example` si falta, instala y hace build (`scripts/deploy.sh` o `scripts/deploy.ps1`)

## Replit (sin config extra)

1. Importa esta carpeta / repo en Replit.
2. Run usa `.replit` (`npm run dev`). Deploy usa `build` + `npm start`.
3. (Opcional) Secrets → `OPENAI_API_KEY`.
4. La URL pública es la que Replit muestra al Run/Deploy (`*.replit.dev`).

No se puede generar esa URL desde esta máquina: hace falta tu cuenta Replit.

## Estructura

```
src/app          # rutas + API
src/components   # UI (incl. shadcn)
src/lib          # store, factores, parser
src/hooks
src/types
src/utils
```

Las reglas del agente están en `.cursorrules` y `.cursor/rules/ecotrack.mdc`.

## Aviso

Las estimaciones son educativas, no un inventario certificado (ISO/GHG Protocol).


## Screenshot

<img width="988" height="671" alt="image" src="https://github.com/user-attachments/assets/fd710713-cc6f-4196-bde2-3bdb266e3409" />

