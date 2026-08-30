#!/usr/bin/env node
/**
 * B.Studio — Outreach Generator
 * Da audit.json genera i testi 1:1 in tedesco: e-mail, DM Instagram, script telefonico,
 * e i 2 follow-up. Ogni testo cita problemi REALI trovati sul sito del destinatario:
 * è questo che lo distingue dallo spam (e che lo fa rispondere).
 *
 * ⚠️ Sono BOZZE. Le invii tu, una per una, dopo averle lette.
 *    UWG Art. 3 Abs. 1 lit. o vieta la pubblicità di massa elettronica senza consenso:
 *    invio individuale, mittente identificabile, opt-out in calce, volumi bassi.
 *
 * Uso:  node _acquisizione/outreach.mjs _acquisizione/out/esempio.ch [--report-url URL]
 */
import fs from 'node:fs';
import path from 'node:path';

const CFG_PATH = new URL('./config.json', import.meta.url);
const cfg = JSON.parse(fs.readFileSync(CFG_PATH, 'utf8'));

const num = (n) => n.toLocaleString('de-CH');

export function buildOutreach(a, dir, reportUrl = '') {
  const f = a.findings;
  const top = f.slice(0, 3);
  const one = top[0];
  const link = reportUrl || `[LINK ZUM REPORT EINFÜGEN]`;
  const load = (a.metrics.loadMs / 1000).toFixed(1);

  // Gancio: il dato più concreto e verificabile disponibile.
  // Restituisce anche il finding collegato, così oggetto e corpo della mail parlano
  // della stessa cosa (incoerenza = odore di template).
  const pick = (id) => f.find((x) => x.id === id);
  const hookFor = [
    [pick('speed') && a.metrics.loadMs > 3500, `Ihre Startseite braucht auf dem Handy ${load} Sekunden zum Laden`, pick('speed')],
    [pick('cta-fold'), `auf dem Handy sieht man auf Ihrer Startseite zuerst keinen einzigen Button`, pick('cta-fold')],
    [pick('tel'), `Ihre Telefonnummer ist auf dem Handy nicht anklickbar`, pick('tel')],
    [pick('hscroll'), `Ihre Seite lässt sich auf dem Handy seitlich verschieben`, pick('hscroll')],
    [pick('og'), `wenn jemand Ihre Seite per WhatsApp teilt, erscheint ein leerer grauer Kasten`, pick('og')],
    [pick('https'), `der Browser zeigt bei Ihrer Seite „Nicht sicher" an`, pick('https')],
  ].find(([cond]) => cond);
  const hook = hookFor ? hookFor[1]
    : one ? one.title.charAt(0).toLowerCase() + one.title.slice(1)
    : 'mir sind ein paar Punkte aufgefallen';
  const hookFinding = hookFor ? hookFor[2] : one;

  const bullets = top.map((x) => `• ${x.title} — ${x.fix}`).join('\n');

  const email = {
    subject: `Kurz zu ${a.host} — ${hookFinding ? hookFinding.title.slice(0, 48) : 'ein paar Punkte'}`,
    body: `Guten Tag

ich bin ${cfg.name} von ${cfg.studio} — ich gestalte Marken und Websites für Schweizer KMU.

Ich bin über ${a.host} gestolpert und habe die Seite kurz auf dem Handy getestet, weil mir etwas aufgefallen ist: ${hook}.

Ich habe daraus einen kleinen Check gemacht — keine Massenmail, den gibt es genau für Ihre Seite:

${bullets}

Der ganze Check mit Screenshots und Messwerten liegt hier (2 Minuten Lesezeit, kein Login):
${link}

Behalten Sie ihn einfach. Wenn Sie wollen, dass ich Punkt 1 behebe, antworten Sie mit „Punkt 1" — dann bekommen Sie Preis und Termin, sonst nichts.

Freundliche Grüsse
${cfg.name}
${cfg.studio} · ${cfg.site}

—
Sie erhalten diese Nachricht einmalig und persönlich, weil ich Ihre Website konkret angeschaut habe.
Ein kurzes „nein danke" genügt und Sie hören nie wieder von mir.`,
  };

  const dm = `Hallo 👋 ich bin ${cfg.name} von ${cfg.studio}.

Kurz und ohne Umschweife: ich habe ${a.host} auf dem Handy getestet — ${hook}.

Ich habe Ihnen einen kleinen Check gemacht (Screenshots + die 3 Punkte, die am meisten Anfragen kosten). Soll ich ihn schicken? Gratis, kein Haken.`;

  const dmShort = `Hallo 👋 ${hook} — aufgefallen bei ${a.host}. Ich habe dazu einen 2-Minuten-Check gemacht. Soll ich ihn rüberschicken?`;

  const phone = `TELEFON — 45 Sekunden, dann Frage

„Guten Tag, ${cfg.name} von ${cfg.studio}. Ich rufe nicht wegen eines Angebots an,
sondern weil ich Ihre Website ${a.host} auf dem Handy getestet habe und mir
etwas aufgefallen ist: ${hook}.
Haben Sie 30 Sekunden?"

→ JA:  „${hookFinding ? hookFinding.title : ''}. Das heisst konkret: ${hookFinding ? hookFinding.why : ''}
        Ich habe Ihnen das aufgeschrieben, mit Screenshots. Auf welche Mail darf ich es schicken?"

→ „KEINE ZEIT": „Verstehe. Ich schicke es Ihnen per Mail, dann schauen Sie wann es passt.
        Welche Adresse?"

→ „KEIN INTERESSE": „Alles gut. Ich lasse Ihnen den Check trotzdem da, er ist bereits fertig.
        Schönen Tag." (→ trotzdem senden. Rund jeder fünfte meldet sich später doch.)

REGEL: nie über Preise reden am Telefon. Ziel des Anrufs ist NUR die E-Mail-Adresse.`;

  const followup1 = `Betreff: Re: ${email.subject}

Guten Tag

kurze Rückfrage zum Check von letzter Woche für ${a.host} — haben Sie ihn öffnen können?

Der schnellste Punkt bleibt: ${hookFinding ? hookFinding.title : '—'}.
Das ist bei Ihnen ein Nachmittag Arbeit, nicht ein Projekt.

Wenn es gerade nicht passt, sagen Sie einfach kurz Bescheid — dann hake ich nicht weiter nach.

Freundliche Grüsse
${cfg.name} · ${cfg.studio}`;

  const followup2 = `Betreff: Letzte Nachricht zu ${a.host}

Guten Tag

ich schliesse das Thema bei mir ab — Sie hören von mir nichts mehr.

Der Check bleibt online, falls Sie später darauf zurückkommen wollen:
${link}

Und falls es irgendwann doch soweit ist: ${cfg.pakete[0].n} ${cfg.pakete[0].p},
${cfg.pakete[1].n} ${cfg.pakete[1].p}. Immer Fixpreis, kein Stundensatz.

Alles Gute für Ihr Geschäft.
${cfg.name} · ${cfg.studio} · ${cfg.site}`;

  const md = `# Outreach — ${a.host}

**Score:** ${a.total}/100 (${a.grade}) · **Probleme:** ${a.findings.length} (${f.filter((x) => x.sev === 'kritisch').length} kritisch)
**Gemessen:** ${load}s Ladezeit · ${a.metrics.sizeMb} MB · ${num(a.metrics.requests)} Anfragen
**Report:** ${link}

> Gancio usato: *${hook}*

---

## 1 · E-Mail (invio individuale)

**Oggetto:** ${email.subject}

\`\`\`
${email.body}
\`\`\`

---

## 2 · DM Instagram / LinkedIn

\`\`\`
${dm}
\`\`\`

**Versione corta (per la prima riga che si vede in anteprima):**

\`\`\`
${dmShort}
\`\`\`

---

## 3 · Telefono

\`\`\`
${phone}
\`\`\`

---

## 4 · Follow-up +4 giorni

\`\`\`
${followup1}
\`\`\`

## 5 · Follow-up +10 giorni (chiusura)

\`\`\`
${followup2}
\`\`\`

---

### Tutti i problemi trovati (per rispondere se chiedono dettagli)

${a.findings.map((x, i) => `${i + 1}. **[${x.sev}] ${x.title}** — ${x.why} → *${x.fix}*`).join('\n')}
`;

  fs.writeFileSync(path.join(dir, 'outreach.md'), md);
  fs.writeFileSync(path.join(dir, 'email.txt'), `Betreff: ${email.subject}\n\n${email.body}\n`);
  return { md: path.join(dir, 'outreach.md'), hook, subject: email.subject };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2];
  if (!dir) { console.error('Uso: node _acquisizione/outreach.mjs _acquisizione/out/<dominio> [--report-url URL]'); process.exit(1); }
  const i = process.argv.indexOf('--report-url');
  const a = JSON.parse(fs.readFileSync(path.join(dir, 'audit.json'), 'utf8'));
  const r = buildOutreach(a, dir, i > -1 ? process.argv[i + 1] : '');
  console.log('✓ ' + r.md);
}
