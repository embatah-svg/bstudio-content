import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Le anteprime (Vercel) non devono essere indicizzate come duplicato del
// dominio reale: NEXT_PUBLIC_NOINDEX=1 chiude tutto ai motori.
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
