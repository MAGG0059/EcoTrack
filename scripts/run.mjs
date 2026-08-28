import { spawn } from "node:child_process";

const mode = process.argv[2] === "start" ? "start" : "dev";
const port = process.env.PORT || "3000";

const child = spawn(
  "npx",
  ["next", mode, "-H", "0.0.0.0", "-p", port],
  { stdio: "inherit", shell: true }
);

child.on("exit", (code) => process.exit(code ?? 0));
