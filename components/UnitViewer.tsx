import React, { useState, useMemo } from 'react';

// Tipos
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
  date: string;
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
      { id: '1', date: '10/02/2026', hours: 4, capacities: 'Interpretar projeções', knowledge: 'Normas ABNT', strategy: 'Aula Prática', resources: 'Folhas de Desenho, Paquímetro', completed: false }
    ]
  },
  CDMAT: {
    id: 'CDMAT',
    name: 'CIÊNCIAS DOS MATERIAIS',
    semesters: '1',
    general: { technicalCapacities: ['Identificar propriedades dos metais.'], socioemotionalCapacities: ['Organização'], knowledge: ['Ensaios mecânicos'] },
    learningSituations: [],
    schedule: []
  },
  CRD: {
    id: 'CRD',
    name: 'CONTROLE DIMENSIONAL',
    semesters: '2',
    general: { technicalCapacities: ['Realizar medições com paquímetro.'], socioemotionalCapacities: ['Precisão'], knowledge: ['Metrologia dimensional'] },
    learningSituations: [],
    schedule: []
  },
  FUSI: {
    id: 'FUSI',
    name: 'FUNDAMENTOS DA USINAGEM',
    semesters: '2',
    general: { technicalCapacities: ['Operar torno convencional.'], socioemotionalCapacities: ['Segurança no trabalho'], knowledge: ['Parâmetros de corte'] },
    learningSituations: [],
    schedule: []
  }
};

