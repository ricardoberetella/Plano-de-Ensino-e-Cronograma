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
  const [activeTab, setActiveTab] = useState<'geral' | 'situacao' | 'rubricas' | 'plano' | 'calendario'>('rubricas');
  
  // Estado local para edição das rubricas
  const [rubrics, setRubrics] = useState<RubricItem[]>(unit.rubrics || []);

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
          Plano de Aula
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
        {activeTab === 'rubricas' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-[1000] uppercase text-slate-900">Rubricas (Critérios Graduais)</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Defina as capacidades e os níveis de desempenho (NSA, APO, PAR, AUT)
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
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center">Capacidades</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center text-red-400">NSA</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center text-amber-400">APO</th>
                    <th className="py-4 px-4 border-r border-slate-800 w-1/5 text-center text-blue-400">PAR</th>
                    <th className="py-4 px-4 w-1/5 text-center text-emerald-400">AUT</th>
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
                            placeholder="Não Suficiente com Acompanhamento..."
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
                            placeholder="Suficiente com Acompanhamento Parcial..."
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
                            placeholder="Suficiente com Autonomia Parcial..."
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
                            placeholder="Suficiente com Autonomia Total..."
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

        {activeTab === 'geral' && (
          <div className="space-y-6">
            <h3 className="text-lg font-[1000] uppercase text-slate-900">Informações Gerais</h3>
            <p className="text-sm text-slate-600">{unit.description || 'Nenhuma descrição informada.'}</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase">Carga Horária</span>
                <p className="text-xl font-black text-slate-800">{unit.workload || 0}h</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase">Semestre</span>
                <p className="text-xl font-black text-slate-800">{unit.semester || 1}º Semestre</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'situacao' && (
          <div className="space-y-6">
            <h3 className="text-lg font-[1000] uppercase text-slate-900">Situação-Problema</h3>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{unit.problemSituation || 'Nenhuma situação-problema cadastrada.'}</p>
          </div>
        )}

        {activeTab === 'plano' && (
          <div className="space-y-6">
            <h3 className="text-lg font-[1000] uppercase text-slate-900">Plano de Aula</h3>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{unit.lessonPlan || 'Nenhum plano de aula cadastrado.'}</p>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="space-y-6">
            <h3 className="text-lg font-[1000] uppercase text-slate-900">Calendário da Unidade</h3>
            <p className="text-sm text-slate-600">Configurações de datas e cronograma da unidade curricular.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitViewer;
