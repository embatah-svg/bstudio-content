"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Flag from "@/components/ui/Flag";
import { LOCALES, LOCALE_NAMES, type LavorazioneKey, type Locale, type SectionKey, type SettoreKey } from "@/i18n/config";
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

// La scelta esplicita vince sul rilevamento automatico (src/proxy.ts).
function remember(locale: Locale) {
  document.cookie = `ami-lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitch({ locale, slugMap, label, onNavigate }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  return (
    <nav aria-label={label} className="flex flex-wrap items-center gap-3">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={equivalent(pathname, locale, l, slugMap)}
            hrefLang={l}
            lang={l}
            title={LOCALE_NAMES[l]}
            aria-label={LOCALE_NAMES[l]}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              remember(l);
              onNavigate?.();
            }}
            className={`inline-flex items-center gap-[6px] border-b-2 pb-[3px] font-heading text-[12px] font-bold uppercase no-underline ${
              active ? "border-yellow text-white" : "border-transparent text-[#8d98a3] opacity-75 hover:text-white hover:opacity-100"
            }`}
          >
            <Flag locale={l} size={18} />
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
