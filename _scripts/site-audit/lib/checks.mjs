// Regole di valutazione. Ogni check riceve i dati grezzi e restituisce un rilievo
// (o null se non c'è nulla da segnalare).
//
// Tutti i testi rivolti alla cliente stanno qui dentro: per una versione tedesca
// del report basta tradurre questo file, il resto della pipeline non cambia.

export const PESI = { critico: 12, alto: 8, medio: 4, basso: 2 };

export const AREE = {
  fiducia: 'Credibilità e fiducia',
  mobile: 'Esperienza da telefono',
  trovabilita: 'Trovabilità su Google',
  conversione: 'Trasformare visite in clienti',
  velocita: 'Velocità',
  legale: 'Obblighi di legge (Svizzera)',
  tecnica: 'Qualità tecnica',
  accessibilita: 'Accessibilità',
};

const f = (o) => ({ ...o, peso: PESI[o.severita] });
const pct = (n, tot) => (tot ? Math.round((n / tot) * 100) : 0);
const kb = (bytes) => Math.round(bytes / 1024);

// ---------------------------------------------------------------- FIDUCIA

const checkHttps = (d) =>
  d.http?.isHttps
    ? null
    : f({
        id: 'https',
        area: 'fiducia',
        severita: 'critico',
        titolo: 'Il sito non è protetto: il browser mostra "Non sicuro"',
        problema:
          'Il sito viaggia su HTTP e non su HTTPS. Chrome, Safari ed Edge scrivono "Non sicuro" nella barra degli indirizzi, accanto al nome del sito.',
        impatto:
          'È la prima cosa che un cliente legge, prima ancora di vedere una foto. Su un sito che tratta dati personali (nome, telefono, richiesta di appuntamento) l\'avviso fa chiudere la pagina immediatamente. Google inoltre penalizza in modo esplicito i siti senza HTTPS.',
        evidenza: [`Indirizzo finale: ${d.http?.finalUrl}`],
        soluzione:
          'Attivare il certificato SSL (gratuito con Let\'s Encrypt, incluso in tutti gli hosting seri) e reindirizzare in modo permanente tutto il traffico HTTP verso HTTPS.',
      });

const checkHttpRedirect = (d) => {
  if (!d.http?.isHttps || !d.httpRedirect) return null;
  return d.httpRedirect.finalUrl?.startsWith('https://')
    ? null
    : f({
        id: 'http-redirect',
        area: 'tecnica',
        severita: 'medio',
        titolo: 'La versione non protetta del sito resta raggiungibile',
        problema: `Aprendo l'indirizzo con http:// il sito risponde ancora senza reindirizzare a https:// (destinazione: ${d.httpRedirect.finalUrl}).`,
        impatto:
          'Chi arriva da un vecchio link o da un volantino stampato vede comunque la versione "Non sicura", e Google considera due siti distinti con gli stessi contenuti.',
        soluzione: 'Aggiungere un reindirizzamento permanente (301) da HTTP a HTTPS a livello di server.',
      });
};

const checkLorem = (d) =>
  d.dom?.signals?.lorem
    ? f({
        id: 'lorem',
        area: 'fiducia',
        severita: 'critico',
        titolo: 'Sul sito è rimasto il testo finto del modello',
        problema:
          'Nella pagina è presente testo segnaposto ("Lorem ipsum" o simili), cioè il riempitivo che il modello grafico usa prima che vengano inseriti i contenuti veri.',
        impatto:
          'Comunica al visitatore che il sito non è finito e che nessuno se ne occupa. È il segnale più forte di trascuratezza che un sito possa dare.',
        soluzione: 'Sostituire ogni testo segnaposto con contenuti reali su trattamenti, prezzi e persone.',
      })
    : null;

const checkCopyright = (d) => {
  const y = d.dom?.signals?.copyrightYear;
  const now = new Date().getFullYear();
  if (!y || now - Number(y) < 2) return null;
  return f({
    id: 'copyright',
    area: 'fiducia',
    severita: 'medio',
    titolo: `Il piè di pagina è fermo al ${y}`,
    problema: `In fondo alla pagina compare "© ${y}", cioè ${now - Number(y)} anni fa.`,
    impatto:
      'È la prima cosa che un cliente diffidente controlla per capire se un\'attività è ancora aperta. Una data vecchia fa pensare che il sito sia abbandonato — e quindi anche il salone.',
    soluzione: "Impostare l'anno in modo automatico, così non va più aggiornato a mano.",
  });
};

const checkConsoleErrors = (d) => {
  const errs = (d.consoleErrors || []).filter((e) => e.type === 'error');
  const total = errs.length + (d.pageErrors?.length || 0);
  if (total === 0) return null;
  return f({
    id: 'js-errors',
    area: 'tecnica',
    severita: total > 4 ? 'alto' : 'medio',
    titolo: `${total} error${total === 1 ? 'e' : 'i'} di programmazione mentre la pagina si apre`,
    problema:
      'Il browser segnala errori nel codice del sito. Sono errori che il visitatore non legge, ma che spesso spengono una funzione: un menu che non si apre, un modulo che non parte, una galleria che resta bianca.',
    impatto:
      'Ogni funzione rotta è un cliente che non riesce a fare quello che voleva fare e se ne va senza avvisare.',
    evidenza: [...errs.map((e) => e.text), ...(d.pageErrors || [])].slice(0, 5),
    soluzione: 'Aprire la console del browser, correggere gli errori uno per uno e riverificare.',
  });
};

