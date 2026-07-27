import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import {
  TeachingPlan,
  ViewType,
  CurricularUnit,
  ScheduleEntry,
  UnitCalendar,
  SemesterNumber
} from './types';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from './constants';
import { FirebaseService } from './services/firebase';

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();

const getUnitSigla = (unit: CurricularUnit): string => {
  if (unit.code?.trim()) return unit.code.trim().toUpperCase();

  const name = normalizeText(unit.name || '');
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .slice(0, 8);
};

const sortUnits = (units: CurricularUnit[]) => {
  const safeUnits = Array.isArray(units) ? units : [];
  return [...safeUnits].sort((a, b) => {
    const semesterDiff = Number(a.semester || 1) - Number(b.semester || 1);
    if (semesterDiff !== 0) return semesterDiff;

    const orderDiff = Number(a.order || 0) - Number(b.order || 0);
    if (orderDiff !== 0) return orderDiff;

    return (a.name || '').localeCompare(b.name || '', 'pt-BR');
  });
};

const mergeUnitWithTemplate = (
  existingUnit: CurricularUnit,
  templateUnit: CurricularUnit
): CurricularUnit => ({
  ...templateUnit,
  ...existingUnit,
  code: existingUnit.code || templateUnit.code,
  semester: existingUnit.semester || templateUnit.semester,
  order: existingUnit.order || templateUnit.order,
  active: existingUnit.active ?? templateUnit.active ?? true,
  calendar: {
    ...templateUnit.calendar,
    ...existingUnit.calendar,
    semester:
      existingUnit.calendar?.semester ||
      existingUnit.semester ||
      templateUnit.calendar?.semester ||
      templateUnit.semester
  },
  basicCapacities:
    existingUnit.basicCapacities?.length
      ? existingUnit.basicCapacities
      : templateUnit.basicCapacities || [],
  socioemocionalCapacities:
    existingUnit.socioemocionalCapacities?.length
      ? existingUnit.socioemocionalCapacities
      : templateUnit.socioemocionalCapacities || [],
  knowledge:
    existingUnit.knowledge?.length
      ? existingUnit.knowledge
      : templateUnit.knowledge || [],
  learningSituations:
    existingUnit.learningSituations?.length
      ? existingUnit.learningSituations
      : templateUnit.learningSituations || [],
  rubrics:
    existingUnit.rubrics?.length
      ? existingUnit.rubrics
      : templateUnit.rubrics || [],
  schedule:
    existingUnit.schedule?.length
      ? existingUnit.schedule
      : templateUnit.schedule || []
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber>(1);
  const [isLoading, setIsLoading] = useState(true);

  // Estados locais para o formulário de cadastro de unidade curricular
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newWorkload, setNewWorkload] = useState<number>(40);
  const [newSemester, setNewSemester] = useState<1 | 2>(1);

  const currentPlanSemesters = useMemo(() => {
    if (!currentPlan || !Array.isArray(currentPlan.units)) return [];

    return Array.from(
      new Set(
        currentPlan.units
          .filter(unit => unit && unit.active !== false)
          .map(unit => Number(unit.semester || 1))
      )
    ).sort((a, b) => a - b);
  }, [currentPlan]);

  const visibleUnits = useMemo(() => {
    if (!currentPlan || !Array.isArray(currentPlan.units)) return [];

    return sortUnits(
      currentPlan.units.filter(
        unit =>
          unit &&
          unit.active !== false &&
          Number(unit.semester || 1) === Number(selectedSemester)
      )
    );
  }, [currentPlan, selectedSemester]);

  const normalizePlan = useCallback(
    (plan: TeachingPlan, template: TeachingPlan) => {
      let updated = false;
      const templateUnits = Array.isArray(template?.units) ? template.units : [];
      const planUnits = Array.isArray(plan?.units) ? plan.units : [];

      const templateBySigla = new Map(
        templateUnits.map(unit => [getUnitSigla(unit), unit])
      );

      const seen = new Set<string>();
      const cleanedUnits: CurricularUnit[] = [];

      for (const originalUnit of planUnits) {
        if (!originalUnit) continue;
        const sigla = getUnitSigla(originalUnit);

        if (!sigla || seen.has(sigla)) {
          updated = true;
          continue;
        }

        seen.add(sigla);
        const templateUnit = templateBySigla.get(sigla);

        const normalizedUnit: CurricularUnit = templateUnit
          ? mergeUnitWithTemplate(originalUnit, templateUnit)
          : {
              ...originalUnit,
              code: originalUnit.code || sigla,
              semester: Number(originalUnit.semester || 1),
              order: Number(originalUnit.order || cleanedUnits.length + 1),
              active: originalUnit.active ?? true,
              calendar: {
                ...originalUnit.calendar,
                semester:
                  originalUnit.calendar?.semester ||
                  Number(originalUnit.semester || 1)
              }
            };

        if (JSON.stringify(normalizedUnit) !== JSON.stringify(originalUnit)) {
          updated = true;
        }

        cleanedUnits.push(normalizedUnit);
      }

      for (const templateUnit of templateUnits) {
        const sigla = getUnitSigla(templateUnit);
        const alreadyExists = cleanedUnits.some(
          unit => getUnitSigla(unit) === sigla
        );

        if (!alreadyExists) {
          cleanedUnits.push({
            ...templateUnit,
            active: templateUnit.active ?? true,
            calendar: {
              ...templateUnit.calendar,
              semester:
                templateUnit.calendar?.semester ||
                templateUnit.semester
            }
          });
          updated = true;
        }
      }

      const orderedUnits = sortUnits(cleanedUnits);

      if (JSON.stringify(orderedUnits) !== JSON.stringify(planUnits)) {
        updated = true;
      }

      const normalizedPlan: TeachingPlan = {
        ...template,
        ...plan,
        profileId: activeProfileId,
        totalHours: plan.totalHours || template.totalHours,
        version: SCHEDULE_VERSION,
        units: orderedUnits,
        updatedAt: updated ? new Date().toISOString() : plan.updatedAt
      };

      if (plan.version !== SCHEDULE_VERSION) {
        normalizedPlan.version = SCHEDULE_VERSION;
        normalizedPlan.updatedAt = new Date().toISOString();
        updated = true;
      }

      return { normalizedPlan, updated };
    },
    [activeProfileId]
  );

  const loadPlans = useCallback(
    async (profileId: string) => {
      setIsLoading(true);

      try {
        const template =
          SAMPLE_PLANS.find(plan => plan.profileId === profileId) ||
          SAMPLE_PLANS[0];

        const dbPlans = await FirebaseService.getPlans(profileId);

        if (!dbPlans || dbPlans.length === 0) {
          const defaultPlan: TeachingPlan = {
            ...template,
            id: `plan-usinagem-${profileId}`,
            profileId,
            version: SCHEDULE_VERSION,
            updatedAt: new Date().toISOString(),
            units: sortUnits(template?.units || [])
          };

          await FirebaseService.savePlan(defaultPlan);

          setPlans([defaultPlan]);
          setCurrentPlan(defaultPlan);

          const firstSemester = Math.min(
            ...defaultPlan.units.map(unit => Number(unit.semester || 1)),
            1
          );
          setSelectedSemester(firstSemester);

          const firstUnit = sortUnits(defaultPlan.units).find(
            unit => Number(unit.semester || 1) === firstSemester
          ) || null;

          setSelectedUnit(firstUnit);
          return;
        }

        const processedPlans: TeachingPlan[] = [];

        for (const plan of dbPlans) {
          const { normalizedPlan, updated } = normalizePlan(plan, template);

          if (updated) {
            await FirebaseService.savePlan(normalizedPlan);
          }

          processedPlans.push(normalizedPlan);
        }

        setPlans(processedPlans);

        const nextCurrent =
          processedPlans.find(plan => plan.id === currentPlan?.id) ||
          processedPlans[0];

        setCurrentPlan(nextCurrent);

        const availableSemesters = Array.from(
          new Set(
            (nextCurrent?.units || [])
              .filter(unit => unit && unit.active !== false)
              .map(unit => Number(unit.semester || 1))
          )
        ).sort((a, b) => a - b);

        const nextSemester = availableSemesters.includes(
          Number(selectedSemester)
        )
          ? Number(selectedSemester)
          : availableSemesters[0] || 1;

        setSelectedSemester(nextSemester);

        const nextSelected =
          nextCurrent?.units?.find(unit => unit.id === selectedUnit?.id) ||
          sortUnits(nextCurrent?.units || []).find(
            unit =>
              unit &&
              unit.active !== false &&
              Number(unit.semester || 1) === nextSemester
          ) ||
          null;

        setSelectedUnit(nextSelected);
      } catch (error) {
        console.error('Erro ao carregar Firebase:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPlan?.id, normalizePlan, selectedSemester, selectedUnit?.id]
  );

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
  }, [activeProfileId, isAuthenticated, loadPlans]);

  useEffect(() => {
    if (!visibleUnits.length) return;

    const selectedIsVisible = visibleUnits.some(
      unit => unit.id === selectedUnit?.id
    );

    if (!selectedIsVisible) {
      setSelectedUnit(visibleUnits[0]);
    }
  }, [visibleUnits, selectedUnit?.id]);

  const persistPlan = async (updatedPlan: TeachingPlan) => {
    const planToSave: TeachingPlan = {
      ...updatedPlan,
      profileId: activeProfileId,
      version: SCHEDULE_VERSION,
      updatedAt: new Date().toISOString(),
      units: sortUnits(updatedPlan.units)
    };

    setCurrentPlan(planToSave);
    setPlans(previous =>
      previous.map(plan => (plan.id === planToSave.id ? planToSave : plan))
    );

    await FirebaseService.savePlan(planToSave);
    return planToSave;
  };

  const handleUpdateSchedule = async (
    unitId: string,
    newSchedule: ScheduleEntry[]
  ) => {
    if (!currentPlan) return;

    const updatedUnits = currentPlan.units.map(unit =>
      unit.id === unitId ? { ...unit, schedule: newSchedule } : unit
    );

    const updatedPlan = await persistPlan({
      ...currentPlan,
      units: updatedUnits
    });

    const updatedUnit = updatedPlan.units.find(unit => unit.id === unitId);
    if (updatedUnit) setSelectedUnit(updatedUnit);
  };

  const handleUpdateCalendar = async (
    unitId: string,
    newCalendar: UnitCalendar
  ) => {
    if (!currentPlan) return;

    const updatedUnits = currentPlan.units.map(unit =>
      unit.id === unitId
        ? {
            ...unit,
            calendar: {
              ...newCalendar,
              semester: newCalendar.semester || unit.semester
            }
          }
        : unit
    );

    const updatedPlan = await persistPlan({
      ...currentPlan,
      units: updatedUnits
    });

    const updatedUnit = updatedPlan.units.find(unit => unit.id === unitId);
    if (updatedUnit) setSelectedUnit(updatedUnit);
  };

  const handleUpdateUnitField = async (id: string, field: keyof CurricularUnit, value: any) => {
    if (!currentPlan || !currentPlan.units) return;
    const updatedUnits = currentPlan.units.map(u => u.id === id ? { ...u, [field]: value } : u);
    await persistPlan({
      ...currentPlan,
      units: updatedUnits
    });
  };

  const handleDeleteUnit = async (id: string) => {
    if (!currentPlan || !currentPlan.units) return;
    if (window.confirm('Deseja realmente excluir esta unidade curricular?')) {
      const updatedUnits = currentPlan.units.filter(u => u.id !== id);
      await persistPlan({
        ...currentPlan,
        units: updatedUnits
      });
    }
  };

  const handleAddUnitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlan) return;
    if (!newCode.trim() || !newName.trim()) {
      alert('Preencha a Sigla e o Nome da Unidade Curricular.');
      return;
    }

    const createdUnit: CurricularUnit = {
      id: `unit-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      workload: Number(newWorkload),
      semester: Number(newSemester) as 1 | 2,
      active: true,
      basicCapacities: [],
      socioemocionalCapacities: [],
      knowledge: [],
      learningSituations: [],
      rubrics: [],
      schedule: []
    };

    const updatedUnits = [...(currentPlan.units || []), createdUnit];
    await persistPlan({
      ...currentPlan,
      units: updatedUnits
    });

    setNewCode('');
    setNewName('');
    setNewWorkload(40);
    setNewSemester(1);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPlan(null);
    setSelectedUnit(null);
    setSelectedSemester(1);
    setView('dashboard');
  };

  const handleProfileChange = (profileId: string) => {
    setActiveProfileId(profileId);
    setCurrentPlan(null);
    setSelectedUnit(null);
    setSelectedSemester(1);
    setView('dashboard');
  };

  const openPlan = (plan: TeachingPlan) => {
    const orderedUnits = sortUnits(plan.units);
    const firstUnit = orderedUnits.find(unit => unit.active !== false) || null;
    const firstSemester = Number(firstUnit?.semester || 1);

    setCurrentPlan({
      ...plan,
      units: orderedUnits
    });
    setSelectedSemester(firstSemester);
    setSelectedUnit(firstUnit);
    setView('plano-curso' as ViewType);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout
      activeView={view}
      onViewChange={setView}
      onLogout={handleLogout}
      activeProfileId={activeProfileId}
      onProfileChange={handleProfileChange}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Sincronizando dados...
          </p>
        </div>
      ) : (
        <>
          {view === 'dashboard' && (
            <Dashboard
              plans={plans}
              onEdit={plan => {
                setCurrentPlan(plan);
                setView('unidades-curriculares' as ViewType);
              }}
              onView={openPlan}
              onRefresh={() => loadPlans(activeProfileId)}
            />
          )}

          {view === ('plano-curso' as ViewType) && currentPlan && (
            <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn pb-20">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#E30613]" />

                <div className="mb-12 flex justify-between items-start">
                  <div>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
                      MSEP - Modelo SENAI
                    </span>
                    <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]">
                      {currentPlan.courseName}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">
                      Carga Total
                    </p>
                    <p className="text-2xl font-black text-slate-800 italic">
                      {currentPlan.totalHours} HORAS
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">
                      Modalidade
                    </p>
                    <p className="text-2xl font-black text-slate-800 italic uppercase">
                      {currentPlan.modality}
                    </p>
                  </div>
                </div>

                <section>
                  <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">
                    I. Perfil de Conclusão
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {currentPlan.objective}
                  </p>
                </section>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
                  III. Unidades Curriculares
                </h3>

                <div className="flex flex-wrap gap-3 mb-8">
                  {currentPlanSemesters.map(semester => (
                    <button
                      key={semester}
                      onClick={() => setSelectedSemester(semester)}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                        Number(selectedSemester) === Number(semester)
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500'
                      }`}
                    >
                      {semester}º semestre
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {visibleUnits.map((unit, index) => (
                    <button
                      key={unit.id}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setSelectedSemester(unit.semester);
                        setView('plano-ensino' as ViewType);
                      }}
                      className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden"
                    >
                      <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[9px] font-black text-blue-400 mb-2">
                        {getUnitSigla(unit)}
                      </p>
                      <h4 className="font-black text-lg leading-tight uppercase line-clamp-2">
                        {unit.name}
                      </h4>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === ('plano-ensino' as ViewType) &&
            currentPlan &&
            selectedUnit && (
              <div className="space-y-8 max-w-7xl mx-auto pb-20">
                <div className="flex flex-wrap gap-3 px-1">
                  {currentPlanSemesters.map(semester => (
                    <button
                      key={semester}
                      onClick={() => setSelectedSemester(semester)}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                        Number(selectedSemester) === Number(semester)
                          ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                          : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300'
                      }`}
                    >
                      {semester}º semestre
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
                  {visibleUnits.map(unit => (
                    <button
                      key={unit.id}
                      onClick={() => setSelectedUnit(unit)}
                      className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                        selectedUnit.id === unit.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105'
                          : 'bg-white border-slate-200 text-slate-400 hover:border-blue-100'
                      }`}
                    >
                      {getUnitSigla(unit)}
                    </button>
                  ))}
                </div>

                <UnitViewer
                  unit={selectedUnit}
                  onUpdateSchedule={newSchedule =>
                    handleUpdateSchedule(selectedUnit.id, newSchedule)
                  }
                  onUpdateCalendar={newCalendar =>
                    handleUpdateCalendar(selectedUnit.id, newCalendar)
                  }
                  onUpdateUnit={async updatedUnit => {
                    if (!currentPlan) return;
                    const updatedUnits = currentPlan.units.map(u => u.id === updatedUnit.id ? updatedUnit : u);
                    await persistPlan({ ...currentPlan, units: updatedUnits });
                    setSelectedUnit(updatedUnit);
                  }}
                />
              </div>
            )}

          {view === ('calendario' as ViewType) && currentPlan && (
            <GeneralCalendar plan={currentPlan} />
          )}

          {view === ('unidades-curriculares' as ViewType) && currentPlan && (
            <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-20">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">
                  Curso: {currentPlan.courseName}
                </span>
                <h2 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tight">
                  Unidades Curriculares
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Cadastro e gerenciamento das unidades, siglas, carga horária e semestres
                </p>
              </div>

              {/* Formulário de Cadastro */}
              <form onSubmit={handleAddUnitSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">+ Adicionar Nova Unidade Curricular</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Sigla / ID</label>
                    <input
                      type="text"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      placeholder="Ex: MDU, LIDT..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 uppercase focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nome da Unidade</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Ex: Mecânica de Usinagem Convencional..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Carga Horária (h)</label>
                    <input
                      type="number"
                      value={newWorkload}
                      onChange={(e) => setNewWorkload(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="w-1/3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Semestre</label>
                    <select
                      value={newSemester}
                      onChange={(e) => setNewSemester(Number(e.target.value) as 1 | 2)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value={1}>1º Semestre</option>
                      <option value={2}>2º Semestre</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all self-end"
                  >
                    Cadastrar Unidade
                  </button>
                </div>
              </form>

              {/* Lista de Unidades Cadastradas */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Unidades Cadastradas</h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {(!currentPlan.units || currentPlan.units.length === 0) ? (
                    <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase">
                      Nenhuma unidade cadastrada neste curso.
                    </div>
                  ) : (
                    currentPlan.units.map((unit) => (
                      <div key={unit.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/50">
                        <div className="flex items-center gap-4">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl font-mono text-xs font-black">
                            {unit.code || 'S/SIGLA'}
                          </span>
                          <div>
                            <input
                              type="text"
                              value={unit.name}
                              onChange={(e) => handleUpdateUnitField(unit.id, 'name', e.target.value)}
                              className="text-xs font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 outline-none w-72"
                            />
                            <div className="flex gap-4 mt-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase">
                                Carga: 
                                <input
                                  type="number"
                                  value={unit.workload || 0}
                                  onChange={(e) => handleUpdateUnitField(unit.id, 'workload', Number(e.target.value))}
                                  className="w-16 ml-1 bg-slate-50 border border-slate-200 rounded px-1 text-slate-700 font-bold"
                                /> h
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <select
                            value={unit.semester || 1}
                            onChange={(e) => handleUpdateUnitField(unit.id, 'semester', Number(e.target.value))}
                            className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black text-slate-700 uppercase"
                          >
                            <option value={1}>1º Semestre</option>
                            <option value={2}>2º Semestre</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDeleteUnit(unit.id)}
                            className="text-slate-400 hover:text-red-600 text-xs font-black p-2 transition-all"
                          >
                            Excluir ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
