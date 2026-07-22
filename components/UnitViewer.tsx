import React, { useState } from 'react';
import { TeachingPlan, CurricularUnit, SemesterNumber } from '../types';

interface UnitViewerProps {
  plan: TeachingPlan;
  onUpdatePlan: (updatedPlan: TeachingPlan) => void;
  onBack: () => void;
}

const UnitViewer: React.FC<UnitViewerProps> = ({ plan, onUpdatePlan, onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber>(1);
  const [activeUnitId, setActiveUnitId] = useState<string | null>(plan.units[0]?.id || null);

  const unitsInSemester = plan.units.filter(u => Number(u.semester || 1) === Number(selectedSemester));
  const currentUnit = plan.units.find(u => u.id === activeUnitId) || unitsInSemester[0] || plan.units[0];

  const handleUpdateUnitField = (field: keyof CurricularUnit, value: any) => {
    if (!currentUnit) return;
    const updatedUnits = plan.units.map(u => {
      if (u.id === currentUnit.id) {
        return { ...u, [field]: value };
      }
      return u;
    });
    onUpdatePlan({ ...plan, units: updatedUnits });
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 p-8 md:p-12 max-w-7xl mx-auto animate-fadeIn pb-24 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-800">
        <div>
          <button 
            type="button"
            onClick={onBack}
            className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors mb-2 flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Voltar para o Painel
          </button>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">{plan.courseName}</h2>
        </div>

        <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => {
              setSelectedSemester(1);
              const firstInSem = plan.units.find(u => Number(u.semester || 1) === 1);
              if (firstInSem) setActiveUnitId(firstInSem.id);
            }}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
              selectedSemester === 1 ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            1º Semestre
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSemester(2);
              const firstInSem = plan.units.find(u => Number(u.semester || 1) === 2);
              if (firstInSem) setActiveUnitId(firstInSem.id);
            }}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
              selectedSemester === 2 ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            2º Semestre
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">III. Unidades Curriculares do {selectedSemester}º Semestre</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unitsInSemester.map((unit) => {
            const isSelected = currentUnit?.id === unit.id;
            return (
              <div 
                key={unit.id}
                onClick={() => setActiveUnitId(unit.id)}
                className={`cursor-pointer p-6 rounded-3xl border transition-all relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-slate-800 border-blue-500 shadow-xl shadow-blue-900/20' 
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                    {unit.code || 'SEM SIGLA'}
                  </span>
                  <span className="text-slate-500 text-xs font-black">{unit.hours || 0}h</span>
                </div>
                <h4 className="font-black text-white text-base uppercase tracking-tight line-clamp-2">
                  {unit.name || 'Unidade Curricular sem nome'}
                </h4>
              </div>
            );
          })}

          {unitsInSemester.length === 0 && (
            <div className="col-span-full bg-slate-800/30 border border-dashed border-slate-800 rounded-3xl p-10 text-center">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Nenhuma Unidade Curricular cadastrada para este semestre.</p>
            </div>
          )}
        </div>
      </div>

      {currentUnit && (
        <div className="bg-slate-800/50 rounded-3xl border border-slate-800 p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Editando Unidade Selecionada</h4>
            <span className="text-[10px] font-bold text-slate-500 uppercase">ID: {currentUnit.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Sigla / Código</label>
              <input 
                type="text" 
                value={currentUnit.code || ''}
                onChange={e => handleUpdateUnitField('code', e.target.value.toUpperCase())}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 font-bold text-xs uppercase text-white outline-none focus:border-blue-500"
                placeholder="Ex: USI"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Nome da Unidade Curricular</label>
              <input 
                type="text" 
                value={currentUnit.name || ''}
                onChange={e => handleUpdateUnitField('name', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 font-bold text-xs uppercase text-white outline-none focus:border-blue-500"
                placeholder="Nome da UC"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitViewer;
