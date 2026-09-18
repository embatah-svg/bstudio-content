import type { SettoreKey } from "@/i18n/config";
import type { SettoreContent, settoriPage as ItPage } from "@/i18n/it/settori";

export const settoriPage: typeof ItPage = {
  metaTitle: "Branchen — Automotive, Bauwesen, Hausgeräte",
  metaDescription:
    "Die Branchen der A.M.I.-Transferlinien: Rohrbauteile für Automotive, Rohre für das Bauwesen, Wärmetauscher und Heizgeräte.",
  title: "Wir beginnen beim Teil, nicht beim Katalog.",
  lede: "Drei Branchen, eine Methode: Wir beginnen bei der Bauteilzeichnung und der geforderten Stückzahl.",
  homeTitle: "Wir beginnen beim Teil, nicht beim Katalog.",
  homeLede: "Wir gehen von der Teilezeichnung und der geforderten Stückzahl aus und bauen die Linie darum herum.",
  detail: {
    components: "Typische Bauteile",
    componentsTodo: "Mit dem Unternehmen bestätigte Beispiele und Bauteilfotos:",
    needs: "Worauf es in dieser Branche ankommt",
    processesTitle: "Wiederkehrende Bearbeitungen.",
    processesLede: "Die Stationen, die wir auf Linien für diese Branche am häufigsten finden.",
    caseTitle: "Ein reales Beispiel.",
    caseLede: "Teil, Aufgabe, erreichte Taktzeit, Jahr.",
    caseTodo: "KUNDENFREIGABE ODER ANONYMISIERTER FALL AUSSTEHEND",
    caseNote:
      "Verträge über Sondermaschinen enthalten fast immer Vertraulichkeitsklauseln: Fälle werden nur mit schriftlicher Freigabe oder anonymisiert veröffentlicht.",
    metaSuffix: "— Transferlinien für Rohre",
  },
};

export const settori: Record<SettoreKey, SettoreContent> = {
  automotive: {
    slug: "automotive",
    name: "Automotive",
    title: "Transferlinien für Rohrbauteile im Automotive-Bereich",
    lede: "Rohrbauteile in Serienstückzahlen, bei denen Taktzeit, Wiederholgenauigkeit und Prozessrückverfolgbarkeit zählen.",
    homeText: "Rohrbauteile für Abgasanlagen, Klimatisierung und Bremssysteme in Serienstückzahlen.",
    componenti: ["Rohrbauteile für Abgasanlagen", "Leitungen für Klimatisierung", "Bauteile für Bremssysteme"],
    esigenze: [
      "Taktzeit im Angebot festgelegt und bei der Abnahme verifiziert.",
      "Maßliche Wiederholgenauigkeit bei großen Losen.",
      "Prozessdokumentation für die Lieferantenqualifizierung.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  building: {
    slug: "bauwesen",
    name: "Bauwesen",
    title: "Transferlinien für Rohre im Bauwesen",
    lede: "Rohre für Sanitär- und Heizungsinstallationen, Gerüste und leichten Stahlbau: einfache Teile, hohe Stückzahlen, entscheidende Stückkosten.",
    homeText: "Rohre für Sanitär- und Heizungsinstallationen, Gerüste und leichten Stahlbau.",
    componenti: ["Rohre für Sanitär- und Heizungsinstallationen", "Gerüstelemente", "Leichter Rohrstahlbau"],
    esigenze: [
      "Niedrige Stückkosten bei großen Mengen.",
      "Robuste Linien mit einfacher Wartung und verfügbaren Ersatzteilen.",
      "Schneller Formatwechsel zwischen verschiedenen Durchmessern.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  elettrodomestico: {
    slug: "hausgeraete",
    name: "Hausgeräte",
    title: "Transferlinien für Wärmetauscher und Heizgeräte",
    lede: "Wärmetauscher, Heizgeräte und Bauteile für die Weiße Ware: Teile, die sich oft ändern, und Linien, die sich anpassen müssen.",
    homeText: "Wärmetauscher, Heizgeräte und Bauteile für die Weiße Ware.",
    componenti: ["Rohre für Wärmetauscher", "Bauteile für Heizgeräte", "Leitungen für Hausgeräte"],
    esigenze: [
      "Flexibilität bei neuen Teilen, ohne die Linie zu ersetzen.",
      "Anpassbare SPS-Logik, wenn sich das Bauteil ändert.",
      "Integrierte Dichtheits- oder Maßprüfung, wo gefordert.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
};
