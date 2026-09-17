export const SITE_URL = "https://www.amitransfer.com";

export const COMPANY = {
  shortName: "A.M.I.",
  legalName: "A.M.I. — Automazione Meccanica Industriale S.r.l.",
  founded: "1978",
  street: "Strada per Porzano 4/C",
  zip: "25025",
  city: "Manerbio",
  province: "BS",
  country: "Italia",
  phone: "+39 030 9380655",
  phoneHref: "tel:+390309380655",
  phone2: "+39 030 9380654",
  phone2Href: "tel:+390309380654",
  email: "info@amitransfer.com",
  vat: "00593180987",
  taxCode: "00971730171",
  rea: "BS 222549",
  linkedin: "https://it.linkedin.com/company/amitransfer",
  youtube: "https://www.youtube.com/@AMITRANSFER",
};

export const NAV = [
  { href: "/azienda", label: "Azienda" },
  { href: "/linee-transfer", label: "Linee transfer" },
  { href: "/lavorazioni", label: "Lavorazioni" },
  { href: "/settori", label: "Settori" },
  { href: "/come-lavoriamo", label: "Come lavoriamo" },
  { href: "/service", label: "Service" },
  { href: "/contatti", label: "Contatti" },
];

export const FOOTER_LINKS = [
  ...NAV,
  { href: "/lavora-con-noi", label: "Lavora con noi" },
  { href: "/note-legali", label: "Note legali" },
  { href: "/privacy", label: "Privacy" },
];

export const CTA = {
  primary: { href: "/contatti", label: "Invia il disegno del pezzo" },
  secondary: { href: COMPANY.phoneHref, label: `Parla con l'ufficio tecnico` },
};

export function pageTitle(title: string) {
  return `${title} | A.M.I.`;
}
