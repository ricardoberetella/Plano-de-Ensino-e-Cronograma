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
