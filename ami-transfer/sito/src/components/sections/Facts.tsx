const FACTS = [
  { value: "1978", label: "l'anno della prima linea uscita da Manerbio" },
  { value: "7.000", label: "metri quadri di stabilimento" },
  { value: "20+", label: "linee dedicate ogni anno" },
  { value: "1", label: "interlocutore, dalla progettazione al collaudo" },
];

export default function Facts() {
  return (
    <div className="bg-petrol-2 py-[54px] text-[#e7eef2]">
      <div className="mx-auto grid w-[min(1180px,92vw)] grid-cols-2 gap-[26px] min-[760px]:grid-cols-4 min-[760px]:gap-[34px]">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <b className="block font-heading text-[clamp(34px,4vw,54px)] font-extrabold text-white">
              {fact.value}
            </b>
            <small className="mt-[6px] block text-[14.5px] text-[#93a5b0]">{fact.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
