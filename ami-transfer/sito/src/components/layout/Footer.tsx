import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { COMPANY, FOOTER_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-petrol py-[clamp(40px,6vw,64px)] text-[14px] text-[#7d8f9a]">
      <div className="mx-auto grid w-[min(1180px,92vw)] grid-cols-1 gap-10 min-[760px]:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo variant="white" size={48} />
          <address className="mt-4 leading-[1.8] not-italic">
            {COMPANY.legalName}
            <br />
            {COMPANY.street}, {COMPANY.zip} {COMPANY.city} ({COMPANY.province}), {COMPANY.country}
            <br />
            P.IVA {COMPANY.vat} · C.F. {COMPANY.taxCode} · REA {COMPANY.rea}
          </address>
        </div>
        <div>
          <div className="font-heading text-[15px] font-bold text-[#cfd8de]">Contatti</div>
          <ul className="m-0 mt-3 list-none p-0 leading-[1.9]">
            <li>
              <a href={COMPANY.phoneHref} className="no-underline hover:text-white">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={COMPANY.phone2Href} className="no-underline hover:text-white">
                {COMPANY.phone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="no-underline hover:text-white">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={COMPANY.linkedin} rel="noopener noreferrer" target="_blank" className="no-underline hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={COMPANY.youtube} rel="noopener noreferrer" target="_blank" className="no-underline hover:text-white">
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-heading text-[15px] font-bold text-[#cfd8de]">Sito</div>
          <ul className="m-0 mt-3 list-none p-0 leading-[1.9]">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="no-underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
