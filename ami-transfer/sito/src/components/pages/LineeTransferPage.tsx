import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import IndexingScene from "@/components/three/IndexingScene";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";
import { SHOW_TODO } from "@/lib/todo";
import type { LavorazioneKey } from "@/i18n/config";

export default function LineeTransferPage({ d }: { d: Dictionary }) {
  const p = d.pages.lineeTransfer;
  const keys = Object.keys(d.lavorazioni) as LavorazioneKey[];
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "linee-transfer"), label: d.ui.nav["linee-transfer"] }]} title={p.title} lede={p.lede} />

      <Section title={p.indexTitle} lede={p.indexLede}>
        <div className="mt-12">
          <IndexingScene caption={p.sceneCaption} />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] min-[520px]:grid-cols-2 min-[860px]:grid-cols-3">
          {p.elements.map((el) => (
            <div key={el.title} className="bg-paper px-6 pt-[26px] pb-[30px]">
              <h3 className="mb-2 text-[21px]">{el.title}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{el.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Figure src="/images/linea-portale.webp" alt={p.photoAlt} caption={p.photoCaption} />
        </div>
      </Section>

      <Section tone="paper-2" title={p.unitsTitle} lede={p.unitsLede}>
        <div className="mt-12 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          {keys.map((k) => {
            const l = d.lavorazioni[k];
            return (
              <Link
                key={k}
                href={href(d.locale, "lavorazioni", { type: "lavorazioni", key: k })}
                className="border-l-4 border-blue bg-paper px-[26px] py-[26px] no-underline transition-colors duration-[120ms] hover:border-yellow"
              >
                <h3 className="mb-2 text-[22px]">{l.name}</h3>
                <p className="m-0 text-[15.5px] text-[#4a575f]">{l.lede}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title={SHOW_TODO ? p.rangesTitle : undefined} lede={SHOW_TODO ? p.rangesLede : undefined}>
        <Prose>
          {SHOW_TODO && (
            <ul>
              {p.ranges.map((r) => (
                <li key={r}>
                  {r}: <Todo>{d.ui.todo}</Todo>
                </li>
              ))}
            </ul>
          )}
          <p>{p.rangesNote}</p>
        </Prose>
        <div className="mt-6 flex flex-wrap gap-[14px]">
          <Button href={href(d.locale, "contatti")} variant="primary">{d.ui.cta.primary}</Button>
          <Button href={href(d.locale, "come-lavoriamo")} variant="outline-dark">{d.ui.cta.howWeWork}</Button>
        </div>
      </Section>

      <CtaBand d={d} />
    </>
  );
}
