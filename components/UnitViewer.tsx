import React, { useState, useEffect, useMemo } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, CalendarColor } from '../types';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void;
  onUpdateUnit?: (updatedUnit: CurricularUnit) => void;
}

const UnitViewer: React.FC<Props> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario'>('geral');
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(unit.schedule || []);
  const [localUnit, setLocalUnit] = useState<CurricularUnit>(unit);

  useEffect(() => {
    setLocalSchedule(unit.schedule || []);
  }, [unit.schedule]);

  useEffect(() => {
    setLocalUnit(unit);
  }, [unit]);

  const updateUnitState = (newUnit: CurricularUnit) => {
    setLocalUnit(newUnit);
    onUpdateUnit?.(newUnit);
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

  // Edição Geral
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

  // Situações de Aprendizagem
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

  // Rubricas
  const updateRubric = (index: number, field: string, value: string) => {
    const updatedRubrics = [...(localUnit.rubrics || [])];
    updatedRubrics[index] = { ...updatedRubrics[index], [field]: value };
    updateUnitState({ ...localUnit, rubrics: updatedRubrics });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn printable-unit-module">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 1.0cm !important; }
          
          /* Esconde tudo que for controle da interface */
          aside, header, nav, .no-print, button, .tabs-header { 
            display: none !important; 
          }

          /* Tira rolagens e containers fixos */
          html, body, #root, main, .printable-unit-module, .content-area { 
            display: block !important; 
            height: auto !important; 
            overflow: visible !important; 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            box-shadow: none !important; 
            border: none !important;
          }

          /* Otimiza a impressão de tabelas */
          table { width: 100% !important; border-collapse: collapse !important; page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
          th, td { border: 1pt solid #000 !important; padding: 6pt !important; color: #000 !important; }
          
          /* Garante visibilidade dos inputs e textareas impressos */
          input, textarea {
            border: none !important;
            background: transparent !important;
            resize: none !important;
            color: #000 !important;
            font-size: 9pt !important;
          }
        }
      `}</style>

      {/* HEADER DA UNIDADE */}
      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div className="w-full">
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">MSEP - Unidade Curricular</span>
          <input
            type="text"
            value={localUnit.name || ''}
            onChange={(e) => updateUnitState({ ...localUnit, name: e.target.value })}
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
            className={`px-8 py-5 transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 bg-white font-bold' : 'border-transparent text-slate-400 hover:bg-slate-100'}`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest block">
              {tab === 'geral' ? 'Geral' : tab === 'sa' ? 'Situação-Problema' : tab === 'rubricas' ? 'Rubricas' : tab === 'cronograma' ? 'Plano de Aula' : 'Calendário'}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FDFDFD] content-area">

        {/* ABA GERAL */}
        {activeTab === 'geral' && (
          <div className="space-y-10 max-w-7xl mx-auto">
            <div className="border-b border-slate-100 pb-6 no-print">
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
                  <button onClick={() => addGeneralFieldItem('technicalCapacities')} className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all no-print">
                    + Item
                  </button>
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit.technicalCapacities || []).map((cap, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <textarea
                        value={cap}
                        onChange={(e) => updateGeneralFieldList('technicalCapacities', idx, e.target.value)}
                        placeholder="Descreva a capacidade técnica..."
                        rows={2}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none resize-none"
                      />
                      <button onClick={() => removeGeneralFieldItem('technicalCapacities', idx)} className="text-slate-300 hover:text-red-500 text-xs font-bold transition-all p-1 no-print">
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
                  <button onClick={() => addGeneralFieldItem('socialCapacities')} className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-purple-600 hover:text-white transition-all no-print">
                    + Item
                  </button>
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit.socialCapacities || []).map((cap, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <textarea
                        value={cap}
                        onChange={(e) => updateGeneralFieldList('socialCapacities', idx, e.target.value)}
                        placeholder="Descreva a capacidade socioemocional..."
                        rows={2}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none resize-none"
                      />
                      <button onClick={() => removeGeneralFieldItem('socialCapacities', idx)} className="text-slate-300 hover:text-red-500 text-xs font-bold transition-all p-1 no-print">
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
                  <button onClick={() => addGeneralFieldItem('knowledges')} className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase hover:bg-orange-600 hover:text-white transition-all no-print">
                    + Item
                  </button>
                </div>
                <div className="space-y-3 flex-1">
                  {(localUnit.knowledges || []).map((know, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 mt-1">{idx + 1}.</span>
                      <textarea
                        value={know}
                        onChange={(e) => updateGeneralFieldList('knowledges', idx, e.target.value)}
                        placeholder="Descreva o conhecimento..."
                        rows={2}
                        className="flex-1 bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none resize-none"
                      />
                      <button onClick={() => removeGeneralFieldItem('knowledges', idx)} className="text-slate-300 hover:text-red-500 text-xs font-bold transition-all p-1 no-print">
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
                  Imprimir
                </button>
              </div>
            </div>

            <div className="space-y-12 pb-10">
              {(localUnit.learningSituations || []).map((sa, saIdx) => (
                <div key={sa.id || saIdx} className="p-10 bg-white border border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden transition-all hover:border-blue-200">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1">FASE / ETAPA {saIdx + 1}</span>
                      <input
                        type="text"
                        value={sa.title || ''}
                        onChange={(e) => updateSAField(saIdx, 'title', e.target.value)}
                        placeholder="Título da Situação de Aprendizagem / Fase..."
                        className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none italic w-full bg-transparent border-b border-slate-200 focus:border-blue-500 outline-none pb-2"
                      />
                    </div>
                    <button onClick={() => removeLearningSituation(saIdx)} className="text-slate-300 hover:text-red-600 p-2 text-sm font-black transition-all no-print" title="Excluir Fase">
                      Excluir Fase ✕
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="border-l-2 border-slate-100 pl-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">I. Contextualização / Situação-Problema</p>
                      <textarea
                        value={sa.context || ''}
                        onChange={(e) => updateSAField(saIdx, 'context', e.target.value)}
                        rows={3}
                        placeholder="Descreva aqui o contexto ou problema apresentado ao aluno..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-600 text-sm leading-relaxed font-medium focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                    
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-lg">
                      <p className="text-[10px] font-black text-red-500 uppercase mb-4 tracking-widest">II. Desafio Proposto</p>
                      <textarea
                        value={sa.challenge || ''}
                        onChange={(e) => updateSAField(saIdx, 'challenge', e.target.value)}
                        rows={3}
                        placeholder="Desafio pedagógico do aluno..."
                        className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm italic font-medium leading-relaxed rounded-xl p-3 focus:outline-none focus:border-red-500 resize-none"
                      />
                    </div>

                    <div className="border-t border-slate-100 pt-8">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">III. Resultados Esperados / Entregas da Fase</p>
                        <button onClick={() => addSAResult(saIdx)} className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all no-print">
                          + Adicionar Entrega
                        </button>
                      </div>
                      <ul className="space-y-3">
                        {(sa.expectedResults || []).map((result, rIdx) => (
                          <li key={rIdx} className="flex gap-3 items-center">
                            <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black">{rIdx + 1}</span>
                            <input
                              type="text"
                              value={result || ''}
                              onChange={(e) => updateSAResult(saIdx, rIdx, e.target.value)}
                              placeholder="Descreva o resultado ou produto esperado..."
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-700 text-sm font-bold focus:outline-none focus:border-blue-500"
                            />
                            <button onClick={() => removeSAResult(saIdx, rIdx)} className="text-slate-300 hover:text-red-500 p-2 text-xs font-bold transition-all no-print">
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
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-2 overflow-hidden shadow-sm">
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
                    <td className="p-1 border border-slate-200 bg-slate-50/50 align-top">
                      <textarea
                        value={row.capacity || ''}
                        onChange={(e) => updateRubric(i, 'capacity', e.target.value)}
                        rows={2}
                        className="w-full bg-transparent border-none outline-none font-bold text-slate-900 text-[10px] leading-tight p-0 resize-none"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top">
                      <textarea
                        value={row.nsa || ''}
                        onChange={(e) => updateRubric(i, 'nsa', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-red-300 focus:bg-white resize-none"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top">
                      <textarea
                        value={row.apo || ''}
                        onChange={(e) => updateRubric(i, 'apo', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-orange-300 focus:bg-white resize-none"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top">
                      <textarea
                        value={row.par || ''}
                        onChange={(e) => updateRubric(i, 'par', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-blue-300 focus:bg-white resize-none"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top">
                      <textarea
                        value={row.aut || ''}
                        onChange={(e) => updateRubric(i, 'aut', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-green-300 focus:bg-white resize-none"
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
                      Estratégia De Ensino
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase text-center align-middle">
                      Avaliação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y border-black">
                  {localSchedule.map((entry) => (
                    <tr key={entry.id} className="border-b border-black text-slate-800">
                      <td className="p-3 border-r border-black align-top bg-slate-50/50">
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={entry.date || ''}
                            onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                            placeholder="Data (DD/MM/AAAA)"
                            className="w-full text-xs font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 outline-none text-center"
                          />
                          <div className="text-[10px] text-slate-500 font-semibold text-center italic">
                            {getDayOfWeek(entry.date)}
                          </div>
                          <div className="pt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-slate-700">
                            <input
                              type="number"
                              value={entry.hours || 0}
                              onChange={(e) => updateEntry(entry.id, 'hours', Number(e.target.value))}
                              placeholder="0"
                              className="w-12 text-center bg-white border border-slate-300 rounded px-1 py-0.5 text-xs font-bold focus:border-blue-500 outline-none"
                            />
                            <span>h</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 border-r border-black align-top">
                        <textarea
                          value={entry.capacities || ''}
                          onChange={(e) => updateEntry(entry.id, 'capacities', e.target.value)}
                          placeholder="Capacidades..."
                          rows={3}
                          className="w-full text-xs text-slate-800 bg-transparent focus:outline-none resize-none"
                        />
                      </td>
                      <td className="p-3 border-r border-black align-top">
                        <textarea
                          value={entry.contents || ''}
                          onChange={(e) => updateEntry(entry.id, 'contents', e.target.value)}
                          placeholder="Conhecimentos / Conteúdos..."
                          rows={3}
                          className="w-full text-xs text-slate-800 bg-transparent focus:outline-none resize-none"
                        />
                      </td>
                      <td className="p-3 border-r border-black align-top">
                        <textarea
                          value={entry.strategies || ''}
                          onChange={(e) => updateEntry(entry.id, 'strategies', e.target.value)}
                          placeholder="Estratégia de Ensino..."
                          rows={3}
                          className="w-full text-xs text-slate-800 bg-transparent focus:outline-none resize-none"
                        />
                      </td>
                      <td className="p-3 align-top">
                        <textarea
                          value={entry.evaluation || ''}
                          onChange={(e) => updateEntry(entry.id, 'evaluation', e.target.value)}
                          placeholder="Critérios / Avaliação..."
                          rows={3}
                          className="w-full text-xs text-slate-800 bg-transparent focus:outline-none resize-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UnitViewer;
