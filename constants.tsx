
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
    methodology: 'Metodologia SENAI de Educação Profissional (MSEP). Uso de situações de aprendizagem realistas para contextualização de desafios fabris através do Cronograma Integrador.',
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
            subtopics: ['1.1. Definição', '1.2. Normas técnicas', '1.3. Formatos', '1.4. Linhas', '1.5. Escalas', '1.6. Projeções'] 
          },
          { 
            topic: 'II. Cortes e Seções', 
            subtopics: ['2.1. Corte total', '2.2. Meio corte', '2.3. Corte composto', '2.4. Corte parcial', '2.5. Seção'] 
          }
        ],
        learningSituations: [
          {
            id: 'sa-lidt-beretella',
            title: 'Precisão em Foco: Interpretação de Componentes Críticos',
            context: 'A "UsiPrecision Componentes Mecânicos Ltda." enfrenta um aumento no índice de devoluções de um de seus principais clientes devido à inconsistência dimensional em lotes de "Pinos de Ancoragem". O gestor da Qualidade identificou que a causa raiz pode estar na interpretação divergente dos desenhos técnicos entre os turnos. A empresa decidiu investir na capacitação técnica para garantir que 100% das peças estejam rigorosamente dentro das especificações do desenho técnico.',
            challenge: 'Como parte da equipe técnica, sua missão é realizar a análise interpretativa completa do desenho técnico dos "Pinos de Ancoragem". Vocês deverão: a) Analisar o Desenho Técnico; b) Elaborar Croquis de Detalhamento das zonas críticas de montagem; c) Validar as especificações técnicas para subsidiar a equipe de medição.',
            expectedResults: [
              'Dossiê de Interpretação Técnica completo.',
              'Croquis Normalizados das vistas auxiliares.',
              'Argumentação Técnica sobre tolerâncias.'
            ]
          }
        ],
        rubrics: [
          {
            capacity: "Interpretar desenho técnico de montagem",
            nsa: "Não identifica componentes básicos.",
            apo: "Identifica com auxílio constante.",
            par: "Identifica e explica funções corretamente.",
            aut: "Antecipa falhas de montagem."
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
          'Autogestão: 3. Zelar pelo uso de equipamentos e instrumentos'
        ],
        knowledge: [
          { 
            topic: '1. Metrologia e Erros', 
            subtopics: ['1.1. Definição e VIM', '2.1. Tipos de Erro (Sistemático/Aleatório)', '2.2. Fontes de erro'] 
          },
          { 
            topic: '2. Instrumentos de Medição', 
            subtopics: ['3. Escala e Trena', '5. Paquímetros', '6. Micrômetros', '8. Relógios', '9. Goniômetro'] 
          }
        ],
        learningSituations: [
          {
            id: 'sa-crd-beretella-final',
            title: 'Precisão em Foco: Verificação de Componentes para a Linha de Montagem',
            context: 'A "UsiPrecision Componentes Mecânicos Ltda." é uma empresa de médio porte, com 150 funcionários, especializada na fabricação de peças usinadas para a indústria automotiva e de máquinas agrícolas. Recentemente, a empresa tem enfrentado um aumento no índice de devoluções de um de seus principais clientes. O motivo alegado é a inconsistência dimensional em lotes de "Pinos de Ancoragem", componentes críticos para a montagem de um sistema de transmissão. O gestor da Qualidade identificou que a causa raiz do problema pode estar na falta de um procedimento padronizado de medição e na variação de critérios entre os inspetores do turno. Para resolver essa não conformidade e garantir a satisfação do cliente, a empresa decidiu investir na capacitação de sua equipe, começando pelos novos aprendizes. Vocês, como parte da nova equipe de controle dimensional, foram designados para uma tarefa importantíssima: estabelecer um método de inspeção confiável para garantir que 100% das peças enviadas ao cliente estejam rigorosamente dentro das especificações do desenho técnico. A sua atuação será fundamental para restaurar a confiança do cliente e evitar prejuízos com refugo e retrabalho. O ambiente de trabalho será a bancada de inspeção do laboratório de metrologia, que simula a estação de controle de qualidade da UsiPrecision.',
            challenge: 'Vocês receberam um lote piloto de 10 "Pinos de Ancoragem" e o respectivo desenho técnico. A sua missão é realizar uma inspeção dimensional completa em cada uma das peças para determinar se o lote pode ser aprovado para envio ao cliente. Para isso, vocês deverão: a) Analisar o Desenho Técnico: Interpretar todas as cotas, tolerâncias dimensionais, indicações de acabamento e especificações geométricas presentes no desenho do "Pino de Ancoragem". b) Planejar a Inspeção: Definir a sequência de medições a serem realizadas e selecionar o instrumento mais adequado para cada característica da peça (ex: diâmetros externos, comprimentos, ângulos de chanfros, raios, planicidade de uma face). c) Executar as Medições: Utilizando os instrumentos disponíveis (escala, trena, paquímetro, micrômetro, goniômetro, relógios comparadores/apalpadores e verificadores), realizar todas as medições necessárias em cada pino, aplicando as técnicas corretas de manuseio e leitura para evitar erros. d) Registrar os Dados: Preencher um "Relatório de Inspeção Dimensional" para cada peça, anotando os valores medidos e comparando-os com os valores nominais e as tolerâncias especificadas no desenho. e) Emitir o Parecer: Com base nos dados do relatório, classificar cada peça como "Aprovada" ou "Reprovada". Para as peças reprovadas, vocês deverão indicar exatamente qual medida está fora da especificação e justificar a decisão. Ao final, vocês deverão apresentar os relatórios consolidados ao "Gestor da Qualidade" (docente), explicando o processo realizado e defendendo suas conclusões sobre a aprovação ou reprovação do lote.',
            expectedResults: [
              'a) Relatórios de Inspeção Dimensional: Um relatório para cada peça inspecionada, devidamente preenchido, com todas as medições, comparações com as especificações e o parecer final (Aprovado/Reprovado) claramente justificado.',
              'b) Demonstração Prática: Habilidade no manuseio correto e seguro de todos os instrumentos de medição propostos (escala, trena, paquímetro, micrômetro, verificadores, relógios e goniômetro), realizando leituras precisas.',
              'c) Argumentação Técnica: Capacidade de explicar oralmente o processo de inspeção, justificar a escolha dos instrumentos e defender as decisões de aprovação ou reprovação com base nos dados técnicos do desenho e das medições.',
              'd) Organização do Posto de Trabalho: Ao término da atividade, a bancada de inspeção deverá estar limpa e organizada, com todos os instrumentos devidamente limpos e guardados em seus respectivos estojos, demonstrando zelo e responsabilidade com os equipamentos.'
            ]
          }
        ],
        rubrics: [
          {
            capacity: "Medir peças com paquímetro e micrômetro",
            nsa: "Comete erros grosseiros na leitura ou manuseio.",
            apo: "Realiza medição com auxílio, cometendo erros pontuais.",
            par: "Mede de forma autônoma e correta.",
            aut: "Mede com alta precisão e identifica fontes de erro."
          }
        ],
        schedule: [
          { id: 'c-1', date: '27/01/2026', hours: 2, capacities: 'Importância da Metrologia', knowledge: '1. Metrologia', strategy: 'Exposição dialogada', resources: 'Material da SA' },
          { id: 'c-15', date: '19/05/2026', hours: 2, capacities: 'Execução SA - Precisão em Foco', knowledge: 'Base tecnológica SA', strategy: 'Medições e registros', resources: 'Lote de peças' }
        ]
      }
    ]
  }
];
