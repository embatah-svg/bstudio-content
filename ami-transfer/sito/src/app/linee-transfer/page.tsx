import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { LAVORAZIONI } from "@/content/lavorazioni";
import { pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Linee transfer lineari per la lavorazione del tubo"),
  description:
    "Come è fatta una linea transfer A.M.I.: indexaggio a passo, stazioni con unità operative dedicate, carico e scarico automatici. Costruita intorno al pezzo del cliente.",
};

const ELEMENTI = [
  ["Basamento e guide", "Struttura elettrosaldata costruita in carpenteria interna, con guide di scorrimento per il trasferimento del pezzo."],
  ["Sistema di indexaggio", "Avanzamento a passo fisso: a ogni ciclo tutti i pezzi in linea avanzano di una stazione."],
  ["Stazioni di lavoro", "Ogni stazione monta un'unità operativa dedicata a una lavorazione: foratura, tranciatura, filettatura, calibratura."],
  ["Bloccaggio pezzo", "Il tubo è bloccato e riferito in ogni stazione durante la lavorazione."],
  ["Carico e scarico", "Alimentazione automatica da fascio o da barra, scarico con separazione dello scarto."],
  ["Automazione", "PLC e quadro elettrico progettati e programmati internamente."],
];

export default function LineeTransferPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/linee-transfer", label: "Linee transfer" }]}
        title="Una linea, più stazioni, un pezzo finito a ogni passo."
        lede="La linea transfer lineare porta il tubo attraverso una sequenza di stazioni. Tutte lavorano contemporaneamente: il tempo ciclo è quello della stazione più lenta, non della somma delle lavorazioni."
      />

      <Section
        title="Come funziona l'indexaggio."
        lede="Il principio è semplice e si vede nell'animazione della home: il tubo avanza di un passo, le teste scendono, lavorano, risalgono, e la linea avanza di nuovo."
      >
        <div className="mt-12 grid grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] min-[520px]:grid-cols-2 min-[860px]:grid-cols-3">
          {ELEMENTI.map(([name, text]) => (
            <div key={name} className="bg-paper px-6 pt-[26px] pb-[30px]">
              <h3 className="mb-2 text-[21px]">{name}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Figure
            src="/images/linea-portale.webp"
            alt="Portale di trasferimento con pinze pneumatiche sopra una linea transfer A.M.I."
            caption="Portale di trasferimento su una linea in montaggio. Fotogramma dal video aziendale."
          />
        </div>
      </Section>

      <Section
        tone="paper-2"
        title="Le unità operative."
        lede="Ogni stazione monta un'unità dedicata alla lavorazione richiesta dal disegno del pezzo. Le unità sono posizionate sul passo del tubo e sincronizzate con l'indexaggio."
      >
        <div className="mt-12 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          {LAVORAZIONI.map((l) => (
            <Link
              key={l.slug}
              href={`/lavorazioni/${l.slug}`}
              className="border-l-4 border-blue bg-paper px-[26px] py-[26px] no-underline transition-colors duration-[120ms] hover:border-yellow"
            >
              <h3 className="mb-2 text-[22px]">{l.name}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{l.lede}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Range dimensionali e tempi ciclo."
        lede="I dati sotto vanno confermati dall'ufficio tecnico prima della pubblicazione."
      >
        <Prose>
          <ul>
            <li>
              Diametro tubo: <Todo>DA CONFERMARE</Todo>
            </li>
            <li>
              Spessore di parete: <Todo>DA CONFERMARE</Todo>
            </li>
            <li>
              Lunghezza pezzo: <Todo>DA CONFERMARE</Todo>
            </li>
            <li>
              Tempo ciclo tipico: <Todo>DA CONFERMARE</Todo>
            </li>
            <li>
              Numero di stazioni: <Todo>DA CONFERMARE</Todo>
            </li>
          </ul>
          <p>
            Ogni linea è dimensionata sul pezzo: prima di un&apos;offerta l&apos;ufficio tecnico
            verifica la fattibilità sul disegno e sulla produttività richiesta.
          </p>
        </Prose>
        <div className="mt-6 flex flex-wrap gap-[14px]">
          <Button href="/contatti" variant="primary">
            Invia il disegno del pezzo
          </Button>
          <Button href="/come-lavoriamo" variant="outline-dark">
            Come lavoriamo
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
