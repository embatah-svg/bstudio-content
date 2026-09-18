import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/i18n/config";

export const LANG_COOKIE = "ami-lang";

// Lingua del visitatore: prima la preferenza salvata (cookie, impostato dal
// selettore lingua), poi Accept-Language del browser, infine l'italiano.
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LANG_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const header = req.headers.get("accept-language") ?? "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const w of wanted) {
    if (isLocale(w.lang)) return w.lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (LOCALES.includes(first as Locale)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Solo la radice e i percorsi senza prefisso lingua; mai asset, API, metadata.
  matcher: ["/((?!api|_next|brand|images|icon.png|robots.txt|sitemap.xml|.*\\..*).*)"],
};
