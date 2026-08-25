// Raccolta dati grezzi dal sito: rete, DOM, performance, screenshot.
// Nessuna valutazione qui dentro — le regole stanno in checks.mjs.

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync, readdirSync } from 'node:fs';

// Etichette disegnate SOPRA lo screenshot (fanno parte del PNG, non dell'HTML
// del report): devono seguire --lang quanto il resto del testo, altrimenti il
// ritaglio annotato resta in italiano anche in un report tedesco.
const ETICHETTE = {
  it: {
    alt: (n) => `Immagine ${n} — nessun testo alternativo`,
    contrasto: (ratio, req) => `Contrasto ${ratio}:1 — minimo richiesto ${req}:1`,
    formLabel: 'Campi senza etichetta',
    overflow: (tag, right) => `Esce dallo schermo — <${tag}> arriva a ${right}px`,
    tapTarget: (w, h) => `${w}×${h}px — sotto il minimo di 44×44`,
    smallText: (size) => `Testo a ${size}px`,
  },
  de: {
    alt: (n) => `Bild ${n} — kein Alternativtext`,
    contrasto: (ratio, req) => `Kontrast ${ratio}:1 — nötig: ${req}:1`,
    formLabel: 'Felder ohne Beschriftung',
    overflow: (tag, right) => `Ragt über den Bildschirmrand — <${tag}> reicht bis ${right}px`,
    tapTarget: (w, h) => `${w}×${h}px — unter dem Minimum von 44×44`,
    smallText: (size) => `Text bei ${size}px`,
  },
};

// Opzioni di newContext(): la misura dello schermo va sotto `viewport`, non al
// primo livello, altrimenti Playwright usa silenziosamente il valore predefinito.
export const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  // `isMobile` non viene attivato di proposito: fa applicare a Chromium lo
  // "shrink-to-fit" (la pagina viene rimpicciolita finché il contenuto ci sta),
  // e con quello window.innerWidth restituisce la larghezza del contenuto invece
  // dei 390px reali — falsando overflow, tasti e dimensioni del testo.
  // Con il solo viewport a 390px le misure corrispondono ai pixel CSS veri.
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
  },
};

const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Su macchine normali Playwright trova il browser da solo. In ambienti dove i
// browser sono pre-installati con una build diversa (PLAYWRIGHT_BROWSERS_PATH)
// il binario va indicato a mano, altrimenti Playwright cerca una build che non c'è.
function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!root || !existsSync(root)) return undefined;
  const dir = readdirSync(root)
    .filter((d) => d.startsWith('chromium-'))
    .sort()
    .pop();
  if (!dir) return undefined;
  const bin = path.join(root, dir, 'chrome-linux', 'chrome');
  return existsSync(bin) ? bin : undefined;
}

