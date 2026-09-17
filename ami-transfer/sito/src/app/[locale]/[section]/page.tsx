import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type SectionKey } from "@/i18n/config";
import { getDictionary, sectionFromSlug } from "@/i18n";
import { sectionMetadata } from "@/i18n/meta";
import AziendaPage from "@/components/pages/AziendaPage";
import LineeTransferPage from "@/components/pages/LineeTransferPage";
import LavorazioniPage from "@/components/pages/LavorazioniPage";
import SettoriPage from "@/components/pages/SettoriPage";
import ComeLavoriamoPage from "@/components/pages/ComeLavoriamoPage";
import ServicePage from "@/components/pages/ServicePage";
import ContattiPage from "@/components/pages/ContattiPage";
import LavoraConNoiPage from "@/components/pages/LavoraConNoiPage";
import LegalPages from "@/components/pages/LegalPages";

type Params = Promise<{ locale: string; section: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => {
    const d = getDictionary(locale);
    return (Object.keys(d.routes) as SectionKey[]).map((k) => ({ locale, section: d.routes[k] }));
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, section } = await params;
  if (!isLocale(locale)) return {};
  const key = sectionFromSlug(locale, section);
  if (!key) return {};
  return sectionMetadata(getDictionary(locale), key);
}

export default async function SectionPage({ params }: { params: Params }) {
  const { locale, section } = await params;
  if (!isLocale(locale)) notFound();
  const key = sectionFromSlug(locale, section);
  if (!key) notFound();
  const d = getDictionary(locale);

  switch (key) {
    case "azienda":
      return <AziendaPage d={d} />;
    case "linee-transfer":
      return <LineeTransferPage d={d} />;
    case "lavorazioni":
      return <LavorazioniPage d={d} />;
    case "settori":
      return <SettoriPage d={d} />;
    case "come-lavoriamo":
      return <ComeLavoriamoPage d={d} />;
    case "service":
      return <ServicePage d={d} />;
    case "contatti":
      return <ContattiPage d={d} />;
    case "lavora-con-noi":
      return <LavoraConNoiPage d={d} />;
    case "note-legali":
      return <LegalPages d={d} kind="note-legali" />;
    case "privacy":
      return <LegalPages d={d} kind="privacy" />;
  }
}
