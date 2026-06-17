// daily-publish.mjs — pubblica il SET GIORNALIERO: 1 post + 1 reel + 1 story.
// Prende il prossimo "ready" da ciascuna coda, lo pubblica via Meta Graph API e lo marca "published".
// Pensato per girare 1×/giorno (GitHub Actions o scheduler locale).
// Uso: node _scripts/daily-publish.mjs [--dry-run] [--only=post,reel,story]
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const DRY = process.argv.includes("--dry-run");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? onlyArg.split("=")[1].split(",") : ["post", "reel", "story"];

// ─── .env loader (skip se le var sono già in ambiente, es. GitHub Actions) ───
const envPath = path.join(ROOT, ".env");
if (existsSync(envPath)) {
  for (const line of (await readFile(envPath, "utf8")).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const GRAPH = `https://${process.env.GRAPH_HOST || "graph.facebook.com"}/v21.0`;
const { IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL } = process.env;
if (!DRY && (!IG_USER_ID || !ACCESS_TOKEN || !ASSET_BASE_URL)) {
  console.error("❌ Mancano IG_USER_ID / ACCESS_TOKEN / ASSET_BASE_URL (env o .env).");
  process.exit(1);
}
const assetUrl = (rel) => `${(ASSET_BASE_URL || "").replace(/\/$/, "")}/${String(rel).replace(/\\/g, "/")}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, p, params) {
  if (DRY) { console.log(`   [dry] ${method} ${p}`); return { id: `dry_${Math.random().toString(36).slice(2, 8)}` }; }
  const allParams = { ...params, access_token: ACCESS_TOKEN };
  const url = new URL(`${GRAPH}${p}`);
  const opts = { method };
  if (method === "GET") for (const [k, v] of Object.entries(allParams)) url.searchParams.set(k, v);
  else opts.body = new URLSearchParams(allParams);
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`API ${p}: ${JSON.stringify(json.error || json)}`);
  return json;
}

// poll finché il container è FINISHED (reel/story video, single image)
async function waitReady(creationId, tries = 30, ms = 4000) {
  for (let i = 0; i < tries && !DRY; i++) {
    const st = await api("GET", `/${creationId}`, { fields: "status_code" });
    if (st.status_code === "FINISHED") return;
    if (st.status_code === "ERROR") throw new Error("processing ERROR");
    await sleep(ms);
  }
}

async function loadQueue(file) {
  const fp = path.join(SELF, file);
  if (!existsSync(fp)) return { fp, items: null };
  return { fp, items: JSON.parse(await readFile(fp, "utf8")) };
}

async function publishPost(post) {
  let creationId;
  if (post.type === "carousel") {
    const children = [];
    for (const a of post.assets) {
      const c = await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(a), is_carousel_item: "true" });
      children.push(c.id);
    }
    creationId = (await api("POST", `/${IG_USER_ID}/media`, { media_type: "CAROUSEL", children: children.join(","), caption: post.caption })).id;
    await waitReady(creationId);
  } else if (post.type === "reel") {
    const params = { media_type: "REELS", video_url: assetUrl(post.assets[0]), caption: post.caption };
    if (post.cover) params.cover_url = assetUrl(post.cover);
    creationId = (await api("POST", `/${IG_USER_ID}/media`, params)).id;
    await waitReady(creationId, 30, 5000);
  } else {
    creationId = (await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(post.assets[0]), caption: post.caption })).id;
    await waitReady(creationId, 20, 3000);
  }
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: creationId });
  if (post.firstComment) {
    try { await api("POST", `/${pub.id}/comments`, { message: post.firstComment }); } catch (e) { console.log(`   ⚠ commento: ${e.message}`); }
  }
  return pub.id;
}

async function publishReel(reel) {
  const params = { media_type: "REELS", video_url: assetUrl(reel.video), caption: reel.caption || "" };
  if (reel.cover) params.cover_url = assetUrl(reel.cover);
  const creationId = (await api("POST", `/${IG_USER_ID}/media`, params)).id;
  await waitReady(creationId, 40, 5000);
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: creationId });
  if (reel.firstComment) {
    try { await api("POST", `/${pub.id}/comments`, { message: reel.firstComment }); } catch (e) { console.log(`   ⚠ commento: ${e.message}`); }
  }
  return pub.id;
}

async function publishStory(story) {
  const isVideo = /\.(mp4|mov)$/i.test(story.video || "");
  const params = isVideo
    ? { media_type: "STORIES", video_url: assetUrl(story.video) }
    : { media_type: "STORIES", image_url: assetUrl(story.image || story.video) };
  const creationId = (await api("POST", `/${IG_USER_ID}/media`, params)).id;
  await waitReady(creationId, 30, 4000);
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: creationId });
  return pub.id;
}

// ─── Run ─────────────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
console.log(`📅 Daily publish — ${today}${DRY ? " (DRY RUN)" : ""} — formati: ${ONLY.join(", ")}`);
const results = [];

const jobs = [
  { kind: "post", file: "publish-queue.json", fn: publishPost, label: (p) => `${p.tag || p.id} (${p.type})` },
  { kind: "reel", file: "reel-queue.json", fn: publishReel, label: (p) => `${p.tag || p.id} (reel)` },
  { kind: "story", file: "story-queue.json", fn: publishStory, label: (p) => `${p.tag || p.id} (story)` },
];

for (const job of jobs) {
  if (!ONLY.includes(job.kind)) continue;
  const { fp, items } = await loadQueue(job.file);
  if (!items) { console.log(`⏭  ${job.kind}: nessuna coda (${job.file}).`); continue; }
  const item = items.find((x) => x.status === "ready");
  if (!item) { console.log(`📭 ${job.kind}: niente "ready".`); continue; }
  const tag = item.tag || item.id;
  console.log(`🚀 ${job.kind}: pubblico ${job.label(item)}`);
  try {
    const mediaId = await job.fn(item);
    console.log(`   ✅ ${job.kind} pubblicato — media id: ${mediaId}`);
    if (!DRY) {
      item.status = "published";
      item.publishedAt = new Date().toISOString();
      item.mediaId = mediaId;
      await writeFile(fp, JSON.stringify(items, null, 2));
    }
    results.push({ kind: job.kind, tag, mediaId });
  } catch (e) {
    console.error(`   ❌ ${job.kind} (${tag}): ${e.message}`);
    results.push({ kind: job.kind, tag, error: e.message });
  }
}

const ok = results.filter((r) => r.mediaId).length;
const fail = results.filter((r) => r.error).length;
console.log(`\n📊 Riepilogo: ${ok} pubblicati, ${fail} falliti.`);
if (fail > 0 && !DRY) process.exit(1);
