#!/usr/bin/env bash
# Prepares env + production build for Replit / any Node host.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "OPENAI_API_KEY is empty — NLP will use the local heuristic parser."
fi

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

npm run build
echo "Deploy prep complete. Public URL: Replit → Run / Deploy."
