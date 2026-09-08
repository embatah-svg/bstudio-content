/* Fahrschule CH – Inhalte DE/AR, Runde 3: 15 Kapitel, ~290 Fragen, Szenenbilder, Schilderkatalog.
   Eigene Lernfragen nach SVG/VRV/SSV. Nicht der offizielle asa-Fragenkatalog. */

const MODULES = [
  { id: "grundregeln", de: "Grundregeln im Verkehr", ar: "القواعد الأساسية للمرور", icon: "§", points: [
    { de: "Fahre so, dass du niemanden gefährdest, behinderst oder belästigst. Das ist die Grundregel (Art. 26 SVG).", ar: "قُد بطريقة لا تُعرّض أحداً للخطر ولا تعيقه ولا تزعجه. هذه هي القاعدة الأساسية (المادة 26 من قانون المرور)." },
    { de: "Vertrauensgrundsatz: Du darfst annehmen, dass sich andere korrekt verhalten – ausser bei Kindern, älteren Menschen und unsicher wirkenden Personen.", ar: "مبدأ الثقة: يمكنك افتراض أن الآخرين يتصرفون بشكل صحيح — إلا مع الأطفال وكبار السن والأشخاص الذين يبدو سلوكهم غير واثق." },
    { de: "Rechtsfahrgebot: Fahre immer möglichst rechts. Innerorts auf Strassen mit mehreren Spuren darfst du die Spur frei wählen.", ar: "وجوب السير على اليمين: سِر دائماً أقصى اليمين ما أمكن. داخل المدن على الطرق متعددة المسارب يمكنك اختيار المسرب بحرية." },
    { de: "Anpassen der Geschwindigkeit: immer an Strasse, Sicht, Wetter, Verkehr und Fahrzeug – auch wenn das Signal mehr erlauben würde.", ar: "تكييف السرعة: يجب دائماً تكييفها مع الطريق والرؤية والطقس وحركة السير والمركبة — حتى لو كانت اللافتة تسمح بأكثر." },
    { de: "Fahren auf Sicht: Du musst innerhalb der überblickbaren Strecke anhalten können.", ar: "القيادة حسب مدى الرؤية: يجب أن تكون قادراً على التوقف ضمن المسافة التي تراها." },
    { de: "Handy nur mit Freisprechanlage. In der Hand halten ist verboten – auch beim Stillstand im Stau.", ar: "الهاتف فقط بنظام حر اليدين. حمله باليد ممنوع — حتى عند التوقف في الازدحام." },
    { de: "Sicherheitsgurt ist auf allen Plätzen obligatorisch. Der Fahrer haftet für Kinder unter 12 Jahren.", ar: "حزام الأمان إلزامي في كل المقاعد. السائق مسؤول عن الأطفال دون 12 سنة." },
    { de: "Kinder unter 12 Jahren und kleiner als 150 cm brauchen einen geprüften Kindersitz.", ar: "الأطفال دون 12 سنة وطولهم أقل من 150 سم يحتاجون مقعد أطفال معتمداً." },
    { de: "Die Grundregel gilt auch dann, wenn du formal Vortritt oder eine Erlaubnis hast: Verletzung anderer geht immer vor.", ar: "القاعدة الأساسية تنطبق حتى عندما تكون لك الأولوية رسمياً: تجنّب إيذاء الآخرين له الأسبقية دائماً." }
  ]},
  { id: "signale", de: "Signale und Markierungen", ar: "الإشارات والعلامات", icon: "△", points: [
    { de: "Gefahrensignale sind dreieckig mit rotem Rand. Sie warnen – zum Beispiel «Kurve», «Kinder», «Steinschlag».", ar: "إشارات الخطر مثلثة بإطار أحمر. تُحذّر — مثل «منعطف»، «أطفال»، «سقوط صخور»." },
    { de: "Vorschriftssignale sind rund. Rot umrandet = Verbot, blau = Gebot (zum Beispiel «Radweg»).", ar: "إشارات الأوامر دائرية. بإطار أحمر = منع، وزرقاء = إلزام (مثل «مسار الدراجات»)." },
    { de: "Das Hauptstrassensignal ist ein gelbes Viereck auf der Spitze. Vortritt gilt, bis das gleiche Signal durchgestrichen erscheint.", ar: "إشارة الطريق الرئيسي معيّن أصفر. الأولوية سارية إلى أن تظهر نفس الإشارة مشطوبة." },
    { de: "«Kein Vortritt» ist ein Dreieck auf der Spitze. Nicht anhalten zwingend, aber Vortritt gewähren.", ar: "«لا أولوية» مثلث مقلوب. ليس التوقف إلزامياً، لكن يجب منح الأولوية." },
    { de: "«STOP» ist achteckig. Immer vollständig anhalten, auch wenn die Strasse frei ist.", ar: "«قف» ثمانية الأضلاع. التوقف التام دائماً، حتى لو كان الطريق خالياً." },
    { de: "In der Schweiz sind Autobahnsignale grün und Hauptstrassensignale blau. In Deutschland und Italien ist es umgekehrt.", ar: "في سويسرا إشارات الطرق السريعة خضراء وإشارات الطرق الرئيسية زرقاء. في ألمانيا وإيطاليا العكس." },
    { de: "Durchgezogene Sicherheitslinie: nicht überfahren. Unterbrochene Leitlinie: überfahren erlaubt, wenn sicher.", ar: "الخط المتصل: ممنوع تجاوزه. الخط المتقطع: يمكن عبوره إذا كان ذلك آمناً." },
    { de: "Gelbe Markierungen gelten für Busse, Taxis oder Fussgänger. Auf gelben Zickzacklinien: weder halten noch parkieren.", ar: "العلامات الصفراء مخصصة للحافلات أو التاكسي أو المشاة. على الخطوط الصفراء المتعرجة: ممنوع الوقوف والركن." },
    { de: "Weisungen der Polizei gehen allen Signalen, Lichtsignalen und Regeln vor.", ar: "تعليمات الشرطة تسبق كل الإشارات وأضواء المرور والقواعد." },
    { de: "Gelbes Blinklicht: erhöhte Vorsicht, normale Vortrittsregeln gelten wieder.", ar: "الضوء الأصفر الوامض: حذر شديد، وتعود قواعد الأولوية العادية للتطبيق." },
    { de: "Bei Gelb an der Ampel: anhalten, wenn noch gefahrlos möglich. Erst bei zu geringem Abstand darfst du durchfahren.", ar: "عند الضوء الأصفر: توقّف إن أمكن ذلك بأمان. لا تعبر إلا إذا كانت المسافة قصيرة جداً للتوقف الآمن." },
    { de: "Ein rundes Signal mit rotem Rand und Vorschrift auf der Grafik gilt so lange, bis ein Signal es aufhebt oder eine neue Verzweigung erreicht ist.", ar: "الإشارة الدائرية بإطار أحمر تظل سارية إلى أن تلغيها إشارة أخرى أو تصل إلى تقاطع جديد." }
  ]},
  { id: "tempo", de: "Geschwindigkeit und Abstand", ar: "السرعة والمسافة", icon: "50", points: [
    { de: "Höchstgeschwindigkeiten: innerorts 50, ausserorts 80, Autostrasse 100, Autobahn 120 km/h.", ar: "السرعات القصوى: داخل المدن 50، خارجها 80، الطريق السيار 100، الأوتوستراد 120 كم/س." },
    { de: "Tempo-30-Zone: 30 km/h. Begegnungszone: Schrittgeschwindigkeit (rund 20 km/h), Fussgänger dürfen die ganze Fläche nutzen und haben Vortritt.", ar: "منطقة 30: السرعة 30 كم/س. منطقة اللقاء: سرعة المشي (نحو 20 كم/س)، ويمكن للمشاة استخدام كامل المساحة ولهم الأولوية." },
    { de: "Personenwagen mit Anhänger: höchstens 80 km/h, auch auf der Autobahn.", ar: "سيارة مع مقطورة: 80 كم/س كحد أقصى، حتى على الأوتوستراد." },
    { de: "Anhalteweg = Reaktionsweg + Bremsweg.", ar: "مسافة التوقف = مسافة رد الفعل + مسافة الكبح." },
    { de: "Reaktionsweg (1 Sekunde): Zehnerstelle der Geschwindigkeit mal 3. Bei 50 km/h: 15 m.", ar: "مسافة رد الفعل (ثانية واحدة): رقم العشرات من السرعة × 3. عند 50 كم/س = 15 متراً." },
    { de: "Bremsweg trocken: Zehnerstelle mal sich selbst. Bei 50 km/h: 25 m, Anhalteweg 40 m. Bei 80 km/h: 24 m Reaktion + 64 m Bremsen = 88 m.", ar: "مسافة الكبح على طريق جاف: رقم العشرات × نفسه. عند 50 كم/س = 25 متراً فيصبح المجموع 40. عند 80 كم/س: 24 متر رد فعل + 64 متر كبح = 88 متراً." },
    { de: "Doppelte Geschwindigkeit heisst vierfacher Bremsweg. Bei 100 km/h: 100 m Bremsweg.", ar: "مضاعفة السرعة تعني أربعة أضعاف مسافة الكبح. عند 100 كم/س: 100 متر." },
    { de: "Auf nasser Strasse oder Schnee wird der Bremsweg zwei- bis dreimal länger.", ar: "على طريق مبلل أو ثلجي تصبح مسافة الكبح أطول بمرتين إلى ثلاث مرات." },
    { de: "Abstand: mindestens 2 Sekunden zum Fahrzeug davor. Faustregel: halber Tacho in Metern. Bei 100 km/h also rund 50 m.", ar: "المسافة: ثانيتان على الأقل عن المركبة أمامك. قاعدة تقريبية: نصف قراءة العداد بالأمتار. عند 100 كم/س نحو 50 متراً." },
    { de: "Aquaplaning: Gas wegnehmen, geradeaus halten, nicht bremsen und nicht lenken.", ar: "الانزلاق المائي: ارفع قدمك عن البنزين وابقَ مستقيماً، لا تكبح ولا تُدر المقود." },
    { de: "Bei Signal «Kinder» oder in der Nähe von Schulen: Tempo deutlich reduzieren, auch wenn die Höchstgeschwindigkeit höher wäre.", ar: "عند إشارة «أطفال» أو قرب المدارس: خفّض السرعة كثيراً حتى لو كانت السرعة القصوى المسموحة أعلى." }
  ]},
  { id: "vortritt", de: "Vortritt und Kreuzungen", ar: "الأولوية والتقاطعات", icon: "✛", points: [
    { de: "Rechtsvortritt: Ohne Signale und Markierungen hat das Fahrzeug von rechts Vortritt.", ar: "أولوية اليمين: بلا إشارات ولا علامات، الأولوية للمركبة القادمة من اليمين." },
    { de: "Wer aus Feldweg, Parkplatz, Garage, Tankstelle oder einer Werkausfahrt kommt, hat keinen Vortritt.", ar: "من يخرج من طريق ترابي أو موقف أو مرآب أو محطة وقود أو مخرج مصنع، ليست له الأولوية." },
    { de: "Im Kreisel hat Vortritt, wer schon drin ist – also das Fahrzeug von links. Das gilt auch gegenüber einem Tram, das trotzdem stets Vortritt hat.", ar: "في الدوّار الأولوية لمن هو داخله — أي القادم من اليسار. لكن الترام له الأولوية دائماً حتى داخل الدوّار." },
    { de: "Beim Einfahren in den Kreisel: kein Blinker. Beim Verlassen: rechts blinken.", ar: "عند الدخول إلى الدوّار: لا غماز. عند الخروج: غماز اليمين." },
    { de: "Beim Linksabbiegen musst du dem Gegenverkehr den Vortritt lassen.", ar: "عند الانعطاف يساراً يجب منح الأولوية للسير المقابل." },
    { de: "Fussgänger auf dem Streifen oder erkennbar wartend haben Vortritt. Nötigenfalls anhalten. Ohne Streifen haben sie keinen formalen Vortritt, die Grundregel gilt trotzdem.", ar: "المشاة على الممر أو المنتظرون بوضوح لهم الأولوية. توقّف عند الضرورة. بلا ممر معلَّم ليست لهم أولوية رسمية، لكن القاعدة الأساسية تبقى سارية." },
    { de: "Das Tram hat immer Vortritt, auch auf der Hauptstrasse und im Kreisel.", ar: "الترام له الأولوية دائماً، حتى على الطريق الرئيسي وداخل الدوّار." },
    { de: "Innerorts: einem blinkenden, abfahrenden Bus an der Haltestelle den Vortritt lassen.", ar: "داخل المدن: منح الأولوية للحافلة التي تغادر الموقف وتشغّل الغماز." },
    { de: "Blaulicht und Sirene: sofort Platz machen, nötigenfalls rechts anhalten, nicht in die Kreuzung fahren.", ar: "الضوء الأزرق والصفارة: أفسح الطريق فوراً، توقّف يميناً عند الحاجة، لا تدخل التقاطع." },
    { de: "Auch mit Vortritt: nicht in eine Kreuzung fahren, die du verstopfen würdest.", ar: "حتى مع وجود الأولوية: لا تدخل تقاطعاً ستسدّه." },
    { de: "Ein Fussgänger mit weissem oder gelbem Stock signalisiert Querungswunsch. Du musst anhalten.", ar: "المشاة الذي يستعمل عصا بيضاء أو صفراء يُشير إلى رغبته بالعبور. يجب التوقف." },
    { de: "Hindernisregel: Ist deine Fahrbahnseite durch ein Hindernis blockiert oder verengt, musst du dem Gegenverkehr den Vortritt lassen.", ar: "قاعدة العائق: إذا كانت جهتك من الطريق مسدودة أو ضيّقة بسبب عائق، عليك منح الأولوية للسير المقابل." },
    { de: "Ein Velofahrer auf dem Fussgängerstreifen hat keinen Vortritt, ausser er steigt ab und schiebt das Velo.", ar: "راكب الدراجة على ممر المشاة ليست له الأولوية إلا إذا نزل عن الدراجة ودفعها سيراً على الأقدام." }
  ]},
  { id: "manoever", de: "Überholen, Abbiegen, Parkieren", ar: "التجاوز والانعطاف والركن", icon: "⇄", points: [
    { de: "Überholt wird links. Rechtsüberholen ist verboten.", ar: "التجاوز يكون من اليسار. التجاوز من اليمين ممنوع." },
    { de: "In parallelen Kolonnen darf man rechts vorbeifahren, aber nicht ausschwenken und einbiegen.", ar: "في الطوابير المتوازية يُسمح بالمرور من اليمين، دون الخروج والعودة إلى المسرب." },
    { de: "Ein Tram überholst du grundsätzlich rechts.", ar: "الترام يُتجاوز من اليمين كقاعدة." },
    { de: "Überholverbot: vor Kuppen, in unübersichtlichen Kurven, vor Fussgängerstreifen, bei Bahnübergängen ohne Schranken.", ar: "ممنوع التجاوز: قبل قمم التلال، في المنعطفات غير الواضحة، قبل ممرات المشاة، وعند مزلقانات القطار بلا حواجز." },
    { de: "Beim Überholen von Velofahrern: Faustregel rund 1,5 m Abstand ausserorts, rund 1 m innerorts.", ar: "عند تجاوز راكبي الدراجات: كقاعدة تقريبية نحو 1.5 متر خارج المدن، ونحو متر واحد داخلها." },
    { de: "Vor jedem Spurwechsel: Rückspiegel, Blinker, Schulterblick – dann erst lenken.", ar: "قبل كل تغيير مسرب: المرآة، الغماز، النظرة فوق الكتف — ثم الانعطاف." },
    { de: "Der Blinker ist eine Ankündigung, kein Vortrittsrecht.", ar: "الغماز إعلان عن نية، وليس حقاً في الأولوية." },
    { de: "Parkieren verboten: näher als 5 m vor Fussgängerstreifen, vor Ein-/Ausfahrten, auf Hauptstrassen ausserorts, auf Radstreifen.", ar: "ممنوع الركن: على أقل من 5 أمتار قبل ممر المشاة، أمام المداخل والمخارج، وعلى الطرق الرئيسية خارج المدن، وعلى مسارب الدراجات." },
    { de: "Halten verboten: auf Fussgängerstreifen, Bahnübergängen, in engen oder unübersichtlichen Kurven.", ar: "ممنوع الوقوف: على ممر المشاة، على مزلقان القطار، في المنعطفات الضيقة أو غير الواضحة." },
    { de: "Blaue Zone: Parkscheibe Pflicht, erlaubt 1 Stunde.", ar: "المنطقة الزرقاء: قرص الوقوف إلزامي، والمدة المسموحة ساعة واحدة." },
    { de: "Rückwärtsfahren nur kurz und langsam. Bei unübersichtlicher Lage jemanden einweisen lassen.", ar: "الرجوع للخلف لمسافة قصيرة وببطء. عند انعدام الرؤية استعن بمن يوجّهك." },
    { de: "In der Schweiz ist Rechtsabbiegen bei Rotlicht nur erlaubt, wenn ein zusätzliches Signal es ausdrücklich gestattet – anders als in manchen anderen Ländern.", ar: "الانعطاف يميناً عند الضوء الأحمر مسموح في سويسرا فقط إذا سمحت به إشارة إضافية صراحة — بخلاف بعض الدول الأخرى." }
  ]},
  { id: "autobahn", de: "Autobahn und Autostrasse", ar: "الأوتوستراد والطريق السيار", icon: "≡", points: [
    { de: "Auf die Autobahn dürfen nur Fahrzeuge, die mindestens 80 km/h fahren können und dürfen.", ar: "لا يُسمح بدخول الأوتوستراد إلا للمركبات التي تستطيع ويُسمح لها بالسير بـ 80 كم/س على الأقل." },
    { de: "Für Autobahn und Autostrasse brauchst du die Vignette – auch für Motorräder und leichte Fahrzeuge.", ar: "للأوتوستراد والطريق السيار تحتاج إلى الملصق (Vignette) — حتى للدراجات النارية والمركبات الخفيفة." },
    { de: "Auf dem Einspurstreifen beschleunigst und fügst du dich ein. Du hast keinen Vortritt.", ar: "على مسرب التسارع تزيد سرعتك وتندمج. ليست لك الأولوية." },
    { de: "Nach dem Überholen wieder rechts einordnen. Dauerndes Linksfahren ist verboten.", ar: "بعد التجاوز عُد إلى اليمين. البقاء دائماً على اليسار ممنوع." },
    { de: "Bei Stau: Rettungsgasse zwischen der äussersten linken Spur und der Spur daneben – sobald der Verkehr stockt, nicht erst wenn ein Einsatzfahrzeug kommt.", ar: "عند الازدحام: ممر إنقاذ بين المسرب الأيسر الأقصى والمسرب المجاور له — بمجرد تباطؤ السير، لا عند وصول مركبة الطوارئ فقط." },
    { de: "Vor einem Stauende: kurz das Warnblinklicht einschalten.", ar: "قبل نهاية الازدحام: شغّل أضواء التحذير لفترة قصيرة." },
    { de: "Pannenstreifen nur für Pannen und Notfälle. Anhalten ohne Grund, Wenden, Rückwärtsfahren verboten.", ar: "شريط الأعطال للأعطال والطوارئ فقط. الوقوف بلا سبب والاستدارة والرجوع للخلف ممنوعة." },
    { de: "Bei einer Panne: Warnblinker, Weste, Pannendreieck mindestens 100 m dahinter, hinter die Leitplanke gehen.", ar: "عند العطل: أضواء التحذير، السترة، المثلث على بُعد 100 متر خلفاً على الأقل، والوقوف خلف الحاجز." },
    { de: "Auf der Autobahn ist Wenden und Rückwärtsfahren, auch auf der Ausfahrt, streng verboten.", ar: "على الأوتوستراد ممنوع منعاً باتاً الاستدارة والرجوع للخلف، حتى في المخرج." },
    { de: "In Tunneln: grösseren Abstand halten, Radio auf die angegebene Frequenz, bei Stau Warnblinker und Fahrzeug nicht verlassen ausser bei Feuer.", ar: "في الأنفاق: حافظ على مسافة أكبر، اضبط الراديو على التردد المحدد، وعند الازدحام شغّل أضواء التحذير ولا تغادر المركبة إلا عند الحريق." }
  ]},
  { id: "mensch", de: "Der Mensch am Steuer", ar: "الإنسان خلف المقود", icon: "☺", points: [
    { de: "Allgemeine Alkoholgrenze: 0,5 Promille im Blut (0,25 mg/l Atemluft).", ar: "الحد العام للكحول: 0.5 بالألف في الدم (0.25 ملغ/ل في هواء الزفير)." },
    { de: "Ab 0,8 Promille gilt es als qualifizierte Widerhandlung mit schweren Folgen.", ar: "ابتداءً من 0.8 بالألف تُعتبر مخالفة مشدَّدة ذات عواقب خطيرة." },
    { de: "Nulltoleranz (0,0) für Neulenker auf Probe, Fahrschüler, Begleitpersonen und Berufsfahrer.", ar: "صفر تسامح للسائقين الجدد بالرخصة التجريبية والمتدربين والمرافقين والسائقين المحترفين." },
    { de: "Der Körper baut Alkohol mit rund 0,1 Promille pro Stunde ab. Kaffee oder Sport beschleunigen das nicht. Auch am Morgen nach einer durchzechten Nacht kann noch Restalkohol im Blut sein.", ar: "يتخلص الجسم من الكحول بنحو 0.1 بالألف في الساعة. القهوة أو الرياضة لا تسرّع ذلك. حتى في الصباح بعد ليلة شرب قد يبقى الكحول في الدم." },
    { de: "Für Drogen wie Cannabis, Kokain oder Heroin gilt am Steuer Nulltoleranz, unabhängig von der Menge.", ar: "المخدرات مثل الحشيش والكوكايين والهيروين: صفر تسامح أثناء القيادة، بغضّ النظر عن الكمية." },
    { de: "Medikamente können müde machen. Beipackzettel lesen, Arzt oder Apotheker fragen – auch bei rezeptfreien Mitteln.", ar: "بعض الأدوية تسبب النعاس. اقرأ النشرة واسأل الطبيب أو الصيدلي — حتى مع الأدوية بلا وصفة." },
    { de: "Müdigkeit wirkt wie Alkohol. Einziges Mittel: eine Pause mit 15 bis 20 Minuten Schlaf.", ar: "التعب يؤثر كالكحول. العلاج الوحيد: استراحة مع نوم قصير من 15 إلى 20 دقيقة." },
    { de: "Sekundenschlaf bei 100 km/h: In 2 Sekunden fährst du rund 55 m blind.", ar: "غفوة الثانية عند 100 كم/س: خلال ثانيتين تقطع نحو 55 متراً وأنت لا ترى." },
    { de: "Plane alle 2 Stunden eine Pause. Stress und Zeitdruck erhöhen das Unfallrisiko.", ar: "خطّط لاستراحة كل ساعتين. التوتر وضغط الوقت يزيدان خطر الحوادث." },
    { de: "Ablenkung durch Handy, Navigationsgerät oder Mitfahrer verlangsamt die Reaktionszeit deutlich. Ziel vor der Fahrt eingeben.", ar: "الانشغال بالهاتف أو جهاز الملاحة أو الركاب يُبطئ رد الفعل بشكل كبير. أدخل الوجهة قبل الانطلاق." }
  ]},
  { id: "fahrzeug", de: "Fahrzeug und Technik", ar: "المركبة والتقنية", icon: "⚙", points: [
    { de: "Gesetzliche Mindestprofiltiefe: 1,6 mm. Empfohlen: 3 mm im Sommer, 4 mm im Winter.", ar: "الحد الأدنى القانوني لعمق النقش: 1.6 مم. يُنصح بـ 3 مم صيفاً و4 مم شتاءً." },
    { de: "Winterreifen sind nicht Pflicht. Bei einem Unfall mit Sommerreifen im Schnee haftest du aber mit. Sommer- und Winterreifen dürfen nicht an derselben Achse gemischt werden.", ar: "الإطارات الشتوية ليست إلزامية. لكن عند حادث بإطارات صيفية على الثلج تتحمّل جزءاً من المسؤولية. لا يجوز خلط الإطارات الصيفية والشتوية على نفس المحور." },
    { de: "Zu tiefer Reifendruck erhöht Verbrauch, Abnutzung und Bremsweg.", ar: "انخفاض ضغط الإطارات يزيد الاستهلاك والتآكل ومسافة الكبح." },
    { de: "Tagfahrlicht ist seit 2014 für alle Motorfahrzeuge obligatorisch, auch tagsüber bei guter Sicht.", ar: "أضواء النهار إلزامية لجميع المركبات الآلية منذ 2014، حتى نهاراً عند الرؤية الجيدة." },
    { de: "Fernlicht ausserorts nutzen, abblenden bei Gegenverkehr, hinter einem Fahrzeug und in beleuchteten Ortschaften.", ar: "استعمل الضوء العالي خارج المدن، اخفضه عند السير المقابل وخلف مركبة أخرى وفي المناطق المضاءة." },
    { de: "Nebellicht nur bei Nebel, Regen oder Schnee. Nebelschlusslicht erst unter 50 m Sicht.", ar: "أضواء الضباب فقط في الضباب أو المطر أو الثلج. ضوء الضباب الخلفي فقط تحت 50 متراً رؤية." },
    { de: "Ladung muss gesichert sein, zum Beispiel mit Spanngurten. Ein loser Gegenstand wird bei einem Aufprall zum Geschoss.", ar: "يجب تثبيت الحمولة، مثلاً بأحزمة شد. أي غرض غير مثبّت يتحوّل إلى قذيفة عند الاصطدام." },
    { de: "ABS verhindert das Blockieren der Räder, damit du lenkbar bleibst. Es macht den Bremsweg nicht automatisch kürzer.", ar: "نظام ABS يمنع انغلاق العجلات لتبقى قادراً على التوجيه. لكنه لا يقصّر مسافة الكبح تلقائياً." },
    { de: "ESP hilft gegen Schleudern, hebt aber die Gesetze der Physik nicht auf.", ar: "نظام ESP يساعد ضد الانزلاق الجانبي، لكنه لا يلغي قوانين الفيزياء." },
    { de: "Warnleuchten am Armaturenbrett zeigen Störungen an – ignoriere sie nie, vor allem rote.", ar: "أضواء التحذير في لوحة القيادة تُشير إلى أعطال — لا تتجاهلها أبداً، خاصة الحمراء." },
    { de: "Kinder unter 12 Jahren und kleiner als 150 cm brauchen einen geprüften Kindersitz. Vorne nur, wenn der Airbag deaktiviert ist.", ar: "الأطفال دون 12 سنة وطولهم أقل من 150 سم يحتاجون مقعد أطفال معتمداً. في المقعد الأمامي فقط إذا كانت الوسادة الهوائية معطّلة." },
    { de: "Wenn ein Signal Schneeketten vorschreibt, müssen sie vor der Weiterfahrt montiert werden, meist an den Antriebsrädern.", ar: "إذا فرضت إشارة استعمال سلاسل الثلج، يجب تركيبها قبل متابعة السير، عادة على عجلات الدفع." }
  ]},
  { id: "umwelt", de: "Umwelt und sparsam fahren", ar: "البيئة والقيادة الاقتصادية", icon: "❋", points: [
    { de: "Früh hochschalten, bei etwa 2000 Umdrehungen. Im höchsten möglichen Gang fahren spart Treibstoff.", ar: "بدّل إلى غيار أعلى مبكراً، عند نحو 2000 دورة. القيادة بأعلى غيار ممكن توفّر الوقود." },
    { de: "Motor abstellen, wenn du länger als etwa 20 Sekunden stehst.", ar: "أطفئ المحرك إذا توقفت أكثر من نحو 20 ثانية." },
    { de: "Der Motor braucht beim Kaltstart am meisten Treibstoff. Sofort losfahren statt warmlaufen lassen.", ar: "يستهلك المحرك أكثر ما يستهلك عند التشغيل البارد. انطلق فوراً بدل تركه يسخن واقفاً." },
    { de: "Dachträger, Dachbox und offene Fenster erhöhen Luftwiderstand und Verbrauch.", ar: "حمالة السقف والصندوق العلوي والنوافذ المفتوحة تزيد مقاومة الهواء والاستهلاك." },
    { de: "Vorausschauend fahren, rollen lassen statt bremsen: spart Treibstoff, Bremsen und Nerven.", ar: "القيادة الاستباقية والانسياب بدل الكبح: توفّر الوقود والفرامل والأعصاب." },
    { de: "Richtiger Reifendruck senkt den Rollwiderstand und damit Verbrauch und CO2-Ausstoss.", ar: "ضغط الإطارات الصحيح يخفّض مقاومة التدحرج وبالتالي الاستهلاك وانبعاثات ثاني أكسيد الكربون." },
    { de: "Elektro- und Hybridfahrzeuge sind sehr leise. Besondere Vorsicht gegenüber Fussgängern, die sie nicht hören.", ar: "المركبات الكهربائية والهجينة هادئة جداً. توخَّ حذراً خاصاً مع المشاة الذين لا يسمعونها." }
  ]},
  { id: "notfall", de: "Unfall und Nothilfe", ar: "الحوادث والإسعاف", icon: "✚", points: [
    { de: "Reihenfolge am Unfallort: 1. Sichern, 2. Nothilfe leisten, 3. Alarmieren.", ar: "الترتيب في مكان الحادث: 1. التأمين، 2. الإسعاف، 3. الاتصال بالطوارئ." },
    { de: "Sichern: Warnblinker, Weste, Pannendreieck – ausserorts mindestens 50 m, Autobahn 100 m.", ar: "التأمين: أضواء التحذير، السترة، المثلث — خارج المدن 50 متراً على الأقل، وعلى الأوتوستراد 100 متر." },
    { de: "Notrufnummern: 144 Sanität, 117 Polizei, 118 Feuerwehr, 1414 Rega, 112 europäischer Notruf.", ar: "أرقام الطوارئ: 144 الإسعاف، 117 الشرطة، 118 الإطفاء، 1414 ريغا، 112 الرقم الأوروبي." },
    { de: "Einen Verletzten nur bei unmittelbarer Gefahr bewegen, zum Beispiel bei Feuer.", ar: "لا تحرّك المصاب إلا عند خطر مباشر، مثل الحريق." },
    { de: "Bewusstlose Person, die atmet: stabile Seitenlage, Atmung überwachen. Nie etwas zu trinken geben.", ar: "الشخص الفاقد للوعي الذي يتنفس: وضعية الأمان الجانبية، ومراقبة تنفسه. لا تُعطِه أي شيء ليشربه أبداً." },
    { de: "Bei Verletzten muss immer die Polizei aufgeboten werden.", ar: "عند وجود إصابات يجب استدعاء الشرطة دائماً." },
    { de: "Bei reinem Sachschaden: Geschädigten sofort benachrichtigen, sonst unverzüglich die Polizei. Eine Notiz allein befreit dich nicht von der Meldepflicht.", ar: "عند أضرار مادية فقط: أخطر المتضرر فوراً، وإلا أبلغ الشرطة دون تأخير. الورقة وحدها لا تُعفيك من واجب الإبلاغ." },
    { de: "Wegfahren nach einem Unfall ist Fahrerflucht – eine Straftat.", ar: "المغادرة بعد الحادث تُعد جريمة الهروب من مكان الحادث." },
    { de: "Warnweste, Pannendreieck und Verbandskasten sollten griffbereit im Fahrzeug mitgeführt werden.", ar: "يُستحسن حمل السترة العاكسة ومثلث التحذير وحقيبة الإسعافات في مكان يسهل الوصول إليه بالمركبة." }
  ]},
  { id: "ausweis", de: "Ausweise und Verfahren (Schweiz)", ar: "الرخص والإجراءات (سويسرا)", icon: "▤", points: [
    { de: "Weg zum Ausweis: Sehtest, Nothelferkurs, Gesuch bei der MFK, Theorieprüfung, Lernfahrausweis, VKU, praktische Prüfung.", ar: "الطريق إلى الرخصة: فحص النظر، دورة الإسعافات الأولية، الطلب لدى مصلحة المركبات، النظري، رخصة التعلّم، VKU، ثم العملي." },
    { de: "Der Nothelferkurs dauert 10 Stunden und ist 6 Jahre gültig. Der Sehtest ist 24 Monate gültig.", ar: "دورة الإسعافات الأولية 10 ساعات وصالحة 6 سنوات. فحص النظر صالح 24 شهراً." },
    { de: "Theorieprüfung: 50 Fragen in 45 Minuten. Ab mehr als 15 Fehlerpunkten nicht bestanden.", ar: "امتحان النظري: 50 سؤالاً في 45 دقيقة. راسب إذا تجاوز 15 نقطة خطأ." },
    { de: "Im Kanton Solothurn: Theorieprüfung auf Deutsch, Französisch, Italienisch oder Englisch. Englisch nur für die Basistheorie Kategorie B.", ar: "في زولوتورن: الامتحان بالألمانية أو الفرنسية أو الإيطالية أو الإنجليزية. الإنجليزية للنظري الأساسي فئة B فقط." },
    { de: "Lernfahrausweis Kategorie B: 24 Monate gültig. Ab 17 Jahren möglich, praktische Prüfung ab 18.", ar: "رخصة التعلّم فئة B: صالحة 24 شهراً. تُمنح من 17 سنة، والعملي من 18 سنة." },
    { de: "Unter 20-Jährige brauchen mindestens 12 Monate Lernfahrausweis vor der praktischen Prüfung.", ar: "دون 20 سنة يجب حمل رخصة التعلّم 12 شهراً على الأقل قبل العملي." },
    { de: "Der VKU dauert 8 Lektionen und ist erst mit Lernfahrausweis möglich.", ar: "دورة VKU مدتها 8 حصص ولا تُحضَر إلا بعد رخصة التعلّم." },
    { de: "Begleitperson: mindestens 23 Jahre alt, seit mindestens 3 Jahren unbefristeter Führerausweis.", ar: "المرافق: 23 سنة على الأقل، وحائز رخصة نهائية منذ 3 سنوات على الأقل." },
    { de: "Am Lernfahrzeug muss die blaue L-Tafel hinten gut sichtbar angebracht sein.", ar: "يجب أن تكون لوحة L الزرقاء ظاهرة بوضوح خلف مركبة التدريب." },
    { de: "Führerausweis auf Probe: 3 Jahre, mit Pflicht zum WAB-Weiterbildungstag. Ohne schwere Widerhandlung wird er danach automatisch unbefristet.", ar: "الرخصة التجريبية: 3 سنوات، مع إلزامية يوم التكوين WAB. بلا مخالفة خطيرة تصبح نهائية تلقائياً بعدها." },
    { de: "Schwere Widerhandlung in der Probezeit: Entzug und 1 Jahr Verlängerung. Zweites Mal: Annullierung, erst nach einer Wartefrist ist ein neues Gesuch möglich.", ar: "مخالفة خطيرة في فترة التجربة: سحب وتمديد سنة. المرة الثانية: إلغاء، ولا يمكن تقديم طلب جديد إلا بعد فترة انتظار." },
    { de: "Fahrzeugausweis und Führerausweis müssen beim Fahren mitgeführt werden können.", ar: "يجب أن يكون بالإمكان حمل بطاقة المركبة ورخصة القيادة أثناء السير." }
  ]},
  { id: "verkehrsteilnehmer", de: "Andere Verkehrsteilnehmer", ar: "مستخدمو الطريق الآخرون", icon: "☷", points: [
    { de: "Lastwagen und Busse haben grosse tote Winkel. Bleib nicht direkt neben oder hinter ihnen stehen.", ar: "للشاحنات والحافلات نقاط عمياء واسعة. لا تقف مباشرة بجانبها أو خلفها." },
    { de: "Motorräder sind schwer einzuschätzen. Prüfe Abstand und Geschwindigkeit doppelt, bevor du abbiegst oder einbiegst.", ar: "يصعب تقدير مسافة وسرعة الدراجات النارية. تحقّق مرتين قبل الانعطاف أو الدخول." },
    { de: "Fussgänger mit weissem oder gelbem Stock haben ein erhöhtes Vortrittsrecht auch ausserhalb des Streifens.", ar: "للمشاة الذين يحملون عصا بيضاء أو صفراء أولوية معززة حتى خارج ممر المشاة." },
    { de: "Kinder verhalten sich unvorhersehbar. Bei Kindern am Strassenrand: Tempo reduzieren, bremsbereit sein.", ar: "تصرفات الأطفال غير متوقعة. عند وجودهم على حافة الطريق: خفّض السرعة وكن مستعداً للكبح." },
    { de: "Landwirtschaftliche Fahrzeuge sind oft langsam und breit. Erst überholen, wenn die Sicht wirklich frei ist.", ar: "المركبات الزراعية غالباً بطيئة وعريضة. تجاوزها فقط عندما تكون الرؤية خالية تماماً." },
    { de: "Bei Tieren auf der Strasse: Tempo reduzieren, nicht abrupt ausweichen, um einen Selbstunfall zu vermeiden.", ar: "عند وجود حيوانات على الطريق: خفّض السرعة، ولا تنعطف فجأة لتفادي حادث ذاتي." },
    { de: "Rollstuhlfahrer und Personen mit Rollator gelten als Fussgänger und haben die gleichen Rechte.", ar: "مستخدمو الكرسي المتحرك والمشاية يُعتبرون من المشاة ولهم الحقوق نفسها." },
    { de: "E-Bikes bis 25 km/h gelten als Fahrräder. Schnelle E-Bikes über 25 km/h brauchen ein gelbes Kontrollschild und gelten als Motorfahrräder.", ar: "الدراجات الكهربائية حتى 25 كم/س تُعتبر دراجات عادية. الأسرع من ذلك تحتاج لوحة صفراء وتُعتبر دراجات نارية صغيرة." },
    { de: "E-Trottinetts gelten rechtlich als Motorfahrräder und benutzen wo vorhanden den Radweg.", ar: "السكوترات الكهربائية تُعتبر قانونياً دراجات نارية صغيرة وتستخدم مسار الدراجات حيثما وُجد." }
  ]},
  { id: "bahnuebergang", de: "Bahnübergänge", ar: "معابر السكة الحديدية", icon: "⚏", points: [
    { de: "Ein Andreaskreuz kündigt einen Bahnübergang an. Immer mit einem Zug rechnen.", ar: "الصليب على شكل حرف X (Andreaskreuz) يُنذر بمعبر سكة حديد. توقّع دائماً وصول قطار." },
    { de: "Züge haben an Bahnübergängen immer Vortritt, unabhängig von anderen Regeln.", ar: "للقطارات الأولوية دائماً عند معابر السكة، بصرف النظر عن أي قواعد أخرى." },
    { de: "Bei blinkendem oder brennendem rotem Licht und bei sich schliessender oder geschlossener Schranke: anhalten.", ar: "عند وميض أو ثبات الضوء الأحمر أو إغلاق الحاجز أو انغلاقه: توقّف." },
    { de: "Bahnübergänge ohne Schranke sind mit dem Gefahrensignal markiert. Tempo reduzieren, nach beiden Seiten schauen.", ar: "معابر السكة بلا حاجز تُشار بإشارة الخطر. خفّض السرعة وانظر إلى الجهتين." },
    { de: "Nie auf den Bahnübergang fahren, wenn dahinter nicht genug Platz für dein Fahrzeug ist.", ar: "لا تدخل معبر السكة إذا لم يكن هناك مكان كافٍ لمركبتك خلفه." },
    { de: "Überholverbot bei unbeschrankten Bahnübergängen. Auch Halten und Parkieren sind dort verboten.", ar: "ممنوع التجاوز عند معابر السكة بلا حاجز. كما يُمنع الوقوف والركن هناك." },
    { de: "Bleibt das Fahrzeug auf den Schienen stehen: alle sofort aussteigen, sich entfernen, dann alarmieren.", ar: "إذا توقفت المركبة على القضبان: انزل الجميع فوراً وابتعدوا، ثم اتصلوا بالطوارئ." },
    { de: "An Tramgeleisen ohne eigene Signalanlage gilt der Rechtsvortritt wie bei einer normalen Kreuzung, das Tram selbst hat aber immer Vortritt.", ar: "عند قضبان الترام بلا إشارة خاصة تنطبق أولوية اليمين كما في أي تقاطع عادي، لكن للترام نفسه الأولوية دائماً." },
    { de: "Bei zwei Gleisen: nach der Durchfahrt des ersten Zuges nicht sofort losfahren, ein zweiter Zug kann aus der Gegenrichtung kommen.", ar: "عند وجود مسارين: لا تنطلق فوراً بعد مرور القطار الأول، فقد يأتي قطار ثانٍ من الاتجاه المعاكس." }
  ]},
  { id: "parken_halten", de: "Parkieren und Halten", ar: "الركن والوقوف", icon: "P", points: [
    { de: "Halten ist ein kurzer Stopp, du bleibst am Steuer oder in der Nähe. Parkieren dauert länger, das Fahrzeug bleibt unbeaufsichtigt.", ar: "الوقوف توقف قصير تبقى فيه قرب المقود. الركن أطول مدة، وتُترك فيه المركبة بلا مراقبة." },
    { de: "Parkscheibe in der blauen Zone: bei Ankunft einstellen, erlaubte Dauer meist 1 Stunde, danach umziehen.", ar: "قرص الوقوف في المنطقة الزرقاء: يُضبط عند الوصول، والمدة المسموحة عادة ساعة واحدة ثم يجب الانتقال." },
    { de: "Auf dem Trottoir darfst du nur parkieren, wenn ein Signal oder eine Markierung es ausdrücklich erlaubt.", ar: "لا يجوز الركن على الرصيف إلا إذا سمحت به إشارة أو علامة صراحة." },
    { de: "Parkieren in zweiter Reihe ist verboten, auch für kurzes Ein- und Ausladen mit Warnblinker.", ar: "الركن في الصف الثاني ممنوع، حتى لأجل تحميل أو تفريغ سريع مع تشغيل أضواء التحذير." },
    { de: "Vor privaten Ein- und Ausfahrten darfst du nicht parkieren, auch wenn kein Signal steht.", ar: "لا يجوز الركن أمام مداخل ومخارج خاصة، حتى بلا وجود إشارة." },
    { de: "Nachts ohne Beleuchtung parkieren ist nur erlaubt, wenn die Strasse ausreichend beleuchtet ist und das Fahrzeug gut sichtbar bleibt.", ar: "الركن ليلاً بلا إضاءة مسموح فقط إذا كان الطريق مضاء بشكل كافٍ وبقيت المركبة واضحة الرؤية." },
    { de: "Behindertenparkplätze dürfen nur mit gültigem Ausweis benutzt werden, unabhängig von der Parkdauer.", ar: "مواقف ذوي الإعاقة تُستخدم فقط ببطاقة سارية المفعول، بصرف النظر عن مدة الركن." },
    { de: "Vor Feuerwehrzufahrten und Hydranten darf weder gehalten noch parkiert werden.", ar: "لا يجوز الوقوف ولا الركن أمام مداخل الإطفاء أو صنابير الحريق." },
    { de: "Distanz von mindestens 5 m zu Kreuzungen und Fussgängerstreifen einhalten, wenn kein Signal etwas anderes vorschreibt.", ar: "احترم مسافة 5 أمتار على الأقل عن التقاطعات وممرات المشاة، ما لم تنص إشارة على خلاف ذلك." }
  ]},
  { id: "ladung_transport", de: "Ladung und Transport", ar: "الحمولة والنقل", icon: "▣", points: [
    { de: "Die Ladung darf die Sicht nach vorne, zur Seite und in die Spiegel nicht beeinträchtigen.", ar: "يجب ألا تعيق الحمولة الرؤية إلى الأمام والجانبين والمرايا." },
    { de: "Ladung, die über das Fahrzeug hinausragt, muss ab einer gewissen Länge markiert und nachts beleuchtet werden.", ar: "الحمولة التي تتجاوز حدود المركبة يجب تمييزها وإضاءتها ليلاً ابتداءً من طول معين." },
    { de: "Ladung muss mit Gurten, Netzen oder Keilen gegen Verrutschen gesichert werden – Verantwortung des Fahrers.", ar: "يجب تثبيت الحمولة بأحزمة أو شباك أو إسفينات لمنع انزلاقها — والمسؤولية تقع على السائق." },
    { de: "Die Anzahl beförderter Personen darf die im Fahrzeugausweis erlaubte Anzahl Plätze nicht überschreiten.", ar: "يجب ألا يتجاوز عدد الركاب المنقولين عدد المقاعد المسموح به في بطاقة المركبة." },
    { de: "Ein Personenwagen der Kategorie B darf einen ungebremsten Anhänger bis 750 kg ziehen; mit gebremstem Anhänger gilt das kombinierte Gesamtgewicht.", ar: "يمكن لسيارة فئة B جرّ مقطورة بلا فرامل حتى 750 كغ؛ ومع مقطورة بفرامل يُراعى الوزن الإجمالي المشترك." },
    { de: "Tiere im Fahrzeug müssen so gesichert sein, dass sie den Fahrer nicht behindern, zum Beispiel mit Gurt oder Box.", ar: "يجب تثبيت الحيوانات داخل المركبة بحيث لا تعيق السائق، مثلاً بحزام أو صندوق مخصص." },
    { de: "Ein Kind darf vorne nur mitfahren, wenn der Airbag deaktiviert ist oder der Sitz rückwärtsgerichtet ohne Airbag-Gefahr montiert ist.", ar: "لا يجلس الطفل في المقعد الأمامي إلا إذا كانت الوسادة الهوائية معطّلة أو كان المقعد مثبتاً بشكل آمن دونها." },
    { de: "Überladung eines Fahrzeugs verschlechtert Bremsweg und Fahrstabilität und wird gebüsst.", ar: "زيادة حمولة المركبة عن الحد تُسيء إلى مسافة الكبح واستقرار القيادة وتُعرّض لغرامة." }
  ]}
];

