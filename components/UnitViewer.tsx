import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarColor } from '../types';

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

// Componente para Inputs simples
const DebouncedInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, placeholder, className }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleBlur = () => {
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
    />
  );
};

// Componente isolado para Textareas dinâmicas
const EditableArea: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}> = ({ value, onChange, placeholder, className, rows = 1 }) => {
  const [val, setVal] = useState(value || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setVal(value || '');
  }, [value]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [val]);

  const handleBlur = () => {
    if (val !== value) {
      onChange(val);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      rows={rows}
      className={`resize-none overflow-hidden block w-full ${className || ''}`}
    />
  );
};

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit?.schedule || []);
  const [localUnit, setLocalUnit] = useState<CurricularUnit>(unit);

  useEffect(() => {
    setLocalSchedule(unit?.schedule || []);
  }, [unit?.schedule]);

  useEffect(() => {
    setLocalUnit(unit);
  }, [unit]);

  const updateUnitState = (newUnit: CurricularUnit) => {
    setLocalUnit(newUnit);
    onUpdateUnit?.(newUnit);
  };

  const isCRD = localUnit?.id?.toLowerCase().includes('crd') || localUnit?.name?.toLowerCase().includes('dimensional');
  const isFUSI = localUnit?.id?.toLowerCase().includes('fusi') || localUnit?.name?.toLowerCase().includes('usinagem');
  const scheduleColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');

  const calendar = useMemo(() => localUnit?.calendar || {
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    markings: []
  }, [localUnit?.calendar]);

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

  const addScheduleEntry = (index?: number) => {
    const newEntry: ScheduleEntry = {
      id: `sched-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      hours: 4,
      capacities: '',
      knowledges: '',
      strategies: '',
      resources: ''
    };

    const updated = [...localSchedule];
    if (index !== undefined && index >= 0) {
      updated.splice(index + 1, 0, newEntry);
    } else {
      updated.push(newEntry);
    }

    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const removeScheduleEntry = (id: string) => {
    if (localSchedule.length <= 1) {
      alert("O cronograma precisa ter ao menos uma linha.");
      return;
    }
    if (window.confirm("Tem certeza que deseja excluir esta linha do cronograma?")) {
      const updated = localSchedule.filter(entry => entry.id !== id);
      setLocalSchedule(updated);
      onUpdateSchedule?.(updated);
    }
  };

  const updateGeneralFieldList = (field: 'technicalCapacities' | 'socialCapacities' | 'knowledges', index: number, value: string) => {
    const currentList = localUnit[field] ? [...localUnit[field]!] : [];
    currentList[index] = value;
    updateUnitState({ ...localUnit, [field]: currentList });
  };

  const addGeneralFieldItem = (field: 'technicalCapacities' | 'socialCapacities' | 'knowledges') => {
    const currentList = localUnit[field] ? [...localUnit[field]!] : [];
    currentList.push('');
    updateUnitState({ ...localUnit, [field]: currentList });
  };

  const removeGeneralFieldItem = (field: 'technicalCapacities' | 'socialCapacities' | 'knowledges', index: number) => {
    const currentList = localUnit[field] ? [...localUnit[field]!] : [];
    currentList.splice(index, 1);
    updateUnitState({ ...localUnit, [field]: currentList });
  };

  const updateSAField = (saIndex: number, field: string, value: any) => {
    const updatedSAs = [...(localUnit.learningSituations || [])];
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], [field]: value };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const addLearningSituation = () => {
    const newSA = {
      id: `sa-${Date.now()}`,
      title: `Situação de Aprendizagem ${(localUnit.learningSituations || []).length + 1}`,
      context: '',
      challenge: '',
      expectedResults: ['']
    };
    updateUnitState({ ...localUnit, learningSituations: [...(localUnit.learningSituations || []), newSA] });
  };

  const removeLearningSituation = (saIndex: number) => {
    if (confirm("Tem certeza que deseja remover esta Situação de Aprendizagem na íntegra?")) {
      const updatedSAs = [...(localUnit.learningSituations || [])];
      updatedSAs.splice(saIndex, 1);
      updateUnitState({ ...localUnit, learningSituations: updatedSAs });
    }
  };

  const updateSAResult = (saIndex: number, resultIndex: number, value: string) => {
    const updatedSAs = [...(localUnit.learningSituations || [])];
    const results = [...(updatedSAs[saIndex].expectedResults || [])];
    results[resultIndex] = value;
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], expectedResults: results };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const addSAResult = (saIndex: number) => {
    const updatedSAs = [...(localUnit.learningSituations || [])];
    const results = [...(updatedSAs[saIndex].expectedResults || []), ''];
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], expectedResults: results };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const removeSAResult = (saIndex: number, resultIndex: number) => {
    const updatedSAs = [...(localUnit.learningSituations || [])];
    const results = [...(updatedSAs[saIndex].expectedResults || [])];
    results.splice(resultIndex, 1);
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], expectedResults: results };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const updateRubric = (index: number, field: string, value: string) => {
    const updatedRubrics = [...(localUnit.rubrics || [])];
    updatedRubrics[index] = { ...updatedRubrics[index], [field]: value } as any;
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
  };

  const addRubric = () => {
    const newRubric = {
      id: `rubric-${Date.now()}`,
      capacity: '',
      nsa: '',
      apo: '',
      par: '',
      aut: ''
    } as any;

    updateUnitState({
      ...localUnit,
      rubrics: [...(localUnit.rubrics || []), newRubric]
    });
  };

  const removeRubric = (index: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta rubrica?')) return;

    const updatedRubrics = [...(localUnit.rubrics || [])];
    updatedRubrics.splice(index, 1);
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
  };

  const handlePrint = () => {
    window.print();
  };

  const scheduleDates = useMemo(() => {
    const dates: Record<string, boolean> = {};
    (localSchedule || []).forEach(s => {
      if (s && s.date) {
        const parts = s.date.split('/');
        if (parts.length === 3) {
          dates[`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`] = true;
        }
      }
    });
    return dates;
  }, [localSchedule]);

  const monthsInRange = useMemo(() => {
    let minDateStr = calendar?.startDate || '2026-01-01';
    let maxDateStr = calendar?.endDate || '2026-06-30';

    if (localSchedule && localSchedule.length > 0) {
      const parsedDates = localSchedule.map(s => {
        if (!s || !s.date) return null;
        const parts = s.date.split('/');
        if (parts.length === 3) {
          return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        }
        return null;
      }).filter(d => d !== null && !isNaN(d.getTime())) as Date[];

      if (parsedDates.length > 0) {
        const minYear = Math.min(...parsedDates.map(d => d.getFullYear()));
        const maxYear = Math.max(...parsedDates.map(d => d.getFullYear()));
        const hasSecondSemester = parsedDates.some(d => d.getMonth() >= 6);
        const hasFirstSemester = parsedDates.some(d => d.getMonth() < 6);

        if (hasSecondSemester && !hasFirstSemester) {
          minDateStr = `${minYear}-07-01`;
          maxDateStr = `${maxYear}-12-31`;
        } else if (hasFirstSemester && !hasSecondSemester) {
          minDateStr = `${minYear}-01-01`;
          maxDateStr = `${minYear}-06-30`;
        }
      }
    }

    const start = new Date(minDateStr + 'T00:00:00');
    const end = new Date(maxDateStr + 'T00:00:00');
    const months: string[] = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      months.push(current.toISOString().substring(0, 7));
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  }, [localSchedule, calendar?.startDate, calendar?.endDate]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn printable-unit-module" data-active-tab={activeTab}>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 1.0cm !important; }
          aside, header, nav, .tabs-header, .no-print, button { display: none !important; }
          html, body, #root, main, .printable-unit-module, .content-area { display: block !important; height: auto !important; overflow: visible !important; background: white !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; position: static !important; }
          .report-document, .report-document-sa { display: none !important; }
          [data-active-tab="cronograma"] .report-document { display: block !important; }
          [data-active-tab="sa"] .report-document-sa { display: block !important; }
          .report-header { display: flex !important; justify-content: space-between !important; align-items: center !important; border-bottom: 2pt solid #E30613 !important; padding-bottom: 10pt !important; margin-bottom: 15pt !important; }
          .logo-box { background: #E30613 !important; color: white !important; padding: 10pt 20pt !important; font-size: 24pt !important; font-weight: 900 !important; font-style: italic !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .info-box { text-align: right !important; color: #000 !important; }
          .info-box h1 { font-size: 10pt !important; font-weight: 900 !important; margin: 0 !important; text-transform: uppercase !important; }
          .info-box p { font-size: 8pt !important; margin: 2pt 0 0 0 !important; font-weight: bold !important; }
          .doc-main-title { text-align: center !important; font-weight: 900 !important; font-size: 14pt !important; text-transform: uppercase !important; margin: 15pt 0 !important; border-bottom: 1pt solid #000 !important; padding-bottom: 5pt !important; color: #000 !important; }
          .tech-table { width: 100% !important; border-collapse: collapse !important; margin-top: 10pt !important; }
          .tech-table th { background: #f8fafc !important; color: #64748b !important; font-size: 7pt !important; font-weight: 900 !important; text-transform: uppercase !important; padding: 8pt !important; border: 0.5pt solid #e2e8f0 !important; text-align: left !important; -webkit-print-color-adjust: exact; }
          .tech-table td { padding: 10pt !important; border: 0.5pt solid #e2e8f0 !important; font-size: 8.5pt !important; vertical-align: top !important; color: #1e293b !important; }
        }
      `}</style>

      {/* HEADER DA UNIDADE */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div className="w-full">
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <DebouncedInput
            value={localUnit?.name || ''}
            onChange={(val) => updateUnitState({ ...localUnit, name: val })}
            className="text-3xl font-black tracking-tighter uppercase leading-none bg-transparent text-white border-b border-transparent hover:border-slate-700 focus:border-blue-500 outline-none w-full transition-all"
          />
        </div>
      </div>

      {/* TABS DE NAVEGAÇÃO */}
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

        {/* ABA GERAL EM COLUNAS */}
        {activeTab === 'geral' && (
          <div className="space-y-10 max-w-7xl mx-auto">
            <div className="border-b border-slate-100 pb-6">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Geral & Matriz Pedagógica</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Gerais da Unidade Curricular Organizadas em Colunas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* COLUNA 1: CAPACIDADES TÉCNICAS */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg space-y-4 flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-blue-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
                    Capacidades Técnicas
                  </h4>
                  <button onClick={() => addGeneralFieldItem('technicalCapacities')} className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">
                    + Item
                  </button>
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit?.technicalCapacities || []).map((cap, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <EditableArea
                        value={cap}
                        onChange={(val) => updateGeneralFieldList('technicalCapacities', idx, val)}
                        placeholder="Descreva a capacidade técnica..."
                        rows={1}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <button onClick={() => removeGeneralFieldItem('technicalCapacities', idx)} className="text-slate-300 hover:text-red-500 text-xs font-bold transition-all p-1">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUNA 2: CAPACIDADES SOCIOEMOCIONAIS */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg space-y-4 flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-purple-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-purple-600 rounded-full inline-block"></span>
                    Socioemocionais
                  </h4>
                  <button onClick={() => addGeneralFieldItem('socialCapacities')} className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-purple-600 hover:text-white transition-all">
                    + Item
                  </button>
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit?.socialCapacities || []).map((cap, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <EditableArea
                        value={cap}
                        onChange={(val) => updateGeneralFieldList('socialCapacities', idx, val)}
                        placeholder="Descreva a capacidade socioemocional..."
                        rows={1}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <button onClick={() => removeGeneralFieldItem('socialCapacities', idx)} className="text-slate-300 hover:text-red-500 text-xs font-bold transition-all p-1">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUNA 3: CONHECIMENTOS */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg space-y-4 flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-orange-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-orange-600 rounded-full inline-block"></span>
                    Conhecimentos
                  </h4>
                  <button onClick={() => addGeneralFieldItem('knowledges')} className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-orange-600 hover:text-white transition-all">
                    + Item
                  </button>
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit?.knowledges || []).map((know, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <EditableArea
                        value={know}
                        onChange={(val) => updateGeneralFieldList('knowledges', idx, val)}
                        placeholder="Descreva o conhecimento..."
                        rows={1}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <button onClick={() => removeGeneralFieldItem('knowledges', idx)} className="text-slate-300 hover:text-red-500 text-xs font-bold transition-all p-1">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA SITUAÇÃO-PROBLEMA */}
        {activeTab === 'sa' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center gap-6 border-b border-slate-100 pb-8 no-print">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Situações de Aprendizagem / Fases</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Gestão e detalhamento das Fases e Projetos da Unidade</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={addLearningSituation} className="bg-blue-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-900 transition-all">
                  + Nova Fase / SA
                </button>
                <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-900 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  Imprimir Situações
                </button>
              </div>
            </div>

            <div className="space-y-12 pb-10 no-print">
              {(localUnit?.learningSituations || []).map((sa, saIdx) => (
                <div key={sa?.id || saIdx} className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden transition-all hover:border-blue-200">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1">FASE / ETAPA {saIdx + 1}</span>
                      <DebouncedInput
                        value={sa?.title || ''}
                        onChange={(val) => updateSAField(saIdx, 'title', val)}
                        placeholder="Título da Situação de Aprendizagem / Fase..."
                        className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none italic w-full bg-transparent border-b border-slate-200 focus:border-blue-500 outline-none pb-2"
                      />
                    </div>
                    <button onClick={() => removeLearningSituation(saIdx)} className="text-slate-300 hover:text-red-600 p-2 text-sm font-black transition-all" title="Excluir Fase">
                      Excluir Fase ✕
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="border-l-2 border-slate-100 pl-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">I. Contextualização / Situação-Problema</p>
                      <EditableArea
                        value={sa?.context || ''}
                        onChange={(val) => updateSAField(saIdx, 'context', val)}
                        rows={2}
                        placeholder="Descreva aqui o contexto ou problema apresentado ao aluno..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-600 text-sm leading-relaxed font-medium focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-lg">
                      <p className="text-[10px] font-black text-red-500 uppercase mb-4 tracking-widest">II. Desafio Proposto</p>
                      <EditableArea
                        value={sa?.challenge || ''}
                        onChange={(val) => updateSAField(saIdx, 'challenge', val)}
                        rows={2}
                        placeholder="Desafio pedagógico do aluno..."
                        className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm italic font-medium leading-relaxed rounded-xl p-3 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="border-t border-slate-100 pt-8">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">III. Resultados Esperados / Entregas da Fase</p>
                        <button onClick={() => addSAResult(saIdx)} className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                          + Adicionar Entrega
                        </button>
                      </div>
                      <ul className="space-y-3">
                        {(sa?.expectedResults || []).map((result, rIdx) => (
                          <li key={rIdx} className="flex gap-3 items-center">
                            <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black">{rIdx + 1}</span>
                            <DebouncedInput
                              value={result || ''}
                              onChange={(val) => updateSAResult(saIdx, rIdx, val)}
                              placeholder="Descreva o resultado ou produto esperado..."
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-700 text-sm font-bold focus:outline-none focus:border-blue-500"
                            />
                            <button onClick={() => removeSAResult(saIdx, rIdx)} className="text-slate-300 hover:text-red-500 p-2 text-xs font-bold transition-all">
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA RUBRICAS */}
        {activeTab === 'rubricas' && (
          <div className="space-y-4 no-print">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addRubric}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md hover:bg-slate-900 transition-all"
              >
                + Incluir Rubrica
              </button>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 overflow-x-auto shadow-sm">
            <table className="w-full min-w-[900px] table-fixed text-left border-collapse border-spacing-0">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-2 w-[19%] text-[9px] font-black uppercase border border-slate-800">Referência / Capacidade</th>
                  <th className="p-2 w-[19%] text-[9px] font-black uppercase border border-slate-800 text-red-400">NSA</th>
                  <th className="p-2 w-[19%] text-[9px] font-black uppercase border border-slate-800 text-orange-400">APO</th>
                  <th className="p-2 w-[19%] text-[9px] font-black uppercase border border-slate-800 text-blue-400">PAR</th>
                  <th className="p-2 w-[19%] text-[9px] font-black uppercase border border-slate-800 text-green-400">AUT</th>
                  <th className="p-2 w-[5%] text-[9px] font-black uppercase border border-slate-800 text-center">Excluir</th>
                </tr>
              </thead>
              <tbody className="text-[10px] font-bold">
                {(localUnit?.rubrics || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-1 border border-slate-200 bg-slate-50/50 align-top h-1">
                      <EditableArea
                        value={row?.capacity || ''}
                        onChange={(val) => updateRubric(i, 'capacity', val)}
                        rows={1}
                        className="bg-transparent border-none outline-none font-bold text-slate-900 text-[10px] leading-tight p-0"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row?.nsa || ''}
                        onChange={(val) => updateRubric(i, 'nsa', val)}
                        rows={1}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-red-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row?.apo || ''}
                        onChange={(val) => updateRubric(i, 'apo', val)}
                        rows={1}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-orange-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row?.par || ''}
                        onChange={(val) => updateRubric(i, 'par', val)}
                        rows={1}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-blue-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row?.aut || ''}
                        onChange={(val) => updateRubric(i, 'aut', val)}
                        rows={1}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-green-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 text-center align-middle">
                      <button
                        type="button"
                        onClick={() => removeRubric(i)}
                        className="text-slate-300 hover:text-red-600 font-bold p-1 transition-all"
                        title="Excluir Rubrica"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}

        {/* ABA CRONOGRAMA / PLANO DE AULA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center no-print">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Plano de Ensino & Cronograma</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Planejamento detalhado das aulas e carga horária</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => addScheduleEntry()} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md hover:bg-slate-900 transition-all">
                  + Incluir Linha
                </button>
                <button onClick={handlePrint} className="bg-red-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  Imprimir Cronograma
                </button>
              </div>
            </div>

            {/* TABELA DE CRONOGRAMA INTERATIVA */}
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 overflow-x-auto shadow-sm no-print">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-wider">
                    <th className="p-3 text-left w-28">Data</th>
                    <th className="p-3 text-center w-16">Horas</th>
                    <th className="p-3 text-left">Capacidades</th>
                    <th className="p-3 text-left">Conhecimentos</th>
                    <th className="p-3 text-left">Estratégias / Metodologia</th>
                    <th className="p-3 text-left">Recursos</th>
                    <th className="p-3 text-center w-20">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100 font-bold">
                  {localSchedule.map((entry, idx) => (
                    <tr key={entry.id || idx} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-2 align-top">
                        <div className="space-y-1">
                          <DebouncedInput
                            value={entry.date}
                            onChange={(val) => updateEntry(entry.id, 'date', val)}
                            placeholder="DD/MM/AAAA"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                          />
                          <span className="text-[9px] text-slate-400 block capitalize font-medium px-1">
                            {getDayOfWeek(entry.date)}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 align-top">
                        <input
                          type="number"
                          value={entry.hours}
                          onChange={(e) => updateEntry(entry.id, 'hours', Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2 align-top">
                        <EditableArea
                          value={entry.capacities}
                          onChange={(val) => updateEntry(entry.id, 'capacities', val)}
                          placeholder="Capacidades..."
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2 align-top">
                        <EditableArea
                          value={entry.knowledges}
                          onChange={(val) => updateEntry(entry.id, 'knowledges', val)}
                          placeholder="Conhecimentos..."
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2 align-top">
                        <EditableArea
                          value={entry.strategies}
                          onChange={(val) => updateEntry(entry.id, 'strategies', val)}
                          placeholder="Estratégias..."
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2 align-top">
                        <EditableArea
                          value={entry.resources}
                          onChange={(val) => updateEntry(entry.id, 'resources', val)}
                          placeholder="Recursos..."
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2 align-middle text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => addScheduleEntry(idx)} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xs font-black" title="Inserir abaixo">+</button>
                          <button onClick={() => removeScheduleEntry(entry.id)} className="w-7 h-7 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-xs font-black" title="Excluir">✕</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DOCUMENTO PARA IMPRESSÃO (CRONOGRAMA) */}
            <div className="hidden report-document bg-white p-8 text-black">
              <div className="report-header">
                <div className="logo-box">SENAI</div>
                <div className="info-box">
                  <h1>PLANO DE ENSINO / CRONOGRAMA</h1>
                  <p>{localUnit?.name}</p>
                </div>
              </div>
              <div className="doc-main-title">CRONOGRAMA DE DESENVOLVIMENTO DA UNIDADE CURRICULAR</div>
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Data / Dia</th>
                    <th>Horas</th>
                    <th>Capacidades</th>
                    <th>Conhecimentos</th>
                    <th>Estratégias / Metodologia</th>
                    <th>Recursos</th>
                  </tr>
                </thead>
                <tbody>
                  {localSchedule.map((entry, i) => (
                    <tr key={i}>
                      <td><strong>{entry.date}</strong><br/><span style={{fontSize:'7.5pt', color:'#666'}}>{getDayOfWeek(entry.date)}</span></td>
                      <td style={{textAlign:'center'}}>{entry.hours}h</td>
                      <td>{entry.capacities}</td>
                      <td>{entry.knowledges}</td>
                      <td>{entry.strategies}</td>
                      <td>{entry.resources}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <div className="space-y-8 no-print">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Calendário de Aulas</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Sincronização automática com as datas do cronograma</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: COLOR_MAP[scheduleColor] }}></span>
                <span className="text-xs font-black uppercase text-slate-700">Aulas Marcadas no Cronograma</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthsInRange.map(monthStr => {
                const [year, month] = monthStr.split('-').map(Number);
                const firstDay = new Date(year, month - 1, 1);
                const lastDay = new Date(year, month, 0);
                const daysInMonth = lastDay.getDate();
                const startingDayOfWeek = firstDay.getDay();
                const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(firstDay);

                const days = [];
                for (let i = 0; i < startingDayOfWeek; i++) {
                  days.push(null);
                }
                for (let d = 1; d <= daysInMonth; d++) {
                  days.push(new Date(year, month - 1, d));
                }

                return (
                  <div key={monthStr} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h4 className="text-sm font-black uppercase text-slate-900 mb-4 capitalize text-center">{monthName}</h4>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                        <span key={i} className="text-[9px] font-black text-slate-400">{d}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {days.map((dateObj, idx) => {
                        if (!dateObj) return <div key={idx} />;
                        const dateString = dateObj.toISOString().substring(0, 10);
                        const isScheduled = scheduleDates[dateString];

                        return (
                          <div
                            key={idx}
                            className={`h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                              isScheduled
                                ? 'shadow-md scale-105'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                            style={{
                              backgroundColor: isScheduled ? COLOR_MAP[scheduleColor] : 'transparent',
                              color: isScheduled ? TEXT_COLOR_MAP[scheduleColor] : undefined
                            }}
                            title={dateString}
                          >
                            {dateObj.getDate()}
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
