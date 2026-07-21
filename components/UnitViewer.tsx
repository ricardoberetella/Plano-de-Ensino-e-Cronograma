import React, { useState, useRef, useMemo } from 'react';

// Interfaces
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
  expectedResults: string[];
}

interface ScheduleEntry {
  id: string;
  date: string; // DD/MM/AAAA
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
  semesters: SemesterType; // '1', '2' ou 'both'
  general: GeneralCompetencies;
  learningSituations: LearningSituation[];
  schedule: ScheduleEntry[];
}

const PASSWORD_REQUIRED = 'mecanicatop';

const UC_THEMES: Record<string, { bg: string; text: string; border: string }> = {
  LIDT: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  CDMAT: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  CRD: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  FUSI: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  DEFAULT: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' }
};

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
    learningSituations: [],
    schedule: []
  },
  CDMAT: {
    id: 'CDMAT',
    name: 'CIÊNCIAS DOS MATERIAIS',
    semesters: '1',
    general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
    learningSituations: [],
    schedule: []
  },
  CRD: {
    id: 'CRD',
    name: 'CONTROLE DIMENSIONAL',
    semesters: '2',
    general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
    learningSituations: [],
    schedule: []
  },
  FUSI: {
    id: 'FUSI',
    name: 'FUNDAMENTOS DA USINAGEM',
    semesters: 'both',
    general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
    learningSituations: [],
    schedule: []
  }
};