const GLOSSAR = [
  ["Vortritt","حق الأولوية"],["Vortritt gewähren","منح الأولوية"],["Rechtsvortritt","أولوية القادم من اليمين"],
  ["Verzweigung","تقاطع طرق"],["Kreisel / Kreisverkehr","الدوّار"],["Fussgängerstreifen","ممر المشاة"],
  ["Fussgänger","المشاة"],["Radfahrer","راكب الدراجة"],["Fahrbahn","سطح الطريق"],["Spur / Fahrstreifen","المسرب"],
  ["Einspurstrecke","منطقة اصطفاف المسارب قبل التقاطع"],["Gegenverkehr","السير في الاتجاه المعاكس"],
  ["Überholen","التجاوز"],["Vorbeifahren","المرور بجانب"],["Abbiegen","الانعطاف"],["Einbiegen","الدخول إلى طريق"],
  ["Wenden","الاستدارة"],["Rückwärtsfahren","الرجوع إلى الخلف"],["Blinker / Richtungsblinker","الغماز / إشارة الاتجاه"],
  ["Schulterblick","النظرة فوق الكتف"],["Rückspiegel","المرآة الخلفية"],["Toter Winkel","النقطة العمياء"],
  ["Anhalteweg","مسافة التوقف الكلية"],["Reaktionsweg","مسافة رد الفعل"],["Bremsweg","مسافة الكبح"],
  ["Vollbremsung","كبح طارئ كامل"],["Abstand","المسافة الفاصلة"],["Innerorts","داخل المنطقة المبنية"],
  ["Ausserorts","خارج المنطقة المبنية"],["Autobahn","الأوتوستراد"],["Autostrasse","طريق سيار"],
  ["Pannenstreifen","شريط الأعطال"],["Rettungsgasse","ممر الإنقاذ"],["Stau","ازدحام مروري"],
  ["Kolonne","طابور مركبات"],["Vignette","ملصق رسم الطرق السريعة"],["Pannendreieck","مثلث التحذير"],
  ["Warnblinklicht","أضواء التحذير الوامضة"],["Abblendlicht","الضوء المنخفض"],["Fernlicht","الضوء العالي"],
  ["Tagfahrlicht","أضواء النهار"],["Nebelschlusslicht","ضوء الضباب الخلفي"],["Sicherheitsgurt","حزام الأمان"],
  ["Ladung","الحمولة"],["Anhänger","المقطورة"],["Reifenprofil","نقش الإطار"],["Reifendruck","ضغط الإطارات"],
  ["Führerausweis","رخصة القيادة"],["Lernfahrausweis","رخصة التعلّم"],["Fahrzeugausweis","بطاقة المركبة"],
  ["Führerausweis auf Probe","رخصة القيادة التجريبية"],["Probezeit","فترة التجربة"],["Begleitperson","الشخص المرافق"],
  ["Nothelferkurs","دورة الإسعافات الأولية"],["VKU (Verkehrskundeunterricht)","درس التوعية المرورية"],
  ["Ausweisentzug","سحب الرخصة"],["Busse","غرامة مالية"],["Widerhandlung","مخالفة"],["Haftung","المسؤولية القانونية"],
  ["Gefahrensignal","إشارة خطر"],["Vorschriftssignal","إشارة أمر أو منع"],["Hinweissignal","إشارة إرشادية"],
  ["Sicherheitslinie","خط الأمان المتصل"],["Leitlinie","الخط المتقطع"],["Bahnübergang","مزلقان السكة الحديدية"],
  ["Andreaskreuz","صليب أندرياس (إشارة السكة)"],["Schranke","الحاجز"],["Baustelle","ورشة أشغال"],
  ["Glatteis","جليد أملس على الطريق"],["Aquaplaning","الانزلاق المائي"],["Sekundenschlaf","غفوة قصيرة مفاجئة"],
  ["Promille","بالألف (نسبة الكحول)"],["Sanität","الإسعاف"],["Seitenlage","وضعية الأمان الجانبية"],
  ["Tram / Strassenbahn","الترام"],["Traktor","الجرار الزراعي"],["Lastwagen (LKW)","الشاحنة"],
  ["Motorrad","الدراجة النارية"],["E-Bike","الدراجة الكهربائية"],["Rollstuhl","الكرسي المتحرك"],
  ["Kontrollschild","لوحة الترخيص"],["Verkehrsregelung","تنظيم المرور"],["Wildwechsel","ممر عبور الحيوانات البرية"],
  ["Parkscheibe","قرص الوقوف"],["Blaue Zone","المنطقة الزرقاء"],["Halteverbot","ممنوع الوقوف"],["Parkverbot","ممنوع الركن"],
  ["Zweite Reihe","الصف الثاني"],["Trottoir","الرصيف"],["Werkausfahrt","مخرج مصنع"],["Hindernisregel","قاعدة العائق"],
  ["Spurwechsel","تغيير المسرب"],["Reissverschlussprinzip","مبدأ التبادل عند اندماج المسارب"],["Schneeketten","سلاسل الثلج"],
  ["Kindersitz","مقعد الأطفال"],["Airbag","الوسادة الهوائية"],["Ladungssicherung","تثبيت الحمولة"],["Übergewicht","الوزن الزائد"],
  ["Gesamtgewicht","الوزن الإجمالي"],["E-Trottinett","السكوتر الكهربائي"],["Schulweg","طريق المدرسة"],["Nothaltebucht","موقف الطوارئ في النفق"],
  ["Rega","خدمة الإنقاذ الجوي ريغا"],["Ersthelfer","المسعف الأول"],["Restalkohol","الكحول المتبقي في الدم"],["Ablenkung","تشتت الانتباه"],
  ["Verbandskasten","حقيبة الإسعافات الأولية"],["Reaktionszeit","زمن رد الفعل"],["Kontrollperiode / MFK","فحص المركبات الدوري"]
];

/* ---------- Schilderkatalog: Kategorien + Einträge, Bilder aus scenes.js (SIGN_ICON) ---------- */
const SIGN_CATS = [
  { id:"gefahr", de:"Gefahrensignale", ar:"إشارات الخطر" },
  { id:"verbot", de:"Vorschriftssignale – Verbote", ar:"إشارات المنع" },
  { id:"gebot", de:"Vorschriftssignale – Gebote", ar:"إشارات الإلزام" },
  { id:"vortritt", de:"Vortrittssignale", ar:"إشارات الأولوية" },
  { id:"hinweis", de:"Hinweissignale", ar:"الإشارات الإرشادية" }
];

const SIGNS = [
  { cat:"gefahr", icon:"curve_r", de:"Kurve (rechts)", ar:"منعطف إلى اليمين", note:{de:"Geschwindigkeit rechtzeitig reduzieren.", ar:"خفّض السرعة في الوقت المناسب."} },
  { cat:"gefahr", icon:"curve_l", de:"Kurve (links)", ar:"منعطف إلى اليسار", note:{de:"Geschwindigkeit rechtzeitig reduzieren.", ar:"خفّض السرعة في الوقت المناسب."} },
  { cat:"gefahr", icon:"curves", de:"Kurvenreiche Strecke", ar:"طريق متعرج بمنعطفات متتالية", note:{de:"Mehrere Kurven folgen kurz hintereinander.", ar:"تتبع عدة منعطفات متقاربة."} },
  { cat:"gefahr", icon:"children", de:"Kinder", ar:"أطفال", note:{de:"Meist bei Schulen und Spielplätzen. Tempo stark reduzieren.", ar:"غالباً قرب المدارس والملاعب. خفّض السرعة كثيراً."} },
  { cat:"gefahr", icon:"pedestrians", de:"Fussgänger", ar:"مشاة", note:{de:"Erhöhte Aufmerksamkeit für Personen am Fahrbahnrand.", ar:"انتباه إضافي للأشخاص على حافة الطريق."} },
  { cat:"gefahr", icon:"cyclists", de:"Fahrradfahrer", ar:"دراجات هوائية", note:{de:"Mit querenden oder einmündenden Velofahrern rechnen.", ar:"توقّع دراجات عابرة أو داخلة إلى الطريق."} },
  { cat:"gefahr", icon:"slippery", de:"Schleudergefahr", ar:"خطر الانزلاق", note:{de:"Rutschige Fahrbahn, zum Beispiel bei Nässe oder Öl.", ar:"طريق زلق، مثلاً بسبب البلل أو الزيت."} },
  { cat:"gefahr", icon:"bumps", de:"Unebene Fahrbahn", ar:"طريق غير مستوٍ", note:{de:"Bodenwellen oder Schlaglöcher, Tempo anpassen.", ar:"مطبات أو حفر، كيّف السرعة."} },
  { cat:"gefahr", icon:"narrows", de:"Fahrbahnverengung", ar:"تضيّق الطريق", note:{de:"Die Hindernisregel kann hier gelten.", ar:"قد تنطبق هنا قاعدة العائق."} },
  { cat:"gefahr", icon:"rocks", de:"Steinschlag", ar:"خطر سقوط صخور", note:{de:"Typisch in Berggebieten.", ar:"شائعة في المناطق الجبلية."} },
  { cat:"gefahr", icon:"animals", de:"Wildwechsel", ar:"عبور حيوانات برية", note:{de:"Vor allem in der Dämmerung erhöhte Vorsicht.", ar:"حذر إضافي خاصة عند الغسق."} },
  { cat:"gefahr", icon:"lights_ahead", de:"Lichtsignalanlage", ar:"إشارة ضوئية أمامك", note:{de:"Eine Ampel folgt in Kürze.", ar:"إشارة مرور ضوئية تلي عن قريب."} },
  { cat:"gefahr", icon:"works", de:"Baustelle", ar:"أشغال طريق", note:{de:"Tempo reduzieren, auf Arbeiter und Maschinen achten.", ar:"خفّض السرعة وانتبه للعمال والآليات."} },
  { cat:"gefahr", icon:"railway_gate", de:"Bahnübergang mit Schranke", ar:"معبر سكة بحاجز", note:{de:"Bei sich schliessender Schranke unbedingt anhalten.", ar:"عند إغلاق الحاجز يجب التوقف حتماً."} },
  { cat:"gefahr", icon:"railway_open", de:"Bahnübergang ohne Schranke", ar:"معبر سكة بلا حاجز", note:{de:"Selbst nach beiden Seiten schauen, kein Überholen.", ar:"انظر إلى الجهتين بنفسك، ممنوع التجاوز."} },
  { cat:"gefahr", icon:"tunnel_ahead", de:"Tunnel", ar:"نفق", note:{de:"Licht einschalten, Abstand vergrössern.", ar:"شغّل الأضواء وزِد المسافة."} },
  { cat:"gefahr", icon:"wind", de:"Seitenwind", ar:"رياح جانبية", note:{de:"Lenkrad festhalten, besonders bei Brücken und Hochfahrzeugen.", ar:"أمسك المقود جيداً، خاصة عند الجسور والمركبات العالية."} },
  { cat:"gefahr", icon:"queue", de:"Stauwarnung", ar:"تحذير من ازدحام", note:{de:"Tempo frühzeitig reduzieren.", ar:"خفّض السرعة مبكراً."} },

  { cat:"verbot", icon:"no_entry", de:"Einfahrt verboten (alle Fahrzeuge)", ar:"ممنوع الدخول لجميع المركبات", note:{de:"Häufig am falschen Ende einer Einbahnstrasse.", ar:"غالباً عند الطرف الخاطئ لطريق باتجاه واحد."} },
  { cat:"verbot", icon:"no_overtake", de:"Überholen verboten", ar:"ممنوع التجاوز", note:{de:"Gilt bis zum nächsten Aufhebungssignal oder zur nächsten Kreuzung.", ar:"يسري حتى إشارة الإلغاء التالية أو التقاطع التالي."} },
  { cat:"verbot", icon:"speed30", de:"Höchstgeschwindigkeit 30", ar:"الحد الأقصى للسرعة 30", note:{de:"Absolute Obergrenze, keine Ausnahmen bei gutem Wetter.", ar:"حد أقصى مطلق، بلا استثناءات حتى بالطقس الجيد."} },
  { cat:"verbot", icon:"speed50", de:"Höchstgeschwindigkeit 50", ar:"الحد الأقصى للسرعة 50", note:{de:"Die Standardgeschwindigkeit innerorts.", ar:"السرعة المعتادة داخل المدن."} },
  { cat:"verbot", icon:"speed80", de:"Höchstgeschwindigkeit 80", ar:"الحد الأقصى للسرعة 80", note:{de:"Häufig vor Kurven oder Ortschaften ausserorts.", ar:"شائعة قبل المنعطفات أو القرى خارج المدن."} },
  { cat:"verbot", icon:"no_left", de:"Verbot des Abbiegens", ar:"ممنوع الانعطاف", note:{de:"Die durchgestrichene Richtung ist untersagt.", ar:"الاتجاه المشطوب ممنوع السير فيه."} },
  { cat:"verbot", icon:"no_uturn", de:"Wenden verboten", ar:"ممنوع الاستدارة", note:{de:"Häufig vor Kreuzungen mit viel Verkehr.", ar:"شائعة قبل التقاطعات المزدحمة."} },
  { cat:"verbot", icon:"no_parking", de:"Parkieren verboten", ar:"ممنوع الركن", note:{de:"Kurzes Halten bleibt meist erlaubt.", ar:"الوقوف القصير يبقى مسموحاً عادة."} },
  { cat:"verbot", icon:"no_stopping", de:"Halten und Parkieren verboten", ar:"ممنوع الوقوف والركن", note:{de:"Auch ganz kurzes Anhalten ist untersagt.", ar:"حتى التوقف اللحظي ممنوع."} },
  { cat:"verbot", icon:"no_trucks", de:"Verbot für Lastwagen", ar:"ممنوع دخول الشاحنات", note:{de:"Gewichtsgrenze steht oft auf einer Zusatztafel.", ar:"غالباً ما يُذكر حد الوزن على لوحة إضافية."} },
  { cat:"verbot", icon:"no_pedestrians", de:"Verbot für Fussgänger", ar:"ممنوع دخول المشاة", note:{de:"Typisch auf Autobahnen und Autostrassen.", ar:"شائعة على الأوتوستراد والطرق السيارة."} },
  { cat:"verbot", icon:"no_bicycles", de:"Verbot für Fahrräder", ar:"ممنوع دخول الدراجات الهوائية", note:{de:"Velofahrer müssen eine andere Route wählen.", ar:"على راكبي الدراجات اختيار طريق آخر."} },
  { cat:"verbot", icon:"height_limit", de:"Höchstens 2.5 m Höhe", ar:"الحد الأقصى للارتفاع 2.5 م", note:{de:"Wichtig bei Unterführungen und Parkhäusern.", ar:"مهمة عند الأنفاق السفلية والمرائب المسقوفة."} },
  { cat:"verbot", icon:"weight_limit", de:"Höchstens 3.5 t Gewicht", ar:"الحد الأقصى للوزن 3.5 طن", note:{de:"Häufig auf schwachen Brücken oder in Wohnquartieren.", ar:"شائعة على الجسور الضعيفة أو في الأحياء السكنية."} },

  { cat:"gebot", icon:"ahead_only", de:"Vorgeschriebene Fahrtrichtung geradeaus", ar:"اتجاه إلزامي: مستقيم", note:{de:"Abbiegen ist an dieser Stelle nicht erlaubt.", ar:"الانعطاف غير مسموح في هذا المكان."} },
  { cat:"gebot", icon:"right_only", de:"Vorgeschriebene Fahrtrichtung rechts", ar:"اتجاه إلزامي: يمين", note:{de:"Du musst der Pfeilrichtung folgen.", ar:"يجب اتباع اتجاه السهم."} },
  { cat:"gebot", icon:"roundabout_m", de:"Kreisverkehr, vorgeschriebene Richtung", ar:"دوّار، اتجاه إلزامي", note:{de:"Kündigt einen Kreisel an, im Uhrzeigersinn entgegengesetzt umfahren.", ar:"ينذر بدوّار، يُسار حوله عكس اتجاه عقارب الساعة."} },
  { cat:"gebot", icon:"bike_path", de:"Radweg", ar:"مسار دراجات إلزامي", note:{de:"Velofahrer müssen diesen Weg benutzen, wenn vorhanden.", ar:"يجب على راكبي الدراجات استخدام هذا المسار عند وجوده."} },
  { cat:"gebot", icon:"ped_path", de:"Fussweg", ar:"مسار مشاة إلزامي", note:{de:"Für Fahrzeuge in der Regel nicht befahrbar.", ar:"غير مخصص عادة لسير المركبات."} },
  { cat:"gebot", icon:"min_speed", de:"Mindestgeschwindigkeit", ar:"السرعة الدنيا الإلزامية", note:{de:"Langsamer als angegeben darfst du nicht fahren.", ar:"لا يجوز السير بأبطأ من المحدد."} },
  { cat:"gebot", icon:"chains", de:"Schneekettenpflicht", ar:"سلاسل الثلج إلزامية", note:{de:"Vor der Weiterfahrt montieren, meist an den Antriebsrädern.", ar:"تُركّب قبل متابعة السير، عادة على عجلات الدفع."} },

  { cat:"vortritt", icon:"priority_road", de:"Hauptstrasse", ar:"طريق رئيسي", note:{de:"Du hast Vortritt gegenüber allen Nebenstrassen.", ar:"لك الأولوية على كل الطرق الفرعية."} },
  { cat:"vortritt", icon:"give_way", de:"Kein Vortritt", ar:"لا أولوية — أفسح الطريق", note:{de:"Anhalten nicht zwingend, aber Vortritt gewähren.", ar:"التوقف غير إلزامي لكن يجب منح الأولوية."} },
  { cat:"vortritt", icon:"stop", de:"Halt – Vortritt gewähren", ar:"قف — امنح الأولوية", note:{de:"Immer vollständig anhalten, auch bei freier Strasse.", ar:"التوقف التام دائماً، حتى لو كان الطريق خالياً."} },
  { cat:"vortritt", icon:"priority_end", de:"Ende der Hauptstrasse", ar:"نهاية الطريق الرئيسي", note:{de:"Ab hier gilt wieder der Rechtsvortritt.", ar:"من هنا تعود أولوية اليمين للسريان."} },

  { cat:"hinweis", icon:"one_way", de:"Einbahnstrasse", ar:"طريق باتجاه واحد", note:{de:"Nur in Pfeilrichtung befahrbar.", ar:"يُسار فيه باتجاه السهم فقط."} },
  { cat:"hinweis", icon:"dead_end_i", de:"Sackgasse", ar:"طريق مسدود", note:{de:"Die Strasse endet ohne Durchfahrt.", ar:"ينتهي الطريق بلا منفذ."} },
  { cat:"hinweis", icon:"parking_i", de:"Parkplatz", ar:"موقف سيارات", note:{de:"Zeigt einen offiziellen Parkbereich an.", ar:"يُشير إلى منطقة ركن رسمية."} },
  { cat:"hinweis", icon:"hospital_i", de:"Spital", ar:"مستشفى", note:{de:"In der Nähe besonders rücksichtsvoll fahren.", ar:"قُد بحذر إضافي بالقرب منه."} },
  { cat:"hinweis", icon:"motorway_i", de:"Autobahn", ar:"أوتوستراد", note:{de:"Grünes Signal in der Schweiz, Vignette nötig.", ar:"إشارة خضراء في سويسرا، الملصق ضروري."} },
  { cat:"hinweis", icon:"motorway_end_i", de:"Ende der Autobahn", ar:"نهاية الأوتوستراد", note:{de:"Ab hier gelten wieder die normalen Regeln.", ar:"من هنا تعود القواعد العادية للسريان."} },
  { cat:"hinweis", icon:"fuel_i", de:"Tankstelle", ar:"محطة وقود", note:{de:"Weist auf eine Tankmöglichkeit hin.", ar:"يُشير إلى إمكانية التزود بالوقود."} },
  { cat:"hinweis", icon:"tunnel_i", de:"Tunnel", ar:"نفق", note:{de:"Licht einschalten und Frequenz beachten.", ar:"شغّل الأضواء وانتبه للتردد المذكور."} },
  { cat:"hinweis", icon:"disabled_parking_i", de:"Behindertenparkplatz", ar:"موقف لذوي الإعاقة", note:{de:"Nur mit gültigem Ausweis benutzen.", ar:"استخدمه فقط ببطاقة سارية."} },
  { cat:"hinweis", icon:"loading_zone_i", de:"Lade- und Verladezone", ar:"منطقة تحميل وتفريغ", note:{de:"Meist zeitlich begrenzt für Waren.", ar:"محدودة زمنياً عادة للبضائع."} },
  { cat:"hinweis", icon:"zone30_i", de:"Tempo-30-Zone (Beginn)", ar:"بداية منطقة 30", note:{de:"Gilt für das ganze Quartier, nicht nur eine Strasse.", ar:"تسري على الحي بأكمله، لا على شارع واحد فقط."} },
  { cat:"hinweis", icon:"begegnungszone_i", de:"Begegnungszone (Beginn)", ar:"بداية منطقة اللقاء", note:{de:"Schrittgeschwindigkeit, Fussgänger dürfen die ganze Fläche nutzen.", ar:"سرعة المشي، ويمكن للمشاة استخدام كامل المساحة."} },

  { cat:"gebot", icon:"yield_to_oncoming", de:"Vortritt vor Gegenverkehr gewähren", ar:"امنح الأولوية للسير المقابل", note:{de:"Typisch bei Engpässen oder einspurigen Abschnitten.", ar:"شائعة عند الاختناقات أو المقاطع أحادية المسرب."} },
  { cat:"gebot", icon:"priority_over_oncoming", de:"Vortritt gegenüber Gegenverkehr", ar:"لك الأولوية على السير المقابل", note:{de:"Der Gegenverkehr muss dir hier den Vortritt lassen.", ar:"يجب على السير المقابل منحك الأولوية هنا."} },

  { cat:"vortritt", icon:"ende_beschraenkung", de:"Ende sämtlicher Beschränkungen", ar:"نهاية جميع القيود", note:{de:"Ab hier gelten wieder die allgemeinen Regeln.", ar:"من هنا تعود القواعد العامة للسريان."} }
];

