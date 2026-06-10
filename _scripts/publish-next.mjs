// publish-next.mjs — pubblica il PROSSIMO post "ready" della coda e lo marca "published".
// Pensato per essere lanciato da uno scheduler (1 post per esecuzione, agli orari migliori).
// Uso: node _scripts/publish-next.mjs [--dry-run]
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const DRY = process.argv.includes("--dry-run");

// .env loader
for (const line of (await readFile(path.join(ROOT, ".env"), "utf8")).split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const GRAPH = `https://${process.env.GRAPH_HOST || "graph.facebook.com"}/v21.0`;
const { IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL } = process.env;
const assetUrl = (rel) => `${ASSET_BASE_URL.replace(/\/$/, "")}/${rel.replace(/\\/g, "/")}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, p, params) {
  if (DRY) { console.log(`   [dry] ${method} ${p}`); return { id: `dry_${Math.random().toString(36).slice(2, 8)}` }; }
  const res = await fetch(new URL(`${GRAPH}${p}`), { method, body: new URLSearchParams({ ...params, access_token: ACCESS_TOKEN }) });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`API ${p}: ${JSON.stringify(json.error || json)}`);
  return json;
}

const queuePath = path.join(SELF, "publish-queue.json");
const queue = JSON.parse(await readFile(queuePath, "utf8"));
const post = queue.find((p) => p.status === "ready");
if (!post) { console.log("📭 Nessun post 'ready' in coda — niente da pubblicare."); process.exit(0); }

console.log(`🚀 Pubblico il prossimo: ${post.tag} (${post.type}) — ${new Date().toLocaleString("de-CH")}`);
try {
  let creationId;
  if (post.type === "carousel") {
    const children = [];
    for (const a of post.assets) {
      const c = await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(a), is_carousel_item: "true" });
      children.push(c.id);
    }
    creationId = (await api("POST", `/${IG_USER_ID}/media`, { media_type: "CAROUSEL", children: children.join(","), caption: post.caption })).id;
  } else if (post.type === "reel") {
    const params = { media_type: "REELS", video_url: assetUrl(post.assets[0]), caption: post.caption };
    if (post.cover) params.cover_url = assetUrl(post.cover);
    creationId = (await api("POST", `/${IG_USER_ID}/media`, params)).id;
    for (let i = 0; i < 30 && !DRY; i++) {
      const st = await api("GET", `/${creationId}`, { fields: "status_code" });
      if (st.status_code === "FINISHED") break;
      if (st.status_code === "ERROR") throw new Error("Reel processing ERROR");
      await sleep(5000);
    }
  } else {
    creationId = (await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(post.assets[0]), caption: post.caption })).id;
  }
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: creationId });
  console.log(`✅ ${post.tag} pubblicato — media id: ${pub.id}`);
  if (post.firstComment) {
    try { await api("POST", `/${pub.id}/comments`, { message: post.firstComment }); console.log("💬 primo commento postato (fissalo a mano)"); }
    catch (e) { console.log(`⚠ commento non postato: ${e.message}`); }
  }
  if (!DRY) {
    post.status = "published";
    post.publishedAt = new Date().toISOString();
    post.mediaId = pub.id;
    await writeFile(queuePath, JSON.stringify(queue, null, 2));
  }
  const remaining = queue.filter((p) => p.status === "ready").length - (DRY ? 0 : 0);
  console.log(`📋 In coda restano: ${queue.filter((p) => p.status === "ready").length} post ready`);
} catch (e) {
  console.error(`❌ ${post.tag}: ${e.message}`);
  process.exit(1);
}
