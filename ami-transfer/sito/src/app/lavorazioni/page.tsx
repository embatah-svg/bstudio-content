import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import CtaBand from "@/components/sections/CtaBand";
import { LAVORAZIONI } from "@/content/lavorazioni";
import { pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Lavorazioni del tubo in linea transfer"),
  description:
    "Foratura, tranciatura, filettatura e calibratura del tubo metallico eseguite in ciclo continuo su linee transfer A.M.I. Una pagina per ogni lavorazione.",
};

export default function LavorazioniPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/lavorazioni", label: "Lavorazioni" }]}
        title="Le lavorazioni sul tubo."
        lede="Ogni lavorazione corrisponde a una stazione della linea. Si combinano nella sequenza richiesta dal disegno del pezzo, senza riprese manuali tra un'operazione e l'altra."
      />

      <Section>
        <div className="grid grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] min-[760px]:grid-cols-2">
          {LAVORAZIONI.map((l, i) => (
            <Link
              key={l.slug}
              href={`/lavorazioni/${l.slug}`}
              className="bg-paper px-6 pt-[26px] pb-[30px] no-underline"
            >
              <div className="mb-[14px] flex items-center gap-[10px] font-heading text-[15px] font-bold text-blue">
                {String(i + 1).padStart(2, "0")}
                <span className="h-px flex-1 bg-[rgba(36,80,107,0.35)]" />
              </div>
              <h2 className="mb-2 text-[27px]">{l.name}</h2>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{l.lede}</p>
              <span className="mt-5 inline-block font-heading text-[15px] font-bold text-blue">
                Verifica la fattibilità
              </span>
            </Link>
          ))}
        </div>
        <Prose>
          <p className="mt-10">
            Elenco completo delle lavorazioni eseguite (es. sbavatura, saldatura, assemblaggio):{" "}
            <Todo>DA CONFERMARE CON L&apos;UFFICIO TECNICO</Todo>
          </p>
        </Prose>
      </Section>

      <CtaBand
        title="Una lavorazione che non vedete qui?"
        text="Mandateci il disegno: vi diciamo se e come rientra in una linea transfer."
      />
    </>
  );
}
