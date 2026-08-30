#!/usr/bin/env node
/**
 * B.Studio — Batch: audit + report + outreach per una lista di prospect.
 *
 * Uso:
 *   node _acquisizione/run.mjs                         # usa prospects.csv
 *   node _acquisizione/run.mjs --file lista.csv
 *   node _acquisizione/run.mjs --url esempio.ch        # singolo
 *   node _acquisizione/run.mjs --base https://embatah-svg.github.io/bstudio-content/_acquisizione/out
 *
 * Output in _acquisizione/out/<dominio>/ :
 *   audit.json · report.html · outreach.md · email.txt · screenshot PNG
 * Più: out/index.html (cruscotto) e pipeline.csv (CRM minimo).
 */
import fs from 'node:fs';
import path from 'node:path';
import { audit } from './audit.mjs';
import { buildReport } from './report.mjs';
import { buildOutreach } from './outreach.mjs';

const ROOT = path.join('_acquisizione');
const OUT = path.join(ROOT, 'out');
const args = process.argv.slice(2);
const arg = (k, d = '') => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const csvCell = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;

function readProspects() {
  const single = arg('--url');
  if (single) return [{ url: single, name: '', contact: '', note: '' }];
  const file = arg('--file', path.join(ROOT, 'prospects.csv'));
  if (!fs.existsSync(file)) {
    console.error(`Manca ${file}. Copia prospects.example.csv → prospects.csv e mettici i siti.`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8')
    .split('\n').map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && !/^url\s*[,;]/i.test(l))
    .map((l) => {
      const c = l.split(/[,;]/).map((s) => s.trim().replace(/^"|"$/g, ''));
      return { url: c[0], name: c[1] || '', contact: c[2] || '', note: c[3] || '' };
    })
    .filter((p) => p.url);
}

const prospects = readProspects();
const base = arg('--base', '').replace(/\/$/, '');
fs.mkdirSync(OUT, { recursive: true });

console.log(`\n▸ ${prospects.length} prospect da analizzare\n`);
const results = [];

for (const [i, p] of prospects.entries()) {
  const host = p.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  const dir = path.join(OUT, host);
  process.stdout.write(`[${i + 1}/${prospects.length}] ${host} … `);
  try {
    const a = await audit(p.url, dir);
    if (!a.ok) { console.log(`✗ non raggiungibile (${a.error.slice(0, 60)})`); continue; }
    buildReport(a, dir);
    const reportUrl = base ? `${base}/${host}/report.html` : '';
    const o = buildOutreach(a, dir, reportUrl);
    results.push({ ...p, host, a, reportUrl, hook: o.hook });
    console.log(`${a.total}/100 (${a.grade}) · ${a.findings.length} problemi`);
  } catch (e) {
    console.log(`✗ errore: ${e.message.slice(0, 70)}`);
  }
}

if (!results.length) { console.log('\nNessun risultato.\n'); process.exit(0); }

// Priorità: punteggio basso = più da guadagnare = contattare per primo
results.sort((x, y) => x.a.total - y.a.total);

// --- pipeline.csv (CRM minimo, si apre in Excel/Numbers) ---
const pipePath = path.join(ROOT, 'pipeline.csv');
const existing = fs.existsSync(pipePath)
  ? Object.fromEntries(fs.readFileSync(pipePath, 'utf8').split('\n').slice(1)
      .filter(Boolean).map((l) => [l.split(',')[0]?.replace(/"/g, ''), l]))
  : {};
const header = 'host,nome,contatto,score,problemi,gancio,report,stato,ultimo_contatto,prossima_azione,valore_chf';
const rows = results.map((r) =>
  existing[r.host] ||
  [r.host, r.name, r.contact, r.a.total, r.a.findings.length, r.hook, r.reportUrl,
   'da_contattare', '', 'email 1', ''].map(csvCell).join(','));
fs.writeFileSync(pipePath, [header, ...rows].join('\n') + '\n');

// --- cruscotto ---
const gradeColor = (t) => (t < 40 ? '#c97b6e' : t < 70 ? '#C8A96E' : '#8d8a82');
const index = `<!doctype html><html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Pipeline — B.Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#0A0908;--gold:#C8A96E;--cream:#F0ECD8;--muted:rgba(240,236,216,.55);--line:rgba(240,236,216,.10)}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--ink);color:var(--cream);font-family:'DM Sans',system-ui;font-weight:300;padding:48px 20px}
.wrap{max-width:1000px;margin:0 auto}
h1{font-family:'Playfair Display',serif;font-weight:900;font-size:44px;margin-bottom:6px}
.sub{color:var(--muted);margin-bottom:36px}
table{width:100%;border-collapse:collapse;font-size:15px}
th{text-align:left;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);
 font-weight:500;padding:0 12px 12px 0;border-bottom:1px solid var(--line)}
td{padding:16px 12px 16px 0;border-bottom:1px solid var(--line);vertical-align:top}
.host{font-weight:500}
.score{font-family:'Playfair Display',serif;font-weight:900;font-size:22px}
.hook{color:var(--muted);font-size:13px;max-width:380px}
a{color:var(--gold)}
</style></head><body><div class="wrap">
<h1>Pipeline</h1>
<div class="sub">${results.length} siti analizzati · ${new Date().toLocaleString('it-CH')} · ordinati per urgenza (peggiore = più margine)</div>
<table><thead><tr><th>Sito</th><th>Score</th><th>Problemi</th><th>Gancio da usare</th><th>File</th></tr></thead><tbody>
${results.map((r) => `<tr>
<td class="host">${esc(r.host)}${r.name ? `<div class="hook">${esc(r.name)}</div>` : ''}</td>
<td class="score" style="color:${gradeColor(r.a.total)}">${r.a.total}</td>
<td>${r.a.findings.length}<div class="hook">${r.a.findings.filter((f) => f.sev === 'kritisch').length} critici</div></td>
<td class="hook">${esc(r.hook)}</td>
<td><a href="${esc(r.host)}/report.html">report</a> · <a href="${esc(r.host)}/outreach.md">testi</a></td>
</tr>`).join('')}
</tbody></table></div></body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), index);

const worst = results[0];
console.log(`\n▸ Fatto: ${results.length} report in ${OUT}`);
console.log(`▸ Cruscotto: ${path.join(OUT, 'index.html')}`);
console.log(`▸ Pipeline:  ${pipePath}`);
console.log(`\n▸ Inizia da qui → ${worst.host} (${worst.a.total}/100): "${worst.hook}"\n`);
