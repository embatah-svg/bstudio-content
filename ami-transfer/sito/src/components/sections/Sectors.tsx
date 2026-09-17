import Link from "next/link";
import { href, type Dictionary } from "@/i18n";
import type { SettoreKey } from "@/i18n/config";

export default function Sectors({ d }: { d: Dictionary }) {
  const keys = Object.keys(d.settori) as SettoreKey[];
  return (
    <section id="settori" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[62ch]">
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)]">{d.settoriPage.homeTitle}</h2>
          <p className="mt-[22px] text-[#3b4850]">{d.settoriPage.homeLede}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 min-[760px]:grid-cols-3">
          {keys.map((k) => {
            const s = d.settori[k];
            return (
              <Link
                key={k}
                href={href(d.locale, "settori", { type: "settori", key: k })}
                className="flex min-h-[180px] flex-col border-l-4 border-blue bg-paper-2 px-[26px] py-[30px] no-underline transition-colors duration-[120ms] hover:border-yellow"
              >
                <h3 className="mb-[10px] text-[22px]">{s.name}</h3>
                <p className="m-0 text-[15.5px] text-[#4a575f]">{s.homeText}</p>
                <span className="mt-auto pt-5 font-heading text-[15px] font-bold text-blue">{d.ui.cta.seeComponents}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
