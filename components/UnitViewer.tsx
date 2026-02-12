
import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from '../types';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void;
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

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);
  const [isSaving, setIsSaving] = useState(false);
  
  // Determina a cor baseada na Unidade Curricular
  const isCRD = unit.id.toLowerCase().includes('crd');
  const isFUSI = unit.id.toLowerCase().includes('fusi');
  const scheduleColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');

  const defaultCalendar: UnitCalendar = {
    startDate: '2026-01-26',
    endDate: '2026-06-15',
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

  // Sincroniza o estado local quando os dados da unidade mudam (vindo do Firebase)
  useEffect(() => {
    setLocalSchedule(unit.schedule);
  }, [unit.schedule]);

  useEffect(() => {
    if (unit.calendar) {
      setCalendar(unit.calendar);
    }
  }, [unit.calendar]);

  // Formata DD/MM/AAAA para YYYY-MM-DD para compatibilidade com o calendário
  const formatDateForCalendar = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Calcula as datas que possuem aulas registradas no cronograma
  const scheduleDates = useMemo(() => {
    return localSchedule
      .map(s => formatDateForCalendar(s.date))
      .filter((d): d is string => d !== null);
  }, [localSchedule]);

  // Combina as marcações manuais com as automáticas do cronograma
  const displayMarkings = useMemo(() => {
    const autoMarkings: CalendarMarking[] = scheduleDates.map(date => ({
      date,
      color: scheduleColor
    }));

    const combined = [...calendar.markings];
    autoMarkings.forEach(auto => {
      const idx = combined.findIndex(m => m.date === auto.date);
      if (idx >= 0) {
        combined[idx] = auto; // Prioridade absoluta para a cor do cronograma
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

    // Se a data já pertence ao cronograma, não permite marcar por cima
    if (scheduleDates.includes(date)) {
      return;
    }

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

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="bg-slate-900 p-5 md:p-8 text-white flex justify-between items-center">
        <div>
          <div className="flex justify-between items-center mb-3">
             <span className="bg-blue-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">Unidade Curricular</span>
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
             tab === 'cronograma' ? 'Plano de Aula / Cronograma' : 'Calendário'}
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
                    {unit.basicCapacities.map((c, i) => (
                      <div key={i} className="flex gap-4 items-start group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
                        <span className="bg-slate-100 text-slate-400 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black flex-shrink-0">{i+1}</span>
                        <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-bold">{c}</p>
                      </div>
                    ))}
                  </div>
                </section>
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
          <div className="max-w-4xl mx-auto space-y-10">
            {unit.learningSituations.map((sa) => (
              <div key={sa.id} className="space-y-10">
                <div className="bg-white border border-slate-200 p-6 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">{sa.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">{sa.context}</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl">
                  <h4 className="font-black text-[9px] uppercase tracking-widest mb-6 text-red-500">Desafio Proposto</h4>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">"{sa.challenge}"</p>
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
                  <p className="text-[11px] md:text-sm font-black text-blue-600 uppercase">Carga Acumulada: {localSchedule.reduce((acc, s) => acc + s.hours, 0)}h</p>
                </div>
                <button 
                  onClick={addEntry}
                  className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 shadow-xl transition-all"
                >
                  Inserir Nova Aula
                </button>
             </div>
             
             <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-2xl bg-white p-1">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="bg-slate-800 text-white text-[9px] uppercase font-black">
                    <tr>
                      <th className="p-4 border-r border-slate-700 w-36">Data / Horas</th>
                      <th className="p-4 border-r border-slate-700">Capacidades</th>
                      <th className="p-4 border-r border-slate-700">Base Tecnológica</th>
                      <th className="p-4 border-r border-slate-700">Estratégias / Recursos</th>
                      <th className="p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] md:text-[11px] divide-y divide-slate-100">
                    {localSchedule.map(entry => (
                      <tr 
                        key={entry.id} 
                        className={`transition-all duration-300 ${entry.completed ? '' : 'hover:bg-slate-50'}`}
                        style={entry.completed ? { backgroundColor: COLOR_MAP[scheduleColor], color: '#ffffff' } : {}}
                      >
                        <td className="p-4 border-r border-slate-100 align-top">
                           <div className="flex items-center gap-2 mb-2">
                             <button 
                               onClick={() => updateEntry(entry.id, 'completed', !entry.completed)}
                               title={entry.completed ? "Desmarcar aula" : "Marcar como realizada"}
                               className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all shadow-sm flex items-center justify-center ${
                                 entry.completed 
                                   ? 'bg-white border-white text-slate-900' 
                                   : 'border-slate-300 hover:border-slate-400 bg-white'
                               }`}
                             >
                               {entry.completed && <div className="w-2 h-2 rounded-full bg-current"></div>}
                             </button>
                             <input 
                               type="text"
                               value={entry.date}
                               onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                               className={`w-full font-black p-2 rounded-lg text-center transition-colors ${
                                 entry.completed ? 'bg-white/20 text-white placeholder:text-white/50' : 'bg-slate-100 text-blue-600'
                               }`}
                               placeholder="DD/MM/AAAA"
                             />
                           </div>
                           <div className="flex items-center justify-center gap-2">
                             <input 
                               type="number"
                               value={entry.hours}
                               onChange={(e) => updateEntry(entry.id, 'hours', parseInt(e.target.value) || 0)}
                               className={`w-12 border font-black p-1 rounded-lg text-center transition-colors ${
                                 entry.completed ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-slate-200 text-slate-800'
                               }`}
                             />
                             <span className={`text-[8px] font-black uppercase transition-colors ${entry.completed ? 'text-white/70' : 'text-slate-400'}`}>Horas</span>
                           </div>
                        </td>
                        <td className="p-4 border-r border-slate-100 align-top">
                           <textarea 
                             value={entry.capacities}
                             onChange={(e) => updateEntry(entry.id, 'capacities', e.target.value)}
                             className={`w-full bg-transparent font-bold resize-none outline-none p-1 rounded-lg min-h-[80px] transition-colors ${
                               entry.completed ? 'text-white placeholder:text-white/50' : 'text-slate-700 focus:bg-white'
                             }`}
                             rows={4}
                           />
                        </td>
                        <td className="p-4 border-r border-slate-100 align-top">
                           <textarea 
                             value={entry.knowledge}
                             onChange={(e) => updateEntry(entry.id, 'knowledge', e.target.value)}
                             className={`w-full bg-transparent font-medium resize-none outline-none p-1 rounded-lg min-h-[80px] transition-colors ${
                               entry.completed ? 'text-white/90 placeholder:text-white/50' : 'text-slate-600 focus:bg-white'
                             }`}
                             rows={4}
                           />
                        </td>
                        <td className="p-4 border-r border-slate-100 align-top">
                           <textarea 
                             value={entry.strategy}
                             onChange={(e) => updateEntry(entry.id, 'strategy', e.target.value)}
                             className={`w-full bg-transparent font-black outline-none p-1 rounded-lg mb-2 transition-colors ${
                               entry.completed ? 'text-white placeholder:text-white/50' : 'text-slate-900 focus:bg-white'
                             }`}
                             placeholder="Estratégia docente..."
                           />
                           <input 
                             type="text"
                             value={entry.resources}
                             onChange={(e) => updateEntry(entry.id, 'resources', e.target.value)}
                             className={`w-full text-[9px] font-black p-2 rounded-lg transition-colors ${
                               entry.completed ? 'bg-white/10 text-white/80 placeholder:text-white/50' : 'bg-slate-50 text-slate-400'
                             }`}
                             placeholder="Recursos/Ambientes"
                           />
                        </td>
                        <td className="p-4 text-center">
                           <button 
                             onClick={() => removeEntry(entry.id)} 
                             className={`transition-colors ${entry.completed ? 'text-white/40 hover:text-white' : 'text-slate-300 hover:text-red-500'}`}
                           >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-10">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 w-full">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Início das Aulas</label>
                    <input 
                      type="date"
                      value={calendar.startDate}
                      onChange={(e) => handleCalendarUpdate({ startDate: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Término das Aulas</label>
                    <input 
                      type="date"
                      value={calendar.endDate}
                      onChange={(e) => handleCalendarUpdate({ endDate: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={manualSave}
                  disabled={isSaving}
                  className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {isSaving ? <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>}
                  {isSaving ? 'Gravando...' : 'Gravar Alterações'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Marcação Manual (Verde):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-4 bg-white p-3 rounded-2xl border-2 group transition-all shadow-sm ${selectedColor === color ? 'border-slate-900 ring-4 ring-slate-100' : 'border-slate-100 hover:border-blue-100'}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border shadow-inner transition-transform ${selectedColor === color ? 'border-transparent scale-110 shadow-lg' : 'border-slate-100'}`}
                          style={{ backgroundColor: SOLID_COLOR_MAP[color] }}
                        >
                          {selectedColor === color && <div className={`w-3 h-3 rounded-full ${color === 'white' ? 'bg-slate-400' : 'bg-white shadow-md'}`}></div>}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${selectedColor === color ? 'text-slate-900' : 'text-slate-400'}`}>
                          {color === 'white' ? 'Limpar Data' : (calendar.colorLabels?.[color] || 'Não letivo')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Legenda Automática:</p>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 flex items-center gap-6">
                    <div 
                      className="w-12 h-12 rounded-xl border shadow-md flex items-center justify-center"
                      style={{ backgroundColor: COLOR_MAP[scheduleColor] }}
                    >
                       <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: COLOR_MAP[scheduleColor] }}>Aulas do Cronograma</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-relaxed mt-1">Datas bloqueadas para edição manual.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
              {monthsInRange.map(monthStr => {
                const [year, month] = monthStr.split('-').map(Number);
                const firstDayOfMonth = new Date(year, month - 1, 1);
                const lastDayOfMonth = new Date(year, month, 0);
                const monthName = firstDayOfMonth.toLocaleDateString('pt-BR', { month: 'long' });
                
                const days = [];
                for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
                  days.push(null);
                }
                for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                  const d = i < 10 ? `0${i}` : i;
                  days.push(`${monthStr}-${d}`);
                }

                return (
                  <div key={monthStr} className="space-y-4">
                    <div className="bg-[#E30613] text-white py-2.5 px-6 rounded-2xl text-center shadow-xl transform skew-x-[-2deg]">
                      <h4 className="text-[11px] font-[1000] uppercase tracking-[0.2em] italic">{monthName} {year}</h4>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
                      <div className="grid grid-cols-7 text-center border-b border-slate-100 bg-slate-50/50">
                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                          <div key={i} className={`py-4 text-[9px] font-black uppercase ${i === 0 ? 'text-red-600' : 'text-slate-400'}`}>
                            {d}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7">
                        {days.map((day, idx) => {
                          if (!day) return <div key={`empty-${idx}`} className="p-1 border-b border-r border-slate-50"></div>;
                          
                          const marking = displayMarkings.find(m => m.date === day);
                          const isSunday = idx % 7 === 0;
                          const dateNum = parseInt(day.split('-')[2]);
                          const isOutOfRange = day < calendar.startDate || day > calendar.endDate;
                          const isAuto = scheduleDates.includes(day);

                          return (
                            <button
                              key={day}
                              disabled={isOutOfRange}
                              onClick={() => toggleMarking(day)}
                              title={isAuto ? "Data bloqueada: Pertence ao cronograma de aulas" : ""}
                              className={`p-3 text-center text-xs md:text-sm font-black transition-all border-b border-r border-slate-50 last:border-r-0 relative h-14 md:h-16 flex items-center justify-center ${
                                isSunday ? 'text-red-500 bg-red-50/20' : 'text-slate-800'
                              } ${isOutOfRange ? 'opacity-20 cursor-not-allowed bg-slate-50' : 'hover:bg-blue-50'} ${isAuto ? 'cursor-not-allowed' : ''}`}
                              style={marking ? { backgroundColor: COLOR_MAP[marking.color], color: TEXT_COLOR_MAP[marking.color] } : {}}
                            >
                              {dateNum}
                              {isAuto && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/40 rounded-full shadow-sm"></div>}
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
