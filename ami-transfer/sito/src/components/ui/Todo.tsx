import { SHOW_TODO } from "@/lib/todo";

// Segnaposto visibile per dati non ancora verificati con l'azienda.
// Neutro di proposito: il giallo resta riservato alle CTA.
export default function Todo({ children }: { children: string }) {
  if (!SHOW_TODO) return null;
  return (
    <span className="inline-block border border-dashed border-[rgba(19,26,30,0.4)] px-2 py-px font-heading text-[13px] font-bold text-[#5a6870]">
      {children}
    </span>
  );
}
