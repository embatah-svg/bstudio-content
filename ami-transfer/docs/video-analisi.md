# Analisi video AMI (canale YouTube @AMITRANSFER)

Video muti del 2009. Analisi per fotogrammi (nessun audio disponibile).
Metodo: `yt-dlp` (download, qualità max disponibile per ogni video) + `ffmpeg`
(estrazione di un fotogramma ogni 3s) + lettura visiva dei fotogrammi.

> Nota di affidabilità: i video originali sono a bassa risoluzione (240p per il
> primo analizzato). Le lavorazioni descritte sotto sono una lettura visiva
> plausibile, non una certezza tecnica — da validare con Riccardo/AMI prima di
> usarle come claim sul sito (vedi regola "nessun dato aziendale inventato" in
> `CLAUDE.md`).

## Video 1 — "172 ami@amitransfer.it"

- URL: https://www.youtube.com/watch?v=rs3DsfBYy5k
- Durata: ~75s, muto, 384x288 (240p, massima qualità disponibile su YouTube per questo video)

Sequenza osservata:
1. **Alimentazione**: fascio di tubi tondi (diametro ridotto, apparenza acciaio/inox lucido) impilati su un piano di carico all'ingresso della linea.
2. **Trasferimento a portale**: un gantry con pinze pneumatiche (tubazioni blu visibili = comando pneumatico) preleva i tubi uno alla volta e li sposta da una stazione fissa alla successiva — tipico schema "transfer a passo" con più stazioni in linea.
3. **Stazione di bloccaggio**: primo piano su una pinza/morsa che blocca il tubo in posizione fissa per la lavorazione di testata.
4. **Lavorazione di testa**: una testa mobile con mandrino verticale scende sull'estremità del tubo bloccato — compatibile con un'operazione di **sbavatura/smussatura (chamfering) o eventualmente foratura/spianatura di testa**; la risoluzione non permette di distinguere l'utensile con certezza.
5. **Scarico**: i tubi lavorati escono dalla macchina su un nastro/scivolo di uscita.

Lettura complessiva (da verificare): linea di transfer automatica per la **lavorazione di testa di tubi tondi di piccolo diametro**, alimentazione automatica da fascio, trasferimento pick-and-place pneumatico multi-stazione, scarico automatico.

## Video 2 — "182 ami@amitransfer.it"

- URL: https://www.youtube.com/watch?v=PwLIwiplJSA
- Durata: ~97s, muto, 384x288 (240p, massima qualità disponibile)

Sequenza osservata:
1. **Macchina a portale doppio**: telaio con due bracci/pattini che scorrono su guide orizzontali sopra la linea — layout diverso dal video 1, sembra una macchina a stazione singola più che un transfer multi-stazione.
2. **Pezzo di diametro maggiore**: rispetto al video 1, qui si vede una singola barra/tubo di sezione più grande, tenuta in orizzontale tra due mandrini/contropunte.
3. **Rotazione del pezzo**: in un fotogramma il tubo appare in rotazione attorno al proprio asse mentre è bloccato tra due sedi — compatibile con un'operazione di **tornitura, rettifica o lucidatura della superficie esterna**, oppure una stazione di controllo/centraggio; non distinguibile con certezza a questa risoluzione.
4. **Fissaggio color ottone/bronzo**: primo piano su un blocco dorato-ottonato, probabile boccola o supporto di scorrimento (bronzina) del mandrino.
5. **Scarico su pallet**: fotogramma finale sfocato (macchina/mezzo in movimento, forse un muletto) con barre finite accatastate su un pallet — fase di stoccaggio/movimentazione a fine linea.

Lettura complessiva (da verificare): macchina per la **lavorazione di barre/tubi di diametro maggiore rispetto al video 1** — verosimilmente tornitura/rettifica/lucidatura esterna o centraggio tra contropunte — con scarico dei pezzi finiti su pallet. Più incerta del video 1: qualità video peggiore nei fotogrammi centrali (motion blur).

## Video 3 — "176 ami@amitransfer.it"

- URL: https://www.youtube.com/watch?v=FW5vHxkH-Ys
- Durata: ~151s, muto, 384x288 (240p)

Sequenza osservata:
1. **Linea a doppio binario**: telaio blu con recinzioni di sicurezza gialle, layout molto più esteso e complesso delle prime due — due tubi vengono lavorati in parallelo, in modo simmetrico (specchiato), lungo tutta la linea.
2. **Ingresso tubi**: tubi tondi scorrono su rulliera verso le stazioni di lavoro.
3. **Stazione multi-cilindro**: una fixture con una griglia di attuatori pneumatici verticali (più punti di pressatura/bloccaggio contemporanei) — compatibile con una stazione di **pressatura, clinciatura o test** su più punti del pezzo.
4. **Alimentatori vibranti**: due tramogge vibranti (bowl feeder) trasparenti visibili — tipiche per alimentare automaticamente piccoli componenti (viti, tappi, raccordi) verso una stazione di assemblaggio.
5. **Testa multi-mandrino**: batteria di mandrini/utensili paralleli in doppia fila che avanzano verso i pezzi — compatibile con un'operazione di **avvitatura, inserimento raccordi o pressatura multipla** in contemporanea sui due binari.

Lettura complessiva (da verificare): rispetto ai video 1-2 (semplice lavorazione di testa), questa sembra una **linea di assemblaggio automatica più complessa a doppio binario**, con alimentazione di componenti (bowl feeder) e stazioni multi-mandrino — probabile assemblaggio tubo+raccordo/componente, non solo lavorazione meccanica del tubo.

