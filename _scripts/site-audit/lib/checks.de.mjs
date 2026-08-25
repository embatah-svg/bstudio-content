// Bewertungsregeln — deutsche Fassung (Sie-Form, für Kundenberichte).
//
// Jede Funktion prüft ein Kriterium und gibt einen Befund zurück (oder null,
// wenn nichts zu melden ist). Struktur, id/area/severita-Werte und die
// Anordnung sind identisch zu checks.mjs (italienische Fassung) — nur die für
// die Kundin bestimmten Texte sind übersetzt. So bleibt die Punktzahl exakt
// vergleichbar, unabhängig von der Sprache des Berichts.

export const PESI = { critico: 12, alto: 8, medio: 4, basso: 2 };

export const AREE = {
  fiducia: 'Vertrauen & Seriosität',
  mobile: 'Erlebnis auf dem Handy',
  trovabilita: 'Auffindbarkeit bei Google',
  conversione: 'Aus Besuchern Kundinnen machen',
  velocita: 'Geschwindigkeit',
  legale: 'Gesetzliche Pflichten (Schweiz)',
  tecnica: 'Technische Qualität',
  accessibilita: 'Barrierefreiheit',
};

const f = (o) => ({ ...o, peso: PESI[o.severita] });
const pct = (n, tot) => (tot ? Math.round((n / tot) * 100) : 0);
const kb = (bytes) => Math.round(bytes / 1024);

// ---------------------------------------------------------------- VERTRAUEN

const checkHttps = (d) =>
  d.http?.isHttps
    ? null
    : f({
        id: 'https',
        area: 'fiducia',
        severita: 'critico',
        titolo: 'Die Seite ist nicht geschützt: der Browser zeigt "Nicht sicher"',
        problema:
          'Die Website läuft über HTTP statt HTTPS. Chrome, Safari und Edge schreiben "Nicht sicher" direkt in die Adressleiste, neben dem Namen der Website.',
        impatto:
          'Das ist das Erste, was eine Kundin liest — noch bevor sie ein Foto sieht. Bei einer Website, die persönliche Daten verarbeitet (Name, Telefonnummer, Terminanfrage), lässt diese Warnung die Seite sofort schliessen. Google bewertet Websites ohne HTTPS zudem explizit schlechter.',
        evidenza: [`Endgültige Adresse: ${d.http?.finalUrl}`],
        soluzione:
          'SSL-Zertifikat aktivieren (kostenlos über Let\'s Encrypt, bei jedem seriösen Hosting inklusive) und den gesamten HTTP-Verkehr dauerhaft auf HTTPS umleiten.',
      });

const checkHttpRedirect = (d) => {
  if (!d.http?.isHttps || !d.httpRedirect) return null;
  return d.httpRedirect.finalUrl?.startsWith('https://')
    ? null
    : f({
        id: 'http-redirect',
        area: 'tecnica',
        severita: 'medio',
        titolo: 'Die ungeschützte Version der Website bleibt erreichbar',
        problema: `Ruft man die Adresse mit http:// auf, leitet die Website nicht auf https:// weiter (Ziel: ${d.httpRedirect.finalUrl}).`,
        impatto:
          'Wer über einen alten Link oder ein gedrucktes Flugblatt kommt, sieht weiterhin die Version "Nicht sicher" — und Google behandelt es als zwei getrennte Websites mit identischem Inhalt.',
        soluzione: 'Eine dauerhafte Weiterleitung (301) von HTTP auf HTTPS auf Serverebene einrichten.',
      });
};

const checkLorem = (d) =>
  d.dom?.signals?.lorem
    ? f({
        id: 'lorem',
        area: 'fiducia',
        severita: 'critico',
        titolo: 'Auf der Website ist noch der Platzhaltertext aus der Vorlage stehen geblieben',
        problema:
          'Auf der Seite befindet sich Platzhaltertext ("Lorem ipsum" o. Ä.) — der Füllfext, den die Vorlage verwendet, bevor die echten Inhalte eingefügt werden.',
        impatto:
          'Das signalisiert der Besucherin, dass die Website nicht fertig ist und sich niemand darum kümmert. Es ist das stärkste Zeichen von Vernachlässigung, das eine Website senden kann.',
        soluzione: 'Jeden Platzhaltertext durch echte Inhalte zu Behandlungen, Preisen und Team ersetzen.',
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
    titolo: `Die Fusszeile zeigt noch ${y}`,
    problema: `Am Ende der Seite steht "© ${y}" — das ist ${now - Number(y)} Jahre her.`,
    impatto:
      'Das ist das Erste, was eine skeptische Kundin prüft, um zu sehen, ob ein Betrieb noch aktiv ist. Eine alte Jahreszahl lässt vermuten, dass die Website — und damit das Studio — verlassen wurde.',
    soluzione: 'Die Jahreszahl automatisch generieren lassen, damit sie nie wieder manuell aktualisiert werden muss.',
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
    titolo: `${total} Programmierfehler beim Öffnen der Seite`,
    problema:
      'Der Browser meldet Fehler im Code der Website. Diese Fehler liest die Besucherin nicht, aber sie legen oft eine Funktion lahm: ein Menü, das sich nicht öffnet, ein Formular, das nicht abschickt, eine Galerie, die leer bleibt.',
    impatto:
      'Jede kaputte Funktion bedeutet eine Kundin, die nicht tun kann, was sie wollte, und wortlos wieder geht.',
    evidenza: [...errs.map((e) => e.text), ...(d.pageErrors || [])].slice(0, 5),
    soluzione: 'Die Browser-Konsole öffnen, die Fehler einzeln beheben und erneut prüfen.',
  });
};

