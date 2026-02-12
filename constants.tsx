
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

const COMMON_SA_CRD = [
  {
    id: 'sa-crd-integrada',
    title: 'Precisão em Foco: Verificação de Componentes para a Linha de Montagem',
    context: 'A "UsiPrecision Componentes Mecânicos Ltda." é uma empresa de médio porte, especializada na fabricação de peças usinadas para a indústria automotiva. Recentemente, a empresa tem enfrentado um aumento no índice de devoluções devido à inconsistência dimensional em lotes de "Pinos de Ancoragem". O gestor da Qualidade identificou que a causa raiz do problema pode estar na falta de um procedimento padronizado de medição. Como parte da nova equipe de controle dimensional, sua missão é estabelecer um método de inspeção confiável.',
    challenge: 'Vocês receberam um lote piloto de 10 "Pinos de Ancoragem" e o respectivo desenho técnico. Deverão: a) Analisar o Desenho Técnico; b) Planejar a Inspeção; c) Executar as Medições; d) Registrar os Dados no Relatório; e) Emitir o Parecer.',
    expectedResults: [
      'Relatórios de Inspeção Dimensional completos.',
      'Habilidade no manuseio correto e seguro dos instrumentos.',
      'Argumentação Técnica sobre as decisões de aprovação/reprovação.',
      'Zelo e organização com os equipamentos do laboratório.'
    ]
  }
];

const FULL_KNOWLEDGE_CRD = [
  { 
    topic: '1. Metrologia', 
    subtopics: ['I. Definição', 'II. Características', 'III. Aplicações', 'IV. Terminologia (Vocabulário Internacional de Metrologia - VIM)'] 
  },
  { 
    topic: '2. Erros de medição', 
    subtopics: ['I. Tipos', 'II. Aleatório', 'III. Sistemático', 'IV. Grosseiro', 'V. Fontes de erro', 'VI. Variação da temperatura', 'VII. Paralaxe', 'VIII. Força de medição', 'IX. Complexidade da peça', 'X. Condições do Instrumento', 'XI. Processos de correção', 'XII. Calibração do Instrumento'] 
  },
  { 
    topic: '3. Escala', 
    subtopics: ['I. Tipos', 'II. Características', 'III. Leitura', 'IV. Sistema métrico', 'V. Sistema Inglês', 'VI. Conversão entre sistemas de medida', 'VII. Erros de leitura', 'VIII. Utilização'] 
  },
  { 
    topic: '4. Trena', 
    subtopics: ['I. Tipos', 'II. Características', 'III. Leitura no sistema métrico', 'IV. Erros de leitura', 'V. Utilização'] 
  },
  { 
    topic: '5. Paquímetros', 
    subtopics: ['I. Tipos', 'II. Características', 'III. Leitura', 'IV. Sistema métrico', 'V. Sistema Inglês', 'VI. Erros de leitura', 'VII. Utilização'] 
  },
  { 
    topic: '6. Micrômetros', 
    subtopics: ['I. Tipos', 'II. Características', 'III. Leitura no sistema métrico', 'IV. Erros de leitura', 'V. Ajuste zero', 'VI. Utilização'] 
  },
  { 
    topic: '7. Verificadores', 
    subtopics: ['I. Tipos', 'II. Folga', 'III. Raio', 'IV. Rosca', 'V. Utilização'] 
  },
  { 
    topic: '8. Relógios comparadores e apalpadores', 
    subtopics: ['I. Tipos', 'II. Características', 'III. Ajuste zero', 'IV. Utilização'] 
  },
  { 
    topic: '9. Goniômetro', 
    subtopics: ['I. Tipos', 'II. Características', 'III. Erros de leitura', 'IV. Utilização'] 
  }
];

const FULL_CAPACITIES_CRD = [
  'I. Identificar a importância da metrologia na indústria metalmecânica.',
  'II. Medir peças com escala.',
  'III. Medir peças com trena.',
  'IV. Medir peças com paquímetro.',
  'V. Medir peças no sistema métrico com micrômetro.',
  'VI. Verificar dimensões e perfis com verificadores.',
  'VII. Medir por comparação com relógio apalpador e comparador.',
  'VIII. Medir peças com goniômetro.'
];

const FULL_SOCIOEMOCIONAL_CRD = [
  'PENSAMENTO ANALÍTICO: I. Demonstrar atenção a detalhes',
  'AUTOGESTÃO: I. Organizar o ambiente de trabalho e as atividades',
  'AUTOGESTÃO: II. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais'
];

