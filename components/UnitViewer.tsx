import React, { useState } from 'react';
import { CurricularUnit } from '../types';

interface Props {
  units: CurricularUnit[];
  onSaveUnits: (units: CurricularUnit[]) => void;
}

const CourseUnitsManager: React.FC<Props> = ({ units, onSaveUnits }) => {
  const [unitList, setUnitList] = useState<CurricularUnit[]>(units || []);
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newWorkload, setNewWorkload] = useState<number>(80);
  const [newSemester, setNewSemester] = useState<'1º' | '2º'>('1º');

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId.trim() || !newName.trim()) {
      alert('Preencha a sigla e o nome da unidade curricular.');
      return;
    }

    const newUnit: CurricularUnit = {
      id: newId.trim().toUpperCase(),
      name: newName.trim(),
      workload: Number(newWorkload),
      semester: newSemester,
      technicalCapacities: [],
      socialCapacities: [],
      knowledges: [],
      learningSituations: [],
      rubrics: [],
      schedule: [],
      calendar: { startDate: '2026-01-01', endDate: '2026-12-31', markings: [] }
    };

    const updated = [...unitList, newUnit];
    setUnitList(updated);
    onSaveUnits(updated);

    // Limpar campos
    setNewId('');
    setNewName('');
    setNewWorkload(80);
    setNewSemester('1º');
  };

  const handleRemoveUnit = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta unidade curricular?')) {
      const updated = unitList.filter(u => u.id !== id);
      setUnitList(updated);
      onSaveUnits(updated);
    }
  };

  const handleUpdateField = (id: string, field: keyof CurricularUnit, value: any) => {
    const updated = unitList.map(u => u.id === id ? { ...u, [field]: value } : u);
    setUnitList(updated);
    onSaveUnits(updated);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn p-6">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-[1000] text-slate-900 uppercase italic">Unidades Curriculares</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
          Cadastro e gerenciamento das unidades, siglas, carga horária e semestres
        </p>
      </div>

      {/* Formulário de Inclusão */}
      <form onSubmit={handleAddUnit} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">+ Adicionar Nova Unidade Curricular</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Sigla / ID</label>
            <input
              type="text"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="Ex: MDU, LIDT..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 uppercase focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Nome da Unidade</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Mecânica de Usinagem Convencional..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Carga Horária (h)</label>
            <input
              type="number"
              value={newWorkload}
              onChange={(e) => setNewWorkload(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="space-y-2 w-1/3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Semestre</label>
            <select
              value={newSemester}
              onChange={(e) => setNewSemester(e.target.value as '1º' | '2º')}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="1º">1º Semestre</option>
              <option value="2º">2º Semestre</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all self-end"
          >
            Cadastrar Unidade
          </button>
        </div>
      </form>

      {/* Listagem Cadastrada */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Unidades Cadastradas</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {unitList.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs font-bold uppercase">
              Nenhuma unidade curricular cadastrada até o momento.
            </div>
          ) : (
            unitList.map((unit) => (
              <div key={unit.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl font-mono text-xs font-black">
                    {unit.id}
                  </span>
                  <div>
                    <input
                      type="text"
                      value={unit.name}
                      onChange={(e) => handleUpdateField(unit.id, 'name', e.target.value)}
                      className="text-xs font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-80"
                    />
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        Carga: {unit.workload || 0}h
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <select
                    value={unit.semester || '1º'}
                    onChange={(e) => handleUpdateField(unit.id, 'semester', e.target.value)}
                    className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black text-slate-700 uppercase"
                  >
                    <option value="1º">1º Semestre</option>
                    <option value="2º">2º Semestre</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleRemoveUnit(unit.id)}
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

export default CourseUnitsManager;
