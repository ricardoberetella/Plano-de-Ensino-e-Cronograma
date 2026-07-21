import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber>(1);
  const [isLoading, setIsLoading] = useState(true);

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

          // Apenas grava o padrão inicial se necessário, mas podemos condicionar ou deixar livres para leitura
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

          // Se for admin e houver atualização automática estrutural, salva. Usuário comum apenas lê.
          if (updated && isAdmin) {
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
    [currentPlan?.id, normalizePlan, selectedSemester, selectedUnit?.id, isAdmin]
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
    // Trava de segurança rigorosa: se não for admin, impede a persistência
    if (!isAdmin) {
      alert('Acesso negado: A senha utilizada permite apenas visualização.');
      throw new Error('Unauthorized');
    }

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

  const handleSave = async (updatedPlan: TeachingPlan) => {
    if (!isAdmin) {
      alert('Acesso negado: Apenas o administrador pode salvar alterações.');
      return;
    }
    try {
      await persistPlan(updatedPlan);
      const refreshed = await FirebaseService.getPlans(activeProfileId);
      setPlans(refreshed);
      setView('dashboard');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const handleUpdateSchedule = async (
    unitId: string,
    newSchedule: ScheduleEntry[]
  ) => {
    if (!isAdmin) {
      alert('Acesso negado: Modo de visualização.');
      return;
    }
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
    if (!isAdmin) {
      alert('Acesso negado: Modo de visualização.');
      return;
    }
    if (!currentPlan) return;

    const updatedUnits = currentPlan.units.map(unit =>
      unit.id === unitId
        ? {
            ...unit,
            calendar: {
              ...newCalendar,
              semester:
                newCalendar.semester ||
                unit.semester
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

  const handleUpdateUnit = async (updatedUnit: CurricularUnit) => {
    if (!isAdmin) {
      alert('Acesso negado: Modo de visualização.');
      return;
    }
    if (!currentPlan) return;

    const normalizedUnit: CurricularUnit = {
      ...updatedUnit,
      code: updatedUnit.code || getUnitSigla(updatedUnit),
      semester: Number(updatedUnit.semester || 1),
      order: Number(updatedUnit.order || 1),
      active: updatedUnit.active ?? true,
      calendar: {
        ...updatedUnit.calendar,
        semester:
          updatedUnit.calendar?.semester ||
          Number(updatedUnit.semester || 1)
      }
    };

    const updatedUnits = currentPlan.units.map(unit =>
      unit.id === normalizedUnit.id ? normalizedUnit : unit
    );

    const updatedPlan = await persistPlan({
      ...currentPlan,
      units: updatedUnits
    });

    const savedUnit = updatedPlan.units.find(
      unit => unit.id === normalizedUnit.id
    );

    if (savedUnit) {
      setSelectedUnit(savedUnit);
      setSelectedSemester(savedUnit.semester);
    }
  };

  const handleLoginSubmit = (passwordEntered: string) => {
    if (passwordEntered === 'bere662') {
      setIsAdmin(true);
      setIsAuthenticated(true);
    } else if (passwordEntered === 'ianes662') {
      setIsAdmin(false);
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
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
    return <Login onLogin={handleLoginSubmit} />;
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
                if (!isAdmin) {
                  alert("Acesso restrito: A senha de usuário comum permite apenas visualização.");
                  return;
                }
                setCurrentPlan(plan);
                setView('editor' as ViewType);
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
                  isAdmin={isAdmin}
                  onUpdateSchedule={newSchedule =>
                    handleUpdateSchedule(selectedUnit.id, newSchedule)
                  }
                  onUpdateCalendar={newCalendar =>
                    handleUpdateCalendar(selectedUnit.id, newCalendar)
                  }
                  onUpdateUnit={handleUpdateUnit}
                />
              </div>
            )}

          {view === ('calendario' as ViewType) && currentPlan && (
            <GeneralCalendar plan={currentPlan} />
          )}

          {view === ('editor' as ViewType) && (
            <PlanForm
              initialPlan={currentPlan || undefined}
              isAdmin={isAdmin}
              onSave={handleSave}
              onCancel={() => setView('dashboard')}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
