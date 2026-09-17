"use client";

import { useState, type FormEvent } from "react";
import {
  FILE_ESTENSIONI,
  LAVORAZIONI_OPZIONI,
  SETTORI_OPZIONI,
  validaFile,
  validaRichiesta,
  type Errori,
  type Richiesta,
} from "@/lib/richiesta";
import { COMPANY } from "@/lib/site";

const field =
  "w-full border-0 border-b border-[rgba(19,26,30,0.4)] bg-transparent px-0 py-3 text-[17px] text-ink focus:border-blue focus:outline-none";
const label = "block font-heading text-[15px] font-bold text-ink";
const errCls = "mt-2 text-[14px] text-[#8a1c1c]";

type Stato = { tipo: "idle" } | { tipo: "invio" } | { tipo: "ok" } | { tipo: "errore"; msg: string };

function leggi(form: FormData): Richiesta {
  const s = (k: string) => String(form.get(k) ?? "");
  return {
    materiale: s("materiale"),
    produttivita: s("produttivita"),
    lavorazioni: form.getAll("lavorazioni").map(String),
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

export default function RichiestaForm() {
  const [errori, setErrori] = useState<Errori>({});
  const [stato, setStato] = useState<Stato>({ tipo: "idle" });

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
    const form = new FormData(formEl);
    const file = form.get("file");
    const e = validaRichiesta(leggi(form));
    const ef = validaFile(file instanceof File ? file : null);
    if (ef) e.file = ef;
    setErrori(e);
    if (Object.keys(e).length > 0) return;

    setStato({ tipo: "invio" });
    try {
      const res = await fetch("/api/richiesta", { method: "POST", body: form });
      const data = (await res.json()) as { ok: boolean; errore?: string; errori?: Errori };
      if (data.ok) {
        setStato({ tipo: "ok" });
        formEl.reset();
      } else {
        if (data.errori) setErrori(data.errori);
        setStato({ tipo: "errore", msg: data.errore ?? "Controllate i campi segnalati." });
      }
    } catch {
      setStato({ tipo: "errore", msg: `Invio non riuscito. Scrivete a ${COMPANY.email}.` });
    }
  }

  if (stato.tipo === "ok") {
    return (
      <div className="border-t-2 border-yellow pt-5">
        <h3 className="text-[23px]">Richiesta ricevuta.</h3>
        <p className="mt-3 text-[#3b4850]">
          L&apos;ufficio tecnico la esamina e vi risponde ai recapiti indicati.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate encType="multipart/form-data" className="grid grid-cols-1 gap-8">
      <div>
        <label htmlFor="file" className={label}>
          Disegno o modello del pezzo
        </label>
        <input id="file" name="file" type="file" accept={FILE_ESTENSIONI.join(",")} className={`${field} border-b-0 pl-0`} />
        <p className="mt-2 text-[14px] text-[#5a6870]">
          PDF, DWG, DXF, STEP o ZIP, max 25 MB. I file sono usati solo per valutare la richiesta;
          su richiesta firmiamo un NDA prima di ricevere qualsiasi documento.
        </p>
        {errori.file && <p className={errCls}>{errori.file}</p>}
      </div>

      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-2">
        <div>
          <label htmlFor="materiale" className={label}>
            Materiale e diametro del tubo
          </label>
          <input id="materiale" name="materiale" className={field} autoComplete="off" />
          {errori.materiale && <p className={errCls}>{errori.materiale}</p>}
        </div>
        <div>
          <label htmlFor="produttivita" className={label}>
            Produttività richiesta (pezzi/ora o pezzi/anno)
          </label>
          <input id="produttivita" name="produttivita" className={field} autoComplete="off" />
          {errori.produttivita && <p className={errCls}>{errori.produttivita}</p>}
        </div>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className={label}>Lavorazioni necessarie</legend>
        <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
          {LAVORAZIONI_OPZIONI.map((l) => (
            <label key={l} className="flex items-center gap-2 text-[16px]">
              <input type="checkbox" name="lavorazioni" value={l} className="h-4 w-4 accent-blue" />
              {l}
            </label>
          ))}
        </div>
        {errori.lavorazioni && <p className={errCls}>{errori.lavorazioni}</p>}
      </fieldset>

      <div>
        <label htmlFor="settore" className={label}>
          Settore
        </label>
        <select id="settore" name="settore" defaultValue="" className={field}>
          <option value="" disabled>
            Selezionate
          </option>
          {SETTORI_OPZIONI.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errori.settore && <p className={errCls}>{errori.settore}</p>}
      </div>

      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-2">
        <div>
          <label htmlFor="azienda" className={label}>
            Azienda
          </label>
          <input id="azienda" name="azienda" className={field} autoComplete="organization" />
          {errori.azienda && <p className={errCls}>{errori.azienda}</p>}
        </div>
        <div>
          <label htmlFor="nome" className={label}>
            Nome e cognome
          </label>
          <input id="nome" name="nome" className={field} autoComplete="name" />
          {errori.nome && <p className={errCls}>{errori.nome}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" className={field} autoComplete="email" />
          {errori.email && <p className={errCls}>{errori.email}</p>}
        </div>
        <div>
          <label htmlFor="telefono" className={label}>
            Telefono
          </label>
          <input id="telefono" name="telefono" type="tel" className={field} autoComplete="tel" />
          {errori.telefono && <p className={errCls}>{errori.telefono}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="messaggio" className={label}>
          Note (facoltativo)
        </label>
        <textarea id="messaggio" name="messaggio" rows={4} className={field} />
      </div>

      <div className="grid gap-3">
        <label className="flex items-start gap-3 text-[15px] text-[#3b4850]">
          <input type="checkbox" name="privacy" className="mt-1 h-4 w-4 accent-blue" />
          <span>
            Ho letto l&apos;
            <a href="/privacy" className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
              informativa privacy
            </a>{" "}
            e acconsento al trattamento dei dati per rispondere alla richiesta.
          </span>
        </label>
        {errori.privacy && <p className={errCls}>{errori.privacy}</p>}
        <label className="flex items-start gap-3 text-[15px] text-[#3b4850]">
          <input type="checkbox" name="nda" className="mt-1 h-4 w-4 accent-blue" />
          <span>Chiedo la firma di un accordo di riservatezza (NDA) prima di inviare i disegni.</span>
        </label>
      </div>

      {stato.tipo === "errore" && (
        <p role="alert" className="border-l-4 border-[#8a1c1c] pl-4 text-[15px] text-[#8a1c1c]">
          {stato.msg}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={stato.tipo === "invio"}
          className="border border-transparent bg-yellow px-[26px] py-[15px] font-heading text-[16px] font-bold text-[#17130a] transition-colors duration-[120ms] hover:bg-[#ffc91f] disabled:opacity-60"
        >
          {stato.tipo === "invio" ? "Invio in corso" : "Invia la richiesta"}
        </button>
      </div>
    </form>
  );
}
