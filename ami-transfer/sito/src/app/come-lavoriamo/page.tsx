import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Todo from "@/components/ui/Todo";
import CtaBand from "@/components/sections/CtaBand";
import { pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Come lavoriamo — Dalla richiesta al collaudo"),
  description:
    "Il processo A.M.I. per una linea transfer: analisi di fattibilità sul disegno, offerta, progettazione, costruzione, collaudo in stabilimento, installazione e service.",
};

const FASI = [
  ["Analisi di fattibilità", "Riceviamo il disegno del pezzo e la produttività richiesta. L'ufficio tecnico verifica se una linea transfer è la strada giusta e con quale sequenza di stazioni."],
  ["Offerta", "Configurazione della linea, tempo ciclo previsto, tempi di consegna. Nessun capitolato generico: l'offerta descrive la macchina per quel pezzo."],
  ["Progettazione", "Modellazione 3D dell'intera linea e delle unità operative. Programmazione PLC in parallelo alla meccanica."],
  ["Costruzione", "Carpenteria, lavorazioni meccaniche, quadri elettrici e montaggio nello stesso stabilimento."],
  ["Collaudo in stabilimento", "La linea viene montata e messa a punto a Manerbio, lavorando il pezzo del cliente prima della spedizione."],
  ["Installazione e avviamento", "Trasporto, posa, avviamento e formazione degli operatori presso il cliente."],
  ["Service", "Ricambi, assistenza e retrofit per tutta la vita della linea, con l'archivio completo della commessa."],
];

export default function ComeLavoriamoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/come-lavoriamo", label: "Come lavoriamo" }]}
        title="Dalla richiesta al collaudo, un solo interlocutore."
        lede="Il percorso di una linea A.M.I. in sette fasi. Chi la progetta è chi la programma, la costruisce, la collauda e la assiste."
      />

      <Section>
        <ol className="m-0 grid list-none grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] p-0 min-[760px]:grid-cols-2">
          {FASI.map(([name, text], i) => (
            <li key={name} className="bg-paper px-6 pt-[26px] pb-[30px]">
              <div className="mb-[14px] flex items-center gap-[10px] font-heading text-[15px] font-bold text-blue">
                Fase {i + 1}
                <span className="h-px flex-1 bg-[rgba(36,80,107,0.35)]" />
              </div>
              <h2 className="mb-2 text-[23px]">{name}</h2>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{text}</p>
            </li>
          ))}
        </ol>
        <Prose>
          <p className="mt-10">
            Tempi medi per fase: <Todo>DA CONFERMARE</Todo> · Il collaudo con il pezzo del cliente
            come prassi: <Todo>DA CONFERMARE</Todo>
          </p>
        </Prose>
      </Section>

      <Section
        tone="petrol"
        title="Collaudata prima di partire."
        lede="Ogni linea viene montata completa in stabilimento. Il cliente può vederla lavorare il proprio pezzo prima che venga smontata e spedita."
      >
        <div className="mt-12 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          <Figure
            src="/images/stazione-piegatura.webp"
            alt="Stazione di lavoro con pinza pneumatica marchiata A.M.I. su una linea in collaudo"
            className="[&_figcaption]:border-[rgba(255,255,255,0.2)] [&_figcaption]:text-[#8d98a3]"
            caption="Stazione in collaudo. Fotogramma dal video aziendale."
          />
          <Figure
            src="/images/fixture-bloccaggio.webp"
            alt="Fixture di bloccaggio del tubo con marchio A.M.I. inciso"
            className="[&_figcaption]:border-[rgba(255,255,255,0.2)] [&_figcaption]:text-[#8d98a3]"
            caption="Fixture di bloccaggio, dettaglio."
          />
        </div>
      </Section>

      <CtaBand title="Avviate l'analisi di fattibilità." text="Un disegno e la produttività richiesta bastano per la prima risposta dell'ufficio tecnico." />
    </>
  );
}
