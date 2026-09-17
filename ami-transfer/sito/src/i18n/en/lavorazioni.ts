import type { LavorazioneKey } from "@/i18n/config";
import type { LavorazioneContent } from "@/i18n/it/lavorazioni";
import type { lavorazioniPage as ItPage } from "@/i18n/it/lavorazioni";

export const lavorazioniPage: typeof ItPage = {
  metaTitle: "Tube processes on transfer lines",
  metaDescription:
    "Drilling, punching, threading and sizing of metal tubes performed in continuous cycle on A.M.I. transfer lines. One page per process.",
  title: "Tube processes.",
  lede: "Each process corresponds to a station on the line. They are combined in the sequence required by the part drawing, with no manual re-handling between operations.",
  fullListNote: "Full list of processes performed (e.g. deburring, welding, assembly):",
  fullListTodo: "TO BE CONFIRMED WITH THE ENGINEERING OFFICE",
  ctaTitle: "A process you don't see here?",
  ctaText: "Send us the drawing: we will tell you whether and how it fits a transfer line.",
  detail: {
    what: "What it does",
    inLine: "On a transfer line",
    needs: "What we need from you",
    rangesTitle: "Ranges and limits.",
    rangesLede: "Data to be confirmed with the engineering office before publication.",
    ranges: ["Diameters and wall thicknesses handled", "Achievable tolerances", "Example cycle time"],
    sectorsTitle: "Industries where we use it.",
    sectorsLede: "Typical components that require this process.",
    metaSuffix: "of tubes — Transfer lines",
  },
};

export const lavorazioni: Record<LavorazioneKey, LavorazioneContent> = {
  foratura: {
    slug: "drilling",
    name: "Drilling",
    title: "Tube drilling on a transfer line",
    lede: "Radial and through holes made at one or more stations of the line, with dedicated machining units positioned on the pitch required by the drawing.",
    cosa: [
      "Single or multiple holes on the same tube section, also on different planes.",
      "Machining units with controlled feed, one for each group of holes.",
      "Hole positions defined by the part drawing, not by the machine catalogue.",
    ],
    inLinea: [
      "The tube is clamped in the station during machining: no manual re-handling of the part.",
      "Drilling time fits within the line cycle time, in parallel with the other stations.",
      "Chips evacuated at the station, without contaminating the following operations.",
    ],
    serve: [
      "Part drawing with hole positions, diameters and tolerances.",
      "Tube material, diameter and wall thickness.",
      "Required output (parts/hour or parts/year).",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
  tranciatura: {
    slug: "punching",
    name: "Punching",
    title: "Chipless tube punching",
    lede: "Material removal by deformation wherever the part geometry allows it: faster than drilling and with no chips to manage.",
    cosa: [
      "Openings, slots and notches made with punch and die dedicated to the part.",
      "No chips: the station stays clean and the part needs no internal deburring.",
      "Applicable where tube thickness and shape allow controlled deformation.",
    ],
    inLinea: [
      "Punching tools designed for the single part and replaceable at the station.",
      "Synchronised with the indexing: the part arrives already clamped and oriented.",
      "Preliminary feasibility check on the drawing before quoting.",
    ],
    serve: [
      "Drawing with opening geometry and tolerances.",
      "Tube material and thickness, to verify that punching is applicable.",
      "Expected volumes: they affect tool life and sizing.",
    ],
    settori: ["automotive", "building"],
  },
  filettatura: {
    slug: "threading",
    name: "Threading",
    title: "Tube threading in continuous cycle",
    lede: "Tapping units integrated in the line and synchronised with the indexing cycle, to thread holes and ends without leaving the transfer.",
    cosa: [
      "Threading of radial holes already made at previous stations.",
      "Threading of tube ends where the drawing requires it.",
      "Tapping units with controlled feed and return cycle.",
    ],
    inLinea: [
      "Drilling and threading take place at consecutive stations of the same transfer.",
      "No re-handling of the part between the two operations: the axes stay referenced.",
      "Dedicated lubrication at the tapping station.",
    ],
    serve: [
      "Thread designation and usable depth.",
      "Tube material and wall thickness in the threaded area.",
      "Any inspection requirements (in-line go/no-go).",
    ],
    settori: ["automotive", "elettrodomestico"],
  },
  calibratura: {
    slug: "sizing",
    name: "Sizing",
    title: "Tube sizing before machining",
    lede: "Correction of the diameter and roundness of the raw tube, to give the following stations a stable reference.",
    cosa: [
      "Correction of ovality and diameter variations of the incoming tube.",
      "Reliable dimensional reference for drilling, punching and threading.",
      "End sizing where the part has to mate with a fitting.",
    ],
    inLinea: [
      "First useful station after loading: all following operations work on an already sized tube.",
      "Sizing tools dimensioned on the nominal diameter of the part.",
      "In-line inspection where required by the specification.",
    ],
    serve: [
      "Nominal diameter and tolerance required after sizing.",
      "Quality of the incoming tube (supplier tolerances).",
      "Any areas of the part to be left unsized.",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
};
