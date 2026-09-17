import Button from "@/components/ui/Button";

const DEPARTMENTS = [
  {
    title: "Progettazione",
    text: "Ufficio tecnico dedicato, modellazione 3D dell'intera linea prima di tagliare il primo pezzo.",
  },
  {
    title: "Programmazione PLC",
    text: "Logiche di automazione scritte in casa: la macchina resta modificabile nel tempo.",
  },
  {
    title: "Carpenteria pesante",
    text: "Strutture elettrosaldate costruite internamente per sostenere le unità operative.",
  },
  {
    title: "Lavorazioni meccaniche",
    text: "Centri di lavoro e alesatrici per basamenti e strutture di grandi dimensioni.",
  },
  {
    title: "Controllo qualità",
    text: "Personale e strumenti di misura dedicati, sui componenti in arrivo e sui pezzi prodotti.",
  },
  {
    title: "Montaggio e collaudo",
    text: "Impianti elettrici, oleodinamici e pneumatici, messa a punto e collaudo finale in stabilimento.",
  },
];

export default function Departments() {
  return (
    <section id="reparti" className="bg-petrol py-[clamp(64px,9vw,120px)] text-[#e7eef2]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-[62ch]">
          <h2 className="max-w-[20ch] text-[clamp(30px,4.4vw,50px)] text-white">
            Dalla progettazione al collaudo, tutto sotto lo stesso tetto.
          </h2>
          <p className="mt-[22px] text-[#a9bac4]">
            Ogni fase critica della linea è interna. Significa un solo interlocutore, tempi che
            non dipendono da terzi e la possibilità di rimettere mano alla macchina anche a dieci
            anni dalla consegna.
          </p>
        </div>
        <div className="mt-[52px] grid grid-cols-1 gap-7 min-[520px]:grid-cols-2 min-[860px]:grid-cols-3 min-[860px]:gap-x-11">
          {DEPARTMENTS.map((d) => (
            <div key={d.title} className="border-t-2 border-yellow pt-4">
              <h3 className="mb-2 text-[19px] text-white">{d.title}</h3>
              <p className="m-0 text-[15.5px] text-[#9db0bb]">{d.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/come-lavoriamo" variant="secondary">
            Come lavoriamo
          </Button>
        </div>
      </div>
    </section>
  );
}
