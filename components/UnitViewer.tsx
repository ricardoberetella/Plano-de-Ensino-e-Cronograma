import React, { useState } from 'react';
import { CurricularUnit } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit;
  onBack: () => void;
}

export default function UnitViewer({ unit, onBack }: UnitViewerProps) {
  const [modalAberto, setModalAberto] = useState(false);
  
  // Estados iniciados como arrays vazios
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
    <div className="p-6 bg-white rounded-xl shadow-lg relative max-w-6xl mx-auto space-y-6">
      {/* Botão de Voltar / Cabeçalho da Unidade */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <button 
            onClick={onBack}
            className="text-xs font-bold text-slate-400 hover:text-blue-600 mb-2 uppercase tracking-wider block"
          >
            ← Voltar para a Lista
          </button>
          <h1 className="text-xl font-black text-slate-900 uppercase">
            {unit.code} - {unit.name}
          </h1>
        </div>
      </div>

      {/* Seção da Matriz Curricular com o Menu Janela ao lado */}
      <div className="flex items-center gap-4 pt-2">
        <h2 className="text-blue-700 font-bold text-sm tracking-wide uppercase">
          MATRIZ CURRICULAR (CAPACIDADES E CONHECIMENTOS)
        </h2>
        <div className="relative">
          <button 
            onClick={() => setModalAberto(!modalAberto)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded shadow transition"
          >
            + Adicionar Item ▼
          </button>

          {/* Menu Janela (Dropdown) */}
          {modalAberto && (
            <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
              <button 
                onClick={() => adicionarItem('tecnica')}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Capacidade Técnica
              </button>
              <button 
                onClick={() => adicionarItem('socioemocional')}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                Capacidade Socioemocional
              </button>
              <button 
                onClick={() => adicionarItem('conhecimento')}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                Conhecimento
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabela Principal */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Cabeçalho centralizado */}
        <div className="grid grid-cols-2 bg-[#121826] text-white font-bold text-xs py-3 px-4 text-center">
          <div className="text-center">CAPACIDADES (TÉCNICAS E SOCIOEMOCIONAIS)</div>
          <div className="text-center">CONHECIMENTOS</div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-200">
          {/* Coluna 1: Capacidades Técnicas e Socioemocionais */}
          <div className="p-4 space-y-4">
            <div>
              <span className="text-xs font-bold text-gray-800 uppercase block mb-1">Capacidades Técnicas</span>
              {capacidadesTecnicas.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Nenhuma capacidade técnica adicionada.</p>
              ) : (
                capacidadesTecnicas.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 border border-gray-200 rounded text-sm mb-1 text-slate-700">
                    {item}
                  </div>
                ))
              )}
            </div>

            <div>
              <span className="text-xs font-bold text-gray-800 uppercase block mb-1">Capacidades Socioemocionais</span>
              {capacidadesSocioemocionais.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Nenhuma capacidade socioemocional adicionada.</p>
              ) : (
                capacidadesSocioemocionais.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 border border-gray-200 rounded text-sm mb-1 text-slate-700">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Coluna 2: Conhecimentos */}
          <div className="p-4 space-y-4">
            <div>
              <span className="text-xs font-bold text-gray-800 uppercase block mb-1">Conhecimentos</span>
              {conhecimentos.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Nenhum conhecimento adicionado.</p>
              ) : (
                conhecimentos.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 border border-gray-200 rounded text-sm mb-1 text-slate-700">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
