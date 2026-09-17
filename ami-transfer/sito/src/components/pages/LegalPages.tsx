import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import { COMPANY } from "@/lib/site";
import { href, type Dictionary } from "@/i18n";

export default function LegalPages({ d, kind }: { d: Dictionary; kind: "note-legali" | "privacy" }) {
  if (kind === "note-legali") {
    const p = d.pages.noteLegali;
    return (
      <>
        <PageHero d={d} crumbs={[{ href: href(d.locale, "note-legali"), label: d.ui.nav["note-legali"] }]} title={p.title} lede={p.lede} />
        <Section>
          <Prose>
            <p>
              {COMPANY.legalName}
              <br />
              {COMPANY.street}, {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
              <br />
              {d.ui.footer.vat} {COMPANY.vat} · {d.ui.footer.taxCode} {COMPANY.taxCode} · REA {COMPANY.rea}
              <br />
              Tel. {COMPANY.phone} · {COMPANY.email}
            </p>
            <p>
              {p.capital} <Todo>{d.ui.todo}</Todo>
            </p>
            <p>
              {p.copyright} {COMPANY.legalName}. {p.images}
            </p>
          </Prose>
        </Section>
      </>
    );
  }

  const p = d.pages.privacy;
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "privacy"), label: d.ui.nav.privacy }]} title={p.title} lede={p.lede} />
      <Section>
        <Prose>
          <h3 className="!mt-0">{p.ownerTitle}</h3>
          <p>
            {COMPANY.legalName}, {COMPANY.street}, {COMPANY.zip} {COMPANY.city} ({COMPANY.province}). {p.contact} {COMPANY.email}.
          </p>
          <h3>{p.drawingsTitle}</h3>
          <p>{p.drawingsText}</p>
          <p>
            {p.storageNote} <Todo>{d.ui.todo}</Todo>
          </p>
          <h3>{p.fullTitle}</h3>
          <p>
            <Todo>{p.fullTodo}</Todo>
          </p>
        </Prose>
      </Section>
    </>
  );
}
