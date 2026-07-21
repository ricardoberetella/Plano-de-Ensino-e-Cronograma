import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarColor } from '../types';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void;
  onUpdateUnit?: (updatedUnit: CurricularUnit) => void;
  isAdmin?: boolean;
}

const COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#fbbf24', green: '#22c55e', blue: '#3b82f6', red: '#ef4444', cyan: '#06b6d4', orange: '#f97316', purple: '#a855f7', pink: '#ec4899', white: '#ffffff', none: 'transparent'
};

const TEXT_COLOR_MAP: Record<CalendarColor, string> = {
  yellow: '#0f172a', green: '#ffffff', blue: '#ffffff', red: '#ffffff', cyan: '#ffffff', orange: '#ffffff', purple: '#ffffff', pink: '#ffffff', white: '#1e293b', none: 'inherit'
};

const DebouncedInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}> = ({ value, onChange, placeholder, className, disabled }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleBlur = () => {
    if (disabled) return;
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => !disabled && setLocalValue(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
};

const EditableArea: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
}> = ({ value, onChange, placeholder, className, rows = 1, disabled }) => {
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
    if (disabled) return;
    if (val !== value) {
      onChange(val);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={val}
      onChange={(e) => !disabled && setVal(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`resize-none overflow-hidden block w-full ${className || ''}`}
    />
  );
};

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit, isAdmin = true }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule || []);
  const [localUnit, setLocalUnit] = useState<CurricularUnit>(unit);

  useEffect(() => {
    setLocalSchedule(unit.schedule || []);
  }, [unit.schedule]);

  useEffect(() => {
    setLocalUnit(unit);
  }, [unit]);

  const checkPermission = () => {
    if (!isAdmin) {
      alert("Acesso negado: Apenas o administrador pode atualizar unidades.");
      return false;
    }
    return true;
  };

  const updateUnitState = (newUnit: CurricularUnit) => {
    if (!checkPermission()) return;
    setLocalUnit(newUnit);
    onUpdateUnit?.(newUnit);
  };

  const calendar = useMemo(() => localUnit.calendar || {
    startDate: '2026-01-26',
    endDate: '2026-06-24',
    markings: []
  }, [localUnit.calendar]);

  const getDayOfWeek = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return "";
    const [d, m, y] = dateStr.split('/').map(Number);
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);
  };

  const updateEntry = (id: string, field: keyof ScheduleEntry, value: any) => {
    if (!checkPermission()) return;
    const updated = localSchedule.map(entry => entry.id === id ? { ...entry, [field]: value } : entry);
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const addScheduleEntry = () => {
    if (!checkPermission()) return;
    const newEntry: ScheduleEntry = {
      id: `sch-${Date.now()}`,
      date: '',
      hours: 2,
      capacities: '',
      knowledges: '',
      strategy: '',
      resources: ''
    };
    const updated = [...localSchedule, newEntry];
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const removeScheduleEntry = (id: string) => {
    if (!checkPermission()) return;
    if (confirm("Deseja realmente excluir esta linha do cronograma?")) {
      const updated = localSchedule.filter(entry => entry.id !== id);
      setLocalSchedule(updated);
      onUpdateSchedule?.(updated);
    }
  };

  const updateGeneralFieldList = (field: 'technicalCapacities' | 'socialCapacities' | 'knowledges', index: number, value: string) => {
    if (!checkPermission()) return;
    const currentList = localUnit[field] ? [...localUnit[field]!] : [];
    currentList[index] = value;
    updateUnitState({ ...localUnit, [field]: currentList });
  };

  const addGeneralFieldItem = (field: 'technicalCapacities' | 'socialCapacities' | 'knowledges') => {
    if (!checkPermission()) return;
    const currentList = localUnit[field] ? [...localUnit[field]!] : [];
    currentList.push('');
    updateUnitState({ ...localUnit, [field]: currentList });
  };

  const removeGeneralFieldItem = (field: 'technicalCapacities' | 'socialCapacities' | 'knowledges', index: number) => {
    if (!checkPermission()) return;
    const currentList = localUnit[field] ? [...localUnit[field]!] : [];
    currentList.splice(index, 1);
    updateUnitState({ ...localUnit, [field]: currentList });
  };

  const updateSAField = (saIndex: number, field: string, value: any) => {
    if (!checkPermission()) return;
    const updatedSAs = [...(localUnit.learningSituations || [])];
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], [field]: value };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const addLearningSituation = () => {
    if (!checkPermission()) return;
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
    if (!checkPermission()) return;
    if (confirm("Tem certeza que deseja remover esta Situação de Aprendizagem na íntegra?")) {
      const updatedSAs = [...(localUnit.learningSituations || [])];
      updatedSAs.splice(saIndex, 1);
      updateUnitState({ ...localUnit, learningSituations: updatedSAs });
    }
  };

  const updateSAResult = (saIndex: number, resultIndex: number, value: string) => {
    if (!checkPermission()) return;
    const updatedSAs = [...(localUnit.learningSituations || [])];
    const results = [...(updatedSAs[saIndex].expectedResults || [])];
    results[resultIndex] = value;
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], expectedResults: results };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const addSAResult = (saIndex: number) => {
    if (!checkPermission()) return;
    const updatedSAs = [...(localUnit.learningSituations || [])];
    const results = [...(updatedSAs[saIndex].expectedResults || []), ''];
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], expectedResults: results };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const removeSAResult = (saIndex: number, resultIndex: number) => {
    if (!checkPermission()) return;
    const updatedSAs = [...(localUnit.learningSituations || [])];
    const results = [...(updatedSAs[saIndex].expectedResults || [])];
    results.splice(resultIndex, 1);
    updatedSAs[saIndex] = { ...updatedSAs[saIndex], expectedResults: results };
    updateUnitState({ ...localUnit, learningSituations: updatedSAs });
  };

  const updateRubric = (index: number, field: string, value: string) => {
    if (!checkPermission()) return;
    const updatedRubrics = [...(localUnit.rubrics || [])];
    updatedRubrics[index] = { ...updatedRubrics[index], [field]: value };
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
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
            value={localUnit.name}
            onChange={(val) => updateUnitState({ ...localUnit, name: val })}
            disabled={!isAdmin}
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
                  {isAdmin && (
                    <button onClick={() => addGeneralFieldItem('technicalCapacities')} className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">
                      + Item
                    </button>
                  )}
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit.technicalCapacities || []).map((cap, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <EditableArea
                        value={cap}
                        onChange={(val) => updateGeneralFieldList('technicalCapacities', idx, val)}
                        placeholder="Descreva a capacidade técnica..."
                        rows={1}
                        disabled={!isAdmin}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      {isAdmin && (
                        <button onClick={() => removeGeneralFieldItem('technicalCapacities', idx)} className="text-slate-400 hover:text-red-500 text-xs font-bold transition-all p-1">
                          ✕
                        </button>
                      )}
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
                  {isAdmin && (
                    <button onClick={() => addGeneralFieldItem('socialCapacities')} className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-purple-600 hover:text-white transition-all">
                      + Item
                    </button>
                  )}
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit.socialCapacities || []).map((cap, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <EditableArea
                        value={cap}
                        onChange={(val) => updateGeneralFieldList('socialCapacities', idx, val)}
                        placeholder="Descreva a capacidade socioemocional..."
                        rows={1}
                        disabled={!isAdmin}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      {isAdmin && (
                        <button onClick={() => removeGeneralFieldItem('socialCapacities', idx)} className="text-slate-400 hover:text-red-500 text-xs font-bold transition-all p-1">
                          ✕
                        </button>
                      )}
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
                  {isAdmin && (
                    <button onClick={() => addGeneralFieldItem('knowledges')} className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-orange-600 hover:text-white transition-all">
                      + Item
                    </button>
                  )}
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit.knowledges || []).map((know, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <EditableArea
                        value={know}
                        onChange={(val) => updateGeneralFieldList('knowledges', idx, val)}
                        placeholder="Descreva o conhecimento..."
                        rows={1}
                        disabled={!isAdmin}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      {isAdmin && (
                        <button onClick={() => removeGeneralFieldItem('knowledges', idx)} className="text-slate-400 hover:text-red-500 text-xs font-bold transition-all p-1">
                          ✕
                        </button>
                      )}
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
                {isAdmin && (
                  <button onClick={addLearningSituation} className="bg-blue-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-900 transition-all">
                    + Nova Fase / SA
                  </button>
                )}
                <button onClick={handlePrint} className="bg-red-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-slate-900 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  Imprimir Situações
                </button>
              </div>
            </div>

            <div className="space-y-12 pb-10 no-print">
              {(localUnit.learningSituations || []).map((sa, saIdx) => (
                <div key={sa.id || saIdx} className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden transition-all hover:border-blue-200">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1">FASE / ETAPA {saIdx + 1}</span>
                      <DebouncedInput
                        value={sa.title}
                        onChange={(val) => updateSAField(saIdx, 'title', val)}
                        placeholder="Título da Situação de Aprendizagem / Fase..."
                        disabled={!isAdmin}
                        className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none italic w-full bg-transparent border-b border-slate-200 focus:border-blue-500 outline-none pb-2"
                      />
                    </div>
                    {isAdmin && (
                      <button onClick={() => removeLearningSituation(saIdx)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-sm" title="Excluir Fase">
                        Excluir Fase ✕
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    <div className="border-l-2 border-slate-100 pl-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">I. Contextualização / Situação-Problema</p>
                      <EditableArea
                        value={sa.context}
                        onChange={(val) => updateSAField(saIdx, 'context', val)}
                        rows={2}
                        placeholder="Descreva aqui o contexto ou problema apresentado ao aluno..."
                        disabled={!isAdmin}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-600 text-sm leading-relaxed font-medium focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-lg">
                      <p className="text-[10px] font-black text-red-500 uppercase mb-4 tracking-widest">II. Desafio Proposto</p>
                      <EditableArea
                        value={sa.challenge}
                        onChange={(val) => updateSAField(saIdx, 'challenge', val)}
                        rows={2}
                        placeholder="Desafio pedagógico do aluno..."
                        disabled={!isAdmin}
                        className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm italic font-medium leading-relaxed rounded-xl p-3 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="border-t border-slate-100 pt-8">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">III. Resultados Esperados / Entregas da Fase</p>
                        {isAdmin && (
                          <button onClick={() => addSAResult(saIdx)} className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                            + Adicionar Entrega
                          </button>
                        )}
                      </div>
                      <ul className="space-y-3">
                        {(sa.expectedResults || []).map((result, rIdx) => (
                          <li key={rIdx} className="flex gap-3 items-center">
                            <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black">{rIdx + 1}</span>
                            <DebouncedInput
                              value={result}
                              onChange={(val) => updateSAResult(saIdx, rIdx, val)}
                              placeholder="Descreva o resultado ou produto esperado..."
                              disabled={!isAdmin}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-700 text-sm font-bold focus:outline-none focus:border-blue-500"
                            />
                            {isAdmin && (
                              <button onClick={() => removeSAResult(saIdx, rIdx)} className="text-slate-400 hover:text-red-500 p-2 text-xs font-bold transition-all">
                                ✕
                              </button>
                            )}
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
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 no-print overflow-hidden shadow-sm">
            <table className="w-full table-fixed text-left border-collapse border-spacing-0">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-2 w-1/5 text-[9px] font-black uppercase border border-slate-800">Referência / Capacidade</th>
                  <th className="p-2 w-1/5 text-[9px] font-black uppercase border border-slate-800 text-red-400">NSA</th>
                  <th className="p-2 w-1/5 text-[9px] font-black uppercase border border-slate-800 text-orange-400">APO</th>
                  <th className="p-2 w-1/5 text-[9px] font-black uppercase border border-slate-800 text-blue-400">PAR</th>
                  <th className="p-2 w-1/5 text-[9px] font-black uppercase border border-slate-800 text-green-400">AUT</th>
                </tr>
              </thead>
              <tbody className="text-[10px] font-bold">
                {(localUnit.rubrics || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-1 border border-slate-200 bg-slate-50/50 align-top h-1">
                      <EditableArea
                        value={row.capacity}
                        onChange={(val) => updateRubric(i, 'capacity', val)}
                        rows={1}
                        disabled={!isAdmin}
                        className="bg-transparent border-none outline-none font-bold text-slate-900 text-[10px] leading-tight p-0"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row.nsa}
                        onChange={(val) => updateRubric(i, 'nsa', val)}
                        rows={1}
                        disabled={!isAdmin}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-red-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row.apo}
                        onChange={(val) => updateRubric(i, 'apo', val)}
                        rows={1}
                        disabled={!isAdmin}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-orange-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row.par}
                        onChange={(val) => updateRubric(i, 'par', val)}
                        rows={1}
                        disabled={!isAdmin}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-blue-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row.aut}
                        onChange={(val) => updateRubric(i, 'aut', val)}
                        rows={1}
                        disabled={!isAdmin}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-green-300 focus:bg-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center gap-6 border-b border-slate-200 pb-4 no-print">
              <div>
                <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic">Plano de aula | Cronograma</h3>
                <p className="text-xs text-slate-500 font-semibold">Visualização e edição no formato padrão de tabela pedagógica</p>
              </div>
              <div className="flex gap-3">
                {isAdmin && (
                  <button 
                    onClick={addScheduleEntry}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all"
                  >
                    <span>+ Adicionar Linha</span>
                  </button>
                )}
                <button 
                  onClick={handlePrint} 
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  Imprimir Cronograma
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-lg border-2 border-black overflow-hidden shadow-sm">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-black text-slate-900">
                    <th className="p-3 w-[15%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Horas/Aulas/Data
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Capacidades
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Conhecimentos
                    </th>
                    <th className="p-3 w-[25%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Estratégias / Atividades
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase text-center align-middle">
                      Recursos / Avaliação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black text-xs font-medium">
                  {localSchedule.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 group relative">
                      <td className="p-2 border-r border-black align-top text-center bg-slate-50/30">
                        <DebouncedInput
                          value={entry.date}
                          onChange={(val) => updateEntry(entry.id, 'date', val)}
                          disabled={!isAdmin}
                          className="w-full text-center font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none text-xs"
                          placeholder="DD/MM/AAAA"
                        />
                        <div className="text-[10px] text-slate-400 font-semibold mt-1 uppercase">
                          {getDayOfWeek(entry.date)}
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-1">
                          <DebouncedInput
                            value={String(entry.hours || '')}
                            onChange={(val) => updateEntry(entry.id, 'hours', Number(val) || 0)}
                            disabled={!isAdmin}
                            className="w-12 text-center font-black text-blue-600 bg-blue-50 border border-blue-100 rounded p-0.5 text-xs"
                          />
                          <span className="text-[10px] text-slate-500 font-bold">h</span>
                        </div>
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea
                          value={entry.capacities}
                          onChange={(val) => updateEntry(entry.id, 'capacities', val)}
                          placeholder="Capacidades..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed"
                          rows={3}
                        />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea
                          value={entry.knowledges}
                          onChange={(val) => updateEntry(entry.id, 'knowledges', val)}
                          placeholder="Conhecimentos..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed"
                          rows={3}
                        />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea
                          value={entry.strategy}
                          onChange={(val) => updateEntry(entry.id, 'strategy', val)}
                          placeholder="Estratégias / Atividades..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed"
                          rows={3}
                        />
                      </td>
                      <td className="p-2 align-top relative">
                        <EditableArea
                          value={entry.resources}
                          onChange={(val) => updateEntry(entry.id, 'resources', val)}
                          placeholder="Recursos / Avaliação..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed pr-6"
                          rows={3}
                        />
                        {isAdmin && (
                          <button
                            onClick={() => removeScheduleEntry(entry.id)}
                            className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            title="Excluir linha"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic">Calendário de Aulas</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Sincronização de datas extraídas do cronograma da unidade</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthsInRange.map(monthStr => {
                const [y, m] = monthStr.split('-').map(Number);
                const monthDate = new Date(y, m - 1, 1);
                const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(monthDate);
                
                const daysInMonth = new Date(y, m, 0).getDate();
                const firstDayIndex = new Date(y, m - 1, 1).getDay();

                const days = [];
                for (let i = 0; i < firstDayIndex; i++) {
                  days.push(null);
                }
                for (let d = 1; d <= daysInMonth; d++) {
                  days.push(new Date(y, m - 1, d));
                }

                return (
                  <div key={monthStr} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h4 className="text-xs font-black uppercase text-slate-800 mb-3 tracking-widest text-center capitalize">
                      {monthName}
                    </h4>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((wd, idx) => (
                        <span key={idx} className="text-[9px] font-black text-slate-400">{wd}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((dateObj, idx) => {
                        if (!dateObj) {
                          return <div key={`empty-${idx}`} />;
                        }
                        const year = dateObj.getFullYear();
                        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObj.getDate()).padStart(2, '0');
                        const isoDate = `${year}-${month}-${day}`;
                        const isScheduled = scheduleDates[isoDate];

                        return (
                          <div
                            key={isoDate}
                            className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                              isScheduled 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
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
