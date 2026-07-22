import React, { useState } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar, RubricItem } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit;
  isAdmin: boolean;
  onUpdateSchedule: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar: (newCalendar: UnitCalendar) => void;
  onUpdateUnit: (updatedUnit: CurricularUnit) => void;
}

const UnitViewer: React.FC<UnitViewerProps> = ({
  unit,
  isAdmin,
  onUpdateUnit,
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'situacao' | 'rubricas' | 'plano' | 'calendario'>('situacao');
  
  const [rubrics, setRubrics] = useState<RubricItem[]>(unit.rubrics || []);
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>(unit.schedule || []);
  const [description, setDescription] = useState(unit.description || '');
  const [problemSituation, setProblemSituation] = useState(unit.problemSituation || '');
  const [capacitiesText, setCapacitiesText] = useState(unit.capacitiesText || '');
  const [knowledgeText, setKnowledgeText] = useState(unit.knowledgeText || '');

  const handleFieldChange = (field: keyof CurricularUnit, value: any) => {
    const updated = { ...unit, [field]: value };
    onUpdateUnit(updated);
  };

  const handleAddRubricRow = () => {
    const newRow: RubricItem = {
      id: `rubric-${Date.now()}`,
      capacity: '',
      nsa: '',
      apo: '',
      par: '',
      aut: ''
    };
    const updated = [...rubrics, newRow];
    setRubrics(updated);
    onUpdateUnit({ ...unit, rubrics: updated });
  };

  const handleRubricChange = (id: string, field: keyof RubricItem, value: string) => {
    const updated = rubrics.map(r => r.id === id ? { ...r, [field]: value } : r);
    setRubrics(updated);
    onUpdateUnit({ ...unit, rubrics: updated });
  };

  const handleDeleteRubricRow = (id: string) => {
    const updated = rubrics.filter(r => r.id !== id);
    setRubrics(updated);
    onUpdateUnit({ ...unit, rubrics: updated });
  };

  const handleAddScheduleRow = () => {
    const newEntry: ScheduleEntry = {
      id: `schedule-${Date.now()}`,
      dateOrHours: '',
      capacities: '',
      knowledge: '',
      strategies: '',
      resources: ''
    };
    const updated = [...scheduleEntries, newEntry];
    setScheduleEntries(updated);
    onUpdateUnit({ ...unit, schedule: updated });
  };

  const handleScheduleChange = (id: string, field: keyof ScheduleEntry, value: string) => {
    const updated = scheduleEntries.map(s => s.id === id ? { ...s, [field]: value } : s);
    setScheduleEntries(updated);
    onUpdateUnit({ ...unit, schedule: updated });
  };

  const handleDeleteScheduleRow = (id: string) => {
    const updated = scheduleEntries.filter(s => s.id !== id);
    setScheduleEntries(updated);
    onUpdateUnit({ ...unit, schedule: updated });
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
      {/* HEADER DA UNIDADE */}
      <div className="bg-slate-900 p-8 md:p-12 text-white relative">
        <span className="bg-blue-600 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-3 inline-block">
          MSEP - Unidade Curricular
        </span>
        <h2 className="text-3xl md:text-4xl font-[1000] uppercase tracking-tight">
          {unit.name}
        </h2>
      </div>

      {/* ABAS DE NAVEGAÇÃO DA UNIDADE */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('geral')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'geral'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Geral
        </button>
        <button
          onClick={() => setActiveTab('situacao')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'situacao'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Situação-Problema
        </button>
        <button
          onClick={() => setActiveTab('rubricas')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'rubricas'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Rubricas
        </button>
        <button
          onClick={() => setActiveTab('plano')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'plano'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Plano de Aula | Cronograma
        </button>
        <button
          onClick={() => setActiveTab('calendario')}
          className={`px-8 py-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'calendario'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Calendário
        </button>
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="p-8 md:p-12">
        {activeTab === 'geral' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-lg font-[1000] uppercase text-slate-900">Informações Gerais e Objetivos</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Estrutura curricular, carga horária e diretrizes da unidade
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Carga Horária</span>
                  <span className="text-sm font-black text-slate-800">{unit.workload || 40}h</span>
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Semestre</span>
                  <span className="text-sm font-black text-slate-800">{unit.semester || 1}º Semestre</span>
                </div>
              </div>
            </div>

            {isAdmin ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Objetivo da Unidade Curricular</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={(e) => handleFieldChange('description', e.target.value)}
                    placeholder="Digite o objetivo geral da unidade..."
                    className="w-full h-28 p-4 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 text-white rounded-2xl">
                      <h4 className="text-xs font-black uppercase tracking-wider">Capacidades Técnicas e Socioemocionais</h4>
                    </div>
                    <textarea
                      value={capacitiesText}
                      onChange={(e) => setCapacitiesText(e.target.value)}
                      onBlur={(e) => handleFieldChange('capacitiesText', e.target.value)}
                      placeholder="Insira as capacidades básicas e socioemocionais..."
                      className="w-full h-96 p-4 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 text-white rounded-2xl">
                      <h4 className="text-xs font-black uppercase tracking-wider">Conhecimentos</h4>
                    </div>
                    <textarea
                      value={knowledgeText}
                      onChange={(e) => setKnowledgeText(e.target.value)}
                      onBlur={(e) => handleFieldChange('knowledgeText', e.target.value)}
                      placeholder="Insira os conhecimentos abordados..."
                      className="w-full h-96 p-4 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-2">Objetivo</span>
                  <p className="text-sm text-slate-700 font-medium whitespace-pre-wrap">{unit.description || 'Nenhum objetivo informado.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider border-b border-slate-200 pb-2">Capacidades Técnicas e Socioemocionais</h4>
                    <p className="text-xs text-slate-700 font-medium whitespace-pre-wrap">{unit.capacitiesText || 'Nenhuma capacidade cadastrada.'}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider border-b border-slate-200 pb-2">Conhecimentos</h4>
                    <p className="text-xs text-slate-700 font-medium whitespace-pre-wrap">{unit.knowledgeText || 'Nenhum conhecimento cadastrado.'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'situacao' && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-[1000] uppercase text-slate-900">Situação-Problema / Desafio / Resultados Esperados</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                Contextualização do cenário industrial, desafio técnico e entregas exigidas dos aprendizes[cite: 2]
              </p>
            </div>

            {isAdmin ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Texto Completo da Situação-Problema (Contextualização, Desafio e Resultados)</label>
                  <textarea
                    value={problemSituation}
                    onChange={(e) => setProblemSituation(e.target.value)}
                    onBlur={(e) => handleFieldChange('problemSituation', e.target.value)}
                    placeholder="Digite ou cole aqui a situação-problema estruturada..."
                    className="w-full h-[500px] p-6 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium leading-relaxed"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block">Descrição da Atividade Prática</span>
                  <p className="text-xs text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                    {unit.problemSituation || 'Nenhuma situação-problema cadastrada para esta unidade.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rubricas' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-[1000] uppercase text-slate-900">Rubricas (Critérios Graduais)[cite: 2]</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Defina as capacidades e os níveis de desempenho (NSA, APO, PAR, AUT)[cite: 2]
                </p>
              </div>
              {isAdmin && (
                <button
                  onClick={handleAddRubricRow}
                  className="px-6 py-3 rounded-xl text-xs font-black uppercase bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
                >
                  <span>+ Adicionar Linha</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center">Capacidades[cite: 2]</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center text-red-400">NSA[cite: 2]</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center text-amber-400">APO[cite: 2]</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center text-blue-400">PAR[cite: 2]</th>
                    <th className="py-4 px-4 w-1/5 text-center text-emerald-400">AUT[cite: 2]</th>
                    {isAdmin && <th className="py-4 px-2 w-12 text-center">Ações</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rubrics.map((rubric) => (
                    <tr key={rubric.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={rubric.capacity}
                            onChange={(e) => handleRubricChange(rubric.id, 'capacity', e.target.value)}
                            placeholder="Digite a capacidade..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{rubric.capacity}</p>
                        )}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={rubric.nsa}
                            onChange={(e) => handleRubricChange(rubric.id, 'nsa', e.target.value)}
                            placeholder="Não Suficiente..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{rubric.nsa}</p>
                        )}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={rubric.apo}
                            onChange={(e) => handleRubricChange(rubric.id, 'apo', e.target.value)}
                            placeholder="Acompanhamento Parcial..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{rubric.apo}</p>
                        )}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={rubric.par}
                            onChange={(e) => handleRubricChange(rubric.id, 'par', e.target.value)}
                            placeholder="Autonomia Parcial..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{rubric.par}</p>
                        )}
                      </td>
                      <td className="p-3 align-top">
                        {isAdmin ? (
                          <textarea
                            value={rubric.aut}
                            onChange={(e) => handleRubricChange(rubric.id, 'aut', e.target.value)}
                            placeholder="Autonomia Total..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{rubric.aut}</p>
                        )}
                      </td>
                      {isAdmin && (
                        <td className="p-3 text-center align-middle">
                          <button
                            onClick={() => handleDeleteRubricRow(rubric.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Excluir linha"
                          >
                            ✕
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {rubrics.length === 0 && (
                    <tr>
                      <td colSpan={isAdmin ? 6 : 5} className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                        Nenhuma rubrica cadastrada. Clique em "+ Adicionar Linha" para preencher manualmente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'plano' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-[1000] uppercase text-slate-900">Plano de Aula | Cronograma</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Distribuição de aulas, capacidades, conhecimentos, estratégias e recursos
                </p>
              </div>
              {isAdmin && (
                <button
                  onClick={handleAddScheduleRow}
                  className="px-6 py-3 rounded-xl text-xs font-black uppercase bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
                >
                  <span>+ Adicionar Linha</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4 px-4 border-r border-slate-800 w-1/6 text-center">Horas/Aulas/Data</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/4 text-center">Capacidades</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/4 text-center">Conhecimentos</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/4 text-center">Estratégias</th>
                    <th className="py-4 px-4 w-1/5 text-center">Recursos/Ambientes</th>
                    {isAdmin && <th className="py-4 px-2 w-12 text-center">Ações</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {scheduleEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={entry.dateOrHours}
                            onChange={(e) => handleScheduleChange(entry.id, 'dateOrHours', e.target.value)}
                            placeholder="Ex: 2 horas - 26/01/2026"
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{entry.dateOrHours}</p>
                        )}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={entry.capacities}
                            onChange={(e) => handleScheduleChange(entry.id, 'capacities', e.target.value)}
                            placeholder="Capacidades abordadas..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{entry.capacities}</p>
                        )}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={entry.knowledge}
                            onChange={(e) => handleScheduleChange(entry.id, 'knowledge', e.target.value)}
                            placeholder="Conhecimentos..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{entry.knowledge}</p>
                        )}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        {isAdmin ? (
                          <textarea
                            value={entry.strategies}
                            onChange={(e) => handleScheduleChange(entry.id, 'strategies', e.target.value)}
                            placeholder="Estratégias metodológicas..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{entry.strategies}</p>
                        )}
                      </td>
                      <td className="p-3 align-top">
                        {isAdmin ? (
                          <textarea
                            value={entry.resources}
                            onChange={(e) => handleScheduleChange(entry.id, 'resources', e.target.value)}
                            placeholder="Recursos e ambientes..."
                            className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none resize-none font-medium"
                          />
                        ) : (
                          <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{entry.resources}</p>
                        )}
                      </td>
                      {isAdmin && (
                        <td className="p-3 text-center align-middle">
                          <button
                            onClick={() => handleDeleteScheduleRow(entry.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Excluir linha"
                          >
                            ✕
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {scheduleEntries.length === 0 && (
                    <tr>
                      <td colSpan={isAdmin ? 6 : 5} className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                        Nenhum registro no cronograma. Clique em "+ Adicionar Linha" para preencher.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="space-y-6">
            <h3 className="text-lg font-[1000] uppercase text-slate-900">Calendário da Unidade</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gerenciamento automático de datas e cronograma da unidade curricular.</p>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-700">O cronograma está sincronizado com o calendário geral do curso e distribuição de aulas.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitViewer;
