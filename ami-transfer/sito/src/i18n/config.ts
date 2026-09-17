export const LOCALES = ["it", "en", "de", "fr", "es", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";

export const LOCALE_NAMES: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type SectionKey =
  | "azienda"
  | "linee-transfer"
  | "lavorazioni"
  | "settori"
  | "come-lavoriamo"
  | "service"
  | "contatti"
  | "lavora-con-noi"
  | "note-legali"
  | "privacy";

export type LavorazioneKey = "foratura" | "tranciatura" | "filettatura" | "calibratura";
export type SettoreKey = "automotive" | "building" | "elettrodomestico";
