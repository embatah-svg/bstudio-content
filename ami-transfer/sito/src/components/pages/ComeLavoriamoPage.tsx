import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Todo from "@/components/ui/Todo";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";

const darkCaption = "[&_figcaption]:border-[rgba(255,255,255,0.2)] [&_figcaption]:text-[#8d98a3]";

export default function ComeLavoriamoPage({ d }: { d: Dictionary }) {
  const p = d.pages.comeLavoriamo;
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "come-lavoriamo"), label: d.ui.nav["come-lavoriamo"] }]} title={p.title} lede={p.lede} />

      <Section>
        <ol className="m-0 grid list-none grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] p-0 min-[760px]:grid-cols-2">
          {p.phases.map((ph, i) => (
            <li key={ph.title} className="bg-paper px-6 pt-[26px] pb-[30px]">
              <div className="mb-[14px] flex items-center gap-[10px] font-heading text-[15px] font-bold text-blue">
                {p.phase} {i + 1}
                <span className="h-px flex-1 bg-[rgba(36,80,107,0.35)]" />
              </div>
              <h2 className="mb-2 text-[23px]">{ph.title}</h2>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{ph.text}</p>
            </li>
          ))}
        </ol>
        <Prose>
          <p className="mt-10">
            {p.timesNote} <Todo>{d.ui.todo}</Todo> · {p.testNote} <Todo>{d.ui.todo}</Todo>
          </p>
        </Prose>
      </Section>

      <Section tone="petrol" title={p.testedTitle} lede={p.testedLede}>
        <div className="mt-12 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          <Figure src="/images/stazione-piegatura.webp" alt={p.photo1Alt} caption={p.photo1Caption} className={darkCaption} />
          <Figure src="/images/fixture-bloccaggio.webp" alt={p.photo2Alt} caption={p.photo2Caption} className={darkCaption} />
        </div>
      </Section>

      <CtaBand d={d} title={p.ctaTitle} text={p.ctaText} />
    </>
  );
}
