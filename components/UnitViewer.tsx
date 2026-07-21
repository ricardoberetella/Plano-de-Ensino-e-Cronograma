import React, { useState, useMemo } from 'react';

// Tipos
type SemesterType = '1' | '2';

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
  id: string;
  name: string;
  semester: SemesterType;
  general: GeneralCompetencies;
  learningSituations: LearningSituation[];
}

const PASSWORD_REQUIRED = 'mecanicatop';

const INITIAL_DATABASE: Record<string, FullUnitData> = {
  LIDT: {
    id: 'LIDT',
    name: 'LEITURA E INTERPRETAÇÃO DE DESENHO TÉCNICO',
    semester: '1',
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
    ]
  },
  CDMAT: {
    id: 'CDMAT',
    name: 'CIÊNCIAS DOS MATERIAIS',
    semester: '1',
    general: { technicalCapacities: ['Identificar propriedades dos metais.'], socioemotionalCapacities: ['Organização'], knowledge: ['Ensaios mecânicos'] },
    learningSituations: []
  },
  CRD: {
    id: 'CRD',
    name: 'CONTROLE DIMENSIONAL',
    semester: '2',
    general: { technicalCapacities: ['Realizar medições com paquímetro.'], socioemotionalCapacities: ['Precisão'], knowledge: ['Metrologia dimensional'] },
    learningSituations: []
  },
  FUSI: {
    id: 'FUSI',
    name: 'FUNDAMENTOS DA USINAGEM',
    semester: '2',
    general: { technicalCapacities: ['Operar torno convencional.'], socioemotionalCapacities: ['Segurança no trabalho'], knowledge: ['Parâmetros de corte'] },
    learningSituations: []
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
  
  // PAGINAÇÃO / NAVEGAÇÃO DE SEMESTRE (SÓ MOSTRA O SEMESTRE ATIVO)
  const [currentSemesterPage, setCurrentSemesterPage] = useState<SemesterType>('1');
  const [selectedUcId, setSelectedUcId] = useState<string | null>(null);

  // SEGURANÇA E SENHA
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

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

  // Filtragem estrita por semestre da página ativa
  const currentSemesterUnits = useMemo(() => {
    return Object.values(db).filter(u => u.semester === currentSemesterPage);
  }, [db, currentSemesterPage]);

  // Criar nova UC diretamente no semestre ativo
  const handleAddUc = () => {
    executeWithAuth(() => {
      const name = prompt('Nome da Nova Unidade Curricular:');
      if (!name) return;

      const id = `UC_${Date.now().toString().slice(-4)}`;
      setDb(prev => ({
        ...prev,
        [id]: {
          id,
          name: name.toUpperCase(),
          semester: currentSemesterPage,
          general: { technicalCapacities: [], socioemotionalCapacities: [], knowledge: [] },
          learningSituations: []
        }
      }));
      setSelectedUcId(id);
    });
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

  const handleMoveSemester = (id: string, targetSemester: SemesterType) => {
    executeWithAuth(() => {
      setDb(prev => ({
        ...prev,
        [id]: { ...prev[id], semester: targetSemester }
      }));
      if (selectedUcId === id) setSelectedUcId(null);
    });
  };

  const activeUnit = selectedUcId ? db[selectedUcId] : null;

  return (
    <div className="w-full bg-slate-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">EDITAR PLANO DE ENSINO</h1>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase">SMO - MODELO SENAI DE EDUCAÇÃO</p>
          </div>

          <button
            onClick={() => executeWithAuth(() => {})}
            className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
              isEditable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {isEditable ? '🔓 Modo Edição (Liberado)' : '🔒 Modo Leitura (Bloqueado)'}
          </button>
        </div>

        {/* NAVEGADOR DE PÁGINAS POR SEMESTRE (MENU PRINCIPAL SEPARADO) */}
        <div className="mb-8">
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">
            Selecione a Página do Semestre
          </label>
          <div className="grid grid-cols-2 gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setCurrentSemesterPage('1');
                setSelectedUcId(null);
              }}
              className={`py-3.5 rounded-xl font-black text-xs uppercase transition-all flex items-center justify-center gap-2 ${
                currentSemesterPage === '1'
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
              }`}
            >
              <span>📘</span> 1º Semestre
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentSemesterPage('2');
                setSelectedUcId(null);
              }}
              className={`py-3.5 rounded-xl font-black text-xs uppercase transition-all flex items-center justify-center gap-2 ${
                currentSemesterPage === '2'
                  ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-300'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
              }`}
            >
              <span>📙</span> 2º Semestre
            </button>
          </div>
        </div>

        {/* ESTRUTURA DE UNIDADES CURRICULARES (ISOLADA PELO SEMESTRE ATIVO) */}
        <div className={`p-6 rounded-3xl border transition-all mb-8 ${
          currentSemesterPage === '1' ? 'bg-blue-50/40 border-blue-200' : 'bg-purple-50/40 border-purple-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Página Atual:</span>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                Unidades Curriculares do {currentSemesterPage}º Semestre
              </h2>
            </div>

            <button
              type="button"
              onClick={handleAddUc}
              className={`text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm ${
                currentSemesterPage === '1' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              + NOVA UC ({currentSemesterPage}º SEMESTRE)
            </button>
          </div>

          {currentSemesterUnits.length === 0 ? (
            <div className="text-center py-8 text-xs font-bold text-slate-400 bg-white/60 rounded-2xl border border-dashed border-slate-300">
              Nenhuma Unidade Curricular cadastrada nesta página do {currentSemesterPage}º Semestre.
            </div>
          ) : (
            <div className="space-y-3">
              {currentSemesterUnits.map((unit, index) => {
                const isSelected = selectedUcId === unit.id;

                return (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedUcId(unit.id)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? currentSemesterPage === '1'
                          ? 'border-blue-500 bg-white shadow-md ring-2 ring-blue-100'
                          : 'border-purple-500 bg-white shadow-md ring-2 ring-purple-100'
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

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* BOTAO DE MOVER PARA OUTRO SEMESTRE */}
                      <button
                        type="button"
                        onClick={() => handleMoveSemester(unit.id, currentSemesterPage === '1' ? '2' : '1')}
                        className="text-[10px] font-bold px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all"
                        title={`Mover para o ${currentSemesterPage === '1' ? '2º' : '1º'} Semestre`}
                      >
                        ➡️ Mover p/ {currentSemesterPage === '1' ? '2º' : '1º'} Sem.
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedUcId(unit.id)}
                        className="text-slate-400 hover:text-blue-600 p-1 text-xs"
                      >
                        👁️
                      </button>

                      <button
                        type="button"
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
          )}
        </div>

        {/* DETALHES DA UNIDADE SELECIONADA */}
        {activeUnit && (
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-black text-sm text-slate-800 mb-4">
              DETALHES DA UC: <span className="text-blue-600">{activeUnit.name}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black text-slate-700 uppercase mb-2">Capacidades Técnicas</h4>
                {activeUnit.general.technicalCapacities.map((cap, i) => (
                  <div key={i} className="text-xs text-slate-600 my-1">• {cap}</div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black text-slate-700 uppercase mb-2">Socioemocionais</h4>
                {activeUnit.general.socioemotionalCapacities.map((cap, i) => (
                  <div key={i} className="text-xs text-slate-600 my-1">• {cap}</div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black text-slate-700 uppercase mb-2">Conhecimentos</h4>
                {activeUnit.general.knowledge.map((know, i) => (
                  <div key={i} className="text-xs text-slate-600 my-1">• {know}</div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL DE AUTENTICAÇÃO */}
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
