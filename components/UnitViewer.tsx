import React, { useState } from 'react';
import { TeachingPlan, CurricularUnit, SemesterNumber } from '../types';

interface UnitViewerProps {
  plan: TeachingPlan;
  onUpdatePlan: (updatedPlan: TeachingPlan) => void;
  onBack: () => void;
}

const UnitViewer: React.FC<UnitViewerProps> = ({ plan, onUpdatePlan, onBack }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(plan.units[0]?.id || '');

  const currentUnit = plan.units.find(u => u.id === selectedUnitId) || plan.units[0];

  const handleUpdateUnit = (field: keyof CurricularUnit, value: any) => {
    const updatedUnits = plan.units.map(u => {
      if (u.id === currentUnit.id) {
        return { ...u, [field]: value };
      }
      return u;
    });
    onUpdatePlan({ ...plan, units: updatedUnits });
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 md:p-12 max-w-6xl mx-auto animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <button 
            type="button"
            onClick={onBack}
            className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-slate-900 transition-colors mb-2 flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Voltar para o Plano
          </button>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{plan.courseName}</h2>
        </div>

        {/* Seletor de Unidades Curriculares usando ID único */}
        <div className="w-full md:w-auto">
          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Selecionar Unidade Curricular</label>
          <select 
            value={selectedUnitId}
            onChange={e => setSelectedUnitId(e.target.value)}
            className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 font-bold text-xs uppercase tracking-wide text-slate-800 outline-none focus:border-blue-500 w-full md:w-80"
          >
            {plan.units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.code ? `${unit.code} - ` : ''}{unit.name || 'Nova UC'} ({unit.semester}º Sem.)
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentUnit ? (
        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sigla / Código</label>
              <input 
                type="text" 
                value={currentUnit.code || ''}
                onChange={e => handleUpdateUnit('code', e.target.value.toUpperCase())}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-xs uppercase text-slate-800 outline-none focus:border-blue-500"
                placeholder="Ex: MUC1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nome da Unidade Curricular</label>
              <input 
                type="text" 
                value={currentUnit.name || ''}
                onChange={e => handleUpdateUnit('name', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-xs uppercase text-slate-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-400 text-xs py-10 uppercase font-bold tracking-widest">Nenhuma unidade selecionada.</p>
      )}
    </div>
  );
};

export default UnitViewer;
