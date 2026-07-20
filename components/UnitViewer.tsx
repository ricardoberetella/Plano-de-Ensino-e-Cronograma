import React, { useState, useMemo } from 'react';

// Tipagem completa alinhada com os padrões do SENAI
interface GeneralCompetencies {
  technicalCapacities: string[];
  socioemotionalCapacities: string[];
  knowledge: string[];
}

interface LearningSituation {
  id: string;
  title: string;
  contextualization: string;
  challenge: string;
  expectedResults: string[];
}

interface Rubric {
  id: string;
  capacity: string;
  levels: {
    nsa: string;
    apo: string;
    par: string;
    aut: string;
  };
}

interface ScheduleEntry {
  id: string;
  date: string;
  hours: number;
  capacities: string;
  knowledge: string;
  strategy: string;
  resources: string;
  completed: boolean;
}

interface FullUnitData {
  name: string;
  semester: number;
  general: GeneralCompetencies;
  learningSituations: LearningSituation[];
  rubrics: Rubric[];
  schedule: ScheduleEntry[];
}

interface UnitMeta {
  color: string;
  sigla: string;
}

interface UnitViewerProps {
  unitMeta?: UnitMeta;
  selectedUcSigla?: 'LIDT' | 'CDMAT' | 'CRD' | 'FUSI';
}

const COLOR_MAP: Record<string, string> = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#10b981',
  amber: '#f59e0b',
  slate: '#64748b',
};

const TEXT_COLOR_MAP: Record<string, string> = {
  blue: '#ffffff',
  red: '#ffffff',
  green: '#ffffff',
  amber: '#ffffff',
  slate: '#ffffff',
};

