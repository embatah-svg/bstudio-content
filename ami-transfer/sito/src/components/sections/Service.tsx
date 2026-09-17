const ITEMS = [
  "Ricambi originali e componenti a fine vita segnalati prima che si fermino",
  "Retrofit di quadro e PLC su linee ancora meccanicamente sane",
  "Modifica della linea per un pezzo nuovo o un ciclo diverso",
  "Assistenza in remoto e in campo, in tutta Europa",
];

export default function Service() {
  return (
    <section id="service" className="bg-blue py-[clamp(64px,9vw,120px)] text-white">
      <div className="mx-auto grid w-[min(1180px,92vw)] grid-cols-1 gap-8 min-[860px]:grid-cols-[1.1fr_0.9fr] min-[860px]:gap-14">
        <div>
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)] text-white">
            La linea che avete comprato vent&apos;anni fa la conosciamo ancora.
          </h2>
          <p className="mt-[22px] text-[#cfe0ec]">
            Abbiamo l&apos;archivio di ogni commessa che è uscita da Manerbio: schemi,
            programmi, distinte. Per questo un ricambio si identifica in giornata e un
            intervento parte da dove serve.
          </p>
        </div>
        <ul className="m-0 list-disc pl-5 text-[16px] text-[#cfe0ec]">
          {ITEMS.map((item) => (
            <li key={item} className="mb-[10px]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
