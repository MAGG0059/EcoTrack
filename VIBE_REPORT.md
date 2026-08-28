# VIBE_REPORT.md — EcoTrack

## Cómo se configuraron las reglas del agente

1. **`.cursorrules` (raíz)** — contrato explícito del MVP: Next.js 14 App Router, Tailwind + shadcn/ui, Zustand, NLP con fallback, Jest, carpetas `src/*`, mobile-first, vibe (funcionalidad > perfección, no narrar cada línea, arreglar errores al momento).
2. **`.cursor/rules/ecotrack.mdc`** — misma política en el formato moderno de Cursor (`alwaysApply: true`) para que el agente la reciba aunque ignore `.cursorrules`.
3. **Efecto práctico** — el orquestador no pregunta stack ni carpeta: parsea en `/api/parse`, persiste en Zustand, UI en español, secretos fuera del git.

## Dificultades al delegar código a IA

- **Nombre npm vs carpeta `EcoTrack`**: `create-next-app` rechazó mayúsculas. Solución: scaffold en `ecotrack-tmp` y mover a la raíz; `package.json` queda como `ecotrack`.
- **PowerShell**: `&&` no es separador válido en algunas versiones. Solución: `;` o scripts `run.mjs`.
- **IA no debe ser un SPOF**: sin `OPENAI_API_KEY` el MVP seguiría muerto. Solución: heurística con factores de emisión para que Replit funcione al primer Run.
- **URL pública de Replit**: el agente puede dejar `.replit` / `replit.nix` / `scripts/deploy.sh`, pero **no puede crear el Repl ni devolver `*.replit.dev`** sin tu cuenta. El entregable de URL es un paso humano (Import → Run).
- **Estimaciones de carbono**: un LLM inventa números si no se ancla. Solución: factores locales + prompt acotado a JSON; documentar que no es LCA certificado.
- **Hidratación + persist**: Zustand `persist` desincroniza SSR. Solución: `useHydrated` antes de pintar dashboard/historial.

## Reflexión: de programador a orquestador

El trabajo deja de ser “escribir cada componente” y pasa a ser **definir restricciones, orden de fases y criterios de hecho**. El valor está en:

- fijar stack y carpetas *antes* de generar archivos;
- exigir fallbacks (NLP, env, Replit) para que el MVP sea demostrable;
- revisar fallos de entorno (npm, shell, deploy) y aplicar el arreglo, no un ensayo.

El riesgo del vibe coding es una app que “parece lista” (UI verde, README largo) y no arranca en Replit. Aquí el criterio de éxito es: `npm run dev` + registrar una frase + ver kg CO₂e, con o sin OpenAI.

## Estado del entregable

| Ítem | Estado |
| --- | --- |
| `.cursorrules` + reglas Cursor | Listo |
| App MVP (NL → CO₂e → historial) | Listo |
| Jest (parser + Badge) | Listo |
| Config Replit + `scripts/deploy.*` | Listo |
| URL del Repl desplegado | Pendiente de tu cuenta Replit (ver README) |
