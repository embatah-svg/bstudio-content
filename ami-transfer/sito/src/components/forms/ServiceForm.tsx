"use client";

import { useState, type FormEvent } from "react";
import { leggiService, validaService, type Errori } from "@/lib/richiesta";
import { COMPANY } from "@/lib/site";
import type { Ui } from "@/i18n/it/ui";
import { Field, fieldCls, focusPrimoErrore, invia, labelCls, mailtoFallback, submitCls, type Stato } from "@/components/forms/formKit";

type Props = { t: Ui["form"]; s: Ui["serviceForm"]; privacyHref: string };

export default function ServiceForm({ t, s, privacyHref }: Props) {
  const [errori, setErrori] = useState<Errori>({});
  const [stato, setStato] = useState<Stato>({ tipo: "idle" });
  const [ultimo, setUltimo] = useState<FormData | null>(null);
  const msg = { ...t.errors, ...s.errors } as Record<string, string>;

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
    const form = new FormData(formEl);
    const e = validaService(leggiService(form));
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

  return (
    <form method="post" action="/api/richiesta" onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-8">
      <input type="hidden" name="tipo" value="service" />
      <div className="grid grid-cols-1 gap-8 min-[620px]:grid-cols-3">
        <Field id="matricola" label={s.serial} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="matricola" className={fieldCls} autoComplete="off" />}
        </Field>
        <Field id="anno" label={s.year} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="anno" inputMode="numeric" className={fieldCls} autoComplete="off" />}
        </Field>
        <Field id="stazione" label={s.station} errori={errori} messaggi={msg}>
          {(a) => <input {...a} name="stazione" className={fieldCls} autoComplete="off" />}
        </Field>
      </div>
      <Field id="problema" label={s.problem} errori={errori} messaggi={msg}>
        {(a) => <textarea {...a} name="problema" rows={4} className={fieldCls} />}
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
            <a href={mailtoFallback(COMPANY.email, s.title, ultimo)} className="mt-2 inline-block border-b border-current no-underline">
              {t.emailFallback}
            </a>
          )}
        </div>
      )}

      <div>
        <button type="submit" disabled={stato.tipo === "invio"} className={submitCls}>
          {stato.tipo === "invio" ? t.sending : s.submit}
        </button>
      </div>
      <p className={`m-0 ${labelCls} font-normal text-[#5a6870]`}>{s.hint}</p>
    </form>
  );
}
