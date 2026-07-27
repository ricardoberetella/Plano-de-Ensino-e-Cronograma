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
  rubrics: (existingUnit.rubrics || templateUnit.rubrics || []).map(r => ({
    ...r,
    nsa: r.nsa || { c: '', b: '', a: '' }
  })),
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

  // Estados para Modal de Cadastro / Edição de UC
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<CurricularUnit | null>(null);
  const [unitForm, setUnitForm] = useState({
    code: '',
    name: '',
    totalHours: 40,
    semester: 1 as SemesterNumber,
    order: 1
  });

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
              rubrics: (originalUnit.rubrics || []).map(r => ({
                ...r,
                nsa: r.nsa || { c: '', b: '', a: '' }
              })),
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
            rubrics: (templateUnit.rubrics || []).map(r => ({
              ...r,
              nsa: r.nsa || { c: '', b: '', a: '' }
            })),
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

        let dbPlans = [];
        try {
          dbPlans = await FirebaseService.getPlans(profileId);
        } catch (dbError) {
          console.warn('Aviso: Falha ao buscar do Firebase, usando template padrão local.', dbError);
        }

        if (!dbPlans || dbPlans.length === 0) {
          const defaultPlan: TeachingPlan = {
            ...template,
            id: `plan-usinagem-${profileId}`,
            profileId,
            version: SCHEDULE_VERSION,
            updatedAt: new Date().toISOString(),
            units: sortUnits(template?.units || [])
          };

          try {
            await FirebaseService.savePlan(defaultPlan);
          } catch (e) {
            console.warn('Não foi possível salvar plano padrão no Firebase:', e);
          }

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
          setIsLoading(false);
          return;
        }

        const processedPlans: TeachingPlan[] = [];

        for (const plan of dbPlans) {
          const { normalizedPlan, updated } = normalizePlan(plan, template);

          if (updated) {
            try {
              await FirebaseService.savePlan(normalizedPlan);
            } catch (e) {
              console.warn('Erro ao atualizar plano normalizado:', e);
            }
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
        console.error('Erro crítico ao carregar planos:', error);
        const fallbackTemplate = SAMPLE_PLANS[0];
        const fallbackPlan: TeachingPlan = {
          ...fallbackTemplate,
          id: `plan-fallback-${activeProfileId}`,
          profileId: activeProfileId,
          version: SCHEDULE_VERSION,
          units: sortUnits(fallbackTemplate?.units || [])
        };
        setPlans([fallbackPlan]);
        setCurrentPlan(fallbackPlan);
        setSelectedSemester(1);
        setSelectedUnit(fallbackPlan.units[0] || null);
      } finally {
        setIsLoading(false);
      }
    },
    [activeProfileId, currentPlan?.id, normalizePlan, selectedSemester, selectedUnit?.id]
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

    try {
      await FirebaseService.savePlan(planToSave);
    } catch (e) {
      console.warn('Erro ao salvar plano no Firebase:', e);
    }
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

  // Funções de Gerenciamento Manual de Unidades Curriculares
  const handleOpenAddUnitModal = () => {
    setEditingUnit(null);
    setUnitForm({
      code: '',
      name: '',
      totalHours: 40,
      semester: selectedSemester || 1,
      order: visibleUnits.length + 1
    });
    setIsUnitModalOpen(true);
  };

  const handleOpenEditUnitModal = (unit: CurricularUnit) => {
    setEditingUnit(unit);
    setUnitForm({
      code: unit.code || '',
      name: unit.name || '',
      totalHours: unit.totalHours || 40,
      semester: unit.semester || 1,
      order: unit.order || 1
    });
    setIsUnitModalOpen(true);
  };

  const handleSaveUnitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlan) return;

    if (editingUnit) {
      // Editar UC existente
      const updatedUnits = currentPlan.units.map(u =>
        u.id === editingUnit.id
          ? {
              ...u,
              code: unitForm.code,
              name: unitForm.name,
              totalHours: Number(unitForm.totalHours),
              semester: Number(unitForm.semester) as SemesterNumber,
              order: Number(unitForm.order)
            }
          : u
      );
      const saved = await persistPlan({ ...currentPlan, units: updatedUnits });
      const target = saved.units.find(u => u.id === editingUnit.id);
      if (target) setSelectedUnit(target);
    } else {
      // Criar nova UC
      const newUnitId = `uc-${Date.now()}`;
      const newUnit: CurricularUnit = {
        id: newUnitId,
        code: unitForm.code || `UC-${Date.now().toString().slice(-4)}`,
        name: unitForm.name,
        totalHours: Number(unitForm.totalHours),
        semester: Number(unitForm.semester) as SemesterNumber,
        order: Number(unitForm.order),
        active: true,
        basicCapacities: [],
        socioemocionalCapacities: [],
        knowledge: [],
        learningSituations: [],
        rubrics: [],
        schedule: []
      };

      const updatedUnits = [...currentPlan.units, newUnit];
      const saved = await persistPlan({ ...currentPlan, units: updatedUnits });
      const target = saved.units.find(u => u.id === newUnitId);
      if (target) {
        setSelectedSemester(target.semester);
        setSelectedUnit(target);
      }
    }

    setIsUnitModalOpen(false);
  };

  const handleDeleteUnit = async (unitId: string) => {
    if (!currentPlan) return;
    if (!window.confirm('Tem certeza que deseja excluir esta Unidade Curricular?')) return;

    const updatedUnits = currentPlan.units.filter(u => u.id !== unitId);
    const saved = await persistPlan({ ...currentPlan, units: updatedUnits });
    const remaining = sortUnits(saved.units).filter(
      u => Number(u.semester || 1) === Number(selectedSemester)
    );
    setSelectedUnit(remaining[0] || null);
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
    setView('plano-curso');
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
                setView('unidades-curriculares');
              }}
              onView={openPlan}
              onRefresh={() => loadPlans(activeProfileId)}
            />
          )}

          {view === 'plano-curso' && currentPlan && (
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
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    III. Unidades Curriculares
                  </h3>
                  <button
                    onClick={handleOpenAddUnitModal}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg flex items-center gap-2"
                  >
                    + Nova Unidade Curricular
                  </button>
                </div>

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
                    <div
                      key={unit.id}
                      className="bg-slate-800 p-6 rounded-3xl text-left relative overflow-hidden flex flex-col justify-between group border border-slate-700 hover:border-blue-500 transition-all"
                    >
                      <div>
                        <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2 pointer-events-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[9px] font-black text-blue-400 mb-2">
                          {getUnitSigla(unit)} ({unit.totalHours || 0}h)
                        </p>
                        <h4
                          onClick={() => {
                            setSelectedUnit(unit);
                            setSelectedSemester(unit.semester);
                            setView('unidades-curriculares');
                          }}
                          className="font-black text-lg leading-tight uppercase line-clamp-2 cursor-pointer hover:text-blue-300 mb-4"
                        >
                          {unit.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-slate-700/60 z-10">
                        <button
                          onClick={() => {
                            setSelectedUnit(unit);
                            setSelectedSemester(unit.semester);
                            setView('unidades-curriculares');
                          }}
                          className="flex-1 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white py-2 rounded-xl text-[9px] font-black uppercase transition-all"
                        >
                          Acessar
                        </button>
                        <button
                          onClick={() => handleOpenEditUnitModal(unit)}
                          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-[9px] font-black uppercase transition-all"
                          title="Editar UC"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteUnit(unit.id)}
                          className="px-3 py-2 bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white rounded-xl text-[9px] font-black uppercase transition-all"
                          title="Excluir UC"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(view === 'unidades-curriculares' || view === 'plano-ensino') && currentPlan && (
            <div className="space-y-8 max-w-7xl mx-auto pb-20">
              <div className="flex flex-wrap justify-between items-center gap-4 px-1">
                <div className="flex flex-wrap gap-3">
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

                <div className="flex gap-2">
                  {selectedUnit && (
                    <button
                      onClick={() => handleOpenEditUnitModal(selectedUnit)}
                      className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-2xl text-[10px] font-black uppercase transition-all shadow-md"
                    >
                      ✏️ Editar Unidade Atual
                    </button>
                  )}
                  <button
                    onClick={handleOpenAddUnitModal}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all shadow-lg flex items-center gap-2"
                  >
                    + Adicionar Nova UC
                  </button>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
                {visibleUnits.map(unit => (
                  <div key={unit.id} className="relative group flex-shrink-0">
                    <button
                      onClick={() => setSelectedUnit(unit)}
                      className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                        selectedUnit?.id === unit.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105'
                          : 'bg-white border-slate-200 text-slate-400 hover:border-blue-100'
                      }`}
                    >
                      {getUnitSigla(unit)}
                    </button>
                  </div>
                ))}
              </div>

              {selectedUnit && (
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
                    const updatedUnits = currentPlan.units.map(u =>
                      u.id === updatedUnit.id ? updatedUnit : u
                    );
                    await persistPlan({ ...currentPlan, units: updatedUnits });
                    setSelectedUnit(updatedUnit);
                  }}
                />
              )}
            </div>
          )}

          {view === 'calendario' && currentPlan && (
            <GeneralCalendar plan={currentPlan} />
          )}
        </>
      )}

      {/* MODAL DE CADASTRO E EDIÇÃO DE UNIDADE CURRICULAR */}
      {isUnitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-2xl border border-slate-200 animate-fadeIn">
            <h3 className="text-xl font-[1000] text-slate-900 uppercase tracking-tight mb-6">
              {editingUnit ? 'Editar Unidade Curricular' : 'Cadastrar Nova Unidade Curricular'}
            </h3>

            <form onSubmit={handleSaveUnitForm} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">
                  Sigla / Código (Ex: USIN-01)
                </label>
                <input
                  type="text"
                  required
                  value={unitForm.code}
                  onChange={e => setUnitForm({ ...unitForm, code: e.target.value })}
                  placeholder="Ex: MEC-01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">
                  Nome da Unidade Curricular
                </label>
                <input
                  type="text"
                  required
                  value={unitForm.name}
                  onChange={e => setUnitForm({ ...unitForm, name: e.target.value })}
                  placeholder="Ex: Usinagem em Torno CNC"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">
                    Carga Horária (h)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={unitForm.totalHours}
                    onChange={e => setUnitForm({ ...unitForm, totalHours: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">
                    Semestre
                  </label>
                  <select
                    value={unitForm.semester}
                    onChange={e => setUnitForm({ ...unitForm, semester: Number(e.target.value) as SemesterNumber })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={1}>1º Semestre</option>
                    <option value={2}>2º Semestre</option>
                    <option value={3}>3º Semestre</option>
                    <option value={4}>4º Semestre</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUnitModalOpen(false)}
                  className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-slate-100 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-xl transition-all"
                >
                  Salvar Unidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
