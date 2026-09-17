import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Figure from "@/components/ui/Figure";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { COMPANY, pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Azienda — Costruttori di linee transfer dal 1978"),
  description:
    "A.M.I. S.r.l. costruisce a Manerbio (BS) linee transfer su commessa per la lavorazione del tubo. Progettazione, PLC, carpenteria, lavorazioni e collaudo interni.",
};

const REPARTI = [
  ["Ufficio tecnico", "Progettazione meccanica 3D dell'intera linea e delle unità operative."],
  ["Automazione", "Programmazione PLC e quadri elettrici realizzati internamente."],
  ["Carpenteria", "Strutture e basamenti elettrosaldati costruiti in stabilimento."],
  ["Lavorazioni meccaniche", "Centri di lavoro e alesatrici per basamenti e strutture."],
  ["Controllo qualità", "Verifica dei componenti in arrivo e dei pezzi prodotti in collaudo."],
  ["Montaggio e collaudo", "Impianti elettrici, oleodinamici e pneumatici, messa a punto finale."],
];

export default function AziendaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/azienda", label: "Azienda" }]}
        title="Dal 1978 costruiamo linee transfer a Manerbio."
        lede="A.M.I. — Automazione Meccanica Industriale — è un costruttore di macchine speciali su commessa. Ogni linea nasce intorno a un componente specifico del cliente e viene progettata, costruita e collaudata nello stesso stabilimento."
      />

      <Section>
        <Figure
          src="/images/sede-drone.webp"
          alt="Vista aerea dello stabilimento A.M.I. a Manerbio: palazzina uffici e capannone produttivo"
          caption="Lo stabilimento di Manerbio (BS). Fotogramma dal video aziendale A.M.I."
          priority
        />
        <div className="mt-14 grid grid-cols-1 gap-10 min-[860px]:grid-cols-[1fr_1fr]">
          <Prose>
            <h3>Un solo tetto per tutta la catena</h3>
            <p>
              In un settore dove molti costruttori assemblano e subappaltano, A.M.I. tiene in casa
              ogni fase critica: progettazione CAD 3D, programmazione PLC, carpenteria pesante,
              lavorazioni meccaniche, controllo qualità, montaggio e collaudo.
            </p>
            <p>
              Per il cliente significa un solo interlocutore, tempi che non dipendono da terzi e
              una macchina su cui è possibile rimettere mano anche a distanza di anni, perché chi
              l&apos;ha progettata e programmata è ancora qui.
            </p>
          </Prose>
          <Prose>
            <h3>I numeri</h3>
            <ul>
              <li>Costituita il 23 marzo {COMPANY.founded}</li>
              <li>7.000 m² di stabilimento e 600 m² di uffici</li>
              <li>Oltre 20 linee dedicate ogni anno</li>
              <li>
                Organico: <Todo>DA CONFERMARE</Todo>
              </li>
              <li>Espositore a Tube Düsseldorf nelle edizioni 2022, 2024 e 2026</li>
            </ul>
          </Prose>
        </div>
      </Section>

      <Section
        tone="petrol"
        title="Sei reparti, un processo."
        lede="Ogni reparto lavora sulla stessa commessa, dal disegno del pezzo al collaudo con il pezzo del cliente."
      >
        <div className="mt-[52px] grid grid-cols-1 gap-7 min-[520px]:grid-cols-2 min-[860px]:grid-cols-3 min-[860px]:gap-x-11">
          {REPARTI.map(([name, text]) => (
            <div key={name} className="border-t-2 border-yellow pt-4">
              <h3 className="mb-2 text-[19px] text-white">{name}</h3>
              <p className="m-0 text-[15.5px] text-[#9db0bb]">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          <Figure
            src="/images/linea-portale.webp"
            alt="Reparto montaggio: portale di trasferimento con pinze pneumatiche su una linea transfer in costruzione"
            className="[&_figcaption]:border-[rgba(255,255,255,0.2)] [&_figcaption]:text-[#8d98a3]"
            caption="Reparto montaggio, linea in costruzione."
          />
          <Figure
            src="/images/robot-scarico.webp"
            alt="Robot antropomorfo su basamento blu durante la fase di collaudo in stabilimento"
            className="[&_figcaption]:border-[rgba(255,255,255,0.2)] [&_figcaption]:text-[#8d98a3]"
            caption="Isola robotizzata in collaudo."
          />
        </div>
      </Section>

      <Section
        title="Le persone."
        lede="Progettisti, programmatori, montatori e collaudatori che lavorano sulla stessa macchina dall'inizio alla fine."
      >
        <Prose>
          <p>
            Foto e presentazione dei reparti: <Todo>IN ATTESA DI SHOOTING IN STABILIMENTO</Todo>
          </p>
        </Prose>
        <div className="mt-6">
          <Button href="/lavora-con-noi" variant="outline-dark">
            Lavora con noi
          </Button>
        </div>
      </Section>

      <CtaBand title="Contatta l'ufficio tecnico." text="Per una richiesta di fattibilità, una qualifica fornitore o una visita in stabilimento." />
    </>
  );
}
