// generate-schedule-csv.mjs — piano per scheduler (Publer/Metricool). Solo post "ready".
// REEL PER PRIMI (più views), poi caroselli/single in ordine. Date future, 1/giorno.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const BASE = "https://raw.githubusercontent.com/embatah-svg/bstudio-content/main";
const START = new Date(Date.now() + 24 * 3600 * 1000); // domani
const TIME = "19:00";

const queue = JSON.parse(await readFile(path.join(SELF, "publish-queue.json"), "utf8"));
const ready = queue.filter((p) => p.status === "ready");
// Reel prima, poi il resto nell'ordine della coda
const ordered = [...ready.filter((p) => p.type === "reel"), ...ready.filter((p) => p.type !== "reel")];

const csv = (v) => `"${String(v).replace(/"/g, '""')}"`;
const iso = (d) => d.toISOString().slice(0, 10);
const rows = [["Date", "Time", "Type", "Media_URLs", "Caption", "First_Comment"]];
ordered.forEach((p, i) => {
  const d = new Date(START); d.setDate(START.getDate() + i);
  const urls = p.assets.map((a) => `${BASE}/${a}`).join(" | ");
  const type = p.type === "reel" ? "reel" : p.type === "single" ? "post" : "carousel";
  rows.push([iso(d), TIME, type, urls, p.caption, p.firstComment || ""]);
});

const out = rows.map((r) => r.map(csv).join(",")).join("\r\n");
await writeFile(path.join(ROOT, "schedule.csv"), out, "utf8");
console.log(`✅ schedule.csv: ${ordered.length} post (dal ${iso(START)}, ${TIME}). Reel ai primi ${ordered.filter((p)=>p.type==="reel").length} posti.`);
