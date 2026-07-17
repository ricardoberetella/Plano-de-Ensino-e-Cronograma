// ============================================================================
// CONSTANTES GERAIS DO SISTEMA
// ============================================================================

export const SCHEDULE_VERSION = '2026.2.v2';

// --- CRONOGRAMAS DETALHADOS: 2º SEMESTRE (PROFESSOR RICARDO GEA) ---
const PRUSC_SCHEDULE_GEA = [
  { id: 'p_gea_01', date: '23/07/2026', hours: 4, capacities: 'CT3: Operações de serramento', knowledge: '3. Serramento: Definição, Tipos de serra fita (Horizontal e Vertical), Lâminas.', strategy: 'Apresentação da UC e normas de segurança da oficina. Prática de corte de matéria-prima.', resources: 'Serra de fita horizontal, matéria-prima.' },
  { id: 'p_gea_02', date: '27/07/2026', hours: 4, capacities: 'CT1: Operações em torno convencional', knowledge: '1. Torneamento: Ferramenta de perfilamento, acessórios (lunetas, graminho).', strategy: 'Demonstração de alinhamento com graminho e montagem de acessórios no torno.', resources: 'Torno convencional, graminho, lunetas.' },
  { id: 'p_gea_03', date: '30/07/2026', hours: 4, capacities: 'CT1: Operações em torno convencional', knowledge: '1.3. Cálculos técnicos: Conicidade com desalinhamento do cabeçote móvel.', strategy: 'Aula teórica e exercícios práticos de cálculo de desalinhamento de cabeçote.', resources: 'Quadro, calculadoras, guias técnicos.' },
  { id: 'p_gea_04', date: '03/08/2026', hours: 4, capacities: 'CT1: Operações em torno convencional', knowledge: '1.4. Operação: Tornear perfil com ferramenta de forma.', strategy: 'Execução prática de torneamento cônico e perfilamento com ferramenta de forma.', resources: 'Torno convencional, ferramentas de perfil raiado.' },
  { id: 'p_gea_05', date: '05/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2. Fresagem: Ferramentas de gravação e esféricas. Acessórios (grampos e garras).', strategy: 'Mapeamento de fixação de peças na mesa da fresadora utilizando garras de fixação. (Aula de Segunda I)', resources: 'Fresadora convencional, garras, grampos.' },
  { id: 'p_gea_06', date: '06/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.3. Conjunto divisor: Divisão direta e indireta.', strategy: 'Cálculos matemáticos para divisão de divisores universais. Prática de engrenamento básico.', resources: 'Aparelho divisor, discos de furo.' },
  { id: 'p_gea_07', date: '10/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.3.3. Divisão diferencial.', strategy: 'Demonstração de setup complexo para divisão diferencial na fresadora.', resources: 'Aparelho divisor, trem de engrenagens.' },
  { id: 'p_gea_08', date: '13/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.4.1. Fresar superfície plana paralela no aparelho divisor.', strategy: 'Usinagem de faces paralelas utilizando o divisor universal indexing.', resources: 'Fresadora, fresas de topo.' },
  { id: 'p_gea_09', date: '17/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.4.2. Furar de forma coordenada na fresadora.', strategy: 'Prática de furação coordenada utilizando os eixos X e Y da mesa micrométrica.', resources: 'Fresadora, brocas, cabeçote mandrilador.' },
  { id: 'p_gea_10', date: '20/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.4.3. Alargar furo manualmente na bancada.', strategy: 'Demonstração e execução manual na bancada de alargamento com alargadores fixos.', resources: 'Bancada, alargadores manuais, desandadores.' },
  { id: 'p_gea_11', date: '24/08/2026', hours: 4, capacities: 'CT4: Montagem de conjuntos mecânicos', knowledge: '4. Conjuntos mecânicos: Definição, tipos e características.', strategy: 'Análise de desenho de conjunto e planejamento da ordem de montagem técnica.', resources: 'Desenhos de conjunto mecânico.' },
  { id: 'p_gea_12', date: '26/08/2026', hours: 4, capacities: 'CT4: Montagem de conjuntos mecânicos', knowledge: '4.4. Técnicas de montagem e ajustagem (Lixamento e Polimento).', strategy: 'Prática de bancada voltada ao ajuste fino de faces deslizantes. (Aula de Segunda II)', resources: 'Lixas abrasivas, blocos de polimento.' },
  { id: 'p_gea_13', date: '27/08/2026', hours: 4, capacities: 'CT5: Parâmetros em retificas', knowledge: '5. Retificação: Processos (Cilíndrica, Plana tangencial, Centerless, Afiadoras).', strategy: 'Aula teórica expositiva sobre a arquitetura e finalidade de cada tipo de retificadora.', resources: 'Projetor, catálogos técnicos.' },
  { id: 'p_gea_14', date: '31/08/2026', hours: 4, capacities: 'CT5: Parâmetros em retificas', knowledge: '5.2. Parâmetros: RPM da peça, RPM do rebolo, cálculo de Avanço.', strategy: 'Cálculos de velocidade periférica do rebolo e velocidade da peça na retífica.', resources: 'Formulários técnicos de retificação.' },
  { id: 'p_gea_15', date: '03/09/2026', hours: 4, capacities: 'CT6: Balanceamento do rebolo', knowledge: '6. Balanceamento e Rebolos: Tipos, classificação e inspeção de trincas (som).', strategy: 'Prática de ensaio acústico de rebolos e montagem inicial em flanges.', resources: 'Rebolos, martelo de madeira, flanges.' },
  { id: 'p_gea_16', date: '10/09/2026', hours: 4, capacities: 'CT6: Balanceamento do rebolo', knowledge: '6.2. Acessórios: Conjunto balanceador estático, eixo, nível de precisão, contrapesos.', strategy: 'Demonstração prática de balanceamento estático de rebolo no cavalete de precisão.', resources: 'Cavalete de balanceamento, contrapesos.' },
  { id: 'p_gea_17', date: '14/09/2026', hours: 4, capacities: 'CT6: Balanceamento do rebolo', knowledge: '6.3.2. Dressar rebolo.', strategy: 'Montagem do rebolo na máquina e operação de dressagem com ponta de diamante.', resources: 'Retificadora, dressador de diamante.' },
  { id: 'p_gea_18', date: '17/09/2026', hours: 4, capacities: 'CT7: Operações em retificadora cilíndrica', knowledge: '7. Retificadora cilíndrica: Characteristics, componentes e acessórios (Placas, contraponta).', strategy: 'Setup completo da máquina: alinhamento de contrapontas e arrastadores.', resources: 'Retificadora cilíndrica, arrastadores.' },
  { id: 'p_gea_19', date: '21/09/2026', hours: 4, capacities: 'CT7: Operações em retificadora cilíndrica', knowledge: '7.4.1. Retificar superfície cilíndrica externa.', strategy: 'Usinagem abrasiva externa de eixos retificados previamente torneados.', resources: 'Retificadora cilíndrica, eixos de teste.' },
  { id: 'p_gea_20', date: '24/09/2026', hours: 4, capacities: 'CT7: Operações em retificadora cilíndrica', knowledge: '7.4.1. Controle dimensional de eixos na retífica.', strategy: 'Medição fina e monitoramento de aquecimento de peça em processo cilíndrico.', resources: 'Micrômetro, fluido refrigerante.' },
  { id: 'p_gea_21', date: '28/09/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8. Retificadora plana: Características, componentes e mesa magnética.', strategy: 'Operação de fixação por magnetismo e desmagnetização segura de peças de aço.', resources: 'Retificadora plana, placa magnética.' },
  { id: 'p_gea_22', date: '01/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.3. Acessórios: Morsa de precisão, calços e mesa de seno.', strategy: 'Montagem de setups angulares na retificadora plana com mesa de seno.', resources: 'Mesa de seno, blocos padrão, morsa de precisão.' },
  { id: 'p_gea_23', date: '05/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.4.1. Retificar superfície plana.', strategy: 'Usinagem da primeira face de blocos temperados para garantia de planeza.', resources: 'Retificadora plana, blocos de aço.' },
  { id: 'p_gea_24', date: '08/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.4.2. Retificar superfície plana paralela.', strategy: 'Retificação da segunda face para controle rígido de paralelismo dimensional.', resources: 'Retificadora plana, micrômetro centesimal.' },
  { id: 'p_gea_25', date: '15/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.4.3. Retificar superfície plana perpendicular.', strategy: 'Usinagem a 90 graus utilizando morsa de precisão e esquadro técnico.', resources: 'Retificadora plana, esquadro retificado.' },
  { id: 'p_gea_26', date: '19/10/2026', hours: 4, capacities: 'CT1 e CT2: Manutenção e processos integrados', knowledge: 'Integração Torno-Fresa para fabricação de subconjuntos mecânicos.', strategy: 'Início da usinagem do projeto final integrando torneamento e fresagem paralela.', resources: 'Oficina mecânica integrada.' },
  { id: 'p_gea_27', date: '22/10/2026', hours: 4, capacities: 'CT1 e CT2: Manutenção e processos integrados', knowledge: 'Usinagem fina de componentes do projeto integrado.', strategy: 'Acompanhamento do plano de trabalho de usinagem sequencial desenvolvido pelo aluno.', resources: 'Torno e fresadora.' },
  { id: 'p_gea_28', date: '26/10/2026', hours: 4, capacities: 'CT4: Ajustagem fina e montagem', knowledge: 'Técnicas transversais de acabamento em guias deslizantes.', strategy: 'Ajustagem fina de montagem com controle de folga por meio de azul de prússia.', resources: 'Azul de prússia, raspadores de metal.' },
  { id: 'p_gea_29', date: '29/10/2026', hours: 4, capacities: 'CT7 e CT8: Retificação final de precisão', knowledge: 'Retificação das folgas funcionais dos eixos e placas montadas.', strategy: 'Usinagem de correção dimensional final nos conjuntos usinados do projeto.', resources: 'Retificadoras cilíndrica e plana.' },
  { id: 'p_gea_30', date: '05/11/2026', hours: 4, capacities: 'CT4: Teste funcional de conjuntos', knowledge: 'Montagem mecânica completa e verificação cinemática.', strategy: 'Avaliação da suavidade de movement mecânico e adjustments de fixação de parafusos.', resources: 'Chaves de aperto, bancada de montagem.' },
  { id: 'p_gea_31', date: '09/11/2026', hours: 4, capacities: 'CT1 a CT8: Prática supervisionada de refugo e correção', knowledge: 'Estudo de caso e retrabalho de componentes fora de tolerância.', strategy: 'Recuperação de peças corrigindo diâmetros e superfícies por retificação ou buchas.', resources: 'Máquinas-ferramenta.' },
  { id: 'p_gea_32', date: '12/11/2026', hours: 4, capacities: 'CT1 a CT8: Prática avançada de usinagem', knowledge: 'Operações complexas acumuladas: Divisor indireto + Retífica plana.', strategy: 'Usinagem final de ranhuras sincronizadas e canais em eixos retificados.', resources: 'Fresadora e retificadora.' },
  { id: 'p_gea_33', date: '19/11/2026', hours: 4, capacities: 'CT1 a CT8: Otimização de processos', knowledge: 'Análise de tempos de corte e desgaste de ferramentas.', strategy: 'Aplicação prática de melhoria de velocidade e avanços para aumento de rendimento.', resources: 'Ferramental técnico.' },
  { id: 'p_gea_34', date: '23/11/2026', hours: 4, capacities: 'CT4: Ajustagem de conjuntos complexos', knowledge: 'Montagem técnica final com elementos de fixação.', strategy: 'Torqueamento correto e travamento mecânico de conjuntos rotativos.', resources: 'Torquímetro, parafusos.' },
  { id: 'p_gea_35', date: '26/11/2026', hours: 4, capacities: 'CT1 a CT8: Acabamento superficial rigoroso', knowledge: 'Usinagem abrasiva final e polimento técnico espelhado.', strategy: 'Execução de etapas de polimento fino com pastas de diamante na bancada.', resources: 'Pastas abrasivas, feltros.' },
  { id: 'p_ber_36', date: '30/11/2026', hours: 4, capacities: 'CT1 a CT8: Revisão prática de oficina', knowledge: 'Fechamento dos postos de trabalho mecânico do semestre.', strategy: 'Finalização de usinagens brutas e checagem final de dimensional técnico.', resources: 'Instrumentos de medição.' },
  { id: 'p_gea_37', date: '03/12/2026', hours: 4, capacities: 'CS1 e CS2: Conservação patrimonial e 5S', knowledge: 'Conservação de máquinas de usinagem e rebolos.', strategy: 'Prática intensa de limpeza de barramentos, lubrificação de guias e organização.', resources: 'Óleos lubrificantes, graxas, pincéis.' },
  { id: 'p_gea_38', date: '07/12/2026', hours: 4, capacities: 'CT4: Entrega final e validação técnica', knowledge: 'Apresentação funcional de subconjuntos mecânicos.', strategy: 'Testes sob carga e avaliação sistêmica da qualidade do projeto fabricado.', resources: 'Painel de avaliação.' },
  { id: 'p_gea_39', date: '14/12/2026', hours: 4, capacities: 'Todas as capacities da UC', knowledge: 'Consolidação e avaliação de notas finais teórica-prática.', strategy: 'Feedbacks individuais sobre os desempenhos operacionais na oficina.', resources: 'Fichas de avaliação.' },
  { id: 'p_gea_40', date: '17/12/2026', hours: 4, capacities: 'Todas as capacities da UC', knowledge: 'Fechamento de diários de classe e notas de conselho.', strategy: 'Encerramento oficial da unidade curricular do segundo semestre.', resources: 'Sistema de notas.' }
];

