export const LAVORAZIONI_OPZIONI = [
  "Calibratura",
  "Foratura",
  "Tranciatura",
  "Filettatura",
  "Altro",
] as const;

export const SETTORI_OPZIONI = ["Automotive", "Building", "Elettrodomestico", "Altro"] as const;

export const FILE_ESTENSIONI = [".pdf", ".dwg", ".dxf", ".step", ".stp", ".zip"];
export const FILE_MAX_BYTES = 25 * 1024 * 1024;

export type Richiesta = {
  materiale: string;
  produttivita: string;
  lavorazioni: string[];
  settore: string;
  azienda: string;
  nome: string;
  email: string;
  telefono: string;
  messaggio: string;
  privacy: boolean;
  nda: boolean;
};

export type Errori = Partial<Record<keyof Richiesta | "file", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validaRichiesta(r: Richiesta): Errori {
  const e: Errori = {};
  if (!r.materiale.trim()) e.materiale = "Indicate materiale e diametro del tubo.";
  if (!r.produttivita.trim()) e.produttivita = "Indicate la produttività richiesta.";
  if (r.lavorazioni.length === 0) e.lavorazioni = "Selezionate almeno una lavorazione.";
  if (!r.settore) e.settore = "Selezionate il settore.";
  if (!r.azienda.trim()) e.azienda = "Indicate l'azienda.";
  if (!r.nome.trim()) e.nome = "Indicate il vostro nome.";
  if (!EMAIL.test(r.email.trim())) e.email = "Inserite un indirizzo email valido.";
  if (!r.telefono.trim()) e.telefono = "Indicate un telefono per essere richiamati.";
  if (!r.privacy) e.privacy = "Serve il consenso al trattamento dei dati.";
  return e;
}

export function validaFile(file: { name: string; size: number } | null): string | undefined {
  if (!file || file.size === 0) return undefined;
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!FILE_ESTENSIONI.includes(ext)) return `Formati accettati: ${FILE_ESTENSIONI.join(", ")}.`;
  if (file.size > FILE_MAX_BYTES) return "Il file supera i 25 MB.";
  return undefined;
}
