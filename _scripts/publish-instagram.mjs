// publish-instagram.mjs — pubblica carousel/reel su Instagram via Meta Graph API.
// Uso:
//   node _scripts/publish-instagram.mjs --tag tag01            // un post
//   node _scripts/publish-instagram.mjs --all                  // tutti gli "status":"ready"
//   node _scripts/publish-instagram.mjs --tag tag01 --dry-run  // simulazione
//
// Richiede (in .env o ambiente):
//   IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL
// Vedi PUBLISHING-META.md. Nessuna dipendenza esterna (Node 18+ con fetch globale).
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const GRAPH = "https://graph.facebook.com/v21.0";

// --- mini .env loader (senza dipendenze) ---
async function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (existsSync(envPath)) {
    for (const line of (await readFile(envPath, "utf8")).split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
const DRY = has("--dry-run");

await loadEnv();
const { IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL } = process.env;
if (!DRY && (!IG_USER_ID || !ACCESS_TOKEN || !ASSET_BASE_URL)) {
  console.error("❌ Mancano IG_USER_ID / ACCESS_TOKEN / ASSET_BASE_URL (vedi .env e PUBLISHING-META.md).");
  process.exit(1);
}

const assetUrl = (rel) => `${(ASSET_BASE_URL || "https://ASSET_BASE_URL").replace(/\/$/, "")}/${rel.replace(/\\/g, "/")}`;

async function api(method, p, params) {
  const url = new URL(`${GRAPH}${p}`);
  const body = new URLSearchParams({ ...params, access_token: ACCESS_TOKEN });
  if (DRY) { console.log(`   [dry] ${method} ${p} ${JSON.stringify(params)}`); return { id: `dry_${Math.random().toString(36).slice(2, 8)}` }; }
  const res = await fetch(url, { method, body });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`API ${p}: ${JSON.stringify(json.error || json)}`);
  return json;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function publishCarousel(post) {
  console.log(`  → carousel: ${post.assets.length} immagini`);
  const children = [];
  for (const a of post.assets) {
    const child = await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(a), is_carousel_item: "true" });
    children.push(child.id);
  }
  const container = await api("POST", `/${IG_USER_ID}/media`, { media_type: "CAROUSEL", children: children.join(","), caption: post.caption });
  return finalize(container.id, post);
}

async function publishSingle(post) {
  console.log(`  → single image`);
  const container = await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(post.assets[0]), caption: post.caption });
  return finalize(container.id, post);
}

async function publishReel(post) {
  console.log(`  → reel`);
  const params = { media_type: "REELS", video_url: assetUrl(post.assets[0]), caption: post.caption };
  if (post.cover) params.cover_url = assetUrl(post.cover);
  const container = await api("POST", `/${IG_USER_ID}/media`, params);
  // polling stato finché FINISHED (i reel vanno processati lato Meta)
  for (let i = 0; i < 30 && !DRY; i++) {
    const st = await api("GET", `/${container.id}`, { fields: "status_code" });
    if (st.status_code === "FINISHED") break;
    if (st.status_code === "ERROR") throw new Error("Reel processing ERROR");
    console.log(`     …processing (${st.status_code})`); await sleep(5000);
  }
  return finalize(container.id, post);
}

async function finalize(creationId, post) {
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: creationId });
  console.log(`  ✅ pubblicato — media id: ${pub.id}`);
  if (post.firstComment) {
    await api("POST", `/${pub.id}/comments`, { message: post.firstComment });
    console.log(`  💬 primo commento (trigger) pubblicato — ricordati di FISSARLO a mano.`);
  }
  return pub.id;
}

// --- main ---
const queuePath = path.join(SELF, "publish-queue.json");
if (!existsSync(queuePath)) {
  console.error(`❌ Manca ${queuePath}. Copia publish-queue.example.json → publish-queue.json e compila.`);
  process.exit(1);
}
const queue = JSON.parse(await readFile(queuePath, "utf8"));
const tag = val("--tag");
const todo = queue.filter((p) => has("--all") ? p.status === "ready" : p.tag === tag);
if (todo.length === 0) { console.error("Niente da pubblicare (controlla --tag o status:ready)."); process.exit(1); }

console.log(`${DRY ? "🧪 DRY-RUN" : "🚀 PUBLISH"} — ${todo.length} post\n`);
for (const post of todo) {
  console.log(`▶ ${post.tag} (${post.type})`);
  try {
    if (post.type === "carousel") await publishCarousel(post);
    else if (post.type === "single") await publishSingle(post);
    else if (post.type === "reel") await publishReel(post);
    else console.log(`  ⚠ tipo sconosciuto: ${post.type}`);
  } catch (e) { console.error(`  ❌ ${post.tag}: ${e.message}`); }
  console.log("");
}
console.log("Fatto.");
