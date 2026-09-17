import { DEFAULT_LOCALE, LOCALES, type LavorazioneKey, type Locale, type SectionKey, type SettoreKey } from "@/i18n/config";
import { routes as itRoutes, ui as itUi, type Ui } from "@/i18n/it/ui";
import { pages as itPages, type Pages } from "@/i18n/it/pages";
import { lavorazioni as itLav, lavorazioniPage as itLavPage, type LavorazioneContent } from "@/i18n/it/lavorazioni";
import { settori as itSet, settoriPage as itSetPage, type SettoreContent } from "@/i18n/it/settori";
import * as enUi from "@/i18n/en/ui";
import * as enPages from "@/i18n/en/pages";
import * as enLav from "@/i18n/en/lavorazioni";
import * as enSet from "@/i18n/en/settori";
import * as deUi from "@/i18n/de/ui";
import * as dePages from "@/i18n/de/pages";
import * as deLav from "@/i18n/de/lavorazioni";
import * as deSet from "@/i18n/de/settori";
import * as frUi from "@/i18n/fr/ui";
import * as frPages from "@/i18n/fr/pages";
import * as frLav from "@/i18n/fr/lavorazioni";
import * as frSet from "@/i18n/fr/settori";
import * as esUi from "@/i18n/es/ui";
import * as esPages from "@/i18n/es/pages";
import * as esLav from "@/i18n/es/lavorazioni";
import * as esSet from "@/i18n/es/settori";
import * as ptUi from "@/i18n/pt/ui";
import * as ptPages from "@/i18n/pt/pages";
import * as ptLav from "@/i18n/pt/lavorazioni";
import * as ptSet from "@/i18n/pt/settori";

export type Dictionary = {
  locale: Locale;
  routes: Record<SectionKey, string>;
  ui: Ui;
  pages: Pages;
  lavorazioniPage: typeof itLavPage;
  lavorazioni: Record<LavorazioneKey, LavorazioneContent>;
  settoriPage: typeof itSetPage;
  settori: Record<SettoreKey, SettoreContent>;
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  it: { locale: "it", routes: itRoutes, ui: itUi, pages: itPages, lavorazioniPage: itLavPage, lavorazioni: itLav, settoriPage: itSetPage, settori: itSet },
  en: { locale: "en", routes: enUi.routes, ui: enUi.ui, pages: enPages.pages, lavorazioniPage: enLav.lavorazioniPage, lavorazioni: enLav.lavorazioni, settoriPage: enSet.settoriPage, settori: enSet.settori },
  de: { locale: "de", routes: deUi.routes, ui: deUi.ui, pages: dePages.pages, lavorazioniPage: deLav.lavorazioniPage, lavorazioni: deLav.lavorazioni, settoriPage: deSet.settoriPage, settori: deSet.settori },
  fr: { locale: "fr", routes: frUi.routes, ui: frUi.ui, pages: frPages.pages, lavorazioniPage: frLav.lavorazioniPage, lavorazioni: frLav.lavorazioni, settoriPage: frSet.settoriPage, settori: frSet.settori },
  es: { locale: "es", routes: esUi.routes, ui: esUi.ui, pages: esPages.pages, lavorazioniPage: esLav.lavorazioniPage, lavorazioni: esLav.lavorazioni, settoriPage: esSet.settoriPage, settori: esSet.settori },
  pt: { locale: "pt", routes: ptUi.routes, ui: ptUi.ui, pages: ptPages.pages, lavorazioniPage: ptLav.lavorazioniPage, lavorazioni: ptLav.lavorazioni, settoriPage: ptSet.settoriPage, settori: ptSet.settori },
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** URL di una sezione (e opzionalmente di una pagina figlia) in una lingua. */
export function href(locale: Locale, section?: SectionKey, child?: { type: "lavorazioni" | "settori"; key: string }): string {
  const d = getDictionary(locale);
  if (!section) return `/${locale}`;
  let path = `/${locale}/${d.routes[section]}`;
  if (child) {
    const item =
      child.type === "lavorazioni"
        ? d.lavorazioni[child.key as LavorazioneKey]
        : d.settori[child.key as SettoreKey];
    if (item) path += `/${item.slug}`;
  }
  return path;
}

/** Risolve il segmento URL di una lingua nella chiave di sezione. */
export function sectionFromSlug(locale: Locale, slug: string): SectionKey | undefined {
  const d = getDictionary(locale);
  return (Object.keys(d.routes) as SectionKey[]).find((k) => d.routes[k] === slug);
}

export function lavorazioneFromSlug(locale: Locale, slug: string): LavorazioneKey | undefined {
  const d = getDictionary(locale);
  return (Object.keys(d.lavorazioni) as LavorazioneKey[]).find((k) => d.lavorazioni[k].slug === slug);
}

export function settoreFromSlug(locale: Locale, slug: string): SettoreKey | undefined {
  const d = getDictionary(locale);
  return (Object.keys(d.settori) as SettoreKey[]).find((k) => d.settori[k].slug === slug);
}

/** Mappa compatta degli slug per lingua, serializzabile verso i componenti client. */
export type SlugMap = {
  sections: Record<Locale, Record<SectionKey, string>>;
  lavorazioni: Record<Locale, Record<LavorazioneKey, string>>;
  settori: Record<Locale, Record<SettoreKey, string>>;
};

export function buildSlugMap(): SlugMap {
  const map = { sections: {}, lavorazioni: {}, settori: {} } as SlugMap;
  for (const l of LOCALES) {
    const d = getDictionary(l);
    map.sections[l] = d.routes;
    map.lavorazioni[l] = Object.fromEntries(
      (Object.keys(d.lavorazioni) as LavorazioneKey[]).map((k) => [k, d.lavorazioni[k].slug])
    ) as Record<LavorazioneKey, string>;
    map.settori[l] = Object.fromEntries(
      (Object.keys(d.settori) as SettoreKey[]).map((k) => [k, d.settori[k].slug])
    ) as Record<SettoreKey, string>;
  }
  return map;
}

/** Mappa hreflang → URL per la stessa pagina in tutte le lingue. */
export function alternates(section?: SectionKey, child?: { type: "lavorazioni" | "settori"; key: string }) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = href(l, section, child);
  languages["x-default"] = href(DEFAULT_LOCALE, section, child);
  return { languages };
}
