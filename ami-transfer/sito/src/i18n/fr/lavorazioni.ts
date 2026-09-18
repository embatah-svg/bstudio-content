import type { LavorazioneKey } from "@/i18n/config";
import type { LavorazioneContent, lavorazioniPage as ItPage } from "@/i18n/it/lavorazioni";

export const lavorazioniPage: typeof ItPage = {
  metaTitle: "Usinages du tube sur ligne transfert",
  metaDescription:
    "Perçage, poinçonnage, taraudage et calibrage du tube métallique en cycle continu sur les lignes transfert A.M.I. Une page par usinage.",
  title: "Les usinages sur le tube.",
  lede: "Chaque usinage correspond à un poste de la ligne. Ils s'enchaînent dans l'ordre exigé par le plan de la pièce, sans reprise manuelle entre deux opérations.",
  fullListNote: "Liste complète des usinages réalisés (ex. ébavurage, soudage, assemblage) :",
  fullListTodo: "À CONFIRMER AVEC LE BUREAU D'ÉTUDES",
  ctaTitle: "Un usinage que vous ne voyez pas ici ?",
  ctaText: "Envoyez-nous le plan : nous vous dirons si et comment il s'intègre à une ligne transfert.",
  detail: {
    what: "Ce qu'il fait",
    inLine: "Sur ligne transfert",
    needs: "Ce dont nous avons besoin",
    rangesTitle: "Plages et limites.",
    rangesLede: "Données à confirmer avec le bureau d'études avant publication.",
    ranges: ["Diamètres et épaisseurs traités", "Tolérances atteignables", "Exemple de temps de cycle"],
    sectorsTitle: "Secteurs où nous l'utilisons.",
    sectorsLede: "Composants typiques nécessitant cet usinage.",
    metaSuffix: "de tubes — Lignes transfert",
  },
};

export const lavorazioni: Record<LavorazioneKey, LavorazioneContent> = {
  foratura: {
    slug: "percage",
    name: "Perçage",
    title: "Perçage du tube sur ligne transfert",
    lede: "Perçages radiaux et débouchants réalisés sur un ou plusieurs postes de la ligne, avec des unités d'usinage dédiées positionnées au pas exigé par le plan.",
    cosa: [
      "Trous simples ou multiples sur le même tronçon de tube, y compris sur des plans différents.",
      "Unités d'usinage à avance contrôlée, une par groupe de trous.",
      "Position des trous définie par le plan de la pièce, pas par le catalogue de la machine.",
    ],
    inLinea: [
      "Le tube est bridé au poste pendant l'usinage : aucune reprise manuelle de la pièce.",
      "Le temps de perçage entre dans le temps de cycle de la ligne, en parallèle des autres postes.",
      "Copeaux évacués au poste, sans contaminer les opérations suivantes.",
    ],
    serve: [
      "Plan de la pièce avec position, diamètre et tolérance des trous.",
      "Matériau, diamètre et épaisseur du tube.",
      "Cadence requise (pièces/heure ou pièces/an).",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
  tranciatura: {
    slug: "poinconnage",
    name: "Poinçonnage",
    title: "Poinçonnage du tube sans copeaux",
    lede: "Enlèvement de matière par déformation là où la géométrie de la pièce le permet : plus rapide que le perçage et sans copeaux à gérer.",
    cosa: [
      "Ouvertures, lumières et encoches obtenues avec poinçon et matrice dédiés à la pièce.",
      "Aucun copeau : le poste reste propre et la pièce ne nécessite pas d'ébavurage interne.",
      "Applicable là où l'épaisseur et la forme du tube permettent une déformation contrôlée.",
    ],
    inLinea: [
      "Outils de poinçonnage conçus pour la pièce et remplaçables au poste.",
      "Synchronisé avec l'indexage : la pièce arrive déjà bridée et orientée.",
      "Vérification préalable de faisabilité sur le plan avant l'offre.",
    ],
    serve: [
      "Plan avec géométrie des ouvertures et tolérances.",
      "Matériau et épaisseur du tube, pour vérifier que le poinçonnage est applicable.",
      "Volumes prévus : ils influencent la durée de vie des outils et le dimensionnement.",
    ],
    settori: ["automotive", "building"],
  },
  filettatura: {
    slug: "taraudage",
    name: "Taraudage",
    title: "Taraudage du tube en cycle continu",
    lede: "Unités de taraudage intégrées à la ligne et synchronisées avec le cycle d'indexage, pour tarauder trous et extrémités sans sortir de la ligne transfert.",
    cosa: [
      "Taraudage de trous radiaux déjà réalisés aux postes précédents.",
      "Filetage des extrémités du tube, là où le plan l'exige.",
      "Unités de taraudage avec cycle d'avance et de retour contrôlé.",
    ],
    inLinea: [
      "Perçage et taraudage ont lieu sur des postes consécutifs de la même ligne.",
      "Aucune reprise de la pièce entre les deux opérations : les axes restent référencés.",
      "Lubrification dédiée au poste de taraudage.",
    ],
    serve: [
      "Désignation du filetage et profondeur utile.",
      "Matériau du tube et épaisseur de paroi dans la zone filetée.",
      "Éventuelles exigences de contrôle (passe/ne passe pas en ligne).",
    ],
    settori: ["automotive", "elettrodomestico"],
  },
  calibratura: {
    slug: "calibrage",
    name: "Calibrage",
    title: "Calibrage du tube avant usinage",
    lede: "Correction du diamètre et de la circularité du tube brut, pour donner aux postes suivants une référence stable.",
    cosa: [
      "Correction de l'ovalisation et des variations de diamètre du tube entrant.",
      "Référence dimensionnelle fiable pour le perçage, le poinçonnage et le taraudage.",
      "Calibrage d'extrémité là où la pièce doit s'accoupler à un raccord.",
    ],
    inLinea: [
      "Premier poste après le chargement : toutes les opérations suivantes travaillent sur un tube déjà calibré.",
      "Outils de calibrage dimensionnés sur le diamètre nominal de la pièce.",
      "Contrôle en ligne là où le cahier des charges l'exige.",
    ],
    serve: [
      "Diamètre nominal et tolérance requise après calibrage.",
      "Qualité du tube entrant (tolérances du fournisseur).",
      "Éventuelles zones de la pièce à laisser non calibrées.",
    ],
    settori: ["automotive", "building", "elettrodomestico"],
  },
};
