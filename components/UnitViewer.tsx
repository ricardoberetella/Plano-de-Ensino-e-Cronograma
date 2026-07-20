import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarColor,
  CurricularUnit,
  LearningSituation,
  Rubric,
  ScheduleEntry,
  UnitCalendar
} from '../types';
import { SAMPLE_PLANS } from '../constants';

interface Props {
  unit: CurricularUnit;
  onUpdateSchedule?: (newSchedule: ScheduleEntry[]) => void | Promise<void>;
  onUpdateCalendar?: (newCalendar: UnitCalendar) => void | Promise<void>;
  onUpdateUnit?: (updatedUnit: CurricularUnit) => void | Promise<void>;
}

type ActiveTab = 'geral' | 'sa' | 'rubricas' | 'cronograma' | 'calendario';

const COLOR_MAP: Record<CalendarColor, string> = {
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  red: '#ef4444',
  purple: '#a855f7',
  gray: '#64748b'
};

const TEXT_COLOR_MAP: Record<CalendarColor, string> = {
  blue: '#ffffff',
  green: '#ffffff',
  yellow: '#0f172a',
  red: '#ffffff',
  purple: '#ffffff',
  gray: '#ffffff'
};

const createId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();

const getUnitMeta = (
  unit: CurricularUnit
): { sigla: string; color: CalendarColor } => {
  const code = normalizeText(unit.code || '');
  const name = normalizeText(unit.name || '');
  const id = normalizeText(unit.id || '');

  if (code === 'LIDT' || id.includes('LIDT') || name.includes('DESENHO')) {
    return { sigla: 'LIDT', color: 'blue' };
  }

  if (
    code === 'CDMAT' ||
    code === 'CMAT' ||
    id.includes('CDMAT') ||
    name.includes('CIENCIAS DOS MATERIAIS')
  ) {
    return { sigla: 'CDMAT', color: 'green' };
  }

  if (
    code === 'CRD' ||
    id.includes('CRD') ||
    name.includes('CONTROLE DIMENSIONAL')
  ) {
    return { sigla: 'CRD', color: 'yellow' };
  }

  if (
    code === 'FUSI' ||
    id.includes('FUSI') ||
    name.includes('FUNDAMENTOS DA USINAGEM')
  ) {
    return { sigla: 'FUSI', color: 'red' };
  }

  if (
    code === 'PRUSC' ||
    id.includes('PRUSC') ||
    name.includes('PROCESSOS DE USINAGEM CONVENCIONAL')
  ) {
    return { sigla: 'PRUSC', color: 'purple' };
  }

  if (
    code === 'METIND' ||
    id.includes('METIND') ||
    name.includes('METROLOGIA INDUSTRIAL')
  ) {
    return { sigla: 'METIND', color: 'gray' };
  }

  return { sigla: code || 'UC', color: 'gray' };
};

const toIsoDate = (value: string): string => {
  if (!value) return '';

  const trimmed = value.trim();

  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const brMatch = trimmed.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (brMatch) {
    const [, day, month, year] = brMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return '';
};

const toBrazilianDate = (value: string): string => {
  const iso = toIsoDate(value);
  if (!iso) return value || '';

  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
};

const semesterDateRange = (semester: number, year: number) =>
  semester === 2
    ? {
        min: `${year}-07-01`,
        max: `${year}-12-31`,
        startDate: `${year}-07-01`,
        endDate: `${year}-12-31`
      }
    : {
        min: `${year}-01-01`,
        max: `${year}-06-30`,
        startDate: `${year}-01-01`,
        endDate: `${year}-06-30`
      };

const getDayOfWeek = (dateValue: string) => {
  const iso = toIsoDate(dateValue);
  if (!iso) return '';

  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long'
  }).format(date);
};

