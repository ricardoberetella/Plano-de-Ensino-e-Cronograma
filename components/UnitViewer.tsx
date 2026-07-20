import React, { useState, useRef } from 'react';

// Interfaces estruturais do padrão técnico
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
  date: string; // Formato esperado: DD/MM/AAAA
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

// Configuração de cores institucionais por UC para o Calendário e Interface
const UC_THEMES: Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', { bg: string; text: string; border: string; accent: string }> = {
  LIDT: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'bg-blue-600' },
  CDMAT: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'bg-emerald-600' },
  CRD: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', accent: 'bg-purple-600' },
  FUSI: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', accent: 'bg-orange-600' }
};

const INITIAL_DATABASE: Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', FullUnitData> = {
  LIDT: {
    name: 'Leitura e Interpretação de Desenho Técnico',
    semester: 1,
    general: {
      technicalCapacities: [
        'Interpretar projeções ortogonais (1º e 3º diedro) de peças mecânicas.',
        'Identificar e aplicar escalas numéricas, hachuras, cortes e seções.',
        'Interpretar cotagem, tolerâncias dimensionais e geométricas.'
      ],
      socioemotionalCapacities: [
        'Demonstrar rigor técnico e atenção aos detalhes.',
        'Trabalhar de forma colaborativa.'
      ],
      knowledge: [
        'Formatos de papel, legenda e dobramento de desenhos (Normas ABNT).',
        'Sistemas de projeção ortográfica e representação em perspectiva.'
      ]
    },
    learningSituations: [
      {
        id: 'lidt-sa1',
        title: 'Detecção de Falhas de Fabricação por Erro de Desenho',
        contextualization: 'O setor de controle de qualidade identificou um lote de eixos escalonados fora dos limites.',
        challenge: 'Interpretar e corrigir o desenho técnico do eixo escalonado.',
        expectedResults: ['<span>Desenho técnico corrigido conforme ISO.</span>']
      }
    ],
    rubrics: [],
    schedule: [
      {
        id: 'e1',
        date: '10/02/2026',
        hours: 4,
        capacities: 'Interpretar projeções ortogonais',
        knowledge: 'Formatos de papel e legenda',
        strategy: 'Aula expositiva e prática em prancheta',
        resources: 'Instrumentos de desenho',
        completed: false
      }
    ]
  },
  CDMAT: { name: 'Ciência e Tecnologia dos Materiais', semester: 1, general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] }, learningSituations: [], rubrics: [], schedule: [{ id: 'e2', date: '11/02/2026', hours: 4, capacities: 'Identificar ligas metálicas', knowledge: 'Diagrama Ferro-Carbono', strategy: 'Análise metalográfica', resources: 'Laboratório', completed: false }] },
  CRD: { name: 'Controle Dimensional', semester: 1, general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] }, learningSituations: [], rubrics: [], schedule: [{ id: 'e3', date: '12/02/2026', hours: 4, capacities: 'Medição com Paquímetro', knowledge: 'Metrologia básica', strategy: 'Prática de medição', resources: 'Blocos padrão', completed: true }] },
  FUSI: { name: 'Fundamentos da Usinagem', semester: 1, general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] }, learningSituations: [], rubrics: [], schedule: [{ id: 'e4', date: '13/02/2026', hours: 4, capacities: 'Calcular parâmetros de corte', knowledge: 'Geometria da ferramenta', strategy: 'Exercícios práticos', resources: 'Tabelas técnicas', completed: false }] }
};

