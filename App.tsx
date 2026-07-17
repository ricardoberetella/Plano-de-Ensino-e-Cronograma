import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from './types';
import { FirebaseService } from './services/firebase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSemester, setActiveSemester] = useState<number>(1);

  const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      setPlans(dbPlans || []);
    } catch (err) {
      console.error("Erro ao carregar:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadPlans(activeProfileId);
  }, [activeProfileId, isAuthenticated, loadPlans]);

  const getUnitSigla = (unit: CurricularUnit) => {
    const name = unit.name?.toUpperCase() || '';
    if (name.includes('PROCESSOS') || unit.id === 'prusc') return 'PRUSC';
    if (name.includes('METROLOGIA') || unit.id === 'mein') return 'MEIN';
    return unit.id?.toUpperCase() || '';
  };

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <Layout activeView={view} onViewChange={setView} onLogout={() => setIsAuthenticated(false)} activeProfileId={activeProfileId} onProfileChange={setActiveProfileId} activeSemester={activeSemester} onSemesterChange={setActiveSemester}>
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-slate-400 font-bold">Carregando dados...</div>
      ) : (
        <>
          {view === 'dashboard' && <Dashboard plans={plans} onView={(p) => { setCurrentPlan(p); setView('plano-curso'); }} onEdit={() => {}} onRefresh={() => loadPlans(activeProfileId)} />}
          
          {view === 'plano-curso' && currentPlan && (
            <div className="p-8">
               {currentPlan.units
                 .filter(u => (getUnitSigla(u) === 'PRUSC' || getUnitSigla(u) === 'MEIN' ? 2 : 1) === activeSemester)
                 .map(unit => (
                   <button key={unit.id} onClick={() => { setSelectedUnit(unit); setView('plano-ensino'); }} className="block p-4 mb-4 bg-slate-800 text-white rounded">
                     {unit.name}
                   </button>
                 ))}
            </div>
          )}

          {view === 'plano-ensino' && selectedUnit && (
            <UnitViewer 
              unit={{
                ...selectedUnit,
                capabilities: selectedUnit.capabilities || [],
                knowledges: selectedUnit.knowledges || [],
                schedule: selectedUnit.schedule || [],
                calendar: selectedUnit.calendar || { start: '', end: '', daysOfWeek: [], exceptions: [] }
              }}
              onUpdateSchedule={() => {}}
              onUpdateCalendar={() => {}}
              onUpdateUnit={() => {}}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
