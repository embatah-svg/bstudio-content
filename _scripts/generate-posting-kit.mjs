// generate-posting-kit.mjs — crea POSTING-KIT.md (pubblicazione MANUALE) dai dati della coda.
// Per ogni post: link scaricabili delle slide + caption + primo commento + passi. Nessun account richiesto.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SELF = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SELF, "..");
const BASE = "https://raw.githubusercontent.com/embatah-svg/bstudio-content/main";

const queue = JSON.parse(await readFile(path.join(SELF, "publish-queue.json"), "utf8"));

let md = `# 📲 B.Studio — Kit di Pubblicazione MANUALE (settimana hero, Tag 01–07)

Nessun setup, nessun token. Per ogni giorno: scarica le slide dai link (tap sul telefono → salva), aprile in Instagram in ordine, crea il carosello, incolla la caption, pubblica e **fissa il primo commento** col trigger.

> Tutte le immagini sono 1080×1920. In feed Instagram ritaglia a 4:5: i contenuti sono centrati, il taglio tiene. Per Storie/Reel vanno perfette così.

---
`;

for (const p of queue) {
  const date = p.assets[0].split("/")[1]; // 2026-06-08_tag01
  md += `\n## ${p.tag.toUpperCase()} · ${date.split("_")[0]} — ${p.type === "single" ? "Post singolo" : `Carosello (${p.assets.length} slide)`}\n\n`;
  md += `**Trigger commento:** \`${(p.firstComment.match(/Kommentier\s+([A-ZÄÖÜ]+)/) || [])[1] || "—"}\`\n\n`;
  md += `### 1) Scarica le immagini (in ordine)\n`;
  p.assets.forEach((a, i) => { md += `${i + 1}. ${BASE}/${a}\n`; });
  md += `\n### 2) Caption (copia tutto)\n\`\`\`\n${p.caption}\n\`\`\`\n`;
  md += `\n### 3) Primo commento da FISSARE (copia)\n\`\`\`\n${p.firstComment}\n\`\`\`\n\n---\n`;
}

md += `\n## ▶ Come postare (60 secondi)
1. Apri i link sopra sul telefono e **salva** le immagini nell'ordine 01 → fine.
2. Instagram → **+** → **Post** → seleziona le immagini **nell'ordine giusto** (multi-selezione).
3. Salta i filtri → incolla la **Caption** → **Condividi**.
4. Appena pubblicato, scrivi il **primo commento** (quello qui sopra) e **fissalo** (tieni premuto → Fissa).
5. Rispondi a OGNI commento col trigger entro 1h e manda TU il DM (vedi FUNNEL-COMMENTO-DM.md).

> Giorni 08–30: stessa procedura. Le immagini sono in \`instagram/<data>/_export/\` (stesso schema di URL) e la caption è dentro il \`BRIEF.md\` di ogni giorno.
`;

await writeFile(path.join(ROOT, "POSTING-KIT.md"), md, "utf8");
console.log("✅ POSTING-KIT.md generato con " + queue.length + " giorni hero.");
