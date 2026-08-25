#!/usr/bin/env node
// Analisi di un sito web → report PDF con screenshot annotati.
//
//   node audit.mjs https://esempio.ch
//   node audit.mjs https://esempio.ch --cliente "Nome Salone" --out ./report
//
// Produce nella cartella di uscita: report.pdf, report.html, dati.json e screenshots/.

import fs from 'node:fs/promises';
import path from 'node:path';
import { collect } from './lib/collect.mjs';
import * as checksIt from './lib/checks.mjs';
import * as checksDe from './lib/checks.de.mjs';
import { buildHtml, renderPdf, loadImages } from './lib/report.mjs';

const LINGUE = { it: checksIt, de: checksDe };

function parseArgs(argv) {
  const args = { url: null, out: null, cliente: null, lang: 'it', ignoreHttpsErrors: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = argv[++i];
    else if (a === '--cliente') args.cliente = argv[++i];
    else if (a === '--lang') args.lang = argv[++i];
    else if (a === '--ignore-https-errors') args.ignoreHttpsErrors = true;
    else if (!a.startsWith('-')) args.url = a;
  }
  return args;
}

function normalizza(url) {
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return new URL(url).href;
}

const args = parseArgs(process.argv.slice(2));

if (!args.url) {
  console.error(`
Analisi sito → PDF

  node audit.mjs <url> [opzioni]

Opzioni
  --out <cartella>          dove scrivere il report (default: ./report-<dominio>)
  --cliente "<nome>"        nome della cliente, stampato in copertina
  --lang it|de              lingua del report (default: it)
  --ignore-https-errors     ignora errori di certificato (solo per test interni)
`);
  process.exit(1);
}

const checksMod = LINGUE[args.lang];
if (!checksMod) {
  console.error(`\n  Lingua non supportata: "${args.lang}". Usa --lang it oppure --lang de.\n`);
  process.exit(1);
}

const url = normalizza(args.url);
const host = new URL(url).hostname.replace(/^www\./, '');
const outDir = path.resolve(args.out || `report-${host}`);

await fs.mkdir(outDir, { recursive: true });

console.log(`\n  Analisi di ${url}`);
console.log(`  Uscita: ${outDir}\n`);

console.log('  [1/4] Caricamento del sito da computer e da telefono…');
const dati = await collect(url, { outDir, ignoreHttpsErrors: args.ignoreHttpsErrors, lang: args.lang });

if (dati.fatal) {
  console.error(`\n  Analisi interrotta: ${dati.fatal}\n`);
  process.exit(2);
}

console.log('  [2/4] Valutazione dei parametri…');
const esito = checksMod.valuta(dati);

console.log('  [3/4] Composizione del report…');
const { shots, crops } = await loadImages(dati);
const html = buildHtml({
  d: dati,
  esito,
  shots,
  crops,
  cliente: args.cliente,
  lang: args.lang,
  AREE: checksMod.AREE,
});

const htmlFile = path.join(outDir, 'report.html');
const jsonFile = path.join(outDir, 'dati.json');
const pdfFile = path.join(outDir, `analisi-${host}.pdf`);

await fs.writeFile(htmlFile, html.preview);
await fs.writeFile(jsonFile, JSON.stringify({ dati, esito }, null, 2));

console.log('  [4/4] Stampa del PDF…');
await renderPdf(html, pdfFile);

const { size } = await fs.stat(pdfFile);

console.log(`
  ─────────────────────────────────────────────
  Punteggio      ${esito.punteggio}/100  (${esito.giudizio})
  Rilievi        ${esito.rilievi.length}  ·  critici ${esito.conteggio.critico} · gravi ${esito.conteggio.alto} · medi ${esito.conteggio.medio} · minori ${esito.conteggio.basso}
  ─────────────────────────────────────────────

  PDF   ${pdfFile}  (${Math.round(size / 1024)} KB)
  HTML  ${htmlFile}
  Dati  ${jsonFile}
`);