const METIND_SCHEDULE_GEA = [
  { id: 'm_gea_01', date: '28/07/2026', hours: 4, capacities: 'CT1: Medição direta com instrumentos avançados', knowledge: '1. Medição direta: Paquímetro para engrenagens (módulo), Micrômetro de rosca e engrenagens.', strategy: 'Exposição e demonstração matemática de medição de dentes com paquímetro de módulo.', resources: 'Paquímetro de módulo, micrômetro de rosca, peças roscadas.' },
  { id: 'm_gea_02', date: '04/08/2026', hours: 4, capacities: 'CT1: Medição direta com instrumentos avançados', knowledge: '1.1.4. Rugosímetro: Parâmetros Ra, Rz, cutoff e técnicas de posicionamento da agulha.', strategy: 'Prática de medição de rugosidade em corpos de prova torneados, fresados e retificados.', resources: 'Rugosímetro de agulha, blocos padrão de rugosidade.' },
  { id: 'm_gea_03', date: '11/08/2026', hours: 4, capacities: 'CT1: Medição direta com instrumentos avançados', knowledge: '1.1.5. Calibrador de altura linear height: Ajuste e medição por coordenadas lineares.', strategy: 'Prática de medição de alturas, diâmetros e distâncias com coluna de medição linear.', resources: 'Coluna linear height, mesa de desempeno.' },
  { id: 'm_gea_04', date: '18/08/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2. Medição indireta: Comparador de diâmetro interno (Súbito). Setup com micrômetro.', strategy: 'Demonstração de zeragem do súbito e medição de conicidade em furos internos de peças.', resources: 'Súbito, micrômetro externo, anéis padrão.' },
  { id: 'm_gea_05', date: '25/08/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2.1.2. Calibrador passa não passa (Tampão e Anel). Tolerâncias de calibração.', strategy: 'Prática de inspeção de lotes de produção rápida por calibração funcional passa/não-passa.', resources: 'Calibradores tampão e anel cilíndrico.' },
  { id: 'm_gea_06', date: '01/09/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2.1.3. Bloco padrão: Combinações lineares, aderência por torção e acessórios.', strategy: 'Cálculo e montagem de pilhas de blocos padrão para conferência dimensional de micrômetros.', resources: 'Jogos de bloco padrão de classe 1 ou 2.' },
  { id: 'm_gea_07', date: '08/09/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2.1.4. Régua e mesa de seno: Cálculos trigonométricos de ângulos de precisão.', strategy: 'Montagem de corpos cônicos na mesa de seno associada a blocos padrão e relógio apalpador. (Aula com Balanceamento de Terça I)', resources: 'Mesa de seno, blocos padrão, relógio apalpador.' },
  { id: 'm_gea_08', date: '15/09/2026', hours: 4, capacities: 'CT3: Medição de dureza de materiais', knowledge: '3. Durômetro: Escalas Rockwell (A, B, C), Brinell e Vickers. Penetradores.', strategy: 'Prática laboratorial de ensaio de dureza Rockwell C em corpos endurecidos por têmpera.', resources: 'Durômetro de bancada, penetrador de diamante.' },
  { id: 'm_gea_09', date: '22/09/2026', hours: 4, capacities: 'CT4: Medição de perfil por imagem projetada', knowledge: '4. Projetor de perfil: Projeção Diascópica e Episcópica. Ampliação de lentes.', strategy: 'Alinhamento e medição de perfis complexos de roscas e raios por projeção de sombra.', resources: 'Projetor de perfil, goniômetro digital integrado.' },
  { id: 'm_gea_10', date: '29/09/2026', hours: 4, capacities: 'CT5: Medição tridimensional de peças', knowledge: '5. Máquina de medição por coordenadas (MMC): Tipos Manual e CNC. Palpadores eletrônicos.', strategy: 'Teoria sobre os 3 eixos espaciais coordenados (X,Y,Z) e criação de planos de referência.', resources: 'Projetor, manuais de metrologia 3D.' },
  { id: 'm_gea_11', date: '06/10/2026', hours: 4, capacities: 'CT5: Medição tridimensional de peças', knowledge: '5.4. Técnicas de utilização: Coleta de pontos manuais em peças usinadas.', strategy: 'Prática supervisionada em MMC manual para cubagem de blocos e furos coordenados.', resources: 'Máquina de medir por coordenadas manual.' },
  { id: 'm_gea_12', date: '13/10/2026', hours: 4, capacities: 'CT5: Medição tridimensional de peças', knowledge: '5.1.2. Programas CNC em MMC: Alinhamento automático e relatórios analíticos.', strategy: 'Demonstração de execução de programa de medição automatizada CNC de carcaças.', resources: 'MMC CNC, software de metrologia.' },
  { id: 'm_gea_13', date: '20/10/2026', hours: 4, capacities: 'CT6: Medição digital por sistemas de visão', knowledge: '6. Medição por Visão: Câmeras de alta resolução, iluminação e algoritmos de borda.', strategy: 'Configuração de sistemas ópticos automáticos digitais para medição sem contato.', resources: 'Sistema de medição por vídeo óptico.' },
  { id: 'm_gea_14', date: '27/10/2026', hours: 4, capacities: 'CT7: Medição com braço portátil', knowledge: '7. Braço de medição portátil: Articulações, calibração da esfera e encoders ópticos.', strategy: 'Prática de medição dimensional móvel diretamente em peças fixadas na bancada.', resources: 'Braço de medição portátil articulado.' },
  { id: 'm_ber_15', date: '03/11/2026', hours: 4, capacities: 'CT7: Medição com braço portátil', knowledge: '7.6. Dados: Exportação para arquivos CAD e relatórios de desvio geométrico.', strategy: 'Comparação de nuvem de pontos coletada por braço portátil contra modelo 3D nominal.', resources: 'Computador, software CAD/Metrologia.' },
  { id: 'm_gea_16', date: '10/11/2026', hours: 4, capacities: 'CT8: Testes de funcionalidade e conjuntos', knowledge: '8. Funcionalidade: Aspectos de montagem, folgas reais e comportamento sob esforço.', strategy: 'Montagem mecânica em bancada de testes para validação funcional de engrenamentos.', resources: 'Dispositivos e eixos montados.' },
  { id: 'm_gea_17', date: '17/11/2026', hours: 4, capacities: 'CT8: Testes de funcionalidade e conjuntos', knowledge: '8.4. Tipos de testes: Funcional de componentes e testes integrados.', strategy: 'Execução de roteiros de teste analítico e preenchimento de matrizes de conformidade.', resources: 'Fichas de ensaio técnico.' },
  { id: 'm_gea_18', date: '24/11/2026', hours: 4, capacities: 'CT1 a CT8: Prática analítica integrada', knowledge: 'Validação de tolerâncias geométricas complexas (GD&T) em desenhos técnicos.', strategy: 'Análise laboratorial completa de peças reprovadas na oficina de usinagem.', resources: 'Instrumentos do laboratório.' },
  { id: 'm_gea_19', date: '01/12/2026', hours: 4, capacities: 'CT1 a CT8: Relatórios finais e auditoria', knowledge: 'Emissão de certificados de conformidade técnica dimensional.', strategy: 'Estruturação de dossiê de qualidade das peças finais do projeto integrador.', resources: 'Computador, planilhas de desvios.' },
  { id: 'm_gea_20', date: '08/12/2026', hours: 4, capacities: 'Todas as capacities da UC', knowledge: 'Avaliação técnica laboratorial final e encerramento de diários.', strategy: 'Fechamento de médias e feedbacks individuais sobre exatidão metrológica.', resources: 'Fichas de notas.' }
];