// Componente de entrada rica nativa expansível e customizável
const RichEditable: React.FC<{
  html: string;
  onChange: (newHtml: string) => void;
  className?: string;
}> = ({ html, onChange, className = '' }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (cmd: string, value: string = '') => {
    document.execCommand(cmd, false, value);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="relative w-full group/rich">
      {showToolbar && (
        <div className="absolute -top-9 left-0 bg-slate-900 text-white flex items-center gap-1 p-1 rounded-xl shadow-xl z-50 no-print scale-90 origin-bottom-left border border-slate-800 animate-fadeIn">
          <button type="button" onClick={() => execCmd('bold')} className="p-1 px-2 hover:bg-slate-800 rounded font-bold text-xs">B</button>
          <button type="button" onClick={() => execCmd('fontSize', '4')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A+</button>
          <button type="button" onClick={() => execCmd('fontSize', '2')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A-</button>
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <button type="button" onClick={() => execCmd('foreColor', '#3b82f6')} className="w-4 h-4 rounded-full bg-blue-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#10b981')} className="w-4 h-4 rounded-full bg-emerald-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#8b5cf6')} className="w-4 h-4 rounded-full bg-purple-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#f97316')} className="w-4 h-4 rounded-full bg-orange-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#1e293b')} className="w-4 h-4 rounded-full bg-slate-800 border border-white/20 m-0.5" />
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setShowToolbar(true)}
        onBlur={() => {
          setTimeout(() => setShowToolbar(false), 200);
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        className={`w-full min-h-[1.2rem] bg-transparent focus:outline-none focus:bg-white/90 rounded px-1 break-words transition-all ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

const UnitViewer: React.FC = () => {
  const [db, setDb] = useState<Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', FullUnitData>>(INITIAL_DATABASE);
  const [currentUc, setCurrentUc] = useState<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma' | 'calendario'>('cronograma');

  const unit = db[currentUc];
  const theme = UC_THEMES[currentUc];

  const updateUnitField = (updater: (draft: FullUnitData) => void) => {
    setDb(prev => {
      const copy = { ...prev };
      updater(copy[currentUc]);
      return copy;
    });
  };

  const getDayOfWeek = (dateStr: string) => {
    const cleanStr = dateStr.replace(/<[^>]*>/g, '').trim();
    const parts = cleanStr.split('/');
    if (parts.length !== 3) return '';
    const dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
    if (isNaN(dateObj.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(dateObj);
  };

  // Consolidação de todas as datas de todas as UCs para exibição no Calendário Integrado
  const allScheduledDates = useMemo(() => {
    const datesMap: Record<string, { uc: 'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'; task: string }> = {};
    (Object.keys(db) as Array<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'>).forEach(ucKey => {
      db[ucKey].schedule.forEach(item => {
        const cleanDate = item.date.replace(/<[^>]*>/g, '').trim();
        if (cleanDate) {
          datesMap[cleanDate] = { uc: ucKey, task: item.capacities.replace(/<[^>]*>/g, '') };
        }
      });
    });
    return datesMap;
  }, [db]);

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 select-text">
      
      {/* SELETOR DE UNIDADE CURRICULAR */}
      <div className="mb-4 flex gap-2 no-print">
        {(Object.keys(db) as Array<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'>).map(ucKey => (
          <button
            key={ucKey}
            onClick={() => setCurrentUc(ucKey)}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
              currentUc === ucKey 
                ? `${UC_THEMES[ucKey].bg} ${UC_THEMES[ucKey].text} ${UC_THEMES[ucKey].border} shadow-sm scale-105`
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {ucKey}
          </button>
        ))}
      </div>

      {/* CABEÇALHO DA UNIDADE ATIVA */}
      <div className={`mb-6 p-4 bg-white border-l-4 ${theme.border} rounded-r-3xl shadow-sm flex items-center justify-between`}>
        <div className="flex-1 mr-4">
          <span className={`text-[9px] font-black uppercase tracking-wider block mb-0.5 ${theme.text}`}>
            Unidade Curricular Selecionada
          </span>
          <RichEditable
            html={unit.name}
            onChange={(val) => updateUnitField(u => { u.name = val; })}
            className="text-base font-black text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-400">Semestre:</span>
          <input
            type="number"
            value={unit.semester}
            onChange={(e) => updateUnitField(u => { u.semester = parseInt(e.target.value) || 1; })}
            className="w-10 bg-slate-100 text-slate-700 font-black text-xs p-1 rounded-xl text-center"
          />
        </div>
      </div>

      {/* NAVEGAÇÃO INTERNA */}
      <div className="flex border-b border-slate-200 mb-6 no-print gap-2">
        {(['geral', 'sa', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab ? `border-slate-800 text-slate-800` : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'geral' ? 'Estrutura Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : tab}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="tab-content">
        
        {/* CRONOGRAMA CORRIGIDO (ESPAÇO OTIMIZADO ENTRE DATA E HORA + FORMATO XX/XX/XXXX) */}
        {activeTab === 'cronograma' && (
          <div className="space-y-4 group/panel">
            <div className="flex justify-end">
              <button
                onClick={() => updateUnitField(u => {
                  u.schedule.push({
                    id: `entry-${Date.now()}`,
                    date: '01/02/2026',
                    hours: 4,
                    capacities: 'Nova Capacidade',
                    knowledge: 'Novo Conhecimento',
                    strategy: 'Estratégia Didática',
                    resources: 'Recursos',
                    completed: false
                  });
                })}
                className="opacity-0 group-hover/panel:opacity-100 text-xs bg-white border border-slate-200 text-slate-600 hover:text-slate-900 px-3 py-1 rounded-xl font-bold shadow-sm transition-all"
              >
                + Adicionar Aula
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    {/* OTIMIZAÇÃO: w-32 alinha perfeitamente com o formato xx/xx/xxxx sem sobrar espaço até a hora */}
                    <th className="p-3 w-32">Data (xx/xx/xxxx)</th>
                    <th className="p-3 w-16 text-center">Horas</th>
                    <th className="p-3 w-5/12">Conteúdo / Capacidades</th>
                    <th className="p-3 w-4/12">Estratégias / Recursos</th>
                    <th className="p-3 w-24 text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {unit.schedule.map((entry, sIdx) => (
                    <tr key={entry.id} className="group/row hover:bg-slate-50/50 transition-colors">
                      
                      {/* CAMPO DATA OTIMIZADO */}
                      <td className="p-3 align-top whitespace-nowrap">
                        <RichEditable
                          html={entry.date}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].date = val; })}
                          className="font-bold text-slate-800 text-xs"
                        />
                        <span className="block text-[9px] text-slate-400 uppercase font-black mt-0.5">
                          {getDayOfWeek(entry.date) || '—'}
                        </span>
                      </td>

                      {/* COLUNA HORAS COLADA NA DATA */}
                      <td className="p-3 text-center align-top">
                        <input
                          type="number"
                          value={entry.hours}
                          onChange={(e) => updateUnitField(u => { u.schedule[sIdx].hours = parseInt(e.target.value) || 0; })}
                          className="w-10 bg-transparent font-bold text-slate-800 text-center focus:outline-none"
                        />
                      </td>

                      {/* CONTEÚDOS */}
                      <td className="p-3 space-y-1 align-top h-auto">
                        <RichEditable
                          html={entry.capacities}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].capacities = val; })}
                          className="font-bold text-slate-800 text-xs"
                        />
                        <RichEditable
                          html={entry.knowledge}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].knowledge = val; })}
                          className="text-slate-500 text-xs italic"
                        />
                      </td>

                      {/* ESTRATÉGIAS */}
                      <td className="p-3 space-y-1 align-top h-auto">
                        <RichEditable
                          html={entry.strategy}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].strategy = val; })}
                          className="text-slate-800 text-xs"
                        />
                        <RichEditable
                          html={entry.resources}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].resources = val; })}
                          className="text-slate-400 text-[11px]"
                        />
                      </td>

                      {/* STATUS E OPERAÇÕES */}
                      <td className="p-3 text-center align-top relative">
                        <span className={`inline-block px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                          entry.completed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {entry.completed ? 'Ok' : 'Prev'}
                        </span>
                        <button
                          onClick={() => updateUnitField(u => { u.schedule.splice(sIdx, 1); })}
                          className="absolute bottom-2 right-2 opacity-0 group-hover/row:opacity-100 text-[9px] text-red-400 font-bold"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA: CALENDÁRIO COM CORES DISTINTAS POR UNIDADE CURRICULAR */}
        {activeTab === 'calendario' && (
          <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
            <div className="mb-4 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> LIDT</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> CDMAT</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-purple-500" /> CRD</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-orange-500" /> FUSI</span>
            </div>

            {/* Simulação do grid de calendário (Fevereiro 2026 como base) */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs border border-slate-100 p-2 rounded-2xl">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                <div key={d} className="font-black text-slate-400 p-2 uppercase text-[10px]">{d}</div>
              ))}
              
              {/* Espaçadores iniciais para alinhar o dia da semana */}
              <div className="p-4 bg-slate-50/40 rounded-xl text-transparent">25</div>
              <div className="p-4 bg-slate-50/40 rounded-xl text-transparent">26</div>
              <div className="p-4 bg-slate-50/40 rounded-xl text-transparent">27</div>
              <div className="p-4 bg-slate-50/40 rounded-xl text-transparent">28</div>
              <div className="p-4 bg-slate-50/40 rounded-xl text-transparent">29</div>
              <div className="p-4 bg-slate-50/40 rounded-xl text-transparent">30</div>

              {/* Geração dos dias do mês simulados e validação das cores das UCs */}
              {Array.from({ length: 28 }).map((_, i) => {
                const dayStr = String(i + 1).padStart(2, '0');
                const fullDateKey = `${dayStr}/02/2026`;
                const matchedDate = allScheduledDates[fullDateKey];
                
                let dayStyle = "bg-slate-50 text-slate-700 hover:bg-slate-100";
                if (matchedDate) {
                  const ucTheme = UC_THEMES[matchedDate.uc];
                  // Aplica a cor de fundo e borda específica da UC mapeada
                  dayStyle = `${ucTheme.bg} ${ucTheme.text} border-2 ${ucTheme.border} font-black shadow-sm`;
                }

                return (
                  <div key={i} className={`p-3 rounded-xl transition-all relative group/day ${dayStyle}`}>
                    <span>{i + 1}</span>
                    {matchedDate && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 text-white text-[9px] p-1.5 rounded-lg shadow-xl hidden group-hover/day:block w-32 z-50 text-center font-normal">
                        <span className="block font-black border-b border-white/20 mb-0.5">{matchedDate.uc}</span>
                        {matchedDate.task}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DEMAIS ABAS COMPLEMENTARES (ESTRUTURA GERAL / SA) */}
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Capacidades Técnicas</h3>
              {unit.general.technicalCapacities.map((cap, i) => (
                <RichEditable key={i} html={cap} onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })} className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl" />
              ))}
            </div>
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Conhecimentos</h3>
              {unit.general.knowledge.map((know, i) => (
                <RichEditable key={i} html={know} onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })} className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sa' && (
          <div className="space-y-4">
            {unit.learningSituations.map((situation, idx) => (
              <div key={situation.id} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3">
                <RichEditable html={situation.title} onChange={(val) => updateUnitField(u => { u.learningSituations[idx].title = val; })} className="text-xs font-black uppercase text-slate-800" />
                <RichEditable html={situation.contextualization} onChange={(val) => updateUnitField(u => { u.learningSituations[idx].contextualization = val; })} className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl" />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UnitViewer;
