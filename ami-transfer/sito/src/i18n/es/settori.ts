import type { SettoreKey } from "@/i18n/config";
import type { SettoreContent, settoriPage as ItPage } from "@/i18n/it/settori";

export const settoriPage: typeof ItPage = {
  metaTitle: "Sectores — Automoción, construcción, electrodoméstico",
  metaDescription:
    "Los sectores de las líneas transfer A.M.I.: componentes de automoción en tubo, tubo para construcción, intercambiadores de calor y grupos térmicos.",
  title: "Nos traen una pieza, no un pliego de condiciones.",
  lede: "Tres sectores declarados, un solo método: se parte del plano del componente y de la productividad requerida.",
  homeTitle: "Nos traen una pieza, no un pliego de condiciones.",
  homeLede: "Partimos del plano de la pieza y de la productividad requerida, y construimos la línea alrededor de ellos.",
  detail: {
    components: "Componentes típicos",
    componentsTodo: "Ejemplos verificados con la empresa y fotos de los componentes:",
    needs: "Qué cuenta en este sector",
    processesTitle: "Mecanizados recurrentes.",
    processesLede: "Las estaciones que encontramos con más frecuencia en las líneas de este sector.",
    caseTitle: "Un caso real.",
    caseLede: "Pieza, problema, tiempo de ciclo obtenido, año.",
    caseTodo: "A LA ESPERA DE AUTORIZACIÓN DEL CLIENTE O DE CASO ANONIMIZADO",
    caseNote:
      "Los contratos de máquinas especiales casi siempre incluyen cláusulas de confidencialidad: los casos se publican solo con autorización escrita o de forma anonimizada.",
    metaSuffix: "— Líneas transfer para tubo",
  },
};

export const settori: Record<SettoreKey, SettoreContent> = {
  automotive: {
    slug: "automocion",
    name: "Automoción",
    title: "Líneas transfer para componentes de automoción en tubo",
    lede: "Componentes tubulares en volúmenes de serie, donde cuentan el tiempo de ciclo, la repetibilidad y la trazabilidad del proceso.",
    homeText: "Componentes tubulares para sistemas de escape, climatización y sistemas de frenado, en volúmenes de serie.",
    componenti: ["Componentes tubulares para sistemas de escape", "Tuberías para climatización", "Componentes para sistemas de frenado"],
    esigenze: [
      "Tiempo de ciclo definido en la oferta y verificado en la recepción.",
      "Repetibilidad dimensional en lotes grandes.",
      "Documentación del proceso para la homologación de proveedores.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  building: {
    slug: "construccion",
    name: "Construcción",
    title: "Líneas transfer para el tubo de construcción",
    lede: "Tubo para instalaciones de fontanería y calefacción, andamios y estructuras ligeras: piezas sencillas, volúmenes altos, coste por pieza decisivo.",
    homeText: "Tubo para instalaciones de fontanería y calefacción, andamios y estructuras ligeras.",
    componenti: ["Tubo para instalaciones de fontanería y calefacción", "Elementos de andamio", "Estructuras ligeras en tubo"],
    esigenze: [
      "Coste por pieza bajo en grandes volúmenes.",
      "Líneas robustas, con mantenimiento sencillo y repuestos disponibles.",
      "Cambio de formato rápido entre diámetros distintos.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  elettrodomestico: {
    slug: "electrodomestico",
    name: "Electrodoméstico",
    title: "Líneas transfer para intercambiadores y grupos térmicos",
    lede: "Intercambiadores de calor, grupos térmicos y componentes de línea blanca: piezas que cambian a menudo y líneas que deben adaptarse.",
    homeText: "Intercambiadores de calor, grupos térmicos y componentes de línea blanca.",
    componenti: ["Tubos para intercambiadores de calor", "Componentes para grupos térmicos", "Tuberías para electrodomésticos"],
    esigenze: [
      "Flexibilidad ante piezas nuevas sin sustituir la línea.",
      "Lógica PLC modificable cuando cambia el componente.",
      "Control de estanqueidad o dimensional integrado donde se requiera.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
};
