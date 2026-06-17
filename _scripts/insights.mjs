// insights.mjs — tira le metriche reali dell'account IG e dei post pubblicati.
// Uso: node _scripts/insights.mjs
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const envPath = path.join(ROOT, ".env");
if (existsSync(envPath)) {
  for (const line of (await readFile(envPath, "utf8")).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const GRAPH = `https://${process.env.GRAPH_HOST || "graph.facebook.com"}/v21.0`;
const { IG_USER_ID, ACCESS_TOKEN } = process.env;

async function get(p, params = {}) {
  const url = new URL(`${GRAPH}${p}`);
  for (const [k, v] of Object.entries({ ...params, access_token: ACCESS_TOKEN })) url.searchParams.set(k, v);
  const res = await fetch(url);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json;
}

const tryGet = async (p, params) => { try { return await get(p, params); } catch (e) { return { __err: e.message }; } };

console.log("═══ ACCOUNT ═══");
const acct = await tryGet(`/${IG_USER_ID}`, { fields: "username,followers_count,follows_count,media_count" });
console.log(acct.__err ? `  ⚠ ${acct.__err}` : `  @${acct.username} — ${acct.followers_count} follower, ${acct.media_count} post`);

// account-level insights (ultimi 14 gg)
const acctIns = await tryGet(`/${IG_USER_ID}/insights`, { metric: "reach,profile_views", period: "day", metric_type: "total_value" });
if (acctIns.data) {
  for (const m of acctIns.data) console.log(`  ${m.name}: ${JSON.stringify(m.total_value?.value ?? m.values)}`);
} else if (acctIns.__err) console.log(`  ⚠ account insights: ${acctIns.__err}`);

// recent media
console.log("\n═══ POST RECENTI (reach / interazioni / salvataggi / condivisioni) ═══");
const media = await tryGet(`/${IG_USER_ID}/media`, { fields: "id,caption,media_type,media_product_type,timestamp,like_count,comments_count,permalink", limit: 15 });
if (media.__err) { console.log(`  ⚠ ${media.__err}`); process.exit(0); }

for (const it of media.data || []) {
  const cap = (it.caption || "").split("\n")[0].slice(0, 42);
  const ins = await tryGet(`/${it.id}/insights`, { metric: "reach,total_interactions,saved,shares" });
  const map = {};
  if (ins.data) for (const m of ins.data) map[m.name] = m.values?.[0]?.value ?? m.total_value?.value;
  const reach = map.reach ?? "—";
  const inter = map.total_interactions ?? "—";
  const saved = map.saved ?? "—";
  const shares = map.shares ?? "—";
  const date = (it.timestamp || "").slice(0, 10);
  const type = it.media_product_type || it.media_type;
  console.log(`  [${date}] ${type.padEnd(8)} reach:${String(reach).padStart(5)}  inter:${String(inter).padStart(4)}  save:${String(saved).padStart(3)}  share:${String(shares).padStart(3)}  likes:${String(it.like_count).padStart(3)}  comm:${it.comments_count}`);
  if (ins.__err) console.log(`        ⚠ insights: ${ins.__err}`);
}
