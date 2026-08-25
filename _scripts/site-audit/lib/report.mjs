// Genera il report HTML e lo stampa in PDF con Chromium.

import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';

const BRAND = { nero: '#0A0908', oro: '#C8A96E', crema: '#F0ECD8', rosso: '#B3261E' };

const COLORI_SEV = {
  critico: { colore: '#B3261E', chiaro: '#FBEAE8' },
  alto: { colore: '#C2620E', chiaro: '#FDF0E4' },
  medio: { colore: '#8A6D1F', chiaro: '#FAF3E0' },
  basso: { colore: '#4A6B57', chiaro: '#EDF3EF' },
};

// Tutte le stringhe fisse del layout (non quelle dei singoli rilievi, che
// arrivano già nella lingua giusta da checks.mjs / checks.de.mjs).
const TESTI = {
  it: {
    htmlLang: 'it',
    dateLocale: 'it-CH',
    docTitle: (host) => `Analisi sito ${host}`,
    sev: {
      critico: { label: 'Critico', plurale: 'Critici' },
      alto: { label: 'Grave', plurale: 'Gravi' },
      medio: { label: 'Medio', plurale: 'Medi' },
      basso: { label: 'Minore', plurale: 'Minori' },
    },
    coverH1: 'Analisi tecnica<br>del sito web',
    coverSub: (n) =>
      `Verifica indipendente su ${n} parametri di funzionamento, visibilità su Google, esperienza da telefono e obblighi di legge svizzeri. Ogni rilievo è documentato con il riscontro raccolto direttamente dal sito.`,
    coverRilevazione: 'Rilevazione del',
    coverPer: 'Per',
    coverRiepilogo: (n, p) => `${n} rilievi · punteggio ${p}/100`,
    secSintesi: 'Sintesi',
    statoAttuale: (g) => `Stato attuale: ${g}`,
    leadSintesi:
      'Il sito è stato aperto con un browser reale, da computer e da telefono, e misurato sugli stessi parametri che usano Google e gli strumenti di verifica standard del settore.',
    verdictTitle: (g, n) => `${g} — ${n} problemi rilevati`,
    verdictBody:
      "Il punteggio parte da 100 e scende in base alla gravità di ogni problema riscontrato.",
    verdictCritici: (n) =>
      `I ${n} punti classificati come critici sono quelli che oggi stanno già facendo perdere clienti o che espongono a un rischio legale.`,
    verdictNessunCritico: 'Nessun problema critico: le priorità riguardano miglioramenti.',
    gaugeLabel: 'su 100',
    fatti: (esito, netTot, tempo, immagini, parole) => [
      ['Verifiche eseguite', esito.verificheEseguite],
      ['Problemi rilevati', esito.rilievi.length],
      ['Peso della pagina', `${netTot} MB`],
      ['Tempo di apertura', `${tempo} s`],
      ['Immagini', immagini],
      ['Parole in home', parole],
    ],
    calloutTitle: (n) => `I ${n} punti da sistemare per primi`,
    noteTitle: 'Come leggere questo documento.',
    noteBody:
      "Non si tratta di giudizi di gusto: il colore di un pulsante o la scelta di una foto non compaiono in queste pagine. Ogni voce è una misurazione oggettiva — un file che manca, un tempo cronometrato, un contrasto calcolato, un obbligo di legge non soddisfatto — e ognuna è verificabile in modo indipendente da chiunque, con gli stessi strumenti gratuiti usati qui (Chrome DevTools, Google Search Console, PageSpeed Insights).",
    secRiscontro: 'Riscontro visivo',
    comeOggiTitle: "Com'è il sito oggi",
    comeOggiLead:
      'Schermate catturate durante la rilevazione. A sinistra la prima schermata da computer (1440×900), a destra la stessa pagina da telefono (iPhone, 390×844): è così che la vede la maggior parte dei visitatori.',
    capDesktopHero: 'Da computer — prima schermata',
    capMobileHero: 'Da telefono — prima schermata',
    secPanoramica: 'Riscontro visivo — panoramica',
    mobileTitle: 'Cosa non funziona da telefono',
    mobileLead:
      'I riquadri rossi segnano i punti rilevati automaticamente: elementi che escono dallo schermo, tasti troppo piccoli per un dito, testi sotto la soglia di leggibilità.',
    mobileCap: 'Pagina completa da telefono, con i rilievi evidenziati.',
    desktopTitle: 'Cosa non funziona da computer',
    desktopLead:
      'Immagini prive di descrizione (invisibili a Google Immagini e ai lettori di schermo) e testi con contrasto sotto il minimo delle linee guida internazionali.',
    desktopCap: 'Pagina completa da computer, con i rilievi evidenziati.',
    secDettaglio: 'Dettaglio',
    dettaglioTitle: (n) => `I ${n} rilievi, in ordine di gravità`,
    dettaglioLead:
      "Per ognuno: cosa succede oggi, perché ha un effetto concreto sui clienti, il riscontro raccolto e l'intervento necessario.",
    rigaCosa: 'Cosa succede',
    rigaPerche: 'Perché conta',
    rigaRiscontro: 'Riscontro',
    rigaSoluzione: 'Come si risolve',
    ritaglioCap: 'Ritaglio dal sito, ingrandito. I riquadri rossi segnano i punti rilevati.',
    gruppoRilievo: (n) => (n === 1 ? 'rilievo' : 'rilievi'),
    secConclusione: 'Conclusione',
    pianoTitle: 'In che ordine intervenire',
    pianoLead:
      'Le voci sono ordinate per rapporto fra effetto sui clienti e lavoro necessario: in cima quelle che rendono di più a parità di tempo.',
    thPriorita: 'Priorità',
    thIntervento: 'Intervento',
    thAmbito: 'Ambito',
    thGravita: 'Gravità',
    endTitle: 'In sintesi',
    endBody1: (tot, n) => `Su ${tot} parametri verificati, ${n} presentano un problema.`,
    endCritici: (n) =>
      `${n} ${n === 1 ? 'è classificato' : 'sono classificati'} come critici: ${n === 1 ? 'va affrontato' : 'vanno affrontati'} per primi, perché ${n === 1 ? 'incide' : 'incidono'} sui clienti già oggi o su un obbligo di legge.`,
    endBody2:
      'Nessuno di questi rilievi richiede di rifare il sito da zero: sono correzioni puntuali, con un ordine di esecuzione preciso. La differenza fra un sito che riceve visite e uno che porta appuntamenti sta quasi sempre in questa lista.',
    footerLine: (data, host) => `Rilevazione automatica del ${data} · ${host} · B.Studio`,
    pdfFooterBrand: 'B.Studio — Analisi tecnica del sito',
  },
  de: {
    htmlLang: 'de',
    dateLocale: 'de-CH',
    docTitle: (host) => `Website-Analyse ${host}`,
    sev: {
      critico: { label: 'Kritisch', plurale: 'Kritisch' },
      alto: { label: 'Schwerwiegend', plurale: 'Schwerwiegend' },
      medio: { label: 'Mittel', plurale: 'Mittel' },
      basso: { label: 'Gering', plurale: 'Gering' },
    },
    coverH1: 'Technische Analyse<br>der Website',
    coverSub: (n) =>
      `Unabhängige Prüfung anhand von ${n} Kriterien zu Funktionsweise, Sichtbarkeit bei Google, Handy-Erlebnis und gesetzlichen Pflichten in der Schweiz. Jeder Befund ist mit dem direkt von der Website erhobenen Nachweis dokumentiert.`,
    coverRilevazione: 'Erhebung vom',
    coverPer: 'Für',
    coverRiepilogo: (n, p) => `${n} Befunde · Bewertung ${p}/100`,
    secSintesi: 'Zusammenfassung',
    statoAttuale: (g) => `Aktueller Zustand: ${g}`,
    leadSintesi:
      'Die Website wurde mit einem echten Browser geöffnet — vom Computer und vom Handy aus — und anhand derselben Kriterien gemessen, die Google und die Standard-Prüfwerkzeuge der Branche verwenden.',
    verdictTitle: (g, n) => `${g} — ${n} festgestellte Probleme`,
    verdictBody:
      'Die Bewertung startet bei 100 und sinkt je nach Schweregrad jedes gefundenen Problems.',
    verdictCritici: (n) =>
      `Die ${n} als kritisch eingestuften Punkte sind jene, die schon heute Kundinnen kosten oder ein rechtliches Risiko darstellen.`,
    verdictNessunCritico: 'Keine kritischen Probleme: die Prioritäten betreffen Verbesserungen.',
    gaugeLabel: 'von 100',
    fatti: (esito, netTot, tempo, immagini, parole) => [
      ['Durchgeführte Prüfungen', esito.verificheEseguite],
      ['Festgestellte Probleme', esito.rilievi.length],
      ['Seitengewicht', `${netTot} MB`],
      ['Ladezeit', `${tempo} s`],
      ['Bilder', immagini],
      ['Wörter auf der Startseite', parole],
    ],
    calloutTitle: (n) => `Die ${n} Punkte, die zuerst behoben werden sollten`,
    noteTitle: 'So ist dieses Dokument zu lesen.',
    noteBody:
      'Es geht nicht um Geschmacksfragen: Die Farbe eines Buttons oder die Wahl eines Fotos kommen in diesen Seiten nicht vor. Jeder Punkt ist eine objektive Messung — eine fehlende Datei, eine gestoppte Zeit, ein berechneter Kontrast, eine nicht erfüllte gesetzliche Pflicht — und jede davon ist von jeder Person unabhängig nachprüfbar, mit denselben kostenlosen Werkzeugen, die hier verwendet wurden (Chrome DevTools, Google Search Console, PageSpeed Insights).',
    secRiscontro: 'Visueller Nachweis',
    comeOggiTitle: 'So sieht die Website heute aus',
    comeOggiLead:
      'Screenshots, aufgenommen während der Erhebung. Links der erste Bildschirm am Computer (1440×900), rechts dieselbe Seite auf dem Handy (iPhone, 390×844) — so sieht sie die Mehrheit der Besucherinnen.',
    capDesktopHero: 'Am Computer — erster Bildschirm',
    capMobileHero: 'Auf dem Handy — erster Bildschirm',
    secPanoramica: 'Visueller Nachweis — Übersicht',
    mobileTitle: 'Was auf dem Handy nicht funktioniert',
    mobileLead:
      'Die roten Rahmen markieren die automatisch erkannten Punkte: Elemente, die über den Bildschirmrand hinausragen, Buttons, die für einen Finger zu klein sind, Text unter der Lesbarkeitsschwelle.',
    mobileCap: 'Vollständige Seite auf dem Handy, mit hervorgehobenen Befunden.',
    desktopTitle: 'Was am Computer nicht funktioniert',
    desktopLead:
      'Bilder ohne Beschreibung (unsichtbar für die Google-Bildersuche und Screenreader) und Texte mit einem Kontrast unter dem Mindestwert der internationalen Richtlinien.',
    desktopCap: 'Vollständige Seite am Computer, mit hervorgehobenen Befunden.',
    secDettaglio: 'Details',
    dettaglioTitle: (n) => `Die ${n} Befunde, nach Schweregrad geordnet`,
    dettaglioLead:
      'Zu jedem Punkt: was heute passiert, welche konkrete Wirkung es auf Kundinnen hat, der erhobene Nachweis und die nötige Massnahme.',
    rigaCosa: 'Was passiert',
    rigaPerche: 'Warum das zählt',
    rigaRiscontro: 'Nachweis',
    rigaSoluzione: 'Lösung',
    ritaglioCap: 'Ausschnitt von der Website, vergrössert. Die roten Rahmen markieren die festgestellten Punkte.',
    gruppoRilievo: (n) => (n === 1 ? 'Befund' : 'Befunde'),
    secConclusione: 'Fazit',
    pianoTitle: 'In welcher Reihenfolge vorgehen',
    pianoLead:
      'Die Punkte sind nach dem Verhältnis von Wirkung auf Kundinnen zu nötigem Aufwand geordnet: oben stehen jene mit dem grössten Ertrag bei gleichem Zeitaufwand.',
    thPriorita: 'Priorität',
    thIntervento: 'Massnahme',
    thAmbito: 'Bereich',
    thGravita: 'Schweregrad',
    endTitle: 'Auf einen Blick',
    endBody1: (tot, n) => `Von ${tot} geprüften Kriterien weisen ${n} ein Problem auf.`,
    endCritici: (n) =>
      `${n} ${n === 1 ? 'ist' : 'sind'} als kritisch eingestuft: ${n === 1 ? 'sollte' : 'sollten'} zuerst angegangen werden, weil ${n === 1 ? 'es' : 'sie'} schon heute Kundinnen betrifft oder eine gesetzliche Pflicht berührt.`,
    endBody2:
      'Keiner dieser Befunde erfordert einen kompletten Neubau der Website: Es handelt sich um gezielte Korrekturen mit einer klaren Reihenfolge. Der Unterschied zwischen einer Website, die Besuche bekommt, und einer, die Termine bringt, liegt fast immer in dieser Liste.',
    footerLine: (data, host) => `Automatische Erhebung vom ${data} · ${host} · B.Studio`,
    pdfFooterBrand: 'B.Studio — Technische Website-Analyse',
  },
};

