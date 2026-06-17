// publish-etsy.mjs — pubblicazione one-off promo Etsy: 1 carosello prodotto + 1 story.
// Uso: node _scripts/publish-etsy.mjs [--dry-run] [--only=post,story]
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const DRY = process.argv.includes("--dry-run");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? onlyArg.split("=")[1].split(",") : ["post", "story"];

const envPath = path.join(ROOT, ".env");
if (existsSync(envPath)) {
  for (const line of (await readFile(envPath, "utf8")).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const GRAPH = `https://${process.env.GRAPH_HOST || "graph.facebook.com"}/v21.0`;
const { IG_USER_ID, ACCESS_TOKEN, ASSET_BASE_URL } = process.env;
const assetUrl = (rel) => `${(ASSET_BASE_URL || "").replace(/\/$/, "")}/${String(rel).replace(/\\/g, "/")}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, p, params) {
  if (DRY) { console.log(`   [dry] ${method} ${p}`); return { id: `dry_${Math.random().toString(36).slice(2, 8)}` }; }
  const url = new URL(`${GRAPH}${p}`);
  const opts = { method };
  const all = { ...params, access_token: ACCESS_TOKEN };
  if (method === "GET") for (const [k, v] of Object.entries(all)) url.searchParams.set(k, v);
  else opts.body = new URLSearchParams(all);
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`API ${p}: ${JSON.stringify(json.error || json)}`);
  return json;
}
async function waitReady(id, tries = 30, ms = 4000) {
  for (let i = 0; i < tries && !DRY; i++) {
    const st = await api("GET", `/${id}`, { fields: "status_code" });
    if (st.status_code === "FINISHED") return;
    if (st.status_code === "ERROR") throw new Error("processing ERROR");
    await sleep(ms);
  }
}

const POST = {
  images: [
    "instagram/etsy/G01/01-cover.png",
    "instagram/etsy/G01/02-feature.png",
    "instagram/etsy/G01/04-included.png",
    "instagram/etsy/G01/05-result.png",
  ],
  caption:
    "Schluss mit dem leeren Bildschirm. 300 ChatGPT-Prompts, die dein Marketing erledigen.\n\n" +
    "Du weisst, dass du posten, mailen und werben solltest — aber dir fehlt die Zeit und die Idee. " +
    "Genau dafür gibt es diesen Guide: 300 fertige Copy-Paste-Prompts, sortiert nach Marketing-Ziel.\n\n" +
    "Was drin ist — 9 Kategorien:\n" +
    "— Social Media: Instagram, Facebook, LinkedIn, Stories\n" +
    "— E-Mail: Betreffzeilen, Willkommens-Sequenzen, Newsletter\n" +
    "— Ads & SEO: Facebook/Google Ads, Blog, lokale Suche\n" +
    "— Produkttexte, Kundenservice, Branding, Aktionen\n\n" +
    "Einfach [Platzhalter] ausfüllen — funktioniert mit ChatGPT, Claude & Gemini.\n\n" +
    "Für Selbstständige, KMU, Etsy-Verkäufer und alle, die ihr Marketing selbst machen.\n\n" +
    "Zum Launch −20% mit Code WELCOME20. Link in Bio → Shop bstudiodesignch.\n\n" +
    "#chatgptprompts #aimarketing #onlinemarketing #kmuschweiz #kleinunternehmen #marketingtipps #digitaleprodukte",
  firstComment:
    "Hol dir den Guide im Shop (Link in Bio) — Launch-Rabatt −20% mit Code WELCOME20. " +
    "300 Prompts, sofort als PDF nutzbar. Fragen? Schreib mir hier drunter.",
};
const STORY = { video: "instagram/stories/etsy-g01-story.mp4" };

async function publishCarousel(p) {
  const children = [];
  for (const a of p.images) {
    const c = await api("POST", `/${IG_USER_ID}/media`, { image_url: assetUrl(a), is_carousel_item: "true" });
    children.push(c.id);
  }
  const cont = await api("POST", `/${IG_USER_ID}/media`, { media_type: "CAROUSEL", children: children.join(","), caption: p.caption });
  await waitReady(cont.id);
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: cont.id });
  if (p.firstComment) { try { await api("POST", `/${pub.id}/comments`, { message: p.firstComment }); } catch (e) { console.log(`   ⚠ commento: ${e.message}`); } }
  return pub.id;
}
async function publishStory(s) {
  const cont = await api("POST", `/${IG_USER_ID}/media`, { media_type: "STORIES", video_url: assetUrl(s.video) });
  await waitReady(cont.id, 30, 4000);
  const pub = await api("POST", `/${IG_USER_ID}/media_publish`, { creation_id: cont.id });
  return pub.id;
}

console.log(`🛍  Etsy promo${DRY ? " (DRY)" : ""} — ${ONLY.join(", ")}`);
if (ONLY.includes("post")) {
  try { const id = await publishCarousel(POST); console.log(`✅ Post (carosello) pubblicato — media id: ${id}`); }
  catch (e) { console.error(`❌ Post: ${e.message}`); }
}
if (ONLY.includes("story")) {
  try { const id = await publishStory(STORY); console.log(`✅ Story pubblicata — media id: ${id}`); }
  catch (e) { console.error(`❌ Story: ${e.message}`); }
}
