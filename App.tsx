import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from './types';
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

  // Refs para manter os valores atualizados sem disparar o loop do useCallback
  const currentPlanRef = useRef<TeachingPlan | null>(null);
  const selectedUnitRef = useRef<CurricularUnit | null>(null);

  useEffect(() => {
    currentPlanRef.current = currentPlan;
  }, [currentPlan]);

  useEffect(() => {
    selectedUnitRef.current = selectedUnit;
  }, [selectedUnit]);

  // Busca segura de templates de planos
  const getTemplatePlan = useCallback((profileId: string): TeachingPlan => {
    if (Array.isArray(SAMPLE_PLANS)) {
      return SAMPLE_PLANS.find(p => p?.profileId === profileId) || SAMPLE_PLANS[0];
    }
    if (SAMPLE_PLANS && typeof SAMPLE_PLANS === 'object') {
      const plansArray = Object.values(SAMPLE_PLANS) as TeachingPlan[];
      if (plansArray.length > 0) {
        return plansArray.find(p => p?.profileId === profileId) || plansArray[0];
      }
    }
    return {
      id: `fallback-${profileId}`,
      profileId,
      courseName: 'Mecânico de Usinagem Convencional',
      totalHours: 800,
      modality: 'Qualificação Profissional',
      objective: '',
      units: [],
      version: SCHEDULE_VERSION,
      updatedAt: new Date().toISOString()
    };
  }, []);

  const getUnitSigla = (unit: CurricularUnit) => {
    if (!unit || !unit.name) return '';
    const name = unit.name.toUpperCase();
    const id = unit.id ? unit.id.toLowerCase() : '';
    if (name.includes('LEITURA') || name.includes('DESENHO') || id.includes('lidt')) return 'LIDT';
    if (name.includes('CONTROLE') || name.includes('DIMENSIONAL') || id.includes('crd')) return 'CRD';
    if (name.includes('FUNDAMENTOS') || name.includes('USINAGEM') || id.includes('fusi')) return 'FUSI';
    return unit.name.split(' ').map(w => w[0]).join('').toUpperCase();
  };

  const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      const template = getTemplatePlan(profileId);
      
      if (!dbPlans || dbPlans.length === 0) {
        const defaultPlan = { 
          ...template, 
          id: `plan-usinagem-${profileId}`, 
          profileId: profileId,
          version: SCHEDULE_VERSION,
          updatedAt: new Date().toISOString()
        };
        await FirebaseService.savePlan(defaultPlan);
        const refreshed = await FirebaseService.getPlans(profileId);
        setPlans(refreshed || []);
        setCurrentPlan(refreshed?.[0] || null);
        setSelectedUnit(refreshed?.[0]?.units?.[0] || null);
      } else {
        const processedPlans = await Promise.all(dbPlans.map(async (plan) => {
          let updated = false;
          if (!plan.units) plan.units = [];

          const cleanedUnits: CurricularUnit[] = [];
          const seenSiglas = new Set<string>();

          for (const unit of plan.units) {
            const sigla = getUnitSigla(unit);
            const isDuplicated = unit.id === "04" || unit.id === "05" || seenSiglas.has(sigla);
            if (isDuplicated) {
              updated = true;
            } else {
              seenSiglas.add(sigla);
              cleanedUnits.push(unit);
            }
          }
          plan.units = cleanedUnits;

          template.units?.forEach(tUnit => {
            const tSigla = getUnitSigla(tUnit);
            const hasUnit = plan.units.some(u => getUnitSigla(u) === tSigla);
            if (!hasUnit) {
              plan.units.push(tUnit);
              updated = true;
            }
          });

          const fusi = plan.units.find(u => u.id?.toLowerCase().includes('fusi') || u.name?.toUpperCase().includes('FUNDAMENTOS'));
          if (fusi && (plan as any).version !== SCHEDULE_VERSION) {
            const tFusi = template.units?.find(u => u.id?.toLowerCase().includes('fusi') || u.name?.toUpperCase().includes('FUNDAMENTOS'));
            if (tFusi) {
              const idx = plan.units.indexOf(fusi);
              plan.units[idx] = { ...tFusi };
              (plan as any).version = SCHEDULE_VERSION;
              updated = true;
            }
          }

          if (updated) {
            plan.updatedAt = new Date().toISOString();
            await FirebaseService.savePlan(plan);
          }
          return plan;
        }));

        setPlans(processedPlans);
        
        const activeCurrentPlan = currentPlanRef.current;
        const activeSelectedUnit = selectedUnitRef.current;

        if (activeCurrentPlan) {
          const updatedCurrent = processedPlans.find(p => p.id === activeCurrentPlan.id);
          if (updatedCurrent) {
            setCurrentPlan(updatedCurrent);
            if (activeSelectedUnit) {
              const updatedUnit = updatedCurrent.units?.find(u => u.id === activeSelectedUnit.id);
              if (updatedUnit) setSelectedUnit(updatedUnit);
            }
          }
        } else {
          setCurrentPlan(processedPlans[0] || null);
          setSelectedUnit(processedPlans[0]?.units?.[0] || null);
        }
      }
    } catch (err) {
      console.error("Erro fatal ao carregar Firebase:", err);
    } finally {
      setIsLoading(false);
    }
  }, [getTemplatePlan]); // Dependência estática e limpa para evitar loops

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
  }, [activeProfileId, isAuthenticated, loadPlans]);

  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    try {
      await FirebaseService.savePlan(planToSave);
      const refreshed = await FirebaseService.getPlans(activeProfileId);
      setPlans(refreshed || []);
      setView('dashboard');
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
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
      onViewChange={setView || (() => {})} 
      onLogout={handleLogout || (() => {})}
      activeProfileId={activeProfileId}
      onProfileChange={handleProfileChange || (() => {})}
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
              plans={plans || []} 
              onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} 
              onView={(p) => { setCurrentPlan(p); setSelectedUnit(p?.units?.[0] || null); setView('plano-curso'); }} 
              onRefresh={() => loadPlans(activeProfileId)} 
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
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">III. Unidades Curriculares</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentPlan.units?.map((unit, idx) => (
                    <button 
                      key={unit.id || idx} 
                      onClick={() => { if(unit) { setSelectedUnit(unit); setView('plano-ensino'); } }} 
                      className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden"
                    >
                      <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2">0{idx + 1}</span>
                      <p className="text-[9px] font-black text-blue-400 mb-2">{getUnitSigla(unit)}</p>
                      <h4 className="font-black text-lg leading-tight uppercase line-clamp-2">{unit.name}</h4>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === 'plano-ensino' && currentPlan && selectedUnit && (
            <div className="space-y-8 max-w-7xl mx-auto pb-20">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
                {currentPlan.units?.map((u, idx) => (
                  <button 
                    key={u.id || idx} 
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

          {view === 'calendario' && currentPlan && <GeneralCalendar plan={currentPlan} />}

          {view === 'editor' && <PlanForm initialPlan={currentPlan || undefined} onSave={handleSave} onCancel={() => setView('dashboard')} />}
        </>
      )}
    </Layout>
  );
};

export default App;
