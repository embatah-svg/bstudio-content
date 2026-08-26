#!/usr/bin/env node
/**
 * Signature M Detailing — Platzhalter in echte Kundendaten umschreiben.
 *
 *   1. Unten die Werte in DATEN ausfüllen (nur die, die man kennt).
 *   2. `node apply-data.mjs` im Ordner ausführen (--dry-run zeigt nur an, was passieren würde).
 *
 * Ersetzt wird in index.html: Telefon, WhatsApp, E-Mail, Adresse, Region,
 * Google-Maps-Standort und die Formspree-Form-ID.
 */

import { readFileSync, writeFileSync } from "node:fs";

/* ------------------------------------------------------------------ DATEN */
const DATEN = {
  telefonAnzeige: "+41 XX XXX XX XX",   // wie es auf der Seite steht
  telefonLink:    "+41000000000",        // tel:-Link, ohne Leerzeichen
  whatsapp:       "41000000000",         // wa.me/<Nummer>, ohne + und Leerzeichen
  email:          "info@signature-m-detailing.ch",
  strasse:        "Musterstrasse 00",
  plz:            "0000",
  ort:            "Ort",
  region:         "Region Ort",          // Hero-Zeile: „… · Region Ort“
  formspreeId:    "YOUR_FORM_ID"         // Form-ID von formspree.io
};
/* ------------------------------------------------------------------------ */

const PLATZHALTER = {
  telefonAnzeige: "+41 XX XXX XX XX",
  telefonLink:    "+41000000000",
  whatsapp:       "41000000000",
  email:          "info@signature-m-detailing.ch",
  strasse:        "Musterstrasse 00",
  plz:            "0000",
  ort:            "Ort",
  region:         "Region Ort",
  formspreeId:    "YOUR_FORM_ID"
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
  console.log(`  ✓ ${label.padEnd(16)} ${treffer}× → ${neu}`);
};

console.log("\nSignature M Detailing — Daten einsetzen\n");

// Reihenfolge beachten: der lange Telefon-Link zuerst, sonst greift die kurze
// WhatsApp-Nummer in „+41000000000“ mit.
ersetze(PLATZHALTER.telefonLink,    DATEN.telefonLink,    "Telefon-Link");
ersetze(PLATZHALTER.telefonAnzeige, DATEN.telefonAnzeige, "Telefon");
ersetze(`wa.me/${PLATZHALTER.whatsapp}`, `wa.me/${DATEN.whatsapp}`, "WhatsApp");
ersetze(PLATZHALTER.email,          DATEN.email,          "E-Mail");
ersetze(PLATZHALTER.strasse,        DATEN.strasse,        "Strasse");
ersetze(`${PLATZHALTER.plz} ${PLATZHALTER.ort}`, `${DATEN.plz} ${DATEN.ort}`, "PLZ / Ort");
ersetze(`"postalCode": "${PLATZHALTER.plz}"`,       `"postalCode": "${DATEN.plz}"`,       "PLZ (Schema)");
ersetze(`"addressLocality": "${PLATZHALTER.ort}"`,  `"addressLocality": "${DATEN.ort}"`,  "Ort (Schema)");
ersetze(PLATZHALTER.region,         DATEN.region,         "Region");
ersetze(PLATZHALTER.formspreeId,    DATEN.formspreeId,    "Formspree-ID");

// Google-Maps-Karte auf die echte Adresse setzen
if (DATEN.strasse !== PLATZHALTER.strasse || DATEN.ort !== PLATZHALTER.ort) {
  const adresse = encodeURIComponent(`${DATEN.strasse}, ${DATEN.plz} ${DATEN.ort}, Schweiz`);
  html = html.replace("maps?q=Schweiz&output=embed", `maps?q=${adresse}&output=embed`);
  console.log("  ✓ Karte            1× → " + adresse);
  geaendert++;
} else {
  offen.push("Karte");
}

if (offen.length) console.log(`\n  ⚠ noch Platzhalter: ${offen.join(", ")}`);

if (dryRun) {
  console.log(`\nProbelauf — nichts geschrieben (${geaendert} Ersetzungen möglich).\n`);
} else if (geaendert) {
  writeFileSync(datei, html, "utf8");
  console.log(`\nFertig: ${geaendert} Stellen in index.html aktualisiert.\n`);
} else {
  console.log("\nNichts zu tun — die Werte in DATEN sind noch die Platzhalter.\n");
}
