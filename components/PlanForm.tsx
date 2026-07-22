import React, { useState } from 'react';
import { CurricularUnit } from '../types';

interface PlanFormProps {
  units: CurricularUnit[];
  onAddUnit: (unit: Partial<CurricularUnit>) => void;
  onUpdateUnit: (id: string, updated: Partial<CurricularUnit>) => void;
  onDeleteUnit: (id: string) => void;
  onSelectUnit: (unit: CurricularUnit) => void;
}

const PlanForm: React.FC<PlanFormProps> = ({
  units = [],
  onAddUnit,
  onUpdateUnit,
  onDeleteUnit,
  onSelectUnit,
}) => {
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newSemester, setNewSemester] = useState('1º Semestre');
  const [newWorkload, setNewWorkload] = useState<number>(40);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddUnit({
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      semester: newSemester,
      workload: Number(newWorkload) || 0,
      technicalCapacities: [],
      socialCapacities: [],
      knowledges: [],
      learningSituations: [],
      rubrics: [],
      schedule: [],
    });

    setNewCode('');
    setNewName('');
    setNewWorkload(40);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <span className="bg-blue-600 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest text-white mb-2 inline-block">
            MSEP - Gestão de Componentes
          </span>
          <h2 className="text-3xl font-[1000] text-slate-900 uppercase italic tracking-tight">
            III. Estrutura de Unidades Curriculares
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
            Cadastro de Sigla, Nome, Semestre e Carga Horária (Permite a mesma UC em semestres distintos)
          </p>
        </div>

        {/* FORMULÁRIO DE ADIÇÃO DE NOVA UNIDADE */}
        <form onSubmit={handleCreate} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
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
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Semestre</label>
            <select
              value={newSemester}
              onChange={(e) => setNewSemester(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="1º Semestre">1º Semestre</option>
              <option value="2º Semestre">2º Semestre</option>
              <option value="3º Semestre">3º Semestre</option>
              <option value="4º Semestre">4º Semestre</option>
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
              type="submit"
              className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
            >
              <span>+ Nova UC</span>
            </button>
          </div>
        </form>

        {/* LISTAGEM DE UNIDADES CURRICULARES CADASTRADAS */}
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
                    onChange={(e) => onUpdateUnit(unit.id, { code: e.target.value.toUpperCase() })}
                    placeholder="SIGLA"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-800 uppercase text-center focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={unit.name || ''}
                    onChange={(e) => onUpdateUnit(unit.id, { name: e.target.value })}
                    placeholder="Nome da Unidade Curricular"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="w-36">
                  <select
                    value={unit.semester || '1º Semestre'}
                    onChange={(e) => onUpdateUnit(unit.id, { semester: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="1º Semestre">1º Semestre</option>
                    <option value="2º Semestre">2º Semestre</option>
                    <option value="3º Semestre">3º Semestre</option>
                    <option value="4º Semestre">4º Semestre</option>
                  </select>
                </div>

                <div className="w-28 flex items-center gap-1">
                  <input
                    type="number"
                    value={unit.workload ?? 40}
                    onChange={(e) => onUpdateUnit(unit.id, { workload: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 text-center focus:outline-none focus:border-blue-600"
                  />
                  <span className="text-[10px] font-black text-slate-400 uppercase">h</span>
                </div>

                <button
                  onClick={() => onSelectUnit(unit)}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-blue-600 hover:text-white transition-all shadow-sm shrink-0"
                >
                  Abrir Unidade
                </button>

                <button
                  onClick={() => {
                    if (confirm("Tem certeza que deseja excluir esta Unidade Curricular?")) {
                      onDeleteUnit(unit.id);
                    }
                  }}
                  className="text-slate-300 hover:text-red-500 p-2 font-black transition-all shrink-0"
                  title="Excluir Unidade"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {(!Array.isArray(units) || units.length === 0) && (
            <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-wider">
              Nenhuma Unidade Curricular cadastrada. Utilize o formulário acima para criar a primeira.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanForm;
