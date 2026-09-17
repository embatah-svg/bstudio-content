export type Settore = {
  slug: string;
  name: string;
  title: string;
  lede: string;
  componenti: string[];
  esigenze: string[];
  lavorazioni: string[];
};

// I tre settori corrispondono a quelli dichiarati pubblicamente dall'azienda
// (Automotive, Building, Home equipments). Esempi di componenti da confermare.
export const SETTORI: Settore[] = [
  {
    slug: "automotive",
    name: "Automotive",
    title: "Linee transfer per componenti automotive in tubo",
    lede:
      "Componenti tubolari su volumi di serie, dove contano tempo ciclo, ripetibilità e tracciabilità del processo.",
    componenti: [
      "Componenti tubolari per impianti di scarico",
      "Tubazioni per climatizzazione",
      "Componenti per sistemi frenanti",
    ],
    esigenze: [
      "Tempo ciclo definito in fase di offerta e verificato al collaudo.",
      "Ripetibilità dimensionale su lotti elevati.",
      "Documentazione di processo per la qualifica fornitore.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  {
    slug: "building",
    name: "Building",
    title: "Linee transfer per il tubo da costruzione",
    lede:
      "Tubo per impianti idrotermosanitari, ponteggi e carpenteria leggera: pezzi semplici, volumi alti, costo pezzo decisivo.",
    componenti: [
      "Tubo per impianti idrotermosanitari",
      "Elementi per ponteggi",
      "Carpenteria leggera in tubo",
    ],
    esigenze: [
      "Costo pezzo basso su grandi volumi.",
      "Linee robuste, con manutenzione semplice e ricambi reperibili.",
      "Cambio formato rapido tra diametri diversi.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  {
    slug: "elettrodomestico",
    name: "Elettrodomestico",
    title: "Linee transfer per scambiatori e gruppi termici",
    lede:
      "Scambiatori di calore, gruppi termici e componenti per il bianco: pezzi che cambiano spesso e linee che devono adattarsi.",
    componenti: [
      "Tubi per scambiatori di calore",
      "Componenti per gruppi termici",
      "Tubazioni per elettrodomestici",
    ],
    esigenze: [
      "Flessibilità su pezzi nuovi senza sostituire la linea.",
      "Logiche PLC modificabili quando cambia il componente.",
      "Controllo di tenuta o dimensionale integrato dove richiesto.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
];

export function getSettore(slug: string) {
  return SETTORI.find((s) => s.slug === slug);
}