/**
 * Prima frase di un paragrafo, senza spezzare su abbreviazioni tipo "art. 3"
 * né su date in formato tedesco come "1. September" (il punto dopo una cifra
 * non è mai fine frase, anche se seguito da una parola maiuscola).
 */
const primaFrase = (t) => String(t).split(/(?<!\d)\.\s+(?=[A-ZÀÈÉÌÒÙÄÖÜ])/)[0].replace(/\.$/, '');

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

async function dataUri(file) {
  if (!file || !existsSync(file)) return null;
  const buf = await fs.readFile(file);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!root || !existsSync(root)) return undefined;
  const dir = readdirSync(root).filter((d) => d.startsWith('chromium-')).sort().pop();
  if (!dir) return undefined;
  const bin = path.join(root, dir, 'chrome-linux', 'chrome');
  return existsSync(bin) ? bin : undefined;
}

const formattaData = (iso, locale) =>
  new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

/** Anello del punteggio. */
function gauge(punteggio, t) {
  const r = 62;
  const c = 2 * Math.PI * r;
  const off = c * (1 - punteggio / 100);
  const colore = punteggio >= 80 ? '#4A6B57' : punteggio >= 60 ? '#8A6D1F' : punteggio >= 40 ? '#C2620E' : '#B3261E';
  return `
  <svg viewBox="0 0 160 160" class="gauge" role="img" aria-label="${punteggio}/100">
    <circle cx="80" cy="80" r="${r}" fill="none" stroke="#E7E2D6" stroke-width="14"/>
    <circle cx="80" cy="80" r="${r}" fill="none" stroke="${colore}" stroke-width="14"
            stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"
            transform="rotate(-90 80 80)"/>
    <text x="80" y="76" text-anchor="middle" class="g-num" fill="${colore}">${punteggio}</text>
    <text x="80" y="98" text-anchor="middle" class="g-lab">${esc(t.gaugeLabel)}</text>
  </svg>`;
}

