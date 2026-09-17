import type { LavorazioneKey } from "@/i18n/config";
import type { LavorazioneContent, lavorazioniPage as ItPage } from "@/i18n/it/lavorazioni";

export const lavorazioniPage: typeof ItPage = {
  metaTitle: "Maquinações do tubo em linha transfer",
  metaDescription:
    "Furação, puncionamento, roscagem e calibragem de tubo metálico em ciclo contínuo em linhas transfer A.M.I. Uma página por maquinação.",
  title: "As maquinações do tubo.",
  lede: "Cada maquinação corresponde a uma estação da linha. Combinam-se na sequência exigida pelo desenho da peça, sem manuseamento manual entre operações.",
  fullListNote: "Lista completa das maquinações realizadas (p. ex. rebarbagem, soldadura, montagem):",
  fullListTodo: "A CONFIRMAR COM O GABINETE TÉCNICO",
  ctaTitle: "Uma maquinação que não vê aqui?",
  ctaText: "Envie-nos o desenho: dizemos-lhe se e como se integra numa linha transfer.",
  detail: {
    what: "O que faz",
    inLine: "Em linha transfer",
    needs: "O que precisamos de si",
    rangesTitle: "Gamas e limites.",
    rangesLede: "Dados a confirmar com o gabinete técnico antes da publicação.",
    ranges: ["Diâmetros e espessuras admissíveis", "Tolerâncias alcançáveis", "Exemplo de tempo de ciclo"],
    sectorsTitle: "Setores onde a usamos.",
    sectorsLede: "Componentes típicos que exigem esta maquinação.",
    metaSuffix: "de tubo — Linhas transfer",
  },
};

export const lavorazioni: Record<LavorazioneKey, LavorazioneContent> = {
  foratura: {
    slug: "furacao",
    name: "Furação",
    title: "Furação do tubo em linha transfer",
    lede: "Furos radiais e passantes executados numa ou várias estações da linha, com unidades de maquinação dedicadas posicionadas no passo exigido pelo desenho.",
    cosa: [
      "Furos simples ou múltiplos no mesmo troço de tubo, também em planos diferentes.",
      "Unidades de maquinação com avanço controlado, uma por cada grupo de furos.",
      "Posição dos furos definida pelo desenho da peça, não pelo catálogo da máquina.",
    ],
    inLinea: [
      "O tubo fica fixado na estação durante a maquinação: sem manuseamento manual da peça.",
      "O tempo de furação cabe no tempo de ciclo da linha, em paralelo com as outras estações.",
      "Apara evacuada na estação, sem contaminar as operações seguintes.",
    ],
    serve: [
      "Desenho da peça com posição, diâmetro e tolerância dos furos.",
      "Material, diâmetro e espessura do tubo.",
      "Produtividade pretendida (peças/hora ou peças/ano).",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
  tranciatura: {
    slug: "puncionamento",
    name: "Puncionamento",
    title: "Puncionamento do tubo sem apara",
    lede: "Remoção de material por deformação onde a geometria da peça o permite: mais rápido do que a furação e sem apara para gerir.",
    cosa: [
      "Aberturas, rasgos e entalhes obtidos com punção e matriz dedicados à peça.",
      "Sem apara: a estação mantém-se limpa e a peça não precisa de rebarbagem interior.",
      "Aplicável onde a espessura e a forma do tubo permitem uma deformação controlada.",
    ],
    inLinea: [
      "Ferramentas de puncionamento projetadas para cada peça e substituíveis na estação.",
      "Sincronizado com a indexação: a peça chega já fixada e orientada.",
      "Verificação prévia de viabilidade no desenho antes da proposta.",
    ],
    serve: [
      "Desenho com geometria das aberturas e tolerâncias.",
      "Material e espessura do tubo, para verificar se o puncionamento é aplicável.",
      "Volumes previstos: influenciam a duração das ferramentas e o dimensionamento.",
    ],
    settori: ["automotive", "building"],
  },
  filettatura: {
    slug: "roscagem",
    name: "Roscagem",
    title: "Roscagem do tubo em ciclo contínuo",
    lede: "Unidades de roscagem integradas na linha e sincronizadas com o ciclo de indexação, para roscar furos e extremidades sem sair do transfer.",
    cosa: [
      "Roscagem de furos radiais já executados nas estações anteriores.",
      "Roscagem de extremidades do tubo, onde o desenho o exige.",
      "Unidades de roscagem com controlo do ciclo de avanço e recuo.",
    ],
    inLinea: [
      "A furação e a roscagem realizam-se em estações consecutivas do mesmo transfer.",
      "Sem manuseamento da peça entre as duas operações: os eixos mantêm-se referenciados.",
      "Lubrificação dedicada na estação de roscagem.",
    ],
    serve: [
      "Designação da rosca e profundidade útil.",
      "Material do tubo e espessura de parede na zona roscada.",
      "Eventuais requisitos de controlo (passa/não passa em linha).",
    ],
    settori: ["automotive", "elettrodomestico"],
  },
  calibratura: {
    slug: "calibragem",
    name: "Calibragem",
    title: "Calibragem do tubo antes da maquinação",
    lede: "Correção do diâmetro e da circularidade do tubo em bruto, para dar às estações seguintes uma referência estável.",
    cosa: [
      "Correção da ovalização e das variações de diâmetro do tubo à entrada.",
      "Referência dimensional fiável para furação, puncionamento e roscagem.",
      "Calibragem de extremidades onde a peça tem de acoplar a uma união.",
    ],
    inLinea: [
      "Primeira estação útil após a carga: todas as maquinações seguintes trabalham sobre um tubo já calibrado.",
      "Ferramentas de calibragem dimensionadas para o diâmetro nominal da peça.",
      "Controlo em linha onde o caderno de encargos o exige.",
    ],
    serve: [
      "Diâmetro nominal e tolerância pretendida após calibragem.",
      "Qualidade do tubo à entrada (tolerâncias do fornecedor).",
      "Eventuais zonas da peça a deixar por calibrar.",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
};
