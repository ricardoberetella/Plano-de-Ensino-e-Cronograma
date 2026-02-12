
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from './types';
import { SAMPLE_PLANS } from './constants';
import { FirebaseService } from './services/firebase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPlans = async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      
      // Detecção de necessidade de inicialização:
      // Se não houver planos OU se as unidades de LIDT/CRD estiverem sem Situações ou Rubricas,
      // forçamos o carregamento das constantes atualizadas.
      const needsInit = !dbPlans || dbPlans.length === 0 || 
                        dbPlans.some(p => p.units.some(u => u.learningSituations.length === 0 || u.rubrics.length === 0));

      if (needsInit) {
        // Encontra o plano base nas constantes para o perfil atual
        const template = SAMPLE_PLANS.find(p => p.profileId === profileId) || SAMPLE_PLANS[0];
        const defaultPlan = { 
          ...template, 
          id: `plan-usinagem-${profileId}`, 
          profileId: profileId,
          updatedAt: new Date().toISOString()
        };
        await FirebaseService.savePlan(defaultPlan);
        const refreshedPlans = await FirebaseService.getPlans(profileId);
        setPlans(refreshedPlans);
        setCurrentPlan(refreshedPlans[0]);
        setSelectedUnit(refreshedPlans[0].units[0]);
      } else {
        setPlans(dbPlans);
        if (currentPlan) {
          const updatedCurrent = dbPlans.find(p => p.id === currentPlan.id);
          if (updatedCurrent) {
             setCurrentPlan(updatedCurrent);
             if (selectedUnit) {
               const updatedUnit = updatedCurrent.units.find(u => u.id === selectedUnit.id);
               if (updatedUnit) setSelectedUnit(updatedUnit);
             }
          }
        } else {
          setCurrentPlan(dbPlans[0]);
          setSelectedUnit(dbPlans[0].units[0]);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar Firebase:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
  }, [activeProfileId, isAuthenticated]);

  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    try {
      await FirebaseService.savePlan(planToSave);
      await loadPlans(activeProfileId);
      setView('dashboard');
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      throw error;
    }
  };

  const handleResetPlan = async (planId: string) => {
    setIsLoading(true);
    try {
      const template = SAMPLE_PLANS.find(p => p.profileId === activeProfileId) || SAMPLE_PLANS[0];
      const templatePlan = { 
        ...template, 
        id: planId, 
        profileId: activeProfileId,
        updatedAt: new Date().toISOString()
      };
      await FirebaseService.savePlan(templatePlan);
      await loadPlans(activeProfileId);
    } catch (error) {
      console.error('Erro ao restaurar padrão:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSchedule = async (unitId: string, newSchedule: ScheduleEntry[]) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => 
      u.id === unitId ? { ...u, schedule: newSchedule } : u
    );
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId };
    setCurrentPlan(updatedPlan);
    
    const newSelectedUnit = updatedUnits.find(u => u.id === unitId);
    if (newSelectedUnit) setSelectedUnit(newSelectedUnit);

    await FirebaseService.savePlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
  };

  const handleUpdateCalendar = async (unitId: string, newCalendar: UnitCalendar) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => 
      u.id === unitId ? { ...u, calendar: newCalendar } : u
    );
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId };
    setCurrentPlan(updatedPlan);

    const newSelectedUnit = updatedUnits.find(u => u.id === unitId);
    if (newSelectedUnit) setSelectedUnit(newSelectedUnit);

    await FirebaseService.savePlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
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
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Sincronizando dados...
          </p>
        </div>
      ) : (
        <>
          {view === 'dashboard' && (
            <Dashboard 
              plans={plans} 
              onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} 
              onView={(p) => { setCurrentPlan(p); setSelectedUnit(p.units[0]); setView('plano-curso'); }} 
              onRefresh={() => loadPlans(activeProfileId)}
              onResetPlan={handleResetPlan}
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
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Responsável</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase italic">Prof. {activeProfileId === 'beretella' ? 'Ricardo Beretella' : 'Ricardo Gea'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Carga Total</p>
                    <p className="text-2xl font-black text-slate-800 italic">{currentPlan.totalHours} HORAS</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Modalidade</p>
                    <p className="text-2xl font-black text-slate-800 italic uppercase">{currentPlan.modality}</p>
                  </div>
                </div>
                <section>
                  <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">I. Perfil de Conclusão</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{currentPlan.objective}</p>
                </section>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">III. Unidades Curriculares</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentPlan.units.map((unit, idx) => (
                    <button 
                      key={unit.id}
                      onClick={() => { setSelectedUnit(unit); setView('plano-ensino'); }}
                      className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden"
                    >
                      <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2 group-hover:opacity-20 transition-opacity">0{idx + 1}</span>
                      <p className="text-[9px] font-black text-blue-400 group-hover:text-blue-100 uppercase tracking-widest mb-2">{unit.id.split('-')[1]}</p>
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
                {currentPlan.units.map(u => (
                  <button 
                    key={u.id}
                    onClick={() => setSelectedUnit(u)}
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedUnit.id === u.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-200'}`}
                  >
                    {u.id.split('-')[1]}
                  </button>
                ))}
              </div>
              <UnitViewer 
                unit={selectedUnit} 
                onUpdateSchedule={(newSched) => handleUpdateSchedule(selectedUnit.id, newSched)} 
                onUpdateCalendar={(newCal) => handleUpdateCalendar(selectedUnit.id, newCal)}
              />
            </div>
          )}

          {view === 'calendario' && (
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 md:p-20 animate-fadeIn max-w-5xl mx-auto text-center relative overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-[#E30613] rounded-b-full"></div>
               <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase mb-6 italic leading-none">MSEP<br/>CALENDÁRIO</h2>
               <p className="text-slate-400 font-black uppercase text-[11px] tracking-[0.4em] mb-4">Planejamento Semestral Integrado</p>
               <p className="text-blue-600 font-black uppercase text-[14px] mb-16 italic tracking-widest">Prof. {activeProfileId === 'beretella' ? 'Ricardo Beretella' : 'Ricardo Gea'}</p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:border-blue-200 transition-colors">
                    <p className="text-4xl font-black text-blue-600 italic">26/01</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Início Letivo</p>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:border-red-200 transition-colors">
                    <p className="text-4xl font-black text-red-600 italic">16/02</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Pausa Pedagógica</p>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:border-slate-800 transition-colors">
                    <p className="text-4xl font-black text-slate-800 italic">23/06</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Encerramento</p>
                  </div>
               </div>
            </div>
          )}

          {view === 'editor' && (
            <PlanForm 
              initialPlan={currentPlan || undefined}
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