const FULL_RUBRICS_CRD = [
  { 
    capacity: 'Medir peças com paquímetro.', 
    nsa: 'Tenta medir, mas comete erros grosseiros na leitura da escala ou no manuseio, orientação inicial.', 
    apo: 'Realiza a medição com auxílio, cometendo erros pontuais na leitura do nônio ou no docente na soma das escalas ou no uso da catraca.', 
    par: 'Mede a peça de forma autônoma e correta, aplicando as técnicas de manuseio e leitura.', 
    aut: 'Mede com precisão e rapidez, identificando potenciais fontes de erro (paralaxe, periodicamente e argumenta sobre a adequação do micrômetro para a tolerância solicitada.' 
  },
  { 
    capacity: 'Demonstrar atenção a detalhes.', 
    nsa: 'O relatório de inspeção apresenta múltiplos erros de transcrição e omissões. Não identifica as peças não conformes.', 
    apo: 'O relatório apresenta erros pontuais ou omissões. Identifica algumas, mas não todas, as peças não conformes.', 
    par: 'Preenche o relatório de forma correta e completa, identificando todas as peças não conformes.', 
    aut: 'Além de preencher o relatório corretamente, anota observações pertinentes sobre o acabamento da peça ou tendências de medidas que se aproximam dos limites de tolerância.' 
  },
  { 
    capacity: 'Organizar o ambiente de trabalho e as atividades.', 
    nsa: 'Deixa a bancada e os instrumentos desorganizados e sujos durante e após a atividade.', 
    apo: 'Necessita de lembretes para organizar a bancada ou para limpar e guardar os instrumentos corretamente.', 
    par: 'Mantém o ambiente de trabalho organizado e guarda os equipamentos corretamente ao final da tarefa, por iniciativa própria.', 
    aut: 'Além de manter seu próprio espaço organizado, incentiva os colegas a fazerem o mesmo e propõe melhorias na disposição das ferramentas para otimizar o fluxo de trabalho.' 
  }
];

const COMMON_CAPACITIES_LIDT = [
  'I. Interpretar desenhos técnicos de peças a partir de projetos da metalmecânica.',
  'II. Elaborar croquis de peças em projeção ortogonal e em perspectiva à mão livre.',
  'III. Interpretar desenho técnico de montagem de conjunto e subconjuntos.',
  'IV. Interpretar tolerância dimensional, geométrica e de acabamento superficial.'
];

const COMMON_KNOWLEDGE_LIDT = [
  { topic: 'I. Desenho Técnico', subtopics: ['Normas técnicas (ABNT)', 'Formatos e Legendas', 'Escalas', 'Linhas'] },
  { topic: 'II. Projeções Ortogonais', subtopics: ['1º e 3º Diedros', 'Vistas essenciais', 'Vistas auxiliares'] },
  { topic: 'III. Cortes e Seções', subtopics: ['Corte total', 'Meio corte', 'Corte parcial', 'Seções'] }
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
        basicCapacities: COMMON_CAPACITIES_LIDT,
        socioemocionalCapacities: ['Atenção a detalhes', 'Senso crítico', 'Escuta ativa'],
        knowledge: COMMON_KNOWLEDGE_LIDT,
        learningSituations: [],
        rubrics: [],
        schedule: []
      },
      {
        id: 'uc-crd-beretella',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: FULL_CAPACITIES_CRD,
        socioemocionalCapacities: FULL_SOCIOEMOCIONAL_CRD,
        knowledge: FULL_KNOWLEDGE_CRD,
        learningSituations: COMMON_SA_CRD,
        rubrics: FULL_RUBRICS_CRD,
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
        basicCapacities: COMMON_CAPACITIES_LIDT,
        socioemocionalCapacities: ['Atenção a detalhes', 'Senso crítico'],
        knowledge: COMMON_KNOWLEDGE_LIDT,
        learningSituations: [],
        rubrics: [],
        schedule: []
      },
      {
        id: 'uc-crd-gea',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: FULL_CAPACITIES_CRD,
        socioemocionalCapacities: FULL_SOCIOEMOCIONAL_CRD,
        knowledge: FULL_KNOWLEDGE_CRD,
        learningSituations: COMMON_SA_CRD,
        rubrics: FULL_RUBRICS_CRD,
        schedule: CRD_SCHEDULE
      }
    ]
  }
];
