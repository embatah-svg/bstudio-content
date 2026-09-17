import type { LavorazioneKey, SettoreKey } from "@/i18n/config";

export type LavorazioneContent = {
  slug: string;
  name: string;
  title: string;
  lede: string;
  cosa: string[];
  inLinea: string[];
  serve: string[];
  settori: SettoreKey[];
};

export const lavorazioniPage = {
  metaTitle: "Lavorazioni del tubo in linea transfer",
  metaDescription:
    "Foratura, tranciatura, filettatura e calibratura del tubo metallico eseguite in ciclo continuo su linee transfer A.M.I. Una pagina per ogni lavorazione.",
  title: "Le lavorazioni sul tubo.",
  lede: "Ogni lavorazione corrisponde a una stazione della linea. Si combinano nella sequenza richiesta dal disegno del pezzo, senza riprese manuali tra un'operazione e l'altra.",
  fullListNote: "Elenco completo delle lavorazioni eseguite (es. sbavatura, saldatura, assemblaggio):",
  fullListTodo: "DA CONFERMARE CON L'UFFICIO TECNICO",
  ctaTitle: "Una lavorazione che non vedete qui?",
  ctaText: "Mandateci il disegno: vi diciamo se e come rientra in una linea transfer.",
  detail: {
    what: "Cosa fa",
    inLine: "In linea transfer",
    needs: "Cosa ci serve da voi",
    rangesTitle: "Range e limiti.",
    rangesLede: "Dati da confermare con l'ufficio tecnico prima della pubblicazione.",
    ranges: ["Diametri e spessori gestibili", "Tolleranze ottenibili", "Esempio di tempo ciclo"],
    sectorsTitle: "Settori in cui la usiamo.",
    sectorsLede: "Componenti tipici che richiedono questa lavorazione.",
    metaSuffix: "tubo — Linee transfer",
  },
};

export const lavorazioni: Record<LavorazioneKey, LavorazioneContent> = {
  foratura: {
    slug: "foratura",
    name: "Foratura",
    title: "Foratura del tubo in linea transfer",
    lede: "Fori radiali e passanti eseguiti su una o più stazioni della linea, con unità operative dedicate posizionate sul passo richiesto dal disegno.",
    cosa: [
      "Fori singoli o multipli sullo stesso tratto di tubo, anche su piani diversi.",
      "Unità operative con avanzamento controllato, una per ogni gruppo di fori.",
      "Posizione dei fori definita dal disegno del pezzo, non dal catalogo della macchina.",
    ],
    inLinea: [
      "Il tubo è bloccato in stazione durante la lavorazione: nessuna ripresa manuale del pezzo.",
      "Il tempo di foratura rientra nel tempo ciclo della linea, in parallelo alle altre stazioni.",
      "Truciolo evacuato in stazione, senza contaminare le lavorazioni successive.",
    ],
    serve: [
      "Disegno del pezzo con posizione, diametro e tolleranza dei fori.",
      "Materiale, diametro e spessore del tubo.",
      "Produttività richiesta (pezzi/ora o pezzi/anno).",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
  tranciatura: {
    slug: "tranciatura",
    name: "Tranciatura",
    title: "Tranciatura del tubo senza truciolo",
    lede: "Asportazione di materiale per deformazione dove la geometria del pezzo lo consente: più veloce della foratura e senza truciolo da gestire.",
    cosa: [
      "Aperture, asole e intagli ottenuti con punzone e matrice dedicati al pezzo.",
      "Nessun truciolo: la stazione resta pulita e il pezzo non richiede sbavatura interna.",
      "Applicabile dove spessore e forma del tubo permettono la deformazione controllata.",
    ],
    inLinea: [
      "Utensili di tranciatura progettati sul singolo pezzo e sostituibili in stazione.",
      "Sincronizzata con l'indexaggio: il pezzo arriva già bloccato e orientato.",
      "Verifica preliminare di fattibilità sul disegno prima dell'offerta.",
    ],
    serve: [
      "Disegno con geometria delle aperture e tolleranze.",
      "Materiale e spessore del tubo, per verificare che la tranciatura sia applicabile.",
      "Volumi previsti: incidono sulla durata utensili e sul dimensionamento.",
    ],
    settori: ["automotive", "building"],
  },
  filettatura: {
    slug: "filettatura",
    name: "Filettatura",
    title: "Filettatura del tubo in ciclo continuo",
    lede: "Gruppi maschiatori integrati nella linea e sincronizzati con il ciclo di indexaggio, per filettare fori e estremità senza uscire dal transfer.",
    cosa: [
      "Filettatura di fori radiali già eseguiti nelle stazioni precedenti.",
      "Filettatura di estremità del tubo, dove il disegno lo richiede.",
      "Gruppi maschiatori con controllo del ciclo di avanzamento e ritorno.",
    ],
    inLinea: [
      "La foratura e la filettatura avvengono su stazioni consecutive dello stesso transfer.",
      "Nessuna ripresa del pezzo tra le due operazioni: gli assi restano riferiti.",
      "Lubrificazione dedicata alla stazione di maschiatura.",
    ],
    serve: [
      "Designazione della filettatura e profondità utile.",
      "Materiale del tubo e spessore di parete nella zona filettata.",
      "Eventuali requisiti di controllo (passa/non passa in linea).",
    ],
    settori: ["automotive", "elettrodomestico"],
  },
  calibratura: {
    slug: "calibratura",
    name: "Calibratura",
    title: "Calibratura del tubo prima delle lavorazioni",
    lede: "Ripresa del diametro e della circolarità del tubo grezzo, per dare alle stazioni successive un riferimento stabile.",
    cosa: [
      "Correzione dell'ovalizzazione e delle variazioni di diametro del tubo in arrivo.",
      "Riferimento dimensionale affidabile per foratura, tranciatura e filettatura.",
      "Calibratura di estremità dove il pezzo deve accoppiarsi con un raccordo.",
    ],
    inLinea: [
      "Prima stazione utile dopo il carico: tutte le lavorazioni successive lavorano su un tubo già calibrato.",
      "Utensili di calibratura dimensionati sul diametro nominale del pezzo.",
      "Controllo in linea dove richiesto dal capitolato.",
    ],
    serve: [
      "Diametro nominale e tolleranza richiesta dopo calibratura.",
      "Qualità del tubo in arrivo (tolleranze del fornitore).",
      "Eventuali zone del pezzo da lasciare non calibrate.",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
};
