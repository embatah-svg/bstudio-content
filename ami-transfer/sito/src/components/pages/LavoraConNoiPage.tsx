import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/site";
import { href, type Dictionary } from "@/i18n";

export default function LavoraConNoiPage({ d }: { d: Dictionary }) {
  const p = d.pages.lavoraConNoi;
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "lavora-con-noi"), label: d.ui.nav["lavora-con-noi"] }]} title={p.title} lede={p.lede} />
      <Section>
        <div className="grid grid-cols-1 gap-10 min-[860px]:grid-cols-2">
          <Prose>
            <h3 className="!mt-0">{p.whatTitle}</h3>
            <ul>
              {p.what.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </Prose>
          <Prose>
            <h3 className="!mt-0">{p.openTitle}</h3>
            <p>
              <Todo>{d.ui.todo}</Todo>
            </p>
            <p>
              {p.spontaneousA}{" "}
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(p.emailSubject)}`} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
                {COMPANY.email}
              </a>{" "}
              {p.spontaneousB}
            </p>
          </Prose>
        </div>
        <div className="mt-10">
          <Button href={href(d.locale, "azienda")} variant="outline-dark">{d.ui.cta.company}</Button>
        </div>
      </Section>
    </>
  );
}