const checkBrokenLinks = (d) => {
  const broken = (d.linkChecks || []).filter((l) => !l.ok);
  if (!broken.length) return null;
  return f({
    id: 'broken-links',
    area: 'fiducia',
    severita: broken.length > 2 ? 'alto' : 'medio',
    titolo: `${broken.length} collegament${broken.length === 1 ? 'o non funziona' : 'i non funzionano'}`,
    problema: 'Alcuni link della pagina portano a un errore o a una pagina che non esiste più.',
    impatto:
      'Un link rotto interrompe il percorso del cliente proprio mentre sta cercando informazioni. Google lo registra come segnale di sito non curato.',
    evidenza: broken.slice(0, 8).map((l) => `${l.status || 'nessuna risposta'} → ${l.url}`),
    soluzione: 'Correggere o rimuovere i collegamenti non più validi.',
  });
};

const checkNotFoundPage = (d) =>
  d.notFound?.status === 200
    ? f({
        id: '404',
        area: 'tecnica',
        severita: 'basso',
        titolo: 'Le pagine inesistenti rispondono come se esistessero',
        problema:
          'Chiedendo al sito un indirizzo inventato, il server risponde "va tutto bene" (codice 200) invece di dire "pagina non trovata" (codice 404).',
        impatto:
          'Google finisce per indicizzare pagine vuote e senza contenuto, che diluiscono la forza del sito nei risultati di ricerca.',
        soluzione: 'Configurare una pagina 404 vera, con il codice di stato corretto e un link alla home.',
      })
    : null;

// ---------------------------------------------------------------- MOBILE

const checkViewport = (d) =>
  d.dom?.metaViewport
    ? null
    : f({
        id: 'viewport',
        area: 'mobile',
        severita: 'critico',
        titolo: 'Il sito non è impostato per i telefoni',
        problema:
          'Manca l\'istruzione tecnica di base (il "meta viewport") che dice al telefono come adattare la pagina allo schermo. Senza, il telefono mostra la versione desktop rimpicciolita.',
        impatto:
          'Chi apre il sito da telefono vede caratteri minuscoli e deve ingrandire con le dita per leggere qualsiasi cosa. Per un salone la maggior parte delle visite arriva da telefono: significa perdere la maggioranza dei potenziali clienti nei primi secondi.',
        soluzione: 'Aggiungere il meta viewport e verificare che il tema sia effettivamente responsive.',
      });

const checkOverflow = (d) => {
  const o = d.mobile?.overflow;
  if (!o || o.docWidth <= o.winWidth + 2) return null;
  const extra = o.docWidth - o.winWidth;
  return f({
    id: 'overflow',
    area: 'mobile',
    severita: 'alto',
    titolo: `Da telefono la pagina è più larga dello schermo di ${extra}px`,
    problema: `Il contenuto occupa ${o.docWidth}px su uno schermo da ${o.winWidth}px. Il risultato è una barra di scorrimento laterale: il testo esce dal bordo e va trascinato per essere letto.`,
    impatto:
      'Dà immediatamente la sensazione di sito rotto. È l\'errore che più spesso porta il visitatore a chiudere la pagina e cercare un altro salone.',
    evidenza: o.elements.slice(0, 6).map((e) => `<${e.tag}> ${e.cls ? `class="${e.cls}"` : ''} arriva a ${e.right}px`),
    soluzione:
      'Individuare gli elementi con larghezza fissa e sostituirla con larghezze percentuali (max-width: 100%).',
  });
};

const checkTapTargets = (d) => {
  const t = d.mobile?.tapTargets || [];
  if (t.length < 3) return null;
  return f({
    id: 'tap-targets',
    area: 'mobile',
    severita: t.length > 8 ? 'alto' : 'medio',
    titolo: `${t.length} tasti troppo piccoli per essere premuti con il dito`,
    problema:
      'Diversi link e pulsanti sono più piccoli di 40×40 pixel. Le linee guida di Apple e Google indicano 44×44 come minimo perché un dito adulto riesca a centrarli.',
    impatto:
      'Il cliente sbaglia a premere, torna indietro, riprova. Dopo due tentativi a vuoto tipicamente abbandona — e questo succede spesso proprio sul pulsante di prenotazione o sul numero di telefono.',
    evidenza: t.slice(0, 8).map((x) => `"${x.text}" — ${x.w}×${x.h}px`),
    soluzione: 'Portare area cliccabile e spaziatura di link e pulsanti ad almeno 44×44px.',
  });
};

const checkSmallText = (d) => {
  const s = d.mobile?.smallText || [];
  if (s.length < 2) return null;
  return f({
    id: 'small-text',
    area: 'mobile',
    severita: 'medio',
    titolo: `Testo sotto i 14px in ${s.length} punti`,
    problema:
      'Alcuni testi sono impostati a dimensioni che su un telefono risultano difficili da leggere senza ingrandire.',
    impatto:
      'Una parte importante della clientela di un centro estetico ha più di 45 anni. Se deve ingrandire per leggere i prezzi, molto spesso non lo fa: chiude.',
    evidenza: s.slice(0, 6).map((x) => `${x.fontSize}px — "${x.text}"`),
    soluzione: 'Portare il testo corrente ad almeno 16px su mobile.',
  });
};

// ---------------------------------------------------------------- TROVABILITÀ

const checkTitle = (d) => {
  const t = d.dom?.title || '';
  if (t && t.length >= 25 && t.length <= 65) return null;
  const vuoto = !t;
  return f({
    id: 'title',
    area: 'trovabilita',
    severita: vuoto ? 'critico' : 'alto',
    titolo: vuoto
      ? 'Manca il titolo della pagina'
      : `Il titolo della pagina non è ottimizzato (${t.length} caratteri)`,
    problema: vuoto
      ? 'La pagina non ha un titolo. È la riga blu cliccabile che compare nei risultati di Google e il nome della scheda del browser.'
      : `Il titolo attuale è "${t}". La lunghezza utile è 25–65 caratteri: sotto si spreca spazio, sopra Google taglia la frase con i puntini.`,
    impatto:
      'Il titolo è il singolo elemento che pesa di più su quante persone cliccano il risultato in Google. Se non contiene il servizio e la città, chi cerca "massaggio [città]" non trova il salone.',
    evidenza: [`Titolo attuale: ${t || '(vuoto)'}`],
    soluzione:
      'Scrivere un titolo del tipo "Massaggi e trattamenti viso a [Città] | [Nome salone]", entro i 60 caratteri.',
  });
};

