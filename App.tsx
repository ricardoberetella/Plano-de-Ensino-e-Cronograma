import React, { useState } from 'react';
import { TeachingPlan, CurricularUnit } from '../types';

interface PlanFormProps {
  initialPlan?: TeachingPlan;
  isAdmin: boolean;
  onSave: (plan: TeachingPlan) => void;
  onCancel: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({
  initialPlan,
  isAdmin,
  onSave,
  onCancel,
}) => {
  const [courseName, setCourseName] = useState(initialPlan?.courseName || '');
  const [totalHours, setTotalHours] = useState(initialPlan?.totalHours || 1400);
  const [modality, setModality] = useState(initialPlan?.modality || 'Presencial');
  const [objective, setObjective] = useState(initialPlan?.objective || '');
  const [units, setUnits] = useState<CurricularUnit[]>(initialPlan?.units || []);

  // Estados locais para formulário de nova unidade
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newSemester, setNewSemester] = useState<number>(1);
  const [newWorkload, setNewWorkload] = useState<number>(40);

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const unit: CurricularUnit = {
      id: `unit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      code: newCode.trim().toUpperCase() || newName.trim().substring(0, 3).toUpperCase(),
      name: newName.trim(),
      semester: Number(newSemester),
      workload: Number(newWorkload) || 40,
      order: units.length + 1,
      active: true,
      technicalCapacities: [],
      socialCapacities: [],
      knowledges: [],
      learningSituations: [],
      rubrics: [],
      schedule: [],
    };

    setUnits([...units, unit]);
    setNewCode('');
    setNewName('');
    setNewWorkload(40);
  };

  const handleUpdateUnitLocal = (id: string, updatedFields: Partial<CurricularUnit>) => {
    setUnits(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updatedFields } : u))
    );
  };

  const handleDeleteUnitLocal = (id: string) => {
    setUnits(prev => prev.filter(u => u.id !== id));
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialPlan) return;

    const updatedPlan: TeachingPlan = {
      ...initialPlan,
      courseName,
      totalHours: Number(totalHours),
      modality,
      objective,
      units,
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedPlan);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn pb-12">
      <form onSubmit={handleSubmitAll} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200">
        <div className="border-b border-slate-100 pb-6 mb-8 flex justify-between items-center">
          <div>
            <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest text-white mb-2 inline-block">
              MSEP - Editor de Plano de Curso
            </span>
            <h2 className="text-3xl font-[1000] text-slate-900 uppercase italic tracking-tight">
              III. Estrutura de Unidades Curriculares
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
              Gerencie as unidades, semestres e cargas horárias do curso
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
            >
              Cancelar
            </button>
            {isAdmin && (
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-black uppercase bg-blue-600 text-white shadow-lg hover:bg-slate-900 transition-all"
              >
                Salvar Alterações
              </button>
            )}
          </div>
        </div>

        {/* FORMULÁRIO DE ADIÇÃO DE NOVA UC */}
        {isAdmin && (
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Sigla</label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Ex: CRD"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 uppercase focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Nome da Unidade Curricular</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Controle Dimensional"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Semestre</label>
              <select
                value={newSemester}
                onChange={(e) => setNewSemester(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value={1}>1º Semestre</option>
                <option value={2}>2º Semestre</option>
                <option value={3}>3º Semestre</option>
                <option value={4}>4º Semestre</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Carga Horária (h)</label>
              <input
                type="number"
                value={newWorkload}
                onChange={(e) => setNewWorkload(Number(e.target.value))}
                placeholder="40"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleAddUnit}
                className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                <span>+ Adicionar</span>
              </button>
            </div>
          </div>
        )}

        {/* LISTAGEM DAS UNIDADES */}
        <div className="space-y-4">
          {Array.isArray(units) && units.map((unit, index) => (
            <div
              key={unit.id || index}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 font-black text-xs flex items-center justify-center shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="w-24 shrink-0">
                  <input
                    type="text"
                    value={unit.code || ''}
                    disabled={!isAdmin}
                    onChange={(e) => handleUpdateUnitLocal(unit.id, { code: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-800 uppercase text-center focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={unit.name || ''}
                    disabled={!isAdmin}
                    onChange={(e) => handleUpdateUnitLocal(unit.id, { name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="w-36">
                  <select
                    value={unit.semester || 1}
                    disabled={!isAdmin}
                    onChange={(e) => handleUpdateUnitLocal(unit.id, { semester: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={1}>1º Semestre</option>
                    <option value={2}>2º Semestre</option>
                    <option value={3}>3º Semestre</option>
                    <option value={4}>4º Semestre</option>
                  </select>
                </div>

                <div className="w-28 flex items-center gap-1">
                  <input
                    type="number"
                    value={unit.workload ?? 40}
                    disabled={!isAdmin}
                    onChange={(e) => handleUpdateUnitLocal(unit.id, { workload: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 text-center focus:outline-none focus:border-blue-600"
                  />
                  <span className="text-[10px] font-black text-slate-400 uppercase">h</span>
                </div>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDeleteUnitLocal(unit.id)}
                    className="text-slate-300 hover:text-red-500 p-2 font-black transition-all shrink-0"
                    title="Excluir Unidade"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}

          {(!Array.isArray(units) || units.length === 0) && (
            <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-wider">
              Nenhuma Unidade Curricular cadastrada neste plano.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlanForm;
