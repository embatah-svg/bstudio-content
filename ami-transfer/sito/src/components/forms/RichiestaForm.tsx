"use client";

import { useState, type FormEvent } from "react";
import { FILE_ESTENSIONI, leggiRichiesta, validaFile, validaRichiesta, type Errori } from "@/lib/richiesta";
import type { Ui } from "@/i18n/it/ui";

type Props = { t: Ui["form"]; privacyHref: string };

const field =
  "w-full border-0 border-b border-[rgba(19,26,30,0.4)] bg-transparent px-0 py-3 text-[17px] text-ink focus:border-blue focus:outline-none";
const label = "block font-heading text-[15px] font-bold text-ink";
const errCls = "mt-2 text-[14px] text-[#8a1c1c]";

type Codice = keyof Ui["form"]["errors"];
type Stato = { tipo: "idle" } | { tipo: "invio" } | { tipo: "ok" } | { tipo: "errore"; codice: Codice };

export default function RichiestaForm({ t, privacyHref }: Props) {
  const [errori, setErrori] = useState<Errori>({});
  const [stato, setStato] = useState<Stato>({ tipo: "idle" });

  const msg = (campo: keyof Errori) => {
    const c = errori[campo];
    return c ? <p className={errCls}>{t.errors[c]}</p> : null;
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
    const form = new FormData(formEl);
    const file = form.get("file");
    const e = validaRichiesta(leggiRichiesta(form));
    const ef = validaFile(file instanceof File ? file : null);
    if (ef) e.file = ef;
    setErrori(e);
    if (Object.keys(e).length > 0) return;

    setStato({ tipo: "invio" });
    try {
      const res = await fetch("/api/richiesta", { method: "POST", body: form });
      const data = (await res.json()) as { ok: boolean; codice?: Codice; errori?: Errori };
      if (data.ok) {
        setStato({ tipo: "ok" });
        formEl.reset();
      } else {
        if (data.errori) setErrori(data.errori);
        setStato({ tipo: "errore", codice: data.codice ?? "failed" });
      }
    } catch {
      setStato({ tipo: "errore", codice: "failed" });
    }
  }

  if (stato.tipo === "ok") {
    return (
      <div className="border-t-2 border-yellow pt-5">
        <h3 className="text-[23px]">{t.doneTitle}</h3>
        <p className="mt-3 text-[#3b4850]">{t.doneText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate encType="multipart/form-data" className="grid grid-cols-1 gap-8">
      <div>
        <label htmlFor="file" className={label}>{t.file}</label>
        <input id="file" name="file" type="file" accept={FILE_ESTENSIONI.join(",")} className={`${field} border-b-0 pl-0`} />
        <p className="mt-2 text-[14px] text-[#5a6870]">{t.fileHelp}</p>
        {msg("file")}
      </div>

      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-2">
        <div>
          <label htmlFor="materiale" className={label}>{t.material}</label>
          <input id="materiale" name="materiale" className={field} autoComplete="off" />
          {msg("materiale")}
        </div>
        <div>
          <label htmlFor="produttivita" className={label}>{t.productivity}</label>
          <input id="produttivita" name="produttivita" className={field} autoComplete="off" />
          {msg("produttivita")}
        </div>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className={label}>{t.processes}</legend>
        <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
          {t.processOptions.map((l) => (
            <label key={l} className="flex items-center gap-2 text-[16px]">
              <input type="checkbox" name="lavorazioni" value={l} className="h-4 w-4 accent-blue" />
              {l}
            </label>
          ))}
        </div>
        {msg("lavorazioni")}
      </fieldset>

      <div>
        <label htmlFor="settore" className={label}>{t.sector}</label>
        <select id="settore" name="settore" defaultValue="" className={field}>
          <option value="" disabled>{t.select}</option>
          {t.sectorOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {msg("settore")}
      </div>

      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-2">
        <div>
          <label htmlFor="azienda" className={label}>{t.company}</label>
          <input id="azienda" name="azienda" className={field} autoComplete="organization" />
          {msg("azienda")}
        </div>
        <div>
          <label htmlFor="nome" className={label}>{t.name}</label>
          <input id="nome" name="nome" className={field} autoComplete="name" />
          {msg("nome")}
        </div>
        <div>
          <label htmlFor="email" className={label}>{t.email}</label>
          <input id="email" name="email" type="email" className={field} autoComplete="email" />
          {msg("email")}
        </div>
        <div>
          <label htmlFor="telefono" className={label}>{t.phone}</label>
          <input id="telefono" name="telefono" type="tel" className={field} autoComplete="tel" />
          {msg("telefono")}
        </div>
      </div>

      <div>
        <label htmlFor="messaggio" className={label}>{t.notes}</label>
        <textarea id="messaggio" name="messaggio" rows={4} className={field} />
      </div>

      <div className="grid gap-3">
        <label className="flex items-start gap-3 text-[15px] text-[#3b4850]">
          <input type="checkbox" name="privacy" className="mt-1 h-4 w-4 accent-blue" />
          <span>
            {t.privacyA}
            <a href={privacyHref} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">{t.privacyLink}</a>
            {t.privacyB}
          </span>
        </label>
        {msg("privacy")}
        <label className="flex items-start gap-3 text-[15px] text-[#3b4850]">
          <input type="checkbox" name="nda" className="mt-1 h-4 w-4 accent-blue" />
          <span>{t.nda}</span>
        </label>
      </div>

      {stato.tipo === "errore" && (
        <p role="alert" className="border-l-4 border-[#8a1c1c] pl-4 text-[15px] text-[#8a1c1c]">{t.errors[stato.codice]}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={stato.tipo === "invio"}
          className="border border-transparent bg-yellow px-[26px] py-[15px] font-heading text-[16px] font-bold text-[#17130a] transition-colors duration-[120ms] hover:bg-[#ffc91f] disabled:opacity-60"
        >
          {stato.tipo === "invio" ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
