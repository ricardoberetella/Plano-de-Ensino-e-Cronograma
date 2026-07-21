import React, { useState, useRef, useMemo } from 'react';

// Tipos e Interfaces
type SemesterType = '1' | '2' | 'both';

interface GeneralCompetencies {
  technicalCapacities: string[];
  socioemotionalCapacities: string[];
  knowledge: string[];
}

interface LearningSituation {
  id: string;
  title: string;
  contextualization: string;
  challenge: string;
}

interface ScheduleEntry {
  id: string;
  date: string; // Formato DD/MM/AAAA
  hours: number;
  capacities: string;
  knowledge: string;
  strategy: string;
  resources: string;
  completed: boolean;
}

interface FullUnitData {
  id: string;
  name: string;
  semesters: SemesterType;
  color: string;
  general: GeneralCompetencies;
  learningSituations: LearningSituation[];
  schedule: ScheduleEntry[];
}

const PASSWORD_REQUIRED = 'mecanicatop';

const INITIAL_DATABASE: Record<string, FullUnitData> = {
  LIDT: {
    id: 'LIDT',
    name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
    semesters: '1',
    color: 'bg-blue-500 text-white border-blue-600',
    general: {
      technicalCapacities: ['Interpretar projeções ortogonais (1º e 3º diedro).', 'Identificar escalas, cortes e seções.'],
      socioemotionalCapacities: ['Rigor técnico e atenção aos detalhes.'],
      knowledge: ['Formatos de papel e normas ABNT.']
    },
    learningSituations: [
      {
        id: 'SA1',
        title: 'Situação de Aprendizagem 1 - Leitura de Desenho Técnico',
        contextualization: 'O aluno recebe uma folha de desenho técnico de um conjunto usinado.',
        challenge: 'Identificar as cotas e rugosidades solicitadas pelo cliente.'
      }
    ],
    schedule: [
      { id: '1', date: '10/02/2026', hours: 4, capacities: 'Interpretar projeções', knowledge: 'Normas ABNT', strategy: 'Aula Prática', resources: 'Folhas de Desenho, Paquímetro', completed: false },
      { id: '2', date: '12/02/2026', hours: 4, capacities: 'Escalas e Cortes', knowledge: 'Cortes Ortogonais', strategy: 'Exercício Prático', resources: 'Prancheta', completed: true }
    ]
  },
  CDMAT: {
    id: 'CDMAT',
    name: 'CIÊNCIAS DOS MATERIAIS',
    semesters: '1',
    color: 'bg-emerald-500 text-white border-emerald-600',
    general: { technicalCapacities: ['Identificar propriedades dos metais.'], socioemotionalCapacities: ['Organização'], knowledge: ['Ensaios mecânicos'] },
    learningSituations: [],
    schedule: [
      { id: '3', date: '11/02/2026', hours: 4, capacities: 'Propriedades dos Metais', knowledge: 'Ligas Metálicas', strategy: 'Análise de Amostras', resources: 'Laboratório', completed: false }
    ]
  },
  CRD: {
    id: 'CRD',
    name: 'CONTROLE DIMENSIONAL',
    semesters: '2',
    color: 'bg-purple-500 text-white border-purple-600',
    general: { technicalCapacities: ['Realizar medições com paquímetro.'], socioemotionalCapacities: ['Precisão'], knowledge: ['Metrologia dimensional'] },
    learningSituations: [],
    schedule: []
  },
  FUSI: {
    id: 'FUSI',
    name: 'FUNDAMENTOS DA USINAGEM',
    semesters: 'both',
    color: 'bg-orange-500 text-white border-orange-600',
    general: { technicalCapacities: ['Operar torno convencional.'], socioemotionalCapacities: ['Segurança no trabalho'], knowledge: ['Parâmetros de corte'] },
    learningSituations: [],
    schedule: []
  }
};

