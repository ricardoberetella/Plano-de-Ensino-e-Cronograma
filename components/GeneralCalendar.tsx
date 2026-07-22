import React, { useMemo } from 'react';
import { TeachingPlan, CurricularUnit, CalendarColor } from '../types';

interface GeneralCalendarProps {
  plan: TeachingPlan;
}

interface UnitMeta {
  sigla: string;
  color: CalendarColor;
}

const COLOR_MAP: Record<CalendarColor, string> = {
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  red: '#ef4444',
  purple: '#a855f7',
  gray: '#64748b'
};

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();

const getUnitInfo = (unit: CurricularUnit): UnitMeta => {
  const code = normalizeText(unit.code || '');
  const name = normalizeText(unit.name || '');
  const id = normalizeText(unit.id || '');

  if (
    code === 'LIDT' ||
    name.includes('LEITURA') ||
    name.includes('DESENHO') ||
    id.includes('LIDT')
  ) {
    return { sigla: 'LIDT', color: 'blue' };
  }

  if (
    code === 'CDMAT' ||
    code === 'CMAT' ||
    name.includes('CIENCIAS DOS MATERIAIS') ||
    id.includes('CDMAT')
  ) {
    return { sigla: 'CDMAT', color: 'green' };
  }

  if (
    code === 'CRD' ||
    name.includes('CONTROLE DIMENSIONAL') ||
    id.includes('CRD')
  ) {
    return { sigla: 'CRD', color: 'yellow' };
  }

  if (
    code === 'FUSI' ||
    name.includes('FUNDAMENTOS DA USINAGEM') ||
    id.includes('FUSI')
  ) {
    return { sigla: 'FUSI', color: 'red' };
  }

  if (
    code === 'PRUSC' ||
    name.includes('PROCESSOS DE USINAGEM CONVENCIONAL') ||
    id.includes('PRUSC')
  ) {
    return { sigla: 'PRUSC', color: 'purple' };
  }

  if (
    code === 'METIND' ||
    name.includes('METROLOGIA INDUSTRIAL') ||
    id.includes('METIND')
  ) {
    return { sigla: 'METIND', color: 'gray' };
  }

  return {
    sigla:
      code ||
      name
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word[0])
        .join('')
        .slice(0, 8) ||
      'UC',
    color: 'gray'
  };
};

