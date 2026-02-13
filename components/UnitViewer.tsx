
import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from '../types';
import { SAMPLE_PLANS } from '../constants';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void;
  onUpdateUnit?: (updatedUnit: CurricularUnit) => void;
}

const COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#fbbf24', green: '#22c55e', blue: '#3b82f6', red: '#ef4444', cyan: '#06b6d4', orange: '#f97316', purple: '#a855f7', pink: '#ec4899', white: '#ffffff', none: 'transparent'
};

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { setLocalSchedule(unit.schedule); }, [unit.schedule]);

  const handleRestoreDefaults = () => {
    if (!confirm("Restaurar conteúdo padrão?")) return;
    const template = SAMPLE_PLANS[0].units.find(u => u.name === unit.name);
    if (template) {
      onUpdateUnit?.({ ...template, id: unit.id });
      window.location.reload();
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
        <div>
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{unit.name}</h2>
        </div>
        <button onClick={handleRestoreDefaults} className="text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-900/50 px-4 py-2 rounded-xl hover:bg-red-900/20">Restaurar Padrão</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide">
        {(['geral', 'sa', 'rubricas', 'cronograma'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-400 hover:bg-slate-100'}`}
          >
            {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situação-Problema' : tab === 'rubricas' ? 'Rubricas' : 'Plano de Aula'}
          </button>
        ))}
      </div>

      <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FDFDFD]">
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section>
              <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Capacidades Técnicas</h3>
              <div className="space-y-3">
                {unit.basicCapacities.map((c, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-bold text-sm text-slate-700 flex gap-4">
                    <span className="text-blue-500 font-black">{i+1}.</span>{c}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Conhecimentos</h3>
              <div className="space-y-4">
                {unit.knowledge.map((k, i) => (
                  <div key={i} className="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl">
                    <p className="font-black text-slate-900 text-xs uppercase mb-2">{k.topic}</p>
                    {k.subtopics.map((s, si) => <p key={si} className="text-slate-500 text-[10px] font-medium">• {s}</p>)}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto space-y-16">
            {unit.learningSituations.map((sa) => (
              <div key={sa.id} className="animate-fadeIn">
                <div className="mb-8 p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-tight">{sa.title}</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contextualização</p>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{sa.context}</p>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">Desafio Proposto</p>
                      <p className="text-slate-300 text-sm italic font-medium">"{sa.challenge}"</p>
                    </div>
                  </div>
                </div>

                {/* QUADRO DE RESULTADOS ESPERADOS - SEGUINDO PRINT FIELMENTE */}
                {sa.expectedResults && (
                  <div className="space-y-8 px-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">Resultados esperados</h4>
                      <p className="text-slate-500 font-bold text-sm">{sa.expectedResults[0]}</p>
                    </div>
                    
                    <div className="space-y-4">
                      {sa.expectedResults.slice(1).map((res, idx) => {
                        const letter = res.match(/^[a-z]\)/i)?.[0].toUpperCase().replace(')', '') || String.fromCharCode(65 + idx);
                        const text = res.replace(/^[a-z]\)\s*/i, '');
                        return (
                          <div key={idx} className="bg-slate-50/50 border border-slate-100 p-6 rounded-[1.5rem] flex items-center gap-6 hover:bg-white hover:shadow-lg transition-all group">
                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors">
                              <span className="text-xs font-black text-slate-900 group-hover:text-blue-600">{letter}</span>
                            </div>
                            <p className="text-slate-800 font-black text-sm tracking-tight leading-snug">
                              {text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="h-px bg-slate-100 my-16"></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rubricas' && (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-2">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800">Referência</th>
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800 text-red-400">NSA</th>
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800 text-orange-400">APO</th>
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800 text-blue-400">PAR</th>
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800 text-green-400">AUT</th>
                </tr>
              </thead>
              <tbody className="text-[11px] font-bold">
                {unit.rubrics.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 border border-slate-100 text-slate-900 bg-slate-50/50 w-64">{row.capacity}</td>
                    <td className="p-6 border border-slate-100 text-slate-500 italic">{row.nsa}</td>
                    <td className="p-6 border border-slate-100 text-slate-500 italic">{row.apo}</td>
                    <td className="p-6 border border-slate-100 text-slate-500 italic">{row.par}</td>
                    <td className="p-6 border border-slate-100 text-slate-500 italic">{row.aut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'cronograma' && (
          <div className="space-y-4">
            {localSchedule.map((entry, idx) => (
              <div key={entry.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-10 items-center">
                <div className="text-center w-24 shrink-0">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">AULA {idx+1}</p>
                  <p className="text-blue-600 font-black text-lg leading-none">{entry.date}</p>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-black text-slate-800 text-sm uppercase">{entry.knowledge}</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{entry.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitViewer;
