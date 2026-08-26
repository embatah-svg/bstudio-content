#!/usr/bin/env node
/**
 * Signature Mobile Detailing — Platzhalter in echte Daten umschreiben.
 *
 *   1. Unten die Werte in DATEN ausfüllen (nur die, die man kennt).
 *   2. `node apply-data.mjs` im Ordner ausführen (--dry-run zeigt nur an, was passieren würde).
 *
 * Echt aus dem Instagram-Profil übernommen und deshalb NICHT hier drin:
 * WhatsApp-Link, Instagram-Handle, Leistungen, Positionierung „mobil, schweizweit".
 */

import { readFileSync, writeFileSync } from "node:fs";

/* ------------------------------------------------------------------ DATEN */
const DATEN = {
  email:       "info@signature-mobile-detailing.ch", // echte Geschäfts-E-Mail
  whatsappUrl: "https://wa.me/qr/DLJWM4OPHJW2A1",    // aus dem Profil; oder https://wa.me/41XXXXXXXXX
  formspreeId: "YOUR_FORM_ID"                        // Form-ID von formspree.io
};
/* ------------------------------------------------------------------------ */

const PLATZHALTER = {
  email:       "info@signature-mobile-detailing.ch",
  whatsappUrl: "https://wa.me/qr/DLJWM4OPHJW2A1",
  formspreeId: "YOUR_FORM_ID"
};

const dryRun = process.argv.includes("--dry-run");
const datei = new URL("./index.html", import.meta.url);
let html = readFileSync(datei, "utf8");
let geaendert = 0;
const offen = [];

const ersetze = (alt, neu, label) => {
  if (!neu || neu === alt) { offen.push(label); return; }
  const treffer = html.split(alt).length - 1;
  if (treffer === 0) return;
  html = html.split(alt).join(neu);
  geaendert += treffer;
  console.log(`  ✓ ${label.padEnd(14)} ${treffer}× → ${neu}`);
};

console.log("\nSignature Mobile Detailing — Daten einsetzen\n");

ersetze(PLATZHALTER.email,       DATEN.email,       "E-Mail");
ersetze(PLATZHALTER.whatsappUrl, DATEN.whatsappUrl, "WhatsApp");
ersetze(PLATZHALTER.formspreeId, DATEN.formspreeId, "Formspree-ID");

if (offen.length) console.log(`\n  ⚠ noch Platzhalter: ${offen.join(", ")}`);
console.log("  ℹ von Hand prüfen: Preise, Impressum-Angaben, Kundenstimmen, Einsatzgebiet-Liste");

if (dryRun) {
  console.log(`\nProbelauf — nichts geschrieben (${geaendert} Ersetzungen möglich).\n`);
} else if (geaendert) {
  writeFileSync(datei, html, "utf8");
  console.log(`\nFertig: ${geaendert} Stellen in index.html aktualisiert.\n`);
} else {
  console.log("\nNichts zu tun — die Werte in DATEN sind noch die Platzhalter.\n");
}