/** Audit del DOM. Girà dentro la pagina: deve essere autonoma. */
function domAudit() {
  const absUrl = (u) => {
    try {
      return new URL(u, location.href).href;
    } catch {
      return null;
    }
  };
  const txt = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05;
  };
  const rectOf = (el) => {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x + scrollX),
      y: Math.round(r.y + scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };

  // --- colore / contrasto (WCAG 2.1) ---
  const parseColor = (str) => {
    const m = String(str).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((s) => parseFloat(s.trim()));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const relLum = ({ r, g, b }) => {
    const f = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (a, b) => {
    const l1 = relLum(a);
    const l2 = relLum(b);
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
  };
  // Il colore di sfondo effettivo va cercato risalendo gli antenati: un elemento
  // trasparente eredita visivamente lo sfondo del primo antenato opaco.
  const effectiveBg = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null; // non valutabile
      const c = parseColor(s.backgroundColor);
      if (c && c.a > 0.5) return c;
      node = node.parentElement;
    }
    const body = parseColor(getComputedStyle(document.body).backgroundColor);
    return body && body.a > 0.5 ? body : { r: 255, g: 255, b: 255, a: 1 };
  };

  const head = document.head;
  const metaOf = (name) =>
    head.querySelector(`meta[name="${name}" i]`)?.getAttribute('content')?.trim() || null;
  const ogOf = (prop) =>
    head.querySelector(`meta[property="${prop}" i]`)?.getAttribute('content')?.trim() || null;

  // --- immagini ---
  const images = [...document.querySelectorAll('img')].filter(visible).map((img) => {
    const r = img.getBoundingClientRect();
    const src = img.currentSrc || img.src || '';
    return {
      src: absUrl(src),
      alt: img.getAttribute('alt'),
      hasAlt: img.hasAttribute('alt'),
      altEmpty: img.getAttribute('alt')?.trim() === '',
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: Math.round(r.width),
      displayHeight: Math.round(r.height),
      loading: img.getAttribute('loading'),
      hasDimensions: img.hasAttribute('width') && img.hasAttribute('height'),
      ext: (src.split('?')[0].split('.').pop() || '').toLowerCase().slice(0, 5),
      rect: rectOf(img),
    };
  });

  // --- link ---
  const links = [...document.querySelectorAll('a')].map((a) => {
    const href = a.getAttribute('href') || '';
    const abs = absUrl(href);
    let internal = false;
    try {
      internal = abs ? new URL(abs).hostname === location.hostname : false;
    } catch {}
    return {
      href,
      abs,
      text: txt(a),
      hasText: txt(a).length > 0 || !!a.querySelector('img[alt]:not([alt=""])'),
      target: a.getAttribute('target'),
      rel: a.getAttribute('rel'),
      internal,
      isAnchor: href.startsWith('#'),
      isMailto: href.startsWith('mailto:'),
      isTel: href.startsWith('tel:'),
      isJsVoid: /^javascript:|^#$/.test(href),
      visible: visible(a),
      rect: visible(a) ? rectOf(a) : null,
    };
  });

  // --- form ---
  const forms = [...document.querySelectorAll('form')].map((f) => {
    const fields = [...f.querySelectorAll('input, textarea, select')]
      .filter((el) => el.type !== 'hidden')
      .map((el) => {
        const id = el.id;
        const labelled =
          !!(id && f.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
          !!el.closest('label') ||
          !!el.getAttribute('aria-label') ||
          !!el.getAttribute('aria-labelledby');
        return {
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute('type') || el.tagName.toLowerCase(),
          name: el.getAttribute('name'),
          required: el.hasAttribute('required'),
          placeholder: el.getAttribute('placeholder'),
          labelled,
        };
      });
    return {
      action: f.getAttribute('action'),
      method: (f.getAttribute('method') || 'get').toLowerCase(),
      fields,
      hasSubmit: !!f.querySelector('[type=submit], button:not([type=button])'),
      rect: visible(f) ? rectOf(f) : null,
    };
  });

  // --- heading ---
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .filter(visible)
    .map((h) => ({ level: Number(h.tagName[1]), text: txt(h).slice(0, 160), rect: rectOf(h) }));

  // --- contrasto testo ---
  const contrastIssues = [];
  const textEls = [...document.querySelectorAll('p,li,span,a,h1,h2,h3,h4,h5,h6,button,label,td')];
  for (const el of textEls) {
    if (contrastIssues.length >= 40) break;
    const t = txt(el);
    if (t.length < 4) continue;
    // solo il nodo che contiene direttamente il testo, per non contare due volte
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 3);
    if (!ownText || !visible(el)) continue;
    const s = getComputedStyle(el);
    const fg = parseColor(s.color);
    const bg = effectiveBg(el);
    if (!fg || !bg) continue;
    const size = parseFloat(s.fontSize);
    const bold = parseInt(s.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const ratio = contrast(fg, bg);
    const min = large ? 3 : 4.5;
    if (ratio < min) {
      contrastIssues.push({
        text: t.slice(0, 70),
        ratio: Math.round(ratio * 100) / 100,
        required: min,
        fontSize: Math.round(size),
        color: s.color,
        background: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
        rect: rectOf(el),
      });
    }
  }

  // --- tap target (rilevante su mobile) ---
  const tapTargets = [];
  for (const el of document.querySelectorAll('a[href], button, [role=button], input[type=submit]')) {
    if (tapTargets.length >= 30) break;
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (Math.min(r.width, r.height) < 40) {
      tapTargets.push({
        text: txt(el).slice(0, 50) || el.tagName.toLowerCase(),
        w: Math.round(r.width),
        h: Math.round(r.height),
        rect: rectOf(el),
      });
    }
  }

  // --- testo troppo piccolo ---
  const smallText = [];
  for (const el of textEls) {
    if (smallText.length >= 20) break;
    const t = txt(el);
    if (t.length < 15 || !visible(el)) continue;
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 10);
    if (!ownText) continue;
    const size = parseFloat(getComputedStyle(el).fontSize);
    if (size < 14) {
      smallText.push({ text: t.slice(0, 60), fontSize: Math.round(size * 10) / 10, rect: rectOf(el) });
    }
  }

  // --- overflow orizzontale ---
  const docW = document.documentElement.scrollWidth;
  const winW = window.innerWidth;
  const overflowing = [];
  if (docW > winW + 2) {
    for (const el of document.querySelectorAll('body *')) {
      if (overflowing.length >= 12) break;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.right > winW + 2 && getComputedStyle(el).position !== 'fixed') {
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 60),
          right: Math.round(r.right),
          rect: rectOf(el),
        });
      }
    }
  }

  const bodyText = document.body.innerText || '';
  const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => {
      try {
        return JSON.parse(s.textContent);
      } catch {
        return { __parseError: true };
      }
    });

  const linkTextAll = links.map((l) => `${l.text} ${l.href}`).join(' ').toLowerCase();
  const hay = (bodyText + ' ' + linkTextAll).toLowerCase();
  const has = (...words) => words.some((w) => hay.includes(w));

  return {
    url: location.href,
    title: document.title.trim(),
    lang: document.documentElement.getAttribute('lang'),
    charset: document.characterSet,
    metaDescription: metaOf('description'),
    metaViewport: metaOf('viewport'),
    metaRobots: metaOf('robots'),
    metaKeywords: metaOf('keywords'),
    generator: metaOf('generator'),
    canonical: head.querySelector('link[rel=canonical]')?.href || null,
    favicon: !!head.querySelector('link[rel~="icon"]'),
    og: {
      title: ogOf('og:title'),
      description: ogOf('og:description'),
      image: ogOf('og:image'),
      url: ogOf('og:url'),
      type: ogOf('og:type'),
    },
    twitterCard: metaOf('twitter:card'),
    hreflang: [...head.querySelectorAll('link[rel=alternate][hreflang]')].map((l) =>
      l.getAttribute('hreflang')
    ),
    headings,
    images,
    links,
    forms,
    contrastIssues,
    tapTargets,
    smallText,
    overflow: { docWidth: docW, winWidth: winW, elements: overflowing },
    counts: {
      inlineStyles: document.querySelectorAll('[style]').length,
      externalCss: document.querySelectorAll('link[rel=stylesheet]').length,
      scripts: document.querySelectorAll('script[src]').length,
      iframes: document.querySelectorAll('iframe').length,
      words: bodyText.split(/\s+/).filter(Boolean).length,
      domNodes: document.querySelectorAll('*').length,
    },
    iframes: [...document.querySelectorAll('iframe')].map((f) => ({
      src: f.getAttribute('src'),
      title: f.getAttribute('title'),
    })),
    jsonLd,
    // segnali di contenuto — servono a capire cosa manca a un sito locale
    signals: {
      lorem: /lorem ipsum|dolor sit amet|testo di esempio|placeholder text|deine überschrift|your text here/i.test(
        bodyText
      ),
      impressum: has('impressum', 'chi siamo', 'mentions légales'),
      privacy: has('datenschutz', 'privacy', 'informativa', 'gdpr', 'dsg'),
      agb: has('agb', 'termini', 'conditions', 'condizioni'),
      cookieBanner: !!document.querySelector(
        '[class*=cookie i], [id*=cookie i], [class*=consent i], [id*=consent i]'
      ),
      phoneInText: /(\+41|0041|0\d{2})[\s./-]?\d{2,3}[\s./-]?\d{2,3}[\s./-]?\d{2}/.test(bodyText),
      emailInText: /[\w.+-]+@[\w-]+\.[\w.]{2,}/.test(bodyText),
      postalCode: /\b(CH-)?\d{4}\s+[A-ZÄÖÜ][a-zäöüéèà]+/.test(bodyText),
      openingHours: has('öffnungszeiten', 'orari', 'horaires', 'opening hours', 'montag', 'lunedì'),
      booking: has('termin', 'buchen', 'prenota', 'appuntamento', 'reservieren', 'book now', 'jetzt buchen'),
      prices: /(chf|fr\.)\s?\d/i.test(bodyText),
      map: [...document.querySelectorAll('iframe')].some((f) =>
        /maps|openstreetmap/i.test(f.getAttribute('src') || '')
      ),
      socialLinks: links
        .filter((l) => /instagram|facebook|tiktok|linkedin|youtube|whatsapp/i.test(l.abs || ''))
        .map((l) => l.abs),
      copyrightYear: (bodyText.match(/(?:©|&copy;|copyright)\s*(\d{4})/i) || [])[1] || null,
    },
    textSample: bodyText.replace(/\s+/g, ' ').trim().slice(0, 4000),
  };
}