const checkMetaDescription = (d) => {
  const m = d.dom?.metaDescription;
  if (m && m.length >= 70 && m.length <= 165) return null;
  return f({
    id: 'meta-description',
    area: 'trovabilita',
    severita: m ? 'medio' : 'alto',
    titolo: m
      ? `La descrizione per Google è fuori misura (${m.length} caratteri)`
      : 'Manca la descrizione per Google',
    problema: m
      ? `La descrizione attuale è di ${m.length} caratteri; lo spazio che Google mostra è di circa 70–160.`
      : 'Non è impostata la meta description: le due righe di testo che Google mostra sotto il titolo del risultato.',
    impatto:
      "Senza descrizione Google pesca una frase a caso dalla pagina, spesso il menu o un pezzo di cookie banner. È l'unico spazio pubblicitario gratuito nei risultati di ricerca, e va sprecato.",
    evidenza: m ? [`Attuale: ${m}`] : undefined,
    soluzione:
      'Scrivere 150 caratteri con servizio, città e un motivo concreto per scegliere il salone, e chiudere con un invito ("Prenota online").',
  });
};

const checkH1 = (d) => {
  const h1 = (d.dom?.headings || []).filter((h) => h.level === 1);
  if (h1.length === 1) return null;
  return f({
    id: 'h1',
    area: 'trovabilita',
    severita: h1.length === 0 ? 'alto' : 'medio',
    titolo: h1.length === 0 ? 'Manca il titolo principale della pagina' : `Ci sono ${h1.length} titoli principali`,
    problema:
      h1.length === 0
        ? 'La pagina non ha un titolo di primo livello (H1): il titolo grande che dichiara di cosa parla la pagina.'
        : `La pagina ha ${h1.length} titoli di primo livello. Dovrebbe essercene uno solo: ${h1.map((h) => `"${h.text}"`).join(', ')}.`,
    impatto:
      'Google usa questo titolo per capire l\'argomento della pagina. Se manca o se ce ne sono molti, il motore di ricerca non capisce qual è il tema e mostra il sito più in basso.',
    soluzione: 'Un solo H1 per pagina, che contenga il servizio principale e la città.',
  });
};

const checkHeadingOrder = (d) => {
  const hs = d.dom?.headings || [];
  const salti = [];
  for (let i = 1; i < hs.length; i++)
    if (hs[i].level - hs[i - 1].level > 1)
      salti.push(`H${hs[i - 1].level} → H${hs[i].level}: "${hs[i].text.slice(0, 50)}"`);
  if (!salti.length) return null;
  return f({
    id: 'heading-order',
    area: 'accessibilita',
    severita: 'basso',
    titolo: 'La gerarchia dei titoli salta dei livelli',
    problema: `In ${salti.length} punt${salti.length === 1 ? 'o' : 'i'} si passa da un livello di titolo a uno non consecutivo (per esempio da H2 direttamente a H4).`,
    impatto:
      "Chi naviga con un lettore di schermo usa i titoli come indice per saltare da una sezione all'altra. Con la gerarchia rotta perde il filo, e Google fatica a capire come è organizzata la pagina.",
    evidenza: salti.slice(0, 5),
    soluzione: 'Usare i livelli in ordine (H1 → H2 → H3) scegliendoli per struttura, non per dimensione.',
  });
};

const checkJsonLd = (d) => {
  const blocks = d.dom?.jsonLd || [];
  const types = blocks
    .flatMap((b) => (Array.isArray(b) ? b : [b]))
    .map((b) => b?.['@type'])
    .filter(Boolean)
    .flat();
  const hasLocal = types.some((t) => /LocalBusiness|BeautySalon|HealthAndBeautyBusiness|DaySpa|Spa/i.test(t));
  if (hasLocal) return null;
  return f({
    id: 'jsonld',
    area: 'trovabilita',
    severita: 'alto',
    titolo: 'Google non riceve i dati dell\'attività in forma leggibile',
    problema:
      blocks.length === 0
        ? 'Nel sito non ci sono dati strutturati: il formato standard con cui si comunicano a Google indirizzo, orari, telefono e tipo di attività.'
        : `Sono presenti dati strutturati (${[...new Set(types)].join(', ')}), ma manca la scheda di tipo attività locale (BeautySalon / HealthAndBeautyBusiness).`,
    impatto:
      'Sono i dati che alimentano il riquadro con mappa, orari e stelline che compare a destra nei risultati di Google e nelle ricerche "vicino a me". Senza, il salone resta un risultato di testo mentre i concorrenti occupano il riquadro.',
    soluzione:
      'Inserire un blocco JSON-LD di tipo HealthAndBeautyBusiness con nome, indirizzo, telefono, orari, prezzi e link ai profili social.',
  });
};

const checkRobotsSitemap = (d) => {
  const mancanti = [];
  if (!d.robots?.ok) mancanti.push('robots.txt');
  if (!d.sitemap?.ok) mancanti.push('sitemap.xml');
  if (!mancanti.length) return null;
  return f({
    id: 'robots-sitemap',
    area: 'trovabilita',
    severita: 'medio',
    titolo: `Manca ${mancanti.join(' e ')}`,
    problema: `${mancanti.join(' e ')} ${mancanti.length > 1 ? 'sono i file' : 'è il file'} con cui si dice a Google quali pagine esistono e quali può leggere.`,
    impatto:
      'Senza mappa del sito Google deve indovinare la struttura: le pagine nuove vengono trovate più tardi, alcune non vengono trovate affatto.',
    soluzione: 'Generare sitemap.xml e robots.txt e registrare il sito su Google Search Console.',
  });
};

