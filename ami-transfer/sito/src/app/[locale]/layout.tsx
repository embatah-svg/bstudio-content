import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY, SITE_URL } from "@/lib/site";
import { LOCALES, isLocale } from "@/i18n/config";
import { alternates, buildSlugMap, getDictionary, href } from "@/i18n";
import "../globals.css";

const archivo = Archivo({ variable: "--font-archivo", weight: ["500", "700", "800"], subsets: ["latin"] });
const plexSans = IBM_Plex_Sans({ variable: "--font-plex", weight: ["400", "500"], subsets: ["latin"] });

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.ui.siteTitle, template: "%s" },
    description: d.ui.siteDescription,
    alternates: alternates(),
    openGraph: {
      type: "website",
      siteName: "A.M.I. Transfer",
      locale,
      images: [{ url: "/images/sede-drone.webp", width: 1280, height: 720, alt: d.pages.azienda.heroAlt }],
    },
    twitter: { card: "summary_large_image" },
    robots: process.env.NEXT_PUBLIC_NOINDEX === "1" ? { index: false, follow: false } : undefined,
  };
}

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

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const nav = (Object.keys(d.ui.nav) as (keyof typeof d.ui.nav)[])
    .filter((k) => !["lavora-con-noi", "note-legali", "privacy"].includes(k))
    .map((k) => ({ href: href(locale, k), label: d.ui.nav[k] }));

  return (
    <html lang={locale} className={`${archivo.variable} ${plexSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Header
          locale={locale}
          homeHref={href(locale)}
          nav={nav}
          careers={{ href: href(locale, "lavora-con-noi"), label: d.ui.nav["lavora-con-noi"] }}
          labels={{ menu: d.ui.menu, close: d.ui.close, language: d.ui.language, call: d.ui.call, home: d.ui.home }}
          slugMap={buildSlugMap()}
        />
        <main>{children}</main>
        <Footer d={d} />
      </body>
    </html>
  );
}
