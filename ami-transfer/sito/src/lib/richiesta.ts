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

export type CampoErrore = keyof Richiesta | "file";
export type ErroreCodice =
  | "materiale"
  | "produttivita"
  | "lavorazioni"
  | "settore"
  | "azienda"
  | "nome"
  | "email"
  | "telefono"
  | "privacy"
  | "fileType"
  | "fileSize";

// Gli errori sono codici: i testi vivono nei dizionari per lingua.
export type Errori = Partial<Record<CampoErrore, ErroreCodice>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function leggiRichiesta(form: FormData): Richiesta {
  const s = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v.slice(0, 2000) : "";
  };
  return {
    materiale: s("materiale"),
    produttivita: s("produttivita"),
    lavorazioni: form.getAll("lavorazioni").filter((v): v is string => typeof v === "string"),
    settore: s("settore"),
    azienda: s("azienda"),
    nome: s("nome"),
    email: s("email"),
    telefono: s("telefono"),
    messaggio: s("messaggio"),
    privacy: form.get("privacy") === "on",
    nda: form.get("nda") === "on",
  };
}

export function validaRichiesta(r: Richiesta): Errori {
  const e: Errori = {};
  if (!r.materiale.trim()) e.materiale = "materiale";
  if (!r.produttivita.trim()) e.produttivita = "produttivita";
  if (r.lavorazioni.length === 0) e.lavorazioni = "lavorazioni";
  if (!r.settore) e.settore = "settore";
  if (!r.azienda.trim()) e.azienda = "azienda";
  if (!r.nome.trim()) e.nome = "nome";
  if (!EMAIL.test(r.email.trim())) e.email = "email";
  if (!r.telefono.trim()) e.telefono = "telefono";
  if (!r.privacy) e.privacy = "privacy";
  return e;
}

export function validaFile(file: { name: string; size: number } | null): ErroreCodice | undefined {
  if (!file || file.size === 0) return undefined;
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!FILE_ESTENSIONI.includes(ext)) return "fileType";
  if (file.size > FILE_MAX_BYTES) return "fileSize";
  return undefined;
}
