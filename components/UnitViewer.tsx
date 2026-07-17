import React from 'react';
import { CurricularUnit, ScheduleEntry } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit | null;
  onUpdateSchedule: (newSchedule: ScheduleEntry[]) => void;
  onUpdateCalendar: (newCalendar: any) => void;
  onUpdateUnit: (updatedUnit: CurricularUnit) => void;
}

const UnitViewer: React.FC<UnitViewerProps> = ({ unit, onUpdateSchedule, onUpdateCalendar, onUpdateUnit }) => {
  if (!unit) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-100">
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">Nenhuma unidade selecionada.</p>
      </div>
    );
  }

  // Defesas robustas: se schedule ou conteúdo não existirem no Firebase, tratamos como array vazio
  const safeSchedule = Array.isArray(unit.schedule) ? unit.schedule : [];
  
  // Caso queira renderizar conteúdos ou capacidades adicionais com segurança:
  const safeContents = Array.isArray((unit as any).contents) ? (unit as any).contents : [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabeçalho da Unidade */}
      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
        <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-55 px-2.5 py-1 rounded-md mb-3 inline-block">
          Visualizando Unidade Curricular
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">{unit.name}</h2>
      </div>

      {/* Cronograma / Operações da Unidade */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cronograma de Atividades / SMO</h3>
          <span className="bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
            {safeSchedule.length} Aulas/Etapas
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {safeSchedule.map((entry, idx) => (
            <div key={entry.id || idx} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  Etapa {idx + 1}
                </span>
                <h4 className="font-bold text-slate-800 text-sm uppercase">{entry.content || "Sem descrição de conteúdo"}</h4>
                {entry.operations && entry.operations.length > 0 && (
                  <p className="text-xs text-slate-400 font-medium">
                    Operações: {entry.operations.join(', ')}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Carga</p>
                  <p className="text-xs font-bold text-slate-600">{entry.hours || 0}h</p>
                </div>
              </div>
            </div>
          ))}

          {safeSchedule.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic mb-2">Nenhum cronograma estruturado nesta unidade</p>
              <p className="text-slate-400 text-[9px] font-bold uppercase">Crie ou sincronize os dados com o assistente pedagógico.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitViewer;