function bloccoRilievo(r, n, crops, t, AREE) {
  const s = { ...COLORI_SEV[r.severita], ...t.sev[r.severita] };
  const img = crops[r.id] || null;
  return `
  <article class="finding" style="--sev:${s.colore};--sev-bg:${s.chiaro}">
    <header>
      <span class="num">${n}</span>
      <div>
        <span class="badge">${esc(s.label)}</span>
        <span class="area">${esc(AREE[r.area] || r.area)}</span>
        <h3>${esc(r.titolo)}</h3>
      </div>
    </header>
    <div class="body">
      <div class="row"><span class="k">${esc(t.rigaCosa)}</span><p>${esc(r.problema)}</p></div>
      <div class="row impact"><span class="k">${esc(t.rigaPerche)}</span><p>${esc(r.impatto)}</p></div>
      ${
        r.evidenza?.length
          ? `<div class="row"><span class="k">${esc(t.rigaRiscontro)}</span><ul class="ev">${r.evidenza
              .map((e) => `<li>${esc(e)}</li>`)
              .join('')}</ul></div>`
          : ''
      }
      <div class="row fix"><span class="k">${esc(t.rigaSoluzione)}</span><p>${esc(r.soluzione)}</p></div>
      ${img ? `<figure class="inline-shot"><img src="${img}" alt=""><figcaption>${esc(t.ritaglioCap)}</figcaption></figure>` : ''}
    </div>
  </article>`;
}

