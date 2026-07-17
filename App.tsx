import React, { useState } from 'react';
import { SAMPLE_PLANS, SCHEDULE_VERSION } from './constants';

// Interfaces para tipagem segura
interface ScheduleItem {
  id: string;
  date: string;
  hours: number;
  capacities: string;
  knowledge: string;
  strategy: string;
  resources: string;
}

interface CurricularUnit {
  id: string;
  name: string;
  code: string;
  semester?: number;
  schedule?: ScheduleItem[];
}

export default function App() {
  // Estado para controle do professor selecionado (Chaves batendo com o constants.tsx)
  const [selectedTeacher, setSelectedTeacher] = useState({
    id: 'ricardo-gea',
    name: 'Ricardo Gea'
  });

  // Estado para controle do semestre ativo
  const [selectedSemester, setSelectedSemester] = useState<'1º SEM' | '2º SEM'>('2º SEM');
  
  // Estado para controle da Unidade Curricular selecionada dentro do semestre
  const [activeUnitId, setActiveUnitId] = useState<string>('');

  // Recupera o plano do professor e do semestre selecionado com segurança
  const currentPlan = SAMPLE_PLANS[selectedTeacher.id]?.[selectedSemester];
  
  // Lista de unidades curriculares do plano atual (evita quebra usando array vazio como fallback)
  const units: CurricularUnit[] = currentPlan?.units || [];

  // Define automaticamente a primeira unidade curricular como ativa quando o plano mudar
  React.useEffect(() => {
    if (units.length > 0) {
      setActiveUnitId(units[0].id);
    } else {
      setActiveUnitId('');
    }
  }, [selectedTeacher.id, selectedSemester, units.length]);

  // Busca a unidade que está ativa na tela
  const activeUnit = units.find(u => u.id === activeUnitId);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* SIDEBAR LATERAL DE NAVEGAÇÃO */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shadow-xl">
        <div>
          {/* Logo / Cabeçalho da Escola */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xl font-black tracking-wider text-red-500">SENAI</span>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md font-mono">
              {SCHEDULE_VERSION}
            </span>
          </div>

          {/* Seletor de Professores */}
          <div className="p-4">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Instrutor Responsável
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedTeacher({ id: 'ricardo-gea', name: 'Ricardo Gea' })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTeacher.id === 'ricardo-gea'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                Ricardo Gea
              </button>
              <button
                onClick={() => setSelectedTeacher({ id: 'ricardo-beretella', name: 'Ricardo Beretella' })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTeacher.id === 'ricardo-beretella'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                Ricardo Beretella
              </button>
            </div>
          </div>

          <hr className="border-slate-800 my-2" />

          {/* Lista de Unidades Curriculares Dinâmicas */}
          <div className="p-4">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Unidades Curriculares
            </label>
            {units.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-2">Nenhuma UC cadastrada para este semestre.</p>
            ) : (
              <nav className="space-y-1">
                {units.map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => setActiveUnitId(unit.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      activeUnitId === unit.id
                        ? 'bg-slate-800 text-white border-l-4 border-red-500 pl-2'
                        : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate mr-2">{unit.name}</span>
                    <span className="bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0">
                      {unit.code}
                    </span>
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Matão Usinagem Convencional &copy; 2026
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA TELA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* BARRA SUPERIOR DE FILTROS E STATUS */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-slate-500">PLANO DE CURSO:</span>
            <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-red-100">
              {currentPlan?.courseName || 'Mecânico de Usinagem Convencional'}
            </span>
          </div>

          {/* Chaves Seletoras de Semestre */}
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
            <button
              onClick={() => setSelectedSemester('1º SEM')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all ${
                selectedSemester === '1º SEM'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              1º Semestre
            </button>
            <button
              onClick={() => setSelectedSemester('2º SEM')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all ${
                selectedSemester === '2º SEM'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              2º Semestre
            </button>
          </div>
        </header>

        {/* PAINEL DINÂMICO DOS CRONOGRAMAS */}
        <section className="flex-1 overflow-y-auto p-8">
          
          {/* Cabeçalho do Plano Selecionado */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                SMO - Mecânico de Usinagem Convencional
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Visualizando dados de: <strong className="text-slate-700">{selectedTeacher.name}</strong> &bull; {selectedSemester}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-sans font-bold">Carga Horária</span>
                <strong className="text-slate-800 text-sm">{currentPlan?.totalHours || 400} Horas</strong>
              </div>
              <div className="bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-sans font-bold">Modalidade</span>
                <strong className="text-slate-800 text-sm">{currentPlan?.modality || 'Presencial'}</strong>
              </div>
            </div>
          </div>

          {/* Tabela do Cronograma Detalhado */}
          {activeUnit ? (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
                <div>
                  <h2 className="font-bold text-sm tracking-wide uppercase">{activeUnit.name}</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Série Metódica Ocupacional (SMO)</p>
                </div>
                <span className="bg-red-600 text-white text-xs font-mono font-bold px-2.5 py-1 rounded">
                  {activeUnit.code}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-28">Data</th>
                      <th className="py-3 px-4 w-16 text-center">Aulas</th>
                      <th className="py-3 px-4 w-1/4">Capacidades</th>
                      <th className="py-3 px-4 w-1/3">Conteúdos Pedagógicos / SMO</th>
                      <th className="py-3 px-4">Estratégias de Ensino e Recursos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {activeUnit.schedule && activeUnit.schedule.length > 0 ? (
                      activeUnit.schedule.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                            {row.date}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-500">
                            {row.hours}h
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                            <span className="inline-block text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded">
                              {row.capacities}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 leading-relaxed font-normal">
                            {row.knowledge}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 leading-relaxed">
                            <div className="mb-1"><strong className="text-[10px] uppercase tracking-wide text-slate-400 block font-sans">Estratégia:</strong> {row.strategy}</div>
                            <div><strong className="text-[10px] uppercase tracking-wide text-slate-400 block font-sans">Recursos:</strong> <span className="text-slate-500 italic">{row.resources}</span></div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-slate-400 italic bg-slate-50/50">
                          Nenhum plano de aula detalhado inserido para esta unidade curricular no {selectedSemester} ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 italic">
              Selecione uma unidade curricular válida na barra lateral.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
