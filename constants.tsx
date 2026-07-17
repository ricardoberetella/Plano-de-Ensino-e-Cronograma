import { TeachingPlan } from './types';

export const SCHEDULE_VERSION = 20260717; // Nova versão para forçar a atualização dos dados no Firebase

export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: "plan-usinagem-beretella",
    profileId: "beretella",
    courseName: "Mecânico de Usinagem Convencional",
    totalHours: 800,
    modality: "Aprendizagem Industrial",
    objective: "Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.",
    version: SCHEDULE_VERSION,
    updatedAt: new Date().toISOString(),
    units: [
      // --- 1º SEMESTRE ---
      {
        id: "lidt",
        name: "Leitura e Interpretação de Desenho Técnico",
        hours: 0,
        schedule: [],
        calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
      },
      {
        id: "crd",
        name: "Controle Dimensional",
        hours: 0,
        schedule: [],
        calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
      },
      {
        id: "fusi",
        name: "Fundamentos da Usinagem",
        hours: 0,
        schedule: [],
        calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
      },
      
      // --- 2º SEMESTRE ---
      {
        id: "prusc",
        name: "Processos de Usinagem Convencional",
        hours: 160,
        capabilities: [
          "Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "Realizar operações de serramento por meio de máquinas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "Realizar a montagem de conjuntos mecânicos de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.",
          "Definir os parâmetros e os processos de usinagem em retificas convencionais, de acordo com as especificações técnicas.",
          "Realizar o balanceamento do rebolo de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "Realizar operações em retificadoras cilíndricas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "Realizar operações em retificadoras planas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho."
        ],
        knowledges: [
          "Torneamento: Ferramenta de perfilamento, Acessórios (Lunetas, Graminho, Eixo mandril, Prisma em V), Cálculos técnicos (Conicidade com desalinhamento do cabeçote móvel), Operação (Tornear perfil com ferramenta de forma).",
          "Fresagem: Ferramentas (Gravação, Esférica), Acessórios (Grampos e garras), Conjunto divisor (Divisão direta, indireta e diferencial), Operação (Fresar superfície plana paralela no aparelho divisor, Furar de forma coordenada na fresadora, Alargar furo manualmente na bancada).",
          "Serramento: Definição, Tipos de serra fita (Horizontal e Vertical), Lâmina de serra de fita, Operação (Serrar com serra de fita).",
          "Conjuntos mecânicos: Definição, Tipos, Características, Técnicas de montagem, Técnicas de ajustagem (Lixamento, Polimento).",
          "Retificação: Processos (Retifica cilíndrica, Retífica plana tangencial, Sem centro Centerless, Afiadoras), Parâmetros (RPM da peça, RPM do rebolo, Avanço).",
          "Balanceamento: Rebolos (Tipos, Classificação, Características, Aplicação, Inspeção, Armazenagem), Acessórios (Conjunto balanceador estático, Flanges, Eixo balanceador, Nível de precisão, Contrapesos), Operações (Balancear rebolo, Dressar rebolo).",
          "Retificadora cilíndrica: Características, Componentes, Acessórios (Placa universal, Placa de arrasto, Contraponta, Arrastadores, Dressador), Operação (Retificar superfície cilíndrica externa).",
          "Retificadora plana: Características, Componentes, Acessórios (Morsa, Mesa magnética, Mesa de seno, Morsa de precisão, Calços, Dressador), Operação (Retificar superfície plana, Retificar superfície plana paralela, Retificar superfície plana perpendicular)."
        ],
        schedule: [],
        calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
      },
      {
        id: "mein",
        name: "Metrologia Industrial",
        hours: 80,
        capabilities: [
          "Medir peças por meio de instrumentos da ordem direta, de acordo com especificações técnicas.",
          "Medir peças por meio de instrumentos da ordem indireta, de acordo com especificações técnicas.",
          "Medir a dureza de materiais de acordo com especificações técnicas.",
          "Medir perfil de peças por meio de imagens projetadas, de acordo com especificações técnicas.",
          "Medir tridimensionalmente peças de acordo com especificações técnicas.",
          "Medir peças digitalmente por meio de sistemas de medição por visão de acordo com especificações técnicas.",
          "Medir peças com braço de medição portátil de acordo com especificações técnicas.",
          "Testar a funcionalidade de peças e conjuntos de acordo com especificações técnicas."
        ],
        knowledges: [
          "Medição de ordem direta: Instrumentos (Paquímetro para medição de engrenagens, Micrômetro para medição de rosca, Micrômetro para medição de engrenagens, Rugosímetro, Calibrador de altura linear height), Procedimentos (Manuseio, Conservação, Armazenamento).",
          "Medição de ordem indireta: Instrumentos (Comparador de diâmetro interno, Calibrador passa não passa, Bloco padrão, Régua e mesa de seno), Aplicação, Leitura, Técnicas de utilização, Procedimentos (Manuseio, Conservação, Armazenamento).",
          "Durômetro: Tipos, Características, Aplicação, Técnicas de utilização, Procedimentos (Manuseio, Conservação, Armazenamento).",
          "Projetor de perfil: Tipos, Características, Aplicação, Técnicas de utilização, Projeção (Diascópica, Episcópica), Procedimentos.",
          "Máquina de medição por coordenadas: Tipos (Manual, CNC), Características, Aplicação, Técnicas de utilização, Dispositivos de medição, Dados, Procedimentos.",
          "Medição por Visão: Tipos, Características, Aplicação, Técnicas de utilização, Procedimentos (Manuseio, Conservação, Armazenamento).",
          "Braço de medição: Tipos (Manual, CNC), Características, Aplicação, Técnicas de utilização, Dispositivos de medição, Dados, Procedimentos.",
          "Funcionalidade: Objetivo, Importância, Aspectos a serem testados (Funcionalidade, Comportamento, Qualidade), Tipos de testes (Funcional, De componentes, De integração), Ferramentas e métodos (Testes automatizados, Bancada de teste, Simulação)."
        ],
        schedule: [],
        calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
      }
    ]
  },
  {
    id: "plan-usinagem-gea",
    profileId: "gea",
    courseName: "Mecânico de Usinagem Convencional",
    totalHours: 800,
    modality: "Aprendizagem Industrial",
    objective: "Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.",
    version: SCHEDULE_VERSION,
    updatedAt: new Date().toISOString(),
    units: [] // O algoritmo do App.tsx vai clonar a estrutura acima automaticamente para o Gea
  }
];
