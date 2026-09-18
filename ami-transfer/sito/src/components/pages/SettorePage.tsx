import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { href, type Dictionary } from "@/i18n";
import { SHOW_TODO } from "@/lib/todo";
import type { SettoreKey } from "@/i18n/config";

export default function SettorePage({ d, settoreKey }: { d: Dictionary; settoreKey: SettoreKey }) {
  const s = d.settori[settoreKey];
  const t = d.settoriPage.detail;
  return (
    <>
      <PageHero
        d={d}
        crumbs={[
          { href: href(d.locale, "settori"), label: d.ui.nav.settori },
          { href: href(d.locale, "settori", { type: "settori", key: settoreKey }), label: s.name },
        ]}
        title={s.title}
        lede={s.lede}
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 min-[860px]:grid-cols-2">
          <Prose>
            <h3 className="!mt-0">{t.components}</h3>
            <ul>
              {s.componenti.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {SHOW_TODO && (
              <p>
                {t.componentsTodo} <Todo>{d.ui.todo}</Todo>
              </p>
            )}
          </Prose>
          <Prose>
            <h3 className="!mt-0">{t.needs}</h3>
            <ul>
              {s.esigenze.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Prose>
        </div>
      </Section>

      <Section tone="paper-2" title={t.processesTitle} lede={t.processesLede}>
        <div className="mt-10 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          {s.lavorazioni.map((k) => {
            const l = d.lavorazioni[k];
            return (
              <Link key={k} href={href(d.locale, "lavorazioni", { type: "lavorazioni", key: k })} className="border-l-4 border-blue bg-paper px-[26px] py-[26px] no-underline hover:border-yellow">
                <h3 className="mb-2 text-[22px]">{l.name}</h3>
                <p className="m-0 text-[15.5px] text-[#4a575f]">{l.lede}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      {SHOW_TODO && (
        <Section title={t.caseTitle} lede={t.caseLede}>
          <Prose>
            <p>
              <Todo>{t.caseTodo}</Todo>
            </p>
            <p>{t.caseNote}</p>
          </Prose>
          <div className="mt-6">
            <Button href={href(d.locale, "contatti")} variant="primary">{d.ui.cta.primary}</Button>
          </div>
        </Section>
      )}

      <CtaBand d={d} />
    </>
  );
}
