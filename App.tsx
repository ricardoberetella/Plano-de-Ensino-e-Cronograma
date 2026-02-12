// App.tsx — COMPLETO e CORRIGIDO
// ✅ Compatível com seu Dashboard.tsx (onEdit/onView/onRefresh/onResetPlan)
// ✅ Garante que CRD e LIDT nunca somem (merge com SAMPLE_PLANS)
// ✅ Para o perfil "beretella": copia SOMENTE learningSituations da CRD do modelo
// ✅ Não mexe em layout (só lógica)

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

  // ======================================================
  // Helpers
  // ======================================================
  const normalizeStr = (v: any) => String(v ?? "").trim().toLowerCase();

  const isCrdUnit = (u: CurricularUnit) => {
    const id = normalizeStr((u as any).id);
    const name = normalizeStr((u as any).name);
    const title = normalizeStr((u as any).title);
    const code = normalizeStr((u as any).code);

    return (
      id === "crd" ||
      id.includes("crd") ||
      id === "uc-crd" ||
      id.includes("uc-crd") ||
      name.includes("controle dimensional") ||
      name.includes("crd") ||
      title.includes("crd") ||
      code === "crd" ||
      code.includes("crd")
    );
  };

  const getSamplePlan = () => (SAMPLE_PLANS?.[0] as TeachingPlan | undefined);

  const getSampleCrdUnit = () => {
    const sp = getSamplePlan();
    if (!sp?.units?.length) return null;
    return sp.units.find(isCrdUnit) ?? null;
  };

  // ✅ Merge: se faltar alguma UC no Firebase (ex: sumiu CRD ou LIDT), recoloca do modelo
  const mergeUnitsWithSample = (plan: TeachingPlan): TeachingPlan => {
    const sp = getSamplePlan();
    if (!sp?.units?.length) return plan;

    const dbUnits = Array.isArray(plan.units) ? plan.units : [];
    const sampleUnits = Array.isArray(sp.units) ? sp.units : [];

    const existingById = new Map<string, CurricularUnit>();
    dbUnits.forEach((u) => existingById.set(normalizeStr((u as any).id), u));

    const merged: CurricularUnit[] = [...dbUnits];
    for (const su of sampleUnits) {
      const sid = normalizeStr((su as any).id);
      if (!existingById.has(sid)) merged.push(su);
    }

    // mantém ordem do modelo
    const orderIndex = new Map<string, number>();
    sampleUnits.forEach((u, idx) => orderIndex.set(normalizeStr((u as any).id), idx));

    merged.sort((a, b) => {
      const ai = orderIndex.has(normalizeStr((a as any).id))
        ? (orderIndex.get(normalizeStr((a as any).id)) as number)
        : 999;
      const bi = orderIndex.has(normalizeStr((b as any).id))
        ? (orderIndex.get(normalizeStr((b as any).id)) as number)
        : 999;
      if (ai !== bi) return ai - bi;
      return normalizeStr((a as any).name).localeCompare(normalizeStr((b as any).name));
    });

    return { ...plan, units: merged };
  };

  // ✅ Copia SOMENTE a Situação-Problema (learningSituations) da CRD do modelo
  const applyCrdSituationFromSample = (plan: TeachingPlan): TeachingPlan => {
    const sampleCrd = getSampleCrdUnit();
    if (!sampleCrd) return plan;

    const units = (Array.isArray(plan.units) ? plan.units : []).map((u) => {
      if (!isCrdUnit(u)) return u;
      return { ...u, learningSituations: sampleCrd.learningSituations };
    });

    return { ...plan, units };
  };

  const ensureValidSelectedUnit = (plan: TeachingPlan, preferredUnitId?: string | null) => {
    const units = Array.isArray(plan.units) ? plan.units : [];
    if (!units.length) return null;

    if (preferredUnitId) {
      const found = units.find((u: any) => String(u.id) === String(preferredUnitId));
      if (found) return found;
    }

    if (selectedUnit?.id) {
      const found = units.find((u: any) => String(u.id) === String(selectedUnit.id));
      if (found) return found;
    }

    return units[0];
  };

  // ======================================================
  // Normalização ao carregar
  // ======================================================
  const normalizePlansForProfile = async (profileId: string, incomingPlans: TeachingPlan[]) => {
    const mergedPlans = incomingPlans.map((p) => mergeUnitsWithSample(p));

    const normalized =
      profileId === "beretella"
        ? mergedPlans.map((p) => applyCrdSituationFromSample(p))
        : mergedPlans;

    // persistir se mudou
    for (let i = 0; i < incomingPlans.length; i++) {
      const before = incomingPlans[i];
      const after = normalized[i];

      const beforeUnits = Array.isArray(before.units) ? before.units : [];
      const afterUnits = Array.isArray(after.units) ? after.units : [];

      const beforeIds = beforeUnits.map((u: any) => normalizeStr(u.id)).sort();
      const afterIds = afterUnits.map((u: any) => normalizeStr(u.id)).sort();

      const unitsChanged = JSON.stringify(beforeIds) !== JSON.stringify(afterIds);

      const beforeCrd = beforeUnits.find(isCrdUnit)?.learningSituations ?? [];
      const afterCrd = afterUnits.find(isCrdUnit)?.learningSituations ?? [];
      const crdChanged = JSON.stringify(beforeCrd) !== JSON.stringify(afterCrd);

      if (unitsChanged || crdChanged) {
        try {
          await FirebaseService.savePlan({ ...after, profileId });
        } catch (e) {
          console.warn("Falha ao normalizar/salvar plano no Firebase:", e);
        }
      }
    }

    return normalized;
  };

  // ======================================================
  // Carregar planos
  // ======================================================
  const loadPlans = async (profileId: string) => {
    setIsLoading(true);

    try {
      const dbPlans = await FirebaseService.getPlans(profileId);

      if (dbPlans && dbPlans.length > 0) {
        const normalizedPlans = await normalizePlansForProfile(profileId, dbPlans);

        setPlans(normalizedPlans);

        const nextCurrent = currentPlan
          ? normalizedPlans.find((p) => p.id === currentPlan.id) || normalizedPlans[0]
          : normalizedPlans[0];

        setCurrentPlan(nextCurrent);
        setSelectedUnit(ensureValidSelectedUnit(nextCurrent));
      } else {
        // cria plano padrão baseado no SAMPLE
        const sp = getSamplePlan();
        if (!sp) throw new Error("SAMPLE_PLANS[0] não encontrado.");

        const defaultPlan: TeachingPlan = {
          ...sp,
          id: `plan-usinagem-${profileId}`,
          profileId: profileId,
          createdAt: new Date().toISOString(),
        };

        await FirebaseService.savePlan(defaultPlan);

        setPlans([defaultPlan]);
        setCurrentPlan(defaultPlan);
        setSelectedUnit(defaultPlan.units?.[0] ?? null);
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

  // ======================================================
  // Salvar plano (PlanForm)
  // ======================================================
  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };

    await FirebaseService.savePlan(planToSave);
    await loadPlans(activeProfileId);
    setView("dashboard");
  };

  // ======================================================
  // Atualizar cronograma / calendário
  // ======================================================
  const handleUpdateSchedule = async (newSchedule: ScheduleEntry[]) => {
    if (!currentPlan || !selectedUnit) return;

    const updatedUnits = (currentPlan.units || []).map((u) =>
      String((u as any).id) === String((selectedUnit as any).id)
        ? { ...u, schedule: newSchedule }
        : u
    );

    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);

    const nextUnit =
      updatedUnits.find((u: any) => String(u.id) === String(selectedUnit.id)) ||
      ensureValidSelectedUnit(updatedPlan);

    setSelectedUnit(nextUnit);

    await FirebaseService.savePlan({ ...updatedPlan, profileId: activeProfileId });
    await loadPlans(activeProfileId);
  };

  const handleUpdateCalendar = async (newCalendar: UnitCalendar) => {
    if (!currentPlan || !selectedUnit) return;

    const updatedUnits = (currentPlan.units || []).map((u) =>
      String((u as any).id) === String((selectedUnit as any).id)
        ? { ...u, calendar: newCalendar }
        : u
    );

    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);

    const nextUnit =
      updatedUnits.find((u: any) => String(u.id) === String(selectedUnit.id)) ||
      ensureValidSelectedUnit(updatedPlan);

    setSelectedUnit(nextUnit);

    await FirebaseService.savePlan({ ...updatedPlan, profileId: activeProfileId });
    await loadPlans(activeProfileId);
  };

  // ======================================================
  // Reset plano padrão oficial (do SAMPLE)
  // ======================================================
  const handleResetPlan = async (planId: string) => {
    const sp = getSamplePlan();
    if (!sp) return;

    const target = plans.find((p) => p.id === planId);
    if (!target) return;

    const resetPlan: TeachingPlan = {
      ...sp,
      id: target.id,
      profileId: activeProfileId,
      createdAt: target.createdAt || new Date().toISOString(),
    };

    await FirebaseService.savePlan(resetPlan);
    await loadPlans(activeProfileId);
    setView("dashboard");
  };

  // ======================================================
  // Login/Logout
  // ======================================================
  const handleLogout = () => {
    setIsAuthenticated(false);
    setView("dashboard");
    setPlans([]);
    setCurrentPlan(null);
    setSelectedUnit(null);
  };

  const handleLogin = () => setIsAuthenticated(true);

  // ======================================================
  // Render
  // ======================================================
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
            onEdit={(plan) => {
              setCurrentPlan(plan);
              setSelectedUnit(ensureValidSelectedUnit(plan));
              setView("editor");
            }}
            onView={(plan) => {
              setCurrentPlan(plan);
              setSelectedUnit(ensureValidSelectedUnit(plan));
              setView("plano-ensino");
            }}
            onRefresh={() => loadPlans(activeProfileId)}
            onResetPlan={(id) => handleResetPlan(id)}
          />
        );

      case "editor":
        return (
          <PlanForm
            initialPlan={currentPlan}
            onSave={handleSave}
            onCancel={() => setView("dashboard")}
          />
        );

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
            onEdit={() => {}}
            onView={() => {}}
            onRefresh={() => loadPlans(activeProfileId)}
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