// Componente para Edição de Texto com Foco
const RichEditable: React.FC<{
  html: string;
  onChange: (newHtml: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}> = ({ html, onChange, className = '', placeholder = 'Clique para editar...', disabled = false }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (cmd: string, value: string = '') => {
    document.execCommand(cmd, false, value);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="relative w-full group/rich">
      {showToolbar && !disabled && (
        <div className="absolute -top-9 left-0 bg-slate-900 text-white flex items-center gap-1 p-1 rounded-xl shadow-xl z-50 no-print scale-90 origin-bottom-left">
          <button type="button" onClick={() => execCmd('bold')} className="p-1 px-2 hover:bg-slate-800 rounded font-bold text-xs">B</button>
          <button type="button" onClick={() => execCmd('fontSize', '4')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A+</button>
          <button type="button" onClick={() => execCmd('fontSize', '2')} className="p-1 hover:bg-slate-800 rounded text-xs font-medium">A-</button>
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onFocus={() => !disabled && setShowToolbar(true)}
        onBlur={() => {
          setTimeout(() => setShowToolbar(false), 200);
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        className={`w-full min-h-[1.5rem] bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-2 py-1 break-words transition-all ${className}`}
        dangerouslySetInnerHTML={{ __html: html || placeholder }}
      />
    </div>
  );
};

export default function SmoothManager() {
  const [db, setDb] = useState<Record<string, FullUnitData>>(INITIAL_DATABASE);
  const [currentUc, setCurrentUc] = useState<string>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma'>('geral');
  
  // Controle de Modal de Autenticação (Senha)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const unit = db[currentUc] || INITIAL_DATABASE['LIDT'];
  const theme = UC_THEMES[currentUc] || UC_THEMES.DEFAULT;

  // Função para solicitar a senha antes de executar ações protegidas
  const requestProtectedAction = (action: () => void) => {
    setPendingAction(() => action);
    setPasswordInput('');
    setAuthError(false);
    setIsAuthModalOpen(true);
  };

  const handleConfirmPassword = () => {
    if (passwordInput === PASSWORD_REQUIRED) {
      if (pendingAction) pendingAction();
      setIsAuthModalOpen(false);
      setPendingAction(null);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const updateUnitField = (updater: (draft: FullUnitData) => void) => {
    setDb(prev => {
      const copy = { ...prev };
      const currentDraft = { ...copy[currentUc] };
      updater(currentDraft);
      copy[currentUc] = currentDraft;
      return copy;
    });
  };

  const handleAddUc = () => {
    requestProtectedAction(() => {
      const id = `UC_${Date.now().toString().slice(-4)}`;
      setDb(prev => ({
        ...prev,
        [id]: {
          id,
          name: 'NOVA UNIDADE CURRICULAR',
          semesters: '1',
          general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
          learningSituations: [],
          schedule: []
        }
      }));
      setCurrentUc(id);
    });
  };

  const handleDeleteUc = (id: string) => {
    requestProtectedAction(() => {
      setDb(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      const remainingKeys = Object.keys(db).filter(k => k !== id);
      if (remainingKeys.length > 0) setCurrentUc(remainingKeys[0]);
    });
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen p-6 font-sans">
      
      {/* PAINEL PRINCIPAL / EDITAR PLANO */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        
        {/* CABEÇALHO DA SMO */}
        <div className="border-b border-slate-100 pb-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">EDITAR PLANO DE ENSINO</h1>
              <p className="text-xs text-slate-400 uppercase font-bold">SMO - Modelo SENAI de Educação</p>
            </div>
            <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase">
              Presencial
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Título do Curso</label>
            <div className="font-bold text-slate-700 text-sm">SMO - Mecânico de Usinagem Convencional</div>
          </div>
        </div>

        {/* ESTRUTURA DE UNIDADES CURRICULARES */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider">III. Estrutura de Unidades Curriculares</h2>
            <button
              onClick={handleAddUc}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm"
            >
              + Nova UC
            </button>
          </div>

          {/* LISTA DE UCs COM ATRIBUIÇÃO DE SEMESTRE */}
          <div className="space-y-3">
            {Object.keys(db).map(key => {
              const item = db[key];
              const isSelected = currentUc === key;

              return (
                <div
                  key={key}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
                    isSelected ? 'border-blue-500 bg-blue-50/30 shadow-md' : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="flex-1 w-full" onClick={() => setCurrentUc(key)}>
                    <RichEditable
                      html={item.name}
                      onChange={(val) => updateUnitField(u => { u.name = val; })}
                      className="font-black text-xs text-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* SELETOR DE SEMESTRE (1º, 2º OU AMBOS) */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Semestre:</span>
                    <select
                      value={item.semesters}
                      onChange={(e) => {
                        const val = e.target.value as SemesterType;
                        requestProtectedAction(() => {
                          setDb(prev => ({
                            ...prev,
                            [key]: { ...prev[key], semesters: val }
                          }));
                        });
                      }}
                      className="text-xs font-bold bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="1">1º Semestre</option>
                      <option value="2">2º Semestre</option>
                      <option value="both">Ambos (1º e 2º)</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDeleteUc(key)}
                      className="text-red-400 hover:text-red-600 p-1.5 font-bold text-xs rounded-lg hover:bg-red-50 transition-all"
                      title="Excluir UC"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETALHES DA UNIDADE SELECIONADA */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex border-b border-slate-200 mb-6 gap-2">
            {(['geral', 'sa', 'cronograma'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'geral' ? 'Estrutura Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : 'Cronograma'}
              </button>
            ))}
          </div>

          {/* ESTRUTURA GERAL DA UC */}
          {activeTab === 'geral' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Capacidades Técnicas</h4>
                  <button
                    onClick={() => requestProtectedAction(() => updateUnitField(u => { u.general.technicalCapacities.push('Nova Capacidade'); }))}
                    className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-bold"
                  >
                    + Add
                  </button>
                </div>
                {unit.general.technicalCapacities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable
                      html={cap}
                      onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })}
                      className="text-xs bg-white rounded border border-slate-200"
                    />
                    <button
                      onClick={() => requestProtectedAction(() => updateUnitField(u => { u.general.technicalCapacities.splice(i, 1); }))}
                      className="text-red-400 hover:text-red-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Socioemocionais</h4>
                  <button
                    onClick={() => requestProtectedAction(() => updateUnitField(u => { u.general.socioemotionalCapacities.push('Nova Capacidade'); }))}
                    className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-bold"
                  >
                    + Add
                  </button>
                </div>
                {unit.general.socioemotionalCapacities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable
                      html={cap}
                      onChange={(val) => updateUnitField(u => { u.general.socioemotionalCapacities[i] = val; })}
                      className="text-xs bg-white rounded border border-slate-200"
                    />
                    <button
                      onClick={() => requestProtectedAction(() => updateUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); }))}
                      className="text-red-400 hover:text-red-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Conhecimentos</h4>
                  <button
                    onClick={() => requestProtectedAction(() => updateUnitField(u => { u.general.knowledge.push('Novo Conhecimento'); }))}
                    className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-bold"
                  >
                    + Add
                  </button>
                </div>
                {unit.general.knowledge.map((know, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable
                      html={know}
                      onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })}
                      className="text-xs bg-white rounded border border-slate-200"
                    />
                    <button
                      onClick={() => requestProtectedAction(() => updateUnitField(u => { u.general.knowledge.splice(i, 1); }))}
                      className="text-red-400 hover:text-red-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL DE AUTENTICAÇÃO POR SENHA (mecanicatop) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-lg">
              🔒
            </div>
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Ação Protegida</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Digite a senha para autorizar a alteração ou exclusão na SMO.</p>

            <input
              type="password"
              placeholder="Digite a senha..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmPassword()}
              className={`w-full p-3 rounded-xl border text-center font-mono text-sm outline-none transition-all ${
                authError ? 'border-red-500 bg-red-50 text-red-900' : 'border-slate-200 focus:border-blue-500 bg-slate-50'
              }`}
            />

            {authError && (
              <span className="text-[11px] font-bold text-red-500 block mt-2">
                Senha incorreta! Tente novamente.
              </span>
            )}

            <div className="flex gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmPassword}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
