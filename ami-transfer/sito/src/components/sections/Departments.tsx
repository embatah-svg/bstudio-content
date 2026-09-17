import Button from "@/components/ui/Button";
import { href, type Dictionary } from "@/i18n";

export default function Departments({ d }: { d: Dictionary }) {
  const s = d.pages.home.departments;
  return (
    <section id="reparti" className="bg-petrol py-[clamp(64px,9vw,120px)] text-[#e7eef2]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[62ch]">
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)] text-white">{s.title}</h2>
          <p className="mt-[22px] text-[#a9bac4]">{s.lede}</p>
        </div>
        <div className="mt-[52px] grid grid-cols-1 gap-7 min-[520px]:grid-cols-2 min-[860px]:grid-cols-3 min-[860px]:gap-x-11">
          {s.items.map((item) => (
            <div key={item.title} className="border-t-2 border-yellow pt-4">
              <h3 className="mb-2 text-[19px] text-white">{item.title}</h3>
              <p className="m-0 text-[15.5px] text-[#9db0bb]">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={href(d.locale, "come-lavoriamo")} variant="secondary">{d.ui.cta.howWeWork}</Button>
        </div>
      </div>
    </section>
  );
}