## Video 4 — "130 ami@amitransfer.it"

- URL: https://www.youtube.com/watch?v=o35loSojbwg
- Durata: ~151s, muto, 384x288 (240p)

Sequenza osservata:
1. **Alimentazione a rampa inclinata**: tubi/barre scorrono su un piano inclinato verso l'ingresso macchina.
2. **Fixture di precisione**: primo piano su un blocco di bloccaggio/pinza in acciaio lucido molto preciso attorno a un'estremità di tubo — compatibile con una stazione di **calibratura/sagomatura (swaging) di testa** o centraggio di precisione.
3. **Scarico su scivolo inclinato**: i pezzi lavorati scendono su una guida inclinata.
4. **Accumulo su rastrelliera**: fotogrammi finali mostrano numerose barre/tubi lucidi allineati in file parallele su una rastrelliera di stoccaggio a fine linea — lotto di pezzi finiti pronti per il confezionamento.

Lettura complessiva (da verificare): macchina orientata alla **lavorazione di precisione di testa (calibratura/sagomatura) su barre/tubi**, con accumulo automatico dei pezzi finiti in rastrelliera.

## Video 5 — "115 ami@amitransfer.it"

- URL: https://www.youtube.com/watch?v=gPolXQy389I
- Durata: ~128s, muto (nota: scaricato da stream HLS, la versione https diretta dava errore 403 — qualità comunque bassa/240p)

Sequenza osservata:
1. **Linea a portale con blocchi di serraggio**: struttura simile alle altre linee, con pinze/morse che bloccano i tubi in sequenza.
2. **Stazione di saldatura**: un fotogramma mostra chiaramente un **arco/scintilla di saldatura** molto luminoso su un braccio robotizzato/utensile che opera su un tubo — a differenza dei video precedenti, qui compare per la prima volta un'operazione di **saldatura automatica**.
3. **Tavolo di accumulo a rulli**: ampio tavolo con multiple guide parallele per l'accumulo/buffer dei tubi lavorati.
4. **Dettaglio di un rullo/pattino** di supporto su guida — elemento di scorrimento della linea.

Lettura complessiva (da verificare): a differenza delle lavorazioni di sola testa (video 1, 4) o assemblaggio con bowl feeder (video 3), questa linea include una **stazione di saldatura automatica** — indica che AMI Transfer realizza anche linee con saldatura integrata, non solo taglio/sbavatura/calibratura.

## Sintesi trasversale (5 video)

Le linee AMI Transfer mostrate coprono un ventaglio di lavorazioni su tubi/barre tonde metalliche:
- alimentazione automatica (fascio, rampa inclinata, rulliera)
- trasferimento pick-and-place pneumatico multi-stazione (schema "transfer")
- lavorazione di testa (sbavatura/chamfering, calibratura/sagomatura)
- lavorazioni di superficie su barre di diametro maggiore (tornitura/rettifica/lucidatura, da confermare)
- assemblaggio con alimentazione componenti da bowl feeder e stazioni multi-mandrino
- saldatura automatica
- scarico/accumulo automatico (nastro, scivolo, rastrelliera, pallet)

Messaggio di posizionamento plausibile per il sito (da validare con Riccardo): AMI Transfer progetta **linee di transfer automatiche su misura per la lavorazione di tubi e barre metalliche**, coprendo l'intero ciclo dall'alimentazione allo scarico, con stazioni intercambiabili per lavorazione di testa, assemblaggio e saldatura.

## Video aziendale — "materializing ideas" (LinkedIn, 2021)

- Fonte: https://www.linkedin.com/posts/amitransfer_materializing-ideas-activity-6949976385482330112-9dm2
- Durata: 3:07, **720p** (qualità nettamente migliore dei video YouTube 2009), con probabile musica/voce (non verificato, analisi solo video)
- Hashtag originali: `#automation #fences`

Contenuto (fotogrammi ogni 5s):
1. **Ripresa drone della sede**: edificio uffici a 2 piani + capannone industriale adiacente, logo aziendale (ingranaggio blu stilizzato) sulla facciata, parcheggio con diverse auto — sede in zona industriale (pianura, capannoni vicini), verosimilmente Emilia-Romagna/Veneto (da confermare con Riccardo).
2. **Interni uffici**: corridoio, sala riunioni con un **tavolo da ping-pong riconvertito a tavolo riunioni** (dettaglio distintivo di cultura aziendale) — persone reali (staff AMI) al lavoro con laptop e appunti.
3. **Reparto CNC**: operatore in gilet alta visibilità gialla davanti a un centro di lavoro **Doosan DNM 5700**, primi piani su utensili e cambio pallet.
4. **Reparto linee transfer**: gantry blu con pinze pneumatiche (stesso linguaggio visivo dei video YouTube ma qualità molto più alta), primi piani su fixture di bloccaggio con marchio aziendale inciso (ingranaggio) su componenti color ottone/rame.
5. **Robotica**: braccio robotico antropomorfo arancione (6 assi, tipo KUKA) su base blu che movimenta pezzi verso pallet in legno.

Questo video è la fonte visiva **migliore e più recente** (2021, alta risoluzione, brand reale già presente sui macchinari) trovata finora — da usare come riferimento primario per le sezioni "Azienda"/"Chi siamo"/"Stabilimento" del sito, più dei video YouTube 2009. Contiene volti di dipendenti reali: se si usano fermo-immagine sul sito, va chiesto il consenso a Riccardo prima di pubblicarli (persone identificabili).
