
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
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn printable-unit-module" data-active-tab={activeTab}>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 1.2cm 1.0cm !important;
          }

          /* GARANTE QUE O CONTEÚDO NÃO SEJA CORTADO */
          html, body, #root, main, .printable-unit-module, .content-area, .max-w-4xl {
            display: block !important;
            height: auto !important;
            overflow: visible !important;
            position: static !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            max-height: none !important;
          }

          aside, header, nav, .tabs-header, .no-print, button {
            display: none !important;
          }

          .report-document, .report-document-sa {
            display: none !important;
          }
          [data-active-tab="cronograma"] .report-document { display: block !important; }
          [data-active-tab="sa"] .report-document-sa { display: block !important; }

          /* CABEÇALHO SENAI */
          .report-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 2pt solid #E30613 !important;
            padding-bottom: 8pt !important;
            margin-bottom: 12pt !important;
          }
          .logo-box {
            background: #E30613 !important;
            color: white !important;
            padding: 10pt 20pt !important;
            font-size: 24pt !important;
            font-weight: 900 !important;
            font-style: italic !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .info-box { text-align: right !important; color: #000 !important; }
          .info-box h1 { font-size: 10pt !important; font-weight: 900 !important; margin: 0 !important; text-transform: uppercase !important; }
          .info-box p { font-size: 8pt !important; margin: 2pt 0 0 0 !important; font-weight: bold !important; }

          .doc-main-title { 
            text-align: center !important; 
            font-weight: 900 !important; 
            font-size: 15pt !important; 
            text-transform: uppercase !important; 
            margin: 15pt 0 !important; 
            border-bottom: 1pt solid #000 !important; 
            padding-bottom: 6pt !important;
            color: #000 !important;
          }

          /* FORMATAÇÃO CRONOGRAMA */
          .tech-table { width: 100% !important; border-collapse: collapse !important; margin-top: 10pt !important; }
          .tech-table th { background: #f8fafc !important; color: #64748b !important; font-size: 7.5pt !important; font-weight: 900 !important; text-transform: uppercase !important; padding: 8pt !important; border: 0.5pt solid #e2e8f0 !important; text-align: left !important; -webkit-print-color-adjust: exact; }
          .tech-table td { padding: 10pt !important; border: 0.5pt solid #e2e8f0 !important; font-size: 9pt !important; vertical-align: top !important; color: #1e293b !important; }
          
          .p-label {
            display: block !important;
            font-size: 7.5pt !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            color: #E30613 !important;
            margin-bottom: 4pt !important;
          }

          /* FORMATAÇÃO SITUAÇÃO DE APRENDIZAGEM (SA) */
          .sa-print-block {
            margin-bottom: 25pt !important;
            page-break-inside: auto !important;
            display: block !important;
          }
          
          /* FORÇA A SA2 (PROJETO OFICINA LIMPA) PARA A PÁGINA 2 */
          .sa-print-block:nth-child(2), .force-next-page {
            page-break-before: always !important;
            break-before: page !important;
            margin-top: 20pt !important;
          }

          .sa-print-title {
            font-weight: 900 !important;
            font-size: 12.5pt !important;
            border-bottom: 2.5pt solid #E30613 !important;
            margin-bottom: 15pt !important;
            padding: 8pt 0 !important;
            text-transform: uppercase !important;
            color: #000 !important;
          }
          .sa-print-section {
            margin-bottom: 12pt !important;
            border: 0.5pt solid #000 !important;
            padding: 12pt !important;
            page-break-inside: avoid !important; /* Evita que uma seção se quebre ao meio se possível */
          }
          .sa-print-section-title {
            font-weight: 900 !important;
            font-size: 9pt !important;
            text-transform: uppercase !important;
            color: #E30613 !important;
            margin-bottom: 8pt !important;
          }
          .sa-print-text {
            font-size: 10pt !important;
            line-height: 1.5 !important;
            color: #000 !important;
            text-align: justify !important;
          }
          .sa-print-results {
            padding-left: 15pt !important;
            margin-top: 5pt !important;
          }
          .sa-print-results li {
            font-size: 10pt !important;
            margin-bottom: 5pt !important;
            list-style-type: decimal !important;
            color: #000 !important;
          }
        }
      `}</style>

      {/* VISÃO WEB - INALTERADA */}
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
        
        {activeTab === 'cronograma' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8 no-print">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Plano de Aula</h3>
              <div className="flex gap-4">
                <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-900 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  Imprimir Cronograma
                </button>
                <button onClick={handleResetToTemplate} className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-[8px] font-black uppercase hover:bg-slate-200">Restaurar Padrão</button>
              </div>
            </div>

            {/* TABELAS WEB */}
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

            {/* DOCUMENTO IMPRESSO CRONOGRAMA */}
            <div className="hidden report-document">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>Mecânico de Usinagem Convencional</h1>
                  <p>Plano de Aula e Cronograma - Sistema MSEP</p>
                </div>
              </div>
              
              <h2 className="doc-main-title">Cronograma de Atividades Pedagógicas</h2>
              <div style={{ marginBottom: '10pt', fontSize: '11pt', fontStyle: 'italic', color: '#64748b' }}>
                Unidade Curricular: <strong>{unit.name.toUpperCase()}</strong>
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
                      <td style={{ textAlign: 'center', background: '#f8fafc' }}>
                        <div style={{ fontWeight: '900', fontSize: '10pt', color: '#005DAA' }}>{entry.date}</div>
                        <div style={{ fontSize: '8pt', textTransform: 'capitalize', color: '#64748b', marginTop: '2pt' }}>{getDayOfWeek(entry.date)}</div>
                        <div style={{ fontSize: '7pt', marginTop: '10pt', fontWeight: '900', background: '#1e293b', color: 'white', padding: '2pt 4pt', borderRadius: '4pt' }}>Aula {idx+1} ({entry.hours}h)</div>
                      </td>
                      <td>
                        <div style={{ marginBottom: '10pt' }}>
                          <span className="p-label">Conhecimentos</span>
                          <div style={{ fontWeight: '700', fontSize: '9pt' }}>{entry.knowledge}</div>
                        </div>
                        <div>
                          <span className="p-label">Capacidades e Habilidades</span>
                          <div style={{ fontSize: '9pt' }}>{entry.capacities}</div>
                        </div>
                      </td>
                      <td>
                        <div style={{ marginBottom: '10pt' }}>
                          <span className="p-label">Estratégia Docente</span>
                          <div style={{ fontSize: '9pt' }}>{entry.strategy}</div>
                        </div>
                        <div>
                          <span className="p-label">Recursos e Ambiente</span>
                          <div style={{ fontSize: '8pt', fontStyle: 'italic', color: '#64748b' }}>{entry.resources}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8 mb-10 no-print">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Situações de Aprendizagem</h3>
              <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-900 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                Imprimir Situações
              </button>
            </div>

            <div className="space-y-12 pb-10 no-print">
              {unit.learningSituations.map((sa) => (
                <div key={sa.id} className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden transition-all hover:border-blue-200">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none italic">{sa.title}</h3>
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
                            <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black transition-all group-hover:bg-blue-600 group-hover:text-white">{rIdx + 1}</span>
                            <p className="text-slate-600 text-sm font-bold leading-tight pt-0.5">{result}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DOCUMENTO IMPRESSO SITUAÇÕES DE APRENDIZAGEM (CORRIGIDO) */}
            <div className="hidden report-document-sa">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>Mecânico de Usinagem Convencional</h1>
                  <p>Guia de Situações de Aprendizagem - Sistema MSEP</p>
                </div>
              </div>
              
              <h2 className="doc-main-title">Situações de Aprendizagem</h2>
              <div style={{ marginBottom: '15pt', fontSize: '11pt', fontWeight: 'bold', color: '#1e293b' }}>
                Unidade Curricular: {unit.name.toUpperCase()}
              </div>

              {unit.learningSituations.map((sa, sIdx) => (
                <div key={sa.id} className="sa-print-block">
                  <div className="sa-print-title">{sa.title}</div>
                  
                  <div className="sa-print-section">
                    <div className="sa-print-section-title">I. Contextualização / Situação-Problema</div>
                    <div className="sa-print-text">{sa.context}</div>
                  </div>

                  <div className="sa-print-section" style={{ background: '#f8fafc' }}>
                    <div className="sa-print-section-title">II. Desafio Proposto</div>
                    <div className="sa-print-text" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{sa.challenge}</div>
                  </div>

                  <div className="sa-print-section">
                    <div className="sa-print-section-title">III. Resultados Esperados / Entregas</div>
                    <ul className="sa-print-results">
                      {sa.expectedResults.map((result, rIdx) => (
                        <li key={rIdx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '30pt', fontSize: '9pt', color: '#94a3b8', textAlign: 'right', fontStyle: 'italic' }}>
                Relatório Pedagógico SENAI - Gerado em {new Date().toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        )}

        {/* OUTROS MENUS - SEM ALTERAÇÕES */}
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-print">
            <section>
              <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Capacidades Técnicas</h3>
              <div className="space-y-3">
                {unit.basicCapacities.map((c, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-bold text-sm text-slate-700 flex gap-4 transition-all hover:bg-blue-50">
                    <span className="text-blue-500 font-black shrink-0">{i+1}.</span>{c}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Conhecimentos</h3>
              <div className="space-y-4">
                {unit.knowledge.map((k, i) => (
                  <div key={i} className="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl shadow-sm transition-all hover:bg-white">
                    <p className="font-black text-slate-900 text-xs uppercase mb-2 tracking-tight">{k.topic}</p>
                    <div className="space-y-1.5">
                      {k.subtopics.map((s, si) => <p key={si} className="text-slate-500 text-[10px] font-medium leading-tight">• {s}</p>)}
                    </div>
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
