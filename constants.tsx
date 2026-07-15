// C:/Users/Aluno/Desktop/Plano-de-Ensino-e-Cronograma/constants.tsx

import { TeachingPlan, CurricularUnit } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// Versão do cronograma atualizada para o 2º Semestre (FUSI alterada para PRUC)
export const SCHEDULE_VERSION = "2026-V21-PRUC-160H";

// ============================================================================
// ==================== CRONOGRAMAS: 1º SEMESTRE ========================
// ============================================================================

// --- CRONOGRAMA LIDT (1º Semestre - Leitura e Interpretação de Desenho Técnico) ---
export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacities da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto".', resources: 'Sala de aula, projetor.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT.', resources: 'Exemplos de desenhos técnicos.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, models de sólidos.' },
  { id: 'l4', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica.', resources: 'Papel, lápis.' },
  { id: 'l5', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais.', resources: 'Modelos de peças simples.' },
  { id: 'l6', date: '09/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas únicas, face de referência).', strategy: '• Exercícios de cotagem de vistas ortogonais.', resources: 'Exercícios impressos.' },
  { id: 'l7', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração de cortes.', resources: 'Desenhos técnicos com cortes.' },
  { id: 'l8', date: '23/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte.', strategy: '• Estudo de caso: Análise de desenhos complexos.', resources: 'Conjunto de desenhos variados.' },
  { id: 'l9', date: '30/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação).', strategy: '• Exercícios de desenho de vistas auxiliares.', resources: 'Modelos de peças com faces inclinadas.' },
  { id: 'l10', date: '06/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, explodida).', strategy: '• Apresentação da estrutura de um desenho de conjunto.', resources: 'Exemplo de desenho de conjunto.' },
  { id: 'l11', date: '13/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5.3. Lista de materiais; 5.4. Balões.', strategy: '• Análise do desenho de "Subconjunto do Acoplamento".', resources: 'Cópia do desenho da SA.' },
  { id: 'l12', date: '27/04/2026', hours: 2, capacities: 'Interpretar tolerância dimensional.', knowledge: '6.1. Tolerância dimensional (campos, ISO).', strategy: '• Introdução aos conceitos de tolerância e ajustes.', resources: 'Tabelas de tolerância ISO.' },
  { id: 'l13', date: '04/05/2026', hours: 2, capacities: 'Interpretar tolerância geométrica.', knowledge: '6.2. Tolerância geométrica (forma, posição).', strategy: '• Apresentação dos símbolos e significados.', resources: 'Quadro de tolerâncias geométricas.' },
  { id: 'l14', date: '11/05/2026', hours: 2, capacities: 'Interpretar acabamento superficial.', knowledge: '6.3. Acabamento superficial (rugosidade).', strategy: '• Explicação dos símbolos de acabamento.', resources: 'Tabela de símbolos.' },
  { id: 'l15', date: '18/05/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Início da divulgação dos croquis detalhados.', resources: 'Papel, instrumentos de desenho.' },
  { id: 'l16', date: '25/05/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Continuação e refinamento dos croquis.', resources: 'Dossiê em fase de conclusão.' },
  { id: 'l17', date: '01/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Finalização dos croquis e do dossiê técnico.', resources: 'Dossiê técnico.' },
  { id: 'l18', date: '08/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Apresentação dos Resultados e Dossiês.', resources: 'Projetor.' },
  { id: 'l19', date: '15/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Feedback e Avaliação final.', resources: 'Fichas de avaliação.' },
  { id: 'l20', date: '22/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento de Notas.', strategy: '• Encerramento da Unidade Curricular.', resources: 'Diário de classe.' }
];

// --- CRONOGRAMA CRD (1º Semestre - Controle Rápido Dimensional) ---
export const CRD_SCHEDULE = [
  { id: 'c1', date: '27/01/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia.', knowledge: '1. Metrologia', strategy: 'Apresentação da SA. Exposição dialogada.', resources: 'Projetor.' },
  { id: 'c2', date: '03/02/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia.', knowledge: '2. Erros de medição', strategy: 'Discussão em grupo sobre tipos de erro.', resources: 'Instrumentos de medição.' },
  { id: 'c3', date: '10/02/2026', hours: 2, capacities: 'II. Medir peças com escala e trena.', knowledge: '3. Escala e 4. Trena', strategy: 'Demonstração prática e exercícios.', resources: 'Escalas, trenas.' },
  { id: 'c4', date: '24/02/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro.', knowledge: '5. Paquímetros', strategy: 'Exposição dialogada e demonstração.', resources: 'Paquímetros.' },
  { id: 'c5', date: '03/03/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro.', knowledge: '5.3 Leitura métrica 0,05 e 0,02.', strategy: 'Exercício prático de leitura.', resources: 'Peças didáticas.' },
  { id: 'c6', date: '10/03/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro.', knowledge: '5.5 Medição real.', strategy: 'Exercício supervisionado de medição.', resources: 'Relatório de medição.' },
  { id: 'c7', date: '17/03/2026', hours: 2, capacities: 'V. Medir com micrômetro.', knowledge: '6. Micrômetros', strategy: 'Demonstração de manuseio e ajuste.', resources: 'Micrômetros.' },
  { id: 'c8', date: '24/03/2026', hours: 2, capacities: 'V. Medir com micrômetro.', knowledge: '6.4 Leitura métrica 0,01.', strategy: 'Exercício prático de leitura.', resources: 'Peças didáticas.' },
  { id: 'c9', date: '31/03/2026', hours: 2, capacities: 'V. Medir com micrômetro.', knowledge: '6.5 Medição real.', strategy: 'Exercício de medição e comparação.', resources: 'Relatório.' },
  { id: 'c10', date: '07/04/2026', hours: 2, capacities: 'VI. Verificar dimensões com verificadores.', knowledge: '7. Verificadores', strategy: 'Uso de calibradores de folga e rosca.', resources: 'Jogos de verificadores.' },
  { id: 'c11', date: '14/04/2026', hours: 2, capacities: 'VII. Medir por comparação.', knowledge: '8. Relógios comparadores.', strategy: 'Demonstração de montagem em suportes.', resources: 'Relógios comparadores.' },
  { id: 'c12', date: '28/04/2026', hours: 2, capacities: 'VII. Medir por comparação.', knowledge: '8.3 Calibração básica.', strategy: 'Exercício prático de comparação.', resources: 'Padrões de medição.' },
  { id: 'c13', date: '05/05/2026', hours: 2, capacities: 'VIII. Controlar dimensões.', knowledge: '9. Tolerância dimensional.', strategy: 'Análise de desenhos com furos e eixos.', resources: 'Tabelas de tolerância.' },
  { id: 'c14', date: '12/05/2026', hours: 2, capacities: 'VIII. Controlar dimensões.', knowledge: '9.2 Ajustes recomendados.', strategy: 'Estudo prático de montagens mecânicas.', resources: 'Desenhos técnicos.' },
  { id: 'c15', date: '19/05/2026', hours: 2, capacities: 'IX. Registrar desvios de medidas.', knowledge: '10. Prontuário de qualidade.', strategy: 'Preenchimento de relatórios e controle.', resources: 'Folhas de registro.' },
  { id: 'c16', date: '26/05/2026', hours: 2, capacities: 'IX. Registrar desvios de medidas.', knowledge: '10.2 Cartas de controle.', strategy: 'Exercício de registro estatístico básico.', resources: 'Planilhas.' },
  { id: 'c17', date: '02/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Apresentação dos resultados de metrologia.', strategy: 'Avaliação prática individual no laboratório.', resources: 'Peças reais e instrumentos.' },
  { id: 'c18', date: '09/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Revisão geral dos relatórios de qualidade.', strategy: 'Entrega de portfólio de medição.', resources: 'Portfólios.' },
  { id: 'c19', date: '16/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento final.', strategy: 'Entrega de notas e feedback individual.', resources: 'Boletim.' },
  { id: 'c20', date: '23/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Encerramento.', strategy: 'Fechamento de diário e arquivo morto.', resources: 'Sistema.' }
];

// --- CRONOGRAMA FUSI (1º Semestre - Fundamentos de Usinagem) ---
export const FUSI_SCHEDULE = [
  { id: 'f1', date: '28/01/2026', hours: 4, capacities: 'Planejar processos de usinagem.', knowledge: 'Introdução à Usinagem e Segurança.', strategy: 'Exposição dialogada e regras de oficina.', resources: 'Quadro, EPIs.' },
  { id: 'f2', date: '04/02/2026', hours: 4, capacities: 'Planejar processos de usinagem.', knowledge: 'Ferramentas de Corte e Materiais.', strategy: 'Demonstração de geometrias de corte.', resources: 'Insertos, ferramentas.' },
  { id: 'f3', date: '11/02/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Torneamento Cilíndrico Externo.', strategy: 'Demonstração prática no torno e execução.', resources: 'Torno, tarugo de aço.' },
  { id: 'f4', date: '25/02/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Faceamento e Centragem.', strategy: 'Prática guiada pelos alunos.', resources: 'Torno, broca de centro.' },
  { id: 'f5', date: '04/03/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Torneamento de canais e sangramento.', strategy: 'Instrução teórica e prática.', resources: 'Bedames.' },
  { id: 'f6', date: '11/03/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Furação no torno.', strategy: 'Prática de furação cilíndrica com contra-ponto.', resources: 'Brocas helicoidais.' },
  { id: 'f7', date: '18/03/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Introdução à Fresagem e Alinhamento.', strategy: 'Demonstração dos eixos da fresadora.', resources: 'Fresadora, morsa.' },
  { id: 'f8', date: '25/03/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Fresamento de Superfícies Planas.', strategy: 'Execução de esquadrejamento de bloco.', resources: 'Fresa cabeçote.' },
  { id: 'f9', date: '01/04/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Fresamento de canais retos.', strategy: 'Prática de rasgos com fresas de topo.', resources: 'Fresa de topo de aço rápido.' },
  { id: 'f10', date: '08/04/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Rosqueamento manual e mecânico.', strategy: 'Demonstração de rosqueamento com cossinete.', resources: 'Cossinetes, machos.' },
  { id: 'f11', date: '15/04/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Furação na fresadora.', strategy: 'Prática de marcação e furação em coordenadas.', resources: 'Fresadora.' },
  { id: 'f12', date: '29/04/2026', hours: 4, capacities: 'Realizar manutenção de primeiro nível.', knowledge: 'Lubrificação e limpeza de máquinas.', strategy: 'Prática de limpeza profunda nos barramentos.', resources: 'Óleos lubrificantes, panos.' },
  { id: 'f13', date: '06/05/2026', hours: 4, capacities: 'Controlar parâmetros de corte.', knowledge: 'Cálculo de RPM e Avanço.', strategy: 'Exercício prático de parâmetros reais de torneamento.', resources: 'Calculadora.' },
  { id: 'f14', date: '13/05/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Torneamento cônico por inclinação do carro.', strategy: 'Prática de cones curtos.', resources: 'Torno mecânico.' },
  { id: 'f15', date: '20/05/2026', hours: 4, capacities: 'Executar montagem e ajustes de subconjuntos.', knowledge: 'Montagem do projeto final.', strategy: 'Início da montagem das peças usinadas.', resources: 'Elementos de fixação.' },
  { id: 'f16', date: '27/05/2026', hours: 4, capacities: 'Executar montagem e ajustes de subconjuntos.', knowledge: 'Ajustagem mecânica de peças.', strategy: 'Prática de limagem e rebarbação.', resources: 'Limas, raspadores.' },
  { id: 'f17', date: '03/06/2026', hours: 4, capacities: 'Todas as capacities da SA.', knowledge: 'Execução do projeto final (Ajustes).', strategy: 'Testes de montagem e interferência.', resources: 'Projeto mecânico.' },
  { id: 'f18', date: '10/06/2026', hours: 4, capacities: 'Todas as capacities da SA.', knowledge: 'Apresentação do Projeto Prático.', strategy: 'Funcionamento e conferência dimensional do conjunto.', resources: 'Ficha técnica.' },
  { id: 'f19', date: '17/06/2026', hours: 4, capacities: 'Todas as capacities da SA.', knowledge: 'Recuperações práticas.', strategy: 'Refazer operações pendentes ou desajustadas.', resources: 'Máquinas.' },
  { id: 'f20', date: '24/06/2026', hours: 4, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento de diário técnico.', strategy: 'Encerramento geral do primeiro semestre.', resources: 'Notas.' }
];

// ============================================================================
// ==================== CRONOGRAMAS: 2º SEMESTRE ========================
// ============================================================================

// --- CRONOGRAMA PRUC (2º Semestre - Processos de Usinagem em Torno e Fresadora) ---
export const PRUC_SCHEDULE = [
  { id: 'p1', date: '22/07/2026', hours: 4, capacities: 'Planejar o processo de usinagem.', knowledge: 'Introdução aos Processos de Usinagem no 2º Semestre.', strategy: '• Apresentação do plano do curso; • Definições e boas práticas de segurança.', resources: 'Sala de aula, projetor.' },
  { id: 'p2', date: '29/07/2026', hours: 4, capacities: 'Planejar o processo de usinagem.', knowledge: 'Geometria das ferramentas de corte de metal duro.', strategy: '• Demonstração prática de afiação e seleção de insertos.', resources: 'Insertos de metal duro, pastilhas.' },
  { id: 'p3', date: '05/08/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Torneamento cilíndrico de alta precisão.', strategy: '• Prática de ajuste micrométrico no anel graduado.', resources: 'Torno convencional, micrômetro.' },
  { id: 'p4', date: '12/08/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Fresamento de rebaixos e canais paralelos.', strategy: '• Alinhamento do cabeçote e uso de fresas de topo.', resources: 'Fresadora ferramentaria.' },
  { id: 'p5', date: '19/08/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Rosqueamento triangular externo no torno.', strategy: '• Ajuste de recâmbio de engrenagens e tabela da caixa Norton.', resources: 'Torno, pente de rosca.' },
  { id: 'p6', date: '26/08/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Rosqueamento triangular interno.', strategy: '• Operação com barra de mandrilar rosca.', resources: 'Torno, peça pré-furada.' },
  { id: 'p7', date: '02/09/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Fresamento angular e canais em V.', strategy: '• Prática utilizando morsa inclinável ou cabeçote inclinado.', resources: 'Fresadora, blocos de aço.' },
  { id: 'p8', date: '09/09/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Torneamento excêntrico básico.', strategy: '• Centralização utilizando relógio apalpador nas castanhas independentes.', resources: 'Placa de 4 castanhas independentes.' },
  { id: 'p9', date: '16/09/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Uso do aparelho divisor para engrenagens.', strategy: '• Cálculos de divisão direta e indireta.', resources: 'Aparelho divisor, fresa módulo.' },
  { id: 'p10', date: '23/09/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Fresamento de engrenagem cilíndrica de dentes retos.', strategy: '• Usinagem prática de engrenagem dente por dente.', resources: 'Aparelho divisor, fresadora.' },
  { id: 'p11', date: '30/09/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Torneamento cônico longo com desalinhamento da contraponta.', strategy: '• Cálculo de desalinhamento e usinagem.', resources: 'Torno mecânico, relógio comparador.' },
  { id: 'p12', date: '07/10/2026', hours: 4, capacities: 'Operar fresadora convencional.', knowledge: 'Fresamento helicoidal e canais espirais.', strategy: '• Cálculos de engrenamento e montagem de grade.', resources: 'Fresadora universal, jogo de engrenagens.' },
  { id: 'p13', date: '14/10/2026', hours: 4, capacities: 'Operar torno mecânico horizontal.', knowledge: 'Usinagem de roscas trapezoidais.', strategy: '• Afiação de ferramenta de perfil trapezoidal.', resources: 'Esmeril, calibrador de rosca trapezoidal.' },
  { id: 'p14', date: '21/10/2026', hours: 4, capacities: 'Controlar parâmetros de corte.', knowledge: 'Otimização de tempo de usinagem.', strategy: '• Cálculo de avanço, rotação e profundidade máxima por passe.', resources: 'Calculadora técnica.' },
  { id: 'p15', date: '28/10/2026', hours: 4, capacities: 'Realizar manutenção de primeiro nível.', knowledge: 'Manutenção autônoma e lubrificação das guias de alta precisão.', strategy: '• Aplicação de checklists TPM de oficina.', resources: 'Máquinas operatrizes.' },
  { id: 'p16', date: '04/11/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Início do projeto mecânico integrador final.', strategy: '• Planejamento e corte de matéria-prima para o conjunto.', resources: 'Plano de usinagem, serra de fita.' },
  { id: 'p17', date: '11/11/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Usinagem de precisão das partes móveis do projeto.', strategy: '• Ajustagem fina de tolerâncias dimensionais H7/g6.', resources: 'Tornos e fresadoras.' },
  { id: 'p18', date: '18/11/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Usinagem e acabamento das partes fixas do projeto.', strategy: '• Controle de rugosidade e planicidade.', resources: 'Rugosímetro, fresadora.' },
  { id: 'p19', date: '25/11/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Montagem mecânica e testes funcionais do projeto.', strategy: '• Ajustagem por limagem e montagem de rolamentos.', resources: 'Mesa de desempeno, ferramentas manuais.' },
  { id: 'p20', date: '02/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Apresentação final do protótipo e controle de qualidade.', strategy: '• Relatório de medições finais e funcionamento.', resources: 'Ficha de inspeção.' },
  { id: 'p21', date: '09/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Recuperação de habilidades práticas pendentes.', strategy: '• Atividades práticas pontuais direcionadas.', resources: 'Oficina mecânica.' },
  { id: 'p22', date: '16/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Fechamento final do diário de classe.', strategy: '• Feedback e encerramento do semestre.', resources: 'Diário de notas.' }
];


// ============================================================================
// ==================== TEMPLATES DAS UNIDADES CURRICULARES ====================
// ============================================================================

const LIDT_UNIT_TEMPLATE: CurricularUnit = {
  id: 'lidt',
  name: 'Leitura e Interpretação de Desenho Técnico (LIDT)',
  basicCapacities: [
    'Interpretar desenhos técnicos de peças, conjuntos e montagens',
    'Elaborar croquis de peças e componentes mecânicos simples',
    'Interpretar tolerâncias dimensionais, geométricas e acabamentos'
  ],
  socioemocionalCapacities: [
    'Atenção a detalhes e precisão técnica',
    'Organização e zelo com documentação'
  ],
  knowledge: [
    { topic: 'Geometria Espacial', subtopics: ['Perspectiva isométrica', 'Projeção ortogonal'] },
    { topic: 'Cotagem e Convenções', subtopics: ['Cortes', 'Seções', 'Vistas especiais'] }
  ],
  learningSituations: [
    {
      id: 'sa-lidt-1',
      title: 'Decifrando o Projeto do Acoplamento',
      context: 'Você recebeu um projeto técnico incompleto de um acoplamento de eixos que precisa de detalhamento imediato.',
      challenge: 'Interpretar as projeções e desenhar os croquis com todas as cotas e tolerâncias normalizadas.',
      expectedResults: ['Croqui em papel milimetrado completo', 'Tabela de cotas preenchida', 'Dossiê técnico final']
    }
  ],
  rubrics: [
    { capacity: 'Interpretar desenhos técnicos', nsa: 'Abaixo de 50%', apo: '50% a 70%', par: '70% a 90%', aut: '90% a 100%' }
  ],
  schedule: LIDT_SCHEDULE,
  calendar: {
    startDate: '2026-01-26',
    endDate: '2026-06-22',
    markings: []
  }
};

const CRD_UNIT_TEMPLATE: CurricularUnit = {
  id: 'crd',
  name: 'Controle Rápido Dimensional (CRD)',
  basicCapacities: [
    'Medir peças mecânicas utilizando instrumentos lineares como paquímetros e micrômetros',
    'Utilizar calibradores, calibradores de folga e relógios comparadores',
    'Registrar e controlar desvios em prontuários de qualidade'
  ],
  socioemocionalCapacities: [
    'Ética no registro técnico de desvios',
    'Rigor e persistência na busca de exatidão'
  ],
  knowledge: [
    { topic: 'Metrologia Geral', subtopics: ['Conceito de polegada e milímetro', 'Erros sistemáticos e de leitura'] },
    { topic: 'Instrumentos Mecânicos', subtopics: ['Paquímetro 0.02 e 0.05', 'Micrômetro centesimal', 'Relógio comparador'] }
  ],
  learningSituations: [
    {
      id: 'sa-crd-1',
      title: 'Garantia de Qualidade da Linha',
      context: 'Um lote de eixos usinados foi colocado sob suspeita de desvios dimensionais críticos.',
      challenge: 'Realizar a medição de 100% do lote utilizando os instrumentos corretos e preencher as cartas de controle.',
      expectedResults: ['Relatório de qualidade assinado', 'Classificação de peças aprovadas/rejeitadas']
    }
  ],
  rubrics: [
    { capacity: 'Medir com micrômetro', nsa: 'Erros superiores a 0.05mm', apo: 'Precisão de até 0.02mm', par: 'Precisão de até 0.01mm', aut: 'Precisão cirúrgica sem desvios' }
  ],
  schedule: CRD_SCHEDULE,
  calendar: {
    startDate: '2026-01-27',
    endDate: '2026-06-23',
    markings: []
  }
};

// --- TEMPLATE DA NOVA UC PRUC DO 2º SEMESTRE ---
const PRUC_UNIT_TEMPLATE: CurricularUnit = {
  id: 'pruc',
  name: 'Processos de Usinagem em Torno e Fresadora (PRUC)',
  basicCapacities: [
    'Planejar o processo de usinagem cilíndrica e plana convencional',
    'Operar torno mecânico horizontal realizando roscas, cones e excentricidades',
    'Operar fresadora horizontal e universal utilizando o aparelho divisor para engrenagens'
  ],
  socioemocionalCapacities: [
    'Foco absoluto na prevenção de acidentes na oficina',
    'Resiliência no ajuste mecânico manual fino'
  ],
  knowledge: [
    { topic: 'Teoria da Usinagem', subtopics: ['Geometria de corte', 'Fluidos e refrigeração', 'Parâmetros de avanço'] },
    { topic: 'Processos Avançados', subtopics: ['Cálculo Norton', 'Divisor universal', 'Roscas trapezoidais'] }
  ],
  learningSituations: [
    {
      id: 'sa-pruc-1',
      title: 'Construção da Caixa Redutora',
      context: 'Para finalizar a linha de montagem, é necessária a fabricação manual de um conjunto redutor de velocidade.',
      challenge: 'Usinar a engrenagem cilíndrica de dentes retos e o eixo roscado trapezoidal seguindo o plano de processo técnico.',
      expectedResults: ['Conjunto montado com transmissão fluida', 'Relatório de parâmetros de corte calculados']
    }
  ],
  rubrics: [
    { capacity: 'Operar torno e fresadora convencional', nsa: 'Acabamento grosseiro ou fora de tolerância', apo: 'Acabamento aceitável com pequenas rebarbas', par: 'Excelente acabamento superficial, dentro da tolerância', aut: 'Usinagem impecável em classe IT7 sem auxílio externo' }
  ],
  schedule: PRUC_SCHEDULE,
  calendar: {
    startDate: '2026-07-22',
    endDate: '2026-12-16',
    markings: []
  }
};

// ============================================================================
// ======================= PLANOS DE ENSINO COMPLETOS ==========================
// ============================================================================

export const SAMPLE_PLANS: TeachingPlan[] = [
  // --- 1º SEMESTRE - PLANO PADRÃO ---
  {
    id: 'plan-usinagem-beretella',
    profileId: 'beretella',
    courseName: 'Mecânico de Usinagem Convencional - 1º SEMESTRE',
    modality: 'Qualificação Profissional',
    totalHours: 240,
    objective: 'Proporcionar o desenvolvimento das competências necessárias para executar operações de usinagem em máquinas convencionais (torno e fresadora) e controle dimensional de acordo com os padrões técnicos e normas vigentes.',
    methodology: 'Metodologia SENAI de Educação Profissional, baseada em Situações de Aprendizagem práticas com fomento à autonomia.',
    evaluation: 'Avaliação processual contínua de capacidades técnicas e atitudinais por meio de checklists e fichas de acompanhamento.',
    bibliography: '• Práticas de Torneamento - SENAI-SP; • Práticas de Fresagem - SENAI-SP; • Metrologia Dimensional Aplicada.',
    units: [LIDT_UNIT_TEMPLATE, CRD_UNIT_TEMPLATE],
    createdAt: '2026-01-20T10:00:00.000Z',
    updatedAt: '2026-01-20T10:00:00.000Z'
  },
  
  // --- 2º SEMESTRE - PLANO PADRÃO (Com a UC PRUC de 160H) ---
  {
    id: 'plan-usinagem-beretella-sem2',
    profileId: 'beretella',
    courseName: 'Mecânico de Usinagem Convencional - 2º SEMESTRE',
    modality: 'Qualificação Profissional',
    totalHours: 240,
    objective: 'Executar processos avançados de usinagem em tornos paralelos e fresadoras convencionais utilizando acessórios de posicionamento preciso como aparelho divisor e caixas de engrenagens para confecção de elementos de máquinas.',
    methodology: 'Práticas intensivas de oficina com desenvolvimento de projetos reais, estimulando o trabalho cooperativo e as competências de montagem mecânica.',
    evaluation: 'Entrega física e testes mecânicos dos subconjuntos fabricados nas aulas práticas.',
    bibliography: '• Ajustagem Mecânica Avançada - SENAI; • Elementos de Máquinas - Sarkis; • Manual de Tecnologia de Metais - Reinaldo.',
    units: [LIDT_UNIT_TEMPLATE, CRD_UNIT_TEMPLATE, PRUC_UNIT_TEMPLATE],
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-07-15T09:00:00.000Z'
  },

  // --- MODELO COPIADO PARA O OUTRO PROFESSOR (GEA) ---
  {
    id: 'plan-usinagem-gea',
    profileId: 'gea',
    courseName: 'Mecânico de Usinagem Convencional - 1º SEMESTRE',
    modality: 'Qualificação Profissional',
    totalHours: 240,
    objective: 'Proporcionar o desenvolvimento das competências necessárias para executar operações de usinagem em máquinas convencionais...',
    methodology: 'Metodologia SENAI baseada em projetos integradores de metrologia dimensional e leitura de croquis técnicos.',
    evaluation: 'Avaliação somativa ao final de cada SA por rubricas e relatórios estruturados.',
    bibliography: '• Práticas de Torneamento - SENAI-SP; • Metrologia Dimensional Aplicada.',
    units: [LIDT_UNIT_TEMPLATE, CRD_UNIT_TEMPLATE],
    createdAt: '2026-01-20T10:00:00.000Z',
    updatedAt: '2026-01-20T10:00:00.000Z'
  },
  {
    id: 'plan-usinagem-gea-sem2',
    profileId: 'gea',
    courseName: 'Mecânico de Usinagem Convencional - 2º SEMESTRE',
    modality: 'Qualificação Profissional',
    totalHours: 240,
    objective: 'Executar processos avançados de usinagem em tornos paralelos e fresadoras convencionais...',
    methodology: 'Práticas intensivas de oficina com desenvolvimento de projetos mecânicos e ajustagem.',
    evaluation: 'Rubricas técnicas de processo e produto acabado (acoplamentos e redutores).',
    bibliography: '• Ajustagem Mecânica Avançada - SENAI; • Elementos de Máquinas - Sarkis.',
    units: [LIDT_UNIT_TEMPLATE, CRD_UNIT_TEMPLATE, PRUC_UNIT_TEMPLATE],
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-07-15T09:00:00.000Z'
  }
];