const normalizeDate = (dateValue: string): string | null => {
  if (!dateValue) return null;

  const value = dateValue.trim();

  const isoMatch = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const brazilianMatch = value.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (brazilianMatch) {
    const [, day, month, year] = brazilianMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return null;
};

const GeneralCalendar: React.FC<GeneralCalendarProps> = ({ plan }) => {
  const unitsWithMeta = useMemo(
    () =>
      [...plan.units]
        .filter(unit => unit.active !== false)
        .sort((a, b) => {
          const semesterDifference =
            Number(a.semester || 1) - Number(b.semester || 1);

          if (semesterDifference !== 0) return semesterDifference;

          return Number(a.order || 0) - Number(b.order || 0);
        })
        .map(unit => ({
          ...unit,
          meta: getUnitInfo(unit)
        })),
    [plan.units]
  );

  const calendarData = useMemo(() => {
    const dates: Record<
      string,
      Array<{
        unitId: string;
        sigla: string;
        unitName: string;
        color: CalendarColor;
        capacities: string;
        knowledge: string;
        hours: number;
      }>
    > = {};

    unitsWithMeta.forEach(unit => {
      (unit.schedule || []).forEach(entry => {
        if (!entry.date || Number(entry.hours) <= 0) return;

        const normalizedDate = normalizeDate(entry.date);
        if (!normalizedDate) return;

        if (!dates[normalizedDate]) {
          dates[normalizedDate] = [];
        }

        const alreadyAdded = dates[normalizedDate].some(
          item => item.unitId === unit.id
        );

        if (!alreadyAdded) {
          dates[normalizedDate].push({
            unitId: unit.id,
            sigla: unit.meta.sigla,
            unitName: unit.name,
            color: unit.meta.color,
            capacities: entry.capacities || '',
            knowledge: entry.knowledge || '',
            hours: Number(entry.hours) || 0
          });
        }
      });
    });

    return dates;
  }, [unitsWithMeta]);

  const calendarYear = useMemo(() => {
    const years = Object.keys(calendarData)
      .map(date => Number(date.slice(0, 4)))
      .filter(year => Number.isFinite(year));

    if (years.length > 0) {
      return Math.min(...years);
    }

    if (plan.schoolYear) {
      return plan.schoolYear;
    }

    return new Date().getFullYear();
  }, [calendarData, plan.schoolYear]);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const month = String(index + 1).padStart(2, '0');
        return `${calendarYear}-${month}`;
      }),
    [calendarYear]
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-20">
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Legenda:
            </p>

            {unitsWithMeta.map(unit => (
              <div key={unit.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: COLOR_MAP[unit.meta.color] }}
                />
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">
                  {unit.meta.sigla}
                </span>
                <span className="text-[8px] font-bold text-slate-400 hidden lg:block">
                  | {unit.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            O calendário é preenchido automaticamente pelas datas do Plano de Aula
          </p>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            1º semestre — janeiro a junho
          </h3>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.slice(0, 6).map(monthStr => (
            <CalendarMonth
              key={monthStr}
              monthStr={monthStr}
              calendarData={calendarData}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            2º semestre — julho a dezembro
          </h3>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.slice(6, 12).map(monthStr => (
            <CalendarMonth
              key={monthStr}
              monthStr={monthStr}
              calendarData={calendarData}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

interface CalendarMonthProps {
  monthStr: string;
  calendarData: Record<
    string,
    Array<{
      unitId: string;
      sigla: string;
      unitName: string;
      color: CalendarColor;
      capacities: string;
      knowledge: string;
      hours: number;
    }>
  >;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  monthStr,
  calendarData
}) => {
  const [year, month] = monthStr.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const monthName = firstDay.toLocaleDateString('pt-BR', {
    month: 'long'
  });

  const days: Array<string | null> = [];

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(`${monthStr}-${String(day).padStart(2, '0')}`);
  }

  return (
    <div className="space-y-3">
      <div className="bg-slate-900 text-white py-2 px-4 rounded-xl text-center shadow-lg border border-slate-800">
        <h4 className="text-[10px] font-black uppercase tracking-[0.1em] italic">
          {monthName} {year}
        </h4>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-7 text-center bg-slate-50 border-b border-slate-100">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dayName, index) => (
            <div
              key={`${dayName}-${index}`}
              className={`py-2 text-[8px] font-black ${
                index === 0 ? 'text-red-500' : 'text-slate-400'
              }`}
            >
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className="p-1 border-b border-r border-slate-50 h-12 md:h-14"
                />
              );
            }

            const entries = calendarData[day] || [];
            const isSunday = index % 7 === 0;
            const dayNumber = day.split('-')[2];

            const tooltip =
              entries.length > 0
                ? entries
                    .map(
                      entry =>
                        `${entry.sigla} — ${entry.hours}h\n${entry.capacities}${
                          entry.knowledge ? `\n${entry.knowledge}` : ''
                        }`
                    )
                    .join('\n\n')
                : '';

            return (
              <div
                key={day}
                title={tooltip}
                className="relative h-12 md:h-14 border-b border-r border-slate-50 overflow-hidden group hover:ring-2 hover:ring-inset hover:ring-slate-300 transition-all"
              >
                <div className="absolute inset-0 flex">
                  {entries.map(entry => (
                    <div
                      key={entry.unitId}
                      className="flex-1 h-full opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: COLOR_MAP[entry.color] }}
                    />
                  ))}
                </div>

                <span
                  className={`absolute top-1 left-1 text-[9px] font-black z-10 drop-shadow-sm ${
                    entries.length > 0
                      ? 'text-white'
                      : isSunday
                        ? 'text-red-500'
                        : 'text-slate-400'
                  }`}
                >
                  {dayNumber}
                </span>

                {entries.length > 0 && (
                  <div className="absolute inset-x-0 bottom-1 z-10 flex justify-center gap-0.5 px-0.5">
                    {entries.map(entry => (
                      <span
                        key={`${entry.unitId}-label`}
                        className="truncate rounded bg-black/25 px-1 text-[6px] font-black text-white"
                      >
                        {entry.sigla}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralCalendar;
