import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";
import type { SettoreKey } from "@/i18n/config";

export default function SettoriPage({ d }: { d: Dictionary }) {
  const p = d.settoriPage;
  const keys = Object.keys(d.settori) as SettoreKey[];
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "settori"), label: d.ui.nav.settori }]} title={p.title} lede={p.lede} />
      <Section>
        <div className="grid grid-cols-1 gap-6 min-[760px]:grid-cols-3">
          {keys.map((k) => {
            const s = d.settori[k];
            return (
              <Link
                key={k}
                href={href(d.locale, "settori", { type: "settori", key: k })}
                className="flex flex-col border-l-4 border-blue bg-paper-2 px-[26px] py-[30px] no-underline transition-colors duration-[120ms] hover:border-yellow"
              >
                <h2 className="mb-[10px] text-[27px]">{s.name}</h2>
                <p className="text-[15.5px] text-[#4a575f]">{s.lede}</p>
                <span className="mt-auto pt-4 font-heading text-[15px] font-bold text-blue">{d.ui.cta.seeComponents}</span>
              </Link>
            );
          })}
        </div>
      </Section>
      <CtaBand d={d} />
    </>
  );
}
