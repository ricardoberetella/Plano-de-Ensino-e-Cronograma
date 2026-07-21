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
      { id: '1', date: '10/02/2026', hours: 4, capacities: 'Interpretar projeções', knowledge: 'Normas ABNT', strategy: 'Aula Prática', resources: 'Folhas de Desenho', completed: false }
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
    semesters: 'both',
    general: { technicalCapacities: ['Operar torno convencional.'], socioemotionalCapacities: ['Segurança no trabalho'], knowledge: ['Parâmetros de corte'] },
    learningSituations: [],
    schedule: []
  }
};

// Componente RichEditable
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
  const [selectedUcId, setSelectedUcId] = useState<string | null>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma' | 'calendario'>('geral');

  // SEGURANÇA E SENHA
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // MODAL DE CRIAÇÃO DE NOVA UC
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUcName, setNewUcName] = useState('');
  const [newUcSemester, setNewUcSemester] = useState<SemesterType>('1');

  // PERFIL DE CONCLUSÃO
  const [perfilConclusao, setPerfilConclusao] = useState(
    'Desenvolver capacidades técnicas e socioemocionais relativas aos elementos de máquina, ferramentas, processos de fabricação, manutenção e usinagem convencional seguindo normas de saúde e segurança.'
  );

  // Execução com autenticação
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

  // Criar Nova UC com Semestre definido
  const handleConfirmCreateUc = () => {
    if (!newUcName.trim()) return;

    const id = `UC_${Date.now().toString().slice(-4)}`;
    setDb(prev => ({
      ...prev,
      [id]: {
        id,
        name: newUcName.trim().toUpperCase(),
        semesters: newUcSemester,
        general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
        learningSituations: [],
        schedule: []
      }
    }));

    setSelectedUcId(id);
    setIsCreateModalOpen(false);
    setNewUcName('');
    setNewUcSemester('1');
  };

  const handleDeleteUc = (id: string) => {
    executeWithAuth(() => {
      setDb(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      if (selectedUcId === id) setSelectedUcId(null);
    });
  };

  const activeUnit = selectedUcId ? db[selectedUcId] : null;

  const updateActiveUnitField = (updater: (draft: FullUnitData) => void) => {
    if (!activeUnit) return;
    setDb(prev => {
      const copy = { ...prev };
      const currentDraft = { ...copy[activeUnit.id] };
      updater(currentDraft);
      copy[activeUnit.id] = currentDraft;
      return copy;
    });
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">EDITAR PLANO</h1>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase">MSEP - MODELO SENAI DE EDUCAÇÃO</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => executeWithAuth(() => {})}
              className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
                isEditable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}
            >
              {isEditable ? '🔓 Modo Edição (Liberado)' : '🔒 Modo Leitura (Bloqueado)'}
            </button>
            <button className="bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1">
              ✨ IA ASSISTENTE
            </button>
          </div>
        </div>

        {/* CAMPOS SUPERIORES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Título do Curso</label>
            <div className="font-extrabold text-xs text-slate-800">SMO - Mecânico de Usinagem Convencional</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Modalidade</label>
            <select className="w-full bg-transparent text-xs font-black text-slate-800 outline-none">
              <option>PRESENCIAL</option>
              <option>EAD</option>
            </select>
          </div>
        </div>

        {/* I. PERFIL DE CONCLUSÃO */}
        <div className="mb-8">
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">I. PERFIL DE CONCLUSÃO (OBJETIVO)</label>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <RichEditable
              html={perfilConclusao}
              onChange={setPerfilConclusao}
              disabled={!isEditable}
              className="text-xs text-slate-600 leading-relaxed font-medium"
            />
          </div>
        </div>

        {/* III. ESTRUTURA DE UNIDADES (O ONDE É DEFINIDO O SEMESTRE) */}
        <div className="bg-slate-50/70 p-5 rounded-3xl border border-slate-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider">
              III. ESTRUTURA DE UNIDADES
            </h2>
            <button
              onClick={() => executeWithAuth(() => setIsCreateModalOpen(true))}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1"
            >
              + NOVA UC
            </button>
          </div>

          {/* LISTA DE UCs COM BADGES DE SEMESTRE */}
          <div className="space-y-3">
            {Object.values(db).map((unit, index) => {
              const isSelected = selectedUcId === unit.id;

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUcId(unit.id)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-white shadow-md ring-2 ring-blue-100'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-300 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-extrabold text-xs text-slate-800 uppercase">
                      {unit.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {/* INDICADOR DE SEMESTRE */}
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase ${
                        unit.semesters === '1'
                          ? 'bg-blue-100 text-blue-700'
                          : unit.semesters === '2'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {unit.semesters === '1' ? '1º Semestre' : unit.semesters === '2' ? '2º Semestre' : 'Ambos Semestres'}
                    </span>

                    {/* SELECT RÁPIDO PARA ALTERAR SEMESTRE */}
                    {isEditable && (
                      <select
                        value={unit.semesters}
                        onChange={(e) => {
                          const val = e.target.value as SemesterType;
                          setDb(prev => ({
                            ...prev,
                            [unit.id]: { ...prev[unit.id], semesters: val }
                          }));
                        }}
                        className="text-[10px] font-bold bg-slate-100 border border-slate-200 rounded-lg p-1 outline-none"
                      >
                        <option value="1">1º Sem.</option>
                        <option value="2">2º Sem.</option>
                        <option value="both">Ambos</option>
                      </select>
                    )}

                    <button
                      type="button"
                      title="Editar Detalhes"
                      onClick={() => setSelectedUcId(unit.id)}
                      className="text-slate-400 hover:text-blue-600 p-1"
                    >
                      👁️
                    </button>

                    <button
                      type="button"
                      title="Excluir Unidade"
                      onClick={() => handleDeleteUc(unit.id)}
                      className="text-slate-300 hover:text-red-500 font-bold p-1 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PAINEL DE DETALHAMENTO DA UC SELECIONADA */}
        {activeUnit && (
          <div className="border-t border-slate-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase block">Unidade Selecionada:</span>
                <h3 className="font-black text-sm text-slate-800">{activeUnit.name}</h3>
              </div>
              <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-xl text-slate-600">
                Alocada no: {activeUnit.semesters === '1' ? '1º Semestre' : activeUnit.semesters === '2' ? '2º Semestre' : 'Ambos os Semestres'}
              </span>
            </div>

            {/* ABAS INTERNAS */}
            <div className="flex border-b border-slate-200 mb-6 gap-2">
              {(['geral', 'sa', 'cronograma'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === tab ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400'
                  }`}
                >
                  {tab === 'geral' ? 'Estrutura Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : 'Cronograma'}
                </button>
              ))}
            </div>

            {/* CONTEÚDO DAS ABAS */}
            {activeTab === 'geral' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-black text-slate-700 uppercase">Capacidades Técnicas</h4>
                    <button onClick={() => executeWithAuth(() => updateActiveUnitField(u => u.general.technicalCapacities.push('Nova Capacidade')))} className="text-[10px] font-bold text-blue-600">+ Add</button>
                  </div>
                  {activeUnit.general.technicalCapacities.map((cap, i) => (
                    <div key={i} className="my-1 flex items-center justify-between">
                      <RichEditable html={cap} onChange={(v) => updateActiveUnitField(u => { u.general.technicalCapacities[i] = v; })} disabled={!isEditable} className="text-xs" />
                      {isEditable && <button onClick={() => updateActiveUnitField(u => { u.general.technicalCapacities.splice(i, 1); })} className="text-red-400 font-bold text-xs ml-1">✕</button>}
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-black text-slate-700 uppercase">Socioemocionais</h4>
                    <button onClick={() => executeWithAuth(() => updateActiveUnitField(u => u.general.socioemotionalCapacities.push('Nova Capacidade')))} className="text-[10px] font-bold text-blue-600">+ Add</button>
                  </div>
                  {activeUnit.general.socioemotionalCapacities.map((cap, i) => (
                    <div key={i} className="my-1 flex items-center justify-between">
                      <RichEditable html={cap} onChange={(v) => updateActiveUnitField(u => { u.general.socioemotionalCapacities[i] = v; })} disabled={!isEditable} className="text-xs" />
                      {isEditable && <button onClick={() => updateActiveUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); })} className="text-red-400 font-bold text-xs ml-1">✕</button>}
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-black text-slate-700 uppercase">Conhecimentos</h4>
                    <button onClick={() => executeWithAuth(() => updateActiveUnitField(u => u.general.knowledge.push('Novo Conhecimento')))} className="text-[10px] font-bold text-blue-600">+ Add</button>
                  </div>
                  {activeUnit.general.knowledge.map((know, i) => (
                    <div key={i} className="my-1 flex items-center justify-between">
                      <RichEditable html={know} onChange={(v) => updateActiveUnitField(u => { u.general.knowledge[i] = v; })} disabled={!isEditable} className="text-xs" />
                      {isEditable && <button onClick={() => updateActiveUnitField(u => { u.general.knowledge.splice(i, 1); })} className="text-red-400 font-bold text-xs ml-1">✕</button>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sa' && (
              <div className="space-y-3">
                <button onClick={() => executeWithAuth(() => updateActiveUnitField(u => u.learningSituations.push({ id: `SA_${Date.now()}`, title: 'Nova SA', contextualization: 'Contexto...', challenge: 'Desafio...' })))} className="text-xs bg-blue-600 text-white font-black px-3 py-1.5 rounded-xl">
                  + Criar S.A.
                </button>
                {activeUnit.learningSituations.map((sa, idx) => (
                  <div key={sa.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                    <RichEditable html={sa.title} onChange={(v) => updateActiveUnitField(u => { u.learningSituations[idx].title = v; })} disabled={!isEditable} className="font-bold" />
                    <RichEditable html={sa.contextualization} onChange={(v) => updateActiveUnitField(u => { u.learningSituations[idx].contextualization = v; })} disabled={!isEditable} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cronograma' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                Aulas agendadas para <strong>{activeUnit.name}</strong> vinculadas ao {activeUnit.semesters === 'both' ? '1º e 2º semestres' : `${activeUnit.semesters}º semestre`}.
              </div>
            )}
          </div>
        )}

        {/* RODAPÉ DE AÇÕES */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
          <button className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-400 uppercase hover:bg-slate-100">
            DESCARTAR
          </button>
          <button className="px-6 py-2.5 rounded-xl text-xs font-black bg-slate-900 text-white uppercase hover:bg-black shadow-lg">
            CONFIRMAR E SALVAR
          </button>
        </div>

      </div>

      {/* MODAL 1: CRIAR NOVA UC (COM ESCOLHA DO SEMESTRE) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase mb-4">Adicionar Nova Unidade Curricular</h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Nome da Unidade Curricular</label>
                <input
                  type="text"
                  placeholder="Ex: PROCESSOS DE USINAGEM CONVENCIONAL"
                  value={newUcName}
                  onChange={(e) => setNewUcName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Semestre de Destino</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '1', label: '1º Semestre' },
                    { id: '2', label: '2º Semestre' },
                    { id: 'both', label: 'Ambos' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNewUcSemester(opt.id as SemesterType)}
                      className={`py-2 rounded-xl text-xs font-black uppercase border transition-all ${
                        newUcSemester === opt.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmCreateUc}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md"
              >
                Criar UC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SENHA */}
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
                onClick={() => { setIsAuthModalOpen(false); setPendingAction(null); }}
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
