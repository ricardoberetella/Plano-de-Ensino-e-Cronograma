import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanForm from './components/PlanForm';
import UnitViewer from './components/UnitViewer';
import Login from './components/Login';
import GeneralCalendar from './components/GeneralCalendar';
import { TeachingPlan, ViewType, CurricularUnit, ScheduleEntry, UnitCalendar } from './types';
import { SAMPLE_PLANS } from './constants'; // Carrega direto do seu arquivo salvo
import { FirebaseService } from './services/firebase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState('beretella');
  const [view, setView] = useState<ViewType>('dashboard');
  const [plans, setPlans] = useState<TeachingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TeachingPlan | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<CurricularUnit | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUnitSigla = (unit: CurricularUnit) => {
    if (!unit || !unit.name) return 'UC';
    const name = unit.name.toUpperCase();
    const id = (unit.id || '').toLowerCase();
    if (name.includes('LEITURA') || name.includes('DESENHO') || id.includes('lidt')) return 'LIDT';
    if (name.includes('CONTROLE') || name.includes('DIMENSIONAL') || id.includes('crd')) return 'CRD';
    if (name.includes('FUNDAMENTOS') || name.includes('USINAGEM') || id.includes('fusi')) return 'FUSI';
    return 'UC';
  };

  // Força o carregamento dos planos locais salvos por você
  useEffect(() => {
    const localPlans = SAMPLE_PLANS.filter(p => p.profileId === activeProfileId);
    setPlans(localPlans);
    
    if (localPlans.length > 0) {
      const defaultPlan = localPlans[0];
      setCurrentPlan(defaultPlan);
      if (defaultPlan.units && defaultPlan.units.length > 0) {
        setSelectedUnit(defaultPlan.units[0]);
      }
    }
  }, [activeProfileId]);

  // Função para forçar a gravação e correção do Firebase com os seus arquivos locais funcionando
  const forcarSincronizacaoComNuvem = async () => {
    setIsLoading(true);
    try {
      const planosLocais = SAMPLE_PLANS.filter(p => p.profileId === activeProfileId);
      for (const plano of planosLocais) {
        await FirebaseService.savePlan(plano);
      }
      alert("✅ Banco de dados atualizado com sucesso usando seus arquivos salvos!");
    } catch (error) {
      console.error("Erro ao sincronizar:", error);
      alert("Erro ao salvar na nuvem, mas os dados locais continuam ativos na tela.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (updatedPlan: TeachingPlan) => {
    const planToSave = { ...updatedPlan, profileId: activeProfileId };
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? planToSave : p));
    setCurrentPlan(planToSave);
    try {
      await FirebaseService.savePlan(planToSave);
      setView('dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSchedule = async (unitId: string, newSchedule: ScheduleEntry[]) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => u.id === unitId ? { ...u, schedule: newSchedule } : u);
    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === currentPlan.id ? updatedPlan : p));
    await FirebaseService.savePlan(updatedPlan);
  };

  const handleUpdateCalendar = async (unitId: string, newCalendar: UnitCalendar) => {
    if (!currentPlan) return;
    const updatedUnits = currentPlan.units.map(u => u.id === unitId ? { ...u, calendar: newCalendar } : u);
    const updatedPlan = { ...currentPlan, units: updatedUnits };
    setCurrentPlan(updatedPlan);
    setPlans(prev => prev.map(p => p.id === currentPlan.id ? updatedPlan : p));
    await FirebaseService.savePlan(updatedPlan);
  };

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  const safeUnits = currentPlan && Array.isArray(currentPlan.units) ? currentPlan.units : [];

  return (
    <Layout 
      activeView={view} 
      onViewChange={setView} 
      onLogout={() => setIsAuthenticated(false)}
      activeProfileId={activeProfileId}
      onProfileChange={(id) => { setActiveProfileId(id); setView('dashboard'); }}
    >
      <div className="absolute top-4 right-20 z-50">
        <button 
          onClick={forcarSincronizacaoComNuvem}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg transition-all"
        >
          {isLoading ? 'Sincronizando...' : '🔄 Forçar Correção do Banco'}
        </button>
      </div>

      {view === 'dashboard' && <Dashboard plans={plans} onEdit={(p) => { setCurrentPlan(p); setView('editor'); }} onView={(p) => { setCurrentPlan(p); if(p.units.length > 0) setSelectedUnit(p.units[0]); setView('plano-curso'); }} onRefresh={() => {}} />}
      
      {view === 'plano-curso' && currentPlan && (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E30613]"></div>
            <span className="bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">MSEP - Modelo SENAI</span>
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9] mb-6">{currentPlan.courseName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Carga Total</p><p className="text-2xl font-black text-slate-800 italic">{currentPlan.totalHours} HORAS</p></div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Modalidade</p><p className="text-2xl font-black text-slate-800 italic uppercase">{currentPlan.modality}</p></div>
            </div>
            <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-2">I. Perfil de Conclusão</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">{currentPlan.objective}</p>
          </div>
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">III. Unidades Curriculares</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {safeUnits.map((unit, idx) => (
                <button key={unit.id || idx} onClick={() => { setSelectedUnit(unit); setView('plano-ensino'); }} className="bg-slate-800 p-8 rounded-3xl text-left hover:bg-blue-600 transition-all group relative overflow-hidden">
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
          <div className="flex gap-2 overflow-x-auto pb-4 px-1">
            {safeUnits.map((u, idx) => (
              <button 
                key={u.id || idx} 
                onClick={() => setSelectedUnit(u)} 
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase border-2 ${getUnitSigla(selectedUnit) === getUnitSigla(u) ? 'bg-blue-600 border-blue-600 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-400'}`}
              >
                {getUnitSigla(u)}
              </button>
            ))}
          </div>
          <UnitViewer 
            unit={selectedUnit} 
            onUpdateSchedule={(ns) => handleUpdateSchedule(selectedUnit.id, ns)} 
            onUpdateCalendar={(nc) => handleUpdateCalendar(selectedUnit.id, nc)}
            onUpdateUnit={(uu) => {
              const updatedUnits = currentPlan.units.map(u => u.id === uu.id ? uu : u);
              setCurrentPlan({ ...currentPlan, units: updatedUnits });
            }}
          />
        </div>
      )}

      {view === 'calendario' && currentPlan && <GeneralCalendar plan={currentPlan} />}
      {view === 'editor' && <PlanForm initialPlan={currentPlan || undefined} onSave={handleSave} onCancel={() => setView('dashboard')} />}
    </Layout>
  );
};

export default App;
