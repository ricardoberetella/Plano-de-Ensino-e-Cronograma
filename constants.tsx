import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// ✅ MODELO NEUTRO (não amarra profileId aqui)
export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: 'plan-usinagem-modelo',
    courseName: 'SMO - Mecânico de Usinagem Convencional',
    modality: 'Presencial',
    totalHours: 400,
    objective: 'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.',
    methodology: 'Metodologia SENAI de Educação Profissional (MSEP). Uso de situações de aprendizagem realistas para contextualização de desafios fabris.',
    evaluation: 'Contínua baseada em rubricas de desempenho, folhas de autoinspeção metrológica e qualidade das peças usinadas.',
    bibliography: 'Guia de Aprendizagem Profissional SENAI: Fresamento e Torneamento. NBR 10067, NBR 8403, VIM.',
    createdAt: new Date().toISOString(),
    units: [
      {
        id: 'uc-lidt',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-15', markings: [] },
        basicCapacities: [
          'I. Interpretar desenhos técnicos de peças a partir de projetos da metalmecânica.',
          'II. Elaborar croquis de peças em projeção ortogonal e em perspectiva à mão livre, a partir de modelos.',
          'III. Interpretar desenho técnico de montagem de conjunto e subconjuntos a partir de projetos da metalmecânica.',
          'IV. Interpretar tolerância dimensional, geométrica e de acabamento superficial em desenho técnico.'
        ],
        socioemocionalCapacities: [
          'Pensamento analítico: I. Demonstrar atenção a detalhes',
          'Pensamento analítico: II. Demonstrar senso crítico',
          'Trabalho em equipe: I. Demonstrar escuta ativa'
        ],
        knowledge: [
          {
            topic: 'I. Desenho técnico',
            subtopics: [
              '1.1. Definição',
              '1.2. Normas técnicas (1.2.1. Primeiro diedro, 1.2.2. Terceiro diedro)',
              '1.3. Formatos e dimensões das folhas',
              '1.4. Linhas',
              '1.5. Escalas',
              '1.6. Figuras e sólidos geométricos (1.6.1. Superfície e figura plana, 1.6.2. Cubo, pirâmide e prisma, 1.6.3. Cilindro, cone e esfera)'
            ]
          },
          {
            topic: 'II. Tipos de corte',
            subtopics: [
              '2.1. Corte total',
              '2.2. Meio corte',
              '2.3. Corte composto',
              '2.4. Corte parcial',
              '2.5. Seção',
              '2.6. Omissão de corte',
              '2.7. Encurtamento'
            ]
          },
          { topic: 'III. Vistas especiais', subtopics: ['3.1. Vistas auxiliares', '3.2. Rotação de elemento oblíquo'] },
          {
            topic: 'IV. Desenho de conjuntos',
            subtopics: [
              '4.1. Representação de elementos de máquina',
              '4.2. Elementos padronizados',
              '4.3. Elementos de fixação',
              '4.4. Elementos de transmissão',
              '4.5. Vista explodida',
              '4.6. Lista de materiais',
              '4.7. Balões de Identificações'
            ]
          },
          {
            topic: 'V. Tolerâncias',
            subtopics: [
              '5.1. Tolerância dimensional (5.1.1. Campos de tolerância, 5.1.2. Sistemas de ajustes e tolerância ISO)',
              '5.2. Tolerância geométrica (5.2.1. De forma e posição, 5.2.2. De orientação, 5.2.3. De batimento)',
              '5.3. Acabamento superficial (5.3.1. Rugosidade, 5.3.2. Tratamento, 5.3.3. Recartilhado, 5.3.4. Sobremetal)'
            ]
          }
        ],
        learningSituations: [
          {
            id: 'sa-lidt-dispositivo',
            title: 'Dispositivo de furação - Interpretando e detalhando componentes Mecânicos',
            context: 'A "Usinatec Soluções Industriais" é uma empresa de médio porte especializada na fabricação de componentes e conjuntos mecânicos sob encomenda. Recentemente, a empresa fechou um contrato para a produção de um lote de morsas de bancada. O departamento de engenharia finalizou o projeto completo, mas o gestor solicitou uma análise técnica detalhada antes da fabricação.',
            challenge: 'Elaborar um Dossiê Técnico de Análise de Projeto contendo: a) Análise do Desenho de Conjunto (funcionamento e componentes); b) Elaboração de Croquis Detalhados à mão livre de 3 componentes-chave; c) Ficha de Análise Crítica de especificações de tolerância e rugosidade.',
            expectedResults: [
              'Relatório de Interpretação do Conjunto: Texto descrevendo função do dispositivo e seus componentes.',
              'Folhas de Croquis: Desenhos à mão livre claros e normalizados dos três componentes selecionados.',
              'Ficha de Análise: Tabela detalhando tolerâncias, acabamentos superficiais e seus impactos práticos na montagem e funcionamento.'
            ]
          }
        ],
        rubrics: [],
        schedule: []
      },

      {
        id: 'uc-crd',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: [
          '1. Identificar a importância da metrologia na indústria metalmecânica.',
          '2. Medir peças com escala.',
          '3. Medir peças com trena.',
          '4. Medir peças com paquímetro.',
          '5. Medir peças no sistema métrico com micrômetro.',
          '6. Verificar dimensões e perfis com verificadores',
          '7. Medir por comparação com relógio apalpador e comparador.',
          '8. Medir peças com goniômetro.'
        ],
        socioemocionalCapacities: [
          'Pensamento analítico: 1. Demonstrar atenção a detalhes',
          'Autogestão: 2. Organizar o ambiente de trabalho e as atividades',
          'Autogestão: 3. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais'
        ],
        knowledge: [],
        learningSituations: [],
        rubrics: [],
        schedule: []
      }
    ]
  } as TeachingPlan
];
