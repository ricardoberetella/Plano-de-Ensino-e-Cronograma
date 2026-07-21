import React, { useState, useRef } from 'react';

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
  date: string;
  hours: number;
  capacities: string;
  knowledge: string;
  strategy: string;
  resources: string;
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
        title: 'Situação de Aprendizagem 1 - Leitura de Desenho do Conjunto Mecânico',
        contextualization: 'O aluno recebe uma folha de desenho técnico de um conjunto usinado.',
        challenge: 'Identificar as cotas e rugosidades solicitadas pelo cliente.'
      }
    ],
    schedule: [
      { id: '1', date: '10/02/2026', hours: 4, capacities: 'Interpretar projeções', knowledge: 'Normas ABNT', strategy: 'Aula Prática em Sala', resources: 'Folhas de Desenho, Régua, Paquímetro' }
    ]
  },
  CDMAT: {
    id: 'CDMAT',
    name: 'CIÊNCIAS DOS MATERIAIS',
    semesters: '1',
    general: { technicalCapacities: ['Identificar propriedades mecânicas dos metais.'], socioemotionalCapacities: ['Organização'], knowledge: ['Ensaios mecânicos'] },
    learningSituations: [],
    schedule: []
  },
  CRD: {
    id: 'CRD',
    name: 'CONTROLE DIMENSIONAL',
    semesters: '2',
    general: { technicalCapacities: ['Realizar medições com paquímetro e micrometro.'], socioemotionalCapacities: ['Precisão'], knowledge: ['Metrologia dimensional'] },
    learningSituations: [],
    schedule: []
  },
  FUSI: {
    id: 'FUSI',
    name: 'FUNDAMENTOS DA USINAGEM',
    semesters: 'both',
    general: { technicalCapacities: ['Operar torno e fresadora convencional.'], socioemotionalCapacities: ['Segurança no trabalho'], knowledge: ['Parâmetros de corte'] },
    learningSituations: [],
    schedule: []
  }
};

