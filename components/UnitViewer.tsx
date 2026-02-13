
import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from '../types';
import { LIDT_SCHEDULE, CRD_SCHEDULE, FUSI_SCHEDULE, SAMPLE_PLANS } from '../constants';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void;
  onUpdateUnit?: (updatedUnit: CurricularUnit) => void;
}

const COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#fbbf24',
  green: '#22c55e',
  blue: '#3b82f6',
  red: '#ef4444',
  cyan: '#06b6d4',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  white: '#ffffff',
  none: 'transparent'
};

const TEXT_COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#0f172a',
  green: '#ffffff',
  blue: '#ffffff',
  red: '#ffffff',
  cyan: '#ffffff',
  orange: '#ffffff',
  purple: '#ffffff',
  pink: '#ffffff',
  white: '#1e293b',
  none: 'inherit'
};

const SOLID_COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#fbbf24',
  green: '#22c55e',
  blue: '#3b82f6',
  red: '#ef4444',
  cyan: '#06b6d4',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  white: '#ffffff',
  none: 'transparent'
};

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);
  const [isSaving, setIsSaving] = useState(false);
  
  const isCRD = unit.id.toLowerCase().includes('crd');
  const isFUSI = unit.id.toLowerCase().includes('fusi');
  const scheduleColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');

  const defaultCalendar: UnitCalendar = {
    startDate: '2026-01-26',
    endDate: '2026-06-24',
    markings: [],
    colorLabels: { 
      green: 'Não letivo',
      blue: 'Aulas do Cronograma',
      pink: 'Aulas do Cronograma',
      orange: 'Aulas do Cronograma'
    }
  };

  const [calendar, setCalendar] = useState<UnitCalendar>(unit.calendar || defaultCalendar);
  const [selectedColor, setSelectedColor] = useState<CalendarColor>('green');

  useEffect(() => {
    setLocalSchedule(unit.schedule);
  }, [unit.schedule]);

  useEffect(() => {
    if (unit.calendar) {
      setCalendar(unit.calendar);
    }
  }, [unit.calendar]);

  const handleRestoreDefaults = async () => {
    if (!confirm("Isso irá resetar TODO o conteúdo desta unidade para o padrão SENAI 2026 (Capacidades, Conhecimentos e Cronograma). Deseja continuar?")) return;
    
    const template = SAMPLE_PLANS[0];
    const unitTemplate = template.units.find(u => 
      (isCRD && u.id.toLowerCase().includes('crd')) || 
      (isFUSI && u.id.toLowerCase().includes('fusi')) ||
      (!isCRD && !isFUSI && u.id.toLowerCase().includes('lidt'))
    );

    if (unitTemplate) {
      const updatedUnit = { ...unitTemplate, id: unit.id };
      onUpdateUnit?.(updatedUnit);
      setLocalSchedule(updatedUnit.schedule);
      onUpdateSchedule?.(updatedUnit.schedule);
      alert("Conteúdo restaurado com sucesso! Clique em 'Sincronizar' para salvar na nuvem.");
      window.location.reload();
    }
  };

  const formatDateForCalendar = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const scheduleDates = useMemo(() => {
    return localSchedule
      .map(s => formatDateForCalendar(s.date))
      .filter((d): d is string => d !== null);
  }, [localSchedule]);

  const displayMarkings = useMemo(() => {
    const autoMarkings: CalendarMarking[] = scheduleDates.map(date => ({
      date,
      color: scheduleColor
    }));

    const combined = [...calendar.markings];
    autoMarkings.forEach(auto => {
      const idx = combined.findIndex(m => m.date === auto.date);
      if (idx >= 0) {
        combined[idx] = auto;
      } else {
        combined.push(auto);
      }
    });
    return combined;
  }, [calendar.markings, scheduleDates, scheduleColor]);

  const updateEntry = (id: string, field: keyof ScheduleEntry, value: any) => {
    const updated = localSchedule.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const removeEntry = (id: string) => {
    const updated = localSchedule.filter(entry => entry.id !== id);
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const addEntry = () => {
    const newEntry: ScheduleEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: '01/01/2026',
      hours: 2,
      capacities: 'Nova Capacidade',
      knowledge: 'Novo Conhecimento',
      strategy: 'Estratégia Docente',
      resources: 'Recursos',
      completed: false
    };
    const updated = [...localSchedule, newEntry];
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const toggleMarking = (date: string) => {
    if (date < calendar.startDate || date > calendar.endDate) return;
    if (scheduleDates.includes(date)) return;

    let newMarkings: CalendarMarking[];
    const existing = calendar.markings.find(m => m.date === date);
    
    if (selectedColor === 'white') {
      newMarkings = calendar.markings.filter(m => m.date !== date);
    } else {
      if (existing) {
        if (existing.color === selectedColor) {
          newMarkings = calendar.markings.filter(m => m.date !== date);
        } else {
          newMarkings = calendar.markings.map(m => m.date === date ? { ...m, color: selectedColor } : m);
        }
      } else {
        newMarkings = [...calendar.markings, { date: date, color: selectedColor }];
      }
    }
    
    const newCalendar = { ...calendar, markings: newMarkings };
    setCalendar(newCalendar);
    onUpdateCalendar?.(newCalendar);
  };

  const handleCalendarUpdate = (updates: Partial<UnitCalendar>) => {
    const newCalendar = { ...calendar, ...updates };
    setCalendar(newCalendar);
    onUpdateCalendar?.(newCalendar);
  };

  const manualSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateCalendar?.(calendar);
      await onUpdateSchedule?.(localSchedule);
    } finally {
      setIsSaving(false);
    }
  };

  const monthsInRange = useMemo(() => {
    const start = new Date(calendar.startDate + 'T00:00:00');
    const end = new Date(calendar.endDate + 'T00:00:00');
    const months: string[] = [];
    
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      months.push(current.toISOString().substring(0, 7));
      current.setMonth(current.getMonth() + 1);
      current.setDate(1);
    }
    return months;
  }, [calendar.startDate, calendar.endDate]);

  const colorOptions: CalendarColor[] = ['green', 'white'];

  const renderCapacities = (capacities: string[]) => {
    let itemNumber = 1;
    return capacities.map((c, i) => {
      if (c.startsWith('###')) {
        itemNumber = 1;
        return (
          <div key={i} className="mt-8 mb-4 border-b-2 border-blue-100 pb-2 first:mt-2 animate-fadeIn">
            <h4 className="text-blue-700 font-black text-[11px] uppercase tracking-[0.25em] italic">
              {c.replace('### ', '')}
            </h4>
          </div>
        );
      }
      
      const currentIdx = itemNumber++;
      return (
        <div key={i} className="flex gap-4 items-start group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all animate-fadeIn">
          <span className="bg-slate-100 text-slate-400 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black flex-shrink-0">
            {currentIdx}
          </span>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-bold">{c}</p>
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="bg-slate-900 p-5 md:p-8 text-white flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <span className="bg-blue-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">Unidade Curricular</span>
             <button 
                onClick={handleRestoreDefaults}
                className="text-[8px] font-black uppercase text-red-400 border border-red-900/50 px-2 py-0.5 rounded hover:bg-red-900/30 transition-all flex items-center gap-1"
             >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Restaurar Conteúdo Padrão
             </button>
          </div>
          <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase">{unit.name}</h2>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={manualSave}
             className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all gap-2 items-center border border-transparent hover:border-blue-600"
           >
             {isSaving ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>}
             Sincronizar Agora
           </button>
           <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-full">{unit.id.split('-')[1]}</span>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50 sticky top-0 z-20 overflow-x-auto scrollbar-hide">
        {(['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 md:px-6 py-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all border-b-4 h-full flex items-center justify-center min-w-[100px] md:min-w-[140px] text-center ${
              activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab === 'geral' ? 'Geral' : 
             tab === 'sa' ? 'Situação-Problema' : 
             tab === 'rubricas' ? 'Rubricas' : 
             tab === 'cronograma' ? 'Plano de Aula' : 'Calendário'}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#f8fafc]">
        {activeTab === 'geral' && (
          <div className="space-y-10">
            <div className="bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-800 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -translate-y-16 translate-x-16"></div>
               <p className="text-[#E30613] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Aviso Oficial</p>
               <h4 className="text-white font-black text-sm md:text-xl uppercase leading-tight mb-3 tracking-tight">PARA USO EXCLUSIVO NO PROEDUCADOR ATIVIDADE – CRONOGRAMA INTEGRADOR</h4>
               <div className="flex items-center gap-3">
                 <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded uppercase italic">MSEP - Modelo SENAI</span>
                 <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Base de Dados Cloud Ativa</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-6 space-y-10">
                <section>
                  <h3 className="text-[10px] md:text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Capacidades Técnicas
                  </h3>
                  <div className="space-y-4">
                    {renderCapacities(unit.basicCapacities)}
                  </div>
                </section>

                {unit.socioemocionalCapacities && unit.socioemocionalCapacities.length > 0 && (
                  <section>
                    <h3 className="text-[10px] md:text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Capacidades Socioemocionais
                    </h3>
                    <div className="space-y-4">
                      {unit.socioemocionalCapacities.map((c, i) => (
                        <div key={i} className="flex gap-4 items-start group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-green-200 transition-all">
                          <span className="bg-slate-100 text-slate-400 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black flex-shrink-0">{i+1}</span>
                          <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-bold">{c}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="lg:col-span-6 space-y-10">
                <h3 className="text-[10px] md:text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E30613] rounded-full"></div>
                  Conhecimentos (Base Tecnológica)
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {unit.knowledge.map((k, i) => (
                    <div key={i} className="p-6 bg-white border border-slate-100 rounded-[2rem] border-l-4 border-l-blue-600 shadow-md">
                      <p className="font-black text-slate-900 text-xs md:text-sm uppercase mb-4">{k.topic}</p>
                      <ul className="space-y-2.5">
                        {k.subtopics.map((s, si) => (
                          <li key={si} className="text-slate-500 text-[10px] md:text-[11px] font-bold flex items-start gap-3">
                            <span className="text-blue-500">•</span> <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto space-y-12">
            {unit.learningSituations.map((sa) => (
              <div key={sa.id} className="space-y-8 animate-fadeIn">
                {/* Cabeçalho da Situação */}
                <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded uppercase tracking-widest">Situação-Problema</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-tight">{sa.title}</h3>
                  <div className="space-y-4">
                    <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Contextualização</h4>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line">{sa.context}</p>
                  </div>
                </div>

                {/* Desafio Proposto */}
                <div className="bg-slate-900 p-8 md:p-10 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <h4 className="font-black text-[9px] uppercase tracking-widest mb-6 text-red-500">Desafio Proposto</h4>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic whitespace-pre-line">"{sa.challenge}"</p>
                </div>

                {/* Quadro de Resultados Esperados */}
                {sa.expectedResults && sa.expectedResults.length > 0 && (
                  <div className="bg-white border-2 border-blue-50 p-8 md:p-10 rounded-[2rem] shadow-lg animate-fadeIn">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-blue-100 shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Resultados Esperados</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-slate-500 font-black text-[11px] uppercase tracking-widest border-b border-slate-100 pb-3">
                        {sa.expectedResults[0]}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {sa.expectedResults.slice(1).map((result, idx) => (
                          <div key={idx} className="flex gap-5 items-start p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 hover:bg-white transition-all">
                             <div className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                               <span className="text-[10px] font-black uppercase">{result.split(')')[0]}</span>
                             </div>
                             <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-bold">
                               {result.split(')')[1]?.trim() || result}
                             </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Separador entre SAs */}
                <div className="flex justify-center py-4">
                   <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rubricas' && (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-2xl bg-white p-2">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 md:p-6 text-[9px] font-black uppercase border border-slate-800">Referência</th>
                  <th className="p-4 md:p-6 text-[9px] font-black uppercase border border-slate-800 text-red-400">NSA</th>
                  <th className="p-4 md:p-6 text-[9px] font-black uppercase border border-slate-800 text-orange-400">APO</th>
                  <th className="p-4 md:p-6 text-[9px] font-black uppercase border border-slate-800 text-blue-400">PAR</th>
                  <th className="p-4 md:p-6 text-[9px] font-black uppercase border border-slate-800 text-green-400">AUT</th>
                </tr>
              </thead>
              <tbody className="text-[10px] md:text-[11px] font-medium">
                {unit.rubrics.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 md:p-6 border border-slate-100 font-black text-slate-800 bg-slate-50/50 w-64">{row.capacity}</td>
                    <td className="p-4 md:p-6 border border-slate-100 text-slate-500 italic leading-relaxed">{row.nsa}</td>
                    <td className="p-4 md:p-6 border border-slate-100 text-slate-500 italic leading-relaxed">{row.apo}</td>
                    <td className="p-4 md:p-6 border border-slate-100 text-slate-500 italic leading-relaxed">{row.par}</td>
                    <td className="p-4 md:p-6 border border-slate-100 text-slate-500 italic leading-relaxed">{row.aut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'cronograma' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-lg">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Resumo do Cronograma</p>
                  <p className="text-slate-800 font-black text-lg">{localSchedule.length} Aulas Planejadas</p>
                </div>
                <button 
                  onClick={addEntry}
                  className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                  Adicionar Aula
                </button>
             </div>

             <div className="space-y-4">
                {localSchedule.map((entry) => (
                  <div key={entry.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase block mb-1">Data</label>
                        <input 
                          type="text" 
                          value={entry.date}
                          onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[8px] font-black text-slate-400 uppercase block mb-1">Conhecimento / Conteúdo</label>
                          <textarea 
                            value={entry.knowledge}
                            onChange={(e) => updateEntry(entry.id, 'knowledge', e.target.value)}
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-black text-slate-400 uppercase block mb-1">Estratégia Docente</label>
                          <textarea 
                            value={entry.strategy}
                            onChange={(e) => updateEntry(entry.id, 'strategy', e.target.value)}
                            rows={2}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-2">
                         <button 
                           onClick={() => removeEntry(entry.id)}
                           className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                         >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex gap-4 items-center">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Início</p>
                    <input 
                      type="date" 
                      value={calendar.startDate}
                      onChange={(e) => handleCalendarUpdate({ startDate: e.target.value })}
                      className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-700 outline-none"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Término</p>
                    <input 
                      type="date" 
                      value={calendar.endDate}
                      onChange={(e) => handleCalendarUpdate({ endDate: e.target.value })}
                      className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-700 outline-none"
                    />
                  </div>
               </div>
               
               <div className="flex gap-3">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all border-2 ${selectedColor === color ? 'border-blue-600 scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      style={{ backgroundColor: SOLID_COLOR_MAP[color] }}
                    >
                      {color === 'white' && <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>}
                    </button>
                  ))}
               </div>
            </div>

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
                           
                           const marking = displayMarkings.find(m => m.date === day);
                           const isSunday = idx % 7 === 0;
                           const isOutOfRange = day < calendar.startDate || day > calendar.endDate;

                           return (
                             <button
                               key={day}
                               disabled={isOutOfRange}
                               onClick={() => toggleMarking(day)}
                               className={`p-2 h-12 md:h-14 flex items-center justify-center text-[10px] font-black border-b border-r border-slate-50 transition-all hover:scale-105 hover:z-10 ${isOutOfRange ? 'opacity-10' : 'cursor-pointer relative'}`}
                               style={{ 
                                 backgroundColor: marking ? COLOR_MAP[marking.color] : 'transparent',
                                 color: marking ? TEXT_COLOR_MAP[marking.color] : (isSunday ? '#ef4444' : '#1e293b')
                               }}
                             >
                               {day.split('-')[2]}
                             </button>
                           );
                         })}
                       </div>
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
