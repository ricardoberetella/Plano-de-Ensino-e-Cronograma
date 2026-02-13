
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

const TEXT_COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#0f172a', green: '#ffffff', blue: '#ffffff', red: '#ffffff', cyan: '#ffffff', orange: '#ffffff', purple: '#ffffff', pink: '#ffffff', white: '#1e293b', none: 'inherit'
};

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);

  const isCRD = unit.id.toLowerCase().includes('crd') || unit.name.toLowerCase().includes('dimensional');
  const isFUSI = unit.id.toLowerCase().includes('fusi') || unit.name.toLowerCase().includes('usinagem');
  const scheduleColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');

  const calendar = useMemo(() => unit.calendar || {
    startDate: '2026-01-26',
    endDate: '2026-06-24',
    markings: []
  }, [unit.calendar]);

  useEffect(() => { setLocalSchedule(unit.schedule); }, [unit.schedule]);

  const totalHoursSum = useMemo(() => {
    return localSchedule.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0);
  }, [localSchedule]);

  const formatDateForCalendar = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return null;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    const simpleMatch = dateStr.match(/\d{2}\/\d{2}\/\d{4}/);
    if (simpleMatch) {
      const [d, m, y] = simpleMatch[0].split('/');
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    return null;
  };

  const scheduleDates = useMemo(() => {
    const dates: Record<string, boolean> = {};
    localSchedule.forEach(s => {
      const formatted = formatDateForCalendar(s.date);
      if (formatted) dates[formatted] = true;
    });
    return dates;
  }, [localSchedule]);

  const updateEntry = (id: string, field: keyof ScheduleEntry, value: any) => {
    const updated = localSchedule.map(entry => entry.id === id ? { ...entry, [field]: value } : entry);
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const monthsInRange = useMemo(() => {
    const start = new Date(calendar.startDate + 'T00:00:00');
    const end = new Date(calendar.endDate + 'T00:00:00');
    const months: string[] = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      months.push(current.toISOString().substring(0, 7));
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  }, [calendar.startDate, calendar.endDate]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
        <div>
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{unit.name}</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide">
        {(['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-400 hover:bg-slate-100'}`}
          >
            {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situação-Problema' : tab === 'rubricas' ? 'Rubricas' : tab === 'cronograma' ? 'Plano de Aula' : 'Calendário'}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FDFDFD]">
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

                {sa.expectedResults && (
                  <div className="space-y-8 px-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2 italic">Resultados esperados</h4>
                      <p className="text-slate-500 font-bold text-sm">{sa.expectedResults[0]}</p>
                    </div>
                    
                    <div className="space-y-4">
                      {sa.expectedResults.slice(1).map((res, idx) => {
                        const letterMatch = res.match(/^[a-z]\)/i);
                        const letter = letterMatch ? letterMatch[0].toUpperCase().replace(')', '') : String.fromCharCode(65 + idx);
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
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic leading-none">Plano de Aula</h3>
                <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] mt-2 italic">Plano de Aula Cronograma</p>
              </div>
              <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex flex-col items-center md:items-end shadow-xl border border-slate-800">
                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Carga Horária Lançada</span>
                <span className="text-2xl font-[1000] italic leading-none">{totalHoursSum} HORAS</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {localSchedule.map((entry, idx) => (
                <div key={entry.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-3 xl:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start min-w-0">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">AULA {idx+1}</p>
                      <input 
                        type="text" 
                        value={entry.date} 
                        onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                        className="text-blue-600 font-[1000] text-lg md:text-xl leading-none mb-3 w-full bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-100 rounded text-center lg:text-left whitespace-nowrap overflow-visible"
                        placeholder="Data"
                      />
                      <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase whitespace-nowrap">{entry.hours} HORAS</span>
                    </div>
                    <div className="lg:col-span-9 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-blue-500 pl-2">Capacidades</h5>
                          <textarea 
                            rows={4} 
                            value={entry.capacities} 
                            onChange={(e) => updateEntry(entry.id, 'capacities', e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-slate-700 text-xs font-bold leading-relaxed resize-none whitespace-pre-line"
                          />
                        </div>
                        <div>
                          <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-red-500 pl-2">Conhecimentos</h5>
                          <textarea 
                            rows={4} 
                            value={entry.knowledge} 
                            onChange={(e) => updateEntry(entry.id, 'knowledge', e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-slate-800 text-[11px] font-black uppercase leading-tight resize-none whitespace-pre-line"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-orange-500 pl-2">Estratégias Docentes</h5>
                          <textarea 
                            rows={4} 
                            value={entry.strategy} 
                            onChange={(e) => updateEntry(entry.id, 'strategy', e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-slate-600 text-xs font-medium leading-relaxed resize-none whitespace-pre-line"
                          />
                        </div>
                        <div>
                          <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 border-l-2 border-green-500 pl-2">Recursos / Ambientes</h5>
                          <textarea 
                            rows={3} 
                            value={entry.resources} 
                            onChange={(e) => updateEntry(entry.id, 'resources', e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-slate-500 text-[10px] font-bold italic leading-snug resize-none whitespace-pre-line"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monthsInRange.map(monthStr => {
              const [year, month] = monthStr.split('-').map(Number);
              const firstDay = new Date(year, month - 1, 1);
              const lastDay = new Date(year, month, 0);
              const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long' });
              const days = [];
              for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
              for (let i = 1; i <= lastDay.getDate(); i++) {
                const d = i < 10 ? `0${i}` : i;
                days.push(`${monthStr}-${d}`);
              }
              return (
                <div key={monthStr} className="space-y-4">
                  <div className="bg-slate-900 text-white py-2 px-5 rounded-2xl text-center shadow-md">
                    <h4 className="text-[10px] font-black uppercase tracking-widest italic">{monthName} {year}</h4>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-7 text-center bg-slate-50 border-b border-slate-100">
                      {['D','S','T','Q','Q','S','S'].map((d, i) => (
                        <div key={i} className={`py-3 text-[8px] font-black ${i === 0 ? 'text-red-500' : 'text-slate-400'}`}>{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7">
                      {days.map((day, idx) => {
                        if (!day) return <div key={`e-${idx}`} className="p-1 border-b border-r border-slate-50"></div>;
                        const hasClass = scheduleDates[day];
                        const isSunday = idx % 7 === 0;
                        return (
                          <div
                            key={day}
                            className={`p-2 h-12 md:h-14 flex items-center justify-center text-[10px] font-black border-b border-r border-slate-50`}
                            style={{ 
                              backgroundColor: hasClass ? COLOR_MAP[scheduleColor] : 'transparent',
                              color: hasClass ? TEXT_COLOR_MAP[scheduleColor] : (isSunday ? '#ef4444' : '#1e293b')
                            }}
                          >
                            {day.split('-')[2]}
                          </div>
                        );
                      })}
                    </div>
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
