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

  const applyCrdSituationFromSample = (plan: TeachingPlan): TeachingPlan => {
    // Garante que a Situação-Problema da UC CRD fique igual ao modelo (usado como base no perfil do Ricardo Gea)
    const sampleCrd = SAMPLE_PLANS[0].units.find(u => u.id === 'uc-crd');
    if (!sampleCrd) return plan;

    const units = plan.units.map(u => {
      if (u.id !== 'uc-crd') return u;
      return {
        ...u,
        learningSituations: sampleCrd.learningSituations
      };
    });

    return { ...plan, units };
  };

  const normalizePlansForProfile = async (profileId: string, incomingPlans: TeachingPlan[]) => {
    // Se o perfil for o Ricardo Beretella, copiar a Situação-Problema da UC CRD do modelo
    if (profileId !== 'beretella') return incomingPlans;

    const normalized = incomingPlans.map(p => applyCrdSituationFromSample(p));

    // Persistir no Firebase se houver diferença (para corrigir definitivamente)
    for (let i = 0; i < incomingPlans.length; i++) {
      const before = incomingPlans[i];
      const after = normalized[i];
      const beforeCrd = before.units.find(u => u.id === 'uc-crd')?.learningSituations ?? [];
      const afterCrd = after.units.find(u => u.id === 'uc-crd')?.learningSituations ?? [];
      const changed = JSON.stringify(beforeCrd) !== JSON.stringify(afterCrd);

      if (changed) {
        try {
          await FirebaseService.savePlan({ ...after, profileId });
        } catch (e) {
          console.warn('Não foi possível atualizar a Situação-Problema CRD no Firebase:', e);
        }
      }
    }

    return normalized;
  };

  const loadPlans = async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      if (dbPlans && dbPlans.length > 0) {
        const normalizedPlans = await normalizePlansForProfile(profileId, dbPlans);

        setPlans(normalizedPlans);
        if (currentPlan) {
          const updatedCurrent = normalizedPlans.find(p => p.id === currentPlan.id);
          if (updatedCurrent) setCurrentPlan(updatedCurrent);
        } else {
          setCurrentPlan(normalizedPlans[0]);
          setSelectedUnit(normalizedPlans[0].units[0]);
        }
      } else {
        const defaultPlan = {
          ...SAMPLE_PLANS[0],
          id: `plan-usinagem-${profileId}`,
          profileId: profileId
        };
        await FirebaseService.savePlan(defaultPlan);
        const newPlans = [defaultPlan];
        setPlans(newPlans);
        setCurrentPlan(defaultPlan);
        setSelectedUnit(defaultPlan.units[0]);
      }
    } catch (err) {
      console.error("Erro ao carregar Firebase:", err);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleUpdateSchedule = async (newSchedule: ScheduleEntry[]) => {
    if (!currentPlan || !selectedUnit) return;
    const updatedUnits = currentPlan.units.map(u =>
      u.id === selectedUnit.id ? { ...u, schedule: newSchedule } : u
    );
    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);
    setSelectedUnit(updatedUnits.find(u => u.id === selectedUnit.id) || null);
    await handleSave(updatedPlan);
  };

  const handleUpdateCalendar = async (newCalendar: UnitCalendar) => {
    if (!currentPlan || !selectedUnit) return;
    const updatedUnits = currentPlan.units.map(u =>
      u.id === selectedUnit.id ? { ...u, calendar: newCalendar } : u
    );
    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);
    setSelectedUnit(updatedUnits.find(u => u.id === selectedUnit.id) || null);
    await handleSave(updatedPlan);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('dashboard');
    setPlans([]);
    setCurrentPlan(null);
    setSelectedUnit(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <div className="text-slate-500 text-sm">Carregando...</div>
        </div>
      );
    }

    if (!currentPlan) {
      return (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <div className="text-slate-500 text-sm">Nenhum plano encontrado.</div>
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return (
          <Dashboard
            plans={plans}
            currentPlan={currentPlan}
            onSelectPlan={(p) => {
              setCurrentPlan(p);
              setSelectedUnit(p.units[0] || null);
              setView('plano-ensino');
            }}
          />
        );

      case 'editor':
        return <PlanForm plan={currentPlan} onSave={handleSave} />;

      case 'plano-ensino':
      case 'cronograma':
      case 'situacoes':
      case 'calendario':
        return (
          <UnitViewer
            unit={selectedUnit || currentPlan.units[0]}
            onUpdateSchedule={handleUpdateSchedule}
            onUpdateCalendar={handleUpdateCalendar}
          />
        );

      default:
        return <Dashboard plans={plans} currentPlan={currentPlan} onSelectPlan={() => {}} />;
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Layout
          activeView={view}
          onViewChange={setView}
          onLogout={handleLogout}
          activeProfileId={activeProfileId}
          onProfileChange={(id) => {
            setActiveProfileId(id);
            setView('dashboard');
          }}
        >
          {renderView()}
        </Layout>
      )}
    </>
  );
};

export default App;
