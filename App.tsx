import React, { useState, useEffect, useCallback } from 'react';
import { FirebaseService } from './services/FirebaseService';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from './constants';
import { TeachingPlan, CurricularUnit } from './types';

// Função auxiliar necessária para o processamento das unidades
const getUnitSigla = (unit: CurricularUnit): string => {
  return unit.id.toUpperCase();
};

const App: React.FC = () => {
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeProfileId] = useState<string>("beretella"); // Ajuste conforme seu perfil

  const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      const template = SAMPLE_PLANS.find(p => p.profileId === profileId) || SAMPLE_PLANS[0];
      
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
        setPlans(refreshed);
        setCurrentPlan(refreshed[0]);
        setSelectedUnit(refreshed[0].units[0]);
      } else {
        const processedPlans = await Promise.all(dbPlans.map(async (plan) => {
          let updated = false;

          // 1. HIGIENIZAÇÃO: Remove duplicadas baseadas no ID (sigla)
          const seenSiglas = new Set<string>();
          const cleanedUnits: CurricularUnit[] = [];
          for (const unit of plan.units) {
            const sigla = getUnitSigla(unit);
            if (!seenSiglas.has(sigla)) {
              seenSiglas.add(sigla);
              cleanedUnits.push(unit);
            } else {
              updated = true;
            }
          }
          plan.units = cleanedUnits;

          // 2. FORÇA ATUALIZAÇÃO (Corrige Metrologia e libera 2º Semestre)
          template.units.forEach(tUnit => {
            const tSigla = getUnitSigla(tUnit);
            const existingUnitIndex = plan.units.findIndex(u => getUnitSigla(u) === tSigla);
            
            if (existingUnitIndex === -1) {
              plan.units.push(tUnit); // Adiciona as novas unidades (ex: 2º semestre)
              updated = true;
            } else {
              // Sobrescreve apenas os campos essenciais se houver divergência
              plan.units[existingUnitIndex] = { ...plan.units[existingUnitIndex], ...tUnit };
              updated = true;
            }
          });

          // 3. ATUALIZA VERSÃO
          if ((plan as any).version !== SCHEDULE_VERSION) {
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
        setCurrentPlan(processedPlans[0]);
        if (processedPlans[0].units.length > 0) {
          setSelectedUnit(processedPlans[0].units[0]);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar planos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlans(activeProfileId);
  }, [loadPlans, activeProfileId]);

  if (isLoading) return <div>Carregando sistema...</div>;

  return (
    <div className="App">
      {/* Aqui viria sua estrutura de Dashboard, Sidebar, etc. */}
      <h1>Planejamento SENAI - {currentPlan?.courseName}</h1>
      <p>Unidade selecionada: {selectedUnit?.name}</p>
      {/* Restante da sua interface */}
    </div>
  );
};

export default App;
