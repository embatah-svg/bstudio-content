export const FILE_ESTENSIONI = [".pdf", ".dwg", ".dxf", ".step", ".stp", ".zip"];
export const FILE_MAX_BYTES = 25 * 1024 * 1024;

export type Contatto = {
  azienda: string;
  nome: string;
  email: string;
  telefono: string;
  privacy: boolean;
};

export type Richiesta = Contatto & {
  modalita: "allego" | "nda";
  materiale: string;
  produttivita: string;
  lavorazioni: string[];
  settore: string;
  messaggio: string;
};

export type RichiestaService = Contatto & {
  matricola: string;
  anno: string;
  stazione: string;
  problema: string;
};

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
  | "fileSize"
  | "matricola"
  | "problema";

// Gli errori sono codici: i testi vivono nei dizionari per lingua.
export type Errori = Partial<Record<string, ErroreCodice>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.slice(0, 2000) : "";
}

function leggiContatto(form: FormData): Contatto {
  return {
    azienda: str(form, "azienda"),
    nome: str(form, "nome"),
    email: str(form, "email"),
    telefono: str(form, "telefono"),
    privacy: form.get("privacy") === "on",
  };
}

function validaContatto(c: Contatto): Errori {
  const e: Errori = {};
  if (!c.azienda.trim()) e.azienda = "azienda";
  if (!c.nome.trim()) e.nome = "nome";
  if (!EMAIL.test(c.email.trim())) e.email = "email";
  if (!c.telefono.trim()) e.telefono = "telefono";
  if (!c.privacy) e.privacy = "privacy";
  return e;
}

export function leggiRichiesta(form: FormData): Richiesta {
  return {
    ...leggiContatto(form),
    modalita: str(form, "modalita") === "nda" ? "nda" : "allego",
    materiale: str(form, "materiale"),
    produttivita: str(form, "produttivita"),
    lavorazioni: form.getAll("lavorazioni").filter((v): v is string => typeof v === "string"),
    settore: str(form, "settore"),
    messaggio: str(form, "messaggio"),
  };
}

export function validaRichiesta(r: Richiesta): Errori {
  const e = validaContatto(r);
  if (!r.materiale.trim()) e.materiale = "materiale";
  if (!r.produttivita.trim()) e.produttivita = "produttivita";
  if (r.lavorazioni.length === 0) e.lavorazioni = "lavorazioni";
  return e;
}

export function leggiService(form: FormData): RichiestaService {
  return {
    ...leggiContatto(form),
    matricola: str(form, "matricola"),
    anno: str(form, "anno"),
    stazione: str(form, "stazione"),
    problema: str(form, "problema"),
  };
}

export function validaService(r: RichiestaService): Errori {
  const e = validaContatto(r);
  if (!r.matricola.trim()) e.matricola = "matricola";
  if (!r.problema.trim()) e.problema = "problema";
  return e;
}

export function validaFile(file: { name: string; size: number } | null): ErroreCodice | undefined {
  if (!file || file.size === 0) return undefined;
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!FILE_ESTENSIONI.includes(ext)) return "fileType";
  if (file.size > FILE_MAX_BYTES) return "fileSize";
  return undefined;
}
