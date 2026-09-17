"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { COMPANY, NAV } from "@/lib/site";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-20 transition-[background-color,padding] duration-200 ${
        solid || open ? "bg-petrol py-[14px]" : "bg-transparent py-[22px]"
      }`}
    >
      <div className="mx-auto flex w-[min(1180px,92vw)] items-center justify-between gap-5">
        <Link href="/" aria-label="A.M.I. — Home" onClick={() => setOpen(false)} className="no-underline">
          <Logo variant="white" size={44} />
        </Link>

        <nav aria-label="Principale" className="hidden gap-7 text-[15px] min-[980px]:flex">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-[2px] text-[#cfd8de] no-underline hover:border-yellow hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 min-[980px]:hidden">
          <a
            href={COMPANY.phoneHref}
            className="hidden font-heading text-[15px] font-bold whitespace-nowrap text-white no-underline min-[560px]:block"
            aria-label={`Chiama ${COMPANY.phone}`}
          >
            {COMPANY.phone}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="border border-[#5d707c] px-3 py-2 font-heading text-[14px] font-bold text-white"
          >
            {open ? "Chiudi" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="fixed inset-0 top-[62px] z-10 bg-petrol min-[980px]:hidden">
          <nav aria-label="Principale mobile" className="mx-auto flex w-[min(1180px,92vw)] flex-col py-6">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[rgba(255,255,255,0.12)] py-4 font-heading text-[24px] font-bold text-white no-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lavora-con-noi"
              onClick={() => setOpen(false)}
              className="py-4 text-[17px] text-[#cfd8de] no-underline"
            >
              Lavora con noi
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="mt-6 inline-block self-start bg-yellow px-[26px] py-[15px] font-heading text-[16px] font-bold text-[#17130a] no-underline"
            >
              {COMPANY.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
