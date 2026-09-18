import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { COMPANY } from "@/lib/site";
import { href, type Dictionary } from "@/i18n";

type CtaBandProps = { d: Dictionary; title?: string; text?: string };

export default function CtaBand({ d, title, text }: CtaBandProps) {
  return (
    <section className="py-[clamp(64px,9vw,120px)]">
      <Container className="grid grid-cols-1 gap-7 min-[760px]:grid-cols-2 min-[760px]:gap-14">
        <div>
          <h2 className="max-w-[20ch] text-[clamp(34px,4vw,58px)]">{title ?? d.ui.ctaBand.title}</h2>
          <p className="mt-[22px] max-w-[44ch] text-[#3b4850]">{text ?? d.ui.ctaBand.text}</p>
          <div className="flex flex-wrap gap-[14px]">
            <Button href={href(d.locale, "contatti")} variant="primary">
              {d.ui.cta.primary}
            </Button>
            <Button href={COMPANY.phoneHref} variant="outline-dark">
              {d.ui.cta.secondary}
            </Button>
          </div>
          <p className="mt-5 max-w-[44ch] text-[14px] text-[#5a6870]">{d.ui.ctaBand.nda}</p>
        </div>
        <address className="text-[17px] leading-[1.9] text-[#3b4850] not-italic">
          {COMPANY.legalName}
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
          <br />
          <br />
          <a href={COMPANY.phoneHref} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">{COMPANY.phone}</a>
          <br />
          <a href={`mailto:${COMPANY.email}`} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">{COMPANY.email}</a>
        </address>
      </Container>
    </section>
  );
}