// Componente para Edição de Texto com Preservação de Foco
const RichEditable: React.FC<{
  html: string;
  onChange: (newHtml: string) => void;
  className?: string;
  disabled?: boolean;
}> = ({ html, onChange, className = '', disabled = false }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={editorRef}
      contentEditable={!disabled}
      suppressContentEditableWarning
      onBlur={() => {
        if (editorRef.current && !disabled) onChange(editorRef.current.innerHTML);
      }}
      className={`w-full min-h-[1.5rem] bg-transparent transition-all rounded px-2 py-1 break-words ${
        disabled ? 'cursor-default opacity-90' : 'bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none border border-slate-200'
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function SmoothManager() {
  const [db, setDb] = useState<Record<string, FullUnitData>>(INITIAL_DATABASE);
  const [currentUc, setCurrentUc] = useState<string>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma' | 'calendario'>('geral');

  // Trava de Segurança / Senha
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const unit = db[currentUc] || INITIAL_DATABASE['LIDT'];

  const handleUnlockRequest = () => {
    if (isEditable) {
      setIsEditable(false);
    } else {
      setPasswordInput('');
      setAuthError(false);
      setIsAuthModalOpen(true);
    }
  };

  const handleConfirmPassword = () => {
    if (passwordInput === PASSWORD_REQUIRED) {
      setIsEditable(true);
      setIsAuthModalOpen(false);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const updateUnitField = (updater: (draft: FullUnitData) => void) => {
    if (!isEditable) return;
    setDb(prev => {
      const copy = { ...prev };
      const currentDraft = { ...copy[currentUc] };
      updater(currentDraft);
      copy[currentUc] = currentDraft;
      return copy;
    });
  };

  const handleAddUc = (semester: SemesterType) => {
    if (!isEditable) return;
    const id = `UC_${Date.now().toString().slice(-4)}`;
    setDb(prev => ({
      ...prev,
      [id]: {
        id,
        name: 'NOVA UNIDADE CURRICULAR',
        semesters: semester,
        color: 'bg-slate-700 text-white border-slate-800',
        general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
        learningSituations: [],
        schedule: []
      }
    }));
    setCurrentUc(id);
  };

  const handleDeleteUc = (id: string) => {
    if (!isEditable) return;
    setDb(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    const remainingKeys = Object.keys(db).filter(k => k !== id);
    if (remainingKeys.length > 0) setCurrentUc(remainingKeys[0]);
  };

  // Mapeamento dinâmico de datas para o Calendário Escolar
  const { scheduledMap, monthList } = useMemo(() => {
    const map: Record<string, Array<{ ucName: string; color: string; capacity: string; hours: number }>> = {};
    const months = new Set<string>();

    Object.values(db).forEach(u => {
      u.schedule.forEach(entry => {
        const cleanDate = entry.date.replace(/<[^>]*>/g, '').trim();
        const parts = cleanDate.split('/');
        if (parts.length === 3) {
          const formattedKey = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          const monthKey = `${parts[2]}-${parts[1].padStart(2, '0')}`;
          
          months.add(monthKey);

          if (!map[cleanDate]) map[cleanDate] = [];
          map[cleanDate].push({
            ucName: u.name,
            color: u.color,
            capacity: entry.capacities,
            hours: entry.hours
          });
        }
      });
    });

    if (months.size === 0) months.add('2026-02');

    return { scheduledMap: map, monthList: Array.from(months).sort() };
  }, [db]);

  const sem1Units = Object.keys(db).filter(k => db[k].semesters === '1' || db[k].semesters === 'both');
  const sem2Units = Object.keys(db).filter(k => db[k].semesters === '2' || db[k].semesters === 'both');

  return (
    <div className="w-full bg-slate-100 min-h-screen p-6 font-sans">
      
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        
        {/* CABEÇALHO */}
        <div className="border-b border-slate-100 pb-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">EDITAR PLANO DE ENSINO E CRONOGRAMA</h1>
              <p className="text-xs text-slate-400 uppercase font-bold">SMO - Modelo SENAI de Educação</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUnlockRequest}
                className={`flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm ${
                  isEditable ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                <span>{isEditable ? '🔓 Edição Liberada' : '🔒 Modo Leitura (Bloqueado)'}</span>
              </button>

              <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-2 rounded-xl uppercase">
                Presencial
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Título do Curso</label>
            <div className="font-bold text-slate-700 text-sm">SMO - Mecânico de Usinagem Convencional</div>
          </div>
        </div>

        {/* III. ESTRUTURA DE UNIDADES CURRICULARES */}
        <div className="mb-8">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-4">
            III. Estrutura de Unidades Curriculares (Organizadas por Semestre)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1º SEMESTRE */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-black text-blue-700 uppercase tracking-wider">1º Semestre</h3>
                {isEditable && (
                  <button onClick={() => handleAddUc('1')} className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    + Nova UC
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {sem1Units.map(key => {
                  const item = db[key];
                  const isSelected = currentUc === key;

                  return (
                    <div
                      key={key}
                      onClick={() => setCurrentUc(key)}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected ? 'border-blue-500 bg-white shadow-md ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <RichEditable html={item.name} onChange={(val) => updateUnitField(u => { u.name = val; })} disabled={!isEditable} className="font-bold text-xs text-slate-800" />
                      {isEditable && (
                        <div className="flex items-center gap-2 ml-2">
                          <select
                            value={item.semesters}
                            onChange={(e) => {
                              const val = e.target.value as SemesterType;
                              setDb(prev => ({ ...prev, [key]: { ...prev[key], semesters: val } }));
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-bold bg-slate-100 border border-slate-200 rounded px-1.5 py-1"
                          >
                            <option value="1">1º Sem</option>
                            <option value="2">2º Sem</option>
                            <option value="both">Ambos</option>
                          </select>
                          <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteUc(key); }} className="text-red-400 hover:text-red-600 font-bold text-xs">✕</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2º SEMESTRE */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-black text-purple-700 uppercase tracking-wider">2º Semestre</h3>
                {isEditable && (
                  <button onClick={() => handleAddUc('2')} className="bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    + Nova UC
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {sem2Units.map(key => {
                  const item = db[key];
                  const isSelected = currentUc === key;

                  return (
                    <div
                      key={key}
                      onClick={() => setCurrentUc(key)}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected ? 'border-purple-500 bg-white shadow-md ring-2 ring-purple-100' : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <RichEditable html={item.name} onChange={(val) => updateUnitField(u => { u.name = val; })} disabled={!isEditable} className="font-bold text-xs text-slate-800" />
                      {isEditable && (
                        <div className="flex items-center gap-2 ml-2">
                          <select
                            value={item.semesters}
                            onChange={(e) => {
                              const val = e.target.value as SemesterType;
                              setDb(prev => ({ ...prev, [key]: { ...prev[key], semesters: val } }));
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-bold bg-slate-100 border border-slate-200 rounded px-1.5 py-1"
                          >
                            <option value="1">1º Sem</option>
                            <option value="2">2º Sem</option>
                            <option value="both">Ambos</option>
                          </select>
                          <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteUc(key); }} className="text-red-400 hover:text-red-600 font-bold text-xs">✕</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* MENU DE ABAS COMPLETO */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex border-b border-slate-200 mb-6 gap-2 overflow-x-auto">
            {(['geral', 'sa', 'cronograma', 'calendario'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'geral' ? 'Estrutura Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : tab === 'cronograma' ? 'Cronograma' : 'Calendário Escolar'}
              </button>
            ))}
          </div>

          {/* ABA 1: ESTRUTURA GERAL */}
          {activeTab === 'geral' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Capacidades Técnicas</h4>
                  {isEditable && (
                    <button onClick={() => updateUnitField(u => { u.general.technicalCapacities.push('Nova Capacidade'); })} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">+ Add</button>
                  )}
                </div>
                {unit.general.technicalCapacities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable html={cap} onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })} disabled={!isEditable} className="text-xs" />
                    {isEditable && <button onClick={() => updateUnitField(u => { u.general.technicalCapacities.splice(i, 1); })} className="text-red-400 font-bold text-xs">✕</button>}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Socioemocionais</h4>
                  {isEditable && (
                    <button onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.push('Nova Capacidade'); })} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">+ Add</button>
                  )}
                </div>
                {unit.general.socioemotionalCapacities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable html={cap} onChange={(val) => updateUnitField(u => { u.general.socioemotionalCapacities[i] = val; })} disabled={!isEditable} className="text-xs" />
                    {isEditable && <button onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); })} className="text-red-400 font-bold text-xs">✕</button>}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Conhecimentos</h4>
                  {isEditable && (
                    <button onClick={() => updateUnitField(u => { u.general.knowledge.push('Novo Conhecimento'); })} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">+ Add</button>
                  )}
                </div>
                {unit.general.knowledge.map((know, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable html={know} onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })} disabled={!isEditable} className="text-xs" />
                    {isEditable && <button onClick={() => updateUnitField(u => { u.general.knowledge.splice(i, 1); })} className="text-red-400 font-bold text-xs">✕</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 2: SITUAÇÕES DE APRENDIZAGEM */}
          {activeTab === 'sa' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-black text-slate-700 uppercase">Situações de Aprendizagem Cadastradas</h3>
                {isEditable && (
                  <button onClick={() => updateUnitField(u => { u.learningSituations.push({ id: `SA_${Date.now().toString().slice(-3)}`, title: 'Nova Situação', contextualization: 'Contexto...', challenge: 'Desafio...' }); })} className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl">
                    + Criar S.A.
                  </button>
                )}
              </div>

              {unit.learningSituations.map((sa, index) => (
                <div key={sa.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <RichEditable html={sa.title} onChange={(val) => updateUnitField(u => { u.learningSituations[index].title = val; })} disabled={!isEditable} className="font-bold text-sm" />
                    {isEditable && <button onClick={() => updateUnitField(u => { u.learningSituations.splice(index, 1); })} className="text-red-400 font-bold text-xs">Excluir</button>}
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-500 uppercase block mb-1">Contextualização:</strong>
                    <RichEditable html={sa.contextualization} onChange={(val) => updateUnitField(u => { u.learningSituations[index].contextualization = val; })} disabled={!isEditable} />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-500 uppercase block mb-1">Desafio / Problema:</strong>
                    <RichEditable html={sa.challenge} onChange={(val) => updateUnitField(u => { u.learningSituations[index].challenge = val; })} disabled={!isEditable} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ABA 3: CRONOGRAMA */}
          {activeTab === 'cronograma' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-black text-slate-700 uppercase">Detalhamento das Aulas ({unit.name})</h3>
                  <p className="text-[11px] text-slate-400">As datas abaixo sincronizam automaticamente com o Calendário Escolar.</p>
                </div>
                {isEditable && (
                  <button onClick={() => updateUnitField(u => { u.schedule.push({ id: Date.now().toString(), date: '15/02/2026', hours: 4, capacities: 'Nova Capacidade', knowledge: 'Novo Conteúdo', strategy: 'Prática', resources: 'Material', completed: false }); })} className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl">
                    + Adicionar Aula
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-black uppercase border-b border-slate-200">
                      <th className="p-3">Data (DD/MM/AAAA)</th>
                      <th className="p-3">Horas</th>
                      <th className="p-3">Capacidade</th>
                      <th className="p-3">Conhecimento</th>
                      <th className="p-3">Estratégia</th>
                      <th className="p-3">Status</th>
                      {isEditable && <th className="p-3">Ações</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {unit.schedule.map((row, index) => (
                      <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-2 w-32">
                          <RichEditable html={row.date} onChange={v => updateUnitField(u => { u.schedule[index].date = v; })} disabled={!isEditable} className="font-bold text-blue-700" />
                        </td>
                        <td className="p-2 w-16">
                          <RichEditable html={row.hours.toString()} onChange={v => updateUnitField(u => { u.schedule[index].hours = Number(v) || 0; })} disabled={!isEditable} />
                        </td>
                        <td className="p-2">
                          <RichEditable html={row.capacities} onChange={v => updateUnitField(u => { u.schedule[index].capacities = v; })} disabled={!isEditable} />
                        </td>
                        <td className="p-2">
                          <RichEditable html={row.knowledge} onChange={v => updateUnitField(u => { u.schedule[index].knowledge = v; })} disabled={!isEditable} />
                        </td>
                        <td className="p-2">
                          <RichEditable html={row.strategy} onChange={v => updateUnitField(u => { u.schedule[index].strategy = v; })} disabled={!isEditable} />
                        </td>
                        <td className="p-2 w-20">
                          <button
                            onClick={() => updateUnitField(u => { u.schedule[index].completed = !u.schedule[index].completed; })}
                            className={`px-2 py-1 rounded font-black text-[10px] uppercase ${row.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                          >
                            {row.completed ? 'OK' : 'PREV'}
                          </button>
                        </td>
                        {isEditable && (
                          <td className="p-2">
                            <button onClick={() => updateUnitField(u => { u.schedule.splice(index, 1); })} className="text-red-400 hover:text-red-600 font-bold">✕</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ABA 4: CALENDÁRIO ESCOLAR (TOTALMENTE SINCRONIZADO COM O CRONOGRAMA) */}
          {activeTab === 'calendario' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="text-xs font-black text-slate-700 uppercase mb-2">Visão Geral do Calendário Escolar</h3>
                <p className="text-xs text-slate-500">As aulas agendadas em todas as UCs são exibidas abaixo sincronizadas por mês.</p>
              </div>

              {monthList.map(monthKey => {
                const [yearStr, monthStr] = monthKey.split('-');
                const year = parseInt(yearStr);
                const month = parseInt(monthStr) - 1;

                const firstDayIndex = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(year, month));

                return (
                  <div key={monthKey} className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
                    <div className="mb-4 text-center border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-800 uppercase tracking-widest">{monthName} / {year}</h4>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-xs">
                      {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
                        <div key={d} className="font-black text-slate-400 p-2 uppercase text-[10px]">{d}</div>
                      ))}

                      {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-3 opacity-0" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const formattedDate = `${String(dayNum).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
                        const events = scheduledMap[formattedDate] || [];

                        return (
                          <div key={dayNum} className={`p-2 min-h-[50px] rounded-xl border flex flex-col items-center justify-between transition-all ${events.length > 0 ? 'bg-slate-50 border-blue-200 shadow-sm' : 'bg-white border-slate-100'}`}>
                            <span className="text-xs font-bold text-slate-700">{dayNum}</span>
                            
                            {events.map((ev, evIdx) => (
                              <div key={evIdx} className={`w-full mt-1 p-1 rounded text-[9px] font-black truncate ${ev.color}`} title={`${ev.ucName} - ${ev.capacity}`}>
                                {ev.hours}h
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* MODAL DE AUTENTICAÇÃO POR SENHA */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-lg">🔒</div>
            <h3 className="text-base font-black text-slate-800 uppercase">Acesso de Edição</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Digite a senha para liberar edições no Cronograma e SMO.</p>

            <input
              type="password"
              placeholder="Digite a senha..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmPassword()}
              className={`w-full p-3 rounded-xl border text-center font-mono text-sm outline-none ${authError ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
            />

            {authError && <span className="text-[11px] font-bold text-red-500 block mt-2">Senha incorreta!</span>}

            <div className="flex gap-2 mt-5">
              <button type="button" onClick={() => setIsAuthModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">Cancelar</button>
              <button type="button" onClick={handleConfirmPassword} className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold">Liberar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
