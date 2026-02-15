
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarColor } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const saContainerRef = useRef<HTMLDivElement>(null);
  const cronogramaContainerRef = useRef<HTMLDivElement>(null);

  const isCRD = unit.id.toLowerCase().includes('crd') || unit.name.toLowerCase().includes('dimensional');
  const isFUSI = unit.id.toLowerCase().includes('fusi') || unit.name.toLowerCase().includes('usinagem');
  const scheduleColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');

  const calendar = useMemo(() => unit.calendar || {
    startDate: '2026-01-26',
    endDate: '2026-06-24',
    markings: []
  }, [unit.calendar]);

  useEffect(() => { setLocalSchedule(unit.schedule); }, [unit.schedule]);

  const getDayOfWeek = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return "";
    const [d, m, y] = dateStr.split('/').map(Number);
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);
  };

  const handleScheduleUpdate = (id: string, field: keyof ScheduleEntry, value: any) => {
    const updated = localSchedule.map(s => s.id === id ? { ...s, [field]: value } : s);
    setLocalSchedule(updated);
  };

  const saveSchedule = async () => {
    if (!onUpdateSchedule) return;
    setIsSaving(true);
    try {
      await onUpdateSchedule(localSchedule);
    } catch (err) {
      alert("Erro ao salvar no servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatType = (text: string) => {
    return text
      .replace('TEORIA (TEOR)', 'Teoria')
      .replace('PRÁTICA (PRAT)', 'Prática')
      .replace('(TEOR)', 'Teoria')
      .replace('(PRAT)', 'Prática');
  };

  const downloadPDF = async (ref: React.RefObject<HTMLDivElement | null>, filename: string) => {
    if (!ref.current) return;
    setIsGenerating(true);
    
    try {
      const element = ref.current;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pages = Array.from(element.children);

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      }
      
      pdf.save(filename);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Houve um erro ao gerar o arquivo. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const scheduleDates = useMemo(() => {
    const dates: Record<string, boolean> = {};
    localSchedule.forEach(s => {
      const parts = s.date.split('/');
      if (parts.length === 3) {
        dates[`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`] = true;
      }
    });
    return dates;
  }, [localSchedule]);

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

  const chunkedSchedule = useMemo(() => {
    const chunks: ScheduleEntry[][] = [];
    for (let i = 0; i < localSchedule.length; i += 12) {
      chunks.push(localSchedule.slice(i, i + 12));
    }
    return chunks;
  }, [localSchedule]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
        <div>
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{unit.name}</h2>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide tabs-header">
        {(['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 bg-white' : 'border-transparent text-slate-400 hover:bg-slate-100'}`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest block">
              {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situação-Problema' : tab === 'rubricas' ? 'Rubricas' : tab === 'cronograma' ? 'Plano de Aula / Cronograma' : 'Calendário'}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FDFDFD]">
        
        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8 mb-10">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Situações de Aprendizagem</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Guia de Aprendizagem Profissional (IA-PDF)</p>
              </div>
              <button 
                onClick={() => downloadPDF(saContainerRef, `SA_${unit.name}.pdf`)} 
                disabled={isGenerating}
                className="bg-[#E30613] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all disabled:bg-slate-400"
              >
                {isGenerating ? 'Gerando Arquivo...' : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Baixar Guia PDF
                  </>
                )}
              </button>
            </div>

            <div className="space-y-12 pb-10">
              {unit.learningSituations.map((sa) => (
                <div key={sa.id} className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight italic">{sa.title}</h3>
                  <div className="space-y-8">
                    <div className="border-l-2 border-slate-100 pl-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">I. Contextualização</p>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{sa.context}</p>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-lg">
                      <p className="text-[10px] font-black text-red-500 uppercase mb-4 tracking-widest">II. Desafio Proposto</p>
                      <p className="text-slate-200 text-sm italic font-medium leading-relaxed">"{sa.challenge}"</p>
                    </div>
                    <div className="border-t border-slate-100 pt-8">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">III. Resultados Esperados</p>
                      <ul className="space-y-3">
                        {sa.expectedResults.map((result, rIdx) => (
                          <li key={rIdx} className="flex gap-4 group">
                            <p className="text-slate-600 text-sm font-bold leading-tight pt-0.5">{result}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
              <div ref={saContainerRef}>
                {unit.learningSituations.map((sa, index) => (
                  <div key={sa.id} style={{ width: '794px', height: '1123px', padding: '25px 40px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                    {index === 0 ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3pt solid #E30613', paddingBottom: '10px', marginBottom: '12px' }}>
                        <div style={{ background: '#E30613', color: 'white', padding: '10px 18px', fontSize: '22px', fontWeight: '900', fontStyle: 'italic' }}>SENAI</div>
                        <div style={{ textAlign: 'right', color: 'black' }}>
                          <h1 style={{ fontSize: '11px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>Mecânico de Usinagem Convencional</h1>
                          <p style={{ fontSize: '9px', margin: '3px 0 0 0', fontWeight: 'bold' }}>Guia de Situações de Aprendizagem 0{index+1}</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5pt solid #000', paddingBottom: '5px', marginBottom: '10px' }}>
                        <div style={{ color: 'black', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}>Situação de Aprendizagem 0{index+1}</div>
                        <div style={{ textAlign: 'right', color: '#666', fontSize: '8px', fontWeight: 'bold' }}>UC: {unit.name.toUpperCase()}</div>
                      </div>
                    )}
                    <h2 style={{ textAlign: 'center', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', margin: '5px 0', borderBottom: '1pt solid #ccc', paddingBottom: '5px', color: 'black' }}>Guia do Estudante (MSEP)</h2>
                    <div style={{ fontSize: '13px', fontWeight: '900', borderBottom: '1.5pt solid #E30613', marginBottom: '15px', padding: '5px 0', textTransform: 'uppercase', color: 'black' }}>{sa.title}</div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ border: '1pt solid #000', padding: '15px', minHeight: '180px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: '900', fontSize: '10px', color: '#E30613', textTransform: 'uppercase', marginBottom: '8px' }}>I. Contextualização / Situação-Problema</div>
                        <div style={{ fontSize: '12px', lineHeight: '1.5', color: 'black', textAlign: 'justify' }}>{sa.context}</div>
                      </div>
                      <div style={{ border: '1pt solid #000', padding: '15px', background: '#fdfdfd', minHeight: '220px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: '900', fontSize: '10px', color: '#E30613', textTransform: 'uppercase', marginBottom: '8px' }}>II. Desafio Proposto</div>
                        <div style={{ fontSize: '12px', lineHeight: '1.5', color: 'black', fontStyle: 'italic', fontWeight: '600' }}>{sa.challenge}</div>
                      </div>
                      <div style={{ border: '1pt solid #000', padding: '15px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: '900', fontSize: '10px', color: '#E30613', textTransform: 'uppercase', marginBottom: '8px' }}>III. Resultados Esperados / Entregas</div>
                        <ul style={{ paddingLeft: '0px', marginTop: '4px', listStyleType: 'none' }}>
                          {sa.expectedResults.map((res, ri) => (
                            <li key={ri} style={{ fontSize: '11.5px', marginBottom: '6px', color: 'black', lineHeight: '1.4' }}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cronograma' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Plano de Ensino / Cronograma</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{localSchedule.length} Aulas Registradas</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={saveSchedule}
                  disabled={isSaving}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all disabled:bg-slate-400"
                >
                  {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>}
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                <button 
                  onClick={() => downloadPDF(cronogramaContainerRef, `PlanoAula_${unit.name}.pdf`)} 
                  disabled={isGenerating}
                  className="bg-[#005DAA] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all disabled:bg-slate-400"
                >
                  {isGenerating ? 'Gerando...' : <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> Baixar PDF</>}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {localSchedule.map((entry, idx) => (
                <div key={entry.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 hover:border-blue-200 transition-all">
                  <div className="lg:col-span-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">AULA {idx+1}</p>
                    <input type="text" value={entry.date} onChange={(e) => handleScheduleUpdate(entry.id, 'date', e.target.value)} className="text-blue-600 font-[1000] text-xl uppercase tracking-tighter w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none" />
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-1 italic">{getDayOfWeek(entry.date)}</p>
                  </div>
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-blue-600 uppercase mb-2 text-[9px] font-black tracking-widest">Conhecimentos e Capacidades</p>
                      <input type="text" value={entry.knowledge} onChange={(e) => handleScheduleUpdate(entry.id, 'knowledge', e.target.value)} className="w-full font-bold text-sm uppercase text-black bg-transparent border-b border-slate-100 focus:border-blue-300 outline-none mb-1" />
                      <textarea value={entry.capacities} rows={3} onChange={(e) => handleScheduleUpdate(entry.id, 'capacities', e.target.value)} className="w-full font-medium text-[15px] text-black bg-slate-50 p-3 rounded-xl border border-transparent focus:border-blue-200 outline-none resize-none leading-relaxed" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-orange-600 uppercase mb-2 text-[9px] font-black tracking-widest">Estratégias e Recursos</p>
                       <textarea value={entry.strategy} rows={5} onChange={(e) => handleScheduleUpdate(entry.id, 'strategy', e.target.value)} className="w-full font-medium italic text-[15px] text-black bg-slate-50 p-3 rounded-xl border border-transparent focus:border-orange-200 outline-none resize-none leading-relaxed" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
              <div ref={cronogramaContainerRef}>
                {chunkedSchedule.map((chunk, pIndex) => (
                  <div key={pIndex} style={{ width: '794px', height: '1123px', padding: '40px 50px 70px 50px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative' }}>
                    {pIndex === 0 ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2.5pt solid #E30613', paddingBottom: '10px', marginBottom: '15px' }}>
                        <div style={{ background: '#E30613', color: 'white', padding: '8px 12px', fontSize: '20px', fontWeight: '800', fontStyle: 'italic' }}>SENAI</div>
                        <div style={{ textAlign: 'right', color: 'black' }}>
                          <h1 style={{ fontSize: '10px', fontWeight: '700', margin: 0, textTransform: 'uppercase' }}>Mecânico de Usinagem Convencional</h1>
                          <p style={{ fontSize: '8px', margin: '2px 0 0 0', fontWeight: '500' }}>Plano de Ensino / Cronograma - MSEP</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5pt solid #000', paddingBottom: '5px', marginBottom: '15px' }}>
                        <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', color: 'black' }}>Plano de Ensino / Cronograma - Continuação</div>
                        <div style={{ fontSize: '8px', fontWeight: '500', color: '#666' }}>Pág {pIndex + 1}</div>
                      </div>
                    )}
                    
                    {pIndex === 0 && <h2 style={{ textAlign: 'center', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', margin: '5px 0', borderBottom: '1.5pt solid #000', paddingBottom: '5px', color: 'black' }}>Plano de Ensino / Cronograma</h2>}
                    <div style={{ marginBottom: '8px', fontSize: '10px', fontWeight: '700', color: 'black' }}>UC: {unit.name.toUpperCase()}</div>
                    
                    <div style={{ border: '1.5pt solid #000', borderBottom: '2pt solid #000', flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', flex: 1 }}>
                        <thead>
                          <tr style={{ background: '#f5f5f5', borderBottom: '1.5pt solid #000' }}>
                            <th style={{ borderRight: '1pt solid #000', padding: '8px', fontSize: '9px', textTransform: 'uppercase', width: '18%', fontWeight: '700' }}>Aula/Data</th>
                            <th style={{ borderRight: '1pt solid #000', padding: '8px', fontSize: '9px', textTransform: 'uppercase', width: '41%', fontWeight: '700' }}>Conhecimentos/Capacidades</th>
                            <th style={{ padding: '8px', fontSize: '9px', textTransform: 'uppercase', width: '41%', fontWeight: '700' }}>Estratégias</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chunk.map((entry, idx) => {
                            const realIdx = (pIndex * 12) + idx;
                            return (
                              <tr key={entry.id} style={{ borderBottom: '1pt solid #000' }}>
                                <td style={{ borderRight: '1pt solid #000', padding: '6px', textAlign: 'center', fontSize: '11px', fontWeight: '400', color: '#000' }}>
                                  <strong style={{ fontWeight: '700' }}>{entry.date}</strong><br/><span style={{ fontSize: '8px', color: '#444', fontWeight: '400' }}>AULA {realIdx + 1}</span>
                                </td>
                                <td style={{ borderRight: '1pt solid #000', padding: '8px', fontSize: '11px', color: '#000', fontWeight: '400', lineHeight: '1.3' }}>
                                  <div style={{ fontWeight: '700', marginBottom: '2px', color: '#005DAA', fontSize: '8px' }}>{formatType(entry.knowledge)}</div>
                                  <div style={{ fontWeight: '400' }}>{entry.capacities}</div>
                                </td>
                                <td style={{ padding: '8px', fontSize: '11px', fontStyle: 'italic', color: '#000', fontWeight: '400', lineHeight: '1.3' }}>
                                  {entry.strategy}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: '15px', fontSize: '9px', color: '#666', textAlign: 'right', fontStyle: 'italic' }}>
                      Sistema MSEP-SENAI | Gerado em {new Date().toLocaleDateString('pt-BR')} | Página {pIndex + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section>
              <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Capacidades Técnicas</h3>
              <div className="space-y-3">
                {unit.basicCapacities.map((c, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-bold text-sm text-slate-700 flex gap-4">
                    <span className="text-blue-500 font-black shrink-0">{i+1}.</span>{c}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Conhecimentos</h3>
              <div className="space-y-4">
                {unit.knowledge.map((k, i) => (
                  <div key={i} className="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl shadow-sm">
                    <p className="font-black text-slate-900 text-xs uppercase mb-2 tracking-tight">{k.topic}</p>
                    <div className="space-y-1.5">{k.subtopics.map((s, si) => <p key={si} className="text-slate-500 text-[10px] font-medium leading-tight">• {s}</p>)}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'rubricas' && (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-2">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800">Referência</th>
                  <th className="p-6 text-[10px] font-black uppercase border border-slate-800 text-red-400">NSA</th>
                  <th className="p-6 text-[10px) font-black uppercase border border-slate-800 text-orange-400">APO</th>
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

        {activeTab === 'calendario' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div key={monthStr} className="space-y-3">
                  <div className="bg-slate-900 text-white py-2 px-4 rounded-xl text-center shadow-lg border border-slate-800">
                    <h4 className="text-[10px] font-black uppercase tracking-widest italic">{monthName} {year}</h4>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-7 text-center bg-slate-50 border-b border-slate-100">
                      {['D','S','T','Q','Q','S','S'].map((d, i) => (
                        <div key={i} className={`py-2 text-[8px] font-black ${i === 0 ? 'text-red-500' : 'text-slate-400'}`}>{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7">
                      {days.map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`} className="p-1 border-b border-r border-slate-50 h-10 md:h-12"></div>;
                        const hasClass = scheduleDates[day];
                        const isSunday = idx % 7 === 0;
                        return (
                          <div key={day} className={`p-1 h-10 md:h-12 flex items-center justify-center text-[10px] font-black border-b border-r border-slate-50 transition-colors hover:bg-slate-50`} style={{ backgroundColor: hasClass ? COLOR_MAP[scheduleColor] : 'transparent', color: hasClass ? TEXT_COLOR_MAP[scheduleColor] : (isSunday ? '#ef4444' : '#1e293b') }}>
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
