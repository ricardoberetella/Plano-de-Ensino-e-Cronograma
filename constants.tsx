
import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

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
  { id: 'c16', date: '26/05/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Execução do Desafio: Continuação das medições e preenchimento dos relatórios de inspeção.', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c17', date: '02/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Execução do Desafio: Finalização das medições. Comparação dos resultados com as tolerâncias.', resources: 'Laboratório de Metrologia, todos os instrumentos, lote de peças da SA, relatórios.' },
  { id: 'c18', date: '09/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Finalização do Desafio: Consolidação dos dados, emissão do parecer final sobre o lote e preparação da apresentação.', resources: 'Laboratório de Metrologia/Sala de aula, relatórios preenchidos, computador.' },
  { id: 'c19', date: '16/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Apresentação dos Resultados: Grupos apresentam seus relatórios e pareceres ao "Gestor da Qualidade" (docente).', resources: 'Sala de aula, projetor, relatórios consolidados.' },
  { id: 'c20', date: '23/06/2026', hours: 2, capacities: 'Todas as capacidades técnicas e socioemocionais da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Feedback final sobre o desempenho na SA. Autoavaliação e fechamento da Unidade Curricular.', resources: 'Sala de aula, instrumentos de avaliação preenchidos.' }
];

export const LIDT_SCHEDULE = [
  { id: 'l1', date: '26/01/2026', hours: 2, capacities: 'Todas as capacidades da SA', knowledge: '1.1. Definição de Desenho Técnico', strategy: '• Exposição dialogada; • Apresentação da UC, do MSEP e da Situação de Aprendizagem "Decifrando o Projeto"; • Dinâmica de Grupo: Formação das equipes e discussão inicial sobre a importância do desenho técnico no mundo do trabalho.', resources: 'Sala de aula, projetor, computador, Plano de Ensino, material da SA.' },
  { id: 'l2', date: '02/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.2. Normas técnicas; 1.3. Formatos de folha; 1.4. Linhas.', strategy: '• Exposição dialogada: Apresentação das normas ABNT, foramatos de papel e tipos de linhas. • Atividade prática: Análise de desenhos técnicos para identificação dos tipos de linhas e suas aplicações.', resources: 'Sala de aula, projetor, exemplos de desenhos técnicos, apostila.' },
  { id: 'l3', date: '09/02/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '1.5. Escalas; 1.6. Figuras e sólidos geométricos.', strategy: '• Exposição dialogada e Demonstração: Explicação sobre escalas (natural, redução, ampliação). • Apresentação de figuras e sólidos geométricos.', resources: 'Projetor, modelos de sólidos geométricos, desenhos com diferentes escalas.' },
  { id: 'l4', date: '16/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.1. Perspectiva (isométrica, vistas)...', strategy: '• Atividade prática: Introdução à perspectiva isométrica. Exercícios de esboço à mão livre de sólidos geométricos simples em perspectiva.', resources: 'Sala de aula, papel, lps, borracha, modelos de sólidos.' },
  { id: 'l5', date: '23/02/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.2. Projeção ortogonal (vistas, supressão de vistas).', strategy: '• Atividade prática: Desenho das 3 vistas principais (frontal, superior, lateral) a partir de modelos sólidos simples. Discussão sobre supressão de vistas.', resources: 'Sala de aula, papel, lps, borracha, modelos de peças simples.' },
  { id: 'l6', date: '02/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '2.5. Cotagem (vistas únicas, face de referência, eixo de simetria).', strategy: '• Exposição dialogada e Prática: Apresentação das regras de cotagem. Exercícios de cotagem de vistas ortogonais.', resources: 'Projetor, exemplos de desenhos cotados, exercícios impressos.' },
  { id: 'l7', date: '09/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.1. Cortes... 3.2. Meio corte.', strategy: '• Exposição dialogada e Demonstração: Explicação da necessidade e representação de cortes. Análise de desenhos com corte total e meio corte.', resources: 'Projetor, desenhos técnicos com cortes, pecas seccionadas (se disponível).' },
  { id: 'l8', date: '16/03/2026', hours: 2, capacities: 'Interpretar desenhos técnicos de peças.', knowledge: '3.3 a 3.7. Outros tipos de corte (composto, parcial, seção, omissão, encurtamento).', strategy: '• Estudo de caso: As equipes analisam desenhos complexos e identificam os diferentes tipos de cortes e seções, discutindo sua aplicação.', resources: 'Projetor, conjunto de desenhos técnicos variados.' },
  { id: 'l9', date: '23/03/2026', hours: 2, capacities: 'Elaborar croquis de peças.', knowledge: '4. Vistas especiais (auxiliares, rotação de elemento).', strategy: '• Atividade prática: Exercícios de desenho de vistas auxiliares para representação de faces inclinadas.', resources: 'Sala de aula, papel, instrumentos de desenho, modelos de peças com faces inclinadas.' },
  { id: 'l10', date: '30/03/2026', hours: 2, capacities: 'Interpretar desenho técnico de montagem.', knowledge: '5. Desenho de conjuntos (representação, elementos, vista explodida).', strategy: '• Exposição dialogada: Apresentação da estrutura de um desenho de conjunto, vista explodida e elementos padronizados.', resources: 'Projetor, exemplo de desenho de conjunto comlplexo (ex: morsa).' },
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
  '10. Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.',
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
  { topic: '1. Elementos de máquina', subtopics: [
    '1.1. Elementos de fixação: 1.1.1. Porcas, 1.1.2. Parafusos, 1.1.3. Arruelas, 1.1.4. Contra pino ou cupilha, 1.1.5. Rebites, 1.1.6. Pinos, 1.1.7. Cavilhas',
    '1.2. Elementos de transmissão: 1.2.1. Chavetas, 1.2.2. Engrenagens, 1.2.3. Polias, 1.2.4. Correias, 1.2.5. Acoplamentos, 1.2.6. Roscas de Transmissão, 1.2.7. Corrente, 1.2.8. Eixos, 1.2.9. Sistemas de transmissão, 1.2.10. Redutores de velocidade, 1.2.11. Variadores de velocidade',
    '1.3. Elementos de vedação: 1.3.1. Juntas, 1.3.2. Retentores, 1.3.3. Selos mecânicos, 1.3.4. O-Rings',
    '1.4. Elementos de apoio: 1.4.1. Guias lineares, 1.4.2. Barramentos, 1.4.3. Mancais de deslizamento, 1.4.4. Mancais de rolamentos, 1.4.5. Buchas',
    '1.5. Elementos de instalação: 1.5.1. Válvula, 1.5.2. Tubulação, 1.5.3. Conexão',
    '1.6. Elementos elásticos: 1.6.1. Molas, 1.6.2. Anéis elásticos, 1.6.3. Pinos elásticos'
  ]},
  { topic: '2. Ferramentas', subtopics: ['2.1. Manuais', '2.2. Elétricas ou eletrônicas', '2.3. Pneumáticas', '2.4. Portáteis'] },
  { topic: '3. Processos de fabricação', subtopics: [
    '3.1. Definição',
    '3.2. Injeção: 3.2.1. Metais, 3.2.2. Plásticos',
    '3.3. Manufatura Subtrativa: 3.3.1. Torneamento, 3.3.2. Furação, 3.3.3. Fresamento, 3.3.4. Retificação',
    '3.4. Manufatura aditiva: 3.4.1. Soldagem, 3.4.2. Impressão 3D',
    '3.5. Conformação mecânica: 3.5.1. Laminação, 3.5.2. Trefilação, 3.5.3. Extrusão, 3.5.4. Forjamento, 3.5.5. Repuxo, 3.5.6. Dobramento, 3.5.7. Corte'
  ]},
  { topic: '4. Manutenção', subtopics: [
    '4.1. Definição',
    '4.2. Aplicação',
    '4.3. Tipos de intervenção: 4.3.1. Corretiva, 4.3.2. Preventiva, 4.3.3. Preditiva, 4.3.4. Prescritiva, 4.3.5. Emergencial',
    '4.4. Tipos de ocorrências: 4.4.1. Defeito, 4.4.2. Falha, 4.4.3. Documentação técnica'
  ]},
  { topic: '5. Plano de trabalho', subtopics: ['5.1. Definição', '5.2. Tipos', '5.3. Características'] },
  { topic: '6. Segurança', subtopics: [
    '6.1. Riscos: 6.1.1. Físicos, 6.1.2. Mecânicos, 6.1.3. Térmicos, 6.1.4. Elétricos',
    '6.2. Equipamentos de proteção: 6.2.1. Individual, 6.2.2. Coletivo',
    '6.3. Normas regulamentadoras',
    '6.4. Sinalização',
    '6.5. Análise de risco da tarefa - ART',
    '6.6. Análise preliminar de risco - APR',
    '6.7. Ficha de Dados de Segurança (FDS)'
  ]},
  { topic: '7. Meio Ambiente', subtopics: ['7.1. Definição', '7.2. Normalização', '7.3. Segregação e descarte de resíduos'] },
  { topic: '8. Parâmetros de corte para usinagem', subtopics: ['8.1. Cálculos: 8.1.1. Rotação por minuto - RPM, 8.1.2. Velocidade de corte - Vc, 8.1.3. Avanço - f, 8.1.4. Profundidade de corte - ap'] },
  { topic: '9. Parâmetros de ferramenta', subtopics: ['9.1. Material', '9.2. Geometria', '9.3. Número de insertos/dentes (z)', '9.4. Raio de ponta (re)'] },
  { topic: '10. Torneamento', subtopics: [
    '10.1. Definição',
    '10.2. Tipos de tornos: 10.2.1. Horizontal, 10.2.2. Vertical, 10.2.3. De placa ou platô, 10.2.4. Revólver, 10.2.5. Automático, 10.2.6. Copiador, 10.2.7. A CNC',
    '10.3. Ferramentas: 10.3.1. Alargador, 10.3.2. Bedame, 10.3.3. Broca de centro, 10.3.4. Broca helicoidal, 10.3.5. Cossinete, 10.3.6. Escareador, 10.3.7. Macho, 10.3.8. Recartilha, 10.3.9. Rosqueamento externo, 10.3.10. Rosqueamento interno, 10.3.11. Torneamento externo, 10.3.12. Torneamento interno',
    '10.4. Acessórios: 10.4.1. Placas, 10.4.2. Contraponta, 10.4.3. Arrastador, 10.4.4. Mandril',
    '10.5. Cálculos técnicos: 10.5.1. Recartilha, 10.5.2. Conicidade com inclinação do carro superior, 10.5.3. Rosca triangular'
  ]},
  { topic: '11. Fresagem', subtopics: [
    '11.1. Definição',
    '11.2. Tipos de fresadora: 11.2.1. Universal, 11.2.2. Ferramenteira, 11.2.3. Pantográfica, 11.2.4. Copiadora, 11.2.5. A CNC, 11.2.6. Centros de Usinagem',
    '11.3. Ferramentas: 11.3.1. Cabeçote faceador, 11.3.2. Fresa de topo',
    '11.4. Acessórios: 11.4.1. Morsas, 11.4.2. Cantoneiras, 11.4.3. Calços'
  ]},
  { topic: '12. Furação', subtopics: [
    '12.1. Definição',
    '12.2. Tipos de furadeira: 12.2.1. De coluna de piso, 12.2.2. De coluna de bancada, 12.2.3. Radial, 12.2.4. Portátil',
    '12.3. Ferramentas',
    '12.4. Acessórios: 12.4.1. Morsas, 12.4.2. Calços, 12.4.3. Bucha de redução',
    '12.5. Parâmetros de corte: 12.5.1. Velocidade de Corte (VC), 12.5.2. Rotações por minuto (RPM), 12.5.3. Avanço (f))'
  ]},
  { topic: '13. Rosqueamento', subtopics: [
    '13.1. Definição',
    '13.2. Ferramentas: 13.2.1. Macho, 13.2.2. Cossinete',
    '13.3. Acessórios: 13.3.1. Desandador, 13.3.2. Porta cossinete',
    '13.4. Características: 13.4.1. Sistema de roscas, 13.4.2. Aplicação, 13.4.3. Tabelas',
    '13.5. Máquina: 13.5.1. Rosqueadeira',
    '13.6. Cálculos técnicos: 13.6.1. Roscas'
  ]},
  { topic: '14. Ajustagem', subtopics: [
    '14.1. Definição',
    '14.2. Ferramentas: 14.2.1. Limas, 14.2.2. Riscadores, 14.2.3. Martelos, 14.2.4. Punção',
    '14.3. Acessórios: 14.3.1. Morsa de bancada, 14.3.2. Mordentes, 14.3.3. Cantoneira, 14.3.4. Desempeno, 14.3.5. Cepo, 14.3.6. Calibrador traçador de altura',
    '14.4. Esmerilhamento: 14.4.1. Moto esmeril, 14.4.2. Dressadores'
  ]},
  { topic: '15. Controle da qualidade', subtopics: [
    '15.1. Inspeção visual: 15.1.1. Rebarbas, 15.1.2. Oxidação, 15.1.3. Marcas, 15.1.4. Riscos',
    '15.2. Inspeção dimensional: 15.2.1. Ficha de autoinspeção, 15.2.2. Técnicas de medição'
  ]},
  { topic: '16. Refrigeração', subtopics: [
    '16.1. Definição',
    '16.2. Fluidos de corte: 16.2.1. Aplicações, 16.2.2. Tipos, 16.2.3. Mecanismos, 16.2.4. Propriedades, 16.2.5. Procedimentos'
  ]}
];

export const FUSI_SCHEDULE = [
  // FRESAMENTO E AJUSTAGEM (Print 3)
  { id: 'f_fresa_1', date: '28/01 a 30/01/2026', hours: 12, capacities: '- Elaborar plano de trabalho... - Planejar ações - Demonstrar responsabilidade', knowledge: '1. Elementos de máquina | 3. Processos de fabricação | 5. Plano de trabalho | 8. Segurança | 7. Melo Ambiente', strategy: '- Exposição dialogada sobre a SA. - Análise em grupo dos desenhos técnicos. - Início da elaboração do plano de trabalho (folha de processo).', resources: '- Sala de aula - Projetor multimídia - Desenhos técnicos impressos - Modelos de plano de trabalho.' },
  { id: 'f_fresa_2', date: '04/02 a 06/02/2026', hours: 12, capacities: '- Selecionar ferramentas... - Definir os parâmetros de usinagem... - Zelar pelo uso de equipamentos...', knowledge: '2. Ferramentas | 8. Parâmetros de corte | 9. Parâmetros de ferramenta | 11. Fresagem (Tipos, Ferramentas, Acessórios)', strategy: '- Demonstração de ferramentas e acessórios da fresadora. - Exercícios práticos de cálculo de RPM e avanço. - Instrução sobre fixação de peças e ferramentas.', resources: '- Oficina de usinagem - Fresadora convencional - Ferramentas de corte e fixação - Calculadora, quadros' },
  { id: 'f_fresa_3', date: '11/02 a 05/03/2026', hours: 38, capacities: '- Realizar operações de baixa complexidade em fresadora... - Aplicar os procedimentos de refrigeração... - Controlar a qualidade...', knowledge: '11. Fresagem (Operações) | 15. Controle da qualidade | 16. Refrigeração', strategy: '- Prática supervisionada de usinagem (faceamento, rebaixos, superfícies paralelas e perpendiculares). - Autoinspeção dimensional durante o processo.', resources: '- Oficina de usinagem - Fresadora, morsas, calços - Paquímetro, esquadro - EPIs (óculos, protetor auricular)' },
  { id: 'f_fresa_4', date: '06/03 a 19/03/2026', hours: 20, capacities: '- Realizar operações de furação... - Realizar operações de rosqueamento... - Demonstrar visão sistêmica', knowledge: '12. Furação | 13. Rosqueamento', strategy: '- Demonstração de furação na furadeira de coluna e fresadora. - Demonstração de rosqueamento manual com macho. - Prática supervisionada de furação e rosqueamento.', resources: '- Oficina de usinagem - Furadeira de coluna - Machos, desandador, óleo de corte - Brocas, escareadores' },
  { id: 'f_fresa_5', date: '20/03 a 28/03/2026', hours: 20, capacities: '- Controlar a qualidade... - Planejar ações - Demonstrar responsabilidade - Zelar pelo uso de equipamentos...', knowledge: '15. Controle da qualidade | 5. Plano de trabalho (revisão)', strategy: '- Finalização e rebarbação de todas as peças. - Preenchimento do relatório de controle de qualidade. - Apresentação do conjunto de peças finalizadas. - Limpeza final das máquinas e organização da oficina.', resources: '- Oficina de usinagem - Bancada de ajustagem - Instrumentos de medição - Relatórios impressos' },
  
  // TORNEAMENTO (Prints 1 e 2)
  { id: 'f_torn_1', date: '13/03/2026', hours: 4, capacities: '- Definir os parâmetros de usinagem... - Demonstrar responsabilidade.', knowledge: '8. Parâmetros de corte | 9. Parâmetros de ferramenta | 10. Torneamento (Definição, Tipos) | 16. Refrigeração (Definição)', strategy: 'Exposição dialogada e Estudo de caso: Apresentação da SA2 e do desafio da "AgroMaq". Discussão sobre segurança no torno. Introdução aos cálculos de parâmetros de corte.', resources: 'Sala de aula, projetor, quadro branco, calculadoras, tabelas de parâmetros de corte, desenhos técnicos das peças.' },
  { id: 'f_torn_2', date: '18/03/2026', hours: 4, capacities: '- Realizar operações de baixa complexidade em torno... - Organizar o ambiente de trabalho...', knowledge: '10.3. Ferramentas (Torneamento externo) | 10.4. Acessórios (Placa, Contraponta) | 10.8.1. Facear no torno | 10.8.5. Fazer furo de centro no torno', strategy: 'Demonstração e Prática Supervisionada: Demonstração das operações de fixação da peça, faceamento e furação de centro. Prática inicial dos alunos.', resources: 'Oficina de usinagem, torno convencional, ferramentas de facear e broca de centro, material bruto, EPIs.' },
  { id: 'f_torn_3', date: '19/03 e 20/03/2026', hours: 8, capacities: '- Realizar operações de baixa complexidade em torno... - Controlar a qualidade das peças... - Aplicar os procedimentos de refrigeração...', knowledge: '10.8.2. Tornear superfície cilíndrica | 10.8.4. Chanfrar no torno | 15. Controle da qualidade | 16.2. Fluidos de corte', strategy: 'Prática Supervisionada: Início da usinagem do "Eixo cilíndrico de quatro corpos". Foco no desbaste e torneamento dos diâmetros maiores, com medições constantes.', resources: 'Oficina de usinagem, torno, ferramentas de tornear, paquímetro, material bruto (aço 1020), fluido de corte, EPIs.' },
  { id: 'f_torn_4', date: '25/03 e 26/03/2026', hours: 8, capacities: '- Realizar operações de baixa complexidade em torno... - Controlar a qualidade das peças... - Zelar pelo uso de equipamentos...', knowledge: '10.8.2. Tornear superfície cilíndrica | 10.8.12. Cortar no torno | 15.2. Inspeção dimensional', strategy: 'Prática Supervisionada: Continuação e finalização do "Eixo cilíndrico de quatro corpos". Foco no acabamento, nos diâmetros menores e no corte no comprimento final.', resources: 'Oficina de usinagem, torno, ferramentas de tornear e bedame, paquímetro, micrômetro, EPIs.' },
  { id: 'f_torn_5', date: '27/03/2026', hours: 4, capacities: '- Definir os parâmetros de usinagem... - Realizar operações de rosqueamento... - Demonstrar visão sistêmica.', knowledge: '13. Rosqueamento (Definição, Ferramentas, Acessórios) | 10.8.10. Roscar com cossinete no torno', strategy: 'Exposição dialogada e Demonstração: Apresentação do processo de rosqueamento com cossinete no torno e com macho na bancada. Início do planejamento para o "Eixo roscado" e "Manípulo".', resources: 'Sala de aula, oficina de usinagem, torno, cossinetes, porta-cossinetes, machos, desandadores.' },
  { id: 'f_torn_6', date: '01/04 e 02/04/2026', hours: 8, capacities: '- Realizar operações de baixa complexidade em torno... - Realizar operações de rosqueamento... - Demonstrar responsabilidade.', knowledge: '10.8.2. Tornear superfície cilíndrica | 10.8.10. Roscar com cossinete no torno | 15.1. Inspeção visual', strategy: 'Prática Supervisionada: Usinagem do "Eixo roscado". Torneamento do diâmetro externo e execução da rosca com cossinete, garantindo o acabamento e a funcionalidade.', resources: 'Oficina de usinagem, torno, ferramentas, cossinete, paquímetro, fluido de corte, EPIs.' },
  { id: 'f_torn_7', date: '03/04/2026', hours: 4, capacities: '- Realizar operações de furação... - Realizar operações de rosqueamento... - Organizar o ambiente de trabalho...', knowledge: '12. Furação (Definição, Tipos, Operações) | 13.7.1. Roscar manualmente com macho na bancada', strategy: 'Demonstração e Prática Supervisionada: Usinagem do "Manípulo". Foco na furação em furadeira de bancada e na abertura de rosca manual com macho.', resources: 'Oficina de usinagem, furadeira de bancada, broca, morsa, machos, desandador, óleo de corte, EPIs.' },
  { id: 'f_torn_8', date: '08/04/2026', hours: 4, capacities: '- Controlar a qualidade das peças... - Demonstrar visão sistêmica... - Zelar pelo uso de equipamentos...', knowledge: '15. Controle da qualidade | 1. Elementos de máquina (Montagem)', strategy: 'Trabalho em equipe e Simulação: Montagem do conjunto "Manípulo" e "Eixo roscado". Verificação da funcionalidade. Análise de falhas caso a montagem não ocorra. Preenchimento final das fichas.', resources: 'Oficina de usinagem, bancada, peças usinadas, instrumentos de medição, fichas de processo.' },
  { id: 'f_torn_9', date: '09/04/2026', hours: 4, capacities: '- Todas as capacidades da SA.', knowledge: 'Todos os conhecimentos da SA.', strategy: 'Revisão e Avaliação Final: Revisão geral dos processos. Avaliação final das peças produzidas e dos documentos gerados. Feedback individual e em grupo sobre o desempenho na SA.', resources: 'Oficina de usinagem, sala de aula, todas as peças e documentos produzidos.' }
];

export const COMMON_SA_FUSI = [
  {
    id: 'sa-fusi-torneamento',
    title: 'Operação de Protótipos: Usinagem de Componentes para Transmissão Mecânica',
    context: 'A "AgroMaq Industrial", empresa especializada na fabricação de pequenos implementos agrícolas, enfrenta um problema crítico: a linha de produção de um de seus pulverizadores está parada devido à falta de um subconjunto de ajuste mecânico. O fornecedor original das peças (eixos, manípulos e luvas) encerrou suas atividades, e a compra de um novo lote de um fornecedor alternativo levaria semanas, causando prejuízos significativos. Para solucionar o problema de forma rápida e eficiente, a gerência decidiu internalizar a produção desses componentes. O departamento de engenharia disponibilizou os desenhos técnicos do conjunto e solicitou ao setor de usinagem a fabricação de um lote piloto para validação.\nVocês, como a equipe de operadores de máquinas da "AgroMaq", receberam a missão de produzir as primeiras unidades deste conjunto. A tarefa exige não apenas habilidade na operação das máquinas, mas também a capacidade de interpretar os desenhos, calcular os parâmetros de corte corretos, executar as operações de torneamento, furação e rosqueamento com precisão, e garantir a qualidade final para que as peças possam ser montadas e funcionem perfeitamente.',
    challenge: 'Com base nos desenhos técnicos fornecidos e no material bruto, a equipe deverá executar um projeto completo de usinagem, focando nas operações de torneamento, para fabricar os componentes:\na) Planejar e Calcular: Para cada peça a ser usinada (Eixo cilíndrico de quatro corpos, Eixo cilíndrico com canais, Eixo roscado, Manípulo, Eixo calibrado e Luva com dois corpos internos), a equipe deverá calcular e registrar os parâmetros de corte essenciais (Velocidade de Corte, RPM, avanço) para cada operação (facear, tornear, chanfrar, furar, roscar), considerando as ferramentas e o material especificados.\nb) Executar e Controlar: Utilizando o torno mecânico convencional e a furadeira de bancada, a equipe deverá usinar as peças seguindo a sequência operacional planejada. Durante todo o processo, será necessário aplicar corretamente o fluido de refrigeração, zelar pela organização e segurança do ambiente, e realizar o controle dimensional contínuo com paquímetro e micrômetro, preenchendo uma ficha de autoinspeção. As operações incluem:\n• No torno: faceamento, torneamento de múltiplos diâmetros, furação de centro, furação com broca helicoidal, corte de canais e rosqueamento com cossinete.\n• Na furadeira/bancada: furação e rosqueamento manual com macho para o "Manípulo".\nc) Montar e Validar: Ao final da usinagem, a equipe deverá realizar a montagem do "Manípulo" no "Eixo roscado" para comprovar a funcionalidade e a precisão do conjunto roscado, demonstrando uma visão sistêmica do processo produtivo.',
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
    context: 'A "Fresanatec Soluções Industriais", uma empresa metalmecânica com 30 funcionários, especializada na fabricação de peças e na prestação de serviços de manutenção, acaba de investir na ampliação de seu parque de máquinas com a aquisição de uma nova fresadora convencional. O objetivo é aumentar a capacidade produtiva e diversificar os serviços oferecidos aos seus clientes. Para que a nova máquina atinja seu potencial máximo, o gerente de produção, Sr. Almeida, identificou a necessidade de fabricar um conjunto de acessórios e dispositivos de fixação que não acompanharam o equipamento. Esses componentes são importantes para a versatilidade, segurança e eficiência das futuras operações. O conjunto inclui: um bloco fresado para referência, um bloco com rebaixo para exercícios de posicionamento, castanhas moles para fixação de peças delicadas, uma base para as castanhas, mordentes de proteção em alumínio e um protótipo de coletor de serragem para manter a área limpa e segura.\nComo a equipe de usinadores experientes está totalmente alocada em projetos de clientes, o Sr. Almeida decidiu transformar essa necessidade interna em uma oportunidade de desenvolvimento para a nova equipe de aprendizes.\nVocês, como aprendizes de mecânica de usinagem, foram designados para este projeto. A tarefa consiste em assumir a responsabilidade por todo o processo de fabricação desses componentes, desde a análise dos desenhos técnicos até a entrega das peças prontas para uso.\nEste projeto é a sua chance de demonstrar iniciativa, planejamento e habilidade técnica, aplicando os fundamentos da usinagem em um cenário real e contribuindo diretamente para a melhoria da infraestrutura da empresa.',
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
  { capacity: 'Realizar operações de baixa complexidade em torno convencional.', nsa: 'Não consegue executar as operações básicas no torno de forma satisfatória ou segura, mesmo com apoio e demonstrações constantes.', apo: 'Tenta operar a máquina, mas demonstra insegurança e comete erros frequentes de posicionamento e avanço, necessitando de intervenção constante.', par: 'Opera o torno e executa as operações, mas precisa de orientação pontual do docente para corrigir a técnica, ajustar a máquina ou atingir a tolerância.', aut: 'Opera o torno com autonomia e segurança, executando todas as operações (facear, tornear, chanfrar, furar) com precisão dimensional e bom acabamento.' },
  { capacity: 'Controlar a qualidade das peças usinadas (Torneamento).', nsa: 'Não consegue realizar as medições de forma correta ou preencher a ficha de controle, mesmo com o apoio direto do docente.', apo: 'Tenta realizar as medições, mas demonstra dificuldade na leitura dos instrumentos e no preenchimento da ficha, exigindo acompanhamento constante.', par: 'Realiza o controle dimensional, mas necessita de auxílio pontual para manusear o micrômetro ou para interpretar alguma tolerância especificada.', aut: 'Realiza o controle dimensional com autonomia, utilizando corretamente paquímetro e micrômetro, e preenche a ficha de autoinspeção de forma completa e precisa.' },
  { capacity: 'Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais.', nsa: 'Danifica ferramentas ou instrumentos por mau uso ou não demonstra qualquer cuidado com os recursos da oficina, mesmo após repetidas orientações.', apo: 'Manuseia os equipamentos de forma descuidada, deixando ferramentas em locais inadequados ou não realizando a limpeza, necessitando de intervenção constante.', par: 'Manuseia os equipamentos de forma adequada na maior parte do tempo, mas requer lembretes pontuais sobre a limpeza ou guarda de algum item.', aut: 'Manuseia todos os equipamentos, ferramentas e instrumentos com o máximo cuidado, limpando-os e guardando-os corretamente por iniciativa própria.' },
  { capacity: 'Demonstrar visão sistêmica.', nsa: 'Não consegue compreender a relação entre as peças ou a importância da sua tarefa para o produto final, mesmo com o conjunto montado para análise.', apo: 'Foca apenas na execução da sua peça, demonstrando dificuldade em entender como ela irá interagir com as outras, necessitando de explicações constantes.', par: 'Compreende que as peças se montarão, mas precisa de questionamentos para relacionar a precisão dimensional com a funcionalidade do conjunto.', aut: 'Compreende e explica como a precisão de cada peça individual afeta a montagem e o funcionamento final do subconjunto, propondo melhorias no processo.' },
  { capacity: 'Elaborar plano de trabalho.', nsa: 'Não consegue preencher o plano de trabalho, mesmo com auxílio constante, ou deixa a maior parte em branco.', apo: 'Preenche o plano de trabalho com a ajuda constante do docente, cometendo erros na sequência de operações e no cálculo de parâmetros.', par: 'Elabora o plano de trabalho com autonomia, necessitando de pequenas correções na seleção de ferramentas ou no refinamento dos parâmetros.', aut: 'Elabora o plano de trabalho de forma completa e otimizada, propondo sequências eficientes e justificando a escolha dos parâmetros.' },
  { capacity: 'Definir as parâmetros de usinagem.', nsa: 'Não consegue realizar os cálculos de RPM or avanço, mesmo com fórmulas e auxílio. Insere valores aleatórios ou perigosos na máquina.', apo: 'Realiza os cálculos de parâmetros de corte com a supervisão constante do docente, cometendo erros que precisam ser corrigidos.', par: 'Calcula os parâmetros de corte de forma autônoma para materiais e operações comuns, utilizando tabelas e fórmulas, necessitando de pequenos ajustes.', aut: 'Define e otimiza os parâmetros de corte para diferentes materiais e ferramentas, justificando as escolhas para obter melhor acabamento e vida útil da ferramenta.' },
  { capacity: 'Realizar operações de baixa complexidade em fresadora.', nsa: 'Demonstra grande dificuldade em operar a máquina, apresentando riscos à sua segurança e à do equipamento, mesmo com supervisão direta.', apo: 'Realiza as operações com supervisão e intervenção constante do docente para corrigir a postura, a fixação da peça ou o manuseio dos comandos.', par: 'Opera a máquina de forma segura e executa as operações corretamente, solicitando auxílio pontual em situações específicas.', aut: 'Realiza todas as operações com autonomia, segurança e precisão, otimizando o processo para obter um bom acabamento.' },
  { capacity: 'Realizar operações de furação.', nsa: 'Demonstra grande dificuldade em operar a furadeira, com fixação inadequada da peça e uso incorreto da ferramenta, apresentando risco à segurança.', apo: 'Realiza operações de furação com supervisão constante, necessitando de auxílio para alinhar o furo, controlar o avanço ou aplicar fluido de corte.', par: 'Executa operações de furação de forma segura e autônoma, atingindo as especificações de diâmetro e posição na maioria das vezes, com auxílio pontual.', aut: 'Realiza operações de furação (passante, cega, escareado) com autonomia, precisão e segurança, selecionando corretamente brocas e parâmetros.' },
  { capacity: 'Realizar operações de rosqueamento.', nsa: 'Não consegue iniciar a rosca com o macho ou quebra a ferramenta com frequência, mesmo com supervisão.', apo: 'Realiza o rosqueamento manual com auxílio constante do docente para garantir o alinhamento e o movimento correto de avanço e retrocesso.', par: 'Executa o rosqueamento manual de forma autônoma, produzindo roscas funcionais, necessitando de orientação para evitar quebra de ferramenta.', aut: 'Realiza o rosqueamento manual com precisão, alinhamento e segurança, selecionando o macho e a broca corretos e aplicando a técnica adequada.' },
  { capacity: 'Aplicar os procedimentos de refrigeração.', nsa: 'Não aplica o fluido de corte ou o faz de forma perigosa/ineficaz, mesmo quando orientado.', apo: 'Aplica o fluido de corte apenas quando lembrado pelo docente, com dificuldade em direcionar o jato para a região de corte correta.', par: 'Aplica os procedimentos de refrigeração de forma autônoma e correta durante a usinagem, garantindo a lubrificação e o resfriamento adequados.', aut: 'Aplica e ajusta a refrigeração de forma otimizada, selecionando o tipo de fluido e vazão mais adequados para a operação e material.' },
  { capacity: 'Controlar a qualidade das peças usinadas (Fresagem/Ajustagem).', nsa: 'Não consegue manusear os instrumentos de medição ou realiza leituras incorretas, mesmo após orientação.', apo: 'Realiza as medições com dificuldade, necessitando de auxílio do docente para posicionar o instrumento e interpretar os resultados.', par: 'Utiliza os instrumentos de medição de forma correta e autônoma, realizando o controle dimensional e visual das peças conforme solicitado.', aut: 'Realiza o controle de qualidade com precisão e adota medidas preventivas para garantir a conformidade dos lotes.' }
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
        id: 'uc-fusi-beretella',
        name: 'FUNDAMENTOS DA USINAGEM',
        calendar: { startDate: '2026-01-28', endDate: '2026-06-24', markings: [] },
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
