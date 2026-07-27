import React, { useState, useEffect } from 'react';
import { CurricularUnit, SemesterNumber } from '../types';

interface CurricularUnitModalProps {
  isOpen: boolean;
  unit: CurricularUnit | null;
  onClose: () => void;
  onSave: (unitData: { code: string; name: string; totalHours: number; semester: SemesterNumber }) => void;
}

export const CurricularUnitModal: React.FC<CurricularUnitModalProps> = ({
  isOpen,
  unit,
  onClose,
  onSave
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [totalHours, setTotalHours] = useState<number>(40);
  const [semester, setSemester] = useState<SemesterNumber>(1);

  useEffect(() => {
    if (isOpen) {
      if (unit) {
        setCode(unit.code || '');
        setName(unit.name || '');
        setTotalHours(unit.totalHours || 40);
        setSemester(unit.semester || 1);
      } else {
        setCode('');
        setName('');
        setTotalHours(40);
        setSemester(1);
      }
    }
  }, [unit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      code,
      name,
      totalHours: Number(totalHours),
      semester: Number(semester) as SemesterNumber
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl border border-slate-200 space-y-6">
        <h3 className="text-xl font-[1000] text-slate-900 uppercase tracking-tight">
          {unit ? 'Editar Unidade Curricular' : 'Nova Unidade Curricular'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
              Sigla / Código
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={e => setCode(e.target.value)}
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
              value={name}
              onChange={e => setName(e.target.value)}
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
                value={totalHours}
                onChange={e => setTotalHours(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                Semestre
              </label>
              <select
                value={semester}
                onChange={e => setSemester(Number(e.target.value) as SemesterNumber)}
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
              onClick={onClose}
              className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-slate-100 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg transition-all"
            >
              Salvar Unidade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
