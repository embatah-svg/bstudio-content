import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
};

// Le foto in public/images sono fotogrammi del video aziendale AMI (2021):
// materiale reale, usato come segnaposto fino allo shooting in stabilimento.
export default function Figure({ src, alt, caption, priority = false, className = "" }: FigureProps) {
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
      />
      {caption && (
        <figcaption className="mt-3 border-t border-[rgba(19,26,30,0.25)] pt-2 text-[14px] text-[#5a6870]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
