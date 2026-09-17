import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base =
    "inline-block px-[26px] py-[15px] font-heading font-bold text-[16px] no-underline border";
  const styles =
    variant === "primary"
      ? "bg-yellow text-[#17130a] border-transparent hover:bg-[#ffc91f]"
      : "border-[#5d707c] text-[#e7eef2] hover:border-white";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
