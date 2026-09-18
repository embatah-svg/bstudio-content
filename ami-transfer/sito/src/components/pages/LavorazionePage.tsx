import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";
import { SHOW_TODO } from "@/lib/todo";
import type { LavorazioneKey } from "@/i18n/config";

export default function LavorazionePage({ d, lavorazioneKey }: { d: Dictionary; lavorazioneKey: LavorazioneKey }) {
  const l = d.lavorazioni[lavorazioneKey];
  const t = d.lavorazioniPage.detail;
  return (
    <>
      <PageHero
        d={d}
        crumbs={[
          { href: href(d.locale, "lavorazioni"), label: d.ui.nav.lavorazioni },
          { href: href(d.locale, "lavorazioni", { type: "lavorazioni", key: lavorazioneKey }), label: l.name },
        ]}
        title={l.title}
        lede={l.lede}
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 min-[860px]:grid-cols-3">
          {[
            [t.what, l.cosa],
            [t.inLine, l.inLinea],
            [t.needs, l.serve],
          ].map(([title, items]) => (
            <Prose key={title as string}>
              <h3 className="!mt-0">{title as string}</h3>
              <ul>
                {(items as string[]).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Prose>
          ))}
        </div>
      </Section>

      {SHOW_TODO && (
        <Section tone="paper-2" title={t.rangesTitle} lede={t.rangesLede}>
          <Prose>
            <ul>
              {t.ranges.map((r) => (
                <li key={r}>
                  {r}: <Todo>{d.ui.todo}</Todo>
                </li>
              ))}
            </ul>
          </Prose>
        </Section>
      )}

      <Section title={t.sectorsTitle} lede={t.sectorsLede}>
        <div className="mt-10 grid grid-cols-1 gap-6 min-[760px]:grid-cols-3">
          {l.settori.map((k) => {
            const s = d.settori[k];
            return (
              <Link key={k} href={href(d.locale, "settori", { type: "settori", key: k })} className="border-l-4 border-blue bg-paper-2 px-[26px] py-[26px] no-underline hover:border-yellow">
                <h3 className="mb-2 text-[22px]">{s.name}</h3>
                <p className="m-0 text-[15.5px] text-[#4a575f]">{s.componenti.join(" · ")}</p>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-[14px]">
          <Button href={href(d.locale, "contatti")} variant="primary">{d.ui.cta.feasibility}</Button>
          <Button href={href(d.locale, "lavorazioni")} variant="outline-dark">{d.ui.cta.allProcessesShort}</Button>
        </div>
      </Section>

      <CtaBand d={d} />
    </>
  );
}
