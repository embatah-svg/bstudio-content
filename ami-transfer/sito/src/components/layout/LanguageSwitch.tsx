"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type LavorazioneKey, type Locale, type SectionKey, type SettoreKey } from "@/i18n/config";
import type { SlugMap } from "@/i18n";

type Props = { locale: Locale; slugMap: SlugMap; label: string; onNavigate?: () => void };

function findKey<K extends string>(map: Record<K, string>, slug: string): K | undefined {
  return (Object.keys(map) as K[]).find((k) => map[k] === slug);
}

// Ricava sezione e pagina figlia dal percorso corrente e costruisce
// l'URL equivalente in ogni altra lingua.
function equivalent(pathname: string, from: Locale, to: Locale, m: SlugMap): string {
  const parts = pathname.split("/").filter(Boolean);
  const [, sectionSlug, childSlug] = parts;
  if (!sectionSlug) return `/${to}`;
  const section = findKey<SectionKey>(m.sections[from], sectionSlug);
  if (!section) return `/${to}`;
  let out = `/${to}/${m.sections[to][section]}`;
  if (childSlug) {
    if (section === "lavorazioni") {
      const k = findKey<LavorazioneKey>(m.lavorazioni[from], childSlug);
      if (k) out += `/${m.lavorazioni[to][k]}`;
    } else if (section === "settori") {
      const k = findKey<SettoreKey>(m.settori[from], childSlug);
      if (k) out += `/${m.settori[to][k]}`;
    }
  }
  return out;
}

export default function LanguageSwitch({ locale, slugMap, label, onNavigate }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  return (
    <nav aria-label={label} className="flex flex-wrap gap-3 font-heading text-[13px] font-bold tracking-[0.06em] uppercase">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={equivalent(pathname, locale, l, slugMap)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            onClick={onNavigate}
            className={`border-b pb-[2px] no-underline ${
              active ? "border-yellow text-white" : "border-transparent text-[#8d98a3] hover:text-white"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
