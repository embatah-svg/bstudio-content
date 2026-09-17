import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "A.M.I. — Linee transfer per lavorazione tubo",
  description:
    "Linee transfer lineari per la lavorazione del tubo metallico. Progettate, programmate e collaudate a Manerbio (BS).",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  url: SITE_URL,
  foundingDate: COMPANY.founded,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  vatID: `IT${COMPANY.vat}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: COMPANY.zip,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.province,
    addressCountry: "IT",
  },
  sameAs: [COMPANY.linkedin, COMPANY.youtube],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${archivo.variable} ${plexSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