// Componente para Edição de Texto
const RichEditable: React.FC<{
  html: string;
  onChange: (newHtml: string) => void;
  className?: string;
  disabled?: boolean;
}> = ({ html, onChange, className = '', disabled = false }) => {
  return (
    <div
      contentEditable={!disabled}
      suppressContentEditableWarning
      onBlur={(e) => {
        if (!disabled) onChange(e.currentTarget.innerHTML);
      }}
      className={`w-full min-h-[1.5rem] bg-transparent transition-all rounded px-2 py-1 break-words ${
        disabled ? 'cursor-default opacity-90' : 'bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none border border-slate-200'
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function App() {
  const [db, setDb] = useState<Record<string, FullUnitData>>(INITIAL_DATABASE);
  
  // NAVEGAÇÃO PRINCIPAL POR SEMESTRE
  const [activeSemesterTab, setActiveSemesterTab] = useState<'1' | '2'>('1');
  
  // UNIDADE SELECIONADA E ABA INTERNA
  const [currentUc, setCurrentUc] = useState<string>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma' | 'calendario'>('geral');

  // SEGURANÇA / SENHA
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Executa uma ação se estiver desbloqueado, senão pede a senha
  const executeWithAuth = (action: () => void) => {
    if (isEditable) {
      action();
    } else {
      setPendingAction(() => action);
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
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } else {
      setAuthError(true);
    }
  };

  // Filtragem de Unidades do Semestre Selecionado
  const currentSemesterUnits = useMemo(() => {
    return Object.values(db).filter(
      u => u.semesters === activeSemesterTab || u.semesters === 'both'
    );
  }, [db, activeSemesterTab]);

  // Garante que a UC selecionada pertence ao semestre ativo
  const activeUnit = db[currentUc] && (db[currentUc].semesters === activeSemesterTab || db[currentUc].semesters === 'both')
    ? db[currentUc]
    : currentSemesterUnits[0] || null;

  const updateUnitField = (updater: (draft: FullUnitData) => void) => {
    if (!activeUnit) return;
    setDb(prev => {
      const copy = { ...prev };
      const currentDraft = { ...copy[activeUnit.id] };
      updater(currentDraft);
      copy[activeUnit.id] = currentDraft;
      return copy;
    });
  };

  const handleAddUc = () => {
    executeWithAuth(() => {
      const id = `UC_${Date.now().toString().slice(-4)}`;
      setDb(prev => ({
        ...prev,
        [id]: {
          id,
          name: 'NOVA UNIDADE CURRICULAR',
          semesters: activeSemesterTab,
          general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
          learningSituations: [],
          schedule: []
        }
      }));
      setCurrentUc(id);
    });
  };

  const handleDeleteUc = (id: string) => {
    executeWithAuth(() => {
      setDb(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    });
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
        
        {/* CABEÇALHO */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">PLANO DE ENSINO E CRONOGRAMA</h1>
              <p className="text-xs text-slate-400 uppercase font-bold">SMO - Modelo SENAI de Educação</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (isEditable) {
                    setIsEditable(false);
                  } else {
                    executeWithAuth(() => {});
                  }
                }}
                className={`flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm ${
                  isEditable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                <span>{isEditable ? '🔓 Modo Edição (Liberado)' : '🔒 Modo Leitura (Bloqueado)'}</span>
              </button>

              <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-2 rounded-xl uppercase">
                Presencial
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Título do Curso</span>
            <div className="font-bold text-slate-700 text-sm">SMO - Mecânico de Usinagem Convencional</div>
          </div>
        </div>

        {/* MENU 1: SELEÇÃO DE SEMESTRE (NOVO MENU PRINCIPAL) */}
        <div className="mb-6">
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Selecione o Semestre Letivo</label>
          <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveSemesterTab('1')}
              className={`py-3 rounded-xl font-black text-xs uppercase transition-all ${
                activeSemesterTab === '1'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              1º Semestre
            </button>
            <button
              onClick={() => setActiveSemesterTab('2')}
              className={`py-3 rounded-xl font-black text-xs uppercase transition-all ${
                activeSemesterTab === '2'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              2º Semestre
            </button>
          </div>
        </div>

        {/* MENU 2: UNIDADES CURRICULARES DO SEMESTRE SELECIONADO */}
        <div className="mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Unidades Curriculares - {activeSemesterTab}º Semestre
            </h2>
            <button
              onClick={handleAddUc}
              className="bg-slate-900 hover:bg-black text-white text-xs font-black px-3 py-1.5 rounded-xl transition-all"
            >
              + Criar UC no {activeSemesterTab}º Semestre
            </button>
          </div>

          {currentSemesterUnits.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 font-bold">
              Nenhuma Unidade Curricular cadastrada para o {activeSemesterTab}º semestre.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentSemesterUnits.map(item => {
                const isSelected = activeUnit?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentUc(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? activeSemesterTab === '1'
                          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100'
                          : 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-100'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <span className="font-bold text-xs text-slate-800 block truncate">{item.name}</span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.semesters === 'both' ? 'Presente em Ambos os Semestres' : `${item.semesters}º Semestre`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        title="Editar / Selecionar"
                        onClick={() => executeWithAuth(() => setCurrentUc(item.id))}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all text-xs"
                      >
                        👁️
                      </button>
                      <button
                        type="button"
                        title="Excluir"
                        onClick={() => handleDeleteUc(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-xs"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PAINEL DE CONTEÚDO DA UC SELECIONADA */}
        {activeUnit && (
          <div className="border-t border-slate-200 pt-6">
            
            {/* MENU DE ABAS INTERNAS */}
            <div className="flex border-b border-slate-200 mb-6 gap-2 overflow-x-auto">
              {(['geral', 'sa', 'cronograma', 'calendario'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab === 'geral' ? 'Estrutura Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : tab === 'cronograma' ? 'Cronograma' : 'Calendário'}
                </button>
              ))}
            </div>

            {/* ESTRUTURA GERAL DA UC */}
            {activeTab === 'geral' && (
              <div className="space-y-6">
                
                {/* IDENTIFICAÇÃO E TROCA DE SEMESTRE */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Nome da Unidade Curricular</label>
                    <RichEditable
                      html={activeUnit.name}
                      onChange={(val) => updateUnitField(u => { u.name = val; })}
                      disabled={!isEditable}
                      className="font-bold text-sm text-slate-800"
                    />
                  </div>

                  <div className="w-full md:w-56">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Semestre de Destino</label>
                    <select
                      value={activeUnit.semesters}
                      onChange={(e) => {
                        const val = e.target.value as SemesterType;
                        executeWithAuth(() => updateUnitField(u => { u.semesters = val; }));
                      }}
                      className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">1º Semestre</option>
                      <option value="2">2º Semestre</option>
                      <option value="both">Ambos os Semestres</option>
                    </select>
                  </div>
                </div>

                {/* COMPETÊNCIAS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-black text-slate-700 uppercase">Capacidades Técnicas</h4>
                      <button onClick={() => executeWithAuth(() => updateUnitField(u => { u.general.technicalCapacities.push('Nova Capacidade'); }))} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">+ Add</button>
                    </div>
                    {activeUnit.general.technicalCapacities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-1 my-1">
                        <RichEditable html={cap} onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })} disabled={!isEditable} className="text-xs" />
                        {isEditable && <button onClick={() => updateUnitField(u => { u.general.technicalCapacities.splice(i, 1); })} className="text-red-400 font-bold text-xs">✕</button>}
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-black text-slate-700 uppercase">Socioemocionais</h4>
                      <button onClick={() => executeWithAuth(() => updateUnitField(u => { u.general.socioemotionalCapacities.push('Nova Capacidade'); }))} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">+ Add</button>
                    </div>
                    {activeUnit.general.socioemotionalCapacities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-1 my-1">
                        <RichEditable html={cap} onChange={(val) => updateUnitField(u => { u.general.socioemotionalCapacities[i] = val; })} disabled={!isEditable} className="text-xs" />
                        {isEditable && <button onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); })} className="text-red-400 font-bold text-xs">✕</button>}
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-black text-slate-700 uppercase">Conhecimentos</h4>
                      <button onClick={() => executeWithAuth(() => updateUnitField(u => { u.general.knowledge.push('Novo Conhecimento'); }))} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">+ Add</button>
                    </div>
                    {activeUnit.general.knowledge.map((know, i) => (
                      <div key={i} className="flex items-center gap-1 my-1">
                        <RichEditable html={know} onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })} disabled={!isEditable} className="text-xs" />
                        {isEditable && <button onClick={() => updateUnitField(u => { u.general.knowledge.splice(i, 1); })} className="text-red-400 font-bold text-xs">✕</button>}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SITUAÇÕES DE APRENDIZAGEM */}
            {activeTab === 'sa' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-black text-slate-700 uppercase">Situações de Aprendizagem ({activeUnit.name})</h3>
                  <button onClick={() => executeWithAuth(() => updateUnitField(u => { u.learningSituations.push({ id: `SA_${Date.now().toString().slice(-3)}`, title: 'Nova Situação', contextualization: 'Contexto...', challenge: 'Desafio...' }); }))} className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl">
                    + Criar S.A.
                  </button>
                </div>

                {activeUnit.learningSituations.map((sa, index) => (
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

            {/* CRONOGRAMA */}
            {activeTab === 'cronograma' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-700 uppercase">Aulas do Cronograma ({activeUnit.name})</h3>
                  <button onClick={() => executeWithAuth(() => updateUnitField(u => { u.schedule.push({ id: Date.now().toString(), date: '15/02/2026', hours: 4, capacities: 'Nova Capacidade', knowledge: 'Novo Conteúdo', strategy: 'Prática', resources: 'Material', completed: false }); }))} className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl">
                    + Adicionar Aula
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-black uppercase border-b border-slate-200">
                        <th className="p-3">Data</th>
                        <th className="p-3">Horas</th>
                        <th className="p-3">Capacidade</th>
                        <th className="p-3">Conhecimento</th>
                        <th className="p-3">Estratégia</th>
                        <th className="p-3">Status</th>
                        {isEditable && <th className="p-3">Ações</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {activeUnit.schedule.map((row, index) => (
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
                              onClick={() => executeWithAuth(() => updateUnitField(u => { u.schedule[index].completed = !u.schedule[index].completed; }))}
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

            {/* CALENDÁRIO */}
            {activeTab === 'calendario' && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs font-bold text-slate-500">
                Calendário sincronizado com o cronograma de {activeUnit.name}.
              </div>
            )}

          </div>
        )}

      </div>

      {/* MODAL DE SENHA */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-lg">🔒</div>
            <h3 className="text-base font-black text-slate-800 uppercase">Acesso Restrito</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Digite a senha para alterar ou excluir elementos.</p>

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
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setPendingAction(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmPassword}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black"
              >
                Liberar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
