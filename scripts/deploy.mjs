import { copyFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

if (!existsSync(".env") && existsSync(".env.example")) {
  copyFileSync(".env.example", ".env");
  console.log("Created .env from .env.example");
}

if (!process.env.OPENAI_API_KEY) {
  console.log("OPENAI_API_KEY is empty — NLP will use the local heuristic parser.");
}

const install = existsSync("package-lock.json")
  ? spawnSync("npm", ["ci"], { stdio: "inherit", shell: true })
  : spawnSync("npm", ["install"], { stdio: "inherit", shell: true });

if (install.status !== 0) process.exit(install.status ?? 1);

const build = spawnSync("npm", ["run", "build"], { stdio: "inherit", shell: true });
process.exit(build.status ?? 0);
