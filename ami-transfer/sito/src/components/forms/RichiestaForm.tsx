"use client";

import { useState, type FormEvent } from "react";
import { FILE_ESTENSIONI, leggiRichiesta, validaFile, validaRichiesta, type Errori } from "@/lib/richiesta";
import { COMPANY } from "@/lib/site";
import type { Ui } from "@/i18n/it/ui";
import { Field, fieldCls, focusPrimoErrore, invia, labelCls, mailtoFallback, submitCls, type Stato } from "@/components/forms/formKit";

type Props = { t: Ui["form"]; privacyHref: string };

export default function RichiestaForm({ t, privacyHref }: Props) {
  const [errori, setErrori] = useState<Errori>({});
  const [stato, setStato] = useState<Stato>({ tipo: "idle" });
  const [modalita, setModalita] = useState<"allego" | "nda">("allego");
  const [ultimo, setUltimo] = useState<FormData | null>(null);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
    const form = new FormData(formEl);
    const e = validaRichiesta(leggiRichiesta(form));
    if (modalita === "allego") {
      const file = form.get("file");
      const ef = validaFile(file instanceof File ? file : null);
      if (ef) e.file = ef;
    }
    setErrori(e);
    if (Object.keys(e).length > 0) {
      focusPrimoErrore(formEl);
      return;
    }

    setStato({ tipo: "invio" });
    setUltimo(form);
    const data = await invia(form);
    if (data.ok) {
      setStato({ tipo: "ok" });
      formEl.reset();
    } else {
      if (data.errori) setErrori(data.errori);
      setStato({ tipo: "errore", codice: data.codice ?? "failed" });
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

  const msg = t.errors as Record<string, string>;

  return (
    <form method="post" action="/api/richiesta" encType="multipart/form-data" onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-8">
      <fieldset className="m-0 border-0 p-0">
        <legend className={labelCls}>{t.mode}</legend>
        <div className="mt-3 grid gap-3">
          {(["allego", "nda"] as const).map((m) => (
            <label key={m} className="flex items-start gap-3 text-[16px]">
              <input type="radio" name="modalita" value={m} checked={modalita === m} onChange={() => setModalita(m)} className="mt-1 h-4 w-4 accent-blue" />
              <span>{m === "allego" ? t.modeAttach : t.modeNda}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {modalita === "allego" && (
        <Field id="file" label={t.file} errori={errori} messaggi={msg}>
          {(a) => (
            <>
              <input {...a} name="file" type="file" accept={FILE_ESTENSIONI.join(",")} className={`${fieldCls} border-b-0 pl-0`} />
              <p className="mt-2 text-[14px] text-[#5a6870]">{t.fileHelp}</p>
            </>
          )}
        </Field>
      )}

      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-2">
        <Field id="materiale" label={t.material} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="materiale" className={fieldCls} autoComplete="off" />}
        </Field>
        <Field id="produttivita" label={t.productivity} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="produttivita" className={fieldCls} autoComplete="off" />}
        </Field>
      </div>

      <fieldset className="m-0 border-0 p-0" aria-invalid={Boolean(errori.lavorazioni)}>
        <legend className={labelCls}>{t.processes}</legend>
        <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
          {t.processOptions.map((l) => (
            <label key={l} className="flex items-center gap-2 text-[16px]">
              <input type="checkbox" name="lavorazioni" value={l} className="h-4 w-4 accent-blue" />
              {l}
            </label>
          ))}
        </div>
        {errori.lavorazioni && <p className="mt-2 text-[14px] text-[#8a1c1c]">{msg[errori.lavorazioni]}</p>}
      </fieldset>

      <Field id="settore" label={t.sector} errori={errori} messaggi={msg}>
        {(a) => (
          <select {...a} name="settore" defaultValue="" className={fieldCls}>
            <option value="">{t.select}</option>
            {t.sectorOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}
      </Field>

      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-2">
        <Field id="azienda" label={t.company} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="azienda" className={fieldCls} autoComplete="organization" />}
        </Field>
        <Field id="nome" label={t.name} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="nome" className={fieldCls} autoComplete="name" />}
        </Field>
        <Field id="email" label={t.email} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="email" type="email" className={fieldCls} autoComplete="email" />}
        </Field>
        <Field id="telefono" label={t.phone} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="telefono" type="tel" className={fieldCls} autoComplete="tel" />}
        </Field>
      </div>

      <div>
        <label htmlFor="messaggio" className={labelCls}>{t.notes}</label>
        <textarea id="messaggio" name="messaggio" rows={4} className={fieldCls} />
      </div>

      <div className="grid gap-3">
        <label className="flex items-start gap-3 text-[15px] text-[#3b4850]">
          <input type="checkbox" name="privacy" aria-invalid={Boolean(errori.privacy)} className="mt-1 h-4 w-4 accent-blue" />
          <span>
            {t.privacyA}
            <a href={privacyHref} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">{t.privacyLink}</a>
            {t.privacyB}
          </span>
        </label>
        {errori.privacy && <p className="text-[14px] text-[#8a1c1c]">{msg[errori.privacy]}</p>}
      </div>

      {stato.tipo === "errore" && (
        <div role="alert" className="border-l-4 border-[#8a1c1c] pl-4 text-[15px] text-[#8a1c1c]">
          <p className="m-0">{msg[stato.codice]}</p>
          {ultimo && (
            <a href={mailtoFallback(COMPANY.email, t.title, ultimo)} className="mt-2 inline-block border-b border-current no-underline">
              {t.emailFallback}
            </a>
          )}
        </div>
      )}

      <div>
        <button type="submit" disabled={stato.tipo === "invio"} className={submitCls}>
          {stato.tipo === "invio" ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
