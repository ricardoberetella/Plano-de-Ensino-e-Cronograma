import React, { useState } from 'react';
import { TeachingPlan, CurricularUnit } from '../types';

interface Props {
  currentPlan: TeachingPlan | null;
  onSavePlan: (updatedPlan: TeachingPlan) => void;
}

const CurricularUnitsManager: React.FC<Props> = ({ currentPlan, onSavePlan }) => {
  if (!currentPlan) {
    return (
      <div className="p-8 text-center text-slate-400 font-bold uppercase text-xs">
        Nenhum plano de curso selecionado.
      </div>
    );
  }

  const [units, setUnits] = useState<CurricularUnit[]>(currentPlan.units || []);
  
  // Campos do formulário de nova unidade
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newWorkload, setNewWorkload] = useState<number>(40);
  const [newSemester, setNewSemester] = useState<1 | 2>(1);

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) {
      alert('Preencha a sigla e o nome da unidade curricular.');
      return;
    }

    const newUnit: CurricularUnit = {
      id: `unit-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      workload: Number(newWorkload),
      semester: newSemester,
      active: true,
      basicCapacities: [],
      socioemocionalCapacities: [],
      knowledge: [],
      learningSituations: [],
      rubrics: [],
      schedule: []
    };

    const updatedUnits = [...units, newUnit];
    setUnits(updatedUnits);

    // Salva automaticamente no plano atual
    onSavePlan({
      ...currentPlan,
      units: updatedUnits
    });

    // Limpa os campos
    setNewCode('');
    setNewName('');
    setNewWorkload(40);
    setNewSemester(1);
  };

  const handleUpdateUnit = (id: string, field: keyof CurricularUnit, value: any) => {
    const updatedUnits = units.map(u => u.id === id ? { ...u, [field]: value } : u);
    setUnits(updatedUnits);
    onSavePlan({
      ...currentPlan,
      units: updatedUnits
    });
  };

  const handleDeleteUnit = (id: string) => {
    if (window.confirm('Deseja realmente excluir esta unidade curricular?')) {
      const updatedUnits = units.filter(u => u.id !== id);
      setUnits(updatedUnits);
      onSavePlan({
        ...currentPlan,
        units: updatedUnits
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl">
        <h2 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tight mb-2">
          Unidades Curriculares
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Curso: {currentPlan.courseName}
        </p>
      </div>

      {/* Formulário para cadastrar nova unidade */}
      <form onSubmit={handleAddUnit} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">+ Adicionar Nova Unidade Curricular</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Sigla</label>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Ex: MDU"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 uppercase focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nome</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Mecânica de Usinagem"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Carga Horária (h)</label>
            <input
              type="number"
              value={newWorkload}
              onChange={(e) => setNewWorkload(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="w-1/3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Semestre</label>
            <select
              value={newSemester}
              onChange={(e) => setNewSemester(Number(e.target.value) as 1 | 2)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value={1}>1º Semestre</option>
              <option value={2}>2º Semestre</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all self-end"
          >
            Cadastrar Unidade
          </button>
        </div>
      </form>

      {/* Lista de Unidades Cadastradas */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Unidades Cadastradas no Curso</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {units.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase">
              Nenhuma unidade cadastrada.
            </div>
          ) : (
            units.map((unit) => (
              <div key={unit.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl font-mono text-xs font-black">
                    {unit.code || 'S/SIGLA'}
                  </span>
                  <div>
                    <input
                      type="text"
                      value={unit.name}
                      onChange={(e) => handleUpdateUnit(unit.id, 'name', e.target.value)}
                      className="text-xs font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 outline-none w-72"
                    />
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        Carga: 
                        <input
                          type="number"
                          value={unit.workload || 0}
                          onChange={(e) => handleUpdateUnit(unit.id, 'workload', Number(e.target.value))}
                          className="w-16 ml-1 bg-slate-50 border border-slate-200 rounded px-1 text-slate-700 font-bold"
                        /> h
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={unit.semester || 1}
                    onChange={(e) => handleUpdateUnit(unit.id, 'semester', Number(e.target.value))}
                    className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black text-slate-700 uppercase"
                  >
                    <option value={1}>1º Semestre</option>
                    <option value={2}>2º Semestre</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteUnit(unit.id)}
                    className="text-slate-400 hover:text-red-600 text-xs font-black p-2 transition-all"
                  >
                    Excluir ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CurricularUnitsManager;
