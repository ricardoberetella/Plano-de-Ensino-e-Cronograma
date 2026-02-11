
import { TeachingPlan } from './types';

export const SENAI_BLUE = "#005DAA";
export const SENAI_RED = "#E30613";

export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: 'plan-usinagem-modelo',
    profileId: 'beretella',
    courseName: 'SMO - Mecânico de Usinagem Convencional',
    modality: 'Presencial',
    totalHours: 400,
    objective: 'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.',
    methodology: 'Metodologia SENAI de Educação Profissional (MSEP). Uso de situações de aprendizagem realistas para contextualização de desafios fabris.',
    evaluation: 'Contínua baseada em rubricas de desempenho, folhas de autoinspeção metrológica e qualidade das peças usinadas.',
    bibliography: 'Guia de Aprendizagem Profissional SENAI: Fresamento e Torneamento. NBR 10067, NBR 8403, VIM.',
    createdAt: new Date().toISOString(),
    units: [
      {
        id: 'uc-lidt',
        name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-15', markings: [] },
        basicCapacities: [
          'I. Interpretar desenhos técnicos de peças a partir de projetos da metalmecânica.',
          'II. Elaborar croquis de peças em projeção ortogonal e em perspectiva à mão livre, a partir de modelos.',
          'III. Interpretar desenho técnico de montagem de conjunto e subconjuntos a partir de projetos da metalmecânica.',
          'IV. Interpretar tolerância dimensional, geométrica e de acabamento superficial em desenho técnico.'
        ],
        socioemocionalCapacities: [
          'Pensamento analítico: I. Demonstrar atenção a detalhes',
          'Pensamento analítico: II. Demonstrar senso crítico',
          'Trabalho em equipe: I. Demonstrar escuta ativa'
        ],
        knowledge: [
          { 
            topic: 'I. Desenho técnico', 
            subtopics: [
              '1.1. Definição', 
              '1.2. Normas técnicas (1.2.1. Primeiro diedro, 1.2.2. Terceiro diedro)', 
              '1.3. Formatos e dimensões das folhas',
              '1.4. Linhas',
              '1.5. Escalas',
              '1.6. Figuras e sólidos geométricos (1.6.1. Superfície e figura plana, 1.6.2. Cubo, pirâmide e prisma, 1.6.3. Cilindro, cone e esfera)'
            ] 
          },
          { 
            topic: 'II. Tipos de corte', 
            subtopics: [
              '2.1. Corte total', 
              '2.2. Meio corte',
              '2.3. Corte composto',
              '2.4. Corte parcial',
              '2.5. Seção',
              '2.6. Omissão de corte',
              '2.7. Encurtamento'
            ] 
          },
          {
            topic: 'III. Vistas especiais',
            subtopics: [
              '3.1. Vistas auxiliares',
              '3.2. Rotação de elemento oblíquo'
            ]
          },
          {
            topic: 'IV. Desenho de conjuntos',
            subtopics: [
              '4.1. Representação de elementos de máquina',
              '4.2. Elementos padronizados',
              '4.3. Elementos de fixação',
              '4.4. Elementos de transmissão',
              '4.5. Vista explodida',
              '4.6. Lista de materiais',
              '4.7. Balões de Identificações'
            ]
          },
          {
            topic: 'V. Tolerâncias',
            subtopics: [
              '5.1. Tolerância dimensional (5.1.1. Campos de tolerância, 5.1.2. Sistemas de ajustes e tolerância ISO)',
              '5.2. Tolerância geométrica (5.2.1. De forma e posição, 5.2.2. De orientação, 5.2.3. De batimento)',
              '5.3. Acabamento superficial (5.3.1. Rugosidade, 5.3.2. Tratamento, 5.3.3. Recartilhado, 5.3.4. Sobremetal)'
            ]
          }
        ],
        learningSituations: [
          {
            id: 'sa-lidt-dispositivo',
            title: 'Dispositivo de furação - Interpretando e detalhando componentes Mecânicos',
            context: 'A "Usinatec Soluções Industriais" é uma empresa de médio porte especializada na fabricação de componentes e conjuntos mecânicos sob encomenda. Recentemente, a empresa fechou um contrato para a produção de um lote de morsas de bancada. O departamento de engenharia finalizou o projeto completo, mas o gestor solicitou uma análise técnica detalhada antes da fabricação.',
            challenge: 'Elaborar um Dossiê Técnico de Análise de Projeto contendo: a) Análise do Desenho de Conjunto (funcionamento e componentes); b) Elaboração de Croquis Detalhados à mão livre de 3 componentes-chave; c) Ficha de Análise Crítica de especificações de tolerância e rugosidade.',
            expectedResults: [
              'Relatório de Interpretação do Conjunto: Texto descrevendo função do dispositivo e seus componentes.',
              'Folhas de Croquis: Desenhos à mão livre claros e normalizados dos três componentes selecionados.',
              'Ficha de Análise: Tabela detalhando tolerâncias, acabamentos superficiais e seus impactos práticos na montagem e funcionamento.'
            ]
          }
        ],
        rubrics: [
          {
            capacity: "Interpretar desenho técnico de montagem de conjunto e subconjuntos",
            nsa: "Identifica os componentes apenas com auxílio constante e não consegue explicar a relação funcional entre eles.",
            apo: "Identifica a maioria dos componentes usando a lista de materiais, mas descreve suas funções de forma genérica.",
            par: "Identifica todos os componentes, relaciona-os com a lista de materiais e descreve suas funções de forma correta e autônoma.",
            aut: "Além de interpretar o conjunto, antecipa possíveis dificuldades de montagem, demonstrando visão sistêmica do projeto."
          },
          {
            capacity: "Elaborar croquis de peças em projeção ortogonal e perspectiva",
            nsa: "O croqui não segue as normas de projeção e cotagem, necessitando de orientação constante.",
            apo: "O croqui apresenta as vistas corretas, mas contém erros nas normas de cotagem ou tipos de linha, que são corrigidos.",
            par: "Elabora croquis claros e proporcionais, aplicando corretamente as normas de projeção e cotagem.",
            aut: "Elabora croquis com excelente qualidade gráfica, incluindo detalhes adicionais (como um corte) para melhor representar a peça."
          },
          {
            capacity: "Interpretar tolerância dimensional, geométrica e de acabamento superficial",
            nsa: "Não consegue identificar os símbolos de tolerância e rugosidade no desenho ou confunde seus significados.",
            apo: "Identifica os símbolos, mas necessita de ajuda para interpretar seu significado ou para explicar sua importância funcional.",
            par: "Identifica e explica corretamente o significado das tolerâncias e acabamentos, relacionando-os com a função da peça.",
            aut: "Além de interpretar, correlaciona as tolerâncias com os processos de fabricação necessários para atingi-las."
          },
          {
            capacity: "Demonstrar atenção a detalhes",
            nsa: "Omite informações (cotas, símbolos, hachuras) no croqui e no relatório.",
            apo: "O trabalho presenta algumas omissões ou erros de representação que necessitam de correção e revisão.",
            par: "O trabalho é entregue de forma completa e precisa, com pouquíssimos ou nenhum erro, demonstrando cuidado na execução.",
            aut: "Além de entregar um trabalho preciso, identifica inconsistências ou informações faltantes no próprio desenho técnico fornecido."
          },
          {
            capacity: "Demonstrar senso crítico",
            nsa: "Aceita as informações do desenho sem questionar e preenche a ficha de forma mecânica, apenas reproduzindo definições.",
            apo: "Levanta dúvidas básicas sobre o projeto, mas suas análises são superficiais e dependem de estímulo do docente.",
            par: "Analisa as informações, questiona as implicações das especificações e elabora justificativas coerentes para a função das peças.",
            aut: "Identifica potenciais inconsistências no projeto (ex: tolerância inadequada) e propõe discussões fundamentadas sobre o tema."
          },
          {
            capacity: "Demonstrar escuta ativa",
            nsa: "Mostra-se disperso durante as apresentações e não consegue responder às perguntas de forma adequada.",
            apo: "Ouve as explicações, mas necessita que as perguntas sejam repetidas ou reformuladas para compreendê-las.",
            par: "Ouve atentamente, compreende as perguntas de primeira e responde de forma clara e pertinente durante a apresentação.",
            aut: "Participa ativamente, fazendo perguntas relevantes aos outros e contribuindo para a discussão, além de responder com precisão e segurança."
          }
        ],
        schedule: []
      },
      {
        id: 'uc-crd',
        name: 'CONTROLE DIMENSIONAL',
        calendar: { startDate: '2026-01-26', endDate: '2026-06-23', markings: [] },
        basicCapacities: [
          '1. Identificar a importância da metrologia na indústria metalmecânica.',
          '2. Medir peças com escala.',
          '3. Medir peças com trena.',
          '4. Medir peças com paquímetro.',
          '5. Medir peças no sistema métrico com micrômetro.',
          '6. Verificar dimensões e perfis com verificadores',
          '7. Medir por comparação com relógio apalpador e comparador.',
          '8. Medir peças com goniômetro.'
        ],
        socioemocionalCapacities: [
          'Pensamento analítico: 1. Demonstrar atenção a detalhes',
          'Autogestão: 2. Organizar o ambiente de trabalho e as atividades',
          'Autogestão: 3. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais'
        ],
        knowledge: [
          { 
            topic: '1. Metrologia', 
            subtopics: [
              '1.1. Definição', 
              '1.2. Características', 
              '1.3. Aplicações', 
              '1.4. Terminologia (Vocabulário Internacional de Metrologia - VIM)',
              '1.5. Normas técnicas'
            ] 
          },
          { 
            topic: '2. Erros de medição', 
            subtopics: [
              '2.1. Tipos',
              '2.1.1. Aleatório',
              '2.1.2. Sistemático',
              '2.1.3. Grosseiro',
              '2.2. Fontes de erro',
              '2.2.1. Variação da temperatura',
              '2.2.2. Paralaxe',
              '2.2.3. Força de medição',
              '2.2.4. Complexidade da peça',
              '2.2.5. Condições do instrumento',
              '2.3. Processos de correção', 
              '2.4. Calibração do instrumento'
            ] 
          },
          { 
            topic: '3. Escala', 
            subtopics: [
              '3.1. Tipos', 
              '3.2. Características', 
              '3.3. Leitura',
              '3.3.1. Sistema métrico',
              '3.3.2. Sistema inglês',
              '3.4. Conversão entre sistemas de medida',
              '3.5. Erros de leitura',
              '3.6. Utilização'
            ] 
          },
          { 
            topic: '4. Trena', 
            subtopics: [
              '4.1. Tipos', 
              '4.2. Características', 
              '4.3. Leitura no sistema métrico',
              '4.4. Erros de leitura',
              '4.5. Utilização'
            ] 
          },
          { 
            topic: '5. Paquímetros', 
            subtopics: [
              '5.1. Tipos', 
              '5.2. Características', 
              '5.3. Leitura',
              '5.3.1. Sistema métrico',
              '5.3.2. Sistema inglês',
              '5.4. Erros de leitura',
              '5.5. Utilização'
            ] 
          },
          { 
            topic: '6. Micrômetros', 
            subtopics: [
              '6.1. Tipos', 
              '6.2. Características', 
              '6.3. Leitura no sistema métrico',
              '6.4. Erros de leitura',
              '6.5. Ajuste zero',
              '6.6. Utilização'
            ] 
          },
          { 
            topic: '7. Verificadores', 
            subtopics: [
              '7.1. Tipos',
              '7.1.1. Folga',
              '7.1.2. Raio',
              '7.1.3. Rosca',
              '7.2. Utilização'
            ] 
          },
          { 
            topic: '8. Relógios comparadores e apalpadores', 
            subtopics: [
              '8.1. Tipos', 
              '8.2. Características', 
              '8.3. Ajuste zero',
              '8.4. Utilização'
            ] 
          },
          { 
            topic: '9. Goniômetro', 
            subtopics: [
              '9.1. Tipos', 
              '9.2. Características', 
              '9.3. Erros de leitura',
              '9.4. Utilização'
            ] 
          }
        ],
        learningSituations: [
          {
            id: 'sa-crd-focus',
            title: 'Precisão em Foco: Verificação de Componentes para a Linha de Montagem',
            context: 'A "UsiPrecision Componentes Mecânicos Ltda." é uma empresa de médio porte, com 150 funcionários, especializada na fabricação de peças usinadas para a Indústria automotiva e de máquinas agrícolas. Recentemente, a empresa tem enfrentado um aumento no índice de devoluções de um de seus principais clientes devido à inconsistência dimensional em lotes de "Pinos de Ancoragem", componentes críticos para a montagem de um sistema de transmissão. O gestor da qualidade identificou que a causa raiz do problema pode estar na falta de um procedimento padronizado de medição e na variação de critérios entre os inspetores do turno.',
            challenge: 'Realizar uma inspeção dimensional completa em um lote piloto de 10 "Pinos de Ancoragem" para determinar se o lote pode ser aprovado para envio ao cliente. Para isso, vocês deverão: 1) Analisar o desenho técnico e suas tolerâncias; 2) Planejar a sequência de medições e selecionar os instrumentos adequados (escala, trena, paquímetro, micrômetro, goniômetro, relógios e verificadores); 3) Executar as medições aplicando as técnicas corretas; 4) Registrar os dados em um "Relatório de Inspeção Dimensional" para cada peça; 5) Emitir um parecer final (Aprovado ou Reprovado) justificando tecnicamente a decisão.',
            expectedResults: [
              'Relatórios de Inspeção Dimensional: Um relatório para cada peça inspecionada, devidamente preenchido com medições, comparações com as especificações e parecer final justificado.',
              'Demonstração Prática: Habilidade no manuseio correto e seguro de todos os instrumentos de medição propostos (escala, trena, paquímetro, micrômetro, verificadores, relógios e goniômetro).',
              'Argumentação Técnica: Capacidade de explicar oralmente o processo de inspeção, justificar a escolha dos instrumentos e defender as decisões de aprovação ou reprovação.',
              'Organização do Posto de Trabalho: Bancada de inspeção limpa e organizada ao término da atividade, com instrumentos limpos e guardados em seus respectivos estojos.'
            ]
          }
        ],
        rubrics: [
          {
            capacity: "Medir peças com paquímetro.",
            nsa: "Tenta medir, mas comete erros grosseiros na leitura da escala ou no manuseio, necessitando de demonstração completa.",
            apo: "Realiza a medição com auxílio, cometendo erros pontuais na leitura do nônio ou no posicionamento do instrumento.",
            par: "Mede a peça de forma autônoma e correta, aplicando as técnicas de manuseio e leitura adequadamente.",
            aut: "Mede com precisão e rapidez, identificando potenciais fontes de erro (paralaxe, temperatura) e garantindo a repetibilidade."
          },
          {
            capacity: "Medir peças no sistema métrico com micrômetro.",
            nsa: "Não consegue realizar a leitura ou o manuseio correto do instrumento, mesmo após orientação inicial.",
            apo: "Realiza a leitura e o manuseio com dificuldade, necessitando de correção na soma das escalas ou no uso da catraca.",
            par: "Zera, manuseia e lê o micrômetro de forma autônoma e correta, obtendo medidas precisas.",
            aut: "Além de medir corretamente, demonstra cuidado com o instrumento, verifica o zero periodicamente e justifica a escolha do instrumento."
          },
          {
            capacity: "Demonstrar atenção a detalhes (CRD).",
            nsa: "O relatório de inspeção apresenta múltiplos erros de transcrição e omissões. Não identifica as peças não conformes.",
            apo: "O relatório apresenta erros pontuais ou omissões. Identifica algumas, mas não todas, as peças não conformes.",
            par: "Preenche o relatório de forma correta e completa, identificando todas as peças não conformes.",
            aut: "Além de preencher o relatório corretamente, anota observações pertinentes sobre o acabamento da peça ou tendências."
          },
          {
            capacity: "Organizar o ambiente de trabalho e as atividades (CRD).",
            nsa: "Deixa a bancada e os instrumentos desorganizados e sujos durante e após a atividade.",
            apo: "Necessita de lembretes para organizar a bancada ou para limpar e guardar os instrumentos corretamente.",
            par: "Mantém o ambiente de trabalho organizado e guarda os equipamentos corretamente ao final da tarefa.",
            aut: "Incentiva os colegas à organização e propõe melhorias na disposição das ferramentas no posto."
          }
        ],
        schedule: [
          { id: 'c-1', date: '27/01/2026', hours: 2, capacities: 'Importância da Metrologia', knowledge: '1. Metrologia', strategy: 'Exposição dialogada', resources: 'Material da SA' },
          { id: 'c-2', date: '03/02/2026', hours: 2, capacities: 'Erros de medição', knowledge: '2. Erros', strategy: 'Demonstração prática', resources: 'Instrumentos' },
          { id: 'c-3', date: '10/02/2026', hours: 2, capacities: 'Escala e Trena', knowledge: '3. Escala e 4. Trena', strategy: 'Exercício prático', resources: 'Peças' },
          { id: 'c-4', date: '24/02/2026', hours: 2, capacities: 'Paquímetros (5.1, 5.2)', knowledge: '5. Paquímetros', strategy: 'Demonstração manuseio', resources: 'Paquímetros' },
          { id: 'c-5', date: '03/03/2026', hours: 2, capacities: 'Paquímetros (5.3, 5.4, 5.5)', knowledge: '5. Paquímetros', strategy: 'Prática de leitura', resources: 'Peças didáticas' },
          { id: 'c-6', date: '10/03/2026', hours: 2, capacities: 'Paquímetros (5.3)', knowledge: '5. Paquímetros', strategy: 'Supervisionado', resources: 'Relatórios' },
          { id: 'c-7', date: '17/03/2026', hours: 2, capacities: 'Micrômetros (6.1, 6.2, 6.3)', knowledge: '6. Micrômetros', strategy: 'Exposição técnica', resources: 'Micrômetros' },
          { id: 'c-8', date: '24/03/2026', hours: 2, capacities: 'Micrômetros (6.3, 6.4, 6.5)', knowledge: '6. Micrômetros', strategy: 'Prática de leitura', resources: 'Peças' },
          { id: 'c-9', date: '31/03/2026', hours: 2, capacities: 'Micrômetros (6.6)', knowledge: '6. Micrômetros', strategy: 'Supervisionado', resources: 'Peças/Relatório' },
          { id: 'c-10', date: '07/04/2026', hours: 2, capacities: 'Verificadores (7.1, 7.2)', knowledge: '7. Verificadores', strategy: 'Demonstração de uso', resources: 'Jogos de verificadores' },
          { id: 'c-11', date: '14/04/2026', hours: 2, capacities: 'Relógio comparador (8.1, 8.2)', knowledge: '8. Relógios', strategy: 'Montagem em suporte', resources: 'Relógios/Suportes' },
          { id: 'c-12', date: '28/04/2026', hours: 2, capacities: 'Relógio comparador (8.3, 8.4)', knowledge: '8. Relógios', strategy: 'Centragem e medição', resources: 'Blocos-padrão' },
          { id: 'c-13', date: '05/05/2026', hours: 2, capacities: 'Goniômetro (9.1 a 9.4)', knowledge: '9. Goniômetro', strategy: 'Medição angular', resources: 'Goniômetros' },
          { id: 'c-14', date: '12/05/2026', hours: 2, capacities: 'Revisão Geral', knowledge: 'Instrumentos SA', strategy: 'Planejamento de grupo', resources: 'Material da SA' },
          { id: 'c-15', date: '19/05/2026', hours: 2, capacities: 'Execução SA', knowledge: 'Base tecnológica SA', strategy: 'Medições iniciais', resources: 'Lote de peças' },
          { id: 'c-16', date: '26/05/2026', hours: 2, capacities: 'Execução SA', knowledge: 'Base tecnológica SA', strategy: 'Medições e registros', resources: 'Instrumentos' },
          { id: 'c-17', date: '02/06/2026', hours: 2, capacities: 'Execução SA', knowledge: 'Base tecnológica SA', strategy: 'Finalização medições', resources: 'Instrumentos' },
          { id: 'c-18', date: '09/06/2026', hours: 2, capacities: 'Consolidação SA', knowledge: 'Base tecnológica SA', strategy: 'Parecer técnico', resources: 'Relatórios' },
          { id: 'c-19', date: '16/06/2026', hours: 2, capacities: 'Apresentação SA', knowledge: 'Base tecnológica SA', strategy: 'Defesa de resultados', resources: 'Projetor' },
          { id: 'c-20', date: '23/06/2026', hours: 2, capacities: 'Feedback SA', knowledge: 'Base tecnológica SA', strategy: 'Fechamento da UC', resources: 'Avaliações' }
        ]
      }
    ]
  }
];
