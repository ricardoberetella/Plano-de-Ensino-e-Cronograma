import React, abaReact, { useState } from 'react';
import { CurricularUnit } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit;
  onBack: () => void;
}

export default function UnitViewer({ unit, onBack }: UnitViewerProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'matriz' | 'situacao' | 'cronograma'>('matriz');
  
  const [capacidadesTecnicas, setCapacidadesTecnicas] = useState<string[]>([]);
  const [capacidadesSocioemocionais, setCapacidadesSocioemocionais] = useState<string[]>([]);
  const [conhecimentos, setConhecimentos] = useState<string[]>([]);

  const adicionarItem = (tipo: 'tecnica' | 'socioemocional' | 'conhecimento') => {
    if (tipo === 'tecnica') {
      const valor = prompt('Digite a Capacidade Técnica:');
      if (valor) setCapacidadesTecnicas([...capacidadesTecnicas, valor]);
    } else if (tipo === 'socioemocional') {
      const valor = prompt('Digite a Capacidade Socioemocional:');
      if (valor) setCapacidadesSocioemocionais([...capacidadesSocioemocionais, valor]);
    } else if (tipo === 'conhecimento') {
      const valor = prompt('Digite o Conhecimento:');
      if (valor) setConhecimentos([...conhecimentos, valor]);
    }
    setModalAberto(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8 space-y-6 w-full">
      {/* Cabeçalho da Unidade e Botão Voltar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-400 hover:text-blue-600 mb-2 uppercase tracking-wider block transition"
          >
            ← Voltar para a Lista
          </button>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            {unit.code} - {unit.name}
          </h1>
        </div>
      </div>

      {/* Abas Internas da Unidade (Matriz, Situação de Aprendizagem, Cronograma) */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setAbaAtiva('matriz')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            abaAtiva === 'matriz' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Matriz Curricular
        </button>
        <button
          onClick={() => setAbaAtiva('situacao')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            abaAtiva === 'situacao' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Situação de Aprendizagem
        </button>
        <button
          onClick={() => setAbaAtiva('cronograma')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            abaAtiva === 'cronograma' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Cronograma
        </button>
      </div>

      {/* Conteúdo da Aba: Matriz Curricular */}
      {abaAtiva === 'matriz' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pt-2">
            <h2 className="text-blue-700 font-extrabold text-xs lg:text-sm tracking-wide uppercase">
              Matriz Curricular (Capacidades e Conhecimentos)
            </h2>
            <div className="relative">
              <button 
                onClick={() => setModalAberto(!modalAberto)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md transition flex items-center gap-2"
              >
                + Adicionar Item ▼
              </button>

              {modalAberto && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-2">
                  <button 
                    onClick={() => adicionarItem('tecnica')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Capacidade Técnica
                  </button>
                  <button 
                    onClick={() => adicionarItem('socioemocional')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
                  >
                    Capacidade Socioemocional
                  </button>
                  <button 
                    onClick={() => adicionarItem('conhecimento')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
                  >
                    Conhecimento
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0B1120] text-white font-black text-xs py-3.5 px-4 tracking-wider text-center">
              <div>Capacidades (Técnicas e Socioemocionais)</div>
              <div>Conhecimentos</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50/50">
              <div className="p-5 space-y-6">
                <div>
                  <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                    Capacidades Técnicas
                  </span>
                  {capacidadesTecnicas.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Nenhuma capacidade técnica cadastrada.</p>
                  ) : (
                    <div className="space-y-2">
                      {capacidadesTecnicas.map((item, index) => (
                        <div key={index} className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-base font-medium text-slate-800 shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                    Capacidades Socioemocionais
                  </span>
                  {capacidadesSocioemocionais.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Nenhuma capacidade socioemocional cadastrada.</p>
                  ) : (
                    <div className="space-y-2">
                      {capacidadesSocioemocionais.map((item, index) => (
                        <div key={index} className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-base font-medium text-slate-800 shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-6">
                <div>
                  <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                    Conhecimentos
                  </span>
                  {conhecimentos.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Nenhum conhecimento cadastrado.</p>
                  ) : (
                    <div className="space-y-2">
                      {conhecimentos.map((item, index) => (
                        <div key={index} className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-base font-medium text-slate-800 shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba: Situação de Aprendizagem */}
      {abaAtiva === 'situacao' && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-black text-slate-800 uppercase">Situação de Aprendizagem</h3>
          <p className="text-sm text-slate-600">Gerencie aqui as situações de aprendizagem desta unidade curricular.</p>
        </div>
      )}

      {/* Conteúdo da Aba: Cronograma */}
      {abaAtiva === 'cronograma' && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-black text-slate-800 uppercase">Cronograma da Unidade</h3>
          <p className="text-sm text-slate-600">Acompanhe a distribuição de aulas e prazos desta unidade.</p>
        </div>
      )}
    </div>
  );
}
