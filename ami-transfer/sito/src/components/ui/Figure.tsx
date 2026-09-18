import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  tone?: "color" | "mono";
};

// Le foto in public/images sono fotogrammi del video aziendale AMI (2021):
// materiale reale, usato come segnaposto fino allo shooting in stabilimento.
// Trattamento del piano (§7): colore desaturato con i blu mantenuti;
// bianco e nero freddo per i reparti.
const TONES = {
  color: "saturate(0.7) contrast(1.06)",
  mono: "grayscale(1) contrast(1.1) brightness(0.95)",
};

export default function Figure({ src, alt, caption, priority = false, className = "", tone = "color" }: FigureProps) {
  return (
    <figure className={`m-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={720}
        priority={priority}
        sizes="(max-width: 860px) 92vw, 1180px"
        className="block h-auto w-full"
        style={{ filter: TONES[tone] }}
      />
      {caption && (
        <figcaption className="mt-3 border-t border-[rgba(19,26,30,0.25)] pt-2 text-[14px] text-[#5a6870]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
