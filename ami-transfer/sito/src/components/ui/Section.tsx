import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

type Tone = "paper" | "paper-2" | "petrol" | "blue";

const TONES: Record<Tone, { bg: string; h2: string; p: string }> = {
  paper: { bg: "", h2: "", p: "text-[#3b4850]" },
  "paper-2": { bg: "bg-paper-2", h2: "", p: "text-[#3b4850]" },
  petrol: { bg: "bg-petrol text-[#e7eef2]", h2: "text-white", p: "text-[#a9bac4]" },
  blue: { bg: "bg-blue text-white", h2: "text-white", p: "text-[#cfe0ec]" },
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  title?: string;
  lede?: string;
  children?: ReactNode;
};

export default function Section({ id, tone = "paper", title, lede, children }: SectionProps) {
  const t = TONES[tone];
  return (
    <section id={id} className={`py-[clamp(64px,9vw,120px)] ${t.bg}`}>
      <Container>
        {title && (
          <div className="max-w-[62ch]">
            <h2 className={`max-w-[20ch] text-[clamp(30px,4.4vw,50px)] ${t.h2}`}>{title}</h2>
            {lede && <p className={`mt-[22px] ${t.p}`}>{lede}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Prose({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`max-w-[70ch] [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-[23px] [&_li]:mb-2 [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:pl-5 ${
        dark ? "text-[#a9bac4] [&_h3]:text-white" : "text-[#3b4850] [&_h3]:text-ink"
      }`}
    >
      {children}
    </div>
  );
}
