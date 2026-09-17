const LINKS = [
  { href: "#ciclo", label: "La linea" },
  { href: "#reparti", label: "Reparti" },
  { href: "#settori", label: "Settori" },
  { href: "#service", label: "Service" },
  { href: "#contatti", label: "Contatti" },
];

export default function Header() {
  return (
    <header className="absolute top-0 right-0 left-0 z-10 py-[22px]">
      <div className="mx-auto flex w-[min(1180px,92vw)] items-center justify-between gap-5">
        <div className="font-heading text-[26px] font-extrabold tracking-[0.14em] text-white">
          A<span className="text-yellow">.</span>M<span className="text-yellow">.</span>I
          <span className="text-yellow">.</span>
        </div>
        <nav className="hidden gap-7 text-[15px] min-[860px]:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-[2px] text-[#cfd8de] no-underline hover:border-yellow hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
