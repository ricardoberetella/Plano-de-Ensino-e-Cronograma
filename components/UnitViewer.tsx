import React, { useState } from 'react';

export interface UnitItem {
  id: string;
  name: string;
  code: string; // Sigla (ex: LIDT)
  semester: '1' | '2' | 'both'; // Semestre (1º, 2º ou Ambos)
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (units: UnitItem[]) => void;
}

const CoursePlanModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [courseTitle, setCourseTitle] = useState('SMO - Mecânico de Usinagem Convencional');
  const [modality, setModality] = useState('PRESENCIAL');
  const [profile, setProfile] = useState(
    'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.'
  );

  const [units, setUnits] = useState<UnitItem[]>([
    { id: '1', name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO', code: 'LIDT', semester: '1' },
    { id: '2', name: 'CIÊNCIAS DOS MATERIAIS', code: 'CM', semester: '1' },
    { id: '3', name: 'CONTROLE DIMENSIONAL', code: 'CRD', semester: '1' },
    { id: '4', name: 'FUNDAMENTOS DA USINAGEM', code: 'FUSI', semester: '2' },
    { id: '5', name: 'PROCESSOS DE USINAGEM CONVENCIONAL', code: 'PUC', semester: '2' },
    { id: '6', name: 'METROLOGIA INDUSTRIAL', code: 'MET', semester: 'both' },
  ]);

  if (!isOpen) return null;

  const handleAddUnit = () => {
    const newUnit: UnitItem = {
      id: Date.now().toString(),
      name: '',
      code: '',
      semester: '1',
    };
    setUnits([...units, newUnit]);
  };

  const handleUpdateUnit = (id: string, field: keyof UnitItem, value: string) => {
    setUnits(units.map(u => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const handleRemoveUnit = (id: string) => {
    setUnits(units.filter(u => u.id !== id));
  };

  const handleSave = () => {
    if (onSave) onSave(units);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 w-full max-w-4xl p-8 md:p-10 space-y-8 animate-fadeIn">
        
        {/* CABEÇALHO DO MODAL */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-[1000] text-slate-900 uppercase italic tracking-tight">EDITAR PLANO</h2>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">MSEP - MODELO SENAI DE EDUCAÇÃO</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-slate-100 transition-all">
              Reconfigurar Matriz
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-blue-700 transition-all">
              ✦ IA Assistente
            </button>
          </div>
        </div>

        {/* TÍTULO E MODALIDADE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              TÍTULO DO CURSO
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              MODALIDADE
            </label>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="PRESENCIAL">PRESENCIAL</option>
              <option value="EAD">EAD</option>
              <option value="SEMIPRESENCIAL">SEMIPRESENCIAL</option>
            </select>
          </div>
        </div>

        {/* PERFIL DE CONCLUSÃO */}
        <div>
          <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            I. PERFIL DE CONCLUSÃO (OBJETIVO)
          </label>
          <textarea
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
          />
        </div>

        {/* III. ESTRUTURA DE UNIDADES CURRICULARES */}
        <div className="space-y-4 border-t border-slate-100 pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              III. ESTRUTURA DE UNIDADES
            </h3>
            <button
              onClick={handleAddUnit}
              className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all"
            >
              + NOVA UC
            </button>
          </div>

          <div className="space-y-3">
            {units.map((u, idx) => (
              <div
                key={u.id}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all rounded-2xl p-3 flex flex-wrap md:flex-nowrap items-center gap-3"
              >
                {/* Ícone de Drag/Ordem */}
                <span className="text-slate-300 font-bold text-xs select-none px-1">
                  :::
                </span>

                {/* Nome da Unidade Curricular */}
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    value={u.name}
                    onChange={(e) => handleUpdateUnit(u.id, 'name', e.target.value)}
                    placeholder="NOME DA UNIDADE CURRICULAR..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>

                {/* Sigla/Código da UC */}
                <div className="w-28">
                  <input
                    type="text"
                    value={u.code}
                    onChange={(e) => handleUpdateUnit(u.id, 'code', e.target.value.toUpperCase())}
                    placeholder="SIGLA (Ex: LIDT)"
                    maxLength={8}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-center text-blue-600 focus:outline-none focus:border-blue-500 uppercase tracking-wider"
                  />
                </div>

                {/* Seletor de Semestre */}
                <div className="w-44">
                  <select
                    value={u.semester}
                    onChange={(e) => handleUpdateUnit(u.id, 'semester', e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                  >
                    <option value="1">1º Semestre</option>
                    <option value="2">2º Semestre</option>
                    <option value="both">Ambos (1º e 2º)</option>
                  </select>
                </div>

                {/* Botão Remover */}
                <button
                  onClick={() => handleRemoveUnit(u.id)}
                  className="text-slate-300 hover:text-red-500 p-2 text-xs font-bold transition-all"
                  title="Remover Unidade"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RODAPÉ DO MODAL / AÇÕES */}
        <div className="flex justify-end items-center gap-4 border-t border-slate-100 pt-6">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xs font-black uppercase tracking-wider px-4 py-2"
          >
            DESCARTAR
          </button>
          <button
            onClick={handleSave}
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all"
          >
            CONFIRMAR E SALVAR
          </button>
        </div>

      </div>
    </div>
  );
};

export default CoursePlanModal;