/** Disegna riquadri numerati sopra gli elementi problematici, per lo screenshot annotato. */
function drawAnnotations(marks) {
  document.getElementById('__audit_overlay__')?.remove();
  const layer = document.createElement('div');
  layer.id = '__audit_overlay__';
  Object.assign(layer.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '2147483647',
    pointerEvents: 'none',
  });
  for (const m of marks) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      position: 'absolute',
      left: `${m.rect.x - 3}px`,
      top: `${m.rect.y - 3}px`,
      width: `${m.rect.w + 6}px`,
      height: `${m.rect.h + 6}px`,
      border: '3px solid #E11D48',
      borderRadius: '4px',
      boxShadow: '0 0 0 3px rgba(225,29,72,.20)',
      boxSizing: 'border-box',
    });
    const tag = document.createElement('div');
    tag.textContent = m.label;
    Object.assign(tag.style, {
      position: 'absolute',
      left: `${m.rect.x - 3}px`,
      top: `${Math.max(0, m.rect.y - 26)}px`,
      background: '#E11D48',
      color: '#fff',
      font: '700 12px/1.5 -apple-system, Segoe UI, Roboto, sans-serif',
      padding: '2px 8px',
      borderRadius: '4px',
      whiteSpace: 'nowrap',
      maxWidth: '480px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    });
    layer.append(box, tag);
  }
  document.body.appendChild(layer);
}

