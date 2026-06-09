// generate-schedule-csv.mjs — crea schedule.csv per scheduler (Publer/Metricool/Later).
// Date FUTURE (una al giorno da domani), caption + URL immagini + primo commento.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const BASE = "https://raw.githubusercontent.com/embatah-svg/bstudio-content/main";
const START = new Date(Date.now() + 24 * 3600 * 1000); // domani
const TIME = "19:00";

const queue = JSON.parse(await readFile(path.join(SELF, "publish-queue.json"), "utf8"));
const csv = (v) => `"${String(v).replace(/"/g, '""')}"`;
const iso = (d) => d.toISOString().slice(0, 10);

const rows = [["Date", "Time", "Platform", "Type", "Media_URLs", "Caption", "First_Comment"]];
queue.forEach((p, i) => {
  const d = new Date(START); d.setDate(START.getDate() + i);
  const urls = p.assets.map((a) => `${BASE}/${a}`).join(" | ");
  rows.push([iso(d), TIME, "instagram", p.type === "reel" ? "reel" : "carousel", urls, p.caption, p.firstComment]);
});

const out = rows.map((r) => r.map(csv).join(",")).join("\r\n");
await writeFile(path.join(ROOT, "schedule.csv"), out, "utf8");
console.log(`✅ schedule.csv: ${queue.length} post, dal ${iso(START)} (1/giorno, ${TIME}).`);
