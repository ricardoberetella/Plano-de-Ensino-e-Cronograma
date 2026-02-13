
import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// --- CRONOGRAMA LIDT ---
export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacidades da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto"; • Dinâmica de Grupo: Formação das equipes e discussão inicial sobre a importância do desenho técnico no mundo do trabalho.', resources: 'Sala de aula, projetor, computador, Plano de Ensino, material da SA.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT, foramatos de papel e tipos de linhas. • Atividade prática: Análise de desenhos técnicos para identificação dos tipos de linhas e suas aplicações.', resources: 'Sala de aula, projetor, exemplos de desenhos técnicos, apostila.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração: Explicação sobre escalas (natural, redução, ampliação). • Apresentação de figuras e sólidos geométricos.', resources: 'Projetor, modelos de sólidos geométricos, desenhos com differentes escalas.' },
  { id: 'l4', date: '16/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica. Exercícios de esboço à mão livre de sólidos geométricos simples em perspectiva.', resources: 'Sala de aula, papel, lps, borracha, modelos de sólidos.' },
  { id: 'l5', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais (frontal, superior, lateral) a partir de modelos sólidos simples. Discussão sobre supressão de vistas.', resources: 'Sala de aula, papel, lps, borracha, modelos de peças simples.' },
  { id: 'l6', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas únicas, face de referência, eixo de simetria).', strategy: '• Exposição dialogada e Prática: Apresentação das regras de cotagem. Exercícios de cotagem de vistas ortogonais.', resources: 'Projetor, exemplos de desenhos cotados, exercícios impressos.' },
  { id: 'l7', date: '09/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração: Explicação da necessidade e representação de cortes. Análise de desenhos com corte total e meio corte.', resources: 'Projetor, desenhos técnicos com cortes, pecas seccionadas (se disponível).' },
  { id: 'l8', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte (composto, parcial, seção, omissão, encurtamento).', strategy: '• Estudo de caso: As equipes analisam desenhos complexos e identificam os diferentes tipos de cortes e seções, discutindo sua aplicação.', resources: 'Projetor, conjunto de desenhos técnicos variados.' },
  { id: 'l9', date: '23/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação de elemento).', strategy: '• Atividade prática: Exercícios de desenho de vistas auxiliares para representação de faces inclinadas.', resources: 'Sala de aula, papel, instrumentos de desenho, modelos de peças com faces inclinadas.' },
  { id: 'l10', date: '30/03/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, elementos, vista explodida).', strategy: '• Exposição dialogada: Apresentação da estrutura de um desenho de conjunto, vista explodida e elementos padronizados.', resources: 'Projetor, exemplo de desenho de conjunto comlplexo (ex: morsa).' },
  { id: 'l11', date: '06/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5.3. Lista de materiais; 5.4. Balões de identificação.', strategy: '• Atividade em equipe: Análise do desenho de "Subconjunto do Acoplamento AC-102". As equipes devem correlacionar a lista de materiais com os balões na vista explodida.', resources: 'Cópia do desenho da SA para cada equipe, projetor.' },
  { id: 'l12', date: '13/04/2026', hours: 2, capacities: 'Interpretar tolerância dimensional.', knowledge: '6.1. Tolerância dimensional (campos, sistema ISO).', strategy: '• Exposição dialogada: Introdução aos conceitos de tolerância, afastamentos e sistema de ajuste ISO (eixo-base e furo-base).', resources: 'Projetor, tabelas de tolerância ISO, exemplos de eixos e furos com ajustes.' },
  { id: 'l13', date: '27/04/2026', hours: 2, capacities: 'Interpretar tolerância geométrica.', knowledge: '6.2. Tolerância geométrica (forma, posição, orientation, batimento).', strategy: '• Exposição dialogada: Apresentação dos símbolos e significado das principais tolerâncias geométricas (retitude, planicidade, paralelismo, etc.).', resources: 'Projetor, quadro de tolerâncias geométricas, peças de exemplo.' },
  { id: 'l14', date: '04/05/2026', hours: 2, capacities: 'Interpretar acabamento superficial.', knowledge: '6.3. Acabamento superficial (rugosidade, tratamento, recartilhado, sobremetal).', strategy: '• Exposição dialogada: Explicação dos símbolos de acabamento superficial e sua relação com os processos de fabricação.', resources: 'Projetor, tabela de símbolos de rugosidade, rugosímetros (se disponível).' },
  { id: 'l15', date: '11/05/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Trabalho em equipe (Oficina): Início da elaboração dos croquis detalhados e do relatório de análise crítica do desafio proposto na SA. O docente atua como mediador.', resources: 'Sala de aula/oficina, cópias do projeto da SA, papel, instrumentos de desenho.' },
  { id: 'l16', date: '18/05/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Trabalho em equipe (Oficina): Continuação e refinamento dos croquis e preenchimento da ficha de análise crítica.', resources: 'Sala de aula/oficina, cópias do projeto da SA, papel, instrumentos de desenho.' },
  { id: 'l17', date: '25/05/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Trabalho em equipe (Oficina): Finalização dos croquis e do dossiê técnico. Revisão final das informações.', resources: 'Sala de aula/oficina, dossiê em fase de conclusão.' },
  { id: 'l18', date: '01/06/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Apresentação dos Resultados: Equipes apresentam seus Dossiês Técnicos e explicam a análise das tolerâncias.', resources: 'Sala de aula, projetor, dossiês finalizados.' },
  { id: 'l19', date: '08/06/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Feedback e Avaliação: Devolutiva do docente sobre o desempenho das equipes e autoavaliação.', resources: 'Sala de aula, fichas de avaliação.' },
  { id: 'l20', date: '15/06/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Encerramento da Unidade Curricular e fechamento de notas.', resources: 'Sala de aula.' }
];

// --- CRONOGRAMA CRD ---
export const CRD_SCHEDULE = [
  { id: 'c1', date: '27/01/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia na indústria metalmecânica.', knowledge: '1. Metrologia (1.1 a 1.5)', strategy: 'Apresentação da Situação de Aprendizagem (SA). Exposição dialogada sobre a importância da metrologia, normas e terminologia.', resources: 'Sala de aula, projetor, computador, material da SA.' },
  { id: 'c2', date: '03/02/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia na indústria metalmecânica.', knowledge: '2. Erros de medição (2.1 a 2.4)', strategy: 'Discussão em grupo sobre os tipos e fontes de erro na medição. Demonstração de erros comuns (paralaxe, força excessiva).', resources: 'Sala de aula, projetor, instrumentos de medição para demonstração.' },
  { id: 'c3', date: '10/02/2026', hours: 2, capacities: 'II. Medir peças com escala. III. Medir peças com trena.', knowledge: '3. Escala (3.1 a 3.3). 4. Trena (4.1 a 4.3)', strategy: 'Demonstração prática do uso de escalas e trenas. Exercícios práticos de medição em peças simples.', resources: 'Laboratório de Metrologia, escalas, trenas, pecas diversas.' },
  { id: 'c4', date: '24/02/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro. I. Demonstrar atenção a detalhes.', knowledge: '5. Paquímetros (5.1, 5.2)', strategy: 'Exposição dialogada sobre os tipos de paquímetros e suas características. Demonstração do manuseio correto.', resources: 'Laboratório de Metrologia, projetor, diferentes tipos de paquímetros.' },
  { id: 'c5', date: '03/03/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro. I. Demonstrar atenção a detalhes.', knowledge: '5. Paquímetros (5.3, 5.4, 5.5)', strategy: 'Demonstração e exercício prático de leitura no sistema métrico (0,05mm e 0,02mm).', resources: 'Laboratório de Metrologia, paquímetros, peças didcidas com medidas conhecidas.' },
  { id: 'c6', date: '10/03/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro. I. Demonstrar atenção a detalhes. I. Organizar o ambiente de trabalho e as atividades.', knowledge: '5. Paquímetros (5.5)', strategy: 'Exercício prático supervisionado de medição em peças variadas, com preenchimento de relatório simples.', resources: 'Laboratório de Metrologia, paquímetros, pecas, formulário de relatório.' },
  { id: 'c7', date: '17/03/2026', hours: 2, capacities: 'V. Medir peças no sistema métrico com micrômetro. II. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais.', knowledge: '6. Micrômetros (6.1, 6.2, 6.3)', strategy: 'Exposição sobre os tipos de micrômetros. Demonstração do manuseio, ajuste do zero e uso da catraca.', resources: 'Laboratório de Metrologia, projetor, differentes tipos de micrômetros.' },
  { id: 'c8', date: '24/03/2026', hours: 2, capacities: 'V. Medir peças no sistema métrico com micrômetro. I. Demonstrar atenção a detalhes.', knowledge: '6. Micrômetros (6.3, 6.4, 6.5)', strategy: 'Demonstração e exercício prático de leitura no sistema métrico (0,01 mm).', resources: 'Laboratório de Metrologia, micrômetros, peças didáticas.' },
  { id: 'c9', date: '31/03/2026', hours: 2, capacities: 'V. Medir peças no sistema métrico com micrômetro. I. Demonstrar atenção a detalhes. I. Organizar o ambiente de trabalho e as atividades.', knowledge: '6. Micrômetros (6.5)', strategy: 'Exercício prático supervisionado de medição com micrômetros e preenchimento de relatório, comparando com medidas do paquímetro.', resources: 'Laboratório de Metrologia, micrômetros, paquímetros, peças, relatório.' },
  { id: 'c10', date: '07/04/2026', hours: 2, capacities: 'VI. Verificar dimensões e perfis com verificadores.', knowledge: '7. Verificadores (7.1, 7.2)', strategy: 'Demonstração do uso de calibradores de folga, raio e rosca. Exercício prático de verificação em peças.', resources: 'Laboratório de Metrologia, jogos de verificadores, pecas com roscas e raios.' },
  { id: 'c11', date: '14/04/2026', hours: 2, capacities: 'VII. Medir por comparação com relógio apalpador e comparador.', knowledge: '8. Relógios comparadores e apalpadores (8.1, 8.2)', strategy: 'Exposição sobre os tipos e características dos relógios. Demonstração de montagem em suportes magnéticos.', resources: 'Laboratório de Metrologia, relógios comparadores e apalpadores, suportes.' },
  { id: 'c12', date: '28/04/2026', hours: 2, capacities: 'VII. Medir por comparação com relógio apalpador e comparador.', knowledge: '8. Relógios comparadores e apalpadores (8.3, 8.4)', strategy: 'Exercício prático de zeragem com blocos-padrão e medição por comparação (ex: planicidade, concentricidade).', resources: 'Laboratório de Metrologia, relógios, suportes, blocos-padrão, desempeno.' },
  { id: 'c13', date: '05/05/2026', hours: 2, capacities: 'VIII. Medir peças com goniômetro.', knowledge: '9. Goniômetro (9.1 a 9.4)', strategy: 'Demonstração do uso do goniômetro (transferidor de grau) para medição de ângulos em peças.', resources: 'Laboratório de Metrologia, goniômetros, peças com chanfros e ângulos.' },
  { id: 'c14', date: '12/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Revisão geral de todos os instrumentos. Planejamento em grupo para a execução do desafio da SA.', resources: 'Sala de aula, projetor, material da SA, desenhos técnicos.' },
  { id: 'c15', date: '19/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Início da Execução do Desafio: Análise do desenho técnico e início das medições do lote de "Pinos de Ancoragem".', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c20', date: '23/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Feedback final sobre o desempenho na SA. Autoavaliação e fechamento da Unidade Curricular.', resources: 'Sala de aula, instrumentos de avaliação preenchidos.' }
];

// --- NOVO CRONOGRAMA FUSI (60 AULAS DE 4H = 240H TOTAL) ---
export const FUSI_SCHEDULE = [
  { id: 'f01', hours: 4, date: '26/01/2026', capacities: 'Definir parâmetros; Torneamento; Parâmetros de corte/ferramenta.', knowledge: 'TEORIA: Introdução aos processos.', strategy: 'Exposição dialogada: Apresentação da SA2 e cálculos técnicos.', resources: 'Sala de aula, projetor.' },
  { id: 'f02', hours: 4, date: '28/01/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'PRÁTICA: Torneamento básico.', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f03', hours: 4, date: '29/01/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'PRÁTICA: Desbaste cilíndrico.', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  { id: 'f04', hours: 4, date: '02/02/2026', capacities: 'Elaborar plano de trabalho; Processos; Segurança; Meio Ambiente.', knowledge: 'TEORIA: Planejamento de processo.', strategy: 'Análise de desenhos técnicos e folhas de processo (Fresagem).', resources: 'Sala de aula.' },
  { id: 'f05', hours: 4, date: '04/02/2026', capacities: 'Selecionar ferramentas; Fresagem; Parâmetros de corte.', knowledge: 'PRÁTICA: Setup Fresadora.', strategy: 'Tarefa: Bloco Fresado. Setup da fresadora e cálculos de RPM.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f06', hours: 4, date: '05/02/2026', capacities: 'Fresagem (Operações); Facear; Superfícies paralelas.', knowledge: 'PRÁTICA: Esquadrejamento.', strategy: 'Tarefa: Bloco Fresado. Esquadrejamento e faceamento.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f07', hours: 4, date: '09/02/2026', capacities: 'Controle de qualidade; Inspeção dimensional; Instrumentos.', knowledge: 'TEORIA: Metrologia industrial.', strategy: 'Teoria sobre Metrologia aplicada e tolerâncias ISO.', resources: 'Sala de aula, Projetor.' },
  { id: 'f08', hours: 4, date: '11/02/2026', capacities: 'Tornear superfície cilíndrica; Cortar no torno (Bedame).', knowledge: 'PRÁTICA: Operações com Bedame.', strategy: 'Tarefa: Eixo 4 Corpos. Acabamento e sangramento (corte).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f09', hours: 4, date: '12/02/2026', capacities: 'Inspeção dimensional; Refrigeração; Zelar pelo equipamento.', knowledge: 'PRÁTICA: Controle dimensional.', strategy: 'Tarefa: Eixo 4 Corpos. Controle final e organização.', resources: 'Oficina de usinagem, Micrômetro.' },
  { id: 'f10', hours: 4, date: '18/02/2026', capacities: 'Fresagem (Rebaixos); Superfícies perpendiculares.', knowledge: 'PRÁTICA: Rebaixos.', strategy: 'Tarefa: Bloco Fresado. Usinagem de rebaixos e controle.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f11', hours: 4, date: '19/02/2026', capacities: 'Aplicar refrigeração; Fresagem (Operações avançadas).', knowledge: 'PRÁTICA: Acabamento em fresa.', strategy: 'Tarefa: Bloco Fresado. Prática de acabamento em fresa.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f12', hours: 4, date: '23/02/2026', capacities: 'Rosqueamento (Definição, Ferramentas); Roscar com Cossinete.', knowledge: 'TEORIA: Elementos de união.', strategy: 'Teoria de cálculos para furação de roscas e tipos de roscas.', resources: 'Sala de aula.' },
  { id: 'f13', hours: 4, date: '25/02/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete no torno.', knowledge: 'PRÁTICA: Rosqueamento externo.', strategy: 'Tarefa: Eixo Roscado. Tornear diâmetro e executar roscagem.', resources: 'Oficina de usinagem, Torno, Cossinete.' },
  { id: 'f14', hours: 4, date: '26/02/2026', capacities: 'Furação; Roscar manualmente com macho na bancada.', knowledge: 'PRÁTICA: Rosqueamento manual.', strategy: 'Tarefa: Manípulo. Furação em furadeira e rosca manual.', resources: 'Oficina de usinagem, Bancada, Machos.' },
  { id: 'f15', hours: 4, date: '02/03/2026', capacities: 'Elementos de máquina; Visão sistêmica; Planejar ações.', knowledge: 'TEORIA: Sistemas integrados.', strategy: 'Desafio 1: Planejamento do Calculador de Usinagem.', resources: 'Sala de aula.' },
  { id: 'f16', hours: 4, date: '04/03/2026', capacities: 'Parâmetros de usinagem; Tornear superfície cilíndrica; Facear.', knowledge: 'PRÁTICA: Desafio 1 (Início).', strategy: 'Desafio 1: Início da base cilíndrica (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f17', hours: 4, date: '05/03/2026', capacities: 'Fresagem de superfícies planas e esquadrejamento.', knowledge: 'PRÁTICA: Desafio 1 (Bloco).', strategy: 'Desafio 1: Preparação do bloco principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f18', hours: 4, date: '09/03/2026', capacities: 'Revisão de tolerâncias; Ajustagem mecânica (Definição).', knowledge: 'TEORIA: Tolerâncias e Ajustes.', strategy: 'Estudo de ajustes e folgas para montagem do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'f19', hours: 4, date: '11/03/2026', capacities: 'Tornear cilíndrica; Furo de centro; Chanfrar.', knowledge: 'PRÁTICA: Componentes internos.', strategy: 'Desafio 1: Usinagem de eixos internos e pinos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f20', hours: 4, date: '12/03/2026', capacities: 'Fresagem de rebaixos e canais com fresa de topo.', knowledge: 'PRÁTICA: Detalhes funcionais.', strategy: 'Desafio 1: Detalhes do corpo principal (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f21', hours: 4, date: '16/03/2026', capacities: 'Processos de furação e rosqueamento (Normas).', knowledge: 'TEORIA: Furação coordenada.', strategy: 'Estudo técnico sobre furação coordenada e tabelas de roscas.', resources: 'Sala de aula.' },
  { id: 'f22', hours: 4, date: '18/03/2026', capacities: 'Furação; Rosqueamento manual e no torno.', knowledge: 'PRÁTICA: Furação e Rosca.', strategy: 'Desafio 1: Furação e rosqueamento de componentes.', resources: 'Oficina de usinagem.' },
  { id: 'f23', hours: 4, date: '19/03/2026', capacities: 'Furação em fresadora; Controle de qualidade.', knowledge: 'PRÁTICA: Precisão dimensional.', strategy: 'Desafio 1: Furação coordenada do corpo do calculador.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f24', hours: 4, date: '23/03/2026', capacities: 'Manutenção preventiva; Segurança e Meio Ambiente.', knowledge: 'TEORIA: Lubrificação e Descarte.', strategy: 'Teoria sobre descarte de resíduos e lubrificação de máquinas.', resources: 'Sala de aula.' },
  { id: 'f25', hours: 4, date: '25/03/2026', capacities: 'Tornear cilíndrica; Inspeção com micrômetro.', knowledge: 'PRÁTICA: Diâmetros críticos.', strategy: 'Desafio 1: Acabamento de diâmetros críticos (Torno).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f26', hours: 4, date: '26/03/2026', capacities: 'Fresagem; Superfícies paralelas e perpendiculares.', knowledge: 'PRÁTICA: Acabamento de faces.', strategy: 'Desafio 1: Acabamento final das faces do bloco.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f27', hours: 4, date: '30/03/2026', capacities: 'Relatórios técnicos; Controle de processos; Organização.', knowledge: 'TEORIA: Documentação técnica.', strategy: 'Documentação de controle de qualidade (Teoria).', resources: 'Sala de aula.' },
  { id: 'f28', hours: 4, date: '01/04/2026', capacities: 'Ajustagem manual; Rebarbação; Limagem técnica.', knowledge: 'PRÁTICA: Ajustagem mecânica.', strategy: 'Desafio 1: Ajustagem manual das peças para encaixe.', resources: 'Bancada, Limas.' },
  { id: 'f29', hours: 4, date: '02/04/2026', capacities: 'Inspeção visual; Verificação funcional de conjuntos.', knowledge: 'PRÁTICA: Montagem parcial.', strategy: 'Desafio 1: Pré-montagem e detecção de interferências.', resources: 'Bancada.' },
  { id: 'f30', hours: 4, date: '06/04/2026', capacities: 'Revisão Geral: Torneamento Convencional.', knowledge: 'TEORIA: Revisão Técnica I.', strategy: 'Debate técnico: Soluções para problemas em torneamento.', resources: 'Sala de aula.' },
  { id: 'f31', hours: 4, date: '08/04/2026', capacities: 'Tornear; Chanfrar; Roscar com cossinete.', knowledge: 'PRÁTICA: Reforço de Torno.', strategy: 'Tarefa Reforço: Repetição do Eixo Roscado.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f32', hours: 4, date: '09/04/2026', capacities: 'Fresar; Furação de precisão; Qualidade.', knowledge: 'PRÁTICA: Reforço de Fresa.', strategy: 'Tarefa Reforço: Ajuste de blocos paralelos.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f33', hours: 4, date: '13/04/2026', capacities: 'Revisão Geral: Fresamento e Ajustagem.', knowledge: 'TEORIA: Revisão Técnica II.', strategy: 'Debate técnico: Otimização de tempo no setup de máquinas.', resources: 'Sala de aula.' },
  { id: 'f34', hours: 4, date: '15/04/2026', capacities: 'Prática Supervisionada Avançada (Torneamento).', knowledge: 'PRÁTICA: Refino dimensional.', strategy: 'Desafio 1: Refino dimensional das peças cilíndricas.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f35', hours: 4, date: '16/04/2026', capacities: 'Prática Supervisionada Avançada (Fresamento).', knowledge: 'PRÁTICA: Refino dimensional.', strategy: 'Desafio 1: Refino dimensional do bloco fresado.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f36', hours: 4, date: '22/04/2026', capacities: 'Montagem de conjuntos; Elementos de máquina.', knowledge: 'PRÁTICA: Ajustagem final.', strategy: 'Ajustagem final e montagem Manípulo/Eixo Roscado.', resources: 'Bancada.' },
  { id: 'f37', hours: 4, date: '23/04/2026', capacities: 'Controle da qualidade das peças; Inspeção dimensional.', knowledge: 'PRÁTICA: Avaliação final.', strategy: 'Avaliação dimensional total (Micrômetro).', resources: 'Sala de aula, Micrômetro.' },
  { id: 'f38', hours: 4, date: '25/04/2026', capacities: 'Compensação: Revisão de Metrologia e Desenho Técnico.', knowledge: 'TEORIA: Compensação Letiva.', strategy: 'Aula teórica em dia letivo compensado.', resources: 'Sala de aula.' },
  { id: 'f39', hours: 4, date: '27/04/2026', capacities: 'Manutenção; Segurança do trabalho (NR-12).', knowledge: 'TEORIA: Normas de segurança.', strategy: 'Teoria sobre proteções e dispositivos de emergência.', resources: 'Sala de aula.' },
  { id: 'f40', hours: 4, date: '29/04/2026', capacities: 'Tornear; Facear; Furo de centro (Novas peças).', knowledge: 'PRÁTICA: Peça Auxiliar.', strategy: 'Tarefa Extra: Início de peça auxiliar (Base castanha).', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f41', hours: 4, date: '30/04/2026', capacities: 'Fresar; Rebaixos; Furação (Novas peças).', knowledge: 'PRÁTICA: Peça Auxiliar.', strategy: 'Tarefa Extra: Usinagem de base auxiliar (Fresadora).', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f42', hours: 4, date: '04/05/2026', capacities: 'Parâmetros avançados (Materiais especiais).', knowledge: 'TEORIA: Materiais Técnicos.', strategy: 'Estudo de tabelas para Aço Inox e Bronze (Teoria).', resources: 'Sala de aula.' },
  { id: 'f43', hours: 4, date: '06/05/2026', capacities: 'Tornear cilíndrica; Roscar com cossinete.', knowledge: 'PRÁTICA: Roscagem avançada.', strategy: 'Prática de roscagem em diferentes diâmetros.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f44', hours: 4, date: '07/05/2026', capacities: 'Fresagem de superfícies perpendiculares.', knowledge: 'PRÁTICA: Esquadrejamento fino.', strategy: 'Prática de esquadrejamento de precisão.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f45', hours: 4, date: '11/05/2026', capacities: 'Relatórios de Não Conformidade; Ações corretivas.', knowledge: 'TEORIA: Gestão da Qualidade.', strategy: 'Como documentar erros e recuperar peças (Teoria).', resources: 'Sala de aula.' },
  { id: 'f46', hours: 4, date: '13/05/2026', capacities: 'Cortar no torno (Bedame); Abrir canais.', knowledge: 'PRÁTICA: Sangramento e canais.', strategy: 'Operações de sangramento e canais técnicos.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f47', hours: 4, date: '14/05/2026', capacities: 'Rosquear manual com macho na bancada.', knowledge: 'PRÁTICA: Rosca em furo cego.', strategy: 'Prática intensiva de roscagem em furos cegos.', resources: 'Oficina de usinagem, Bancada.' },
  { id: 'f48', hours: 4, date: '18/05/2026', capacities: 'Elementos de fixação e transmissão (Teoria).', knowledge: 'TEORIA: Chavetas e Estriados.', strategy: 'Estudo sobre chavetas e eixos estriados.', resources: 'Sala de aula.' },
  { id: 'f49', hours: 4, date: '20/05/2026', capacities: 'Ajustagem mecânica: Limagem plana.', knowledge: 'PRÁTICA: Ajustagem ao banco.', strategy: 'Prática de ajustagem ao banco (precisão manual).', resources: 'Bancada, Limas.' },
  { id: 'f50', hours: 4, date: '21/05/2026', capacities: 'Controle dimensional de conjuntos montados.', knowledge: 'PRÁTICA: Testes funcionais.', strategy: 'Testes funcionais e ajustes de interferência.', resources: 'Oficina de usinagem.' },
  { id: 'f51', hours: 4, date: '25/05/2026', capacities: 'Gestão de Ferramental e Almoxarifado técnico.', knowledge: 'TEORIA: Logística de oficina.', strategy: 'Organização e controle de vida útil das ferramentas.', resources: 'Sala de aula.' },
  { id: 'f52', hours: 4, date: '27/05/2026', capacities: 'Torneamento: Prática de acabamento superficial.', knowledge: 'PRÁTICA: Rugosidade.', strategy: 'Foco em rugosidade e brilho no torno.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'f53', hours: 4, date: '28/05/2026', capacities: 'Fresagem: Prática de acabamento (Cabeçote).', knowledge: 'PRÁTICA: Planeza.', strategy: 'Foco em planeza e acabamento superficial.', resources: 'Oficina de usinagem, Fresadora.' },
  { id: 'f54', hours: 4, date: '01/06/2026', capacities: 'Preparação para Avaliação Final (Teoria).', knowledge: 'TEORIA: Revisão Integral.', strategy: 'Revisão integral dos conteúdos dos Prints 1, 2 e 3.', resources: 'Sala de aula.' },
  { id: 'f55', hours: 4, date: '03/06/2026', capacities: 'Balanceamento: Prática de Oficina Final.', knowledge: 'PRÁTICA: Finalização de peças.', strategy: 'Conclusão de peças pendentes do semestre.', resources: 'Oficina de usinagem.' },
  { id: 'f56', hours: 4, date: '08/06/2026', capacities: 'Ética Profissional e Postura no Trabalho.', knowledge: 'TEORIA: Ética e Postura.', strategy: 'Atitudes, responsabilidade e zelo com patrimônio.', resources: 'Sala de aula.' },
  { id: 'f57', hours: 4, date: '10/06/2026', capacities: 'Limpeza Técnica e Conservação.', knowledge: 'PRÁTICA: Manutenção.', strategy: 'Limpeza profunda e lubrificação das máquinas.', resources: 'Oficina de usinagem.' },
  { id: 'f58', hours: 4, date: '11/06/2026', capacities: 'Organização do ambiente (5S).', knowledge: 'PRÁTICA: Metodologia 5S.', strategy: 'Organização de armários e entrega de ferramentas.', resources: 'Oficina de usinagem.' },
  { id: 'f59', hours: 4, date: '17/06/2026', capacities: 'Avaliação Prática: Entrega do Desafio 1 e Eixos.', knowledge: 'PRÁTICA: Avaliação Final Técnica.', strategy: 'Avaliação final técnica das peças produzidas.', resources: 'Oficina de usinagem.' },
  { id: 'f60', hours: 4, date: '18/06/2026', capacities: 'Encerramento Prático e Organização.', knowledge: 'PRÁTICA: Encerramento.', strategy: 'Conferência final de gabaritos e notas de oficina.', resources: 'Oficina de usinagem.' },
  { id: 'f_extra', hours: 0, date: '22/06/2026', capacities: 'Feedback Final e Divulgação de Notas.', knowledge: 'TEORIA: Encerramento Letivo.', strategy: 'Encerramento letivo em sala de aula.', resources: 'Sala de aula.' }
];

export const FULL_CAPACITIES_FUSI = [
  '### Torneamento, Fresagem, Ajustagem',
  '1. Definir os parâmetros de usinagem de torneamento convencional de acordo com as especificações técnicas.',
  '2. Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '3. Realizar operações de torneamento externo e interno conforme desenho técnico.',
  '4. Definir os parâmetros de usinagem de fresagem convencional de acordo com as especificações técnicas.',
  '5. Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '6. Realizar operações de fresagem de superfícies planas e esquadrejamento.',
  '7. Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.',
  '8. Relacionar os processos de fabricação à sua aplicação na indústria.',
  '9. Relacionar os tipos de manutenção à sua aplicação na indústria.',
  '10. Elaborar plano de trabalho de acordo com normas e procedures de meio ambiente, de saúde e segurança no trabalho.',
  '11. Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '12. Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '13. Controlar a qualidade das peças usinadas, visualmente e por meio de instrumentos de acordo com as especificações técnicas.',
  '14. Aplicar os procedimentos de refrigeração nos processos de usinagem convencional.'
];

export const FULL_SOCIOEMOCIONAL_FUSI = [
  'Autogestão: 1. Planejar ações',
  'Autogestão: 2. Organizar o ambiente de trabalho e as atividades',
  'Autogestão: 3. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais',
  'Autogestão: 4. Demonstrar responsabilidade',
  'Pensamento analítico: 5. Demonstrar visão sistêmica'
];

export const FULL_KNOWLEDGE_FUSI = [
  { topic: '1. Elementos de máquina', subtopics: ['1.1. Elementos de fixação: Porcas, Parafusos, Arruelas, Contra pino, Rebites, Pinos, Cavilhas', '1.2. Elementos de transmissão: Chavetas, Engrenagens, Polias, Correias, Acoplamentos, Roscas, Corrente, Eixos, Redutores, Variadores'] },
  { topic: '3. Processos de fabricação', subtopics: ['3.1. Definição', '3.3. Manufatura Subtrativa: Torneamento, Furação, Fresamento'] },
  { topic: '5. Plano de trabalho', subtopics: ['5.1. Definição', '5.2. Tipos', '5.3. Características'] },
  { topic: '8. Parâmetros de corte', subtopics: ['8.1. Cálculos: RPM, Vc, f, ap'] },
  { topic: '10. Torneamento', subtopics: ['10.1. Definição', '10.2. Tipos de tornos', '10.3. Ferramentas', '10.4. Acessórios', '10.5. Cálculos técnicos'] },
  { topic: '11. Fresagem', subtopics: ['11.1. Definição', '11.2. Tipos de fresadora', '11.3. Ferramentas', '11.4. Acessórios'] },
  { topic: '15. Controle da qualidade', subtopics: ['15.1. Inspeção visual', '15.2. Inspeção dimensional'] }
];

export const COMMON_SA_FUSI = [
  {
    id: 'sa-fusi-torneamento',
    title: 'Operação de Protótipos: Usinagem de Componentes para Transmissão Mecânica',
    context: 'A "AgroMaq Industrial", empresa especializada na fabricação de pequenos implementos agrícolas, enfrenta um problema crítico: a linha de produção de um de seus pulverizadores está parada devido à falta de um subconjunto de ajuste mecânico. O fornecedor original das peças (eixos, manípulos e luvas) encerrou suas atividades, e a compra de um novo lote de um fornecedor alternativo levaria semanas, causando prejuízos significativos. Para solucionar o problema de forma rápida e eficiente, a gerência decidiu internalizar a produção desses componentes. O deparamento de engenharia disponibilizou os desenhos técnicos do conjunto e solicitou ao setor de usinagem a fabricação de um lote piloto para validação.\nVocês, como a equipe de operadores de máquinas da "AgroMaq", receberam a missão de produzir as primeiras unidades deste conjunto. A tarefa exige não apenas habilidade na operação das máquinas, mas também a capacidade de interpretar os desenhos, calcular os parâmetros de corte corretos, executar as operações de torneamento, furação e rosqueamento com precisão, e garantir a qualidade final para que as peças possam ser montadas e funcionem perfeitamente.',
    challenge: 'Com base nos desenhos técnicos fornecidos e no material bruto, a equipe deverá executar um projeto completo de usinagem, focando nas operações de torneamento, para fabricar os componentes:\na) Planejar e Calcular: Para cada peça a ser usinada (Eixo cilíndrico de quatro corpos, Eixo cilíndrico com canais, Eixo roscado, Manípulo, Eixo calibrado e Luva com dois corpos internos), a equipe deverá calcular e registrar os parâmetros de corte essenciais (Velocidade de Corte, RPM, avanço) para cada operação (facear, tornear, chanfrar, furar, roscar), considerando as ferramentas e o material especificados.\nb) Executar e Controlar: Utilizando o torno mecânico convencional e a furadeira de bancada, a equipe deverá usinar as peças seguindo a sequência operacional planejada. Durante todo o processo, será necessário aplicar corretamente o fluido de refrigeração, zelar pela organização e segurança do ambiente, e realizar o controle dimensional contínuo com paquímetro e micrômetro, preenchendo uma ficha de autoinspeção. As operações incluem:\n• No torno: faceamento, torneamento de múltiplos diâmetros, furação de centro, furação com broca helicoidal, corte de canais e rosqueamento com cossinete.\n• Na furadeira/bancada: furação e rosqueamento manual com macho para o "Manípulo".\nc) Montar e Validar: Ao final da usinagem, a equipe deverá realizar a montagem do "Manípulo" no "Eixo roscado" para comprovar a funcionalidade e a precisão do conjunto roscado, demonstrando uma visão sistêmica do processo produtivo.',
    expectedResults: [
      'Ao final desta Situação de Aprendizagem, a equipe de alunos deverá entregar:',
      'a) Peças Usinadas: Os componentes "Eixo cilíndrico de quatro corpos", "Eixo roscado" e "Manípulo" finalizados, limpos, sem rebarbas e em total conformidade com as dimensões, tolerâncias e acabamentos especificados nos desenhos técnicos.',
      'b) Ficha de Processo e Controle de Qualidade: Um documento para cada peça, preenchido com os parâmetros de corte calculados, a sequência de operações executadas e os valores medidos durante a autoinspeção dimensional.',
      'c) Conjunto Funcional Montado: A demonstração da montagem bem-sucedida do "Manípulo" no "Eixo roscado", evidenciando que as peças foram fabricadas corretamente e são intercambiáveis.'
    ]
  }
];

export const FULL_RUBRICS_FUSI = [
  { capacity: 'Realizar operações de baixa complexidade em torno convencional.', nsa: 'Não consegue executar as operações básicas no torno de forma satisfatória ou segura, mesmo com apoio e demonstrações constantes.', apo: 'Tenta operar a máquina, mas demonstra insegurança e comete erros frequentes de posicionamento e avanço, necessitando de intervenção constante.', par: 'Opera o torno e executa as operações, mas precisa de orientação pontual do docente para corrigir a técnica, ajustar a máquina ou atingir a tolerância.', aut: 'Opera o torno com autonomia e segurança, executando todas as operações (facear, tornear, chanfrar, furar) com precisão dimensional e bom acabamento.' },
  { capacity: 'Controlar a qualidade das peças usinadas (Torneamento).', nsa: 'Não consegue realizar as medições de forma correta ou preencher a ficha de controle, mesmo com o apoio direto do docente.', apo: 'Tenta realizar as medições, mas demonstra dificuldade na leitura dos instrumentos e no preenchimento da ficha, exigindo acompanhamento constante.', par: 'Realiza o controle dimensional, mas necessita de auxílio pontual para manusear o micrômetro ou para interpretar alguma tolerância especificada.', aut: 'Realiza o controle dimensional com autonomia, utilizando corretamente paquímetro e micrômetro, e preenche a ficha de autoinspeção de forma completa e precisa.' },
  { capacity: 'Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais.', nsa: 'Danifica ferramentas ou instrumentos por mau uso ou não demonstra qualquer cuidado com os recursos da oficina, mesmo após repetidas orientações.', apo: 'Manuseia os equipamentos de forma descuidada, deixando ferramentas em locais inadequados ou não realizando a limpeza, necessitando de intervenção constante.', par: 'Manuseia os equipamentos de forma adequada na maior parte do tempo, mas requer lembretes pontuais sobre a limpeza ou guarda de algum item.', aut: 'Manuseia todos os equipamentos, ferramentas e instrumentos com o máximo cuidado, limpando-os e guardando-os corretamente por iniciativa própria.' },
  { capacity: 'Demonstrar visão sistêmica.', nsa: 'Não consegue compreender a relação entre as peças ou a importância da sua tarefa para o product final, mesmo com o conjunto montado para análise.', apo: 'Foca apenas na execução da sua peça, demonstrando dificuldade em entender como ela irá interagir com as outras, necessitando de explicações constantes.', par: 'Compreende que as peças se montarão, mas precisa de questionamentos para relacionar a precisão dimensional com a funcionalidade do conjunto.', aut: 'Compreende e explica como a precisão de cada peça individual afeta a montagem e o funcionamento final do subconjunto, propondo melhorias no processo.' }
];

export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: 'plan-usinagem-beretella',
    profileId: 'beretella',
    courseName: 'SMO - Mecânico de Usinagem Convencional',
    modality: 'Presencial',
    totalHours: 400,
    objective: 'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.',
    methodology: 'Metodologia SENAI de Educação Profissional (MSEP). Uso de situações de aprendizagem realistas através do Cronograma Integradror.',
    evaluation: 'Contínua baseada em rubricas de desempenho e qualidade das peças usinadas.',
    bibliography: 'Guia de Aprendizagem Profissional SENAI: Fresamento e Torneamento. NBR 10067, NBR 8403, VIM.',
    createdAt: new Date().toISOString(),
    units: [
      {
        id: 'uc-lidt-beretella',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-15', markings: [] },
        basicCapacities: ['Interpretar desenhos técnicos', 'Elaborar croquis', 'Interpretar tolerâncias'],
        socioemocionalCapacities: ['Atenção a detalhes', 'Senso crítico'],
        knowledge: [{ topic: '1. Desenho técnico', subtopics: ['1.1 Normas', '1.4 Linhas', '1.5 Escalas'] }],
        learningSituations: [],
        rubrics: [],
        schedule: LIDT_SCHEDULE
      },
      {
        id: 'uc-crd-beretella',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: ['Medir com paquímetro', 'Medir com micrômetro'],
        socioemocionalCapacities: ['Organização'],
        knowledge: [{ topic: '1. Metrologia', subtopics: ['VIM', 'Erros'] }],
        learningSituations: [],
        rubrics: [],
        schedule: CRD_SCHEDULE
      },
      {
        id: 'uc-fusi-beretella',
        name: 'FUNDAMENTOS DA USINAGEM',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-22', markings: [] },
        basicCapacities: FULL_CAPACITIES_FUSI,
        socioemocionalCapacities: FULL_SOCIOEMOCIONAL_FUSI,
        knowledge: FULL_KNOWLEDGE_FUSI,
        learningSituations: COMMON_SA_FUSI,
        rubrics: FULL_RUBRICS_FUSI,
        schedule: FUSI_SCHEDULE
      }
    ]
  }
];
