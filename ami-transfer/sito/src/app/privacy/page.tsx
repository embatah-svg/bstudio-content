import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import { COMPANY, pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Informativa privacy"),
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/privacy", label: "Privacy" }]}
        title="Informativa sul trattamento dei dati."
        lede="Come trattiamo i dati che ci inviate attraverso il sito, in particolare i disegni tecnici."
      />
      <Section>
        <Prose>
          <h3 className="!mt-0">Titolare del trattamento</h3>
          <p>
            {COMPANY.legalName}, {COMPANY.street}, {COMPANY.zip} {COMPANY.city} ({COMPANY.province}).
            Contatto: {COMPANY.email}.
          </p>
          <h3>Disegni e documenti tecnici</h3>
          <p>
            I file inviati tramite il modulo di richiesta sono usati esclusivamente per valutare la
            fattibilità della richiesta e formulare un&apos;offerta. Non vengono condivisi con terzi.
            Su richiesta, A.M.I. firma un accordo di riservatezza (NDA) prima di ricevere qualsiasi
            documento.
          </p>
          <p>
            Dove sono conservati i file, chi vi accede e per quanto tempo: <Todo>DA CONFERMARE</Todo>
          </p>
          <h3>Testo completo dell&apos;informativa</h3>
          <p>
            <Todo>DA REDIGERE CON IL CONSULENTE PRIVACY DELL&apos;AZIENDA</Todo>
          </p>
        </Prose>
      </Section>
    </>
  );
}
