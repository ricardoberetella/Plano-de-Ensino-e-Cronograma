import React, { useState, useMemo } from 'react';

type SemesterType = '1' | '2' | 'both';

interface FullUnitData {
  id: string; // Sigla da UC (ex: PRUSC, METIND, LIDT)
  name: string; // Nome completo
  semesters: SemesterType;
}

const PASSWORD_REQUIRED = 'mecanicatop';

// Base de dados inicial
const INITIAL_DATABASE: Record<string, FullUnitData> = {
  LIDT: { id: 'LIDT', name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO', semesters: '1' },
  CDMAT: { id: 'CDMAT', name: 'CIÊNCIAS DOS MATERIAIS', semesters: '1' },
  PRUSC: { id: 'PRUSC', name: 'PROCESSOS DE USINAGEM CONVENCIONAL', semesters: '2' },
  METIND: { id: 'METIND', name: 'METROLOGIA INDUSTRIAL', semesters: '2' }
};

export default function App() {
  const [db, setDb] = useState<Record<string, FullUnitData>>(INITIAL_DATABASE);
  
  // SEMESTRE SELECIONADO NA PARTE SUPERIOR (1 ou 2)
  const [selectedSemester, setSelectedSemester] = useState<'1' | '2'>('2');
  const [activeUcId, setActiveUcId] = useState<string | null>('PRUSC');

  // SEGURANÇA E AUTENTICAÇÃO
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // MODAL DE CRIAR / EDITAR UC
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUcKey, setEditingUcKey] = useState<string | null>(null);
  const [inputSigla, setInputSigla] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputSemester, setInputSemester] = useState<SemesterType>('1');

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

  // UCs filtradas estritamente pelo semestre ativo da parte superior
  const currentSemesterUnits = useMemo(() => {
    return Object.values(db).filter(
      unit => unit.semesters === selectedSemester || unit.semesters === 'both'
    );
  }, [db, selectedSemester]);

  // Handlers do Modal
  const handleOpenCreateModal = () => {
    executeWithAuth(() => {
      setEditingUcKey(null);
      setInputSigla('');
      setInputName('');
      setInputSemester(selectedSemester);
      setIsCreateModalOpen(true);
    });
  };

  const handleOpenEditModal = (uc: FullUnitData, e: React.MouseEvent) => {
    e.stopPropagation();
    executeWithAuth(() => {
      setEditingUcKey(uc.id);
      setInputSigla(uc.id);
      setInputName(uc.name);
      setInputSemester(uc.semesters);
      setIsCreateModalOpen(true);
    });
  };

  const handleDeleteUc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    executeWithAuth(() => {
      setDb(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      if (activeUcId === id) setActiveUcId(null);
    });
  };

  const handleSaveUcModal = () => {
    const cleanSigla = inputSigla.trim().toUpperCase();
    const cleanName = inputName.trim().toUpperCase();

    if (!cleanSigla || !cleanName) {
      alert('Informe a Sigla e o Nome Completo da Unidade Curricular.');
      return;
    }

    setDb(prev => {
      const copy = { ...prev };
      if (editingUcKey && editingUcKey !== cleanSigla) {
        delete copy[editingUcKey];
      }
      copy[cleanSigla] = {
        id: cleanSigla,
        name: cleanName,
        semesters: inputSemester
      };
      return copy;
    });

    setActiveUcId(cleanSigla);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* BARRA SUPERIOR: SELEÇÃO DE SEMESTRE E UCS (ESTRUTURA PRINCIPAL) */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-200">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                UNIDADES CURRICULARES
              </span>
              <span className="text-slate-300">|</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                Mecânico de Usinagem Convencional
              </span>
            </div>

            <button
              onClick={() => executeWithAuth(() => {})}
              className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
                isEditable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white shadow-sm'
              }`}
            >
              {isEditable ? '🔓 Modo Edição (Liberado)' : '🔒 Modo Leitura (Bloqueado)'}
            </button>
          </div>

          {/* 1. SELEÇÃO DO SEMESTRE (PARTE SUPERIOR) */}
          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setSelectedSemester('1');
                setActiveUcId(null);
              }}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                selectedSemester === '1'
                  ? 'bg-slate-200 text-slate-700 shadow-inner'
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              1º SEMESTRE
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedSemester('2');
                setActiveUcId(null);
              }}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                selectedSemester === '2'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              2º SEMESTRE
            </button>
          </div>

          {/* 2. BOTÕES DAS UCs DO SEMESTRE SELECIONADO + BOTÃO NOVA UC */}
          <div className="flex flex-wrap items-center gap-3">
            {currentSemesterUnits.map(unit => {
              const isActive = activeUcId === unit.id;

              return (
                <div
                  key={unit.id}
                  onClick={() => setActiveUcId(unit.id)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-blue-200 ring-2 ring-blue-400'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{unit.id}</span>

                  {/* AÇÕES DE EDIÇÃO/EXCLUSÃO NA PRÓPRIA UC */}
                  <div className="flex items-center gap-1 ml-1 opacity-80 hover:opacity-100">
                    <button
                      type="button"
                      title="Editar UC"
                      onClick={(e) => handleOpenEditModal(unit, e)}
                      className={`p-0.5 rounded hover:bg-black/10 text-[10px] ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      title="Excluir UC"
                      onClick={(e) => handleDeleteUc(unit.id, e)}
                      className={`p-0.5 rounded hover:bg-black/10 text-xs font-bold ${
                        isActive ? 'text-white' : 'text-slate-300 hover:text-red-500'
                      }`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-3 rounded-2xl transition-all shadow-md flex items-center gap-1"
            >
              + NOVA UC ({selectedSemester}º SEM)
            </button>
          </div>

        </div>

        {/* 3. ÁREA DE CONTEÚDO DA UC SELECIONADA (SÓ EXIBE A UC ATIVA) */}
        {activeUcId && db[activeUcId] && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase block">
                  Unidade Curricular Selecionada:
                </span>
                <h2 className="text-base font-black text-slate-800 uppercase tracking-wide">
                  {db[activeUcId].id} - {db[activeUcId].name}
                </h2>
              </div>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-100 text-slate-600 uppercase">
                {db[activeUcId].semesters === 'both' ? '1º e 2º Semestres' : `${db[activeUcId].semesters}º Semestre`}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
              Aqui você edita e gerencia o Plano de Ensino da unidade <strong>{db[activeUcId].name}</strong>.
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
              <button type="button" className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-400 uppercase hover:bg-slate-100">
                DESCARTAR
              </button>
              <button type="button" className="px-6 py-2.5 rounded-xl text-xs font-black bg-slate-900 text-white uppercase hover:bg-black shadow-lg">
                CONFIRMAR E SALVAR
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL PARA CRIAR / EDITAR UC */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase mb-4">
              {editingUcKey ? 'Editar Unidade Curricular' : 'Nova Unidade Curricular'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Sigla da Unidade (Ex: PRUSC, METIND)
                </label>
                <input
                  type="text"
                  placeholder="Ex: PRUSC"
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
                  placeholder="Ex: PROCESSOS DE USINAGEM CONVENCIONAL"
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

      {/* MODAL DE AUTENTICAÇÃO POR SENHA */}
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