const checkNoindex = (d) => {
  const r = (d.dom?.metaRobots || '').toLowerCase();
  if (!r.includes('noindex')) return null;
  return f({
    id: 'noindex',
    area: 'trovabilita',
    severita: 'critico',
    titolo: 'Il sito dice a Google di NON inserirlo nei risultati',
    problema: `La pagina contiene l'istruzione "${d.dom.metaRobots}". "noindex" significa: non mostrare questa pagina nei risultati di ricerca.`,
    impatto:
      'È la causa più comune di un sito che "esiste ma su Google non si trova". Finché resta, nessuna attività di posizionamento può funzionare: il sito è invisibile per scelta.',
    soluzione: 'Rimuovere immediatamente il noindex e richiedere la reindicizzazione da Search Console.',
  });
};

const checkLang = (d) =>
  d.dom?.lang
    ? null
    : f({
        id: 'lang',
        area: 'accessibilita',
        severita: 'basso',
        titolo: 'La lingua del sito non è dichiarata',
        problema: 'Manca l\'attributo che indica in che lingua è scritta la pagina.',
        impatto:
          'I lettori di schermo pronunciano il testo con la cadenza sbagliata, e i browser propongono traduzioni automatiche non richieste.',
        soluzione: 'Dichiarare la lingua nel tag html (per esempio lang="de-CH").',
      });

const checkCanonical = (d) =>
  d.dom?.canonical
    ? null
    : f({
        id: 'canonical',
        area: 'trovabilita',
        severita: 'basso',
        titolo: 'Manca l\'indirizzo canonico',
        problema:
          'Non è indicato a Google quale sia l\'indirizzo ufficiale della pagina (con www o senza, con o senza barra finale).',
        impatto:
          'Google può considerare lo stesso contenuto come più pagine diverse e dividere la forza del sito fra le copie.',
        soluzione: 'Aggiungere un tag canonical con l\'indirizzo definitivo su ogni pagina.',
      });

// ---------------------------------------------------------------- SOCIAL

const checkOg = (d) => {
  const og = d.dom?.og || {};
  const mancanti = ['title', 'description', 'image'].filter((k) => !og[k]);
  if (!mancanti.length) return null;
  return f({
    id: 'og',
    area: 'conversione',
    severita: 'medio',
    titolo: 'Condividendo il link su WhatsApp o Instagram non appare l\'anteprima',
    problema: `Mancano i dati di anteprima social (${mancanti.join(', ')}): titolo, descrizione e immagine che compaiono quando qualcuno incolla il link.`,
    impatto:
      'Il passaparola in un salone passa da WhatsApp. Un link che appare come stringa grigia senza foto viene cliccato molto meno di uno con una bella immagine del centro.',
    soluzione:
      'Aggiungere i tag Open Graph (og:title, og:description, og:image con una foto 1200×630) e verificare con il debugger di Facebook.',
  });
};

// ---------------------------------------------------------------- CONVERSIONE

const checkContatti = (d) => {
  const s = d.dom?.signals || {};
  const links = d.dom?.links || [];
  const tel = links.filter((l) => l.isTel).length;
  const mail = links.filter((l) => l.isMailto).length;
  const mancanti = [];
  if (!tel && !s.phoneInText) mancanti.push('numero di telefono');
  if (!mail && !s.emailInText) mancanti.push('indirizzo e-mail');
  if (!s.postalCode) mancanti.push('indirizzo con CAP e località');
  if (!s.openingHours) mancanti.push('orari di apertura');
  if (!mancanti.length) return null;
  return f({
    id: 'contatti',
    area: 'conversione',
    severita: mancanti.length > 2 ? 'critico' : 'alto',
    titolo: `In home page manca${mancanti.length === 1 ? '' : 'no'}: ${mancanti.join(', ')}`,
    problema:
      'Sono le informazioni che un cliente cerca per prime quando apre il sito di un salone. Al momento non sono visibili nella pagina principale.',
    impatto:
      "Chi cerca un centro estetico ha già deciso di prenotare: vuole solo sapere dove siete, quando siete aperti e come chiamarvi. Se non lo trova in dieci secondi apre il sito del salone successivo. Questa è la voce che costa più appuntamenti di tutte.",
    evidenza: mancanti.map((m) => `Non rilevato: ${m}`),
    soluzione:
      'Portare telefono, indirizzo e orari in alto nella home e ripeterli nel piè di pagina. Il telefono deve essere un link cliccabile (tel:) per chiamare con un tocco.',
  });
};

const checkTelLink = (d) => {
  const s = d.dom?.signals || {};
  const tel = (d.dom?.links || []).filter((l) => l.isTel).length;
  if (tel > 0 || !s.phoneInText) return null;
  return f({
    id: 'tel-link',
    area: 'conversione',
    severita: 'alto',
    titolo: 'Il numero di telefono non è cliccabile',
    problema:
      'Il numero compare nella pagina come testo semplice, non come collegamento telefonico.',
    impatto:
      'Da telefono il cliente dovrebbe memorizzare il numero, uscire dal sito, aprire il tastierino e riscriverlo. Molti non lo fanno. Renderlo cliccabile è una modifica di un minuto che trasforma direttamente le visite in chiamate.',
    soluzione: 'Trasformare il numero in un link tel:+41... e affiancarci un pulsante "Chiama ora".',
  });
};

