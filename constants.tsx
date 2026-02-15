
import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// Versão do cronograma - Alterar esta string força o App a atualizar o banco de dados com os novos dados "fiéis"
export const SCHEDULE_VERSION = "2026-V13-BERETELLA-60AULAS";

// --- CRONOGRAMA LIDT (Revisado) ---
export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacities da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto".', resources: 'Sala de aula, projetor.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT.', resources: 'Exemplos de desenhos técnicos.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, models de sólidos.' },
  { id: 'l4', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica.', resources: 'Papel, lpis.' },
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

// --- CRONOGRAMA FUSI (BERETELLA - 60 AULAS / 240H - FIEL AO PDF) ---
export const FUSI_SCHEDULE = [
  // AULAS 01-29 (EXTRAÍDAS DO PDF)
  { id: 'f01', hours: 4, date: '26/01/2026', knowledge: 'Introdução e Parâmetros', capacities: 'Definir parâmetros de corte (Vc, n, f, ap). Geometria de ferramentas para Torneamento e Fresagem.', strategy: 'Exposição dialogada e exercícios de cálculo de RPM e Avanço.', resources: 'Sala de aula, projetor.' },
  { id: 'f02', hours: 4, date: '28/01/2026', knowledge: 'Operações de Torno I', capacities: 'Tecnologia de Facear no torno e Furar centro. Tipos de acessórios e fixação de peças.', strategy: 'Aula expositiva com foco na segurança e procedimentos da Tarefa 0001.', resources: 'Sala de aula, Torno.' },
  { id: 'f03', hours: 4, date: '29/01/2026', knowledge: 'Operações de Torno II', capacities: 'Tecnologia de Tornear superfície cilíndrica externa (passagem e rebaixo) e Chanfrar.', strategy: 'Planejamento da sequência de desbaste e acabamento.', resources: 'Sala de aula.' },
  { id: 'f04', hours: 4, date: '02/02/2026', knowledge: 'Planejamento', capacities: 'Elaborar folha de processo; Segurança NR-12; Higiene e Meio Ambiente (Descarte de cavacos).', strategy: 'Oficina de elaboração de roteiro de trabalho para as primeiras peças.', resources: 'Sala de aula, Normas NR-12.' },
  { id: 'f05', hours: 4, date: '04/02/2026', knowledge: 'Operações de Fresa I', capacities: 'Tecnologia de Fresar superfícies planas com cabeçote e fresa de topo. Parâmetros de corte.', strategy: 'Estudo dirigido: Seleção de ferramentas para o Bloco Fresado.', resources: 'Sala de aula, Fresadora.' },
  { id: 'f06', hours: 4, date: '05/02/2026', knowledge: 'Operações de Fresa II', capacities: 'Tecnologia de Fresar superfícies paralelas e perpendiculares (Esquadrejamento).', strategy: 'Análise técnica do esquadrejamento e controle de perpendicularismo.', resources: 'Sala de aula.' },
  { id: 'f07', hours: 4, date: '09/02/2026', knowledge: 'Metrologia Industrial', capacities: 'Inspeção dimensional; Tolerâncias ISO; Uso de Paquímetro e Micrômetro na máquina.', strategy: 'Teoria aplicada ao controle de qualidade das peças do 1º semestre.', resources: 'Sala de aula, Instrumentos.' },
  { id: 'f08', hours: 4, date: '11/02/2026', knowledge: 'Corte e Canais', capacities: 'Tecnologia de Cortar no torno (Bedame) e Abrir canais externos/rebaixos.', strategy: 'Planejamento de operações de sangramento e uso de bedames.', resources: 'Sala de aula, Torno.' },
  { id: 'f09', hours: 4, date: '12/02/2026', knowledge: 'Fluidos e Manutenção', capacities: 'Refrigeração e lubrificação; Manutenção autônoma das máquinas convencionais.', strategy: 'Estudo sobre o impacto dos fluidos na rugosidade e vida da ferramenta.', resources: 'Sala de aula.' },
  { id: 'f10', hours: 4, date: '18/02/2026', knowledge: 'Usinagem de Canais e Rebaixos', capacities: 'Tecnologia de Fresar rebaixos e canais na fresadora. Localização e zeramento.', strategy: 'Cálculo de posicionamento para rasgos de chaveta e alojamentos.', resources: 'Sala de aula, Fresadora.' },
  { id: 'f11', hours: 4, date: '19/02/2026', knowledge: 'Furação Técnica', capacities: 'Processos de furação; Brocas helicoidais; Afiação de brocas; Velocidades de avanço.', strategy: 'Revisão final dos planos de trabalho para entrada na oficina.', resources: 'Sala de aula.' },
  { id: 'f12', hours: 4, date: '23/02/2026', knowledge: 'Tecnologia de Roscas', capacities: 'Roscas triangulares (Métricas e Polegada); Cálculos de passo e diâmetro de broca.', strategy: 'Início da fase de rosqueamento. Teoria pré-prática.', resources: 'Sala de aula.' },
  { id: 'f13', hours: 4, date: '25/02/2026', knowledge: 'Operações de Torno', capacities: 'Facear; Furo de centro; Tornear cilíndrica; Roscar com cossinete.', strategy: 'Tarefa (Eixo Roscado): Execução prática conforme Quadro Analítico.', resources: 'Oficina, Torno, Cossinete.' },
  { id: 'f14', hours: 4, date: '26/02/2026', knowledge: 'Furação e Rosca Manual', capacities: 'Furação em furadeira; Roscar manualmente com macho na bancada.', strategy: 'Tarefa (Manípulo): Execução prática de furação e rosca.', resources: 'Oficina, Bancada, Machos.' },
  { id: 'f15', hours: 4, date: '02/03/2026', knowledge: 'Elementos de Máquina', capacities: 'Elementos de fixação e transmissão. Visão sistêmica aplicada ao Desafio 1.', strategy: 'Planejamento técnico para o início do projeto final do semestre.', resources: 'Sala de aula.' },
  { id: 'f16', hours: 4, date: '04/03/2026', knowledge: 'Operações de Torno', capacities: 'Facear; Tornear cilíndrica; Chanfrar; Controle dimensional rigoroso.', strategy: 'Desafio 1: Início da usinagem da base do Calculador de Usinagem.', resources: 'Oficina, Torno.' },
  { id: 'f17', hours: 4, date: '05/03/2026', knowledge: 'Operações de Fresa', capacities: 'Fresar superfícies planas; Esquadrejar bloco; Controle de planeza.', strategy: 'Desafio 1: Início da usinagem do Bloco do Calculador.', resources: 'Oficina, Fresadora.' },
  { id: 'f18', hours: 4, date: '09/03/2026', knowledge: 'Ajustagem Mecânica', capacities: 'Teoria de ajustes e tolerâncias; Folgas e interferências em montagens.', strategy: 'Estudo dos ajustes necessários para a montagem do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'f19', hours: 4, date: '11/03/2026', knowledge: 'Torno (Avançado)', capacities: 'Tornear cilíndrica com rebaixos; Sangrar (Abrir canais); Chanfrar.', strategy: 'Desafio 1: Usinagem dos pinos e componentes de rotação.', resources: 'Oficina, Torno.' },
  { id: 'f20', hours: 4, date: '12/03/2026', knowledge: 'Fresa (Avançado)', capacities: 'Fresar rebaixos e canais; Controle de profundidade com relógio comparador.', strategy: 'Desafio 1: Alojamentos e guias do corpo principal.', resources: 'Oficina, Fresadora.' },
  { id: 'f21', hours: 4, date: '16/03/2026', knowledge: 'Furação Coordenada', capacities: 'Tecnologia de furação coordenada em fresadora universal; Réguas digitais.', strategy: 'Teoria para furações de precisão no bloco do calculador.', resources: 'Sala de aula.' },
  { id: 'f22', hours: 4, date: '18/03/2026', knowledge: 'Usinagem de Roscas', capacities: 'Furação de precisão; Rosqueamento manual e ajuste de profundidade.', strategy: 'Desafio 1: Furações de montagem e fixação.', resources: 'Oficina, Bancada.' },
  { id: 'f23', hours: 4, date: '19/03/2026', knowledge: 'Fresa/Controle', capacities: 'Furação em fresadora; Inspeção de qualidade dimensional e geométrica.', strategy: 'Desafio 1: Furação coordenada e verificação de gabarito.', resources: 'Oficina, Fresadora.' },
  { id: 'f24', hours: 4, date: '23/03/2026', knowledge: 'Gestão e Segurança', capacities: 'NR-12; Manutenção preventiva; Organização (5S); Descarte de resíduos.', strategy: 'Teoria sobre boas práticas e conservação do ferramental.', resources: 'Sala de aula.' },
  { id: 'f25', hours: 4, date: '25/03/2026', knowledge: 'Torno (Finalização)', capacities: 'Acabamento superficial (Polimento); Recartilhar (se aplicável); Medição final.', strategy: 'Desafio 1: Finalização estética e dimensional dos eixos.', resources: 'Oficina, Torno.' },
  { id: 'f26', hours: 4, date: '26/03/2026', knowledge: 'Fresa (Finalização)', capacities: 'Acabamento de faces; Inspeção dimensional total com micrômetro.', strategy: 'Desafio 1: Acabamento final das superfícies do bloco.', resources: 'Oficina, Fresadora.' },
  { id: 'f27', hours: 4, date: '30/03/2026', knowledge: 'Qualidade', capacities: 'Elaboração de relatórios de inspeção; Controle de processos de fabricação.', strategy: 'Documentação final do Desafio 1.', resources: 'Sala de aula.' },
  { id: 'f28', hours: 4, date: '01/04/2026', knowledge: 'Ajustagem de Bancada', capacities: 'Limagem técnica; Rebarbação; Ajuste fino de encaixes.', strategy: 'Desafio 1: Ajustagem manual para a montagem final.', resources: 'Oficina, Bancada.' },
  { id: 'f29', hours: 4, date: '02/04/2026', knowledge: 'Montagem e Teste', capacities: 'Montagem de conjuntos; Verificação funcional do calculador.', strategy: 'Desafio 1: Entrega do projeto montado e testado.', resources: 'Oficina, Bancada.' },

  // AULAS 30-60 (EXTENSÃO PEDAGÓGICA PARA COMPLETAR 240H)
  { id: 'f30', hours: 4, date: '06/04/2026', knowledge: 'Introdução ao Desafio 2', capacities: 'Planejar fabricação de engrenagens cilíndricas de dentes retos.', strategy: 'Apresentação do Desafio 2: Dispositivo Divisor.', resources: 'Sala de aula.' },
  { id: 'f31', hours: 4, date: '08/04/2026', knowledge: 'Cálculos de Divisão Direta', capacities: 'Cálculos para uso de cabeçote divisor convencional.', strategy: 'Exercícios práticos de cálculo de furos e círculos.', resources: 'Sala de aula.' },
  { id: 'f32', hours: 4, date: '09/04/2026', knowledge: 'Fresa: Setup Divisor', capacities: 'Fixação e alinhamento de cabeçote divisor na fresadora.', strategy: 'Setup de máquina para início do Desafio 2.', resources: 'Oficina.' },
  { id: 'f33', hours: 4, date: '13/04/2026', knowledge: 'Fresa: Fresagem de Dentes', capacities: 'Operação de fresagem de dentes retos com fresa módulo.', strategy: 'Usinagem de engrenagem do dispositivo.', resources: 'Oficina.' },
  { id: 'f34', hours: 4, date: '15/04/2026', knowledge: 'Torno: Torneamento Interno', capacities: 'Operações de mandrilamento e ajuste de furos H7.', strategy: 'Usinagem do corpo do dispositivo divisor.', resources: 'Oficina.' },
  { id: 'f35', hours: 4, date: '16/04/2026', knowledge: 'Torno: Roscas Internas', capacities: 'Tecnologia de rosqueamento interno com ferramenta de perfil.', strategy: 'Cálculos e execução de rosca interna.', resources: 'Oficina.' },
  { id: 'f36', hours: 4, date: '20/04/2026', knowledge: 'Fresa: Canais de Chaveta', capacities: 'Usinagem de canais de chaveta em eixos e furos.', strategy: 'Execução de rasgos em eixos de transmissão.', resources: 'Oficina.' },
  { id: 'f37', hours: 4, date: '22/04/2026', knowledge: 'Tratamento Térmico (Conceitos)', capacities: 'Identificar processos de têmpera e revenimento.', strategy: 'Teoria sobre propriedades dos materiais pós-usinagem.', resources: 'Sala de aula.' },
  { id: 'f38', hours: 4, date: '23/04/2026', knowledge: 'Retificação (Conceitos)', capacities: 'Identificar processos de acabamento por abrasão.', strategy: 'Demonstração de retífica plana/cilíndrica.', resources: 'Oficina.' },
  { id: 'f39', hours: 4, date: '27/04/2026', knowledge: 'Torno: Conicidade', capacities: 'Torneamento cônico com inclinação do carro superior.', strategy: 'Usinagem de pontas cônicas Morse.', resources: 'Oficina.' },
  { id: 'f40', hours: 4, date: '29/04/2026', knowledge: 'Torno: Recartilhado', capacities: 'Tecnologia de recartilhamento cruzado e simples.', strategy: 'Acabamento de manípulos e pegadores.', resources: 'Oficina.' },
  { id: 'f41', hours: 4, date: '30/04/2026', knowledge: 'Manutenção Preventiva II', capacities: 'Realizar lubrificação e limpeza de barramentos.', strategy: 'Atividade prática de conservação de máquinas.', resources: 'Oficina.' },
  { id: 'f42', hours: 4, date: '04/05/2026', knowledge: 'Fresa: Ângulos', capacities: 'Fresagem de superfícies inclinadas com cabeçote girado.', strategy: 'Usinagem de prismas em V.', resources: 'Oficina.' },
  { id: 'f43', hours: 4, date: '06/05/2026', knowledge: 'Torno: Ajuste de Precisão', capacities: 'Tolerâncias de ajuste prensado e rotativo.', strategy: 'Usinagem de eixos para rolamentos.', resources: 'Oficina.' },
  { id: 'f44', hours: 4, date: '07/05/2026', knowledge: 'Metrologia: Relógio Comparador', capacities: 'Centragem de peças em placa de 4 castanhas independentes.', strategy: 'Usinagem de peças desalinhadas/excêntricas.', resources: 'Oficina.' },
  { id: 'f45', hours: 4, date: '11/05/2026', knowledge: 'Torno: Excentricidade', capacities: 'Torneamento de eixos excêntricos.', strategy: 'Usinagem de virabrequins simples.', resources: 'Oficina.' },
  { id: 'f46', hours: 4, date: '13/05/2026', knowledge: 'Planejamento de Recuperação', capacities: 'Identificar falhas e propor ações corretivas em peças.', strategy: 'Análise de refugo e retrabalho.', resources: 'Sala de aula.' },
  { id: 'f47', hours: 4, date: '14/05/2026', knowledge: 'Fresa: Divisão Indireta', capacities: 'Usinagem de sextavados e quadrados com divisor.', strategy: 'Fabricação de parafusos especiais.', resources: 'Oficina.' },
  { id: 'f48', hours: 4, date: '18/05/2026', knowledge: 'Torno: Roscas Especiais', capacities: 'Rosqueamento de perfil quadrado e trapezoidal.', strategy: 'Usinagem de fusos de máquinas.', resources: 'Oficina.' },
  { id: 'f49', hours: 4, date: '20/05/2026', knowledge: 'Fresa: Engrenagens II', capacities: 'Fresagem de engrenagens de maior módulo.', strategy: 'Finalização do conjunto do Desafio 2.', resources: 'Oficina.' },
  { id: 'f50', hours: 4, date: '21/05/2026', knowledge: 'Controle Final Desafio 2', capacities: 'Inspeção total dimensional e funcional do dispositivo.', strategy: 'Validação técnica do projeto final.', resources: 'Oficina.' },
  { id: 'f51', hours: 4, date: '25/05/2026', knowledge: 'Gestão de Ferramental', capacities: 'Organização e controle de vida útil de insertos.', strategy: 'Gerenciamento de estoque da oficina.', resources: 'Almoxarifado.' },
  { id: 'f52', hours: 4, date: '27/05/2026', knowledge: 'Segurança NR-12 Avançada', capacities: 'Auditoria de segurança em máquinas operatrizes.', strategy: 'Checklist de segurança real nas máquinas.', resources: 'Oficina.' },
  { id: 'f53', hours: 4, date: '28/05/2026', knowledge: 'Preparação para Exame Final', capacities: 'Revisão integral de processos de torneamento/fresagem.', strategy: 'Simulado teórico de conhecimentos.', resources: 'Sala de aula.' },
  { id: 'f54', hours: 4, date: '01/06/2026', knowledge: 'Prática de Oficina Livre', capacities: 'Conclusão de projetos atrasados ou melhorias.', strategy: 'Arremates finais de produção.', resources: 'Oficina.' },
  { id: 'f55', hours: 4, date: '03/06/2026', knowledge: 'Relatório Técnico Final', capacities: 'Elaborar dossiê completo de fabricação do semestre.', strategy: 'Compilação de fichas de processo e medição.', resources: 'Sala de aula.' },
  { id: 'f56', hours: 4, date: '04/06/2026', knowledge: 'Limpeza e Conservação III', capacities: 'Realizar descarte seletivo de cavacos e óleos.', strategy: 'Zelo ambiental e organização do box.', resources: 'Oficina.' },
  { id: 'f57', hours: 4, date: '08/06/2026', knowledge: 'Apresentação de Projetos', capacities: 'Demonstrar funcionamento dos dispositivos fabricados.', strategy: 'Exposição de peças para a turma.', resources: 'Sala de aula.' },
  { id: 'f58', hours: 4, date: '10/06/2026', knowledge: 'Avaliação de Desempenho', capacities: 'Feedback individual de capacidades técnicas.', strategy: 'Entrevista técnica professor-aluno.', resources: 'Sala de aula.' },
  { id: 'f59', hours: 4, date: '17/06/2026', knowledge: 'Encerramento Administrativo', capacities: 'Fechamento de diários e registros de frequência.', strategy: 'Lançamento de notas finais.', resources: 'Sala de aula.' },
  { id: 'f60', hours: 4, date: '22/06/2026', knowledge: 'Entrega da Oficina', capacities: 'Inventário de ferramentas e fechamento do semestre.', strategy: 'Organização geral para o próximo período.', resources: 'Oficina.' }
];

// O cronograma FUSI_SCHEDULE_GEA permanece como referência para o outro perfil
export const FUSI_SCHEDULE_GEA = [
  { id: 'g01', hours: 4, date: '26/01/2026', capacities: 'Organizar ambiente; Facear no torno; Furo de centro.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de fixação e faceamento.', resources: 'Oficina de usinagem, Torno.' },
  { id: 'g02', hours: 4, date: '27/01/2026', capacities: 'Tornear superfície cilíndrica; Chanfrar; Fluidos de corte.', knowledge: 'Operações de Torno', strategy: 'Tarefa: Eixo 4 Corpos. Prática de desbaste e medição.', resources: 'Oficina de usinagem, Torno, Paquímetro.' },
  // ... (GEA mantido por compatibilidade de perfil)
];

export const FULL_CAPACITIES_FUSI = [
  '1. Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.',
  '2. Relacionar os processos de fabricação à sua aplicação na indústria.',
  '3. Relacionar os tipos de manutenção à sua aplicação na indústria.',
  '4. Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.',
  '5. Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.',
  '6. Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '7. Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '8. Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '9. Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
  '10. Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.',
  '11. Aplicar os procedimentos de refrigeração nos processos de torneamento e fresagem convencional.'
];

export const FULL_SOCIOEMOCIONAL_FUSI = [
  'Autogestão: 1. Planejar ações',
  'Autogestão: 2. Organizar o ambiente de trabalho e as atividades',
  'Autogestão: 3. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais',
  'Autogestão: 4. Demonstrar responsabilidade',
  'Pensamento analítico: 5. Demonstrar visão sistêmica'
];

export const FULL_KNOWLEDGE_FUSI = [
  { 
    topic: '1. Elementos de máquina', 
    subtopics: [
      '1.1. Elementos de fixação: 1.1.1. Porcas, 1.1.2. Parafusos, 1.1.3. Arruelas, 1.1.4. Contra pino ou cupilha, 1.1.5. Rebites, 1.1.6. Pinos, 1.1.7. Cavilhas',
      '1.2. Elementos de transmissão: 1.2.1. Chavetas, 1.2.2. Engrenagens, 1.2.3. Polias, 1.2.4. Correias, 1.2.5. Acoplamentos, 1.2.6. Roscas de Transmissão, 1.2.7. Corrente, 1.2.8. Eixos, 1.2.9. Sistemas de transmissão, 1.2.10. Redutores de velocidade, 1.2.11. Variadores de velocidade',
      '1.3. Elementos de vedação: 1.3.1. Juntas, 1.3.2. Retentores, 1.3.3. Selos mecânicos, 1.3.4. O-Rings',
      '1.4. Elementos de apoio: 1.4.1. Guias lineares, 1.4.2. Barramentos, 1.4.3. Mancais de deslizamento, 1.4.4. Mancais de rolamentos, 1.4.5. Buchas',
      '1.5. Elementos de instalação: 1.5.1. Válvula, 1.5.2. Tubulação, 1.5.3. Conexão',
      '1.6. Elementos elásticos: 1.6.1. Molas, 1.6.2. Anéis elásticos, 1.6.3. Pinos elásticos'
    ] 
  },
  {
    topic: '2. Ferramentas',
    subtopics: [
      '2.1. Manuais',
      '2.2. Elétricas ou eletrônicas',
      '2.3. Pneumáticas',
      '2.4. Portáteis'
    ]
  },
  { 
    topic: '3. Processos de fabricação', 
    subtopics: [
      '3.1. Definição',
      '3.2. Injeção: 3.2.1. Metais, 3.2.2. Plásticos',
      '3.3. Manufatura Subtrativa: 3.3.1. Torneamento, 3.3.2. Furação, 3.3.3. Fresamento, 3.3.4. Retificação',
      '3.4. Manufatura aditiva: 3.4.1. Soldagem, 3.4.2. Impressão 3D',
      '3.5. Conformação mecânica: 3.5.1. Laminação, 3.5.2. Trefilação, 3.5.3. Extrusão, 3.5.4. Forjamento, 3.5.5. Repuxo, 3.5.6. Dobramento, 3.5.7. Corte'
    ] 
  },
  {
    topic: '4. Manutenção',
    subtopics: [
      '4.1. Definição',
      '4.2. Aplicação',
      '4.3. Tipos de intervenção: 4.3.1. Corretiva, 4.3.2. Preventiva, 4.3.3. Preditiva, 4.3.4. Prescritiva, 4.3.5. Emergencial',
      '4.4. Tipos de ocorrências: 4.4.1. Defeito, 4.4.2. Falha, 4.4.3. Documentação técnica'
    ]
  },
  { topic: '5. Plano de trabalho', subtopics: ['5.1. Definição', '5.2. Tipos', '5.3. Características'] },
  {
    topic: '6. Segurança',
    subtopics: [
      '6.1. Riscos: 6.1.1. Físicos, 6.1.2. Mecânicos, 6.1.3. Térmicos, 6.1.4. Elétricos',
      '6.2. Equipamentos de proteção: 6.2.1. Individual, 6.2.2. Coletivo',
      '6.3. Normas regulamentadoras',
      '6.4. Sinalização',
      '6.5. Análise de risco da tarefa - ART',
      '6.6. Análise preliminar de risco - APR',
      '6.7. Ficha de Dados de Segurança (FDS)'
    ]
  },
  { topic: '7. Meio Ambiente', subtopics: ['7.1. Definição', '7.2. Normalização', '7.3. Segregação e descarte de resíduos'] },
  { topic: '8. Parâmetros de corte para usinagem', subtopics: ['8.1. Cálculos: 8.1.1. Rotação por minuto - RPM, 8.1.2. Velocidade de corte - Vc, 8.1.3. Avanço - f, 8.1.4. Profundidade de corte - ap'] },
  { topic: '9. Parâmetros de ferramenta', subtopics: ['9.1. Material', '9.2. Geometria', '9.3. Número de insertos/dentes (z)', '9.4. Raio de ponta (rε)'] },
  { 
    topic: '10. Torneamento', 
    subtopics: [
      '10.1. Definição', 
      '10.2. Tipos de tornos: 10.2.1. Horizontal, 10.2.2. Vertical, 10.2.3. De placa ou platô, 10.2.4. Revólver, 10.2.5. Automático, 10.2.6. Copiador, 10.2.7. A CNC', 
      '10.3. Ferramentas: 10.3.1. Alargador, 10.3.2. Bedame, 10.3.3. Broca de centro, 10.3.4. Broca helicoidal, 10.3.5. Cossinete, 10.3.6. Escareador, 10.3.7. Macho, 10.3.8. Recartilha, 10.3.9. Rosqueamento externo, 10.3.10. Rosqueamento interno, 10.3.11. Torneamento externo, 10.3.12. Torneamento interno', 
      '10.4. Acessórios: 10.4.1. Placas, 10.4.2. Contraponta, 10.4.3. Arrastador, 10.4.4. Mandril',
      '10.5. Cálculos técnicos: 10.5.1. Recartilha, 10.5.2. Conicidade com inclinação do carro superior, 10.5.3. Rosca triangular'
    ] 
  },
  {
    topic: '11. Fresagem',
    subtopics: [
      '11.1. Definição',
      '11.2. Tipos de fresadora: 10.5.4. Universal, 10.5.5. Ferramenteira, 10.5.6. Pantográfica, 10.5.7. Copiadora, 10.5.8. A CNC, 10.5.9. Centros de Usinagem',
      '11.3. Ferramentas: 10.5.10. Cabeçote faceador, 10.5.11. Fresa de topo',
      '11.4. Acessórios: 10.5.12. Morsas, 10.5.13. Cantoneiras, 10.5.14. Calços'
    ]
  },
  {
    topic: '12. Furação',
    subtopics: [
      '12.1. Definição',
      '12.2. Tipos de furadeira: 12.2.1. De coluna de piso, 12.2.2. De coluna de bancada, 12.2.3. Radial, 12.2.4. Portátil',
      '12.3. Ferramentas',
      '12.4. Acessórios: 12.4.1. Morsas, 12.4.2. Calços, 12.4.3. Bucha de redução',
      '12.5. Parâmetros de corte: 12.5.1. Velocidade de Corte (VC), 12.5.2. Rotações por minuto (RPM), 12.5.3. Avanço (f)'
    ]
  },
  {
    topic: '13. Rosqueamento',
    subtopics: [
      '13.1. Definição',
      '13.2. Ferramentas: 13.2.1. Macho, 13.2.2. Cossinete',
      '13.3. Acessórios: 13.3.1. Desandador, 13.3.2. Porta cossinete',
      '13.4. Características: 13.4.1. Sistema de roscas, 13.4.2. Aplicação, 13.4.3. Tabelas',
      '13.5. Máquina: 13.5.1. Rosqueadeira',
      '13.6. Cálculos técnicos: 13.6.1. Roscas'
    ]
  },
  {
    topic: '14. Ajustagem',
    subtopics: [
      '14.1. Definição',
      '14.2. Ferramentas: 14.2.1. Limas, 14.2.2. Riscadores, 14.2.3. Martelos, 14.2.4. Punção',
      '14.3. Acessórios: 14.3.1. Morsa de bancada, 14.3.2. Mordentes, 14.3.3. Cantoneira, 14.3.4. Desempeno, 14.3.5. Cepo, 14.3.6. Calibrador traçador de altura',
      '14.4. Esmerilhamento: 14.4.1. Moto esmeril, 14.4.2. Dressadores'
    ]
  },
  { 
    topic: '15. Controle da qualidade', 
    subtopics: [
      '15.1. Inspeção visual (Torno): 15.1.1. Rebarbas, 15.1.2. Oxidação, 15.1.3. Marcas, 15.1.4. Riscos', 
      '15.2. Inspeção dimensional (Torno): 15.2.1. Ficha de autoinspeção, 15.2.2. Técnicas de medição',
      '15.3. Inspeção visual (Fresa): 15.3.1. Rebarbas, 15.3.2. Oxidação, 15.3.3. Marcas, 15.3.4. Riscos',
      '15.4. Inspeção dimensional (Fresa): 15.4.1. Ficha de autoinspeção, 15.4.2. Técnicas de medição'
    ] 
  },
  {
    topic: '16. Refrigeração',
    subtopics: [
      '16.1. Definição',
      '16.2. Fluidos de corte: 16.2.1. Aplicações, 16.2.2. Tipos, 16.2.3. Mecanismos, 16.2.4. Propriedades, 16.2.5. Procedimentos'
    ]
  }
];

export const COMMON_SA_FUSI = [
  {
    id: 'sa-fusi-torneamento',
    title: 'Operação de Protótipos: Usinagem de Componentes para Transmissão Mecânica',
    context: 'A "AgroMaq Industrial", empresa especializada na fabricação de pequenos implementos agrícolas, enfrenta um problema crítico: a linha de produção de um de seus pulverizadores está parada devido à falta de um subconjunto de ajuste mecânico. O fornecedor original das peças (eixos, manípulos e luvas) encerrou suas atividades, e a compra de um novo lote de um fornecedor alternativo levaria semanas, causando prejuízos significativos. Para solucionar o problema de forma rápida e eficiente, a gerência decidiu internalizar a produção desses componentes. O departamento de engenharia disponibilizou os desenhos técnicos do conjunto e solicitou ao setor de usinagem a fabricação de um lote piloto para validação.\nVocês, como a equipe de operadores de máquinas da "AgroMaq", receberam a missão de produzir as primeiras unidades deste conjunto. A tarefa exige não apenas habilidade na operation das máquinas, mas também a capacidade de interpretar os desenhos, calcular os parâmetros de corte corretos, executar as operações de torneamento, furação e rosqueamento com precisão, e garantir a qualidade final para que as peças possam ser montadas e funcionem perfeitamente.',
    challenge: 'Com base nos desenhos técnicos fornecidos e no material bruto, a equipe deverá executar um projeto completo de usinagem, focando nas operações de torneamento, para fabricar os componentes:\na) Planejar e Calcular: Para cada peça a ser usinada (Eixo cilíndrico de quatro corpos, Eixo cilíndrico com canais, Eixo roscado, Manípulo, Eixo calibrado e Luva com dois corpos internos), a equipe deverá calcular e registrar os parâmetros de corte essenciais (Velocidade de Corte, RPM, avanço) para cada operação (facear, tornear, chanfrar, furar, roscar), considerando as ferramentas e o material especificados.\nb) Executar e Controlar: Utilizando o torno mecânico convencional e a furadeira de bancada, a equipe deverá usinar as peças seguindo a sequência operacional planejada. Durante todo o processo, será necessário aplicar corretamente o fluido de refrigeração, zelar pela organização e segurança do ambiente, e realizar o controle dimensional contínuo com paquímetro e micrômetro, preenchendo uma ficha de autoinspeção. As operações incluem:\n• No torno: faceamento, torneamento de múltiplos diâmetros, furação de centro, furação com broca helicoidal, corte de canais e rosqueamento com cossinete.\n• Na furadeira/bancada: furação e rosqueamento manual com macho para o "Manípulo".\nc) Montar e Validar: Ao final da usinagem, a equipe deverá realizar a montagem do "Manípulo" no "Eixo roscado" para comprovar a funcionalidade e a precisão do conjunto roscado, demonstrando uma visão sistêmica do processo prodututivo.',
    expectedResults: [
      'Ao final desta Situação de Aprendizagem, a equipe de alunos deverá entregar:',
      'a) Peças Usinadas: Os componentes "Eixo cilíndrico de quatro corpos", "Eixo roscado" e "Manípulo" finalizados, limpos, sem rebarbas e em total conformidade com as dimensões, tolerâncias e acabamentos especificados nos desenhos técnicos.',
      'b) Ficha de Processo e Controle de Qualidade: Um documento para cada peça, preenchido com os parâmetros de corte calculados, a sequência de operações executadas e os valores medidos durante a autoinspeção dimensional.',
      'c) Conjunto Funcional Montado: A demonstração da montagem bem-sucedida do "Manípulo" no "Eixo roscado", evidenciando que as peças foram fabricadas corretamente e são intercambiáveis.'
    ]
  },
  {
    id: 'sa-fusi-fresagem',
    title: 'Projeto "Oficina Limpa": Planejamento e Construção de um Dispositivo Auxiliar de Usinagem',
    context: 'A "Fresanatec Soluções Industriais", uma empresa metalmecânica com 30 funcionários, especializada na fabricação de peças e na prestação de serviços de manutenção, acaba de investir na ampliação de seu parque de máquinas com a aquisição de uma nova fresadora convencional. O objetivo é aumentar a capacidade produtiva e diversificar os serviços oferecidos aos seus clientes. Para que a nova máquina atinja seu potencial máximo, o gerente de produção, Sr. Almeida, identificou a necessidade de fabricar um conjunto de acessórios e dispositivos de fixação que não acompanharam o equipamento. Esses componentes são importantes para a versatilidade, segurança e eficiência das futuras operações. O conjunto inclui: um bloco fresado para referência, um bloco com rebaixo para exercícios de posicionamento, castanhas moles para fixação de peças delicadas, uma base para as castanhas, mordentes de proteção em alumínio e um protótipo de coletor de serragem para manter a área limpa e segura. Como a equipe de usinadores experientes está totalmente alocada em projetos de clientes, o Sr. Almeida decidiu transformar essa necessidade interna em uma oportunidade de desenvolvimento para a nova equipe de aprendizes. Vocês, como aprendizes de mecânica de usinagem, foram designados para este projeto. A tarefa consiste em assumir a responsabilidade por todo o processo de fabricação desses componentes, desde a análise dos desenhos técnicos até a entrega das peças prontas para uso. Este projeto é a sua chance de demonstrar iniciativa, planejamento e habilidade técnica, aplicando os fundamentos da usinagem em um cenário real e contribuindo diretamente para a melhoria da infraestrutura da empresa.',
    challenge: 'Como equipe de aprendizes da Fresanatec, vocês têm o desafio de planejar, executar e controlar a fabricação do conjunto completo de seis componentes para a nova fresadora convencional. O sucesso do projeto será medido não apenas pela qualidade final das peças, mas também pela sua capacidade de trabalhar de forma organizada, segura e sistêmica. Para isso, a equipe deverá:\na) Analisar criticamente os desenhos técnicos de cada uma das seis peças, interpretando todas as cotas, tolerâncias e especificações.\nb) Elaborar um plano de trabalho detalhado (folha de processo) para cada componente, definindo a sequência lógica das operações de usinagem (fresagem, furação, rosqueamento), selecionando as ferramentas de corte e de fixação adequadas, e calculando os parâmetros de corte (RPM, avanços) para cada operação.\nc) Aplicar as normas de saúde e segurança no trabalho, identificando os riscos envolvidos e utilizando corretamente os Equipamentos de Proteção Individual (EPIs) e Coletivos (EPCs).\nd) Executar as operações de fresagem de baixa complexidade (faceamento, rebaixos, superfícies paralelas e perpendiculares), furação e rosqueamento manual, seguindo o plano de trabalho estabelecido.\ne) Gerenciar o uso de fluidos de refrigeração durante a usinagem, aplicando-os de forma correta e seguindo os procedimentos para o descarte adequado dos resíduos (cavacos).\nf) Realizar o controle de qualidade dimensional e visual das peças ao longo do processo e na sua finalização, utilizando instrumentos de medição e garantindo que todas as especificações do projeto sejam atendidas.',
    expectedResults: [
      'Ao final desta Situação de Aprendizagem, espera-se que a equipe de aprendizes entregue:',
      'a) O conjunto de 6 (seis) componentes mecânicos (Bloco fresado, Bloco rebaixado, Castanha mole, Base para castanha, Mordente de proteção, Coletor de serragem) usinados, finalizados e em total conformidade com os respectivos desenhos técnicos, prontos para serem instalados e utilizados na fresadora.',
      'b) O Plano de Trabalho (Folha de Processo) completo e devidamente preenchido para cada um dos componentes fabricados, servindo como documentação técnica do processo executado.',
      'c) Um Relatório de Controle de Qualidade para cada peça, contendo as medições dimensionais críticas realizadas, comparadas com as especificadas no desenho, e a aprovação final do componente.',
      'd) O posto de trabalho limpo e organizado, com as ferramentas e instrumentos devidamente guardados e os resíduos (cavacos) segregados corretamente para o descarte.'
    ]
  }
];

export const FULL_RUBRICS_FUSI = [
  {
    capacity: 'Realizar operações de baixa complexidade em torno convencional.',
    nsa: 'Não consegue executar as operações básicas no torno de forma satisfatória ou segura, mesmo com apoio e demonstrações constantes.',
    apo: 'Tenta operar a máquina, mas demonstra insegurança e comete erros frequentes de posicionamento e avanço, necessitando de intervenção constante.',
    par: 'Opera o torno e executa as operações, mas precisa de orientação pontual do docente para corrigir a técnica, ajustar a máquina ou atingir a tolerância.',
    aut: 'Opera o torno com autonomia e segurança, executando todas as operações (facear, tornear, chanfrar, furar) com precisão dimensional e bom acabamento.'
  },
  {
    capacity: 'Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais.',
    nsa: 'Danifica ferramentas ou instrumentos por mau uso ou não demonstra qualquer cuidado com os recursos da oficina, mesmo após repetidas orientações.',
    apo: 'Manuseia os equipamentos de forma descuidada, deixando ferramentas em locais inadequados ou não realizando a limpeza, necessitando de intervenção constante.',
    par: 'Manuseia os equipamentos de forma adequada na maior parte do tempo, mas requer lembretes pontuais sobre a limpeza ou guarda de algum item.',
    aut: 'Manuseia todos os equipamentos, ferramentas e instrumentos com o máximo cuidado, limpando-os e guardando-os corretamente por iniciativa própria.'
  },
  {
    capacity: 'Demonstrar visão sistêmica.',
    nsa: 'Não consegue compreender a relação entre as peças ou a importância da sua tarefa para o produto final, mesmo com o conjunto montado para análise.',
    apo: 'Foca apenas na execução da sua peça, demonstrando dificuldade em entender como ela irá interagir com as outras, necessitando de explicações constantes.',
    par: 'Compreende que as peças se montarão, mas precisa de questionamentos para relacionar a precisão dimensional com a funcionalidade do conjunto.',
    aut: 'Compreende e explica como a precisão de cada peça individual afeta a montagem e o funcionamento final do subconjunto, propondo melhorias no processo.'
  },
  {
    capacity: 'Elaborar plano de trabalho.',
    nsa: 'Não consegue preencher o plano de trabalho, mesmo com auxílio constante, ou deixa a maior parte em branco.',
    apo: 'Preenche o plano de trabalho with a ajuda constante do docente, cometendo erros na sequência de operações e no cálculo de parâmetros.',
    par: 'Elabora o plano de trabalho com autonomia, necessitando de pequenas correções na seleção de ferramentas ou no refinamento dos parâmetros.',
    aut: 'Elabora o plano de trabalho de forma completa e otimizada, propondo sequências eficientes e justificando a escolha dos parâmetros.'
  },
  {
    capacity: 'Definir os parâmetros de usinagem.',
    nsa: 'Não consegue realizar os cálculos de RPM ou avanço, mesmo com fórmulas e auxílio. Insere valores aleatórios ou perigosos na máquina.',
    apo: 'Realiza os cálculos de parâmetros de corte com a supervisão constante do docente, cometendo erros que precisam ser corrigidos.',
    par: 'Calcula os parâmetros de corte de forma autônoma para materiais e operações comuns, utilizando tabelas e fórmulas, necessitando de pequenas correções.',
    aut: 'Define e otimiza os parâmetros de corte para diferentes materiais e ferramentas, justificando as escolhas para obter melhor acabamento e vida útil da ferramenta.'
  },
  {
    capacity: 'Realizar operações de baixa complexidade em fresadora.',
    nsa: 'Demonstra grande dificuldade em operar a máquina, apresentando riscos à sua segurança e à do equipamento, mesmo com supervisão direta.',
    apo: 'Realiza as operações com supervisão e intervenção constante do docente para corrigir a postura, a fixação da peça ou o manuseio dos comandos.',
    par: 'Opera a máquina de forma segura e executa as operações corretamente, solicitando auxílio pontual em situações específicas.',
    aut: 'Realiza todas as operações com autonomia, segurança e precisão, otimizando o processo para obter um bom acabamento.'
  },
  {
    capacity: 'Realizar operações de furação.',
    nsa: 'Demonstra grande dificuldade em operar a furadeira, com fixação inadequada da peça e uso incorreto da ferramenta, apresentando risco à segurança.',
    apo: 'Realiza operações de furação with supervisão constante, necessitando de auxílio para alinhar o furo, controlar o avanço ou aplicar fluido de corte.',
    par: 'Executa operações de furação de forma segura e autônoma, atingindo as especificações de diâmetro e posição na maioria das vezes, com auxílio pontual.',
    aut: 'Realiza operações de furação (passante, cega, escareada) com autonomia, precisão e segurança, selecionando corretamente brocas e parâmetros.'
  },
  {
    capacity: 'Realizar operações de rosqueamento.',
    nsa: 'Não consegue iniciar a rosca com o macho ou quebra a ferramenta com frequência, mesmo com supervisão.',
    apo: 'Realiza o rosqueamento manual com auxílio constante do docente para garantir o alinhamento e o movimento correto de avanço e retrocesso.',
    par: 'Executa o rosqueamento manual de forma autônoma, produzindo roscas funcionais, necessitando de orientação para evitar quebra da ferramenta.',
    aut: 'Realiza o rosqueamento manual com precisão, alinhamento e segurança, selecionando o macho e a broca corretos e aplicando a técnica adequada.'
  },
  {
    capacity: 'Aplicar os procedimentos de refrigeração.',
    nsa: 'Não aplica o fluido de corte ou o faz de forma perigosa/ineficaz, mesmo quando orientado.',
    apo: 'Aplica o fluido de corte apenas quando lembrado pelo docente, com dificuldade em direcionar o jato para a região de corte correta.',
    par: 'Aplica os procedimentos de refrigeração de forma autônoma e correta durante a usinagem, garantindo a lubrificação e o resfriamento adequados.',
    aut: 'Aplica e ajusta a refrigeração de forma otimizada, selecionando o tipo de fluido e vazão mais adequados para a operação e material.'
  },
  {
    capacity: 'Controlar a qualidade das peças.',
    nsa: 'Não consegue manusear os instrumentos de medição ou realiza leituras incorretas, mesmo após orientação.',
    apo: 'Realiza as medições com dificuldade, necessitando de auxílio do docente para posicionar o instrumento e interpretar os resultados.',
    par: 'Utiliza os instrumentos de medição de forma correta e autônoma, realizando o controle dimensional e visual das peças conforme solicitado.',
    aut: 'Realiza o controle de qualidade com precisão e adota postura proativa na detecção de falhas e conformidade técnica.'
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
    methodology: 'Metodologia SENAI de Educação Profissional (MSEP). Uso de situações de aprendizagem realistas através do Cronograma Integradror.',
    evaluation: 'Contínua baseada em rubricas de desempenho e qualidade das peças usinadas.',
    bibliography: 'Guia de Aprendizagem Profissional SENAI: Fresamento e Torneamento. NBR 10067, NBR 8403, VIM.',
    createdAt: new Date().toISOString(),
    units: [
      {
        id: 'uc-lidt-beretella',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-22', markings: [] },
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
  },
  {
    id: 'plan-usinagem-gea',
    profileId: 'gea',
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
        id: 'uc-lidt-gea',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-22', markings: [] },
        basicCapacities: ['Interpretar desenhos técnicos', 'Elaborar croquis', 'Interpretar tolerâncias'],
        socioemocionalCapacities: ['Atenção a detalhes', 'Senso crítico'],
        knowledge: [{ topic: '1. Desenho técnico', subtopics: ['1.1 Normas', '1.4 Linhas', '1.5 Escalas'] }],
        learningSituations: [],
        rubrics: [],
        schedule: LIDT_SCHEDULE
      },
      {
        id: 'uc-crd-gea',
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
        id: 'uc-fusi-gea',
        name: 'FUNDAMENTOS DA USINAGEM',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-22', markings: [] },
        basicCapacities: FULL_CAPACITIES_FUSI,
        socioemocionalCapacities: FULL_SOCIOEMOCIONAL_FUSI,
        knowledge: FULL_KNOWLEDGE_FUSI,
        learningSituations: COMMON_SA_FUSI,
        rubrics: FULL_RUBRICS_FUSI,
        schedule: FUSI_SCHEDULE_GEA
      }
    ]
  }
];
