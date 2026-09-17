// Segnaposto visibile per dati non ancora verificati con l'azienda.
// Regola di progetto: nessun dato inventato; qui si mostra cosa manca.
export default function Todo({ children }: { children: string }) {
  return (
    <span className="inline-block border border-yellow bg-[rgba(232,180,0,0.12)] px-2 py-px font-heading text-[13px] font-bold tracking-[0.02em] text-[#6b5300]">
      {children}
    </span>
  );
}
