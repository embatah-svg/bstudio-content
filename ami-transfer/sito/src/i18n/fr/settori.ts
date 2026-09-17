import type { SettoreKey } from "@/i18n/config";
import type { SettoreContent, settoriPage as ItPage } from "@/i18n/it/settori";

export const settoriPage: typeof ItPage = {
  metaTitle: "Secteurs — Automobile, bâtiment, électroménager",
  metaDescription:
    "Les secteurs des lignes transfert A.M.I. : composants automobiles en tube, tube pour le bâtiment, échangeurs de chaleur et groupes thermiques.",
  title: "On nous apporte une pièce, pas un cahier des charges.",
  lede: "Trois secteurs déclarés, une seule méthode : on part du plan du composant et de la cadence requise.",
  homeTitle: "On nous apporte une pièce, pas un cahier des charges.",
  homeLede: "Nous partons du plan de la pièce et de la cadence requise, et nous construisons la ligne autour.",
  detail: {
    components: "Composants typiques",
    componentsTodo: "Exemples vérifiés avec l'entreprise et photos des composants :",
    needs: "Ce qui compte dans ce secteur",
    processesTitle: "Usinages récurrents.",
    processesLede: "Les postes que l'on retrouve le plus souvent sur les lignes de ce secteur.",
    caseTitle: "Un cas réel.",
    caseLede: "Pièce, problème, temps de cycle obtenu, année.",
    caseTodo: "EN ATTENTE D'AUTORISATION CLIENT OU DE CAS ANONYMISÉ",
    caseNote:
      "Les contrats de machines spéciales contiennent presque toujours des clauses de confidentialité : les cas ne sont publiés qu'avec autorisation écrite ou sous forme anonymisée.",
    metaSuffix: "— Lignes transfert pour tube",
  },
};

export const settori: Record<SettoreKey, SettoreContent> = {
  automotive: {
    slug: "automobile",
    name: "Automobile",
    title: "Lignes transfert pour composants automobiles en tube",
    lede: "Composants tubulaires en volumes de série, où comptent le temps de cycle, la répétabilité et la traçabilité du process.",
    homeText: "Composants tubulaires pour lignes d'échappement, climatisation et systèmes de freinage, en volumes de série.",
    componenti: ["Composants tubulaires pour lignes d'échappement", "Tubes de climatisation", "Composants pour systèmes de freinage"],
    esigenze: [
      "Temps de cycle défini à l'offre et vérifié à la réception.",
      "Répétabilité dimensionnelle sur grands lots.",
      "Documentation de process pour la qualification fournisseur.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  building: {
    slug: "batiment",
    name: "Bâtiment",
    title: "Lignes transfert pour le tube de construction",
    lede: "Tube pour installations sanitaires et thermiques, échafaudages et charpente légère : pièces simples, gros volumes, coût pièce décisif.",
    homeText: "Tube pour installations sanitaires et thermiques, échafaudages et charpente légère.",
    componenti: ["Tube pour installations sanitaires et thermiques", "Éléments d'échafaudage", "Charpente légère en tube"],
    esigenze: [
      "Coût pièce bas sur gros volumes.",
      "Lignes robustes, à maintenance simple et pièces de rechange disponibles.",
      "Changement de format rapide entre diamètres différents.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  elettrodomestico: {
    slug: "electromenager",
    name: "Électroménager",
    title: "Lignes transfert pour échangeurs et groupes thermiques",
    lede: "Échangeurs de chaleur, groupes thermiques et composants pour le blanc : des pièces qui changent souvent et des lignes qui doivent s'adapter.",
    homeText: "Échangeurs de chaleur, groupes thermiques et composants pour l'électroménager.",
    componenti: ["Tubes pour échangeurs de chaleur", "Composants pour groupes thermiques", "Tubes pour électroménager"],
    esigenze: [
      "Flexibilité sur les nouvelles pièces sans remplacer la ligne.",
      "Logique automate modifiable quand le composant change.",
      "Contrôle d'étanchéité ou dimensionnel intégré si requis.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
};
