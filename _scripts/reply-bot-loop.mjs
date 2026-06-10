// reply-bot-loop.mjs — esegue reply-bot.mjs in loop continuo.
// Uso:
//   node _scripts/reply-bot-loop.mjs              // poll ogni 10 minuti (default)
//   node _scripts/reply-bot-loop.mjs --interval 5 // poll ogni 5 minuti
//   node _scripts/reply-bot-loop.mjs --dry-run    // loop in dry-run (test)
//   Ctrl+C per fermare.
//
// Nessuna dipendenza esterna. Importa runBot da reply-bot.mjs.

import { runBot } from "./reply-bot.mjs";

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

const DRY      = has("--dry-run");
const ALL      = has("--all");
const INTERVAL = parseInt(val("--interval") || "10", 10); // minuti
const LIMIT    = parseInt(val("--limit") || "10", 10);

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function loop() {
  console.log("═".repeat(55));
  console.log("🔁  reply-bot-loop  B.Studio — processo continuo");
  console.log(`   Intervallo : ogni ${INTERVAL} minuto/i`);
  console.log(`   Modalità   : ${ALL ? "TUTTI i commenti" : "solo TRIGGER"}${DRY ? " [DRY-RUN]" : ""}`);
  console.log(`   Post/ciclo : ultimi ${LIMIT}`);
  console.log("   Premi Ctrl+C per fermare.");
  console.log("═".repeat(55) + "\n");

  let cycle = 1;
  while (true) {
    console.log(`\n━━━  Ciclo #${cycle}  ━━━  ${new Date().toLocaleString("it-IT")}`);
    try {
      await runBot({ dryRun: DRY, all: ALL, limit: LIMIT });
    } catch (err) {
      console.error(`❌ Errore nel ciclo #${cycle}:`, err.message);
      // Non uscire — riprova al prossimo ciclo
    }
    console.log(`⏳ Prossimo ciclo tra ${INTERVAL} minuto/i…`);
    await sleep(INTERVAL * 60 * 1000);
    cycle++;
  }
}

loop();
