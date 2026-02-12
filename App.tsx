// App.tsx — COMPLETO e CORRIGIDO
// ✅ Corrige build (props compatíveis com Dashboard/PlanForm)
// ✅ Mantém login/layout
// ✅ Permite alternar UC (LIDT/CRD) via UnitViewer (units + onSelectUnit)
// ✅ Mantém merge de UCs com SAMPLE (não some LIDT/CRD)
// ✅ Copia SOMENTE learningSituations da CRD do modelo para o perfil beretella

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
      name.includes("controle dimensional") ||
      name.includes("crd") ||
      title.includes("crd") ||
      code === "crd" ||
      code.includes("crd")
    );
  };

  const getSamplePlan = () => SAMPLE_PLANS?.[0] as TeachingPlan | undefined;

  const getSampleCrdUnit = () => {
    const sp = getSamplePlan();
    if (!sp?.units?.length) return null;
    return sp.units.find(isCrdUnit) ?? null;
  };

  // ✅ Merge das UCs: recoloca UC do modelo se estiver faltando (ex: some CRD/LIDT)
  const mergeUnitsWithSample = (plan: TeachingPlan): TeachingPlan => {
    const sp = getSamplePlan();
    if (!sp?.units?.length) return plan;

    const dbUnits = Array.isArray(plan.units) ? plan.units : [];
    const sampleUnits = sp.units;

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
      const ai = orderIndex.has(normalizeStr((a as any).id)) ? (orderIndex.get(normalizeStr((a as any).id)) as number) : 999;
      const bi = orderIndex.has(normalizeStr((b as any).id)) ? (orderIndex.get(normalizeStr((b as any).id)) as number) : 999;
      if (ai !== bi) return ai - bi;
      return normalizeStr((a as any).name).localeCompare(normalizeStr((b as any).name));
    });

    return { ...plan, units: merged };
  };

  // ✅ Copia SOMENTE learningSituations da CRD do modelo para o plano do perfil beretella
  const applyCrdSituationFromSample = (plan: TeachingPlan): TeachingPlan => {
    const sampleCrd = getSampleCrdUnit();
    if (!sampleCrd) return plan;

    const units = (plan.units || []).map((u) => {
      if (!isCrdUnit(u)) return u;
      return { ...u, learningSituations: sampleCrd.learningSituations };
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

    // Persistir se mudou
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
          console.warn("Falha ao normalizar/salvar no Firebase:", e);
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

        const nextCurrent =
          currentPlan
            ? normalizedPlans.find((p) => p.id === currentPlan.id) || normalizedPlans[0]
            : normalizedPlans[0];

        setCurrentPlan(nextCurrent);

        const nextUnit = ensureValidSelectedUnit(nextCurrent);
        setSelectedUnit(nextUnit);
      } else {
        const sp = getSamplePlan();
        const defaultPlan: TeachingPlan = {
          ...(sp as TeachingPlan),
          id: `plan-usinagem-${profileId}`,
          profileId,
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
  // Salvar plano
  // ======================================================
  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    await FirebaseService.savePlan(planToSave);
    await loadPlans(activeProfileId);
  };

  // ======================================================
  // Atualizar cronograma
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

    await handleSave(updatedPlan);
  };

  // ======================================================
  // Atualizar calendário
  // ======================================================
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

    await handleSave(updatedPlan);
  };

  // ======================================================
  // Restaurar padrão oficial
  // ======================================================
  const handleResetPlan = async (planId: string) => {
    const sp = getSamplePlan();
    if (!sp) return;

    const reset: TeachingPlan = {
      ...(sp as TeachingPlan),
      id: planId,
      profileId: activeProfileId,
      createdAt: new Date().toISOString(),
    };

    await FirebaseService.savePlan(reset);
    await loadPlans(activeProfileId);
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
  // Render view
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

    if (view === "dashboard") {
      return (
        <Dashboard
          plans={plans}
          onRefresh={() => loadPlans(activeProfileId)}
          onView={(plan) => {
            setCurrentPlan(plan);
            setSelectedUnit(plan.units?.[0] ?? ensureValidSelectedUnit(plan));
            setView("plano-ensino");
          }}
          onEdit={(plan) => {
            setCurrentPlan(plan);
            setView("editor");
          }}
          onResetPlan={(id) => handleResetPlan(id)}
        />
      );
    }

    if (view === "editor") {
      return (
        <PlanForm
          initialPlan={currentPlan}
          onSave={async (p) => {
            await handleSave(p);
            setView("dashboard");
          }}
          onCancel={() => setView("dashboard")}
        />
      );
    }

    // plano-ensino / cronograma / situacoes / calendario -> UnitViewer
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
        units={currentPlan.units || []}
        onSelectUnit={(unitId) => {
          const found = (currentPlan.units || []).find((u: any) => String(u.id) === String(unitId));
          if (found) setSelectedUnit(found);
        }}
        onUpdateSchedule={handleUpdateSchedule}
        onUpdateCalendar={handleUpdateCalendar}
      />
    );
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
