import React, { useMemo, useState } from 'react';
import { TeachingPlan, CurricularUnit } from '../types';
import { GoogleGenAI } from "@google/genai";

interface PlanFormProps {
  initialPlan?: TeachingPlan;
  onSave: (plan: TeachingPlan) => Promise<void> | void;
  onCancel: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ initialPlan, onSave, onCancel }) => {
  // ✅ Base “segura” do plano inicial, para nunca perder as UCs completas
  const baseInitialPlan = useMemo<TeachingPlan>(() => {
    const now = new Date().toISOString();

    // Se veio um plano, garante units como array e mantém tudo completo
    if (initialPlan) {
      return {
        ...initialPlan,
        createdAt: initialPlan.createdAt || now,
        updatedAt: initialPlan.updatedAt || initialPlan.createdAt || now,
        units: Array.isArray(initialPlan.units) ? initialPlan.units : [],
        totalHours: Number(initialPlan.totalHours || 0)
      };
    }

    // Novo plano (fallback)
    return {
      id: "",
      profileId: "",
      courseName: "",
      modality: "Presencial",
      totalHours: 0,
      objective: "",
      methodology: "",
      evaluation: "",
      bibliography: "",
      createdAt: now,
      updatedAt: now,
      units: []
    } as TeachingPlan;
  }, [initialPlan]);

  // ✅ formData mantém apenas os campos editáveis; units será derivado com segurança
  const [formData, setFormData] = useState<Partial<TeachingPlan>>({
    id: baseInitialPlan.id,
    profileId: baseInitialPlan.profileId,
    courseName: baseInitialPlan.courseName || '',
    modality: (baseInitialPlan.modality as any) || 'Presencial',
    totalHours: Number(baseInitialPlan.totalHours || 0),
    objective: baseInitialPlan.objective || '',
    methodology: baseInitialPlan.methodology || '',
    evaluation: baseInitialPlan.evaluation || '',
    bibliography: baseInitialPlan.bibliography || '',
    createdAt: baseInitialPlan.createdAt,
    updatedAt: baseInitialPlan.updatedAt,
    // aqui guardamos a lista de UCs “editável” (nome/id), mas sem perder o resto:
    units: baseInitialPlan.units?.map(u => ({ id: u.id, name: u.name })) as any
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ======================================================
  // Helpers
  // ======================================================
  const safeIsoNow = () => new Date().toISOString();

  const handleConfigKey = async () => {
    if ((window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
    } else {
      alert("Ambiente AI Studio não detectado.");
    }
  };

  const handleAIHelp = async () => {
    if (isGenerating) return;
    if (!formData.courseName) {
      alert("Preencha o nome do curso primeiro.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      if ((window as any).aistudio && !(await (window as any).aistudio.hasSelectedApiKey())) {
        await (window as any).aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: (process as any).env?.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Escreva um objetivo geral de plano de ensino SENAI (perfil de conclusão) para o curso de: ${formData.courseName}. Seja técnico e profissional.`
      });

      const generatedText = (response as any)?.text;
      if (generatedText) {
        setFormData(prev => ({ ...prev, objective: String(generatedText).trim() }));
      }
    } catch (err: any) {
      console.error("Erro detalhado da IA:", err);
      if (err?.message?.includes("Requested entity was not found")) {
        setErrorMsg("Projeto ou chave não encontrada.");
        if ((window as any).aistudio) await (window as any).aistudio.openSelectKey();
      } else {
        setErrorMsg("Erro na conexão com a IA.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // ✅ Monta units final SEM PERDER dados completos
  const buildFinalUnits = (): CurricularUnit[] => {
    const editedUnits = Array.isArray((formData as any).units) ? ((formData as any).units as any[]) : [];
    const baseUnits = Array.isArray(baseInitialPlan.units) ? baseInitialPlan.units : [];

    // Novo plano: se não tinha base, cria UCs completas para as que foram adicionadas
    if (!initialPlan) {
      return editedUnits.map((u) => ({
        id: u.id,
        name: u.name || "",
        basicCapacities: [],
        socioemocionalCapacities: [],
        knowledge: [],
        learningSituations: [],
        rubrics: [],
        schedule: [],
        calendar: (u as any).calendar || { startDate: "", endDate: "", markings: [] }
      })) as CurricularUnit[];
    }

    // Edição: mantém o objeto completo da UC e só atualiza o nome
    const baseById = new Map<string, CurricularUnit>();
    baseUnits.forEach((u) => baseById.set(String((u as any).id), u));

    const finalUnits: CurricularUnit[] = [];
    for (const u of editedUnits) {
      const id = String(u.id);
      const base = baseById.get(id);

      if (base) {
        finalUnits.push({ ...base, name: u.name ?? base.name });
      } else {
        // caso raro: UC nova durante edição
        finalUnits.push({
          id,
          name: u.name || "",
          basicCapacities: [],
          socioemocionalCapacities: [],
          knowledge: [],
          learningSituations: [],
          rubrics: [],
          schedule: [],
          calendar: { startDate: "", endDate: "", markings: [] }
        } as CurricularUnit);
      }
    }

    return finalUnits;
  };

  const handleFinalSave = async () => {
    if (!formData.courseName) {
      alert("Defina o nome do curso.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const finalUnits = buildFinalUnits();

      // ✅ Não deixa salvar sem UC (evita sumir tudo)
      if (!finalUnits.length) {
        alert("Adicione ao menos 1 Unidade Curricular antes de salvar.");
        setIsSubmitting(false);
        return;
      }

      const planToSave: TeachingPlan = {
        ...(baseInitialPlan as TeachingPlan),
        ...(formData as TeachingPlan),

        id: (formData.id as any) || baseInitialPlan.id || `plan-${Date.now()}`,
        createdAt: (formData.createdAt as any) || baseInitialPlan.createdAt || safeIsoNow(),
        updatedAt: safeIsoNow(),
        totalHours: Number((formData.totalHours as any) || 0),
        units: finalUnits
      };

      await onSave(planToSave);
      // ✅ deixa o pai controlar view; aqui só finaliza loading
      setIsSubmitting(false);
    } catch (err: any) {
      console.error("Erro ao salvar plano:", err);
      setErrorMsg("Falha ao salvar no banco de dados. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const addUnit = () => {
    const newUnit = {
      id: `uc-${Math.random().toString(36).slice(2, 7)}`,
      name: ''
    };

    const current = Array.isArray((formData as any).units) ? ((formData as any).units as any[]) : [];
    setFormData(prev => ({ ...prev, units: [...current, newUnit] as any }));
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 md:p-12 max-w-4xl mx-auto animate-fadeIn pb-20">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            {initialPlan ? 'Editar Plano' : 'Novo Plano'}
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">MSEP - Modelo SENAI de Educação</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConfigKey}
              className="px-4 py-2 border-2 border-slate-200 rounded-xl font-black text-[8px] uppercase tracking-widest text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              Configurar Chave
            </button>

            <button
              type="button"
              onClick={handleAIHelp}
              disabled={isGenerating || isSubmitting}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                isGenerating ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-slate-900 shadow-lg shadow-blue-100'
              }`}
            >
              {isGenerating ? (
                <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              )}
              {isGenerating ? 'Gerando...' : 'IA Assistente'}
            </button>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-[8px] font-black uppercase text-right max-w-[250px] leading-tight">
              {errorMsg}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Título do Curso</label>
          <input
            type="text"
            value={formData.courseName || ""}
            onChange={e => setFormData({ ...formData, courseName: e.target.value })}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-800"
            placeholder="Ex: TÉCNICO EM MECATRÔNICA"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Modalidade</label>
          <select
            value={(formData.modality as any) || "Presencial"}
            onChange={e => setFormData({ ...formData, modality: e.target.value as any })}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <option>Presencial</option>
            <option>EAD</option>
            <option>Semipresencial</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">I. Perfil de Conclusão (Objetivo)</label>
          <textarea
            rows={5}
            value={formData.objective || ""}
            onChange={e => setFormData({ ...formData, objective: e.target.value })}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 leading-relaxed"
            placeholder="O objetivo será preenchido aqui pela IA ou manualmente..."
          />
        </div>
      </div>

      <div className="mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">III. Estrutura de Unidades</h3>
          <button
            type="button"
            onClick={addUnit}
            className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[9px] font-black uppercase text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Nova UC
          </button>
        </div>

        <div className="space-y-3">
          {(Array.isArray((formData as any).units) ? ((formData as any).units as any[]) : []).map((unit: any, index: number) => (
            <div key={unit.id} className="flex gap-2 items-center group">
              <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-300">0{index + 1}</span>
                <input
                  type="text"
                  placeholder="Nome da Unidade Curricular"
                  className="bg-transparent font-bold text-slate-800 outline-none w-full text-sm uppercase"
                  value={unit.name || ""}
                  onChange={e => {
                    const units = Array.isArray((formData as any).units) ? ([...(formData as any).units] as any[]) : [];
                    units[index] = { ...units[index], name: e.target.value };
                    setFormData({ ...formData, units } as any);
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const units = Array.isArray((formData as any).units) ? ([...(formData as any).units] as any[]) : [];
                  const newUnits = units.filter((_: any, i: number) => i !== index);
                  setFormData({ ...formData, units: newUnits } as any);
                }}
                className="p-4 text-slate-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
        >
          Descartar
        </button>

        <button
          type="button"
          onClick={handleFinalSave}
          disabled={isSubmitting}
          className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center gap-3 ${
            isSubmitting ? 'bg-slate-700 text-white cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'
          }`}
        >
          {isSubmitting && (
            <div className="w-3 h-3 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
          )}
          {isSubmitting ? 'Sincronizando...' : 'Confirmar e Salvar'}
        </button>
      </div>
    </div>
  );
};

export default PlanForm;
