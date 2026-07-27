import React, { useState } from 'react';
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

  // Estados para inserção rápida nas colunas (Geral)
  const [newTechCap, setNewTechCap] = useState('');
  const [newSocialCap, setNewSocialCap] = useState('');
  const [newKnowledge, setNewKnowledge] = useState('');

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

  // Funções de manipulação de Capacidades e Conhecimentos
  const handleAddTechnicalCapacity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechCap.trim()) return;
    const updatedTechs = [...(unit.technicalCapacities || []), newTechCap.trim()];
    onUpdateUnit({ ...unit, technicalCapacities: updatedTechs });
    setNewTechCap('');
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

  const handleAddSocialCapacity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialCap.trim()) return;
    const updatedSocials = [...(unit.socialCapacities || []), newSocialCap.trim()];
    onUpdateUnit({ ...unit, socialCapacities: updatedSocials });
    setNewSocialCap('');
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

  const handleAddKnowledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKnowledge.trim()) return;
    const updatedKnowledges = [...(unit.knowledges || []), newKnowledge.trim()];
    onUpdateUnit({ ...unit, knowledges: updatedKnowledges });
    setNewKnowledge('');
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

  // Funções para Plano de Aula / Cronograma (Modificadas para uso estável com setState local imediato)
  const [lessonPlanList, setLessonPlanList] = useState(unit.lessonPlan || []);

  // Sincroniza caso mude externamente
  React.useEffect(() => {
    setLessonPlanList(unit.lessonPlan || []);
  }, [unit.lessonPlan]);

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

  return (
    <div className="space-y-6 w-full max-w-[99%] mx-auto pb-20 animate-fadeIn">
      {/* Barra de Navegação Superior */}
      <div className="flex justify-between items-center px-2">
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
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-[1000] select-none pointer-events-none">
          SENAI
        </div>

        {!isEditingHeader ? (
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">
              <span>{unit.code || unit.id || 'UC'}</span>
              <span>—</span>
              <span>{unit.semester || 1}º Semestre</span>
              <span className="opacity-75">({unit.totalHours || unit.workload || 0}h)</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tight text-white">
              {unit.name}
            </h1>
          </div>
        ) : (
          <div className="space-y-4 relative z-10 bg-slate-800 p-6 rounded-2xl border border-slate-700">
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
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden p-2">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4">
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

        <div className="p-4 md:p-6 space-y-6">
          {activeTab === 'geral' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* COLUNA 1: CAPACIDADES (Técnicas e Socioemocionais) */}
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase text-blue-600 tracking-[0.2em]">
                    1. Capacidades (Técnicas e Socioemocionais)
                  </h3>
                </div>

                {/* Form Adicionar Capacidade Técnica */}
                <form onSubmit={handleAddTechnicalCapacity} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">+ Adicionar Capacidade Técnica</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechCap}
                      onChange={(e) => setNewTechCap(e.target.value)}
                      placeholder="Ex: Planejar processos de usinagem..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm">
                      Adicionar
                    </button>
                  </div>
                </form>

                {/* Listagem de Capacidades Técnicas */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Técnicas Cadastradas</h4>
                  {(!unit.technicalCapacities || unit.technicalCapacities.length === 0) ? (
                    <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">Nenhuma capacidade técnica cadastrada.</p>
                  ) : (
                    unit.technicalCapacities.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleUpdateTechnicalCapacity(index, e.target.value)}
                          className="flex-1 bg-transparent text-xs font-bold text-slate-800 focus:outline-none border-b border-transparent focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteTechnicalCapacity(index)}
                          className="text-slate-400 hover:text-red-600 text-[10px] font-black uppercase px-2 py-1 transition-colors cursor-pointer"
                        >
                          Excluir ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Form Adicionar Capacidade Socioemocional */}
                <form onSubmit={handleAddSocialCapacity} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 pt-6">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">+ Adicionar Capacidade Socioemocional</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSocialCap}
                      onChange={(e) => setNewSocialCap(e.target.value)}
                      placeholder="Ex: Demonstrar organização no posto de trabalho..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm">
                      Adicionar
                    </button>
                  </div>
                </form>

                {/* Listagem de Capacidades Socioemocionais */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Socioemocionais Cadastradas</h4>
                  {(!unit.socialCapacities || unit.socialCapacities.length === 0) ? (
                    <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">Nenhuma capacidade socioemocional cadastrada.</p>
                  ) : (
                    unit.socialCapacities.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleUpdateSocialCapacity(index, e.target.value)}
                          className="flex-1 bg-transparent text-xs font-bold text-slate-800 focus:outline-none border-b border-transparent focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSocialCapacity(index)}
                          className="text-slate-400 hover:text-red-600 text-[10px] font-black uppercase px-2 py-1 transition-colors cursor-pointer"
                        >
                          Excluir ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

              </div>

              {/* COLUNA 2: CONHECIMENTOS */}
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase text-blue-600 tracking-[0.2em]">
                    2. Conhecimentos
                  </h3>
                </div>

                {/* Form Adicionar Conhecimento */}
                <form onSubmit={handleAddKnowledge} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">+ Adicionar Conhecimento</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newKnowledge}
                      onChange={(e) => setNewKnowledge(e.target.value)}
                      placeholder="Ex: Parâmetros de corte para tornos CNC..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm">
                      Adicionar
                    </button>
                  </div>
                </form>

                {/* Listagem de Conhecimentos */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Conhecimentos Cadastrados</h4>
                  {(!unit.knowledges || unit.knowledges.length === 0) ? (
                    <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">Nenhum conhecimento cadastrado.</p>
                  ) : (
                    unit.knowledges.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleUpdateKnowledge(index, e.target.value)}
                          className="flex-1 bg-transparent text-xs font-bold text-slate-800 focus:outline-none border-b border-transparent focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteKnowledge(index)}
                          className="text-slate-400 hover:text-red-600 text-[10px] font-black uppercase px-2 py-1 transition-colors cursor-pointer"
                        >
                          Excluir ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

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
                    
                    {/* TÍTULO DA SITUAÇÃO COM BOTÃO EXCLUIR */}
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

                    {/* CONTEXTUALIZAÇÃO */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Contextualização</label>
                      <textarea
                        rows={4}
                        value={sit.contextualization}
                        onChange={(e) => handleUpdateSituation(sit.id, 'contextualization', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 shadow-inner"
                      />
                    </div>

                    {/* DESAFIO */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Desafio</label>
                      <textarea
                        rows={4}
                        value={sit.challenge}
                        onChange={(e) => handleUpdateSituation(sit.id, 'challenge', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 shadow-inner"
                      />
                    </div>

                    {/* RESULTADOS ESPERADOS */}
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
                          {/* Referência */}
                          <td className="p-4 border-r border-slate-100 align-top space-y-2">
                            <textarea
                              rows={3}
                              value={row.reference}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'reference', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteRubricRow(row.id)}
                              className="w-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-1 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer"
                            >
                              Excluir Linha
                            </button>
                          </td>

                          {/* NSA */}
                          <td className="p-4 border-r border-slate-100 align-top">
                            <textarea
                              rows={4}
                              value={row.nsa}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'nsa', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* APO */}
                          <td className="p-4 border-r border-slate-100 align-top">
                            <textarea
                              rows={4}
                              value={row.apo}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'apo', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* PAR */}
                          <td className="p-4 border-r border-slate-100 align-top">
                            <textarea
                              rows={4}
                              value={row.par}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'par', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                            />
                          </td>

                          {/* AUT */}
                          <td className="p-4 align-top">
                            <textarea
                              rows={4}
                              value={row.aut}
                              onChange={(e) => handleUpdateRubricCell(row.id, 'aut', e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
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
                    Imprimir
                  </button>
                </div>
              </div>

              {(lessonPlanList.length === 0) ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase">
                  Nenhum registro de aula cadastrado. Clique em "+ Adicionar Aula / Data" para iniciar.
                </div>
              ) : (
                <div className="overflow-x-auto shadow-md bg-white rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-[10px] font-black uppercase tracking-wider text-white">
                        <th className="p-3 w-[16%] border-r border-slate-800 text-center">HORAS/AULAS/DATA</th>
                        <th className="p-3 w-[24%] border-r border-slate-800 text-center">CAPACIDADES</th>
                        <th className="p-3 w-[24%] border-r border-slate-800 text-center">CONHECIMENTOS</th>
                        <th className="p-3 w-[18%] border-r border-slate-800 text-center">ESTRATÉGIAS</th>
                        <th className="p-3 border-r border-slate-800 text-center">RECURSOS/AMBIENTES</th>
                        <th className="p-3 text-center w-16">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {lessonPlanList.map((row) => {
                        const isCompleted = row.completed;
                        return (
                          <tr 
                            key={row.id} 
                            className={`transition-colors ${isCompleted ? 'bg-emerald-50/80 hover:bg-emerald-50' : 'bg-white hover:bg-slate-50'}`}
                          >
                            {/* Horas/Aulas/Data */}
                            <td className="p-2 border-r border-slate-200 align-top">
                              <textarea
                                rows={3}
                                value={row.hoursDate}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'hoursDate', e.target.value)}
                                className={`w-full p-2 text-xs font-bold focus:outline-none resize-none rounded-xl border ${isCompleted ? 'bg-emerald-100/60 text-emerald-900 border-emerald-300' : 'bg-slate-50 text-slate-800 border-slate-200'}`}
                                placeholder="Ex: 4 horas - 01/07/2026"
                              />
                              <div className="mt-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteLessonPlanRow(row.id);
                                  }}
                                  className="w-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-1 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer"
                                >
                                  Excluir
                                </button>
                              </div>
                            </td>

                            {/* Capacidades */}
                            <td className="p-2 border-r border-slate-200 align-top">
                              <textarea
                                rows={4}
                                value={row.capacities}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'capacities', e.target.value)}
                                className={`w-full p-2 text-xs font-bold focus:outline-none resize-none rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300' : 'bg-slate-50 text-slate-800 border-slate-200'}`}
                              />
                            </td>

                            {/* Conhecimentos */}
                            <td className="p-2 border-r border-slate-200 align-top">
                              <textarea
                                rows={4}
                                value={row.knowledges}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'knowledges', e.target.value)}
                                className={`w-full p-2 text-xs font-bold focus:outline-none resize-none rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300' : 'bg-slate-50 text-slate-800 border-slate-200'}`}
                              />
                            </td>

                            {/* Estratégias */}
                            <td className="p-2 border-r border-slate-200 align-top">
                              <textarea
                                rows={4}
                                value={row.strategies}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'strategies', e.target.value)}
                                className={`w-full p-2 text-xs font-bold focus:outline-none resize-none rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300' : 'bg-slate-50 text-slate-800 border-slate-200'}`}
                              />
                            </td>

                            {/* Recursos/Ambientes */}
                            <td className="p-2 border-r border-slate-200 align-top">
                              <textarea
                                rows={4}
                                value={row.resources}
                                onChange={(e) => handleUpdateLessonPlanCell(row.id, 'resources', e.target.value)}
                                className={`w-full p-2 text-xs font-bold focus:outline-none resize-none rounded-xl border ${isCompleted ? 'bg-emerald-100/40 text-emerald-950 border-emerald-300' : 'bg-slate-50 text-slate-800 border-slate-200'}`}
                              />
                            </td>

                            {/* Status / OK */}
                            <td className="p-2 align-middle text-center">
                              <button
                                type="button"
                                onClick={() => handleUpdateLessonPlanCell(row.id, 'completed', !isCompleted)}
                                className={`w-8 h-8 mx-auto rounded-xl flex items-center justify-center transition-all shadow-sm font-black text-[10px] uppercase cursor-pointer ${
                                  isCompleted 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                }`}
                                title={isCompleted ? 'Aula marcada como dada (Concluída)' : 'Marcar como aula dada'}
                              >
                                {isCompleted ? '✓' : 'OK'}
                              </button>
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
