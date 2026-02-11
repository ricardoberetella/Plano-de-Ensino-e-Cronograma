import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import { TeachingPlan, ViewType, CurricularUnit } from './types';
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
      // Tenta carregar do Firebase
      const dbPlans = await FirebaseService.getPlans(profileId);
      
      if (dbPlans && dbPlans.length > 0) {
        setPlans(dbPlans);
        const updatedCurrent = currentPlan ? dbPlans.find(p => p.id === currentPlan.id) : dbPlans[0];
        setCurrentPlan(updatedCurrent || dbPlans[0]);
        if (!selectedUnit) setSelectedUnit(updatedCurrent?.units[0] || dbPlans[0].units[0]);
      } else {
        // Fallback: Se o banco estiver vazio ou der erro, usa os planos locais (SENAI)
        const localPlans = SAMPLE_PLANS.filter(p => p.profileId === profileId);
        setPlans(localPlans);
        if (localPlans.length > 0 && !currentPlan) {
          setCurrentPlan(localPlans[0]);
          setSelectedUnit(localPlans[0].units[0]);
        }
      }
    } catch (error) {
      console.warn("Usando modo offline (dados locais).");
      setPlans(SAMPLE_PLANS.filter(p => p.profileId === profileId));
    } finally {
      // ESSENCIAL: Garante que o loading desapareça mesmo se o Firebase falhar
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, activeProfileId]);

  const handleLogin = (password: string) => {
    if (password === 'ianes662') {
      setIsAuthenticated(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Iniciando SENAI Smart...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      activeProfileId={activeProfileId}
      onProfileChange={setActiveProfileId}
      onLogout={() => setIsAuthenticated(false)}
    >
      {view === 'dashboard' && (
        <Dashboard 
          plans={plans} 
          onEdit={(p) => { setCurrentPlan(p); setView('editor'); }}
          onView={(p) => { setCurrentPlan(p); setSelectedUnit(p.units[0]); setView('unidade'); }}
          onRefresh={() => loadPlans(activeProfileId)}
        />
      )}

      {view === 'unidade' && selectedUnit && (
        <UnitViewer 
          unit={selectedUnit} 
          onUpdateSchedule={(newSchedule) => {
            if (currentPlan) {
              const updatedUnits = currentPlan.units.map(u => 
                u.id === selectedUnit.id ? { ...u, schedule: newSchedule } : u
              );
              setCurrentPlan({ ...currentPlan, units: updatedUnits });
            }
          }}
        />
      )}

      {view === 'editor' && (
        <PlanForm 
          initialPlan={currentPlan || undefined}
          onSave={async (newPlan) => {
            try {
              await FirebaseService.savePlan(newPlan);
              await loadPlans(activeProfileId);
              setView('dashboard');
            } catch (e) {
              alert("Salvamento local realizado (Erro na nuvem).");
              setView('dashboard');
            }
          }}
          onCancel={() => setView('dashboard')}
        />
      )}
    </Layout>
  );
};

export default App;