const UnitViewer: React.FC<Props> = ({
  unit,
  onUpdateSchedule,
  onUpdateCalendar,
  onUpdateUnit
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('geral');
  const [localUnit, setLocalUnit] = useState<CurricularUnit>(unit);
  const [dateError, setDateError] = useState<string>('');

  useEffect(() => {
    setLocalUnit(unit);
    setDateError('');
  }, [unit]);

  const unitMeta = useMemo(() => getUnitMeta(localUnit), [localUnit]);

  const calendarYear = useMemo(() => {
    const scheduleYear = localUnit.schedule
      .map(entry => toIsoDate(entry.date))
      .find(Boolean)
      ?.slice(0, 4);

    return Number(
      scheduleYear ||
        localUnit.calendar?.startDate?.slice(0, 4) ||
        new Date().getFullYear()
    );
  }, [localUnit.calendar?.startDate, localUnit.schedule]);

  const dateRange = useMemo(
    () => semesterDateRange(Number(localUnit.semester || 1), calendarYear),
    [calendarYear, localUnit.semester]
  );

  const persistUnit = (updatedUnit: CurricularUnit) => {
    setLocalUnit(updatedUnit);
    void onUpdateUnit?.(updatedUnit);
  };

  const buildCalendarFromSchedule = (
    updatedUnit: CurricularUnit
  ): UnitCalendar => {
    const semester = Number(updatedUnit.semester || 1);
    const range = semesterDateRange(semester, calendarYear);

    return {
      ...updatedUnit.calendar,
      startDate: range.startDate,
      endDate: range.endDate,
      semester,
      markings: updatedUnit.schedule
        .filter(entry => Number(entry.hours) > 0 && toIsoDate(entry.date))
        .map(entry => ({
          id: `schedule-${entry.id}`,
          date: toIsoDate(entry.date),
          label: `${unitMeta.sigla} - ${entry.hours}h`,
          color: unitMeta.color,
          notes: [entry.capacities, entry.knowledge].filter(Boolean).join(' | ')
        }))
    };
  };

  const persistSchedule = (schedule: ScheduleEntry[]) => {
    const updatedWithoutCalendar: CurricularUnit = {
      ...localUnit,
      schedule
    };

    const calendar = buildCalendarFromSchedule(updatedWithoutCalendar);
    const updatedUnit: CurricularUnit = {
      ...updatedWithoutCalendar,
      calendar
    };

    setLocalUnit(updatedUnit);
    void onUpdateSchedule?.(schedule);
    void onUpdateCalendar?.(calendar);

    if (!onUpdateSchedule && !onUpdateCalendar) {
      void onUpdateUnit?.(updatedUnit);
    }
  };

  const updateEntry = (
    id: string,
    field: keyof ScheduleEntry,
    value: string | number | boolean
  ) => {
    const schedule = localUnit.schedule.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );

    persistSchedule(schedule);
  };

  const updateScheduleDate = (entryId: string, isoDate: string) => {
    if (!isoDate) {
      setDateError('');
      updateEntry(entryId, 'date', '');
      return;
    }

    if (isoDate < dateRange.min || isoDate > dateRange.max) {
      setDateError(
        Number(localUnit.semester || 1) === 2
          ? 'No 2º semestre, use somente datas entre julho e dezembro.'
          : 'No 1º semestre, use somente datas entre janeiro e junho.'
      );
      return;
    }

    setDateError('');
    updateEntry(entryId, 'date', toBrazilianDate(isoDate));
  };

  const addScheduleEntry = () => {
    const entry: ScheduleEntry = {
      id: createId(),
      date: '',
      hours: 4,
      capacities: '',
      knowledge: '',
      strategy: '',
      resources: '',
      lesson: '',
      completed: false
    };

    persistSchedule([...localUnit.schedule, entry]);
  };

  const removeScheduleEntry = (entryId: string) => {
    if (!window.confirm('Deseja excluir esta aula do Plano de Aula?')) return;
    persistSchedule(localUnit.schedule.filter(entry => entry.id !== entryId));
  };

  const handleResetToTemplate = () => {
    if (!window.confirm('Deseja restaurar este cronograma para o padrão oficial?')) {
      return;
    }

    const templateUnit = SAMPLE_PLANS.flatMap(plan => plan.units).find(
      candidate =>
        normalizeText(candidate.code || '') ===
          normalizeText(localUnit.code || '') ||
        candidate.id === localUnit.id
    );

    if (!templateUnit) {
      window.alert('Não foi encontrado um modelo para esta unidade curricular.');
      return;
    }

    persistSchedule(templateUnit.schedule.map(entry => ({ ...entry })));
  };

  const updateBasicCapacity = (index: number, value: string) => {
    const basicCapacities = [...localUnit.basicCapacities];
    basicCapacities[index] = value;
    persistUnit({ ...localUnit, basicCapacities });
  };

  const addBasicCapacity = () =>
    persistUnit({
      ...localUnit,
      basicCapacities: [...localUnit.basicCapacities, '']
    });

  const removeBasicCapacity = (index: number) =>
    persistUnit({
      ...localUnit,
      basicCapacities: localUnit.basicCapacities.filter((_, i) => i !== index)
    });

  const updateSocioCapacity = (index: number, value: string) => {
    const socioemocionalCapacities = [
      ...(localUnit.socioemocionalCapacities || [])
    ];
    socioemocionalCapacities[index] = value;
    persistUnit({ ...localUnit, socioemocionalCapacities });
  };

  const addSocioCapacity = () =>
    persistUnit({
      ...localUnit,
      socioemocionalCapacities: [
        ...(localUnit.socioemocionalCapacities || []),
        ''
      ]
    });

  const removeSocioCapacity = (index: number) =>
    persistUnit({
      ...localUnit,
      socioemocionalCapacities: (
        localUnit.socioemocionalCapacities || []
      ).filter((_, i) => i !== index)
    });

  const updateKnowledgeTopic = (
    topicIndex: number,
    field: 'topic',
    value: string
  ) => {
    const knowledge = localUnit.knowledge.map((item, index) =>
      index === topicIndex ? { ...item, [field]: value } : item
    );
    persistUnit({ ...localUnit, knowledge });
  };

  const updateKnowledgeSubtopic = (
    topicIndex: number,
    subtopicIndex: number,
    value: string
  ) => {
    const knowledge = localUnit.knowledge.map((item, index) => {
      if (index !== topicIndex) return item;

      const subtopics = [...item.subtopics];
      subtopics[subtopicIndex] = value;
      return { ...item, subtopics };
    });

    persistUnit({ ...localUnit, knowledge });
  };

  const addKnowledgeTopic = () =>
    persistUnit({
      ...localUnit,
      knowledge: [
        ...localUnit.knowledge,
        { id: createId(), topic: '', subtopics: [] }
      ]
    });

  const removeKnowledgeTopic = (topicIndex: number) =>
    persistUnit({
      ...localUnit,
      knowledge: localUnit.knowledge.filter((_, index) => index !== topicIndex)
    });

  const addKnowledgeSubtopic = (topicIndex: number) => {
    const knowledge = localUnit.knowledge.map((item, index) =>
      index === topicIndex
        ? { ...item, subtopics: [...item.subtopics, ''] }
        : item
    );
    persistUnit({ ...localUnit, knowledge });
  };

  const removeKnowledgeSubtopic = (
    topicIndex: number,
    subtopicIndex: number
  ) => {
    const knowledge = localUnit.knowledge.map((item, index) =>
      index === topicIndex
        ? {
            ...item,
            subtopics: item.subtopics.filter(
              (_, currentIndex) => currentIndex !== subtopicIndex
            )
          }
        : item
    );
    persistUnit({ ...localUnit, knowledge });
  };

  const updateLearningSituation = (
    situationId: string,
    field: keyof LearningSituation,
    value: string | string[]
  ) => {
    const learningSituations = localUnit.learningSituations.map(situation =>
      situation.id === situationId
        ? { ...situation, [field]: value }
        : situation
    );

    persistUnit({ ...localUnit, learningSituations });
  };

  const addLearningSituation = () =>
    persistUnit({
      ...localUnit,
      learningSituations: [
        ...localUnit.learningSituations,
        {
          id: createId(),
          title: 'Nova Situação-Problema',
          contextualization: '',
          challenge: '',
          expectedResults: [],
          teacherNotes: ''
        }
      ]
    });

  const removeLearningSituation = (situationId: string) => {
    if (!window.confirm('Deseja excluir esta Situação-Problema?')) return;

    persistUnit({
      ...localUnit,
      learningSituations: localUnit.learningSituations.filter(
        situation => situation.id !== situationId
      )
    });
  };

  const updateExpectedResult = (
    situation: LearningSituation,
    resultIndex: number,
    value: string
  ) => {
    const expectedResults = [...situation.expectedResults];
    expectedResults[resultIndex] = value;
    updateLearningSituation(situation.id, 'expectedResults', expectedResults);
  };

  const addExpectedResult = (situation: LearningSituation) =>
    updateLearningSituation(situation.id, 'expectedResults', [
      ...situation.expectedResults,
      ''
    ]);

  const removeExpectedResult = (
    situation: LearningSituation,
    resultIndex: number
  ) =>
    updateLearningSituation(
      situation.id,
      'expectedResults',
      situation.expectedResults.filter((_, index) => index !== resultIndex)
    );

  const updateRubric = (
    rubricId: string,
    field: 'capacity' | 'nsa' | 'apo' | 'par' | 'aut',
    value: string
  ) => {
    const rubrics = localUnit.rubrics.map(rubric => {
      if (rubric.id !== rubricId) return rubric;

      if (field === 'capacity') {
        return { ...rubric, capacity: value };
      }

      return {
        ...rubric,
        levels: {
          ...rubric.levels,
          [field]: value
        }
      };
    });

    persistUnit({ ...localUnit, rubrics });
  };

  const addRubric = () =>
    persistUnit({
      ...localUnit,
      rubrics: [
        ...localUnit.rubrics,
        {
          id: createId(),
          capacity: '',
          description: '',
          levels: { nsa: '', apo: '', par: '', aut: '' }
        }
      ]
    });

  const removeRubric = (rubricId: string) => {
    if (!window.confirm('Deseja excluir esta rubrica?')) return;

    persistUnit({
      ...localUnit,
      rubrics: localUnit.rubrics.filter(rubric => rubric.id !== rubricId)
    });
  };

  const scheduleDates = useMemo(() => {
    const dates: Record<string, ScheduleEntry[]> = {};

    localUnit.schedule.forEach(entry => {
      const iso = toIsoDate(entry.date);
      if (!iso || Number(entry.hours) <= 0) return;

      if (!dates[iso]) dates[iso] = [];
      dates[iso].push(entry);
    });

    return dates;
  }, [localUnit.schedule]);

  const monthsInRange = useMemo(() => {
    const range = semesterDateRange(
      Number(localUnit.semester || 1),
      calendarYear
    );
    const start = new Date(`${range.startDate}T12:00:00`);
    const end = new Date(`${range.endDate}T12:00:00`);
    const months: string[] = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
      months.push(
        `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(
          2,
          '0'
        )}`
      );
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }, [calendarYear, localUnit.semester]);

  const handlePrint = () => window.print();

  return (
    <div
      className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn printable-unit-module"
      data-active-tab={activeTab}
    >
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 1cm !important; }

          aside, header, nav, .tabs-header, .no-print, button {
            display: none !important;
          }

          html, body, #root, main, .printable-unit-module, .content-area {
            display: block !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            position: static !important;
          }

          .report-document, .report-document-sa {
            display: none !important;
          }

          [data-active-tab="cronograma"] .report-document {
            display: block !important;
          }

          [data-active-tab="sa"] .report-document-sa {
            display: block !important;
          }

          .report-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 2pt solid #E30613 !important;
            padding-bottom: 10pt !important;
            margin-bottom: 15pt !important;
          }

          .logo-box {
            background: #E30613 !important;
            color: white !important;
            padding: 10pt 20pt !important;
            font-size: 24pt !important;
            font-weight: 900 !important;
            font-style: italic !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .info-box {
            text-align: right !important;
            color: #000 !important;
          }

          .info-box h1 {
            font-size: 10pt !important;
            font-weight: 900 !important;
            margin: 0 !important;
            text-transform: uppercase !important;
          }

          .info-box p {
            font-size: 8pt !important;
            margin: 2pt 0 0 !important;
            font-weight: bold !important;
          }

          .doc-main-title {
            text-align: center !important;
            font-weight: 900 !important;
            font-size: 14pt !important;
            text-transform: uppercase !important;
            margin: 15pt 0 !important;
            border-bottom: 1pt solid #000 !important;
            padding-bottom: 5pt !important;
            color: #000 !important;
          }

          .tech-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 10pt !important;
          }

          .tech-table th {
            background: #f8fafc !important;
            color: #64748b !important;
            font-size: 7pt !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            padding: 8pt !important;
            border: 0.5pt solid #e2e8f0 !important;
            text-align: left !important;
            -webkit-print-color-adjust: exact;
          }

          .tech-table td {
            padding: 8pt !important;
            border: 0.5pt solid #e2e8f0 !important;
            font-size: 8pt !important;
            vertical-align: top !important;
            color: #1e293b !important;
          }

          .p-label {
            display: block !important;
            font-size: 7pt !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            color: #E30613 !important;
            margin-bottom: 3pt !important;
          }

          .sa-print-block {
            margin-bottom: 20pt !important;
            page-break-inside: auto !important;
          }

          .sa-print-title {
            font-weight: 900 !important;
            font-size: 12pt !important;
            border-bottom: 2pt solid #E30613 !important;
            margin-bottom: 10pt !important;
            padding: 5pt 0 !important;
            text-transform: uppercase !important;
            color: #000 !important;
          }

          .sa-print-section {
            margin-bottom: 12pt !important;
            border: 0.5pt solid #000 !important;
            padding: 12pt !important;
          }

          .sa-print-section-title {
            font-weight: 900 !important;
            font-size: 8.5pt !important;
            text-transform: uppercase !important;
            color: #E30613 !important;
            margin-bottom: 5pt !important;
          }

          .sa-print-text {
            font-size: 9.5pt !important;
            line-height: 1.4 !important;
            color: #000 !important;
          }
        }
      `}</style>

      <div className="bg-slate-900 p-8 text-white flex justify-between items-center no-print">
        <div>
          <span
            className="px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block"
            style={{ backgroundColor: COLOR_MAP[unitMeta.color] }}
          >
            {unitMeta.sigla} — {localUnit.semester}º semestre
          </span>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">
            {localUnit.name}
          </h2>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide no-print tabs-header">
        {(
          ['geral', 'sa', 'rubricas', 'cronograma', 'calendario'] as ActiveTab[]
        ).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 transition-all border-b-4 ${
              activeTab === tab
                ? 'border-blue-600 bg-white'
                : 'border-transparent text-slate-400 hover:bg-slate-100'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest block">
              {tab === 'geral'
                ? 'Geral'
                : tab === 'sa'
                  ? 'Situação-Problema'
                  : tab === 'rubricas'
                    ? 'Rubricas'
                    : tab === 'cronograma'
                      ? 'Plano de Aula'
                      : 'Calendário'}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FDFDFD] content-area">
        {activeTab === 'geral' && (
          <div className="space-y-12 no-print">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <EditableList
                title="Capacidades Técnicas"
                values={localUnit.basicCapacities}
                onChange={updateBasicCapacity}
                onAdd={addBasicCapacity}
                onRemove={removeBasicCapacity}
              />

              <EditableList
                title="Capacidades Socioemocionais"
                values={localUnit.socioemocionalCapacities || []}
                onChange={updateSocioCapacity}
                onAdd={addSocioCapacity}
                onRemove={removeSocioCapacity}
              />
            </div>

            <section>
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Conhecimentos
                </h3>
                <button
                  type="button"
                  onClick={addKnowledgeTopic}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase"
                >
                  Adicionar conhecimento
                </button>
              </div>

              <div className="space-y-5">
                {localUnit.knowledge.map((knowledge, topicIndex) => (
                  <div
                    key={knowledge.id || topicIndex}
                    className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm"
                  >
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={knowledge.topic}
                        onChange={event =>
                          updateKnowledgeTopic(
                            topicIndex,
                            'topic',
                            event.target.value
                          )
                        }
                        placeholder="Título do conhecimento"
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-black text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => removeKnowledgeTopic(topicIndex)}
                        className="bg-red-50 text-red-600 px-4 rounded-xl text-[9px] font-black uppercase"
                      >
                        Excluir
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {knowledge.subtopics.map((subtopic, subtopicIndex) => (
                        <div
                          key={subtopicIndex}
                          className="flex items-start gap-3"
                        >
                          <textarea
                            value={subtopic}
                            onChange={event =>
                              updateKnowledgeSubtopic(
                                topicIndex,
                                subtopicIndex,
                                event.target.value
                              )
                            }
                            rows={2}
                            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeKnowledgeSubtopic(
                                topicIndex,
                                subtopicIndex
                              )
                            }
                            className="bg-red-50 text-red-600 px-3 py-3 rounded-xl text-[8px] font-black uppercase"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addKnowledgeSubtopic(topicIndex)}
                      className="mt-4 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[8px] font-black uppercase"
                    >
                      Adicionar subtópico
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'sa' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-8 mb-10 no-print">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">
                Situações-Problema
              </h3>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addLearningSituation}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase"
                >
                  Adicionar situação
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-red-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase"
                >
                  Imprimir
                </button>
              </div>
            </div>

            <div className="space-y-10 pb-10 no-print">
              {localUnit.learningSituations.map(situation => (
                <div
                  key={situation.id}
                  className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl"
                >
                  <div className="flex gap-3 mb-6">
                    <input
                      type="text"
                      value={situation.title}
                      onChange={event =>
                        updateLearningSituation(
                          situation.id,
                          'title',
                          event.target.value
                        )
                      }
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-xl font-black uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => removeLearningSituation(situation.id)}
                      className="bg-red-50 text-red-600 px-4 rounded-xl text-[9px] font-black uppercase"
                    >
                      Excluir
                    </button>
                  </div>

                  <label className="block mb-6">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Contextualização
                    </span>
                    <textarea
                      value={situation.contextualization}
                      onChange={event =>
                        updateLearningSituation(
                          situation.id,
                          'contextualization',
                          event.target.value
                        )
                      }
                      rows={6}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-relaxed"
                    />
                  </label>

                  <label className="block mb-6">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Desafio
                    </span>
                    <textarea
                      value={situation.challenge}
                      onChange={event =>
                        updateLearningSituation(
                          situation.id,
                          'challenge',
                          event.target.value
                        )
                      }
                      rows={5}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-relaxed"
                    />
                  </label>

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Resultados esperados
                      </span>
                      <button
                        type="button"
                        onClick={() => addExpectedResult(situation)}
                        className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-[8px] font-black uppercase"
                      >
                        Adicionar resultado
                      </button>
                    </div>

                    <div className="space-y-3">
                      {situation.expectedResults.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="flex items-start gap-3"
                        >
                          <textarea
                            value={result}
                            onChange={event =>
                              updateExpectedResult(
                                situation,
                                resultIndex,
                                event.target.value
                              )
                            }
                            rows={2}
                            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeExpectedResult(situation, resultIndex)
                            }
                            className="bg-red-50 text-red-600 px-3 py-3 rounded-xl text-[8px] font-black uppercase"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden report-document-sa">
              <PrintHeader subtitle="Guia de Situações de Aprendizagem" />
              <h2 className="doc-main-title">Situações de Aprendizagem</h2>
              <div style={{ marginBottom: '10pt', fontSize: '10pt', fontWeight: 'bold' }}>
                Unidade Curricular: {localUnit.name.toUpperCase()}
              </div>

              {localUnit.learningSituations.map(situation => (
                <div key={situation.id} className="sa-print-block">
                  <div className="sa-print-title">{situation.title}</div>

                  <div className="sa-print-section">
                    <div className="sa-print-section-title">
                      I. Contextualização / Situação-Problema
                    </div>
                    <div className="sa-print-text">
                      {situation.contextualization}
                    </div>
                  </div>

                  <div className="sa-print-section">
                    <div className="sa-print-section-title">
                      II. Desafio Proposto
                    </div>
                    <div className="sa-print-text">{situation.challenge}</div>
                  </div>

                  <div className="sa-print-section">
                    <div className="sa-print-section-title">
                      III. Resultados Esperados
                    </div>
                    <ol>
                      {situation.expectedResults.map((result, index) => (
                        <li key={index}>{result}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rubricas' && (
          <div className="no-print">
            <div className="flex justify-between items-center gap-4 mb-6">
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">
                Rubricas
              </h3>
              <button
                type="button"
                onClick={addRubric}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase"
              >
                Adicionar rubrica
              </button>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-2">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 text-[10px] font-black uppercase">
                      Referência
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase text-red-400">
                      NSA
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase text-orange-400">
                      APO
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase text-blue-400">
                      PAR
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase text-green-400">
                      AUT
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {localUnit.rubrics.map((rubric: Rubric) => (
                    <tr key={rubric.id}>
                      <td className="p-2 border border-slate-100">
                        <textarea
                          value={rubric.capacity}
                          onChange={event =>
                            updateRubric(
                              rubric.id,
                              'capacity',
                              event.target.value
                            )
                          }
                          rows={5}
                          className="w-64 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold"
                        />
                      </td>

                      {(['nsa', 'apo', 'par', 'aut'] as const).map(level => (
                        <td
                          key={level}
                          className="p-2 border border-slate-100"
                        >
                          <textarea
                            value={rubric.levels[level]}
                            onChange={event =>
                              updateRubric(
                                rubric.id,
                                level,
                                event.target.value
                              )
                            }
                            rows={5}
                            className="w-64 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                          />
                        </td>
                      ))}

                      <td className="p-2 border border-slate-100">
                        <button
                          type="button"
                          onClick={() => removeRubric(rubric.id)}
                          className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-[8px] font-black uppercase"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cronograma' && (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-8 no-print">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">
                  Plano de Aula
                </h3>
                <p className="mt-2 text-[10px] font-bold uppercase text-slate-400">
                  {localUnit.semester}º semestre — datas de {dateRange.min
                    .split('-')
                    .reverse()
                    .join('/')} a {dateRange.max
                    .split('-')
                    .reverse()
                    .join('/')}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addScheduleEntry}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase"
                >
                  Adicionar aula
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-red-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase"
                >
                  Imprimir
                </button>
                <button
                  type="button"
                  onClick={handleResetToTemplate}
                  className="bg-slate-100 text-slate-500 px-5 py-3 rounded-xl text-[9px] font-black uppercase"
                >
                  Restaurar padrão
                </button>
              </div>
            </div>

            {dateError && (
              <div className="no-print bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-bold">
                {dateError}
              </div>
            )}

            <div className="no-print space-y-6">
              {localUnit.schedule.map((entry, index) => (
                <div
                  key={entry.id}
                  className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg"
                >
                  <div className="flex flex-wrap justify-between gap-4 mb-6">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">
                        Aula {index + 1}
                      </p>
                      <p className="text-[10px] font-black uppercase text-slate-500 mt-1">
                        {getDayOfWeek(entry.date)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeScheduleEntry(entry.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[8px] font-black uppercase"
                    >
                      Excluir aula
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <label>
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        Data
                      </span>
                      <input
                        type="date"
                        min={dateRange.min}
                        max={dateRange.max}
                        value={toIsoDate(entry.date)}
                        onChange={event =>
                          updateScheduleDate(entry.id, event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                      />
                    </label>

                    <label>
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        Horas
                      </span>
                      <input
                        type="number"
                        min={1}
                        step={1}
                        value={entry.hours}
                        onChange={event =>
                          updateEntry(
                            entry.id,
                            'hours',
                            Math.max(1, Number(event.target.value) || 1)
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                      />
                    </label>

                    <label>
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        Identificação da aula
                      </span>
                      <input
                        type="text"
                        value={entry.lesson || ''}
                        onChange={event =>
                          updateEntry(entry.id, 'lesson', event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                        placeholder={`Aula ${index + 1}`}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <EditableScheduleField
                      label="Capacidades"
                      value={entry.capacities}
                      onChange={value =>
                        updateEntry(entry.id, 'capacities', value)
                      }
                    />
                    <EditableScheduleField
                      label="Conhecimentos"
                      value={entry.knowledge}
                      onChange={value =>
                        updateEntry(entry.id, 'knowledge', value)
                      }
                    />
                    <EditableScheduleField
                      label="Estratégias"
                      value={entry.strategy}
                      onChange={value =>
                        updateEntry(entry.id, 'strategy', value)
                      }
                    />
                    <EditableScheduleField
                      label="Recursos"
                      value={entry.resources}
                      onChange={value =>
                        updateEntry(entry.id, 'resources', value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden report-document">
              <PrintHeader subtitle="Plano de Aula e Cronograma" />
              <h2 className="doc-main-title">
                Cronograma de Atividades Pedagógicas
              </h2>
              <div style={{ marginBottom: '10pt', fontSize: '11pt' }}>
                Unidade Curricular:{' '}
                <strong>{localUnit.name.toUpperCase()}</strong>
              </div>

              <table className="tech-table">
                <thead>
                  <tr>
                    <th style={{ width: '15%' }}>Data / Aula</th>
                    <th style={{ width: '42.5%' }}>
                      Conhecimentos e Capacidades
                    </th>
                    <th style={{ width: '42.5%' }}>
                      Estratégias e Recursos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {localUnit.schedule.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>
                        <strong>{entry.date}</strong>
                        <br />
                        {getDayOfWeek(entry.date)}
                        <br />
                        Aula {index + 1} — {entry.hours}h
                      </td>
                      <td>
                        <span className="p-label">Conhecimentos</span>
                        {entry.knowledge}
                        <br />
                        <br />
                        <span className="p-label">Capacidades</span>
                        {entry.capacities}
                      </td>
                      <td>
                        <span className="p-label">Estratégias</span>
                        {entry.strategy}
                        <br />
                        <br />
                        <span className="p-label">Recursos</span>
                        {entry.resources}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="no-print">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">
                  Calendário da Unidade
                </h3>
                <p className="mt-2 text-[10px] font-bold uppercase text-slate-400">
                  Preenchido automaticamente pelas datas do Plano de Aula
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLOR_MAP[unitMeta.color] }}
                />
                <span className="text-[10px] font-black uppercase text-slate-600">
                  {unitMeta.sigla}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthsInRange.map(monthStr => (
                <CalendarMonth
                  key={monthStr}
                  monthStr={monthStr}
                  scheduleDates={scheduleDates}
                  color={unitMeta.color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface EditableListProps {
  title: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const EditableList: React.FC<EditableListProps> = ({
  title,
  values,
  onChange,
  onAdd,
  onRemove
}) => (
  <section>
    <div className="flex items-center justify-between gap-4 mb-6">
      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
        {title}
      </h3>
      <button
        type="button"
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[8px] font-black uppercase"
      >
        Adicionar
      </button>
    </div>

    <div className="space-y-3">
      {values.map((value, index) => (
        <div key={index} className="flex items-start gap-3">
          <span className="mt-3 text-blue-500 font-black">{index + 1}.</span>
          <textarea
            value={value}
            onChange={event => onChange(index, event.target.value)}
            rows={3}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="bg-red-50 text-red-600 px-3 py-3 rounded-xl text-[8px] font-black uppercase"
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  </section>
);

interface EditableScheduleFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const EditableScheduleField: React.FC<EditableScheduleFieldProps> = ({
  label,
  value,
  onChange
}) => (
  <label>
    <span className="text-[9px] font-black text-slate-400 uppercase">
      {label}
    </span>
    <textarea
      value={value}
      onChange={event => onChange(event.target.value)}
      rows={5}
      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-relaxed"
    />
  </label>
);

interface CalendarMonthProps {
  monthStr: string;
  scheduleDates: Record<string, ScheduleEntry[]>;
  color: CalendarColor;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  monthStr,
  scheduleDates,
  color
}) => {
  const [year, month] = monthStr.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long' });

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
        <h4 className="text-[10px] font-black uppercase tracking-widest italic">
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
                  className="h-12 border-b border-r border-slate-50"
                />
              );
            }

            const entries = scheduleDates[day] || [];
            const hasClass = entries.length > 0;
            const isSunday = index % 7 === 0;

            return (
              <div
                key={day}
                title={entries
                  .map(
                    entry =>
                      `${entry.hours}h — ${entry.capacities || entry.knowledge}`
                  )
                  .join('\n')}
                className="h-12 flex flex-col items-center justify-center border-b border-r border-slate-50 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: hasClass ? COLOR_MAP[color] : 'transparent',
                  color: hasClass
                    ? TEXT_COLOR_MAP[color]
                    : isSunday
                      ? '#ef4444'
                      : '#1e293b'
                }}
              >
                <span className="text-[10px] font-black">
                  {day.split('-')[2]}
                </span>
                {hasClass && (
                  <span className="text-[6px] font-black uppercase">
                    {entries.reduce(
                      (total, entry) => total + Number(entry.hours || 0),
                      0
                    )}
                    h
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PrintHeader: React.FC<{ subtitle: string }> = ({ subtitle }) => (
  <div className="report-header">
    <div className="logo-box">SENAI</div>
    <div className="info-box">
      <h1>Mecânico de Usinagem Convencional</h1>
      <p>{subtitle} — Sistema MSEP</p>
    </div>
  </div>
);

export default UnitViewer;