async function settle(page) {
  // Molti siti vetrina caricano immagini e font in ritardo: forziamo lo scroll
  // fino in fondo così il lazy-load parte prima dello screenshot.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight && y < 30000) setTimeout(step, 120);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
  });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
}

async function capture(page, dir, name, opts = {}) {
  const file = path.join(dir, `${name}.png`);
  await page.screenshot({ path: file, ...opts }).catch(() => null);
  return existsSync(file) ? file : null;
}

/**
 * Screenshot annotati per singolo rilievo.
 *
 * Uno screenshot dell'intera pagina rimpicciolito a misura di A4 rende i riquadri
 * illeggibili. Per ogni gruppo di problemi ritagliamo quindi la zona interessata,
 * così nel report si vede da vicino il punto esatto.
 */
async function annotaGruppi(page, dir, prefisso, gruppi) {
  const out = {};
  const dims = await page.evaluate(() => ({
    w: document.documentElement.scrollWidth,
    h: document.documentElement.scrollHeight,
  }));

  for (const g of gruppi) {
    const marks = g.marks.filter((m) => m.rect && m.rect.w > 0 && m.rect.h > 0).slice(0, 8);
    if (!marks.length) continue;

    await page.evaluate(drawAnnotations, marks);

    // riquadro di ritaglio: i primi rilievi del gruppo, con margine attorno
    const focus = marks.slice(0, 3);
    const pad = 48;
    const x1 = Math.max(0, Math.min(...focus.map((m) => m.rect.x)) - pad);
    const y1 = Math.max(0, Math.min(...focus.map((m) => m.rect.y)) - pad - 20);
    const x2 = Math.min(dims.w, Math.max(...focus.map((m) => m.rect.x + m.rect.w)) + pad);
    const y2 = Math.min(dims.h, Math.max(...focus.map((m) => m.rect.y + m.rect.h)) + pad);

    const clip = {
      x: x1,
      y: y1,
      width: Math.max(240, Math.min(dims.w - x1, x2 - x1)),
      height: Math.max(120, Math.min(dims.h - y1, y2 - y1, 1100)),
    };

    // `fullPage` è indispensabile: senza, un ritaglio che cade sotto la prima
    // schermata è fuori dall'immagine prodotta e lo screenshot fallisce.
    const file = await capture(page, dir, `${prefisso}-${g.id}`, { clip, fullPage: true });
    if (file) out[g.id] = file;
    await page.evaluate(() => document.getElementById('__audit_overlay__')?.remove());
  }

  // panoramica: tutti i rilievi della vista insieme, sull'intera pagina
  const tutti = gruppi.flatMap((g) => g.marks).slice(0, 25);
  if (tutti.length) {
    await page.evaluate(drawAnnotations, tutti);
    out.__panoramica = await capture(page, dir, `${prefisso}-panoramica`, { fullPage: true });
    await page.evaluate(() => document.getElementById('__audit_overlay__')?.remove());
  }
  return out;
}