const checkBrokenLinks = (d) => {
  const broken = (d.linkChecks || []).filter((l) => !l.ok);
  if (!broken.length) return null;
  return f({
    id: 'broken-links',
    area: 'fiducia',
    severita: broken.length > 2 ? 'alto' : 'medio',
    titolo: `${broken.length} Link${broken.length === 1 ? '' : 's'} funktioniert${broken.length === 1 ? '' : 'en'} nicht`,
    problema: 'Einige Links auf der Seite führen zu einem Fehler oder zu einer nicht mehr existierenden Seite.',
    impatto:
      'Ein defekter Link unterbricht den Weg der Kundin genau dann, wenn sie Informationen sucht. Google wertet das als Zeichen einer ungepflegten Website.',
    evidenza: broken.slice(0, 8).map((l) => `${l.status || 'keine Antwort'} → ${l.url}`),
    soluzione: 'Die nicht mehr gültigen Links korrigieren oder entfernen.',
  });
};

const checkNotFoundPage = (d) =>
  d.notFound?.status === 200
    ? f({
        id: '404',
        area: 'tecnica',
        severita: 'basso',
        titolo: 'Nicht existierende Seiten antworten, als gäbe es sie',
        problema:
          'Ruft man eine erfundene Adresse auf, antwortet der Server mit "alles in Ordnung" (Statuscode 200) statt mit "Seite nicht gefunden" (404).',
        impatto:
          'Google indexiert dadurch leere, inhaltslose Seiten, die die Stärke der Website in den Suchergebnissen verwässern.',
        soluzione: 'Eine echte 404-Seite mit korrektem Statuscode und einem Link zur Startseite einrichten.',
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
        titolo: 'Die Website ist nicht fürs Handy eingerichtet',
        problema:
          'Es fehlt die technische Grundanweisung (das "Meta-Viewport-Tag"), die dem Handy sagt, wie die Seite an den Bildschirm angepasst werden soll. Ohne sie zeigt das Handy die verkleinerte Desktop-Version.',
        impatto:
          'Wer die Website vom Handy öffnet, sieht winzige Schrift und muss mit den Fingern zoomen, um überhaupt etwas zu lesen. Bei einem Beauty-Studio kommt der grösste Teil der Besuche vom Handy — das bedeutet, die Mehrheit der potenziellen Kundinnen in den ersten Sekunden zu verlieren.',
        soluzione: 'Das Meta-Viewport-Tag ergänzen und prüfen, ob das Theme tatsächlich responsiv ist.',
      });

const checkOverflow = (d) => {
  const o = d.mobile?.overflow;
  if (!o || o.docWidth <= o.winWidth + 2) return null;
  const extra = o.docWidth - o.winWidth;
  return f({
    id: 'overflow',
    area: 'mobile',
    severita: 'alto',
    titolo: `Auf dem Handy ist die Seite ${extra}px breiter als der Bildschirm`,
    problema: `Der Inhalt nimmt ${o.docWidth}px auf einem ${o.winWidth}px breiten Bildschirm ein. Das Ergebnis: ein seitlicher Scrollbalken, Text läuft über den Rand hinaus und muss zum Lesen verschoben werden.`,
    impatto:
      'Das vermittelt sofort den Eindruck einer kaputten Website. Es ist der Fehler, der Besucherinnen am häufigsten dazu bringt, die Seite zu schliessen und ein anderes Studio zu suchen.',
    evidenza: o.elements
      .slice(0, 6)
      .map((e) => `<${e.tag}> ${e.cls ? `class="${e.cls}"` : ''} reicht bis ${e.right}px`),
    soluzione:
      'Elemente mit fester Breite finden und durch prozentuale Breiten ersetzen (max-width: 100%).',
    screenshot: 'mobileAnnotated',
  });
};

const checkTapTargets = (d) => {
  const t = d.mobile?.tapTargets || [];
  if (t.length < 3) return null;
  return f({
    id: 'tap-targets',
    area: 'mobile',
    severita: t.length > 8 ? 'alto' : 'medio',
    titolo: `${t.length} Buttons sind zu klein, um mit dem Finger getroffen zu werden`,
    problema:
      'Mehrere Links und Buttons sind kleiner als 40×40 Pixel. Die Richtlinien von Apple und Google verlangen mindestens 44×44 Pixel, damit ein erwachsener Finger sie sicher trifft.',
    impatto:
      'Die Kundin verfehlt den Button, geht zurück, versucht es erneut. Nach zwei Fehlversuchen bricht sie meist ab — und das passiert oft ausgerechnet beim Buchungs-Button oder bei der Telefonnummer.',
    evidenza: t.slice(0, 8).map((x) => `"${x.text}" — ${x.w}×${x.h}px`),
    soluzione: 'Klickfläche und Abstand von Links und Buttons auf mindestens 44×44px bringen.',
    screenshot: 'mobileAnnotated',
  });
};

const checkSmallText = (d) => {
  const s = d.mobile?.smallText || [];
  if (s.length < 2) return null;
  return f({
    id: 'small-text',
    area: 'mobile',
    severita: 'medio',
    titolo: `Text unter 14px an ${s.length} Stellen`,
    problema:
      'Einige Texte sind so klein eingestellt, dass sie auf dem Handy ohne Zoomen schwer lesbar sind.',
    impatto:
      'Ein grosser Teil der Kundschaft eines Beauty-Studios ist über 45 Jahre alt. Muss sie zoomen, um Preise zu lesen, tut sie es meistens nicht — sie schliesst die Seite.',
    evidenza: s.slice(0, 6).map((x) => `${x.fontSize}px — "${x.text}"`),
    soluzione: 'Den Fliesstext auf dem Handy auf mindestens 16px bringen.',
    screenshot: 'mobileAnnotated',
  });
};

