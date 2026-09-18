import type { Locale } from "@/i18n/config";

// Bandiere come SVG inline (le emoji non si vedono su Windows). Semplificate
// per leggere bene a 20 px, rapporto 3:2, angoli vivi come il resto del sito.
export default function Flag({ locale, size = 20 }: { locale: Locale; size?: number }) {
  const w = size;
  const h = Math.round((size * 2) / 3);
  const common = { width: w, height: h, viewBox: "0 0 30 20", "aria-hidden": true, focusable: false } as const;

  switch (locale) {
    case "it":
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#f4f5f0" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        </svg>
      );
    case "en":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
          <path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" strokeWidth="1.6" />
          <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
          <path d="M15 0V20M0 10H30" stroke="#c8102e" strokeWidth="3.4" />
        </svg>
      );
    case "de":
      return (
        <svg {...common}>
          <rect width="30" height="7" fill="#000" />
          <rect y="7" width="30" height="6" fill="#dd0000" />
          <rect y="13" width="30" height="7" fill="#ffce00" />
        </svg>
      );
    case "fr":
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#002395" />
          <rect x="10" width="10" height="20" fill="#f4f5f0" />
          <rect x="20" width="10" height="20" fill="#ed2939" />
        </svg>
      );
    case "es":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#aa151b" />
          <rect y="5" width="30" height="10" fill="#f1bf00" />
        </svg>
      );
    case "pt":
      return (
        <svg {...common}>
          <rect width="12" height="20" fill="#006600" />
          <rect x="12" width="18" height="20" fill="#ff0000" />
          <circle cx="12" cy="10" r="4.2" fill="#ffe000" />
          <circle cx="12" cy="10" r="2.4" fill="#ff0000" />
        </svg>
      );
  }
}
