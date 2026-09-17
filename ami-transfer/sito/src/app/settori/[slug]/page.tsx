import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { SETTORI, getSettore } from "@/content/settori";
import { getLavorazione } from "@/content/lavorazioni";
import { pageTitle } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SETTORI.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSettore(slug);
  if (!s) return {};
  return { title: pageTitle(`${s.name} — Linee transfer per tubo`), description: s.lede };
}

export default async function SettorePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getSettore(slug);
  if (!s) notFound();

  const lavorazioni = s.lavorazioni.map(getLavorazione).filter((l) => l !== undefined);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/settori", label: "Settori" },
          { href: `/settori/${s.slug}`, label: s.name },
        ]}
        title={s.title}
        lede={s.lede}
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 min-[860px]:grid-cols-2">
          <Prose>
            <h3 className="!mt-0">Componenti tipici</h3>
            <ul>
              {s.componenti.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>
              Esempi verificati con l&apos;azienda e foto dei componenti: <Todo>DA CONFERMARE</Todo>
            </p>
          </Prose>
          <Prose>
            <h3 className="!mt-0">Cosa conta in questo settore</h3>
            <ul>
              {s.esigenze.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Prose>
        </div>
      </Section>

      <Section tone="paper-2" title="Lavorazioni ricorrenti." lede="Le stazioni che troviamo più spesso nelle linee per questo settore.">
        <div className="mt-10 grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          {lavorazioni.map((l) => (
            <Link
              key={l.slug}
              href={`/lavorazioni/${l.slug}`}
              className="border-l-4 border-blue bg-paper px-[26px] py-[26px] no-underline hover:border-yellow"
            >
              <h3 className="mb-2 text-[22px]">{l.name}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{l.lede}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Un caso reale." lede="Pezzo, problema, tempo ciclo ottenuto, anno.">
        <Prose>
          <p>
            <Todo>IN ATTESA DI AUTORIZZAZIONE CLIENTE O CASO ANONIMIZZATO</Todo>
          </p>
          <p>
            I contratti su macchine speciali contengono quasi sempre clausole di riservatezza: i
            casi vengono pubblicati solo con autorizzazione scritta o in forma anonimizzata.
          </p>
        </Prose>
        <div className="mt-6">
          <Button href="/contatti" variant="primary">
            Invia il disegno del pezzo
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
