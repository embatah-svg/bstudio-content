import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import { COMPANY, pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Note legali"),
  robots: { index: false },
};

export default function NoteLegaliPage() {
  return (
    <>
      <PageHero crumbs={[{ href: "/note-legali", label: "Note legali" }]} title="Note legali." lede="Dati societari e informazioni sul titolare del sito." />
      <Section>
        <Prose>
          <p>
            {COMPANY.legalName}
            <br />
            {COMPANY.street}, {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
            <br />
            P.IVA {COMPANY.vat} · C.F. {COMPANY.taxCode} · REA {COMPANY.rea}
            <br />
            Tel. {COMPANY.phone} · {COMPANY.email}
          </p>
          <p>
            Capitale sociale e PEC: <Todo>DA CONFERMARE</Todo>
          </p>
          <p>
            I contenuti di questo sito sono di proprietà di {COMPANY.legalName}. Le immagini
            ritraggono lo stabilimento e le linee dell&apos;azienda.
          </p>
        </Prose>
      </Section>
    </>
  );
}
