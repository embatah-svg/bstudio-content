import type { LavorazioneKey, SettoreKey } from "@/i18n/config";

export type SettoreContent = {
  slug: string;
  name: string;
  title: string;
  lede: string;
  homeText: string;
  componenti: string[];
  esigenze: string[];
  lavorazioni: LavorazioneKey[];
};

export const settoriPage = {
  metaTitle: "Settori — Automotive, building, elettrodomestico",
  metaDescription:
    "I settori in cui lavorano le linee transfer A.M.I.: componenti automotive in tubo, tubo da costruzione, scambiatori e gruppi termici.",
  title: "Partiamo dal pezzo, non dal catalogo.",
  lede: "Tre settori dichiarati, un metodo solo: si parte dal disegno del componente e dalla produttività richiesta.",
  homeTitle: "Partiamo dal pezzo, non dal catalogo.",
  homeLede: "Partiamo dal disegno del pezzo e dalla produttività richiesta, e costruiamo la linea intorno a quelli.",
  detail: {
    components: "Componenti tipici",
    componentsTodo: "Esempi verificati con l'azienda e foto dei componenti:",
    needs: "Cosa conta in questo settore",
    processesTitle: "Lavorazioni ricorrenti.",
    processesLede: "Le stazioni che troviamo più spesso nelle linee per questo settore.",
    caseTitle: "Un caso reale.",
    caseLede: "Pezzo, problema, tempo ciclo ottenuto, anno.",
    caseTodo: "IN ATTESA DI AUTORIZZAZIONE CLIENTE O CASO ANONIMIZZATO",
    caseNote:
      "I contratti su macchine speciali contengono quasi sempre clausole di riservatezza: i casi vengono pubblicati solo con autorizzazione scritta o in forma anonimizzata.",
    metaSuffix: "— Linee transfer per tubo",
  },
};

export const settori: Record<SettoreKey, SettoreContent> = {
  automotive: {
    slug: "automotive",
    name: "Automotive",
    title: "Linee transfer per componenti automotive in tubo",
    lede: "Componenti tubolari su volumi di serie, dove contano tempo ciclo, ripetibilità e tracciabilità del processo.",
    homeText: "Componenti tubolari per impianti di scarico, climatizzazione e sistemi frenanti, su volumi di serie.",
    componenti: ["Componenti tubolari per impianti di scarico", "Tubazioni per climatizzazione", "Componenti per sistemi frenanti"],
    esigenze: [
      "Tempo ciclo definito in fase di offerta e verificato al collaudo.",
      "Ripetibilità dimensionale su lotti elevati.",
      "Documentazione di processo per la qualifica fornitore.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  building: {
    slug: "building",
    name: "Building",
    title: "Linee transfer per il tubo da costruzione",
    lede: "Tubo per impianti idrotermosanitari, ponteggi e carpenteria leggera: pezzi semplici, volumi alti, costo pezzo decisivo.",
    homeText: "Tubo per impianti idrotermosanitari, ponteggi e carpenteria leggera.",
    componenti: ["Tubo per impianti idrotermosanitari", "Elementi per ponteggi", "Carpenteria leggera in tubo"],
    esigenze: [
      "Costo pezzo basso su grandi volumi.",
      "Linee robuste, con manutenzione semplice e ricambi reperibili.",
      "Cambio formato rapido tra diametri diversi.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  elettrodomestico: {
    slug: "elettrodomestico",
    name: "Elettrodomestico",
    title: "Linee transfer per scambiatori e gruppi termici",
    lede: "Scambiatori di calore, gruppi termici e componenti per il bianco: pezzi che cambiano spesso e linee che devono adattarsi.",
    homeText: "Scambiatori di calore, gruppi termici e componenti per il bianco.",
    componenti: ["Tubi per scambiatori di calore", "Componenti per gruppi termici", "Tubazioni per elettrodomestici"],
    esigenze: [
      "Flessibilità su pezzi nuovi senza sostituire la linea.",
      "Logiche PLC modificabili quando cambia il componente.",
      "Controllo di tenuta o dimensionale integrato dove richiesto.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
};
