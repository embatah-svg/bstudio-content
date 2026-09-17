import type { LavorazioneKey } from "@/i18n/config";
import type { LavorazioneContent, lavorazioniPage as ItPage } from "@/i18n/it/lavorazioni";

export const lavorazioniPage: typeof ItPage = {
  metaTitle: "Rohrbearbeitungen auf Transferlinien",
  metaDescription:
    "Bohren, Stanzen, Gewindeschneiden und Kalibrieren von Metallrohren im Dauertakt auf A.M.I.-Transferlinien. Eine Seite pro Bearbeitung.",
  title: "Die Bearbeitungen am Rohr.",
  lede: "Jede Bearbeitung entspricht einer Station der Linie. Sie werden in der von der Teilezeichnung geforderten Reihenfolge kombiniert, ohne manuelles Umspannen zwischen den Arbeitsgängen.",
  fullListNote: "Vollständige Liste der ausgeführten Bearbeitungen (z. B. Entgraten, Schweißen, Montage):",
  fullListTodo: "MIT DEM TECHNISCHEN BÜRO ZU BESTÄTIGEN",
  ctaTitle: "Eine Bearbeitung, die Sie hier nicht finden?",
  ctaText: "Schicken Sie uns die Zeichnung: Wir sagen Ihnen, ob und wie sie in eine Transferlinie passt.",
  detail: {
    what: "Was sie leistet",
    inLine: "Auf der Transferlinie",
    needs: "Was wir von Ihnen brauchen",
    rangesTitle: "Bereiche und Grenzen.",
    rangesLede: "Daten, die vor der Veröffentlichung mit dem technischen Büro zu bestätigen sind.",
    ranges: ["Bearbeitbare Durchmesser und Wandstärken", "Erreichbare Toleranzen", "Beispiel einer Taktzeit"],
    sectorsTitle: "Branchen, in denen wir sie einsetzen.",
    sectorsLede: "Typische Bauteile, die diese Bearbeitung erfordern.",
    metaSuffix: "von Rohren — Transferlinien",
  },
};

export const lavorazioni: Record<LavorazioneKey, LavorazioneContent> = {
  foratura: {
    slug: "bohren",
    name: "Bohren",
    title: "Rohrbohren auf der Transferlinie",
    lede: "Radiale und durchgehende Bohrungen an einer oder mehreren Stationen der Linie, mit eigenen Bearbeitungseinheiten auf der von der Zeichnung geforderten Teilung.",
    cosa: [
      "Einzelne oder mehrere Bohrungen am selben Rohrabschnitt, auch in verschiedenen Ebenen.",
      "Bearbeitungseinheiten mit geregeltem Vorschub, eine je Bohrungsgruppe.",
      "Bohrungslage nach Teilezeichnung, nicht nach Maschinenkatalog.",
    ],
    inLinea: [
      "Das Rohr ist während der Bearbeitung in der Station gespannt: kein manuelles Umspannen des Teils.",
      "Die Bohrzeit liegt innerhalb der Taktzeit der Linie, parallel zu den anderen Stationen.",
      "Späne werden in der Station abgeführt, ohne die folgenden Bearbeitungen zu verunreinigen.",
    ],
    serve: [
      "Teilezeichnung mit Lage, Durchmesser und Toleranz der Bohrungen.",
      "Werkstoff, Durchmesser und Wandstärke des Rohrs.",
      "Geforderte Stückzahl (Teile/Stunde oder Teile/Jahr).",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
  tranciatura: {
    slug: "stanzen",
    name: "Stanzen",
    title: "Spanloses Stanzen von Rohren",
    lede: "Materialabtrag durch Umformung, wo die Teilegeometrie es zulässt: schneller als Bohren und ohne Späne.",
    cosa: [
      "Öffnungen, Langlöcher und Ausklinkungen mit teilespezifischem Stempel und Matrize.",
      "Keine Späne: Die Station bleibt sauber, das Teil braucht kein Innenentgraten.",
      "Anwendbar, wo Wandstärke und Form des Rohrs eine kontrollierte Umformung erlauben.",
    ],
    inLinea: [
      "Stanzwerkzeuge für das einzelne Teil ausgelegt und in der Station austauschbar.",
      "Mit der Taktung synchronisiert: Das Teil kommt bereits gespannt und ausgerichtet an.",
      "Vorab-Machbarkeitsprüfung an der Zeichnung vor dem Angebot.",
    ],
    serve: [
      "Zeichnung mit Geometrie der Öffnungen und Toleranzen.",
      "Werkstoff und Wandstärke des Rohrs, um die Anwendbarkeit des Stanzens zu prüfen.",
      "Erwartete Stückzahlen: Sie beeinflussen Standzeit und Auslegung.",
    ],
    settori: ["automotive", "building"],
  },
  filettatura: {
    slug: "gewindeschneiden",
    name: "Gewindeschneiden",
    title: "Gewindeschneiden am Rohr im Dauertakt",
    lede: "In die Linie integrierte, mit dem Takt synchronisierte Gewindeeinheiten, um Bohrungen und Rohrenden mit Gewinde zu versehen, ohne die Transferlinie zu verlassen.",
    cosa: [
      "Gewinde in radialen Bohrungen, die an vorherigen Stationen erstellt wurden.",
      "Gewinde an Rohrenden, wo die Zeichnung es verlangt.",
      "Gewindeeinheiten mit geregeltem Vorschub- und Rückzugszyklus.",
    ],
    inLinea: [
      "Bohren und Gewindeschneiden erfolgen an aufeinanderfolgenden Stationen derselben Transferlinie.",
      "Kein Umspannen zwischen den beiden Arbeitsgängen: Die Achsen bleiben referenziert.",
      "Eigene Schmierung an der Gewindestation.",
    ],
    serve: [
      "Gewindebezeichnung und nutzbare Tiefe.",
      "Rohrwerkstoff und Wandstärke im Gewindebereich.",
      "Eventuelle Prüfanforderungen (Gut-/Ausschusslehre in der Linie).",
    ],
    settori: ["automotive", "elettrodomestico"],
  },
  calibratura: {
    slug: "kalibrieren",
    name: "Kalibrieren",
    title: "Kalibrieren des Rohrs vor der Bearbeitung",
    lede: "Korrektur von Durchmesser und Rundheit des Rohrrohlings, damit die folgenden Stationen eine stabile Referenz haben.",
    cosa: [
      "Korrektur von Ovalität und Durchmesserschwankungen des ankommenden Rohrs.",
      "Verlässliche Maßreferenz für Bohren, Stanzen und Gewindeschneiden.",
      "Kalibrieren der Enden, wo das Teil mit einem Fitting gefügt wird.",
    ],
    inLinea: [
      "Erste Station nach dem Beladen: Alle folgenden Bearbeitungen arbeiten an einem bereits kalibrierten Rohr.",
      "Kalibrierwerkzeuge auf den Nenndurchmesser des Teils ausgelegt.",
      "Prüfung in der Linie, wo das Lastenheft es verlangt.",
    ],
    serve: [
      "Nenndurchmesser und geforderte Toleranz nach dem Kalibrieren.",
      "Qualität des ankommenden Rohrs (Lieferantentoleranzen).",
      "Eventuelle Bereiche des Teils, die nicht kalibriert werden sollen.",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
};
