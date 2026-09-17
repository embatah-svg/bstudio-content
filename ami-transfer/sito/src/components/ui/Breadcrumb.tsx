import Link from "next/link";

export type Crumb = { href: string; label: string };

export default function Breadcrumb({ items, homeHref, homeLabel, ariaLabel }: { items: Crumb[]; homeHref: string; homeLabel: string; ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel} className="text-[14px] text-steel">
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
        <li>
          <Link href={homeHref} className="no-underline hover:text-white">
            {homeLabel}
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex gap-2">
              <span aria-hidden="true">/</span>
              {last ? (
                <span aria-current="page" className="text-[#cfd8de]">{item.label}</span>
              ) : (
                <Link href={item.href} className="no-underline hover:text-white">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
