
import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

const CRD_SCHEDULE = [
  { id: 'c1', date: '27/01/2026', hours: 2, capacities: 'Identificar a importância da metrologia na indústria metalmecânica.', knowledge: '1. Metrologia (1.1 a 1.5)', strategy: 'Apresentação da Situação de Aprendizagem (SA). Exposição dialogada sobre a importância da metrologia, normas e terminologia.', resources: 'Sala de aula, projetor, computador, material da SA.' },
  { id: 'c2', date: '03/02/2026', hours: 2, capacities: 'Identificar a importância da metrologia na indústria metalmecânica.', knowledge: '2. Erros de medição (2.1 a 2.4)', strategy: 'Discussão em grupo sobre os tipos e fontes de erro na medição. Demonstração de erros comuns (paralaxe, força excessiva).', resources: 'Sala de aula, projetor, instrumentos de medição para demonstração.' },
  { id: 'c3', date: '10/02/2026', hours: 2, capacities: 'Medir peças com escala. Medir peças com trena.', knowledge: '3. Escala (3.1 a 3.3). 4. Trena (4.1 a 4.3)', strategy: 'Demonstração prática do uso de escalas e trenas. Exercícios práticos de medição em peças simples.', resources: 'Laboratório de Metrologia, escalas, trenas, peças diversas.' },
  { id: 'c4', date: '24/02/2026', hours: 2, capacities: 'Medir peças com paquímetro. Demonstrar atenção a detalhes.', knowledge: '5. Paquímetros (5.1, 5.2)', strategy: 'Exposição dialogada sobre os tipos de paquímetros e suas características. Demonstração do manuseio correto.', resources: 'Laboratório de Metrologia, projetor, diferentes tipos de paquímetros.' },
  { id: 'c5', date: '03/03/2026', hours: 2, capacities: 'Medir peças com paquímetro. Demonstrar atenção a detalhes.', knowledge: '5. Paquímetros (5.3, 5.4, 5.5)', strategy: 'Demonstração e exercício prático de leitura no sistema métrico (0,05mm e 0,02mm).', resources: 'Laboratório de Metrologia, paquímetros, peças didáticas com medidas conhecidas.' },
  { id: 'c6', date: '10/03/2026', hours: 2, capacities: 'Medir peças com paquímetro. Demonstrar atenção a detalhes. Organizar o ambiente de trabalho e as atividades.', knowledge: '5. Paquímetros (5.5)', strategy: 'Exercício prático supervisionado de medição em peças variadas, com preenchimento de relatório simples.', resources: 'Laboratório de Metrologia, paquímetros, peças, formulário de relatório.' },
  { id: 'c7', date: '17/03/2026', hours: 2, capacities: 'Medir peças no sistema métrico com micrômetro. Zelar pelo uso de equipamentos.', knowledge: '6. Micrômetros (6.1, 6.2, 6.3)', strategy: 'Exposição sobre os tipos de micrômetros. Demonstração do manuseio, ajuste do zero e uso da catraca.', resources: 'Laboratório de Metrologia, projetor, diferentes tipos de micrômetros.' },
  { id: 'c8', date: '24/03/2026', hours: 2, capacities: 'Medir peças no sistema métrico com micrômetro. Demonstrar atenção a detalhes.', knowledge: '6. Micrômetros (6.3, 6.4, 6.5)', strategy: 'Demonstração e exercício prático de leitura no sistema métrico (0,01 mm).', resources: 'Laboratório de Metrologia, micrômetros, peças didáticas.' },
  { id: 'c9', date: '31/03/2026', hours: 2, capacities: 'Medir peças no sistema métrico com micrômetro. Demonstrar atenção a detalhes. Organizar o ambiente de trabalho e as atividades.', knowledge: '6. Micrômetros (6.5)', strategy: 'Exercício prático supervisionado de medição com micrômetros e preenchimento de relatório, comparando com medidas do paquímetro.', resources: 'Laboratório de Metrologia, micrômetros, paquímetros, peças, relatório.' },
  { id: 'c10', date: '07/04/2026', hours: 2, capacities: 'Verificar dimensões e perfis com verificadores.', knowledge: '7. Verificadores (7.1, 7.2)', strategy: 'Demonstração do uso de calibradores de folga, raio e rosca. Exercício prático de verificação em peças.', resources: 'Laboratório de Metrologia, jogos de verificadores, peças com roscas e raios.' },
  { id: 'c11', date: '14/04/2026', hours: 2, capacities: 'Medir por comparação com relógio apalpador e comparador.', knowledge: '8. Relógios comparadores e apalpadores (8.1, 8.2)', strategy: 'Exposição sobre os tipos e características dos relógios. Demonstração de montagem em suportes magnéticos.', resources: 'Laboratório de Metrologia, relógios comparadores e apalpadores, suportes.' },
  { id: 'c12', date: '28/04/2026', hours: 2, capacities: 'Medir por comparação com relógio apalpador e comparador.', knowledge: '8. Relógios comparadores e apalpadores (8.3, 8.4)', strategy: 'Exercício prático de zeragem com blocos-padrão e medição por comparação (ex: planicidade, concentricidade).', resources: 'Laboratório de Metrologia, relógios, suportes, blocos-padrão, desempeno.' },
  { id: 'c13', date: '05/05/2026', hours: 2, capacities: 'Medir peças com goniômetro.', knowledge: '9. Goniômetro (9.1 a 9.4)', strategy: 'Demonstração do uso do goniômetro (transferidor de grau) para medição de ângulos em peças.', resources: 'Laboratório de Metrologia, goniômetros, peças com chanfros e ângulos.' },
  { id: 'c14', date: '12/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Revisão geral de todos os instrumentos. Planejamento em grupo para a execução do desafio da SA.', resources: 'Sala de aula, projetor, material da SA, desenhos técnicos.' },
  { id: 'c15', date: '19/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Início da Execução do Desafio: Análise do desenho técnico e início das medições do lote de "Pinos de Ancoragem".', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c16', date: '26/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Execução do Desafio: Continuação das medições e preenchimento dos relatórios de inspeção.', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c17', date: '02/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Execução do Desafio: Finalização das medições. Comparação dos resultados com as tolerâncias.', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c18', date: '09/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Finalização do Desafio: Consolidação dos dados, emissão do parecer final sobre o lote e preparação da apresentação.', resources: 'Laboratório de Metrologia/Sala de aula, relatórios preenchidos, computador.' },
  { id: 'c19', date: '16/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Apresentação dos Resultados: Grupos apresentam seus relatórios e pareceres ao "Gestor da Qualidade" (docente).', resources: 'Sala de aula, projetor, relatórios consolidados.' },
  { id: 'c20', date: '23/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Feedback final sobre o desempenho na SA. Autoavaliação e fechamento da Unidade Curricular.', resources: 'Sala de aula, instrumentos de avaliação preenchidos.' }
];

const COMMON_SA = [
  {
    id: 'sa-crd-integrada',
    title: 'Precisão em Foco: Verificação de Componentes para a Linha de Montagem',
    context: 'A "UsiPrecision Componentes Mecânicos Ltda." é uma empresa de médio porte, com 150 funcionários, especializada na fabricação de peças usinadas para a indústria automotiva e de máquinas agrícolas. Recentemente, a empresa tem enfrentado um aumento no índice de devoluções de um de seus principais clientes. O motivo alegado é a inconsistência dimensional em lotes de "Pinos de Ancoragem", componentes críticos para a montagem de um sistema de transmissão. O gestor da Qualidade identificou que a causa raiz do problema pode estar na falta de um procedimento padronizado de medição e na variação de critérios entre os inspetores do turno. Para resolver essa não conformidade e garantir a satisfação do cliente, a empresa decidiu investir na capacitação de sua equipe, começando pelos novos aprendizes. Vocês, como parte da nova equipe de controle dimensional, foram designados para uma tarefa importantíssima: estabelecer um método de inspeção confiável para garantir que 100% das peças enviadas ao cliente estejam rigorosamente dentro das especificações do desenho técnico. A sua atuação será fundamental para restaurar a confiança do cliente e evitar prejuízos com refugo e retrabalho. O ambiente de trabalho será a bancada de inspeção do laboratório de metrologia, que simula a estação de controle de qualidade da UsiPrecision.',
    challenge: 'Vocês receberam um lote piloto de 10 "Pinos de Ancoragem" e o respectivo desenho técnico. A sua missão é realizar uma inspeção dimensional completa em cada uma das peças para determinar se o lote pode ser aprovado para envio ao cliente. Para isso, vocês deverão: a) Analisar o Desenho Técnico; b) Planejar a Inspeção (definir sequência e instrumentos); c) Executar as Medições aplicando as técnicas corretas; d) Registrar os Dados no Relatório; e) Emitir o Parecer (Aprovado ou Reprovado) justificando a decisão.',
    expectedResults: [
      'Relatórios de Inspeção Dimensional: Um relatório para cada peça inspecionada, devidamente preenchido, com todas as medições e o parecer final claramente justificado.',
      'Demonstração Prática: Habilidade no manuseio correto e seguro de todos os instrumentos (escala, trena, paquímetro, micrômetro, verificadores, relógios e goniômetro).',
      'Argumentação Técnica: Capacidade de explicar oralmente o processo e defender as decisões de aprovação ou reprovação.',
      'Organização do Posto de Trabalho: Bancada limpa e organizada, com instrumentos guardados em seus estojos ao término da atividade.'
    ]
  }
];

export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: 'plan-usinagem-beretella',
    profileId: 'beretella',
    courseName: 'SMO - Mecânico de Usinagem Convencional',
    modality: 'Presencial',
    totalHours: 400,
    objective: 'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.',
    methodology: 'Metodologia SENAI de Educação Profissional (MSEP). Uso de situações de aprendizagem realistas através do Cronograma Integrador.',
    evaluation: 'Contínua baseada em rubricas de desempenho e qualidade das peças usinadas.',
    bibliography: 'Guia de Aprendizagem Profissional SENAI: Fresamento e Torneamento. NBR 10067, NBR 8403, VIM.',
    createdAt: new Date().toISOString(),
    units: [
      {
        id: 'uc-lidt-beretella',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-15', markings: [] },
        basicCapacities: ['I. Interpretar desenhos técnicos', 'II. Elaborar croquis', 'III. Interpretar montagem', 'IV. Interpretar tolerâncias'],
        socioemocionalCapacities: ['Atenção a detalhes', 'Senso crítico', 'Escuta ativa'],
        knowledge: [{ topic: 'I. Desenho técnico', subtopics: ['1. Normas', '2. Projeções', '3. Escalas'] }],
        learningSituations: [],
        rubrics: [],
        schedule: []
      },
      {
        id: 'uc-crd-beretella',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: ['1. Importância da Metrologia', '2. Escala e Trena', '3. Paquímetro', '4. Micrômetro', '5. Verificadores', '6. Relógios', '7. Goniômetro'],
        socioemocionalCapacities: ['Atenção a detalhes', 'Organização', 'Zelo pelos equipamentos'],
        knowledge: [
          { topic: '1. Metrologia', subtopics: ['Conceitos', 'Terminologia VIM'] },
          { topic: '2. Instrumentos', subtopics: ['Manuseio', 'Leitura', 'Conservação'] }
        ],
        learningSituations: COMMON_SA,
        rubrics: [
          { capacity: 'Medir peças com paquímetro e micrômetro', nsa: 'Comete erros grosseiros.', apo: 'Mede com auxílio.', par: 'Mede de forma autônoma.', aut: 'Mede com alta precisão.' }
        ],
        schedule: CRD_SCHEDULE
      }
    ]
  },
  {
    id: 'plan-usinagem-gea',
    profileId: 'gea',
    courseName: 'SMO - Mecânico de Usinagem Convencional',
    modality: 'Presencial',
    totalHours: 400,
    objective: 'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina e usinagem seguindo normas de segurança.',
    methodology: 'Metodologia SENAI (MSEP).',
    evaluation: 'Contínua baseada em rubricas.',
    bibliography: 'Guia de Aprendizagem SENAI.',
    createdAt: new Date().toISOString(),
    units: [
      {
        id: 'uc-lidt-gea',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-15', markings: [] },
        basicCapacities: ['Interpretar desenhos'],
        socioemocionalCapacities: ['Atenção'],
        knowledge: [],
        learningSituations: [],
        rubrics: [],
        schedule: []
      },
      {
        id: 'uc-crd-gea',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: ['Metrologia Industrial'],
        socioemocionalCapacities: ['Zelo e Organização'],
        knowledge: [],
        learningSituations: COMMON_SA,
        rubrics: [],
        schedule: CRD_SCHEDULE
      }
    ]
  }
];