// BANCO DE DADOS COMPLETO E DEFINITIVO DO 1º SEMESTRE
const CURRICULUM_DATABASE: Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', FullUnitData> = {
  LIDT: {
    name: 'Leitura e Interpretação de Desenho Técnico',
    semester: 1,
    general: {
      technicalCapacities: [
        'Interpretar projeções ortogonais (1º e 3º diedro) de peças mecânicas.',
        'Identificar e aplicar escalas numéricas, hachuras, cortes (totais, parciais e desvios) e seções.',
        'Interpretar cotagem, tolerâncias dimensionais, geométricas (forma e posição) e indicações de rugosidade superficial.',
        'Elaborar croquis cotados de componentes mecânicos simples de acordo com as normas ABNT.'
      ],
      socioemotionalCapacities: [
        'Demonstrar rigor técnico e atenção aos detalhes na transcrição de especificações de projetos.',
        'Trabalhar de forma colaborativa na resolução de problemas de interpretação geométrica.',
        'Cumprir metas e prazos estabelecidos nos cronogramas de desenvolvimento de projetos.'
      ],
      knowledge: [
        'Formatos de papel, legenda e dobramento de desenhos (Normas ABNT).',
        'Sistemas de projeção ortográfica e representação em perspectiva isométrica.',
        'Cortes, seções, rupturas e omissão de corte.',
        'Sistemas de cotagem e tolerâncias ISO (furos e eixos).',
        'Simbologia técnica de acabamento superficial e tratamentos térmicos.'
      ]
    },
    learningSituations: [
      {
        id: 'lidt-sa1',
        title: 'Detecção de Falhas de Fabricação por Erro de Desenho',
        contextualization: 'O setor de controle de qualidade identificou um lote de eixos escalonados produzidos fora dos limites de concentricidade devido a um desenho de fabricação ambíguo.',
        challenge: 'Interpretar e corrigir o desenho técnico do eixo escalonado, adicionando as tolerâncias geométricas de forma e posição corretas.',
        expectedResults: ['Desenho técnico corrigido com aplicação estrita da norma de tolerância geométrica ISO.', 'Relatório descritivo apontando os desvios encontrados na peça piloto.']
      }
    ],
    rubrics: [],
    schedule: []
  },
  CDMAT: {
    name: 'Ciência e Tecnologia dos Materiais',
    semester: 1,
    general: {
      technicalCapacities: [
        'Identificar materiais metálicos ferrosos e não ferrosos por meio de ensaios visuais, magnéticos e faísca.',
        'Correlacionar as propriedades mecânicas dos materiais (dureza, tenacidade, ductilidade) com suas aplicações na usinagem.',
        'Interpretar diagramas de equilíbrio e tabelas técnicas de classificação de aços (SAE, AISI, ABNT).'
      ],
      socioemotionalCapacities: [
        'Atuar com responsabilidade socioambiental no descarte e segregação de resíduos e cavacos metálicos.',
        'Demonstrar proatividade na busca de alternativas técnicas para a substituição de materiais de alta pegada de carbono.'
      ],
      knowledge: [
        'Estrutura cristalina e propriedades físicas e mecânicas dos metais.',
        'Aços-carbono e aços-liga: Classificação, ligas principais e suas influências.',
        'Ferros fundidos e metais não ferrosos (Alumínio, Cobre, Latão e Bronze).',
        'Introdução aos tratamentos térmicos e termoquímicos (têmpera, revenimento, cementação).'
      ]
    },
    learningSituations: [
      {
        id: 'cdmat-sa1',
        title: 'Seleção Prática de Materiais para Eixos de Transmissão',
        contextualization: 'A oficina escola precisa usinar um eixo que sofrerá esforços severos de torção e fadiga.',
        challenge: 'Analisar a tabela de materiais disponíveis e selecionar o aço correto fundamentando-se nas propriedades mecânicas do elemento.',
        expectedResults: ['Ficha técnica de especificação do material escolhido.', 'Justificativa metalúrgica focada em usinabilidade e resistência mecânica.']
      }
    ],
    rubrics: [],
    schedule: []
  },
  CRD: {
    name: 'Controle Dimensional',
    semester: 1,
    general: {
      technicalCapacities: [
        'Executar medições lineares e angulares utilizando paquímetro, micrômetro, goniômetro e relógio comparador.',
        'Realizar calibração e zeragem correta dos instrumentos de medição direta.',
        'Registrar valores encontrados aplicando conceitos de resolução, incerteza de medição e tolerância dimensional.'
      ],
      socioemotionalCapacities: [
        'Manifestar ética profissional e honestidade na coleta de dados metrológicos de peças acabadas.',
        'Desenvolver paciência e precisão postural nos métodos manuais de medição dimensional.'
      ],
      knowledge: [
        'Fundamentos da metrologia industrial e o Sistema Internacional de Unidades (SI).',
        'Tipos, componentes e conservação de paquímetros (resoluções 0,05mm, 0,02mm e 1/128").',
        'Princípios de medição com micrômetros centesimais e milesimais.',
        'Relógios comparadores e apalpadores: Blocos-padrão e calibração por comparação.'
      ]
    },
    learningSituations: [
      {
        id: 'crd-sa1',
        title: 'Laudo Metrológico de Componentes Ajustados',
        contextualization: 'Um cliente externo encomendou um lote de buchas guias e exige um relatório de conformidade geométrica de 100% das peças.',
        challenge: 'Mensurar o diâmetro interno e externo das buchas utilizando paquímetros e micrômetros, gerando a carta de controle dimensional.',
        expectedResults: ['Laudo metrológico preenchido com aprovação/reprovação dos itens baseado nas tolerâncias nominais.', 'Cálculo de desvio sistemático verificado.']
      }
    ],
    rubrics: [],
    schedule: []
  },
  FUSI: {
    name: 'Fundamentos da Usinagem',
    semester: 1,
    general: {
      technicalCapacities: [
        '1. Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.',
        '2. Relacionar os processos de fabricação à sua aplicação na indústria.',
        '3. Relacionar os tipos de manutenção à sua aplicação na indústria.',
        '4. Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.',
        '5. Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.',
        '6. Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
        '7. Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
        '8. Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
        '9. Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.',
        '10. Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.',
        '11. Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.',
        '12. Aplicar os procedimentos de refrigeração nos processos de torneamento e fresagem convencional.'
      ],
      socioemotionalCapacities: [
        '1. Planejar ações (Autogestão)',
        '2. Organizar o ambiente de trabalho e as atividades (Autogestão)',
        '3. Zelar pelo uso de equipamentos, instrumentos, ferramentas e materiais (Autogestão)',
        '4. Demonstrar responsabilidade (Autogestão)',
        '5. Demonstrar visão sistêmica (Pensamento analítico)'
      ],
      knowledge: [
        '1.1 Elementos de fixação: Porcas, parafusos, arruelas, contra pino ou cupilha, rebites, pinos e cavilhas.',
        '1.2 Elementos de transmissão: Chavetas, engrenagens, polias, correias, acoplamentos, roscas de transmissão, corrente, eixos, sistemas de transmissão, redutores e variadores de velocidade.',
        '1.3 Elementos de vedação: Juntas, retentores, selos mecânicos e O-Rings.',
        '1.4 Elementos de apoio: Guias lineares, barramentos, mancais de deslizamento, mancais de rolamentos e buchas.',
        '1.5 Elementos de instalação e elásticos: Válvula, tubulação, conexão, molas, anéis elásticos e pinos elásticos.',
        '2. Ferramentas: Manuais, elétricas ou eletrônicas, pneumáticas e portáteis.',
        '3. Processos de fabricação: Injeção (metais/plásticos), manufatura subtrativa (torneamento, furação, fresamento, retificação), manufatura aditiva (soldagem, impressão 3D) e conformação mecânica (laminação, trefilação, extrusão, forjamento, repuxo, dobramento, corte).',
        '4. Manutenção: Definição, aplicação, intervenções (corretiva, preventiva, preditiva, prescritiva, emergencial), ocorrências (defeito/falha) e documentação técnica.',
        '5. Plano de trabalho: Definição, tipos e características organizacionais.',
        '6. Segurança no trabalho: Riscos (físicos, mecânicos, térmicos, elétricos), EPI, EPC, normas regulamentadoras, sinalização, ART, APR e Ficha de Dados de Segurança (FDS).',
        '7. Meio ambiente: Definição, normalização, segregação e descarte correto de resíduos industriais.',
        '8. Parâmetros de corte para usinagem: Cálculos de Rotação por minuto (RPM), Velocidade de corte (Vc), Avanço (f) e Profundidade de corte (ap).',
        '9. Parâmetros de ferramenta: Material, geometria, número de insertos/dentes (z) e raio de ponta (rε).',
        '10. Torneamento: Definição, tipos de tornos (horizontal, vertical, de placa, revólver, automático, copiador, CNC), ferramentas (alargador, bedame, brocas, cossinete, escareador, macho, recartilha), acessórios e cálculos técnicos (conicidade, rosca triangular).',
        '10.6 Operações de Torneamento: Facear, tornear superfície cilíndrica, facear rebaixo, chanfrar, fazer furo de centro, tornear canal, furar com cabeçote móvel, roscar com cossinete, tornear cônico, recartilhar, cortar, alargar e tornear roscas.',
        '11. Fresagem: Definição, tipos de fresadoras (universal, ferramenteira, pantográfica, copiadora, CNC, centros de usinagem), ferramentas (cabeçote faceador, fresa de topo) e acessórios (morsas, cantoneiras, calços).',
        '11.5 Operações de Fresagem: Fresar superfície plana, paralela, perpendicular, rebaixos, rasgos e superfícies planas inclinadas.',
        '12. Furação: Definição, tipos de furadeira (coluna de piso, bancada, radial, portátil), ferramentas, acessórios e operações (furar, rebaixar e escarear).',
        '13. Rosqueamento: Definição, ferramentas (macho, cossinete), acessórios (desandador, porta cossinete), características (sistemas de roscas, tabelas) e rosqueadeiras.',
        '14. Ajustagem: Definição, ferramentas manuais (limas, riscadores, martelos, punção), acessórios (morsa de bancada, mordentes, desempeno, cepo, traçador de altura), esmerilhamento e operações (limar, traçar, puncionar, serrar e dobrar).',
        '15. Controle da qualidade: Inspeção visual (rebarbas, oxidação, marcas, riscos) e inspeção dimensional (ficha de autoinspeção e técnicas de medição).',
        '16. Refrigeração: Definição, fluidos de corte (aplicações, tipos, mecanismos, propriedades) e procedimentos operacionais.'
      ]
    },
    learningSituations: [
      {
        id: 'fusi-sa1',
        title: 'Situação de Aprendizagem 1: Torneamento Convencional (Diretriz SMO)',
        contextualization: 'Conforme recomendações do plano de curso, o aluno deverá elaborar o plano de trabalho (folha de processo) estimando 2h para estudo da tarefa mecânica.',
        challenge: 'Elaborar o plano e realizar operações de faceamento, torneamento cilíndrico na placa e contraponta, chanframento e furos de centro no torno convencional.',
        expectedResults: [
          'Plano de trabalho/Folha de processo estruturada (2h).',
          'Peça usinada no torno conforme tolerâncias e normas de segurança vigentes.'
        ]
      },
      {
        id: 'fusi-sa2',
        title: 'Situação de Aprendizagem 2: Fresamento Convencional (Diretriz SMO)',
        contextualization: 'Seguindo a rotação de postos simultâneos na oficina convencional e aplicando a filosofia de Autogestão e Organização do ambiente.',
        challenge: 'Fresar superfícies planas, paralelas, perpendiculares e executar rebaixos/rasgos utilizando a fresadora universal ou ferramenteira.',
        expectedResults: [
          'Plano de trabalho técnico preenchido com parâmetros de corte calculados (RPM e Avanço).',
          'Bloco prismático fresado em conformidade com o esquadro e dimensões nominais.'
        ]
      }
    ],
    rubrics: [],
    schedule: []
  }
};

