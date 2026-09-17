import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { COMPANY, pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Service — Ricambi, retrofit e assistenza linee transfer"),
  description:
    "Ricambi originali, retrofit di quadro e PLC, modifiche per pezzi nuovi e assistenza in campo per le linee transfer A.M.I. installate dal 1978.",
};

const SERVIZI = [
  ["Ricambi", "Ricambi originali identificati in giornata dall'archivio di commessa. Segnaliamo i componenti a fine vita prima che fermino la linea."],
  ["Retrofit", "Sostituzione di quadro elettrico e PLC su linee ancora meccanicamente sane. Le logiche sono scritte in casa: si aggiornano, non si ricomprano."],
  ["Modifica per pezzo nuovo", "Nuove unità operative o nuova sequenza di stazioni quando cambia il componente. La linea si adatta invece di essere sostituita."],
  ["Assistenza", "Interventi in remoto e in campo, in tutta Europa, con il tecnico che conosce la macchina."],
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/service", label: "Service" }]}
        title="La linea che avete comprato vent'anni fa la conosciamo ancora."
        lede="Abbiamo l'archivio di ogni commessa uscita da Manerbio: schemi, programmi, distinte. Un ricambio si identifica in giornata e un intervento parte da dove serve."
      />

      <section className="bg-blue py-[clamp(40px,6vw,64px)] text-white">
        <Container className="grid grid-cols-1 items-center gap-6 min-[760px]:grid-cols-[1fr_auto]">
          <div>
            <div className="font-heading text-[15px] font-bold text-[#cfe0ec]">Linea ferma?</div>
            <a href={COMPANY.phoneHref} className="font-heading text-[clamp(28px,4vw,44px)] font-extrabold text-white no-underline">
              {COMPANY.phone}
            </a>
            <div className="mt-1 text-[15px] text-[#cfe0ec]">
              Orari di assistenza: <Todo>DA CONFERMARE</Todo>
            </div>
          </div>
          <Button href="#identifica" variant="primary">
            Identifica la tua linea
          </Button>
        </Container>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-7 min-[520px]:grid-cols-2 min-[860px]:gap-x-11">
          {SERVIZI.map(([name, text]) => (
            <div key={name} className="border-t-2 border-blue pt-4">
              <h2 className="mb-2 text-[23px]">{name}</h2>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="identifica"
        tone="paper-2"
        title="Identifica la tua linea."
        lede="Per una richiesta di ricambio o assistenza servono pochi dati: li trovate sulla targa della macchina."
      >
        <Prose>
          <ul>
            <li>Numero di matricola della linea (targa sul basamento o sul quadro elettrico)</li>
            <li>Anno di costruzione</li>
            <li>Stazione o gruppo interessato</li>
            <li>Descrizione del problema o codice del componente, se disponibile</li>
          </ul>
          <p>
            Scrivete a{" "}
            <a href={`mailto:${COMPANY.email}?subject=Richiesta%20service%20linea%20transfer`} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
              {COMPANY.email}
            </a>{" "}
            indicando &quot;Service&quot; nell&apos;oggetto, oppure chiamate il numero sopra.
          </p>
          <p>
            Processo ricambi attuale e tempi di risposta: <Todo>DA CONFERMARE</Todo>
          </p>
        </Prose>
      </Section>
    </>
  );
}
