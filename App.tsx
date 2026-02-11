// App.tsx — COMPLETO e CORRIGIDO
// ✅ Corrige o “sumiu a UC CRD” (ID diferente no Firebase) e mantém a CRD sempre selecionável
// ✅ Copia a Situação-Problema da CRD do modelo (SAMPLE_PLANS) para o perfil beretella
// ✅ Não mexe em layout — só lógica de dados/seleção

import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import PlanForm from "./components/PlanForm";
import UnitViewer from "./components/UnitViewer";
import Login from "./components/Login";

import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from "./types";
import { SAMPLE_PLANS } from "./constants";
import { FirebaseService } from "./services/firebase";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState("beretella");
  const [view, setView] = useState<ViewType>("dashboard");

  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // Helpers (robusto para CRD com IDs diferentes)
  // ==========================================
  const normalizeStr = (v: any) => String(v ?? "").trim().toLowerCase();

  const isCrdUnit = (u: CurricularUnit) => {
    const id = normalizeStr((u as any).id);
    const name = normalizeStr((u as any).name);
    const title = normalizeStr((u as any).title);
    const code = normalizeStr((u as any).code);

    // cobre: "CRD", "uc-crd", "uc_crd", "crd-xxx", etc.
    return (
      id === "crd" ||
      id.includes("crd") ||
      name.includes("crd") ||
      title.includes("crd") ||
      code === "crd" ||
      code.includes("crd")
    );
  };

  const getSampleCrdUnit = () => {
    const samplePlan = SAMPLE_PLANS?.[0];
    if (!samplePlan?.units?.length) return null;
    return samplePlan.units.find(isCrdUnit) ?? null;
  };

  const applyCrdSituationFromSample = (plan: TeachingPlan): TeachingPlan => {
    // Copia Situação-Problema/learningSituations do modelo para a UC CRD do plano do usuário
    const sampleCrd = getSampleCrdUnit();
    if (!sampleCrd) return plan;

    const units = (plan.units || []).map((u) => {
      if (!isCrdUnit(u)) return u;
      return {
        ...u,
        learningSituations: sampleCrd.learningSituations,
      };
    });

    return { ...plan, units };
  };

  const ensureValidSelectedUnit = (plan: TeachingPlan, preferredUnitId?: string | null) => {
    const units = plan.units || [];
    if (!units.length) return null;

    if (preferredUnitId) {
      const found = units.find((u: any) => String(u.id) === String(preferredUnitId));
      if (found) return found;
    }

    // Se já existir selectedUnit e ela ainda existe no plano
    if (selectedUnit?.id) {
      const found = units.find((u: any) => String(u.id) === String(selectedUnit.id));
      if (found) return found;
    }

    // Prioriza CRD, se existir
    const crd = units.find(isCrdUnit);
    if (crd) return crd;

    // Senão, primeira unidade
    return units[0];
  };

  // ==========================================
  // Normalização + persistência (apenas beretella)
  // ==========================================
  const normalizePlansForProfile = async (profileId: string, incomingPlans: TeachingPlan[]) => {
    if (profileId !== "beretella") return incomingPlans;

    const normalized = incomingPlans.map((p) => applyCrdSituationFromSample(p));

    // Se houve mudança na CRD, persiste no Firebase (pra ficar definitivo)
    for (let i = 0; i < incomingPlans.length; i++) {
      const before = incomingPlans[i];
      const after = normalized[i];

      const beforeCrd = before.units?.find(isCrdUnit)?.learningSituations ?? [];
      const afterCrd = after.units?.find(isCrdUnit)?.learningSituations ?? [];

      const changed = JSON.stringify(beforeCrd) !== JSON.stringify(afterCrd);
      if (changed) {
        try {
          await FirebaseService.savePlan({ ...after, profileId });
        } catch (e) {
          console.warn("Falha ao atualizar Situação-Problema CRD no Firebase:", e);
        }
      }
    }

    return normalized;
  };

  // ==========================================
  // Carregar planos
  // ==========================================
  const loadPlans = async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);

      if (dbPlans && dbPlans.length > 0) {
        const normalizedPlans = await normalizePlansForProfile(profileId, dbPlans);

        setPlans(normalizedPlans);

        // Define currentPlan com preferência para manter o mesmo ID se já existia
        let nextCurrent = currentPlan
          ? normalizedPlans.find((p) => p.id === currentPlan.id) || normalizedPlans[0]
          : normalizedPlans[0];

        // GARANTE que nextCurrent tenha units
        if (!nextCurrent.units || !nextCurrent.units.length) {
          nextCurrent = { ...nextCurrent, units: SAMPLE_PLANS?.[0]?.units ?? [] };
        }

        setCurrentPlan(nextCurrent);

        const nextUnit = ensureValidSelectedUnit(nextCurrent);
        setSelectedUnit(nextUnit);

        // Se estiver em tela de UC, garante que UnitViewer receba uma unit válida
        // (sem alterar layout)
      } else {
        // cria plano padrão baseado no sample
        const defaultPlan: TeachingPlan = {
          ...(SAMPLE_PLANS?.[0] as TeachingPlan),
          id: `plan-usinagem-${profileId}`,
          profileId: profileId,
        };

        // Se for beretella, já cria com CRD ajustada igual ao modelo (já é o modelo)
        await FirebaseService.savePlan(defaultPlan);

        const newPlans = [defaultPlan];
        setPlans(newPlans);
        setCurrentPlan(defaultPlan);
        setSelectedUnit(ensureValidSelectedUnit(defaultPlan));
      }
    } catch (err) {
      console.error("Erro ao carregar planos:", err);
      setPlans([]);
      setCurrentPlan(null);
      setSelectedUnit(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadPlans(activeProfileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfileId, isAuthenticated]);

  // ==========================================
  // Salvar
  // ==========================================
  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };

    try {
      await FirebaseService.savePlan(planToSave);
      await loadPlans(activeProfileId);
      setView("dashboard");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      throw error;
    }
  };

  // ==========================================
  // Atualizar cronograma
  // ==========================================
  const handleUpdateSchedule = async (newSchedule: ScheduleEntry[]) => {
    if (!currentPlan || !selectedUnit) return;

    const updatedUnits = (currentPlan.units || []).map((u) =>
      String((u as any).id) === String((selectedUnit as any).id) ? { ...u, schedule: newSchedule } : u
    );

    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);

    const nextUnit = updatedUnits.find((u: any) => String(u.id) === String(selectedUnit.id)) || ensureValidSelectedUnit(updatedPlan);
    setSelectedUnit(nextUnit);

    await handleSave(updatedPlan);
  };

  // ==========================================
  // Atualizar calendário
  // ==========================================
  const handleUpdateCalendar = async (newCalendar: UnitCalendar) => {
    if (!currentPlan || !selectedUnit) return;

    const updatedUnits = (currentPlan.units || []).map((u) =>
      String((u as any).id) === String((selectedUnit as any).id) ? { ...u, calendar: newCalendar } : u
    );

    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);

    const nextUnit = updatedUnits.find((u: any) => String(u.id) === String(selectedUnit.id)) || ensureValidSelectedUnit(updatedPlan);
    setSelectedUnit(nextUnit);

    await handleSave(updatedPlan);
  };

  // ==========================================
  // Login/Logout
  // ==========================================
  const handleLogout = () => {
    setIsAuthenticated(false);
    setView("dashboard");
    setPlans([]);
    setCurrentPlan(null);
    setSelectedUnit(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // ==========================================
  // Render
  // ==========================================
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
      case "dashboard":
        return (
          <Dashboard
            plans={plans}
            currentPlan={currentPlan}
            onSelectPlan={(p) => {
              setCurrentPlan(p);

              // Sempre define uma unit válida (prioriza CRD se existir)
              const nextUnit = ensureValidSelectedUnit(p);
              setSelectedUnit(nextUnit);

              setView("plano-ensino");
            }}
          />
        );

      case "editor":
        return <PlanForm plan={currentPlan} onSave={handleSave} />;

      case "plano-ensino":
      case "cronograma":
      case "situacoes":
      case "calendario": {
        const unitToShow = selectedUnit || ensureValidSelectedUnit(currentPlan);
        if (!unitToShow) {
          return (
            <div className="w-full h-[70vh] flex items-center justify-center">
              <div className="text-slate-500 text-sm">Nenhuma unidade curricular disponível.</div>
            </div>
          );
        }

        return (
          <UnitViewer
            unit={unitToShow}
            onUpdateSchedule={handleUpdateSchedule}
            onUpdateCalendar={handleUpdateCalendar}
          />
        );
      }

      default:
        return (
          <Dashboard
            plans={plans}
            currentPlan={currentPlan}
            onSelectPlan={() => {}}
          />
        );
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
            setView("dashboard");
          }}
        >
          {renderView()}
        </Layout>
      )}
    </>
  );
};

export default App;