// --- CRONOGRAMAS DETALHADOS: 2º SEMESTRE (PROFESSOR RICARDO BERETELLA) ---
const PRUSC_SCHEDULE_BERETELLA = [
  { id: 'p_ber_01', date: '24/07/2026', hours: 4, capacities: 'CT3: Operações de serramento', knowledge: '3. Serramento: Definição, Tipos de serra fita (Horizontal e Vertical), Lâminas.', strategy: 'Apresentação da UC e normas de segurança da oficina. Prática de corte de matéria-prima.', resources: 'Serra de fita horizontal, matéria-prima.' },
  { id: 'p_ber_02', date: '28/07/2026', hours: 4, capacities: 'CT1: Operações em torno convencional', knowledge: '1. Torneamento: Ferramenta de perfilamento, acessórios (lunetas, graminho).', strategy: 'Demonstração de alinhamento com graminho e montagem de acessórios no torno.', resources: 'Torno convencional, graminho, lunetas.' },
  { id: 'p_ber_03', date: '31/07/2026', hours: 4, capacities: 'CT1: Operações em torno convencional', knowledge: '1.3. Cálculos técnicos: Conicidade com desalinhamento do cabeçote móvel.', strategy: 'Aula teórica e exercícios práticos de cálculo de desalinhamento de cabeçote.', resources: 'Quadro, calculadoras, guias técnicos.' },
  { id: 'p_ber_04', date: '04/08/2026', hours: 4, capacities: 'CT1: Operações em torno convencional', knowledge: '1.4. Operação: Tornear perfil com ferramenta de forma.', strategy: 'Execução prática de torneamento cônico e perfilamento com ferramenta de forma.', resources: 'Torno convencional, ferramentas de perfil raiado.' },
  { id: 'p_ber_05', date: '07/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2. Fresagem: Ferramentas de gravação e esféricas. Acessórios (grampos e garras).', strategy: 'Mapeamento de fixação de peças na mesa da fresadora utilizando garras de fixação.', resources: 'Fresadora convencional, garras, grampos.' },
  { id: 'p_ber_06', date: '11/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.3. Conjunto divisor: Divisão direta e indireta.', strategy: 'Cálculos matemáticos para divisão de divisores universais. Prática de engrenamento básico.', resources: 'Aparelho divisor, discos de furo.' },
  { id: 'p_ber_07', date: '14/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.3.3. Divisão diferencial.', strategy: 'Demonstração de setup complexo para divisão diferencial na fresadora.', resources: 'Aparelho divisor, trem de engrenagens.' },
  { id: 'p_ber_08', date: '18/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.4.1. Fresar superfície plana paralela no aparelho divisor.', strategy: 'Usinagem de faces paralelas utilizando o divisor universal indexing.', resources: 'Fresadora, fresas de topo.' },
  { id: 'p_ber_09', date: '21/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.4.2. Furar de forma coordenada na fresadora.', strategy: 'Prática de furação coordenada utilizando os eixos X e Y da mesa micrométrica.', resources: 'Fresadora, brocas, cabeçote mandrilador.' },
  { id: 'p_ber_10', date: '25/08/2026', hours: 4, capacities: 'CT2: Operações em fresadora', knowledge: '2.4.3. Alargar furo manualmente na bancada.', strategy: 'Demonstração e execução manual na bancada de alargamento com alargadores fixos.', resources: 'Bancada, alargadores manuais, desandadores.' },
  { id: 'p_ber_11', date: '28/08/2026', hours: 4, capacities: 'CT4: Montagem de conjuntos mecânicos', knowledge: '4. Conjuntos mecânicos: Definição, tipos e características.', strategy: 'Análise de desenho de conjunto e planejamento da ordem de montagem técnica.', resources: 'Desenhos de conjunto mecânico.' },
  { id: 'p_ber_12', date: '01/09/2026', hours: 4, capacities: 'CT4: Montagem de conjuntos mecânicos', knowledge: '4.4. Técnicas de montagem e ajustagem (Lixamento e Polimento).', strategy: 'Prática de bancada voltada ao ajuste fino de faces deslizantes.', resources: 'Lixas abrasivas, blocos de polimento.' },
  { id: 'p_ber_13', date: '04/09/2026', hours: 4, capacities: 'CT5: Parâmetros em retificas', knowledge: '5. Retificação: Processos (Cilíndrica, Plana tangencial, Centerless, Afiadoras).', strategy: 'Aula teórica expositiva sobre a arquitetura e finalidade de cada tipo de retificadora.', resources: 'Projetor, catálogos técnicos.' },
  { id: 'p_ber_14', date: '08/09/2026', hours: 4, capacities: 'CT5: Parâmetros em retificas', knowledge: '5.2. Parâmetros: RPM da peça, RPM do rebolo, cálculo de Avanço.', strategy: 'Cálculos de velocidade periférica do rebolo e velocidade da peça na retífica.', resources: 'Formulários técnicos de retificação.' },
  { id: 'p_ber_15', date: '11/09/2026', hours: 4, capacities: 'CT6: Balanceamento do rebolo', knowledge: '6. Balanceamento e Rebolos: Tipos, classificação e inspeção de trincas (som).', strategy: 'Prática de ensaio acústico de rebolos e montagem inicial em flanges.', resources: 'Rebolos, martelo de madeira, flanges.' },
  { id: 'p_ber_16', date: '15/09/2026', hours: 4, capacities: 'CT6: Balanceamento do rebolo', knowledge: '6.2. Acessórios: Conjunto balanceador estático, eixo, nível de precisão, contrapesos.', strategy: 'Demonstração prática de balanceamento estático de rebolo no cavalete de precisão.', resources: 'Cavalete de balanceamento, contrapesos.' },
  { id: 'p_ber_17', date: '18/09/2026', hours: 4, capacities: 'CT6: Balanceamento do rebolo', knowledge: '6.3.2. Dressar rebolo.', strategy: 'Montagem do rebolo na máquina e operation de dressagem com ponta de diamante.', resources: 'Retificadora, dressador de diamante.' },
  { id: 'p_ber_18', date: '22/09/2026', hours: 4, capacities: 'CT7: Operações em retificadora cilíndrica', knowledge: '7. Retificadora cilíndrica: Características, componentes e acessórios (Placas, contraponta).', strategy: 'Setup completo da máquina: alinhamento de contrapontas e arrastadores.', resources: 'Retificadora cilíndrica, arrastadores.' },
  { id: 'p_ber_19', date: '25/09/2026', hours: 4, capacities: 'CT7: Operações em retificadora cilíndrica', knowledge: '7.4.1. Retificar superfície cilíndrica externa.', strategy: 'Usinagem abrasiva externa de eixos retificados previamente torneados.', resources: 'Retificadora cilíndrica, eixos de teste.' },
  { id: 'p_ber_20', date: '29/09/2026', hours: 4, capacities: 'CT7: Operações em retificadora cilíndrica', knowledge: '7.4.1. Controle dimensional de eixos na retífica.', strategy: 'Medição fina e monitoramento de aquecimento de peça em processo cilíndrico.', resources: 'Micrômetro, fluido refrigerante.' },
  { id: 'p_ber_21', date: '02/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8. Retificadora plana: Características, componentes e mesa magnética.', strategy: 'Operação de fixação por magnetismo e desmagnetização segura de peças de aço.', resources: 'Retificadora plana, placa magnética.' },
  { id: 'p_ber_22', date: '06/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.3. Acessórios: Morsa de precisão, calços e mesa de seno.', strategy: 'Montagem de setups angulares na retificadora plana com mesa de seno.', resources: 'Mesa de seno, blocos padrão, morsa de precisão.' },
  { id: 'p_ber_23', date: '09/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.4.1. Retificar superfície plana.', strategy: 'Usinagem da primeira face de blocos temperados para garantia de planeza.', resources: 'Retificadora plana, blocos de aço.' },
  { id: 'p_ber_24', date: '13/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.4.2. Retificar superfície plana paralela.', strategy: 'Retificação da segunda face para controle rígido de paralelismo dimensional.', resources: 'Retificadora plana, micrômetro centesimal.' },
  { id: 'p_ber_25', date: '16/10/2026', hours: 4, capacities: 'CT8: Operações em retificadora plana', knowledge: '8.4.3. Retificar superfície plana perpendicular.', strategy: 'Usinagem a 90 graus utilizando morsa de precisão e esquadro técnico.', resources: 'Retificadora plana, esquadro retificado.' },
  { id: 'p_ber_26', date: '20/10/2026', hours: 4, capacities: 'CT1 e CT2: Manutenção e processos integrados', knowledge: 'Integração Torno-Fresa para fabricação de subconjuntos mecânicos.', strategy: 'Início da usinagem do projeto final integrando torneamento e fresagem paralela.', resources: 'Oficina mecânica integrada.' },
  { id: 'p_ber_27', date: '23/10/2026', hours: 4, capacities: 'CT1 e CT2: Manutenção e processos integrados', knowledge: 'Usinagem fina de componentes do projeto integrado.', strategy: 'Acompanhamento do plano de trabalho de usinagem sequencial desenvolvido pelo aluno.', resources: 'Torno e fresadora.' },
  { id: 'p_ber_28', date: '27/10/2026', hours: 4, capacities: 'CT4: Ajustagem fina e montagem', knowledge: 'Técnicas transversais de acabamento em guias deslizantes.', strategy: 'Ajustagem fina de montagem com controle de folga por meio de azul de prússia.', resources: 'Azul de prússia, raspadores de metal.' },
  { id: 'p_ber_29', date: '30/10/2026', hours: 4, capacities: 'CT7 e CT8: Retificação final de precisão', knowledge: 'Retificação das folgas funcionais dos eixos e placas montadas.', strategy: 'Usinagem de correção dimensional final nos conjuntos usinados do projeto.', resources: 'Retificadoras cilíndrica e plana.' },
  { id: 'p_ber_30', date: '03/11/2026', hours: 4, capacities: 'CT4: Teste funcional de conjuntos', knowledge: 'Montagem mecânica completa e verificação cinemática.', strategy: 'Avaliação da suavidade de movimento mecânico e adjustments de fixação de parafusos.', resources: 'Chaves de aperto, bancada de montagem.' },
  { id: 'p_ber_31', date: '06/11/2026', hours: 4, capacities: 'CT1 a CT8: Prática supervisionada de refugo e correção', knowledge: 'Estudo de caso e retrabalho de componentes fora de tolerância.', strategy: 'Recuperação de peças corrigindo diâmetros e superfícies por retificação ou buchas.', resources: 'Máquinas-ferramenta.' },
  { id: 'p_ber_32', date: '10/11/2026', hours: 4, capacities: 'CT1 a CT8: Prática avançada de usinagem', knowledge: 'Operações complexas acumuladas: Divisor indireto + Retífica plana.', strategy: 'Usinagem final de ranhuras sincronizadas e canais em eixos retificados.', resources: 'Fresadora e retificadora.' },
  { id: 'p_ber_33', date: '13/11/2026', hours: 4, capacities: 'CT1 a CT8: Otimização de processos', knowledge: 'Análise de tempos de corte e desgaste de ferramentas.', strategy: 'Aplicação prática de melhoria de velocidade e avanços para aumento de rendimento.', resources: 'Ferramental técnico.' },
  { id: 'p_ber_34', date: '17/11/2026', hours: 4, capacities: 'CT4: Ajustagem de conjuntos complexos', knowledge: 'Montagem técnica final com elementos de fixação.', strategy: 'Torqueamento correto e travamento mecânico de conjuntos rotativos.', resources: 'Torquímetro, parafusos.' },
  { id: 'p_ber_35', date: '24/11/2026', hours: 4, capacities: 'CT1 a CT8: Acabamento superficial rigoroso', knowledge: 'Usinagem abrasiva final e polimento técnico espelhado.', strategy: 'Execução de etapas de polimento fino com pastas de diamante na bancada.', resources: 'Pastas abrasivas, feltros.' },
  { id: 'p_ber_36', date: '27/11/2026', hours: 4, capacities: 'CT1 a CT8: Revisão prática de oficina', knowledge: 'Fechamento dos postos de trabalho mecânico do semestre.', strategy: 'Finalização de usinagens brutas e checagem final de dimensional técnico.', resources: 'Instrumentos de medição.' },
  { id: 'p_ber_37', date: '01/12/2026', hours: 4, capacities: 'CS1 e CS2: Conservação patrimonial e 5S', knowledge: 'Conservação de máquinas de usinagem e rebolos.', strategy: 'Prática intensa de limpeza de barramentos, lubrificação de guias e organização.', resources: 'Óleos lubrificantes, graxas, pincéis.' },
  { id: 'p_ber_38', date: '04/12/2026', hours: 4, capacities: 'CT4: Entrega final e validação técnica', knowledge: 'Apresentação funcional de subconjuntos mecânicos.', strategy: 'Testes sob carga e avaliação sistêmica da qualidade do projeto fabricado.', resources: 'Painel de avaliação.' },
  { id: 'p_ber_39', date: '08/12/2026', hours: 4, capacities: 'Todas as capacities da UC', knowledge: 'Consolidação e avaliação de notas finais teórica-prática.', strategy: 'Feedbacks individuais sobre os desempenhos operacionais na oficina.', resources: 'Fichas de avaliação.' },
  { id: 'p_ber_40', date: '11/12/2026', hours: 4, capacities: 'Todas as capacities da UC', knowledge: 'Fechamento de diários de classe e notas de conselho.', strategy: 'Encerramento oficial da unidade curricular do segundo semestre.', resources: 'Sistema de notas.' }
];

