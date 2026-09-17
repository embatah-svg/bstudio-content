import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline-dark";
};

const STYLES = {
  primary: "bg-yellow text-[#17130a] border-transparent hover:bg-[#ffc91f]",
  secondary: "border-[#5d707c] text-[#e7eef2] hover:border-white",
  "outline-dark": "border-ink text-ink hover:bg-ink hover:text-paper",
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block border px-[26px] py-[15px] font-heading text-[16px] font-bold no-underline transition-colors duration-[120ms] ${STYLES[variant]}`}
    >
      {children}
    </Link>
  );
}