/* correct = Indizes der richtigen Antworten (1 oder 2), scene = optionale Referenz auf scenes.js */
const FRAGEN = [
// ---------- grundregeln ----------
{ c:"grundregeln", q:{de:"Was verlangt die Grundregel im Strassenverkehr?", ar:"ماذا تتطلّب القاعدة الأساسية في المرور؟"}, a:[
  {de:"Niemanden gefährden, behindern oder belästigen.", ar:"عدم تعريض أحد للخطر أو إعاقته أو إزعاجه."},
  {de:"Immer so schnell fahren, wie das Signal erlaubt.", ar:"القيادة دائماً بالسرعة التي تسمح بها اللافتة."},
  {de:"Besondere Vorsicht gegenüber Kindern und älteren Menschen.", ar:"حذر خاص تجاه الأطفال وكبار السن."}], correct:[0,2], e:{de:"Die Signalgeschwindigkeit ist eine Obergrenze, kein Ziel.", ar:"السرعة على اللافتة حد أقصى وليست هدفاً."}},
{ c:"grundregeln", q:{de:"Du fährst innerorts auf einer Strasse mit zwei Fahrstreifen in deine Richtung.", ar:"تسير داخل المدينة على طريق بمسربين في اتجاهك."}, a:[
  {de:"Du darfst den Fahrstreifen frei wählen.", ar:"يمكنك اختيار المسرب بحرية."},
  {de:"Du musst immer den rechten Streifen benutzen.", ar:"يجب دائماً استعمال المسرب الأيمن."},
  {de:"Du darfst nicht ohne Grund dauernd wechseln.", ar:"لا يجوز تغيير المسرب باستمرار بلا سبب."}], correct:[0,2], e:{de:"Innerorts gilt freie Spurwahl, ausserorts das Rechtsfahrgebot.", ar:"داخل المدن اختيار المسرب حر، خارجها يجب السير يميناً."}},
{ c:"grundregeln", q:{de:"Darfst du im Stau an der Ampel schnell eine Nachricht am Handy lesen?", ar:"هل يجوز قراءة رسالة سريعة على الهاتف عند التوقف عند الإشارة؟"}, a:[
  {de:"Nein, das Gerät in der Hand halten ist verboten.", ar:"لا، حمل الجهاز باليد ممنوع."},
  {de:"Ja, weil das Fahrzeug steht.", ar:"نعم، لأن المركبة متوقفة."},
  {de:"Nur mit Freisprechanlage ist die Bedienung erlaubt.", ar:"الاستعمال مسموح فقط عبر نظام حر اليدين."}], correct:[0,2], e:{de:"Das Verbot gilt auch im Stillstand, solange der Motor läuft.", ar:"المنع ينطبق أيضاً أثناء التوقف ما دام المحرك يعمل."}},
{ c:"grundregeln", q:{de:"Wer ist verantwortlich, dass ein 8-jähriges Kind richtig gesichert ist?", ar:"من المسؤول عن تأمين طفل عمره 8 سنوات بشكل صحيح؟"}, a:[
  {de:"Der Fahrzeugführer.", ar:"سائق المركبة."},{de:"Das Kind selbst.", ar:"الطفل نفسه."},
  {de:"Nur die Eltern, wenn sie mitfahren.", ar:"الوالدان فقط إذا كانا في المركبة."}], correct:[0], e:{de:"Für Kinder unter 12 Jahren haftet immer der Fahrer.", ar:"السائق مسؤول دائماً عن الأطفال دون 12 سنة."}},
{ c:"grundregeln", q:{de:"Was bedeutet «Fahren auf Sicht»?", ar:"ماذا تعني «القيادة حسب مدى الرؤية»؟"}, a:[
  {de:"Du musst innerhalb der überblickbaren Strecke anhalten können.", ar:"أن تكون قادراً على التوقف ضمن ما تراه."},
  {de:"Du darfst bis zur Höchstgeschwindigkeit fahren, solange du etwas siehst.", ar:"أن تسير بالسرعة القصوى ما دمت ترى شيئاً."},
  {de:"Bei Nebel oder Nacht musst du langsamer fahren.", ar:"في الضباب أو الليل يجب تخفيض السرعة."}], correct:[0,2], e:{de:"Sicht bestimmt die Geschwindigkeit, nicht das Signal.", ar:"مدى الرؤية هو ما يحدد السرعة، لا اللافتة."}},
{ c:"grundregeln", q:{de:"Vor einer Schule spielen Kinder am Strassenrand.", ar:"أطفال يلعبون على حافة الطريق أمام مدرسة."}, a:[
  {de:"Der Vertrauensgrundsatz gilt hier nicht uneingeschränkt.", ar:"مبدأ الثقة لا ينطبق هنا بلا قيود."},
  {de:"Geschwindigkeit stark reduzieren und bremsbereit sein.", ar:"خفّض السرعة كثيراً وكن مستعداً للكبح."},
  {de:"Hupen genügt als Warnung.", ar:"البوق يكفي كتحذير."}], correct:[0,1], e:{de:"Bei Kindern musst du mit unvorhersehbarem Verhalten rechnen.", ar:"مع الأطفال توقّع تصرفات غير متوقعة."}},
{ c:"grundregeln", q:{de:"Du hast formal Vortritt, aber ein anderes Fahrzeug fährt trotzdem in die Kreuzung.", ar:"لك الأولوية رسمياً لكن مركبة أخرى تدخل التقاطع رغم ذلك."}, a:[
  {de:"Die Grundregel verlangt, einen Unfall zu vermeiden, auch wenn du im Recht bist.", ar:"القاعدة الأساسية تتطلب تجنّب الحادث حتى لو كنت على حق."},
  {de:"Du darfst auf deinem Vortritt bestehen und weiterfahren.", ar:"يمكنك التمسك بأولويتك والمتابعة."},
  {de:"Bremsbereitschaft schützt oft besser als formales Recht.", ar:"الاستعداد للكبح يحمي غالباً أكثر من الحق الشكلي."}], correct:[0,2], e:{de:"Vortritt ist kein Freibrief für riskantes Verhalten.", ar:"الأولوية ليست تصريحاً للتصرف المحفوف بالمخاطر."}},
{ c:"grundregeln", q:{de:"Was besagt der Vertrauensgrundsatz?", ar:"ماذا يقول مبدأ الثقة؟"}, a:[
  {de:"Du darfst annehmen, dass sich andere korrekt verhalten.", ar:"يمكنك افتراض أن الآخرين يتصرفون بشكل صحيح."},
  {de:"Bei Kindern, älteren Menschen und unsicher wirkenden Personen gilt er nicht uneingeschränkt.", ar:"لا ينطبق بلا قيود مع الأطفال وكبار السن والأشخاص غير الواثقين."},
  {de:"Er befreit dich von jeder Vorsicht.", ar:"يُعفيك من كل حذر."}], correct:[0,1], e:{de:"Der Grundsatz erleichtert das Fahren, ersetzt aber nie die Aufmerksamkeit.", ar:"المبدأ يسهّل القيادة لكنه لا يُغني عن الانتباه أبداً."}},
{ c:"grundregeln", q:{de:"Auf einer schmalen Strasse ausserorts ohne Mittellinie fährst du normal.", ar:"تسير بشكل عادي على طريق ضيّق خارج المدينة بلا خط وسطي."}, a:[
  {de:"Du hältst dich möglichst weit rechts.", ar:"تبقى قريباً من اليمين ما أمكن."},
  {de:"Die Fahrbahnmitte darfst du dauernd benutzen, wenn niemand entgegenkommt.", ar:"يمكنك استعمال منتصف الطريق باستمرار طالما لا يوجد سير مقابل."},
  {de:"Rechtsfahrgebot gilt ausserorts strikt.", ar:"وجوب السير يميناً ساري بشكل صارم خارج المدن."}], correct:[0,2], e:{de:"Anders als innerorts gibt es ausserorts keine freie Spurwahl.", ar:"بخلاف داخل المدن، لا يوجد اختيار حر للمسرب خارجها."}},
{ c:"grundregeln", q:{de:"Ein Mitfahrer ist 14 Jahre alt und sitzt hinten ohne Gurt.", ar:"راكب عمره 14 سنة يجلس خلفاً بلا حزام أمان."}, a:[
  {de:"Der Sicherheitsgurt ist auf allen Plätzen obligatorisch.", ar:"حزام الأمان إلزامي في كل المقاعد."},
  {de:"Ab 12 Jahren ist ein Gurt nicht mehr Pflicht.", ar:"من عمر 12 سنة لم يعد الحزام إلزامياً."},
  {de:"Die Verantwortung liegt in diesem Alter beim Jugendlichen selbst.", ar:"في هذا العمر تقع المسؤولية على المراهق نفسه."}], correct:[0], e:{de:"Nur die Kindersitzpflicht endet bei 12 Jahren oder 150 cm, der Gurt bleibt für alle Pflicht.", ar:"إلزامية مقعد الأطفال فقط تنتهي عند 12 سنة أو 150 سم، أما الحزام فيبقى إلزامياً للجميع."}}
,

// ---------- signale ----------
{ c:"signale", q:{de:"Welche Form haben Gefahrensignale in der Schweiz?", ar:"ما شكل إشارات الخطر في سويسرا؟"}, a:[
  {de:"Dreieckig mit rotem Rand.", ar:"مثلثة بإطار أحمر."},{de:"Rund mit rotem Rand.", ar:"دائرية بإطار أحمر."},{de:"Achteckig.", ar:"ثمانية الأضلاع."}],
  correct:[0], e:{de:"Rund mit rotem Rand = Verbot. Achteckig = STOP.", ar:"الدائرية بإطار أحمر = منع. الثمانية = قف."}, scene:"signalfarben"},
{ c:"signale", q:{de:"Was bedeutet ein rot umrandetes rundes Signal?", ar:"ماذا تعني إشارة دائرية بإطار أحمر؟"}, a:[
  {de:"Ein Verbot.", ar:"منع."},{de:"Ein Gebot.", ar:"إلزام."},{de:"Eine Warnung.", ar:"تحذير."}], correct:[0], e:{de:"Blaue runde Signale sind Gebote, rote Dreiecke Warnungen.", ar:"الدائرية الزرقاء إلزام، والمثلثات الحمراء تحذير."}, scene:"signalfarben"},
{ c:"signale", q:{de:"Du siehst das gelbe Viereck auf der Spitze.", ar:"ترى معيّناً أصفر."}, a:[
  {de:"Du fährst auf einer Hauptstrasse und hast Vortritt.", ar:"أنت على طريق رئيسي ولك الأولوية."},
  {de:"Du musst allen von rechts den Vortritt lassen.", ar:"يجب منح الأولوية لكل قادم من اليمين."},
  {de:"Es gilt, bis das gleiche Signal durchgestrichen erscheint.", ar:"يسري إلى أن تظهر نفس الإشارة مشطوبة."}], correct:[0,2], e:{de:"Das durchgestrichene Signal beendet die Hauptstrasse.", ar:"الإشارة المشطوبة تُنهي الطريق الرئيسي."}},
{ c:"signale", q:{de:"Beim Signal «STOP» ist die Strasse völlig frei.", ar:"عند إشارة «قف» يكون الطريق خالياً تماماً."}, a:[
  {de:"Vollständig anhalten, dann weiterfahren.", ar:"التوقف التام ثم المتابعة."},
  {de:"Langsam rollen und weiterfahren.", ar:"الانسياب ببطء والمتابعة."},{de:"Am Haltebalken anhalten.", ar:"التوقف عند خط التوقف."}],
  correct:[0,2], e:{de:"Bei STOP ist der Stillstand immer Pflicht.", ar:"عند إشارة قف، التوقف التام إلزامي دائماً."}},
{ c:"signale", q:{de:"Welche Farbe haben Autobahnsignale in der Schweiz?", ar:"ما لون إشارات الأوتوستراد في سويسرا؟"}, a:[
  {de:"Grün.", ar:"أخضر."},{de:"Blau.", ar:"أزرق."},{de:"Blau ist in der Schweiz die Farbe der Hauptstrassen.", ar:"الأزرق في سويسرا لون الطرق الرئيسية."}],
  correct:[0,2], e:{de:"In Deutschland und Italien ist es genau umgekehrt.", ar:"في ألمانيا وإيطاليا الأمر معكوس تماماً."}},
{ c:"signale", q:{de:"Was gilt bei einer durchgezogenen Sicherheitslinie?", ar:"ماذا ينطبق عند خط أمان متصل؟"}, a:[
  {de:"Sie darf nicht überfahren werden.", ar:"لا يجوز عبوره."},{de:"Überholen über die Linie ist verboten.", ar:"التجاوز فوق الخط ممنوع."},
  {de:"Sie darf zum Überholen kurz überfahren werden.", ar:"يجوز عبوره لفترة قصيرة للتجاوز."}], correct:[0,1], e:{de:"Nur die unterbrochene Leitlinie darf man überfahren.", ar:"الخط المتقطع وحده يجوز عبوره."}},
{ c:"signale", q:{de:"Ein Polizist regelt den Verkehr, die Ampel zeigt grün.", ar:"شرطي ينظّم السير والإشارة خضراء."}, a:[
  {de:"Die Weisung des Polizisten geht vor.", ar:"تعليمات الشرطي لها الأسبقية."},{de:"Die Ampel geht vor.", ar:"إشارة المرور لها الأسبقية."},
  {de:"Signale und Markierungen treten zurück.", ar:"تتراجع الإشارات والعلامات."}], correct:[0,2], e:{de:"Reihenfolge: Polizei, Lichtsignal, Signal, Markierung, Regel.", ar:"الترتيب: الشرطة، ثم الضوء، ثم اللافتة، ثم العلامة، ثم القاعدة."}},
{ c:"signale", q:{de:"Was bedeutet ein gelbes Blinklicht an einer Kreuzung?", ar:"ماذا يعني الضوء الأصفر الوامض عند تقاطع؟"}, a:[
  {de:"Erhöhte Vorsicht, normale Vortrittsregeln gelten.", ar:"حذر شديد، وتُطبَّق قواعد الأولوية العادية."},
  {de:"Du hast immer Vortritt.", ar:"لك الأولوية دائماً."},{de:"Du musst zwingend anhalten.", ar:"يجب التوقف إلزامياً."}],
  correct:[0], e:{de:"Die Anlage ist ausser Betrieb, Signale und Rechtsvortritt gelten.", ar:"الجهاز خارج الخدمة، فتُطبَّق اللافتات وأولوية اليمين."}, scene:"ampel_gelb"},
{ c:"signale", q:{de:"Die Ampel wechselt auf Gelb, du bist noch weit von der Kreuzung entfernt.", ar:"تتحول الإشارة إلى الأصفر وأنت لا تزال بعيداً عن التقاطع."}, a:[
  {de:"Du bremst und hältst gefahrlos an.", ar:"تكبح وتتوقف بأمان."},{de:"Du beschleunigst, um noch durchzufahren.", ar:"تسرّع لتعبر."},
  {de:"Gelb heisst wie Rot: anhalten, wenn möglich.", ar:"الأصفر مثل الأحمر: توقف إن أمكن."}], correct:[0,2], e:{de:"Durchfahren ist nur erlaubt, wenn sicheres Anhalten nicht mehr möglich ist.", ar:"العبور مسموح فقط إذا لم يعد التوقف الآمن ممكناً."}, scene:"ampel_gelb"},
{ c:"signale", q:{de:"Auf einer gelben Zickzacklinie beim Bus-Halt willst du kurz halten.", ar:"تريد الوقوف لحظة على خط أصفر متعرّج عند موقف الحافلة."}, a:[
  {de:"Nein, halten und parkieren sind verboten.", ar:"لا، الوقوف والركن ممنوعان."},{de:"Ja, wenn du im Fahrzeug bleibst.", ar:"نعم، إذا بقيت داخل المركبة."},
  {de:"Die Fläche ist für Busse reserviert.", ar:"المساحة محجوزة للحافلات."}], correct:[0,2], e:{de:"Gelb heisst hier: reserviert, ganz frei halten.", ar:"الأصفر هنا يعني: محجوز، أبقه خالياً تماماً."}},
{ c:"signale", q:{de:"Was zeigt ein blaues rundes Signal typischerweise?", ar:"ماذا تُظهر عادة الإشارة الدائرية الزرقاء؟"}, a:[
  {de:"Ein Gebot, zum Beispiel eine Fahrtrichtung.", ar:"إلزاماً، مثل اتجاه إلزامي للسير."},{de:"Ein Verbot.", ar:"منعاً."},{de:"Eine reine Information ohne Pflicht.", ar:"معلومة بلا إلزام."}],
  correct:[0], e:{de:"Blaue Kreise sind Gebotssignale, sie müssen befolgt werden.", ar:"الدوائر الزرقاء إشارات إلزام، يجب اتباعها."}, scene:"signalfarben"},
{ c:"signale", q:{de:"Eine unterbrochene weisse Leitlinie trennt zwei Fahrstreifen.", ar:"خط أبيض متقطع يفصل بين مسربين."}, a:[
  {de:"Du darfst zum Überholen die Spur wechseln, wenn es sicher ist.", ar:"يمكنك تغيير المسرب للتجاوز إذا كان آمناً."},
  {de:"Sie darf nie überfahren werden.", ar:"لا يجوز عبوره أبداً."},{de:"Sie gilt nur für Lastwagen.", ar:"تنطبق فقط على الشاحنات."}],
  correct:[0], e:{de:"Nur die durchgezogene Linie ist ein striktes Verbot.", ar:"الخط المتصل وحده هو منع صارم."}},
{ c:"signale", q:{de:"Welches Signal siehst du hier, und was bedeutet es?", ar:"أي إشارة ترى هنا، وماذا تعني؟"}, a:[
  {de:"«STOP»: immer vollständig anhalten.", ar:"«قف»: التوقف التام دائماً."},
  {de:"Es genügt, langsam zu rollen.", ar:"يكفي الانسياب ببطء."},
  {de:"Die achteckige Form ist einzigartig und international erkennbar.", ar:"الشكل الثماني فريد ومعروف دولياً."}], correct:[0,2], e:{de:"Kein anderes Signal in der Schweiz hat diese Form.", ar:"لا توجد إشارة أخرى في سويسرا بهذا الشكل."}, scene:"schild_stop"},
{ c:"signale", q:{de:"Welches Signal siehst du hier?", ar:"أي إشارة ترى هنا؟"}, a:[
  {de:"«Kein Vortritt».", ar:"«لا أولوية»."},{de:"«Hauptstrasse».", ar:"«طريق رئيسي»."},
  {de:"Anhalten ist hier nicht zwingend, aber Vortritt gewähren.", ar:"التوقف هنا غير إلزامي لكن يجب منح الأولوية."}], correct:[0,2], e:{de:"Das umgedrehte Dreieck ist das Signal für fehlenden Vortritt.", ar:"المثلث المقلوب هو إشارة انعدام الأولوية."}, scene:"schild_vortritt_dreieck"},
{ c:"signale", q:{de:"Welches Signal ist auf diesem Bild zu sehen?", ar:"أي إشارة تظهر في هذه الصورة؟"}, a:[
  {de:"Hauptstrasse.", ar:"طريق رئيسي."},{de:"Kein Vortritt.", ar:"لا أولوية."},
  {de:"Du hast Vortritt gegenüber allen einmündenden Strassen.", ar:"لك الأولوية على كل الطرق المتفرعة."}], correct:[0,2], e:{de:"Die gelbe Raute auf der Spitze kennzeichnet die Hauptstrasse.", ar:"المعيّن الأصفر يُميّز الطريق الرئيسي."}, scene:"schild_hauptstrasse"},
{ c:"signale", q:{de:"Was bedeutet dieses blaue Signal mit den Pfeilen?", ar:"ماذا تعني هذه الإشارة الزرقاء بالأسهم؟"}, a:[
  {de:"Kreisverkehr, vorgeschriebene Richtung.", ar:"دوّار، اتجاه إلزامي."},{de:"Ein Verbot, in den Kreisel einzufahren.", ar:"منع الدخول إلى الدوّار."},
  {de:"Du musst dem Kreispfeil folgen.", ar:"يجب اتباع اتجاه السهم الدائري."}], correct:[0,2], e:{de:"Blaue runde Signale mit Pfeilen sind immer Gebote.", ar:"الإشارات الزرقاء الدائرية بالأسهم إلزام دائماً."}, scene:"schild_kreisel_gebot"},
{ c:"signale", q:{de:"Was bedeutet dieses dreieckige Signal mit den zwei Figuren?", ar:"ماذا تعني هذه الإشارة المثلثة بالشكلين؟"}, a:[
  {de:"Achtung Kinder, meist bei Schulen.", ar:"احذر الأطفال، غالباً قرب المدارس."},{de:"Ein Verbot für Fussgänger.", ar:"منع دخول المشاة."},
  {de:"Tempo reduzieren und bremsbereit sein.", ar:"خفّض السرعة وكن مستعداً للكبح."}], correct:[0,2], e:{de:"Kinder können plötzlich auf die Fahrbahn laufen.", ar:"قد يركض الأطفال فجأة إلى الطريق."}, scene:"schild_kinder"},
{ c:"signale", q:{de:"Was bedeutet dieses rote Signal mit der Zahl 30?", ar:"ماذا تعني هذه الإشارة الحمراء برقم 30؟"}, a:[
  {de:"Höchstgeschwindigkeit 30 km/h.", ar:"الحد الأقصى للسرعة 30 كم/س."},{de:"Mindestgeschwindigkeit 30 km/h.", ar:"الحد الأدنى للسرعة 30 كم/س."},
  {de:"Diese Grenze gilt absolut, unabhängig vom Wetter.", ar:"هذا الحد مطلق، بصرف النظر عن الطقس."}], correct:[0,2], e:{de:"Bei schlechten Bedingungen musst du sogar noch langsamer fahren.", ar:"في الظروف السيئة عليك السير بأبطأ من ذلك حتى."}, scene:"schild_tempo_verbot"},
{ c:"signale", q:{de:"Was bedeutet dieses rote Signal mit den zwei Fahrzeugen?", ar:"ماذا تعني هذه الإشارة الحمراء بالمركبتين؟"}, a:[
  {de:"Überholen verboten.", ar:"ممنوع التجاوز."},{de:"Parkieren verboten.", ar:"ممنوع الركن."},
  {de:"Es gilt bis zur nächsten Kreuzung oder einem Aufhebungssignal.", ar:"يسري حتى التقاطع التالي أو إشارة الإلغاء."}], correct:[0,2], e:{de:"Auch Töfffahrer und Lastwagen sind vom Verbot betroffen.", ar:"يشمل المنع أيضاً الدراجات النارية والشاحنات."}, scene:"schild_ueberholverbot"},
{ c:"signale", q:{de:"Was bedeutet dieses blaue Signal mit den Kettengliedern?", ar:"ماذا تعني هذه الإشارة الزرقاء بحلقات السلسلة؟"}, a:[
  {de:"Schneekettenpflicht.", ar:"سلاسل الثلج إلزامية."},{de:"Ein Verbot für schwere Fahrzeuge.", ar:"منع المركبات الثقيلة."},
  {de:"Die Ketten müssen vor der Weiterfahrt montiert sein.", ar:"يجب تركيب السلاسل قبل متابعة السير."}], correct:[0,2], e:{de:"Meist werden die Antriebsräder bekettet, siehe Fahrzeughandbuch.", ar:"عادة تُركّب على عجلات الدفع، راجع دليل المركبة."}, scene:"schild_kettenpflicht"},

// ---------- tempo ----------
{ c:"tempo", q:{de:"Welche Höchstgeschwindigkeit gilt ausserorts ohne Signal?", ar:"ما السرعة القصوى خارج المدن بدون لافتة؟"}, a:[
  {de:"80 km/h.", ar:"80 كم/س."},{de:"100 km/h.", ar:"100 كم/س."},{de:"120 km/h.", ar:"120 كم/س."}], correct:[0],
  e:{de:"100 gilt auf der Autostrasse, 120 auf der Autobahn.", ar:"100 على الطريق السيار و120 على الأوتوستراد."}},
{ c:"tempo", q:{de:"Du ziehst einen Anhänger auf der Autobahn.", ar:"تجرّ مقطورة على الأوتوستراد."}, a:[
  {de:"Höchstens 80 km/h.", ar:"80 كم/س كحد أقصى."},{de:"Höchstens 100 km/h.", ar:"100 كم/س كحد أقصى."},{de:"Höchstens 120 km/h.", ar:"120 كم/س كحد أقصى."}],
  correct:[0], e:{de:"Mit Anhänger gilt überall maximal 80 km/h.", ar:"مع المقطورة الحد الأقصى 80 كم/س في كل مكان."}},
{ c:"tempo", q:{de:"Wie gross ist der Anhalteweg bei 50 km/h auf trockener Strasse?", ar:"كم مسافة التوقف عند 50 كم/س على طريق جاف؟"}, a:[
  {de:"Rund 40 m.", ar:"نحو 40 متراً."},{de:"Rund 25 m.", ar:"نحو 25 متراً."},{de:"15 m Reaktionsweg plus 25 m Bremsweg.", ar:"15 متراً رد فعل زائد 25 متراً كبح."}],
  correct:[0,2], e:{de:"Reaktionsweg 5×3=15, Bremsweg 5×5=25, zusammen 40 m.", ar:"رد الفعل 5×3=15، الكبح 5×5=25، المجموع 40."}, scene:"bremsweg_diagramm"},
{ c:"tempo", q:{de:"Du verdoppelst die Geschwindigkeit von 50 auf 100 km/h.", ar:"تضاعف السرعة من 50 إلى 100 كم/س."}, a:[
  {de:"Der Bremsweg wird viermal so lang.", ar:"تصبح مسافة الكبح أربعة أضعاف."},{de:"Der Bremsweg wird doppelt so lang.", ar:"تصبح الضعف."},
  {de:"Von 25 m auf 100 m.", ar:"من 25 متراً إلى 100 متر."}], correct:[0,2], e:{de:"Der Bremsweg wächst im Quadrat zur Geschwindigkeit.", ar:"مسافة الكبح تزداد بمربّع السرعة."}, scene:"bremsweg_diagramm"},
{ c:"tempo", q:{de:"Bei 100 km/h: wie lang ist der Reaktionsweg?", ar:"عند 100 كم/س: كم مسافة رد الفعل؟"}, a:[
  {de:"Etwa 30 m.", ar:"نحو 30 متراً."},{de:"Etwa 10 m.", ar:"نحو 10 أمتار."},{de:"Zehnerstelle mal 3, also 10×3.", ar:"رقم العشرات ×3، أي 10×3."}],
  correct:[0,2], e:{de:"Bei 100 km/h ist die Zehnerstelle 10, also 10×3=30 m.", ar:"عند 100 كم/س رقم العشرات هو 10، إذن 10×3=30 متراً."}, scene:"bremsweg_diagramm"},
{ c:"tempo", q:{de:"Welcher Abstand zum Fahrzeug davor ist richtig?", ar:"ما المسافة الصحيحة عن المركبة أمامك؟"}, a:[
  {de:"Mindestens 2 Sekunden.", ar:"ثانيتان على الأقل."},{de:"Etwa halber Tacho in Metern.", ar:"نحو نصف قراءة العداد بالأمتار."},{de:"Eine Fahrzeuglänge genügt.", ar:"طول مركبة واحدة يكفي."}],
  correct:[0,1], e:{de:"Bei Nässe oder schlechter Sicht verdoppelst du den Abstand.", ar:"عند البلل أو ضعف الرؤية ضاعِف المسافة."}},
{ c:"tempo", q:{de:"Was gilt in einer Begegnungszone?", ar:"ما الذي ينطبق في منطقة اللقاء؟"}, a:[
  {de:"Schrittgeschwindigkeit, rund 20 km/h.", ar:"سرعة المشي، نحو 20 كم/س."},{de:"Fussgänger haben Vortritt und dürfen die ganze Fläche nutzen.", ar:"الأولوية للمشاة ويمكنهم استخدام كامل المساحة."},{de:"Höchstens 30 km/h.", ar:"30 كم/س كحد أقصى."}],
  correct:[0,1], e:{de:"30 km/h gilt in der Tempo-30-Zone, dort ohne generellen Fussgängervortritt.", ar:"30 كم/س في منطقة 30، وفيها ليست للمشاة أولوية عامة."}},
{ c:"tempo", q:{de:"Du kommst bei starkem Regen ins Aquaplaning.", ar:"تدخل في انزلاق مائي أثناء مطر غزير."}, a:[
  {de:"Gas wegnehmen, Lenkrad ruhig geradeaus halten.", ar:"ارفع قدمك عن البنزين وأبقِ المقود مستقيماً بهدوء."},
  {de:"Kräftig bremsen.", ar:"اكبح بقوة."},{de:"Nicht ruckartig lenken.", ar:"لا تُدر المقود بحركة مفاجئة."}], correct:[0,2], e:{de:"Bremsen und Lenken wirken nicht, solange die Reifen schwimmen.", ar:"الكبح والتوجيه لا يعملان ما دامت الإطارات تطفو."}},
{ c:"tempo", q:{de:"Das Signal erlaubt 80 km/h, es herrscht dichter Nebel.", ar:"اللافتة تسمح بـ80 كم/س وهناك ضباب كثيف."}, a:[
  {de:"So langsam fahren, dass du auf Sichtweite anhalten kannst.", ar:"ببطء يسمح لك بالتوقف ضمن مدى الرؤية."},
  {de:"80 km/h, das Signal gilt.", ar:"80 كم/س، اللافتة سارية."},{de:"Die Geschwindigkeit muss den Verhältnissen angepasst werden.", ar:"يجب تكييف السرعة مع الظروف."}],
  correct:[0,2], e:{de:"Das Signal ist die Obergrenze, nie eine Erlaubnis.", ar:"اللافتة حد أقصى وليست إذناً."}},
{ c:"tempo", q:{de:"Auf schneebedeckter Strasse verlängert sich der Bremsweg gegenüber trockener Strasse.", ar:"على طريق مغطى بالثلج تطول مسافة الكبح مقارنة بالطريق الجاف."}, a:[
  {de:"Um das Zwei- bis Dreifache.", ar:"بمقدار الضعفين إلى ثلاثة أضعاف."},{de:"Kaum spürbar.", ar:"بشكل يكاد لا يُلاحظ."},{de:"Nur bei sehr hoher Geschwindigkeit.", ar:"فقط عند سرعة عالية جداً."}],
  correct:[0], e:{de:"Deshalb ist auf Schnee eine deutlich grössere Distanz nötig.", ar:"لهذا تلزم مسافة أكبر بكثير على الثلج."}},
{ c:"tempo", q:{de:"Wie lang ist der Anhalteweg bei 80 km/h auf trockener Strasse ungefähr?", ar:"كم تقريباً مسافة التوقف عند 80 كم/س على طريق جاف؟"}, a:[
  {de:"Rund 88 m.", ar:"نحو 88 متراً."},{de:"Rund 40 m.", ar:"نحو 40 متراً."},{de:"24 m Reaktionsweg plus 64 m Bremsweg.", ar:"24 متراً رد فعل زائد 64 متراً كبح."}],
  correct:[0,2], e:{de:"Zehnerstelle 8: Reaktionsweg 8×3=24, Bremsweg 8×8=64.", ar:"رقم العشرات 8: رد الفعل 8×3=24، الكبح 8×8=64."}, scene:"bremsweg_diagramm"},
{ c:"tempo", q:{de:"Auf nasser Strasse im Vergleich zu trockener Strasse.", ar:"على طريق مبلل مقارنة بطريق جاف."}, a:[
  {de:"Der Bremsweg verlängert sich deutlich.", ar:"تطول مسافة الكبح بشكل ملحوظ."},{de:"Du solltest den Abstand vergrössern.", ar:"يجب زيادة المسافة."},{de:"Der Bremsweg bleibt praktisch gleich.", ar:"تبقى مسافة الكبح كما هي تقريباً."}],
  correct:[0,1], e:{de:"Nässe reduziert die Haftung der Reifen spürbar.", ar:"البلل يُقلّل من تماسك الإطارات بشكل ملموس."}},
{ c:"tempo", q:{de:"Bei 100 km/h: wie gross ist der empfohlene Abstand zum vorausfahrenden Fahrzeug?", ar:"عند 100 كم/س: ما المسافة الموصى بها عن المركبة أمامك؟"}, a:[
  {de:"Etwa 50 m.", ar:"نحو 50 متراً."},{de:"Etwa 20 m.", ar:"نحو 20 متراً."},{de:"Halber Tacho in Metern.", ar:"نصف قراءة العداد بالأمتار."}],
  correct:[0,2], e:{de:"Bei 100 km/h Tacho ergibt das rund 50 m Abstand.", ar:"عند عداد 100 كم/س يعطي ذلك نحو 50 متراً مسافة."}},
{ c:"tempo", q:{de:"Was passiert, wenn du zu geringen Abstand zum vorderen Fahrzeug hältst?", ar:"ماذا يحدث إذا كانت مسافتك عن المركبة الأمامية قصيرة جداً؟"}, a:[
  {de:"Erhöhtes Risiko eines Auffahrunfalls.", ar:"خطر أكبر لحادث اصطدام خلفي."},{de:"Es drohen Bussen.", ar:"يمكن أن تُفرض غرامات."},{de:"Das ist erlaubt, solange du aufmerksam bleibst.", ar:"هذا مسموح ما دمت منتبهاً."}],
  correct:[0,1], e:{de:"Ungenügender Abstand ist eine der häufigsten Unfallursachen.", ar:"نقص المسافة من أكثر أسباب الحوادث شيوعاً."}},
{ c:"tempo", q:{de:"Du fährst nachts bei Regen auf einer unbekannten Strasse.", ar:"تقود ليلاً تحت المطر على طريق غير مألوف."}, a:[
  {de:"Tempo deutlich unter das erlaubte Maximum senken.", ar:"خفّض السرعة كثيراً تحت الحد الأقصى المسموح."},{de:"Abstand vergrössern.", ar:"زِد المسافة."},{de:"Das Signal garantiert eine sichere Geschwindigkeit.", ar:"اللافتة تضمن سرعة آمنة."}],
  correct:[0,1], e:{de:"Nacht, Nässe und Unkenntnis der Strecke summieren sich zu höherem Risiko.", ar:"الليل والبلل وعدم معرفة الطريق تتراكم لتزيد الخطر."}},
{ c:"tempo", q:{de:"Vor einer Schule zeigt ein Signal spielende Kinder, die Höchstgeschwindigkeit wäre 50 km/h.", ar:"أمام مدرسة تُظهر إشارة أطفالاً يلعبون، والسرعة القصوى المسموحة 50 كم/س."}, a:[
  {de:"Du solltest trotzdem deutlich langsamer fahren.", ar:"عليك رغم ذلك السير بأبطأ بكثير."},{de:"50 km/h bleibt immer sicher.", ar:"50 كم/س تبقى آمنة دائماً."},{de:"Bremsbereitschaft ist hier besonders wichtig.", ar:"الاستعداد للكبح مهم هنا بشكل خاص."}],
  correct:[0,2], e:{de:"Kinder können jederzeit unvorhersehbar auf die Strasse laufen.", ar:"قد يركض الأطفال إلى الطريق في أي لحظة بلا سابق إنذار."}, scene:"schulweg"},

// ---------- vortritt ----------
{ c:"vortritt", q:{de:"Eine Verzweigung ohne Signale und Markierungen.", ar:"تقاطع بلا إشارات ولا علامات."}, a:[
  {de:"Das Fahrzeug von rechts hat Vortritt.", ar:"المركبة القادمة من اليمين لها الأولوية."},{de:"Das Fahrzeug von links hat Vortritt.", ar:"المركبة القادمة من اليسار لها الأولوية."},
  {de:"Wer zuerst da war.", ar:"من وصل أولاً."}], correct:[0], e:{de:"Das ist der Rechtsvortritt, die Grundregel an Verzweigungen.", ar:"هذه هي أولوية اليمين، القاعدة الأساسية في التقاطعات."}, scene:"kreuzung_rechts"},
{ c:"vortritt", q:{de:"Zwei Fahrzeuge nähern sich der gleichen unmarkierten Kreuzung von rechts und links im rechten Winkel.", ar:"مركبتان تقتربان من نفس التقاطع غير المعلَّم من اليمين واليسار بزاوية قائمة."}, a:[
  {de:"Die von rechts kommende Person fährt zuerst.", ar:"من يأتي من اليمين يمر أولاً."},{de:"Beide müssen gleichzeitig anhalten und sich einigen.", ar:"يجب على كليهما التوقف والاتفاق."},
  {de:"Wer schneller unterwegs ist, hat Vortritt.", ar:"الأسرع له الأولوية."}], correct:[0], e:{de:"Der Rechtsvortritt löst die Situation eindeutig.", ar:"أولوية اليمين تحسم الموقف بوضوح."}, scene:"kreuzung_rechts"},
{ c:"vortritt", q:{de:"Du fährst aus einem Parkplatz auf die Strasse.", ar:"تخرج من موقف إلى الطريق."}, a:[
  {de:"Du hast keinen Vortritt.", ar:"ليست لك الأولوية."},{de:"Der Rechtsvortritt gilt auch hier.", ar:"أولوية اليمين تنطبق هنا أيضاً."},{de:"Du musst warten, bis die Fahrbahn frei ist.", ar:"يجب الانتظار حتى يخلو الطريق."}],
  correct:[0,2], e:{de:"Aus Parkplatz, Garage, Tankstelle oder Feldweg gibt es keinen Vortritt.", ar:"الخروج من موقف أو مرآب أو محطة وقود أو طريق ترابي لا يمنح الأولوية."}},
{ c:"vortritt", q:{de:"Auf welcher Strasse hast du in dieser Kreuzung Vortritt?", ar:"في هذا التقاطع، على أي طريق لك الأولوية؟"}, a:[
  {de:"Auf der Hauptstrasse mit dem gelben Signal.", ar:"على الطريق الرئيسي الذي عليه الإشارة الصفراء."},{de:"Auf der Nebenstrasse.", ar:"على الطريق الفرعي."},
  {de:"Fahrzeuge von links müssen dir den Vortritt lassen.", ar:"يجب على القادمين من اليسار منحك الأولوية."}], correct:[0,2], e:{de:"Das Hauptstrassensignal gibt dir Vortritt gegenüber allen Nebenstrassen.", ar:"إشارة الطريق الرئيسي تمنحك الأولوية على كل الطرق الفرعية."}, scene:"kreuzung_hauptstrasse"},
{ c:"vortritt", q:{de:"Du willst in einen Kreisel einfahren.", ar:"تريد الدخول إلى دوّار."}, a:[
  {de:"Fahrzeuge im Kreisel haben Vortritt.", ar:"المركبات داخل الدوّار لها الأولوية."},{de:"Beim Einfahren wird nicht geblinkt.", ar:"لا يُستعمل الغماز عند الدخول."},{de:"Du blinkst links beim Einfahren.", ar:"تستعمل غماز اليسار عند الدخول."}],
  correct:[0,1], e:{de:"Geblinkt wird nur rechts beim Verlassen des Kreisels.", ar:"الغماز يُستعمل يميناً فقط عند مغادرة الدوّار."}, scene:"kreisel"},
{ c:"vortritt", q:{de:"Im Kreisel: von wo kommt das Fahrzeug, dem du Vortritt lassen musst?", ar:"في الدوّار: من أين تأتي المركبة التي يجب منحها الأولوية؟"}, a:[
  {de:"Von links, aus dem Kreisel selbst.", ar:"من اليسار، من داخل الدوّار نفسه."},{de:"Von rechts, die einfahren will.", ar:"من اليمين، التي تريد الدخول."},{de:"Von hinten.", ar:"من الخلف."}],
  correct:[0], e:{de:"Wer im Kreisel ist, hat immer Vortritt vor dem Einfahrenden.", ar:"من هو داخل الدوّار له الأولوية دائماً على الداخل الجديد."}, scene:"kreisel"},
{ c:"vortritt", q:{de:"Eine Person steht am Fussgängerstreifen und will offensichtlich queren.", ar:"شخص يقف عند ممر المشاة ويريد العبور بوضوح."}, a:[
  {de:"Du musst ihr den Vortritt lassen und nötigenfalls anhalten.", ar:"يجب منحه الأولوية والتوقف عند الحاجة."},
  {de:"Du darfst weiterfahren, solange sie nicht auf dem Streifen ist.", ar:"يمكنك المتابعة ما دام لم يدخل الممر."},
  {de:"Du fährst nur weiter, wenn du rechtzeitig anhalten könntest.", ar:"تتابع فقط إذا كان بإمكانك التوقف في الوقت المناسب."}], correct:[0], e:{de:"Wartende Fussgänger haben Vortritt, sobald ihre Absicht erkennbar ist.", ar:"للمشاة المنتظرين الأولوية بمجرد أن تتضح نيّتهم."}, scene:"fussgaengerstreifen"},
{ c:"vortritt", q:{de:"Zwei Personen warten am Fussgängerstreifen, ein Auto nähert sich langsam.", ar:"شخصان ينتظران عند ممر المشاة وسيارة تقترب ببطء."}, a:[
  {de:"Die Fussgänger haben Vortritt.", ar:"الأولوية للمشاة."},{de:"Das Auto muss nötigenfalls vollständig anhalten.", ar:"يجب على السيارة التوقف التام عند الحاجة."},{de:"Bei zwei Personen gilt eine andere Regel.", ar:"تنطبق قاعدة مختلفة عند وجود شخصين."}],
  correct:[0,1], e:{de:"Die Anzahl wartender Fussgänger ändert nichts an der Regel.", ar:"عدد المنتظرين لا يغيّر القاعدة."}, scene:"fussgaengerstreifen"},
{ c:"vortritt", q:{de:"Du fährst auf einer Hauptstrasse, ein Tram kreuzt.", ar:"تسير على طريق رئيسي ويعبر ترام."}, a:[
  {de:"Das Tram hat Vortritt.", ar:"الترام له الأولوية."},{de:"Du hast Vortritt wegen der Hauptstrasse.", ar:"لك الأولوية بسبب الطريق الرئيسي."},{de:"Schienenfahrzeuge haben immer Vortritt.", ar:"مركبات السكة لها الأولوية دائماً."}],
  correct:[0,2], e:{de:"Der lange Bremsweg des Trams ist der Grund.", ar:"السبب هو مسافة الكبح الطويلة للترام."}, scene:"tram_vortritt"},
{ c:"vortritt", q:{de:"Innerorts blinkt ein Bus an der Haltestelle und will wegfahren.", ar:"داخل المدينة حافلة تشغّل الغماز عند الموقف وتريد الانطلاق."}, a:[
  {de:"Du musst ihm den Vortritt lassen.", ar:"يجب منحها الأولوية."},{de:"Du darfst normal weiterfahren.", ar:"يمكنك المتابعة بشكل عادي."},{de:"Nötigenfalls bremsen und anhalten.", ar:"اكبح وتوقّف عند الحاجة."}],
  correct:[0,2], e:{de:"Diese Regel gilt nur innerorts an gekennzeichneten Haltestellen.", ar:"هذه القاعدة تنطبق داخل المدن فقط عند المواقف المعلَّمة."}, scene:"bus_haltestelle"},
{ c:"vortritt", q:{de:"Ein Fahrzeug mit Blaulicht und Sirene nähert sich von hinten.", ar:"مركبة بضوء أزرق وصفارة تقترب من الخلف."}, a:[
  {de:"Sofort Platz machen, nötigenfalls rechts anhalten.", ar:"أفسح الطريق فوراً وتوقّف يميناً عند الحاجة."},{de:"Bei Rot in die Kreuzung fahren, um Platz zu machen.", ar:"ادخل التقاطع عند الأحمر لإفساح المجال."},
  {de:"Ruhig bleiben und nicht abrupt bremsen.", ar:"ابقَ هادئاً ولا تكبح فجأة."}], correct:[0,2], e:{de:"Bei Rot bleibst du stehen; du rückst höchstens seitlich aus.", ar:"عند الأحمر تبقى واقفاً؛ تتحرّك جانبياً على الأكثر."}},
{ c:"vortritt", q:{de:"Du willst links abbiegen, Gegenverkehr kommt entgegen.", ar:"تريد الانعطاف يساراً وهناك سير قادم في الاتجاه المعاكس."}, a:[
  {de:"Du musst dem Gegenverkehr den Vortritt lassen.", ar:"يجب منح الأولوية للسير المقابل."},{de:"Du hast Vortritt, weil du blinkst.", ar:"لك الأولوية لأنك تستعمل الغماز."},
  {de:"Auch Fussgänger auf der Zielstrasse haben Vortritt.", ar:"المشاة على الطريق الهدف لهم الأولوية أيضاً."}], correct:[0,2], e:{de:"Der Blinker kündigt an, er nimmt kein Recht.", ar:"الغماز يُعلن عن نية ولا يمنح حقاً."}},
{ c:"vortritt", q:{de:"Ein Fussgänger hebt einen weissen Stock, um die Strasse zu queren.", ar:"شخص يرفع عصا بيضاء ليعبر الطريق."}, a:[
  {de:"Du musst anhalten und ihn queren lassen.", ar:"يجب أن تتوقف وتتركه يعبر."},{de:"Das Signal betrifft nur Blindenhunde.", ar:"الإشارة تخص كلاب المكفوفين فقط."},{de:"Nur an markierten Streifen relevant.", ar:"مهمة فقط عند الممرات المعلَّمة."}],
  correct:[0], e:{de:"Der weisse Stock ist ein anerkanntes Zeichen einer sehbehinderten Person.", ar:"العصا البيضاء علامة معترف بها لشخص ضعيف البصر."}},
{ c:"vortritt", q:{de:"Eine Fahrbahnverengung durch eine Baustelle hat kein Vortrittssignal, dein Fahrstreifen ist blockiert.", ar:"تضيّق في الطريق بسبب أشغال بلا إشارة أولوية، ومسربك مسدود."}, a:[
  {de:"Du musst dem Gegenverkehr den Vortritt lassen.", ar:"يجب منح الأولوية للسير المقابل."},{de:"Wer das Hindernis auf seiner Seite hat, wartet.", ar:"من لديه العائق في جهته ينتظر."},{de:"Du darfst dich einfach vordrängen.", ar:"يمكنك التقدم ببساطة."}],
  correct:[0,1], e:{de:"Das ist die Hindernisregel: deine Seite ist blockiert, also wartest du.", ar:"هذه قاعدة العائق: جهتك مسدودة، فتنتظر."}, scene:"vortritt_baustelle"},
{ c:"vortritt", q:{de:"Im Kreisel kreuzt gleichzeitig ein Tram deinen Weg.", ar:"يعبر ترام طريقك في الوقت نفسه داخل الدوّار."}, a:[
  {de:"Das Tram hat auch im Kreisel immer Vortritt.", ar:"للترام الأولوية دائماً حتى داخل الدوّار."},{de:"Im Kreisel gilt nur die normale Kreiselregel.", ar:"داخل الدوّار تنطبق فقط قاعدة الدوّار العادية."},{de:"Du musst warten, auch wenn du bereits im Kreisel bist.", ar:"عليك الانتظار حتى لو كنت داخل الدوّار بالفعل."}],
  correct:[0,2], e:{de:"Schienenfahrzeuge sind die einzige generelle Ausnahme von der Kreiselregel.", ar:"مركبات السكة هي الاستثناء العام الوحيد لقاعدة الدوّار."}, scene:"kreisel_tram"},
{ c:"vortritt", q:{de:"An einer Kreuzung ohne Fussgängerstreifen will jemand die Strasse überqueren.", ar:"عند تقاطع بلا ممر مشاة، يريد أحدهم عبور الطريق."}, a:[
  {de:"Formal hat der Fussgänger hier keinen Vortritt.", ar:"رسمياً ليست للمشاة أولوية هنا."},{de:"Die Grundregel verlangt trotzdem Vorsicht und Rücksicht.", ar:"القاعدة الأساسية تتطلب رغم ذلك حذراً ومراعاة."},{de:"Du darfst ohne jede Rücksicht weiterfahren.", ar:"يمكنك المتابعة دون أي اعتبار."}],
  correct:[0,1], e:{de:"Kein formaler Vortritt bedeutet nicht, dass du jemanden gefährden darfst.", ar:"انعدام الأولوية الرسمية لا يعني أنه يمكنك تعريض أحد للخطر."}, scene:"fussgaenger_ohne_streifen"},
{ c:"vortritt", q:{de:"Du fährst aus einer Nebenstrasse in eine Einbahnstrasse ein und siehst ein Auto falsch herum entgegenkommen.", ar:"تدخل من طريق فرعي إلى طريق باتجاه واحد وترى سيارة قادمة بالاتجاه الخاطئ."}, a:[
  {de:"Das Fahrzeug fährt widerrechtlich in falscher Richtung.", ar:"المركبة تسير بشكل مخالف في الاتجاه الخاطئ."},{de:"Du musst trotzdem einen Unfall vermeiden.", ar:"عليك رغم ذلك تجنّب وقوع حادث."},{de:"Einbahnstrassen dürfen in beide Richtungen befahren werden.", ar:"يمكن السير في الطرق ذات الاتجاه الواحد بكلا الاتجاهين."}],
  correct:[0,1], e:{de:"Formales Recht schützt dich nicht vor einem Zusammenstoss.", ar:"الحق الشكلي لا يحميك من الاصطدام."}, scene:"einbahn_falsch"},
{ c:"vortritt", q:{de:"Ein Velofahrer benutzt einen markierten Radweg entlang der Hauptstrasse. Du willst aus einer Werkausfahrt einbiegen.", ar:"راكب دراجة يستخدم مساراً معلَّماً موازياً للطريق الرئيسي. تريد الدخول من مخرج مصنع."}, a:[
  {de:"Der Velofahrer auf dem Radweg hat Vortritt.", ar:"لراكب الدراجة على المسار الأولوية."},{de:"Du hast als Wartepflichtiger keinen Vortritt.", ar:"بصفتك ملزماً بالانتظار، ليست لك الأولوية."},{de:"Radwege haben grundsätzlich keinen besonderen Schutz.", ar:"مسارات الدراجات ليس لها أي حماية خاصة أصلاً."}],
  correct:[0,1], e:{de:"Der Radweg folgt der Priorität der Strasse, die er begleitet.", ar:"يتبع مسار الدراجات أولوية الطريق الذي يوازيه."}, scene:"radweg_kreuzung"},
{ c:"vortritt", q:{de:"Auf einer Autobahnausfahrt bist du schon im Ausfahrtsstreifen. Ein Fahrzeug will kurz vorher noch spät einscheren.", ar:"أنت بالفعل في مسرب الخروج على الأوتوستراد، وتريد مركبة الاندماج متأخرة قبل ذلك مباشرة."}, a:[
  {de:"Wer im Ausfahrtsstreifen ist, hat keinen besonderen Vortritt gegenüber dem Durchgangsverkehr.", ar:"من هو في مسرب الخروج ليس له أولوية خاصة على السير المباشر."},{de:"Ein spätes Einscheren über die Sicherheitslinie ist gefährlich und meist verboten.", ar:"الاندماج المتأخر فوق خط الأمان خطير وممنوع غالباً."},{de:"Fahrzeuge im Ausfahrtsstreifen dürfen niemanden mehr durchlassen.", ar:"لا يجوز لمركبات مسرب الخروج السماح لأحد بالدخول بعد الآن."}],
  correct:[0,1], e:{de:"Rechtzeitiges und ruhiges Einordnen ist sicherer als ein spätes Manöver.", ar:"الاندماج المبكر والهادئ أكثر أماناً من مناورة متأخرة."}, scene:"autobahn_ausfahrt"},

// ---------- manoever ----------
{ c:"manoever", q:{de:"Auf welcher Seite wird überholt?", ar:"من أي جهة يتم التجاوز؟"}, a:[
  {de:"Links.", ar:"من اليسار."},{de:"Rechts.", ar:"من اليمين."},{de:"Ein Tram überholt man rechts.", ar:"الترام يُتجاوز من اليمين."}], correct:[0,2], e:{de:"Das Tram ist die wichtigste Ausnahme.", ar:"الترام هو الاستثناء الأهم."}},
{ c:"manoever", q:{de:"Auf der Autobahn stockt der Verkehr in parallelen Kolonnen.", ar:"على الأوتوستراد السير متقطع في طوابير متوازية."}, a:[
  {de:"Rechts vorbeifahren, wenn die eigene Kolonne schneller ist.", ar:"المرور من اليمين إذا كان طابورك أسرع."},{de:"Ausschwenken nach rechts und wieder einbiegen.", ar:"الخروج يميناً ثم العودة إلى المسرب."},
  {de:"Rechtsüberholen durch Spurwechsel ist verboten.", ar:"التجاوز من اليمين بتغيير المسرب ممنوع."}], correct:[0,2], e:{de:"Vorbeifahren in der eigenen Spur ist erlaubt, Ausschwenken nicht.", ar:"المرور ضمن مسربك مسموح، الخروج والعودة لا."}},
{ c:"manoever", q:{de:"Wo ist Überholen verboten?", ar:"أين يُمنع التجاوز؟"}, a:[
  {de:"Vor Kuppen und in unübersichtlichen Kurven.", ar:"قبل قمم التلال وفي المنعطفات غير الواضحة."},{de:"Unmittelbar vor Fussgängerstreifen.", ar:"مباشرة قبل ممرات المشاة."},{de:"Auf geraden Strecken ausserorts.", ar:"على المقاطع المستقيمة خارج المدن."}],
  correct:[0,1], e:{de:"Auf übersichtlicher gerader Strecke ist Überholen erlaubt.", ar:"على مقطع مستقيم واضح الرؤية التجاوز مسموح."}, scene:"ueberholverbot_kuppe"},
{ c:"manoever", q:{de:"Du näherst dich einer Kuppe mit eingeschränkter Sicht.", ar:"تقترب من قمة تلة برؤية محدودة."}, a:[
  {de:"Kein Überholen, da du den Gegenverkehr nicht sehen kannst.", ar:"ممنوع التجاوز لأنك لا ترى السير المقابل."},{de:"Überholen ist erlaubt, wenn du beschleunigst.", ar:"التجاوز مسموح إذا زدت السرعة."},{de:"Erst nach der Kuppe wieder erlaubt.", ar:"يُسمح مجدداً بعد القمة."}],
  correct:[0,2], e:{de:"Das Risiko eines Frontalzusammenstosses ist hier am höchsten.", ar:"خطر الاصطدام الجبهي هنا في أعلى مستوياته."}, scene:"ueberholverbot_kuppe"},
{ c:"manoever", q:{de:"Was gehört zu jedem Spurwechsel?", ar:"ما الذي يجب فعله عند كل تغيير مسرب؟"}, a:[
  {de:"Rückspiegel, Blinker, Schulterblick.", ar:"المرآة، الغماز، النظرة فوق الكتف."},{de:"Nur der Blinker.", ar:"الغماز فقط."},{de:"Der Schulterblick wegen des toten Winkels.", ar:"النظرة فوق الكتف بسبب النقطة العمياء."}],
  correct:[0,2], e:{de:"Der Spiegel allein deckt den toten Winkel nicht ab.", ar:"المرآة وحدها لا تغطي النقطة العمياء."}},
{ c:"manoever", q:{de:"Du überholst eine Person auf dem Velo ausserorts.", ar:"تتجاوز راكب دراجة خارج المدينة."}, a:[
  {de:"Faustregel: rund 1,5 m Seitenabstand.", ar:"القاعدة التقريبية: نحو 1.5 متر مسافة جانبية."},{de:"Kein Mindestabstand nötig.", ar:"لا حاجة لمسافة دنيا."},{de:"Innerorts ist die empfohlene Distanz meist geringer.", ar:"داخل المدن المسافة الموصى بها أقل عادة."}],
  correct:[0,2], e:{de:"Velofahrer können durch Windstoss oder Bodenwellen ausweichen.", ar:"قد ينحرف راكب الدراجة بسبب اندفاع الهواء أو مطبات الطريق."}, scene:"ueberholung_velo"},
{ c:"manoever", q:{de:"Wie nahe vor einem Fussgängerstreifen darfst du parkieren?", ar:"على أي مسافة قبل ممر المشاة يجوز الركن؟"}, a:[
  {de:"Nicht näher als 5 m.", ar:"ليس أقل من 5 أمتار."},{de:"Nicht näher als 2 m.", ar:"ليس أقل من مترين."},{de:"Direkt davor, wenn Platz ist.", ar:"مباشرة أمامه إذا وُجد مكان."}], correct:[0],
  e:{de:"Sonst sehen andere Fahrer die Fussgänger zu spät.", ar:"وإلا يرى السائقون الآخرون المشاة متأخراً جداً."}, scene:"parkabstand_zebrastreifen"},
{ c:"manoever", q:{de:"Was gilt in der blauen Zone?", ar:"ما الذي ينطبق في المنطقة الزرقاء؟"}, a:[
  {de:"Parkscheibe ist obligatorisch.", ar:"قرص الوقوف إلزامي."},{de:"Erlaubt ist eine Parkdauer von 1 Stunde.", ar:"مدة الركن المسموحة ساعة واحدة."},{de:"Parkieren ist unbeschränkt erlaubt.", ar:"الركن مسموح بلا حدود."}],
  correct:[0,1], e:{de:"Ohne oder mit falsch gestellter Scheibe gibt es eine Busse.", ar:"بدون القرص أو بضبطه خطأً تُفرض غرامة."}},
{ c:"manoever", q:{de:"Wo ist Halten verboten?", ar:"أين يُمنع الوقوف؟"}, a:[
  {de:"Auf dem Fussgängerstreifen.", ar:"على ممر المشاة."},{de:"Auf Bahnübergängen.", ar:"على مزلقان القطار."},{de:"In einer breiten, gut einsehbaren Kurve.", ar:"في منعطف واسع وواضح الرؤية."}], correct:[0,1],
  e:{de:"Verboten ist Halten in engen und unübersichtlichen Kurven.", ar:"الممنوع هو الوقوف في المنعطفات الضيقة وغير الواضحة."}},
{ c:"manoever", q:{de:"Du musst rückwärts aus einer engen Einfahrt.", ar:"عليك الرجوع للخلف من مدخل ضيق."}, a:[
  {de:"Langsam fahren, bei Unsicherheit einweisen lassen.", ar:"سِر ببطء واستعن بمن يوجّهك عند انعدام الرؤية."},{de:"Nur die Rückfahrkamera benutzen.", ar:"استعمل كاميرا الرجوع فقط."},
  {de:"Du hast gegenüber anderen keinen Vortritt.", ar:"ليست لك الأولوية على الآخرين."}], correct:[0,2], e:{de:"Die Kamera hat tote Winkel, sie ersetzt den Blick nicht.", ar:"للكاميرا نقاط عمياء ولا تُغني عن النظر."}},
{ c:"manoever", q:{de:"Innerorts, zwei Fahrstreifen je Richtung: du willst die Spur wechseln.", ar:"داخل المدينة، مسربان لكل اتجاه: تريد تغيير المسرب."}, a:[
  {de:"Spiegel, Blinker, Schulterblick, dann wechseln.", ar:"المرآة، الغماز، النظرة فوق الكتف، ثم التغيير."},{de:"Nur wenn die Ziel-Spur komplett leer ist, ohne weitere Kontrolle.", ar:"فقط إذا كان المسرب الهدف فارغاً تماماً بلا فحص آخر."},
  {de:"Der Blinker allein genügt als Ankündigung.", ar:"الغماز وحده يكفي كإعلان."}], correct:[0], e:{de:"Immer die volle Kontrollkette einhalten, unabhängig von scheinbar freier Sicht.", ar:"اتبع دائماً السلسلة الكاملة للفحص، بصرف النظر عن الرؤية الظاهرة الخالية."}, scene:"fahrstreifen_innerorts"},
{ c:"manoever", q:{de:"Beim Wenden auf einer engen Strasse.", ar:"عند الاستدارة على طريق ضيّق."}, a:[
  {de:"Nur wenden, wenn Sicht und Platz ausreichen und niemand behindert wird.", ar:"استدر فقط إذا كانت الرؤية والمساحة كافيتين ودون إعاقة أحد."},{de:"Wenden ist überall erlaubt, wo kein Verbotsschild steht.", ar:"الاستدارة مسموحة في كل مكان لا توجد فيه لافتة منع."},
  {de:"Vortritt hat immer, wer wendet.", ar:"من يستدير له الأولوية دائماً."}], correct:[0], e:{de:"Wenden bleibt an die Grundregel gebunden: niemanden gefährden.", ar:"الاستدارة تبقى مقيّدة بالقاعدة الأساسية: عدم تعريض أحد للخطر."}},
{ c:"manoever", q:{de:"An einer Autobahnauffahrt endet dein Einspurstreifen, der Verkehr auf der Autobahn ist dicht.", ar:"عند مدخل الأوتوستراد ينتهي مسرب التسارع الخاص بك، والسير كثيف على الأوتوستراد."}, a:[
  {de:"Rechtzeitig Geschwindigkeit anpassen und in eine Lücke einordnen.", ar:"كيّف سرعتك مبكراً واندمج ضمن فراغ مناسب."},{de:"Der Verkehr auf der Autobahn muss dir Platz machen.", ar:"يجب على السير على الأوتوستراد إفساح المجال لك."},{de:"Ein kurzes, freundliches Einfädeln nach dem Reissverschlussprinzip ist üblich.", ar:"الاندماج القصير والمتبادل حسب مبدأ السحّاب أمر معتاد."}],
  correct:[0,2], e:{de:"Du hast keinen Vortritt, aber gegenseitige Rücksicht erleichtert das Einfädeln.", ar:"ليست لك الأولوية، لكن المراعاة المتبادلة تُسهّل الاندماج."}},
{ c:"manoever", q:{de:"Ein Schulbus hält mit Warnblinker und öffnet die Türen.", ar:"حافلة مدرسية تتوقف بأضواء التحذير وتفتح أبوابها."}, a:[
  {de:"Tempo reduzieren und mit querenden Kindern rechnen.", ar:"خفّض السرعة وتوقّع أطفالاً عابرين."},{de:"Vorbeifahren ist grundsätzlich verboten.", ar:"المرور بجانبها ممنوع أصلاً."},{de:"Erhöhte Vorsicht ist in jedem Fall angebracht.", ar:"الحذر الإضافي مطلوب في كل الأحوال."}],
  correct:[0,2], e:{de:"Kinder können unvermittelt vor oder hinter dem Bus auf die Strasse treten.", ar:"قد يخرج الأطفال فجأة أمام الحافلة أو خلفها إلى الطريق."}, scene:"schulweg"},
{ c:"manoever", q:{de:"Du parkierst rückwärts auf einem belebten Parkplatz mit Fussgängern.", ar:"تركن للخلف في موقف مزدحم بالمشاة."}, a:[
  {de:"Besonders auf Kinder achten, die hinter dem Fahrzeug verdeckt sein können.", ar:"انتبه بشكل خاص للأطفال الذين قد يكونون مخفيين خلف المركبة."},{de:"Du hast beim Rückwärtsfahren keinen Vortritt.", ar:"ليست لك الأولوية أثناء الرجوع للخلف."},{de:"Der Rückspiegel allein genügt zur Kontrolle.", ar:"المرآة الخلفية وحدها تكفي للفحص."}],
  correct:[0,1], e:{de:"Kleine Kinder liegen oft im toten Winkel hinter dem Fahrzeug.", ar:"غالباً ما يقع الأطفال الصغار في النقطة العمياء خلف المركبة."}},
{ c:"manoever", q:{de:"Ein Signal erlaubt an dieser Kreuzung ausnahmsweise das Rechtsabbiegen bei Rot.", ar:"إشارة تسمح استثنائياً بالانعطاف يميناً عند الأحمر في هذا التقاطع."}, a:[
  {de:"Ohne dieses Zusatzsignal ist Rechtsabbiegen bei Rot in der Schweiz nicht erlaubt.", ar:"بلا هذه الإشارة الإضافية، الانعطاف يميناً عند الأحمر غير مسموح في سويسرا."},{de:"Auch mit dem Signal musst du Fussgängern und Velofahrern den Vortritt lassen.", ar:"حتى مع الإشارة يجب منح الأولوية للمشاة وراكبي الدراجات."},{de:"Das ist in der ganzen Schweiz immer automatisch erlaubt.", ar:"هذا مسموح تلقائياً في كل سويسرا دائماً."}],
  correct:[0,1], e:{de:"Anders als in einigen anderen Ländern braucht es in der Schweiz ein explizites Signal.", ar:"بخلاف بعض الدول الأخرى، يتطلب الأمر في سويسرا إشارة صريحة."}},

// ---------- autobahn ----------
{ c:"autobahn", q:{de:"Welche Fahrzeuge dürfen auf die Autobahn?", ar:"أي مركبات يُسمح لها بدخول الأوتوستراد؟"}, a:[
  {de:"Nur solche, die mindestens 80 km/h fahren können und dürfen.", ar:"فقط التي تستطيع ويُسمح لها بالسير بـ80 كم/س على الأقل."},{de:"Alle Motorfahrzeuge.", ar:"جميع المركبات الآلية."},
  {de:"Motorfahrräder und Traktoren sind ausgeschlossen.", ar:"الدراجات النارية الصغيرة والجرارات مستثناة."}], correct:[0,2], e:{de:"Zu langsame Fahrzeuge gefährden den schnellen Verkehr.", ar:"المركبات البطيئة جداً تعرّض السير السريع للخطر."}},
{ c:"autobahn", q:{de:"Du fährst über den Einspurstreifen auf die Autobahn.", ar:"تدخل إلى الأوتوستراد عبر مسرب التسارع."}, a:[
  {de:"Du beschleunigst auf die Geschwindigkeit des Verkehrs.", ar:"تزيد سرعتك لتطابق حركة السير."},{de:"Du hast Vortritt gegenüber dem Verkehr auf der Autobahn.", ar:"لك الأولوية على السير الموجود على الأوتوستراد."},
  {de:"Du fügst dich in eine Lücke ein.", ar:"تندمج ضمن فراغ مناسب."}], correct:[0,2], e:{de:"Der Verkehr auf der Autobahn hat immer Vortritt.", ar:"السير على الأوتوستراد له الأولوية دائماً."}, scene:"autobahn_einspur"},
{ c:"autobahn", q:{de:"Auf der Autobahn ist die linke Spur dauernd belegt, obwohl rechts frei ist.", ar:"المسرب الأيسر مشغول باستمرار رغم أن اليمين فارغ."}, a:[
  {de:"Das ist nicht erlaubt, du musst rechts fahren, wenn möglich.", ar:"هذا غير مسموح، عليك السير يميناً إن أمكن."},{de:"Nach dem Überholen sofort wieder einordnen.", ar:"بعد التجاوز عُد إلى المسرب فوراً."},
  {de:"Auf der Autobahn darf man dauernd links bleiben.", ar:"يمكن البقاء على اليسار باستمرار على الأوتوستراد."}], correct:[0,1], e:{de:"Die linke Spur ist zum Überholen da, nicht zum Dauerfahren.", ar:"المسرب الأيسر للتجاوز، لا للسير الدائم."}, scene:"autobahn_einspur"},
{ c:"autobahn", q:{de:"Es bildet sich ein Stau auf der Autobahn.", ar:"يتشكّل ازدحام على الأوتوستراد."}, a:[
  {de:"Eine Rettungsgasse bilden.", ar:"تشكيل ممر إنقاذ."},{de:"Die Gasse zwischen der linken Spur und der Spur daneben freihalten.", ar:"إبقاء الممر خالياً بين المسرب الأيسر والمسرب المجاور."},{de:"Auf den Pannenstreifen ausweichen, um Platz zu schaffen.", ar:"الانتقال إلى شريط الأعطال لإفساح المجال."}],
  correct:[0,1], e:{de:"Der Pannenstreifen bleibt frei; die Gasse ist links.", ar:"شريط الأعطال يبقى خالياً؛ ممر الإنقاذ على اليسار."}, scene:"rettungsgasse"},
{ c:"autobahn", q:{de:"Bei drei Fahrstreifen im Stau: wo genau bildet sich die Rettungsgasse?", ar:"عند وجود ثلاثة مسارب أثناء الازدحام: أين يتشكّل ممر الإنقاذ بالضبط؟"}, a:[
  {de:"Zwischen dem äussersten linken und dem mittleren Streifen.", ar:"بين المسرب الأيسر الأقصى والمسرب الأوسط."},{de:"Zwischen dem mittleren und dem rechten Streifen.", ar:"بين المسرب الأوسط والمسرب الأيمن."},{de:"Am rechten Rand, auf dem Pannenstreifen.", ar:"على الحافة اليمنى، على شريط الأعطال."}],
  correct:[0], e:{de:"Immer zwischen der linkesten Spur und der Spur direkt daneben.", ar:"دائماً بين المسرب الأيسر الأقصى والمسرب المجاور له مباشرة."}, scene:"rettungsgasse"},
{ c:"autobahn", q:{de:"Du näherst dich einem Stauende.", ar:"تقترب من نهاية ازدحام."}, a:[
  {de:"Kurz das Warnblinklicht einschalten.", ar:"تشغيل أضواء التحذير لفترة قصيرة."},{de:"Frühzeitig verzögern und den Abstand vergrössern.", ar:"التباطؤ مبكراً وزيادة المسافة."},{de:"Kräftig hupen.", ar:"استعمال البوق بقوة."}],
  correct:[0,1], e:{de:"Auffahrunfälle am Stauende sind besonders häufig.", ar:"حوادث الاصطدام الخلفي عند نهاية الازدحام شائعة جداً."}},
{ c:"autobahn", q:{de:"Wofür ist der Pannenstreifen da?", ar:"ما الغرض من شريط الأعطال؟"}, a:[
  {de:"Für Pannen und Notfälle.", ar:"للأعطال والطوارئ."},{de:"Zum Überholen bei Stau.", ar:"للتجاوز أثناء الازدحام."},{de:"Für Einsatzfahrzeuge.", ar:"لمركبات الطوارئ."}], correct:[0,2],
  e:{de:"Fahren, wenden und rückwärtsfahren sind dort verboten.", ar:"القيادة والاستدارة والرجوع للخلف ممنوعة هناك."}},
{ c:"autobahn", q:{de:"Du hast auf der Autobahn eine Panne.", ar:"أصابك عطل على الأوتوستراد."}, a:[
  {de:"Warnblinker einschalten und Warnweste anziehen.", ar:"تشغيل أضواء التحذير وارتداء السترة."},{de:"Das Pannendreieck mindestens 100 m hinter dem Fahrzeug aufstellen.", ar:"وضع المثلث على بُعد 100 متر على الأقل خلف المركبة."},
  {de:"Im Fahrzeug sitzen bleiben und warten.", ar:"البقاء جالساً في المركبة والانتظار."}], correct:[0,1], e:{de:"Am sichersten ist es hinter der Leitplanke, nicht im Auto.", ar:"الأأمن هو الوقوف خلف الحاجز، لا داخل السيارة."}, scene:"pannendreieck"},
{ c:"autobahn", q:{de:"Du hast die Ausfahrt verpasst.", ar:"فاتتك المخرج."}, a:[
  {de:"Bis zur nächsten Ausfahrt weiterfahren.", ar:"المتابعة حتى المخرج التالي."},{de:"Auf dem Pannenstreifen zurücksetzen.", ar:"الرجوع للخلف على شريط الأعطال."},{de:"Wenden ist auf der Autobahn strikt verboten.", ar:"الاستدارة ممنوعة منعاً باتاً على الأوتوستراد."}],
  correct:[0,2], e:{de:"Rückwärtsfahren und Wenden auf der Autobahn sind extrem gefährlich und verboten.", ar:"الرجوع للخلف والاستدارة على الأوتوستراد خطيران جداً وممنوعان."}},
{ c:"autobahn", q:{de:"Du fährst durch einen langen Autobahntunnel.", ar:"تسير عبر نفق طويل على الأوتوستراد."}, a:[
  {de:"Grösseren Abstand zum Vordermann halten.", ar:"حافظ على مسافة أكبر عن المركبة الأمامية."},{de:"Bei Stau im Tunnel den Motor sofort abstellen und sich entfernen.", ar:"عند الازدحام في النفق أطفئ المحرك فوراً وابتعد."},{de:"Nur bei Feuer das Fahrzeug verlassen.", ar:"لا تغادر المركبة إلا عند الحريق."}],
  correct:[0,2], e:{de:"Ausser bei Feuer bleibst du besser im Fahrzeug und wartest auf Anweisungen.", ar:"باستثناء الحريق، من الأفضل البقاء في المركبة وانتظار التعليمات."}, scene:"tunnel"},
{ c:"autobahn", q:{de:"Wann muss eine Rettungsgasse gebildet werden?", ar:"متى يجب تشكيل ممر الإنقاذ؟"}, a:[
  {de:"Sobald der Verkehr zum Stillstand kommt oder sich stark staut.", ar:"بمجرد أن يتوقف السير أو يزدحم بشدة."},{de:"Erst wenn ein Einsatzfahrzeug mit Sirene sichtbar ist.", ar:"فقط عند ظهور مركبة طوارئ بصفارتها."},{de:"Nur auf Anweisung der Polizei.", ar:"فقط بناءً على تعليمات الشرطة."}],
  correct:[0], e:{de:"Wer erst beim Herannahen des Einsatzfahrzeugs reagiert, ist zu spät.", ar:"من يتفاعل فقط عند اقتراب مركبة الطوارئ يكون قد تأخّر."}, scene:"rettungsgasse_bildung"},
{ c:"autobahn", q:{de:"Für welche Fahrzeuge brauchst du auf der Autobahn eine Vignette?", ar:"لأي المركبات تحتاج ملصق الأوتوستراد؟"}, a:[
  {de:"Für Personenwagen bis 3.5 t.", ar:"للسيارات حتى 3.5 طن."},{de:"Auch für Motorräder.", ar:"وأيضاً للدراجات النارية."},{de:"Nur für Fahrzeuge mit ausländischem Kontrollschild.", ar:"فقط للمركبات ذات اللوحات الأجنبية."}],
  correct:[0,1], e:{de:"Die Vignette gilt fahrzeugbezogen, unabhängig von der Herkunft des Schilds.", ar:"الملصق يرتبط بالمركبة، بصرف النظر عن بلد اللوحة."}},
{ c:"autobahn", q:{de:"Auf der Autobahn zeigt eine Anzeige über der Spur ein grünes Pfeilsymbol statt eines roten Kreuzes.", ar:"تُظهر لوحة فوق المسرب سهماً أخضر بدل صليب أحمر على الأوتوستراد."}, a:[
  {de:"Die Spur ist für den Verkehr freigegeben.", ar:"المسرب مفتوح للسير."},{de:"Ein rotes Kreuz würde die Spur sperren.", ar:"الصليب الأحمر كان سيغلق المسرب."},{de:"Solche Anzeigen betreffen nur Lastwagen.", ar:"تخص هذه اللوحات الشاحنات فقط."}],
  correct:[0,1], e:{de:"Dynamische Verkehrsführung kann Pannenstreifen temporär freigeben.", ar:"إدارة السير الديناميكية قد تفتح شريط الأعطال مؤقتاً."}},

// ---------- mensch ----------
{ c:"mensch", q:{de:"Welche allgemeine Alkoholgrenze gilt in der Schweiz?", ar:"ما الحد العام للكحول في سويسرا؟"}, a:[
  {de:"0,5 Promille im Blut.", ar:"0.5 بالألف في الدم."},{de:"0,25 mg/l in der Atemluft.", ar:"0.25 ملغ/ل في هواء الزفير."},{de:"0,8 Promille im Blut.", ar:"0.8 بالألف في الدم."}],
  correct:[0,1], e:{de:"Ab 0,8 Promille gilt eine qualifizierte Widerhandlung.", ar:"ابتداءً من 0.8 بالألف تُعتبر مخالفة مشدَّدة."}, scene:"promille_diagramm"},
{ c:"mensch", q:{de:"Du hast den Führerausweis auf Probe. Welche Alkoholgrenze gilt für dich?", ar:"لديك رخصة تجريبية. ما حد الكحول المنطبق عليك؟"}, a:[
  {de:"Nulltoleranz, praktisch 0,0 Promille.", ar:"صفر تسامح، أي 0.0 بالألف عملياً."},{de:"0,5 Promille wie für alle.", ar:"0.5 بالألف كما للجميع."},{de:"Die gleiche Regel gilt für Fahrschüler und Begleitpersonen.", ar:"نفس القاعدة تنطبق على المتدربين والمرافقين."}],
  correct:[0,2], e:{de:"Auch Berufsfahrer und Fahrlehrer fallen unter die Nulltoleranz.", ar:"السائقون المحترفون ومعلّمو القيادة أيضاً تحت صفر التسامح."}},
{ c:"mensch", q:{de:"Wie schnell baut der Körper Alkohol ab?", ar:"بأي سرعة يتخلص الجسم من الكحول؟"}, a:[
  {de:"Etwa 0,1 Promille pro Stunde.", ar:"نحو 0.1 بالألف في الساعة."},{de:"Etwa 0,5 Promille pro Stunde.", ar:"نحو 0.5 بالألف في الساعة."},{de:"Kaffee und kalte Dusche beschleunigen den Abbau nicht.", ar:"القهوة والاستحمام البارد لا يسرّعان التخلص منه."}],
  correct:[0,2], e:{de:"Nur Zeit hilft. Nach einer durchzechten Nacht bist du morgens noch belastet.", ar:"الوقت وحده ينفع. بعد ليلة شرب تبقى النسبة مرتفعة صباحاً."}, scene:"promille_diagramm"},
{ c:"mensch", q:{de:"Du wirst beim Fahren sehr müde.", ar:"يشتد بك التعب أثناء القيادة."}, a:[
  {de:"Anhalten und 15 bis 20 Minuten schlafen.", ar:"التوقف والنوم من 15 إلى 20 دقيقة."},{de:"Fenster öffnen und laute Musik.", ar:"فتح النافذة وموسيقى صاخبة."},{de:"Eine echte Pause einlegen.", ar:"أخذ استراحة حقيقية."}],
  correct:[0,2], e:{de:"Frische Luft und Musik wirken nur wenige Minuten.", ar:"الهواء والموسيقى يفيدان لدقائق قليلة فقط."}},
{ c:"mensch", q:{de:"Wie weit fährst du bei 100 km/h in 2 Sekunden Sekundenschlaf?", ar:"كم تقطع عند 100 كم/س خلال غفوة من ثانيتين؟"}, a:[
  {de:"Rund 55 m.", ar:"نحو 55 متراً."},{de:"Rund 20 m.", ar:"نحو 20 متراً."},{de:"Rund 100 m.", ar:"نحو 100 متر."}], correct:[0], e:{de:"100 km/h sind knapp 28 m pro Sekunde.", ar:"سرعة 100 كم/س تعادل نحو 28 متراً في الثانية."}},
{ c:"mensch", q:{de:"Was gilt für Medikamente am Steuer?", ar:"ما الذي ينطبق على الأدوية أثناء القيادة؟"}, a:[
  {de:"Beipackzettel lesen und im Zweifel Arzt oder Apotheker fragen.", ar:"اقرأ النشرة واسأل الطبيب أو الصيدلي عند الشك."},{de:"Rezeptfreie Medikamente sind immer unbedenklich.", ar:"الأدوية بلا وصفة آمنة دائماً."},
  {de:"Manche Medikamente machen müde oder verlangsamen die Reaktion.", ar:"بعض الأدوية تسبب النعاس أو تُبطئ رد الفعل."}], correct:[0,2], e:{de:"Auch rezeptfreie Mittel können die Fahrfähigkeit beeinträchtigen.", ar:"حتى الأدوية بلا وصفة قد تُضعف القدرة على القيادة."}},
{ c:"mensch", q:{de:"Was gilt für Cannabis am Steuer?", ar:"ما الذي ينطبق على الحشيش أثناء القيادة؟"}, a:[
  {de:"Es gilt Nulltoleranz.", ar:"ينطبق صفر تسامح."},{de:"Eine kleine Menge ist erlaubt.", ar:"كمية قليلة مسموحة."},{de:"Die Wirkung kann viele Stunden anhalten.", ar:"قد يستمر المفعول ساعات طويلة."}], correct:[0,2],
  e:{de:"Für Betäubungsmittel gibt es keinen Grenzwert wie beim Alkohol.", ar:"لا يوجد حد مسموح للمخدرات كما هو الحال مع الكحول."}},
{ c:"mensch", q:{de:"Warum sind Stress und Zeitdruck beim Fahren gefährlich?", ar:"لماذا يُعد التوتر وضغط الوقت خطيرين أثناء القيادة؟"}, a:[
  {de:"Sie führen zu riskanteren Entscheidungen und weniger Geduld.", ar:"يؤديان إلى قرارات أكثر خطورة وصبر أقل."},{de:"Sie haben keinen Einfluss auf die Fahrsicherheit.", ar:"ليس لهما تأثير على سلامة القيادة."},{de:"Regelmässige Pausen wirken dem entgegen.", ar:"الاستراحات المنتظمة تخفّف من ذلك."}],
  correct:[0,2], e:{de:"Frühzeitig losfahren senkt den Zeitdruck spürbar.", ar:"الانطلاق مبكراً يخفّف ضغط الوقت بشكل ملموس."}},
{ c:"mensch", q:{de:"Du hast Grippe mit Fieber, fühlst dich schwach und schwindlig.", ar:"مصاب بإنفلونزا وحمّى، وتشعر بضعف ودوار."}, a:[
  {de:"Deine Fahrfähigkeit kann erheblich eingeschränkt sein.", ar:"قد تكون قدرتك على القيادة محدودة بشكل كبير."},{de:"Fieber allein hat keinen Einfluss auf die Reaktionsfähigkeit.", ar:"الحمّى وحدها ليس لها تأثير على القدرة على رد الفعل."},{de:"Besser auf das Fahren verzichten oder jemand anderen fahren lassen.", ar:"من الأفضل الامتناع عن القيادة أو ترك شخص آخر يقود."}],
  correct:[0,2], e:{de:"Krankheit wirkt ähnlich wie Müdigkeit oder Alkohol auf die Konzentration.", ar:"المرض يؤثر على التركيز بشكل مشابه للتعب أو الكحول."}},
{ c:"mensch", q:{de:"Ein Mitfahrer diskutiert lautstark und lenkt dich stark ab.", ar:"راكب يتحدث بصوت عالٍ ويشتت انتباهك بشدة."}, a:[
  {de:"Konzentration auf den Verkehr geht immer vor.", ar:"التركيز على السير له الأولوية دائماً."},{de:"Du darfst höflich um Ruhe bitten oder anhalten.", ar:"يمكنك أن تطلب بلطف الهدوء أو أن تتوقف."},{de:"Ablenkung durch Gespräche ist rechtlich unbedeutend.", ar:"التشتت بسبب الحديث غير مهم قانونياً."}],
  correct:[0,1], e:{de:"Auch Gespräche zählen zu den Ablenkungen, die die Grundregel verletzen können.", ar:"حتى الأحاديث تُعد من مصادر التشتت التي قد تنتهك القاعدة الأساسية."}},
{ c:"mensch", q:{de:"Im Führerausweis ist eine Brillenpflicht vermerkt.", ar:"مذكور في رخصتك إلزامية ارتداء النظارات."}, a:[
  {de:"Du musst beim Fahren immer eine Sehhilfe tragen.", ar:"يجب عليك ارتداء وسيلة تصحيح النظر دائماً أثناء القيادة."},{de:"Das gilt nur bei schlechtem Wetter.", ar:"ينطبق ذلك فقط في الطقس السيئ."},{de:"Bei Kontrollen kann das überprüft werden.", ar:"يمكن التحقق من ذلك أثناء المراقبة."}],
  correct:[0,2], e:{de:"Fahren ohne die vorgeschriebene Sehhilfe ist eine Widerhandlung.", ar:"القيادة بلا وسيلة التصحيح المطلوبة تُعد مخالفة."}},
{ c:"mensch", q:{de:"Du willst während der Fahrt das Navigationsgerät neu programmieren.", ar:"تريد إعادة برمجة جهاز الملاحة أثناء القيادة."}, a:[
  {de:"Vor der Fahrt eingeben oder an einem sicheren Ort anhalten.", ar:"أدخِله قبل الانطلاق أو توقف في مكان آمن."},{de:"Ein kurzer Blick während der Fahrt genügt problemlos.", ar:"نظرة سريعة أثناء القيادة كافية دون مشكلة."},{de:"Die Ablenkung erhöht das Unfallrisiko deutlich.", ar:"يزيد التشتت من خطر الحوادث بشكل ملحوظ."}],
  correct:[0,2], e:{de:"Schon wenige Sekunden Blickabwendung entsprechen vielen Metern blinder Fahrt.", ar:"حتى بضع ثوانٍ من تحويل النظر تعادل أمتاراً عديدة من القيادة بلا رؤية."}},
{ c:"mensch", q:{de:"Es ist spät nach einer durchzechten Nacht, du willst am frühen Morgen fahren.", ar:"الوقت متأخر بعد ليلة شرب، وتريد القيادة في الصباح الباكر."}, a:[
  {de:"Restalkohol kann auch Stunden später über der Grenze liegen.", ar:"قد تبقى بقايا الكحول فوق الحد المسموح حتى بعد ساعات."},{de:"Schlaf allein garantiert nüchternes Fahren.", ar:"النوم وحده يضمن قيادة صافية الذهن."},{de:"Im Zweifel besser nicht fahren oder testen lassen.", ar:"عند الشك من الأفضل عدم القيادة أو إجراء فحص."}],
  correct:[0,2], e:{de:"Der Körper baut Alkohol nur mit rund 0,1 Promille pro Stunde ab.", ar:"يتخلص الجسم من الكحول بمعدل 0.1 بالألف في الساعة فقط."}},

// ---------- fahrzeug ----------
{ c:"fahrzeug", q:{de:"Wie gross ist die gesetzliche Mindestprofiltiefe?", ar:"ما الحد الأدنى القانوني لعمق نقش الإطار؟"}, a:[
  {de:"1,6 mm.", ar:"1.6 مم."},{de:"3 mm.", ar:"3 مم."},{de:"4 mm werden im Winter empfohlen.", ar:"يُنصح بـ4 مم في الشتاء."}], correct:[0,2],
  e:{de:"1,6 mm ist das gesetzliche Minimum, nicht das sichere Mass.", ar:"1.6 مم هو الحد القانوني وليس المقدار الآمن."}, scene:"reifen_profil"},
{ c:"fahrzeug", q:{de:"Sind Winterreifen in der Schweiz Pflicht?", ar:"هل الإطارات الشتوية إلزامية في سويسرا؟"}, a:[
  {de:"Nein, es gibt keine allgemeine Pflicht.", ar:"لا، لا يوجد إلزام عام."},{de:"Ja, von Oktober bis April.", ar:"نعم، من أكتوبر إلى أبريل."},{de:"Bei einem Unfall auf Schnee haftest du mit Sommerreifen mit.", ar:"عند حادث على الثلج تتحمّل مسؤولية بإطارات صيفية."}],
  correct:[0,2], e:{de:"Ohne passende Reifen gilt das Fahrzeug als nicht betriebssicher.", ar:"بدون إطارات مناسبة تُعتبر المركبة غير صالحة للسير بأمان."}},
{ c:"fahrzeug", q:{de:"Was bewirkt zu tiefer Reifendruck?", ar:"ماذا يسبب انخفاض ضغط الإطارات؟"}, a:[
  {de:"Höheren Treibstoffverbrauch.", ar:"زيادة استهلاك الوقود."},{de:"Längeren Bremsweg und stärkere Abnutzung.", ar:"مسافة كبح أطول وتآكل أكبر."},{de:"Besseren Grip bei Nässe.", ar:"تماسك أفضل على الطريق المبلل."}], correct:[0,1],
  e:{de:"Der Reifen verformt sich stärker und wird heiss.", ar:"يتشوّه الإطار أكثر ويسخن."}},
{ c:"fahrzeug", q:{de:"Wann musst du das Fernlicht abblenden?", ar:"متى يجب خفض الضوء العالي؟"}, a:[
  {de:"Bei Gegenverkehr.", ar:"عند وجود سير مقابل."},{de:"Wenn du dicht hinter einem Fahrzeug fährst.", ar:"عند السير قريباً خلف مركبة."},{de:"Auf dunklen Landstrassen ohne Verkehr.", ar:"على طرق ريفية مظلمة بلا حركة سير."}],
  correct:[0,1], e:{de:"Ohne Verkehr ist Fernlicht ausserorts erwünscht.", ar:"بدون حركة سير، يُستحسن الضوء العالي خارج المدن."}},
{ c:"fahrzeug", q:{de:"Wann darfst du das Nebelschlusslicht einschalten?", ar:"متى يجوز تشغيل ضوء الضباب الخلفي؟"}, a:[
  {de:"Wenn die Sicht unter 50 m sinkt.", ar:"عندما تقل الرؤية عن 50 متراً."},{de:"Bei jedem Regen.", ar:"عند أي مطر."},{de:"Bei normaler Sicht blendet es die Nachfolgenden.", ar:"عند الرؤية العادية يُبهر من خلفك."}], correct:[0,2],
  e:{de:"Es ist sehr hell und darf nur bei dichtem Nebel brennen.", ar:"إنه شديد السطوع ولا يُستعمل إلا في الضباب الكثيف."}},
{ c:"fahrzeug", q:{de:"Was bewirkt ABS?", ar:"ما وظيفة نظام ABS؟"}, a:[
  {de:"Es verhindert das Blockieren der Räder.", ar:"يمنع انغلاق العجلات."},{de:"Das Fahrzeug bleibt beim Vollbremsen lenkbar.", ar:"تبقى المركبة قابلة للتوجيه أثناء الكبح الشديد."},{de:"Der Bremsweg wird immer kürzer.", ar:"تقصر مسافة الكبح دائماً."}],
  correct:[0,1], e:{de:"Auf Schnee oder Kies kann der Bremsweg mit ABS sogar länger sein.", ar:"على الثلج أو الحصى قد تطول مسافة الكبح مع ABS."}, scene:"armaturenbrett"},
{ c:"fahrzeug", q:{de:"Welche Farbe hat eine Warnleuchte, die eine akute Gefahr anzeigt?", ar:"ما لون ضوء التحذير الذي يُشير إلى خطر فوري؟"}, a:[
  {de:"Rot.", ar:"أحمر."},{de:"Grün.", ar:"أخضر."},{de:"Gelb oder orange zeigt meist eine weniger dringende Störung an.", ar:"الأصفر أو البرتقالي يُشير عادة إلى عطل أقل إلحاحاً."}], correct:[0,2],
  e:{de:"Bei roten Warnleuchten solltest du möglichst bald sicher anhalten.", ar:"عند الأضواء الحمراء يُستحسن التوقف بأمان في أقرب وقت."}, scene:"armaturenbrett"},
{ c:"fahrzeug", q:{de:"Du transportierst Werkzeug auf der Rückbank.", ar:"تنقل أدوات على المقعد الخلفي."}, a:[
  {de:"Die Ladung muss gesichert sein.", ar:"يجب تثبيت الحمولة."},{de:"Lose Gegenstände werden beim Aufprall zu Geschossen.", ar:"الأغراض غير المثبّتة تتحول إلى قذائف عند الاصطدام."},{de:"Bis 10 kg braucht es keine Sicherung.", ar:"حتى 10 كغ لا حاجة للتثبيت."}],
  correct:[0,1], e:{de:"Bei 50 km/h wirkt ein Gegenstand mit vielfachem Gewicht.", ar:"عند 50 كم/س يؤثر الجسم بوزن يعادل أضعاف وزنه."}, scene:"ladung_sichern"},
{ c:"fahrzeug", q:{de:"Was hilft ESP?", ar:"بماذا يساعد نظام ESP؟"}, a:[
  {de:"Es stabilisiert das Fahrzeug bei drohendem Schleudern.", ar:"يُثبّت المركبة عند خطر الانزلاق الجانبي."},{de:"Es hebt die Gesetze der Physik auf.", ar:"يُلغي قوانين الفيزياء."},{de:"Es greift automatisch und unbemerkt in kritischen Situationen ein.", ar:"يتدخّل تلقائياً وبشكل غير ملحوظ في الحالات الحرجة."}],
  correct:[0,2], e:{de:"Trotzdem bleibt vorausschauendes Fahren die beste Sicherheit.", ar:"رغم ذلك تبقى القيادة الاستباقية أفضل وسيلة للأمان."}},
{ c:"fahrzeug", q:{de:"Darfst du Sommer- und Winterreifen an derselben Achse mischen?", ar:"هل يجوز خلط إطارات صيفية وشتوية على نفس المحور؟"}, a:[
  {de:"Nein, das beeinträchtigt die Fahrstabilität.", ar:"لا، يُضعف ذلك استقرار القيادة."},{de:"Ja, solange das Profil ausreichend tief ist.", ar:"نعم، طالما أن عمق النقش كافٍ."},{de:"Unterschiedliches Verhalten links und rechts kann zu Schleudern führen.", ar:"اختلاف السلوك بين اليمين واليسار قد يؤدي إلى انزلاق."}],
  correct:[0,2], e:{de:"Beide Reifen einer Achse sollten immer vom gleichen Typ sein.", ar:"يجب أن يكون إطارا المحور الواحد من النوع نفسه دائماً."}},
{ c:"fahrzeug", q:{de:"Ein Kleinkind unter 150 cm soll mitfahren.", ar:"طفل صغير طوله أقل من 150 سم سيرافقك."}, a:[
  {de:"Es braucht einen geprüften Kindersitz.", ar:"يحتاج مقعد أطفال معتمداً."},{de:"Vorne nur, wenn der Airbag deaktiviert ist.", ar:"في الأمام فقط إذا كانت الوسادة الهوائية معطّلة."},{de:"Ab 100 cm reicht der normale Gurt.", ar:"من 100 سم يكفي الحزام العادي."}],
  correct:[0,1], e:{de:"Die Pflicht gilt bis 12 Jahre oder 150 cm, je nachdem was zuerst erreicht wird.", ar:"الإلزامية سارية حتى 12 سنة أو 150 سم، أيهما يتحقق أولاً."}, scene:"kindersitz"},
{ c:"fahrzeug", q:{de:"Ein Signal schreibt für einen Streckenabschnitt Schneeketten vor.", ar:"إشارة تفرض استعمال سلاسل الثلج لمقطع من الطريق."}, a:[
  {de:"Du musst die Ketten vor der Weiterfahrt montieren.", ar:"يجب تركيب السلاسل قبل متابعة السير."},{de:"Meist werden die Antriebsräder bekettet.", ar:"عادة تُركّب على عجلات الدفع."},{de:"Das Signal ist nur eine unverbindliche Empfehlung.", ar:"الإشارة مجرد توصية غير ملزمة."}],
  correct:[0,1], e:{de:"Ohne Ketten darfst du den markierten Abschnitt nicht befahren.", ar:"بلا سلاسل لا يجوز السير في المقطع المعلَّم."}, scene:"schneeketten"},

// ---------- umwelt ----------
{ c:"umwelt", q:{de:"Wie fährst du treibstoffsparend?", ar:"كيف تقود موفّراً للوقود؟"}, a:[
  {de:"Früh hochschalten, etwa bei 2000 Umdrehungen.", ar:"بدّل إلى غيار أعلى مبكراً، عند نحو 2000 دورة."},{de:"Vorausschauend fahren und rollen lassen.", ar:"القيادة الاستباقية والانسياب."},{de:"Möglichst lange im tiefen Gang bleiben.", ar:"البقاء أطول فترة في غيار منخفض."}],
  correct:[0,1], e:{de:"Hohe Drehzahlen verbrauchen viel und sind laut.", ar:"الدوران العالي يستهلك كثيراً ويصدر ضجيجاً."}},
{ c:"umwelt", q:{de:"Du stehst an einem langen Rotlicht.", ar:"تقف عند ضوء أحمر طويل."}, a:[
  {de:"Den Motor abstellen.", ar:"إطفاء المحرك."},{de:"Den Motor laufen lassen, das schont ihn.", ar:"ترك المحرك يعمل، فهذا أفضل له."},{de:"Ab etwa 20 Sekunden lohnt sich das Abstellen.", ar:"ابتداءً من نحو 20 ثانية يكون الإطفاء مجدياً."}], correct:[0,2],
  e:{de:"Moderne Start-Stopp-Systeme machen genau das automatisch.", ar:"أنظمة التشغيل والإيقاف الحديثة تفعل ذلك تلقائياً."}},
{ c:"umwelt", q:{de:"Der Motor ist kalt.", ar:"المحرك بارد."}, a:[
  {de:"Sofort losfahren und schonend fahren.", ar:"الانطلاق فوراً والقيادة بلطف."},{de:"Im Stand warmlaufen lassen.", ar:"تركه يسخن وهو واقف."},{de:"Der Verbrauch ist beim Kaltstart am höchsten.", ar:"الاستهلاك في ذروته عند التشغيل البارد."}], correct:[0,2],
  e:{de:"Warmlaufenlassen im Stand ist verboten und schadet dem Motor.", ar:"ترك المحرك يسخن واقفاً ممنوع ويضر بالمحرك."}},
{ c:"umwelt", q:{de:"Was erhöht den Verbrauch merklich?", ar:"ما الذي يزيد الاستهلاك بشكل ملحوظ؟"}, a:[
  {de:"Dachbox und Dachträger.", ar:"صندوق السقف وحمالة السقف."},{de:"Unnötiges Gewicht im Kofferraum.", ar:"وزن زائد بلا داعٍ في الصندوق."},{de:"Ein voller Reifendruck.", ar:"ضغط إطارات ممتلئ."}], correct:[0,1],
  e:{de:"Korrekter Reifendruck senkt den Verbrauch.", ar:"ضغط الإطارات الصحيح يخفّض الاستهلاك."}},
{ c:"umwelt", q:{de:"Warum ist eine defensive, vorausschauende Fahrweise auch ökologisch sinnvoll?", ar:"لماذا تُعد القيادة الدفاعية الاستباقية منطقية بيئياً أيضاً؟"}, a:[
  {de:"Weniger abruptes Bremsen und Beschleunigen spart Treibstoff.", ar:"الكبح والتسارع الأقل حدة يوفّران الوقود."},{de:"Sie verschleisst Bremsen und Reifen weniger.", ar:"تُقلّل من تآكل الفرامل والإطارات."},{de:"Sie hat keinen Zusammenhang mit dem Verbrauch.", ar:"لا علاقة لها بالاستهلاك."}],
  correct:[0,1], e:{de:"Ruhiges Fahren schont Umwelt, Fahrzeug und Nerven gleichzeitig.", ar:"القيادة الهادئة تحمي البيئة والمركبة والأعصاب معاً."}},
{ c:"umwelt", q:{de:"Du fährst ein Elektrofahrzeug durch eine ruhige Wohnstrasse.", ar:"تقود مركبة كهربائية في شارع سكني هادئ."}, a:[
  {de:"Elektrofahrzeuge sind sehr leise und werden von Fussgängern oft überhört.", ar:"المركبات الكهربائية هادئة جداً وغالباً لا يسمعها المشاة."},{de:"Besondere Vorsicht gegenüber Kindern und älteren Menschen ist angebracht.", ar:"الحذر الإضافي مطلوب تجاه الأطفال وكبار السن."},{de:"Weil sie emissionsfrei sind, gelten geringere Sorgfaltspflichten.", ar:"لأنها بلا انبعاثات، تنطبق عليها واجبات حذر أقل."}],
  correct:[0,1], e:{de:"Die Verkehrsregeln gelten für alle Antriebsarten gleichermassen.", ar:"قواعد المرور تنطبق على جميع أنواع الدفع بالتساوي."}},
{ c:"umwelt", q:{de:"Klimaanlage und elektrische Verbraucher im Auto.", ar:"مكيّف الهواء والأجهزة الكهربائية في السيارة."}, a:[
  {de:"Sie erhöhen den Treibstoff- beziehungsweise Energieverbrauch.", ar:"تزيد استهلاك الوقود أو الطاقة."},{de:"Massvoller Gebrauch spart Ressourcen.", ar:"الاستخدام المعتدل يوفّر الموارد."},{de:"Sie haben keinerlei Einfluss auf den Verbrauch.", ar:"ليس لها أي تأثير على الاستهلاك."}],
  correct:[0,1], e:{de:"Vor allem bei Elektrofahrzeugen wirkt sich das spürbar auf die Reichweite aus.", ar:"يؤثر ذلك بشكل ملحوظ على مدى القيادة خاصة في المركبات الكهربائية."}},

// ---------- notfall ----------
{ c:"notfall", q:{de:"In welcher Reihenfolge handelst du am Unfallort?", ar:"بأي ترتيب تتصرف في مكان الحادث؟"}, a:[
  {de:"Sichern, Nothilfe leisten, alarmieren.", ar:"التأمين، الإسعاف، ثم الاتصال بالطوارئ."},{de:"Alarmieren, sichern, Nothilfe leisten.", ar:"الاتصال، التأمين، ثم الإسعاف."},{de:"Zuerst Fotos für die Versicherung machen.", ar:"التقاط صور للتأمين أولاً."}], correct:[0],
  e:{de:"Ohne Sicherung gefährdest du dich und andere zusätzlich.", ar:"بدون تأمين المكان تعرّض نفسك والآخرين لخطر إضافي."}},
{ c:"notfall", q:{de:"Wie weit hinter dem Fahrzeug stellst du das Pannendreieck auf?", ar:"على أي بُعد خلف المركبة تضع مثلث التحذير؟"}, a:[
  {de:"Ausserorts mindestens 50 m.", ar:"خارج المدن 50 متراً على الأقل."},{de:"Auf der Autobahn mindestens 100 m.", ar:"على الأوتوستراد 100 متر على الأقل."},{de:"Immer genau 10 m.", ar:"دائماً 10 أمتار بالضبط."}], correct:[0,1],
  e:{de:"Je schneller der Verkehr, desto weiter zurück.", ar:"كلما زادت سرعة السير، زادت المسافة إلى الخلف."}, scene:"pannendreieck"},
{ c:"notfall", q:{de:"Welche Nummer rufst du für die Sanität?", ar:"أي رقم تتصل به للإسعاف؟"}, a:[
  {de:"144.", ar:"144."},{de:"117.", ar:"117."},{de:"112 funktioniert ebenfalls.", ar:"الرقم 112 يعمل أيضاً."}], correct:[0,2], e:{de:"117 ist die Polizei, 118 die Feuerwehr, 1414 die Rega.", ar:"117 للشرطة، 118 للإطفاء، 1414 لريغا."}},
{ c:"notfall", q:{de:"Eine verletzte Person ist bewusstlos, atmet aber.", ar:"شخص مصاب فاقد للوعي لكنه يتنفس."}, a:[
  {de:"In die stabile Seitenlage bringen.", ar:"ضعه في وضعية الأمان الجانبية."},{de:"Die Atmung überwachen.", ar:"راقب تنفسه."},{de:"Ihr etwas zu trinken geben.", ar:"أعطه شيئاً ليشربه."}], correct:[0,1],
  e:{de:"Bewusstlosen nie etwas einflössen.", ar:"لا تُعطِ فاقد الوعي أي شيء عن طريق الفم أبداً."}, scene:"sichere_seitenlage"},
{ c:"notfall", q:{de:"Was ist der erste Schritt bei einer bewusstlosen, atmenden Person?", ar:"ما الخطوة الأولى مع شخص فاقد للوعي يتنفس؟"}, a:[
  {de:"Kopf überstrecken und Atemweg freimachen.", ar:"إمالة الرأس للخلف وتحرير مجرى التنفس."},{de:"Sofort mit Herzdruckmassage beginnen.", ar:"البدء فوراً بتدليك القلب."},{de:"In die stabile Seitenlage drehen.", ar:"وضعه في وضعية الأمان الجانبية."}], correct:[0,2],
  e:{de:"Herzdruckmassage ist nur bei fehlender Atmung nötig.", ar:"تدليك القلب ضروري فقط عند غياب التنفس."}, scene:"sichere_seitenlage"},
{ c:"notfall", q:{de:"Du beschädigst beim Parkieren ein fremdes Auto. Niemand ist da.", ar:"تُلحق ضرراً بسيارة أخرى أثناء الركن ولا أحد موجود."}, a:[
  {de:"Du musst unverzüglich die Polizei benachrichtigen.", ar:"يجب إبلاغ الشرطة دون تأخير."},{de:"Eine Notiz mit deiner Nummer hinter den Scheibenwischer genügt.", ar:"تكفي ورقة برقمك تحت المسّاحة."},{de:"Du darfst einfach wegfahren, wenn der Schaden klein ist.", ar:"يمكنك المغادرة إذا كان الضرر بسيطاً."}],
  correct:[0], e:{de:"Eine Notiz allein befreit dich nicht; Wegfahren ist Fahrerflucht.", ar:"الورقة وحدها لا تُعفيك؛ والمغادرة تُعد هروباً من الحادث."}},
{ c:"notfall", q:{de:"Bei einem Unfall gibt es Verletzte.", ar:"في حادث وقعت إصابات."}, a:[
  {de:"Die Polizei muss immer aufgeboten werden.", ar:"يجب استدعاء الشرطة دائماً."},{de:"Die Beteiligten dürfen sich privat einigen.", ar:"يمكن للأطراف التسوية فيما بينهم."},{de:"Die Unfallstelle darf nicht unnötig verändert werden.", ar:"لا يجوز تغيير مكان الحادث بلا داعٍ."}], correct:[0,2],
  e:{de:"Ändern darfst du nur, was zur Rettung oder Sicherung nötig ist.", ar:"لا تُغيّر إلا ما يلزم للإنقاذ أو تأمين المكان."}},
{ c:"notfall", q:{de:"Welche Ausrüstung ist im Auto sinnvoll mitzuführen?", ar:"ما التجهيزات المفيد حملها في السيارة؟"}, a:[
  {de:"Warnweste und Pannendreieck.", ar:"سترة عاكسة ومثلث تحذير."},{de:"Ein Verbandskasten.", ar:"حقيبة إسعافات أولية."},{de:"Diese Ausrüstung ist gesetzlich vollkommen bedeutungslos.", ar:"هذه التجهيزات عديمة الأهمية قانونياً بالكامل."}],
  correct:[0,1], e:{de:"Im Notfall zählt jede Minute; griffbereite Ausrüstung hilft schnell.", ar:"في الطوارئ كل دقيقة مهمة؛ التجهيزات في متناول اليد تساعد بسرعة."}},
{ c:"notfall", q:{de:"Im Motorraum deines Fahrzeugs siehst du Rauch und Flammen.", ar:"ترى دخاناً ولهباً في حجرة المحرك."}, a:[
  {de:"Fahrzeug verlassen und Abstand halten.", ar:"غادر المركبة وابتعد."},{de:"Die Feuerwehr alarmieren.", ar:"اتصل بالإطفاء."},{de:"Sofort die Motorhaube öffnen, um nachzusehen.", ar:"افتح غطاء المحرك فوراً لتفقّد الأمر."}],
  correct:[0,1], e:{de:"Offene Flammen bekommen beim Öffnen der Haube zusätzlichen Sauerstoff.", ar:"اللهب المكشوف يحصل على أكسجين إضافي عند فتح الغطاء."}},
{ c:"notfall", q:{de:"Du hast einen Unfall mit einem Wildtier.", ar:"وقع لك حادث مع حيوان بري."}, a:[
  {de:"Die Unfallstelle sichern.", ar:"أمّن مكان الحادث."},{de:"Polizei oder Jagdaufseher informieren.", ar:"أبلغ الشرطة أو حارس الصيد."},{de:"Das verletzte Tier selbst anfassen und wegtragen.", ar:"المس الحيوان المصاب وانقله بنفسك."}],
  correct:[0,1], e:{de:"Ein verletztes Wildtier kann gefährlich reagieren, überlasse es Fachleuten.", ar:"قد يتصرف الحيوان البري المصاب بخطورة، اترك الأمر للمختصين."}},
{ c:"notfall", q:{de:"Als Ersthelfer kommst du an einen frischen Unfallort mit fliessendem Verkehr.", ar:"تصل كمسعف أول إلى مكان حادث حديث مع استمرار حركة السير."}, a:[
  {de:"Zuerst dich selbst und die Unfallstelle sichern.", ar:"أمّن نفسك ومكان الحادث أولاً."},{de:"Warnweste anziehen, bevor du aussteigst.", ar:"ارتدِ السترة العاكسة قبل النزول."},{de:"Sofort ohne Rücksicht auf den Verkehr zu den Verletzten laufen.", ar:"اركض فوراً نحو المصابين دون اعتبار لحركة السير."}],
  correct:[0,1], e:{de:"Ein zweiter Unfall durch einen ungeschützten Helfer hilft niemandem.", ar:"وقوع حادث ثانٍ بسبب مسعف غير محمي لا يفيد أحداً."}},

// ---------- ausweis ----------
{ c:"ausweis", q:{de:"Wie läuft die Theorieprüfung ab?", ar:"كيف يجري الامتحان النظري؟"}, a:[
  {de:"50 Fragen in 45 Minuten.", ar:"50 سؤالاً في 45 دقيقة."},{de:"Ab mehr als 15 Fehlerpunkten ist sie nicht bestanden.", ar:"يُعتبر راسباً من تجاوز 15 نقطة خطأ."},{de:"20 Fragen in 30 Minuten.", ar:"20 سؤالاً في 30 دقيقة."}], correct:[0,1],
  e:{de:"Pro Frage können eine oder zwei Antworten richtig sein.", ar:"لكل سؤال قد تكون إجابة واحدة أو اثنتان صحيحة."}},
{ c:"ausweis", q:{de:"In welchen Sprachen kann man im Kanton Solothurn die Theorieprüfung ablegen?", ar:"بأي لغات يمكن أداء الامتحان النظري في كانتون زولوتورن؟"}, a:[
  {de:"Deutsch, Französisch, Italienisch.", ar:"الألمانية والفرنسية والإيطالية."},{de:"Englisch, aber nur für die Basistheorie Kategorie B.", ar:"الإنجليزية، لكن للنظري الأساسي فئة B فقط."},{de:"Arabisch.", ar:"العربية."}], correct:[0,1],
  e:{de:"Arabisch wird nicht angeboten. Lerne die Begriffe in der Prüfungssprache.", ar:"العربية غير متاحة. تعلّم المصطلحات بلغة الامتحان."}},
{ c:"ausweis", q:{de:"Wie lange ist der Lernfahrausweis der Kategorie B gültig?", ar:"كم مدة صلاحية رخصة التعلّم فئة B؟"}, a:[
  {de:"24 Monate.", ar:"24 شهراً."},{de:"12 Monate.", ar:"12 شهراً."},{de:"Unbeschränkt.", ar:"غير محدودة."}], correct:[0], e:{de:"Danach musst du neu beantragen.", ar:"بعدها عليك تقديم طلب جديد."}},
{ c:"ausweis", q:{de:"Welche Bedingungen muss eine Begleitperson erfüllen?", ar:"ما الشروط الواجب توفرها في الشخص المرافق؟"}, a:[
  {de:"Mindestens 23 Jahre alt.", ar:"23 سنة على الأقل."},{de:"Seit mindestens 3 Jahren unbefristeter Führerausweis.", ar:"حائز على رخصة نهائية منذ 3 سنوات على الأقل."},{de:"Mindestens 18 Jahre alt.", ar:"18 سنة على الأقل."}], correct:[0,1],
  e:{de:"Ein Führerausweis auf Probe genügt nicht zum Begleiten.", ar:"الرخصة التجريبية لا تكفي للمرافقة."}},
{ c:"ausweis", q:{de:"Was gilt für den Führerausweis auf Probe?", ar:"ما الذي ينطبق على الرخصة التجريبية؟"}, a:[
  {de:"Er gilt 3 Jahre.", ar:"صالحة 3 سنوات."},{de:"Bei einer schweren Widerhandlung wird die Probezeit um 1 Jahr verlängert.", ar:"عند مخالفة خطيرة تُمدَّد فترة التجربة سنة."},{de:"Er gilt 5 Jahre.", ar:"صالحة 5 سنوات."}], correct:[0,1],
  e:{de:"Beim zweiten schweren Verstoss wird der Ausweis annulliert.", ar:"عند المخالفة الخطيرة الثانية تُلغى الرخصة."}},
{ c:"ausweis", q:{de:"Wann darfst du den VKU besuchen?", ar:"متى يمكنك حضور دورة VKU؟"}, a:[
  {de:"Erst wenn du den Lernfahrausweis hast.", ar:"فقط بعد الحصول على رخصة التعلّم."},{de:"Vor der Theorieprüfung.", ar:"قبل الامتحان النظري."},{de:"Er umfasst 8 Lektionen.", ar:"تتكون من 8 حصص."}], correct:[0,2],
  e:{de:"Reihenfolge: Theorie, Lernfahrausweis, VKU, praktische Prüfung.", ar:"الترتيب: النظري، رخصة التعلّم، VKU، ثم العملي."}},
{ c:"ausweis", q:{de:"Was brauchst du, bevor du das Gesuch für den Lernfahrausweis stellst?", ar:"ما الذي تحتاجه قبل تقديم طلب رخصة التعلّم؟"}, a:[
  {de:"Einen gültigen Sehtest.", ar:"فحص نظر ساري المفعول."},{de:"Den Nothelferausweis.", ar:"شهادة الإسعافات الأولية."},{de:"Den VKU-Ausweis.", ar:"شهادة دورة VKU."}], correct:[0,1],
  e:{de:"Der Sehtest ist 24 Monate gültig, der Nothelferkurs 6 Jahre.", ar:"فحص النظر صالح 24 شهراً ودورة الإسعاف 6 سنوات."}},
{ c:"ausweis", q:{de:"Was passiert, wenn du innerhalb der Probezeit ein zweites Mal schwer verstösst?", ar:"ماذا يحدث إذا ارتكبت مخالفة خطيرة ثانية خلال فترة التجربة؟"}, a:[
  {de:"Der Führerausweis wird annulliert.", ar:"تُلغى رخصة القيادة."},{de:"Du musst die ganze Ausbildung neu beginnen.", ar:"عليك بدء التدريب بأكمله من جديد."},{de:"Nur eine weitere Verlängerung um 1 Jahr.", ar:"مجرد تمديد إضافي لسنة واحدة."}], correct:[0,1],
  e:{de:"Erst nach einer Wartefrist kann ein neuer Lernfahrausweis beantragt werden.", ar:"لا يمكن طلب رخصة تعلّم جديدة إلا بعد فترة انتظار."}},
{ c:"ausweis", q:{de:"Ab welchem Alter kannst du in der Schweiz den Lernfahrausweis Kategorie B beantragen, und ab wann die praktische Prüfung?", ar:"من أي عمر يمكنك طلب رخصة التعلّم فئة B في سويسرا، ومتى العملي؟"}, a:[
  {de:"Lernfahrausweis ab 17 Jahren.", ar:"رخصة التعلّم من عمر 17 سنة."},{de:"Praktische Prüfung frühestens ab 18 Jahren.", ar:"العملي من عمر 18 سنة على الأقرب."},{de:"Beides ist erst ab 18 Jahren möglich.", ar:"كلاهما لا يُتاح إلا من عمر 18 سنة."}], correct:[0,1],
  e:{de:"Unter 20-Jährige brauchen zusätzlich mindestens 12 Monate Lernfahrpraxis.", ar:"دون 20 سنة يلزم أيضاً 12 شهراً على الأقل من ممارسة القيادة التعليمية."}},
{ c:"ausweis", q:{de:"Was ist am Lernfahrzeug vorgeschrieben?", ar:"ما المطلوب في مركبة التعلّم؟"}, a:[
  {de:"Eine blaue L-Tafel hinten, gut sichtbar.", ar:"لوحة L زرقاء خلفية، واضحة الرؤية."},{de:"Eine Begleitperson auf dem Beifahrersitz, ausser bei bestimmten Übungsfahrten.", ar:"مرافق في المقعد الأمامي، باستثناء بعض تدريبات القيادة."},{de:"Die L-Tafel ist nur bei der praktischen Prüfung nötig.", ar:"لوحة L مطلوبة فقط أثناء الامتحان العملي."}], correct:[0,1],
  e:{de:"Die L-Tafel muss während der ganzen Lernphase angebracht sein.", ar:"يجب أن تكون لوحة L موجودة طوال مرحلة التعلّم."}},
{ c:"ausweis", q:{de:"Welche Dokumente solltest du beim Fahren mitführen können?", ar:"ما المستندات التي يجب أن تكون قادراً على حملها أثناء القيادة؟"}, a:[
  {de:"Den Führerausweis.", ar:"رخصة القيادة."},{de:"Den Fahrzeugausweis.", ar:"بطاقة المركبة."},{de:"Eine Kopie genügt in jedem Fall.", ar:"تكفي نسخة مصوّرة في كل الأحوال."}], correct:[0,1],
  e:{de:"Bei einer Kontrolle musst du die Originale vorweisen können.", ar:"عند أي مراقبة يجب أن تُبرز المستندات الأصلية."}},
{ c:"ausweis", q:{de:"Was geschieht am Ende der dreijährigen Probezeit ohne schwere Widerhandlung?", ar:"ماذا يحدث في نهاية فترة التجربة الثلاثية بلا مخالفة خطيرة؟"}, a:[
  {de:"Der Führerausweis wird automatisch unbefristet.", ar:"تصبح الرخصة نهائية تلقائياً."},{de:"Der WAB-Kurs muss vorher absolviert worden sein.", ar:"يجب إتمام دورة WAB قبل ذلك."},{de:"Eine neue Theorieprüfung ist nötig.", ar:"يلزم امتحان نظري جديد."}], correct:[0,1],
  e:{de:"Der Weiterbildungskurs WAB ist während der Probezeit obligatorisch.", ar:"دورة التكوين WAB إلزامية خلال فترة التجربة."}},

// ---------- verkehrsteilnehmer ----------
{ c:"verkehrsteilnehmer", q:{de:"Du fährst neben einem Lastwagen an einer Ampel.", ar:"تقف بجانب شاحنة عند إشارة مرور."}, a:[
  {de:"Bleib nicht direkt neben oder vor der Fahrerkabine stehen.", ar:"لا تقف مباشرة بجانب أو أمام مقصورة السائق."},{de:"Lastwagen haben grosse tote Winkel.", ar:"للشاحنات نقاط عمياء واسعة."},{de:"Der Lastwagenfahrer sieht dich sicher, wenn du blinkst.", ar:"سائق الشاحنة يراك بالتأكيد إذا استعملت الغماز."}],
  correct:[0,1], e:{de:"Verlass dich nie darauf, gesehen zu werden – halte dich sichtbar.", ar:"لا تعتمد أبداً على أنك مرئي — ابقَ في مجال رؤية واضح."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein Motorrad nähert sich von hinten, du willst die Spur wechseln.", ar:"دراجة نارية تقترب من الخلف وتريد تغيير المسرب."}, a:[
  {de:"Abstand und Geschwindigkeit von Motorrädern sind schwer einzuschätzen.", ar:"يصعب تقدير مسافة وسرعة الدراجات النارية."},{de:"Schulterblick ist besonders wichtig.", ar:"النظرة فوق الكتف مهمة بشكل خاص."},{de:"Motorräder sind immer langsamer als Autos.", ar:"الدراجات النارية أبطأ من السيارات دائماً."}],
  correct:[0,1], e:{de:"Die schmale Silhouette täuscht oft über die tatsächliche Geschwindigkeit.", ar:"الشكل النحيل غالباً ما يُضلّل في تقدير السرعة الحقيقية."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein Fussgänger mit weissem oder gelbem Stock will die Strasse überqueren, auch ausserhalb eines Streifens.", ar:"شخص يحمل عصا بيضاء أو صفراء يريد عبور الطريق، حتى خارج ممر المشاة."}, a:[
  {de:"Er hat ein erhöhtes Vortrittsrecht.", ar:"له أولوية معززة."},{de:"Du musst nur an markierten Streifen anhalten.", ar:"عليك التوقف فقط عند الممرات المعلَّمة."},{de:"Du hältst an und lässt ihn queren.", ar:"تتوقف وتتركه يعبر."}], correct:[0,2],
  e:{de:"Der Stock ist ein anerkanntes Zeichen für Sehbehinderung.", ar:"العصا علامة معترف بها لضعف البصر."}},
{ c:"verkehrsteilnehmer", q:{de:"Du siehst einen Traktor mit einer orangen Warntafel vor dir.", ar:"ترى أمامك جراراً زراعياً عليه لوحة تحذير برتقالية."}, a:[
  {de:"Er ist meist langsamer als der übrige Verkehr.", ar:"غالباً ما يكون أبطأ من باقي حركة السير."},{de:"Erst überholen, wenn die Sicht wirklich frei ist.", ar:"تجاوزه فقط عندما تكون الرؤية خالية تماماً."},{de:"Überholen ist bei Traktoren generell verboten.", ar:"التجاوز ممنوع عموماً مع الجرارات."}],
  correct:[0,1], e:{de:"Traktoren können zudem breiter sein, als es scheint.", ar:"قد تكون الجرارات أعرض مما تبدو."}, scene:"bergpost"},
{ c:"verkehrsteilnehmer", q:{de:"Ein Reh springt vor dir auf die Strasse.", ar:"غزال يقفز أمامك على الطريق."}, a:[
  {de:"Tempo reduzieren, kontrolliert bremsen.", ar:"خفّض السرعة واكبح بشكل متحكم."},{de:"Abrupt ausweichen, koste es, was es wolle.", ar:"انعطف فجأة مهما كلّف الأمر."},{de:"Nicht riskant ausweichen, um einen Selbstunfall zu vermeiden.", ar:"لا تنعطف بشكل محفوف بالمخاطر لتفادي حادث ذاتي."}],
  correct:[0,2], e:{de:"Ein Zusammenstoss mit dem Tier ist oft weniger gefährlich als ein Ausweichunfall.", ar:"الاصطدام بالحيوان غالباً أقل خطورة من حادث الانحراف."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein E-Bike überholt dich mit auffällig hoher Geschwindigkeit.", ar:"دراجة كهربائية تتجاوزك بسرعة ملحوظة الارتفاع."}, a:[
  {de:"Schnelle E-Bikes über 25 km/h tragen ein gelbes Kontrollschild.", ar:"الدراجات الكهربائية السريعة فوق 25 كم/س تحمل لوحة صفراء."},{de:"Alle E-Bikes sind auf 25 km/h begrenzt.", ar:"جميع الدراجات الكهربائية محدودة بـ25 كم/س."},{de:"Solche E-Bikes gelten rechtlich wie Motorfahrräder.", ar:"تُعتبر هذه الدراجات قانونياً كالدراجات النارية الصغيرة."}],
  correct:[0,2], e:{de:"Langsame E-Bikes bis 25 km/h gelten dagegen als normale Fahrräder.", ar:"أما البطيئة حتى 25 كم/س فتُعتبر دراجات عادية."}},
{ c:"verkehrsteilnehmer", q:{de:"Eine Person im Rollstuhl möchte die Strasse an einer Stelle ohne Streifen überqueren.", ar:"شخص على كرسي متحرك يريد عبور الطريق في مكان بلا ممر معلَّم."}, a:[
  {de:"Rollstuhlfahrer gelten rechtlich als Fussgänger.", ar:"يُعتبر مستخدم الكرسي المتحرك من المشاة قانونياً."},{de:"Sie haben ausserhalb von Streifen keinerlei Rechte.", ar:"ليس له أي حقوق خارج الممرات المعلَّمة."},{de:"Die Grundregel gilt weiterhin: niemanden gefährden.", ar:"القاعدة الأساسية تبقى سارية: عدم تعريض أحد للخطر."}],
  correct:[0,2], e:{de:"Auch ohne formellen Vortritt bleibst du zu Vorsicht verpflichtet.", ar:"حتى بلا أولوية رسمية، يبقى الحذر واجباً عليك."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein Fussgänger geht bei starkem Regen mit einem grossen Regenschirm am Fahrbahnrand.", ar:"شخص يمشي بمظلة كبيرة على حافة الطريق أثناء مطر غزير."}, a:[
  {de:"Seine Sicht und deine Sicht auf ihn können eingeschränkt sein.", ar:"قد تكون رؤيته لك ورؤيتك له محدودة."},{de:"Besondere Vorsicht ist angebracht.", ar:"الحذر الإضافي مطلوب."},{de:"Regen hat keinen Einfluss auf das Verhalten von Fussgängern.", ar:"المطر ليس له تأثير على سلوك المشاة."}],
  correct:[0,1], e:{de:"Ein Schirm kann die Sicht in beide Richtungen stark einschränken.", ar:"قد تحجب المظلة الرؤية بشدة في الاتجاهين."}},
{ c:"verkehrsteilnehmer", q:{de:"Nachts läuft eine Person mit dunkler Kleidung am Strassenrand.", ar:"شخص يرتدي ملابس داكنة يمشي على حافة الطريق ليلاً."}, a:[
  {de:"Sie ist erst spät sichtbar.", ar:"لا يصبح مرئياً إلا في وقت متأخر."},{de:"Tempo anpassen und erhöhte Aufmerksamkeit.", ar:"كيّف السرعة وزِد الانتباه."},{de:"Abblendlicht ist in diesem Fall unwichtig.", ar:"الضوء المنخفض غير مهم في هذه الحالة."}],
  correct:[0,1], e:{de:"Dunkle Kleidung reduziert die Sichtbarkeit erheblich.", ar:"الملابس الداكنة تُقلّل الرؤية بشكل كبير."}, scene:"nachtfahrt"},
{ c:"verkehrsteilnehmer", q:{de:"Ein Wohnmobil mit Anhänger fährt vor dir.", ar:"سيارة تخييم مع مقطورة تسير أمامك."}, a:[
  {de:"Solche Kombinationen haben oft einen längeren Bremsweg.", ar:"غالباً ما يكون لهذه التركيبات مسافة كبح أطول."},{de:"Vergrössere deinen eigenen Abstand entsprechend.", ar:"زِد مسافتك أنت وفقاً لذلك."},{de:"Ihr Bremsverhalten ist identisch mit einem normalen Auto.", ar:"سلوكها في الكبح مطابق لسيارة عادية."}],
  correct:[0,1], e:{de:"Mehr Gewicht und ein Anhänger verlängern den Bremsweg deutlich.", ar:"الوزن الإضافي والمقطورة يُطيلان مسافة الكبح بشكل ملحوظ."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein E-Trottinett fährt vor dir auf der Strasse.", ar:"سكوتر كهربائي يسير أمامك على الطريق."}, a:[
  {de:"Es gilt rechtlich als Motorfahrrad.", ar:"يُعتبر قانونياً دراجة نارية صغيرة."},{de:"Es sollte wo vorhanden den Radweg benutzen.", ar:"يجب أن يستخدم مسار الدراجات حيثما وُجد."},{de:"Es hat gegenüber Autos generell keinerlei Regeln zu beachten.", ar:"ليس عليه اتباع أي قواعد أصلاً تجاه السيارات."}],
  correct:[0,1], e:{de:"E-Trottinetts unterliegen denselben Grundregeln wie andere Fahrzeuge.", ar:"تخضع السكوترات الكهربائية لنفس القواعد الأساسية كالمركبات الأخرى."}},
{ c:"verkehrsteilnehmer", q:{de:"Eine Person führt einen Hund an einer langen Leine nahe der Fahrbahn.", ar:"شخص يمسك كلباً بمقود طويل قرب الطريق."}, a:[
  {de:"Das Tier kann unvorhersehbar auf die Fahrbahn laufen.", ar:"قد يركض الحيوان فجأة إلى الطريق."},{de:"Tempo reduzieren und Abstand halten.", ar:"خفّض السرعة وحافظ على مسافة."},{de:"Hunde an der Leine sind immer vollständig berechenbar.", ar:"الكلاب المربوطة بمقود يمكن التنبؤ بتصرفها دائماً بالكامل."}],
  correct:[0,1], e:{de:"Auch angeleinte Tiere können abrupt die Richtung wechseln.", ar:"حتى الحيوانات المربوطة قد تُغيّر اتجاهها فجأة."}},

// ---------- bahnuebergang ----------
{ c:"bahnuebergang", q:{de:"Was kündigt ein Andreaskreuz an?", ar:"بماذا يُنذر الصليب على شكل X (Andreaskreuz)؟"}, a:[
  {de:"Einen Bahnübergang.", ar:"معبر سكة حديد."},{de:"Eine Kreuzung mit Vortritt von rechts.", ar:"تقاطعاً بأولوية اليمين."},{de:"Ein Ende der Hauptstrasse.", ar:"نهاية الطريق الرئيسي."}], correct:[0],
  e:{de:"Rechne an dieser Stelle immer mit einem Zug.", ar:"توقّع دائماً وصول قطار في هذا المكان."}, scene:"bahnuebergang_ohneschranke"},
{ c:"bahnuebergang", q:{de:"An einem Bahnübergang mit Schranke beginnt diese sich zu senken.", ar:"عند معبر سكة بحاجز، يبدأ الحاجز بالانخفاض."}, a:[
  {de:"Du musst anhalten.", ar:"يجب أن تتوقف."},{de:"Du darfst noch schnell durchfahren, wenn Platz ist.", ar:"يمكنك العبور بسرعة إذا وُجد مكان."},{de:"Ein Zug hat an dieser Stelle immer Vortritt.", ar:"للقطار الأولوية دائماً في هذا المكان."}], correct:[0,2],
  e:{de:"Bei sich schliessender Schranke ist Durchfahren extrem gefährlich und verboten.", ar:"العبور أثناء انغلاق الحاجز خطير جداً وممنوع."}, scene:"bahnuebergang_schranke"},
{ c:"bahnuebergang", q:{de:"Ein unbeschrankter Bahnübergang mit Gefahrensignal liegt vor dir.", ar:"معبر سكة بلا حاجز عليه إشارة خطر أمامك."}, a:[
  {de:"Tempo reduzieren und nach beiden Seiten schauen.", ar:"خفّض السرعة وانظر إلى الجهتين."},{de:"Normal weiterfahren wie an jeder Kreuzung.", ar:"المتابعة بشكل عادي كأي تقاطع."},{de:"Überholen ist an dieser Stelle verboten.", ar:"التجاوز ممنوع في هذا المكان."}], correct:[0,2],
  e:{de:"Ohne Schranke bist du selbst für die Kontrolle verantwortlich.", ar:"بلا حاجز أنت المسؤول عن التحقق بنفسك."}, scene:"bahnuebergang_ohneschranke"},
{ c:"bahnuebergang", q:{de:"Hinter dem Bahnübergang staut sich der Verkehr, dein Fahrzeug hätte gerade so Platz.", ar:"يوجد ازدحام خلف معبر السكة، ومركبتك بالكاد تجد مكاناً."}, a:[
  {de:"Nicht auf den Übergang fahren, wenn nicht wirklich genug Platz ist.", ar:"لا تدخل المعبر إذا لم يكن هناك مكان كافٍ فعلاً."},{de:"Lieber warten, bis die Strecke dahinter ganz frei ist.", ar:"من الأفضل الانتظار حتى يخلو الطريق خلفه تماماً."},{de:"Kurz anhalten ist auf den Schienen erlaubt.", ar:"التوقف لفترة قصيرة على القضبان مسموح."}], correct:[0,1],
  e:{de:"Ein liegen gebliebenes Fahrzeug auf den Schienen ist lebensgefährlich.", ar:"توقف المركبة على القضبان خطر مميت."}},
{ c:"bahnuebergang", q:{de:"Dein Fahrzeug bleibt mitten auf den Gleisen stehen.", ar:"تتعطل مركبتك في منتصف القضبان."}, a:[
  {de:"Alle Insassen steigen sofort aus und entfernen sich.", ar:"ينزل الجميع فوراً ويبتعدون."},{de:"Danach sofort die Notfallnummer oder die Notruf-Säule der Bahn alarmieren.", ar:"ثم يُتصل فوراً برقم الطوارئ أو عمود الطوارئ الخاص بالسكة."},{de:"Im Fahrzeug bleiben und versuchen, es wieder zu starten.", ar:"البقاء في المركبة ومحاولة تشغيلها من جديد."}],
  correct:[0,1], e:{de:"Menschenleben stehen über dem Fahrzeug.", ar:"حياة الإنسان أهم من المركبة."}},
{ c:"bahnuebergang", q:{de:"Darfst du unmittelbar vor einem unbeschrankten Bahnübergang überholen?", ar:"هل يجوز التجاوز مباشرة قبل معبر سكة بلا حاجز؟"}, a:[
  {de:"Nein, das ist verboten.", ar:"لا، هذا ممنوع."},{de:"Ja, wenn die Strecke übersichtlich ist.", ar:"نعم، إذا كان المقطع واضح الرؤية."},{de:"Nur ausserorts erlaubt.", ar:"مسموح خارج المدن فقط."}], correct:[0],
  e:{de:"Das Überholverbot gilt unabhängig von der Sicht.", ar:"منع التجاوز ساري بغضّ النظر عن الرؤية."}},
{ c:"bahnuebergang", q:{de:"An einer Tramkreuzung ohne eigene Lichtsignalanlage nähern sich zwei Autos von rechts und links.", ar:"عند تقاطع ترام بلا إشارة ضوئية خاصة، تقترب سيارتان من اليمين واليسار."}, a:[
  {de:"Der Rechtsvortritt gilt wie bei einer normalen Kreuzung.", ar:"تنطبق أولوية اليمين كما في أي تقاطع عادي."},{de:"Das Tram selbst hat gegenüber beiden Autos Vortritt.", ar:"للترام نفسه الأولوية على كلا السيارتين."},{de:"Wer zuerst hupt, hat Vortritt.", ar:"من يستعمل البوق أولاً له الأولوية."}], correct:[0,1],
  e:{de:"Das Tram bleibt gegenüber Autos immer vortrittsberechtigt.", ar:"يبقى للترام الأولوية على السيارات دائماً."}},
{ c:"bahnuebergang", q:{de:"Am Bahnübergang blinkt das rote Licht, es gibt aber keine Schranke.", ar:"عند معبر السكة يومض الضوء الأحمر لكن لا يوجد حاجز."}, a:[
  {de:"Du musst trotzdem anhalten.", ar:"يجب أن تتوقف رغم ذلك."},{de:"Ohne Schranke ist das Blinklicht nur eine Empfehlung.", ar:"بلا حاجز يكون الضوء الوامض مجرد توصية."},{de:"Ein Zug kommt oder ist bereits sehr nah.", ar:"قطار قادم أو قريب جداً بالفعل."}], correct:[0,2],
  e:{de:"Das rote Licht allein hat die gleiche verbindliche Wirkung wie eine Schranke.", ar:"للضوء الأحمر وحده نفس الأثر الملزم للحاجز."}},
{ c:"bahnuebergang", q:{de:"Ein Bahnübergang hat zwei parallele Gleise, ein Zug ist gerade durchgefahren.", ar:"معبر سكة له خطان متوازيان، وقد مر قطار للتو."}, a:[
  {de:"Nicht sofort losfahren.", ar:"لا تنطلق فوراً."},{de:"Ein zweiter Zug kann aus der Gegenrichtung kommen.", ar:"قد يأتي قطار ثانٍ من الاتجاه المعاكس."},{de:"Nach dem ersten Zug ist die Strecke garantiert frei.", ar:"الطريق خالٍ حتماً بعد مرور القطار الأول."}], correct:[0,1],
  e:{de:"Warte, bis Schranken sich öffnen oder das Blinklicht ausgeht.", ar:"انتظر حتى يُفتح الحاجز أو ينطفئ الضوء الوامض."}},
{ c:"bahnuebergang", q:{de:"Darfst du unmittelbar auf einem Bahnübergang parkieren oder halten?", ar:"هل يجوز الوقوف أو الركن مباشرة على معبر السكة؟"}, a:[
  {de:"Nein, das ist strikt verboten.", ar:"لا، هذا ممنوع منعاً باتاً."},{de:"Auch kurzes Halten ist untersagt.", ar:"حتى الوقوف اللحظي ممنوع."},{de:"Nur bei geöffneter Schranke ist es kurz erlaubt.", ar:"مسموح لفترة قصيرة فقط عند فتح الحاجز."}], correct:[0,1],
  e:{de:"Auf den Schienen liegen zu bleiben ist lebensgefährlich.", ar:"البقاء على القضبان خطر مميت."}},
{ c:"bahnuebergang", q:{de:"Ein Velofahrer überquert Tramschienen in einem sehr spitzen Winkel.", ar:"راكب دراجة يعبر قضبان الترام بزاوية حادة جداً."}, a:[
  {de:"Das Vorderrad kann in der Rille stecken bleiben.", ar:"قد تعلق العجلة الأمامية في الفتحة."},{de:"Möglichst im rechten Winkel queren.", ar:"يُستحسن العبور بزاوية قائمة."},{de:"Der Winkel spielt für Fahrräder keine Rolle.", ar:"الزاوية غير مهمة بالنسبة للدراجات."}], correct:[0,1],
  e:{de:"Ein steckengebliebenes Rad kann zu einem Sturz führen.", ar:"عجلة عالقة قد تؤدي إلى السقوط."}},

// ---------- parken_halten ----------
{ c:"parken_halten", q:{de:"Was unterscheidet Halten von Parkieren?", ar:"ما الفرق بين الوقوف والركن؟"}, a:[
  {de:"Halten ist ein kurzer Stopp in der Nähe des Fahrzeugs.", ar:"الوقوف توقف قصير قرب المركبة."},{de:"Parkieren dauert länger, das Fahrzeug bleibt unbeaufsichtigt.", ar:"الركن أطول مدة، وتُترك فيه المركبة بلا مراقبة."},{de:"Rechtlich gibt es keinen Unterschied.", ar:"لا يوجد فرق قانوني بينهما."}], correct:[0,1],
  e:{de:"Manche Verbote gelten nur für Parkieren, nicht für kurzes Halten.", ar:"بعض الممنوعات تخص الركن فقط، لا الوقوف القصير."}},
{ c:"parken_halten", q:{de:"Du parkierst in der blauen Zone.", ar:"تركن في المنطقة الزرقاء."}, a:[
  {de:"Die Parkscheibe bei Ankunft einstellen.", ar:"اضبط قرص الوقوف عند الوصول."},{de:"Die erlaubte Dauer beträgt meist 1 Stunde.", ar:"المدة المسموحة عادة ساعة واحدة."},{de:"Die Parkscheibe ist freiwillig.", ar:"قرص الوقوف اختياري."}], correct:[0,1],
  e:{de:"Ohne oder mit falsch gestellter Scheibe gibt es eine Busse.", ar:"بدون القرص أو بضبطه خطأً تُفرض غرامة."}},
{ c:"parken_halten", q:{de:"Darfst du auf dem Trottoir parkieren?", ar:"هل يجوز الركن على الرصيف؟"}, a:[
  {de:"Nur wenn ein Signal oder eine Markierung es ausdrücklich erlaubt.", ar:"فقط إذا سمحت بذلك إشارة أو علامة صراحة."},{de:"Grundsätzlich immer, wenn Platz vorhanden ist.", ar:"دائماً أصلاً إذا وُجد مكان."},{de:"Das Trottoir ist in erster Linie für Fussgänger reserviert.", ar:"الرصيف مخصص بالدرجة الأولى للمشاة."}], correct:[0,2],
  e:{de:"Ohne ausdrückliche Erlaubnis ist Trottoirparkieren verboten.", ar:"بلا إذن صريح، الركن على الرصيف ممنوع."}},
{ c:"parken_halten", q:{de:"Du willst kurz Waren aus dem Auto ausladen und stellst dich in zweiter Reihe mit Warnblinker.", ar:"تريد تفريغ بضائع بسرعة وتقف في الصف الثاني مع تشغيل أضواء التحذير."}, a:[
  {de:"Parkieren in zweiter Reihe ist verboten.", ar:"الركن في الصف الثاني ممنوع."},{de:"Der Warnblinker macht das Halten automatisch legal.", ar:"أضواء التحذير تجعل الوقوف قانونياً تلقائياً."},{de:"Du behinderst damit den übrigen Verkehr.", ar:"بذلك تعيق حركة السير الأخرى."}], correct:[0,2],
  e:{de:"Der Warnblinker warnt nur, er hebt kein Verbot auf.", ar:"أضواء التحذير تُنذر فقط، ولا تُلغي أي منع."}},
{ c:"parken_halten", q:{de:"Vor einer privaten Garageneinfahrt ohne Signal willst du parkieren.", ar:"تريد الركن أمام مدخل مرآب خاص بلا إشارة."}, a:[
  {de:"Auch ohne Signal ist das verboten.", ar:"هذا ممنوع حتى بلا إشارة."},{de:"Du würdest die Ein- und Ausfahrt blockieren.", ar:"ستسدّ بذلك المدخل والمخرج."},{de:"Ohne Verbotsschild ist es ausdrücklich erlaubt.", ar:"بلا لافتة منع، الأمر مسموح صراحة."}], correct:[0,1],
  e:{de:"Private Ein- und Ausfahrten müssen immer frei bleiben.", ar:"يجب أن تبقى المداخل والمخارج الخاصة خالية دائماً."}},
{ c:"parken_halten", q:{de:"Du willst nachts auf einer schlecht beleuchteten Strasse ohne Licht parkieren.", ar:"تريد الركن ليلاً بلا إضاءة على طريق سيئ الإنارة."}, a:[
  {de:"Ohne ausreichende Beleuchtung der Strasse ist das riskant und meist unzulässig.", ar:"بلا إنارة كافية للطريق، هذا محفوف بالمخاطر وغير جائز غالباً."},{de:"Das Fahrzeug muss für andere gut sichtbar bleiben.", ar:"يجب أن تبقى المركبة واضحة الرؤية للآخرين."},{de:"Nachts spielt Beleuchtung beim Parkieren keine Rolle.", ar:"الإضاءة ليست مهمة عند الركن ليلاً."}], correct:[0,1],
  e:{de:"Auf gut beleuchteten Strassen ist Parkieren ohne Licht dagegen zulässig.", ar:"على الطرق المضاءة جيداً يكون الركن بلا إضاءة جائزاً."}},
{ c:"parken_halten", q:{de:"Ein Behindertenparkplatz ist frei, du hast keinen entsprechenden Ausweis.", ar:"موقف لذوي الإعاقة فارغ، وليس لديك بطاقة مخصصة."}, a:[
  {de:"Du darfst ihn nicht benutzen.", ar:"لا يجوز لك استخدامه."},{de:"Das gilt unabhängig davon, wie kurz du parkieren willst.", ar:"ينطبق ذلك بصرف النظر عن قصر مدة الركن."},{de:"Ohne andere freie Plätze darfst du eine Ausnahme machen.", ar:"بلا مواقف أخرى فارغة يمكنك إجراء استثناء."}], correct:[0,1],
  e:{de:"Diese Plätze bleiben ausschliesslich Ausweisinhabern vorbehalten.", ar:"هذه المواقف محجوزة حصراً لحاملي البطاقة."}},
{ c:"parken_halten", q:{de:"Du willst direkt vor einer Feuerwehrzufahrt kurz halten.", ar:"تريد الوقوف لحظة أمام مدخل مخصص للإطفاء."}, a:[
  {de:"Halten und Parkieren sind dort verboten.", ar:"الوقوف والركن ممنوعان هناك."},{de:"Im Notfall muss die Zufahrt sofort frei sein.", ar:"يجب أن يكون المدخل خالياً فوراً عند الطوارئ."},{de:"Kurzes Halten ist dort ausnahmsweise erlaubt.", ar:"الوقوف القصير مسموح استثنائياً هناك."}], correct:[0,1],
  e:{de:"Blockierte Feuerwehrzufahrten können Menschenleben kosten.", ar:"انسداد مداخل الإطفاء قد يكلّف أرواحاً."}},
{ c:"parken_halten", q:{de:"Wie nah an einer Kreuzung darfst du ohne anderslautendes Signal parkieren?", ar:"كم تكون المسافة المسموحة للركن قرب تقاطع بلا إشارة مخالفة؟"}, a:[
  {de:"Nicht näher als 5 m.", ar:"ليس أقل من 5 أمتار."},{de:"Das schützt die Übersicht für alle Verkehrsteilnehmer.", ar:"هذا يحمي وضوح الرؤية لجميع مستخدمي الطريق."},{de:"Direkt an der Kreuzung, wenn Platz vorhanden ist.", ar:"مباشرة عند التقاطع إذا وُجد مكان."}], correct:[0,1],
  e:{de:"Zu nahes Parkieren versperrt die Sicht auf querenden Verkehr.", ar:"الركن القريب جداً يحجب الرؤية عن السير العابر."}},
{ c:"parken_halten", q:{de:"Ein Parkfeld verlangt eine gebührenpflichtige Zahlung am Automaten.", ar:"موقف يتطلب دفع رسوم عبر جهاز آلي."}, a:[
  {de:"Die Gebühr muss vor oder unmittelbar nach dem Parkieren entrichtet werden.", ar:"يجب دفع الرسم قبل الركن أو مباشرة بعده."},{de:"Ohne Bezahlung droht eine Busse.", ar:"بلا دفع، يمكن أن تُفرض غرامة."},{de:"Gebühren gelten nur für Fahrzeuge mit ausländischem Kontrollschild.", ar:"الرسوم تخص فقط المركبات ذات اللوحات الأجنبية."}], correct:[0,1],
  e:{de:"Die Gebührenpflicht gilt unabhängig von der Herkunft des Fahrzeugs.", ar:"إلزامية الرسوم سارية بصرف النظر عن منشأ المركبة."}},
{ c:"parken_halten", q:{de:"Auf einem markierten Radstreifen willst du kurz parkieren.", ar:"تريد الركن لحظة على مسرب دراجات معلَّم."}, a:[
  {de:"Parkieren auf Radstreifen ist verboten.", ar:"الركن على مسارب الدراجات ممنوع."},{de:"Du zwingst Velofahrer, gefährlich auszuweichen.", ar:"تُجبر راكبي الدراجات على الانحراف بشكل خطير."},{de:"Ein kurzer Stopp von wenigen Minuten ist ausdrücklich erlaubt.", ar:"التوقف القصير لبضع دقائق مسموح صراحة."}], correct:[0,1],
  e:{de:"Radstreifen müssen für den fliessenden Veloverkehr frei bleiben.", ar:"يجب أن تبقى مسارب الدراجات خالية لسير الدراجات المستمر."}},
{ c:"parken_halten", q:{de:"Du hältst kurz auf einem breiten, geraden und gut einsehbaren Strassenabschnitt ausserorts, um eine Nachricht zu lesen.", ar:"تتوقف لحظة على مقطع طريق واسع ومستقيم وواضح الرؤية خارج المدينة لتقرأ رسالة."}, a:[
  {de:"Kurzes Halten ist hier grundsätzlich möglich, wenn niemand behindert wird.", ar:"الوقوف القصير ممكن هنا أصلاً إذا لم يُعِق أحداً."},{de:"Das Fahrzeug sollte gut sichtbar am Rand stehen.", ar:"يجب أن تكون المركبة واضحة على الحافة."},{de:"Halten ausserorts ist immer und überall streng verboten.", ar:"الوقوف خارج المدن ممنوع دائماً وفي كل مكان بشكل صارم."}], correct:[0,1],
  e:{de:"Verboten ist Halten vor allem an unübersichtlichen oder gefährlichen Stellen.", ar:"الممنوع هو الوقوف خصوصاً في الأماكن غير الواضحة أو الخطيرة."}},

// ---------- ladung_transport ----------
{ c:"ladung_transport", q:{de:"Was musst du bei der Ladung deines Fahrzeugs beachten?", ar:"ما الذي يجب مراعاته عند تحميل مركبتك؟"}, a:[
  {de:"Die Sicht nach vorne, zur Seite und in die Spiegel darf nicht beeinträchtigt werden.", ar:"يجب ألا تعيق الرؤية إلى الأمام والجانبين والمرايا."},{de:"Die Ladung muss gesichert sein.", ar:"يجب تثبيت الحمولة."},{de:"Solange die Ladung im Kofferraum bleibt, gibt es keine Vorschriften.", ar:"طالما الحمولة في صندوق السيارة، لا توجد قواعد."}], correct:[0,1],
  e:{de:"Auch im Kofferraum kann lose Ladung bei einer Bremsung gefährlich werden.", ar:"حتى داخل الصندوق قد تصبح الحمولة غير المثبتة خطيرة عند الكبح."}},
{ c:"ladung_transport", q:{de:"Ladung ragt seitlich oder nach hinten über dein Fahrzeug hinaus.", ar:"تتجاوز الحمولة حدود مركبتك جانبياً أو من الخلف."}, a:[
  {de:"Ab einer bestimmten Länge muss sie markiert werden.", ar:"يجب تمييزها ابتداءً من طول معين."},{de:"Nachts braucht überstehende Ladung meist zusätzliche Beleuchtung.", ar:"عادة تحتاج الحمولة البارزة إضاءة إضافية ليلاً."},{de:"Überstehende Ladung ist grundsätzlich verboten.", ar:"الحمولة البارزة ممنوعة أصلاً."}], correct:[0,1],
  e:{de:"Erlaubt ist es, aber mit Kennzeichnungspflicht zum Schutz anderer.", ar:"مسموح لكن مع وجوب التمييز لحماية الآخرين."}, scene:"hoehe_ladung"},
{ c:"ladung_transport", q:{de:"Wer trägt die Verantwortung für die Ladungssicherung?", ar:"من يتحمل مسؤولية تثبيت الحمولة؟"}, a:[
  {de:"Der Fahrzeugführer.", ar:"سائق المركبة."},{de:"Auch wenn jemand anderes beladen hat, bleibt die Pflicht beim Fahrer.", ar:"حتى لو قام شخص آخر بالتحميل، يبقى الواجب على السائق."},{de:"Ausschliesslich die Person, die die Ladung eingeladen hat.", ar:"الشخص الذي حمّل البضاعة حصراً."}], correct:[0,1],
  e:{de:"Vor der Fahrt solltest du die Sicherung immer selbst kontrollieren.", ar:"قبل الانطلاق عليك دائماً التحقق من التثبيت بنفسك."}, scene:"ladung_sichern"},
{ c:"ladung_transport", q:{de:"Wie viele Personen darfst du in deinem Personenwagen mitnehmen?", ar:"كم عدد الأشخاص الذين يمكنك نقلهم في سيارتك؟"}, a:[
  {de:"Höchstens die Anzahl Plätze gemäss Fahrzeugausweis.", ar:"بحد أقصى عدد المقاعد المذكور في بطاقة المركبة."},{de:"Beliebig viele, solange alle einen Gurt tragen.", ar:"عدد غير محدود طالما الجميع يرتدي حزام الأمان."},{de:"Kinder zählen nicht zur zulässigen Personenzahl.", ar:"الأطفال لا يُحتسبون ضمن العدد المسموح."}], correct:[0],
  e:{de:"Überzählige Personen sind eine Widerhandlung, unabhängig vom Alter.", ar:"العدد الزائد يُعد مخالفة، بصرف النظر عن العمر."}},
{ c:"ladung_transport", q:{de:"Wie viel darf ein Personenwagen der Kategorie B an ungebremstem Anhänger ziehen?", ar:"كم يمكن لسيارة فئة B جرّه من مقطورة بلا فرامل؟"}, a:[
  {de:"Bis 750 kg.", ar:"حتى 750 كغ."},{de:"Bei gebremstem Anhänger zählt das kombinierte Gesamtgewicht.", ar:"مع مقطورة بفرامل يُحتسب الوزن الإجمالي المشترك."},{de:"Es gibt keine Gewichtsgrenze für Kategorie B.", ar:"لا يوجد حد للوزن لفئة B."}], correct:[0,1],
  e:{de:"Die genauen Grenzen stehen im Fahrzeug- und im Führerausweis.", ar:"الحدود الدقيقة مذكورة في بطاقة المركبة ورخصة القيادة."}},
{ c:"ladung_transport", q:{de:"Ein Hund reist frei im Fahrzeug ohne jede Sicherung mit.", ar:"كلب يسافر بحرية في المركبة بلا أي تثبيت."}, a:[
  {de:"Er sollte mit Gurt, Netz oder Box gesichert werden.", ar:"يجب تثبيته بحزام أو شبكة أو صندوق."},{de:"Ein ungesichertes Tier kann den Fahrer stark ablenken oder gefährden.", ar:"الحيوان غير المثبّت قد يشتت السائق أو يعرّضه للخطر بشدة."},{de:"Tiere brauchen im Auto keinerlei Sicherung.", ar:"الحيوانات لا تحتاج أي تثبيت في السيارة أصلاً."}], correct:[0,1],
  e:{de:"Bei einer Bremsung wird auch ein Tier zum gefährlichen Geschoss.", ar:"عند الكبح يتحول الحيوان أيضاً إلى قذيفة خطيرة."}},
{ c:"ladung_transport", q:{de:"Ein Kleinkind soll auf dem Beifahrersitz mitfahren.", ar:"سيجلس طفل صغير في المقعد الأمامي."}, a:[
  {de:"Nur wenn der Airbag deaktiviert ist oder der Sitz das sicher zulässt.", ar:"فقط إذا كانت الوسادة الهوائية معطّلة أو كان المقعد يسمح بذلك بأمان."},{de:"Ein rückwärtsgerichteter Kindersitz vor einem aktiven Airbag ist gefährlich.", ar:"مقعد الطفل الموجّه للخلف أمام وسادة هوائية نشطة خطير."},{de:"Airbags haben keinen Einfluss auf die Sicherheit von Kindersitzen.", ar:"الوسائد الهوائية ليس لها تأثير على سلامة مقاعد الأطفال."}], correct:[0,1],
  e:{de:"Der sich öffnende Airbag könnte das Kind schwer verletzen.", ar:"يمكن أن تُصيب الوسادة الهوائية المنفتحة الطفل إصابة بالغة."}},
{ c:"ladung_transport", q:{de:"Dein Fahrzeug ist deutlich über dem zulässigen Gesamtgewicht beladen.", ar:"مركبتك محمّلة بشكل يتجاوز الوزن الإجمالي المسموح بوضوح."}, a:[
  {de:"Bremsweg und Fahrstabilität verschlechtern sich.", ar:"تسوء مسافة الكبح واستقرار القيادة."},{de:"Das kann gebüsst werden.", ar:"يمكن أن يُعرّضك ذلك لغرامة."},{de:"Solange das Fahrzeug noch fährt, ist alles in Ordnung.", ar:"طالما المركبة لا تزال تسير، فكل شيء على ما يرام."}], correct:[0,1],
  e:{de:"Überladung ist ein ernstes Sicherheitsrisiko, kein rein ästhetisches Problem.", ar:"الحمولة الزائدة خطر أمني جدي، لا مجرد مشكلة شكلية."}},
,

// ---------- grundregeln (Erweiterung) ----------
{ c:"grundregeln", q:{de:"Du fährst mit offenen Fenstern und lauter Musik.", ar:"تقود بنوافذ مفتوحة وموسيقى صاخبة."}, a:[
  {de:"Laute Musik kann Signale von Einsatzfahrzeugen oder Bahnübergängen übertönen.", ar:"الموسيقى الصاخبة قد تُغطّي على أصوات مركبات الطوارئ أو معابر السكة."},{de:"Das ist rechtlich völlig bedeutungslos.", ar:"هذا غير مهم قانونياً على الإطلاق."},{de:"Deine akustische Wahrnehmung kann eingeschränkt sein.", ar:"قد يكون إدراكك السمعي محدوداً."}], correct:[0,2],
  e:{de:"Die Grundregel verlangt, dass du den Verkehr wahrnehmen kannst.", ar:"القاعدة الأساسية تتطلب أن تكون قادراً على إدراك ما يجري حولك."}},
{ c:"grundregeln", q:{de:"Ein Beifahrer öffnet nach dem Parkieren abrupt die Tür in den fliessenden Verkehr.", ar:"راكب يفتح الباب فجأة نحو حركة السير بعد الركن."}, a:[
  {de:"Vor dem Öffnen muss nach hinten geschaut werden.", ar:"يجب النظر إلى الخلف قبل الفتح."},{de:"Das kann Velofahrer oder andere Fahrzeuge gefährden.", ar:"قد يُعرّض ذلك راكبي الدراجات أو مركبات أخرى للخطر."},{de:"Das ist ausschliesslich Sache des Beifahrers, den Fahrer betrifft es nicht.", ar:"هذا يخص الراكب فقط ولا يعني السائق."}], correct:[0,1],
  e:{de:"Als Fahrzeugführer solltest du Mitfahrende bei Bedarf darauf hinweisen.", ar:"بصفتك السائق، عليك تنبيه الركاب عند الحاجة."}},
{ c:"grundregeln", q:{de:"Du siehst im Rückspiegel, dass ein Kind allein auf dem Rücksitz seinen Gurt löst.", ar:"ترى في المرآة أن طفلاً بمفرده في المقعد الخلفي يفكّ حزامه."}, a:[
  {de:"An einem sicheren Ort anhalten und die Situation klären.", ar:"توقف في مكان آمن وعالج الأمر."},{de:"Der Fahrer bleibt für die Sicherung von Kindern verantwortlich.", ar:"يبقى السائق مسؤولاً عن تأمين الأطفال."},{de:"Während der Fahrt ist das kein Grund zu reagieren.", ar:"ليس هذا سبباً للتفاعل أثناء القيادة."}], correct:[0,1],
  e:{de:"Weiterfahren mit ungesichertem Kind ist ein erhebliches Risiko.", ar:"متابعة السير بطفل غير مؤمَّن خطر كبير."}},
{ c:"grundregeln", q:{de:"Was gilt grundsätzlich für die Benutzung der Hupe?", ar:"ما الذي ينطبق أصلاً على استعمال البوق؟"}, a:[
  {de:"Nur zur Warnung bei drohender Gefahr.", ar:"فقط للتحذير عند خطر وشيك."},{de:"Innerorts möglichst zurückhaltend einsetzen.", ar:"استعمله باعتدال داخل المدن."},{de:"Beliebig, um Ungeduld auszudrücken.", ar:"بحرية للتعبير عن نفاد الصبر."}], correct:[0,1],
  e:{de:"Unnötiges Hupen kann als Belästigung gelten und ist zu vermeiden.", ar:"البوق غير الضروري قد يُعد إزعاجاً ويجب تجنّبه."}},
{ c:"grundregeln", q:{de:"Du fährst durch ein Wohnquartier mit vielen spielenden Kindern, ohne besondere Signalisation.", ar:"تسير في حي سكني فيه أطفال كثر يلعبون، بلا إشارات خاصة."}, a:[
  {de:"Die Grundregel verlangt angepasste, vorsichtige Fahrweise.", ar:"القاعدة الأساسية تتطلب قيادة حذرة ومناسبة."},{de:"Ohne Tempo-30-Signal darfst du normal 50 km/h fahren.", ar:"بلا إشارة منطقة 30 يمكنك السير بـ50 كم/س بشكل عادي."},{de:"Fahrbereitschaft zum Bremsen ist sinnvoll.", ar:"الاستعداد للكبح أمر منطقي."}], correct:[0,2],
  e:{de:"Formale Erlaubnis ersetzt nie die Pflicht zur Vorsicht.", ar:"الإذن الشكلي لا يُغني أبداً عن واجب الحذر."}},
{ c:"grundregeln", q:{de:"Ein Mitfahrer ohne Gurt sitzt vorne, du bist der Fahrzeugführer.", ar:"راكب بلا حزام يجلس أمامك، وأنت السائق."}, a:[
  {de:"Erwachsene sind grundsätzlich selbst für ihren Gurt verantwortlich.", ar:"البالغون مسؤولون أصلاً عن حزامهم بأنفسهم."},{de:"Trotzdem lohnt es sich, vor der Fahrt daran zu erinnern.", ar:"رغم ذلك يستحق الأمر تذكيرهم قبل الانطلاق."},{de:"Als Fahrer haftest du in jedem Fall automatisch mit.", ar:"بصفتك السائق تتحمل المسؤولية تلقائياً في كل الأحوال."}], correct:[0,1],
  e:{de:"Für Kinder unter 12 Jahren liegt die Verantwortung dagegen klar beim Fahrer.", ar:"أما الأطفال دون 12 سنة فتقع مسؤوليتهم بوضوح على السائق."}},
{ c:"grundregeln", q:{de:"Du bist unsicher, ob dein Verhalten in einer bestimmten Situation erlaubt ist.", ar:"لست متأكداً إن كان تصرفك مسموحاً في موقف معين."}, a:[
  {de:"Im Zweifel die vorsichtigere Option wählen.", ar:"عند الشك اختر الخيار الأكثر حذراً."},{de:"Die Grundregel verlangt, niemanden zu gefährden.", ar:"القاعدة الأساسية تتطلب عدم تعريض أحد للخطر."},{de:"Unsicherheit ist kein gültiger Grund zur Vorsicht.", ar:"عدم اليقين ليس سبباً وجيهاً للحذر."}], correct:[0,1],
  e:{de:"Vorsicht im Zweifel ist immer die sicherere Wahl.", ar:"الحذر عند الشك هو الخيار الأكثر أماناً دائماً."}},
{ c:"grundregeln", q:{de:"Kannst du dich grundsätzlich darauf verlassen, dass ein erwachsener Fussgänger sich korrekt verhält?", ar:"هل يمكنك أصلاً الاعتماد على أن يتصرف المشاة البالغون بشكل صحيح؟"}, a:[
  {de:"Ja, das ist der Vertrauensgrundsatz.", ar:"نعم، هذا هو مبدأ الثقة."},{de:"Bei erkennbarer Unsicherheit gilt das nicht mehr.", ar:"لا ينطبق ذلك بعد الآن عند ملاحظة تردد واضح."},{de:"Du darfst deshalb völlig unaufmerksam fahren.", ar:"لذلك يمكنك القيادة بلا انتباه على الإطلاق."}], correct:[0,1],
  e:{de:"Der Vertrauensgrundsatz befreit nie von grundsätzlicher Aufmerksamkeit.", ar:"مبدأ الثقة لا يُعفي أبداً من الانتباه الأساسي."}},

// ---------- signale (Erweiterung) ----------
{ c:"signale", q:{de:"Was bedeutet dieses blaue Signal mit den zwei ungleich langen Pfeilen?", ar:"ماذا تعني هذه الإشارة الزرقاء بسهمين مختلفي الطول؟"}, a:[
  {de:"Vortritt vor Gegenverkehr gewähren.", ar:"امنح الأولوية للسير المقابل."},{de:"Der lange, weisse Pfeil steht für den bevorrechtigten Gegenverkehr.", ar:"السهم الأبيض الطويل يمثل السير المقابل صاحب الأولوية."},{de:"Du darfst trotzdem gleichzeitig einfahren.", ar:"يمكنك الدخول رغم ذلك في الوقت نفسه."}], correct:[0,1],
  e:{de:"Typisch bei schmalen Passagen, wo nicht beide Richtungen gleichzeitig Platz haben.", ar:"شائعة عند الممرات الضيقة التي لا تتسع لكلا الاتجاهين معاً."}, scene:"schild_vortritt_gegenverkehr"},
{ c:"signale", q:{de:"Auf der Gegenseite einer Engstelle steht das spiegelbildliche Signal «Vortritt gegenüber Gegenverkehr».", ar:"على الجهة المقابلة لمكان ضيق توجد الإشارة المعاكسة «الأولوية لك على السير المقابل»."}, a:[
  {de:"Die Fahrzeuge aus deiner Richtung haben dort Vortritt.", ar:"للمركبات القادمة من اتجاهك الأولوية هناك."},{de:"Beide Signale gehören immer als Paar zusammen.", ar:"تنتمي الإشارتان دائماً معاً كزوج."},{de:"Die Farbe der Signale spielt dabei keine Rolle.", ar:"لا دور للون الإشارتين في ذلك."}], correct:[0,1],
  e:{de:"So wissen beide Seiten eindeutig, wer warten muss.", ar:"هكذا يعرف الطرفان بوضوح من يجب أن ينتظر."}},
{ c:"signale", q:{de:"Was bedeutet ein weisses rundes Signal mit grauen Diagonalstreifen?", ar:"ماذا تعني إشارة دائرية بيضاء بخطوط قطرية رمادية؟"}, a:[
  {de:"Ende sämtlicher Beschränkungen.", ar:"نهاية جميع القيود."},{de:"Ab hier gelten wieder die allgemeinen Regeln.", ar:"من هنا تعود القواعد العامة للسريان."},{de:"Es hebt nur die Höchstgeschwindigkeit auf, nichts anderes.", ar:"يُلغي فقط الحد الأقصى للسرعة، لا شيء آخر."}], correct:[0,1],
  e:{de:"Dieses Signal kann mehrere zuvor signalisierte Einschränkungen gleichzeitig aufheben.", ar:"يمكن لهذه الإشارة إلغاء عدة قيود سابقة في آن واحد."}, scene:"ende_beschraenkung"},
{ c:"signale", q:{de:"Du fährst in ein Quartier mit dem weissen Signal «ZONE 30».", ar:"تدخل حياً بإشارة بيضاء «ZONE 30»."}, a:[
  {de:"Die Beschränkung gilt für das ganze signalisierte Gebiet.", ar:"يسري القيد على كامل المنطقة المُشار إليها."},{de:"Nicht nur für die Strasse, auf der das Signal steht.", ar:"وليس فقط للشارع الذي عليه الإشارة."},{de:"Du musst bei jeder Kreuzung im Quartier ein neues Signal sehen.", ar:"يجب أن ترى إشارة جديدة عند كل تقاطع في الحي."}], correct:[0,1],
  e:{de:"Ein Signal am Ortseingang der Zone genügt für das ganze Gebiet.", ar:"تكفي إشارة واحدة عند مدخل المنطقة لتغطية كامل الحي."}, scene:"schild_zone30"},
{ c:"signale", q:{de:"Was unterscheidet eine Begegnungszone von einer Tempo-30-Zone?", ar:"ما الفرق بين منطقة اللقاء ومنطقة 30؟"}, a:[
  {de:"In der Begegnungszone gilt Schrittgeschwindigkeit und Fussgänger haben Vortritt.", ar:"في منطقة اللقاء تسري سرعة المشي وللمشاة الأولوية."},{de:"In der Tempo-30-Zone gibt es keinen generellen Fussgängervortritt.", ar:"في منطقة 30 لا توجد أولوية عامة للمشاة."},{de:"Beide Zonen sind rechtlich identisch.", ar:"المنطقتان متطابقتان قانونياً."}], correct:[0,1],
  e:{de:"Die Begegnungszone erlaubt Fussgängern, die ganze Fläche zu nutzen.", ar:"منطقة اللقاء تسمح للمشاة باستخدام كامل المساحة."}},
{ c:"signale", q:{de:"Auf der Fahrbahn ist eine breite gelbe durchgezogene Linie am Fahrbahnrand markiert.", ar:"على حافة الطريق خط أصفر عريض متصل."}, a:[
  {de:"Sie kennzeichnet meist ein Halteverbot.", ar:"تُشير عادة إلى منع الوقوف."},{de:"Gelbe Markierungen betreffen oft Busse oder Fussgänger statt normale Fahrzeuge.", ar:"العلامات الصفراء غالباً ما تخص الحافلات أو المشاة بدل المركبات العادية."},{de:"Sie hat immer dieselbe Bedeutung wie eine weisse Sicherheitslinie.", ar:"لها نفس معنى الخط الأبيض المتصل دائماً."}], correct:[0,1],
  e:{de:"Gelb weicht bewusst von der normalen weissen Fahrbahnmarkierung ab.", ar:"يختلف الأصفر عمداً عن العلامات البيضاء العادية للطريق."}},
{ c:"signale", q:{de:"Ein Signal ist stark verschmutzt oder beschädigt und kaum lesbar.", ar:"إشارة متسخة أو تالفة بشدة ويصعب قراءتها."}, a:[
  {de:"Du musst trotzdem versuchen, ihre Bedeutung zu erkennen.", ar:"عليك رغم ذلك محاولة معرفة معناها."},{de:"Im Zweifel besonders vorsichtig fahren.", ar:"عند الشك قُد بحذر إضافي."},{de:"Ein unleserliches Signal darfst du komplett ignorieren.", ar:"يمكنك تجاهل الإشارة غير المقروءة تماماً."}], correct:[0,1],
  e:{de:"Die Grundregel gilt unabhängig vom Zustand der Beschilderung.", ar:"القاعدة الأساسية سارية بصرف النظر عن حالة اللافتات."}},
{ c:"signale", q:{de:"Zwei Signale widersprechen sich scheinbar an derselben Stelle, zum Beispiel durch eine Baustelle überklebt.", ar:"إشارتان تتناقضان ظاهرياً في نفس المكان، مثلاً بسبب لصقة من أشغال الطريق."}, a:[
  {de:"Das neuere oder zusätzliche Signal geht in der Regel vor.", ar:"عادة تسبق الإشارة الأحدث أو الإضافية."},{de:"Bei Unklarheit besonders vorsichtig und langsam fahren.", ar:"عند الغموض قُد بحذر وببطء إضافي."},{de:"Widersprüchliche Signale darf man immer frei interpretieren.", ar:"يمكن دائماً تفسير الإشارات المتناقضة بحرية."}], correct:[0,1],
  e:{de:"Baustellensignale überlagern oft temporär die ursprüngliche Signalisation.", ar:"غالباً ما تُغطّي إشارات الأشغال مؤقتاً على الإشارات الأصلية."}},

// ---------- tempo (Erweiterung) ----------
{ c:"tempo", q:{de:"Herbstlaub bedeckt die Fahrbahn nach Regen.", ar:"أوراق الخريف تغطي الطريق بعد المطر."}, a:[
  {de:"Nasses Laub kann fast so rutschig wie Eis sein.", ar:"الأوراق المبللة قد تكون زلقة تقريباً كالجليد."},{de:"Tempo reduzieren und sanft bremsen.", ar:"خفّض السرعة واكبح بلطف."},{de:"Laub hat praktisch keinen Einfluss auf die Haftung.", ar:"للأوراق تأثير يكاد يكون معدوماً على التماسك."}], correct:[0,1],
  e:{de:"Besonders in Kurven und beim Bremsen ist das Risiko erhöht.", ar:"الخطر أكبر خصوصاً في المنعطفات وعند الكبح."}, scene:"herbstlaub"},
{ c:"tempo", q:{de:"Die Fahrbahn glänzt leicht und wirkt bei Kälte verdächtig glatt.", ar:"يلمع سطح الطريق قليلاً ويبدو زلقاً بشكل مثير للريبة في البرد."}, a:[
  {de:"Das kann auf Glatteis hinweisen, auch ohne sichtbaren Schnee.", ar:"قد يُشير ذلك إلى جليد أملس حتى بلا ثلج ظاهر."},{de:"Tempo deutlich reduzieren und Abstand vergrössern.", ar:"خفّض السرعة كثيراً وزِد المسافة."},{de:"Glänzende Strassen sind bei Kälte immer nur nass, nie glatt.", ar:"الطرق اللامعة في البرد مبللة فقط دائماً، لا زلقة أبداً."}], correct:[0,1],
  e:{de:"Vor allem auf Brücken und im Schatten bildet sich Glatteis besonders schnell.", ar:"يتشكّل الجليد الأملس بسرعة خاصة على الجسور وفي الظل."}, scene:"glatteis"},
{ c:"tempo", q:{de:"In der Begegnungszone begegnest du spielenden Kindern auf der ganzen Fahrbahnbreite.", ar:"تلتقي في منطقة اللقاء بأطفال يلعبون على كامل عرض الطريق."}, a:[
  {de:"Schrittgeschwindigkeit einhalten.", ar:"التزم بسرعة المشي."},{de:"Bremsbereit bleiben.", ar:"ابقَ مستعداً للكبح."},{de:"Die Kinder müssen dir automatisch Platz machen.", ar:"يجب على الأطفال إفساح المجال لك تلقائياً."}], correct:[0,1],
  e:{de:"Fussgänger haben in der Begegnungszone Vortritt.", ar:"للمشاة الأولوية في منطقة اللقاء."}},
{ c:"tempo", q:{de:"Wie verändert sich dein Sichtfeld, wenn du schneller fährst?", ar:"كيف يتغيّر مجال رؤيتك عندما تقود بسرعة أكبر؟"}, a:[
  {de:"Es wird enger, du nimmst weniger am Rand wahr.", ar:"يضيق، وتلاحظ أقل على الأطراف."},{de:"Details werden schwerer erkennbar.", ar:"يصعب إدراك التفاصيل أكثر."},{de:"Es bleibt bei jeder Geschwindigkeit exakt gleich breit.", ar:"يبقى بنفس الاتساع تماماً عند أي سرعة."}], correct:[0,1],
  e:{de:"Hohe Geschwindigkeit reduziert das periphere Sehen spürbar.", ar:"السرعة العالية تُقلّل الرؤية الجانبية بشكل ملموس."}},
{ c:"tempo", q:{de:"Du fährst mit einem vollbeladenen Fahrzeug und Anhänger.", ar:"تقود مركبة محمّلة بالكامل مع مقطورة."}, a:[
  {de:"Der Bremsweg verlängert sich gegenüber einem leeren Fahrzeug.", ar:"تطول مسافة الكبح مقارنة بمركبة فارغة."},{de:"Mehr Gewicht bedeutet mehr Bewegungsenergie.", ar:"الوزن الأكبر يعني طاقة حركية أكبر."},{de:"Das Gewicht hat praktisch keinen Einfluss auf den Bremsweg.", ar:"للوزن تأثير يكاد يكون معدوماً على مسافة الكبح."}], correct:[0,1],
  e:{de:"Deshalb gilt für Anhängerkombinationen ohnehin schon eine tiefere Höchstgeschwindigkeit.", ar:"لهذا السبب أصلاً تنطبق سرعة قصوى أقل على تركيبات المقطورات."}},
{ c:"tempo", q:{de:"Wie lang ist ungefähr der Anhalteweg bei 120 km/h auf trockener Strasse?", ar:"كم تقريباً مسافة التوقف عند 120 كم/س على طريق جاف؟"}, a:[
  {de:"Reaktionsweg 12×3=36 m.", ar:"مسافة رد الفعل 12×3=36 متراً."},{de:"Bremsweg 12×12=144 m.", ar:"مسافة الكبح 12×12=144 متراً."},{de:"Zusammen deutlich unter 100 m.", ar:"المجموع أقل بكثير من 100 متر."}], correct:[0,1],
  e:{de:"Insgesamt ergibt das rund 180 m Anhalteweg – fast zwei Fussballfelder.", ar:"يعطي ذلك بالمجموع نحو 180 متراً — ما يقارب ملعبي كرة قدم."}},
{ c:"tempo", q:{de:"Bei Kolonnenfahrt in der Stadt hältst du sehr geringen Abstand, um niemanden hineinzulassen.", ar:"في سير الطوابير بالمدينة تُبقي مسافة قصيرة جداً لمنع أحد من الدخول."}, a:[
  {de:"Das erhöht das Risiko eines Auffahrunfalls.", ar:"يزيد ذلك خطر حادث اصطدام خلفي."},{de:"Ein Mindestabstand bleibt auch im Stadtverkehr wichtig.", ar:"تبقى المسافة الدنيا مهمة حتى في سير المدينة."},{de:"In der Stadt gilt keine Abstandsregel.", ar:"لا تنطبق قاعدة المسافة داخل المدينة."}], correct:[0,1],
  e:{de:"Auch bei niedrigem Tempo braucht ein Auffahrunfall nur einen kurzen Moment Unaufmerksamkeit.", ar:"حتى بسرعة منخفضة، يكفي لحظة تشتت قصيرة لوقوع حادث اصطدام خلفي."}},
{ c:"tempo", q:{de:"Auf der Autobahn herrscht dichter Nebel mit stark schwankender Sicht.", ar:"ضباب كثيف بمدى رؤية متقلب بشدة على الأوتوستراد."}, a:[
  {de:"Tempo laufend an die aktuelle Sicht anpassen.", ar:"كيّف السرعة باستمرار مع الرؤية الحالية."},{de:"Abstand deutlich vergrössern.", ar:"زِد المسافة بشكل كبير."},{de:"Die Höchstgeschwindigkeit von 120 km/h bleibt in jedem Fall angemessen.", ar:"يبقى الحد الأقصى 120 كم/س مناسباً في كل الأحوال."}], correct:[0,1],
  e:{de:"Wechselnde Sicht verlangt ständige Anpassung, nicht eine feste Geschwindigkeit.", ar:"الرؤية المتغيرة تتطلب تكيّفاً مستمراً، لا سرعة ثابتة."}},

// ---------- vortritt (Erweiterung) ----------
{ c:"vortritt", q:{de:"Ein Lastwagen im Kreisel setzt den Blinker erst kurz vor der gewünschten Ausfahrt.", ar:"شاحنة داخل الدوّار تشغّل الغماز فقط قبل المخرج المطلوب بقليل."}, a:[
  {de:"Solange er im Kreisel ist, hat er Vortritt.", ar:"طالما هو داخل الدوّار له الأولوية."},{de:"Späte Blinker-Nutzung ändert nichts an dieser Vortrittsregel.", ar:"استعمال الغماز المتأخر لا يغيّر شيئاً من هذه القاعدة."},{de:"Du darfst wegen der späten Ankündigung vor ihm einfahren.", ar:"يمكنك الدخول أمامه بسبب الإعلان المتأخر."}], correct:[0,1],
  e:{de:"Der Blinker ist nur eine Ankündigung, kein Vortrittsverzicht.", ar:"الغماز مجرد إعلان، وليس تنازلاً عن الأولوية."}, scene:"kreisel_lkw"},
{ c:"vortritt", q:{de:"An einer Engstelle mit dem Signal «Vortritt vor Gegenverkehr gewähren» kommt dir ein Fahrzeug entgegen.", ar:"عند مكان ضيق بإشارة «امنح الأولوية للسير المقابل»، تأتيك مركبة من الاتجاه المعاكس."}, a:[
  {de:"Du musst warten, bis der Gegenverkehr durch ist.", ar:"عليك الانتظار حتى يمر السير المقابل."},{de:"Nötigenfalls rechtzeitig anhalten.", ar:"توقّف في الوقت المناسب عند الحاجة."},{de:"Wer zuerst bei der Engstelle ist, hat automatisch Vortritt.", ar:"من يصل أولاً إلى المكان الضيق له الأولوية تلقائياً."}], correct:[0,1],
  e:{de:"Das Signal regelt den Vortritt eindeutig, unabhängig von der Ankunftszeit.", ar:"الإشارة تحسم الأولوية بوضوح، بصرف النظر عن وقت الوصول."}, scene:"schild_vortritt_gegenverkehr"},
{ c:"vortritt", q:{de:"Du willst aus einer Waldstrasse ohne jede Signalisation auf eine Kantonsstrasse einbiegen.", ar:"تريد الدخول من طريق غابة بلا أي إشارة إلى طريق كانتوني."}, a:[
  {de:"Ohne Signal gilt grundsätzlich der Rechtsvortritt der Verzweigung.", ar:"بلا إشارة تنطبق أصلاً أولوية اليمين عند التقاطع."},{de:"In der Praxis ist oft zusätzliche Vorsicht nötig, da die Situation unklar sein kann.", ar:"عملياً غالباً ما يلزم حذر إضافي لأن الموقف قد يكون غير واضح."},{de:"Waldstrassen haben immer automatisch Vortritt.", ar:"لطرق الغابات الأولوية تلقائياً دائماً."}], correct:[0,1],
  e:{de:"Unklare, wenig befahrene Verzweigungen verlangen besonders vorsichtiges Herantasten.", ar:"التقاطعات غير الواضحة والقليلة الاستخدام تتطلب اقتراباً حذراً بشكل خاص."}},
{ c:"vortritt", q:{de:"Ein Fussgänger mit Kopfhörern schaut auf sein Handy und nähert sich dem Fahrbahnrand.", ar:"شخص بسماعات ينظر إلى هاتفه ويقترب من حافة الطريق."}, a:[
  {de:"Er nimmt den Verkehr möglicherweise nicht wahr.", ar:"قد لا يُدرك حركة السير."},{de:"Tempo reduzieren und bremsbereit sein.", ar:"خفّض السرعة وكن مستعداً للكبح."},{de:"Kopfhörer haben keinerlei Einfluss auf sein Verhalten.", ar:"ليس للسماعات أي تأثير على تصرفه."}], correct:[0,1],
  e:{de:"Abgelenkte Fussgänger verhalten sich besonders unvorhersehbar.", ar:"يتصرف المشاة المشتتون بشكل غير متوقع بشكل خاص."}, scene:"fussgaenger_kopfhoerer"},
{ c:"vortritt", q:{de:"Neben deinem Fahrzeug an der Ampel steht ein Lastwagen, ihr wollt beide rechts abbiegen.", ar:"إلى جانب مركبتك عند الإشارة شاحنة، وكلاكما يريد الانعطاف يميناً."}, a:[
  {de:"Lastwagen haben grosse tote Winkel, besonders auf der rechten Seite.", ar:"للشاحنات نقاط عمياء واسعة، خاصة على الجانب الأيمن."},{de:"Bleib nicht direkt neben oder knapp vor der Fahrerkabine stehen.", ar:"لا تقف مباشرة بجانب مقصورة السائق أو أمامها بقليل."},{de:"Der Lastwagenfahrer sieht dich in jedem Fall zuverlässig.", ar:"سائق الشاحنة يراك بشكل موثوق في كل الأحوال."}], correct:[0,1],
  e:{de:"Beim Abbiegen schwenkt das Heck eines Lastwagens zudem stark aus.", ar:"عند الانعطاف تنحرف مؤخرة الشاحنة أيضاً بشكل كبير."}, scene:"lkw_toter_winkel"},
{ c:"vortritt", q:{de:"Du näherst dich einer Feuerwehrzufahrt, die durch eine rot-weisse Markierung gekennzeichnet ist.", ar:"تقترب من مدخل إطفاء مُميَّز بعلامة حمراء وبيضاء."}, a:[
  {de:"Halten und Parkieren sind dort verboten.", ar:"الوقوف والركن ممنوعان هناك."},{de:"Die Zufahrt muss im Notfall sofort nutzbar sein.", ar:"يجب أن يكون المدخل قابلاً للاستخدام فوراً عند الطوارئ."},{de:"Kurzes Halten für wenige Minuten ist ausdrücklich erlaubt.", ar:"الوقوف القصير لبضع دقائق مسموح صراحة."}], correct:[0,1],
  e:{de:"Diese Markierung hat höchste Priorität für die Sicherheit anderer.", ar:"لهذه العلامة أولوية قصوى لسلامة الآخرين."}, scene:"feuerwehrzufahrt"},
{ c:"vortritt", q:{de:"Auf einer Kreuzung mit Lichtsignalanlage zeigt dein Signal Grün, die Kreuzung dahinter ist aber verstopft.", ar:"عند تقاطع بإشارة ضوئية، إشارتك خضراء لكن التقاطع خلفها مسدود."}, a:[
  {de:"Trotz Grün nicht einfahren, wenn du die Kreuzung blockieren würdest.", ar:"لا تدخل رغم الأخضر إذا كنت ستسدّ التقاطع."},{de:"Grün ist keine Garantie für freie Weiterfahrt.", ar:"الأخضر ليس ضماناً لمتابعة السير بحرية."},{de:"Bei Grün musst du immer einfahren, unabhängig von der Lage dahinter.", ar:"عند الأخضر يجب الدخول دائماً بصرف النظر عن الوضع خلف التقاطع."}], correct:[0,1],
  e:{de:"Ein blockierter Kreuzungsbereich verursacht ein Verkehrschaos für alle Richtungen.", ar:"سدّ منطقة التقاطع يسبب فوضى مرورية لجميع الاتجاهات."}},
{ c:"vortritt", q:{de:"Ein Signal zeigt «Vortritt gegenüber Gegenverkehr» in deiner Fahrtrichtung an einer Engstelle.", ar:"إشارة تُظهر «لك الأولوية على السير المقابل» في اتجاهك عند مكان ضيق."}, a:[
  {de:"Fahrzeuge aus der Gegenrichtung müssen dir den Vortritt lassen.", ar:"يجب على المركبات القادمة من الاتجاه المعاكس منحك الأولوية."},{de:"Trotzdem solltest du bremsbereit bleiben, falls jemand die Regel missachtet.", ar:"رغم ذلك يُستحسن أن تبقى مستعداً للكبح إذا لم يلتزم أحد بالقاعدة."},{de:"Du darfst deshalb ohne jede Rücksicht durchfahren.", ar:"لذلك يمكنك العبور دون أي اعتبار على الإطلاق."}], correct:[0,1],
  e:{de:"Formaler Vortritt schützt nie vollständig vor Fehlern anderer.", ar:"الأولوية الشكلية لا تحمي أبداً بشكل كامل من أخطاء الآخرين."}},
{ c:"vortritt", q:{de:"Du verlässt einen Kreisel und musst dabei einen markierten Fussgängerstreifen queren.", ar:"تغادر دوّاراً وعليك عبور ممر مشاة معلَّم أثناء ذلك."}, a:[
  {de:"Fussgänger auf dem Streifen haben weiterhin Vortritt.", ar:"للمشاة على الممر الأولوية رغم ذلك."},{de:"Das Verlassen des Kreisels hebt diese Regel nicht auf.", ar:"مغادرة الدوّار لا تُلغي هذه القاعدة."},{de:"Beim Verlassen des Kreisels hast du gegenüber allen automatisch Vortritt.", ar:"عند مغادرة الدوّار لك الأولوية تلقائياً على الجميع."}], correct:[0,1],
  e:{de:"Fussgängerstreifen behalten ihre Regel unabhängig vom Ort.", ar:"تحتفظ ممرات المشاة بقاعدتها بصرف النظر عن المكان."}},
{ c:"vortritt", q:{de:"Zwei Velofahrer nebeneinander nähern sich einer Verzweigung von rechts, ohne Signale.", ar:"راكبا دراجتين جنباً إلى جنب يقتربان من تقاطع من اليمين، بلا إشارات."}, a:[
  {de:"Der Rechtsvortritt gilt auch gegenüber Velofahrern.", ar:"تنطبق أولوية اليمين حتى تجاه راكبي الدراجات."},{de:"Velofahrer sind an dieselben Vortrittsregeln gebunden wie Autos.", ar:"يخضع راكبو الدراجات لنفس قواعد الأولوية كالسيارات."},{de:"Velofahrer haben grundsätzlich nie Vortritt gegenüber Autos.", ar:"ليس لراكبي الدراجات الأولوية أصلاً أبداً تجاه السيارات."}], correct:[0,1],
  e:{de:"Die Fahrzeugart ändert nichts an der Rechtsvortrittsregel.", ar:"نوع المركبة لا يغيّر شيئاً من قاعدة أولوية اليمين."}},

// ---------- manoever (Erweiterung) ----------
{ c:"manoever", q:{de:"Auf einem Behindertenparkplatz ist noch Platz frei, du hast keinen Ausweis, aber willst nur 2 Minuten warten.", ar:"مكان فارغ في موقف ذوي الإعاقة، وليس لديك بطاقة، لكنك تريد الانتظار دقيقتين فقط."}, a:[
  {de:"Diese Plätze sind ausschliesslich für Ausweisinhaber reserviert.", ar:"هذه المواقف محجوزة حصراً لحاملي البطاقة."},{de:"Die kurze Dauer ändert nichts an der Regel.", ar:"المدة القصيرة لا تغيّر شيئاً من القاعدة."},{de:"Zwei Minuten Wartezeit sind ausdrücklich erlaubt.", ar:"دقيقتان انتظار مسموحتان صراحة."}], correct:[0,1],
  e:{de:"Auch kurzes Halten blockiert im Ernstfall jemanden, der auf den Platz angewiesen ist.", ar:"حتى الوقوف القصير قد يسدّ المكان على من يحتاجه فعلاً."}, scene:"behindertenparkplatz"},
{ c:"manoever", q:{de:"Vor einem Geschäft willst du kurz Waren in einer signalisierten Ladezone abladen.", ar:"تريد تفريغ بضائع بسرعة في منطقة تحميل معلَّمة أمام متجر."}, a:[
  {de:"Ladezonen sind meist zeitlich für den Warenumschlag begrenzt.", ar:"مناطق التحميل محدودة زمنياً عادة لتبادل البضائع."},{de:"Ausserhalb der erlaubten Zeit gelten sie oft als normale Halte- oder Parkverbotszone.", ar:"خارج الوقت المسموح تُعتبر غالباً منطقة منع وقوف أو ركن عادية."},{de:"Ladezonen darf grundsätzlich jedes Fahrzeug beliebig lange nutzen.", ar:"يمكن لأي مركبة استخدام منطقة التحميل لأي مدة أصلاً."}], correct:[0,1],
  e:{de:"Die genauen Zeiten stehen jeweils auf der Zusatztafel.", ar:"الأوقات الدقيقة مذكورة على اللوحة الإضافية في كل مرة."}, scene:"ladezone"},
{ c:"manoever", q:{de:"Im Kreisel fährt ein breiter Lastwagen, der die Innenspur mitbenutzen muss, um die Kurve zu schaffen.", ar:"شاحنة عريضة تسير داخل الدوّار وتحتاج استخدام المسرب الداخلي لإكمال المنعطف."}, a:[
  {de:"Grösseren Abstand halten und ihm den nötigen Platz lassen.", ar:"حافظ على مسافة أكبر واترك له المساحة اللازمة."},{de:"Nicht versuchen, ihn in dieser Situation zu überholen.", ar:"لا تحاول تجاوزه في هذا الموقف."},{de:"Grosse Fahrzeuge dürfen im Kreisel grundsätzlich nicht von der Fahrbahn abweichen.", ar:"لا يجوز للمركبات الكبيرة أصلاً الانحراف عن مسربها في الدوّار."}], correct:[0,1],
  e:{de:"Lastwagen brauchen aus technischen Gründen manchmal mehr Platz als markiert.", ar:"تحتاج الشاحنات أحياناً لأسباب تقنية مساحة أكبر مما هو معلَّم."}, scene:"kreisel_lkw"},
{ c:"manoever", q:{de:"Du willst auf einer Strasse mit Sicherheitslinie in der Mitte ein langsames Fahrzeug überholen.", ar:"تريد تجاوز مركبة بطيئة على طريق بخط أمان في الوسط."}, a:[
  {de:"Über die durchgezogene Linie darfst du nicht überholen.", ar:"لا يجوز التجاوز فوق الخط المتصل."},{de:"Warten, bis eine unterbrochene Leitlinie oder ein freigegebener Abschnitt kommt.", ar:"انتظر حتى يظهر خط متقطع أو مقطع مسموح."},{de:"Kurzes Überfahren ist erlaubt, wenn niemand entgegenkommt.", ar:"العبور اللحظي مسموح إذا لم يكن هناك سير مقابل."}], correct:[0,1],
  e:{de:"Die durchgezogene Linie ist ein striktes Überholverbot, unabhängig von der Verkehrslage.", ar:"الخط المتصل منع صارم للتجاوز، بصرف النظر عن حالة السير."}},
{ c:"manoever", q:{de:"Auf einem Parkplatz gilt Rechtsvortritt, du fährst rückwärts aus einer Lücke, ein anderes Fahrzeug fährt normal vorwärts.", ar:"في موقف تسري فيه أولوية اليمين، تخرج بالرجوع للخلف، ومركبة أخرى تسير للأمام بشكل عادي."}, a:[
  {de:"Wer rückwärtsfährt, hat gegenüber dem fahrenden Verkehr keinen Vortritt.", ar:"من يرجع للخلف ليست له الأولوية على السير المتحرك."},{de:"Besondere Vorsicht und langsames Fahren sind hier Pflicht.", ar:"الحذر الإضافي والسير البطيء واجبان هنا."},{de:"Beim Rückwärtsfahren gilt automatisch Vortritt, weil es schwieriger ist.", ar:"عند الرجوع للخلف تنطبق الأولوية تلقائياً لأن الأمر أصعب."}], correct:[0,1],
  e:{de:"Rückwärtsfahrende müssen sich stets in den übrigen Verkehr einordnen.", ar:"على من يرجع للخلف الاندماج دائماً مع بقية حركة السير."}},
{ c:"manoever", q:{de:"Du willst auf der Autobahn von der mittleren auf die rechte Spur wechseln, um die nächste Ausfahrt zu nehmen.", ar:"تريد تغيير المسرب من الأوسط إلى الأيمن على الأوتوستراد لأخذ المخرج التالي."}, a:[
  {de:"Frühzeitig blinken und den toten Winkel kontrollieren.", ar:"استعمل الغماز مبكراً وتحقق من النقطة العمياء."},{de:"Nicht in letzter Sekunde hektisch die Spur wechseln.", ar:"لا تُغيّر المسرب في اللحظة الأخيرة بعصبية."},{de:"Ein Spurwechsel auf der Autobahn braucht keine spezielle Vorbereitung.", ar:"تغيير المسرب على الأوتوستراد لا يحتاج أي تحضير خاص."}], correct:[0,1],
  e:{de:"Späte, abrupte Manöver auf der Autobahn sind eine häufige Unfallursache.", ar:"المناورات المتأخرة والمفاجئة على الأوتوستراد سبب شائع للحوادث."}},
{ c:"manoever", q:{de:"Du willst in einer engen Altstadtgasse an einem parkierten Fahrzeug vorbeifahren, Gegenverkehr könnte kommen.", ar:"تريد المرور بجانب مركبة متوقفة في زقاق ضيق بالبلدة القديمة، وقد يأتي سير مقابل."}, a:[
  {de:"Wenn deine Seite durch das parkierte Fahrzeug blockiert ist, hat der Gegenverkehr Vortritt.", ar:"إذا كانت جهتك مسدودة بالمركبة المتوقفة، فللسير المقابل الأولوية."},{de:"Das ist ein Anwendungsfall der Hindernisregel.", ar:"هذه إحدى حالات تطبيق قاعدة العائق."},{de:"Wer zuerst in die Gasse einfährt, hat automatisch Vortritt bis zum Ende.", ar:"من يدخل الزقاق أولاً له الأولوية تلقائياً حتى النهاية."}], correct:[0,1],
  e:{de:"Ein parkiertes Fahrzeug zählt als Hindernis im Sinn dieser Regel.", ar:"تُعتبر المركبة المتوقفة عائقاً بمفهوم هذه القاعدة."}},
{ c:"manoever", q:{de:"Beim Ausparken aus einer Parklücke am Fahrbahnrand näherst du dich fliessendem Verkehr.", ar:"عند الخروج من موقف على حافة الطريق تقترب من حركة سير متدفقة."}, a:[
  {de:"Du hast beim Ausparken keinen Vortritt.", ar:"ليست لك الأولوية عند الخروج من الموقف."},{de:"Blinker setzen und den fliessenden Verkehr abwarten.", ar:"استعمل الغماز وانتظر حركة السير المتدفقة."},{de:"Fahrzeuge im fliessenden Verkehr müssen dir automatisch Platz machen.", ar:"يجب على مركبات السير المتدفق إفساح المجال لك تلقائياً."}], correct:[0,1],
  e:{de:"Wer aus einer Parklücke ausfährt, ordnet sich immer wartepflichtig ein.", ar:"من يخرج من موقف عليه دائماً الاندماج بصفته ملزماً بالانتظار."}},

// ---------- autobahn (Erweiterung) ----------
{ c:"autobahn", q:{de:"Auf der Autobahn siehst du weit vorne Bremslichter aufleuchten.", ar:"ترى أضواء الكبح تُضاء بعيداً أمامك على الأوتوستراد."}, a:[
  {de:"Vorausschauend selbst schon leicht verzögern.", ar:"خفّف سرعتك أنت أيضاً بشكل استباقي."},{de:"Das kann ein früher Hinweis auf einen Stau sein.", ar:"قد يكون ذلك إشارة مبكرة على ازدحام."},{de:"Erst reagieren, wenn das Fahrzeug direkt vor dir bremst.", ar:"لا تتفاعل إلا عندما تكبح المركبة التي أمامك مباشرة."}], correct:[0,1],
  e:{de:"Frühzeitiges Reagieren verhindert eine Kettenreaktion von Auffahrunfällen.", ar:"التفاعل المبكر يمنع سلسلة من حوادث الاصطدام الخلفي."}},
{ c:"autobahn", q:{de:"Auf der Autobahn wechselst du auf die Überholspur, obwohl dort kein Fahrzeug zum Überholen ist.", ar:"تنتقل إلى مسرب التجاوز على الأوتوستراد رغم عدم وجود مركبة لتجاوزها."}, a:[
  {de:"Ohne Überholgrund solltest du auf der rechten Spur bleiben.", ar:"بلا سبب للتجاوز، عليك البقاء في المسرب الأيمن."},{de:"Unnötiges Blockieren der linken Spur behindert schnelleren Verkehr.", ar:"سدّ المسرب الأيسر بلا داعٍ يعيق السير الأسرع."},{de:"Die linke Spur darfst du jederzeit grundlos benutzen.", ar:"يمكنك استخدام المسرب الأيسر في أي وقت بلا سبب."}], correct:[0,1],
  e:{de:"Das Rechtsfahrgebot gilt auf der Autobahn genauso.", ar:"وجوب السير يميناً ينطبق على الأوتوستراد أيضاً."}},
{ c:"autobahn", q:{de:"Du fährst mit einem Wohnmobil auf der Autobahn bei starkem Seitenwind.", ar:"تقود سيارة تخييم على الأوتوستراد في رياح جانبية قوية."}, a:[
  {de:"Grosse Fahrzeuge sind windanfälliger.", ar:"المركبات الكبيرة أكثر عرضة للرياح."},{de:"Tempo reduzieren und Lenkrad besonders fest halten.", ar:"خفّض السرعة وأمسك المقود بقوة إضافية."},{de:"Seitenwind hat auf grosse Fahrzeuge keinen besonderen Einfluss.", ar:"ليس للرياح الجانبية تأثير خاص على المركبات الكبيرة."}], correct:[0,1],
  e:{de:"Besonders bei Brücken und Waldlücken kann Seitenwind plötzlich zunehmen.", ar:"قد تزداد الرياح الجانبية فجأة خاصة عند الجسور وفجوات الغابات."}},
{ c:"autobahn", q:{de:"An einer Autobahnraststätte willst du kurz auf dem Pannenstreifen der Zufahrt halten, um zu telefonieren.", ar:"تريد التوقف على شريط الأعطال عند مدخل منطقة استراحة على الأوتوستراد لتتصل هاتفياً."}, a:[
  {de:"Der Pannenstreifen ist nur für Pannen und Notfälle bestimmt.", ar:"شريط الأعطال مخصص فقط للأعطال والطوارئ."},{de:"Besser die Raststätte selbst anfahren und dort parkieren.", ar:"من الأفضل التوجه إلى منطقة الاستراحة نفسها والركن هناك."},{de:"Kurzes Telefonieren ist ein ausreichender Grund zum Halten dort.", ar:"مكالمة هاتفية قصيرة سبب كافٍ للتوقف هناك."}], correct:[0,1],
  e:{de:"Unnötiges Halten auf dem Pannenstreifen gefährdet dich und andere erheblich.", ar:"الوقوف غير الضروري على شريط الأعطال يعرّضك ويعرّض الآخرين لخطر كبير."}},
{ c:"autobahn", q:{de:"Beim Auffahren auf die Autobahn ist der Einspurstreifen ungewöhnlich kurz.", ar:"مسرب التسارع عند دخول الأوتوستراد قصير بشكل غير معتاد."}, a:[
  {de:"Frühzeitig und zügig beschleunigen.", ar:"سرّع مبكراً وبسرعة كافية."},{de:"Aufmerksam nach einer passenden Lücke suchen.", ar:"ابحث بانتباه عن فراغ مناسب."},{de:"Ein kurzer Einspurstreifen erlaubt automatisch Vortritt gegenüber der Autobahn.", ar:"المسرب القصير يمنح الأولوية تلقائياً على الأوتوستراد."}], correct:[0,1],
  e:{de:"Ein kurzer Streifen verlangt umso mehr vorausschauendes Handeln.", ar:"المسرب القصير يتطلب تصرفاً استباقياً أكبر."}},
{ c:"autobahn", q:{de:"Auf einer dreispurigen Autobahn überholst du auf der mittleren Spur ein Fahrzeug, das auf der rechten Spur fährt.", ar:"تتجاوز على المسرب الأوسط لأوتوستراد بثلاثة مسارب مركبة تسير على المسرب الأيمن."}, a:[
  {de:"Das ist ein normaler Überholvorgang links des langsameren Fahrzeugs.", ar:"هذا تجاوز عادي من يسار المركبة الأبطأ."},{de:"Nach dem Überholen solltest du wieder nach rechts einordnen, wenn frei.", ar:"بعد التجاوز عليك العودة إلى اليمين إذا كان خالياً."},{de:"Das gilt bereits als verbotenes Rechtsüberholen.", ar:"يُعد هذا بالفعل تجاوزاً محظوراً من اليمين."}], correct:[0,1],
  e:{de:"Rechtsüberholen liegt erst vor, wenn du ein Fahrzeug auf einer weiter links liegenden Spur rechts überholst.", ar:"التجاوز من اليمين يحدث فقط عندما تتجاوز مركبة على مسرب أكثر يساراً من جهة اليمين."}},
{ c:"autobahn", q:{de:"Nachts auf der Autobahn ist die Fahrbahnbeleuchtung sehr schwach.", ar:"إضاءة الطريق ضعيفة جداً ليلاً على الأوتوستراد."}, a:[
  {de:"Fernlicht nutzen, solange kein Gegenverkehr oder Vordermann geblendet wird.", ar:"استعمل الضوء العالي طالما لا يُبهر أحداً أمامك أو مقابلاً."},{de:"Aufmerksamkeit und Abstand erhöhen.", ar:"زِد الانتباه والمسافة."},{de:"Auf der Autobahn ist Fernlicht grundsätzlich verboten.", ar:"الضوء العالي ممنوع أصلاً على الأوتوستراد."}], correct:[0,1],
  e:{de:"Auf Autobahnen ist Fernlicht bei fehlender Beleuchtung und freier Fahrbahn sinnvoll.", ar:"الضوء العالي مفيد على الأوتوستراد عند غياب الإنارة وخلوّ الطريق."}, scene:"nachtfahrt"},
{ c:"autobahn", q:{de:"Du entdeckst, dass dein Reifen während der Fahrt auf der Autobahn stark an Druck verliert.", ar:"تكتشف أن ضغط إطارك ينخفض بشدة أثناء القيادة على الأوتوستراد."}, a:[
  {de:"Lenkrad ruhig festhalten und kontrolliert abbremsen.", ar:"أمسك المقود بثبات واكبح بشكل متحكم."},{de:"Rechts einordnen und den Pannenstreifen anfahren.", ar:"اتجه يميناً وتوجه إلى شريط الأعطال."},{de:"Sofort eine Vollbremsung einleiten.", ar:"ابدأ بكبح طارئ كامل فوراً."}], correct:[0,1],
  e:{de:"Abruptes Bremsen bei einem Reifendefekt kann das Fahrzeug zum Schleudern bringen.", ar:"الكبح المفاجئ عند عطل الإطار قد يجعل المركبة تنزلق."}},

// ---------- mensch (Erweiterung) ----------
{ c:"mensch", q:{de:"Du trägst eine Sonnenbrille mit sehr dunklen Gläsern und fährst in einen Tunnel.", ar:"ترتدي نظارة شمسية داكنة جداً وتدخل نفقاً."}, a:[
  {de:"Im Tunnel wird die Sicht durch die dunklen Gläser zusätzlich eingeschränkt.", ar:"تُقيَّد الرؤية إضافياً في النفق بسبب العدسات الداكنة."},{de:"Rechtzeitig absetzen, bevor es zu dunkel wird.", ar:"انزعها في الوقت المناسب قبل أن تصبح الرؤية داكنة جداً."},{de:"Sonnenbrillen haben in Tunneln keinerlei Einfluss.", ar:"ليس للنظارات الشمسية أي تأثير في الأنفاق."}], correct:[0,1],
  e:{de:"Plötzliche Dunkelheit verlangt sofortige, gute Sicht.", ar:"الظلام المفاجئ يتطلب رؤية جيدة فورية."}},
{ c:"mensch", q:{de:"Du bist emotional sehr aufgewühlt, zum Beispiel nach einem Streit, und musst losfahren.", ar:"أنت منفعل عاطفياً بشدة، مثلاً بعد شجار، وعليك الانطلاق بالقيادة."}, a:[
  {de:"Starke Emotionen können die Konzentration und Reaktionsfähigkeit beeinträchtigen.", ar:"المشاعر القوية قد تُضعف التركيز والقدرة على رد الفعل."},{de:"Ein kurzer Moment zum Beruhigen kann sinnvoll sein.", ar:"لحظة قصيرة للهدوء قد تكون مفيدة."},{de:"Emotionen haben keinerlei Einfluss auf die Fahrsicherheit.", ar:"ليس للمشاعر أي تأثير على سلامة القيادة."}], correct:[0,1],
  e:{de:"Aggressives oder unkonzentriertes Fahren nach Stress erhöht das Unfallrisiko.", ar:"القيادة العدوانية أو غير المركّزة بعد التوتر تزيد خطر الحوادث."}},
{ c:"mensch", q:{de:"Ein neues Medikament wurde dir erst vor Kurzem verschrieben.", ar:"وُصف لك دواء جديد مؤخراً فقط."}, a:[
  {de:"Wirkung und Nebenwirkungen sind dir am Anfang oft nicht bekannt.", ar:"غالباً لا تكون التأثيرات الجانبية معروفة لك في البداية."},{de:"Bei neuen Medikamenten besonders vorsichtig sein.", ar:"كن حذراً بشكل خاص مع الأدوية الجديدة."},{de:"Ein neu verschriebenes Medikament ist automatisch unbedenklich fürs Fahren.", ar:"الدواء الموصوف حديثاً آمن تلقائياً للقيادة."}], correct:[0,1],
  e:{de:"Ärztliche oder pharmazeutische Beratung schafft hier Klarheit.", ar:"استشارة الطبيب أو الصيدلي توضّح الأمر هنا."}},
{ c:"mensch", q:{de:"Du fährst eine sehr lange, monotone Strecke auf der Autobahn ohne Pause.", ar:"تقود مسافة طويلة رتيبة على الأوتوستراد بلا استراحة."}, a:[
  {de:"Monotonie kann genauso müde machen wie echte körperliche Erschöpfung.", ar:"الرتابة قد تسبب تعباً مماثلاً للإرهاق الجسدي الحقيقي."},{de:"Regelmässige Pausen alle rund 2 Stunden sind empfehlenswert.", ar:"يُنصح بأخذ استراحات منتظمة كل ساعتين تقريباً."},{de:"Auf der Autobahn kann Monotonie die Konzentration nicht beeinträchtigen.", ar:"لا يمكن للرتابة أن تُضعف التركيز على الأوتوستراد."}], correct:[0,1],
  e:{de:"Ein Streckenwechsel oder eine kurze Pause hilft gegen den «Autobahn-Hypnose»-Effekt.", ar:"تغيير المسار أو استراحة قصيرة يساعدان ضد تأثير «تنويم الأوتوستراد»."}},
{ c:"mensch", q:{de:"Du bist überzeugt, dass du auch nach zwei Gläsern Wein noch perfekt fahren kannst.", ar:"أنت مقتنع بأنك لا تزال تستطيع القيادة بشكل ممتاز بعد كأسي نبيذ."}, a:[
  {de:"Alkohol verzerrt oft die Selbsteinschätzung der eigenen Fahrfähigkeit.", ar:"غالباً ما يُشوّه الكحول تقييمك الذاتي لقدرتك على القيادة."},{de:"Die Alkoholgrenze gilt unabhängig vom eigenen Gefühl.", ar:"حد الكحول ساري بصرف النظر عن شعورك الشخصي."},{de:"Ein subjektiv gutes Gefühl ist ein zuverlässiger Massstab.", ar:"الشعور الجيد الذاتي معيار موثوق."}], correct:[0,1],
  e:{de:"Genau diese Selbstüberschätzung macht Alkohol am Steuer so gefährlich.", ar:"هذا التقدير الذاتي المبالغ فيه بالضبط يجعل الكحول خطيراً جداً أثناء القيادة."}},
{ c:"mensch", q:{de:"Du fährst mit einer beginnenden Erkältung und leichtem Schwindel.", ar:"تقود ببداية نزلة برد ودوار خفيف."}, a:[
  {de:"Auch leichte Symptome können die Fahrfähigkeit beeinträchtigen.", ar:"حتى الأعراض الخفيفة قد تُضعف القدرة على القيادة."},{de:"Bei Zweifeln lieber auf eine andere Fahrweise oder Person ausweichen.", ar:"عند الشك من الأفضل اللجوء لوسيلة نقل أخرى أو شخص آخر."},{de:"Solange man noch stehen kann, ist Autofahren immer problemlos.", ar:"طالما يمكنك الوقوف على قدميك، فالقيادة دائماً بلا مشكلة."}], correct:[0,1],
  e:{de:"Schwindel kann die Reaktionsfähigkeit im entscheidenden Moment plötzlich einschränken.", ar:"قد يُضعف الدوار القدرة على رد الفعل فجأة في اللحظة الحاسمة."}},

// ---------- fahrzeug (Erweiterung) ----------
{ c:"fahrzeug", q:{de:"Die Kontrollleuchte für den Reifendruck leuchtet während der Fahrt auf.", ar:"يضيء ضوء تحذير ضغط الإطارات أثناء القيادة."}, a:[
  {de:"Bei nächster Gelegenheit sicher anhalten und den Druck prüfen.", ar:"توقف بأمان عند أول فرصة وتحقق من الضغط."},{de:"Ein plötzlicher Druckverlust kann das Fahrverhalten stark verändern.", ar:"فقدان الضغط المفاجئ قد يُغيّر سلوك القيادة بشدة."},{de:"Diese Warnleuchte kann während der Fahrt ignoriert werden.", ar:"يمكن تجاهل ضوء التحذير هذا أثناء القيادة."}], correct:[0,1],
  e:{de:"Ein zu tiefer Druck erhöht das Risiko eines Reifenplatzers.", ar:"انخفاض الضغط الشديد يزيد خطر انفجار الإطار."}, scene:"armaturenbrett"},
{ c:"fahrzeug", q:{de:"Vor einer längeren Fahrt willst du dein Fahrzeug kurz kontrollieren.", ar:"تريد فحص مركبتك بسرعة قبل رحلة طويلة."}, a:[
  {de:"Reifendruck und Profiltiefe prüfen.", ar:"تحقق من ضغط الإطارات وعمق النقش."},{de:"Öl- und Kühlmittelstand kontrollieren.", ar:"تحقق من مستوى الزيت وسائل التبريد."},{de:"Eine Sichtkontrolle ist gesetzlich und praktisch völlig unnötig.", ar:"الفحص البصري غير ضروري إطلاقاً قانونياً وعملياً."}], correct:[0,1],
  e:{de:"Eine kurze Kontrolle kann Pannen auf der Reise deutlich reduzieren.", ar:"الفحص السريع يمكن أن يُقلّل الأعطال أثناء الرحلة بشكل ملحوظ."}},
{ c:"fahrzeug", q:{de:"Die Bremsen deines Fahrzeugs fühlen sich beim Treten weich und schwammig an.", ar:"تشعر بأن الفرامل طرية ومترهلة عند الضغط عليها."}, a:[
  {de:"Das kann auf ein technisches Problem hinweisen.", ar:"قد يُشير ذلك إلى مشكلة تقنية."},{de:"Eine Fachwerkstatt sollte das Fahrzeug möglichst bald prüfen.", ar:"يجب على ورشة متخصصة فحص المركبة في أقرب وقت ممكن."},{de:"Weiche Bremsen sind normal und unbedenklich.", ar:"الفرامل الطرية طبيعية وغير مقلقة."}], correct:[0,1],
  e:{de:"Bremsprobleme gehören zu den gefährlichsten technischen Mängeln überhaupt.", ar:"مشاكل الفرامل من أخطر الأعطال التقنية على الإطلاق."}},
{ c:"fahrzeug", q:{de:"Nach einer Fahrt durch eine tiefe Pfütze bemerkst du, dass die Bremsen schwächer wirken.", ar:"بعد المرور في بركة عميقة تلاحظ أن الفرامل أصبحت أضعف."}, a:[
  {de:"Wasser auf den Bremsscheiben kann die Wirkung kurzfristig verringern.", ar:"الماء على أقراص الفرامل قد يُقلّل فعاليتها بشكل مؤقت."},{de:"Bei geringer Geschwindigkeit vorsichtig mehrmals leicht bremsen, um sie zu trocknen.", ar:"اكبح بخفة عدة مرات بسرعة منخفضة لتجفيفها."},{de:"Nasse Bremsen wirken immer sofort genauso stark wie trockene.", ar:"الفرامل المبللة تعمل دائماً بنفس قوة الفرامل الجافة فوراً."}], correct:[0,1],
  e:{de:"Diese Technik hilft, die volle Bremswirkung schneller wiederherzustellen.", ar:"تساعد هذه التقنية على استعادة فعالية الكبح الكاملة بسرعة أكبر."}},
{ c:"fahrzeug", q:{de:"Dein Fahrzeug hat eine Anhängerkupplung, du willst einen kleinen Anhänger ziehen.", ar:"لمركبتك مقطورة ربط، وتريد جرّ مقطورة صغيرة."}, a:[
  {de:"Vor der Fahrt die Verbindung und die Beleuchtung des Anhängers prüfen.", ar:"تحقق قبل الانطلاق من الربط وإضاءة المقطورة."},{de:"Auch die Ladungssicherung im Anhänger kontrollieren.", ar:"تحقق أيضاً من تثبيت الحمولة داخل المقطورة."},{de:"Eine Kontrolle ist bei kleinen Anhängern nicht nötig.", ar:"الفحص غير ضروري مع المقطورات الصغيرة."}], correct:[0,1],
  e:{de:"Ein sich lösender Anhänger ist extrem gefährlich für den gesamten Verkehr.", ar:"انفصال المقطورة خطير جداً على كامل حركة السير."}},
{ c:"fahrzeug", q:{de:"Ein Kontrolllämpchen für die elektronische Stabilitätskontrolle (ESP) leuchtet dauerhaft.", ar:"يضيء ضوء تحكم الثبات الإلكتروني (ESP) باستمرار."}, a:[
  {de:"Das kann auf eine Störung dieses Sicherheitssystems hinweisen.", ar:"قد يُشير ذلك إلى عطل في نظام الأمان هذا."},{de:"Das Fahrzeug sollte kontrolliert werden.", ar:"يجب فحص المركبة."},{de:"Ohne funktionierendes ESP verändert sich das Fahrverhalten in Grenzsituationen nicht.", ar:"بلا ESP فعّال، لا يتغيّر سلوك القيادة في المواقف الحرجة."}], correct:[0,1],
  e:{de:"Ohne ESP kann das Fahrzeug in kritischen Situationen leichter ausbrechen.", ar:"بلا ESP يمكن أن تنزلق المركبة بسهولة أكبر في المواقف الحرجة."}},
{ c:"fahrzeug", q:{de:"Du bemerkst, dass ein Scheinwerfer defekt ist, kurz bevor es dunkel wird.", ar:"تلاحظ أن أحد المصابيح الأمامية معطّل قبيل حلول الظلام."}, a:[
  {de:"Mit nur einem funktionierenden Scheinwerfer ist das Fahrzeug schlechter sichtbar.", ar:"بمصباح واحد فقط تعمل، تصبح المركبة أقل وضوحاً للرؤية."},{de:"Die Reparatur sollte möglichst bald erfolgen.", ar:"يجب إصلاحه في أقرب وقت ممكن."},{de:"Ein defekter Scheinwerfer hat keinen Einfluss auf die Verkehrssicherheit.", ar:"المصباح المعطّل ليس له تأثير على السلامة المرورية."}], correct:[0,1],
  e:{de:"Andere Verkehrsteilnehmer können die Fahrzeugbreite falsch einschätzen.", ar:"قد يُخطئ مستخدمو الطريق الآخرون في تقدير عرض المركبة."}},

// ---------- umwelt (Erweiterung) ----------
{ c:"umwelt", q:{de:"Du planst eine kurze Strecke von 500 Metern.", ar:"تخطط لمسافة قصيرة من 500 متر."}, a:[
  {de:"Zu Fuss oder mit dem Velo ist das oft eine sinnvolle Alternative.", ar:"غالباً ما يكون المشي أو الدراجة بديلاً منطقياً."},{de:"Kurze Strecken mit kaltem Motor verbrauchen überproportional viel Treibstoff.", ar:"المسافات القصيرة بمحرك بارد تستهلك وقوداً أكثر من المعتاد نسبياً."},{de:"Die Fahrzeugwahl hat auf so kurzen Strecken keinerlei Einfluss auf die Umwelt.", ar:"اختيار وسيلة النقل ليس له أي تأثير بيئي على مسافة قصيرة كهذه."}], correct:[0,1],
  e:{de:"Kaltstarts sind besonders ineffizient und schlecht für die Umwelt.", ar:"عمليات التشغيل البارد غير فعّالة بشكل خاص وسيئة للبيئة."}},
{ c:"umwelt", q:{de:"Du fährst regelmässig mit unnötig viel Gepäck im Kofferraum.", ar:"تقود بانتظام بحمولة زائدة غير ضرورية في صندوق السيارة."}, a:[
  {de:"Zusätzliches Gewicht erhöht den Treibstoffverbrauch.", ar:"الوزن الإضافي يزيد استهلاك الوقود."},{de:"Unnötigen Ballast regelmässig auszuladen spart auf Dauer Ressourcen.", ar:"تفريغ الحمولة الزائدة بانتظام يوفّر الموارد على المدى الطويل."},{de:"Das Gewicht im Kofferraum hat keinerlei Einfluss auf den Verbrauch.", ar:"الوزن في الصندوق ليس له أي تأثير على الاستهلاك."}], correct:[0,1],
  e:{de:"Vor allem im Stadtverkehr mit häufigem Beschleunigen macht sich das Gewicht bemerkbar.", ar:"يظهر تأثير الوزن بشكل خاص في سير المدينة بتسارع متكرر."}},
{ c:"umwelt", q:{de:"Du fährst regelmässig dieselbe Strecke zur Arbeit und könntest eine Fahrgemeinschaft bilden.", ar:"تقود بانتظام نفس الطريق إلى العمل ويمكنك تشكيل مجموعة تنقل مشترك."}, a:[
  {de:"Fahrgemeinschaften reduzieren die Zahl der Fahrzeuge auf der Strasse.", ar:"التنقل المشترك يُقلّل عدد المركبات على الطريق."},{de:"Das senkt Verbrauch und Emissionen pro Person.", ar:"يخفّض ذلك الاستهلاك والانبعاثات لكل شخص."},{de:"Fahrgemeinschaften haben keinerlei ökologischen Nutzen.", ar:"ليس للتنقل المشترك أي فائدة بيئية."}], correct:[0,1],
  e:{de:"Auch weniger Stau und weniger Parkplatzsuche sind ein Nebeneffekt.", ar:"تقليل الازدحام والبحث عن موقف أثر جانبي إضافي."}},
{ c:"umwelt", q:{de:"Beim Beschleunigen an einer Ampel trittst du das Gaspedal jeweils sehr stark durch.", ar:"عند الانطلاق من الإشارة تضغط دواسة البنزين بقوة كبيرة في كل مرة."}, a:[
  {de:"Starkes Beschleunigen erhöht den Verbrauch deutlich.", ar:"التسارع القوي يزيد الاستهلاك بشكل ملحوظ."},{de:"Sanftes, gleichmässiges Beschleunigen ist meist effizienter.", ar:"التسارع اللطيف والمنتظم أكثر كفاءة عادة."},{de:"Die Art des Beschleunigens hat auf den Verbrauch keinen messbaren Einfluss.", ar:"طريقة التسارع ليس لها تأثير يُذكر على الاستهلاك."}], correct:[0,1],
  e:{de:"Vorausschauendes, ruhiges Fahren spart über die Zeit spürbar Treibstoff.", ar:"القيادة الهادئة والاستباقية توفّر الوقود بشكل ملحوظ مع الوقت."}},

// ---------- notfall (Erweiterung) ----------
{ c:"notfall", q:{de:"An einer Unfallstelle sind mehrere Personen leicht verletzt, aber ansprechbar.", ar:"في مكان حادث عدة أشخاص مصابون إصابات طفيفة لكنهم واعون."}, a:[
  {de:"Sie beruhigen und wenn möglich vor weiterem Verkehr schützen.", ar:"طمئنهم واحمهم إن أمكن من حركة السير الإضافية."},{de:"Trotzdem die Rettungskette Sichern–Helfen–Alarmieren einhalten.", ar:"التزم رغم ذلك بسلسلة الإنقاذ: تأمين ثم إسعاف ثم اتصال."},{de:"Bei ansprechbaren Personen ist keine Alarmierung nötig.", ar:"لا حاجة للاتصال بالطوارئ مع الأشخاص الواعين."}], correct:[0,1],
  e:{de:"Auch leichte Verletzungen können sich als schwerer herausstellen, als sie zunächst wirken.", ar:"قد تتضح الإصابات الطفيفة لاحقاً أنها أخطر مما بدت في البداية."}},
{ c:"notfall", q:{de:"Du kommst als Erster an eine Unfallstelle auf einer kurvigen Landstrasse.", ar:"تصل أولاً إلى مكان حادث على طريق ريفي متعرج."}, a:[
  {de:"Dein eigenes Fahrzeug so positionieren, dass es warnt und schützt.", ar:"ضع مركبتك بحيث تُنذر وتحمي."},{de:"Warnblinker sofort einschalten.", ar:"شغّل أضواء التحذير فوراً."},{de:"Das eigene Fahrzeug spielt für die Absicherung keine Rolle.", ar:"مركبتك الخاصة ليس لها أي دور في التأمين."}], correct:[0,1],
  e:{de:"In unübersichtlichen Kurven ist frühzeitige Warnung besonders wichtig.", ar:"التحذير المبكر مهم بشكل خاص في المنعطفات غير الواضحة."}},
{ c:"notfall", q:{de:"Eine Person klagt nach einem Unfall über Nackenschmerzen, ist aber bei Bewusstsein und atmet normal.", ar:"يشتكي شخص من ألم في الرقبة بعد حادث لكنه واعٍ ويتنفس بشكل طبيعي."}, a:[
  {de:"Möglichst nicht unnötig bewegen, ausser bei unmittelbarer Gefahr.", ar:"تجنّب تحريكه بلا داعٍ إلا عند خطر مباشر."},{de:"Beruhigend auf die Person einwirken, bis Hilfe eintrifft.", ar:"طمئن الشخص إلى أن تصل المساعدة."},{de:"Den Kopf sofort selbst kräftig durchbewegen, um Beweglichkeit zu prüfen.", ar:"حرّك رأسه بنفسك بقوة فوراً للتحقق من قدرته على الحركة."}], correct:[0,1],
  e:{de:"Bei möglicher Wirbelsäulenverletzung kann unnötiges Bewegen den Schaden verschlimmern.", ar:"عند احتمال إصابة العمود الفقري، قد يُفاقم التحريك غير الضروري الضرر."}},
{ c:"notfall", q:{de:"Auf der Autobahn siehst du ein liegen gebliebenes Fahrzeug ohne sichtbare Absicherung.", ar:"ترى على الأوتوستراد مركبة معطّلة بلا تأمين ظاهر."}, a:[
  {de:"Selbst nicht abrupt bremsen oder gefährlich anhalten.", ar:"لا تكبح فجأة ولا تتوقف بشكل خطير بنفسك."},{de:"Wenn sicher möglich, die Notrufnummer informieren.", ar:"أبلغ رقم الطوارئ إذا أمكن ذلك بأمان."},{de:"Sofort auf dem Pannenstreifen daneben anhalten, um zu helfen.", ar:"توقف فوراً بجانبها على شريط الأعطال للمساعدة."}], correct:[0,1],
  e:{de:"Ein zusätzlich haltendes Fahrzeug kann die Gefahrenstelle noch vergrössern.", ar:"وقوف مركبة إضافية قد يزيد من خطورة المكان."}},
{ c:"notfall", q:{de:"Du willst einer Person Erste Hilfe leisten, hast aber keine medizinische Ausbildung.", ar:"تريد تقديم إسعافات أولية لشخص لكن ليس لديك تدريب طبي."}, a:[
  {de:"Der im Nothelferkurs vermittelte Grundwissensstand reicht meist aus.", ar:"المعرفة الأساسية من دورة الإسعافات الأولية تكفي غالباً."},{de:"Untätig bleiben ist riskanter als einfache, richtige Handgriffe.", ar:"البقاء بلا تصرف أخطر من إجراءات بسيطة صحيحة."},{de:"Ohne medizinisches Studium darfst du gar nichts tun.", ar:"بلا دراسة طبية لا يمكنك فعل أي شيء إطلاقاً."}], correct:[0,1],
  e:{de:"Genau dafür ist der obligatorische Nothelferkurs für den Führerausweis gedacht.", ar:"لهذا بالضبط صُممت دورة الإسعافات الأولية الإلزامية للحصول على الرخصة."}},
{ c:"notfall", q:{de:"Nach einem kleinen Auffahrunfall ohne Verletzte streiten sich die Beteiligten über die Schuldfrage.", ar:"بعد حادث اصطدام خلفي بسيط بلا إصابات، يتجادل الأطراف حول المسؤولية."}, a:[
  {de:"Ruhig bleiben und die Fakten für die Versicherung festhalten.", ar:"ابقَ هادئاً ودوّن الوقائع من أجل التأمين."},{de:"Ein europäischer Unfallbericht kann die Abwicklung erleichtern.", ar:"يمكن لتقرير الحادث الأوروبي أن يُسهّل الإجراءات."},{de:"Die Schuldfrage muss zwingend sofort vor Ort endgültig geklärt werden.", ar:"يجب حسم مسألة المسؤولية نهائياً وفوراً في عين المكان."}], correct:[0,1],
  e:{de:"Für die Beweissicherung reichen Fotos und ein sachlicher Bericht meist aus.", ar:"عادة تكفي الصور وتقرير موضوعي لتوثيق الأدلة."}},

// ---------- ausweis (Erweiterung) ----------
{ c:"ausweis", q:{de:"Du hast den Lernfahrausweis noch nicht, willst aber schon den VKU besuchen, um Zeit zu sparen.", ar:"لا تملك رخصة التعلّم بعد، لكنك تريد حضور VKU لتوفير الوقت."}, a:[
  {de:"Der VKU setzt einen gültigen Lernfahrausweis voraus.", ar:"VKU يتطلب رخصة تعلّم سارية."},{de:"Ohne Lernfahrausweis kannst du dich nicht gültig anmelden.", ar:"بلا رخصة تعلّم لا يمكنك التسجيل بشكل صحيح."},{de:"Die Reihenfolge der Ausbildungsschritte spielt keine Rolle.", ar:"ترتيب خطوات التدريب غير مهم."}], correct:[0,1],
  e:{de:"Erst Theorieprüfung, dann Lernfahrausweis, dann VKU.", ar:"أولاً النظري، ثم رخصة التعلّم، ثم VKU."}},
{ c:"ausweis", q:{de:"Deine Theorieprüfung liegt schon lange zurück, der Lernfahrausweis ist inzwischen abgelaufen.", ar:"مرّ وقت طويل على امتحانك النظري، وانتهت صلاحية رخصة التعلّم الآن."}, a:[
  {de:"Der Lernfahrausweis Kategorie B ist 24 Monate gültig.", ar:"رخصة التعلّم فئة B صالحة 24 شهراً."},{de:"Nach Ablauf ist in der Regel ein neues Gesuch nötig.", ar:"بعد انتهاء الصلاحية يلزم عادة تقديم طلب جديد."},{de:"Ein abgelaufener Lernfahrausweis bleibt automatisch unbegrenzt gültig.", ar:"تبقى رخصة التعلّم المنتهية سارية تلقائياً بلا حدود."}], correct:[0,1],
  e:{de:"Plane die praktische Prüfung darum rechtzeitig innerhalb der Gültigkeitsdauer.", ar:"لذلك خطّط للامتحان العملي في الوقت المناسب ضمن مدة الصلاحية."}},
{ c:"ausweis", q:{de:"Du ziehst während der Ausbildung in einen anderen Kanton um.", ar:"تنتقل إلى كانتون آخر أثناء التدريب."}, a:[
  {de:"Kantone können unterschiedliche Zuständigkeiten und Abläufe haben.", ar:"قد تختلف الكانتونات في الجهات المختصة والإجراءات."},{de:"Es lohnt sich, die zuständige Strassenverkehrsbehörde frühzeitig zu informieren.", ar:"يستحق الأمر إبلاغ مصلحة المركبات المختصة مبكراً."},{de:"Ein Umzug hat auf die Führerausweisausbildung nie irgendeinen Einfluss.", ar:"للانتقال لا يوجد أي تأثير على تدريب رخصة القيادة أبداً."}], correct:[0,1],
  e:{de:"So vermeidest du unnötige Verzögerungen im Ablauf.", ar:"هكذا تتجنّب تأخيرات غير ضرورية في الإجراءات."}},
{ c:"ausweis", q:{de:"Während der dreijährigen Probezeit sammelst du mehrere kleinere Ordnungsbussen.", ar:"خلال فترة التجربة الثلاثية تتجمّع لديك عدة مخالفات بسيطة."}, a:[
  {de:"Kleinere Ordnungsbussen sind nicht dasselbe wie eine schwere Widerhandlung.", ar:"المخالفات البسيطة ليست كالمخالفة الخطيرة."},{de:"Wiederholtes Fehlverhalten kann trotzdem Konsequenzen haben.", ar:"التكرار قد يكون له عواقب رغم ذلك."},{de:"Ordnungsbussen haben während der Probezeit niemals irgendeine Bedeutung.", ar:"ليس للمخالفات البسيطة أي أهمية إطلاقاً خلال فترة التجربة."}], correct:[0,1],
  e:{de:"Ein sauberer Leumund erleichtert den Übergang zum unbefristeten Ausweis.", ar:"السجل النظيف يُسهّل الانتقال إلى الرخصة النهائية."}},
{ c:"ausweis", q:{de:"Du hast deinen Führerausweis verloren und musst kurzfristig fahren.", ar:"فقدت رخصة القيادة وعليك القيادة قريباً."}, a:[
  {de:"Der Verlust sollte der zuständigen Behörde gemeldet werden.", ar:"يجب إبلاغ الجهة المختصة بالفقدان."},{de:"Ohne gültigen Ausweisnachweis kann es bei einer Kontrolle Probleme geben.", ar:"بلا إثبات صالح للرخصة قد تحدث مشاكل عند أي مراقبة."},{de:"Ein verlorener Ausweis hat für das Fahren keinerlei praktische Bedeutung.", ar:"للرخصة المفقودة لا أهمية عملية للقيادة."}], correct:[0,1],
  e:{de:"In der Regel kann ein Ersatzausweis beantragt werden.", ar:"يمكن عادة طلب رخصة بديلة."}},
{ c:"ausweis", q:{de:"Du bist neu in die Schweiz gezogen und besitzt einen ausländischen Führerausweis.", ar:"انتقلت حديثاً إلى سويسرا وتملك رخصة قيادة أجنبية."}, a:[
  {de:"Je nach Herkunftsland gelten unterschiedliche Fristen und Regeln für den Umtausch.", ar:"تختلف المهل والقواعد للاستبدال حسب بلد المنشأ."},{de:"Es lohnt sich, dies frühzeitig bei der zuständigen Behörde abzuklären.", ar:"يستحق الأمر التأكد من ذلك مبكراً لدى الجهة المختصة."},{de:"Ein ausländischer Ausweis bleibt in der Schweiz automatisch für immer gültig.", ar:"تبقى الرخصة الأجنبية سارية تلقائياً إلى الأبد في سويسرا."}], correct:[0,1],
  e:{de:"Diese Frage betrifft besonders Personen, die neu zuziehen.", ar:"يخص هذا السؤال بشكل خاص القادمين الجدد."}},

// ---------- verkehrsteilnehmer (Erweiterung) ----------
{ c:"verkehrsteilnehmer", q:{de:"Ein Fahrzeug mit L-Tafel fährt vor dir eher unsicher und zögerlich.", ar:"مركبة بلوحة L تسير أمامك بتردد وعدم ثقة."}, a:[
  {de:"Das kennzeichnet einen Lernfahrer in Ausbildung.", ar:"تُشير إلى سائق متدرب في طور التعلّم."},{de:"Mehr Geduld und Abstand sind hier angebracht.", ar:"الصبر والمسافة الإضافية مناسبان هنا."},{de:"Lernfahrer verhalten sich verkehrsrechtlich identisch wie erfahrene Fahrer.", ar:"يتصرف المتدربون قانونياً بشكل مطابق للسائقين ذوي الخبرة."}], correct:[0,1],
  e:{de:"Der Vertrauensgrundsatz gilt gegenüber erkennbar unsicheren Personen nicht uneingeschränkt.", ar:"مبدأ الثقة لا ينطبق بلا قيود مع الأشخاص الذين يبدو عليهم التردد."}},
{ c:"verkehrsteilnehmer", q:{de:"Eine ältere Person überquert sehr langsam den Fussgängerstreifen.", ar:"شخص مسنّ يعبر ممر المشاة ببطء شديد."}, a:[
  {de:"Geduldig warten, bis die Person sicher auf dem Trottoir ist.", ar:"انتظر بصبر حتى يصل الشخص بأمان إلى الرصيف."},{de:"Nicht drängeln oder hupen.", ar:"لا تستعجله ولا تستعمل البوق."},{de:"Nach wenigen Sekunden darfst du langsam weiterrollen, auch wenn die Person noch auf dem Streifen ist.", ar:"يمكنك الانسياب ببطء بعد ثوانٍ قليلة حتى لو كان الشخص لا يزال على الممر."}], correct:[0,1],
  e:{de:"Der Vortritt gilt vollständig, bis der Streifen frei ist.", ar:"الأولوية سارية بالكامل حتى يخلو الممر."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein Fahrzeug mit ausländischem Kontrollschild verhält sich an einer Kreuzung ungewöhnlich unsicher.", ar:"مركبة بلوحة أجنبية تتصرف بتردد غير معتاد عند تقاطع."}, a:[
  {de:"Die Fahrperson kennt die lokalen Regeln möglicherweise noch nicht genau.", ar:"قد لا يعرف السائق القواعد المحلية بدقة بعد."},{de:"Zusätzliche Vorsicht und Geduld sind sinnvoll.", ar:"الحذر والصبر الإضافيان مفيدان."},{de:"Ausländische Kontrollschilder haben darauf keinerlei Einfluss.", ar:"ليس للوحات الأجنبية أي تأثير على ذلك."}], correct:[0,1],
  e:{de:"Der Vertrauensgrundsatz gilt bei erkennbarer Unsicherheit generell eingeschränkt.", ar:"مبدأ الثقة محدود عموماً عند ملاحظة التردد."}},
{ c:"verkehrsteilnehmer", q:{de:"Auf dem Trottoir fährt ein Kind mit dem Fahrrad, obwohl es dafür eigentlich zu alt ist.", ar:"طفل يقود دراجة على الرصيف رغم أنه أكبر سناً من المسموح لذلك."}, a:[
  {de:"Kinder können die Verkehrsregeln noch falsch einschätzen.", ar:"قد يُخطئ الأطفال في تقدير قواعد المرور."},{de:"An Ein- und Ausfahrten besonders auf plötzlich auftauchende Kinder achten.", ar:"انتبه بشكل خاص للأطفال الذين قد يظهرون فجأة عند المداخل والمخارج."},{de:"Kinder auf dem Trottoir sind für den Fahrzeugverkehr ohne jede Relevanz.", ar:"لا أهمية إطلاقاً للأطفال على الرصيف بالنسبة لحركة المركبات."}], correct:[0,1],
  e:{de:"Kinder können beim Herausfahren aus Einfahrten schnell unerwartet auf die Fahrbahn geraten.", ar:"قد يصل الأطفال فجأة إلى الطريق عند الخروج من المداخل."}},
{ c:"verkehrsteilnehmer", q:{de:"Ein Fahrzeug mit Anhänger für Pferdetransport fährt vor dir auffällig vorsichtig.", ar:"مركبة تجرّ مقطورة لنقل الخيول تسير أمامك بحذر ملحوظ."}, a:[
  {de:"Solche Transporte reagieren empfindlich auf ruckartige Fahrmanöver.", ar:"تتأثر هذه النقلات بشكل حساس بالمناورات المفاجئة."},{de:"Grösseren Abstand und mehr Geduld einplanen.", ar:"خطّط لمسافة أكبر وصبر إضافي."},{de:"Solche Fahrzeuge verhalten sich fahrdynamisch genau wie ein leeres Auto.", ar:"تتصرف هذه المركبات ديناميكياً تماماً كسيارة فارغة."}], correct:[0,1],
  e:{de:"Lebende Fracht kann sich zudem während der Fahrt bewegen und das Gleichgewicht verändern.", ar:"قد تتحرك الحمولة الحية أثناء القيادة وتُغيّر التوازن."}},

// ---------- bahnuebergang (Erweiterung) ----------
{ c:"bahnuebergang", q:{de:"An einem Bahnübergang ertönt ein akustisches Warnsignal, aber die Schranke bewegt sich noch nicht.", ar:"عند معبر السكة يُسمع صوت تحذير لكن الحاجز لم يتحرك بعد."}, a:[
  {de:"Das akustische Signal kündigt oft die Schliessung der Schranke an.", ar:"غالباً ما يُنذر الصوت بإغلاق الحاجز."},{de:"Vorsichtshalber die Annäherung verlangsamen.", ar:"خفّف سرعتك احترازياً عند الاقتراب."},{de:"Ohne bewegte Schranke besteht garantiert keinerlei Gefahr.", ar:"بلا حاجز متحرك لا يوجد أي خطر مضمون."}], correct:[0,1],
  e:{de:"Besser frühzeitig reagieren, als knapp vor der schliessenden Schranke stehen zu bleiben.", ar:"من الأفضل التفاعل مبكراً بدل التوقف قرب الحاجز وهو ينغلق."}},
{ c:"bahnuebergang", q:{de:"Du überquerst mit dem Velo einen Bahnübergang mit spitz verlaufenden Schienen.", ar:"تعبر بدراجتك معبر سكة بقضبان تسير بزاوية حادة."}, a:[
  {de:"Möglichst im rechten Winkel über die Schienen fahren.", ar:"اعبر القضبان بزاوية قائمة قدر الإمكان."},{de:"Das Vorderrad kann sonst in der Rille der Schiene hängen bleiben.", ar:"وإلا قد تعلق العجلة الأمامية في فتحة القضيب."},{de:"Der Winkel beim Überqueren spielt für Fahrräder überhaupt keine Rolle.", ar:"زاوية العبور لا تهم إطلاقاً بالنسبة للدراجات."}], correct:[0,1],
  e:{de:"Ein steckengebliebenes Vorderrad kann zu einem gefährlichen Sturz führen.", ar:"عجلة أمامية عالقة قد تؤدي إلى سقوط خطير."}},
{ c:"bahnuebergang", q:{de:"An einem Bahnübergang mit Schranke ist diese offen, aber du hörst in der Ferne ein Zugsignal.", ar:"عند معبر سكة بحاجز، الحاجز مفتوح لكنك تسمع صافرة قطار من بعيد."}, a:[
  {de:"Eine offene Schranke bedeutet nicht automatisch absolute Sicherheit.", ar:"الحاجز المفتوح لا يعني تلقائياً أماناً مطلقاً."},{de:"Aufmerksam bleiben und zügig, aber sicher queren.", ar:"ابقَ منتبهاً واعبر بسرعة معقولة وبأمان."},{de:"Ein Zugsignal aus der Ferne kann bei offener Schranke ignoriert werden.", ar:"يمكن تجاهل صافرة القطار البعيدة عندما يكون الحاجز مفتوحاً."}], correct:[0,1],
  e:{de:"Die Schranke reagiert mit einer gewissen Verzögerung auf ankommende Züge.", ar:"يستجيب الحاجز بتأخير معين لوصول القطارات."}},
{ c:"bahnuebergang", q:{de:"Du stehst mit deinem Fahrzeug in einer Kolonne, deren Ende knapp vor einem unbeschrankten Bahnübergang liegt.", ar:"تقف في طابور مركبات ينتهي بالقرب من معبر سكة بلا حاجز."}, a:[
  {de:"Nicht auf den Übergang fahren, wenn dahinter kein Platz ist.", ar:"لا تدخل المعبر إذا لم يكن هناك مكان خلفه."},{de:"Lieber vor dem Übergang warten, bis sich die Kolonne bewegt.", ar:"من الأفضل الانتظار قبل المعبر حتى يتحرك الطابور."},{de:"Der Übergang darf in jedem Fall als Warteraum genutzt werden.", ar:"يمكن استخدام المعبر كمنطقة انتظار في كل الأحوال."}], correct:[0,1],
  e:{de:"Auf den Schienen stehen zu bleiben ist eine der gefährlichsten Situationen überhaupt.", ar:"التوقف على القضبان من أخطر المواقف على الإطلاق."}},

// ---------- parken_halten (Erweiterung) ----------
{ c:"parken_halten", q:{de:"Du willst dein Fahrzeug für mehrere Tage an einer öffentlichen Strasse abstellen.", ar:"تريد ترك مركبتك لعدة أيام على طريق عام."}, a:[
  {de:"Regionale Vorschriften zu Dauerparkieren können das einschränken.", ar:"قد تُقيّد الأنظمة المحلية الركن لفترة طويلة."},{de:"Es lohnt sich, lokale Signale und Regelungen zu prüfen.", ar:"يستحق الأمر التحقق من الإشارات والأنظمة المحلية."},{de:"Dauerparkieren ist überall in der Schweiz automatisch und uneingeschränkt erlaubt.", ar:"الركن لمدة طويلة مسموح تلقائياً وبلا قيود في كل سويسرا."}], correct:[0,1],
  e:{de:"Manche Zonen verlangen ein periodisches Umparkieren oder haben Höchstdauern.", ar:"بعض المناطق تتطلب تغيير مكان الركن دورياً أو لها مدة قصوى."}},
{ c:"parken_halten", q:{de:"Du parkierst an einem Hang ohne angezogene Handbremse, nur mit einem eingelegten Gang.", ar:"تركن على منحدر بلا فرملة يد مشدودة، معتمداً فقط على غيار مُدرج."}, a:[
  {de:"Am Hang sollte zusätzlich die Handbremse angezogen werden.", ar:"يجب شدّ فرملة اليد إضافياً على المنحدر."},{de:"Die Räder können zusätzlich eingeschlagen werden, um wegzurollen zu verhindern.", ar:"يمكن أيضاً توجيه العجلات لمنع الانزلاق."},{de:"Ein eingelegter Gang allein reicht am Hang immer sicher aus.", ar:"الغيار المُدرج وحده يكفي دائماً بأمان على المنحدر."}], correct:[0,1],
  e:{de:"Ein wegrollendes Fahrzeug kann schwere Schäden oder Unfälle verursachen.", ar:"قد تسبب مركبة منزلقة أضراراً جسيمة أو حوادث."}},
{ c:"parken_halten", q:{de:"Ein Parkplatz ist mit einer Zeitbeschränkung signalisiert, du überschreitest sie versehentlich um wenige Minuten.", ar:"موقف مُشار بمدة زمنية محددة، وتتجاوزها سهواً بضع دقائق."}, a:[
  {de:"Auch eine kurze Überschreitung kann zu einer Busse führen.", ar:"حتى التجاوز البسيط قد يؤدي إلى غرامة."},{de:"Rechtzeitig zurückkehren oder die Parkzeit verlängern ist ratsam.", ar:"من الأفضل العودة في الوقت المناسب أو تمديد مدة الركن."},{de:"Wenige Minuten Überschreitung werden grundsätzlich nie geahndet.", ar:"لا يُعاقَب أبداً على تجاوز بضع دقائق أصلاً."}], correct:[0,1],
  e:{de:"Kontrollen berücksichtigen selten eine Kulanzfrist.", ar:"نادراً ما تأخذ المراقبة بعين الاعتبار فترة سماح."}},

// ---------- ladung_transport (Erweiterung) ----------
{ c:"ladung_transport", q:{de:"Du transportierst ein Fahrrad auf einem Heckträger ausserhalb des Fahrzeugs.", ar:"تنقل دراجة على حمّالة خلفية خارج المركبة."}, a:[
  {de:"Das Fahrrad muss sicher befestigt sein.", ar:"يجب تثبيت الدراجة بإحكام."},{de:"Wenn nötig, muss die Nummernschildbeleuchtung oder Sicht sichergestellt bleiben.", ar:"عند الحاجة يجب ضمان بقاء إضاءة اللوحة أو الرؤية واضحة."},{de:"Ein Heckträger darf beliebig die Sicht auf Rückleuchten und Kontrollschild versperren.", ar:"يمكن لحمّالة الدراجات حجب الأضواء الخلفية واللوحة كيفما كان."}], correct:[0,1],
  e:{de:"Oft ist eine zusätzliche beleuchtete Kennzeichnungstafel für den Träger nötig.", ar:"غالباً ما تلزم لوحة إضافية مضاءة للحمّالة."}},
{ c:"ladung_transport", q:{de:"Du transportierst zerbrechliche Gegenstände lose auf der Rückbank.", ar:"تنقل أغراضاً قابلة للكسر بشكل غير مثبّت على المقعد الخلفي."}, a:[
  {de:"Bei einer Notbremsung können sie zu gefährlichen Geschossen werden.", ar:"قد تتحول إلى قذائف خطيرة عند الكبح الطارئ."},{de:"Eine Sicherung, zum Beispiel in einer Box oder mit einem Gurt, ist sinnvoll.", ar:"التثبيت، مثلاً في صندوق أو بحزام، مفيد."},{de:"Auf der Rückbank besteht grundsätzlich keinerlei Risiko.", ar:"لا يوجد أي خطر أصلاً على المقعد الخلفي."}], correct:[0,1],
  e:{de:"Auch relativ leichte Gegenstände können bei hoher Verzögerung erheblichen Schaden anrichten.", ar:"حتى الأغراض الخفيفة نسبياً قد تُحدث ضرراً كبيراً عند التباطؤ الشديد."}},
{ c:"ladung_transport", q:{de:"Ein grosser Koffer steht lose im Kofferraum eines Kombis ohne Trenngitter.", ar:"حقيبة كبيرة موضوعة بشكل غير مثبّت في صندوق سيارة ستيشن بلا شبكة فاصلة."}, a:[
  {de:"Ohne Sicherung kann der Koffer bei einer Vollbremsung nach vorne geschleudert werden.", ar:"بلا تثبيت قد تندفع الحقيبة إلى الأمام عند الكبح الطارئ."},{de:"Ein Trenngitter oder Gurte reduzieren dieses Risiko deutlich.", ar:"تُقلّل الشبكة الفاصلة أو الأحزمة هذا الخطر بشكل ملحوظ."},{de:"Zwischen Kofferraum und Fahrgastraum besteht bei einer Kollision keinerlei Risiko.", ar:"لا يوجد أي خطر بين صندوق السيارة ومقصورة الركاب عند الاصطدام."}], correct:[0,1],
  e:{de:"Genau deshalb bieten viele Kombis werkseitig ein Trenngitter an.", ar:"لهذا السبب بالضبط تقدم سيارات الستيشن غالباً شبكة فاصلة من المصنع."}},

];
