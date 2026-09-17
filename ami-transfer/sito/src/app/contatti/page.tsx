import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Todo from "@/components/ui/Todo";
import RichiestaForm from "@/components/forms/RichiestaForm";
import { COMPANY, pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Contatti — Invia il disegno del pezzo"),
  description:
    "Richiesta di fattibilità per una linea transfer: inviate il disegno del pezzo all'ufficio tecnico A.M.I. di Manerbio (BS). Telefono, email, indirizzo.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/contatti", label: "Contatti" }]}
        title="Mandateci il disegno del pezzo."
        lede="Vi diciamo se una linea transfer è la strada giusta, con quale tempo ciclo e quale configurazione. Senza impegno, e con un NDA se lo preferite."
      />
      <section className="py-[clamp(64px,9vw,120px)]">
        <Container className="grid grid-cols-1 gap-14 min-[980px]:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-8 text-[clamp(27px,3.4vw,34px)]">Richiesta di fattibilità</h2>
            <RichiestaForm />
          </div>
          <aside>
            <h2 className="text-[clamp(27px,3.4vw,34px)]">Ufficio tecnico</h2>
            <address className="mt-6 text-[17px] leading-[1.9] text-[#3b4850] not-italic">
              {COMPANY.legalName}
              <br />
              {COMPANY.street}
              <br />
              {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
              <br />
              <br />
              <a href={COMPANY.phoneHref} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
                {COMPANY.phone}
              </a>
              <br />
              <a href={COMPANY.phone2Href} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
                {COMPANY.phone2}
              </a>
              <br />
              <a href={`mailto:${COMPANY.email}`} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
                {COMPANY.email}
              </a>
            </address>
            <p className="mt-6 text-[15px] text-[#5a6870]">
              Orari: <Todo>DA CONFERMARE</Todo>
            </p>
            <p className="mt-6 text-[15px] text-[#5a6870]">
              Mappa e indicazioni: <Todo>DA CONFERMARE</Todo>
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
