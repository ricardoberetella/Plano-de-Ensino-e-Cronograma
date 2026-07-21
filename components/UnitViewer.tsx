import React, { useState, useRef, useMemo } from 'react';

// Interfaces
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

interface ScheduleEntry {
  id: string;
  date: string; // DD/MM/AAAA
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
  schedule: ScheduleEntry[];
}

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
        expectedResults: ['Desenho técnico corrigido conforme ISO.']
      }
    ],
    schedule: [
      {
        id: 'e1',
        date: '10/01/2026',
        hours: 4,
        capacities: 'Interpretar projeções ortogonais',
        knowledge: 'Formatos de papel e legenda',
        strategy: 'Aula expositiva e prática em prancheta',
        resources: 'Instrumentos de desenho',
        completed: false
      }
    ]
  },
  CDMAT: { name: 'Ciência e Tecnologia dos Materiais', semester: 1, general: { technicalCapacities: ['Identificar ligas metálicas'], socioemotionalCapacities: ['Responsabilidade ambiental'], knowledge: ['Diagrama Ferro-Carbono'] }, learningSituations: [], schedule: [{ id: 'e2', date: '11/02/2026', hours: 4, capacities: 'Identificar ligas metálicas', knowledge: 'Diagrama Ferro-Carbono', strategy: 'Análise metalográfica', resources: 'Laboratório', completed: false }] },
  CRD: { name: 'Controle Dimensional', semester: 1, general: { technicalCapacities: ['Medição com Paquímetro'], socioemotionalCapacities: ['Atenção aos detalhes'], knowledge: ['Metrologia básica'] }, learningSituations: [], schedule: [{ id: 'e3', date: '12/02/2026', hours: 4, capacities: 'Medição com Paquímetro', knowledge: 'Metrologia básica', strategy: 'Prática de medição', resources: 'Blocos padrão', completed: true }] },
  FUSI: { name: 'Fundamentos da Usinagem', semester: 1, general: { technicalCapacities: ['Calcular parâmetros de corte'], socioemotionalCapacities: ['Segurança no trabalho'], knowledge: ['Geometria da ferramenta'] }, learningSituations: [], schedule: [{ id: 'e4', date: '13/02/2026', hours: 4, capacities: 'Calcular parâmetros de corte', knowledge: 'Geometria da ferramenta', strategy: 'Exercícios práticos', resources: 'Tabelas técnicas', completed: false }] }
};

