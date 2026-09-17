import type { Metadata } from "next";
import type { LavorazioneKey, SectionKey, SettoreKey } from "@/i18n/config";
import { alternates, type Dictionary } from "@/i18n";
import { pageTitle } from "@/lib/site";

export function sectionMetadata(d: Dictionary, key: SectionKey): Metadata {
  const p = d.pages;
  const map: Record<SectionKey, { title: string; description?: string; noindex?: boolean }> = {
    azienda: { title: p.azienda.metaTitle, description: p.azienda.metaDescription },
    "linee-transfer": { title: p.lineeTransfer.metaTitle, description: p.lineeTransfer.metaDescription },
    lavorazioni: { title: d.lavorazioniPage.metaTitle, description: d.lavorazioniPage.metaDescription },
    settori: { title: d.settoriPage.metaTitle, description: d.settoriPage.metaDescription },
    "come-lavoriamo": { title: p.comeLavoriamo.metaTitle, description: p.comeLavoriamo.metaDescription },
    service: { title: p.service.metaTitle, description: p.service.metaDescription },
    contatti: { title: p.contatti.metaTitle, description: p.contatti.metaDescription },
    "lavora-con-noi": { title: p.lavoraConNoi.metaTitle, description: p.lavoraConNoi.metaDescription },
    "note-legali": { title: p.noteLegali.metaTitle, noindex: true },
    privacy: { title: p.privacy.metaTitle, noindex: true },
  };
  const m = map[key];
  return {
    title: pageTitle(m.title),
    description: m.description,
    alternates: alternates(key),
    robots: m.noindex ? { index: false } : undefined,
  };
}

export function lavorazioneMetadata(d: Dictionary, key: LavorazioneKey): Metadata {
  const l = d.lavorazioni[key];
  return {
    title: pageTitle(`${l.name} ${d.lavorazioniPage.detail.metaSuffix}`),
    description: l.lede,
    alternates: alternates("lavorazioni", { type: "lavorazioni", key }),
  };
}

export function settoreMetadata(d: Dictionary, key: SettoreKey): Metadata {
  const s = d.settori[key];
  return {
    title: pageTitle(`${s.name} ${d.settoriPage.detail.metaSuffix}`),
    description: s.lede,
    alternates: alternates("settori", { type: "settori", key }),
  };
}