// ---------------------------------------------------------------- AUFFINDBARKEIT

const checkTitle = (d) => {
  const t = d.dom?.title || '';
  if (t && t.length >= 25 && t.length <= 65) return null;
  const vuoto = !t;
  return f({
    id: 'title',
    area: 'trovabilita',
    severita: vuoto ? 'critico' : 'alto',
    titolo: vuoto
      ? 'Der Seitentitel fehlt'
      : `Der Seitentitel ist nicht optimiert (${t.length} Zeichen)`,
    problema: vuoto
      ? 'Die Seite hat keinen Titel. Das ist die blaue, klickbare Zeile, die in den Google-Ergebnissen erscheint, und der Name des Browser-Tabs.'
      : `Der aktuelle Titel lautet "${t}". Die nutzbare Länge liegt bei 25–65 Zeichen: darunter wird Platz verschenkt, darüber schneidet Google den Satz mit Auslassungspunkten ab.`,
    impatto:
      'Der Titel ist der einzelne Faktor, der am stärksten beeinflusst, wie viele Personen auf das Google-Ergebnis klicken. Enthält er nicht Dienstleistung und Ort, findet ihn niemand, der "Massage [Ort]" sucht.',
    evidenza: [`Aktueller Titel: ${t || '(leer)'}`],
    soluzione:
      'Einen Titel schreiben wie "Massagen & Gesichtsbehandlungen in [Ort] | [Name des Studios]", innerhalb von 60 Zeichen.',
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
      ? `Die Meta-Description für Google hat die falsche Länge (${m.length} Zeichen)`
      : 'Die Meta-Description für Google fehlt',
    problema: m
      ? `Die aktuelle Beschreibung hat ${m.length} Zeichen; der von Google angezeigte Platz beträgt etwa 70–160.`
      : 'Die Meta-Description ist nicht gesetzt: die zwei Textzeilen, die Google unter dem Titel des Suchergebnisses zeigt.',
    impatto:
      'Ohne Description sucht sich Google einen zufälligen Satz aus der Seite heraus — oft das Menü oder ein Stück Cookie-Banner. Es ist der einzige kostenlose Werbeplatz in den Suchergebnissen, und er wird verschenkt.',
    evidenza: m ? [`Aktuell: ${m}`] : undefined,
    soluzione:
      '150 Zeichen mit Dienstleistung, Ort und einem konkreten Grund fürs Studio schreiben, mit einer Handlungsaufforderung schliessen ("Jetzt online buchen").',
  });
};

const checkH1 = (d) => {
  const h1 = (d.dom?.headings || []).filter((h) => h.level === 1);
  if (h1.length === 1) return null;
  return f({
    id: 'h1',
    area: 'trovabilita',
    severita: h1.length === 0 ? 'alto' : 'medio',
    titolo: h1.length === 0 ? 'Die Hauptüberschrift der Seite fehlt' : `Es gibt ${h1.length} Hauptüberschriften`,
    problema:
      h1.length === 0
        ? 'Die Seite hat keine Überschrift der ersten Ebene (H1) — die grosse Überschrift, die das Thema der Seite festlegt.'
        : `Die Seite hat ${h1.length} Überschriften der ersten Ebene. Es sollte nur eine geben: ${h1.map((h) => `"${h.text}"`).join(', ')}.`,
    impatto:
      'Google nutzt diese Überschrift, um das Thema der Seite zu verstehen. Fehlt sie oder gibt es mehrere, versteht die Suchmaschine das Thema nicht und zeigt die Website weiter unten an.',
    soluzione: 'Nur ein H1 pro Seite, mit der wichtigsten Dienstleistung und dem Ort.',
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
    titolo: 'Die Überschriftenhierarchie überspringt Ebenen',
    problema: `An ${salti.length} Stelle${salti.length === 1 ? '' : 'n'} wird von einer Überschriftenebene direkt zu einer nicht aufeinanderfolgenden gesprungen (z. B. von H2 direkt zu H4).`,
    impatto:
      'Wer mit einem Screenreader navigiert, nutzt Überschriften wie ein Inhaltsverzeichnis, um zwischen Abschnitten zu springen. Bei einer kaputten Hierarchie verliert man den Faden, und auch Google versteht die Struktur der Seite schlechter.',
    evidenza: salti.slice(0, 5),
    soluzione: 'Ebenen der Reihe nach verwenden (H1 → H2 → H3), nach Struktur gewählt, nicht nach Grösse.',
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
    titolo: 'Google erhält die Betriebsdaten nicht in lesbarer Form',
    problema:
      blocks.length === 0
        ? 'Auf der Website gibt es keine strukturierten Daten — das Standardformat, mit dem Adresse, Öffnungszeiten, Telefonnummer und Betriebsart an Google übermittelt werden.'
        : `Es sind strukturierte Daten vorhanden (${[...new Set(types)].join(', ')}), aber es fehlt der Eintrag für ein lokales Unternehmen (BeautySalon / HealthAndBeautyBusiness).`,
    impatto:
      'Diese Daten speisen die Box mit Karte, Öffnungszeiten und Sternebewertung, die rechts in den Google-Ergebnissen und bei "in meiner Nähe"-Suchen erscheint. Ohne sie bleibt das Studio ein reines Text-Ergebnis, während Mitbewerber diese Box besetzen.',
    soluzione:
      'Einen JSON-LD-Block vom Typ HealthAndBeautyBusiness einfügen, mit Name, Adresse, Telefon, Öffnungszeiten, Preisen und Links zu den Social-Profilen.',
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
    titolo: `${mancanti.join(' und ')} fehlt`,
    problema: `${mancanti.join(' und ')} ${mancanti.length > 1 ? 'sind die Dateien' : 'ist die Datei'}, mit denen Google mitgeteilt wird, welche Seiten existieren und gelesen werden dürfen.`,
    impatto:
      'Ohne Sitemap muss Google die Struktur erraten: neue Seiten werden später gefunden, manche gar nicht.',
    soluzione: 'sitemap.xml und robots.txt erzeugen und die Website bei der Google Search Console anmelden.',
  });
};

