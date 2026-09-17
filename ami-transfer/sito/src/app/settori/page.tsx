import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/sections/CtaBand";
import { SETTORI } from "@/content/settori";
import { pageTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Settori — Automotive, building, elettrodomestico"),
  description:
    "I settori in cui lavorano le linee transfer A.M.I.: componenti automotive in tubo, tubo da costruzione, scambiatori e gruppi termici.",
};

export default function SettoriPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/settori", label: "Settori" }]}
        title="Chi ci porta un pezzo, non un capitolato."
        lede="Tre settori dichiarati, un metodo solo: si parte dal disegno del componente e dalla produttività richiesta."
      />
      <Section>
        <div className="grid grid-cols-1 gap-6 min-[760px]:grid-cols-3">
          {SETTORI.map((s) => (
            <Link
              key={s.slug}
              href={`/settori/${s.slug}`}
              className="flex flex-col border-l-4 border-blue bg-paper-2 px-[26px] py-[30px] no-underline transition-colors duration-[120ms] hover:border-yellow"
            >
              <h2 className="mb-[10px] text-[27px]">{s.name}</h2>
              <p className="text-[15.5px] text-[#4a575f]">{s.lede}</p>
              <span className="mt-auto pt-4 font-heading text-[15px] font-bold text-blue">
                Vedi i componenti che produciamo
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
