import { NextResponse } from "next/server";
import { leggiRichiesta, leggiService, validaFile, validaRichiesta, validaService } from "@/lib/richiesta";

export const runtime = "nodejs";

// Risposte con codici: i testi per l'utente vivono nei dizionari del client.
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, codice: "failed" }, { status: 400 });
  }

  const errori =
    form.get("tipo") === "service"
      ? validaService(leggiService(form))
      : validaRichiesta(leggiRichiesta(form));

  if (form.get("tipo") !== "service" && form.get("modalita") !== "nda") {
    const file = form.get("file");
    const erroreFile = validaFile(file instanceof File ? file : null);
    if (erroreFile) errori.file = erroreFile;
  }
  if (Object.keys(errori).length > 0) {
    return NextResponse.json({ ok: false, codice: "fields", errori }, { status: 422 });
  }

  // Inoltro verso il sistema di ricezione dell'azienda (email o storage privato).
  // Gli allegati tecnici non passano da servizi terzi: l'endpoint va configurato
  // con l'azienda prima della messa online.
  const endpoint = process.env.RICHIESTA_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ ok: false, codice: "inactive" }, { status: 503 });
  }

  const inoltro = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RICHIESTA_TOKEN ?? ""}` },
    body: form,
  });
  if (!inoltro.ok) {
    return NextResponse.json({ ok: false, codice: "failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