const checkCta = (d) => {
  const s = d.dom?.signals || {};
  if (s.booking) return null;
  return f({
    id: 'cta',
    area: 'conversione',
    severita: 'critico',
    titolo: 'Manca un invito chiaro a prenotare',
    problema:
      'Nella pagina non compare un pulsante o un messaggio esplicito che dica al visitatore cosa fare ("Prenota un appuntamento", "Termin buchen", "Scrivici su WhatsApp").',
    impatto:
      "Un sito senza invito all'azione funziona come una vetrina con la porta chiusa: la gente guarda e passa oltre. È la differenza tra un sito che porta appuntamenti e uno che è solo un biglietto da visita.",
    soluzione:
      'Inserire un pulsante di prenotazione ben visibile in alto, ripeterlo a metà pagina e in fondo, e sul telefono tenerlo fisso in basso.',
  });
};

const checkPrezzi = (d) =>
  d.dom?.signals?.prices
    ? null
    : f({
        id: 'prezzi',
        area: 'conversione',
        severita: 'medio',
        titolo: 'Non sono indicati i prezzi dei trattamenti',
        problema: 'Nella pagina non compaiono importi in franchi associati ai servizi.',
        impatto:
          'Il prezzo è la seconda informazione più cercata dopo la posizione. Chi non lo trova presume "caro" e chiude. Un listino visibile filtra i curiosi e fa arrivare richieste già pronte a prenotare.',
        soluzione: 'Pubblicare un listino, anche solo con i prezzi di partenza ("Massaggio 60 min — da CHF 120").',
      });

const checkMappa = (d) =>
  d.dom?.signals?.map
    ? null
    : f({
        id: 'mappa',
        area: 'conversione',
        severita: 'basso',
        titolo: 'Non c\'è una mappa per raggiungere il salone',
        problema: 'Il sito non include una mappa incorporata con la posizione.',
        impatto:
          'Per un\'attività locale la domanda "dove siete esattamente e dove parcheggio?" precede la prenotazione. Una mappa con un clic verso le indicazioni stradali toglie questo dubbio.',
        soluzione: 'Incorporare una mappa e aggiungere una nota su parcheggio e fermata più vicina.',
      });

const checkSocial = (d) => {
  const s = d.dom?.signals?.socialLinks || [];
  if (s.length) return null;
  return f({
    id: 'social',
    area: 'conversione',
    severita: 'basso',
    titolo: 'Nessun collegamento ai profili social',
    problema: 'Dal sito non si raggiungono Instagram, Facebook o WhatsApp.',
    impatto:
      "Le foto dei lavori sono la prova migliore della qualità di un centro estetico. Chi vuole vedere i risultati prima di prenotare non trova dove guardarli e resta indeciso.",
    soluzione: 'Aggiungere le icone social nell\'intestazione e nel piè di pagina, e un pulsante WhatsApp diretto.',
  });
};

const checkForms = (d) => {
  const forms = d.dom?.forms || [];
  if (!forms.length) return null;
  const senzaLabel = forms.flatMap((fo) => fo.fields.filter((x) => !x.labelled));
  if (!senzaLabel.length) return null;
  return f({
    id: 'form-label',
    area: 'accessibilita',
    severita: 'medio',
    titolo: `${senzaLabel.length} camp${senzaLabel.length === 1 ? 'o' : 'i'} del modulo senza etichetta`,
    problema:
      'Alcuni campi del modulo di contatto usano solo il testo grigio interno (placeholder) al posto di un\'etichetta vera.',
    impatto:
      'Appena il cliente inizia a scrivere il testo grigio sparisce e non si ricorda più cosa andava in quel campo: aumentano gli errori e i moduli lasciati a metà. I lettori di schermo, inoltre, non riescono a leggere il campo.',
    evidenza: senzaLabel.slice(0, 6).map((x) => `${x.tag}${x.name ? ` name="${x.name}"` : ''}`),
    soluzione: 'Aggiungere una <label> collegata a ogni campo, mantenendola visibile.',
  });
};

// ---------------------------------------------------------------- VELOCITÀ

const checkPeso = (d) => {
  const net = d.network || [];
  const totale = net.reduce((a, r) => a + (r.size || 0), 0);
  const imgBytes = net.filter((r) => r.type === 'image').reduce((a, r) => a + (r.size || 0), 0);
  if (totale < 2_500_000) return null;
  return f({
    id: 'peso',
    area: 'velocita',
    severita: totale > 6_000_000 ? 'critico' : 'alto',
    titolo: `La pagina pesa ${(totale / 1_048_576).toFixed(1)} MB`,
    problema: `Per aprire la home il telefono deve scaricare ${(totale / 1_048_576).toFixed(1)} MB in ${net.length} richieste, di cui ${(imgBytes / 1_048_576).toFixed(1)} MB di sole immagini. Una home ben fatta sta sotto 1,5 MB.`,
    impatto:
      "Su rete mobile fuori casa questo significa diversi secondi di schermo bianco. Google misura che oltre i 3 secondi più della metà dei visitatori se ne va prima ancora di vedere la pagina — e il traffico consumato è a carico del cliente.",
    evidenza: [
      `Totale scaricato: ${kb(totale)} KB`,
      `Immagini: ${kb(imgBytes)} KB (${pct(imgBytes, totale)}% del totale)`,
      `Richieste di rete: ${net.length}`,
    ],
    soluzione:
      'Comprimere le immagini e convertirle in WebP, caricare in ritardo quelle sotto la prima schermata, rimuovere script non usati.',
  });
};