// Componente Editor Editável que preserva foco e edita diretamente
const RichEditable: React.FC<{
  html: string;
  onChange: (newHtml: string) => void;
  className?: string;
  placeholder?: string;
}> = ({ html, onChange, className = '', placeholder = 'Clique para editar...' }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (cmd: string, value: string = '') => {
    document.execCommand(cmd, false, value);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="relative w-full group/rich">
      {showToolbar && (
        <div className="absolute -top-9 left-0 bg-slate-900 text-white flex items-center gap-1 p-1 rounded-xl shadow-xl z-50 no-print scale-90 origin-bottom-left border border-slate-800">
          <button type="button" onClick={() => execCmd('bold')} className="p-1 px-2 hover:bg-slate-800 rounded font-bold text-xs">B</button>
          <button type="button" onClick={() => execCmd('fontSize', '4')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A+</button>
          <button type="button" onClick={() => execCmd('fontSize', '2')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A-</button>
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
        className={`w-full min-h-[1.5rem] bg-transparent focus:bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-2 py-1 break-words transition-all ${className}`}
        dangerouslySetInnerHTML={{ __html: html || placeholder }}
      />
    </div>
  );
};

const UnitViewer: React.FC = () => {
  const [db, setDb] = useState<Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', FullUnitData>>(INITIAL_DATABASE);
  const [currentUc, setCurrentUc] = useState<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma' | 'calendario'>('geral');

  const unit = db[currentUc];
  const theme = UC_THEMES[currentUc];

  const updateUnitField = (updater: (draft: FullUnitData) => void) => {
    setDb(prev => {
      const copy = { ...prev };
      const currentDraft = { ...copy[currentUc] };
      updater(currentDraft);
      copy[currentUc] = currentDraft;
      return copy;
    });
  };

  const getDayOfWeek = (dateStr: string) => {
    const cleanStr = dateStr.replace(/<[^>]*>/g, '').trim();
    const parts = cleanStr.split('/');
    if (parts.length !== 3) return '';
    const dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    if (isNaN(dateObj.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(dateObj);
  };

  const { allScheduledDates, monthsList } = useMemo(() => {
    const datesMap: Record<string, { uc: 'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'; task: string }> = {};
    const monthsSet = new Set<string>();

    (Object.keys(db) as Array<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI'>).forEach(ucKey => {
      db[ucKey].schedule.forEach(item => {
        const cleanDate = item.date.replace(/<[^>]*>/g, '').trim();
        const parts = cleanDate.split('/');
        if (parts.length === 3) {
          datesMap[cleanDate] = { uc: ucKey, task: item.capacities.replace(/<[^>]*>/g, '') };
          const monthKey = `${parts[2]}-${parts[1].padStart(2, '0')}`;
          monthsSet.add(monthKey);
        }
      });
    });

    if (monthsSet.size === 0) {
      const today = new Date();
      monthsSet.add(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`);
    }

    return { allScheduledDates: datesMap, monthsList: Array.from(monthsSet).sort() };
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

      {/* CABEÇALHO EDITÁVEL DA UNIDADE ATIVA */}
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

      {/* NAVEGAÇÃO DE ABAS */}
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
        
        {/* ABA: ESTRUTURA GERAL (EDITÁVEL) */}
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CAPACIDADES TÉCNICAS */}
            <div className="bg-white p-5 border border-slate-200 rounded-3xl shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Capacidades Técnicas</h3>
                <button
                  type="button"
                  onClick={() => updateUnitField(u => { u.general.technicalCapacities.push('Nova Capacidade Técnica'); })}
                  className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg font-bold"
                >
                  + Add
                </button>
              </div>
              {unit.general.technicalCapacities.map((cap, i) => (
                <div key={i} className="flex items-start gap-1 group/item">
                  <RichEditable
                    html={cap}
                    onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })}
                    className="text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => updateUnitField(u => { u.general.technicalCapacities.splice(i, 1); })}
                    className="opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-600 font-bold text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* CAPACIDADES SOCIOEMOCIONAIS */}
            <div className="bg-white p-5 border border-slate-200 rounded-3xl shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Socioemocionais</h3>
                <button
                  type="button"
                  onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.push('Nova Capacidade Socioemocional'); })}
                  className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg font-bold"
                >
                  + Add
                </button>
              </div>
              {unit.general.socioemotionalCapacities.map((cap, i) => (
                <div key={i} className="flex items-start gap-1 group/item">
                  <RichEditable
                    html={cap}
                    onChange={(val) => updateUnitField(u => { u.general.socioemotionalCapacities[i] = val; })}
                    className="text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); })}
                    className="opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-600 font-bold text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* CONHECIMENTOS */}
            <div className="bg-white p-5 border border-slate-200 rounded-3xl shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Conhecimentos</h3>
                <button
                  type="button"
                  onClick={() => updateUnitField(u => { u.general.knowledge.push('Novo Conhecimento'); })}
                  className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-lg font-bold"
                >
                  + Add
                </button>
              </div>
              {unit.general.knowledge.map((know, i) => (
                <div key={i} className="flex items-start gap-1 group/item">
                  <RichEditable
                    html={know}
                    onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })}
                    className="text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => updateUnitField(u => { u.general.knowledge.splice(i, 1); })}
                    className="opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-600 font-bold text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ABA: SITUAÇÕES DE APRENDIZAGEM (EDITÁVEL) */}
        {activeTab === 'sa' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => updateUnitField(u => {
                  u.learningSituations.push({
                    id: `sa-${Date.now()}`,
                    title: 'Nova Situação de Aprendizagem',
                    contextualization: 'Descrição do contexto...',
                    challenge: 'Desafio proposto...',
                    expectedResults: ['Resultado esperado 1']
                  });
                })}
                className="text-xs bg-white border border-slate-200 text-slate-700 hover:text-slate-900 px-4 py-1.5 rounded-xl font-bold shadow-sm"
              >
                + Nova Situação de Aprendizagem
              </button>
            </div>

            {unit.learningSituations.map((situation, idx) => (
              <div key={situation.id} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-4 relative group/sa">
                <button
                  type="button"
                  onClick={() => updateUnitField(u => { u.learningSituations.splice(idx, 1); })}
                  className="absolute top-4 right-4 text-xs text-red-400 hover:text-red-600 font-bold opacity-0 group-hover/sa:opacity-100 transition-opacity"
                >
                  Excluir SA ✕
                </button>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Título da SA</label>
                  <RichEditable
                    html={situation.title}
                    onChange={(val) => updateUnitField(u => { u.learningSituations[idx].title = val; })}
                    className="text-sm font-black text-slate-800 bg-slate-50 border border-slate-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Contextualização</label>
                  <RichEditable
                    html={situation.contextualization}
                    onChange={(val) => updateUnitField(u => { u.learningSituations[idx].contextualization = val; })}
                    className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Desafio</label>
                  <RichEditable
                    html={situation.challenge}
                    onChange={(val) => updateUnitField(u => { u.learningSituations[idx].challenge = val; })}
                    className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Resultados Esperados</label>
                    <button
                      type="button"
                      onClick={() => updateUnitField(u => { u.learningSituations[idx].expectedResults.push('Novo resultado'); })}
                      className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold"
                    >
                      + Add Resultado
                    </button>
                  </div>
                  {situation.expectedResults.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-1 my-1">
                      <RichEditable
                        html={res}
                        onChange={(val) => updateUnitField(u => { u.learningSituations[idx].expectedResults[rIdx] = val; })}
                        className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => updateUnitField(u => { u.learningSituations[idx].expectedResults.splice(rIdx, 1); })}
                        className="text-red-400 hover:text-red-600 font-bold text-xs p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABA: CRONOGRAMA (EDITÁVEL) */}
        {activeTab === 'cronograma' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => updateUnitField(u => {
                  u.schedule.push({
                    id: `entry-${Date.now()}`,
                    date: '10/01/2026',
                    hours: 4,
                    capacities: 'Nova Capacidade',
                    knowledge: 'Novo Conhecimento',
                    strategy: 'Estratégia Didática',
                    resources: 'Recursos',
                    completed: false
                  });
                })}
                className="text-xs bg-white border border-slate-200 text-slate-600 hover:text-slate-900 px-3 py-1 rounded-xl font-bold shadow-sm"
              >
                + Adicionar Aula
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-wider">
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

                      <td className="p-3 text-center align-top">
                        <input
                          type="number"
                          value={entry.hours}
                          onChange={(e) => updateUnitField(u => { u.schedule[sIdx].hours = parseInt(e.target.value) || 0; })}
                          className="w-10 bg-transparent font-bold text-slate-800 text-center focus:outline-none"
                        />
                      </td>

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

                      <td className="p-3 text-center align-top relative">
                        <button
                          type="button"
                          onClick={() => updateUnitField(u => { u.schedule[sIdx].completed = !u.schedule[sIdx].completed; })}
                          className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer shadow-sm ${
                            entry.completed
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {entry.completed ? 'OK' : 'PREV'}
                        </button>
                        <button
                          type="button"
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

        {/* ABA: CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <div className="space-y-8">
            <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-blue-500" /> LIDT</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-emerald-500" /> CDMAT</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-purple-500" /> CRD</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-orange-500" /> FUSI</span>
            </div>

            {monthsList.map(monthKey => {
              const [yearStr, monthStr] = monthKey.split('-');
              const year = parseInt(yearStr);
              const month = parseInt(monthStr) - 1;

              const firstDayIndex = new Date(year, month, 1).getDay();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(year, month));

              return (
                <div key={monthKey} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
                  <div className="mb-4 text-center border-b border-slate-100 pb-3">
                    <h2 className="text-base font-black text-slate-800 uppercase tracking-widest">
                      {monthName} / {year}
                    </h2>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
                      <div key={d} className="font-black text-slate-400 p-2 uppercase text-[10px] tracking-wider">{d}</div>
                    ))}

                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-3 rounded-xl bg-slate-50/20 opacity-0" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const formattedDate = `${String(dayNum).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
                      const matchedDate = allScheduledDates[formattedDate];

                      let dayStyle = "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100";
                      if (matchedDate) {
                        const ucTheme = UC_THEMES[matchedDate.uc];
                        dayStyle = `${ucTheme.bg} ${ucTheme.text} border-2 ${ucTheme.border} font-black shadow-sm`;
                      }

                      return (
                        <div key={dayNum} className={`p-3 rounded-xl transition-all relative group/day ${dayStyle}`}>
                          <span className="text-xs font-bold">{dayNum}</span>
                          {matchedDate && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[9px] p-2 rounded-xl shadow-2xl hidden group-hover/day:block w-36 z-50 text-center font-normal">
                              <span className="block font-black border-b border-white/20 pb-0.5 mb-1 text-slate-200">{matchedDate.uc}</span>
                              {matchedDate.task}
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
        )}

      </div>
    </div>
  );
};

export default UnitViewer;
