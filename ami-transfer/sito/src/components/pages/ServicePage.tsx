import PageHero from "@/components/ui/PageHero";
import Section, { Prose } from "@/components/ui/Section";
import Todo from "@/components/ui/Todo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ServiceForm from "@/components/forms/ServiceForm";
import { COMPANY } from "@/lib/site";
import { SHOW_TODO } from "@/lib/todo";
import { href, type Dictionary } from "@/i18n";

export default function ServicePage({ d }: { d: Dictionary }) {
  const p = d.pages.service;
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "service"), label: d.ui.nav.service }]} title={p.title} lede={p.lede} />

      <section className="bg-blue py-[clamp(40px,6vw,64px)] text-white">
        <Container className="grid grid-cols-1 items-center gap-6 min-[760px]:grid-cols-[1fr_auto]">
          <div>
            <div className="font-heading text-[15px] font-bold text-[#cfe0ec]">{p.lineDown}</div>
            <a href={COMPANY.phoneHref} className="font-heading text-[clamp(28px,4vw,44px)] font-extrabold text-white no-underline">{COMPANY.phone}</a>
            <div className="mt-1 text-[15px] text-[#cfe0ec]">{p.hours}</div>
          </div>
          <Button href="#identifica" variant="primary">{d.ui.cta.identifyLine}</Button>
        </Container>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-7 min-[520px]:grid-cols-2 min-[860px]:gap-x-11">
          {p.services.map((s) => (
            <div key={s.title} className="border-t-2 border-blue pt-4">
              <h2 className="mb-2 text-[23px]">{s.title}</h2>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="identifica" tone="paper-2" title={p.identifyTitle} lede={p.identifyLede}>
        <div className="mt-10 max-w-[760px]">
          <ServiceForm t={d.ui.form} s={d.ui.serviceForm} privacyHref={href(d.locale, "privacy")} />
        </div>
        {SHOW_TODO && (
          <Prose>
            <p className="mt-10">
              {p.processNote} <Todo>{d.ui.todo}</Todo>
            </p>
          </Prose>
        )}
      </Section>
    </>
  );
}
