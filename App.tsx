import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from './types';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from './constants';
import { FirebaseService } from './services/firebase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Controle de Semestre Ativo (Inicia no 1º Semestre por padrão)
  const [currentSemester, setCurrentSemester] = useState<1 | 2>(1);

  // Função utilitária para normalizar e identificar a sigla correta
  const getUnitSigla = (unit: CurricularUnit) => {
    const name = unit.name.toUpperCase();
    const id = unit.id.toLowerCase();
    if (name.includes('LEITURA') || name.includes('DESENHO') || id.includes('lidt')) return 'LIDT';
    if (name.includes('CONTROLE') || name.includes('DIMENSIONAL') || id.includes('crd')) return 'CRD';
    if (name.includes('FUNDAMENTOS') || name.includes('USINAGEM') || id.includes('fusi')) return 'FUSI';
    if (name.includes('PROCESSOS') || name.includes('PRUSC')) return 'PRUSC';
    if (name.includes('METROLOGIA') || name.includes('METIND')) return 'METIND';
    return unit.name.split(' ').map(w => w[0]).join('').toUpperCase();
  };

  // Filtra dinamicamente as unidades curriculares baseadas no semestre ativo
  const filteredUnits = useMemo(() => {
    if (!currentPlan) return [];
    return currentPlan.units.filter(unit => {
      // Força a detecção por código/nome caso a propriedade semester esteja ausente no banco
      const code = (unit.code || '').toUpperCase();
      if (code === 'PRUSC' || code === 'METIND') {
        (unit as any).semester = 2;
      }
      
      const unitSemester = (unit as any).semester || 1;
      return unitSemester === currentSemester;
    });
  }, [currentPlan, currentSemester]);

  // Ajusta a unidade selecionada automaticamente se mudarmos de semestre
  useEffect(() => {
    if (filteredUnits.length > 0) {
      // Evita perder a seleção se a unidade já estiver na lista filtrada
      const isAlreadyInFilter = filteredUnits.some(u => selectedUnit && u.id === selectedUnit.id);
      if (!isAlreadyInFilter) {
        setSelectedUnit(filteredUnits[0]);
      }
    } else {
      setSelectedUnit(null);
    }
  }, [filteredUnits, currentSemester]);

  const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      
      // Ajusta o ID de busca para bater com o formato do JSON de constantes
      const sampleKey = profileId === 'beretella' ? 'ricardo-beretella' : 'ricardo-gea';
      const template1Sem = SAMPLE_PLANS[sampleKey]?.['1º SEM'] || SAMPLE_PLANS[0];
      const template2Sem = SAMPLE_PLANS[sampleKey]?.['2º SEM'];

      if (!dbPlans || dbPlans.length === 0) {
        // Une as unidades do primeiro e segundo semestre do template
        const combinedUnits = [
          ...template1Sem.units.map(u => ({ ...u, semester: 1 })),
          ...(template2Sem ? template2Sem.units.map(u => ({ ...u, semester: 2 })) : [])
        ];

        const defaultPlan = { 
          ...template1Sem, 
          id: `plan-usinagem-${profileId}`, 
          profileId: profileId,
          version: SCHEDULE_VERSION,
          units: combinedUnits,
          updatedAt: new Date().toISOString()
        };
        await FirebaseService.savePlan(defaultPlan);
        const refreshed = await FirebaseService.getPlans(profileId);
        setPlans(refreshed);
        setCurrentPlan(refreshed[0]);
        setSelectedUnit(refreshed[0].units[0]);
      } else {
        const processedPlans = await Promise.all(dbPlans.map(async (plan) => {
          let updated = false;
          
          // Assegura que propriedades antigas do banco recebam o semestre correto
          plan.units = plan.units.map(unit => {
            const code = (unit.code || '').toUpperCase();
            if (code === 'PRUSC' || code === 'METIND') {
              if ((unit as any).semester !== 2) {
                (unit as any).semester = 2;
                updated = true;
              }
            } else {
              if (!(unit as any).semester) {
                (unit as any).semester = 1;
              }
            }
            return unit;
          });

          // --- HIGIENIZAÇÃO DE UNIDADES DUPLICADAS ---
          const cleanedUnits: CurricularUnit[] = [];
          const seenSiglas1Sem = new Set<string>();
          const seenSiglas2Sem = new Set<string>();

          for (const unit of plan.units) {
            const sigla = getUnitSigla(unit);
            const sem = (unit as any).semester || 1;

            if (sem === 1) {
              if (unit.id === "04" || unit.id === "05" || seenSiglas1Sem.has(sigla)) {
                updated = true;
              } else {
                seenSiglas1Sem.add(sigla);
                cleanedUnits.push(unit);
              }
            } else {
              if (seenSiglas2Sem.has(sigla)) {
                updated = true;
              } else {
                seenSiglas2Sem.add(sigla);
                cleanedUnits.push(unit);
              }
            }
          }
          plan.units = cleanedUnits;

          // Injeta as unidades do 2º Semestre do template caso não existam no plano do banco
          if (template2Sem) {
            template2Sem.units.forEach(tUnit => {
              const tSigla = getUnitSigla(tUnit);
              const hasUnit = plan.units.some(u => getUnitSigla(u) === tSigla && (u as any).semester === 2);
              if (!hasUnit) {
                plan.units.push({ ...tUnit, semester: 2 });
                updated = true;
              }
            });
          }

          // Atualização forçada por mudança de versão do cronograma
          if ((plan as any).version !== SCHEDULE_VERSION) {
            if (template2Sem) {
              template2Sem.units.forEach(tUnit => {
                const idx = plan.units.findIndex(u => getUnitSigla(u) === getUnitSigla(tUnit) && (u as any).semester === 2);
                if (idx !== -1) {
                  plan.units[idx] = { ...tUnit, semester: 2 };
                }
              });
            }
            (plan as any).version = SCHEDULE_VERSION;
            updated = true;
          }

          if (updated) {
            plan.updatedAt = new Date().toISOString();
            await FirebaseService.savePlan(plan);
          }
          return plan;
        }));

        setPlans(processedPlans);
        if (currentPlan) {
          const updatedCurrent = processedPlans.find(p => p.id === currentPlan.id);
          if (updatedCurrent) {
            setCurrentPlan(updatedCurrent);
            if (selectedUnit) {
              const updatedUnit = updatedCurrent.units.find(u => u.id === selectedUnit.id);
              if (updatedUnit) setSelectedUnit(updatedUnit);
            }
          }
        } else {
          setCurrentPlan(processedPlans[0]);
          const initialUnits = processedPlans[0].units.filter(u => ((u as any).semester || 1) === currentSemester);
          setSelectedUnit(initialUnits[0] || processedPlans[0].units[0]);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar Firebase:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeProfileId, currentPlan, selectedUnit, currentSemester]);

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
  }, [activeProfileId, isAuthenticated]);

  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    try {
      await FirebaseService.savePlan(planToSave);
      const refreshed = await FirebaseService.getPlans(activeProfileId);
      setPlans(refreshed);
      setView('dashboard');
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      throw error;
    }
  };

  const handleUpdateSchedule = async (unitId: string, newSchedule: ScheduleEntry[]) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => u.id === unitId ? { ...u, schedule: newSchedule } : u);
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId, updatedAt: new Date().toISOString() };
    setCurrentPlan(updatedPlan);
    await FirebaseService.savePlan(updatedPlan);
  };

  const handleUpdateCalendar = async (unitId: string, newCalendar: UnitCalendar) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => u.id === unitId ? { ...u, calendar: newCalendar } : u);
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId, updatedAt: new Date().toISOString() };
    setCurrentPlan(updatedPlan);
    await FirebaseService.savePlan(updatedPlan);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('dashboard');
  };

  const handleProfileChange = (profileId: string) => {
    setActiveProfileId(profileId);
    setCurrentPlan(null);
    setSelectedUnit(null);
    setView('dashboard');
  };

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      onLogout={handleLogout}
      activeProfileId={activeProfileId}
      onProfileChange={handleProfileChange}
      currentSemester={currentSemester}
      onSemesterChange={setCurrentSemester}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sincronizando dados...</p>
        </div>
      ) : (
        <>
          {view === 'dashboard' && (
            <Dashboard 
              plans={plans} 
              onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} 
              onView={(p) => { 
                setCurrentPlan(p); 
                const firstFiltered = p.units.find(u => ((u as any).semester || 1) === currentSemester);
                setSelectedUnit(firstFiltered || p.units[0]); 
                setView('plano-curso'); 
              }} 
              onRefresh={() => loadPlans(activeProfileId)} 
              currentSemester={currentSemester}
            />
          )}
          
          {view === 'plano-curso' && currentPlan && (
            <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-20">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#E30613]"></div>
                <div className="mb-12 flex justify-between items-start">
                  <div>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">MSEP - Modelo SENAI</span>
                    <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]">{currentPlan.courseName}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Carga Total</p><p className="text-2xl font-black text-slate-800 italic">{currentPlan.totalHours} HORAS</p></div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Modalidade</p><p className="text-2xl font-black text-slate-800 italic uppercase">{currentPlan.modality}</p></div>
                </div>
                <section><h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">I. Perfil de Conclusão</h3><p className="text-slate-600 text-sm leading-relaxed font-medium">{currentPlan.objective}</p></section>
              </div>
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8">III. Unidades Curriculares ({currentSemester}º Semestre)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredUnits.map((unit, idx) => (
                    <button key={unit.id} onClick={() => { setSelectedUnit(unit); setView('plano-ensino'); }} className="bg-slate-50 border border-slate-200 p-8 rounded-3xl text-left hover:bg-blue-600 hover:text-white transition-all group relative overflow-hidden">
                      <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2">0{idx + 1}</span>
                      <p className="text-[9px] font-black text-blue-500 group-hover:text-blue-200 mb-2">{getUnitSigla(unit)}</p>
                      <h4 className="font-black text-lg leading-tight uppercase line-clamp-2 text-slate-800 group-hover:text-white">{unit.name}</h4>
                    </button>
                  ))}
                  {filteredUnits.length === 0 && (
                    <p className="text-slate-500 text-xs italic p-4 col-span-full text-center">Nenhuma unidade cadastrada para este semestre ainda.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'plano-ensino' && currentPlan && selectedUnit && (
            <div className="space-y-8 max-w-7xl mx-auto pb-20">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
                {filteredUnits.map(u => (
                  <button 
                    key={u.id} 
                    onClick={() => setSelectedUnit(u)} 
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${selectedUnit.id === u.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-100'}`}
                  >
                    {getUnitSigla(u)}
                  </button>
                ))}
              </div>
              <UnitViewer 
                unit={selectedUnit} 
                onUpdateSchedule={(newSched) => handleUpdateSchedule(selectedUnit.id, newSched)} 
                onUpdateCalendar={(newCal) => handleUpdateCalendar(selectedUnit.id, newCal)}
                onUpdateUnit={(updatedUnit) => {
                  if (!currentPlan) return;
                  const updatedUnits = currentPlan.units.map(u => u.id === updatedUnit.id ? updatedUnit : u);
                  const updatedPlan = { ...currentPlan, units: updatedUnits };
                  setCurrentPlan(updatedPlan);
                  FirebaseService.savePlan(updatedPlan);
                }}
              />
            </div>
          )}

          {view === 'calendario' && currentPlan && <GeneralCalendar plan={currentPlan} currentSemester={currentSemester} />}

          {view === 'editor' && <PlanForm initialPlan={currentPlan || undefined} onSave={handleSave} onCancel={() => setView('dashboard')} />}
        </>
      )}
    </Layout>
  );
};

export default App;