const METIND_SCHEDULE_BERETELLA = [
  { id: 'm_ber_01', date: '27/07/2026', hours: 4, capacities: 'CT1: Medição direta com instrumentos avançados', knowledge: '1. Medição direta: Paquímetro para engrenagens (módulo), Micrômetro de rosca e engrenagens.', strategy: 'Exposição e demonstração matemática de medição de dentes com paquímetro de módulo.', resources: 'Paquímetro de módulo, micrômetro de rosca, peças roscadas.' },
  { id: 'm_ber_02', date: '03/08/2026', hours: 4, capacities: 'CT1: Medição direta com instrumentos avançados', knowledge: '1.1.4. Rugosímetro: Parâmetros Ra, Rz, cutoff e técnicas de posicionamento da agulha.', strategy: 'Prática de medição de rugosidade em corpos de prova torneados, fresados e retificados.', resources: 'Rugosímetro de agulha, blocos padrão de rugosidade.' },
  { id: 'm_ber_03', date: '05/08/2026', hours: 4, capacities: 'CT1: Medição direta com instrumentos avançados', knowledge: '1.1.5. Calibrador de altura linear height: Ajuste e medição por coordenadas lineares. (Aula de Segunda I)', resources: 'Coluna linear height, mesa de desempeno.' },
  { id: 'm_ber_04', date: '10/08/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2. Medição indireta: Comparador de diâmetro interno (Súbito). Setup com micrômetro.', strategy: 'Demonstração de zeragem do súbito e medição de conicidade em furos internos de peças.', resources: 'Súbito, micrômetro externo, anéis padrão.' },
  { id: 'm_ber_05', date: '17/08/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2.1.2. Calibrador passa não passa (Tampão e Anel). Tolerâncias de calibração.', strategy: 'Prática de inspeção de lotes de produção rápida por calibração funcional passa/não-passa.', resources: 'Calibradores tampão e anel cilíndrico.' },
  { id: 'm_ber_06', date: '24/08/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2.1.3. Bloco padrão: Combinações lineares, aderência por torção e acessórios.', strategy: 'Cálculo e montagem de pilhas de blocos padrão para conferência dimensional de micrômetros.', resources: 'Jogos de bloco padrão de classe 1 ou 2.' },
  { id: 'm_ber_07', date: '26/08/2026', hours: 4, capacities: 'CT2: Medição de ordem indireta', knowledge: '2.1.4. Régua e mesa de seno: Cálculos trigonométricos de ângulos de precisão. (Aula de Segunda II)', strategy: 'Montagem de corpos cônicos na mesa de seno associada a blocos padrão e relógio apalpador.', resources: 'Mesa de seno, blocos padrão, relógio apalpador.' },
  { id: 'm_ber_08', date: '31/08/2026', hours: 4, capacities: 'CT3: Medição de dureza de materiais', knowledge: '3. Durômetro: Escalas Rockwell (A, B, C), Brinell e Vickers. Penetradores.', strategy: 'Prática laboratorial de ensaio de dureza Rockwell C em corpos endurecidos por têmpera.', resources: 'Durômetro de bancada, penetrador de diamante.' },
  { id: 'm_ber_09', date: '14/09/2026', hours: 4, capacities: 'CT4: Medição de perfil por imagem projetada', knowledge: '4. Projetor de perfil: Projeção Diascópica e Episcópica. Ampliação de lentes.', strategy: 'Alinhamento e medição de perfis complexos de roscas e raios por projeção de sombra.', resources: 'Projetor de perfil, goniômetro digital integrado.' },
  { id: 'm_ber_10', date: '21/09/2026', hours: 4, capacities: 'CT5: Medição tridimensional de peças', knowledge: '5. Máquina de medição por coordenadas (MMC): Tipos Manual e CNC. Palpadores eletrônicos.', strategy: 'Teoria sobre os 3 eixos espaciais coordenados (X,Y,Z) e criação de planos de referência.', resources: 'Projetor, manuais de metrologia 3D.' },
  { id: 'm_ber_11', date: '28/09/2026', hours: 4, capacities: 'CT5: Medição tridimensional de peças', knowledge: '5.4. Techniques de utilização: Coleta de pontos manuais em peças usinadas.', strategy: 'Prática supervisionada em MMC manual para cubagem de blocos e furos coordenados.', resources: 'Máquina de medir por coordenadas manual.' },
  { id: 'm_ber_12', date: '05/10/2026', hours: 4, capacities: 'CT5: Medição tridimensional de peças', knowledge: '5.1.2. Programas CNC em MMC: Alinhamento automático e relatórios analíticos.', strategy: 'Demonstração de execução de programa de medição automatizada CNC de carcaças.', resources: 'MMC CNC, software de metrologia.' },
  { id: 'm_ber_13', date: '19/10/2026', hours: 4, capacities: 'CT6: Medição digital por sistemas de visão', knowledge: '6. Medição por Visão: Câmeras de alta resolução, iluminação e algoritmos de borda.', strategy: 'Configuração de sistemas ópticos automáticos digitais para medição sem contato.', resources: 'Sistema de medição por vídeo óptico.' },
  { id: 'm_ber_14', date: '26/10/2026', hours: 4, capacities: 'CT7: Medição com braço portátil', knowledge: '7. Braço de medição portátil: Articulações, calibração da esfera e encoders ópticos.', strategy: 'Prática de medição dimensional móvel diretamente em peças fixadas na bancada.', resources: 'Braço de medição portátil articulado.' },
  { id: 'm_ber_15', date: '09/11/2026', hours: 4, capacities: 'CT7: Medição com braço portátil', knowledge: '7.6. Dados: Exportação para arquivos CAD e relatórios de desvio geométrico.', strategy: 'Comparação de nuvem de pontos coletada por braço portátil contra modelo 3D nominal.', resources: 'Computador, software CAD/Metrologia.' },
  { id: 'm_ber_16', date: '16/11/2026', hours: 4, capacities: 'CT8: Testes de funcionalidade e conjuntos', knowledge: '8. Funcionalidade: Aspectos de montagem, folgas reais e comportamento sob esforço.', strategy: 'Montagem mecânica em bancada de testes para validação funcional de engrenamentos.', resources: 'Dispositivos e eixos montados.' },
  { id: 'm_ber_17', date: '23/11/2026', hours: 4, capacities: 'CT8: Testes de funcionalidade e conjuntos', knowledge: '8.4. Tipos de testes: Funcional de componentes e testes integrados.', strategy: 'Execução de roteiros de teste analítico e preenchimento de matrizes de conformidade.', resources: 'Fichas de ensaio técnico.' },
  { id: 'm_ber_18', date: '30/11/2026', hours: 4, capacities: 'CT1 a CT8: Prática analítica integrada', knowledge: 'Validação de tolerâncias geométricas complexas (GD&T) em desenhos técnicos.', strategy: 'Análise laboratorial completa de peças reprovadas na oficina de usinagem.', resources: 'Instrumentos do laboratório.' },
  { id: 'm_ber_19', date: '07/12/2026', hours: 4, capacities: 'CT1 a CT8: Relatórios finais e auditoria', knowledge: 'Emissão de certificados de conformidade técnica dimensional.', strategy: 'Estruturação de dossiê de qualidade das peças finais do projeto integrador.', resources: 'Computador, planilhas de desvios.' },
  { id: 'm_ber_20', date: '14/12/2026', hours: 4, capacities: 'Todas as capacities da UC', knowledge: 'Avaliação técnica laboratorial final e encerramento de diários.', strategy: 'Fechamento de médias e feedbacks individuais sobre exatidão metrológica.', resources: 'Fichas de notas.' }
];

