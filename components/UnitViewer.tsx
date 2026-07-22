import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarColor } from '../types';

interface Props {
  unit: CurricularUnit;
  allUnits?: CurricularUnit[];
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

const UnitViewer: React.FC<Props> = ({ unit, allUnits = [], onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule);
  const [localUnit, setLocalUnit] = useState<CurricularUnit>(unit);

  useEffect(() => {
    setLocalSchedule(unit.schedule);
  }, [unit.schedule]);

  useEffect(() => {
    setLocalUnit(unit);
  }, [unit]);

  const updateUnitState = (newUnit: CurricularUnit) => {
    setLocalUnit(newUnit);
    onUpdateUnit?.(newUnit);
  };

  const unitIdOrName = `${localUnit.id || ''}-${localUnit.semester || ''}-${localUnit.name || ''}`.toLowerCase();
  const isCRD = unitIdOrName.includes('crd') || unitIdOrName.includes('dimensional');
  const isFUSI = unitIdOrName.includes('fusi') || unitIdOrName.includes('usinagem');
  const scheduleColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');

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

  const addScheduleRow = () => {
    const newEntry: ScheduleEntry = {
      id: `sched-${Date.now()}`,
      hours: 4,
      date: '',
      capacities: '',
      knowledge: '',
      strategy: '',
      resources: ''
    };
    const updated = [...localSchedule, newEntry];
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
  };

  const removeScheduleRow = (id: string) => {
    const updated = localSchedule.filter(entry => entry.id !== id);
    setLocalSchedule(updated);
    onUpdateSchedule?.(updated);
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
    updatedRubrics[index] = { ...updatedRubrics[index], [field]: value };
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
  };

  const addRubricRow = () => {
    const updatedRubrics = [...(localUnit.rubrics || []), { capacity: '', nsa: '', apo: '', par: '', aut: '' }];
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
  };

  const removeRubricRow = (index: number) => {
    const updatedRubrics = [...(localUnit.rubrics || [])];
    updatedRubrics.splice(index, 1);
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
  };

  const handlePrint = () => {
    window.print();
  };

  // Mapeia datas de todas as unidades para o calendário geral
  const unitsDateMap = useMemo(() => {
    const map: Record<string, { color: CalendarColor; unitName: string }> = {};
    const unitsList = allUnits.length > 0 ? allUnits : [localUnit];

    unitsList.forEach((u, idx) => {
      const uIdName = `${u.id || ''}-${u.semester || ''}-${u.name || ''}`.toLowerCase();
      const isUCRD = uIdName.includes('crd') || uIdName.includes('dimensional');
      const isUFUSI = uIdName.includes('fusi') || uIdName.includes('usinagem');
      const colorList: CalendarColor[] = ['blue', 'orange', 'pink', 'purple', 'green', 'cyan', 'red', 'yellow'];
      const uColor: CalendarColor = isUCRD ? 'pink' : (isUFUSI ? 'orange' : colorList[idx % colorList.length]);

      (u.schedule || []).forEach(s => {
        const parts = s.date.split('/');
        if (parts.length === 3) {
          const dateKey = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          map[dateKey] = { color: uColor, unitName: u.name };
        }
      });
    });

    return map;
  }, [allUnits, localUnit]);

  // Determina se o semestre é o 2º (julho a dezembro) ou 1º (janeiro a junho)
  const semesterNum = localUnit.semester || 1;
  const currentYear = new Date().getFullYear();
  const calendarRange = useMemo(() => {
    if (semesterNum === 2) {
      return {
        startDate: `${currentYear}-07-01`,
        endDate: `${currentYear}-12-31`,
        months: [`${currentYear}-07`, `${currentYear}-08`, `${currentYear}-09`, `${currentYear}-10`, `${currentYear}-11`, `${currentYear}-12`]
      };
    } else {
      return {
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-06-30`,
        months: [`${currentYear}-01`, `${currentYear}-02`, `${currentYear}-03`, `${currentYear}-04`, `${currentYear}-05`, `${currentYear}-06`]
      };
    }
  }, [semesterNum, currentYear]);

  // Lista de unidades para a legenda superior
  const legendUnits = useMemo(() => {
    const unitsList = allUnits.length > 0 ? allUnits : [localUnit];
    return unitsList.map((u, idx) => {
      const uIdName = `${u.id || ''}-${u.semester || ''}-${u.name || ''}`.toLowerCase();
      const isUCRD = uIdName.includes('crd') || uIdName.includes('dimensional');
      const isUFUSI = uIdName.includes('fusi') || uIdName.includes('usinagem');
      const colorList: CalendarColor[] = ['blue', 'orange', 'pink', 'purple', 'green', 'cyan', 'red', 'yellow'];
      const color: CalendarColor = isUCRD ? 'pink' : (isUFUSI ? 'orange' : colorList[idx % colorList.length]);
      return { name: u.name, color, semester: u.semester || 1 };
    });
  }, [allUnits, localUnit]);

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
        }
      `}</style>

      {/* HEADER DA UNIDADE */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div className="w-full">
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular ({localUnit.semester ? `${localUnit.semester}º Sem.` : ''})</span>
          <DebouncedInput
            value={localUnit.name}
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
              {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situação-Problema' : tab === 'rubricas' ? 'Rubricas' : tab === 'cronograma' ? 'Plano de Ensino / Cronograma' : 'Calendário'}
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
                  {(localUnit.technicalCapacities || []).map((cap, idx) => (
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
                  {(localUnit.socialCapacities || []).map((cap, idx) => (
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
                  {(localUnit.knowledges || []).map((know, idx) => (
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
                        value={sa.context}
                        onChange={(val) => updateSAField(saIdx, 'context', val)}
                        rows={2}
                        placeholder="Descreva aqui o contexto ou problema apresentado ao aluno..."
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
                        {(sa.expectedResults || []).map((result, rIdx) => (
                          <li key={rIdx} className="flex gap-3 items-center">
                            <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black">{rIdx + 1}</span>
                            <DebouncedInput
                              value={result}
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
          <div className="space-y-4">
            <div className="flex justify-between items-center no-print px-2">
              <div>
                <h3 className="text-lg font-[1000] text-slate-900 uppercase italic">Critérios Graduais (Rubricas)</h3>
                <p className="text-xs text-slate-500 font-semibold">Adicione novas linhas de capacidades ou remova linhas existentes</p>
              </div>
              <button 
                onClick={addRubricRow}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:bg-slate-900 transition-all flex items-center gap-2"
              >
                <span>+ Adicionar Capacidade</span>
              </button>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 no-print overflow-hidden shadow-sm">
              <table className="w-full table-fixed text-left border-collapse border-spacing-0">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-2 w-[22%] text-[9px] font-black uppercase border border-slate-800">Referência / Capacidade</th>
                    <th className="p-2 w-[18%] text-[9px] font-black uppercase border border-slate-800 text-red-400">NSA</th>
                    <th className="p-2 w-[18%] text-[9px] font-black uppercase border border-slate-800 text-orange-400">APO</th>
                    <th className="p-2 w-[18%] text-[9px] font-black uppercase border border-slate-800 text-blue-400">PAR</th>
                    <th className="p-2 w-[18%] text-[9px] font-black uppercase border border-slate-800 text-green-400">AUT</th>
                    <th className="p-2 w-[6%] text-[9px] font-black uppercase border border-slate-800 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] font-bold">
                  {(localUnit.rubrics || []).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-1 border border-slate-200 bg-slate-50/50 align-top">
                        <EditableArea
                          value={row.capacity}
                          onChange={(val) => updateRubric(i, 'capacity', val)}
                          rows={2}
                          placeholder="Capacidade..."
                          className="bg-transparent border-none outline-none font-bold text-slate-900 text-[10px] leading-tight p-0"
                        />
                      </td>
                      <td className="p-1 border border-slate-200 align-top">
                        <EditableArea
                          value={row.nsa}
                          onChange={(val) => updateRubric(i, 'nsa', val)}
                          rows={2}
                          placeholder="Critério NSA..."
                          className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-red-300 focus:bg-white"
                        />
                      </td>
                      <td className="p-1 border border-slate-200 align-top">
                        <EditableArea
                          value={row.apo}
                          onChange={(val) => updateRubric(i, 'apo', val)}
                          rows={2}
                          placeholder="Critério APO..."
                          className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-orange-300 focus:bg-white"
                        />
                      </td>
                      <td className="p-1 border border-slate-200 align-top">
                        <EditableArea
                          value={row.par}
                          onChange={(val) => updateRubric(i, 'par', val)}
                          rows={2}
                          placeholder="Critério PAR..."
                          className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-blue-300 focus:bg-white"
                        />
                      </td>
                      <td className="p-1 border border-slate-200 align-top">
                        <EditableArea
                          value={row.aut}
                          onChange={(val) => updateRubric(i, 'aut', val)}
                          rows={2}
                          placeholder="Critério AUT..."
                          className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-green-300 focus:bg-white"
                        />
                      </td>
                      <td className="p-1 border border-slate-200 align-middle text-center">
                        <button 
                          onClick={() => removeRubricRow(i)} 
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-all font-black text-xs"
                          title="Excluir linha"
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

        {/* ABA PLANO DE ENSINO / CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center gap-6 border-b border-slate-200 pb-4 no-print">
              <div>
                <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic">Plano de Ensino | Cronograma</h3>
                <p className="text-xs text-slate-500 font-semibold">Visualização e edição no formato padrão de tabela pedagógica</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={addScheduleRow}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all"
                >
                  + Adicionar Linha
                </button>
                <button 
                  onClick={handlePrint} 
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all"
                >
                  Imprimir Cronograma
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-lg border-2 border-black overflow-hidden shadow-sm">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-black text-slate-900">
                    <th className="p-3 w-[15%] text-xs font-black uppercase border-r border-black text-center align-middle">Horas/Aulas/Data</th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">Capacidades</th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">Conhecimentos</th>
                    <th className="p-3 w-[22%] text-xs font-black uppercase border-r border-black text-center align-middle">Estratégias</th>
                    <th className="p-3 w-[18%] text-xs font-black uppercase border-r border-black text-center align-middle">Recursos/Ambientes</th>
                    <th className="p-3 w-[5%] text-xs font-black uppercase text-center align-middle no-print">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-slate-900 divide-y border-black">
                  {localSchedule.map((entry) => (
                    <tr key={entry.id} className="border-b border-black hover:bg-slate-50/50 transition-colors">
                      <td className="p-2 border-r border-black align-top bg-slate-50/30">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1 text-[11px] font-bold">
                            <input
                              type="number"
                              value={entry.hours}
                              onChange={(e) => updateEntry(entry.id, 'hours', Number(e.target.value))}
                              className="w-8 bg-transparent border-b border-slate-400 font-bold text-center focus:outline-none focus:border-black"
                            />
                            <span>horas -</span>
                          </div>
                          <DebouncedInput
                            value={entry.date}
                            onChange={(val) => updateEntry(entry.id, 'date', val)}
                            placeholder="DD/MM/AAAA"
                            className="w-full bg-transparent border-b border-dashed border-slate-300 font-bold text-xs focus:outline-none focus:border-black"
                          />
                          <span className="text-[9px] font-black uppercase text-slate-400 italic">
                            {getDayOfWeek(entry.date)}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea value={entry.capacities} onChange={(val) => updateEntry(entry.id, 'capacities', val)} rows={2} className="w-full bg-transparent border-none text-xs leading-relaxed focus:outline-none focus:bg-slate-50 rounded p-1" />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea value={entry.knowledge} onChange={(val) => updateEntry(entry.id, 'knowledge', val)} rows={2} className="w-full bg-transparent border-none text-xs leading-relaxed focus:outline-none focus:bg-slate-50 rounded p-1" />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea value={entry.strategy} onChange={(val) => updateEntry(entry.id, 'strategy', val)} rows={3} className="w-full bg-transparent border-none text-xs leading-relaxed focus:outline-none focus:bg-slate-50 rounded p-1" />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea value={entry.resources} onChange={(val) => updateEntry(entry.id, 'resources', val)} rows={2} className="w-full bg-transparent border-none text-xs leading-relaxed focus:outline-none focus:bg-slate-50 rounded p-1" />
                      </td>
                      <td className="p-2 align-middle text-center no-print">
                        <button
                          onClick={() => removeScheduleRow(entry.id)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-all font-black text-xs"
                          title="Excluir linha"
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

        {/* ABA CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <div className="space-y-6 no-print">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic">Calendário de Aulas ({semesterNum}º Semestre)</h3>
                <p className="text-xs text-slate-500 font-semibold">Distribuição temporal das aulas e marcações por Unidade Curricular</p>
              </div>
            </div>

            {/* LEGENDA SUPERIOR DE CORES E UNIDADES */}
            <div className="bg-slate-900 p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between text-white shadow-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legenda de Unidades:</span>
              <div className="flex flex-wrap gap-3 items-center">
                {legendUnits.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                    <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLOR_MAP[item.color] }}></span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GRID DE MESES DO SEMESTRE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calendarRange.months.map(monthStr => {
                const [year, month] = monthStr.split('-').map(Number);
                const firstDay = new Date(year, month - 1, 1);
                const lastDay = new Date(year, month, 0);
                const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long' });
                
                const days: (string | null)[] = [];
                for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
                for (let i = 1; i <= lastDay.getDate(); i++) {
                  const d = i < 10 ? `0${i}` : `${i}`;
                  days.push(`${monthStr}-${d}`);
                }

                return (
                  <div key={monthStr} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between">
                    <div className="bg-slate-900 text-white py-3 px-4 text-center border-b border-slate-800">
                      <h4 className="text-xs font-black uppercase tracking-widest italic">{monthName} {year}</h4>
                    </div>
                    
                    <div className="p-3">
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['D','S','T','Q','Q','S','S'].map((d, i) => (
                          <div key={i} className={`text-[10px] font-black ${i === 0 ? 'text-red-500' : 'text-slate-400'}`}>
                            {d}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center">
                        {days.map((day, idx) => {
                          if (!day) return <div key={`empty-${idx}`} className="aspect-square"></div>;
                          const matchInfo = unitsDateMap[day];
                          const isSunday = idx % 7 === 0;

                          return (
                            <div
                              key={day}
                              title={matchInfo ? `${matchInfo.unitName}` : undefined}
                              className={`aspect-square flex items-center justify-center rounded-xl text-xs font-black transition-all ${
                                matchInfo ? 'shadow-sm ring-1 ring-black/10 scale-105' : 'hover:bg-slate-100 text-slate-700'
                              }`}
                              style={{
                                backgroundColor: matchInfo ? COLOR_MAP[matchInfo.color] : 'transparent',
                                color: matchInfo ? TEXT_COLOR_MAP[matchInfo.color] : (isSunday ? '#ef4444' : '#1e293b')
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
          </div>
        )}

      </div>
    </div>
  );
};

export default UnitViewer;
