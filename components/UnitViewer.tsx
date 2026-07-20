import React, { useState, useMemo } from 'react';

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
  // Dados injetados diretamente (Read-Only)
  const unit = initialUnit || {
    name: 'Unidade Curricular',
    semester: 1,
    learningSituations: [],
    rubrics: [],
    schedule: []
  };

  const [activeTab, setActiveTab] = useState<'sa' | 'rubricas' | 'cronograma' | 'calendario'>('sa');
  const calendarYear = 2026;

  // Funções Utilitárias de Data
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6">
      {/* NAVEGAÇÃO INTERNA */}
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
        
        {/* ABA: SITUAÇÃO DE APRENDIZAGEM */}
        {activeTab === 'sa' && (
          <div className="space-y-6">
            <div className="no-print space-y-6">
              {unit.learningSituations.map((situation, idx) => (
                <div key={situation.id || idx} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-2">
                    {idx + 1}. {situation.title || 'Situação de Aprendizagem'}
                  </h3>
                  
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Contextualização</span>
                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl whitespace-pre-line border border-slate-100">
                      {situation.contextualization || 'Nenhuma contextualização informada.'}
                    </p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Desafio Proposto</span>
                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl whitespace-pre-line border border-slate-100">
                      {situation.challenge || 'Nenhum desafio informado.'}
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
              ))}
            </div>

            {/* DOCUMENTO IMPRESSO SA */}
            <div className="hidden report-document-sa">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>{unit.name}</h1>
                  <p>SITUAÇÃO DE APRENDIZAGEM — {unit.semester}º SEMESTRE</p>
                </div>
              </div>
              <h2 className="doc-main-title">Planejamento da Situação de Aprendizagem</h2>
              {unit.learningSituations.map((situation, idx) => (
                <div key={situation.id || idx} className="sa-print-block">
                  <h3 className="sa-print-title">{idx + 1}. {situation.title}</h3>
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
                        <li key={rIdx} className="sa-print-text">{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA: RUBRICAS */}
        {activeTab === 'rubricas' && (
          <div className="space-y-6 no-print">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
              Matriz de Avaliação (Rubricas)
            </h3>
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
                  {unit.rubrics.map(rubric => (
                    <tr key={rubric.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold bg-slate-50/30">{rubric.capacity}</td>
                      <td className="p-4 whitespace-pre-line">{rubric.levels.nsa || '—'}</td>
                      <td className="p-4 whitespace-pre-line">{rubric.levels.apo || '—'}</td>
                      <td className="p-4 whitespace-pre-line">{rubric.levels.par || '—'}</td>
                      <td className="p-4 whitespace-pre-line">{rubric.levels.aut || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA: CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4 no-print">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Plano de Aula Semanal
              </h3>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors"
              >
                Imprimir Plano
              </button>
            </div>

            {/* TABELA DE TELA (NÃO EDITÁVEL) */}
            <div className="overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm no-print">
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
                  {unit.schedule.map((entry) => (
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* DOCUMENTO IMPRESSO CRONOGRAMA */}
            <div className="hidden report-document">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>{unit.name}</h1>
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
                  {unit.schedule.map((entry, index) => (
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

        {/* ABA: CALENDÁRIO MENSAL */}
        {activeTab === 'calendario' && (
          <div className="space-y-8 no-print animate-fadeIn">
            <div>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Distribuição Mensal no Calendário
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Visualização estática das aulas alocadas para o ano de <strong>{calendarYear}</strong>.
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

export default UnitViewer;
