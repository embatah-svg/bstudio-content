import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <section id="contatti" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto grid w-[min(1180px,92vw)] grid-cols-1 gap-7 min-[760px]:grid-cols-2 min-[760px]:gap-14">
        <div>
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)]">
            Mandateci il disegno del pezzo.
          </h2>
          <p className="mt-[22px] max-w-[44ch] text-[#3b4850]">
            Vi diciamo se una linea transfer è la strada giusta, con quale tempo ciclo e con
            quale configurazione. Senza impegno.
          </p>
          <Button href="mailto:info@amitransfer.com" variant="primary">
            Scrivi all&apos;ufficio tecnico
          </Button>
        </div>
        <address className="text-[17px] leading-[1.9] text-[#3b4850] not-italic">
          A.M.I. — Automazione Meccanica Industriale S.r.l.
          <br />
          Strada per Porzano 4/C
          <br />
          25025 Manerbio (BS), Italia
          <br />
          <br />
          <a
            href="tel:+390309380655"
            className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline"
          >
            +39 030 9380655
          </a>
          <br />
          <a
            href="mailto:info@amitransfer.com"
            className="border-b border-[rgba(36,80,107,0.35)] text-blue no-underline"
          >
            info@amitransfer.com
          </a>
        </address>
      </div>
    </section>
  );
}