const checkNoindex = (d) => {
  const r = (d.dom?.metaRobots || '').toLowerCase();
  if (!r.includes('noindex')) return null;
  return f({
    id: 'noindex',
    area: 'trovabilita',
    severita: 'critico',
    titolo: 'Die Website sagt Google, sie NICHT in den Ergebnissen anzuzeigen',
    problema: `Die Seite enthält die Anweisung "${d.dom.metaRobots}". "noindex" bedeutet: diese Seite nicht in den Suchergebnissen anzeigen.`,
    impatto:
      'Das ist die häufigste Ursache dafür, dass eine Website "existiert, aber bei Google nicht zu finden ist". Solange das bestehen bleibt, kann keine SEO-Massnahme wirken: die Website ist absichtlich unsichtbar.',
    soluzione: 'Das noindex sofort entfernen und die erneute Indexierung über die Search Console anfordern.',
  });
};

const checkLang = (d) =>
  d.dom?.lang
    ? null
    : f({
        id: 'lang',
        area: 'accessibilita',
        severita: 'basso',
        titolo: 'Die Sprache der Website ist nicht deklariert',
        problema: 'Es fehlt das Attribut, das angibt, in welcher Sprache die Seite verfasst ist.',
        impatto:
          'Screenreader sprechen den Text mit der falschen Betonung, und Browser schlagen ungefragt automatische Übersetzungen vor.',
        soluzione: 'Die Sprache im html-Tag deklarieren (z. B. lang="de-CH").',
      });

const checkCanonical = (d) =>
  d.dom?.canonical
    ? null
    : f({
        id: 'canonical',
        area: 'trovabilita',
        severita: 'basso',
        titolo: 'Die kanonische Adresse fehlt',
        problema:
          'Es ist nicht angegeben, welche die offizielle Adresse der Seite ist (mit oder ohne www, mit oder ohne abschliessenden Schrägstrich).',
        impatto:
          'Google kann denselben Inhalt als mehrere verschiedene Seiten behandeln und die Stärke der Website auf die Kopien aufteilen.',
        soluzione: 'Auf jeder Seite ein Canonical-Tag mit der endgültigen Adresse ergänzen.',
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
    titolo: 'Beim Teilen des Links auf WhatsApp oder Instagram erscheint keine Vorschau',
    problema: `Es fehlen die Social-Vorschaudaten (${mancanti.join(', ')}): Titel, Beschreibung und Bild, die erscheinen, wenn jemand den Link einfügt.`,
    impatto:
      'Mundpropaganda bei einem Studio läuft meist über WhatsApp. Ein Link, der nur als graue Textzeile ohne Foto erscheint, wird deutlich seltener angeklickt als einer mit einem schönen Bild vom Studio.',
    soluzione:
      'Open-Graph-Tags ergänzen (og:title, og:description, og:image mit einem Foto in 1200×630) und mit dem Facebook-Debugger prüfen.',
  });
};

// ---------------------------------------------------------------- KONVERSION

const checkContatti = (d) => {
  const s = d.dom?.signals || {};
  const links = d.dom?.links || [];
  const tel = links.filter((l) => l.isTel).length;
  const mail = links.filter((l) => l.isMailto).length;
  const mancanti = [];
  if (!tel && !s.phoneInText) mancanti.push('Telefonnummer');
  if (!mail && !s.emailInText) mancanti.push('E-Mail-Adresse');
  if (!s.postalCode) mancanti.push('Adresse mit PLZ und Ort');
  if (!s.openingHours) mancanti.push('Öffnungszeiten');
  if (!mancanti.length) return null;
  return f({
    id: 'contatti',
    area: 'conversione',
    severita: mancanti.length > 2 ? 'critico' : 'alto',
    titolo: `Auf der Startseite fehlt${mancanti.length === 1 ? '' : 'en'}: ${mancanti.join(', ')}`,
    problema:
      'Das sind die Informationen, die eine Kundin bei einem Beauty-Studio zuerst sucht. Aktuell sind sie auf der Startseite nicht sichtbar.',
    impatto:
      'Wer ein Beauty-Studio sucht, hat sich meist schon zur Buchung entschieden — sie will nur wissen, wo Sie sind, wann Sie geöffnet haben und wie sie Sie erreicht. Findet sie das nicht in zehn Sekunden, öffnet sie die Website des nächsten Studios. Das ist der Punkt, der am meisten Termine kostet.',
    evidenza: mancanti.map((m) => `Nicht gefunden: ${m}`),
    soluzione:
      'Telefon, Adresse und Öffnungszeiten weit oben auf der Startseite platzieren und in der Fusszeile wiederholen. Die Telefonnummer muss ein klickbarer Link (tel:) sein, um mit einem Fingertipp anzurufen.',
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
    titolo: 'Die Telefonnummer ist nicht klickbar',
    problema: 'Die Nummer erscheint auf der Seite als einfacher Text, nicht als Telefonlink.',
    impatto:
      'Vom Handy aus müsste die Kundin sich die Nummer merken, die Website verlassen, die Tastatur öffnen und die Nummer erneut eintippen. Viele tun das nicht. Sie klickbar zu machen ist eine Änderung von einer Minute, die Besuche direkt in Anrufe verwandelt.',
    soluzione: 'Die Nummer in einen Link tel:+41... umwandeln und einen Button "Jetzt anrufen" danebensetzen.',
  });
};

