import { NextResponse } from "next/server";
import { validaFile, validaRichiesta, type Richiesta } from "@/lib/richiesta";

export const runtime = "nodejs";

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.slice(0, 2000) : "";
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, errore: "Richiesta non valida." }, { status: 400 });
  }

  const richiesta: Richiesta = {
    materiale: str(form, "materiale"),
    produttivita: str(form, "produttivita"),
    lavorazioni: form.getAll("lavorazioni").filter((v): v is string => typeof v === "string"),
    settore: str(form, "settore"),
    azienda: str(form, "azienda"),
    nome: str(form, "nome"),
    email: str(form, "email"),
    telefono: str(form, "telefono"),
    messaggio: str(form, "messaggio"),
    privacy: form.get("privacy") === "on",
    nda: form.get("nda") === "on",
  };

  const file = form.get("file");
  const errori = validaRichiesta(richiesta);
  const erroreFile = validaFile(file instanceof File ? file : null);
  if (erroreFile) errori.file = erroreFile;
  if (Object.keys(errori).length > 0) {
    return NextResponse.json({ ok: false, errori }, { status: 422 });
  }

  // Inoltro verso il sistema di ricezione dell'azienda (email o storage privato).
  // Gli allegati tecnici non passano da servizi terzi: l'endpoint va configurato
  // con l'azienda prima della messa online.
  const endpoint = process.env.RICHIESTA_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, errore: "Il modulo non è ancora attivo. Scrivete a info@amitransfer.com." },
      { status: 503 }
    );
  }

  const inoltro = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RICHIESTA_TOKEN ?? ""}` },
    body: form,
  });
  if (!inoltro.ok) {
    return NextResponse.json(
      { ok: false, errore: "Invio non riuscito. Riprovate o scrivete a info@amitransfer.com." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
