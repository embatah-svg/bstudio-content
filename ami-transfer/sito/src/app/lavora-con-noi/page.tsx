import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import { COMPANY, pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Lavora con noi — Manerbio (BS)"),
  description:
    "Progettazione meccanica, automazione PLC, montaggio e collaudo di linee transfer a Manerbio. Posizioni aperte e candidature spontanee.",
};

export default function LavoraConNoiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/lavora-con-noi", label: "Lavora con noi" }]}
        title="Macchine che si vedono nascere per intero."
        lede="A Manerbio una linea transfer viene progettata, programmata, costruita e collaudata nello stesso stabilimento. Chi lavora qui segue il pezzo dal disegno alla macchina che lo produce."
      />
      <Section>
        <div className="grid grid-cols-1 gap-10 min-[860px]:grid-cols-2">
          <Prose>
            <h3 className="!mt-0">Cosa si fa</h3>
            <ul>
              <li>Progettazione meccanica 3D di linee e unità operative</li>
              <li>Programmazione PLC e quadri elettrici</li>
              <li>Carpenteria, lavorazioni meccaniche, montaggio</li>
              <li>Collaudo in stabilimento e avviamento presso il cliente</li>
            </ul>
          </Prose>
          <Prose>
            <h3 className="!mt-0">Posizioni aperte</h3>
            <p>
              <Todo>DA CONFERMARE</Todo>
            </p>
            <p>
              Le candidature spontanee sono benvenute: inviate il curriculum a{" "}
              <a href={`mailto:${COMPANY.email}?subject=Candidatura`} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
                {COMPANY.email}
              </a>{" "}
              indicando &quot;Candidatura&quot; nell&apos;oggetto.
            </p>
          </Prose>
        </div>
        <div className="mt-10">
          <Button href="/azienda" variant="outline-dark">
            L&apos;azienda
          </Button>
        </div>
      </Section>
    </>
  );
}