const checkCta = (d) => {
  const s = d.dom?.signals || {};
  if (s.booking) return null;
  return f({
    id: 'cta',
    area: 'conversione',
    severita: 'critico',
    titolo: 'Eine klare Aufforderung zur Terminbuchung fehlt',
    problema:
      'Auf der Seite gibt es keinen Button oder Hinweis, der der Besucherin explizit sagt, was sie tun soll ("Termin buchen", "Jetzt Termin vereinbaren", "Schreiben Sie uns auf WhatsApp").',
    impatto:
      'Eine Website ohne Handlungsaufforderung funktioniert wie ein Schaufenster mit verschlossener Tür: man schaut hin und geht weiter. Das ist der Unterschied zwischen einer Website, die Termine bringt, und einer, die nur eine Visitenkarte ist.',
    soluzione:
      'Einen gut sichtbaren Buchungs-Button oben einfügen, ihn in der Seitenmitte und am Ende wiederholen, und auf dem Handy unten fixiert anzeigen.',
  });
};

const checkPrezzi = (d) =>
  d.dom?.signals?.prices
    ? null
    : f({
        id: 'prezzi',
        area: 'conversione',
        severita: 'medio',
        titolo: 'Preise für die Behandlungen sind nicht angegeben',
        problema: 'Auf der Seite erscheinen keine Frankenbeträge zu den Dienstleistungen.',
        impatto:
          'Der Preis ist nach dem Standort die zweitwichtigste gesuchte Information. Wer ihn nicht findet, geht von "teuer" aus und schliesst die Seite. Eine sichtbare Preisliste filtert Neugierige heraus und bringt Anfragen, die buchungsbereit sind.',
        soluzione: 'Eine Preisliste veröffentlichen, auch nur mit Einstiegspreisen ("Massage 60 Min. — ab CHF 120").',
      });

const checkMappa = (d) =>
  d.dom?.signals?.map
    ? null
    : f({
        id: 'mappa',
        area: 'conversione',
        severita: 'basso',
        titolo: 'Es gibt keine Karte, um das Studio zu finden',
        problema: 'Die Website enthält keine eingebettete Karte mit dem Standort.',
        impatto:
          'Bei einem lokalen Betrieb kommt die Frage "wo genau sind Sie, und wo kann ich parkieren?" vor der Buchung. Eine Karte mit einem Klick zur Wegbeschreibung nimmt diesen Zweifel.',
        soluzione: 'Eine Karte einbetten und einen Hinweis zu Parkplatz und nächster Haltestelle ergänzen.',
      });

const checkSocial = (d) => {
  const s = d.dom?.signals?.socialLinks || [];
  if (s.length) return null;
  return f({
    id: 'social',
    area: 'conversione',
    severita: 'basso',
    titolo: 'Keine Verlinkung zu Social-Profilen',
    problema: 'Von der Website aus erreicht man weder Instagram noch Facebook noch WhatsApp.',
    impatto:
      'Fotos der Arbeiten sind der beste Beweis für die Qualität eines Beauty-Studios. Wer die Ergebnisse vor der Buchung sehen möchte, findet nirgends einen Blick darauf und bleibt unentschlossen.',
    soluzione: 'Social-Icons in Kopf- und Fusszeile ergänzen, plus einen direkten WhatsApp-Button.',
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
    titolo: `${senzaLabel.length} Formularfeld${senzaLabel.length === 1 ? '' : 'er'} ohne Beschriftung`,
    problema:
      'Einige Felder des Kontaktformulars nutzen nur den grauen Platzhaltertext statt einer echten Beschriftung.',
    impatto:
      'Sobald die Kundin zu schreiben beginnt, verschwindet der graue Text, und sie weiss nicht mehr, was in dieses Feld gehörte: mehr Fehler, mehr abgebrochene Formulare. Screenreader können das Feld zudem gar nicht vorlesen.',
    evidenza: senzaLabel.slice(0, 6).map((x) => `${x.tag}${x.name ? ` name="${x.name}"` : ''}`),
    soluzione: 'Jedem Feld ein sichtbares <label> zuordnen.',
  });
};

// ---------------------------------------------------------------- GESCHWINDIGKEIT

