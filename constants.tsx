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
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, modelos de sólidos.' },
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
  { id: 'f20', date: '24/06/2026', hours: 4, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento de diário técnico.', strategy: 'Encerramento geral del primeiro semestre.', resources: 'Notas.' }
];

// ============================================================================
// ==================== CRONOGRAMAS: 2º SEMESTRE ========================
// ============================================================================

// --- CRONOGRAMA PRUC (2º Semestre - Processos de Usinagem Convencional) ---
export const PRUC_SCHEDULE = [
  { id: 'p1', date: '22/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Introdução aos Processos de Usinagem e Segurança no 2º Semestre.', strategy: '• Apresentação do plano do curso; • Definições de segurança aplicadas à usinagem.', resources: 'Sala de aula, projetor.' },
  { id: 'p2', date: '29/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '1. Torneamento: 1.1. Ferramenta de perfilamento; 1.2. Acessórios (Lunetas, Graminho).', strategy: '• Demonstração prática do uso de ferramentas de perfilamento e ajuste com graminho.', resources: 'Torno convencional, lunetas, graminho.' },
  { id: 'p3', date: '05/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '1. Torneamento: 1.2.3. Eixo mandril e 1.2.4. Prisma em V.', strategy: '• Prática de torneamento utilizando montagem em eixo mandril e centralização com prisma.', resources: 'Eixo mandril, prisma em V, relógio comparador.' },
  { id: 'p4', date: '12/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '1.3. Cálculos técnicos: 1.3.1. Conicidade com desalinhamento do cabeçote móvel.', strategy: '• Aula teórica e prática de cálculos e desalinhamento real do cabeçote móvel.', resources: 'Calculadora, torno convencional, micrômetro.' },
  { id: 'p5', date: '19/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '1.4. Operação: 1.4.1. Tornear perfil com ferramenta de forma.', strategy: '• Execução prática de torneamento com ferramentas de forma e acabamento.', resources: 'Torno mecânico, ferramentas de perfilamento.' },
  { id: 'p6', date: '26/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '2. Fresagem: 2.1. Ferramentas (Gravação e esférica); 2.2. Acessórios (Grampos e garras).', strategy: '• Fixação segura de blocos de teste com garras e introdução a fresas esféricas.', resources: 'Fresadora convencional, garras de fixação, fresas esféricas.' },
  { id: 'p7', date: '02/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '2.3. Conjunto divisor: 2.3.1. Divisão direta e 2.3.2. Divisão indireta.', strategy: '• Demonstração e cálculos teóricos de divisões diretas e indiretas para usinagem geométrica.', resources: 'Aparelho divisor, disco de furos.' },
  { id: 'p8', date: '09/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '2.3. Conjunto divisor: 2.3.3. Divisão diferencial.', strategy: '• Exercícios avançados de montagem de grade de engrenagens para divisão diferencial.', resources: 'Aparelho divisor universal, engrenagens.' },
  { id: 'p9', date: '16/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '2.4. Operação: 2.4.1. Fresar superfície plana paralela no aparelho divisor.', strategy: '• Usinagem prática de faces planas paralelas em peças posicionadas no aparelho divisor.', resources: 'Fresadora, aparelho divisor, fresa cabeçote.' },
  { id: 'p10', date: '23/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '2.4.2. Furar de forma coordenada na fresadora e 2.4.3. Alargar furo manualmente na bancada.', strategy: '• Marcação em coordenadas na fresadora para furação precisa e alargamento manual.', resources: 'Fresadora, brocas, alargadores manuais, desandador.' },
  { id: 'p11', date: '30/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '3. Serramento: 3.1. Definição; 3.2. Tipos de serra fita (Horizontal e Vertical); 3.3. Lâmina.', strategy: '• Seleção correta do número de dentes por polegada da lâmina e corte seguro de barras.', resources: 'Serra fita horizontal e vertical, material bruto.' },
  { id: 'p12', date: '07/10/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '3.4. Operação: 3.4.1. Serrar com serra fita.', strategy: '• Prática supervisionada de cortes em ângulos retos e especiais em máquina serra fita.', resources: 'Serra de fita, fluidos de corte.' },
  { id: 'p13', date: '14/10/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: '4. Conjuntos mecânicos: 4.1. Definição; 4.2. Tipos; 4.3. Características; 4.4. Técnicas de montagem.', strategy: '• Estudo de desenhos de montagem e sequência operacional de ajuste mecânico.', resources: 'Desenhos técnicos de conjuntos, ferramentas de montagem.' },
  { id: 'p14', date: '21/10/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: '4.5. Técnicas de ajustagem: 4.5.1. Lixamento e 4.5.2. Polimento.', strategy: '• Práticas manuais de ajuste fino dimensional utilizando abrasivos e polidores na bancada.', resources: 'Lixas de várias granas, pastas de polimento.' },
  { id: 'p15', date: '28/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem em retíficas convencionais, de acordo com as especificações técnicas.', knowledge: '5. Retificação: 5.1. Processos (Cilíndrica, Plana tangencial, Centerless, Afiadoras) e 5.2. Parâmetros.', strategy: '• Cálculos de RPM do rebolo, RPM da peça e velocidade de avanço na retífica.', resources: 'Calculadora técnica, tabelas de retificação.' },
  { id: 'p16', date: '04/11/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '6. Balanceamento: 6.1. Rebolos (Tipos, inspeção) e 6.2. Acessórios (Conjunto balanceador).', strategy: '• Inspeção visual, ensaio de som do rebolo e montagem no eixo balanceador estático.', resources: 'Rebolos, eixo balanceador, pedestal de nível.' },
  { id: 'p17', date: '11/11/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '6.3. Operações: 6.3.1. Balancear rebolo e 6.3.2. Dressar rebolo.', strategy: '• Balanceamento estático de alta precisão através dos contrapesos e dressagem com ponta de diamante.', resources: 'Dressador ponta de diamante, contra-pesos.' },
  { id: 'p18', date: '18/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '7. Retificadora cilíndrica: 7.1 a 7.3. Componentes, acessórios e 7.4. Operação.', strategy: '• Montagem de eixos entre pontas na retífica cilíndrica e usinagem externa de alta precisão.', resources: 'Retificadora cilíndrica, arrastadores, micrômetro.' },
  { id: 'p19', date: '25/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '8. Retificadora plana: 8.1 a 8.3. Acessórios (Mesa magnética, morsa de precisão, calços).', strategy: '• Ajuste de paralelismo utilizando calços e fixação segura de placas na mesa magnética.', resources: 'Retificadora plana, mesa magnética, relógio apalpador.' },
  { id: 'p20', date: '02/12/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: '8.4. Operações: 8.4.1. Retificar plana, 8.4.2. Plana paralela e 8.4.3. Perpendicular.', strategy: '• Execução prática de retificação de precisão de blocos padrão controlando paralelismo.', resources: 'Retificadora plana, micrômetro centesimal.' },
  { id: 'p21', date: '09/12/2026', hours: 4, capacities: 'Todas as capacidades da UC.', knowledge: 'Recuperação e ajuste final dos projetos práticos mecânicos.', strategy: '• Montagem final do redutor/conjunto e preenchimento das fichas dimensionais de qualidade.', resources: 'Instrumentos de medição, oficina.' },
  { id: 'p22', date: '16/12/2026', hours: 4, capacities: 'Todas as capacidades da UC.', knowledge: 'Avaliação final, entrega de notas e feedback.', strategy: '• Encerramento das atividades e avaliação atitudinal dos alunos.', resources: 'Diário de notas.' }
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

// --- TEMPLATE DA NOVA UC PRUC DO 2º SEMESTRE (160H) ---
const PRUC_UNIT_TEMPLATE: CurricularUnit = {
  id: 'pruc',
  name: 'Processos de Usinagem Convencional (PRUC)',
  basicCapacities: [
    'Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
    'Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
    'Realizar operações de serramento por meio de máquinas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
    'Realizar a montagem de conjuntos mecânicos de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.',
    'Definir os parâmetros e os processos de usinagem em retíficas convencionais, de acordo com as especificações técnicas.',
    'Realizar o balanceamento do rebolo de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
    'Realizar operações em retificadoras cilíndricas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
    'Realizar operações em retificadoras planas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.'
  ],
  socioemocionalCapacities: [
    'Organizar o ambiente de trabalho e as atividades.',
    'Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais.'
  ],
  knowledge: [
    { 
      topic: '1. Torneamento', 
      subtopics: ['Ferramenta de perfilamento', 'Lunetas', 'Graminho', 'Eixo mandril', 'Prisma em V', 'Conicidade com desalinhamento do cabeçote móvel', 'Tornear perfil com ferramenta de forma'] 
    },
    { 
      topic: '2. Fresagem', 
      subtopics: ['Ferramentas de gravação e esférica', 'Grampos e garras', 'Divisão direta, indireta e diferencial', 'Fresar superfície plana paralela no aparelho divisor', 'Furar de forma coordenada', 'Alargar furo manualmente na bancada'] 
    },
    { 
      topic: '3. Serramento', 
      subtopics: ['Definição', 'Tipos de serra fita (Horizontal e Vertical)', 'Lâmina de serra de fita', 'Serrar com serra de fita'] 
    },
    { 
      topic: '4. Conjuntos mecânicos', 
      subtopics: ['Definição, tipos e características', 'Técnicas de montagem', 'Técnicas de ajustagem (Lixamento e Polimento)'] 
    },
    { 
      topic: '5. Retificação', 
      subtopics: ['Retífica cilíndrica e plana tangencial', 'Retífica sem centro (Centerless)', 'Afiadoras', 'Parâmetros (RPM da peça e do rebolo, Avanço)'] 
    },
    { 
      topic: '6. Balanceamento de Rebolo', 
      subtopics: ['Tipos, classificação, características, inspeção e armazenagem de rebolos', 'Conjunto balanceador estático, flanges, eixo balanceador, nível de precisão e contrapesos', 'Operação de balancear e dressar rebolo'] 
    },
    { 
      topic: '7. Retificadora Cilíndrica', 
      subtopics: ['Características e componentes', 'Placa universal, placa de arrasto, contraponta, arrastadores e dressador', 'Retificar superfície cilíndrica externa'] 
    },
    { 
      topic: '8. Retificadora Plana', 
      subtopics: ['Características e componentes', 'Morsa, mesa magnética, mesa de seno, morsa de precisão, calços e dressador', 'Retificar superfícies planas, paralelas e perpendiculares'] 
    }
  ],
  learningSituations: [
    {
      id: 'sa-pruc-1',
      title: 'Fabricação e Ajustagem de Elementos de Transmissão',
      context: 'Como mecânico de usinagem em formação, você recebeu um conjunto mecânico que necessita da fabricação de um eixo torneado cônico, ranhuras fresadas e retificação de precisão para montagem final deslizante.',
      challenge: 'Calcular o desalinhamento do cabeçote do torno, realizar divisões diretas/indiretas na fresadora, balancear o rebolo e operar as retificadoras para garantir as tolerâncias especificadas no projeto.',
      expectedResults: ['Eixo cônico torneado', 'Bloco fresado em coordenadas', 'Superfícies retificadas dentro das tolerâncias', 'Conjunto montado e ajustado']
    }
  ],
  rubrics: [
    { capacity: 'Operar tornos, fresadoras e retificadoras', nsa: 'Abaixo de 50% de precisão e descumprimento de normas de segurança.', apo: 'Usinagem dentro de limites aceitáveis com pequenos desvios dimensionais.', par: 'Usinagem precisa atendendo à maioria das tolerâncias dimensionais.', aut: 'Usinagem de alta precisão técnica de acordo com todas as especificações e normas de segurança.' }
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
    objective: 'Executar processos avançados de usinagem em tornos paralelos e fresadoras convencionais utilizando acessórios de posicionamento preciso como aparelho divisor e retificação cilíndrica/plana de precisão.',
    methodology: 'Práticas intensivas de oficina com desenvolvimento de projetos reais (montagem mecânica, serramento de fita e ajustagem por lixamento/polimento), estimulando o trabalho cooperativo e as competências industriais.',
    evaluation: 'Entrega física, medição metrológica centesimal e testes mecânicos dos subconjuntos fabricados nas aulas práticas.',
    bibliography: '• Ajustagem Mecânica Avançada - SENAI; • Retificação Plana e Cilíndrica - SENAI; • Manual de Tecnologia de Metais.',
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
    objective: 'Executar processos avançados de usinagem em tornos paralelos e fresadoras convencionais utilizando acessórios de posicionamento preciso como aparelho divisor e retificação cilíndrica/plana de precisão.',
    methodology: 'Práticas intensivas de oficina com desenvolvimento de projetos mecânicos e ajustagem.',
    evaluation: 'Rubricas técnicas de processo e produto acabado (acoplamentos e redutores).',
    bibliography: '• Ajustagem Mecânica Avançada - SENAI; • Elementos de Máquinas - Sarkis.',
    units: [LIDT_UNIT_TEMPLATE, CRD_UNIT_TEMPLATE, PRUC_UNIT_TEMPLATE],
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-07-15T09:00:00.000Z'
  }
];
