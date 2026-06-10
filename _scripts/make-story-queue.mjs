// make-story-queue.mjs — genera story-queue.json: la slide-hook (slide01/single) di ogni giorno Tag 04+ come Story teaser.
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const IG = path.join(ROOT, "instagram");

const dirs = (await readdir(IG, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort();
const out = [];
for (const d of dirs) {
  const m = d.match(/_tag(\d+)$/);
  if (!m) continue;
  const nn = parseInt(m[1], 10);
  if (nn < 4) continue; // Tag01-03 già pubblicati
  const exp = path.join(IG, d, "_export");
  let files = [];
  try { files = await readdir(exp); } catch { continue; }
  const hook = files.find((f) => /slide01\.png$/i.test(f)) || files.find((f) => /single\.png$/i.test(f));
  if (!hook) continue;
  out.push({ id: `story-tag${m[1]}`, image: `instagram/${d}/_export/${hook}`, status: "ready" });
}
await writeFile(path.join(SELF, "story-queue.json"), JSON.stringify(out, null, 2));
console.log(`✅ story-queue.json: ${out.length} Story teaser (Tag 04+).`);