const checkPeso = (d) => {
  const net = d.network || [];
  const totale = net.reduce((a, r) => a + (r.size || 0), 0);
  const imgBytes = net.filter((r) => r.type === 'image').reduce((a, r) => a + (r.size || 0), 0);
  if (totale < 2_500_000) return null;
  return f({
    id: 'peso',
    area: 'velocita',
    severita: totale > 6_000_000 ? 'critico' : 'alto',
    titolo: `Die Seite wiegt ${(totale / 1_048_576).toFixed(1)} MB`,
    problema: `Um die Startseite zu öffnen, muss das Handy ${(totale / 1_048_576).toFixed(1)} MB in ${net.length} Anfragen laden, davon ${(imgBytes / 1_048_576).toFixed(1)} MB allein an Bildern. Eine gut gebaute Startseite liegt unter 1,5 MB.`,
    impatto:
      'Unterwegs im Mobilfunknetz bedeutet das mehrere Sekunden leerer Bildschirm. Google misst: nach 3 Sekunden ist mehr als die Hälfte der Besucherinnen schon weg, bevor sie die Seite überhaupt gesehen hat — und die verbrauchten Daten gehen zulasten der Kundin.',
    evidenza: [
      `Insgesamt geladen: ${kb(totale)} KB`,
      `Bilder: ${kb(imgBytes)} KB (${pct(imgBytes, totale)}% des Gesamtvolumens)`,
      `Netzwerkanfragen: ${net.length}`,
    ],
    soluzione:
      'Bilder komprimieren und in WebP umwandeln, Inhalte unterhalb des ersten Bildschirms verzögert laden, ungenutzte Skripte entfernen.',
  });
};

const checkTempo = (d) => {
  const load = d.timing?.load ?? d.loadMs;
  if (!load || load < 3000) return null;
  return f({
    id: 'tempo',
    area: 'velocita',
    severita: load > 6000 ? 'alto' : 'medio',
    titolo: `Die Website braucht ${(load / 1000).toFixed(1)} Sekunden zum Öffnen`,
    problema: `Vollständige Ladezeit gemessen: ${(load / 1000).toFixed(1)}s über eine schnelle Verbindung am Computer. Auf dem Handy im 4G-Netz ist die Zeit typischerweise zwei- bis dreimal so hoch.`,
    impatto:
      'Jede zusätzliche Sekunde kostet etwa 7 % der Conversions. Geschwindigkeit ist zudem ein direkter Ranking-Faktor bei Google.',
    evidenza: [
      d.timing?.ttfb != null ? `Serverantwort: ${d.timing.ttfb} ms` : null,
      d.timing?.paints?.['first-contentful-paint'] != null
        ? `Erster sichtbarer Inhalt: ${d.timing.paints['first-contentful-paint']} ms`
        : null,
    ].filter(Boolean),
    soluzione: 'Caching und Kompression am Server aktivieren, Bilder optimieren, besseres Hosting prüfen.',
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
    titolo: `${imgs.length} Bilder werden viel grösser geladen als nötig`,
    problema:
      'Die Fotos werden in der Originalauflösung der Kamera geladen und dann vom Browser verkleinert. Die Besucherin lädt Millionen von Pixeln herunter, die sie nie zu sehen bekommt.',
    impatto:
      'Das ist die häufigste Ursache für langsame Websites bei Beauty-Studios, wo Fotos eine grosse Rolle spielen. Richtig skaliert, halbiert sich die Ladezeit oft, ohne dass sich am Aussehen etwas ändert.',
    evidenza: imgs
      .slice(0, 6)
      .map((i) => `${i.naturalWidth}×${i.naturalHeight}px angezeigt in ${i.displayWidth}×${i.displayHeight}px`),
    soluzione:
      'Dateien auf die tatsächlich genutzte Grösse skalieren, WebP ausliefern und srcset für verschiedene Bildschirmgrössen verwenden.',
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
    titolo: `${vecchi.length} von ${imgs.length} Bildern nutzen veraltete Formate`,
    problema: 'Die Fotos liegen als JPG oder PNG vor statt als WebP oder AVIF.',
    impatto:
      'Bei gleicher sichtbarer Qualität wiegt WebP rund 30 % weniger. Ein Geschwindigkeitsgewinn, der nichts an Bildqualität kostet.',
    soluzione: 'Bilder in WebP umwandeln und JPG als Fallback für ältere Browser behalten.',
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
    titolo: 'Alle Bilder werden sofort beim Öffnen geladen',
    problema: `${senza.length} von ${imgs.length} Bildern nutzen kein verzögertes Laden: Der Browser lädt auch Fotos ganz unten auf der Seite, die die Besucherin vielleicht nie sieht.`,
    impatto: 'Das verzögert die Anzeige des ersten Bildschirms — genau des Teils, der entscheidet, ob die Kundin bleibt.',
    soluzione: 'loading="lazy" bei allen Bildern ausser jenen im ersten Bildschirm ergänzen.',
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
    titolo: 'Die Seite "springt" beim Laden',
    problema: `${senza.length} Bilder geben ihre Grösse nicht an, daher weiss der Browser nicht, wie viel Platz er reservieren soll, und verschiebt den Inhalt, während die Fotos nach und nach ankommen.`,
    impatto:
      'Die Kundin will gerade einen Button drücken, die Seite verschiebt sich, sie drückt etwas anderes. Das ist ärgerlich, und Google misst es als Qualitätsmangel (CLS).',
    soluzione: 'width und height bei jedem Bild angeben.',
  });
};

// ---------------------------------------------------------------- BARRIEREFREIHEIT

