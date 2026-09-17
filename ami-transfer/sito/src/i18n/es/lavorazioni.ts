import type { LavorazioneKey } from "@/i18n/config";
import type { LavorazioneContent, lavorazioniPage as ItPage } from "@/i18n/it/lavorazioni";

export const lavorazioniPage: typeof ItPage = {
  metaTitle: "Mecanizados del tubo en línea transfer",
  metaDescription:
    "Taladrado, punzonado, roscado y calibrado del tubo metálico en ciclo continuo en líneas transfer A.M.I. Una página por cada mecanizado.",
  title: "Los mecanizados del tubo.",
  lede: "Cada mecanizado corresponde a una estación de la línea. Se combinan en la secuencia que exige el plano de la pieza, sin manipulaciones manuales entre una operación y otra.",
  fullListNote: "Lista completa de los mecanizados realizados (p. ej. desbarbado, soldadura, montaje):",
  fullListTodo: "POR CONFIRMAR CON LA OFICINA TÉCNICA",
  ctaTitle: "¿Un mecanizado que no ve aquí?",
  ctaText: "Envíenos el plano: le diremos si encaja en una línea transfer y cómo.",
  detail: {
    what: "Qué hace",
    inLine: "En línea transfer",
    needs: "Qué necesitamos de usted",
    rangesTitle: "Rangos y límites.",
    rangesLede: "Datos por confirmar con la oficina técnica antes de la publicación.",
    ranges: ["Diámetros y espesores admisibles", "Tolerancias alcanzables", "Ejemplo de tiempo de ciclo"],
    sectorsTitle: "Sectores donde lo usamos.",
    sectorsLede: "Componentes típicos que requieren este mecanizado.",
    metaSuffix: "de tubo — Líneas transfer",
  },
};

export const lavorazioni: Record<LavorazioneKey, LavorazioneContent> = {
  foratura: {
    slug: "taladrado",
    name: "Taladrado",
    title: "Taladrado del tubo en línea transfer",
    lede: "Agujeros radiales y pasantes realizados en una o varias estaciones de la línea, con unidades de mecanizado dedicadas posicionadas en el paso que exige el plano.",
    cosa: [
      "Agujeros simples o múltiples en el mismo tramo de tubo, incluso en planos distintos.",
      "Unidades de mecanizado con avance controlado, una por cada grupo de agujeros.",
      "Posición de los agujeros definida por el plano de la pieza, no por el catálogo de la máquina.",
    ],
    inLinea: [
      "El tubo queda amarrado en la estación durante el mecanizado: sin manipulación manual de la pieza.",
      "El tiempo de taladrado entra en el tiempo de ciclo de la línea, en paralelo con las demás estaciones.",
      "Viruta evacuada en la estación, sin contaminar las operaciones siguientes.",
    ],
    serve: [
      "Plano de la pieza con posición, diámetro y tolerancia de los agujeros.",
      "Material, diámetro y espesor del tubo.",
      "Productividad requerida (piezas/hora o piezas/año).",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
  tranciatura: {
    slug: "punzonado",
    name: "Punzonado",
    title: "Punzonado del tubo sin viruta",
    lede: "Eliminación de material por deformación donde la geometría de la pieza lo permite: más rápido que el taladrado y sin viruta que gestionar.",
    cosa: [
      "Aberturas, ranuras y entallas obtenidas con punzón y matriz dedicados a la pieza.",
      "Sin viruta: la estación se mantiene limpia y la pieza no requiere desbarbado interior.",
      "Aplicable donde el espesor y la forma del tubo permiten una deformación controlada.",
    ],
    inLinea: [
      "Herramientas de punzonado diseñadas para cada pieza y sustituibles en la estación.",
      "Sincronizado con el indexado: la pieza llega ya amarrada y orientada.",
      "Comprobación previa de viabilidad sobre el plano antes de la oferta.",
    ],
    serve: [
      "Plano con geometría de las aberturas y tolerancias.",
      "Material y espesor del tubo, para comprobar que el punzonado es aplicable.",
      "Volúmenes previstos: influyen en la duración de las herramientas y en el dimensionamiento.",
    ],
    settori: ["automotive", "building"],
  },
  filettatura: {
    slug: "roscado",
    name: "Roscado",
    title: "Roscado del tubo en ciclo continuo",
    lede: "Unidades de roscado integradas en la línea y sincronizadas con el ciclo de indexado, para roscar agujeros y extremos sin salir del transfer.",
    cosa: [
      "Roscado de agujeros radiales ya realizados en las estaciones anteriores.",
      "Roscado de extremos del tubo, donde el plano lo requiere.",
      "Unidades de roscado con control del ciclo de avance y retroceso.",
    ],
    inLinea: [
      "El taladrado y el roscado se realizan en estaciones consecutivas del mismo transfer.",
      "Sin manipulación de la pieza entre las dos operaciones: los ejes se mantienen referenciados.",
      "Lubricación dedicada en la estación de roscado.",
    ],
    serve: [
      "Designación de la rosca y profundidad útil.",
      "Material del tubo y espesor de pared en la zona roscada.",
      "Posibles requisitos de control (pasa/no pasa en línea).",
    ],
    settori: ["automotive", "elettrodomestico"],
  },
  calibratura: {
    slug: "calibrado",
    name: "Calibrado",
    title: "Calibrado del tubo antes del mecanizado",
    lede: "Corrección del diámetro y de la redondez del tubo en bruto, para dar a las estaciones siguientes una referencia estable.",
    cosa: [
      "Corrección de la ovalización y de las variaciones de diámetro del tubo entrante.",
      "Referencia dimensional fiable para taladrado, punzonado y roscado.",
      "Calibrado de extremos donde la pieza debe acoplarse a un racor.",
    ],
    inLinea: [
      "Primera estación útil tras la carga: todos los mecanizados siguientes trabajan sobre un tubo ya calibrado.",
      "Herramientas de calibrado dimensionadas sobre el diámetro nominal de la pieza.",
      "Control en línea donde lo exige el pliego de condiciones.",
    ],
    serve: [
      "Diámetro nominal y tolerancia requerida tras el calibrado.",
      "Calidad del tubo entrante (tolerancias del proveedor).",
      "Posibles zonas de la pieza que deban quedar sin calibrar.",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
};
