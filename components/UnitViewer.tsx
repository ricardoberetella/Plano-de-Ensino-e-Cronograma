import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from '../types';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
}

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);

  useEffect(() => { setLocalSchedule(unit.schedule); }, [unit.schedule]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden printable-unit-module" data-active-tab={activeTab}>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 1.5cm !important;
          }

          /* Reset de estrutura para evitar cortes */
          html, body {
            height: auto !important;
            overflow: visible !important;
          }

          .no-print, button, nav, header, .tabs-header {
            display: none !important;
          }

          .printable-unit-module {
            display: block !important;
            border: none !important;
            box-shadow: none !important;
          }

          .report-document-sa {
            display: block !important;
            visibility: visible !important;
          }

          /* Cabeçalho SENAI */
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
            padding: 10pt 20pt !important;
            font-size: 20pt !important;
            font-weight: 900 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .info-box { text-align: right !important; }
          .info-box h1 { font-size: 10pt !important; font-weight: 900 !important; margin: 0 !important; text-transform: uppercase !important; }
          .info-box p { font-size: 8pt !important; margin: 2pt 0 0 0 !important; font-weight: bold !important; }

          /* Título Principal */
          .doc-main-title { 
            text-align: center !important; 
            font-weight: 900 !important; 
            font-size: 16pt !important; 
            text-transform: uppercase !important; 
            margin: 15pt 0 !important; 
            border-bottom: 1.5pt solid #000 !important; 
            padding-bottom: 8pt !important;
          }

          /* --- CONTROLE DE PÁGINAS --- */
          
          /* Cada bloco de SA terá sua própria lógica de quebra */
          .sa-print-block {
            display: block !important;
            width: 100% !important;
            margin-bottom: 20pt !important;
          }

          /* SA2 (segundo bloco) sempre começa em nova página */
          .sa-print-block:nth-of-type(2) {
            page-break-before: always !important;
            break-before: page !important;
            margin-top: 2cm !important;
          }

          .sa-print-title {
            font-weight: 900 !important;
            font-size: 13pt !important;
            border-bottom: 2pt solid #E30613 !important;
            margin-bottom: 12pt !important;
            padding: 6pt 0 !important;
            text-transform: uppercase !important;
          }

          .sa-print-section {
            margin-bottom: 12pt !important;
            border: 0.8pt solid #000 !important;
            padding: 12pt !important;
            page-break-inside: avoid !important; /* Evita cortar o quadro ao meio */
          }

          .sa-print-section-title {
            font-weight: 900 !important;
            font-size: 9pt !important;
            text-transform: uppercase !important;
            color: #E30613 !important;
            margin-bottom: 6pt !important;
          }

          .sa-print-text {
            font-size: 10.5pt !important;
            line-height: 1.4 !important;
            text-align: justify !important;
            color: #000 !important;
          }

          .sa-print-results {
            padding-left: 20pt !important;
            margin-top: 5pt !important;
          }
          .sa-print-results li {
            font-size: 10.5pt !important;
            margin-bottom: 5pt !important;
            list-style-type: decimal !important;
          }
        }
      `}</style>

      {/* Navegação Web */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div>
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{unit.name}</h2>
        </div>
        <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-red-700 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Imprimir Situações (2 Páginas)
        </button>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50 no-print tabs-header">
        {(['geral', 'sa', 'cronograma'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-5 transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 bg-white' : 'border-transparent text-slate-400'}`}>
            <span className="text-[10px] font-black uppercase tracking-widest">{tab === 'sa' ? 'Situação-Problema' : tab}</span>
          </button>
        ))}
      </div>

      <div className="p-10 bg-[#FDFDFD]">
        {/* DOCUMENTO DE IMPRESSÃO - FORMATADO PARA 2 PÁGINAS */}
        <div className="report-document-sa">
          {unit.learningSituations.map((sa, index) => (
            <div key={sa.id} className="sa-print-block">
              {/* Repetir o cabeçalho em cada página para manter o padrão SENAI */}
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>Mecânico de Usinagem Convencional</h1>
                  <p>Guia de Situações de Aprendizagem - Sistema MSEP</p>
                </div>
              </div>

              <h2 className="doc-main-title">Situação de Aprendizagem {index + 1}</h2>
              <div style={{ marginBottom: '15pt', fontSize: '11pt', fontWeight: 'bold' }}>
                Unidade Curricular: {unit.name.toUpperCase()}
              </div>

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

              <div className="no-print-screen" style={{ marginTop: '20pt', fontSize: '8pt', textAlign: 'right', fontStyle: 'italic', color: '#666' }}>
                Documento Pedagógico SENAI - Página {index + 1} de 2
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitViewer;
