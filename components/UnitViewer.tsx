import React, { useState, useMemo, useRef } from 'react';

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

const INITIAL_DATABASE: Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', FullUnitData> = {
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
        expectedResults: ['<span>Desenho técnico corrigido com aplicação estrita da norma de tolerância geométrica ISO.</span>', '<span>Relatório descritivo apontando os desvios encontrados na peça piloto.</span>']
      }
    ],
    rubrics: [],
    schedule: []
  },
  CDMAT: { name: 'Ciência e Tecnologia dos Materiais', semester: 1, general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] }, learningSituations: [], rubrics: [], schedule: [] },
  CRD: { name: 'Controle Dimensional', semester: 1, general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] }, learningSituations: [], rubrics: [], schedule: [] },
  FUSI: { name: 'Fundamentos da Usinagem', semester: 1, general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] }, learningSituations: [], rubrics: [], schedule: [] }
};

// Componente de entrada rica nativa para evitar barras de rolagem e setas
const RichEditable: React.FC<{
  html: string;
  onChange: (newHtml: string) => void;
  className?: string;
  placeholder?: string;
}> = ({ html, onChange, className = '', placeholder = '' }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (cmd: string, value: string = '') => {
    document.execCommand(cmd, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="relative w-full group/rich">
      {/* Mini Barra de Formatação Discreta Flutuante ao focar no campo */}
      {showToolbar && (
        <div className="absolute -top-9 left-0 bg-slate-900 text-white flex items-center gap-1 p-1 rounded-xl shadow-xl z-50 no-print scale-90 origin-bottom-left border border-slate-800 animate-fadeIn">
          <button type="button" onClick={() => execCmd('bold')} className="p-1 px-2 hover:bg-slate-800 rounded font-bold text-xs">B</button>
          <button type="button" onClick={() => execCmd('fontSize', '4')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A+</button>
          <button type="button" onClick={() => execCmd('fontSize', '2')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A-</button>
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <button type="button" onClick={() => execCmd('foreColor', '#3b82f6')} className="w-4 h-4 rounded-full bg-blue-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#10b981')} className="w-4 h-4 rounded-full bg-emerald-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#ef4444')} className="w-4 h-4 rounded-full bg-red-500 border border-white/20 m-0.5" />
          <button type="button" onClick={() => execCmd('foreColor', '#1e293b')} className="w-4 h-4 rounded-full bg-slate-800 border border-white/20 m-0.5" />
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setShowToolbar(true)}
        onBlur={(e) => {
          // Pequeno timeout para permitir o clique nos botões da barra antes dela sumir
          setTimeout(() => setShowToolbar(false), 200);
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        onInput={() => {
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        className={`w-full min-h-[1.5rem] bg-transparent focus:outline-none focus:bg-white/80 rounded-xl transition-all break-words ${className}`}
        dangerouslySetInnerHTML={{ __html: html || `Colorir / Formatar Texto...` }}
      />
    </div>
  );
};

const UnitViewer: React.FC<UnitViewerProps> = ({ selectedUcSigla = 'LIDT' }) => {
  const [db, setDb] = useState<Record<'LIDT' | 'CDMAT' | 'CRD' | 'FUSI', FullUnitData>>(INITIAL_DATABASE);
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');

  const unit = db[selectedUcSigla] || db.LIDT;

  const updateUnitField = (updater: (draft: FullUnitData) => void) => {
    setDb(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      updater(copy[selectedUcSigla]);
      return copy;
    });
  };

  const getDayOfWeek = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    let iso = dateStr;
    if (parts.length === 3) iso = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const dateObj = new Date(iso + 'T00:00:00');
    if (isNaN(dateObj.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(dateObj);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 select-text">
      
      {/* CABEÇALHO DA UNIDADE */}
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex-1 mr-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-0.5">Unidade Curricular Ativa</span>
          <RichEditable
            html={unit.name}
            onChange={(val) => updateUnitField(u => { u.name = val; })}
            className="text-lg font-black text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-400">Semestre:</span>
          <input
            type="number"
            value={unit.semester}
            onChange={(e) => updateUnitField(u => { u.semester = parseInt(e.target.value) || 1; })}
            className="w-12 bg-slate-100 text-slate-700 font-black text-xs px-2 py-1 rounded-xl text-center"
          />
        </div>
      </div>

      {/* ABAS */}
      <div className="flex border-b border-slate-200 mb-6 no-print gap-2">
        {(['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        
        {/* ABA: GERAL */}
        {activeTab === 'geral' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CAPACIDADES TÉCNICAS */}
              <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3 group/panel">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" /> Capacidades Técnicas
                  </h3>
                  <button
                    onClick={() => updateUnitField(u => { u.general.technicalCapacities.push('Nova capacidade técnica'); })}
                    className="opacity-0 group-hover/panel:opacity-100 text-[10px] bg-slate-50 text-slate-400 hover:text-blue-600 px-2 py-0.5 rounded-lg font-bold"
                  >
                    + Incluir
                  </button>
                </div>
                <div className="space-y-2">
                  {unit.general.technicalCapacities.map((cap, i) => (
                    <div key={i} className="group/item flex gap-2 items-start bg-slate-50/70 p-3 rounded-xl border border-slate-100 h-auto">
                      <RichEditable
                        html={cap}
                        onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })}
                        className="text-xs text-slate-700 font-medium"
                      />
                      <button
                        onClick={() => updateUnitField(u => { u.general.technicalCapacities.splice(i, 1); })}
                        className="opacity-0 group-hover/item:opacity-100 text-[9px] text-slate-300 hover:text-red-500 p-1 self-start"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CAPACIDADES SOCIOEMOCIONAIS */}
              <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3 group/panel">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" /> Capacidades Socioemocionais
                  </h3>
                  <button
                    onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.push('Nova capacidade socioemocional'); })}
                    className="opacity-0 group-hover/panel:opacity-100 text-[10px] bg-slate-50 text-slate-400 hover:text-emerald-600 px-2 py-0.5 rounded-lg font-bold"
                  >
                    + Incluir
                  </button>
                </div>
                <div className="space-y-2">
                  {unit.general.socioemotionalCapacities.map((cap, i) => (
                    <div key={i} className="group/item flex gap-2 items-start bg-slate-50/70 p-3 rounded-xl border border-slate-100 h-auto">
                      <RichEditable
                        html={cap}
                        onChange={(val) => updateUnitField(u => { u.general.socioemotionalCapacities[i] = val; })}
                        className="text-xs text-slate-700 font-medium"
                      />
                      <button
                        onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); })}
                        className="opacity-0 group-hover/item:opacity-100 text-[9px] text-slate-300 hover:text-red-500 p-1 self-start"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONHECIMENTOS */}
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-3 group/panel">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" /> Conhecimentos Teóricos
                </h3>
                <button
                  onClick={() => updateUnitField(u => { u.general.knowledge.push('Novo conhecimento'); })}
                  className="opacity-0 group-hover/panel:opacity-100 text-[10px] bg-slate-50 text-slate-400 hover:text-slate-700 px-2 py-0.5 rounded-lg font-bold"
                >
                  + Incluir
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unit.general.knowledge.map((know, i) => (
                  <div key={i} className="group/item bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2 h-auto">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-200/60 w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <RichEditable
                      html={know}
                      onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })}
                      className="text-xs font-medium text-slate-600"
                    />
                    <button
                      onClick={() => updateUnitField(u => { u.general.knowledge.splice(i, 1); })}
                      className="opacity-0 group-hover/item:opacity-100 text-[9px] text-slate-300 hover:text-red-500 p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA: SITUAÇÕES DE APRENDIZAGEM */}
        {activeTab === 'sa' && (
          <div className="space-y-6 group/panel">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => updateUnitField(u => {
                  u.learningSituations.push({
                    id: `sa-${Date.now()}`,
                    title: `Situação de Aprendizagem ${u.learningSituations.length + 1}`,
                    contextualization: '',
                    challenge: '',
                    expectedResults: ['Resultado esperado']
                  });
                })}
                className="opacity-0 group-hover/panel:opacity-100 text-xs bg-white border border-slate-200 text-slate-500 hover:text-blue-600 px-3 py-1 rounded-xl font-bold shadow-sm"
              >
                + Incluir Nova Situação de Aprendizagem
              </button>
            </div>

            {unit.learningSituations.map((situation, idx) => (
              <div key={situation.id || idx} className="group/sa bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-4 relative">
                <button
                  onClick={() => updateUnitField(u => { u.learningSituations.splice(idx, 1); })}
                  className="absolute top-4 right-4 opacity-0 group-hover/sa:opacity-100 text-xs text-slate-300 hover:text-red-500 font-bold"
                >
                  ✕ Excluir SA
                </button>

                <RichEditable
                  html={situation.title}
                  onChange={(val) => updateUnitField(u => { u.learningSituations[idx].title = val; })}
                  className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-1"
                />
                
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Contextualização</span>
                  <RichEditable
                    html={situation.contextualization}
                    onChange={(val) => updateUnitField(u => { u.learningSituations[idx].contextualization = val; })}
                    className="bg-slate-50 text-xs text-slate-700 p-3 rounded-xl border border-slate-100"
                  />
                </div>

                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Desafio Proposto</span>
                  <RichEditable
                    html={situation.challenge}
                    onChange={(val) => updateUnitField(u => { u.learningSituations[idx].challenge = val; })}
                    className="bg-slate-50 text-xs text-slate-700 p-3 rounded-xl border border-slate-100"
                  />
                </div>

                <div className="group/resList">
                  <div className="flex justify-between items-center mb-2">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Resultados Esperados</span>
                    <button
                      onClick={() => updateUnitField(u => { u.learningSituations[idx].expectedResults.push('Novo item'); })}
                      className="opacity-0 group-hover/resList:opacity-100 text-[9px] text-slate-400 hover:text-blue-500 font-bold"
                    >
                      + Adicionar Item
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {situation.expectedResults.map((result, rIdx) => (
                      <li key={rIdx} className="group/resItem flex gap-2 items-center bg-slate-50/60 border border-slate-100 px-3 py-2 rounded-xl h-auto">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <RichEditable
                          html={result}
                          onChange={(val) => updateUnitField(u => { u.learningSituations[idx].expectedResults[rIdx] = val; })}
                          className="text-xs text-slate-700 font-medium"
                        />
                        <button
                          onClick={() => updateUnitField(u => { u.learningSituations[idx].expectedResults.splice(rIdx, 1); })}
                          className="opacity-0 group-hover/resItem:opacity-100 text-[9px] text-slate-300 hover:text-red-500 px-1"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABA: CRONOGRAMA (PRINT 1 - MAIOR ESPAÇO PARA DATA E TUDO SEM SETAS DE ROLAGEM) */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6 group/panel">
            <div className="flex justify-end">
              <button
                onClick={() => updateUnitField(u => {
                  u.schedule.push({
                    id: `entry-${Date.now()}`,
                    date: '2026-02-05',
                    hours: 4,
                    capacities: 'Capacidade técnica',
                    knowledge: 'Tópico de conhecimento',
                    strategy: 'Estratégia didática',
                    resources: 'Recursos operacionais',
                    completed: false
                  });
                })}
                className="opacity-0 group-hover/panel:opacity-100 text-xs bg-white border border-slate-200 text-slate-500 hover:text-blue-600 px-3 py-1 rounded-xl font-bold shadow-sm"
              >
                + Adicionar Aula ao Cronograma
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    {/* MAIOR ESPAÇO PARA A DATA - Aumentado de w-36 para w-56 fixo para visualização perfeita */}
                    <th className="p-4 w-56">Data / Dia</th>
                    <th className="p-4 w-20 text-center">Horas</th>
                    <th className="p-4 w-5/12">Conteúdo / Capacidades</th>
                    <th className="p-4 w-5/12">Estratégias / Recursos</th>
                    <th className="p-4 w-24 text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {unit.schedule.map((entry, sIdx) => (
                    <tr key={entry.id} className="group/row hover:bg-slate-50/50 transition-colors">
                      
                      {/* COLUNA DATA EXPANDIDA E EDITÁVEL SEM SETAS */}
                      <td className="p-3 align-top">
                        <RichEditable
                          html={entry.date}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].date = val; })}
                          className="font-bold text-slate-800 text-xs"
                        />
                        <span className="block text-[9px] text-slate-400 uppercase font-black tracking-tighter mt-1">
                          {getDayOfWeek(entry.date.replace(/<[^>]*>/g, '')) || '—'}
                        </span>
                      </td>

                      {/* HORAS */}
                      <td className="p-3 text-center align-top">
                        <input
                          type="number"
                          value={entry.hours}
                          onChange={(e) => updateUnitField(u => { u.schedule[sIdx].hours = parseInt(e.target.value) || 0; })}
                          className="w-12 bg-transparent font-bold text-blue-600 text-center focus:outline-none"
                        />
                      </td>

                      {/* CAPACIDADES E CONHECIMENTOS DINÂMICOS */}
                      <td className="p-3 space-y-2 align-top h-auto">
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

                      {/* ESTRATÉGIAS E RECURSOS */}
                      <td className="p-3 space-y-2 align-top h-auto">
                        <RichEditable
                          html={entry.strategy}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].strategy = val; })}
                          className="text-slate-800 text-xs font-medium"
                        />
                        <RichEditable
                          html={entry.resources}
                          onChange={(val) => updateUnitField(u => { u.schedule[sIdx].resources = val; })}
                          className="text-slate-400 text-xs"
                        />
                      </td>

                      {/* CONTROLE DISCRETO EXCLUIR/SITUAÇÃO */}
                      <td className="p-3 text-center align-top relative">
                        <button
                          type="button"
                          onClick={() => updateUnitField(u => { u.schedule[sIdx].completed = !u.schedule[sIdx].completed; })}
                          className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                            entry.completed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {entry.completed ? 'Realizada' : 'Prevista'}
                        </button>
                        <button
                          onClick={() => updateUnitField(u => { u.schedule.splice(sIdx, 1); })}
                          className="absolute bottom-2 right-2 opacity-0 group-hover/row:opacity-100 text-[9px] text-red-300 hover:text-red-500 font-bold"
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

        {/* ABA: RUBRICAS */}
        {activeTab === 'rubricas' && (
          <div className="space-y-6 group/panel">
            <div className="flex justify-end">
              <button
                onClick={() => updateUnitField(u => {
                  u.rubrics.push({
                    id: `rubric-${Date.now()}`,
                    capacity: 'Nova Rubrica',
                    levels: { nsa: '', apo: '', par: '', aut: '' }
                  });
                })}
                className="opacity-0 group-hover/panel:opacity-100 text-xs bg-white border border-slate-200 text-slate-500 hover:text-blue-600 px-3 py-1 rounded-xl font-bold"
              >
                + Incluir Nova Linha de Rubrica
              </button>
            </div>
            
            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">Capacidade / Indicador</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">NSA</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">APO</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">PAR</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">AUT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {unit.rubrics.map((rubric, rIdx) => (
                    <tr key={rubric.id} className="group/row hover:bg-slate-50/50">
                      <td className="p-3 font-bold bg-slate-50/30 relative align-top h-auto">
                        <RichEditable
                          html={rubric.capacity}
                          onChange={(val) => updateUnitField(u => { u.rubrics[rIdx].capacity = val; })}
                          className="font-bold text-slate-800 text-xs"
                        />
                        <button
                          onClick={() => updateUnitField(u => { u.rubrics.splice(rIdx, 1); })}
                          className="absolute bottom-1 left-2 opacity-0 group-hover/row:opacity-100 text-[9px] text-red-400 font-bold"
                        >
                          Excluir
                        </button>
                      </td>
                      {(['nsa', 'apo', 'par', 'aut'] as const).map(lvl => (
                        <td key={lvl} className="p-3 align-top h-auto">
                          <RichEditable
                            html={rubric.levels[lvl]}
                            onChange={(val) => updateUnitField(u => { u.rubrics[rIdx].levels[lvl] = val; })}
                            className="text-slate-600 text-xs"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitViewer;
