import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";
import { SHOW_TODO } from "@/lib/todo";
import type { LavorazioneKey } from "@/i18n/config";

export default function LavorazioniPage({ d }: { d: Dictionary }) {
  const p = d.lavorazioniPage;
  const keys = Object.keys(d.lavorazioni) as LavorazioneKey[];
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "lavorazioni"), label: d.ui.nav.lavorazioni }]} title={p.title} lede={p.lede} />

      <Section>
        <div className="grid grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] min-[760px]:grid-cols-2">
          {keys.map((k, i) => {
            const l = d.lavorazioni[k];
            return (
              <Link key={k} href={href(d.locale, "lavorazioni", { type: "lavorazioni", key: k })} className="bg-paper px-6 pt-[26px] pb-[30px] no-underline">
                <div className="mb-[14px] flex items-center gap-[10px] font-heading text-[15px] font-bold text-blue">
                  {String(i + 1).padStart(2, "0")}
                  <span className="h-px flex-1 bg-[rgba(36,80,107,0.35)]" />
                </div>
                <h2 className="mb-2 text-[27px]">{l.name}</h2>
                <p className="m-0 text-[15.5px] text-[#4a575f]">{l.lede}</p>
                <span className="mt-5 inline-block font-heading text-[15px] font-bold text-blue">{d.ui.cta.feasibility}</span>
              </Link>
            );
          })}
        </div>
        {SHOW_TODO && (
          <Prose>
            <p className="mt-10">
              {p.fullListNote} <Todo>{p.fullListTodo}</Todo>
            </p>
          </Prose>
        )}
      </Section>

      <CtaBand d={d} title={p.ctaTitle} text={p.ctaText} />
    </>
  );
}
