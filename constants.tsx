
import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

const CRD_SCHEDULE = [
  { id: 'c1', date: '27/01/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia na indústria metalmecânica.', knowledge: '1. Metrologia (1.1 a 1.5)', strategy: 'Apresentação da Situação de Aprendizagem (SA). Exposição dialogada sobre a importância da metrologia, normas e terminologia.', resources: 'Sala de aula, projetor, computador, material da SA.' },
  { id: 'c2', date: '03/02/2026', hours: 2, capacities: 'I. Identificar a importância da metrologia na indústria metalmecânica.', knowledge: '2. Erros de medição (2.1 a 2.4)', strategy: 'Discussão em grupo sobre os tipos e fontes de erro na medição. Demonstração de erros comuns (paralaxe, força excessiva).', resources: 'Sala de aula, projetor, instrumentos de medição para demonstração.' },
  { id: 'c3', date: '10/02/2026', hours: 2, capacities: 'II. Medir peças com escala. III. Medir peças com trena.', knowledge: '3. Escala (3.1 a 3.3). 4. Trena (4.1 a 4.3)', strategy: 'Demonstração prática do uso de escalas e trenas. Exercícios práticos de medição em peças simples.', resources: 'Laboratório de Metrologia, escalas, trenas, peças diversas.' },
  { id: 'c4', date: '24/02/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro. I. Demonstrar atenção a detalhes.', knowledge: '5. Paquímetros (5.1, 5.2)', strategy: 'Exposição dialogada sobre os tipos de paquímetros e suas características. Demonstração do manuseio correto.', resources: 'Laboratório de Metrologia, projetor, diferentes tipos de paquímetros.' },
  { id: 'c5', date: '03/03/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro. I. Demonstrar atenção a detalhes.', knowledge: '5. Paquímetros (5.3, 5.4, 5.5)', strategy: 'Demonstração e exercício prático de leitura no sistema métrico (0,05mm e 0,02mm).', resources: 'Laboratório de Metrologia, paquímetros, peças didcidas com medidas conhecidas.' },
  { id: 'c6', date: '10/03/2026', hours: 2, capacities: 'IV. Medir peças com paquímetro. I. Demonstrar atenção a detalhes. I. Organizar o ambiente de trabalho e as atividades.', knowledge: '5. Paquímetros (5.5)', strategy: 'Exercício prático supervisionado de medição em peças variadas, com preenchimento de relatório simples.', resources: 'Laboratório de Metrologia, paquímetros, peças, formulário de relatório.' },
  { id: 'c7', date: '17/03/2026', hours: 2, capacities: 'V. Medir peças no sistema métrico com micrômetro. II. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais.', knowledge: '6. Micrômetros (6.1, 6.2, 6.3)', strategy: 'Exposição sobre os tipos de micrômetros. Demonstração do manuseio, ajuste do zero e uso da catraca.', resources: 'Laboratório de Metrologia, projetor, diferentes tipos de micrômetros.' },
  { id: 'c8', date: '24/03/2026', hours: 2, capacities: 'V. Medir peças no sistema métrico com micrômetro. I. Demonstrar atenção a detalhes.', knowledge: '6. Micrômetros (6.3, 6.4, 6.5)', strategy: 'Demonstração e exercício prático de leitura no sistema métrico (0,01 mm).', resources: 'Laboratório de Metrologia, micrômetros, peças didáticas.' },
  { id: 'c9', date: '31/03/2026', hours: 2, capacities: 'V. Medir peças no sistema métrico com micrômetro. I. Demonstrar atenção a detalhes. I. Organizar o ambiente de trabalho e as atividades.', knowledge: '6. Micrômetros (6.5)', strategy: 'Exercício prático supervisionado de medição com micrômetros e preenchimento de relatório, comparando com medidas do paquímetro.', resources: 'Laboratório de Metrologia, micrômetros, paquímetros, peças, relatório.' },
  { id: 'c10', date: '07/04/2026', hours: 2, capacities: 'VI. Verificar dimensões e perfis com verificadores.', knowledge: '7. Verificadores (7.1, 7.2)', strategy: 'Demonstração do uso de calibradores de folga, raio e rosca. Exercício prático de verificação em peças.', resources: 'Laboratório de Metrologia, jogos de verificadores, peças com roscas e raios.' },
  { id: 'c11', date: '14/04/2026', hours: 2, capacities: 'VII. Medir por comparação com relógio apalpador e comparador.', knowledge: '8. Relógios comparadores e apalpadores (8.1, 8.2)', strategy: 'Exposição sobre os tipos e características dos relógios. Demonstração de montagem em suportes magnéticos.', resources: 'Laboratório de Metrologia, relógios comparadores e apalpadores, suportes.' },
  { id: 'c12', date: '28/04/2026', hours: 2, capacities: 'VII. Medir por comparação com relógio apalpador e comparador.', knowledge: '8. Relógios comparadores e apalpadores (8.3, 8.4)', strategy: 'Exercício prático de zeragem com blocos-padrão e medição por comparação (ex: planicidade, concentricidade).', resources: 'Laboratório de Metrologia, relógios, suportes, blocos-padrão, desempeno.' },
  { id: 'c13', date: '05/05/2026', hours: 2, capacities: 'VIII. Medir peças com goniômetro.', knowledge: '9. Goniômetro (9.1 a 9.4)', strategy: 'Demonstração do uso do goniômetro (transferidor de grau) para medição de ângulos em peças.', resources: 'Laboratório de Metrologia, goniômetros, peças com chanfros e ângulos.' },
  { id: 'c14', date: '12/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Revisão geral de todos os instrumentos. Planejamento em grupo para a execução do desafio da SA.', resources: 'Sala de aula, projetor, material da SA, desenhos técnicos.' },
  { id: 'c15', date: '19/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Início da Execução do Desafio: Análise do desenho técnico e início das medições do lote de "Pinos de Ancoragem".', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c16', date: '26/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Execução do Desafio: Continuação das medições e preenchimento dos relatórios de inspeção.', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c17', date: '02/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Execução do Desafio: Finalização das medições. Comparação dos resultados com as tolerâncias.', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c18', date: '09/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Finalização do Desafio: Consolidação dos dados, emissão do parecer final sobre o lote e preparação da apresentação.', resources: 'Laboratório de Metrologia/Sala de aula, relatórios preenchidos, computador.' },
  { id: 'c19', date: '16/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Apresentação dos Resultados: Grupos apresentam seus relatórios e pareceres ao "Gestor da Qualidade" (docente).', resources: 'Sala de aula, projetor, relatórios consolidados.' },
  { id: 'c20', date: '23/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Feedback final sobre o desempenho na SA. Autoavaliação e fechamento da Unidade Curricular.', resources: 'Sala de aula, instrumentos de avaliação preenchidos.' }
];

const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacidades da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto"; • Dinâmica de Grupo: Formação das equipes e discussão inicial sobre a importância do desenho técnico no mundo do trabalho.', resources: 'Sala de aula, projetor, computador, Plano de Ensino, material da SA.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT, formatos de papel e tipos de linhas. • Atividade prática: Análise de desenhos técnicos para identificação dos tipos de linhas e suas aplicações.', resources: 'Sala de aula, projetor, exemplos de desenhos técnicos, apostila.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração: Explicação sobre escalas (natural, redução, ampliação). • Apresentação de figuras e sólidos geométricos.', resources: 'Projetor, modelos de sólidos geométricos, desenhos com diferentes escalas.' },
  { id: 'l4', date: '16/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica. Exercícios de esboço à mão livre de sólidos geométricos simples em perspectiva.', resources: 'Sala de aula, papel, lápis, borracha, modelos de sólidos.' },
  { id: 'l5', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais (frontal, superior, lateral) a partir de modelos sólidos simples. Discussão sobre supressão de vistas.', resources: 'Sala de aula, papel, lápis, borracha, modelos de peças simples.' },
  { id: 'l6', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas únicas, face de referência, eixo de simetria).', strategy: '• Exposição dialogada e Prática: Apresentação das regras de cotagem. Exercícios de cotagem de vistas ortogonais.', resources: 'Projetor, exemplos de desenhos cotados, exercícios impressos.' },
  { id: 'l7', date: '09/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração: Explicação da necessidade e representação de cortes. Análise de desenhos com corte total e meio corte.', resources: 'Projetor, desenhos técnicos com cortes, peças seccionadas (se disponível).' },
  { id: 'l8', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte (composto, parcial, seção, omissão, encurtamento).', strategy: '• Estudo de caso: As equipes analisam desenhos complexos e identificam os diferentes tipos de cortes e seções, discutindo sua aplicação.', resources: 'Projetor, conjunto de desenhos técnicos variados.' },
  { id: 'l9', date: '23/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação de elemento).', strategy: '• Atividade prática: Exercícios de desenho de vistas auxiliares para representação de faces inclinadas.', resources: 'Sala de aula, papel, instrumentos de desenho, modelos de peças com faces inclinadas.' },
  { id: 'l10', date: '30/03/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, elementos, vista explodida).', strategy: '• Exposição dialogada: Apresentação da estrutura de um desenho de conjunto, vista explodida e elementos padronizados.', resources: 'Projetor, exemplo de desenho de conjunto complexo (ex: morsa).' },
  { id: 'l11', date: '06/04/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5.3. Lista de materiais; 5.4. Balões de identificação.', strategy: '• Atividade em equipe: Análise do desenho de "Subconjunto do Acoplamento AC-102". As equipes devem correlacionar a lista de materiais com os balões na vista explodida.', resources: 'Cópia do desenho da SA para cada equipe, projetor.' },
  { id: 'l12', date: '13/04/2026', hours: 2, capacities: 'Interpretar tolerância dimensional.', knowledge: '6.1. Tolerância dimensional (campos, sistema ISO).', strategy: '• Exposição dialogada: Introdução aos conceitos de tolerância, afastamentos e sistema de ajuste ISO (eixo-base e furo-base).', resources: 'Projetor, tabelas de tolerância ISO, exemplos de eixos e furos com ajustes.' },
  { id: 'l13', date: '27/04/2026', hours: 2, capacities: 'Interpretar tolerância geométrica.', knowledge: '6.2. Tolerância geométrica (forma, posição, orientação, batimento).', strategy: '• Exposição dialogada: Apresentação dos símbolos e significado das principais tolerâncias geométricas (retitude, planicidade, paralelismo, etc.).', resources: 'Projetor, quadro de tolerâncias geométricas, peças de exemplo.' },
  { id: 'l14', date: '04/05/2026', hours: 2, capacities: 'Interpretar acabamento superficial.', knowledge: '6.3. Acabamento superficial (rugosidade, tratamento, recartilhado, sobremetal).', strategy: '• Exposição dialogada: Explicação dos símbolos de acabamento superficial e sua relação com os processos de fabricação.', resources: 'Projetor, tabela de símbolos de rugosidade, rugosímetros (se disponível).' },
  { id: 'l15', date: '11/05/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Trabalho em equipe (Oficina): Início da elaboração dos croquis detalhados e do relatório de análise crítica do desafio proposto na SA. O docente atua como mediador.', resources: 'Sala de aula/oficina, cópias do projeto da SA, papel, instrumentos de desenho.' },
  { id: 'l16', date: '18/05/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Trabalho em equipe (Oficina): Continuação e refinamento dos croquis e preenchimento da ficha de análise crítica.', resources: 'Sala de aula/oficina, cópias do projeto da SA, papel, instrumentos de desenho.' },
  { id: 'l17', date: '25/05/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Trabalho em equipe (Oficina): Finalização dos croquis e do dossiê técnico. Revisão final das informações.', resources: 'Sala de aula/oficina, dossiê em fase de conclusão.' },
  { id: 'l18', date: '01/06/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Apresentação dos Resultados: Equipes apresentam seus Dossiês Técnicos e explicam a análise das tolerâncias.', resources: 'Sala de aula, projetor, dossiês finalizados.' },
  { id: 'l19', date: '08/06/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Feedback e Avaliação: Devolutiva do docente sobre o desempenho das equipes e autoavaliação.', resources: 'Sala de aula, fichas de avaliação.' },
  { id: 'l20', date: '15/06/2026', hours: 2, capacities: 'Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: '• Encerramento da Unidade Curricular e fechamento de notas.', resources: 'Sala de aula.' }
];

const FULL_KNOWLEDGE_CRD = [
  { topic: '1. Metrologia', subtopics: ['I. Definição', 'II. Características', 'III. Aplicações', 'IV. Terminologia (Vocabulário Internacional de Metrologia - VIM)'] },
  { topic: '2. Erros de medição', subtopics: ['I. Tipos', 'I.I. Aleatório', 'I.I. Sistemático', 'I.I. Grosseiro', 'II. Fontes de erro', 'I.I. Variação da temperatura', 'I.I. Paralaxe', 'I.I. Força de medição', 'I.I. Complexidade da peça', 'I.I. Condições do Instrumento', 'I.I. Processos de correção', 'I.I. Calibração do Instrumento'] },
  { topic: '3. Escala', subtopics: ['I. Tipos', 'II. Características', 'III. Leitura', 'I.I. Sistema métrico', 'I.I. Sistema Inglês', 'IV. Conversão entre sistemas de medida', 'V. Erros de leitura', 'VI. Utilização'] },
  { topic: '4. Trena', subtopics: ['I. Tipos', 'II. Características', 'III. Leitura no sistema métrico', 'IV. Erros de leitura', 'V. Utilização'] },
  { topic: '5. Paquímetros', subtopics: ['I. Tipos', 'II. Características', 'III. Leitura', 'I.I. Sistema métrico', 'I.I. Sistema Inglês', 'IV. Erros de leitura', 'V. Utilização'] },
  { topic: '6. Micrômetros', subtopics: ['I. Tipos', 'II. Características', 'III. Leitura no sistema métrico', 'IV. Erros de leitura', 'V. Ajuste zero', 'VI. Utilização'] },
  { topic: '7. Verificadores', subtopics: ['I. Tipos', 'I.I. Folga', 'I.I. Raio', 'I.I. Rosca', 'II. Utilização'] },
  { topic: '8. Relógios comparadores e apalpadores', subtopics: ['I. Tipos', 'II. Características', 'III. Ajuste zero', 'IV. Utilização'] },
  { topic: '9. Goniômetro', subtopics: ['I. Tipos', 'II. Características', 'III. Erros de leitura', 'IV. Utilização'] }
];

const FULL_CAPACITIES_CRD = [
  'I. Identificar a importância da metrologia na indústria metalmecânica.',
  'I. Medir peças com escala.',
  'I. Medir peças com trena.',
  'I. Medir peças com paquímetro.',
  'I. Medir peças no sistema métrico com micrômetro.',
  'I. Verificar dimensões e perfis com verificadores.',
  'I. Medir por comparação com relógio apalpador e comparador.',
  'I. Medir peças com goniômetro.'
];

const FULL_SOCIOEMOCIONAL_CRD = [
  'Pensamento analítico: I. Demonstrar atenção a detalhes',
  'Autogestão: I. Organizar o ambiente de trabalho e as atividades',
  'Autogestão: I. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais'
];

const FULL_RUBRICS_CRD = [
  { capacity: 'Medir peças com paquímetro.', nsa: 'Tenta medir, mas comete erros grosseiros na leitura da escala ou no manuseio.', apo: 'Realiza a medição com auxílio, cometendo erros pontuais na leitura do nônio ou no manuseio.', par: 'Mede a peça de forma autônoma e correta, aplicando as técnicas de manuseio e leitura.', aut: 'Mede com precisão e rapidez, identificando potenciais fontes de erro (paralaxe, etc).' },
  { capacity: 'Medir peças com micrômetro.', nsa: 'Comete erros no posicionamento do instrumento ou na leitura, necessitando orientação inicial.', apo: 'Realiza a medição com auxílio do docente na soma das escalas ou no uso da catraca.', par: 'Realiza a medição de forma correta e autônoma, utilizando a catraca periodicamente.', aut: 'Argumenta sobre a adequação do micrômetro para a tolerância solicitada e identifica erros térmicos.' },
  { capacity: 'Demonstrar atenção a detalhes.', nsa: 'O relatório de inspeção apresenta múltiplos erros de transcrição e omissões. Não identifica as peças não conformes.', apo: 'O relatório apresenta erros pontuais ou omissões. Identifica algumas, mas não todas, as peças não conformes.', par: 'Preenche o relatório de forma correta e completa, identificando todas as peças não conformes.', aut: 'Além de preencher o relatório corretamente, anota observações pertinentes sobre o acabamento da peça ou tendências de medidas que se aproximam dos limites de tolerância.' },
  { capacity: 'Organizar o ambiente de trabalho e as atividades.', nsa: 'Deixa a bancada e os instrumentos desorganizados e sujos durante e após a atividade.', apo: 'Necessita de lembretes para organizar a bancada ou para limpar e guardar os instrumentos corretamente.', par: 'Mantém o ambiente de trabalho organizado e guarda os equipamentos corretamente ao final da tarefa, por iniciativa própria.', aut: 'Além de manter seu próprio espaço organizado, incentiva os colegas a fazerem o mesmo e propõe melhorias na disposição das ferramentas para otimizar o fluxo de trabalho.' }
];

const COMMON_SA_CRD = [
  {
    id: 'sa-crd-integrada',
    title: 'Situação-problema: Precisão em Foco: Verificação de Componentes para a Linha de Montagem',
    context: 'A "UsiPrecision Componentes Mecânicos Ltda." é uma empresa de médio porte, com 150 funcionários, especializada na fabricação de peças usinadas para a indústria automotiva e de máquinas agrícolas. Recentemente, a empresa tem enfrentado um aumento no índice de devoluções de um de seus principais clientes. O motivo alegado é a inconsistência dimensional em lotes de "Pinos de Ancoragem", componentes críticos para a montagem de um sistema de transmissão. O gestor da Qualidade identificou que a causa raiz do problema pode estar na falta de um procedimento padronizado de medição e na variação de critérios entre os inspetores do turno. Para resolver essa não conformidade e garantir a satisfação do cliente, a empresa decidiu investir na capacitação de sua equipe, começando pelos novos aprendizes. Vocês, como parte da nova equipe de controle dimensional, foram designados para uma tarefa importantíssima: estabelecer um método de inspeção confiável para garantir que 100% das peças enviadas ao cliente estejam rigorosamente dentro das especificações do desenho técnico. A sua atuação será fundamental para restaurar a confiança do cliente e evitar prejuízos com refugo e retrabalho. O ambiente de trabalho será a bancada de inspeção do laboratório de metrologia, que simula a estação de controle de qualidade da UsiPrecision.',
    challenge: 'Vocês receberam um lote piloto de 10 "Pinos de Ancoragem" e o respectivo desenho técnico. A sua missão é realizar uma inspeção dimensional completa em cada uma das peças para determinar se o lote pode ser aprovado para envio ao cliente. Para isso, vocês deverão: a) Analisar o Desenho Técnico: Interpretar todas as cotas, tolerâncias dimensionais, indicações de acabamento e especificações geométricas presentes no desenho do "Pino de Ancoragem". b) Planejar a Inspeção: Definir a sequência de medições a serem realizadas e selecionar o instrumento mais adequado para cada característica da peça (ex: diâmetros externos, comprimentos, ângulos de chanfros, raios, planicidade de uma face). c) Executar as Medições: Utilizando os instrumentos disponíveis (escala, trena, paquímetro, micrômetro, goniômetro, relógios comparadores/apalpadores e verificadores), realizar todas as medições necessárias em cada pino, aplicando as técnicas corretas de manuseio e leitura para evitar erros. d) Registrar os Dados: Preencher um "Relatório de Inspeção Dimensional" para cada peça, anotando os valores medidos e comparando-os com os valores nominais e as tolerâncias especificadas no desenho. e) Emitir o Parecer: Com base nos dados do relatório, classificar cada peça como "Aprovada" ou "Reprovada". Para as peças reprovadas, vocês deverão indicar exatamente qual medida está fora de especificação e justificar a decisão. Ao final, vocês deverão apresentar os relatórios consolidados ao "Gestor da Qualidade" (docente), explicando o processo realizado e defendendo suas conclusões sobre a aprovação ou reprovação do lote.',
    expectedResults: [
      'a) Relatórios de Inspeção Dimensional: Um relatório para cada peça inspecionada, devidamente preenchido, com todas as medições, comparações com as especificações e o parecer final (Aprovado/Reprovado) claramente justificado.',
      'b) Demonstração Prática: Habilidade no manuseio correto e seguro de todos os instrumentos de medição propostos (escala, trena, paquímetro, micrômetro, verificadores, relógios e goniômetro), realizando leituras precisas.',
      'c) Argumentação Técnica: Capacidade de explicar oralmente o processo de inspeção, justificar a escolha dos instrumentos e defender as decisões de aprovação ou reprovação com base nos dados técnicos do desenho e das medições.',
      'd) Organização do Posto de Trabalho: Ao término da atividade, a bancada de inspeção deverá estar limpa e organizada, com todos os instrumentos devidamente limpos e guardados em seus respectivos estojos, demonstrando zelo e responsabilidade com os equipamentos.'
    ]
  }
];

// --- NOVOS CONTEÚDOS LIDT TRANSCRITOS DOS PRINTS ---

const FULL_CAPACITIES_LIDT = [
  '1. Interpretar desenhos técnicos de peças a partir de projetos da metalmecânica.',
  '2. Elaborar croquis de peças em projeção ortogonal e em perspectiva à mão livre, a partir de modelos.',
  '3. Interpretar desenho técnico de montagem de conjunto e subconjuntos a partir de projetos da metalmecânica.',
  '4. Interpretar tolerância dimensional, geométrica e de acabamento superficial em desenho técnico.'
];

const FULL_SOCIOEMOCIONAL_LIDT = [
  'Pensamento analítico: 1. Demonstrar atenção a detalhes',
  'Pensamento analítico: 2. Demonstrar senso crítico',
  'Trabalho em equipe: 1. Demonstrar escuta ativa'
];

const FULL_KNOWLEDGE_LIDT = [
  {
    topic: '1. Desenho técnico',
    subtopics: [
      '1.1. Definição',
      '1.2. Normas técnicas',
      '1.2.1. Primeiro diedro',
      '1.2.2. Terceiro diedro',
      '1.3. Formatos e dimensões das folhas',
      '1.4. Linhas',
      '1.5. Escalas',
      '1.6. Figuras e sólidos geométricos',
      '1.6.1. Superfície e figura plana',
      '1.6.2. Cubo, pirâmide e prisma',
      '1.6.3. Cilindro, cone e esfera'
    ]
  },
  {
    topic: '2. Projeções ortogonais',
    subtopics: [
      '2.1. Definição',
      '2.2. Normas técnicas (1º e 3º Diedros)',
      '2.3. Formatos e dimensões das folhas',
      '2.4. Linhas',
      '2.5. Escalas',
      '2.6. Figuras e sólidos geométricos'
    ]
  },
  {
    topic: '3. Tipos de corte',
    subtopics: [
      '3.1. Corte total',
      '3.2. Meio corte',
      '3.3. Corte composto',
      '3.4. Corte parcial',
      '3.5. Seção',
      '3.6. Omissão de corte',
      '3.7. Encurtamento'
    ]
  },
  {
    topic: '4. Vistas especiais',
    subtopics: [
      '4.1. Vistas auxiliares',
      '4.2. Rotação de elemento oblíquo'
    ]
  },
  {
    topic: '5. Desenho de conjuntos',
    subtopics: [
      '5.1. Representação de elementos de máquina',
      '5.1.1. Elementos padronizados',
      '5.1.2. Elementos de fixação',
      '5.1.3. Elementos de transmissão',
      '5.2. Vista explodida',
      '5.3. Lista de materiais',
      '5.4. Balões de identificação'
    ]
  },
  {
    topic: '6. Tolerâncias',
    subtopics: [
      '6.1. Tolerância dimensional',
      '6.1.1. Campos de tolerância',
      '6.1.2. Sistemas de ajustes e tolerância ISO',
      '6.2. Tolerância geométrica',
      '6.2.1. De forma e posição',
      '6.2.2. De orientação',
      '6.2.3. De batimento',
      '6.3. Acabamento superficial',
      '6.3.1. Rugosidade',
      '6.3.2. Tratamento',
      '6.3.3. Recartilhado',
      '6.3.4. Sobremetal'
    ]
  }
];

const COMMON_SA_LIDT = [
  {
    id: 'sa-lidt-integrada',
    title: 'Situação-problema: Dispositivo de furação - Interpretando e detalhando componentes Mecânicos',
    context: 'A "Usinatec Soluções Industriais" é uma empresa de médio porte especializada na fabricação de componentes e conjuntos mecânicos sob encomenda. Recentemente, a empresa fechou um contrato para a produção de um lote de morsas de bancada (torno de bancada) para um novo cliente, uma renomada escola técnica. O departamento de engenharia finalizou o projeto completo do conjunto, mas, antes de liberar a documentação para a oficina, o gestor de produção solicitou que a equipe de aprendizes do setor de planejamento realize uma análise técnica detalhada dos desenhos. Vocês, atuando como aprendizes de Mecânico de Usinagem, foram organizados em equipes e receberam o conjunto de desenhos técnicos do dispositivo de furação. A tarefa de vocês é garantir que toda a informação contida nos desenhos seja compreendida em sua totalidade, evitando erros de fabricação, retrabalho e desperdício de material, que poderiam comprometer o prazo de entrega e a lucratividade do projeto. O sucesso desta análise preliminar demonstrará a competência da equipe para interpretar projetos complexos e prepará-los para a produção.',
    challenge: 'Cada equipe receberá o projeto completo do dispositivo de furação, contendo o desenho de conjunto, subconjuntos e os desenhos de detalhes de cada componente. O desafio de vocês é elaborar um Dossiê Técnico de Análise de Projeto. Para isso, vocês deverão: a) Analisar o Desenho de Conjunto: Interpretar o desenho de montagem principal para entender o funcionamento da morsa, identificar cada um dos seus componentes por meio da lista de materiais e dos balões de identificação, e compreender como eles se relacionam. b) Elaborar Croquis Detalhados: Escolher três componentes-chave do dispositivo e, a partir da análise dos seus desenhos de detalhe, elaborar croquis à mão livre para cada um. Os croquis devem conter: - Representação em projeção ortogonal (vistas frontal, superior e lateral) e uma perspectiva isométrica. - Aplicação correta das normas de desenho técnico (tipos de linhas, cotagem, etc.). c) Interpretar especificações: - Para um dos componentes que vocês fizeram o croqui, criar uma "Ficha de Análise Crítica" que identifique e explique o significado prático de todas as especificações de tolerância (dimensional e geométrica) e de acabamento superficial (rugosidade) presentes no desenho. Vocês devem justificar por que cada uma dessas especificações é importante para a montagem e o funcionamento correto da peça no conjunto final.',
    expectedResults: [
      'a) Relatório de Interpretação do Conjunto: Um texto curto descrevendo a função do dispositivo de furação, listando seus principais componentes e explicando a função de cada um dentro do mecanismo.',
      'b) Folhas de Croquis: Desenhos à mão livre, claros e legíveis, dos três componentes selecionados, executados em folhas padronizadas, seguindo as normas técnicas de representação e cotagem.',
      'c) Ficha de Análise: Uma tabela ou documento detalhando, para um dos componentes, as tolerâncias e os acabamentos superficiais identificados, com uma coluna explicando o impacto de cada especificação no processo de usinagem e na funcionalidade da peça (ex: "A tolerância de paralelismo entre as faces X e Y garante que o dispositivo deslize sem travar"; "A rugosidade na face de contato é necessária para garantir o atrito e a fixação da peça a ser usinada").',
      '7. Este dossiê será a evidência do desenvolvimento das capacidades de leitura, interpretação e representação de projetos mecânicos, demonstrando que a equipe está apta a compreender as informações técnicas essenciais para a fabricação de um produto.'
    ]
  }
];

const FULL_RUBRICS_LIDT = [
  {
    capacity: 'Interpretar desenho técnico de montagem de conjunto e subconjuntos',
    nsa: 'Identifica os componentes apenas com auxílio constante e não consegue explicar a relação funcional entre eles.',
    apo: 'Identifica a maioria dos componentes usando a lista de materiais, mas descreve suas funções de forma genérica.',
    par: 'Identifica todos os componentes, relaciona-os com a lista de materiais e descreve suas funções de forma correta e autônoma.',
    aut: 'Além de interpretar o conjunto, antecipa possíveis dificuldades de montagem, demonstrando visão sistêmica do projeto.'
  },
  {
    capacity: 'Elaborar croquis de peças em projeção ortogonal e perspectiva',
    nsa: 'O croqui não segue as normas de projeção e cotagem, necessitando de orientação constante.',
    apo: 'O croqui apresenta as vistas corretas, mas contém erros nas normas de cotagem ou tipos de linha, que são corrigidos.',
    par: 'Elabora croquis claros e proporcionais, aplicando corretamente as normas de projeção e cotagem.',
    aut: 'Elabora croquis com excelente qualidade gráfica, incluindo detalhes adicionais (como um corte) para melhor representar a peça.'
  },
  {
    capacity: 'Interpretar tolerância dimensional, geométrica e de acabamento superficial',
    nsa: 'Não consegue identificar os símbolos de tolerância e rugosidade no desenho ou confunde seus significados.',
    apo: 'Identifica os símbolos, mas necessita de ajuda para interpretar seu significado ou para explicar sua importância funcional.',
    par: 'Identifica e explica corretamente o significado das tolerâncias e acabamentos, relacionando-os com a função da peça.',
    aut: 'Além de interpretar, correlaciona as tolerâncias com os processos de fabricação necessários para atingi-las.'
  },
  {
    capacity: 'Demonstrar atenção a detalhes',
    nsa: 'Omite informações (cotas, símbolos, hachuras) no croqui e no relatório.',
    apo: 'O trabalho apresenta algumas omissões ou erros de representação que necessitam de correção e revisão.',
    par: 'O trabalho é entregue de forma completa e precisa, com pouquíssimos ou nenhum erro, demonstrando cuidado na execução.',
    aut: 'Além de entregar um trabalho preciso, identifica inconsistências ou informações faltantes no próprio desenho técnico fornecido.'
  },
  {
    capacity: 'Demonstrar senso crítico',
    nsa: 'Aceita as informações do desenho sem questionar e preenche a ficha de forma mecânica, apenas reproduzindo definições.',
    apo: 'Levanta dúvidas básicas sobre o projeto, mas sua análise é superficial e depende do estímulo do docente.',
    par: 'Analisa as informações, questiona as implicações das especificações e elabora justificativas coerentes para a função das peças.',
    aut: 'Identifica potenciais inconsistências no projeto (ex: tolerância inadequada) e propõe discussões fundamentadas sobre o tema.'
  },
  {
    capacity: 'Demonstrar escuta ativa',
    nsa: 'Mostra-se disperso durante as apresentações e não consegue responder às perguntas de forma adequada.',
    apo: 'Ouve as explicações, mas necessita que as perguntas sejam repetidas ou reformuladas para compreendê-las.',
    par: 'Ouve atentamente, compreende as perguntas de primeira e responde de forma clara e pertinente durante a apresentação.',
    aut: 'Participa ativamente, fazendo perguntas relevantes aos outros e contribuindo para a discussão, além de responder com precisão e segurança.'
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
        calendar: { startDate: '2026-01-26', endDate: '2026-06-15', markings: [] },
        basicCapacities: FULL_CAPACITIES_LIDT,
        socioemocionalCapacities: FULL_SOCIOEMOCIONAL_LIDT,
        knowledge: FULL_KNOWLEDGE_LIDT,
        learningSituations: COMMON_SA_LIDT,
        rubrics: FULL_RUBRICS_LIDT,
        schedule: LIDT_SCHEDULE
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
        basicCapacities: FULL_CAPACITIES_LIDT,
        socioemocionalCapacities: FULL_SOCIOEMOCIONAL_LIDT,
        knowledge: FULL_KNOWLEDGE_LIDT,
        learningSituations: COMMON_SA_LIDT,
        rubrics: FULL_RUBRICS_LIDT,
        schedule: LIDT_SCHEDULE
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
