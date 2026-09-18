import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Todo from "@/components/ui/Todo";
import RichiestaForm from "@/components/forms/RichiestaForm";
import { COMPANY } from "@/lib/site";
import { href, type Dictionary } from "@/i18n";
import { SHOW_TODO } from "@/lib/todo";

export default function ContattiPage({ d }: { d: Dictionary }) {
  const p = d.pages.contatti;
  const f = d.ui.form;
  const link = "border-b border-[rgba(36,80,107,0.35)] text-blue no-underline";
  return (
    <>
      <PageHero d={d} crumbs={[{ href: href(d.locale, "contatti"), label: d.ui.nav.contatti }]} title={p.title} lede={p.lede} />
      <section className="py-[clamp(64px,9vw,120px)]">
        <Container className="grid grid-cols-1 gap-14 min-[980px]:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-8 text-[clamp(27px,3.4vw,34px)]">{f.title}</h2>
            <RichiestaForm t={f} privacyHref={href(d.locale, "privacy")} />
          </div>
          <aside>
            <h2 className="text-[clamp(27px,3.4vw,34px)]">{f.office}</h2>
            <address className="mt-6 text-[17px] leading-[1.9] text-[#3b4850] not-italic">
              {COMPANY.legalName}
              <br />
              {COMPANY.street}
              <br />
              {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
              <br />
              <br />
              <a href={COMPANY.phoneHref} className={link}>{COMPANY.phone}</a>
              <br />
              <a href={COMPANY.phone2Href} className={link}>{COMPANY.phone2}</a>
              <br />
              <a href={`mailto:${COMPANY.email}`} className={link}>{COMPANY.email}</a>
            </address>
            <p className="mt-6 text-[15px] text-[#5a6870]">
              {f.hours}: {f.hoursValue}
            </p>
            {SHOW_TODO && (
              <p className="mt-6 text-[15px] text-[#5a6870]">
                {f.map}: <Todo>{d.ui.todo}</Todo>
              </p>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
