
import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from '../types';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from '../constants';

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

  const handleResetToTemplate = () => {
    if (confirm("Deseja restaurar este cronograma para o padrão oficial?")) {
      const templatePlan = SAMPLE_PLANS[0];
      const templateUnit = templatePlan.units.find(u => 
        u.id.toLowerCase().includes(unit.id.split('-')[1] || 'lidt') || 
        u.name.toUpperCase().includes(unit.name.split(' ')[0] || '')
      );
      if (templateUnit) {
        setLocalSchedule(templateUnit.schedule);
        onUpdateSchedule?.(templateUnit.schedule);
      }
    }
  };

  const getDayOfWeek = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return "";
    const [d, m, y] = dateStr.split('/').map(Number);
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);
  };

  const updateEntry = (id: string, field: keyof ScheduleEntry, value: any) => {
    const updated = localSchedule.map(entry => entry.id === id ? { ...entry, [field]: value } : entry);
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const handlePrint = () => {
    window.print();
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

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn printable-unit-module">
      <style>{`
        @media print {
          /* 1. RESET DE PÁGINA PARA ENCOSTAR NO TOPO */
          @page {
            size: A4 portrait;
            margin: 0 !important; /* Essencial para remover a margem superior branca do sistema */
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
            background: white !important;
          }

          /* 2. LIBERAR FLUXO (O QUE IMPEDE AS PÁGINAS DE APARECEREM) */
          #root, main, .flex, .flex-1, .h-screen, .printable-unit-module, .content-area {
            height: auto !important;
            overflow: visible !important;
            display: block !important;
            position: relative !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* 3. VISIBILIDADE SELETIVA */
          .no-print, header, aside, .tabs-header, button { 
            display: none !important; 
          }
          
          body * { 
            visibility: hidden !important; 
          }
          
          .report-document, .report-document * { 
            visibility: visible !important; 
          }

          /* 4. DOCUMENTO DE IMPRESSÃO - USANDO RELATIVE PARA MANTER A PAGINAÇÃO */
          .report-document {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            margin: 0 !important;
            /* Padding interno cria a margem "visual" de segurança sem margem de papel branca */
            padding: 1cm 1.5cm !important; 
            box-sizing: border-box !important;
          }

          /* 5. CABEÇALHO TÉCNICO - LOGO VERMELHO */
          .report-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 2pt solid #E30613 !important;
            padding-bottom: 10pt !important;
            margin-bottom: 15pt !important;
          }
          .logo-box {
            background: #E30613 !important;
            color: white !important;
            padding: 8pt 24pt !important;
            font-size: 26pt !important;
            font-weight: 900 !important;
            font-style: italic !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .info-box { text-align: right !important; }
          .info-box h1 { font-size: 11.5pt !important; font-weight: 900 !important; margin: 0 !important; text-transform: uppercase !important; color: #000 !important; }
          .info-box p { font-size: 8.5pt !important; margin: 3pt 0 0 0 !important; font-weight: bold !important; color: #000 !important; }

          /* 6. TABELA - TUDO PRETO SÓLIDO */
          .tech-table {
            width: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin-top: 10pt !important;
          }
          .tech-table th, .tech-table td {
            border: 1pt solid #000 !important;
            padding: 8pt !important;
            font-size: 8.5pt !important;
            vertical-align: top !important;
            color: #000 !important;
            line-height: 1.25 !important;
          }
          .tech-table th {
            background: #f2f2f2 !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            text-align: center !important;
            -webkit-print-color-adjust: exact;
          }
          /* Impede quebras dentro da mesma linha (aula) */
          .tech-table tr {
            page-break-inside: avoid !important;
          }
          
          .p-label { 
            color: #000 !important; 
            font-weight: 900 !important; 
            font-size: 7.5pt !important; 
            text-transform: uppercase !important; 
            margin-bottom: 3pt !important; 
            display: block !important; 
          }
          
          .doc-main-title { 
            text-align: center !important; 
            font-weight: 900 !important; 
            font-size: 15pt !important; 
            text-transform: uppercase !important; 
            margin: 15pt 0 !important; 
            border-bottom: 1.5pt solid #000 !important; 
            padding-bottom: 6pt !important; 
            color: #000 !important;
          }
        }
      `}</style>

      {/* INTERFACE WEB */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div>
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{unit.name}</h2>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide no-print tabs-header">
        {(['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 bg-white' : 'border-transparent text-slate-400 hover:bg-slate-100'}`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest block">
              {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situação-Problema' : tab === 'rubricas' ? 'Rubricas' : tab === 'cronograma' ? 'Plano de Aula' : 'Calendário'}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FDFDFD] content-area">
        
        {/* TABS: CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8 no-print">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Plano de Aula</h3>
              <div className="flex gap-4">
                <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-900 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  Imprimir Cronograma Completo
                </button>
                <button onClick={handleResetToTemplate} className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-[8px] font-black uppercase hover:bg-slate-200">Restaurar Padrão</button>
              </div>
            </div>

            <div className="no-print space-y-6">
              {localSchedule.map((entry, idx) => (
                <div key={entry.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">AULA {idx+1}</p>
                    <input type="text" value={entry.date} onChange={(e) => updateEntry(entry.id, 'date', e.target.value)} className="text-blue-600 font-[1000] text-xl w-full bg-transparent border-none outline-none" />
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-1 italic">{getDayOfWeek(entry.date)}</p>
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase inline-block mt-2">{entry.hours} HORAS</span>
                  </div>
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 border-l-2 border-blue-500 pl-2">Conhecimentos e Capacidades</h5>
                      <div className="text-slate-800 text-[10px] font-bold space-y-2">
                        <p><strong>C:</strong> {entry.knowledge}</p>
                        <p><strong>Cap:</strong> {entry.capacities}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 border-l-2 border-orange-500 pl-2">Estratégias e Recursos</h5>
                      <div className="text-slate-600 text-[10px] font-medium italic">
                        <p>{entry.strategy}</p>
                        <p className="mt-2 text-slate-400">{entry.resources}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DOCUMENTO DE IMPRESSÃO - ESTE É O QUE SAI NO PDF */}
            <div className="hidden report-document">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>Mecânico de Usinagem Convencional</h1>
                  <p>Plano de Aula e Cronograma - Sistema MSEP</p>
                </div>
              </div>
              
              <h2 className="doc-main-title">Cronograma de Atividades Pedagógicas</h2>
              <div style={{ marginBottom: '12pt', fontSize: '10pt', fontWeight: 'bold', color: '#000' }}>
                Unidade Curricular: {unit.name.toUpperCase()}
              </div>
              
              <table className="tech-table">
                <thead>
                  <tr>
                    <th style={{ width: '15%' }}>DATA / AULA</th>
                    <th style={{ width: '42.5%' }}>CONHECIMENTOS E CAPACIDADES</th>
                    <th style={{ width: '42.5%' }}>ESTRATÉGIAS DOCENTES E RECURSOS</th>
                  </tr>
                </thead>
                <tbody>
                  {localSchedule.map((entry, idx) => (
                    <tr key={entry.id}>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <div style={{ fontSize: '9pt', marginBottom: '3pt' }}>{entry.date}</div>
                        <div style={{ fontSize: '7.5pt', textTransform: 'capitalize', color: '#666' }}>{getDayOfWeek(entry.date)}</div>
                        <div style={{ fontSize: '7pt', marginTop: '6pt', border: '0.5pt solid #000', padding: '3pt 0' }}>Aula {idx+1} ({entry.hours}h)</div>
                      </td>
                      <td>
                        <div style={{ marginBottom: '8pt' }}>
                          <span className="p-label">Conhecimentos</span>
                          <div style={{ fontWeight: 'bold', fontSize: '8.5pt' }}>{entry.knowledge}</div>
                        </div>
                        <div>
                          <span className="p-label">Capacidades e Habilidades</span>
                          <div style={{ fontSize: '8.5pt' }}>{entry.capacities}</div>
                        </div>
                      </td>
                      <td>
                        <div style={{ marginBottom: '8pt' }}>
                          <span className="p-label">Estratégia Docente</span>
                          <div style={{ fontSize: '8.5pt' }}>{entry.strategy}</div>
                        </div>
                        <div>
                          <span className="p-label">Recursos e Ambiente</span>
                          <div style={{ fontSize: '7.5pt', fontStyle: 'italic', color: '#666' }}>{entry.resources}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '25pt', fontSize: '7pt', color: '#000', textAlign: 'right', borderTop: '0.5pt solid #000', paddingTop: '5pt' }}>
                Relatório Gerado Eletronicamente pelo Sistema de Planejamento SENAI - {new Date().toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        )}

        {/* TABS: SITUAÇÕES DE APRENDIZAGEM */}
        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end mb-10 no-print">
              <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-900 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                Imprimir Situações
              </button>
            </div>
            <div className="no-print space-y-12">
              {unit.learningSituations.map((sa) => (
                <div key={sa.id} className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase">{sa.title}</h3>
                  <div className="space-y-6">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contextualização</p><p className="text-slate-600 text-sm leading-relaxed">{sa.context}</p></div>
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white"><p className="text-[10px] font-black text-red-500 uppercase mb-3">Desafio Proposto</p><p className="text-slate-300 text-sm italic">"{sa.challenge}"</p></div>
                  </div>
                </div>
              ))}
            </div>
            {/* RELATÓRIO IMPRESSÃO SA */}
            <div className="hidden report-document">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>Mecânico de Usinagem Convencional</h1>
                  <p>Relatório de Situações de Aprendizagem</p>
                </div>
              </div>
              <h2 className="doc-main-title">Situações de Aprendizagem - {unit.name}</h2>
              {unit.learningSituations.map((sa) => (
                <div key={sa.id} style={{ border: '1.5pt solid black', marginBottom: '15pt', pageBreakInside: 'avoid' }}>
                  <div style={{ background: '#000', color: '#fff', padding: '8pt 12pt', fontWeight: '900', fontSize: '10pt', textTransform: 'uppercase' }}>{sa.title}</div>
                  <div style={{ padding: '12pt' }}>
                    <span className="p-label">Contextualização Profissional</span>
                    <p style={{ fontSize: '9pt', textAlign: 'justify', marginBottom: '10pt', color: '#000' }}>{sa.context}</p>
                    <div style={{ background: '#f8f8f8', padding: '10pt', border: '1pt dashed #000' }}>
                      <span className="p-label">Desafio Técnico</span>
                      <p style={{ fontSize: '9.5pt', fontWeight: 'bold', fontStyle: 'italic', color: '#000' }}>{sa.challenge}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OUTROS TABS (WEB ONLY) */}
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-print">
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

        {activeTab === 'rubricas' && (
          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-2 no-print">
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

        {activeTab === 'calendario' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
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
                  <div className="bg-slate-900 text-white py-2 px-4 rounded-xl text-center shadow-lg">
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
                          <div key={day} className={`p-1 h-10 md:h-12 flex items-center justify-center text-[10px] font-black border-b border-r border-slate-50`} style={{ backgroundColor: hasClass ? COLOR_MAP[scheduleColor] : 'transparent', color: hasClass ? TEXT_COLOR_MAP[scheduleColor] : (isSunday ? '#ef4444' : '#1e293b') }}>
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
