// C:/Users/Aluno/Desktop/Plano-de-Ensino-e-Cronograma/constants.tsx

import { TeachingPlan, CurricularUnit } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

// Versão do cronograma atualizada para o 2º Semestre (PRUC - 160H)
export const SCHEDULE_VERSION = "2026-V23-PRUC-160H";

// ============================================================================
// ==================== CRONOGRAMAS: 1º SEMESTRE ==============================
// ============================================================================

export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacities da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto".', resources: 'Sala de aula, projetor.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT.', resources: 'Exemplos de desenhos técnicos.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração.', resources: 'Projetor, models de sólidos.' },
  { id: 'l4', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica.', resources: 'Papel, lápis.' },
  { id: 'l5', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais.', resources: 'Models de peças simples.' },
  { id: 'l6', date: '09/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas únicas, face de referência).', strategy: '• Exercícios de cotagem de vistas ortogonais.', resources: 'Exercícios impressos.' },
  { id: 'l7', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração de cortes.', resources: 'Desenhos técnicos com cortes.' },
  { id: 'l8', date: '23/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte.', strategy: '• Estudo de caso: Análise de desenhos complexos.', resources: 'Conjunto de desenhos variados.' },
  { id: 'l9', date: '30/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação).', strategy: '• Exercícios de desenho de vistas auxiliares.', resources: 'Models de peças com faces inclinadas.' },
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

// ============================================================================
// ==================== CRONOGRAMAS: 2º SEMESTRE (PRUC) =======================
// ============================================================================

// --- CRONOGRAMA PRUC (PROFESSOR GEA - SEGUNDAS E QUARTAS) - 40 x 4H = 160H ---
export const PRUC_SCHEDULE_GEA = [
  { id: 'pg1', date: '22/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: 'Introdução aos Processos de Usinagem e Segurança no Trabalho.', strategy: 'Apresentação do plano de ensino, normas de segurança e uso de EPIs na usinagem.', resources: 'Sala de aula, projetor.' },
  { id: 'pg2', date: '27/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1. Torneamento: 1.1. Ferramenta de perfilamento.', strategy: 'Prática de afiação e análise da geometria de corte de ferramentas de forma.', resources: 'Torno convencional, esmeril, ferramentas de desbaste.' },
  { id: 'pg3', date: '29/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.2. Acessórios: 1.2.1. Lunetas (fixa e móvel).', strategy: 'Demonstração técnica e montagem de eixos longos com auxílio de lunetas.', resources: 'Torno mecânico, lunetas.' },
  { id: 'pg4', date: '03/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.2.2. Graminho, 1.2.3. Eixo mandril e 1.2.4. Prisma em V.', strategy: 'Alinhamento e centralização de peças excêntricas utilizando graminho e prisma.', resources: 'Graminho, eixo mandril, prisma em V.' },
  { id: 'pg5', date: '05/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.3. Cálculos técnicos: 1.3.1. Conicidade com desalinhamento do cabeçote.', strategy: 'Cálculos matemáticos para desalinhamento de cabeçote móvel e prática no torno.', resources: 'Calculadora, torno mecânico, micrômetro.' },
  { id: 'pg6', date: '10/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.4. Operação: 1.4.1. Tornear perfil com ferramenta de forma.', strategy: 'Usinagem prática de roldanas e perfis côncavos e convexos.', resources: 'Torno mecânico, calibrador de raios.' },
  { id: 'pg7', date: '12/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2. Fresagem: 2.1. Ferramentas (Gravação e esférica).', strategy: 'Montagem de fresas esféricas e parametrização correta de velocidades e avanços.', resources: 'Fresadora convencional, fresas esféricas.' },
  { id: 'pg8', date: '17/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.2. Acessórios (Grampos e garras de fixação).', strategy: 'Montagem e fixação segura de blocos de formas irregulares diretamente na mesa.', resources: 'Grampos, tirantes, garras.' },
  { id: 'pg9', date: '19/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.3. Conjunto divisor: 2.3.1. Divisão direta.', strategy: 'Operação de divisão direta no cabeçote divisor para usinagem de perfis sextavados.', resources: 'Aparelho divisor universal.' },
  { id: 'pg10', date: '24/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.3.2. Divisão indireta.', strategy: 'Cálculos avançados de divisão indireta através de discos perfurados.', resources: 'Divisor universal, tabelas de furos.' },
  { id: 'pg11', date: '26/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.3.3. Divisão diferencial.', strategy: 'Demonstração teórica e cálculo da montagem da grade de engrenagens.', resources: 'Engrenagens, cabeçote divisor.' },
  { id: 'pg12', date: '31/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.4. Operação: 2.4.1. Fresar superfície plana paralela no aparelho divisor.', strategy: 'Usinagem de faces paralelas em bloco utilizando o divisor universal.', resources: 'Fresadora, fresa cabeçote.' },
  { id: 'pg13', date: '02/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.4.2. Furar de forma coordenada.', strategy: 'Usinagem de coordenadas e furos circulares equidistantes na fresadora.', resources: 'Fresadora, paquímetro.' },
  { id: 'pg14', date: '09/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.4.3. Alargar furo manualmente na bancada.', strategy: 'Ajustagem dimensional fina de furos cilíndricos com alargadores manuais.', resources: 'Alargador manual, desandador, bancada.' },
  { id: 'pg15', date: '14/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas...', knowledge: '3. Serramento: 3.1. Definição; 3.2. Tipos de serra fita.', strategy: 'Teoria e segurança do serramento mecânico horizontal e vertical.', resources: 'Máquinas serra fita.' },
  { id: 'pg16', date: '16/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas...', knowledge: '3.3. Lâmina de serra de fita.', strategy: 'Prática de montagem, tensionamento de lâmina e cálculo de dentes por polegada.', resources: 'Lâminas de serra fita.' },
  { id: 'pg17', date: '21/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas...', knowledge: '3.4. Operação: 3.4.1. Serrar com serra de fita.', strategy: 'Operação prática e corte de blocos e tarugos nas dimensões de projeto.', resources: 'Serra fita horizontal, fluido de corte.' },
  { id: 'pg18', date: '23/09/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos...', knowledge: '4. Conjuntos mecânicos: 4.1. Definição; 4.2. Tipos; 4.3. Características.', strategy: 'Análise de tolerâncias de montagem, ajustes e folgas recomendadas.', resources: 'Desenhos técnicos de conjuntos.' },
  { id: 'pg19', date: '28/09/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos...', knowledge: '4.4. Técnicas de montagem.', strategy: 'Alinhamento mecânico, montagem de rolamentos e chavetas.', resources: 'Prensas, ferramentas manuais.' },
  { id: 'pg20', date: '30/09/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos...', knowledge: '4.5. Técnicas de ajustagem: 4.5.1. Lixamento e 4.5.2. Polimento.', strategy: 'Superacabamento superficial manual em eixos com lixas abrasivas.', resources: 'Lixas, abrasivos, bancada.' },
  { id: 'pg21', date: '05/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem...', knowledge: '5. Retificação: 5.1. Processos (Cilíndrica, Plana tangencial).', strategy: 'Teoria da usinagem por abrasão e apresentação dos tipos de retífica.', resources: 'Retificadoras.' },
  { id: 'pg22', date: '07/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem...', knowledge: '5.1.2. Sem centro Centerless e 5.1.3. Afiadoras.', strategy: 'Introdução teórica ao processo Centerless e afiação de ferramentas.', resources: 'Afiadora universal.' },
  { id: 'pg23', date: '14/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem...', knowledge: '5.2. Parâmetros (RPM da peça, RPM do rebolo, Avanço).', strategy: 'Cálculo de parâmetros de corte para processos de retificação.', resources: 'Calculadora.' },
  { id: 'pg24', date: '19/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6. Balanceamento: 6.1. Rebolos (Tipos, Classificação, Armazenagem).', strategy: 'Teste de trincas (ensaio acústico) e organização de rebolos.', resources: 'Rebolos variados.' },
  { id: 'pg25', date: '21/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.2. Acessórios: 6.2.1. Conjunto balanceador estático.', strategy: 'Demonstração de fixação do rebolo no flange e uso do eixo balanceador.', resources: 'Flanges de fixação, eixo.' },
  { id: 'pg26', date: '26/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.2.4. Nível de precisão e 6.2.5. Contrapesos.', strategy: 'Nivelamento de precisão da base do balanceador estático.', resources: 'Nível bolha de precisão.' },
  { id: 'pg27', date: '28/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.3. Operações: 6.3.1. Balancear rebolo.', strategy: 'Prática individual de balanceamento de rebolos.', resources: 'Suporte de balanceamento.' },
  { id: 'pg28', date: '04/11/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.3.2. Dressar rebolo.', strategy: 'Operação de dressagem e perfilamento do rebolo com diamante.', resources: 'Dressador de diamante.' },
  { id: 'pg29', date: '09/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7. Retificadora cilíndrica: 7.1. Características; 7.2. Componentes.', strategy: 'Reconhecimento da máquina, controles e barramentos cilíndricos.', resources: 'Retificadora cilíndrica.' },
  { id: 'pg30', date: '11/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7.3. Acessórios (Placa universal e placa de arrasto).', strategy: 'Demonstração de montagem de eixos entre pontas com arrastador.', resources: 'Placa de arrasto, contra-pontas.' },
  { id: 'pg31', date: '16/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7.3.4. Arrastadores e 7.3.5. Dressador.', strategy: 'Ajuste do dressador diamantado embutido na retificadora cilíndrica.', resources: 'Arrastadores.' },
  { id: 'pg32', date: '18/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7.4. Operação: 7.4.1. Retificar superfície cilíndrica externa.', strategy: 'Usinagem cilíndrica externa com controle dimensional micrométrico.', resources: 'Retificadora cilíndrica, micrômetro.' },
  { id: 'pg33', date: '23/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8. Retificadora plana: 8.1. Características; 8.2. Componentes.', strategy: 'Identificação dos controles da retificadora plana tangencial.', resources: 'Retificadora plana.' },
  { id: 'pg34', date: '25/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.3. Acessórios: 8.3.1. Mesa magnética.', strategy: 'Limpeza, ativação e testes de fixação na placa magnética.', resources: 'Mesa magnética.' },
  { id: 'pg35', date: '30/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.3.2. Morsa e 8.3.3. Mesa de seno.', strategy: 'Cálculo de calços para fixação angular por mesa de seno.', resources: 'Mesa de seno, blocos padrão.' },
  { id: 'pg36', date: '02/12/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.3.5. Calços e 8.3.6. Dressador.', strategy: 'Preparo da superfície e dressagem estrita do rebolo tangencial.', resources: 'Retificadora plana, dressador.' },
  { id: 'pg37', date: '07/12/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.4. Operações: 8.4.1. Retificar superfície plana.', strategy: 'Retificação de faces planas com passes milimétricos centesimais.', resources: 'Mesa magnética, calços de precisão.' },
  { id: 'pg38', date: '09/12/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.4.2. Retificar paralela e 8.4.3. Perpendicular.', strategy: 'Garantia de paralelismo e esquadro centesimal em blocos retificados.', resources: 'Retificadora plana, micrômetro.' },
  { id: 'pg39', date: '14/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Montagem final dos conjuntos mecânicos e análise de ajustes.', strategy: 'Montagem e ajustagem de precisão dos projetos usinados no semestre.', resources: 'Bancadas, ferramentas manuais.' },
  { id: 'pg40', date: '16/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Avaliação Final de Desempenho Atitudinal e Técnico.', strategy: 'Fechamento final do diário de classe, feedback técnico aos alunos e encerramento.', resources: 'Planilhas de notas.' }
];

// --- CRONOGRAMA PRUC (PROFESSOR BERETELLA - TERÇAS E SEXTAS) - 40 x 4H = 160H ---
export const PRUC_SCHEDULE_BERETELLA = [
  { id: 'pb1', date: '24/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: 'Introdução aos Processos de Usinagem e Segurança no Trabalho.', strategy: 'Apresentação do plano de ensino, normas de segurança e uso de EPIs na usinagem.', resources: 'Sala de aula, projetor.' },
  { id: 'pb2', date: '28/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1. Torneamento: 1.1. Ferramenta de perfilamento.', strategy: 'Prática de afiação e análise da geometria de corte de ferramentas de forma.', resources: 'Torno convencional, esmeril, ferramentas de desbaste.' },
  { id: 'pb3', date: '31/07/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.2. Acessórios: 1.2.1. Lunetas (fixa e móvel).', strategy: 'Demonstração técnica e montagem de eixos longos com auxílio de lunetas.', resources: 'Torno mecânico, lunetas.' },
  { id: 'pb4', date: '04/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.2.2. Graminho, 1.2.3. Eixo mandril e 1.2.4. Prisma em V.', strategy: 'Alinhamento e centralização de peças excêntricas utilizando graminho e prisma.', resources: 'Graminho, eixo mandril, prisma em V.' },
  { id: 'pb5', date: '07/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.3. Cálculos técnicos: 1.3.1. Conicidade com desalinhamento do cabeçote.', strategy: 'Cálculos matemáticos para desalinhamento de cabeçote móvel e prática no torno.', resources: 'Calculadora, torno mecânico, micrômetro.' },
  { id: 'pb6', date: '11/08/2026', hours: 4, capacities: 'Realizar operações em torno convencional...', knowledge: '1.4. Operação: 1.4.1. Tornear perfil com ferramenta de forma.', strategy: 'Usinagem prática de roldanas e perfis côncavos e convexos.', resources: 'Torno mecânico, calibrador de raios.' },
  { id: 'pb7', date: '14/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2. Fresagem: 2.1. Ferramentas (Gravação e esférica).', strategy: 'Montagem de fresas esféricas e parametrização correta de velocidades e avanços.', resources: 'Fresadora convencional, fresas esféricas.' },
  { id: 'pb8', date: '18/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.2. Acessórios (Grampos e garras de fixação).', strategy: 'Montagem e fixação segura de blocos de formas irregulares diretamente na mesa.', resources: 'Grampos, tirantes, garras.' },
  { id: 'pb9', date: '21/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.3. Conjunto divisor: 2.3.1. Divisão direta.', strategy: 'Operação de divisão direta no cabeçote divisor para usinagem de perfis sextavados.', resources: 'Aparelho divisor universal.' },
  { id: 'pb10', date: '25/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.3.2. Divisão indireta.', strategy: 'Cálculos avançados de divisão indireta através de discos perfurados.', resources: 'Divisor universal, tabelas de furos.' },
  { id: 'pb11', date: '28/08/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.3.3. Divisão diferencial.', strategy: 'Demonstração teórica e cálculo da montagem da grade de engrenagens.', resources: 'Engrenagens, cabeçote divisor.' },
  { id: 'pb12', date: '01/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.4. Operação: 2.4.1. Fresar superfície plana paralela no aparelho divisor.', strategy: 'Usinagem de faces paralelas em bloco utilizando o divisor universal.', resources: 'Fresadora, fresa cabeçote.' },
  { id: 'pb13', date: '04/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.4.2. Furar de forma coordenada.', strategy: 'Usinagem de coordenadas e furos circulares equidistantes na fresadora.', resources: 'Fresadora, paquímetro.' },
  { id: 'pb14', date: '08/09/2026', hours: 4, capacities: 'Realizar operações em fresadora convencional...', knowledge: '2.4.3. Alargar furo manualmente na bancada.', strategy: 'Ajustagem dimensional fina de furos cilíndricos com alargadores manuais.', resources: 'Alargador manual, desandador, bancada.' },
  { id: 'pb15', date: '11/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas...', knowledge: '3. Serramento: 3.1. Definição; 3.2. Tipos de serra fita.', strategy: 'Teoria e segurança do serramento mecânico horizontal e vertical.', resources: 'Máquinas serra fita.' },
  { id: 'pb16', date: '15/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas...', knowledge: '3.3. Lâmina de serra de fita.', strategy: 'Prática de montagem, tensionamento de lâmina e cálculo de dentes por polegada.', resources: 'Lâminas de serra fita.' },
  { id: 'pb17', date: '18/09/2026', hours: 4, capacities: 'Realizar operações de serramento por meio de máquinas...', knowledge: '3.4. Operação: 3.4.1. Serrar com serra de fita.', strategy: 'Operação prática e corte de blocos e tarugos nas dimensões de projeto.', resources: 'Serra fita horizontal, fluido de corte.' },
  { id: 'pb18', date: '22/09/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos...', knowledge: '4. Conjuntos mecânicos: 4.1. Definição; 4.2. Tipos; 4.3. Características.', strategy: 'Análise de tolerâncias de montagem, ajustes e folgas recomendadas.', resources: 'Desenhos técnicos de conjuntos.' },
  { id: 'pb19', date: '25/09/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos...', knowledge: '4.4. Técnicas de montagem.', strategy: 'Alinhamento mecânico, montagem de rolamentos e chavetas.', resources: 'Prensas, ferramentas manuais.' },
  { id: 'pb20', date: '29/09/2026', hours: 4, capacities: 'Realizar a montagem de conjuntos mecânicos...', knowledge: '4.5. Técnicas de ajustagem: 4.5.1. Lixamento e 4.5.2. Polimento.', strategy: 'Superacabamento superficial manual em eixos com lixas abrasivas.', resources: 'Lixas, abrasivos, bancada.' },
  { id: 'pb21', date: '02/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem...', knowledge: '5. Retificação: 5.1. Processos (Cilíndrica, Plana tangencial).', strategy: 'Teoria da usinagem por abrasão e apresentação dos tipos de retífica.', resources: 'Retificadoras.' },
  { id: 'pb22', date: '06/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem...', knowledge: '5.1.2. Sem centro Centerless e 5.1.3. Afiadoras.', strategy: 'Introdução teórica ao processo Centerless e afiação de ferramentas.', resources: 'Afiadora universal.' },
  { id: 'pb23', date: '09/10/2026', hours: 4, capacities: 'Definir os parâmetros e os processos de usinagem...', knowledge: '5.2. Parâmetros (RPM da peça, RPM do rebolo, Avanço).', strategy: 'Cálculo de parâmetros de corte para processos de retificação.', resources: 'Calculadora.' },
  { id: 'pb24', date: '13/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6. Balanceamento: 6.1. Rebolos (Tipos, Classificação, Armazenagem).', strategy: 'Teste de trincas (ensaio acústico) e organização de rebolos.', resources: 'Rebolos variados.' },
  { id: 'pb25', date: '16/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.2. Acessórios: 6.2.1. Conjunto balanceador estático.', strategy: 'Demonstração de fixação do rebolo no flange e uso do eixo balanceador.', resources: 'Flanges de fixação, eixo.' },
  { id: 'pb26', date: '20/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.2.4. Nível de precisão e 6.2.5. Contrapesos.', strategy: 'Nivelamento de precisão da base do balanceador estático.', resources: 'Nível bolha de precisão.' },
  { id: 'pb27', date: '23/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.3. Operações: 6.3.1. Balancear rebolo.', strategy: 'Prática individual de balanceamento de rebolos.', resources: 'Suporte de balanceamento.' },
  { id: 'pb28', date: '27/10/2026', hours: 4, capacities: 'Realizar o balanceamento do rebolo...', knowledge: '6.3.2. Dressar rebolo.', strategy: 'Operação de dressagem e perfilamento do rebolo com diamante.', resources: 'Dressador de diamante.' },
  { id: 'pb29', date: '30/10/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7. Retificadora cilíndrica: 7.1. Características; 7.2. Componentes.', strategy: 'Reconhecimento da máquina, controles e barramentos cilíndricos.', resources: 'Retificadora cilíndrica.' },
  { id: 'pb30', date: '03/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7.3. Acessórios (Placa universal e placa de arrasto).', strategy: 'Demonstração de montagem de eixos entre pontas com arrastador.', resources: 'Placa de arrasto, contra-pontas.' },
  { id: 'pb31', date: '06/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7.3.4. Arrastadores e 7.3.5. Dressador.', strategy: 'Ajuste do dressador diamantado embutido na retificadora cilíndrica.', resources: 'Arrastadores.' },
  { id: 'pb32', date: '10/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras cilíndricas...', knowledge: '7.4. Operação: 7.4.1. Retificar superfície cilíndrica externa.', strategy: 'Usinagem cilíndrica externa com controle dimensional micrométrico.', resources: 'Retificadora cilíndrica, micrômetro.' },
  { id: 'pb33', date: '13/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8. Retificadora plana: 8.1. Características; 8.2. Componentes.', strategy: 'Identificação dos controles da retificadora plana tangencial.', resources: 'Retificadora plana.' },
  { id: 'pb34', date: '17/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.3. Acessórios: 8.3.1. Mesa magnética.', strategy: 'Limpeza, ativação e testes de fixação na placa magnética.', resources: 'Mesa magnética.' },
  { id: 'pb35', date: '20/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.3.2. Morsa e 8.3.3. Mesa de seno.', strategy: 'Cálculo de calços para fixação angular por mesa de seno.', resources: 'Mesa de seno, blocos padrão.' },
  { id: 'pb36', date: '24/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.3.5. Calços e 8.3.6. Dressador.', strategy: 'Preparo da superfície e dressagem estrita do rebolo tangencial.', resources: 'Retificadora plana, dressador.' },
  { id: 'pb37', date: '27/11/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.4. Operações: 8.4.1. Retificar superfície plana.', strategy: 'Retificação de faces planas com passes milimétricos centesimais.', resources: 'Mesa magnética, calços de precisão.' },
  { id: 'pb38', date: '01/12/2026', hours: 4, capacities: 'Realizar operações em retificadoras planas...', knowledge: '8.4.2. Retificar paralela e 8.4.3. Perpendicular.', strategy: 'Garantia de paralelismo e esquadro centesimal em blocos retificados.', resources: 'Retificadora plana, micrômetro.' },
  { id: 'pb39', date: '04/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Montagem final dos conjuntos mecânicos e análise de ajustes.', strategy: 'Montagem e ajustagem de precisão dos projetos usinados no semestre.', resources: 'Bancadas, ferramentas manuais.' },
  { id: 'pb40', date: '08/12/2026', hours: 4, capacities: 'Todas as capacities da UC.', knowledge: 'Avaliação Final de Desempenho Atitudinal e Técnico.', strategy: 'Fechamento final do diário de classe, feedback técnico aos alunos e encerramento.', resources: 'Planilhas de notas.' }
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

// --- BASE DE CAPACIDADES E CONHECIMENTOS COMPARTILHADA DA UC PRUC ---
const BASE_PRUC_PROPERTIES = {
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
  ]
};

// --- TEMPLATE DA UC PRUC DO PROFESSOR GEA (SEGUNDAS E QUARTAS) ---
const PRUC_UNIT_TEMPLATE_GEA: CurricularUnit = {
  ...BASE_PRUC_PROPERTIES,
  id: 'pruc-gea',
  name: 'Processos de Usinagem em Máquinas Convencionais (PRUC)',
  schedule: PRUC_SCHEDULE_GEA,
  calendar: {
    startDate: '2026-07-22',
    endDate: '2026-12-16',
    markings: []
  }
};

// --- TEMPLATE DA UC PRUC DO PROFESSOR BERETELLA (TERÇAS E SEXTAS) ---
const PRUC_UNIT_TEMPLATE_BERETELLA: CurricularUnit = {
  ...BASE_PRUC_PROPERTIES,
  id: 'pruc-beretella',
  name: 'Processos de Usinagem em Máquinas Convencionais (PRUC)',
  schedule: PRUC_SCHEDULE_BERETELLA,
  calendar: {
    startDate: '2026-07-24',
    endDate: '2026-12-08',
    markings: []
  }
};

// ============================================================================
// ======================= PLANOS DE ENSINO COMPLETOS ==========================
// ============================================================================

export const SAMPLE_PLANS: TeachingPlan[] = [
  // --- 1º SEMESTRE - PROFESSOR BERETELLA ---
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
  
  // --- 2º SEMESTRE - PROFESSOR BERETELLA (Terças e Sextas) ---
  {
    id: 'plan-usinagem-beretella-sem2',
    profileId: 'beretella',
    courseName: 'Mecânico de Usinagem Convencional - 2º SEMESTRE',
    modality: 'Qualificação Profissional',
    totalHours: 160,
    objective: 'Executar processos avançados de usinagem em tornos paralelos e fresadoras convencionais utilizando acessórios de posicionamento preciso como aparelho divisor e retificação cilíndrica/plana de precisão.',
    methodology: 'Práticas intensivas de oficina com desenvolvimento de projetos reais (montagem mecânica, serramento de fita e ajustagem por lixamento/polimento), estimulando o trabalho cooperativo e as competências industriais.',
    evaluation: 'Entrega física, medição metrológica centesimal e testes mecânicos dos subconjuntos fabricados nas aulas práticas.',
    bibliography: '• Ajustagem Mecânica Avançada - SENAI; • Retificação Plana e Cilíndrica - SENAI; • Manual de Tecnologia de Metais.',
    units: [PRUC_UNIT_TEMPLATE_BERETELLA], // Apenas PRUC mantido aqui!
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-07-15T09:00:00.000Z'
  },

  // --- 1º SEMESTRE - PROFESSOR GEA ---
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

  // --- 2º SEMESTRE - PROFESSOR GEA (Segundas e Quartas) ---
  {
    id: 'plan-usinagem-gea-sem2',
    profileId: 'gea',
    courseName: 'Mecânico de Usinagem Convencional - 2º SEMESTRE',
    modality: 'Qualificação Profissional',
    totalHours: 160,
    objective: 'Executar processos avançados de usinagem em tornos paralelos e fresadoras convencionais utilizando acessórios de posicionamento preciso como aparelho divisor e retificação cilíndrica/plana de precisão.',
    methodology: 'Práticas intensivas de oficina com desenvolvimento de projetos mecânicos e ajustagem.',
    evaluation: 'Rubricas técnicas de processo e produto acabado (acoplamentos e redutores).',
    bibliography: '• Ajustagem Mecânica Avançada - SENAI; • Elementos de Máquinas - Sarkis.',
    units: [PRUC_UNIT_TEMPLATE_GEA], // Apenas PRUC mantido aqui!
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-07-15T09:00:00.000Z'
  }
];
