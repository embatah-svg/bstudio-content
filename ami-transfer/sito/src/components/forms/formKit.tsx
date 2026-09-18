"use client";

import type { ReactNode } from "react";
import type { Errori } from "@/lib/richiesta";

export const fieldCls =
  "w-full border-0 border-b border-[rgba(19,26,30,0.4)] bg-transparent px-0 py-3 text-[17px] text-ink focus:border-blue focus:outline-none aria-[invalid=true]:border-[#8a1c1c]";
export const labelCls = "block font-heading text-[15px] font-bold text-ink";
export const submitCls =
  "border border-transparent bg-yellow px-[26px] py-[15px] font-heading text-[16px] font-bold text-[#17130a] transition-colors duration-[120ms] hover:bg-[#ffc91f] disabled:opacity-60";

export type Stato = { tipo: "idle" } | { tipo: "invio" } | { tipo: "ok" } | { tipo: "errore"; codice: string };

type FieldProps = {
  id: string;
  label: string;
  errori: Errori;
  messaggi: Record<string, string>;
  children: (a: { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined }) => ReactNode;
};

// Campo con etichetta sempre visibile ed errore inline collegato via aria-describedby.
export function Field({ id, label, errori, messaggi, children }: FieldProps) {
  const codice = errori[id];
  const errId = `${id}-errore`;
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      {children({ id, "aria-invalid": Boolean(codice), "aria-describedby": codice ? errId : undefined })}
      {codice && (
        <p id={errId} className="mt-2 text-[14px] text-[#8a1c1c]">{messaggi[codice]}</p>
      )}
    </div>
  );
}

export function focusPrimoErrore(form: HTMLFormElement) {
  requestAnimationFrame(() => {
    const el = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    el?.focus();
  });
}

export function mailtoFallback(email: string, subject: string, form: FormData) {
  const righe: string[] = [];
  form.forEach((v, k) => {
    if (typeof v === "string" && v && k !== "privacy" && k !== "nda") righe.push(`${k}: ${v}`);
  });
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(righe.join("\n"))}`;
}

export async function invia(form: FormData): Promise<{ ok: boolean; codice?: string; errori?: Errori }> {
  try {
    const res = await fetch("/api/richiesta", { method: "POST", body: form });
    return (await res.json()) as { ok: boolean; codice?: string; errori?: Errori };
  } catch {
    return { ok: false, codice: "failed" };
  }
}
