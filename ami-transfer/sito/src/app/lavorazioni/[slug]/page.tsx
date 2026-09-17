import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { LAVORAZIONI, getLavorazione } from "@/content/lavorazioni";
import { getSettore } from "@/content/settori";
import { pageTitle } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return LAVORAZIONI.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLavorazione(slug);
  if (!l) return {};
  return {
    title: pageTitle(`${l.name} tubo — Linee transfer`),
    description: l.lede,
  };
}

export default async function LavorazionePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const l = getLavorazione(slug);
  if (!l) notFound();

  const settori = l.settori.map(getSettore).filter((s) => s !== undefined);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/lavorazioni", label: "Lavorazioni" },
          { href: `/lavorazioni/${l.slug}`, label: l.name },
        ]}
        title={l.title}
        lede={l.lede}
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 min-[860px]:grid-cols-3">
          <Prose>
            <h3 className="!mt-0">Cosa fa</h3>
            <ul>
              {l.cosa.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Prose>
          <Prose>
            <h3 className="!mt-0">In linea transfer</h3>
            <ul>
              {l.inLinea.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Prose>
          <Prose>
            <h3 className="!mt-0">Cosa ci serve da voi</h3>
            <ul>
              {l.serve.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Prose>
        </div>
      </Section>

      <Section tone="paper-2" title="Range e limiti." lede="Dati da confermare con l'ufficio tecnico prima della pubblicazione.">
        <Prose>
          <ul>
            <li>
              Diametri e spessori gestibili: <Todo>DA CONFERMARE</Todo>
            </li>
            <li>
              Tolleranze ottenibili: <Todo>DA CONFERMARE</Todo>
            </li>
            <li>
              Esempio di tempo ciclo: <Todo>DA CONFERMARE</Todo>
            </li>
          </ul>
        </Prose>
      </Section>

      <Section title="Settori in cui la usiamo." lede="Componenti tipici che richiedono questa lavorazione.">
        <div className="mt-10 grid grid-cols-1 gap-6 min-[760px]:grid-cols-3">
          {settori.map((s) => (
            <Link
              key={s.slug}
              href={`/settori/${s.slug}`}
              className="border-l-4 border-blue bg-paper-2 px-[26px] py-[26px] no-underline hover:border-yellow"
            >
              <h3 className="mb-2 text-[22px]">{s.name}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{s.componenti.join(" · ")}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-[14px]">
          <Button href="/contatti" variant="primary">
            Verifica la fattibilità
          </Button>
          <Button href="/lavorazioni" variant="outline-dark">
            Tutte le lavorazioni
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
