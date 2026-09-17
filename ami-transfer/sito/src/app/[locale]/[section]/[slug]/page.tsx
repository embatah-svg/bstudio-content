import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type LavorazioneKey, type SettoreKey } from "@/i18n/config";
import { getDictionary, lavorazioneFromSlug, sectionFromSlug, settoreFromSlug } from "@/i18n";
import { lavorazioneMetadata, settoreMetadata } from "@/i18n/meta";
import LavorazionePage from "@/components/pages/LavorazionePage";
import SettorePage from "@/components/pages/SettorePage";

type Params = Promise<{ locale: string; section: string; slug: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => {
    const d = getDictionary(locale);
    const lav = (Object.keys(d.lavorazioni) as LavorazioneKey[]).map((k) => ({
      locale,
      section: d.routes.lavorazioni,
      slug: d.lavorazioni[k].slug,
    }));
    const set = (Object.keys(d.settori) as SettoreKey[]).map((k) => ({
      locale,
      section: d.routes.settori,
      slug: d.settori[k].slug,
    }));
    return [...lav, ...set];
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  const sectionKey = sectionFromSlug(locale, section);
  if (sectionKey === "lavorazioni") {
    const k = lavorazioneFromSlug(locale, slug);
    return k ? lavorazioneMetadata(d, k) : {};
  }
  if (sectionKey === "settori") {
    const k = settoreFromSlug(locale, slug);
    return k ? settoreMetadata(d, k) : {};
  }
  return {};
}

export default async function ChildPage({ params }: { params: Params }) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const sectionKey = sectionFromSlug(locale, section);

  if (sectionKey === "lavorazioni") {
    const k = lavorazioneFromSlug(locale, slug);
    if (!k) notFound();
    return <LavorazionePage d={d} lavorazioneKey={k} />;
  }
  if (sectionKey === "settori") {
    const k = settoreFromSlug(locale, slug);
    if (!k) notFound();
    return <SettorePage d={d} settoreKey={k} />;
  }
  notFound();
}
