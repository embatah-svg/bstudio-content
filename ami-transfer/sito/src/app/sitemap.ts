import type { MetadataRoute } from "next";
import { LOCALES, type LavorazioneKey, type SectionKey, type SettoreKey } from "@/i18n/config";
import { getDictionary, href } from "@/i18n";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    const d = getDictionary(locale);
    urls.push({ url: `${SITE_URL}${href(locale)}`, priority: 1 });
    for (const k of Object.keys(d.routes) as SectionKey[]) {
      if (k === "note-legali" || k === "privacy") continue;
      urls.push({ url: `${SITE_URL}${href(locale, k)}`, priority: 0.8 });
    }
    for (const k of Object.keys(d.lavorazioni) as LavorazioneKey[]) {
      urls.push({ url: `${SITE_URL}${href(locale, "lavorazioni", { type: "lavorazioni", key: k })}`, priority: 0.7 });
    }
    for (const k of Object.keys(d.settori) as SettoreKey[]) {
      urls.push({ url: `${SITE_URL}${href(locale, "settori", { type: "settori", key: k })}`, priority: 0.7 });
    }
  }
  return urls;
}
