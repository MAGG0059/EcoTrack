# Prepares env + production build (Windows).
Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Test-Path .env) -and (Test-Path .env.example)) {
  Copy-Item .env.example .env
  Write-Host "Created .env from .env.example"
}

if (-not $env:OPENAI_API_KEY) {
  Write-Host "OPENAI_API_KEY is empty — NLP will use the local heuristic parser."
}

if (Test-Path package-lock.json) {
  npm ci
} else {
  npm install
}

npm run build
Write-Host "Deploy prep complete."