export function buildHtml({ d, esito, shots, crops, cliente, lang = 'it', AREE }) {
  const t = TESTI[lang] || TESTI.it;
  const host = (() => {
    try {
      return new URL(d.http?.finalUrl || d.target).hostname;
    } catch {
      return d.target;
    }
  })();

  const critici = esito.rilievi.filter((r) => r.severita === 'critico');
  const gruppi = ['critico', 'alto', 'medio', 'basso']
    .map((sev) => ({ sev, items: esito.rilievi.filter((r) => r.severita === sev) }))
    .filter((g) => g.items.length);

  let n = 0;

  const netTot = (d.network || []).reduce((a, r) => a + (r.size || 0), 0);
  const fatti = t.fatti(
    esito,
    (netTot / 1048576).toFixed(1),
    ((d.timing?.load ?? d.loadMs) / 1000).toFixed(1),
    d.dom?.images?.length ?? 0,
    d.dom?.counts?.words ?? 0
  );

  const stile = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #1A1917; font-size: 10.5pt; line-height: 1.55;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  h1, h2, h3 { margin: 0; line-height: 1.2; font-weight: 700; }
  p { margin: 0; }
  .page-break { break-before: page; }
  .avoid-break { break-inside: avoid; }

  /* ---------- copertina (documento a sé, stampato senza margini) ---------- */
  .cover {
    background: ${BRAND.nero}; color: ${BRAND.crema};
    width: 210mm; height: 297mm; padding: 34mm 24mm;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .cover .brand { font: 700 12pt/1 sans-serif; letter-spacing: .32em; color: ${BRAND.oro}; text-transform: uppercase; }
  .cover h1 { font-size: 34pt; letter-spacing: -.02em; margin: 8mm 0 5mm; }
  .cover .dom { font-size: 15pt; color: ${BRAND.oro}; word-break: break-all; }
  .cover .sub { font-size: 11pt; opacity: .78; max-width: 118mm; margin-top: 7mm; }
  .cover .rule { height: 2px; background: ${BRAND.oro}; width: 56mm; margin: 9mm 0; }
  .cover .meta { font-size: 9.5pt; opacity: .62; display: flex; gap: 12mm; flex-wrap: wrap; }

  /* ---------- sezioni ---------- */
  .sec-title {
    font-size: 8.5pt; letter-spacing: .22em; text-transform: uppercase;
    color: #8A857A; border-bottom: 1.5px solid ${BRAND.oro};
    padding-bottom: 2.5mm; margin-bottom: 6mm;
  }
  h2.big { font-size: 19pt; margin-bottom: 4mm; letter-spacing: -.01em; }
  .lead { font-size: 11pt; color: #46433D; margin-bottom: 6mm; }

  /* ---------- sintesi ---------- */
  .summary { display: flex; gap: 10mm; align-items: center; margin-bottom: 8mm; }
  .gauge { width: 42mm; height: 42mm; flex: none; }
  .g-num { font: 700 40px sans-serif; }
  .g-lab { font: 500 12px sans-serif; fill: #8A857A; letter-spacing: .1em; }
  .verdict h3 { font-size: 16pt; margin-bottom: 2mm; }
  .verdict p { color: #46433D; }

  .sev-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin-bottom: 7mm; }
  .sev-card { border: 1px solid #E2DDD1; border-top: 3px solid var(--c); padding: 4mm 3mm; text-align: center; }
  .sev-card b { display: block; font-size: 22pt; color: var(--c); line-height: 1.1; }
  .sev-card span { font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: #8A857A; }

  .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid #E2DDD1; }
  .facts div { padding: 3.5mm 4mm; border-right: 1px solid #E2DDD1; border-bottom: 1px solid #E2DDD1; }
  .facts div:nth-child(3n) { border-right: 0; }
  .facts div:nth-last-child(-n+3) { border-bottom: 0; }
  .facts b { display: block; font-size: 13pt; }
  .facts span { font-size: 8pt; letter-spacing: .1em; text-transform: uppercase; color: #8A857A; }

  .callout {
    background: #FBEAE8; border-left: 3.5px solid ${BRAND.rosso};
    padding: 5mm 6mm; margin: 7mm 0;
  }
  .callout h3 { font-size: 11.5pt; color: ${BRAND.rosso}; margin-bottom: 3mm; }
  .callout ol { margin: 0; padding-left: 5mm; }
  .callout li { margin-bottom: 1.8mm; }

  .note { background: #F7F5EF; border-left: 3px solid ${BRAND.oro}; padding: 5mm 6mm; margin: 6mm 0; font-size: 10pt; }

  /* ---------- screenshot ---------- */
  figure { margin: 0 0 7mm; break-inside: avoid; }
  figure img { display: block; width: 100%; border: 1px solid #D9D3C4; }
  figcaption { font-size: 8.5pt; color: #8A857A; margin-top: 2mm; }
  .shots-2 { display: grid; grid-template-columns: 1.62fr 1fr; gap: 6mm; align-items: start; }
  /* l'altezza è calibrata perché titolo, occhiello e immagine restino sulla
     stessa pagina: l'area stampabile di un A4 con questi margini è 263mm */
  .tall img { max-height: 196mm; width: auto; max-width: 100%; margin: 0 auto; }
  .tall { text-align: center; }

  /* ---------- rilievi ---------- */
  .finding { border: 1px solid #E2DDD1; margin-bottom: 5mm; break-inside: avoid; }
  .finding > header { display: flex; gap: 4mm; padding: 4mm 5mm; background: var(--sev-bg); border-bottom: 1px solid #E2DDD1; }
  .finding .num {
    flex: none; width: 9mm; height: 9mm; border-radius: 50%; background: var(--sev); color: #fff;
    font: 700 11pt/9mm sans-serif; text-align: center;
  }
  .finding .badge {
    display: inline-block; background: var(--sev); color: #fff; font-size: 7.5pt; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; padding: .8mm 2.5mm; border-radius: 2px; vertical-align: middle;
  }
  .finding .area { font-size: 8.5pt; color: #6E6960; margin-left: 3mm; }
  .finding h3 { font-size: 12.5pt; margin-top: 2mm; }
  .finding .body { padding: 4mm 5mm 1mm; }
  .row { display: grid; grid-template-columns: 30mm 1fr; gap: 4mm; margin-bottom: 3.5mm; }
  .row .k { font-size: 8pt; letter-spacing: .1em; text-transform: uppercase; color: #8A857A; padding-top: .8mm; }
  .row.impact p { font-weight: 500; }
  .row.fix p { color: #2F4A38; }
  ul.ev { margin: 0; padding-left: 4mm; font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 8.5pt; color: #46433D; }
  ul.ev li { margin-bottom: 1mm; word-break: break-all; }
  .inline-shot img { max-height: 120mm; width: auto; max-width: 100%; }
  .inline-shot { text-align: center; margin-top: 4mm; }

  /* ---------- piano ---------- */
  table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
  th { text-align: left; font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: #8A857A;
       border-bottom: 1.5px solid ${BRAND.oro}; padding: 0 3mm 2.5mm; }
  td { padding: 3mm; border-bottom: 1px solid #E9E4D8; vertical-align: top; }
  td.pri { font-weight: 700; white-space: nowrap; }

  .end { background: ${BRAND.nero}; color: ${BRAND.crema}; padding: 9mm 10mm; margin-top: 8mm; }
  .end h2 { color: ${BRAND.oro}; font-size: 15pt; margin-bottom: 4mm; }
  .end p { opacity: .85; margin-bottom: 3mm; }
`;

  const doc = (regolePagina, contenuto) =>
    `<!doctype html><html lang="${t.htmlLang}"><head><meta charset="utf-8">
<title>${esc(t.docTitle(host))}</title>
<style>${regolePagina}
${stile}</style></head><body>
${contenuto}
</body></html>`;

  const copertina = `<section class="cover">
  <div class="brand">B.Studio</div>
  <div>
    <div class="rule"></div>
    <h1>${t.coverH1}</h1>
    <div class="dom">${esc(host)}</div>
    <p class="sub">${esc(t.coverSub(esito.verificheEseguite))}</p>
  </div>
  <div class="meta">
    <span>${esc(t.coverRilevazione)} ${formattaData(d.startedAt, t.dateLocale)}</span>
    ${cliente ? `<span>${esc(t.coverPer)} ${esc(cliente)}</span>` : ''}
    <span>${esc(t.coverRiepilogo(esito.rilievi.length, esito.punteggio))}</span>
  </div>
</section>`;

  const contenuto = `
<!-- ============ SINTESI ============ -->
<div class="sec-title">${esc(t.secSintesi)}</div>
<h2 class="big">${esc(t.statoAttuale(esito.giudizio.toLowerCase()))}</h2>
<p class="lead">${esc(t.leadSintesi)}</p>

<div class="summary">
  ${gauge(esito.punteggio, t)}
  <div class="verdict">
    <h3>${esc(t.verdictTitle(esito.giudizio, esito.rilievi.length))}</h3>
    <p>${esc(t.verdictBody)}
    ${critici.length ? esc(t.verdictCritici(critici.length)) : esc(t.verdictNessunCritico)}</p>
  </div>
</div>

<div class="sev-grid">
  ${['critico', 'alto', 'medio', 'basso']
    .map(
      (s) => `<div class="sev-card" style="--c:${COLORI_SEV[s].colore}">
        <b>${esito.conteggio[s]}</b><span>${esc(
          esito.conteggio[s] === 1 ? t.sev[s].label : t.sev[s].plurale
        )}</span></div>`
    )
    .join('')}
</div>

<div class="facts">
  ${fatti.map(([k, v]) => `<div><b>${esc(v)}</b><span>${esc(k)}</span></div>`).join('')}
</div>

${
  critici.length
    ? `<div class="callout">
        <h3>${esc(t.calloutTitle(critici.length))}</h3>
        <ol>${critici.map((c) => `<li><b>${esc(c.titolo)}</b> — ${esc(primaFrase(c.impatto))}.</li>`).join('')}</ol>
      </div>`
    : ''
}

<div class="note">
  <b>${esc(t.noteTitle)}</b> ${esc(t.noteBody)}
</div>

<!-- ============ COM'È OGGI ============ -->
<div class="sec-title" style="margin-top:9mm">${esc(t.secRiscontro)}</div>
<h2 class="big">${esc(t.comeOggiTitle)}</h2>
<p class="lead">${esc(t.comeOggiLead)}</p>

<div class="shots-2">
  ${shots.desktopHero ? `<figure><img src="${shots.desktopHero}" alt=""><figcaption>${esc(t.capDesktopHero)}</figcaption></figure>` : ''}
  ${shots.mobileHero ? `<figure><img src="${shots.mobileHero}" alt=""><figcaption>${esc(t.capMobileHero)}</figcaption></figure>` : ''}
</div>

${
  shots.mobileAnnotated
    ? `<div class="page-break"></div>
       <div class="sec-title">${esc(t.secPanoramica)}</div>
       <h2 class="big">${esc(t.mobileTitle)}</h2>
       <p class="lead">${esc(t.mobileLead)}</p>
       <figure class="tall"><img src="${shots.mobileAnnotated}" alt="">
       <figcaption>${esc(t.mobileCap)}</figcaption></figure>`
    : ''
}

${
  shots.desktopAnnotated
    ? `<div class="page-break"></div>
       <div class="sec-title">${esc(t.secPanoramica)}</div>
       <h2 class="big">${esc(t.desktopTitle)}</h2>
       <p class="lead">${esc(t.desktopLead)}</p>
       <figure class="tall"><img src="${shots.desktopAnnotated}" alt="">
       <figcaption>${esc(t.desktopCap)}</figcaption></figure>`
    : ''
}

<!-- ============ RILIEVI ============ -->
<div class="page-break"></div>
<div class="sec-title">${esc(t.secDettaglio)}</div>
<h2 class="big">${esc(t.dettaglioTitle(esito.rilievi.length))}</h2>
<p class="lead">${esc(t.dettaglioLead)}</p>

${gruppi
  .map(
    (g) => `
  <h3 style="margin:7mm 0 4mm;font-size:12pt;color:${COLORI_SEV[g.sev].colore}">
    ${esc(t.sev[g.sev].label)} — ${g.items.length} ${esc(t.gruppoRilievo(g.items.length))}
  </h3>
  ${g.items.map((r) => bloccoRilievo(r, ++n, crops, t, AREE)).join('')}`
  )
  .join('')}

<!-- ============ PIANO ============ -->
<div class="page-break"></div>
<div class="sec-title">${esc(t.secConclusione)}</div>
<h2 class="big">${esc(t.pianoTitle)}</h2>
<p class="lead">${esc(t.pianoLead)}</p>

<table>
  <thead><tr><th style="width:16mm">${esc(t.thPriorita)}</th><th>${esc(t.thIntervento)}</th><th style="width:26mm">${esc(t.thAmbito)}</th><th style="width:22mm">${esc(t.thGravita)}</th></tr></thead>
  <tbody>
    ${esito.rilievi
      .map(
        (r, i) => `<tr>
          <td class="pri">${i + 1}</td>
          <td>${esc(r.titolo)}</td>
          <td style="font-size:8.5pt;color:#6E6960">${esc(AREE[r.area] || r.area)}</td>
          <td style="color:${COLORI_SEV[r.severita].colore};font-weight:700;font-size:8.5pt">${esc(t.sev[r.severita].label)}</td>
        </tr>`
      )
      .join('')}
  </tbody>
</table>

<div class="end">
  <h2>${esc(t.endTitle)}</h2>
  <p>${esc(t.endBody1(esito.verificheEseguite, esito.rilievi.length))}
  ${critici.length ? esc(t.endCritici(critici.length)) : ''}</p>
  <p>${esc(t.endBody2)}</p>
  <p style="opacity:.6;font-size:9pt;margin-top:6mm">
    ${esc(t.footerLine(formattaData(d.startedAt, t.dateLocale), host))}
  </p>
</div>
`;

  return {
    // copertina e corpo vengono stampati separatamente (vedi renderPdf)
    cover: doc('@page { size: A4; margin: 0 } body { margin: 0 }', copertina),
    body: doc('@page { size: A4 }', contenuto),
    // documento unico, per aprire il report nel browser senza passare dal PDF
    preview: doc('@page { size: A4 }', copertina + contenuto),
    host,
    pdfFooterBrand: t.pdfFooterBrand,
  };
}

/**
 * Copertina e corpo vengono stampati separatamente e poi uniti: la copertina a
 * pieno formato (fondo nero fino ai bordi, senza numero di pagina), il corpo con
 * i margini di lettura e il piè di pagina numerato.
 */
export async function renderPdf({ cover, body, pdfFooterBrand }, outFile) {
  const browser = await chromium.launch({ executablePath: findChromium() });
  let coverPdf, bodyPdf;
  try {
    const page = await browser.newPage();

    await page.setContent(cover, { waitUntil: 'load', timeout: 60000 });
    await page.emulateMedia({ media: 'print' });
    coverPdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    await page.setContent(body, { waitUntil: 'load', timeout: 120000 });
    await page.emulateMedia({ media: 'print' });
    bodyPdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `
        <div style="width:100%;font:8pt sans-serif;color:#9A958A;padding:0 14mm;
                    display:flex;justify-content:space-between">
          <span>${esc(pdfFooterBrand || 'B.Studio')}</span>
          <span class="pageNumber"></span>
        </div>`,
    });
  } finally {
    await browser.close();
  }

  const doc = await PDFDocument.create();
  for (const buf of [coverPdf, bodyPdf]) {
    const src = await PDFDocument.load(buf);
    const pagine = await doc.copyPages(src, src.getPageIndices());
    pagine.forEach((p) => doc.addPage(p));
  }
  await fs.writeFile(outFile, await doc.save());
  return outFile;
}

/** Converte i file screenshot in data URI, così l'HTML resta un file unico. */
export async function loadImages(d) {
  const shots = {};
  const crops = {};
  for (const [k, v] of Object.entries(d.screenshots || {})) shots[k] = await dataUri(v);
  for (const [k, v] of Object.entries(d.crops || {})) crops[k] = await dataUri(v);
  return { shots, crops };
}
