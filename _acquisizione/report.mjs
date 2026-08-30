#!/usr/bin/env node
/**
 * B.Studio — Report Generator
 * Trasforma audit.json in un report HTML brandizzato (tedesco) da inviare al prospect.
 * È l'asset di valore che apre la conversazione: concreto, personalizzato, non generico.
 *
 * Uso:  node _acquisizione/report.mjs _acquisizione/out/esempio.ch
 */
import fs from 'node:fs';
import path from 'node:path';

const cfg = JSON.parse(fs.readFileSync(new URL('./config.json', import.meta.url), 'utf8'));

const SEV = {
  kritisch: { label: 'Kritisch', color: '#c97b6e' },
  mittel: { label: 'Mittel', color: '#C8A96E' },
  klein: { label: 'Klein', color: '#8d8a82' },
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function buildReport(a, dir) {
  const dateStr = new Date(a.scannedAt).toLocaleDateString('de-CH', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const kritisch = a.findings.filter((f) => f.sev === 'kritisch');
  const top3 = a.findings.slice(0, 3);
  const cats = Object.entries(a.scores);

  const shot = (f) => (f && fs.existsSync(path.join(dir, f)) ? f : null);
  const mob = shot(a.shots?.mobileFold);
  const desk = shot(a.shots?.desktopFold);

  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Website-Check — ${esc(a.host)} · B.Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
<style>
:root{--ink:#0A0908;--ink2:#100F0A;--gold:#C8A96E;--gold-hi:#E4CE9A;--cream:#F0ECD8;
--muted:rgba(240,236,216,.58);--line:rgba(240,236,216,.10);--red:#c97b6e;
--serif:'Playfair Display',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--ink);color:var(--cream);font-family:var(--sans);font-weight:300;line-height:1.6;
 background-image:radial-gradient(60% 40% at 50% 0%,rgba(200,169,110,.10),transparent 70%);background-repeat:no-repeat}
.wrap{max-width:840px;margin:0 auto;padding:56px 24px 96px}
.eyebrow{font-size:12px;letter-spacing:.42em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:14px;margin-bottom:26px}
.eyebrow::before{content:"";width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent)}
h1{font-family:var(--serif);font-weight:900;font-size:clamp(38px,7vw,62px);line-height:1.05;letter-spacing:-.01em}
h1 em{font-style:italic;font-weight:400;color:var(--gold)}
h2{font-family:var(--serif);font-weight:700;font-size:clamp(26px,4.4vw,36px);margin-bottom:8px}
.lead{color:var(--muted);font-size:18px;margin-top:20px;max-width:62ch}
.lead strong{color:var(--cream);font-weight:500}
section{margin-top:64px}
.rule{height:1px;background:var(--line);margin:0}
/* score */
.scorecard{margin-top:40px;display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:center;
 padding:32px;border:1px solid rgba(200,169,110,.28);border-radius:20px;background:rgba(28,26,22,.55)}
.dial{position:relative;width:132px;height:132px;flex-shrink:0}
.dial svg{transform:rotate(-90deg)}
.dial .num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.dial .num b{font-family:var(--serif);font-size:42px;font-weight:900;color:var(--cream);line-height:1}
.dial .num span{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-top:4px}
.bars{display:flex;flex-direction:column;gap:12px;min-width:0}
.bar{display:grid;grid-template-columns:110px 1fr 42px;gap:12px;align-items:center;font-size:14px}
.bar .t{color:var(--muted);letter-spacing:.04em}
.bar .track{height:6px;border-radius:3px;background:rgba(240,236,216,.09);overflow:hidden}
.bar .fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-hi))}
.bar .v{text-align:right;font-family:var(--serif);font-weight:700;color:var(--cream)}
/* metrics */
.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;background:var(--line);
 border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-top:26px}