const UnitViewer: React.FC<UnitViewerProps> = ({
  unitMeta = { color: 'blue', sigla: 'LIDT' },
  selectedUcSigla = 'LIDT'
}) => {
  const unit = CURRICULUM_DATABASE[selectedUcSigla] || CURRICULUM_DATABASE.LIDT;
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');

  const toIsoDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    return dateStr;
  };

  const getDayOfWeek = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(toIsoDate(dateStr) + 'T00:00:00');
    if (isNaN(dateObj.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(dateObj);
  };

  const scheduleDates = useMemo(() => {
    const map: Record<string, ScheduleEntry[]> = {};
    unit.schedule.forEach(entry => {
      const iso = toIsoDate(entry.date);
      if (iso) {
        if (!map[iso]) map[iso] = [];
        map[iso].push(entry);
      }
    });
    return map;
  }, [unit.schedule]);

  const monthsInRange = useMemo(() => {
    return ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12'];
  }, []);

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6">
      {/* TÍTULO DA UNIDADE SELECIONADA */}
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-0.5">Unidade Curricular Ativa</span>
          <h2 className="text-lg font-black text-slate-800">{unit.name}</h2>
        </div>
        <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
          {unit.semester}º Semestre
        </span>
      </div>

      {/* NAVEGAÇÃO INTERNA ENTRE ABAS */}
      <div className="flex border-b border-slate-200 mb-6 no-print gap-2">
        {(['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : tab}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="tab-content">
        
        {/* ABA: GERAL (CAPACIDADES E CONHECIMENTOS) */}
        {activeTab === 'geral' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CAPACIDADES TÉCNICAS */}
              <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3">
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Capacidades Técnicas
                </h3>
                <ul className="space-y-2">
                  {unit.general.technicalCapacities.map((cap, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100 font-medium">
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CAPACIDADES SOCIOEMOCIONAIS */}
              <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3">
                <h3 className="text-xs font-black text-emerald-600 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Capacidades Socioemocionais / Organizacionais
                </h3>
                <ul className="space-y-2">
                  {unit.general.socioemotionalCapacities.map((cap, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100 font-medium">
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CONHECIMENTOS */}
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Conhecimentos Teóricos e Tecnológicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unit.general.knowledge.map((know, i) => (
                  <div key={i} className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-200/60 w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-medium">{know}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* ABA: SITUAÇÃO DE APRENDIZAGEM */}
        {activeTab === 'sa' && (
          <div className="space-y-6">
            <div className="space-y-6">
              {unit.learningSituations.length > 0 ? (
                unit.learningSituations.map((situation, idx) => (
                  <div key={situation.id || idx} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-2">
                      {idx + 1}. {situation.title}
                    </h3>
                    
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Contextualização</span>
                      <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl whitespace-pre-line border border-slate-100">
                        {situation.contextualization}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Desafio Proposto</span>
                      <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl whitespace-pre-line border border-slate-100">
                        {situation.challenge}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Resultados Esperados</span>
                      <ul className="space-y-2">
                        {situation.expectedResults.map((result, rIdx) => (
                          <li key={rIdx} className="text-xs text-slate-700 bg-slate-50/60 border border-slate-100 px-3 py-2 rounded-xl flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-12 bg-white border border-slate-200 rounded-3xl text-xs text-slate-400">
                  Nenhuma situação de aprendizagem cadastrada para esta unidade.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA: RUBRICAS */}
        {activeTab === 'rubricas' && (
          <div className="space-y-6">
            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">Capacidade / Indicador</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">NSA (Não Satisfatório)</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">APO (Apoiado)</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">PAR (Parcial)</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">AUT (Autônomo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {unit.rubrics.length > 0 ? (
                    unit.rubrics.map(rubric => (
                      <tr key={rubric.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold bg-slate-50/30">{rubric.capacity}</td>
                        <td className="p-4 whitespace-pre-line">{rubric.levels.nsa || '—'}</td>
                        <td className="p-4 whitespace-pre-line">{rubric.levels.apo || '—'}</td>
                        <td className="p-4 whitespace-pre-line">{rubric.levels.par || '—'}</td>
                        <td className="p-4 whitespace-pre-line">{rubric.levels.aut || '—'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-12 text-slate-400">Nenhuma rubrica cadastrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA: CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    <th className="p-4 w-32">Data</th>
                    <th className="p-4 w-20 text-center">Horas</th>
                    <th className="p-4">Conteúdo / Capacidades</th>
                    <th className="p-4">Estratégias / Recursos</th>
                    <th className="p-4 w-24 text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {unit.schedule.length > 0 ? (
                    unit.schedule.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-slate-800">{entry.date || 'A definir'}</span>
                          <span className="block text-[9px] text-slate-400 uppercase font-black tracking-tighter mt-0.5">
                            {getDayOfWeek(entry.date)}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-blue-600">{entry.hours}h</td>
                        <td className="p-4 space-y-1">
                          <div className="font-bold text-slate-800">{entry.capacities || '—'}</div>
                          <div className="text-slate-500 whitespace-pre-line italic">{entry.knowledge || '—'}</div>
                        </td>
                        <td className="p-4 space-y-1">
                          <div className="font-medium text-slate-800">{entry.strategy || '—'}</div>
                          <div className="text-slate-400">{entry.resources || '—'}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                            entry.completed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {entry.completed ? 'Realizada' : 'Prevista'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-12 text-slate-400">Nenhum plano de aula listado no cronograma.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA: CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {monthsInRange.map(monthStr => {
                const [year, month] = monthStr.split('-').map(Number);
                const firstDayIndex = new Date(year, month - 1, 1).getDay();
                const totalDays = new Date(year, month, 0).getDate();
                const monthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(
                  new Date(year, month - 1, 1)
                );

                return (
                  <div key={monthStr} className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 text-center">
                      {monthLabel}
                    </h4>
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-slate-400 uppercase mb-2">
                      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 auto-rows-[42px]">
                      {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-slate-50/50 rounded-xl" />
                      ))}
                      {Array.from({ length: totalDays }).map((_, i) => {
                        const day = i + 1;
                        const currentIso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const entries = scheduleDates[currentIso] || [];

                        return (
                          <div
                            key={currentIso}
                            className={`rounded-xl border p-1 flex flex-col justify-between relative ${
                              entries.length > 0 ? 'border-blue-200 bg-blue-50/40 shadow-sm' : 'border-slate-100 bg-white'
                            }`}
                          >
                            <span className={`text-[10px] font-bold ${entries.length > 0 ? 'text-blue-700' : 'text-slate-600'}`}>
                              {day}
                            </span>
                            {entries.length > 0 && (
                              <div className="flex gap-0.5 flex-wrap overflow-hidden max-h-[18px]">
                                {entries.map(e => (
                                  <span
                                    key={e.id}
                                    className="text-[7px] font-black px-1 py-0.5 rounded uppercase tracking-tighter block text-center truncate w-full"
                                    style={{
                                      backgroundColor: COLOR_MAP[unitMeta.color],
                                      color: TEXT_COLOR_MAP[unitMeta.color]
                                    }}
                                  >
                                    {e.hours}h
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitViewer;