const checkAlt = (d) => {
  const imgs = d.dom?.images || [];
  const senza = imgs.filter((i) => !i.hasAlt);
  if (!senza.length) return null;
  return f({
    id: 'alt',
    area: 'accessibilita',
    severita: senza.length / Math.max(imgs.length, 1) > 0.5 ? 'alto' : 'medio',
    titolo: `${senza.length} von ${imgs.length} Bildern ohne Alternativtext`,
    problema:
      'Der Alternativtext ist die kurze Beschreibung, die jedes Bild begleitet: Screenreader lesen ihn vor, und Google nutzt ihn, um zu verstehen, was das Bild zeigt.',
    impatto:
      'Doppelter Schaden: Die Fotos der Behandlungen erscheinen nicht in der Google-Bildersuche, und wer sehbehindert ist, weiss nicht, was er gerade betrachtet. In der Schweiz wird Barrierefreiheit bei Publikumsdiensten zudem zunehmend erwartet.',
    evidenza: senza.slice(0, 6).map((i) => (i.src || '').split('/').pop()),
    soluzione:
      'Jedem Foto eine konkrete Beschreibung geben ("Gesichtsbehandlung in der Kabine", nicht "bild1.jpg").',
    screenshot: 'desktopAnnotated',
  });
};

const checkContrasto = (d) => {
  const c = d.dom?.contrastIssues || [];
  if (c.length < 2) return null;
  return f({
    id: 'contrasto',
    area: 'accessibilita',
    severita: c.length > 8 ? 'alto' : 'medio',
    titolo: `${c.length} Texte mit unzureichendem Kontrast`,
    problema:
      'Einige Texte haben ein Kontrastverhältnis zum Hintergrund unter dem Mindestwert der internationalen Richtlinien (WCAG 2.1 AA: 4,5:1 für normalen Text).',
    impatto:
      'Heller Text auf hellem Hintergrund wirkt am Bildschirm des Grafikers elegant und ist auf dem Handy der Kundin in der Sonne unleserlich. Das betrifft vor allem Kundinnen über 50 — für ein Beauty-Studio jene mit dem höchsten durchschnittlichen Umsatz.',
    evidenza: c.slice(0, 6).map((x) => `${x.ratio}:1 (nötig: ${x.required}:1) — "${x.text}"`),
    soluzione: 'Text abdunkeln oder Hintergrund aufhellen, bis 4,5:1 überschritten sind — mit einem Contrast Checker prüfen.',
    screenshot: 'desktopAnnotated',
  });
};

const checkLinkVuoti = (d) => {
  const vuoti = (d.dom?.links || []).filter((l) => l.visible && !l.hasText && !l.isAnchor);
  if (!vuoti.length) return null;
  return f({
    id: 'link-vuoti',
    area: 'accessibilita',
    severita: 'basso',
    titolo: `${vuoti.length} Link${vuoti.length === 1 ? '' : 's'} ohne Text`,
    problema: 'Einige Links (oft Icons) enthalten weder Text noch eine alternative Beschreibung.',
    impatto: 'Ein Screenreader kündigt sie nur als "Link" an — die Nutzerin weiss nicht, wohin er führt.',
    soluzione: 'Ein beschreibendes aria-label oder einen nur für Screenreader sichtbaren Text ergänzen.',
  });
};

const checkIframeTitle = (d) => {
  const senza = (d.dom?.iframes || []).filter((i) => !i.title);
  if (!senza.length) return null;
  return f({
    id: 'iframe-title',
    area: 'accessibilita',
    severita: 'basso',
    titolo: `${senza.length} eingebettete${senza.length === 1 ? 'r' : ''} Inhalt${senza.length === 1 ? '' : 'e'} ohne Beschreibung`,
    problema: 'Eingebettete Karten oder Videos haben keinen Titel, der ihren Inhalt erklärt.',
    impatto: 'Wer einen Screenreader nutzt, trifft auf einen anonymen Block und weiss nicht, ob er ihn überspringen soll.',
    soluzione: 'Bei jedem iframe das Attribut title ergänzen.',
  });
};

// ---------------------------------------------------------------- RECHTLICHES (CH)

const checkImpressum = (d) =>
  d.dom?.signals?.impressum
    ? null
    : f({
        id: 'impressum',
        area: 'legale',
        severita: 'critico',
        titolo: 'Das Impressum fehlt',
        problema:
          'Es gibt keine Seite mit den Unternehmensangaben: Firmenname, vollständige Adresse, E-Mail und — sofern mehrwertsteuerpflichtig — UID-/MWST-Nummer.',
        impatto:
          'In der Schweiz ist das Impressum für Online-Angebote gesetzlich vorgeschrieben (Art. 3 Abs. 1 Bst. s UWG). Ein Verstoss ist strafrechtlich verfolgbar und kann eine Busse nach sich ziehen. Neben dem rechtlichen Risiko ist das Fehlen sichtbarer Firmenangaben einer der meistgenannten Gründe für Misstrauen gegenüber einer Website.',
        soluzione:
          'Eine Impressum-Seite mit Firmenname, Adresse, E-Mail, Telefon und UID-Nummer erstellen und von der Fusszeile jeder Seite verlinken.',
      });

