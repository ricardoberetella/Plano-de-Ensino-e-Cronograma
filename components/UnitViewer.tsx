import React, { useState } from 'react';
import { CurricularUnit, ScheduleEntry, UnitCalendar } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit;
  onUpdateSchedule: (schedule: ScheduleEntry[]) => void;
  onUpdateCalendar: (calendar: UnitCalendar) => void;
  onUpdateUnit: (unit: CurricularUnit) => void;
  userRole?: 'admin' | 'viewer' | null;
}

const UnitViewer: React.FC<UnitViewerProps> = ({
  unit,
  onUpdateSchedule,
  onUpdateCalendar,
  onUpdateUnit,
  userRole = 'admin'
}) => {
  const isAdmin = userRole === 'admin';
  const [activeTab, setActiveTab] = useState<'capacities' | 'knowledge' | 'situations' | 'rubrics' | 'schedule' | 'calendar'>('capacities');
  
  // Estados para edição rápida (somente se admin)
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [name, setName] = useState(unit.name || '');
  const [code, setCode] = useState(unit.code || '');
  const [workload, setWorkload] = useState(unit.workload || 0);

  const handleSaveInfo = () => {
    if (!isAdmin) return;
    onUpdateUnit({
      ...unit,
      name,
      code,
      workload: Number(workload)
    });
    setIsEditingInfo(false);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
      {/* Cabeçalho da Unidade */}
      <div className="bg-slate-900 p-8 md:p-12 text-white relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {unit.code || 'UC'}
              </span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {unit.workload || 0} Horas
              </span>
            </div>
            
            {isEditingInfo && isAdmin ? (
              <div className="space-y-3 mt-4">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-white text-xs w-32"
                  placeholder="Sigla/Código"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-white text-lg font-black w-full md:w-96"
                  placeholder="Nome da Unidade"
                />
                <input
                  type="number"
                  value={workload}
                  onChange={(e) => setWorkload(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-white text-xs w-32"
                  placeholder="Carga horária"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsEditingInfo(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-[10px] font-black uppercase"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveInfo}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            ) : (
              <h2 className="text-2xl md:text-4xl font-[1000] uppercase tracking-tight">
                {unit.name}
              </h2>
            )}
          </div>

          {isAdmin && !isEditingInfo && (
            <button
              onClick={() => {
                setName(unit.name || '');
                setCode(unit.code || '');
                setWorkload(unit.workload || 0);
                setIsEditingInfo(true);
              }}
              className="bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border border-slate-700"
            >
              Editar Unidade
            </button>
          )}
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50 px-6 pt-4 gap-2">
        {[
          { id: 'capacities', label: 'Capacidades' },
          { id: 'knowledge', label: 'Conhecimentos' },
          { id: 'situations', label: 'Situações de Aprendizagem' },
          { id: 'rubrics', label: 'Rubricas de Avaliação' },
          { id: 'schedule', label: 'Cronograma' },
          { id: 'calendar', label: 'Calendário' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 text-[10px] font-black uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-2xl shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="p-8 md:p-12 min-h-[400px]">
        {activeTab === 'capacities' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
                Capacidades Básicas
              </h3>
              <ul className="space-y-3">
                {unit.basicCapacities?.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 text-sm font-medium">{cap}</span>
                  </li>
                )) || <p className="text-slate-400 text-sm italic">Nenhuma capacidade cadastrada.</p>}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                Capacidades Sócio-Emocionais
              </h3>
              <ul className="space-y-3">
                {unit.socioemocionalCapacities?.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 text-sm font-medium">{cap}</span>
                  </li>
                )) || <p className="text-slate-400 text-sm italic">Nenhuma capacidade sócio-emocional cadastrada.</p>}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              Conhecimentos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.knowledge?.map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <span className="text-xs font-black text-slate-300">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-slate-700 text-sm font-semibold">{item}</span>
                </div>
              )) || <p className="text-slate-400 text-sm italic">Nenhum conhecimento cadastrado.</p>}
            </div>
          </div>
        )}

        {activeTab === 'situations' && (
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              Situações de Aprendizagem
            </h3>
            {unit.learningSituations?.map((sit, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-lg inline-block uppercase">
                  Situação {idx + 1}
                </span>
                <h4 className="font-black text-slate-900 text-lg uppercase">{sit.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{sit.description}</p>
              </div>
            )) || <p className="text-slate-400 text-sm italic">Nenhuma situação cadastrada.</p>}
          </div>
        )}

        {activeTab === 'rubrics' && (
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              Rubricas de Avaliação
            </h3>
            {unit.rubrics?.map((rubric, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-2">
                <h4 className="font-black text-slate-900 uppercase">{rubric.title}</h4>
                <p className="text-slate-600 text-sm font-medium">{rubric.description}</p>
              </div>
            )) || <p className="text-slate-400 text-sm italic">Nenhuma rubrica cadastrada.</p>}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              Cronograma de Aulas
            </h3>
            {unit.schedule && unit.schedule.length > 0 ? (
              <div className="space-y-3">
                {unit.schedule.map((entry, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-500">Aula {entry.classNumber || idx + 1}</span>
                    <span className="text-slate-700 text-sm font-medium">{entry.topic || 'Tópico não definido'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">Nenhum cronograma cadastrado para esta unidade.</p>
            )}
            {!isAdmin && (
              <p className="text-[10px] font-bold text-amber-600 uppercase mt-4">
                * Modo visualização: alterações no cronograma estão desativadas.
              </p>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              Calendário da Unidade
            </h3>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <p className="text-slate-700 text-sm">
                <strong>Semestre:</strong> {unit.calendar?.semester || unit.semester || 1}º Semestre
              </p>
              <p className="text-slate-700 text-sm">
                <strong>Início:</strong> {unit.calendar?.startDate || 'Não definido'}
              </p>
              <p className="text-slate-700 text-sm">
                <strong>Término:</strong> {unit.calendar?.endDate || 'Não definido'}
              </p>
            </div>
            {!isAdmin && (
              <p className="text-[10px] font-bold text-amber-600 uppercase mt-4">
                * Modo visualização: alterações no calendário estão desativadas.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

UnitViewer.displayName = 'UnitViewer';

export default UnitViewer;
