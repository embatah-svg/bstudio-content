// publish-story.mjs — pubblica la PROSSIMA Story "ready" da story-queue.json (Instagram media_type=STORIES).
// Le Story durano 24h e non hanno caption (il testo è già nell'immagine 1080x1920). Uso: node _scripts/publish-story.mjs [--dry-run]
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const DRY = process.argv.includes("--dry-run");

for (const line of (await readFile(path.join(ROOT, ".env"), "utf8")).split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const GRAPH = `https://${process.env.GRAPH_HOST || "graph.facebook.com"}/v21.0`;
const { IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL } = process.env;
const assetUrl = (rel) => `${ASSET_BASE_URL.replace(/\/$/, "")}/${rel.replace(/\\/g, "/")}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, p, params) {
  if (DRY) { console.log(`   [dry] ${method} ${p} ${JSON.stringify(params)}`); return { id: `dry_${Math.random().toString(36).slice(2, 8)}` }; }
  const all = { ...params, access_token: ACCESS_TOKEN };
  const url = new URL(`${GRAPH}${p}`);
  const opts = { method };
  if (method === "GET") for (const [k, v] of Object.entries(all)) url.searchParams.set(k, v);
  else opts.body = new URLSearchParams(all);
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`API ${p}: ${JSON.stringify(json.error || json)}`);
  return json;
}

const qPath = path.join(SELF, "story-queue.json");
const queue = JSON.parse(await readFile(qPath, "utf8"));
const story = queue.find((s) => s.status === "ready");
if (!story) { console.log("📭 Nessuna Story 'ready' in coda."); process.exit(0); }

console.log(`📖 Pubblico Story: ${story.id} — ${new Date().toLocaleString("de-CH")}`);
try {
  const isVideo = /\.mp4$/i.test(story.image);
  const params = isVideo ? { media_type: "STORIES", video_url: assetUrl(story.image) } : { media_type: "STORIES", image_url: assetUrl(story.image) };
  const c = await api("POST", `/${IG_USER_ID}/media`, params);
  for (let i = 0; i < 20 && isVideo && !DRY; i++) {
    const st = await api("GET", `/${c.id}`, { fields: "status_code" });
    if (st.status_code === "FINISHED") break;
    if (st.status_code === "ERROR") throw new Error("Story video processing ERROR");
    await sleep(4000);
  }
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: c.id });
  console.log(`✅ Story pubblicata — id: ${pub.id}`);
  if (!DRY) { story.status = "published"; story.publishedAt = new Date().toISOString(); story.mediaId = pub.id; await writeFile(qPath, JSON.stringify(queue, null, 2)); }
  console.log(`📋 Story 'ready' restanti: ${queue.filter((s) => s.status === "ready").length}`);
} catch (e) {
  console.error(`❌ Story ${story.id}: ${e.message}`);
  if (/permission|STORIES|media_type/i.test(e.message)) console.error("   Nota: alcune app richiedono il permesso publish per le Storie o App Review. Verifica con --dry-run.");
  process.exit(1);
}
