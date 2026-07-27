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

  // Funções de manipulação de Capacidades e Conhecimentos diretamente nas listas com botão de adicionar linha abaixo
  const handleAddTechnicalCapacityBelow = (index: number) => {
    const techs = [...(unit.technicalCapacities || [])];
    techs.splice(index + 1, 0, '');
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

  const handleAddSocialCapacityBelow = (index: number) => {
    const socials = [...(unit.socialCapacities || [])];
    socials.splice(index + 1, 0, '');
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

  const handleAddKnowledgeBelow = (index: number) => {
    const knowledges = [...(unit.knowledges || [])];
    knowledges.splice(index + 1, 0, '');
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

  // Funções para Situações-Problema
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

  // Funções para Rubricas
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

  // Estado local para o plano de aula
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
      {/* Barra de Navegação Superior */}
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

      {/* CABEÇALHO ESCURO */}
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

      {/* ABAS DE NAVEGAÇÃO INTERNA */}
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

              {/* TABELA COM 2 COLUNAS E OS 3 CABEÇALHOS SOLICITADOS */}
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
                    
                    {/* SEÇÃO 1: CAPACIDADES TÉCNICAS */}
                    <tr className="bg-blue-50/50">
                      <td colSpan={2} className="p-3 font-[1000] text-blue-950 uppercase text-[10px] tracking-widest border-t border-b border-slate-200">
                        Capacidades Técnicas
                      </td>
                    </tr>
                    {(!unit.technicalCapacities || unit.technicalCapacities.length === 0) ? (
                      <tr>
                        <td className="p-4 text-slate-400 italic" colSpan={2}>
                          Nenhuma capacidade técnica cadastrada.
                          <button
                            type="button"
                            onClick={() => onUpdateUnit({ ...unit, technicalCapacities: [''] })}
                            className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase"
                          >
                            + Adicionar Primeira
                          </button>
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
                                onClick={() => handleAddTechnicalCapacityBelow(index)}
                                title="Adicionar linha abaixo"
                                className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 rounded-xl transition-colors text-xs font-black shrink-0"
                              >
                                +
                              </button>
                              {unit.technicalCapacities.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTechnicalCapacity(index)}
                                  title="Remover linha"
                                  className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-colors text-[10px] font-black shrink-0 opacity-0 group-hover:opacity-100"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-slate-300 italic text-xs align-middle bg-slate-50/30">
                            {/* Célula vazia para manter o alinhamento da coluna da direita */}
                          </td>
                        </tr>
                      ))
                    )}

                    {/* SEÇÃO 2: CAPACIDADES SOCIOEMOCIONAIS */}
                    <tr className="bg-emerald-50/50">
                      <td colSpan={2} className="p-3 font-[1000] text-emerald-950 uppercase text-[10px] tracking-widest border-t border-b border-slate-200">
                        Capacidades Socioemocionais
                      </td>
                    </tr>
                    {(!unit.socialCapacities || unit.socialCapacities.length === 0) ? (
                      <tr>
                        <td className="p-4 text-slate-400 italic" colSpan={2}>
                          Nenhuma capacidade socioemocional cadastrada.
                          <button
                            type="button"
                            onClick={() => onUpdateUnit({ ...unit, socialCapacities: [''] })}
                            className="ml-3 px-3 py-1 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase"
                          >
                            + Adicionar Primeira
                          </button>
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
                                onClick={() => handleAddSocialCapacityBelow(index)}
                                title="Adicionar linha abaixo"
                                className="p-2 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-xl transition-colors text-xs font-black shrink-0"
                              >
                                +
                              </button>
                              {unit.socialCapacities.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSocialCapacity(index)}
                                  title="Remover linha"
                                  className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-colors text-[10px] font-black shrink-0 opacity-0 group-hover:opacity-100"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-slate-300 italic text-xs align-middle bg-slate-50/30"></td>
                        </tr>
                      ))
                    )}

                    {/* SEÇÃO 3: CONHECIMENTOS (Na segunda coluna) */}
                    <tr className="bg-purple-50/50">
                      <td colSpan={2} className="p-3 font-[1000] text-purple-950 uppercase text-[10px] tracking-widest border-t border-b border-slate-200">
                        Conhecimentos
                      </td>
                    </tr>
                    {(!unit.knowledges || unit.knowledges.length === 0) ? (
                      <tr>
                        <td className="p-4 text-slate-400 italic" colSpan={2}>
                          Nenhum conhecimento cadastrado.
                          <button
                            type="button"
                            onClick={() => onUpdateUnit({ ...unit, knowledges: [''] })}
                            className="ml-3 px-3 py-1 bg-purple-600 text-white rounded-lg text-[9px] font-black uppercase"
                          >
                            + Adicionar Primeiro
                          </button>
                        </td>
                      </tr>
                    ) : (
                      unit.knowledges.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/80 group">
                          <td className="p-3 border-r border-slate-200 align-middle bg-slate-50/30">
                            {/* Lado esquerdo vazio para esta seção */}
                          </td>
                          <td className="p-3 align-middle">
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
                                onClick={() => handleAddKnowledgeBelow(index)}
                                title="Adicionar linha abaixo"
                                className="p-2 bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-600 rounded-xl transition-colors text-xs font-black shrink-0"
                              >
                                +
                              </button>
                              {unit.knowledges.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteKnowledge(index)}
                                  title="Remover linha"
                                  className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-colors text-[10px] font-black shrink-0 opacity-0 group-hover:opacity-100"
                                >
                                  ✕
                                </button>
                              )}
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
                                className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer"
                              >
                                Remover
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
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Critérios de Avaliação por Nível de Desempenho</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddRubricRow}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  + Adicionar Rubrica
                </button>
              </div>

              {(!unit.rubrics || unit.rubrics.length === 0) ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase">
                  Nenhuma rubrica cadastrada. Clique em "+ Adicionar Rubrica" para iniciar.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-xl bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-[10px] font-black uppercase tracking-wider">
                        <th className="p-4 w-1/5 border-r border-slate-800 text-white">REFERÊNCIA</th>
                        <th className="p-4 w-1/5 border-r border-slate-800 text-red-500">NSA</th>
                        <th className="p-4 w-1/5 border-r border-slate-800 text-orange-500">APO</th>
                        <th className="p-4 w-1/5 border-r border-slate-800 text-blue-400">PAR</th>
                        <th className="p-4 w-1/5 text-emerald-400">AUT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {unit.rubrics.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 border-r border-slate-100 align-top space-y-2">
                            <textarea
                              rows={3}
                              value={row.reference}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'reference', e.target.value)}
                              onInput={handleTextareaInput}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteRubricRow(row.id)}
                              className="w-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-1 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer"
                            >
                              Excluir Linha
                            </button>
                          </td>
                          <td className="p-4 border-r border-slate-100 align-top">
                            <textarea
                              rows={4}
                              value={row.nsa}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'nsa', e.target.value)}
                              onInput={handleTextareaInput}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
                            />
                          </td>
                          <td className="p-4 border-r border-slate-100 align-top">
                            <textarea
                              rows={4}
                              value={row.apo}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'apo', e.target.value)}
                              onInput={handleTextareaInput}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
                            />
                          </td>
                          <td className="p-4 border-r border-slate-100 align-top">
                            <textarea
                              rows={4}
                              value={row.par}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'par', e.target.value)}
                              onInput={handleTextareaInput}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
                            />
                          </td>
                          <td className="p-4 align-top">
                            <textarea
                              rows={4}
                              value={row.aut}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'aut', e.target.value)}
                              onInput={handleTextareaInput}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'plano-aula' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4 print:hidden">
                <div>
                  <h3 className="text-lg font-[1000] uppercase italic text-slate-900 tracking-wider">Plano de Aula | Cronograma</h3>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Organização diária das aulas e distribuição de carga horária</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddLessonPlanRow}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    + Adicionar Aula / Data
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    Imprimir PDF
                  </button>
                </div>
              </div>

              {(lessonPlanList.length === 0) ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase">
                  Nenhum registro de aula cadastrado. Clique em "+ Adicionar Aula / Data" para iniciar.
                </div>
              ) : (
                <div className="overflow-x-auto shadow-md bg-white rounded-2xl border border-slate-200 print:shadow-none print:border-slate-300">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-[10px] font-black uppercase tracking-wider text-white print:bg-slate-200 print:text-slate-900">
                        <th className="p-3 w-[24%] border-r border-slate-800 print:border-slate-300 text-center">HORAS/AULAS/DATA</th>
                        <th className="p-3 w-[22%] border-r border-slate-800 print:border-slate-300 text-center">CAPACIDADES</th>
                        <th className="p-3 w-[22%] border-r border-slate-800 print:border-slate-300 text-center">CONHECIMENTOS</th>
                        <th className="p-3 w-[16%] border-r border-slate-800 print:border-slate-300 text-center">ESTRATÉGIAS</th>
                        <th className="p-3 border-r border-slate-800 print:border-slate-300 text-center">RECURSOS/AMBIENTES</th>
                        <th className="p-3 text-center w-20 print:hidden">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {lessonPlanList.map((row) => {
                        const isCompleted = row.completed;
                        const parsed = parseHoursAndDate(row.hoursDate);

                        return (
                          <tr 
                            key={row.id} 
                            className={`transition-colors ${isCompleted ? 'bg-emerald-50/80 hover:bg-emerald-50 print:bg-white' : 'bg-white hover:bg-slate-50'}`}
                          >
                            <td className="p-2 border-r border-slate-200 print:border-slate-300 align-top">
                              <div className={`p-2 rounded-xl border space-y-2 ${isCompleted ? 'bg-emerald-100/60 border-emerald-300 print:bg-white print:border-slate-300' : 'bg-slate-50 border-slate-200 print:bg-white print:border-slate-300'}`}>
                                <div className="grid grid-cols-12 gap-1.5">
                                  <div className="col-span-4">
                                    <label className="block text-[8px] font-black uppercase text-slate-500 mb-0.5">QTD. H</label>
                                    <input
                                      type="number"
                                      min="1"
                                      max="9"
                                      value={parsed.hours}
                                      onChange={(e) => handleUpdateHoursOrDate(row.id, row.hoursDate, e.target.value, parsed.date)}
                                      className={`w-full p-2 text-xs font-bold focus:outline-none rounded-xl border text-center ${isCompleted ? 'bg-emerald-50 text-emerald-950 border-emerald-300 print:bg-transparent print:border-none' : 'bg-white text-slate-800 border-slate-200 print:bg-transparent print:border-none'}`}
                                    />
                                  </div>
                                  <div className="col-span-8">
                                    <label className="block text-[8px] font-black uppercase text-slate-500 mb-0.5">DATA DA AULA</label>
                                    <input
                                      type="date"
                                      value={parsed.date}
                                      onChange={(e) => handleUpdateHoursOrDate(row.id, row.hoursDate, parsed.hours, e.target.value)}
                                      className={`w-full p-2 text-xs font-bold focus:outline-none rounded-xl border text-center ${isCompleted ? 'bg-emerald-50 text-emerald-950 border-emerald-300 print:bg-transparent print:border-none' : 'bg-white text-slate-800 border-slate-200 print:bg-transparent print:border-none'}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-2 border-r border-slate-200 print:border-slate-300 align-top">
                              <textarea
                                rows={3}
                                value={row.capacities}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'capacities', e.target.value)}
                                onInput={handleTextareaInput}
                                className={`w-full p-2.5 text-xs font-bold focus:outline-none resize-none overflow-hidden rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300 print:bg-transparent print:border-none' : 'bg-slate-50 text-slate-800 border-slate-200 print:bg-transparent print:border-none'}`}
                              />
                            </td>

                            <td className="p-2 border-r border-slate-200 print:border-slate-300 align-top">
                              <textarea
                                rows={3}
                                value={row.knowledges}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'knowledges', e.target.value)}
                                onInput={handleTextareaInput}
                                className={`w-full p-2.5 text-xs font-bold focus:outline-none resize-none overflow-hidden rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300 print:bg-transparent print:border-none' : 'bg-slate-50 text-slate-800 border-slate-200 print:bg-transparent print:border-none'}`}
                              />
                            </td>

                            <td className="p-2 border-r border-slate-200 print:border-slate-300 align-top">
                              <textarea
                                rows={3}
                                value={row.strategies}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'strategies', e.target.value)}
                                onInput={handleTextareaInput}
                                className={`w-full p-2.5 text-xs font-bold focus:outline-none resize-none overflow-hidden rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300 print:bg-transparent print:border-none' : 'bg-slate-50 text-slate-800 border-slate-200 print:bg-transparent print:border-none'}`}
                              />
                            </td>

                            <td className="p-2 border-r border-slate-200 print:border-slate-300 align-top">
                              <textarea
                                rows={3}
                                value={row.resources}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'resources', e.target.value)}
                                onInput={handleTextareaInput}
                                className={`w-full p-2.5 text-xs font-bold focus:outline-none resize-none overflow-hidden rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300 print:bg-transparent print:border-none' : 'bg-slate-50 text-slate-800 border-slate-200 print:bg-transparent print:border-none'}`}
                              />
                            </td>

                            <td className="p-2 align-middle text-center print:hidden">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateLessonPlanCell(row.id, 'completed', !isCompleted)}
                                  className={`flex-1 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm font-black text-[10px] uppercase cursor-pointer ${
                                    isCompleted 
                                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                  }`}
                                  title={isCompleted ? 'Aula marcada como dada (Concluída)' : 'Marcar como aula dada'}
                                >
                                  {isCompleted ? '✓' : 'OK'}
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteLessonPlanRow(row.id);
                                  }}
                                  className="flex-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white h-9 rounded-xl text-[9px] font-black uppercase transition-all cursor-pointer border border-red-100 shadow-sm flex items-center justify-center"
                                  title="Excluir Aula"
                                >
                                  Excluir
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendario' && (() => {
            const parsedEvents: { day: number; month: number; year: number; hours: string; completed: boolean }[] = [];
            
            if (lessonPlanList) {
              lessonPlanList.forEach(row => {
                const text = row.hoursDate || '';
                const match = text.match(/(\d{2})\/(\d{2})\/(\d{2,4})/);
                if (match) {
                  const day = parseInt(match[1], 10);
                  const month = parseInt(match[2], 10);
                  let year = parseInt(match[3], 10);
                  if (year < 100) year += 2000;

                  const parts = text.split('-');
                  const hoursLabel = parts.length > 1 ? parts[0].trim().replace(/h.*$/, 'h') : '2h';

                  parsedEvents.push({
                    day,
                    month,
                    year,
                    hours: hoursLabel,
                    completed: !!row.completed
                  });
                }
              });
            }

            const monthsToDisplay = [
              { name: 'JULHO 2026', monthNum: 7, year: 2026 },
              { name: 'AGOSTO 2026', monthNum: 8, year: 2026 },
              { name: 'SETEMBRO 2026', monthNum: 9, year: 2026 },
              { name: 'OUTUBRO 2026', monthNum: 10, year: 2026 },
              { name: 'NOVEMBRO 2026', monthNum: 11, year: 2026 },
              { name: 'DEZEMBRO 2026', monthNum: 12, year: 2026 }
            ];

            const getDaysInMonth = (month: number, year: number) => {
              return new Date(year, month, 0).getDate();
            };

            const getFirstDayOfWeek = (month: number, year: number) => {
              return new Date(year, month - 1, 1).getDay();
            };

            const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

            return (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="space-y-2 text-center md:text-left w-full">
                    <h3 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-wider text-white">
                      CALENDÁRIO DA UNIDADE
                    </h3>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                      PREENCHIDO AUTOMATICAMENTE PELAS DATAS DO PLANO DE AULA
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block animate-pulse"></span>
                    <span className="text-xs font-black uppercase text-white tracking-wider">{unit.code || unit.id || 'UC'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
                  {monthsToDisplay.map((mObj, idx) => {
                    const totalDays = getDaysInMonth(mObj.monthNum, mObj.year);
                    const startDay = getFirstDayOfWeek(mObj.monthNum, mObj.year);
                    
                    const cells = [];
                    for (let i = 0; i < startDay; i++) {
                      cells.push(null);
                    }
                    for (let d = 1; d <= totalDays; d++) {
                      cells.push(d);
                    }

                    return (
                      <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                        <div className="bg-slate-900 text-white text-center py-3.5 text-xs font-[1000] uppercase tracking-[0.2em] border-b border-slate-800">
                          {mObj.name}
                        </div>

                        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-center py-2 text-[10px] font-black text-slate-500">
                          {weekDays.map((wd, wIndex) => (
                            <span key={wIndex} className={wIndex === 0 ? 'text-red-500' : ''}>{wd}</span>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 p-3 gap-1.5 flex-1 bg-white">
                          {cells.map((dayNum, cIdx) => {
                            if (dayNum === null) {
                              return <div key={cIdx} className="h-12 md:h-14"></div>;
                            }

                            const event = parsedEvents.find(
                              ev => ev.day === dayNum && ev.month === mObj.monthNum && ev.year === mObj.year
                            );

                            const isSunday = cIdx % 7 === 0;

                            return (
                              <div
                                key={cIdx}
                                className={`h-12 md:h-14 rounded-2xl flex flex-col items-center justify-center p-1 border transition-all ${
                                  event 
                                    ? (event.completed ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-black' : 'bg-blue-600 text-white border-blue-700 shadow-md font-black')
                                    : (isSunday ? 'text-red-500 bg-slate-50/50 border-transparent font-bold text-xs' : 'text-slate-700 bg-slate-50/80 hover:bg-slate-100 border-slate-100 font-bold text-xs')
                                }`}
                              >
                                <span className={`text-xs ${event ? 'text-white font-[1000]' : ''}`}>
                                  {dayNum < 10 ? `0${dayNum}` : dayNum}
                                </span>
                                {event && (
                                  <span className="text-[9px] font-black uppercase tracking-tighter opacity-90 leading-none mt-0.5">
                                    {event.hours}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default UnitViewer;