/** Verifica quali link rispondono. Limitata per non martellare il server della cliente. */
async function checkLinks(request, links, max = 40) {
  const targets = [...new Set(links.filter((l) => l.abs && /^https?:/.test(l.abs)).map((l) => l.abs))].slice(
    0,
    max
  );
  const results = [];
  const pool = 6;
  let i = 0;
  await Promise.all(
    Array.from({ length: pool }, async () => {
      while (i < targets.length) {
        const url = targets[i++];
        try {
          let r = await request.get(url, { timeout: 12000, maxRedirects: 5 });
          results.push({ url, status: r.status(), ok: r.ok() });
        } catch (e) {
          results.push({ url, status: 0, ok: false, error: e.message.split('\n')[0].slice(0, 120) });
        }
      }
    })
  );
  return results;
}

export async function collect(targetUrl, { outDir, ignoreHttpsErrors = false, lang = 'it' } = {}) {
  const shotDir = path.join(outDir, 'screenshots');
  await fs.mkdir(shotDir, { recursive: true });
  const L = ETICHETTE[lang] || ETICHETTE.it;

  const browser = await chromium.launch({ executablePath: findChromium() });
  const data = { target: targetUrl, startedAt: new Date().toISOString(), screenshots: {}, crops: {} };

  try {
    // ---------------- DESKTOP ----------------
    const ctx = await browser.newContext({
      ...VIEWPORTS.desktop,
      ignoreHTTPSErrors: ignoreHttpsErrors,
      locale: 'de-CH',
    });
    const page = await ctx.newPage();

    const network = [];
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning')
        consoleErrors.push({ type: m.type(), text: m.text().slice(0, 300) });
    });
    page.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 300)));
    page.on('response', async (res) => {
      const req = res.request();
      let size = 0;
      try {
        size = (await req.sizes()).responseBodySize || 0;
      } catch {}
      network.push({
        url: res.url(),
        status: res.status(),
        type: req.resourceType(),
        size,
        fromCache: res.fromServiceWorker?.() || false,
      });
    });

    const t0 = Date.now();
    let response;
    try {
      response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    } catch (e) {
      data.fatal = `Impossibile caricare la pagina: ${e.message.split('\n')[0]}`;
      await browser.close();
      return data;
    }
    await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    data.loadMs = Date.now() - t0;

    // catena di redirect
    const chain = [];
    for (let r = response.request().redirectedFrom(); r; r = r.redirectedFrom())
      chain.unshift({ url: r.url(), status: (await r.response())?.status() ?? null });
    data.redirectChain = chain;

    data.http = {
      status: response.status(),
      finalUrl: page.url(),
      headers: response.headers(),
      isHttps: page.url().startsWith('https://'),
    };

    data.timing = await page
      .evaluate(() => {
        const n = performance.getEntriesByType('navigation')[0];
        const paints = Object.fromEntries(
          performance.getEntriesByType('paint').map((p) => [p.name, Math.round(p.startTime)])
        );
        if (!n) return { paints };
        return {
          ttfb: Math.round(n.responseStart - n.requestStart),
          domContentLoaded: Math.round(n.domContentLoadedEventEnd - n.startTime),
          load: Math.round(n.loadEventEnd - n.startTime),
          transferSize: n.transferSize,
          paints,
        };
      })
      .catch(() => ({}));

    await settle(page);
    data.dom = await page.evaluate(domAudit);

    data.screenshots.desktop = await capture(page, shotDir, 'desktop-full', { fullPage: true });
    data.screenshots.desktopHero = await capture(page, shotDir, 'desktop-hero');

    data.network = network;
    data.consoleErrors = consoleErrors;
    data.pageErrors = pageErrors;
    data.linkChecks = await checkLinks(ctx.request, data.dom.links);

    // screenshot annotati, un ritaglio per famiglia di problema
    const cropsDesktop = await annotaGruppi(page, shotDir, 'desktop', [
      {
        id: 'alt',
        marks: data.dom.images
          .filter((i) => !i.hasAlt)
          .map((i, n) => ({ rect: i.rect, label: L.alt(n + 1) })),
      },
      {
        id: 'contrasto',
        marks: data.dom.contrastIssues.map((c) => ({
          rect: c.rect,
          label: L.contrasto(c.ratio, c.required),
        })),
      },
      {
        id: 'form-label',
        marks: data.dom.forms
          .filter((fo) => fo.rect && fo.fields.some((x) => !x.labelled))
          .map((fo) => ({ rect: fo.rect, label: L.formLabel })),
      },
    ]);
    data.screenshots.desktopAnnotated = cropsDesktop.__panoramica || null;
    data.crops = { ...cropsDesktop };
    delete data.crops.__panoramica;

    // ---------------- MOBILE ----------------
    const mctx = await browser.newContext({
      ...VIEWPORTS.mobile,
      userAgent: UA_MOBILE,
      ignoreHTTPSErrors: ignoreHttpsErrors,
      locale: 'de-CH',
    });
    const mpage = await mctx.newPage();
    await mpage.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
    await mpage.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    await settle(mpage);

    data.mobile = await mpage.evaluate(domAudit);
    data.screenshots.mobile = await capture(mpage, shotDir, 'mobile-full', { fullPage: true });
    data.screenshots.mobileHero = await capture(mpage, shotDir, 'mobile-hero');

    const cropsMobile = await annotaGruppi(mpage, shotDir, 'mobile', [
      {
        id: 'overflow',
        marks: data.mobile.overflow.elements.map((o) => ({
          rect: o.rect,
          label: L.overflow(o.tag, o.right),
        })),
      },
      {
        id: 'tap-targets',
        marks: data.mobile.tapTargets.map((tt) => ({
          rect: tt.rect,
          label: L.tapTarget(tt.w, tt.h),
        })),
      },
      {
        id: 'small-text',
        marks: data.mobile.smallText.map((s) => ({
          rect: s.rect,
          label: L.smallText(s.fontSize),
        })),
      },
    ]);
    data.screenshots.mobileAnnotated = cropsMobile.__panoramica || null;
    delete cropsMobile.__panoramica;
    Object.assign(data.crops, cropsMobile);

    // ---------------- FILE DI SERVIZIO ----------------
    const origin = new URL(page.url()).origin;
    for (const [key, p] of [
      ['robots', '/robots.txt'],
      ['sitemap', '/sitemap.xml'],
    ]) {
      try {
        const r = await ctx.request.get(origin + p, { timeout: 12000 });
        const body = await r.text();
        data[key] = { status: r.status(), ok: r.ok(), body: body.slice(0, 1500) };
      } catch {
        data[key] = { status: 0, ok: false, body: '' };
      }
    }
    // pagina 404: un sito curato risponde 404, non 200 su qualunque URL
    try {
      const r = await ctx.request.get(`${origin}/_audit-pagina-inesistente-${Date.now()}`, {
        timeout: 12000,
      });
      data.notFound = { status: r.status() };
    } catch {
      data.notFound = { status: 0 };
    }
    // versione www / senza www e http → https
    try {
      const r = await ctx.request.get(targetUrl.replace(/^https:/, 'http:'), { timeout: 12000 });
      data.httpRedirect = { status: r.status(), finalUrl: r.url() };
    } catch {
      data.httpRedirect = null;
    }
  } finally {
    await browser.close();
  }

  data.finishedAt = new Date().toISOString();
  return data;
}