// Componente para Edição de Texto com Foco
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
        disabled ? 'cursor-default opacity-90' : 'bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none'
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function SmoothManager() {
  const [db, setDb] = useState<Record<string, FullUnitData>>(INITIAL_DATABASE);
  const [currentUc, setCurrentUc] = useState<string>('LIDT');
  const [activeTab, setActiveTab] = useState<'geral' | 'sa' | 'cronograma'>('geral');

  // Estado de Bloqueio por Senha
  const [isEditable, setIsEditable] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const unit = db[currentUc] || INITIAL_DATABASE['LIDT'];

  const handleUnlockRequest = () => {
    if (isEditable) {
      setIsEditable(false); // Trava novamente sem pedir senha
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

  // Separação das UCs por semestre
  const sem1Units = Object.keys(db).filter(k => db[k].semesters === '1' || db[k].semesters === 'both');
  const sem2Units = Object.keys(db).filter(k => db[k].semesters === '2' || db[k].semesters === 'both');

  return (
    <div className="w-full bg-slate-100 min-h-screen p-6 font-sans">
      
      {/* PAINEL PRINCIPAL */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        
        {/* CABEÇALHO DA SMO E BOTÃO DE BLOQUEIO */}
        <div className="border-b border-slate-100 pb-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">EDITAR PLANO DE ENSINO</h1>
              <p className="text-xs text-slate-400 uppercase font-bold">SMO - Modelo SENAI de Educação</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* STATUS DE MODO DE EDIÇÃO COM SENHA */}
              <button
                type="button"
                onClick={handleUnlockRequest}
                className={`flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl transition-all shadow-sm ${
                  isEditable 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
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

        {/* III. ESTRUTURA DE UNIDADES CURRICULARES (DIVIDIDA POR SEMESTRES) */}
        <div className="mb-8">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-4">
            III. Estrutura de Unidades Curriculares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1º SEMESTRE */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-black text-blue-700 uppercase tracking-wider">1º Semestre</h3>
                {isEditable && (
                  <button
                    onClick={() => handleAddUc('1')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all"
                  >
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
                      <RichEditable
                        html={item.name}
                        onChange={(val) => updateUnitField(u => { u.name = val; })}
                        disabled={!isEditable}
                        className="font-bold text-xs text-slate-800"
                      />

                      {isEditable && (
                        <div className="flex items-center gap-2 ml-2">
                          <select
                            value={item.semesters}
                            onChange={(e) => {
                              const val = e.target.value as SemesterType;
                              setDb(prev => ({ ...prev, [key]: { ...prev[key], semesters: val } }));
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-bold bg-slate-100 border border-slate-200 rounded px-1.5 py-1 text-slate-700"
                          >
                            <option value="1">1º Sem</option>
                            <option value="2">2º Sem</option>
                            <option value="both">Ambos</option>
                          </select>

                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDeleteUc(key); }}
                            className="text-red-400 hover:text-red-600 font-bold text-xs px-1"
                          >
                            ✕
                          </button>
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
                  <button
                    onClick={() => handleAddUc('2')}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all"
                  >
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
                      <RichEditable
                        html={item.name}
                        onChange={(val) => updateUnitField(u => { u.name = val; })}
                        disabled={!isEditable}
                        className="font-bold text-xs text-slate-800"
                      />

                      {isEditable && (
                        <div className="flex items-center gap-2 ml-2">
                          <select
                            value={item.semesters}
                            onChange={(e) => {
                              const val = e.target.value as SemesterType;
                              setDb(prev => ({ ...prev, [key]: { ...prev[key], semesters: val } }));
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-bold bg-slate-100 border border-slate-200 rounded px-1.5 py-1 text-slate-700"
                          >
                            <option value="1">1º Sem</option>
                            <option value="2">2º Sem</option>
                            <option value="both">Ambos</option>
                          </select>

                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDeleteUc(key); }}
                            className="text-red-400 hover:text-red-600 font-bold text-xs px-1"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS REESTABELECIDA */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex border-b border-slate-200 mb-6 gap-2">
            {(['geral', 'sa', 'cronograma'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'geral' ? 'Estrutura Geral' : tab === 'sa' ? 'Situações de Aprendizagem' : 'Cronograma'}
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
                    <button
                      onClick={() => updateUnitField(u => { u.general.technicalCapacities.push('Nova Capacidade'); })}
                      className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-bold"
                    >
                      + Add
                    </button>
                  )}
                </div>
                {unit.general.technicalCapacities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable
                      html={cap}
                      onChange={(val) => updateUnitField(u => { u.general.technicalCapacities[i] = val; })}
                      disabled={!isEditable}
                      className="text-xs bg-white rounded border border-slate-200"
                    />
                    {isEditable && (
                      <button
                        onClick={() => updateUnitField(u => { u.general.technicalCapacities.splice(i, 1); })}
                        className="text-red-400 hover:text-red-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Socioemocionais</h4>
                  {isEditable && (
                    <button
                      onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.push('Nova Capacidade'); })}
                      className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-bold"
                    >
                      + Add
                    </button>
                  )}
                </div>
                {unit.general.socioemotionalCapacities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable
                      html={cap}
                      onChange={(val) => updateUnitField(u => { u.general.socioemotionalCapacities[i] = val; })}
                      disabled={!isEditable}
                      className="text-xs bg-white rounded border border-slate-200"
                    />
                    {isEditable && (
                      <button
                        onClick={() => updateUnitField(u => { u.general.socioemotionalCapacities.splice(i, 1); })}
                        className="text-red-400 hover:text-red-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Conhecimentos</h4>
                  {isEditable && (
                    <button
                      onClick={() => updateUnitField(u => { u.general.knowledge.push('Novo Conhecimento'); })}
                      className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-0.5 rounded font-bold"
                    >
                      + Add
                    </button>
                  )}
                </div>
                {unit.general.knowledge.map((know, i) => (
                  <div key={i} className="flex items-center gap-1 my-1">
                    <RichEditable
                      html={know}
                      onChange={(val) => updateUnitField(u => { u.general.knowledge[i] = val; })}
                      disabled={!isEditable}
                      className="text-xs bg-white rounded border border-slate-200"
                    />
                    {isEditable && (
                      <button
                        onClick={() => updateUnitField(u => { u.general.knowledge.splice(i, 1); })}
                        className="text-red-400 hover:text-red-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
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
                  <button
                    onClick={() => updateUnitField(u => {
                      u.learningSituations.push({
                        id: `SA_${Date.now().toString().slice(-3)}`,
                        title: 'Nova Situação de Aprendizagem',
                        contextualization: 'Descrição do contexto...',
                        challenge: 'Descrição do desafio...'
                      });
                    })}
                    className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl hover:bg-blue-700"
                  >
                    + Criar S.A.
                  </button>
                )}
              </div>

              {unit.learningSituations.map((sa, index) => (
                <div key={sa.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <RichEditable
                      html={sa.title}
                      onChange={(val) => updateUnitField(u => { u.learningSituations[index].title = val; })}
                      disabled={!isEditable}
                      className="font-bold text-sm text-slate-800"
                    />
                    {isEditable && (
                      <button
                        onClick={() => updateUnitField(u => { u.learningSituations.splice(index, 1); })}
                        className="text-red-400 hover:text-red-600 text-xs font-bold"
                      >
                        Excluir S.A.
                      </button>
                    )}
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-500 uppercase block mb-1">Contextualização:</strong>
                    <RichEditable
                      html={sa.contextualization}
                      onChange={(val) => updateUnitField(u => { u.learningSituations[index].contextualization = val; })}
                      disabled={!isEditable}
                      className="bg-white border border-slate-200 rounded"
                    />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-500 uppercase block mb-1">Desafio / Problema:</strong>
                    <RichEditable
                      html={sa.challenge}
                      onChange={(val) => updateUnitField(u => { u.learningSituations[index].challenge = val; })}
                      disabled={!isEditable}
                      className="bg-white border border-slate-200 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ABA 3: CRONOGRAMA DE AULAS */}
          {activeTab === 'cronograma' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-700 uppercase">Detalhamento das Aulas</h3>
                {isEditable && (
                  <button
                    onClick={() => updateUnitField(u => {
                      u.schedule.push({
                        id: Date.now().toString(),
                        date: '00/00/0000',
                        hours: 4,
                        capacities: 'Capacidade abordada',
                        knowledge: 'Conhecimento abordado',
                        strategy: 'Estratégia docente',
                        resources: 'Recursos didáticos'
                      });
                    })}
                    className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl hover:bg-blue-700"
                  >
                    + Adicionar Aula
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-black uppercase border-b border-slate-200">
                      <th className="p-3">Data</th>
                      <th className="p-3">Carga (h)</th>
                      <th className="p-3">Capacidade</th>
                      <th className="p-3">Conhecimento</th>
                      <th className="p-3">Estratégia</th>
                      <th className="p-3">Recursos</th>
                      {isEditable && <th className="p-3">Ações</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {unit.schedule.map((row, index) => (
                      <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-2">
                          <RichEditable html={row.date} onChange={v => updateUnitField(u => { u.schedule[index].date = v; })} disabled={!isEditable} />
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
                        <td className="p-2">
                          <RichEditable html={row.resources} onChange={v => updateUnitField(u => { u.schedule[index].resources = v; })} disabled={!isEditable} />
                        </td>
                        {isEditable && (
                          <td className="p-2">
                            <button
                              onClick={() => updateUnitField(u => { u.schedule.splice(index, 1); })}
                              className="text-red-400 hover:text-red-600 font-bold"
                            >
                              ✕
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL DE AUTENTICAÇÃO POR SENHA */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-lg">
              🔒
            </div>
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Acesso de Edição</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Digite a senha para desbloquear a edição e exclusão de itens.</p>

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
                Liberar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
