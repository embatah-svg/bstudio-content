const SECTORS = [
  {
    title: "Automotive",
    text: "Componenti tubolari per impianti di scarico, climatizzazione e sistemi frenanti, su volumi di serie.",
  },
  {
    title: "Building",
    text: "Tubo per impianti idrotermosanitari, ponteggi e carpenteria leggera.",
  },
  {
    title: "Elettrodomestico",
    text: "Scambiatori di calore, gruppi termici e componenti per il bianco.",
  },
];

export default function Sectors() {
  return (
    <section id="settori" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[62ch]">
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)]">
            Chi ci porta un pezzo, non un capitolato.
          </h2>
          <p className="mt-[22px] text-[#3b4850]">
            Partiamo dal disegno del pezzo e dalla produttività richiesta, e costruiamo la linea
            intorno a quelli.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 min-[760px]:grid-cols-3">
          {SECTORS.map((s) => (
            <div key={s.title} className="min-h-[180px] border-l-4 border-blue bg-paper-2 px-[26px] py-[30px]">
              <h3 className="mb-[10px] text-[22px]">{s.title}</h3>
              <p className="m-0 text-[15.5px] text-[#4a575f]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
