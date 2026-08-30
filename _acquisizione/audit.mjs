#!/usr/bin/env node
/**
 * B.Studio — Audit Engine
 * Analizza un sito reale (Playwright + Chromium) e produce un JSON con
 * punteggio, problemi concreti e screenshot. Zero API, zero costi.
 *
 * Uso:  node _acquisizione/audit.mjs https://esempio.ch [--out DIR]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };

const SEVERITY_WEIGHT = { kritisch: 3, mittel: 2, klein: 1 };

export async function audit(rawUrl, outDir) {
  const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
  const host = new URL(url).hostname.replace(/^www\./, '');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: MOBILE,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();

  // --- misura traffico reale ---
  let bytes = 0;
  let requests = 0;
  const heavyImages = [];
  page.on('response', async (res) => {
    requests++;
    try {
      const len = Number(res.headers()['content-length'] || 0);
      bytes += len;
      const type = res.headers()['content-type'] || '';
      if (type.startsWith('image/') && len > 300_000) {
        heavyImages.push({ url: res.url().split('?')[0], kb: Math.round(len / 1024), type });
      }
    } catch {}
  });

  const t0 = Date.now();
  let response = null;
  let loadError = null;
  try {
    response = await page.goto(url, { waitUntil: 'load', timeout: 45_000 });
  } catch (e) {
    loadError = e.message;
    try {
      response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      loadError = null;
    } catch (e2) {
      loadError = e2.message;
    }
  }
  const loadMs = Date.now() - t0;
  if (loadError) {
    await browser.close();
    return { host, url, error: loadError, ok: false };
  }

  await page.waitForTimeout(1500);

  // --- estrazione DOM ---
  const data = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const qa = (s) => [...document.querySelectorAll(s)];
    const text = (document.body?.innerText || '').toLowerCase();
    const html = document.documentElement.outerHTML;

    const foldH = 844;
    const inFold = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < foldH && r.bottom > 0 && r.width > 0 && r.height > 0;
    };

    const ctaWords =
      /(kontakt|anfrage|angebot|termin|buchen|jetzt|offerte|beratung|anrufen|schreiben|contatt|preventiv|prenot)/i;
    const ctaEls = qa('a,button').filter(
      (el) => ctaWords.test(el.innerText || '') || ctaWords.test(el.getAttribute('aria-label') || '')
    );

    const imgs = qa('img');

    return {
      title: (q('title')?.innerText || '').trim(),
      metaDesc: (q('meta[name="description"]')?.content || '').trim(),
      lang: document.documentElement.getAttribute('lang') || '',
      viewportMeta: !!q('meta[name="viewport"]'),
      h1: qa('h1').map((h) => h.innerText.trim()).filter(Boolean),
      h2count: qa('h2').length,
      og: {
        title: !!q('meta[property="og:title"]'),
        image: !!q('meta[property="og:image"]'),
        desc: !!q('meta[property="og:description"]'),
      },
      favicon: !!q('link[rel~="icon"]'),
      imgTotal: imgs.length,
      imgNoAlt: imgs.filter((i) => !i.getAttribute('alt')).length,
      imgLegacy: imgs.filter((i) => /\.(jpe?g|png)(\?|$)/i.test(i.currentSrc || i.src || '')).length,
      imgOversized: imgs.filter((i) => i.naturalWidth > i.clientWidth * 2.5 && i.clientWidth > 0).length,
      tel: qa('a[href^="tel:"]').length,
      mailto: qa('a[href^="mailto:"]').length,
      whatsapp: /wa\.me|api\.whatsapp/i.test(html),
      forms: qa('form').length,
      telInFold: qa('a[href^="tel:"]').some(inFold),
      ctaTotal: ctaEls.length,
      ctaInFold: ctaEls.some(inFold),
      impressum: /impressum/i.test(html),
      datenschutz: /datenschutz|privacy|privacy.?policy/i.test(html),
      agb: /\bagb\b|allgemeine gesch/i.test(html),
      cookieBanner: /cookie/i.test(text) && /(akzept|zustimm|einwillig|accept)/i.test(text),
      maps: /google\.com\/maps|maps\.google|openstreetmap/i.test(html),
      social: {
        instagram: /instagram\.com/i.test(html),
        linkedin: /linkedin\.com/i.test(html),
        facebook: /facebook\.com/i.test(html),
      },
      wordCount: text.split(/\s+/).filter(Boolean).length,
      generator: (q('meta[name="generator"]')?.content || '').trim(),
      horizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 2,
      docHeight: document.documentElement.scrollHeight,
    };
  });

  // --- tap target troppo piccoli (mobile) ---
  const smallTaps = await page.evaluate(() => {
    return [...document.querySelectorAll('a,button,input[type=submit]')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.height < 32;
    }).length;
  });

  // --- screenshot ---
  const shots = {};
  shots.mobileFold = path.join(outDir, 'mobile-fold.png');
  await page.screenshot({ path: shots.mobileFold });
  shots.mobileFull = path.join(outDir, 'mobile-full.png');
  await page.screenshot({ path: shots.mobileFull, fullPage: true }).catch(() => {});

  const dctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1 });
  const dpage = await dctx.newPage();
  await dpage.goto(url, { waitUntil: 'load', timeout: 45_000 }).catch(() => {});
  await dpage.waitForTimeout(1200);
  shots.desktopFold = path.join(outDir, 'desktop-fold.png');
  await dpage.screenshot({ path: shots.desktopFold }).catch(() => {});

  await browser.close();

  const https = url.startsWith('https://');
  const status = response?.status() ?? 0;
  const sizeMb = bytes / 1024 / 1024;

  // --- FINDINGS -----------------------------------------------------------
  const F = [];
  const add = (o) => F.push(o);

  // Performance
  if (loadMs > 4000)
    add({ id: 'speed', cat: 'Performance', sev: 'kritisch',
      title: `Ladezeit ${(loadMs / 1000).toFixed(1)}s auf dem Handy`,
      why: 'Ab 3 Sekunden springt rund die Hälfte der Besucher ab — bevor sie überhaupt gesehen haben, was Sie anbieten.',
      fix: 'Bilder komprimieren und in WebP ausliefern, Skripte reduzieren, Caching aktivieren.' });
  else if (loadMs > 2500)
    add({ id: 'speed', cat: 'Performance', sev: 'mittel',
      title: `Ladezeit ${(loadMs / 1000).toFixed(1)}s — spürbar träge`,
      why: 'Jede zusätzliche Sekunde kostet messbar Anfragen.',
      fix: 'Bilder optimieren und unnötige Skripte entfernen.' });

  if (sizeMb > 3)
    add({ id: 'weight', cat: 'Performance', sev: sizeMb > 6 ? 'kritisch' : 'mittel',
      title: `Seitengewicht ${sizeMb.toFixed(1)} MB (${requests} Anfragen)`,
      why: 'Im Mobilfunknetz wird das teuer und langsam — besonders unterwegs, wo die meisten Kunden Sie finden.',
      fix: 'Zielwert unter 1.5 MB: moderne Bildformate, Lazy Loading, weniger Fremdskripte.' });

  if (heavyImages.length)
    add({ id: 'img-heavy', cat: 'Performance', sev: 'mittel',
      title: `${heavyImages.length} Bild(er) über 300 KB`,
      why: 'Einzelne schwere Bilder blockieren den ersten Eindruck.',
      fix: `Grösstes Bild: ${heavyImages.sort((a,b)=>b.kb-a.kb)[0].kb} KB → als WebP unter 150 KB möglich.`,
      detail: heavyImages.slice(0, 5) });

  // Mobile
  if (!data.viewportMeta)
    add({ id: 'viewport', cat: 'Mobile', sev: 'kritisch',
      title: 'Kein Mobile-Viewport definiert',
      why: 'Die Seite wird auf dem Handy verkleinert dargestellt — unlesbar, unprofessionell.',
      fix: 'Viewport-Meta-Tag setzen und Layout responsiv aufbauen.' });
  if (data.horizontalScroll)
    add({ id: 'hscroll', cat: 'Mobile', sev: 'kritisch',
      title: 'Seite scrollt horizontal auf dem Handy',
      why: 'Der klassische "billig gebaut"-Eindruck. Besucher schliessen die Seite sofort.',
      fix: 'Überbreite Elemente begrenzen (max-width: 100%).' });
  if (smallTaps > 5)
    add({ id: 'taps', cat: 'Mobile', sev: 'mittel',
      title: `${smallTaps} Links/Buttons sind zu klein zum Antippen`,
      why: 'Fehlklicks auf dem Handy führen direkt zum Abbruch.',
      fix: 'Mindestens 44 px Höhe für alle klickbaren Elemente.' });

  // Conversion
  if (!data.ctaInFold)
    add({ id: 'cta-fold', cat: 'Conversion', sev: 'kritisch',
      title: 'Kein klarer Handlungsaufruf im sichtbaren Bereich',
      why: 'Wer nicht in 5 Sekunden sieht, was er tun soll, tut nichts. Das ist der teuerste Fehler auf der Seite.',
      fix: 'Ein einziger, deutlicher Button ganz oben: "Offerte anfragen" oder "Jetzt anrufen".' });
  if (!data.telInFold && data.tel > 0)
    add({ id: 'tel-fold', cat: 'Conversion', sev: 'mittel',
      title: 'Telefonnummer nicht sofort sichtbar',
      why: 'Auf dem Handy ist der Anruf der kürzeste Weg zum Auftrag.',
      fix: 'Klickbare Nummer oben fixieren (tel:-Link).' });
  if (data.tel === 0)
    add({ id: 'tel', cat: 'Conversion', sev: 'kritisch',
      title: 'Keine klickbare Telefonnummer',
      why: 'Wer die Nummer abtippen muss, ruft nicht an.',
      fix: 'tel:-Link im Header und im Footer setzen.' });
  if (data.forms === 0 && data.mailto === 0)
    add({ id: 'form', cat: 'Conversion', sev: 'kritisch',
      title: 'Kein Kontaktformular und keine E-Mail-Adresse',
      why: 'Jede Anfrage, die abends kommt, geht verloren.',
      fix: 'Kurzes Formular (Name, Kontakt, Anliegen) mit Weiterleitung an Ihre Mailbox.' });
  if (!data.whatsapp && data.forms === 0)
    add({ id: 'wa', cat: 'Conversion', sev: 'klein',
      title: 'Kein WhatsApp-Kontakt',
      why: 'Für KMU in der Schweiz oft der Kanal mit der höchsten Antwortquote.',
      fix: 'wa.me-Link als zweite Kontaktmöglichkeit.' });

  // SEO / Sichtbarkeit
  if (!data.title)
    add({ id: 'title', cat: 'Sichtbarkeit', sev: 'kritisch', title: 'Kein Seitentitel',
      why: 'Google zeigt dann irgendetwas an — meist die URL.',
      fix: 'Titel mit Leistung + Ort, 50–60 Zeichen.' });
  else if (data.title.length < 25 || data.title.length > 65)
    add({ id: 'title-len', cat: 'Sichtbarkeit', sev: 'mittel',
      title: `Seitentitel ${data.title.length} Zeichen ("${data.title.slice(0, 60)}")`,
      why: 'Zu kurz verschenkt Suchbegriffe, zu lang wird abgeschnitten.',
      fix: 'Format: Leistung + Region + Firma, 50–60 Zeichen.' });
  if (!data.metaDesc)
    add({ id: 'desc', cat: 'Sichtbarkeit', sev: 'mittel', title: 'Keine Meta-Description',
      why: 'Google textet den Suchergebnis-Text selbst — selten überzeugend.',
      fix: '150 Zeichen Nutzenversprechen mit Handlungsaufruf.' });
  if (data.h1.length === 0)
    add({ id: 'h1', cat: 'Sichtbarkeit', sev: 'mittel', title: 'Keine H1-Überschrift',
      why: 'Weder Google noch Besucher erkennen sofort das Thema der Seite.',
      fix: 'Eine H1 mit klarem Nutzenversprechen.' });
  else if (data.h1.length > 1)
    add({ id: 'h1-multi', cat: 'Sichtbarkeit', sev: 'klein',
      title: `${data.h1.length} H1-Überschriften`, why: 'Verwässert das Hauptthema der Seite.',
      fix: 'Genau eine H1 pro Seite.' });
  if (!data.og.image)
    add({ id: 'og', cat: 'Sichtbarkeit', sev: 'mittel', title: 'Kein Vorschaubild für Social Media',
      why: 'Beim Teilen auf WhatsApp/LinkedIn erscheint ein leerer grauer Kasten — wirkt verlassen.',
      fix: 'og:image, og:title und og:description ergänzen.' });
  if (data.wordCount < 250)
    add({ id: 'thin', cat: 'Sichtbarkeit', sev: 'mittel',
      title: `Nur ~${data.wordCount} Wörter Inhalt`,
      why: 'Zu wenig Substanz für Google und für Kunden, die vergleichen.',
      fix: 'Leistungen, Referenzen und Antworten auf echte Kundenfragen ergänzen.' });

  // Vertrauen / Recht
  if (!https)
    add({ id: 'https', cat: 'Vertrauen', sev: 'kritisch', title: 'Keine sichere HTTPS-Verbindung',
      why: 'Der Browser zeigt "Nicht sicher" — direkt neben Ihrem Firmennamen.',
      fix: 'Kostenloses Zertifikat aktivieren und alles auf HTTPS umleiten.' });
  if (!data.impressum)
    add({ id: 'impressum', cat: 'Vertrauen', sev: 'kritisch', title: 'Kein Impressum gefunden',
      why: 'In der Schweiz ist die Anbieterkennzeichnung Pflicht (UWG Art. 3 Abs. 1 lit. s) — und ein Vertrauenssignal.',
      fix: 'Impressum mit Firma, Adresse, Kontakt und UID ergänzen.' });
  if (!data.datenschutz)
    add({ id: 'ds', cat: 'Vertrauen', sev: 'kritisch', title: 'Keine Datenschutzerklärung',
      why: 'Seit dem revidierten DSG (revDSG) verpflichtend, sobald Sie Daten erheben — auch über ein Kontaktformular.',
      fix: 'Datenschutzerklärung ergänzen und im Footer verlinken.' });
  if (!data.favicon)
    add({ id: 'favicon', cat: 'Vertrauen', sev: 'klein', title: 'Kein Favicon',
      why: 'Im Browser-Tab erscheint ein leeres Blatt statt Ihrer Marke.',
      fix: 'Favicon aus dem Logo ableiten.' });
  if (data.imgNoAlt > 3)
    add({ id: 'alt', cat: 'Vertrauen', sev: 'klein',
      title: `${data.imgNoAlt} von ${data.imgTotal} Bildern ohne Alt-Text`,
      why: 'Schlecht für Barrierefreiheit und für die Bildersuche.',
      fix: 'Kurze, beschreibende Alt-Texte ergänzen.' });

  // --- SCORING ------------------------------------------------------------
  const cats = ['Performance', 'Mobile', 'Conversion', 'Sichtbarkeit', 'Vertrauen'];
  const scores = {};
  for (const c of cats) {
    const lost = F.filter((f) => f.cat === c).reduce((s, f) => s + SEVERITY_WEIGHT[f.sev] * 4, 0);
    scores[c] = Math.max(0, 20 - Math.min(20, lost));
  }
  const total = cats.reduce((s, c) => s + scores[c], 0);

  const result = {
    ok: true,
    host,
    url,
    status,
    scannedAt: new Date().toISOString(),
    metrics: { loadMs, sizeMb: +sizeMb.toFixed(2), requests, https, smallTaps },
    data,
    findings: F.sort((a, b) => SEVERITY_WEIGHT[b.sev] - SEVERITY_WEIGHT[a.sev]),
    scores,
    total,
    grade: total >= 85 ? 'A' : total >= 70 ? 'B' : total >= 55 ? 'C' : total >= 40 ? 'D' : 'E',
    shots: Object.fromEntries(Object.entries(shots).map(([k, v]) => [k, path.basename(v)])),
  };

  fs.writeFileSync(path.join(outDir, 'audit.json'), JSON.stringify(result, null, 2));
  return result;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) {
    console.error('Uso: node _acquisizione/audit.mjs https://esempio.ch [--out DIR]');
    process.exit(1);
  }
  const outIdx = process.argv.indexOf('--out');
  const host = new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '');
  const outDir = outIdx > -1 ? process.argv[outIdx + 1] : path.join('_acquisizione', 'out', host);
  const r = await audit(url, outDir);
  if (!r.ok) { console.error(`✗ ${r.host}: ${r.error}`); process.exit(2); }
  console.log(`✓ ${r.host} — Score ${r.total}/100 (${r.grade}) · ${r.findings.length} Probleme · ${outDir}`);
  for (const f of r.findings.slice(0, 5)) console.log(`   [${f.sev}] ${f.title}`);
}
