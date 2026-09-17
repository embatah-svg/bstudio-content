"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import { COMPANY } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { SlugMap } from "@/i18n";

type NavLink = { href: string; label: string };

type HeaderProps = {
  locale: Locale;
  homeHref: string;
  nav: NavLink[];
  careers: NavLink;
  labels: { menu: string; close: string; language: string; call: string; home: string };
  slugMap: SlugMap;
};

export default function Header({ locale, homeHref, nav, careers, labels, slugMap }: HeaderProps) {
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
        <Link href={homeHref} aria-label={`A.M.I. — ${labels.home}`} onClick={() => setOpen(false)} className="no-underline">
          <Logo variant="white" size={44} />
        </Link>

        <div className="hidden items-center gap-7 min-[1100px]:flex">
          <nav className="flex gap-6 text-[15px]">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-transparent pb-[2px] text-[#cfd8de] no-underline hover:border-yellow hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitch locale={locale} slugMap={slugMap} label={labels.language} />
        </div>

        <div className="flex items-center gap-4 min-[1100px]:hidden">
          <a
            href={COMPANY.phoneHref}
            className="hidden font-heading text-[15px] font-bold whitespace-nowrap text-white no-underline min-[560px]:block"
            aria-label={`${labels.call} ${COMPANY.phone}`}
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
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="fixed inset-0 top-[62px] z-10 overflow-y-auto bg-petrol min-[1100px]:hidden">
          <nav className="mx-auto flex w-[min(1180px,92vw)] flex-col py-6">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[rgba(255,255,255,0.12)] py-4 font-heading text-[24px] font-bold text-white no-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link href={careers.href} onClick={() => setOpen(false)} className="py-4 text-[17px] text-[#cfd8de] no-underline">
              {careers.label}
            </Link>
            <div className="py-4">
              <LanguageSwitch locale={locale} slugMap={slugMap} label={labels.language} onNavigate={() => setOpen(false)} />
            </div>
            <a
              href={COMPANY.phoneHref}
              className="mt-2 inline-block self-start bg-yellow px-[26px] py-[15px] font-heading text-[16px] font-bold text-[#17130a] no-underline"
            >
              {COMPANY.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