const checkTempo = (d) => {
  const load = d.timing?.load ?? d.loadMs;
  if (!load || load < 3000) return null;
  return f({
    id: 'tempo',
    area: 'velocita',
    severita: load > 6000 ? 'alto' : 'medio',
    titolo: `Il sito impiega ${(load / 1000).toFixed(1)} secondi ad aprirsi`,
    problema: `Caricamento completo misurato in ${(load / 1000).toFixed(1)}s da connessione veloce con computer da scrivania. Da telefono in 4G il tempo è tipicamente due o tre volte più alto.`,
    impatto:
      'Ogni secondo in più fa perdere circa il 7% delle conversioni. La velocità è anche un fattore diretto di posizionamento su Google.',
    evidenza: [
      d.timing?.ttfb != null ? `Risposta del server: ${d.timing.ttfb} ms` : null,
      d.timing?.paints?.['first-contentful-paint'] != null
        ? `Primo contenuto visibile: ${d.timing.paints['first-contentful-paint']} ms`
        : null,
    ].filter(Boolean),
    soluzione: 'Attivare cache e compressione sul server, ottimizzare le immagini, valutare un hosting migliore.',
  });
};

const checkImmaginiSovradimensionate = (d) => {
  const imgs = (d.dom?.images || []).filter(
    (i) => i.naturalWidth > 0 && i.displayWidth > 0 && i.naturalWidth > i.displayWidth * 2.2
  );
  if (!imgs.length) return null;
  return f({
    id: 'img-size',
    area: 'velocita',
    severita: imgs.length > 4 ? 'alto' : 'medio',
    titolo: `${imgs.length} immagini vengono scaricate molto più grandi del necessario`,
    problema:
      'Le foto vengono caricate alla risoluzione originale della fotocamera e poi rimpicciolite dal browser. Il visitatore scarica milioni di pixel che non vedrà mai.',
    impatto:
      'È la prima causa di lentezza nei siti di saloni, dove le foto contano. Ridimensionarle correttamente spesso dimezza il tempo di apertura senza toccare la grafica.',
    evidenza: imgs
      .slice(0, 6)
      .map((i) => `${i.naturalWidth}×${i.naturalHeight}px mostrata a ${i.displayWidth}×${i.displayHeight}px`),
    soluzione:
      'Ridimensionare i file alla misura reale di utilizzo, servire WebP e usare srcset per le diverse dimensioni di schermo.',
  });
};

const checkFormatiImmagine = (d) => {
  const imgs = d.dom?.images || [];
  const vecchi = imgs.filter((i) => ['jpg', 'jpeg', 'png'].includes(i.ext));
  if (!imgs.length || vecchi.length / imgs.length < 0.6) return null;
  return f({
    id: 'img-format',
    area: 'velocita',
    severita: 'basso',
    titolo: `${vecchi.length} immagini su ${imgs.length} usano formati datati`,
    problema: 'Le foto sono in JPG o PNG invece che in WebP o AVIF.',
    impatto:
      'A parità di qualità visibile, WebP pesa circa il 30% in meno. È un guadagno di velocità che non costa nulla in resa.',
    soluzione: 'Convertire le immagini in WebP mantenendo JPG come riserva per i browser più vecchi.',
  });
};

const checkLazyLoading = (d) => {
  const imgs = d.dom?.images || [];
  if (imgs.length < 6) return null;
  const senza = imgs.filter((i) => i.loading !== 'lazy');
  if (senza.length / imgs.length < 0.7) return null;
  return f({
    id: 'lazy',
    area: 'velocita',
    severita: 'basso',
    titolo: 'Le immagini vengono caricate tutte insieme all\'apertura',
    problema: `${senza.length} immagini su ${imgs.length} non usano il caricamento differito: il browser scarica anche le foto in fondo alla pagina, che il visitatore forse non vedrà mai.`,
    impatto: 'Rallenta la comparsa della prima schermata, cioè l\'unica parte che decide se il cliente resta.',
    soluzione: 'Aggiungere loading="lazy" a tutte le immagini tranne quelle della prima schermata.',
  });
};

const checkDimensioniImmagini = (d) => {
  const imgs = d.dom?.images || [];
  const senza = imgs.filter((i) => !i.hasDimensions);
  if (imgs.length < 3 || senza.length / imgs.length < 0.5) return null;
  return f({
    id: 'img-dimensions',
    area: 'velocita',
    severita: 'basso',
    titolo: 'La pagina "salta" mentre si carica',
    problema: `${senza.length} immagini non dichiarano le proprie dimensioni, quindi il browser non sa quanto spazio riservare e sposta i contenuti man mano che le foto arrivano.`,
    impatto:
      'Il cliente sta per premere un pulsante, la pagina si sposta e preme qualcos\'altro. È fastidioso e Google lo misura come difetto di qualità (CLS).',
    soluzione: 'Indicare width e height su ogni immagine.',
  });
};

// ---------------------------------------------------------------- ACCESSIBILITÀ

const checkAlt = (d) => {
  const imgs = d.dom?.images || [];
  const senza = imgs.filter((i) => !i.hasAlt);
  if (!senza.length) return null;
  return f({
    id: 'alt',
    area: 'accessibilita',
    severita: senza.length / Math.max(imgs.length, 1) > 0.5 ? 'alto' : 'medio',
    titolo: `${senza.length} immagini su ${imgs.length} senza testo alternativo`,
    problema:
      'Il testo alternativo è la breve descrizione che accompagna ogni foto: la leggono i lettori di schermo e la usa Google per capire cosa mostra l\'immagine.',
    impatto:
      "Doppio danno: le foto dei trattamenti non compaiono nelle ricerche per immagini di Google, e chi ha problemi di vista non sa cosa sta guardando. In Svizzera l'accessibilità è inoltre un requisito atteso per i servizi al pubblico.",
    evidenza: senza.slice(0, 6).map((i) => (i.src || '').split('/').pop()),
    soluzione:
      'Aggiungere a ogni foto una descrizione concreta ("Trattamento viso in cabina", non "immagine1.jpg").',
  });
};

