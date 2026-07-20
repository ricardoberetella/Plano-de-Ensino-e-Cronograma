import React, { useState, useMemo } from 'react';

// Definição dos tipos para garantir consistência dos dados pedagógicos do SENAI
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

interface UnitMeta {
  color: string;
  sigla: string;
}

interface LocalUnit {
  name: string;
  semester: number;
  learningSituations: LearningSituation[];
  rubrics: Rubric[];
  schedule: ScheduleEntry[];
}

interface UnitViewerProps {
  unitMeta?: UnitMeta;
  initialUnit?: LocalUnit;
}

// Mapas de cores baseados na identidade visual do painel
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

const UnitViewer: React.FC<UnitViewerProps> = ({
  unitMeta = { color: 'blue', sigla: 'UC' },
  initialUnit
}) => {
  // Estado inicial estruturado para evitar quebras de renderização
  const [localUnit, setLocalUnit] = useState<LocalUnit>(() => initialUnit || {
    name: 'Unidade Curricular Padrão',
    semester: 1,
    learningSituations: [
      {
        id: 'sa-1',
        title: 'Situação de Aprendizagem 1',
        contextualization: '',
        challenge: '',
        expectedResults: ['']
      }
    ],
    rubrics: [],
    schedule: []
  });

  const [activeTab, setActiveTab] = useState<'sa' | 'rubricas' | 'cronograma' | 'calendario'>('sa');
  const [dateError, setDateError] = useState<string | null>(null);
  
  // Limites padrão para o ano letivo corrente (2026)
  const dateRange = { min: '2026-01-01', max: '2026-12-31' };
  const calendarYear = 2026;

  // Funções utilitárias de tratamento de datas
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

  // Mapeamento das datas do cronograma para otimizar a renderização do calendário
  const scheduleDates = useMemo(() => {
    const map: Record<string, ScheduleEntry[]> = {};
    localUnit.schedule.forEach(entry => {
      const iso = toIsoDate(entry.date);
      if (iso) {
        if (!map[iso]) map[iso] = [];
        map[iso].push(entry);
      }
    });
    return map;
  }, [localUnit.schedule]);

  // Lista de meses contidos no intervalo letivo para montagem do grid
  const monthsInRange = useMemo(() => {
    return ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12'];
  }, []);

  // Manipuladores de Estado: Situações de Aprendizagem
  const updateSituation = (id: string, field: keyof LearningSituation, value: any) => {
    setLocalUnit(prev => ({
      ...prev,
      learningSituations: prev.learningSituations.map(sa => 
        sa.id === id ? { ...sa, [field]: value } : sa
      )
    }));
  };

  const updateExpectedResult = (situationId: string, resultIndex: number, value: string) => {
    setLocalUnit(prev => ({
      ...prev,
      learningSituations: prev.learningSituations.map(sa => {
        if (sa.id === situationId) {
          const newResults = [...sa.expectedResults];
          newResults[resultIndex] = value;
          return { ...sa, expectedResults: newResults };
        }
        return sa;
      })
    }));
  };

  const addExpectedResult = (situationId: string) => {
    setLocalUnit(prev => ({
      ...prev,
      learningSituations: prev.learningSituations.map(sa => 
        sa.id === situationId ? { ...sa, expectedResults: [...sa.expectedResults, ''] } : sa
      )
    }));
  };

  const removeExpectedResult = (situation: LearningSituation, resultIndex: number) => {
    const newResults = situation.expectedResults.filter((_, i) => i !== resultIndex);
    updateSituation(situation.id, 'expectedResults', newResults.length > 0 ? newResults : ['']);
  };

  // Manipuladores de Estado: Rubricas (Matriz de Avaliação)
  const addRubric = () => {
    const newRubric: Rubric = {
      id: `rubric-${Date.now()}`,
      capacity: '',
      levels: { nsa: '', apo: '', par: '', aut: '' }
    };
    setLocalUnit(prev => ({ ...prev, rubrics: [...prev.rubrics, newRubric] }));
  };

  const updateRubric = (id: string, key: string, value: string) => {
    setLocalUnit(prev => ({
      ...prev,
      rubrics: prev.rubrics.map(rub => {
        if (rub.id !== id) return rub;
        if (['nsa', 'apo', 'par', 'aut'].includes(key)) {
          return { ...rub, levels: { ...rub.levels, [key]: value } };
        }
        return { ...rub, [key]: value };
      })
    }));
  };

  const removeRubric = (id: string) => {
    setLocalUnit(prev => ({ ...prev, rubrics: prev.rubrics.filter(rub => rub.id !== id) }));
  };

  // Manipuladores de Estado: Cronograma
  const addScheduleEntry = () => {
    const newEntry: ScheduleEntry = {
      id: `entry-${Date.now()}`,
      date: '',
      hours: 4,
      capacities: '',
      knowledge: '',
      strategy: '',
      resources: '',
      completed: false
    };
    setLocalUnit(prev => ({ ...prev, schedule: [...prev.schedule, newEntry] }));
  };

  const updateEntry = (id: string, field: keyof ScheduleEntry, value: any) => {
    setLocalUnit(prev => ({
      ...prev,
      schedule: prev.schedule.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const updateScheduleDate = (id: string, isoDate: string) => {
    if (!isoDate) {
      updateEntry(id, 'date', '');
      return;
    }
    const [year, month, day] = isoDate.split('-');
    updateEntry(id, 'date', `${day}/${month}/${year}`);
  };

  const removeScheduleEntry = (id: string) => {
    setLocalUnit(prev => ({ ...prev, schedule: prev.schedule.filter(e => e.id !== id) }));
  };

  const handleResetToTemplate = () => {
    setLocalUnit(prev => ({ ...prev, schedule: [] }));
    setDateError(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6">
      {/* NAVEGAÇÃO INTERNA ENTRE ABAS */}
      <div className="flex border-b border-slate-200 mb-6 no-print gap-2">
        {(['sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
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
            {tab === 'sa' ? 'Situações de Aprendizagem' : tab}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="tab-content">
        {activeTab === 'sa' && (
          <div className="space-y-6">
            <div className="no-print space-y-6">
              {localUnit.learningSituations.map((situation, idx) => (
                <div key={situation.id || idx} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase">
                    Configuração da Situação de Aprendizagem {idx + 1}
                  </h3>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Título da SA</label>
                    <input
                      type="text"
                      value={situation.title}
                      onChange={e => updateSituation(situation.id, 'title', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Contextualização</label>
                    <textarea
                      value={situation.contextualization}
                      onChange={e => updateSituation(situation.id, 'contextualization', e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Desafio Proposto</label>
                    <textarea
                      value={situation.challenge}
                      onChange={e => updateSituation(situation.id, 'challenge', e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] font-black text-slate-400 uppercase">Resultados Esperados</label>
                      <button
                        type="button"
                        onClick={() => addExpectedResult(situation.id)}
                        className="text-blue-600 hover:underline text-xs font-bold"
                      >
                        + Adicionar Resultado
                      </button>
                    </div>
                    <div className="space-y-2">
                      {situation.expectedResults.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex gap-2">
                          <textarea
                            value={result}
                            onChange={e => updateExpectedResult(situation.id, resultIndex, e.target.value)}
                            rows={2}
                            className="flex-1 rounded-xl border border-slate-200 p-2 text-xs"
                            placeholder="Descreva o resultado esperado..."
                          />
                          <button
                            type="button"
                            onClick={() => removeExpectedResult(situation, resultIndex)}
                            className="bg-red-50 text-red-600 px-3 py-3 rounded-xl text-[8px] font-black uppercase"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DOCUMENTO IMPRESSO: SITUAÇÃO DE APRENDIZAGEM */}
            <div className="hidden report-document-sa">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>{localUnit.name}</h1>
                  <p>SITUAÇÃO DE APRENDIZAGEM — {localUnit.semester}º SEMESTRE</p>
                </div>
              </div>
              <h2 className="doc-main-title">Planejamento da Situação de Aprendizagem</h2>
              {localUnit.learningSituations.map((situation, idx) => (
                <div key={situation.id || idx} className="sa-print-block">
                  <h3 className="sa-print-title">
                    {idx + 1}. {situation.title}
                  </h3>
                  <div className="sa-print-section">
                    <h4 className="sa-print-section-title">Contextualização</h4>
                    <p className="sa-print-text">{situation.contextualization}</p>
                  </div>
                  <div className="sa-print-section">
                    <h4 className="sa-print-section-title">Desafio Proposto</h4>
                    <p className="sa-print-text">{situation.challenge}</p>
                  </div>
                  <div className="sa-print-section">
                    <h4 className="sa-print-section-title">Resultados Esperados</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {situation.expectedResults.map((result, rIdx) => (
                        <li key={rIdx} className="sa-print-text">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rubricas' && (
          <div className="space-y-6 no-print">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Matriz de Avaliação (Rubricas)
              </h3>
              <button
                type="button"
                onClick={addRubric}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase"
              >
                Adicionar rubrica
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">
                      Capacidade / Indicador
                    </th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">
                      NSA (Não Satisfatório)
                    </th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">
                      APO (Apoiado)
                    </th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">
                      PAR (Parcial)
                    </th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-1/5">
                      AUT (Autônomo)
                    </th>
                    <th className="p-4 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {localUnit.rubrics.map(rubric => (
                    <tr key={rubric.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3">
                        <textarea
                          value={rubric.capacity}
                          onChange={e => updateRubric(rubric.id, 'capacity', e.target.value)}
                          placeholder="Descreva a capacidade..."
                          className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </td>
                      {(['nsa', 'apo', 'par', 'aut'] as const).map(level => (
                        <td key={level} className="p-3">
                          <textarea
                            value={rubric.levels[level] || ''}
                            onChange={e => updateRubric(rubric.id, level, e.target.value)}
                            placeholder={`Critério para ${level.toUpperCase()}...`}
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </td>
                      ))}
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeRubric(rubric.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors"
                          title="Excluir Rubrica"
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

        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 no-print">
              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Plano de Aula Semanal
                </h3>
                {dateError && <p className="text-red-500 text-xs mt-1 font-bold">{dateError}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleResetToTemplate}
                  className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider"
                >
                  Restaurar Modelo
                </button>
                <button
                  type="button"
                  onClick={addScheduleEntry}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider"
                >
                  Adicionar Aula
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider"
                >
                  Imprimir Plano
                </button>
              </div>
            </div>

            {/* TABELA DE VISUALIZAÇÃO/EDIÇÃO EM TELA */}
            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm no-print">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 whitespace-nowrap">
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-32">Data</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-20">Horas</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Conteúdo / Capacidades</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Estratégias / Recursos</th>
                    <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-wider w-20 text-center">Status</th>
                    <th className="p-4 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {localUnit.schedule.map((entry) => {
                    const isoDate = toIsoDate(entry.date);
                    const dayOfWeek = getDayOfWeek(entry.date);
                    return (
                      <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3">
                          <input
                            type="date"
                            value={isoDate}
                            min={dateRange.min}
                            max={dateRange.max}
                            onChange={e => updateScheduleDate(entry.id, e.target.value)}
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-bold"
                          />
                          {dayOfWeek && (
                            <span className="text-[9px] text-slate-400 block mt-1 uppercase font-black tracking-tighter">
                              {dayOfWeek}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={entry.hours}
                            onChange={e => updateEntry(entry.id, 'hours', Number(e.target.value))}
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-bold text-center"
                            min={0}
                          />
                        </td>
                        <td className="p-3 space-y-2">
                          <input
                            type="text"
                            value={entry.capacities || ''}
                            onChange={e => updateEntry(entry.id, 'capacities', e.target.value)}
                            placeholder="Capacidades trabalhadas..."
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                          />
                          <textarea
                            value={entry.knowledge || ''}
                            onChange={e => updateEntry(entry.id, 'knowledge', e.target.value)}
                            placeholder="Detalhamento dos saberes..."
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                            rows={2}
                          />
                        </td>
                        <td className="p-3 space-y-2">
                          <input
                            type="text"
                            value={entry.strategy || ''}
                            onChange={e => updateEntry(entry.id, 'strategy', e.target.value)}
                            placeholder="Estratégia didática (ex: SMO)"
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                          />
                          <input
                            type="text"
                            value={entry.resources || ''}
                            onChange={e => updateEntry(entry.id, 'resources', e.target.value)}
                            placeholder="Recursos necessários"
                            className="w-full rounded-xl border border-slate-200 p-2 text-xs"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={entry.completed}
                            onChange={e => updateEntry(entry.id, 'completed', e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeScheduleEntry(entry.id)}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* DOCUMENTO IMPRESSO: CRONOGRAMA OFICIAL */}
            <div className="hidden report-document">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>{localUnit.name}</h1>
                  <p>CRONOGRAMA DE EXECUÇÃO DA UNIDADE CURRICULAR</p>
                </div>
              </div>
              <h2 className="doc-main-title">Plano de Aulas e Distribuição de Carga Horária</h2>
              <table className="tech-table">
                <thead>
                  <tr>
                    <th style={{ width: '12%' }}>Data / Dia</th>
                    <th style={{ width: '8%', textAlign: 'center' }}>H.A.</th>
                    <th style={{ width: '40%' }}>Capacidades & Saberes Previstos</th>
                    <th style={{ width: '40%' }}>Metodologia & Recursos Didáticos</th>
                  </tr>
                </thead>
                <tbody>
                  {localUnit.schedule.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td>
                        <strong>{entry.date || 'A definir'}</strong>
                        <span className="block text-[6.5px] text-slate-500 uppercase mt-0.5">
                          {getDayOfWeek(entry.date)}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}><strong>{entry.hours}h</strong></td>
                      <td>
                        <div className="mb-2 font-medium">{entry.capacities || '—'}</div>
                        <div className="text-slate-600 italic whitespace-pre-line">{entry.knowledge || '—'}</div>
                      </td>
                      <td>
                        <div className="mb-2 font-medium">{entry.strategy || '—'}</div>
                        <div className="text-slate-600">{entry.resources || '—'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="space-y-8 no-print animate-fadeIn">
            <div>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Distribuição Mensal no Calendário
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Exibição das aulas programadas para o ano letivo de <strong>{calendarYear}</strong>.
              </p>
            </div>

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
                            className={`rounded-xl border p-1 flex flex-col justify-between transition-all relative ${
                              entries.length > 0
                                ? 'border-blue-200 bg-blue-50/40 shadow-sm'
                                : 'border-slate-100 bg-white hover:border-slate-300'
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
                                    title={`${unitMeta.sigla}: ${e.hours}h\n${e.capacities}`}
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

interface EditableListProps {
  title: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const EditableList: React.FC<EditableListProps> = ({ title, values, onChange, onAdd, onRemove }) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{title}</h3>
      <button
        type="button"
        onClick={onAdd}
        className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase transition-colors"
      >
        Adicionar item
      </button>
    </div>
    <div className="space-y-3">
      {values.map((value, index) => (
        <div key={index} className="flex items-start gap-3 bg-white p-2 border border-slate-200 rounded-2xl shadow-sm">
          <textarea
            value={value}
            onChange={e => onChange(index, e.target.value)}
            rows={2}
            className="flex-1 border-0 bg-transparent resize-none text-sm p-1 focus:ring-0 text-slate-800"
            placeholder="Descreva o item..."
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-slate-400 hover:text-red-600 text-xs px-2 py-1 align-middle transition-colors mt-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default UnitViewer;
