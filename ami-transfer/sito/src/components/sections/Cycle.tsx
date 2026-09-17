const STATIONS = [
  {
    n: "Stazione 1",
    title: "Carico",
    text: "Alimentazione automatica da fascio o da barra, con controllo di presenza pezzo.",
  },
  {
    n: "Stazione 2",
    title: "Calibratura",
    text: "Ripresa del diametro e della circolarità prima delle lavorazioni successive.",
  },
  {
    n: "Stazione 3",
    title: "Foratura",
    text: "Unità operative dedicate, posizionate sul passo richiesto dal disegno cliente.",
  },
  {
    n: "Stazione 4",
    title: "Tranciatura",
    text: "Asportazione senza truciolo dove la geometria del pezzo lo consente.",
  },
  {
    n: "Stazione 5",
    title: "Filettatura",
    text: "Gruppi maschiatori sincronizzati con il ciclo di indexaggio.",
  },
  {
    n: "Stazione 6",
    title: "Controllo e scarico",
    text: "Verifica dimensionale in linea e separazione automatica dello scarto.",
  },
];

export default function Cycle() {
  return (
    <section id="ciclo" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[62ch]">
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)]">
            Una sola linea, sei stazioni, un pezzo finito a ogni passo.
          </h2>
          <p className="mt-[22px] text-[#3b4850]">
            La linea avanza a passo fisso: a ogni indexaggio tutte le stazioni lavorano
            contemporaneamente sul proprio tratto di tubo. Il tempo ciclo è quello della
            stazione più lenta, non della somma delle lavorazioni.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-px bg-[rgba(19,26,30,0.2)] min-[520px]:grid-cols-2 min-[860px]:grid-cols-3">
          {STATIONS.map((s) => (
            <div key={s.n} className="bg-paper px-6 pt-[26px] pb-[30px]">
              <div className="mb-[14px] flex items-center gap-[10px] font-heading text-[15px] font-bold text-blue">
                {s.n}
                <span className="h-px flex-1 bg-[rgba(36,80,107,0.35)]" />
              </div>
              <h3 className="mb-2 text-[21px]">{s.title}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
