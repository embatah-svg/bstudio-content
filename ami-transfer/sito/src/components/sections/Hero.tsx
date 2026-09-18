import TransferLine from "@/components/three/TransferLine";
import Button from "@/components/ui/Button";
import { href, type Dictionary } from "@/i18n";

export default function Hero({ d }: { d: Dictionary }) {
  const h = d.pages.home.hero;
  return (
    <div className="relative h-[100svh] min-h-[620px] overflow-hidden bg-petrol">
      <TransferLine />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 pb-[7vh]">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <h1 className="max-w-[16ch] text-[clamp(40px,6.5vw,78px)] text-white" style={{ textShadow: "0 2px 40px rgba(15,26,31,.65)" }}>
            {h.title}
          </h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(16px,1.6vw,19px)] text-[#b8c6cf]" style={{ textShadow: "0 2px 24px rgba(15,26,31,.8)" }}>
            {h.sub}
          </p>
          <div className="pointer-events-auto mt-[30px] flex flex-wrap gap-[14px]">
            <Button href={href(d.locale, "contatti")} variant="primary">{d.ui.cta.primary}</Button>
            <Button href="#ciclo" variant="secondary">{d.ui.cta.watchLine}</Button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-[max(4vw,16px)] bottom-[7vh] hidden text-[13px] tracking-[0.04em] text-[#7f929e] min-[700px]:block">
        {h.hint}
      </div>
    </div>
  );
}