// ============================================================================
// OBJETO ESTRUTURAL MANTENDO AS DUAS ABORDAGENS DE INTEGRAÇÃO (ARRAY E DICIONÁRIO)
// ============================================================================

// 1. Definição Base por Chaves Estruturadas (Garante compatibilidade total do mapeamento clássico)
const PLAN_DATA_STRUCTURE = {
  'ricardo-beretella': {
    '1º SEM': {
      id: 'plan_beretella_1sem',
      courseName: 'Mecânico de Usinagem Convencional',
      period: '1º SEM',
      semester: 1,
      instructor: 'Ricardo Beretella',
      units: [
        {
          id: 'uc_lidt_1sem',
          code: 'MSEP',
          name: 'Leitura e Interpretação de Desenho Técnico',
          hours: 60,
          capacities: [
            '1. Interpretar desenhos técnicos de peças a partir de projetos da metalmecânica.',
            '2. Elaborar croquis de peças em projeção ortogonal e em perspectiva à mão livre.'
          ],
          knowledge: [
            '1. DESENHO TÉCNICO: Definição, Normas técnicas, Primeiro e Terceiro diedro, Linhas.'
          ],
          schedule: []
        }
      ]
    },
    '2º SEM': {
      id: 'plan_beretella_2sem',
      courseName: 'Mecânico de Usinagem Convencional',
      period: '2º SEM',
      semester: 2,
      instructor: 'Ricardo Beretella',
      units: [
        {
          id: 'uc_prusc_ber',
          code: 'PRUSC',
          name: 'Processos de Usinagem Convencional',
          hours: 160,
          capacities: [
            '1. Operar torno mecânico convencional seguindo procedimentos técnicos e de segurança.',
            '2. Operar fresadora convencional para a execução de perfis planos e canais.',
            '3. Realizar operações de retificação plana e cilíndrica de precisão.'
          ],
          knowledge: [
            '1. TORNEAMENTO: Parâmetros de corte, Ferramentas de corte, Tipos de roscas e rebaixos.',
            '2. FRESAGEM: Divisor universal, Tipos de fresas, Cálculos de engrenamento e velocidades.',
            '3. RETIFICAÇÃO: Balanceamento de rebolos, Dressagem, Fixação magnética de superfícies.'
          ],
          schedule: PRUSC_SCHEDULE_BERETELLA
        },
        {
          id: 'uc_metind_ber',
          code: 'METIND',
          name: 'Metrologia Industrial',
          hours: 80,
          capacities: [
            '1. Utilizar instrumentos de medição linear e angular de alta resolução.',
            '2. Operar projetor de perfil e calibradores especiais passa-não-passa.',
            '3. Realizar controle dimensional em máquinas tridimensionais manuais e CNC.'
          ],
          knowledge: [
            '1. INSTRUMENTOS: Micrômetros de rosca, Relógio apalpador, Rugosímetro e Linear Height.',
            '2. CALIBRAÇÃO: Blocos padrão, Mesa e régua de seno, Tolerâncias geométricas de forma.',
            '3. METROLOGIA AVANÇADA: Máquina de Medir por Coordenadas (MMC), Sistemas ópticos e braço portátil.'
          ],
          schedule: METIND_SCHEDULE_BERETELLA
        }
      ]
    }
  },
  'ricardo-gea': {
    '1º SEM': {
      id: 'plan_gea_1sem',
      courseName: 'Mecânico de Usinagem Convencional',
      period: '1º SEM',
      semester: 1,
      instructor: 'Ricardo Gea',
      units: [
        {
          id: 'uc_lidt_gea_1sem',
          code: 'MSEP',
          name: 'Leitura e Interpretação de Desenho Técnico',
          hours: 60,
          capacities: [
            '1. Interpretar desenhos técnicos de peças a partir de projetos da metalmecânica.',
            '2. Elaborar croquis de peças em projeção ortogonal.'
          ],
          knowledge: [
            '1. DESENHO TÉCNICO: Definição, Normas técnicas, Projeções e Linhas.'
          ],
          schedule: []
        }
      ]
    },
    '2º SEM': {
      id: 'plan_gea_2sem',
      courseName: 'Mecânico de Usinagem Convencional',
      period: '2º SEM',
      semester: 2,
      instructor: 'Ricardo Gea',
      units: [
        {
          id: 'uc_prusc_gea',
          code: 'PRUSC',
          name: 'Processos de Usinagem Convencional',
          hours: 160,
          capacities: [
            '1. Operar torno mecânico convencional seguindo procedimentos técnicos e de segurança.',
            '2. Operar fresadora convencional para a execução de perfis planos e canais.',
            '3. Realizar operações de retificação plana e cilíndrica de precisão.'
          ],
          knowledge: [
            '1. TORNEAMENTO: Parâmetros de corte, Ferramentas de corte, Tipos de roscas e rebaixos.',
            '2. FRESAGEM: Divisor universal, Tipos de fresas, Cálculos de engrenamento e velocidades.',
            '3. RETIFICAÇÃO: Balanceamento de rebolos, Dressagem, Fixação magnética de superfícies.'
          ],
          schedule: PRUSC_SCHEDULE_GEA
        },
        {
          id: 'uc_metind_gea',
          code: 'METIND',
          name: 'Metrologia Industrial',
          hours: 80,
          capacities: [
            '1. Utilizar instrumentos de medição linear e angular de alta resolução.',
            '2. Operar projetor de perfil e calibradores especiais passa-não-passa.',
            '3. Realizar controle dimensional em máquinas tridimensionais manuais e CNC.'
          ],
          knowledge: [
            '1. INSTRUMENTOS: Micrômetros de rosca, Relógio apalpador, Rugosímetro e Linear Height.',
            '2. CALIBRAÇÃO: Blocos padrão, Mesa e régua de seno, Tolerâncias geométricas de forma.',
            '3. METROLOGIA AVANÇADA: Máquina de Medir por Coordenadas (MMC), Sistemas ópticos e braço portátil.'
          ],
          schedule: METIND_SCHEDULE_GEA
        }
      ]
    }
  }
};

// 2. Exportação unificada de SAMPLE_PLANS atuando tanto como Array (com propriedades injetadas) quanto Object
export const SAMPLE_PLANS = Object.assign(
  [
    { ...PLAN_DATA_STRUCTURE['ricardo-beretella']['1º SEM'], profileId: 'ricardo-beretella' },
    { ...PLAN_DATA_STRUCTURE['ricardo-beretella']['2º SEM'], profileId: 'ricardo-beretella' },
    { ...PLAN_DATA_STRUCTURE['ricardo-gea']['1º SEM'], profileId: 'ricardo-gea' },
    { ...PLAN_DATA_STRUCTURE['ricardo-gea']['2º SEM'], profileId: 'ricardo-gea' }
  ],
  PLAN_DATA_STRUCTURE
);
