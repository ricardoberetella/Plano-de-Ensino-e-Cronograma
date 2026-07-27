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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 animate-fadeIn">
      {/* Barra de Navegação Superior */}
      <div className="flex justify-between items-center">
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

        <div className="p-6 md:p-8 space-y-6">
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
                          onClick={() => handleDeleteTechnicalCapacity(index)}
                          className="text-slate-400 hover:text-red-600 text-[10px] font-black uppercase px-2 py-1 transition-colors"
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
                          onClick={() => handleDeleteSocialCapacity(index)}
                          className="text-slate-400 hover:text-red-600 text-[10px] font-black uppercase px-2 py-1 transition-colors"
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
                          onClick={() => handleDeleteKnowledge(index)}
                          className="text-slate-400 hover:text-red-600 text-[10px] font-black uppercase px-2 py-1 transition-colors"
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
                  onClick={handleAddSituation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all"
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
                        onClick={() => handleDeleteSituation(sit.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm"
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
                          onClick={() => handleAddExpectedResult(sit.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all"
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
                                onClick={() => handleDeleteExpectedResult(sit.id, rIndex)}
                                className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
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

          {activeTab !== 'geral' && activeTab !== 'situacao-problema' && (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Módulo de {activeTab.replace('-', ' ')} ativo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitViewer;
