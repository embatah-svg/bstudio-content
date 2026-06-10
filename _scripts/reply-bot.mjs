// reply-bot.mjs — auto-risposta ai commenti Instagram con trigger-word.
// Strategia: commenta parola-trigger → il bot risponde pubblicamente → l'utente manda il DM a mano.
//
// Uso:
//   node _scripts/reply-bot.mjs --dry-run        // mostra cosa risponderebbe, senza postare
//   node _scripts/reply-bot.mjs                  // risponde solo ai trigger (default)
//   node _scripts/reply-bot.mjs --all            // risponde a tutti i commenti non gestiti
//   node _scripts/reply-bot.mjs --limit 5        // analizza solo gli ultimi N post (default 10)
//
// Richiede: IG_USER_ID, ACCESS_TOKEN in .env (GRAPH_HOST opzionale)
// Permessi Instagram necessari: instagram_business_manage_comments
//
// Nessuna dipendenza npm esterna. Node 18+ (fetch globale).

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const REPLIED_FILE = path.join(SELF, ".replied.json");

// ---------------------------------------------------------------------------
// .env loader (identico agli altri script)
// ---------------------------------------------------------------------------
async function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (existsSync(envPath)) {
    for (const line of (await readFile(envPath, "utf8")).split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

const DRY     = has("--dry-run");
const ALL     = has("--all");
const LIMIT   = parseInt(val("--limit") || "10", 10);

// ---------------------------------------------------------------------------
// Trigger words (case-insensitive) e relative risposte tedesche
// Ogni trigger ha 4+ varianti per non sembrare un bot.
// ---------------------------------------------------------------------------
const TRIGGER_REPLIES = {
  CHECK: [
    "Schon unterwegs in deine DMs 👀",
    "Top — schau gleich in deine Nachrichten ✉️",
    "Perfekt, ich melde mich gleich bei dir 🙌",
    "Gerne! Sieh mal in deine DMs 📩",
  ],
  WEBCHECK: [
    "Dein Web-Check ist auf dem Weg — schau in deine DMs 🔍",
    "Super, ich schick dir gleich alles per DM ✉️",
    "Check kommt! Schau in ein paar Minuten in deine Nachrichten 💻",
    "Perfekt! Infos zum Web-Check bekommst du per DM 🚀",
  ],
  INFO: [
    "Infos kommen direkt in deine DMs 📬",
    "Gerne! Ich schreib dir gleich 🙌",
    "Sieh mal kurz in deine Nachrichten — ich meld mich! 💌",
    "Auf dem Weg zu dir ✉️ Schau in deine DMs.",
  ],
  PREISE: [
    "Preise kommen per DM — schau gleich rein 💶",
    "Ich schick dir alle Infos zu Preisen direkt ✉️",
    "Klar! Details zu den Preisen bekommst du per Nachricht 🙌",
    "Super Frage — Preise erkläre ich dir gerne per DM 📩",
  ],
  VORHER: [
    "Die Vorher-Nachher Details kommen per DM 🔄",
    "Schau in deine Nachrichten — ich zeig dir alles 📩",
    "Perfekt! Ich schick dir die Infos gleich rüber ✉️",
    "Tolle Entscheidung! Details bekommst du per DM 🙌",
  ],
  TIPP: [
    "Den Tipp schick ich dir direkt per DM 💡",
    "Gerne! Schau gleich in deine Nachrichten ✉️",
    "Top — Tipp kommt per DM, sieh mal rein 📩",
    "Auf dem Weg! Ich meld mich per Nachricht bei dir 🙌",
  ],
  START: [
    "Super, lass uns starten! Infos kommen per DM 🚀",
    "Perfekt! Ich meld mich gleich bei dir ✉️",
    "Gerne! Schau in ein paar Sekunden in deine Nachrichten 🙌",
    "Los geht's — Details bekommst du per DM 📩",
  ],
};

// Risposte generiche per --all (commenti senza trigger)
const GENERIC_REPLIES = [
  "Danke für deinen Kommentar! 🙏",
  "Freut uns sehr, danke! 😊",
  "Vielen Dank — das bedeutet uns viel 🙌",
  "Danke fürs Vorbeischauen! ✨",
  "Super, danke für dein Feedback! 💛",
];

// ---------------------------------------------------------------------------
// Rotazione deterministica per trigger (evita di ripetere sempre la prima frase)
// ---------------------------------------------------------------------------
let _replyCounters = {};
function pickReply(trigger) {
  const pool = TRIGGER_REPLIES[trigger] || GENERIC_REPLIES;
  _replyCounters[trigger] = (_replyCounters[trigger] || 0);
  const pick = pool[_replyCounters[trigger] % pool.length];
  _replyCounters[trigger]++;
  return pick;
}

function pickGeneric() {
  return pickReply("__generic__");
}
// Inizializza contatore generico
_replyCounters["__generic__"] = Math.floor(Math.random() * GENERIC_REPLIES.length);

// ---------------------------------------------------------------------------
// Rileva il trigger nel testo del commento
// ---------------------------------------------------------------------------
function detectTrigger(text) {
  const upper = text.toUpperCase();
  for (const trigger of Object.keys(TRIGGER_REPLIES)) {
    // Match parola intera o come sottostringa separata da spazi/punteggiatura
    const re = new RegExp(`(^|[\\s,!?.])${trigger}([\\s,!?.]|$)`);
    if (re.test(upper) || upper.includes(trigger)) return trigger;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Stato dedup: .replied.json
// ---------------------------------------------------------------------------
async function loadReplied() {
  if (existsSync(REPLIED_FILE)) {
    try {
      return JSON.parse(await readFile(REPLIED_FILE, "utf8"));
    } catch { /* file corrotto — riparte da zero */ }
  }
  return {};
}

async function saveReplied(replied) {
  await writeFile(REPLIED_FILE, JSON.stringify(replied, null, 2), "utf8");
}

// ---------------------------------------------------------------------------
// Gestione errori di permesso Instagram
// ---------------------------------------------------------------------------
function handleApiError(err, context) {
  const msg = err.message || "";
  if (msg.includes("200") || msg.includes("permission") || msg.includes("manage_comments") || msg.includes("OAuthException")) {
    console.error(`\n⚠️  PERMESSO MANCANTE (${context})`);
    console.error("   Per rispondere ai commenti serve: instagram_business_manage_comments");
    console.error("   Come attivarlo:");
    console.error("   1. Vai su developers.facebook.com → la tua App → App Review");
    console.error("   2. Richiedi il permesso: instagram_business_manage_comments");
    console.error("   3. (Opzionale) Per inviare DM: instagram_manage_messages");
    console.error("   4. Rigenera l'Access Token dopo l'approvazione.\n");
    return true; // errore gestito
  }
  return false; // errore non di permesso
}

// ---------------------------------------------------------------------------
// API helper
// ---------------------------------------------------------------------------
let GRAPH_BASE;

async function apiGet(path_, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path_}`);
  url.searchParams.set("access_token", process.env.ACCESS_TOKEN);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString());
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`API GET ${path_}: ${JSON.stringify(json.error || json)}`);
  }
  return json;
}

async function apiPost(path_, params = {}) {
  const url = new URL(`${GRAPH_BASE}${path_}`);
  const body = new URLSearchParams({ ...params, access_token: process.env.ACCESS_TOKEN });
  const res = await fetch(url.toString(), { method: "POST", body });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`API POST ${path_}: ${JSON.stringify(json.error || json)}`);
  }
  return json;
}

// ---------------------------------------------------------------------------
// Logica principale
// ---------------------------------------------------------------------------
export async function runBot({ dryRun = DRY, all = ALL, limit = LIMIT } = {}) {
  await loadEnv();

  const { IG_USER_ID, ACCESS_TOKEN } = process.env;
  GRAPH_BASE = `https://${process.env.GRAPH_HOST || "graph.instagram.com"}/v21.0`;

  if (!IG_USER_ID || !ACCESS_TOKEN) {
    console.error("❌ Mancano IG_USER_ID e/o ACCESS_TOKEN nel file .env");
    process.exit(1);
  }

  console.log(`\n${dryRun ? "🧪 DRY-RUN" : "🤖 BOT"} — reply-bot B.Studio | ${new Date().toLocaleString("it-IT")}`);
  console.log(`   Modalità: ${all ? "TUTTI i commenti" : "solo TRIGGER"} | post analizzati: ultimi ${limit}`);
  console.log(`   Endpoint: ${GRAPH_BASE}\n`);

  const replied = await loadReplied();

  // 1. Recupera gli ultimi N media
  let media = [];
  try {
    const res = await apiGet(`/${IG_USER_ID}/media`, {
      fields: "id,caption,timestamp",
      limit: String(limit),
    });
    media = res.data || [];
  } catch (err) {
    if (!handleApiError(err, "GET /media")) {
      console.error("❌ Errore nel recupero dei media:", err.message);
    }
    return { found: 0, withTrigger: 0, replied: 0 };
  }

  console.log(`📸 ${media.length} post trovati`);

  let totalComments = 0;
  let totalTrigger  = 0;
  let totalReplied  = 0;

  for (const post of media) {
    // 2. Recupera commenti del post
    let comments = [];
    try {
      const res = await apiGet(`/${post.id}/comments`, {
        fields: "id,text,username,timestamp",
      });
      comments = res.data || [];
    } catch (err) {
      if (!handleApiError(err, `GET /${post.id}/comments`)) {
        console.error(`   ⚠ Commenti non disponibili per media ${post.id}: ${err.message}`);
      }
      continue;
    }

    if (comments.length === 0) continue;

    totalComments += comments.length;
    const preview = post.caption ? post.caption.slice(0, 50).replace(/\n/g, " ") : "(no caption)";
    console.log(`\n📄 Post ${post.id} — "${preview}…"`);
    console.log(`   ${comments.length} commenti`);

    for (const comment of comments) {
      const cid = comment.id;

      // Salta commenti già gestiti
      if (replied[cid]) {
        console.log(`   ↩ [${cid}] già risposto il ${replied[cid].at} — skip`);
        continue;
      }

      // Salta commenti dell'owner (non rispondere a se stessi)
      if (comment.username === "b.studio_design") {
        console.log(`   🔇 [${cid}] commento dell'owner — skip`);
        continue;
      }

      const trigger = detectTrigger(comment.text);

      if (!trigger && !all) continue; // solo trigger in modalità default

      if (trigger) totalTrigger++;

      const replyText = trigger ? pickReply(trigger) : pickGeneric();

      console.log(`   💬 @${comment.username}: "${comment.text.slice(0, 60)}"`);
      if (trigger) console.log(`      trigger: ${trigger}`);
      console.log(`      → risposta: "${replyText}"`);

      if (dryRun) {
        console.log(`      [dry-run — nessuna risposta inviata]`);
        totalReplied++;
        continue;
      }

      // 3. POST risposta
      try {
        await apiPost(`/${cid}/replies`, { message: replyText });
        replied[cid] = { at: new Date().toISOString(), trigger: trigger || "generic", reply: replyText };
        await saveReplied(replied);
        console.log(`      ✅ risposta inviata`);
        totalReplied++;
      } catch (err) {
        if (!handleApiError(err, `POST /${cid}/replies`)) {
          console.error(`      ❌ Errore risposta: ${err.message}`);
        }
      }

      // Piccola pausa anti-rate-limit (non in dry-run)
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Riepilogo finale
  console.log("\n" + "─".repeat(50));
  console.log("📊 RIEPILOGO");
  console.log(`   Post analizzati : ${media.length}`);
  console.log(`   Commenti trovati: ${totalComments}`);
  console.log(`   Con trigger     : ${totalTrigger}`);
  console.log(`   Risposte inviate: ${totalReplied}${dryRun ? " (dry-run)" : ""}`);
  console.log("─".repeat(50) + "\n");

  return { found: totalComments, withTrigger: totalTrigger, replied: totalReplied };
}

// ---------------------------------------------------------------------------
// Entry point (invocazione diretta)
// ---------------------------------------------------------------------------
runBot().catch((err) => {
  console.error("❌ Errore fatale:", err.message);
  process.exit(1);
});
