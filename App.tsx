
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar, CalendarMarking, CalendarColor } from './types';
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
          const template = SAMPLE_PLANS.find(p => p.profileId === profileId) || SAMPLE_PLANS[0];
          let updated = false;
          
          // Verificar se unidades básicas existem
          template.units.forEach(tUnit => {
            const hasUnit = plan.units.some(u => u.name === tUnit.name);
            if (!hasUnit) {
              plan.units.push(tUnit);
              updated = true;
            }
          });

          // FORÇAR ATUALIZAÇÃO DO FUSI SE A VERSÃO FOR ANTIGA
          const fusi = plan.units.find(u => u.id.toLowerCase().includes('fusi') || u.name.toUpperCase().includes('FUNDAMENTOS'));
          if (fusi && (plan as any).version !== SCHEDULE_VERSION) {
            const tFusi = template.units.find(u => u.id.toLowerCase().includes('fusi') || u.name.toUpperCase().includes('FUNDAMENTOS'));
            if (tFusi) {
              const idx = plan.units.indexOf(fusi);
              plan.units[idx] = { ...tFusi }; // Substitui pela versão fiel do código
              (plan as any).version = SCHEDULE_VERSION;
              updated = true;
            }
          }

          if (updated) {
            plan.updatedAt = new Date().toISOString();
            await FirebaseService.savePlan(plan);
          }
          return plan;
        }));

        setPlans(processedPlans);
        if (currentPlan) {
          const updatedCurrent = processedPlans.find(p => p.id === currentPlan.id);
          if (updatedCurrent) {
            setCurrentPlan(updatedCurrent);
            if (selectedUnit) {
              const updatedUnit = updatedCurrent.units.find(u => u.id === selectedUnit.id);
              if (updatedUnit) setSelectedUnit(updatedUnit);
            }
          }
        } else {
          setCurrentPlan(processedPlans[0]);
          setSelectedUnit(processedPlans[0].units[0]);
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
  };

  const getUnitSigla = (unit: CurricularUnit) => {
    const name = unit.name.toUpperCase();
    const id = unit.id.toLowerCase();
    if (name.includes('LEITURA') || name.includes('DESENHO') || id.includes('lidt')) return 'LIDT';
    if (name.includes('CONTROLE') || name.includes('DIMENSIONAL') || id.includes('crd')) return 'CRD';
    if (name.includes('FUNDAMENTOS') || name.includes('USINAGEM') || id.includes('fusi')) return 'FUSI';
    return unit.name.split(' ').map(w => w[0]).join('').toUpperCase();
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

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
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sincronizando dados...</p>
        </div>
      ) : (
        <>
          {view === 'dashboard' && <Dashboard plans={plans} onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} onView={(p) => { setCurrentPlan(p); setSelectedUnit(p.units[0]); setView('plano-curso'); }} onRefresh={() => loadPlans(activeProfileId)} />}
          
          {view === 'plano-curso' && currentPlan && (
            <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-20">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#E30613]"></div>
                <div className="mb-12 flex justify-between items-start">
                  <div>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">MSEP - Modelo SENAI</span>
                    <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]">{currentPlan.courseName}</h2>
                  </div>
                  <button 
                    onClick={handlePrint}
                    className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-slate-900 transition-all flex items-center gap-3 group"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                    <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Gerar Relatório PDF</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Carga Total</p><p className="text-2xl font-black text-slate-800 italic">{currentPlan.totalHours} HORAS</p></div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Modalidade</p><p className="text-2xl font-black text-slate-800 italic uppercase">{currentPlan.modality}</p></div>
                </div>
                <section><h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">I. Perfil de Conclusão</h3><p className="text-slate-600 text-sm leading-relaxed font-medium">{currentPlan.objective}</p></section>
              </div>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">III. Unidades Curriculares</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentPlan.units.map((unit, idx) => (
                    <button key={unit.id} onClick={() => { setSelectedUnit(unit); setView('plano-ensino'); }} className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden">
                      <span className="text-6xl font-black opacity-5 absolute -right-2 -bottom-2">0{idx + 1}</span>
                      <p className="text-[9px] font-black text-blue-400 mb-2">{getUnitSigla(unit)}</p>
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

          {/* ÁREA DE IMPRESSÃO OCULTA */}
          <div className="hidden print:block print:bg-white print:text-black">
            <style>{`
              @media print {
                body { background: white !important; }
                header, aside, .no-print, button { display: none !important; }
                .print-page { page-break-after: always; padding: 2cm; }
                .print-title { border-bottom: 4px solid #E30613; padding-bottom: 10px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 10px; }
                th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; }
                h1, h2, h3 { color: #000; text-transform: uppercase; }
              }
            `}</style>
            
            {currentPlan && (
              <div className="p-10">
                {/* Capa */}
                <div className="print-page">
                  <div className="print-title">
                    <h1 style={{fontSize: '24pt', fontWeight: '900'}}>{currentPlan.courseName}</h1>
                    <p style={{fontSize: '12pt', fontWeight: 'bold', color: '#666'}}>Plano de Ensino e Cronograma Integrado - MSEP</p>
                  </div>
                  <div style={{marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div><strong>Modalidade:</strong> {currentPlan.modality}</div>
                    <div><strong>Carga Horária Total:</strong> {currentPlan.totalHours}h</div>
                  </div>
                  <div style={{marginTop: '40px'}}>
                    <h2 style={{fontSize: '14pt', borderBottom: '1px solid #ccc', paddingBottom: '5px'}}>I. Perfil de Conclusão (Objetivo)</h2>
                    <p style={{fontSize: '11pt', marginTop: '10px', lineHeight: '1.5'}}>{currentPlan.objective}</p>
                  </div>
                </div>

                {/* Detalhes por Unidade */}
                {currentPlan.units.map((unit) => (
                  <div key={unit.id} className="print-page">
                    <h2 style={{fontSize: '18pt', fontWeight: '900', borderLeft: '8px solid #005DAA', paddingLeft: '15px', marginBottom: '20px'}}>
                      UC: {unit.name}
                    </h2>
                    
                    <section style={{marginBottom: '30px'}}>
                      <h3 style={{fontSize: '12pt', fontWeight: 'bold', marginBottom: '10px'}}>Capacidades Técnicas</h3>
                      <ul style={{fontSize: '10pt', marginLeft: '20px'}}>
                        {unit.basicCapacities.map((c, i) => <li key={i} style={{marginBottom: '5px'}}>{c}</li>)}
                      </ul>
                    </section>

                    {unit.learningSituations.length > 0 && (
                      <section style={{marginBottom: '30px', background: '#f9f9f9', padding: '15px', borderRadius: '5px', border: '1px solid #eee'}}>
                        <h3 style={{fontSize: '12pt', fontWeight: 'bold', marginBottom: '10px'}}>Situação de Aprendizagem</h3>
                        <p style={{fontSize: '10pt', fontWeight: 'bold'}}>Título: {unit.learningSituations[0].title}</p>
                        <p style={{fontSize: '9pt', marginTop: '10px', whiteSpace: 'pre-wrap'}}>{unit.learningSituations[0].context}</p>
                        <div style={{marginTop: '10px', padding: '10px', border: '1px dashed #ccc'}}>
                          <p style={{fontSize: '9pt', fontStyle: 'italic'}}><strong>Desafio:</strong> {unit.learningSituations[0].challenge}</p>
                        </div>
                      </section>
                    )}

                    <section>
                      <h3 style={{fontSize: '12pt', fontWeight: 'bold', marginBottom: '10px'}}>Cronograma / Plano de Aula</h3>
                      <table>
                        <thead>
                          <tr>
                            <th style={{width: '60px'}}>Data</th>
                            <th style={{width: '40px'}}>H/A</th>
                            <th>Conhecimentos / Capacidades</th>
                            <th>Estratégia Docente</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unit.schedule.map((entry) => (
                            <tr key={entry.id}>
                              <td>{entry.date}</td>
                              <td>{entry.hours}h</td>
                              <td style={{fontSize: '9px'}}>
                                <strong>{entry.knowledge}</strong><br/>
                                <span style={{color: '#666'}}>{entry.capacities}</span>
                              </td>
                              <td style={{fontSize: '9px'}}>{entry.strategy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default App;
