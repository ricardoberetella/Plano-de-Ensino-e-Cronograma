import React, { useState, useEffect } from 'react';
import { CurricularUnit } from '../types';

interface CurricularUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (unitData: Partial<CurricularUnit>) => void;
  initialData?: CurricularUnit | null;
}

export default function CurricularUnitModal({
  isOpen,
  onClose,
  onSave,
  initialData
}: CurricularUnitModalProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [hours, setHours] = useState<number>(40);
  const [semester, setSemester] = useState<number>(1);

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code || '');
      setName(initialData.name || '');
      // Se houver carga horária acumulada na unidade ou schedule, ajuste conforme seu modelo
      setHours(initialData.totalHours || 40); 
      setSemester(initialData.semester || 1);
    } else {
      setCode('');
      setName('');
      setHours(40);
      setSemester(1);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      code,
      name,
      semester,
      // Passando os campos solicitados de forma integrada aos types.ts
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 text-lg">
            {initialData ? 'Editar Unidade Curricular' : 'Incluir Nova Unidade Curricular'}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Sigla (code) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Sigla (Código)
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex: LIDT"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>

            {/* Semestre */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Semestre
              </label>
              <input
                type="number"
                min="1"
                max="4"
                required
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Nome da Unidade Curricular
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Leitura e Interpretação de Desenho Técnico"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Carga Horária */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Carga Horária (Horas)
            </label>
            <input
              type="number"
              required
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="Ex: 80"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
            >
              Salvar Unidade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
