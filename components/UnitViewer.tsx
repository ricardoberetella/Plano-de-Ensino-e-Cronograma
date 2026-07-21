import React, { useState } from 'react';

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

interface FullUnitData {
  id: string; // Sigla definida pelo usuário (ex: LIDT)
  name: string; // Nome completo
  semesters: SemesterType; // 1, 2 ou Ambos
  general: GeneralCompetencies;
  learningSituations: LearningSituation[];
}

const PASSWORD_REQUIRED = 'mecanicatop';

const INITIAL_DATABASE: Record<string, FullUnitData> = {
  LIDT: {
    id: 'LIDT',
    name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
    semesters: '1',
    general: {
      technicalCapacities: ['Interpretar projeções ortogonais (1º e 3º diedro).'],
      socioemotionalCapacities: ['Rigor técnico e atenção aos detalhes.'],
      knowledge: ['Formatos de papel e normas ABNT.']
    },
    learningSituations: []
  },
  CDMAT: {
    id: 'CDMAT',
    name: 'CIÊNCIAS DOS MATERIAIS',
    semesters: '1',
    general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
    learningSituations: []
  },
  CRD: {
    id: 'CRD',
    name: 'CONTROLE DIMENSIONAL',
    semesters: '2',
    general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
    learningSituations: []
  },
  FUSI: {
    id: 'FUSI',
    name: 'FUNDAMENTOS DA USINAGEM',
    semesters: 'both',
    general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
    learningSituations: []
  }
};

export default function App() {
  const [db, setDb] = useState<Record<string, FullUnitData>>(INITIAL_DATABASE);
  const [selectedUcId, setSelectedUcId] = useState<string | null>('LIDT');

  // SEGURANÇA E SENHA
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // MODAL DE CRIAR / EDITAR UC
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUcKey, setEditingUcKey] = useState<string | null>(null); // null = criar, string = editar existente
  const [inputSigla, setInputSigla] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputSemester, setInputSemester] = useState<SemesterType>('1');

  // Execução com verificação de senha
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

  // Abrir Modal para Criar
  const handleOpenCreateModal = () => {
    executeWithAuth(() => {
      setEditingUcKey(null);
      setInputSigla('');
      setInputName('');
      setInputSemester('1');
      setIsCreateModalOpen(true);
    });
  };

  // Abrir Modal para Editar Sigla/Nome/Semestre
  const handleOpenEditModal = (uc: FullUnitData) => {
    executeWithAuth(() => {
      setEditingUcKey(uc.id);
      setInputSigla(uc.id);
      setInputName(uc.name);
      setInputSemester(uc.semesters);
      setIsCreateModalOpen(true);
    });
  };

  // Salvar Criação ou Edição de UC
  const handleSaveUcModal = () => {
    const cleanSigla = inputSigla.trim().toUpperCase();
    const cleanName = inputName.trim().toUpperCase();

    if (!cleanSigla || !cleanName) {
      alert('Por favor, informe a Sigla e o Nome da Unidade Curricular.');
      return;
    }

    setDb(prev => {
      const copy = { ...prev };

      if (editingUcKey) {
        // Se mudou a sigla, remove a antiga chave
        if (editingUcKey !== cleanSigla) {
          const oldData = copy[editingUcKey];
          delete copy[editingUcKey];
          copy[cleanSigla] = {
            ...oldData,
            id: cleanSigla,
            name: cleanName,
            semesters: inputSemester
          };
        } else {
          copy[cleanSigla] = {
            ...copy[cleanSigla],
            name: cleanName,
            semesters: inputSemester
          };
        }
      } else {
        // Criar Novo
        copy[cleanSigla] = {
          id: cleanSigla,
          name: cleanName,
          semesters: inputSemester,
          general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
          learningSituations: []
        };
      }

      return copy;
    });

    setSelectedUcId(cleanSigla);
    setIsCreateModalOpen(false);
  };

  // Excluir UC
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

  const activeUnit = selectedUcId && db[selectedUcId] ? db[selectedUcId] : null;

  return (
    <div className="w-full bg-slate-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
        
        {/* CABEÇALHO COM MODO EDICÃO */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">EDITAR PLANO DE ENSINO</h1>
          <button
            onClick={() => executeWithAuth(() => {})}
            className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
              isEditable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {isEditable ? '🔓 Modo Edição (Liberado)' : '🔒 Modo Leitura (Bloqueado)'}
          </button>
        </div>

        {/* ESTRUTURA DE UNIDADES (EXATAMENTE COMO NO SEU PRINT) */}
        <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              III. ESTRUTURA DE UNIDADES
            </h2>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1"
            >
              + NOVA UC
            </button>
          </div>

          {/* LISTA DE UCs */}
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
                    
                    {/* SIGLA E NOME */}
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-black font-mono">
                        {unit.id}
                      </span>
                      <span className="font-extrabold text-xs text-slate-800 uppercase">
                        {unit.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {/* BADGE DO SEMESTRE */}
                    <span
                      className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase ${
                        unit.semesters === '1'
                          ? 'bg-blue-100 text-blue-700'
                          : unit.semesters === '2'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {unit.semesters === '1' ? '1º Semestre' : unit.semesters === '2' ? '2º Semestre' : 'Ambos'}
                    </span>

                    {/* EDITAR */}
                    <button
                      type="button"
                      title="Editar Unidade"
                      onClick={() => handleOpenEditModal(unit)}
                      className="text-slate-400 hover:text-blue-600 p-1 text-xs"
                    >
                      ✏️
                    </button>

                    {/* EXCLUIR (ÍCONE DE 'X' IGUAL AO PRINT) */}
                    <button
                      type="button"
                      title="Excluir Unidade"
                      onClick={() => handleDeleteUc(unit.id)}
                      className="text-slate-300 hover:text-red-500 font-bold p-1 text-base leading-none"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTOES INFERIORES DA PÁGINA */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-400 uppercase hover:bg-slate-100">
            DESCARTAR
          </button>
          <button type="button" className="px-6 py-2.5 rounded-xl text-xs font-black bg-slate-900 text-white uppercase hover:bg-black shadow-lg">
            CONFIRMAR E SALVAR
          </button>
        </div>

      </div>

      {/* MODAL PARA CRIAR / EDITAR UC (SIGLA + NOME + SEMESTRE) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase mb-4">
              {editingUcKey ? 'Editar Unidade Curricular' : 'Nova Unidade Curricular'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Sigla da Unidade (Você define)
                </label>
                <input
                  type="text"
                  placeholder="Ex: LIDT, FUSI, CRD"
                  value={inputSigla}
                  onChange={(e) => setInputSigla(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Nome Completo da Unidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Semestre de Destino
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '1', label: '1º Semestre' },
                    { id: '2', label: '2º Semestre' },
                    { id: 'both', label: 'Ambos' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInputSemester(opt.id as SemesterType)}
                      className={`py-2 rounded-xl text-xs font-black uppercase border transition-all ${
                        inputSemester === opt.id
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
                onClick={handleSaveUcModal}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md"
              >
                {editingUcKey ? 'Salvar Alterações' : 'Criar Unidade'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE SENHA */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-lg">🔒</div>
            <h3 className="text-base font-black text-slate-800 uppercase">Acesso Restrito</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Digite a senha para gerenciar as Unidades Curriculares.</p>

            <input
              type="password"
              placeholder="Digite a senha..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmPassword()}
              className={`w-full p-3 rounded-xl border text-center font-mono text-sm outline-none ${
                authError ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'
              }`}
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