const checkContrasto = (d) => {
  const c = d.dom?.contrastIssues || [];
  if (c.length < 2) return null;
  return f({
    id: 'contrasto',
    area: 'accessibilita',
    severita: c.length > 8 ? 'alto' : 'medio',
    titolo: `${c.length} testi con contrasto insufficiente`,
    problema:
      'Alcuni testi hanno un rapporto di contrasto con lo sfondo inferiore al minimo delle linee guida internazionali (WCAG 2.1 AA: 4,5:1 per il testo normale).',
    impatto:
      "Il testo chiaro su sfondo chiaro è elegante sullo schermo del grafico e illeggibile sul telefono di un cliente al sole. Riguarda soprattutto i clienti over 50, che per un centro estetico sono quelli con la spesa media più alta.",
    evidenza: c.slice(0, 6).map((x) => `${x.ratio}:1 (serve ${x.required}:1) — "${x.text}"`),
    soluzione: 'Scurire il testo o schiarire lo sfondo fino a superare 4,5:1, verificando con un contrast checker.',
  });
};

const checkLinkVuoti = (d) => {
  const vuoti = (d.dom?.links || []).filter((l) => l.visible && !l.hasText && !l.isAnchor);
  if (!vuoti.length) return null;
  return f({
    id: 'link-vuoti',
    area: 'accessibilita',
    severita: 'basso',
    titolo: `${vuoti.length} collegament${vuoti.length === 1 ? 'o' : 'i'} senza testo`,
    problema: 'Alcuni link (spesso icone) non contengono testo né una descrizione alternativa.',
    impatto: 'Un lettore di schermo li annuncia come "link" e basta: l\'utente non sa dove portano.',
    soluzione: 'Aggiungere un aria-label descrittivo o un testo nascosto ai soli lettori di schermo.',
  });
};

const checkIframeTitle = (d) => {
  const senza = (d.dom?.iframes || []).filter((i) => !i.title);
  if (!senza.length) return null;
  return f({
    id: 'iframe-title',
    area: 'accessibilita',
    severita: 'basso',
    titolo: `${senza.length} contenut${senza.length === 1 ? 'o incorporato' : 'i incorporati'} senza descrizione`,
    problema: 'Mappe o video incorporati non hanno un titolo che ne spieghi il contenuto.',
    impatto: 'Chi usa un lettore di schermo incontra un blocco anonimo e non sa se saltarlo o no.',
    soluzione: 'Aggiungere l\'attributo title a ogni iframe.',
  });
};

// ---------------------------------------------------------------- LEGALE (CH)

const checkImpressum = (d) =>
  d.dom?.signals?.impressum
    ? null
    : f({
        id: 'impressum',
        area: 'legale',
        severita: 'critico',
        titolo: 'Manca l\'Impressum',
        problema:
          'Non è presente la pagina con i dati dell\'azienda: ragione sociale, indirizzo completo, e-mail e — se l\'attività è iscritta al registro IVA — numero IDE/IVA.',
        impatto:
          'In Svizzera l\'Impressum è obbligatorio per legge (art. 3 cpv. 1 lett. s LCSl) per chi offre beni o servizi online. La violazione è perseguibile e può comportare una multa. Oltre al rischio legale, l\'assenza di dati aziendali visibili è uno dei motivi più citati di sfiducia verso un sito.',
        soluzione:
          'Creare una pagina Impressum con nome dell\'attività, indirizzo, e-mail, telefono e numero IDE, e collegarla dal piè di pagina di ogni pagina.',
      });

const checkPrivacy = (d) =>
  d.dom?.signals?.privacy
    ? null
    : f({
        id: 'privacy',
        area: 'legale',
        severita: 'critico',
        titolo: 'Manca l\'informativa sulla privacy',
        problema:
          'Non si trova una pagina che spieghi quali dati vengono raccolti dai visitatori e come vengono trattati.',
        impatto:
          'La legge federale svizzera sulla protezione dei dati (nLPD, in vigore dal 1° settembre 2023) la rende obbligatoria per qualsiasi sito che raccolga dati personali — un modulo di contatto o le statistiche di visita bastano. Se il sito ha clienti nell\'UE si applica anche il GDPR.',
        soluzione:
          'Pubblicare un\'informativa privacy conforme alla nLPD e collegarla dal piè di pagina e da ogni modulo.',
      });

const checkCookieBanner = (d) => {
  const s = d.dom?.signals || {};
  const tracking = (d.network || []).some((r) =>
    /google-analytics|googletagmanager|facebook\.net|hotjar|clarity\.ms|doubleclick/i.test(r.url)
  );
  if (!tracking || s.cookieBanner) return null;
  return f({
    id: 'cookie',
    area: 'legale',
    severita: 'alto',
    titolo: 'Strumenti di tracciamento attivi senza richiesta di consenso',
    problema:
      'La pagina carica servizi di analisi o pubblicità di terze parti, ma non mostra alcun avviso per raccogliere il consenso del visitatore.',
    impatto:
      'I dati vengono raccolti prima che il visitatore abbia potuto acconsentire. È il punto su cui si concentrano le contestazioni in materia di protezione dei dati, e per i visitatori dall\'UE è una violazione diretta del GDPR.',
    evidenza: [
      ...new Set(
        (d.network || [])
          .filter((r) => /google-analytics|googletagmanager|facebook\.net|hotjar|clarity\.ms|doubleclick/i.test(r.url))
          .map((r) => new URL(r.url).hostname)
      ),
    ].slice(0, 5),
    soluzione:
      'Installare un banner di consenso che blocchi gli script non necessari finché il visitatore non ha scelto.',
  });
};

// ---------------------------------------------------------------- TECNICA

