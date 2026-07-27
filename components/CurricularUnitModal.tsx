import React, { useState } from 'react';
import { TeachingPlan, CurricularUnit, SemesterNumber } from '../types';

interface DashboardProps {
  plans: TeachingPlan[];
  onEdit: (plan: TeachingPlan) => void;
  onView: (plan: TeachingPlan) => void;
  onRefresh: () => void;
  onUpdatePlan?: (updatedPlan: TeachingPlan) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  plans,
  onEdit,
  onView,
  onRefresh,
  onUpdatePlan
}) => {
  const [editingPlan, setEditingPlan] = useState<TeachingPlan | null>(null);
  const [unitModalOpen, setUnitModalOpen] = useState(false);
  const [currentUnitToEdit, setCurrentUnitToEdit] = useState<CurricularUnit | null>(null);

  // Estados do formulário da Unidade Curricular dentro do modal do plano
  const [unitForm, setUnitForm] = useState({
    code: '',
    name: '',
    totalHours: 40,
    semester: 1 as SemesterNumber
  });

  const handleOpenUnitModal = (unit?: CurricularUnit) => {
    if (unit) {
      setCurrentUnitToEdit(unit);
      setUnitForm({
        code: unit.code || '',
        name: unit.name || '',
        totalHours: unit.totalHours || 40,
        semester: unit.semester || 1
      });
    } else {
      setCurrentUnitToEdit(null);
      setUnitForm({
        code: '',
        name: '',
        totalHours: 40,
        semester: 1
      });
    }
    setUnitModalOpen(true);
  };

  const handleSaveUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    let updatedUnits = [...(editingPlan.units || [])];

    if (currentUnitToEdit) {
      // Edição
      updatedUnits = updatedUnits.map(u =>
        u.id === currentUnitToEdit.id
          ? {
              ...u,
              code: unitForm.code,
              name: unitForm.name,
              totalHours: Number(unitForm.totalHours),
              semester: Number(unitForm.semester) as SemesterNumber,
              calendar: { ...u.calendar, semester: Number(unitForm.semester) as SemesterNumber }
            }
          : u
      );
    } else {
      // Criação de nova UC
      const newUnit: CurricularUnit = {
        id: `uc-${Date.now()}`,
        code: unitForm.code || `UC-${Date.now().toString().slice(-4)}`,
        name: unitForm.name,
        totalHours: Number(unitForm.totalHours),
        semester: Number(unitForm.semester) as SemesterNumber,
        active: true,
        basicCapacities: [],
        socioemocionalCapacities: [],
        knowledge: [],
        learningSituations: [],
        rubrics: [],
        schedule: []
      };
      updatedUnits.push(newUnit);
    }

    const updatedPlan = {
      ...editingPlan,
      units: updatedUnits,
      updatedAt: new Date().toISOString()
    };

    setEditingPlan(updatedPlan);
    setUnitModalOpen(false);
  };

  const handleDeleteUnit = (unitId: string) => {
    if (!editingPlan) return;
    if (!window.confirm('Deseja realmente excluir esta Unidade Curricular?')) return;

    const updatedUnits = editingPlan.units.filter(u => u.id !== unitId);
    setEditingPlan({
      ...editingPlan,
      units: updatedUnits,
      updatedAt: new Date().toISOString()
    });
  };

  const handleSaveFullPlan = () => {
    if (!editingPlan) return;
    if (onUpdatePlan) {
      onUpdatePlan(editingPlan);
    } else {
      onEdit(editingPlan);
    }
    setEditingPlan(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 animate-fadeIn">
      {/* Cards Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
            Planos Totais
          </p>
          <p className="text-4xl font-[1000] text-slate-900">{plans.length}</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
            Serviço de Dados
          </p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xl font-black text-slate-900 uppercase">Nuvem</p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Firebase: Conectado</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
            IA Assistente
          </p>
          <p className="text-2xl font-[1000] text-blue-600 tracking-tight">Proeducador</p>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Base oficial ativa</p>
        </div>
      </div>

      {/* Tabela de Planos */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-[1000] text-slate-900 uppercase tracking-tight">
            Meus Planos
          </h3>
          <button
            onClick={onRefresh}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
          >
            Sincronizar Nuvem
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                <th className="py-4 px-8">Curso / Unidade</th>
                <th className="py-4 px-6">Carga</th>
                <th className="py-4 px-6">Sincronizado</th>
                <th className="py-4 px-8 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
              {plans.map(plan => (
                <tr key={plan.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="py-5 px-8">
                    <p className="text-base font-[1000] text-slate-900 uppercase">
                      {plan.courseName}
                    </p>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {plan.modality || 'Presencial'}
                    </span>
                  </td>
                  <td className="py-5 px-6 font-black text-slate-600">
                    {plan.totalHours}h
                  </td>
                  <td className="py-5 px-6 text-xs font-semibold text-slate-400">
                    {plan.updatedAt ? new Date(plan.updatedAt).toLocaleString('pt-BR') : '-'}
                  </td>
                  <td className="py-5 px-8 text-right space-x-2">
                    <button
                      onClick={() => onView(plan)}
                      className="p-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl transition-all inline-flex items-center justify-center shadow-sm"
                      title="Visualizar Plano"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="p-2.5 bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white rounded-xl transition-all inline-flex items-center justify-center shadow-sm"
                      title="Editar Plano e Estrutura"
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO DO PLANO E UNIDADES CURRICULARES */}
      {editingPlan && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-4xl w-full shadow-2xl border border-slate-200 my-8 space-y-8 animate-fadeIn">
            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
              <div>
                <span className="bg-slate-900 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">
                  MSEP - Modelo SENAI
                </span>
                <h3 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tight">
                  Editar Plano de Curso
                </h3>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    Nome do Curso
                  </label>
                  <input
                    type="text"
                    value={editingPlan.courseName}
                    onChange={e => setEditingPlan({ ...editingPlan, courseName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    Modalidade
                  </label>
                  <input
                    type="text"
                    value={editingPlan.modality}
                    onChange={e => setEditingPlan({ ...editingPlan, modality: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                  I. Perfil de Conclusão / Objetivo
                </label>
                <textarea
                  rows={3}
                  value={editingPlan.objective}
                  onChange={e => setEditingPlan({ ...editingPlan, objective: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* SEÇÃO III: UNIDADES CURRICULARES */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em]">
                    III. Unidades Curriculares
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleOpenUnitModal()}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-md flex items-center gap-1"
                  >
                    + Adicionar Unidade Curricular
                  </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {editingPlan.units?.map((unit, idx) => (
                    <div
                      key={unit.id || idx}
                      className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-slate-900 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase">
                            {unit.code || 'UC'}
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 uppercase">
                            {unit.semester || 1}º Semestre
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            ({unit.totalHours || 0}h)
                          </span>
                        </div>
                        <p className="text-sm font-black text-slate-800 uppercase">
                          {unit.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenUnitModal(unit)}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-[9px] font-black uppercase transition-all"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUnit(unit.id)}
                          className="px-3 py-2 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-[9px] font-black uppercase transition-all"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-slate-100 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveFullPlan}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-xl transition-all"
              >
                Salvar Alterações do Plano
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INTERNO PARA EDITAR / CRIAR UMA UNIDADE ESPECÍFICA */}
      {unitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6 animate-fadeIn">
            <h3 className="text-lg font-[1000] text-slate-900 uppercase tracking-tight">
              {currentUnitToEdit ? 'Editar Unidade Curricular' : 'Nova Unidade Curricular'}
            </h3>

            <form onSubmit={handleSaveUnit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                  Sigla / Código (Ex: USIN-01)
                </label>
                <input
                  type="text"
                  required
                  value={unitForm.code}
                  onChange={e => setUnitForm({ ...unitForm, code: e.target.value })}
                  placeholder="Ex: MEC-01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                  Nome da Unidade Curricular
                </label>
                <input
                  type="text"
                  required
                  value={unitForm.name}
                  onChange={e => setUnitForm({ ...unitForm, name: e.target.value })}
                  placeholder="Ex: Metrologia Industrial"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    Carga Horária (h)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={unitForm.totalHours}
                    onChange={e => setUnitForm({ ...unitForm, totalHours: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    Semestre
                  </label>
                  <select
                    value={unitForm.semester}
                    onChange={e => setUnitForm({ ...unitForm, semester: Number(e.target.value) as SemesterNumber })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={1}>1º Semestre</option>
                    <option value={2}>2º Semestre</option>
                    <option value={3}>3º Semestre</option>
                    <option value={4}>4º Semestre</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setUnitModalOpen(false)}
                  className="px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-slate-100 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase shadow-lg transition-all"
                >
                  Salvar Unidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