.metric{background:var(--ink2);padding:22px 20px}
.metric .k{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.metric .v{font-family:var(--serif);font-size:30px;font-weight:900;color:var(--cream);margin-top:8px;line-height:1}
.metric .v.warn{color:var(--red)}
/* findings */
.finding{padding:30px 0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:44px 1fr;gap:20px}
.finding .n{font-family:var(--serif);font-size:30px;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(200,169,110,.6);line-height:1}
.tag{display:inline-block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:4px 10px;border-radius:3px;
 color:var(--ink);font-weight:700;margin-bottom:12px}
.finding h3{font-family:var(--serif);font-size:24px;font-weight:700;color:var(--cream);margin-bottom:10px}
.finding .why{color:var(--muted);font-size:16px}
.finding .fix{margin-top:14px;padding:14px 18px;border-left:2px solid var(--gold);background:rgba(200,169,110,.06);font-size:15px;color:var(--cream)}
.finding .fix b{color:var(--gold);font-weight:500;letter-spacing:.08em;text-transform:uppercase;font-size:11px;display:block;margin-bottom:5px}
/* shots */
.shots{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}
.shot{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--ink2)}
.shot img{width:100%;display:block;height:420px;object-fit:cover;object-position:top center}
.shot .cap{padding:12px 16px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
/* offer */
.offer{margin-top:44px;padding:38px 34px;border-radius:20px;
 background:linear-gradient(135deg,rgba(200,169,110,.15),rgba(200,169,110,.04));border:1px solid rgba(200,169,110,.32)}
.pkg{display:flex;justify-content:space-between;gap:18px;padding:16px 0;border-bottom:1px solid var(--line);align-items:baseline}
.pkg:last-of-type{border-bottom:0}
.pkg .n{font-family:var(--serif);font-size:20px;font-weight:700;color:var(--cream)}
.pkg .n small{display:block;font-family:var(--sans);font-size:14px;font-weight:300;color:var(--muted);margin-top:3px}
.pkg .p{font-family:var(--serif);font-size:22px;font-weight:900;color:var(--gold-hi);white-space:nowrap}
.cta{display:inline-block;margin-top:28px;background:var(--gold);color:var(--ink);font-weight:700;
 letter-spacing:.14em;text-transform:uppercase;font-size:13px;padding:16px 30px;border-radius:4px;text-decoration:none}
.foot{margin-top:70px;padding-top:26px;border-top:1px solid var(--line);color:var(--muted);font-size:13px;display:flex;
 justify-content:space-between;gap:16px;flex-wrap:wrap}
.foot a{color:var(--gold);text-decoration:none}
@media(max-width:620px){.scorecard{grid-template-columns:1fr;justify-items:center}.shots{grid-template-columns:1fr}
 .bar{grid-template-columns:88px 1fr 36px}.finding{grid-template-columns:1fr}.finding .n{display:none}}
@media print{body{background:#fff;color:#111}.cta{display:none}}
</style>
</head>
<body>
<div class="wrap">

  <div class="eyebrow">Website-Check · ${esc(dateStr)}</div>
  <h1>${esc(a.host)}<br><em>ehrlich angeschaut.</em></h1>
  <p class="lead">Kein automatisches Tool-PDF: Ich habe Ihre Seite auf einem echten iPhone-Format geladen,
  gemessen und durchgeklickt. Gefunden habe ich <strong>${a.findings.length} Punkte</strong>,
  davon <strong>${kritisch.length} kritische</strong>. Unten stehen die drei, die Sie am meisten Kunden kosten —
  mit dem konkreten Fix daneben.</p>

  <section>
    <div class="scorecard">
      <div class="dial">
        <svg width="132" height="132" viewBox="0 0 132 132">
          <circle cx="66" cy="66" r="58" fill="none" stroke="rgba(240,236,216,.10)" stroke-width="8"/>
          <circle cx="66" cy="66" r="58" fill="none" stroke="#C8A96E" stroke-width="8" stroke-linecap="round"
            stroke-dasharray="${(a.total / 100 * 364.4).toFixed(1)} 364.4"/>
        </svg>
        <div class="num"><b>${a.total}</b><span>von 100</span></div>
      </div>
      <div class="bars">
        ${cats.map(([k, v]) => `<div class="bar"><div class="t">${esc(k)}</div>
          <div class="track"><div class="fill" style="width:${(v / 20 * 100).toFixed(0)}%"></div></div>
          <div class="v">${v}/20</div></div>`).join('')}
      </div>
    </div>

    <div class="metrics">
      <div class="metric"><div class="k">Ladezeit mobil</div><div class="v ${a.metrics.loadMs > 3000 ? 'warn' : ''}">${(a.metrics.loadMs / 1000).toFixed(1)}s</div></div>
      <div class="metric"><div class="k">Seitengewicht</div><div class="v ${a.metrics.sizeMb > 3 ? 'warn' : ''}">${a.metrics.sizeMb > 0 ? a.metrics.sizeMb + ' MB' : 'n/v'}</div></div>
      <div class="metric"><div class="k">Anfragen</div><div class="v">${a.metrics.requests}</div></div>
      <div class="metric"><div class="k">Sicher (HTTPS)</div><div class="v ${a.metrics.https ? '' : 'warn'}">${a.metrics.https ? 'Ja' : 'Nein'}</div></div>
    </div>
  </section>

  ${mob || desk ? `<section>
    <h2>So sieht Ihre Seite <em>zuerst</em> aus</h2>
    <p class="lead">Der erste Bildschirm entscheidet in rund fünf Sekunden.</p>
    <div class="shots">
      ${mob ? `<div class="shot"><img src="${esc(mob)}" alt="Mobile Ansicht"><div class="cap">iPhone · erster Bildschirm</div></div>` : ''}
      ${desk ? `<div class="shot"><img src="${esc(desk)}" alt="Desktop Ansicht"><div class="cap">Desktop · erster Bildschirm</div></div>` : ''}
    </div>
  </section>` : ''}

  <section>
    <h2>Die ${top3.length} teuersten Punkte</h2>
    <p class="lead">Priorisiert nach dem, was Sie heute Anfragen kostet — nicht nach dem, was am einfachsten zu beheben ist.</p>
    <div style="margin-top:26px">
    ${top3.map((f, i) => `
      <div class="finding">
        <div class="n">${String(i + 1).padStart(2, '0')}</div>
        <div>
          <span class="tag" style="background:${SEV[f.sev].color}">${SEV[f.sev].label} · ${esc(f.cat)}</span>
          <h3>${esc(f.title)}</h3>
          <p class="why">${esc(f.why)}</p>
          <div class="fix"><b>Der Fix</b>${esc(f.fix)}</div>
        </div>
      </div>`).join('')}
    </div>
  </section>

  ${a.findings.length > 3 ? `<section>
    <h2>Weitere Punkte</h2>
    <div style="margin-top:20px">
    ${a.findings.slice(3).map((f) => `<div style="padding:14px 0;border-bottom:1px solid var(--line);display:flex;gap:14px;align-items:baseline">
      <span style="width:8px;height:8px;border-radius:50%;background:${SEV[f.sev].color};flex-shrink:0"></span>
      <div><strong style="color:var(--cream);font-weight:500">${esc(f.title)}</strong>
      <div style="color:var(--muted);font-size:14px;margin-top:3px">${esc(f.fix)}</div></div></div>`).join('')}
    </div>
  </section>` : ''}

  <section>
    <h2>Was ich anbiete</h2>
    <div class="offer">
      ${cfg.pakete.map((k) => `<div class="pkg"><div class="n">${esc(k.n)}<small>${esc(k.d)}</small></div><div class="p">${esc(k.p)}</div></div>`).join('')}
      <p style="color:var(--muted);font-size:15px;margin-top:22px">
        Kein Verkaufsgespräch nötig: Antworten Sie einfach auf diese Nachricht mit
        <strong style="color:var(--cream);font-weight:500">„Punkt 1“</strong> — dann sage ich Ihnen,
        was die Behebung genau kostet und wie lange es dauert. Wenn nicht, behalten Sie den Check trotzdem.</p>
      <a class="cta" href="mailto:${esc(cfg.email)}?subject=Website-Check%20${encodeURIComponent(a.host)}">Antworten</a>
    </div>
  </section>

  <div class="foot">
    <div>${esc(cfg.studio)} · Premium Brand &amp; Web Design · <a href="https://${esc(cfg.site)}">${esc(cfg.site)}</a></div>
    <div>Check erstellt am ${esc(dateStr)} · unaufgefordert, aber ehrlich gemeint.</div>
  </div>
</div>
</body>
</html>`;

  const out = path.join(dir, 'report.html');
  fs.writeFileSync(out, html);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2];
  if (!dir) { console.error('Uso: node _acquisizione/report.mjs _acquisizione/out/<dominio>'); process.exit(1); }
  const a = JSON.parse(fs.readFileSync(path.join(dir, 'audit.json'), 'utf8'));
  console.log('✓ ' + buildReport(a, dir));
}
