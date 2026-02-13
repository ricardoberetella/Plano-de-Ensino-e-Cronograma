
import React, { useMemo } from 'react';
import { TeachingPlan, CurricularUnit, CalendarColor } from '../types';

interface GeneralCalendarProps {
  plan: TeachingPlan;
}

const COLOR_MAP: Record<string, string> = {
  blue: '#3b82f6',
  pink: '#ec4899',
  orange: '#f97316',
  cyan: '#06b6d4',
  green: '#22c55e',
  slate: '#64748b'
};

const GeneralCalendar: React.FC<GeneralCalendarProps> = ({ plan }) => {
  const getUnitInfo = (unit: CurricularUnit) => {
    const name = unit.name.toUpperCase();
    if (name.includes('LEITURA') || name.includes('DESENHO')) return { sigla: 'LIDT', color: 'blue' };
    if (name.includes('CONTROLE') || name.includes('DIMENSIONAL')) return { sigla: 'CRD', color: 'pink' };
    if (name.includes('FUNDAMENTOS') || name.includes('USINAGEM')) return { sigla: 'FUSI', color: 'orange' };
    return { sigla: 'UC', color: 'cyan' };
  };

  const unitsWithMeta = useMemo(() => {
    return plan.units.map(u => ({
      ...u,
      meta: getUnitInfo(u)
    }));
  }, [plan.units]);

  const formatDateForCalendar = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return null;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    const simpleMatch = dateStr.match(/\d{2}\/\d{2}\/\d{4}/);
    if (simpleMatch) {
      const [d, m, y] = simpleMatch[0].split('/');
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    return null;
  };

  const calendarData = useMemo(() => {
    const dates: Record<string, string[]> = {};
    unitsWithMeta.forEach(unit => {
      unit.schedule.forEach(entry => {
        if (entry.hours > 0) {
          const formatted = formatDateForCalendar(entry.date);
          if (formatted) {
            if (!dates[formatted]) dates[formatted] = [];
            if (!dates[formatted].includes(unit.meta.color)) {
              dates[formatted].push(unit.meta.color);
            }
          }
        }
      });
    });
    return dates;
  }, [unitsWithMeta]);

  // Define range: Jan to Jun 2026 based on requirements
  const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];

  return (
    <div className="space-y-10 animate-fadeIn max-w-7xl mx-auto pb-20">
      {/* Legenda */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl flex flex-wrap gap-6 items-center justify-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">Legenda de Unidades:</p>
        {unitsWithMeta.map(u => (
          <div key={u.id} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: COLOR_MAP[u.meta.color] }}></div>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{u.meta.sigla}</span>
            <span className="text-[9px] font-bold text-slate-400 hidden md:block">| {u.name}</span>
          </div>
        ))}
      </div>

      {/* Grid de Meses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {months.map(monthStr => {
          const [year, month] = monthStr.split('-').map(Number);
          const firstDay = new Date(year, month - 1, 1);
          const lastDay = new Date(year, month, 0);
          const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long' });
          
          const days = [];
          for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
          for (let i = 1; i <= lastDay.getDate(); i++) {
            const d = i < 10 ? `0${i}` : i;
            days.push(`${monthStr}-${d}`);
          }

          return (
            <div key={monthStr} className="space-y-4">
              <div className="bg-slate-900 text-white py-3 px-6 rounded-2xl text-center shadow-lg border border-slate-800">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic">{monthName} {year}</h4>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
                <div className="grid grid-cols-7 text-center bg-slate-50 border-b border-slate-100">
                  {['D','S','T','Q','Q','S','S'].map((d, i) => (
                    <div key={i} className={`py-4 text-[9px] font-black ${i === 0 ? 'text-red-500' : 'text-slate-400'}`}>{d}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7">
                  {days.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} className="p-1 border-b border-r border-slate-50 h-14 md:h-20"></div>;
                    
                    const dayColors = calendarData[day] || [];
                    const isSunday = idx % 7 === 0;
                    const dayNum = day.split('-')[2];

                    return (
                      <div
                        key={day}
                        className="relative p-1 h-14 md:h-20 border-b border-r border-slate-50 group hover:bg-slate-50 transition-colors"
                      >
                        <span className={`absolute top-2 left-2 text-[10px] font-black z-10 ${dayColors.length > 0 ? 'text-white drop-shadow-md' : (isSunday ? 'text-red-500' : 'text-slate-400')}`}>
                          {dayNum}
                        </span>
                        
                        {/* Indicadores de cores */}
                        <div className="absolute inset-0 flex flex-col">
                          {dayColors.map((color, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="flex-1 w-full opacity-80"
                              style={{ backgroundColor: COLOR_MAP[color] }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralCalendar;
