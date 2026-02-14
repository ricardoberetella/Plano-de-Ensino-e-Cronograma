import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from '../types';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from '../constants';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void;
  onUpdateUnit?: (updatedUnit: CurricularUnit) => void;
}

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);

  const isFUSI = unit.id.toLowerCase().includes('fusi') || unit.name.toLowerCase().includes('usinagem');

  useEffect(() => { setLocalSchedule(unit.schedule); }, [unit.schedule]);

  const handlePrint = () => {
    window.print();
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

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn printable-unit-module" data-active-tab={activeTab}>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 1cm 1.2cm !important;
          }

          html, body {
            height: auto !important;
            overflow: visible !important;
          }

          aside, header, nav, .tabs-header, .no-print, button {
            display: none !important;
          }

          .printable-unit-module {
            box-shadow: none !important;
            border: none !important;
            display: block !important;
          }

          /* Controlar visibilidade */
          .report-document-sa { display: block !important; visibility: visible !important; }

          /* Cabeçalho Compacto */
          .report-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 2pt solid #E30613 !important;
            padding-bottom: 5pt !important;
            margin-bottom: 10pt !important;
          }
          .logo-box {
            background: #E30613 !important;
            color: white !important;
            padding: 5pt 15pt !important;
            font-size: 18pt !important;
            font-weight: 900 !important;
            -webkit-print-color-adjust: exact;
          }
          .info-box h1 { font-size: 9pt !important; font-weight: 900 !important; margin: 0 !important; }
          .info-box p { font-size: 7pt !important; margin: 0 !important; }

          .doc-main-title { 
            text-align: center !important; 
            font-weight: 900 !important; 
            font-size: 14pt !important; 
            margin: 10pt 0 !important; 
            border-bottom: 1pt solid #000 !important; 
            padding-bottom: 5pt !important;
          }

          /* Ajuste para caber em 2 páginas */
          .sa-print-block {
            page-break-inside: avoid !important;
            margin-bottom: 15pt !important;
            border-bottom: 0.5pt dashed #ccc !important;
            padding-bottom: 10pt !important;
          }

          .sa-print-title {
            font-weight: 900 !important;
            font-size: 11pt !important;
            color: #E30613 !important;
            margin-bottom: 5pt !important;
            text-transform: uppercase !important;
          }

          .sa-print-section {
            margin-bottom: 8pt !important;
            border: 0.5pt solid #000 !important;
            padding: 8pt !important;
          }

          .sa-print-section-title {
            font-weight: 900 !important;
            font-size: 8pt !important;
            text-transform: uppercase !important;
            margin-bottom: 4pt !important;
          }

          .sa-print-text {
            font-size: 9pt !important;
            line-height: 1.3 !important;
            text-align: justify !important;
          }

          .sa-print-results {
            margin-top: 5pt !important;
            padding-left: 15pt !important;
          }
          .sa-print-results li {
            font-size: 9pt !important;
            margin-bottom: 2pt !important;
          }

          /* Rodapé na última página */
          .print-footer {
            margin-top: 10pt;
            font-size: 7pt !important;
            text-align: right;
            color: #666;
          }
        }
      `}</style>

      {/* WEB VIEW HEADER */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div>
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{unit.name}</h2>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto no-print tabs-header">
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

      <div className="p-6 md:p-10 bg-[#FDFDFD] content-area">
        
        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8 mb-10 no-print">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Situações de Aprendizagem</h3>
              <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                Imprimir Documento
              </button>
            </div>

            {/* WEB PREVIEW */}
            <div className="space-y-8 no-print">
              {unit.learningSituations.map((sa) => (
                <div key={sa.id} className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-md">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase italic">{sa.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{sa.context}</p>
                  <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-red-500 mb-4">
                    <p className="text-sm italic font-bold">"{sa.challenge}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* DOCUMENTO DE IMPRESSÃO (O QUE SERÁ IMPRESSO) */}
            <div className="hidden report-document-sa">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>Mecânico de Usinagem Convencional</h1>
                  <p>Guia de Situações de Aprendizagem - Sistema MSEP</p>
                </div>
              </div>
              
              <h2 className="doc-main-title">Situações de Aprendizagem</h2>
              <div style={{ marginBottom: '10pt', fontSize: '10pt', fontWeight: 'bold' }}>
                Unidade Curricular: {unit.name.toUpperCase()}
              </div>

              {unit.learningSituations.map((sa) => (
                <div key={sa.id} className="sa-print-block">
                  <div className="sa-print-title">{sa.title}</div>
                  
                  <div className="sa-print-section">
                    <div className="sa-print-section-title">I. Contextualização / Situação-Problema</div>
                    <div className="sa-print-text">{sa.context}</div>
                  </div>

                  <div className="sa-print-section" style={{ background: '#fcfcfc' }}>
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
              
              <div className="print-footer">
                Documento Pedagógico Oficial SENAI - Gerado em {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        )}

        {/* Mantenha os outros menus (Geral, Cronograma) conforme necessário */}
      </div>
    </div>
  );
};

export default UnitViewer;
