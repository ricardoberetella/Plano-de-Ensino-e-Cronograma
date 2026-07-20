import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// Versão do cronograma - Alterar esta string força o App a atualizar o banco de dados com os novos dados "fiéis"
export const SCHEDULE_VERSION = "2026-V12-REFRESH-FULL";

// --- CRONOGRAMA LIDT (Revisado) ---
export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacities da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto".', resources: 'Sala de aula, projetor.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT.', resources: 'Exemplos de desenhos técnicos.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, models de sólidos.' },
  { id: 'l4', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica.', resources: 'Papel, lpis.' },
  { id: 'l5', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais.', resources: 'Modelos de peças simples.' },
  { id: 'l6', date: '09/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas únicas, face de referência).', strategy: '• Exercícios de cotagem de vistas ortogonais.', resources: 'Exercícios impressos.' },
  { id: 'l7', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstration de cortes.', resources: 'Desenhos técnicos com cortes.' },
  { id: 'l8', date: '23/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte.', strategy: '• Estudo de caso: Análise de desenhos complexos.', resources: 'Conjunto de desenhos variados.' },
  { id: 'l9', date: '30/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação).', strategy: '• Exercícios de desenho de vistas auxiliares.', resources: 'Modelos de peças com faces inclinadas.' },
  { id: 'l10', date: '06/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, explodida).', strategy: '• Apresentação da estrutura de um desenho de conjunto.', resources: 'Exemplo de desenho de conjunto.' },
  { id: 'l11', date: '13/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5.3. Lista de materiais; 5.4. Balões.', strategy: '• Análise do desenho de "Subconjunto do Acoplamento".', resources: 'Cópia do desenho da SA.' },
  { id: 'l12', date: '27/04/2026', hours: 2, capacities: 'Interpretar tolerância dimensional.', knowledge: '6.1. Tolerância dimensional (campos, ISO).', strategy: '• Introdução aos conceitos de tolerância e ajustes.', resources: 'Tabelas de tolerância ISO.' },
  { id: 'l13', date: '04/05/2026', hours: 2, capacities: 'Interpretar tolerância geométrica.', knowledge: '6.2. Tolerância geométrica (forma, posição).', strategy: '• Apresentação dos símbolos e significados.', resources: 'Quadro de tolerâncias geométricas.' },
  { id: 'l14', date: '11/05/2026', hours: 2, capacities: 'Interpretar acabamento superficial.', knowledge: '6.3. Acabamento superficial (rugosidade).', strategy: '• Explicação dos símbolos de acabamento.', resources: 'Tabela de símbolos.' },
  { id: 'l15', date: '18/05/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Início da elaboração dos croquis detalhados.', resources: 'Papel, instrumentos de desenho.' },
  { id: 'l16', date: '25/05/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Continuação e refinamento dos croquis.', resources: 'Dossiê em fase de conclusão.' },
  { id: 'l17', date: '01/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Finalização dos croquis e do dossiê técnico.', resources: 'Dossiê técnico.' },
  { id: 'l18', date: '08/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Apresentação dos Resultados e Dossiês.', resources: 'Projetor.' },
  { id: 'l19', date: '15/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Feedback e Avaliação final.', resources: 'Fichas de avaliação.' },
  { id: 'l20', date: '22/06/2026', hours: 2, capacities: 'Todas as capacities da SA.', knowledge: 'Fechamento de Notas.', strategy: '• Encerramento da Unidade Curricular.', resources: 'Diário de classe.' }
];

// --- CRONOGRAMA CRD (Revisado) ---
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

// --- CRONOGRAMA FUSI (EFETIVO - 60 AULAS - PERFIL RICARDO GEA) ---
export const FUSI_SCHEDULE_GEA = [
  { id: 'g01', hours: 4, date: '26/01/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g02', hours: 4, date: '27/01/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'g03', hours: 4, date: '28/01/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'TEORIA (TEOR)', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'g04', hours: 4, date: '02/02/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g05', hours: 4, date: '03/02/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g06', hours: 4, date: '04/02/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'TEORIA (TEOR)', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'g07', hours: 4, date: '09/02/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g08', hours: 4, date: '10/02/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'g09', hours: 4, date: '11/02/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'g10', hours: 4, date: '16/02/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos e controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g11', hours: 4, date: '17/02/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g12', hours: 4, date: '18/02/2026', capacities: 'Rosqueamento (Definição, Ferramentas); Roscar com Cossinete.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria de cálculos para furação de roscas e tipos de roscas.', resources: 'Sala de aula.' },
  { id: 'g13', hours: 4, date: '23/02/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete no torno.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo Roscado. Tornear diâmetro e executar roscagem.', resources: 'Oficina de usinagem, Torno, Cossinete.' },
  { id: 'g14', hours: 4, date: '24/02/2026', capacities: 'Furação; Roscar manualmente com macho na bancada.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Manípulo. Furação em furadeira e rosca manual.', resources: 'Oficina de usinagem, Bancada, Machos.' },
  { id: 'g15', hours: 4, date: '25/02/2026', capacities: 'Elementos de máquina; Visão sistêmica; Planejar ações.', knowledge: 'TEORIA (TEOR)', strategy: 'Desafio 1: Planejamento do Calculador de Usinagem.', resources: 'Sala de aula.' },
  { id: 'g16', hours: 4, date: '02/03/2026', capacities: 'Parâmetros de usinagem; Tornear superfície cilíndrica; Facear.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Início da base cilíndrica (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g17', hours: 4, date: '03/03/2026', capacities: 'Fresagem de superfícies planas e esquadrejamento.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Preparação do bloco principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g18', hours: 4, date: '04/03/2026', capacities: 'Revisão de tolerâncias; Ajustagem mecânica (Definição).', knowledge: 'TEORIA (TEOR)', strategy: 'Estudo de ajustes e folgas para montagem do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'g19', hours: 4, date: '09/03/2026', capacities: 'Tornear cilíndrica; Furo de centro; Chanfrar.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Usinagem de eixos internos e pinos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g20', hours: 4, date: '10/03/2026', capacities: 'Fresagem de rebaixos e canais com fresa de topo.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Detalhes do corpo principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g21', hours: 4, date: '11/03/2026', capacities: 'Processos de furação e rosqueamento (Normas).', knowledge: 'TEORIA (TEOR)', strategy: 'Estudo técnico sobre furação coordenada e tabelas de roscas.', resources: 'Sala de aula.' },
  { id: 'g22', hours: 4, date: '16/03/2026', capacities: 'Furação; Rosqueamento manual e no torno.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Furação e rosqueamento de componentes.', resources: 'Oficina de usinagem.' },
  { id: 'g23', hours: 4, date: '17/03/2026', capacities: 'Furação em fresadora; Controle de qualidade.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Furação coordenada do corpo do calculador.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g24', hours: 4, date: '18/03/2026', capacities: 'Manutenção preventiva; Segurança e Meio Ambiente.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria sobre descarte de resíduos e lubrificação de máquinas.', resources: 'Sala de aula.' },
  { id: 'g25', hours: 4, date: '23/03/2026', capacities: 'Tornear cilíndrica; Inspeção com micrômetro.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Acabamento de diâmetros críticos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g26', hours: 4, date: '24/03/2026', capacities: 'Fresagem; Superfícies paralelas e perpendiculares.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Acabamento final das faces do bloco.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g27', hours: 4, date: '25/03/2026', capacities: 'Relatórios técnicos; Controle de processos; Organização.', knowledge: 'TEORIA (TEOR)', strategy: 'Documentação de controle de qualidade (Teoria).', resources: 'Sala de aula.' },
  { id: 'g28', hours: 4, date: '30/03/2026', capacities: 'Ajustagem manual; Rebarbação; Limagem técnica.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Ajustagem manual das peças para encaixe.', resources: 'Bancada, Limas.' },
  { id: 'g29', hours: 4, date: '31/03/2026', capacities: 'Inspeção visual; Verificação funcional de conjuntos.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Pré-montagem e detecção de interferências.', resources: 'Bancada.' },
  { id: 'g30', hours: 4, date: '01/04/2026', capacities: 'Revisão Geral: Torneamento Convencional.', knowledge: 'TEORIA (TEOR)', strategy: 'Debate técnico: Soluções para problemas em torneamento.', resources: 'Sala de aula.' },
  { id: 'g31', hours: 4, date: '06/04/2026', capacities: 'Tornear; Chanfrar; Roscar com cossinete.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa Reforço: Repetição do Eixo Roscado.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g32', hours: 4, date: '07/04/2026', capacities: 'Fresar; Furação de precisão; Qualidade.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa Reforço: Ajuste de blocos paralelos.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g33', hours: 4, date: '08/04/2026', capacities: 'Revisão Geral: Fresamento e Ajustagem.', knowledge: 'TEORIA (TEOR)', strategy: 'Debate técnico: Otimização de tempo no setup de máquinas.', resources: 'Sala de aula.' },
  { id: 'g34', hours: 4, date: '13/04/2026', capacities: 'Prática Supervisionada Avançada (Torneamento).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Refino dimensional das peças cilíndricas.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g35', hours: 4, date: '14/04/2026', capacities: 'Prática Supervisionada Avançada (Fresamento).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Refino dimensional do bloco fresado.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g36', hours: 4, date: '15/04/2026', capacities: 'Gestão de Ferramental e Almoxarifado técnico.', knowledge: 'TEORIA (TEOR)', strategy: 'Organização e controle de vida útil das ferramentas.', resources: 'Sala de aula.' },
  { id: 'g37', hours: 4, date: '22/04/2026', capacities: 'Montagem de conjuntos; Elementos de máquina.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria de montagem e tipos de ajustes (Prensado/Folga).', resources: 'Sala de aula.' },
  { id: 'g38', hours: 4, date: '27/04/2026', capacities: 'Controle da qualidade das peças; Inspeção dimensional.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Avaliação dimensional total (Micrômetro).', resources: 'Sala de aula, Micrômetro.' },
  { id: 'g39', hours: 4, date: '28/04/2026', capacities: 'Tornear; Facear; Furo de centro (Novas peças).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa Extra: Início de peça auxiliar (Base castanha).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g40', hours: 4, date: '29/04/2026', capacities: 'Manutenção; Segurança do trabalho (NR-12).', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria sobre proteções e dispositivos de emergência.', resources: 'Sala de aula.' },
  { id: 'g41', hours: 4, date: '04/05/2026', capacities: 'Fresar; Rebaixos; Furação (Novas peças).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa Extra: Usinagem de base auxiliar (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g42', hours: 4, date: '05/05/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Prática de roscagem em diferentes diâmetros.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g43', hours: 4, date: '06/05/2026', capacities: 'Parâmetros avançados (Materiais especiais).', knowledge: 'TEORIA (TEOR)', strategy: 'Estudo de tabelas para Aço Inox e Bronze (Teoria).', resources: 'Sala de aula.' },
  { id: 'g44', hours: 4, date: '11/05/2026', capacities: 'Fresagem de superfícies perpendiculares.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Prática de esquadrejamento de precisão.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g45', hours: 4, date: '12/05/2026', capacities: 'Cortar no torno (Bedame); Abrir canais.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Operações de sangramento e canais técnicos.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g46', hours: 4, date: '13/05/2026', capacities: 'Relatórios de Não Conformidade; Ações corretivas.', knowledge: 'TEORIA (TEOR)', strategy: 'Como documentar erros e recuperar peças (Teoria).', resources: 'Sala de aula.' },
  { id: 'g47', hours: 4, date: '18/05/2026', capacities: 'Rosquear manual com macho na bancada.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Prática intensiva de roscagem em furos cegos.', resources: 'Oficina de usinagem, Bancada.' },
  { id: 'g48', hours: 4, date: '19/05/2026', capacities: 'Ajustagem mecânica: Limagem plana.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Prática de ajustagem ao banco (precisão manual).', resources: 'Bancada, Limas.' },
  { id: 'g49', hours: 4, date: '20/05/2026', capacities: 'Elementos de fixação e transmissão (Teoria).', knowledge: 'TEORIA (TEOR)', strategy: 'Estudo sobre chavetas e eixos estriados.', resources: 'Sala de aula.' },
  { id: 'g50', hours: 4, date: '25/05/2026', capacities: 'Controle dimensional de conjuntos montados.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Testes funcionais e ajustes de interferência.', resources: 'Oficina de usinagem.' },
  { id: 'g51', hours: 4, date: '26/05/2026', capacities: 'Torneamento: Prática de acabamento superficial.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Foco em rugosidade e brilho no torno.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g52', hours: 4, date: '27/05/2026', capacities: 'Preparação para Avaliação Final (Teoria).', knowledge: 'TEORIA (TEOR)', strategy: 'Revisão integral dos conteúdos dos Prints 1, 2 e 3.', resources: 'Sala de aula.' },
  { id: 'g53', hours: 4, date: '01/06/2026', capacities: 'Fresagem: Prática de acabamento (Cabeçote).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Foco em planeza e acabamento superficial.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'g54', hours: 4, date: '02/06/2026', capacities: 'Conclusão de peças pendentes do semestre.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Prática de Oficina Final (Arremates).', resources: 'Oficina de usinagem.' },
  { id: 'g55', hours: 4, date: '03/06/2026', capacities: 'Ética Profissional e Postura no Trabalho.', knowledge: 'TEORIA (TEOR)', strategy: 'Atitudes, responsabilidade e zelo com patrimônio.', resources: 'Sala de aula.' },
  { id: 'g56', hours: 4, date: '08/06/2026', capacities: 'Limpeza Técnica e Conservação.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Limpeza profunda e lubrificação das máquinas.', resources: 'Oficina de usinagem.' },
  { id: 'g57', hours: 4, date: '09/06/2026', capacities: 'Organização do ambiente (5S).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Organização de armários e entrega de ferramentas.', resources: 'Oficina de usinagem.' },
  { id: 'g58', hours: 4, date: '10/06/2026', capacities: 'Revisão Geral de Processos e Documentação.', knowledge: 'TEORIA (TEOR)', strategy: 'Conferência de diários e fichas técnicas.', resources: 'Sala de aula.' },
  { id: 'g59', hours: 4, date: '17/06/2026', capacities: 'Feedback Final e Divulgação de Notas.', knowledge: 'TEORIA (TEOR)', strategy: 'Encerramento letivo em sala de aula.', resources: 'Sala de aula.' },
  { id: 'g60', hours: 4, date: '22/06/2026', capacities: 'Entrega Final das Peças e Avaliação de Resultados.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Finalização de todas as atividades de oficina.', resources: 'Oficina de usinagem.' }
];

// --- CRONOGRAMA FUSI (PADRÃO BERETELLA) ---
export const FUSI_SCHEDULE = [
  { id: 'f01', hours: 4, date: '26/01/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'TEORIA (TEOR)', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'f02', hours: 4, date: '28/01/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f03', hours: 4, date: '29/01/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'f04', hours: 4, date: '02/02/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'TEORIA (TEOR)', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'f05', hours: 4, date: '04/02/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f06', hours: 4, date: '05/02/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f07', hours: 4, date: '09/02/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'f08', hours: 4, date: '11/02/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f09', hours: 4, date: '12/02/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'f10', hours: 4, date: '18/02/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos e controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f11', hours: 4, date: '19/02/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f12', hours: 4, date: '23/02/2026', capacities: 'Rosqueamento (Definição, Ferramentas); Roscar com Cossinete.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria de cálculos para furação de roscas e tipos de roscas.', resources: 'Sala de aula.' },
  { id: 'f13', hours: 4, date: '25/02/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete no torno.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Eixo Roscado. Tornear diâmetro e executar roscagem.', resources: 'Oficina de usinagem, Torno, Cossinete.' },
  { id: 'f14', hours: 4, date: '26/02/2026', capacities: 'Furação; Roscar manualmente com macho na bancada.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa: Manípulo. Furação em furadeira e rosca manual.', resources: 'Oficina de usinagem, Bancada, Machos.' },
  { id: 'f15', hours: 4, date: '02/03/2026', capacities: 'Elementos de máquina; Visão sistêmica; Planejar ações.', knowledge: 'TEORIA (TEOR)', strategy: 'Desafio 1: Planejamento do Calculador de Usinagem.', resources: 'Sala de aula.' },
  { id: 'f16', hours: 4, date: '04/03/2026', capacities: 'Parâmetros de usinagem; Tornear superfície cilíndrica; Facear.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Início da base cilíndrica (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f17', hours: 4, date: '05/03/2026', capacities: 'Fresagem de superfícies planas e esquadrejamento.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Preparação do bloco principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f18', hours: 4, date: '09/03/2026', capacities: 'Revisão de tolerâncias; Ajustagem mecânica (Definição).', knowledge: 'TEORIA (TEOR)', strategy: 'Estudo de ajustes e folgas para montagem do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'f19', hours: 4, date: '11/03/2026', capacities: 'Tornear cilíndrica; Furo de centro; Chanfrar.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Usinagem de eixos internos e pinos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f20', hours: 4, date: '12/03/2026', capacities: 'Fresagem de rebaixos e canais com fresa de topo.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Detalhes do corpo principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f21', hours: 4, date: '16/03/2026', capacities: 'Processos de furação e rosqueamento (Normas).', knowledge: 'TEORIA (TEOR)', strategy: 'Estudo técnico sobre furação coordenada e tabelas de roscas.', resources: 'Sala de aula.' },
  { id: 'f22', hours: 4, date: '18/03/2026', capacities: 'Furação; Rosqueamento manual e no torno.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Furação e rosqueamento de componentes.', resources: 'Oficina de usinagem.' },
  { id: 'f23', hours: 4, date: '19/03/2026', capacities: 'Furação em fresadora; Controle de qualidade.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Furação coordenada do corpo do calculador.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f24', hours: 4, date: '23/03/2026', capacities: 'Manutenção preventiva; Segurança e Meio Ambiente.', knowledge: 'TEORIA (TEOR)', strategy: 'Teoria sobre descarte de resíduos e lubrificação de máquinas.', resources: 'Sala de aula.' },
  { id: 'f25', hours: 4, date: '25/03/2026', capacities: 'Tornear cilíndrica; Inspeção com micrômetro.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Acabamento de diâmetros críticos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f26', hours: 4, date: '26/03/2026', capacities: 'Fresagem; Superfícies paralelas e perpendiculares.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Acabamento final das faces do bloco.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f27', hours: 4, date: '30/03/2026', capacities: 'Relatórios técnicos; Controle de processos; Organização.', knowledge: 'TEORIA (TEOR)', strategy: 'Documentação de controle de qualidade (Teoria).', resources: 'Sala de aula.' },
  { id: 'f28', hours: 4, date: '01/04/2026', capacities: 'Ajustagem manual; Rebarbação; Limagem técnica.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Ajustagem manual das peças para encaixe.', resources: 'Bancada, Limas.' },
  { id: 'f29', hours: 4, date: '02/04/2026', capacities: 'Inspeção visual; Verificação funcional de conjuntos.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Pré-montagem e detecção de interferências.', resources: 'Bancada.' },
  { id: 'f30', hours: 4, date: '06/04/2026', capacities: 'Revisão Geral: Torneamento Convencional.', knowledge: 'TEORIA (TEOR)', strategy: 'Debate técnico: Soluções para problemas em torneamento.', resources: 'Sala de aula.' },
  { id: 'f31', hours: 4, date: '08/04/2026', capacities: 'Tornear; Chanfrar; Roscar com cossinete.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa Reforço: Repetição do Eixo Roscado.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f32', hours: 4, date: '09/04/2026', capacities: 'Fresar; Furação de precisão; Qualidade.', knowledge: 'PRÁTICA (PRAT)', strategy: 'Tarefa Reforço: Ajuste de blocos paralelos.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f33', hours: 4, date: '13/04/2026', capacities: 'Revisão Geral: Fresamento e Ajustagem.', knowledge: 'TEORIA (TEOR)', strategy: 'Debate técnico: Otimização de tempo no setup de máquinas.', resources: 'Sala de aula.' },
  { id: 'f34', hours: 4, date: '15/04/2026', capacities: 'Prática Supervisionada Avançada (Torneamento).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Refino dimensional das peças cilíndricas.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f35', hours: 4, date: '16/04/2026', capacities: 'Prática Supervisionada Avançada (Fresamento).', knowledge: 'PRÁTICA (PRAT)', strategy: 'Desafio 1: Refino dimensional do bloco fresado.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f36', hours: 4, date: '22/04/2026', capacities: 'Gestão de Ferramental e Almoxarifado técnico.', knowledge: 'TEORIA (TEOR)', strategy: 'Organização e controle de vida útil das ferramentas.', resources: 'Sala de aula.' }
];

// Mock do objeto SAMPLE_PLANS obrigatório para o App funcionar
export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: "plan-template",
    profileId: "beretella",
    courseName: "TÉCNICO EM MECÂNICA",
    totalHours: 1200,
    modality: "Presencial",
    objective: "Perfil padrão de conclusão do curso Técnico SENAI.",
    updatedAt: new Date().toISOString(),
    units: [
      { id: "lidt", name: "Leitura e Interpretação de Desenho Técnico", schedule: LIDT_SCHEDULE, calendar: {} },
      { id: "crd", name: "Controle Dimensional", schedule: CRD_SCHEDULE, calendar: {} },
      { id: "fusi", name: "Fundamentos de Usinagem", schedule: FUSI_SCHEDULE, calendar: {} }
    ]
  },
  {
    id: "plan-template-gea",
    profileId: "beretella",
    courseName: "TÉCNICO EM MECÂNICA - GEA",
    totalHours: 1200,
    modality: "Presencial",
    objective: "Perfil de conclusão com cronograma estendido Ricardo Gea.",
    updatedAt: new Date().toISOString(),
    units: [
      { id: "lidt", name: "Leitura e Interpretação de Desenho Técnico", schedule: LIDT_SCHEDULE, calendar: {} },
      { id: "crd", name: "Controle Dimensional", schedule: CRD_SCHEDULE, calendar: {} },
      { id: "fusi", name: "Fundamentos de Usinagem", schedule: FUSI_SCHEDULE_GEA, calendar: {} }
    ]
  }
];
