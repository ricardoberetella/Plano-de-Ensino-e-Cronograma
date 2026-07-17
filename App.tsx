import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from './types';
import { SCHEDULE_VERSION } from './constants';
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

  const currentPlanRef = useRef<TeachingPlan | null>(null);
  const selectedUnitRef = useRef<CurricularUnit | null>(null);

  useEffect(() => { currentPlanRef.current = currentPlan; }, [currentPlan]);
  useEffect(() => { selectedUnitRef.current = selectedUnit; }, [selectedUnit]);

  const getOfficialTemplate = useCallback((profileId: string): TeachingPlan => {
    return {
      id: `plan-usinagem-${profileId}`,
      profileId,
      courseName: 'Mecânico de Usinagem Convencional',
      totalHours: 800,
      modality: 'Aprendizagem Industrial',
      objective: 'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.',
      version: SCHEDULE_VERSION,
      updatedAt: new Date().toISOString(),
      units: [
        { id: "lidt", name: "Leitura e Interpretação de Desenho Técnico", hours: 60, schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } },
        { id: "crd", name: "Controle Dimensional", hours: 60, schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } },
        { id: "fusi", name: "Fundamentos da Usinagem", hours: 100, schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } },
        { 
          id: "prusc", name: "Processos de Usinagem Convencional", hours: 160, 
          capabilities: ["Realizar operações em torno convencional...", "Realizar operações em fresadora convencional..."], 
          knowledges: ["Torneamento...", "Fresagem..."], schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } 
        },
        { 
          id: "mein", name: "Metrologia Industrial", hours: 80, 
          capabilities: ["Medir peças por meio de instrumentos da ordem direta...", "Medir peças por meio de instrumentos da ordem indireta..."], 
          knowledges: ["Medição direta...", "Medição indireta..."], schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } 
        }
      ]
    };
  }, []);

  const getUnitSigla = (unit: CurricularUnit) => {
    if (!unit || !unit.name) return '';
    const name = unit.name.toUpperCase();
    if (name.includes('PROCESSOS') || unit.id === 'prusc') return 'PRUSC';
    if (name.includes('LEITURA') || unit.id === 'lidt') return 'LIDT';
    if (name.includes('CONTROLE') || unit.id === 'crd') return 'CRD';
    if (name.includes('FUNDAMENTOS') || unit.id === 'fusi') return 'FUSI';
    if (name.includes('METROLOGIA') || unit.id === 'mein') return 'MEIN';
    return unit.id?.toUpperCase() || '';
  };

  const getUnitSemester = (unit: CurricularUnit): number => {
    const sigla = getUnitSigla(unit);
    return (sigla === 'PRUSC' || sigla === 'MEIN') ? 2 : 1;
  };

  const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      const template = getOfficialTemplate(profileId);
      
      if (!dbPlans || dbPlans.length === 0) {
        await FirebaseService.savePlan(template);
        const refreshed = await FirebaseService.getPlans(profileId);
        setPlans(refreshed || []);
      } else {
        setPlans(dbPlans);
      }
    } finally {
      setIsLoading(false);
    }
  }, [getOfficialTemplate]);

  useEffect(() => { if (isAuthenticated) loadPlans(activeProfileId); }, [activeProfileId, isAuthenticated, loadPlans]);

  return (
    <Layout activeView={view} onViewChange={setView} onLogout={() => setIsAuthenticated(false)} activeProfileId={activeProfileId} onProfileChange={setActiveProfileId} activeSemester={activeSemester} onSemesterChange={setActiveSemester}>
      {isLoading ? <div>Carregando...</div> : (
        <>
          {view === 'plano-ensino' && currentPlan && selectedUnit && (
            <UnitViewer 
              unit={{
                ...selectedUnit,
                capabilities: selectedUnit.capabilities || [],
                knowledges: selectedUnit.knowledges || [],
                schedule: selectedUnit.schedule || [],
                calendar: selectedUnit.calendar || { start: '', end: '', daysOfWeek: [], exceptions: [] }
              }}
              onUpdateSchedule={(s) => { /* lógica de update */ }}
              onUpdateCalendar={(c) => { /* lógica de update */ }}
              onUpdateUnit={(u) => { /* lógica de update */ }}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
