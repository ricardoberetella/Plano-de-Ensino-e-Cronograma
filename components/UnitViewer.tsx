import React, { useState, useEffect } from 'react';
import { CurricularUnit, SemesterNumber } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit;
  onUpdateUnit: (updatedUnit: CurricularUnit) => void;
  onBack: () => void;
}

export const UnitViewer: React.FC<UnitViewerProps> = ({
  unit,
  onUpdateUnit,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'situacao-problema' | 'rubricas' | 'plano-aula' | 'calendario'>('geral');
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  
  const [code, setCode] = useState(unit.code || unit.id || '');
  const [name, setName] = useState(unit.name || '');
  const [semester, setSemester] = useState<SemesterNumber>(unit.semester || 1);
  const [totalHours, setTotalHours] = useState(unit.totalHours || unit.workload || 80);

  const handleSaveHeader = () => {
    onUpdateUnit({
      ...unit,
      code,
      id: code,
      name,
      semester,
      totalHours,
      workload: totalHours
    });
    setIsEditingHeader(false);
  };

  const handleAddTechnicalCapacity = () => {
    const techs = [...(unit.technicalCapacities || []), ''];
    onUpdateUnit({ ...unit, technicalCapacities: techs });
  };

  const handleDeleteTechnicalCapacity = (index: number) => {
    const updatedTechs = (unit.technicalCapacities || []).filter((_, i) => i !== index);
    onUpdateUnit({ ...unit, technicalCapacities: updatedTechs });
  };

  const handleUpdateTechnicalCapacity = (index: number, value: string) => {
    const updatedTechs = [...(unit.technicalCapacities || [])];
    updatedTechs[index] = value;
    onUpdateUnit({ ...unit, technicalCapacities: updatedTechs });
  };

  const handleAddSocialCapacity = () => {
    const socials = [...(unit.socialCapacities || []), ''];
    onUpdateUnit({ ...unit, socialCapacities: socials });
  };

  const handleDeleteSocialCapacity = (index: number) => {
    const updatedSocials = (unit.socialCapacities || []).filter((_, i) => i !== index);
    onUpdateUnit({ ...unit, socialCapacities: updatedSocials });
  };

  const handleUpdateSocialCapacity = (index: number, value: string) => {
    const updatedSocials = [...(unit.socialCapacities || [])];
    updatedSocials[index] = value;
    onUpdateUnit({ ...unit, socialCapacities: updatedSocials });
  };

  const handleAddKnowledge = () => {
    const knowledges = [...(unit.knowledges || []), ''];
    onUpdateUnit({ ...unit, knowledges: knowledges });
  };

  const handleDeleteKnowledge = (index: number) => {
    const updatedKnowledges = (unit.knowledges || []).filter((_, i) => i !== index);
    onUpdateUnit({ ...unit, knowledges: updatedKnowledges });
  };

  const handleUpdateKnowledge = (index: number, value: string) => {
    const updatedKnowledges = [...(unit.knowledges || [])];
    updatedKnowledges[index] = value;
    onUpdateUnit({ ...unit, knowledges: updatedKnowledges });
  };

  const handleAddSituation = () => {
    const newSit = {
      id: Date.now().toString(),
      title: 'NOVA SITUAÇÃO-PROBLEMA: TÍTULO DA OPERAÇÃO',
      contextualization: 'Insira o contexto industrial aqui...',
      challenge: 'Insira o desafio proposto aos alunos aqui...',
      expectedResults: ['Item 1: Descreva o resultado esperado...']
    };
    const currentList = unit.learningSituations || [];
    onUpdateUnit({ ...unit, learningSituations: [...currentList, newSit] });
  };

  const handleDeleteSituation = (sitId: string) => {
    if (window.confirm('Deseja realmente excluir esta Situação-Problema?')) {
      const currentList = unit.learningSituations || [];
      onUpdateUnit({ ...unit, learningSituations: currentList.filter(s => s.id !== sitId) });
    }
  };

  const handleUpdateSituation = (sitId: string, field: string, value: any) => {
    const currentList = unit.learningSituations || [];
    const updated = currentList.map(s => s.id === sitId ? { ...s, [field]: value } : s);
    onUpdateUnit({ ...unit, learningSituations: updated });
  };

  const handleAddExpectedResult = (sitId: string) => {
    const currentList = unit.learningSituations || [];
    const updated = currentList.map(s => {
      if (s.id === sitId) {
        return { ...s, expectedResults: [...(s.expectedResults || []), 'Novo resultado esperado...'] };
      }
      return s;
    });
    onUpdateUnit({ ...unit, learningSituations: updated });
  };

  const handleUpdateExpectedResult = (sitId: string, index: number, value: string) => {
    const currentList = unit.learningSituations || [];
    const updated = currentList.map(s => {
      if (s.id === sitId) {
        const results = [...(s.expectedResults || [])];
        results[index] = value;
        return { ...s, expectedResults: results };
      }
      return s;
    });
    onUpdateUnit({ ...unit, learningSituations: updated });
  };

  const handleDeleteExpectedResult = (sitId: string, index: number) => {
    const currentList = unit.learningSituations || [];
    const updated = currentList.map(s => {
      if (s.id === sitId) {
        const results = (s.expectedResults || []).filter((_, i) => i !== index);
        return { ...s, expectedResults: results };
      }
      return s;
    });
    onUpdateUnit({ ...unit, learningSituations: updated });
  };

  const handleAddRubricRow = () => {
    const newRow = {
      id: Date.now().toString(),
      reference: 'Nova Capacidade / Referência...',
      nsa: 'Não atende...',
      apo: 'Atende parcialmente...',
      par: 'Atende com ressalvas...',
      aut: 'Atende com autonomia...'
    };
    const currentRubrics = unit.rubrics || [];
    onUpdateUnit({ ...unit, rubrics: [...currentRubrics, newRow] });
  };

  const handleDeleteRubricRow = (rubricId: string) => {
    const currentRubrics = unit.rubrics || [];
    onUpdateUnit({ ...unit, rubrics: currentRubrics.filter(r => r.id !== rubricId) });
  };

  const handleUpdateRubricCell = (rubricId: string, field: 'reference' | 'nsa' | 'apo' | 'par' | 'aut', value: string) => {
    const currentRubrics = unit.rubrics || [];
    const updated = currentRubrics.map(r => r.id === rubricId ? { ...r, [field]: value } : r);
    onUpdateUnit({ ...unit, rubrics: updated });
  };

  const [lessonPlanList, setLessonPlanList] = useState(unit.lessonPlan || []);

  useEffect(() => {
    setLessonPlanList(unit.lessonPlan || []);
  }, [unit.id]);

  const handleAddLessonPlanRow = () => {
    const newRow = {
      id: Date.now().toString(),
      hoursDate: '4 horas - 01/07/2026',
      capacities: '- Descrever capacidade...',
      knowledges: '1. Conhecimento...',
      strategies: 'Exposição dialogada e prática...',
      resources: 'Sala de aula, projetor...',
      completed: false
    };
    const updatedPlan = [...lessonPlanList, newRow];
    setLessonPlanList(updatedPlan);
    onUpdateUnit({ ...unit, lessonPlan: updatedPlan });
  };

  const handleDeleteLessonPlanRow = (rowId: string) => {
    const updatedPlan = lessonPlanList.filter(r => r.id !== rowId);
    setLessonPlanList(updatedPlan);
    onUpdateUnit({ ...unit, lessonPlan: updatedPlan });
  };

  const handleUpdateLessonPlanCell = (rowId: string, field: string, value: any) => {
    const updatedPlan = lessonPlanList.map(r => r.id === rowId ? { ...r, [field]: value } : r);
    setLessonPlanList(updatedPlan);
    onUpdateUnit({ ...unit, lessonPlan: updatedPlan });
  };

  const parseHoursAndDate = (hoursDateStr: string) => {
    const match = (hoursDateStr || '').match(/^(\d+)\s*horas?\s*-\s*(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) {
      return {
        hours: match[1],
        date: `${match[4]}-${match[3]}-${match[2]}`
      };
    }
    return { hours: '4', date: '2026-07-01' };
  };

  const handleUpdateHoursOrDate = (rowId: string, currentHoursDate: string, newHours: string, newDateIso: string) => {
    const parsed = parseHoursAndDate(currentHoursDate);
    const hours = newHours !== undefined ? newHours : parsed.hours;
    const dateIso = newDateIso !== undefined ? newDateIso : parsed.date;

    let formattedDate = '01/07/2026';
    if (dateIso) {
      const parts = dateIso.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    const finalString = `${hours || '0'} horas - ${formattedDate}`;
    handleUpdateLessonPlanCell(rowId, 'hoursDate', finalString);
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="space-y-6 w-full max-w-[99%] mx-auto pb-20 animate-fadeIn">
      <div className="flex justify-between items-center px-2 print:hidden">
        <button
          onClick={onBack}
          className="text-xs font-black uppercase text-slate-500 hover:text-slate-900 transition-all flex items-center gap-1 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          ← Voltar para Painel
        </button>
        <button
          onClick={() => setIsEditingHeader(!isEditingHeader)}
          className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-md"
        >
          {isEditingHeader ? 'Cancelar Edição' : 'Editar Unidade Atual'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800 print:bg-white print:text-slate-900 print:border-none print:shadow-none print:p-0 print:mb-6">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-[1000] select-none pointer-events-none print:hidden">
          SENAI
        </div>

        {!isEditingHeader ? (
          <div className="space-y-4 relative z-10 print:space-y-2">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md print:hidden">
              <span>{unit.code || unit.id || 'UC'}</span>
              <span>—</span>
              <span>{unit.semester || 1}º Semestre</span>
              <span className="opacity-75">({unit.totalHours || unit.workload || 0}h)</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tight text-white print:text-slate-900 print:text-2xl">
              {unit.name}
            </h1>
          </div>
        ) : (
          <div className="space-y-4 relative z-10 bg-slate-800 p-6 rounded-2xl border border-slate-700 print:hidden">
            <h3 className="text-xs font-black uppercase text-blue-400 tracking-widest">
              Editando Dados da Unidade Curricular
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Sigla / ID</label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white uppercase focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Nome da Unidade</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white uppercase focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Carga Horária (h)</label>
                <input
                  type="number"
                  value={totalHours}
                  onChange={e => setTotalHours(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <select
                value={semester}
                onChange={e => setSemester(Number(e.target.value) as SemesterNumber)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs font-bold text-white uppercase focus:outline-none"
              >
                <option value={1}>1º Semestre</option>
                <option value={2}>2º Semestre</option>
                <option value={3}>3º Semestre</option>
                <option value={4}>4º Semestre</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingHeader(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-[10px] font-black uppercase transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveHeader}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase shadow-lg transition-all"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden p-2 print:border-none print:shadow-none print:p-0">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4 print:hidden">
          <button
            onClick={() => setActiveTab('geral')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'geral' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Geral
          </button>
          <button
            onClick={() => setActiveTab('situacao-problema')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'situacao-problema' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Situação-Problema
          </button>
          <button
            onClick={() => setActiveTab('rubricas')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'rubricas' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Rubricas
          </button>
          <button
            onClick={() => setActiveTab('plano-aula')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'plano-aula' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Plano de Aula
          </button>
          <button
            onClick={() => setActiveTab('calendario')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'calendario' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Calendário
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6 print:p-0">
          {activeTab === 'geral' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black uppercase text-blue-600 tracking-[0.2em]">
                  Matriz Curricular (Capacidades e Conhecimentos)
                </h3>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                      <th className="p-4 w-1/2 border-r border-slate-800">
                        Capacidades (Técnicas e Socioemocionais)
                      </th>
                      <th className="p-4 w-1/2">
                        Conhecimentos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-blue-50/50">
                      <td colSpan={2} className="p-3 font-[1000] text-blue-950 uppercase text-[10px] tracking-widest border-t border-b border-slate-200 flex justify-between items-center">
                        <span>Capacidades Técnicas</span>
                        <button
                          type="button"
                          onClick={handleAddTechnicalCapacity}
                          title="Adicionar Capacidade Técnica"
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase shadow-sm transition-all"
                        >
                          + Adicionar
                        </button>
                      </td>
                    </tr>
                    {(!unit.technicalCapacities || unit.technicalCapacities.length === 0) ? (
                      <tr>
                        <td className="p-4 text-slate-400 italic" colSpan={2}>
                          Nenhuma capacidade técnica cadastrada. Clique em "+ Adicionar" acima.
                        </td>
                      </tr>
                    ) : (
                      unit.technicalCapacities.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/80 group">
                          <td className="p-3 border-r border-slate-200 align-middle">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleUpdateTechnicalCapacity(index, e.target.value)}
                                placeholder="Digite a capacidade técnica..."
                                className="w-full bg-transparent focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none border border-transparent focus:border-blue-300"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteTechnicalCapacity(index)}
                                title="Remover linha"
                                className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-colors text-[10px] font-black shrink-0 opacity-0 group-hover:opacity-100"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-slate-300 italic text-xs align-middle bg-slate-50/30"></td>
                        </tr>
                      ))
                    )}

                    <tr className="bg-emerald-50/50">
                      <td colSpan={2} className="p-3 font-[1000] text-emerald-950 uppercase text-[10px] tracking-widest border-t border-b border-slate-200 flex justify-between items-center">
                        <span>Capacidades Socioemocionais</span>
                        <button
                          type="button"
                          onClick={handleAddSocialCapacity}
                          title="Adicionar Capacidade Socioemocional"
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase shadow-sm transition-all"
                        >
                          + Adicionar
                        </button>
                      </td>
                    </tr>
                    {(!unit.socialCapacities || unit.socialCapacities.length === 0) ? (
                      <tr>
                        <td className="p-4 text-slate-400 italic" colSpan={2}>
                          Nenhuma capacidade socioemocional cadastrada. Clique em "+ Adicionar" acima.
                        </td>
                      </tr>
                    ) : (
                      unit.socialCapacities.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/80 group">
                          <td className="p-3 border-r border-slate-200 align-middle">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleUpdateSocialCapacity(index, e.target.value)}
                                placeholder="Digite a capacidade socioemocional..."
                                className="w-full bg-transparent focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none border border-transparent focus:border-emerald-300"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteSocialCapacity(index)}
                                title="Remover linha"
                                className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-colors text-[10px] font-black shrink-0 opacity-0 group-hover:opacity-100"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-slate-300 italic text-xs align-middle bg-slate-50/30"></td>
                        </tr>
                      ))
                    )}

                    <tr className="bg-purple-50/50">
                      <td colSpan={2} className="p-3 font-[1000] text-purple-950 uppercase text-[10px] tracking-widest border-t border-b border-slate-200 flex justify-between items-center">
                        <span>Conhecimentos</span>
                        <button
                          type="button"
                          onClick={handleAddKnowledge}
                          title="Adicionar Conhecimento"
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-black uppercase shadow-sm transition-all"
                        >
                          + Adicionar
                        </button>
                      </td>
                    </tr>
                    {(!unit.knowledges || unit.knowledges.length === 0) ? (
                      <tr>
                        <td className="p-4 text-slate-400 italic" colSpan={2}>
                          Nenhum conhecimento cadastrado. Clique em "+ Adicionar" acima.
                        </td>
                      </tr>
                    ) : (
                      unit.knowledges.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/80 group">
                          <td className="p-3 border-r border-slate-200 align-middle bg-slate-50/35"></td>
                          <td className="p-3 align-middle bg-white">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleUpdateKnowledge(index, e.target.value)}
                                placeholder="Digite o conhecimento..."
                                className="w-full bg-transparent focus:bg-white focus:ring-1 focus:ring-purple-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none border border-transparent focus:border-purple-300"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteKnowledge(index)}
                                title="Remover linha"
                                className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-colors text-[10px] font-black shrink-0 opacity-0 group-hover:opacity-100"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'situacao-problema' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="text-lg font-[1000] uppercase italic text-slate-900 tracking-wider">Situações-Problema</h3>
                <button
                  type="button"
                  onClick={handleAddSituation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  + Adicionar Situação
                </button>
              </div>

              {(!unit.learningSituations || unit.learningSituations.length === 0) ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase">
                  Nenhuma situação-problema cadastrada. Clique em "Adicionar Situação" para iniciar.
                </div>
              ) : (
                unit.learningSituations.map((sit) => (
                  <div key={sit.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <input
                        type="text"
                        value={sit.title}
                        onChange={(e) => handleUpdateSituation(sit.id, 'title', e.target.value)}
                        className="w-full md:w-3/4 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-[1000] text-slate-900 uppercase focus:outline-none focus:border-blue-500 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteSituation(sit.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm cursor-pointer"
                      >
                        Excluir Situação
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Contextualização</label>
                      <textarea
                        rows={4}
                        value={sit.contextualization}
                        onChange={(e) => handleUpdateSituation(sit.id, 'contextualization', e.target.value)}
                        onInput={handleTextareaInput}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 shadow-inner resize-none overflow-hidden"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Desafio</label>
                      <textarea
                        rows={4}
                        value={sit.challenge}
                        onChange={(e) => handleUpdateSituation(sit.id, 'challenge', e.target.value)}
                        onInput={handleTextareaInput}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 shadow-inner resize-none overflow-hidden"
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resultados Esperados</label>
                        <button
                          type="button"
                          onClick={() => handleAddExpectedResult(sit.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          + Adicionar Resultado
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(!sit.expectedResults || sit.expectedResults.length === 0) ? (
                          <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">Nenhum resultado esperado cadastrado.</p>
                        ) : (
                          sit.expectedResults.map((res, rIndex) => (
                            <div key={rIndex} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                              <input
                                type="text"
                                value={res}
                                onChange={(e) => handleUpdateExpectedResult(sit.id, rIndex, e.target.value)}
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteExpectedResult(sit.id, rIndex)}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-black transition-all cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'rubricas' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-[1000] uppercase italic text-slate-900 tracking-wider">Matriz de Rubricas</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Critérios de avaliação por nível de desempenho</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddRubricRow}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  + Adicionar Rubrica
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-300 rounded-lg bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                      <th className="p-3 border border-slate-700 w-1/5">Referência</th>
                      <th className="p-3 border border-slate-700 w-1/5 text-red-400">NSA</th>
                      <th className="p-3 border border-slate-700 w-1/5 text-orange-400">APO</th>
                      <th className="p-3 border border-slate-700 w-1/5 text-blue-400">PAR</th>
                      <th className="p-3 border border-slate-700 w-1/5 text-emerald-400">AUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!unit.rubrics || unit.rubrics.length === 0) ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400 italic text-xs">
                          Nenhuma rubrica cadastrada. Clique em "+ Adicionar Rubrica" acima.
                        </td>
                      </tr>
                    ) : (
                      unit.rubrics.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50">
                          <td className="p-2 border border-slate-300 align-top bg-slate-50/60">
                            <textarea
                              rows={3}
                              value={typeof row.reference === 'string' ? row.reference : JSON.stringify(row.reference || '')}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'reference', e.target.value)}
                              placeholder="Capacidade / Referência..."
                              className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-900 resize-none outline-none"
                            />
                            <div className="pt-2 border-t border-slate-200 mt-2 flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleDeleteRubricRow(row.id)}
                                className="text-[9px] font-black uppercase text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
                              >
                                Excluir Linha
                              </button>
                            </div>
                          </td>
                          <td className="p-2 border border-slate-300 align-top">
                            <textarea
                              rows={4}
                              value={typeof row.nsa === 'string' ? row.nsa : JSON.stringify(row.nsa || '')}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'nsa', e.target.value)}
                              placeholder="Não atende..."
                              className="w-full bg-transparent border-none focus:ring-0 text-xs text-slate-700 resize-none outline-none"
                            />
                          </td>
                          <td className="p-2 border border-slate-300 align-top">
                            <textarea
                              rows={4}
                              value={typeof row.apo === 'string' ? row.apo : JSON.stringify(row.apo || '')}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'apo', e.target.value)}
                              placeholder="Atende parcialmente..."
                              className="w-full bg-transparent border-none focus:ring-0 text-xs text-slate-700 resize-none outline-none"
                            />
                          </td>
                          <td className="p-2 border border-slate-300 align-top">
                            <textarea
                              rows={4}
                              value={typeof row.par === 'string' ? row.par : JSON.stringify(row.par || '')}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'par', e.target.value)}
                              placeholder="Atende com ressalvas..."
                              className="w-full bg-transparent border-none focus:ring-0 text-xs text-slate-700 resize-none outline-none"
                            />
                          </td>
                          <td className="p-2 border border-slate-300 align-top">
                            <textarea
                              rows={4}
                              value={typeof row.aut === 'string' ? row.aut : JSON.stringify(row.aut || '')}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'aut', e.target.value)}
                              placeholder="Atende com autonomia..."
                              className="w-full bg-transparent border-none focus:ring-0 text-xs text-slate-700 resize-none outline-none"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'plano-aula' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="text-lg font-[1000] uppercase italic text-slate-900 tracking-wider">Plano de Aula / Cronograma</h3>
                <button
                  type="button"
                  onClick={handleAddLessonPlanRow}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  + Adicionar Aula
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                      <th className="p-4 border-r border-slate-800 w-1/6">Carga / Data</th>
                      <th className="p-4 border-r border-slate-800 w-1/4">Capacidades</th>
                      <th className="p-4 border-r border-slate-800 w-1/4">Conhecimentos</th>
                      <th className="p-4 border-r border-slate-800 w-1/6">Estratégias / Recursos</th>
                      <th className="p-4 text-center w-16">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {lessonPlanList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400 italic">Nenhum plano de aula cadastrado.</td>
                      </tr>
                    ) : (
                      lessonPlanList.map((row) => {
                        const parsed = parseHoursAndDate(row.hoursDate);
                        return (
                          <tr key={row.id} className="hover:bg-slate-50/50">
                            <td className="p-3 border-r border-slate-200 align-top space-y-2">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={parsed.hours}
                                  onChange={(e) => handleUpdateHoursOrDate(row.id, row.hoursDate, e.target.value, parsed.date)}
                                  className="w-12 bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs font-bold text-center"
                                />
                                <span className="text-[10px] font-bold text-slate-500">h</span>
                              </div>
                              <input
                                type="date"
                                value={parsed.date}
                                onChange={(e) => handleUpdateHoursOrDate(row.id, row.hoursDate, parsed.hours, e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1 text-[10px] font-bold text-slate-700"
                              />
                            </td>
                            <td className="p-3 border-r border-slate-200 align-top">
                              <textarea
                                rows={3}
                                value={row.capacities || ''}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'capacities', e.target.value)}
                                className="w-full bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-lg p-1 text-xs font-bold text-slate-800 resize-none outline-none"
                              />
                            </td>
                            <td className="p-3 border-r border-slate-200 align-top">
                              <textarea
                                rows={3}
                                value={row.knowledges || ''}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'knowledges', e.target.value)}
                                className="w-full bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-lg p-1 text-xs font-bold text-slate-800 resize-none outline-none"
                              />
                            </td>
                            <td className="p-3 border-r border-slate-200 align-top space-y-2">
                              <textarea
                                rows={2}
                                value={row.strategies || ''}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'strategies', e.target.value)}
                                placeholder="Estratégia..."
                                className="w-full bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-lg p-1 text-[11px] text-slate-700 resize-none outline-none"
                              />
                              <textarea
                                rows={2}
                                value={row.resources || ''}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'resources', e.target.value)}
                                placeholder="Recursos..."
                                className="w-full bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-lg p-1 text-[11px] text-slate-500 resize-none outline-none"
                              />
                            </td>
                            <td className="p-3 text-center align-middle">
                              <button
                                type="button"
                                onClick={() => handleDeleteLessonPlanRow(row.id)}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-black transition-all cursor-pointer"
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'calendario' && (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 font-bold uppercase text-xs">
              Módulo de Calendário em desenvolvimento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitViewer;
