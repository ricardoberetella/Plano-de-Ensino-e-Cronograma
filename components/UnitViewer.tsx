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

  // Defesas para garantir que nada quebre se um array vier vazio ou indefinido
  const safeSchedule = Array.isArray(unit.schedule) ? unit.schedule : [];
  
  // Mapeamento dos conteúdos e capacidades salvos no seu banco de dados
  const safeContents = Array.isArray((unit as any).contents) 
    ? (unit as any).contents 
    : Array.isArray((unit as any).conteudos) ? (unit as any).conteudos : [];

  const safeCapabilities = Array.isArray((unit as any).capabilities) 
    ? (unit as any).capabilities 
    : Array.isArray((unit as any).capacidades) ? (unit as any).capacidades : [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabeçalho da Unidade */}
      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
        <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2.5 py-1 rounded-md mb-3 inline-block">
          Unidade Curricular Ativa
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">{unit.name}</h2>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Carga Horária: {unit.hours || 0} Horas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda: Conteúdos e Capacidades */}
        <div className="lg:col-span-1 space-y-6">
          {/* Bloco de Capacidades */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Capacidades Técnicas</h3>
            <ul className="space-y-3">
              {safeCapabilities.map((cap: any, i: number) => (
                <li key={i} className="text-xs font-semibold text-slate-600 bg-slate-55 p-3 rounded-xl border border-slate-100/50">
                  {typeof cap === 'string' ? cap : cap.description || cap.name || ''}
                </li>
              ))}
              {safeCapabilities.length === 0 && (
                <p className="text-[10px] font-bold text-slate-400 italic uppercase">Nenhuma capacidade vinculada.</p>
              )}
            </ul>
          </div>

          {/* Bloco de Saberes / Conteúdos */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Conteúdos Formativos</h3>
            <div className="flex flex-wrap gap-2">
              {safeContents.map((content: any, i: number) => (
                <span key={i} className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl">
                  {typeof content === 'string' ? content : content.name || ''}
                </span>
              ))}
              {safeContents.length === 0 && (
                <p className="text-[10px] font-bold text-slate-400 italic uppercase">Nenhum conteúdo listado.</p>
              )}
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Cronograma Detalhado (SMO) */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden h-fit">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cronograma de Aulas e Operações (SMO)</h3>
            <span className="bg-blue-100 text-blue-700 font-black px-2.5 py-1 rounded-md text-[9px] uppercase">
              {safeSchedule.length} Aulas Geradas
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {safeSchedule.map((entry, idx) => (
              <div key={entry.id || idx} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    Etapa {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm uppercase">{entry.content || "Sem descrição"}</h4>
                  {entry.operations && entry.operations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entry.operations.map((op, oIdx) => (
                        <span key={oIdx} className="text-[9px] font-black text-slate-400 uppercase bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                          {op}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Duração</p>
                  <p className="text-xs font-black text-slate-700">{entry.hours || 0}h</p>
                </div>
              </div>
            ))}

            {safeSchedule.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic mb-1">Cronograma de SMO não iniciado</p>
                <p className="text-slate-400 text-[9px] font-bold uppercase">As aulas serão listadas assim que estruturadas no painel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitViewer;
