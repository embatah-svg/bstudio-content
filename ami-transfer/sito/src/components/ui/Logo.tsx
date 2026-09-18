import Image from "next/image";

type LogoProps = {
  variant?: "white" | "blue";
  size?: number;
  wordmark?: boolean;
  wordmarkClassName?: string;
};

// Emblema ufficiale A.M.I. (lettere "Ami" nella mezza ruota dentata),
// dal sito amitransfer.com, in bianco piatto sui fondi scuri.
export default function Logo({ variant = "white", size = 44, wordmark = true, wordmarkClassName = "" }: LogoProps) {
  const src = variant === "white" ? "/brand/ami-emblem-white.png" : "/brand/ami-emblem.png";
  const text = variant === "white" ? "text-white" : "text-blue";
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src={src}
        alt=""
        width={Math.round(size * 1.243)}
        height={size}
        priority
        unoptimized
        className="block"
        style={{ height: size, width: "auto" }}
      />
      {wordmark && (
        <span className={`font-heading text-[22px] leading-none font-extrabold tracking-[0.12em] ${text} ${wordmarkClassName}`}>
          A.M.I.
        </span>
      )}
    </span>
  );
}
