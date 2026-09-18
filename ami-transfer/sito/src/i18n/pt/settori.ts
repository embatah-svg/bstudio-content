import type { SettoreKey } from "@/i18n/config";
import type { SettoreContent, settoriPage as ItPage } from "@/i18n/it/settori";

export const settoriPage: typeof ItPage = {
  metaTitle: "Setores — Automóvel, construção, eletrodomésticos",
  metaDescription:
    "Os setores das linhas transfer A.M.I.: componentes tubulares para o setor automóvel, tubo para construção, permutadores de calor e grupos térmicos.",
  title: "Partimos da peça, não do catálogo.",
  lede: "Três setores declarados, um só método: parte-se do desenho do componente e da produtividade pretendida.",
  homeTitle: "Partimos da peça, não do catálogo.",
  homeLede: "Partimos do desenho da peça e da produtividade pretendida, e construímos a linha à volta deles.",
  detail: {
    components: "Componentes típicos",
    componentsTodo: "Exemplos verificados com a empresa e fotos dos componentes:",
    needs: "O que conta neste setor",
    processesTitle: "Maquinagens recorrentes.",
    processesLede: "As estações que encontramos com mais frequência nas linhas deste setor.",
    caseTitle: "Um caso real.",
    caseLede: "Peça, problema, tempo de ciclo obtido, ano.",
    caseTodo: "A AGUARDAR AUTORIZAÇÃO DO CLIENTE OU CASO ANONIMIZADO",
    caseNote:
      "Os contratos de máquinas especiais incluem quase sempre cláusulas de confidencialidade: os casos são publicados apenas com autorização escrita ou de forma anonimizada.",
    metaSuffix: "— Linhas transfer para tubo",
  },
};

export const settori: Record<SettoreKey, SettoreContent> = {
  automotive: {
    slug: "automovel",
    name: "Automóvel",
    title: "Linhas transfer para componentes tubulares para o setor automóvel",
    lede: "Componentes tubulares em volumes de série, onde contam o tempo de ciclo, a repetibilidade e a rastreabilidade do processo.",
    homeText: "Componentes tubulares para sistemas de escape, climatização e sistemas de travagem, em volumes de série.",
    componenti: ["Componentes tubulares para sistemas de escape", "Tubos para climatização", "Componentes para sistemas de travagem"],
    esigenze: [
      "Tempo de ciclo definido na proposta e verificado na receção.",
      "Repetibilidade dimensional em lotes elevados.",
      "Documentação de processo para a qualificação de fornecedor.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura", "filettatura"],
  },
  building: {
    slug: "construcao",
    name: "Construção",
    title: "Linhas transfer para tubo de construção",
    lede: "Tubo para instalações de canalização e aquecimento, andaimes e serralharia ligeira: peças simples, volumes altos, custo por peça decisivo.",
    homeText: "Tubo para instalações de canalização e aquecimento, andaimes e serralharia ligeira.",
    componenti: ["Tubo para instalações de canalização e aquecimento", "Elementos de andaime", "Serralharia ligeira em tubo"],
    esigenze: [
      "Custo por peça baixo em grandes volumes.",
      "Linhas robustas, com manutenção simples e peças de substituição disponíveis.",
      "Mudança de formato rápida entre diâmetros diferentes.",
    ],
    lavorazioni: ["calibratura", "foratura", "tranciatura"],
  },
  elettrodomestico: {
    slug: "eletrodomesticos",
    name: "Eletrodomésticos",
    title: "Linhas transfer para permutadores e grupos térmicos",
    lede: "Permutadores de calor, grupos térmicos e componentes para linha branca: peças que mudam com frequência e linhas que têm de se adaptar.",
    homeText: "Permutadores de calor, grupos térmicos e componentes para linha branca.",
    componenti: ["Tubos para permutadores de calor", "Componentes para grupos térmicos", "Tubos para eletrodomésticos"],
    esigenze: [
      "Flexibilidade em peças novas sem substituir a linha.",
      "Lógica PLC modificável quando o componente muda.",
      "Controlo de estanquidade ou dimensional integrado onde exigido.",
    ],
    lavorazioni: ["calibratura", "foratura", "filettatura"],
  },
};
