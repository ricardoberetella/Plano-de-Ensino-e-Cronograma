import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// Versão do cronograma - Força o App a atualizar o banco de dados com os novos dados sincronizados
export const SCHEDULE_VERSION = "2026-V19-SEMESTRES-FULL-SYNC";

// ============================================================================
// ========================== CRONOGRAMAS: 1º SEMESTRE ========================
// ============================================================================

// --- CRONOGRAMA LIDT (1º Semestre) ---
export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacities da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto".', resources: 'Sala de aula, projetor.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT.', resources: 'Exemplos de desenhos técnicos.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, models de sólidos.' },
  { id: 'l4', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica.', resources: 'Papel, lpis.' },
  { id: 'l5', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais.', resources: 'Modelos de peças simples.' },
  { id: 'l6', date: '09/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas uniques, face de referência).', strategy: '• Exercícios de cotagem de vistas ortogonais.', resources: 'Exercícios impressos.' },
  { id: 'l7', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração de cortes.', resources: 'Desenhos técnicos com cortes.' },
  { id: 'l8', date: '23/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte.', strategy: '• Estudo de caso: Análise de desenhos complexos.', resources: 'Conjunto de desenhos variados.' },
  { id: 'l9', date: '30/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação).', strategy: '• Exercícios de desenho de vistas auxiliares.', resources: 'Modelos de peças com faces inclinadas.' },
  { id: 'l10', date: '06/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, explodida).', strategy: '• Apresentação da estrutura de um desenho de conjunto.', resources: 'Exemplo de desenho de conjunto.' },
  { id: 'l11', date: '13/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5.3. Lista de materiais; 5.4. Balões.', strategy: '• Análise do desenho de "Subconjunto do Acoplamento".', resources: 'Cópia do desenho da SA.' },
  { id: 'l12', date: '27/04/2026', hours: 2, capacities: 'Interpretar tolerância dimensional.', knowledge: '6.1. Tolerância dimensional (campos, ISO).', strategy: '• Introdução aos conceitos de tolerância e ajustes.', resources: 'Tabelas de tolerância ISO.' },
  { id: 'l13', date: '04/05/2026', hours: 2, capacities: 'Interpretar tolerância geométrica.', knowledge: '6.2. Tolerância geométrica (forma, posição).', strategy: '• Apresentação dos símbolos e significados.', resources: 'Quadro de tolerâncias geométricas.' },
  { id: 'l14', date: '11/05/2026', hours: 2, capacities: 'Interpretar acabamento superficial.', knowledge: '6.3. Acabamento superficial (rugosidade).', strategy: '• Explicação dos símbolos de acabamento.', resources: 'Tabela de símbolos.' },
  { id: 'l15', date: '18/05/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Início da elaboration dos croquis detalhados.', resources: 'Papel, instrumentos de desenho.' },
  { id: 'l16', date: '25/05/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Continuação e refinamento dos croquis.', resources: 'Dossiê em fase de conclusão.' },
  { id: 'l17', date: '01/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Finalização dos croquis e do dossiê técnico.', resources: 'Dossiê técnico.' },
  { id: 'l18', date: '08/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Apresentação dos Resultados e Dossiês.', resources: 'Projetor.' },
  { id: 'l19', date: '15/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Feedback e Avaliação final.', resources: 'Fichas de avaliação.' },
  { id: 'l20', date: '22/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento de Notas.', strategy: '• Encerramento da Unidade Curricular.', resources: 'Diário de classe.' }
];

// --- CRONOGRAMA CRD (1º Semestre) ---
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
  { id: 'c12', date: '28/04/2026', hours: 2, capacities: 'VII. Medir por comparação.', knowledge: '8.4 Medição real.', strategy: 'Exercício de zeragem e comparação.', resources: 'Blocos-padrão.' },
  { id: 'c13', date: '05/05/2026', hours: 2, capacities: 'VIII. Medir com goniômetro.', knowledge: '9. Goniômetro', strategy: 'Medição de ângulos em peças.', resources: 'Goniômetros.' },
  { id: 'c14', date: '12/05/2026', hours: 2, capacities: 'Planejamento da SA.', knowledge: 'Revisão geral.', strategy: 'Planejamento para execução do desafio.', resources: 'Material da SA.' },
  { id: 'c15', date: '19/05/2026', hours: 2, capacities: 'Execução do Desafio.', knowledge: 'Aplicação prática.', strategy: 'Início das medições do lote "Pinos".', resources: 'Lote de peças.' },
  { id: 'c16', date: '23/06/2026', hours: 2, capacities: 'Finalização.', knowledge: 'Autoavaliação.', strategy: 'Feedback e encerramento da UC.', resources: 'Fichas preenchidas.' }
];

// --- CRONOGRAMA FUSI (1º Semestre) ---
export const FUSI_SCHEDULE = [
  { id: 'f01', hours: 4, date: '26/01/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f02', hours: 4, date: '28/01/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'f03', hours: 4, date: '29/01/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'Torneamento Convencional', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'f04', hours: 4, date: '02/02/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f05', hours: 4, date: '04/02/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f06', hours: 4, date: '05/02/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'Plano de Trabalho', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'f07', hours: 4, date: '09/02/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f08', hours: 4, date: '11/02/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'f09', hours: 4, date: '12/02/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'Metrologia Industrial', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'f10', hours: 4, date: '19/02/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos e controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f11', hours: 4, date: '23/02/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f12', hours: 4, date: '25/02/2026', capacities: 'Rosqueamento (Definição, Ferramentas); Roscar com Cossinete.', knowledge: 'Tecnologia de Roscas', strategy: 'Teoria de cálculos para furação de roscas e tipos de roscas.', resources: 'Sala de aula.' },
  { id: 'f13', hours: 4, date: '26/02/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete no torno.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo Roscado. Tornear diâmetro e executar roscagem.', resources: 'Oficina de usinagem, Torno, Cossinete.' },
  { id: 'f14', hours: 4, date: '02/03/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Furação', strategy: 'Tarefa: Manípulo. Furação em furadeira e rosca manual.', resources: 'Oficina de usinagem, Bancada, Machos.' },
  { id: 'f15', hours: 4, date: '04/03/2026', capacities: 'Elementos de máquina; Visão sistêmica; Planejar ações.', knowledge: 'Elementos de Máquina', strategy: 'Desafio 1: Planejamento do Calculador de Usinagem.', resources: 'Sala de aula.' },
  { id: 'f16', hours: 4, date: '05/03/2026', capacities: 'Parâmetros de usinagem; Tornear superfície cilíndrica; Facear.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Início da base cilíndrica (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f17', hours: 4, date: '09/03/2026', capacities: 'Fresagem de superfícies planas e esquadrejamento.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Preparação do bloco principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f18', hours: 4, date: '11/03/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Estudo de ajustes e folgas para montagem do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'f19', hours: 4, date: '12/03/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Usinagem de eixos internos e pinos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f20', hours: 4, date: '16/03/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Detalhes do corpo principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f21', hours: 4, date: '18/03/2026', capacities: 'Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Furação e Rosqueamento', strategy: 'Estudo técnico sobre furação coordenada e tabelas de roscas.', resources: 'Sala de aula.' },
  { id: 'f22', hours: 4, date: '19/03/2026', capacities: 'Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Furação', strategy: 'Desafio 1: Furação e rosqueamento de componentes.', resources: 'Oficina de usinagem.' },
  { id: 'f23', hours: 4, date: '23/03/2026', capacities: 'Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Fresagem e Controle', strategy: 'Desafio 1: Furação coordenada do corpo do calculador.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f24', hours: 4, date: '25/03/2026', knowledge: 'Manutenção e Segurança', capacities: 'Relacionar os tipos de manutenção à sua aplicação na indústria; Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.', strategy: 'Teoria sobre descarte de resíduos e lubrificação de máquinas.', resources: 'Sala de aula.' },
  { id: 'f25', hours: 4, date: '26/03/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Acabamento de diâmetros críticos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f26', hours: 4, date: '30/03/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Acabamento final das faces do bloco.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f27', hours: 4, date: '01/04/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Qualidade Industrial', strategy: 'Documentação de controle de qualidade (Teoria).', resources: 'Sala de aula.' },
  { id: 'f28', hours: 4, date: '06/04/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Desafio 1: Ajustagem manual das peças para encaixe.', resources: 'Bancada, Limas.' },
  { id: 'f29', hours: 4, date: '08/04/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Montagem e Teste', strategy: 'Desafio 1: Pró-montagem e detecção de interferências.', resources: 'Bancada.' },
  { id: 'f30', hours: 4, date: '09/04/2026', capacities: 'Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.', knowledge: 'Torneamento Convencional', strategy: 'Debate técnico: Soluções para problemas em torneamento.', resources: 'Sala de aula.' },
  { id: 'f31', hours: 4, date: '13/04/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Tarefa Reforço: Repetição do Eixo Roscado.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f32', hours: 4, date: '15/04/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Fresagem e Qualidade', strategy: 'Tarefa Reforço: Ajuste de blocos paralelos.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f33', hours: 4, date: '16/04/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresamento e Ajustagem', strategy: 'Debate técnico: Otimização de tempo no setup de máquinas.', resources: 'Sala de aula.' },
  { id: 'f34', hours: 4, date: '20/04/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Refino dimensional das peças cilíndricas.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f35', hours: 4, date: '22/04/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Refino dimensional do bloco fresado.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f36', hours: 4, date: '23/04/2026', capacities: 'Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.', knowledge: 'Gestão de Oficina', strategy: 'Organização e controle de vida útil das ferramentas.', resources: 'Sala de aula.' },
  { id: 'f37', hours: 4, date: '27/04/2026', capacities: 'Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.', knowledge: 'Montagem Industrial', strategy: 'Teoria de montagem e tipos de ajustes (Prensado/Folga).', resources: 'Sala de aula.' },
  { id: 'f38', hours: 4, date: '29/04/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Controle de Qualidade', strategy: 'Avaliação dimensional total (Micrômetro).', resources: 'Sala de aula, Micrômetro.' },
  { id: 'f39', hours: 4, date: '30/04/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Tarefa Extra: Início de peça auxiliar (Base castanha).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f40', hours: 4, date: '04/05/2026', capacities: 'Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.', knowledge: 'Segurança Industrial', strategy: 'Teoria sobre proteções e dispositivos de emergência.', resources: 'Sala de aula.' },
  { id: 'f41', hours: 4, date: '06/05/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa Extra: Usinagem de base auxiliar (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f42', hours: 4, date: '07/05/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Prática de roscagem em diferentes diâmetros.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f43', hours: 4, date: '11/05/2026', capacities: 'Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.', knowledge: 'Tecnologia de Materiais', strategy: 'Estudo de tabelas para Aço Inox e Bronze (Teoria).', resources: 'Sala de aula.' },
  { id: 'f44', hours: 4, date: '13/05/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Prática de esquadrejamento de precisão.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f45', hours: 4, date: '14/05/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Operações de sangramento e canais técnicos.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f46', hours: 4, date: '18/05/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Gestão da Qualidade', strategy: 'Como documentar erros e recuperar peças (Teoria).', resources: 'Sala de aula.' },
  { id: 'f47', hours: 4, date: '20/05/2026', capacities: 'Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Prática intensiva de roscagem em furos cegos.', resources: 'Oficina de usinagem, Bancada.' },
  { id: 'f48', hours: 4, date: '21/05/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Prática de ajustagem ao banco (precisão manual).', resources: 'Bancada, Limas.' },
  { id: 'f49', hours: 4, date: '25/05/2026', capacities: 'Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.', knowledge: 'Elementos de Máquina', strategy: 'Estudo sobre chavetas e eixos estriados.', resources: 'Sala de aula.' },
  { id: 'f50', hours: 4, date: '27/05/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Montagem e Qualidade', strategy: 'Testes funcionais e ajustes de interferência.', resources: 'Oficina de usinagem.' },
  { id: 'f51', hours: 4, date: '28/05/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Operações de Torno', strategy: 'Foco em rugosidade e brilho no torno.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f52', hours: 4, date: '01/06/2026', capacities: 'Relacionar os processos de fabricação à sua aplicação na indústria; Relacionar os tipos de manutenção à sua aplicação na indústria.', knowledge: 'Revisão Técnica', strategy: 'Revisão integral dos conteúdos dos Blocos 1, 2 e 3.', resources: 'Sala de aula.' },
  { id: 'f53', hours: 4, date: '03/06/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Fresagem Convencional', strategy: 'Foco em planeza e acabamento superficial.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f54', hours: 4, date: '08/06/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Oficina de Finalização', strategy: 'Prática de Oficina Final (Arremates).', resources: 'Oficina de usinagem.' },
  { id: 'f55', hours: 4, date: '10/06/2026', capacities: 'Elaborar plano de trabalho de acordo com normas e procedures de meio ambiente, de saúde e segurança no trabalho.', knowledge: 'Desenvolvimento Profissional', strategy: 'Atitudes, responsabilidade e zelo com patrimônio.', resources: 'Sala de aula.' },
  { id: 'f56', hours: 4, date: '11/06/2026', capacities: 'Relacionar os tipos de manutenção à sua aplicação na indústria; Aplicar os procedimentos de refrigeração nos processos de torneamento e fresagem convencional.', knowledge: 'Manutenção e Zelo', strategy: 'Limpeza profunda e lubrificação das máquinas.', resources: 'Oficina de usinagem.' },
  { id: 'f57', hours: 4, date: '15/06/2026', capacities: 'Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.', knowledge: 'Organização Industrial', strategy: 'Organização de armários e entrega de ferramentas.', resources: 'Oficina de usinagem.' },
  { id: 'f58', hours: 4, date: '17/06/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Gestão de Processos', strategy: 'Conferência de diários e fichas técnicas.', resources: 'Sala de aula.' },
  { id: 'f59', hours: 4, date: '18/06/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Encerramento Letivo', strategy: 'Encerramento letivo em sala de aula.', resources: 'Sala de aula.' },
  { id: 'f60', hours: 4, date: '22/06/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Avaliação de Resultados', strategy: 'Finalização de todas as atividades de oficina.', resources: 'Oficina de usinagem.' }
];

// --- CRONOGRAMA FUSI_GEA (1º Semestre) ---
export const FUSI_SCHEDULE_GEA = [
  { id: 'g01', hours: 4, date: '26/01/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g02', hours: 4, date: '27/01/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'g03', hours: 4, date: '28/01/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'Torneamento Convencional', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'g04', hours: 4, date: '02/02/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g05', hours: 4, date: '03/02/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g06', hours: 4, date: '04/02/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'Plano de Trabalho', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'g07', hours: 4, date: '09/02/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g08', hours: 4, date: '10/02/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'g09', hours: 4, date: '11/02/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'Metrologia Industrial', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'g10', hours: 4, date: '16/02/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos and controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g11', hours: 4, date: '17/02/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' }
];

// ============================================================================
// ========================== CRONOGRAMAS: 2º SEMESTRE ========================
// ============================================================================

// --- CRONOGRAMA LIDT (2º Semestre - Julho a Dezembro) ---
export const LIDT_SCHEDULE_SEM2 = [
  { id: 'l2_1', date: '27/07/2026', hours: 2, capacities: 'Todas as capacities da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto".', resources: 'Sala de aula, projetor.' },
  { id: 'l2_2', date: '03/08/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT.', resources: 'Exemplos de desenhos técnicos.' },
  { id: 'l2_3', date: '10/08/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, models de sólidos.' },
  { id: 'l2_4', date: '17/08/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica.', resources: 'Papel, lpis.' },
  { id: 'l2_5', date: '24/08/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais.', resources: 'Modelos de peças simples.' },
  { id: 'l2_6', date: '31/08/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas uniques, face de referência).', strategy: '• Exercícios de cotagem de vistas ortogonais.', resources: 'Exercícios impressos.' },
  { id: 'l2_7', date: '14/09/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração de cortes.', resources: 'Desenhos técnicos com cortes.' },
  { id: 'l2_8', date: '21/09/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte.', strategy: '• Estudo de caso: Análise de desenhos complexos.', resources: 'Conjunto de desenhos variados.' },
  { id: 'l2_9', date: '28/09/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação).', strategy: '• Exercícios de desenho de vistas auxiliares.', resources: 'Modelos de peças com faces inclinadas.' },
  { id: 'l2_10', date: '05/10/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, explodida).', strategy: '• Apresentação da estrutura de um desenho de conjunto.', resources: 'Exemplo de desenho de conjunto.' },
  { id: 'l2_11', date: '19/10/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5.3. Lista de materiais; 5.4. Balões.', strategy: '• Análise do desenho de "Subconjunto do Acoplamento".', resources: 'Cópia do desenho da SA.' },
  { id: 'l2_12', date: '26/10/2026', hours: 2, capacities: 'Interpretar tolerância dimensional.', knowledge: '6.1. Tolerância dimensional (campos, ISO).', strategy: '• Introdução aos conceitos de tolerância e ajustes.', resources: 'Tabelas de tolerância ISO.' },
  { id: 'l2_13', date: '09/11/2026', hours: 2, capacities: 'Interpretar tolerância geométrica.', knowledge: '6.2. Tolerância geométrica (forma, posição).', strategy: '• Apresentação dos símbolos e significados.', resources: 'Quadro de tolerâncias geométricas.' },
  { id: 'l2_14', date: '16/11/2026', hours: 2, capacities: 'Interpretar acabamento superficial.', knowledge: '6.3. Acabamento superficial (rugosidade).', strategy: '• Explicação dos símbolos de acabamento.', resources: 'Tabela de símbolos.' },
  { id: 'l2_15', date: '23/11/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Início da elaboration dos croquis detalhados.', resources: 'Papel, instrumentos de desenho.' },
  { id: 'l2_16', date: '30/11/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Continuação e refinamento dos croquis.', resources: 'Dossiê em fase de conclusão.' },
  { id: 'l2_17', date: '07/12/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Finalização dos croquis e do dossiê técnico.', resources: 'Dossiê técnico.' },
  { id: 'l2_18', date: '14/12/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Apresentação dos Resultados e Dossiês.', resources: 'Projetor.' },
  { id: 'l2_19', date: '15/12/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Feedback e Avaliação final.', resources: 'Fichas de avaliação.' },
  { id: 'l2_20', date: '16/12/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento de Notas.', strategy: '• Encerramento da Unidade Curricular.', resources: 'Diário de classe.' }
];

// --- CRONOGRAMA CRD (2º Semestre - Julho a Dezembro) ---
export const CRD_SCHEDULE_SEM2 = [
  { id: 'c2_1', date: '28/07/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia.', knowledge: '1. Metrologia', strategy: 'Apresentação da SA. Exposição dialogada.', resources: 'Projetor.' },
  { id: 'c2_2', date: '04/08/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia.', knowledge: '2. Erros de medição', strategy: 'Discussão em grupo sobre tipos de erro.', resources: 'Instrumentos de medição.' },
  { id: 'c2_3', date: '11/08/2026', hours: 2, capacities: 'II. Medir peças com escala e trena.', knowledge: '3. Escala e 4. Trena', strategy: 'Demonstração prática e exercícios.', resources: 'Escalas, trenas.' },
  { id: 'c2_4', date: '18/08/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro.', knowledge: '5. Paquímetros', strategy: 'Exposição dialogada e demonstração.', resources: 'Paquímetros.' },
  { id: 'c2_5', date: '25/08/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro.', knowledge: '5.3 Leitura métrica 0,05 e 0,02.', strategy: 'Exercício prático de leitura.', resources: 'Peças didáticas.' },
  { id: 'c2_6', date: '01/09/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro.', knowledge: '5.5 Medição real.', strategy: 'Exercício supervisionado de medição.', resources: 'Relatório de medição.' },
  { id: 'c2_7', date: '08/09/2026', hours: 2, capacities: 'V. Medir com micrômetro.', knowledge: '6. Micrômetros', strategy: 'Demonstração de manuseio e ajuste.', resources: 'Micrômetros.' },
  { id: 'c2_8', date: '15/09/2026', hours: 2, capacities: 'V. Medir com micrômetro.', knowledge: '6.4 Leitura métrica 0,01.', strategy: 'Exercício prático de leitura.', resources: 'Peças didáticas.' },
  { id: 'c2_9', date: '22/09/2026', hours: 2, capacities: 'V. Medir com micrômetro.', knowledge: '6.5 Medição real.', strategy: 'Exercício de medição e comparação.', resources: 'Relatório.' },
  { id: 'c2_10', date: '29/09/2026', hours: 2, capacities: 'VI. Verificar dimensões com verificadores.', knowledge: '7. Verificadores', strategy: 'Uso de calibradores de folga e rosca.', resources: 'Jogos de verificadores.' },
  { id: 'c2_11', date: '06/10/2026', hours: 2, capacities: 'VII. Medir por comparação.', knowledge: '8. Relógios comparadores.', strategy: 'Demonstração de montagem em suportes.', resources: 'Relógios comparadores.' },
  { id: 'c2_12', date: '13/10/2026', hours: 2, capacities: 'VII. Medir por comparação.', knowledge: '8.4 Medição real.', strategy: 'Exercício de zeragem e comparação.', resources: 'Blocos-padrão.' },
  { id: 'c2_13', date: '20/10/2026', hours: 2, capacities: 'VIII. Medir com goniômetro.', knowledge: '9. Goniômetro', strategy: 'Medição de ângulos em peças.', resources: 'Goniômetros.' },
  { id: 'c2_14', date: '27/10/2026', hours: 2, capacities: 'Planejamento da SA.', knowledge: 'Revisão geral.', strategy: 'Planejamento para execução do desafio.', resources: 'Material da SA.' },
  { id: 'c2_15', date: '03/11/2026', hours: 2, capacities: 'Execução do Desafio.', knowledge: 'Aplicação prática.', strategy: 'Início das medições do lote "Pinos".', resources: 'Lote de peças.' },
  { id: 'c2_16', date: '10/11/2026', hours: 2, capacities: 'Finalização.', knowledge: 'Autoavaliação.', strategy: 'Feedback e encerramento da UC.', resources: 'Fichas preenchidas.' }
];

// --- CRONOGRAMA FUSI (2º Semestre - Julho a Dezembro) ---
export const FUSI_SCHEDULE_SEM2 = [
  { id: 'f2_01', hours: 4, date: '27/07/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_02', hours: 4, date: '29/07/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'f2_03', hours: 4, date: '30/07/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'Torneamento Convencional', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'f2_04', hours: 4, date: '03/08/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_05', hours: 4, date: '05/08/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_06', hours: 4, date: '06/08/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'Plano de Trabalho', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'f2_07', hours: 4, date: '10/08/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_08', hours: 4, date: '12/08/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'f2_09', hours: 4, date: '13/08/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'Metrologia Industrial', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'f2_10', hours: 4, date: '20/08/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos e controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_11', hours: 4, date: '24/08/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_12', hours: 4, date: '26/08/2026', capacities: 'Rosqueamento (Definição, Ferramentas); Roscar com Cossinete.', knowledge: 'Tecnologia de Roscas', strategy: 'Teoria de cálculos para furação de roscas e tipos de roscas.', resources: 'Sala de aula.' },
  { id: 'f2_13', hours: 4, date: '27/08/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete no torno.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo Roscado. Tornear diâmetro e executar roscagem.', resources: 'Oficina de usinagem, Torno, Cossinete.' },
  { id: 'f2_14', hours: 4, date: '31/08/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Furação', strategy: 'Tarefa: Manípulo. Furação em furadeira e rosca manual.', resources: 'Oficina de usinagem, Bancada, Machos.' },
  { id: 'f2_15', hours: 4, date: '02/09/2026', capacities: 'Elementos de máquina; Visão sistêmica; Planejar ações.', knowledge: 'Elementos de Máquina', strategy: 'Desafio 1: Planejamento do Calculador de Usinagem.', resources: 'Sala de aula.' },
  { id: 'f2_16', hours: 4, date: '03/09/2026', capacities: 'Parâmetros de usinagem; Tornear superfície cilíndrica; Facear.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Início da base cilíndrica (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_17', hours: 4, date: '09/09/2026', capacities: 'Fresagem de superfícies planas e esquadrejamento.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Preparação do bloco principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_18', hours: 4, date: '10/09/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Estudo de ajustes e folgas para montagem do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'f2_19', hours: 4, date: '14/09/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Usinagem de eixos internos e pinos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_20', hours: 4, date: '16/09/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Detalhes do corpo principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_21', hours: 4, date: '17/09/2026', capacities: 'Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Furação e Rosqueamento', strategy: 'Estudo técnico sobre furação coordenada e tabelas de roscas.', resources: 'Sala de aula.' },
  { id: 'f2_22', hours: 4, date: '21/09/2026', capacities: 'Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Furação', strategy: 'Desafio 1: Furação e rosqueamento de componentes.', resources: 'Oficina de usinagem.' },
  { id: 'f2_23', hours: 4, date: '23/09/2026', capacities: 'Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Fresagem e Controle', strategy: 'Desafio 1: Furação coordenada do corpo do calculador.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_24', hours: 4, date: '24/09/2026', knowledge: 'Manutenção e Segurança', capacities: 'Relacionar os tipos de manutenção à sua aplicação na indústria; Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.', strategy: 'Teoria sobre descarte de resíduos e lubrificação de máquinas.', resources: 'Sala de aula.' },
  { id: 'f2_25', hours: 4, date: '28/09/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Acabamento de diâmetros críticos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_26', hours: 4, date: '30/09/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Acabamento final das faces do bloco.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_27', hours: 4, date: '01/10/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Qualidade Industrial', strategy: 'Documentação de controle de qualidade (Teoria).', resources: 'Sala de aula.' },
  { id: 'f2_28', hours: 4, date: '05/10/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Desafio 1: Ajustagem manual das peças para encaixe.', resources: 'Bancada, Limas.' },
  { id: 'f2_29', hours: 4, date: '07/10/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Montagem e Teste', strategy: 'Desafio 1: Pró-montagem e detecção de interferências.', resources: 'Bancada.' },
  { id: 'f2_30', hours: 4, date: '08/10/2026', capacities: 'Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.', knowledge: 'Torneamento Convencional', strategy: 'Debate técnico: Soluções para problemas em torneamento.', resources: 'Sala de aula.' },
  { id: 'f2_31', hours: 4, date: '14/10/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Tarefa Reforço: Repetição do Eixo Roscado.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_32', hours: 4, date: '15/10/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Fresagem e Qualidade', strategy: 'Tarefa Reforço: Ajuste de blocos paralelos.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_33', hours: 4, date: '19/10/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresamento e Ajustagem', strategy: 'Debate técnico: Otimização de tempo no setup de máquinas.', resources: 'Sala de aula.' },
  { id: 'f2_34', hours: 4, date: '21/10/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Desafio 1: Refino dimensional das peças cilíndricas.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_35', hours: 4, date: '22/10/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Desafio 1: Refino dimensional do bloco fresado.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_36', hours: 4, date: '26/10/2026', capacities: 'Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.', knowledge: 'Gestão de Oficina', strategy: 'Organização e controle de vida útil das ferramentas.', resources: 'Sala de aula.' },
  { id: 'f2_37', hours: 4, date: '28/10/2026', capacities: 'Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.', knowledge: 'Montagem Industrial', strategy: 'Teoria de montagem e tipos de ajustes (Prensado/Folga).', resources: 'Sala de aula.' },
  { id: 'f2_38', hours: 4, date: '29/10/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Controle de Qualidade', strategy: 'Avaliação dimensional total (Micrômetro).', resources: 'Sala de aula, Micrômetro.' },
  { id: 'f2_39', hours: 4, date: '04/11/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Tarefa Extra: Início de peça auxiliar (Base castanha).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_40', hours: 4, date: '05/11/2026', capacities: 'Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.', knowledge: 'Segurança Industrial', strategy: 'Teoria sobre proteções e dispositivos de emergência.', resources: 'Sala de aula.' },
  { id: 'f2_41', hours: 4, date: '09/11/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa Extra: Usinagem de base auxiliar (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_42', hours: 4, date: '11/11/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho; Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Prática de roscagem em diferentes diâmetros.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_43', hours: 4, date: '12/11/2026', capacities: 'Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.', knowledge: 'Tecnologia de Materiais', strategy: 'Estudo de tabelas para Aço Inox e Bronze (Teoria).', resources: 'Sala de aula.' },
  { id: 'f2_44', hours: 4, date: '16/11/2026', capacities: 'Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Fresagem Convencional', strategy: 'Prática de esquadrejamento de precisão.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_45', hours: 4, date: '18/11/2026', capacities: 'Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Operações de Torno', strategy: 'Operações de sangramento e canais técnicos.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_46', hours: 4, date: '19/11/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Gestão da Qualidade', strategy: 'Como documentar erros e recuperar peças (Teoria).', resources: 'Sala de aula.' },
  { id: 'f2_47', hours: 4, date: '23/11/2026', capacities: 'Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Prática intensiva de roscagem em furos cegos.', resources: 'Oficina de usinagem, Bancada.' },
  { id: 'f2_48', hours: 4, date: '25/11/2026', capacities: 'Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.', knowledge: 'Ajustagem Mecânica', strategy: 'Prática de ajustagem ao banco (precisão manual).', resources: 'Bancada, Limas.' },
  { id: 'f2_49', hours: 4, date: '26/11/2026', capacities: 'Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.', knowledge: 'Elementos de Máquina', strategy: 'Estudo sobre chavetas e eixos estriados.', resources: 'Sala de aula.' },
  { id: 'f2_50', hours: 4, date: '30/11/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Montagem e Qualidade', strategy: 'Testes funcionais e ajustes de interferência.', resources: 'Oficina de usinagem.' },
  { id: 'f2_51', hours: 4, date: '02/12/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Operações de Torno', strategy: 'Foco em rugosidade e brilho no torno.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f2_52', hours: 4, date: '03/12/2026', capacities: 'Relacionar os processos de fabricação à sua aplicação na indústria; Relacionar os tipos de manutenção à sua aplicação na indústria.', knowledge: 'Revisão Técnica', strategy: 'Revisão integral dos conteúdos dos Blocos 1, 2 e 3.', resources: 'Sala de aula.' },
  { id: 'f2_53', hours: 4, date: '07/12/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Fresagem Convencional', strategy: 'Foco em planeza e acabamento superficial.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f2_54', hours: 4, date: '09/12/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Oficina de Finalização', strategy: 'Prática de Oficina Final (Arremates).', resources: 'Oficina de usinagem.' },
  { id: 'f2_55', hours: 4, date: '10/12/2026', capacities: 'Elaborar plano de trabalho de acordo com normas e procedures de meio ambiente, de saúde e segurança no trabalho.', knowledge: 'Desenvolvimento Profissional', strategy: 'Atitudes, responsabilidade e zelo com patrimônio.', resources: 'Sala de aula.' },
  { id: 'f2_56', hours: 4, date: '14/12/2026', capacities: 'Relacionar os tipos de manutenção à sua aplicação na indústria; Aplicar os procedimentos de refrigeração nos processos de torneamento e fresagem convencional.', knowledge: 'Manutenção e Zelo', strategy: 'Limpeza profunda e lubrificação das máquinas.', resources: 'Oficina de usinagem.' },
  { id: 'f2_57', hours: 4, date: '15/12/2026', capacities: 'Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.', knowledge: 'Organização Industrial', strategy: 'Organização de armários e entrega de ferramentas.', resources: 'Oficina de usinagem.' },
  { id: 'f2_58', hours: 4, date: '16/12/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Gestão de Processos', strategy: 'Conferência de diários e fichas técnicas.', resources: 'Sala de aula.' },
  { id: 'f2_59', hours: 4, date: '17/12/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Encerramento Letivo', strategy: 'Encerramento letivo em sala de aula.', resources: 'Sala de aula.' },
  { id: 'f2_60', hours: 4, date: '18/12/2026', capacities: 'Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.', knowledge: 'Avaliação de Resultados', strategy: 'Finalização de todas as atividades de oficina.', resources: 'Oficina de usinagem.' }
];

// --- CRONOGRAMA FUSI_GEA (2º Semestre - Julho a Dezembro) ---
export const FUSI_SCHEDULE_GEA_SEM2 = [
  { id: 'g2_01', hours: 4, date: '27/07/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g2_02', hours: 4, date: '28/07/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'g2_03', hours: 4, date: '29/07/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'Torneamento Convencional', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'g2_04', hours: 4, date: '03/08/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g2_05', hours: 4, date: '04/08/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g2_06', hours: 4, date: '05/08/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'Plano de Trabalho', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'g2_07', hours: 4, date: '10/08/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g2_08', hours: 4, date: '11/08/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'g2_09', hours: 4, date: '12/08/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'Metrologia Industrial', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'g2_10', hours: 4, date: '17/08/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos and controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g2_11', hours: 4, date: '18/08/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'Fresagem Convencional', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' }
];

// ============================================================================
// ============================= MODELOS DE DISCIPLINAS =======================
// ============================================================================

export const DEFAULT_TEACHING_PLANS_SEM1: TeachingPlan[] = [
  {
    id: "lidt-plan-sem1",
    code: "LIDT",
    title: "Leitura e Interpretação de Desenho Técnico",
    workload: 40,
    professor: "Ricardo Beretella",
    semester: "1º Semestre",
    objective: "Desenvolver a capacidade de leitura, interpretação e representação gráfica de peças e conjuntos mecânicos conforme normas técnicas vigentes.",
    content: "Normalização técnica, escalas, projeções ortogonais, cortes, cotagem, tolerâncias dimensionais e geométricas, acabamento superficial e desenho de conjunto.",
    schedule: LIDT_SCHEDULE
  },
  {
    id: "crd-plan-sem1",
    code: "CRD",
    title: "Controle Dimensional",
    workload: 32,
    professor: "Ricardo Beretella",
    semester: "1º Semestre",
    objective: "Qualificar o aluno para a execução de medições e controle de peças mecânicas utilizando instrumentos convencionais de medição industrial.",
    content: "Metrologia dimensional, conversões de unidades, paquímetro, micrômetro, goniômetro, relógio comparador, verificadores e calibração básica.",
    schedule: CRD_SCHEDULE
  },
  {
    id: "fusi-plan-sem1",
    code: "FUSI",
    title: "Fundamentos de Usinagem Convencional (Beretella)",
    workload: 240,
    professor: "Ricardo Beretella",
    semester: "1º Semestre",
    objective: "Capacitar na operação segura e eficiente de torno mecânico convencional e fresadora convencional, visando a usinagem completa de componentes industriais.",
    content: "Tecnologia de torneamento e fresagem, ferramentas de corte, fluidos de refrigeração, parâmetros de corte, furação, rosqueamento e ajustagem mecânica.",
    schedule: FUSI_SCHEDULE
  },
  {
    id: "fusi-gea-plan-sem1",
    code: "FUSI-GEA",
    title: "Fundamentos de Usinagem Convencional (Gea)",
    workload: 240,
    professor: "Ricardo Gea",
    semester: "1º Semestre",
    objective: "Capacitar na operação segura e precisa de torno mecânico convencional e fresadora convencional aplicando o planejamento sistemático e o controle dimensional de alta precisão.",
    content: "Tecnologia de torneamento e fresagem, esquadrejamento, cilindramento, furação com coordenadas e controle de qualidade operacional.",
    schedule: FUSI_SCHEDULE_GEA
  }
];

export const DEFAULT_TEACHING_PLANS_SEM2: TeachingPlan[] = [
  {
    id: "lidt-plan-sem2",
    code: "LIDT",
    title: "Leitura e Interpretação de Desenho Técnico",
    workload: 40,
    professor: "Ricardo Beretella",
    semester: "2º Semestre",
    objective: "Desenvolver a capacidade de leitura, interpretação e representação gráfica de peças e conjuntos mecânicos conforme normas técnicas vigentes.",
    content: "Normalização técnica, escalas, projeções ortogonais, cortes, cotagem, tolerâncias dimensionais e geométricas, acabamento superficial e desenho de conjunto.",
    schedule: LIDT_SCHEDULE_SEM2
  },
  {
    id: "crd-plan-sem2",
    code: "CRD",
    title: "Controle Dimensional",
    workload: 32,
    professor: "Ricardo Beretella",
    semester: "2º Semestre",
    objective: "Qualificar o aluno para a execução de medições e controle de peças mecânicas utilizando instrumentos convencionais de medição industrial.",
    content: "Metrologia dimensional, conversões de unidades, paquímetro, micrômetro, goniômetro, relógio comparador, verificadores e calibração básica.",
    schedule: CRD_SCHEDULE_SEM2
  },
  {
    id: "fusi-plan-sem2",
    code: "FUSI",
    title: "Fundamentos de Usinagem Convencional (Beretella)",
    workload: 240,
    professor: "Ricardo Beretella",
    semester: "2º Semestre",
    objective: "Capacitar na operação segura e eficiente de torno mecânico convencional e fresadora convencional, visando a usinagem completa de componentes industriais.",
    content: "Tecnologia de torneamento e fresagem, ferramentas de corte, fluidos de refrigeração, parâmetros de corte, furação, rosqueamento e ajustagem mecânica.",
    schedule: FUSI_SCHEDULE_SEM2
  },
  {
    id: "fusi-gea-plan-sem2",
    code: "FUSI-GEA",
    title: "Fundamentos de Usinagem Convencional (Gea)",
    workload: 240,
    professor: "Ricardo Gea",
    semester: "2º Semestre",
    objective: "Capacitar na operação segura e precisa de torno mecânico convencional e fresadora convencional aplicando o planejamento sistemático e o controle dimensional de alta precisão.",
    content: "Tecnologia de torneamento e fresagem, esquadrejamento, cilindramento, furação com coordenadas e controle de qualidade operacional.",
    schedule: FUSI_SCHEDULE_GEA_SEM2
  }
];
