// check-token.mjs — verifica (sola lettura) che il token IG funzioni. Non pubblica nulla.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const line of (await readFile(path.join(ROOT, ".env"), "utf8")).split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const host = process.env.GRAPH_HOST || "graph.facebook.com";
const id = process.env.IG_USER_ID;
const url = `https://${host}/v21.0/${id}?fields=user_id,username,account_type,media_count&access_token=${process.env.ACCESS_TOKEN}`;
try {
  const r = await fetch(url);
  const j = await r.json();
  if (j.error) console.log("❌ Errore token:", JSON.stringify(j.error));
  else console.log("✅ Token VALIDO →", JSON.stringify(j));
} catch (e) { console.log("❌ Rete:", e.message); }
