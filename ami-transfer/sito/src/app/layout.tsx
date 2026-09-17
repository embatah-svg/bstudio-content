import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
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
  title: "A.M.I. — Linee transfer per lavorazione tubo",
  description:
    "Linee transfer lineari per la lavorazione del tubo metallico. Progettate, programmate e collaudate a Manerbio (BS).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${archivo.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
