import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { COMPANY, CTA } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  text?: string;
};

export default function CtaBand({
  title = "Mandateci il disegno del pezzo.",
  text = "Vi diciamo se una linea transfer è la strada giusta, con quale tempo ciclo e con quale configurazione. Senza impegno.",
}: CtaBandProps) {
  return (
    <section className="py-[clamp(64px,9vw,120px)]">
      <Container className="grid grid-cols-1 gap-7 min-[760px]:grid-cols-2 min-[760px]:gap-14">
        <div>
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)]">{title}</h2>
          <p className="mt-[22px] max-w-[44ch] text-[#3b4850]">{text}</p>
          <Button href={CTA.primary.href} variant="primary">
            {CTA.primary.label}
          </Button>
        </div>
        <address className="text-[17px] leading-[1.9] text-[#3b4850] not-italic">
          {COMPANY.legalName}
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
          <br />
          <br />
          <a href={COMPANY.phoneHref} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
            {COMPANY.phone}
          </a>
          <br />
          <a href={`mailto:${COMPANY.email}`} className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline">
            {COMPANY.email}
          </a>
        </address>
      </Container>
    </section>
  );
}