const checkPrivacy = (d) =>
  d.dom?.signals?.privacy
    ? null
    : f({
        id: 'privacy',
        area: 'legale',
        severita: 'critico',
        titolo: 'Die Datenschutzerklärung fehlt',
        problema:
          'Es gibt keine Seite, die erklärt, welche Daten von Besucherinnen erhoben werden und wie sie verarbeitet werden.',
        impatto:
          'Das revidierte Schweizer Datenschutzgesetz (nDSG, in Kraft seit 1. September 2023) verlangt sie für jede Website, die personenbezogene Daten erhebt — ein Kontaktformular oder Besucherstatistiken genügen bereits. Hat die Website auch Kundinnen aus der EU, gilt zusätzlich die DSGVO.',
        soluzione:
          'Eine nDSG-konforme Datenschutzerklärung veröffentlichen und von der Fusszeile sowie jedem Formular aus verlinken.',
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
    titolo: 'Tracking-Tools sind aktiv, ohne um Zustimmung zu fragen',
    problema:
      'Die Seite lädt Analyse- oder Werbedienste von Drittanbietern, zeigt aber keinen Hinweis, um die Zustimmung der Besucherin einzuholen.',
    impatto:
      'Die Daten werden erhoben, bevor die Besucherin überhaupt zustimmen konnte. Das ist genau der Punkt, an dem sich datenschutzrechtliche Beanstandungen festmachen, und für Besucherinnen aus der EU ist es ein direkter DSGVO-Verstoss.',
    evidenza: [
      ...new Set(
        (d.network || [])
          .filter((r) => /google-analytics|googletagmanager|facebook\.net|hotjar|clarity\.ms|doubleclick/i.test(r.url))
          .map((r) => new URL(r.url).hostname)
      ),
    ].slice(0, 5),
    soluzione:
      'Ein Consent-Banner einrichten, das nicht notwendige Skripte blockiert, bis die Besucherin eine Wahl getroffen hat.',
  });
};

// ---------------------------------------------------------------- TECHNIK

const checkSecurityHeaders = (d) => {
  const h = d.http?.headers || {};
  const attesi = {
    'strict-transport-security': 'erzwingt die geschützte Verbindung auch bei künftigen Besuchen',
    'x-content-type-options': 'verhindert, dass der Browser Dateien falsch interpretiert',
    'content-security-policy': 'schränkt ein, welche Skripte auf der Seite laufen dürfen',
    'referrer-policy': 'kontrolliert, welche Daten an externe Websites weitergegeben werden',
  };
  const mancanti = Object.keys(attesi).filter((k) => !h[k]);
  if (mancanti.length < 3) return null;
  return f({
    id: 'headers',
    area: 'tecnica',
    severita: 'basso',
    titolo: `${mancanti.length} Sicherheits-Header fehlen`,
    problema:
      'Der Server sendet einige der üblichen Schutzeinstellungen nicht, die moderne Browser nutzen können.',
    impatto:
      'Für die Kundin nicht sichtbar, aber es macht die Website anfälliger für gängige Angriffe und senkt die Bewertung bei Sicherheitsprüfungen, die manche Versicherungen und Partner verlangen.',
    evidenza: mancanti.map((k) => `${k} — ${attesi[k]}`),
    soluzione: 'Die Header in der Server- oder CDN-Konfiguration ergänzen.',
  });
};

const checkGenerator = (d) => {
  const g = d.dom?.generator;
  if (!g || !/wix|jimdo|weebly|squarespace|homepage-baukasten|site123|webnode/i.test(g)) return null;
  return f({
    id: 'generator',
    area: 'tecnica',
    severita: 'basso',
    titolo: `Die Website wurde mit einem Baukasten erstellt (${g})`,
    problema: `Die Seite gibt an, mit ${g} erstellt worden zu sein.`,
    impatto:
      'Solche Baukästen sind ein guter Einstieg, setzen aber eine Obergrenze bei Geschwindigkeit, Google-Ranking und Individualisierung — und die Website bleibt an die Plattform gebunden: ein Umzug bedeutet einen Neubau.',
    soluzione:
      'Einen Umstieg auf eine eigene Website prüfen, sobald Traffic oder Anfragen wirklich ins Gewicht fallen.',
  });
};

const checkKeywordsMeta = (d) =>
  d.dom?.metaKeywords
    ? f({
        id: 'meta-keywords',
        area: 'tecnica',
        severita: 'basso',
        titolo: 'Im Code stehen noch die "Meta Keywords"',
        problema: `Die Seite enthält das Keywords-Tag ("${String(d.dom.metaKeywords).slice(0, 80)}...").`,
        impatto:
          'Google berücksichtigt sie seit 2009 nicht mehr. Sie schaden nicht, zeigen aber, dass die Website nach fünfzehn Jahre alten Kriterien eingerichtet wurde — nützlich zu wissen, um einzuschätzen, was sonst noch veraltet sein könnte.',
        soluzione: 'Entfernen und die Zeit stattdessen in Title und Description investieren, die tatsächlich zählen.',
      })
    : null;

const checkContenuto = (d) => {
  const w = d.dom?.counts?.words || 0;
  if (w >= 300) return null;
  return f({
    id: 'contenuto',
    area: 'trovabilita',
    severita: 'alto',
    titolo: `Die Startseite enthält nur ${w} Wörter`,
    problema:
      'Der Text der Startseite ist sehr knapp. Google braucht Text, um zu verstehen, womit sich ein Betrieb beschäftigt und für welche Suchanfragen er angezeigt werden soll.',
    impatto:
      'Mit so wenig Text kann sich die Website praktisch nur beim eigenen Namen platzieren — sie wird also nur von jenen gefunden, die sie bereits kennen. Wer "Gesichtsbehandlung [Ort]" sucht, ohne das Studio zu kennen, findet es nie.',
    soluzione:
      'Jede Behandlung mit 100–200 Wörtern beschreiben, mit den Wörtern, die Kundinnen bei der Suche tatsächlich verwenden.',
  });
};

// ---------------------------------------------------------------- AUSFÜHRUNG

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
      return null;
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
        ? 'Gut'
        : punteggio >= 60
          ? 'Ausbaufähig'
          : punteggio >= 40
            ? 'Ungenügend'
            : 'Kritisch',
  };
}
