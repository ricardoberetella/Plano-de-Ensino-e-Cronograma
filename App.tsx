
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from './types';
import { SAMPLE_PLANS } from './constants';
import { FirebaseService } from './services/firebase';

const COLOR_MAP: Record<string, string> = {
  blue: '#3b82f6',
  pink: '#ec4899',
  green: '#22c55e',
  red: '#ef4444',
  orange: '#f97316'
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      
      if (!dbPlans || dbPlans.length === 0) {
        const template = SAMPLE_PLANS.find(p => p.profileId === profileId) || SAMPLE_PLANS[0];
        const defaultPlan = { 
          ...template, 
          id: `plan-usinagem-${profileId}`, 
          profileId: profileId,
          updatedAt: new Date().toISOString()
        };
        await FirebaseService.savePlan(defaultPlan);
        const refreshed = await FirebaseService.getPlans(profileId);
        setPlans(refreshed);
        setCurrentPlan(refreshed[0]);
        setSelectedUnit(refreshed[0].units[0]);
      } else {
        let hasInjected = false;
        const processedPlans = await Promise.all(dbPlans.map(async (plan) => {
          const fusiIndex = plan.units.findIndex(u => u.id.toLowerCase().includes('fusi'));
          const template = SAMPLE_PLANS.find(p => p.profileId === profileId) || SAMPLE_PLANS[0];
          const fusiTemplate = template.units.find(u => u.id.toLowerCase().includes('fusi'));

          if (fusiIndex === -1) {
            if (fusiTemplate) {
              plan.units.push(fusiTemplate);
              plan.updatedAt = new Date().toISOString();
              await FirebaseService.savePlan(plan);
              hasInjected = true;
            }
          } else {
            const unit = plan.units[fusiIndex];
            
            // Verificação Literal dos Resultados Esperados (AgroMaq)
            const hasAgroMaqLiteral = unit.learningSituations.some(sa => 
              sa.expectedResults.some(res => res.includes('Os componentes "Eixo cilíndrico de quatro corpos", "Eixo roscado" e "Manípulo" finalizados'))
            );

            // Verificação Literal dos Resultados Esperados (Fresanatec)
            const hasFresanatecLiteral = unit.learningSituations.some(sa => 
              sa.expectedResults.some(res => res.includes('O conjunto de 6 (seis) componentes mecânicos (Bloco fresado, Bloco rebaixado, Castanha mole, Base para castanha, Mordente de proteção, Coletor de serragem)'))
            );

            // Verificação de Rubricas literais
            const hasSistemicaLiteral = unit.rubrics.some(r => 
              r.capacity.includes('Demonstrar visão sistêmica') && 
              r.nsa.includes('Não consegue compreender a relação entre as peças')
            );
            
            if (!hasAgroMaqLiteral || !hasFresanatecLiteral || !hasSistemicaLiteral) {
              if (fusiTemplate) {
                plan.units[fusiIndex] = fusiTemplate;
                plan.updatedAt = new Date().toISOString();
                await FirebaseService.savePlan(plan);
                hasInjected = true;
              }
            }
          }
          return plan;
        }));

        const finalPlans = hasInjected ? await FirebaseService.getPlans(profileId) : processedPlans;
        setPlans(finalPlans);
        
        if (currentPlan) {
          const updatedCurrent = finalPlans.find(p => p.id === currentPlan.id);
          if (updatedCurrent) {
            setCurrentPlan(updatedCurrent);
            if (selectedUnit) {
              const updatedUnit = updatedCurrent.units.find(u => u.id === selectedUnit.id);
              if (updatedUnit) setSelectedUnit(updatedUnit);
            }
          }
        } else {
          setCurrentPlan(finalPlans[0]);
          setSelectedUnit(finalPlans[0].units[0]);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar Firebase:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeProfileId, currentPlan, selectedUnit]);

  useEffect(() => {
    if (isAuthenticated) {
      loadPlans(activeProfileId);
    }
  }, [activeProfileId, isAuthenticated]);

  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    try {
      await FirebaseService.savePlan(planToSave);
      const refreshed = await FirebaseService.getPlans(activeProfileId);
      setPlans(refreshed);
      setView('dashboard');
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      throw error;
    }
  };

  const handleUpdateSchedule = async (unitId: string, newSchedule: ScheduleEntry[]) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => 
      u.id === unitId ? { ...u, schedule: newSchedule } : u
    );
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId, updatedAt: new Date().toISOString() };
    setCurrentPlan(updatedPlan);
    const newSelectedUnit = updatedUnits.find(u => u.id === unitId);
    if (newSelectedUnit) setSelectedUnit(newSelectedUnit);
    await FirebaseService.savePlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
  };

  const handleUpdateCalendar = async (unitId: string, newCalendar: UnitCalendar) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => 
      u.id === unitId ? { ...u, calendar: newCalendar } : u
    );
    const updatedPlan = { ...currentPlan, units: updatedUnits, profileId: activeProfileId, updatedAt: new Date().toISOString() };
    setCurrentPlan(updatedPlan);
    const newSelectedUnit = updatedUnits.find(u => u.id === unitId);
    if (newSelectedUnit) setSelectedUnit(newSelectedUnit);
    await FirebaseService.savePlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
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
  };

  const aggregatedMarkingsByDate = useMemo(() => {
    if (!currentPlan) return {};
    const markings: Record<string, Set<CalendarColor>> = {};
    
    currentPlan.units.forEach(unit => {
      const isCRD = unit.id.toLowerCase().includes('crd');
      const isFUSI = unit.id.toLowerCase().includes('fusi');
      const unitColor: CalendarColor = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');
      
      unit.schedule.forEach(entry => {
        if (!entry.date.includes('/')) return;
        const [d, m, y] = entry.date.split('/');
        const isoDate = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        if (!markings[isoDate]) markings[isoDate] = new Set();
        markings[isoDate].add(unitColor);
      });

      if (unit.calendar?.markings) {
        unit.calendar.markings.forEach(m => {
          if (m.color === 'green') {
            if (!markings[m.date]) markings[m.date] = new Set();
            markings[m.date].add('green');
          }
        });
      }
    });
    return markings;
  }, [currentPlan]);

  const monthsList = useMemo(() => {
    return ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      onLogout={handleLogout}
      activeProfileId={activeProfileId}
      onProfileChange={handleProfileChange}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Sincronizando dados...
          </p>
        </div>
      ) : (
        <>
          {view === 'dashboard' && (
            <Dashboard 
              plans={plans} 
              onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} 
              onView={(p) => { setCurrentPlan(p); setSelectedUnit(p.units[0]); setView('plano-curso'); }} 
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
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Responsável</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase italic">Prof. {activeProfileId === 'beretella' ? 'Ricardo Beretella' : 'Ricardo Gea'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Carga Total</p>
                    <p className="text-2xl font-black text-slate-800 italic">{currentPlan.totalHours} HORAS</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Modalidade</p>
                    <p className="text-2xl font-black text-slate-800 italic uppercase">{currentPlan.modality}</p>
                  </div>
                </div>
                <section>
                  <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">I. Perfil de Conclusão</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{currentPlan.objective}</p>
                </section>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">III. Unidades Curriculares</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentPlan.units.map((unit, idx) => (
                    <button 
                      key={unit.id}
                      onClick={() => { setSelectedUnit(unit); setView('plano-ensino'); }}
                      className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden"
                    >
                      <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2 group-hover:opacity-20 transition-opacity">0{idx + 1}</span>
                      <p className="text-[9px] font-black text-blue-400 group-hover:text-blue-100 uppercase tracking-widest mb-2">{unit.id.split('-')[1]}</p>
                      <h4 className="font-black text-lg leading-tight uppercase line-clamp-2">{unit.name}</h4>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === 'plano-ensino' && currentPlan && selectedUnit && (
            <div className="space-y-8 max-w-7xl mx-auto pb-20">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-1">
                {currentPlan.units.map(u => (
                  <button 
                    key={u.id}
                    onClick={() => setSelectedUnit(u)}
                    className={`flex-shrink-0 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedUnit.id === u.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-105' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-200'}`}
                  >
                    {u.id.split('-')[1]}
                  </button>
                ))}
              </div>
              <UnitViewer 
                unit={selectedUnit} 
                onUpdateSchedule={(newSched) => handleUpdateSchedule(selectedUnit.id, newSched)} 
                onUpdateCalendar={(newCal) => handleUpdateCalendar(selectedUnit.id, newCal)}
              />
            </div>
          )}

          {view === 'calendario' && currentPlan && (
            <div className="max-w-6xl mx-auto animate-fadeIn space-y-10 pb-20">
               <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#E30613] rounded-b-full"></div>
                  <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase mb-4 italic leading-none">MSEP - CALENDÁRIO GERAL</h2>
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] mb-8">Cronograma Semestral Unificado</p>
                  
                  <div className="max-w-2xl mx-auto bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Legenda de Atividades</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {currentPlan.units.map(unit => {
                        const isCRD = unit.id.toLowerCase().includes('crd');
                        const isFUSI = unit.id.toLowerCase().includes('fusi');
                        const color = isCRD ? 'pink' : (isFUSI ? 'orange' : 'blue');
                        return (
                          <div key={unit.id} className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-md shadow-sm flex-shrink-0`} style={{ backgroundColor: COLOR_MAP[color] }}></div>
                            <span className="text-[9px] font-black text-slate-700 uppercase">{unit.id.split('-')[1]}</span>
                          </div>
                        );
                      })}
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-md shadow-sm flex-shrink-0 bg-green-500"></div>
                        <span className="text-[9px] font-black text-slate-700 uppercase">Não Letivo</span>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {monthsList.map(monthStr => {
                   const [year, month] = monthStr.split('-').map(Number);
                   const firstDay = new Date(year, month - 1, 1);
                   const lastDay = new Date(year, month, 0);
                   const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long' });
                   
                   const days = [];
                   for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
                   for (let i = 1; i <= lastDay.getDate(); i++) {
                     const d = i < 10 ? `0${i}` : i;
                     days.push(`${monthStr}-${d}`);
                   }

                   return (
                     <div key={monthStr} className="space-y-4">
                       <div className="bg-slate-900 text-white py-2 px-5 rounded-2xl text-center shadow-md">
                         <h4 className="text-[10px] font-black uppercase tracking-widest italic">{monthName} {year}</h4>
                       </div>
                       <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
                          <div className="grid grid-cols-7 text-center bg-slate-50 border-b border-slate-100">
                            {['D','S','T','Q','Q','S','S'].map((d, i) => (
                              <div key={i} className={`py-3 text-[8px] font-black ${i === 0 ? 'text-red-500' : 'text-slate-400'}`}>{d}</div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7">
                            {days.map((day, idx) => {
                              if (!day) return <div key={`e-${idx}`} className="p-1 border-b border-r border-slate-50"></div>;
                              
                              const dayMarkings = Array.from(aggregatedMarkingsByDate[day] || []);
                              const dateNum = parseInt(day.split('-')[2]);
                              const isSunday = idx % 7 === 0;

                              let cellStyle: React.CSSProperties = { color: '#ffffff' };
                              const hasCRD = dayMarkings.includes('pink');
                              const hasLIDT = dayMarkings.includes('blue');
                              const hasFUSI = dayMarkings.includes('orange');

                              if (dayMarkings.length === 0) {
                                cellStyle = { color: isSunday ? '#ef4444' : '#1e293b' };
                              } else if (hasCRD && hasLIDT) {
                                cellStyle.background = `linear-gradient(to right, ${COLOR_MAP.pink} 50%, ${COLOR_MAP.blue} 50%)`;
                              } else if (hasFUSI && hasLIDT) {
                                cellStyle.background = `linear-gradient(to right, ${COLOR_MAP.orange} 50%, ${COLOR_MAP.blue} 50%)`;
                              } else if (hasFUSI && hasCRD) {
                                cellStyle.background = `linear-gradient(to right, ${COLOR_MAP.orange} 50%, ${COLOR_MAP.pink} 50%)`;
                              } else {
                                cellStyle.backgroundColor = COLOR_MAP[dayMarkings[0]] || '#cbd5e1';
                              }

                              return (
                                <div
                                  key={day}
                                  className={`p-2 h-12 md:h-14 flex items-center justify-center text-[10px] font-black border-b border-r border-slate-50 relative ${
                                    isSunday && dayMarkings.length === 0 ? 'bg-red-50/10' : ''
                                  }`}
                                  style={cellStyle}
                                >
                                  {dateNum}
                                  {dayMarkings.length > 0 && !dayMarkings.includes('green') && (
                                    <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full"></div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          )}

          {view === 'editor' && (
            <PlanForm 
              initialPlan={currentPlan || undefined}
              onSave={handleSave} 
              onCancel={() => setView('dashboard')} 
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
