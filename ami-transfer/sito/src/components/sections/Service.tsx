import Button from "@/components/ui/Button";
import { href, type Dictionary } from "@/i18n";

export default function Service({ d }: { d: Dictionary }) {
  const s = d.pages.home.service;
  return (
    <section id="service" className="bg-blue py-[clamp(64px,9vw,120px)] text-white">
      <div className="mx-auto grid w-[min(1180px,92vw)] grid-cols-1 gap-8 min-[860px]:grid-cols-[1.1fr_0.9fr] min-[860px]:gap-14">
        <div>
          <h2 className="max-w-[20ch] text-[clamp(34px,4vw,58px)] text-white">{s.title}</h2>
          <p className="mt-[22px] text-[#cfe0ec]">{s.lede}</p>
        </div>
        <div>
          <ul className="m-0 list-disc pl-5 text-[16px] text-[#cfe0ec]">
            {s.items.map((item) => (
              <li key={item} className="mb-[10px]">{item}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={href(d.locale, "service")} variant="primary">{d.ui.cta.identifyLine}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
