import Button from "@/components/ui/Button";
import { href, type Dictionary } from "@/i18n";

export default function Cycle({ d }: { d: Dictionary }) {
  const c = d.pages.home.cycle;
  return (
    <section id="ciclo" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[62ch]">
          <h2 className="max-w-[20ch] text-[clamp(34px,4vw,58px)]">{c.title}</h2>
          <p className="mt-[22px] text-[#3b4850]">{c.lede}</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] min-[520px]:grid-cols-2 min-[860px]:grid-cols-3">
          {c.stations.map((s, i) => (
            <div key={s.title} className="bg-paper px-6 pt-[26px] pb-[30px]">
              <div className="mb-[14px] flex items-center gap-[10px] font-heading text-[15px] font-bold text-blue">
                {c.station} {i + 1}
                <span className="h-px flex-1 bg-[rgba(36,80,107,0.35)]" />
              </div>
              <h3 className="mb-2 text-[21px]">{s.title}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={href(d.locale, "lavorazioni")} variant="outline-dark">{d.ui.cta.allProcesses}</Button>
        </div>
      </div>
    </section>
  );
}
