import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";

const darkCaption = "[&_figcaption]:border-[rgba(255,255,255,0.2)] [&_figcaption]:text-[#8d98a3]";

export default function AziendaPage({ d }: { d: Dictionary }) {
  const p = d.pages.azienda;
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "azienda"), label: d.ui.nav.azienda }]} title={p.title} lede={p.lede} />

      <Section>
        <Figure src="/images/sede-drone.webp" alt={p.heroAlt} caption={p.heroCaption} priority />
        <div className="mt-14 grid grid-cols-1 gap-10 min-[860px]:grid-cols-[1fr_1fr]">
          <Prose>
            <h3>{p.chainTitle}</h3>
            <p>{p.chainP1}</p>
            <p>{p.chainP2}</p>
          </Prose>
          <Prose>
            <h3>{p.numbersTitle}</h3>
            <ul>
              {p.numbers.map((n) => (
                <li key={n}>{n}</li>
              ))}
              <li>
                {p.staff} <Todo>{d.ui.todo}</Todo>
              </li>
            </ul>
          </Prose>
        </div>
      </Section>

      <Section tone="petrol" title={p.depsTitle} lede={p.depsLede}>
        <div className="mt-[52px] grid grid-cols-1 gap-7 min-[520px]:grid-cols-2 min-[860px]:grid-cols-3 min-[860px]:gap-x-11">
          {p.deps.map((dep) => (
            <div key={dep.title} className="border-t-2 border-yellow pt-4">
              <h3 className="mb-2 text-[19px] text-white">{dep.title}</h3>
              <p className="m-0 text-[15.5px] text-[#9db0bb]">{dep.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          <Figure src="/images/linea-portale.webp" alt={p.photo1Alt} caption={p.photo1Caption} className={darkCaption} />
          <Figure src="/images/robot-scarico.webp" alt={p.photo2Alt} caption={p.photo2Caption} className={darkCaption} />
        </div>
      </Section>

      <Section title={p.peopleTitle} lede={p.peopleLede}>
        <Prose>
          <p>
            {p.peoplePrefix} <Todo>{p.peopleTodo}</Todo>
          </p>
        </Prose>
        <div className="mt-6">
          <Button href={href(d.locale, "lavora-con-noi")} variant="outline-dark">{d.ui.cta.careers}</Button>
        </div>
      </Section>

      <CtaBand d={d} title={p.ctaTitle} text={p.ctaText} />
    </>
  );
}
