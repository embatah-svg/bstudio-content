// check-comments.mjs — interroga direttamente i commenti del post indicato (debug, sola lettura).
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const line of (await readFile(path.join(ROOT, ".env"), "utf8")).split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const G = `https://${process.env.GRAPH_HOST}/v21.0`;
const T = process.env.ACCESS_TOKEN;
const mediaId = process.argv[2] || "17922701403144424";

const media = await (await fetch(`${G}/${mediaId}?fields=id,caption,timestamp,comments_count,like_count,permalink&access_token=${T}`)).json();
console.log("MEDIA:", JSON.stringify({ id: media.id, comments_count: media.comments_count, like_count: media.like_count, permalink: media.permalink, error: media.error }, null, 2));

const com = await (await fetch(`${G}/${mediaId}/comments?fields=id,text,username,timestamp,hidden,replies{id,text,username}&access_token=${T}`)).json();
console.log("COMMENTS:", JSON.stringify(com, null, 2));
