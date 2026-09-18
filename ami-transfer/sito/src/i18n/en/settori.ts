import type { SettoreKey } from "@/i18n/config";
import type { SettoreContent, settoriPage as ItPage } from "@/i18n/it/settori";

export const settoriPage: typeof ItPage = {
  metaTitle: "Industries — Automotive, construction, home appliances",
  metaDescription:
    "The industries served by A.M.I. transfer lines: automotive tube components, construction tube, heat exchangers and heating units.",
  title: "We start from the part, not from the catalogue.",
  lede: "Three declared industries, one method: we start from the component drawing and the required output.",
  homeTitle: "We start from the part, not from the catalogue.",
  homeLede: "We start from the part drawing and the required output, and build the line around them.",
  detail: {
    components: "Typical components",
    componentsTodo: "Examples verified with the company and component photos:",
    needs: "What matters in this industry",
    processesTitle: "Recurring processes.",
    processesLede: "The stations we most often find on lines for this industry.",
    caseTitle: "A real case.",
    caseLede: "Part, problem, cycle time achieved, year.",
    caseTodo: "AWAITING CUSTOMER AUTHORISATION OR ANONYMISED CASE",
    caseNote:
      "Contracts for special machines almost always include confidentiality clauses: cases are published only with written authorisation or in anonymised form.",
    metaSuffix: "— Transfer lines for tubes",
  },
};

export const settori: Record<SettoreKey, SettoreContent> = {
  automotive: {
    slug: "automotive",
    name: "Automotive",
    title: "Transfer lines for automotive tube components",
    lede: "Tubular components in production volumes, where cycle time, repeatability and process traceability matter.",
    homeText: "Tubular components for exhaust systems, air conditioning and braking systems, in production volumes.",
    componenti: ["Tubular components for exhaust systems", "Air-conditioning tubing", "Components for braking systems"],
    esigenze: [
      "Cycle time defined at quotation stage and verified at acceptance testing.",
      "Dimensional repeatability on large batches.",
      "Process documentation for supplier qualification.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  building: {
    slug: "building",
    name: "Construction",
    title: "Transfer lines for construction tube",
    lede: "Tube for plumbing and heating systems, scaffolding and light structural work: simple parts, high volumes, decisive part cost.",
    homeText: "Tube for plumbing and heating systems, scaffolding and light structural work.",
    componenti: ["Tube for plumbing and heating systems", "Scaffolding elements", "Light tubular structures"],
    esigenze: [
      "Low part cost on large volumes.",
      "Robust lines, with simple maintenance and available spare parts.",
      "Quick changeover between different diameters.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  elettrodomestico: {
    slug: "home-appliances",
    name: "Home appliances",
    title: "Transfer lines for heat exchangers and heating units",
    lede: "Heat exchangers, heating units and white-goods components: parts that change often and lines that must adapt.",
    homeText: "Heat exchangers, heating units and white-goods components.",
    componenti: ["Tubes for heat exchangers", "Components for heating units", "Tubing for home appliances"],
    esigenze: [
      "Flexibility on new parts without replacing the line.",
      "PLC logic that can be modified when the component changes.",
      "Integrated leak or dimensional testing where required.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
};
