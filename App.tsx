import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from './types';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from './constants';
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

  useEffect(() => {
    currentPlanRef.current = currentPlan;
  }, [currentPlan]);

  useEffect(() => {
    selectedUnitRef.current = selectedUnit;
  }, [selectedUnit]);

  // Ementa oficial completa injetada estaticamente para contornar qualquer travamento do Firebase
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
        {
          id: "lidt",
          name: "Leitura e Interpretação de Desenho Técnico",
          hours: 60,
          schedule: [],
          calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
        },
        {
          id: "crd",
          name: "Controle Dimensional",
          hours: 60,
          schedule: [],
          calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
        },
        {
          id: "fusi",
          name: "Fundamentos da Usinagem",
          hours: 100,
          schedule: [],
          calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
        },
        {
          id: "prusc",
          name: "Processos de Usinagem Convencional",
          hours: 160,
          capabilities: [
            "Realizar operações em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
            "Realizar operações em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
            "Realizar operações de serramento por meio de máquinas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
            "Realizar a montagem de conjuntos mecânicos de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.",
            "Definir os parâmetros e os processos de usinagem em retificas convencionais, de acordo com as especificações técnicas.",
            "Realizar o balanceamento do rebolo de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
            "Realizar operações em retificadoras cilíndricas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
            "Realizar operações em retificadoras planas de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho."
          ],
          knowledges: [
            "Torneamento: Ferramenta de perfilamento, Acessórios (Lunetas, Graminho, Eixo mandril, Prisma em V), Cálculos técnicos, Operação.",
            "Fresagem: Ferramentas (Gravação, Esférica), Acessórios, Conjunto divisor (Divisão direta, indireta, diferencial), Operação.",
            "Serramento: Definição, Tipos de serra fita (Horizontal, Vertical), Lâmina de serra, Operação.",
            "Conjuntos mecânicos: Definição, Tipos, Características, Técnicas de montagem e ajustagem.",
            "Retificação: Processos (Cilíndrica, Plana tangencial, Centerless, Afiadoras), Parâmetros (RPM, Avanço).",
            "Balanceamento: Rebolos (Tipos, Características, Inspeção), Acessórios (Balanceador estático, Flanges, Eixo), Operações.",
            "Retificadora cilíndrica: Características, Componentes, Acessórios (Placa, Contraponta, Dressador), Operação.",
            "Retificadora plana: Características, Componentes, Acessórios (Mesa magnética, De seno, Calços), Operação."
          ],
          schedule: [],
          calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
        },
        {
          id: "mein",
          name: "Metrologia Industrial",
          hours: 80,
          capabilities: [
            "Medir peças por meio de instrumentos da ordem direta, de acordo com especificações técnicas.",
            "Medir peças por meio de instrumentos da ordem indireta, de acordo com especificações técnicas.",
            "Medir a dureza de materiais de acordo com especificações técnicas.",
            "Medir perfil de peças por meio de imagens projetadas, de acordo com especificações técnicas.",
            "Medir tridimensionalmente peças de acordo com especificações técnicas.",
            "Medir peças digitalmente por meio de sistemas de medição por visão de acordo com especificações técnicas.",
            "Medir peças com braço de medição portátil de acordo com especificações técnicas.",
            "Testar a funcionalidade de peças e conjuntos de acordo com especificações técnicas."
          ],
          knowledges: [
            "Medição direta: Paquímetro de engrenagens, Micrômetro de rosca/engrenagens, Rugosímetro, Calibrador linear height, Procedimentos.",
            "Medição indireta: Comparador de diâmetro interno, Calibrador passa não passa, Bloco padrão, Régua e mesa de seno, Técnicas.",
            "Durômetro: Tipos, Características, Aplicação, Técnicas de utilização, Procedimentos.",
            "Projetor de perfil: Tipos, Características, Aplicação, Técnicas de utilização, Projeção (Diascópica, Episcópica).",
            "Máquina de medição por coordenadas: Tipos (Manual, CNC), Características, Aplicação, Técnicas, Dispositivos, Procedimentos.",
            "Medição por Visão: Tipos, Características, Aplicação, Técnicas de utilização, Procedimentos.",
            "Braço de medição: Tipos (Manual, CNC), Características, Aplicação, Técnicas de utilização, Dispositivos, Procedimentos.",
            "Funcionalidade: Objetivo, Importância, Aspectos (Funcionalidade, Comportamento, Qualidade), Tipos de testes, Métodos."
          ],
          schedule: [],
          calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] }
        }
      ]
    };
  }, []);

  // FILTRO CORRIGIDO: Checa "PROCESSOS" antes de checar "USINAGEM" para evitar conflito de siglas
  const getUnitSigla = (unit: CurricularUnit) => {
    if (!unit || !unit.name) return '';
    const name = unit.name.toUpperCase();
    const id = unit.id ? unit.id.toLowerCase() : '';
    
    if (name.includes('PROCESSOS') || name.includes('PRUSC') || id === 'prusc') return 'PRUSC';
    if (name.includes('LEITURA') || name.includes('DESENHO') || id === 'lidt') return 'LIDT';
    if (name.includes('CONTROLE') || name.includes('DIMENSIONAL') || id === 'crd') return 'CRD';
    if (name.includes('FUNDAMENTOS') || name.includes('USINAGEM') || id === 'fusi') return 'FUSI';
    if (name.includes('METROLOGIA') || name.includes('MEIN') || id === 'mein') return 'MEIN';
    
    return id.toUpperCase();
  };

  const getUnitSemester = (unit: CurricularUnit): number => {
    const sigla = getUnitSigla(unit);
    if (sigla === 'PRUSC' || sigla === 'MEIN') return 2;
    return 1;
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
        setCurrentPlan(refreshed?.[0] || null);
        setSelectedUnit(refreshed?.[0]?.units?.[0] || null);
      } else {
        const processedPlans = await Promise.all(dbPlans.map(async (plan) => {
          let needsReset = false;

          if (!plan.units || plan.units.length !== 5) {
            needsReset = true;
          } else {
            const siglasNoBanco = plan.units.map(u => getUnitSigla(u));
            if (!siglasNoBanco.includes('PRUSC') || !siglasNoBanco.includes('MEIN')) {
              needsReset = true;
            }
          }

          // Se for detectado erro na estrutura salva do banco, aplica a ementa correta local por cima
          if (needsReset) {
            console.log(`Forçando atualização e reordenamento da ementa para: ${profileId}`);
            plan.units = JSON.parse(JSON.stringify(template.units));
            plan.courseName = template.courseName;
            plan.objective = template.objective;
            plan.modality = template.modality;
            plan.totalHours = template.totalHours;
            (plan as any).version = SCHEDULE_VERSION;
            plan.updatedAt = new Date().toISOString();
            
            await FirebaseService.savePlan(plan);
          } else {
            // Garante o ID correto interno para os elementos existentes
            plan.units = plan.units.map(u => {
              const s = getUnitSigla(u);
              if (s === 'PRUSC') return { ...u, id: 'prusc' };
              if (s === 'MEIN') return { ...u, id: 'mein' };
              return u;
            });
          }
          return plan;
        }));

        setPlans(processedPlans);
        
        const activeCurrentPlan = currentPlanRef.current;
        const activeSelectedUnit = selectedUnitRef.current;

        if (activeCurrentPlan) {
          const updatedCurrent = processedPlans.find(p => p.id === activeCurrentPlan.id);
          if (updatedCurrent) {
            setCurrentPlan(updatedCurrent);
            if (activeSelectedUnit) {
              const updatedUnit = updatedCurrent.units?.find(u => getUnitSigla(u) === getUnitSigla(activeSelectedUnit));
              if (updatedUnit) setSelectedUnit(updatedUnit);
            }
          }
        } else {
          setCurrentPlan(processedPlans[0] || null);
          setSelectedUnit(processedPlans[0]?.units?.[0] || null);
        }
      }
    } catch (err) {
      console.error("Erro ao sincronizar ementa:", err);
    } finally {
      setIsLoading(false);
    }
  }, [getOfficialTemplate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
  }, [activeProfileId, isAuthenticated, loadPlans]);

  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    try {
      await FirebaseService.savePlan(planToSave);
      const refreshed = await FirebaseService.getPlans(activeProfileId);
      setPlans(refreshed || []);
      setView('dashboard');
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  const handleUpdateSchedule = async (unitId: string, newSchedule: ScheduleEntry[]) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => u.id === unitId ? { ...u, schedule: newSchedule } : u);
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId, updatedAt: new Date().toISOString() };
    setCurrentPlan(updatedPlan);
    await FirebaseService.savePlan(updatedPlan);
  };

  const handleUpdateCalendar = async (unitId: string, newCalendar: UnitCalendar) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => u.id === unitId ? { ...u, calendar: newCalendar } : u);
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId, updatedAt: new Date().toISOString() };
    setCurrentPlan(updatedPlan);
    await FirebaseService.savePlan(updatedPlan);
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
    setActiveSemester(1);
  };

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  const filteredUnits = currentPlan?.units?.filter(unit => getUnitSemester(unit) === activeSemester) || [];

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      onLogout={handleLogout}
      activeProfileId={activeProfileId}
      onProfileChange={handleProfileChange}
      activeSemester={activeSemester}
      onSemesterChange={setActiveSemester}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Organizando semestres e siglas...</p>
        </div>
      ) : (
        <>
          {view === 'dashboard' && (
            <Dashboard 
              plans={plans} 
              onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} 
              onView={(p) => { setCurrentPlan(p); setSelectedUnit(p?.units?.[0] || null); setView('plano-curso'); }} 
              onRefresh={() => loadPlans(activeProfileId)} 
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Carga Total</p><p className="text-2xl font-black text-slate-800 italic">{currentPlan.totalHours} HORAS</p></div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Modalidade</p><p className="text-2xl font-black text-slate-800 italic uppercase">{currentPlan.modality}</p></div>
                </div>
                <section><h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">I. Perfil de Conclusão</h3><p className="text-slate-600 text-sm leading-relaxed font-medium">{currentPlan.objective}</p></section>
              </div>
              
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">III. Unidades Curriculares ({activeSemester}º Semestre)</h3>
                </div>
                
                {filteredUnits.length === 0 ? (
                  <p className="text-slate-400 text-xs font-medium italic p-4 text-center">Nenhuma unidade cadastrada para este semestre.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredUnits.map((unit, idx) => (
                      <button 
                        key={unit.id || idx} 
                        onClick={() => { if(unit) { setSelectedUnit(unit); setView('plano-ensino'); } }} 
                        className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden min-h-[140px] flex flex-col justify-between"
                      >
                        <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2">0{idx + 1}</span>
                        <div>
                          <p className="text-[9px] font-black text-blue-400 mb-2">{getUnitSigla(unit)}</p>
                          <h4 className="font-black text-lg leading-tight uppercase">{unit.name}</h4>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-4 group-hover:text-blue-200">Clique para ver Capacidades e Cronograma →</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'plano-ensino' && currentPlan && selectedUnit && (
            <div className="space-y-8 max-w-7xl mx-auto pb-20">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
                {currentPlan.units?.map((u, idx) => (
                  <button 
                    key={u.id || idx} 
                    onClick={() => setSelectedUnit(u)} 
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${selectedUnit.id === u.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-100'}`}
                  >
                    {getUnitSigla(u)}
                  </button>
                ))}
              </div>
              <UnitViewer 
                unit={selectedUnit} 
                onUpdateSchedule={(newSched) => handleUpdateSchedule(selectedUnit.id, newSched)} 
                onUpdateCalendar={(newCal) => handleUpdateCalendar(selectedUnit.id, newCal)}
                onUpdateUnit={(updatedUnit) => {
                  if (!currentPlan) return;
                  const updatedUnits = currentPlan.units.map(u => u.id === updatedUnit.id ? updatedUnit : u);
                  const updatedPlan = { ...currentPlan, units: updatedUnits };
                  setCurrentPlan(updatedPlan);
                  FirebaseService.savePlan(updatedPlan);
                }}
              />
            </div>
          )}

          {view === 'calendario' && currentPlan && <GeneralCalendar plan={currentPlan} />}

          {view === 'editor' && <PlanForm initialPlan={currentPlan || undefined} onSave={handleSave} onCancel={() => setView('dashboard')} />}
        </>
      )}
    </Layout>
  );
};

export default App;