const checkSecurityHeaders = (d) => {
  const h = d.http?.headers || {};
  const attesi = {
    'strict-transport-security': 'impone la connessione protetta anche ai visitatori successivi',
    'x-content-type-options': 'impedisce al browser di interpretare male i file',
    'content-security-policy': 'limita quali script possono girare sulla pagina',
    'referrer-policy': 'controlla quali dati vengono passati ai siti esterni',
  };
  const mancanti = Object.keys(attesi).filter((k) => !h[k]);
  if (mancanti.length < 3) return null;
  return f({
    id: 'headers',
    area: 'tecnica',
    severita: 'basso',
    titolo: `Mancano ${mancanti.length} intestazioni di sicurezza`,
    problema:
      'Il server non invia alcune impostazioni di protezione standard che i browser moderni sanno usare.',
    impatto:
      'Non è un problema visibile al cliente, ma rende il sito più esposto ad attacchi comuni e abbassa il punteggio nelle verifiche di sicurezza che alcune assicurazioni e partner richiedono.',
    evidenza: mancanti.map((k) => `${k} — ${attesi[k]}`),
    soluzione: 'Aggiungere le intestazioni nella configurazione del server o del CDN.',
  });
};

const checkGenerator = (d) => {
  const g = d.dom?.generator;
  if (!g || !/wix|jimdo|weebly|squarespace|homepage-baukasten|site123|webnode/i.test(g)) return null;
  return f({
    id: 'generator',
    area: 'tecnica',
    severita: 'basso',
    titolo: `Il sito è costruito con un servizio a blocchi (${g})`,
    problema: `Il sito dichiara di essere generato con ${g}.`,
    impatto:
      'Questi strumenti vanno bene per partire, ma pongono un tetto a velocità, posizionamento su Google e personalizzazione — e il sito resta legato alla piattaforma: portarlo altrove significa rifarlo.',
    soluzione:
      'Valutare il passaggio a un sito proprio quando il traffico o le richieste iniziano a contare davvero.',
  });
};

const checkKeywordsMeta = (d) =>
  d.dom?.metaKeywords
    ? f({
        id: 'meta-keywords',
        area: 'tecnica',
        severita: 'basso',
        titolo: 'Nel codice ci sono ancora le "meta keywords"',
        problema: `La pagina contiene il tag keywords ("${String(d.dom.metaKeywords).slice(0, 80)}...").`,
        impatto:
          'Google ha smesso di considerarle nel 2009. Non fanno danno, ma indicano che il sito è stato impostato con criteri vecchi di quindici anni — utile da sapere per capire cos\'altro potrebbe essere datato.',
        soluzione: 'Rimuoverle e investire il tempo su titoli e descrizioni, che invece contano.',
      })
    : null;

const checkContenuto = (d) => {
  const w = d.dom?.counts?.words || 0;
  if (w >= 300) return null;
  return f({
    id: 'contenuto',
    area: 'trovabilita',
    severita: 'alto',
    titolo: `La home contiene solo ${w} parole`,
    problema:
      'Il testo della pagina principale è molto ridotto. Google ha bisogno di parole per capire di cosa si occupa un\'attività e per quali ricerche mostrarla.',
    impatto:
      'Con così poco testo il sito può posizionarsi praticamente solo sul proprio nome — cioè viene trovato da chi lo conosce già. Chi cerca "trattamento viso [città]" senza conoscere il salone non lo incontrerà mai.',
    soluzione:
      'Descrivere ogni trattamento con 100–200 parole, usando le parole che i clienti usano davvero quando cercano.',
  });
};

// ---------------------------------------------------------------- ESECUZIONE

const CHECKS = [
  checkHttps,
  checkHttpRedirect,
  checkNoindex,
  checkImpressum,
  checkPrivacy,
  checkCookieBanner,
  checkViewport,
  checkOverflow,
  checkTapTargets,
  checkSmallText,
  checkLorem,
  checkContatti,
  checkTelLink,
  checkCta,
  checkPrezzi,
  checkTitle,
  checkMetaDescription,
  checkH1,
  checkHeadingOrder,
  checkContenuto,
  checkJsonLd,
  checkRobotsSitemap,
  checkCanonical,
  checkLang,
  checkOg,
  checkAlt,
  checkContrasto,
  checkPeso,
  checkTempo,
  checkImmaginiSovradimensionate,
  checkFormatiImmagine,
  checkLazyLoading,
  checkDimensioniImmagini,
  checkForms,
  checkBrokenLinks,
  checkConsoleErrors,
  checkLinkVuoti,
  checkIframeTitle,
  checkMappa,
  checkSocial,
  checkNotFoundPage,
  checkSecurityHeaders,
  checkGenerator,
  checkKeywordsMeta,
];

const ORDINE = { critico: 0, alto: 1, medio: 2, basso: 3 };

export function valuta(d) {
  const rilievi = CHECKS.map((c) => {
    try {
      return c(d);
    } catch (e) {
      return null; // un check che fallisce non deve fermare il report
    }
  })
    .filter(Boolean)
    .sort((a, b) => ORDINE[a.severita] - ORDINE[b.severita]);

  const conteggio = { critico: 0, alto: 0, medio: 0, basso: 0 };
  for (const r of rilievi) conteggio[r.severita]++;

  const penalita = rilievi.reduce((a, r) => a + r.peso, 0);
  const punteggio = Math.max(0, Math.min(100, 100 - penalita));

  return {
    rilievi,
    conteggio,
    punteggio,
    verificheEseguite: CHECKS.length,
    giudizio:
      punteggio >= 80
        ? 'Buono'
        : punteggio >= 60
          ? 'Migliorabile'
          : punteggio >= 40
            ? 'Insufficiente'
            : 'Critico',
  };
}
