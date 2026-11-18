import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// News-image entry: copy the front-page image (entry.png, in the repository
// root) into the output directory as entry.png. Deterministic: no network,
// no clock, no randomness — every run writes the same bytes.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
// Resolve entry.png relative to this file, so the copy works no matter
// which working directory the harness runs the program from.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, "entry.png");
const target = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
// Read the copy back and check it matches the source byte for byte.
const sourceBytes = readFileSync(source);
const targetBytes = readFileSync(target);
if (!sourceBytes.equals(targetBytes)) {
  throw new Error("entry.png copy does not match the source");
}
console.log(`wrote ${target} (${targetBytes.length} bytes)`);
