import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Calendar as CalendarIcon, 
  Check, 
  Save, 
  AlertCircle 
} from 'lucide-react';

export default function PlanoDeAula() {
  // Estado para armazenar as linhas da tabela
  const [linhas, setLinhas] = useState([
    {
      id: 1,
      data: '2026-01-12',
      horas: '4',
      capacidades: 'efwef',
      conhecimentos: '',
      estrategias: '',
      recursos: 'efef',
      statusOk: false
    }
  ]);

  // Função para adicionar uma nova linha
  const adicionarLinha = () => {
    const novaLinha = {
      id: Date.now(),
      data: '',
      horas: '',
      capacidades: '',
      conhecimentos: '',
      estrategias: '',
      recursos: '',
      statusOk: false
    };
    setLinhas([...linhas, novaLinha]);
  };

  // Função para remover uma linha
  const removerLinha = (id) => {
    setLinhas(linhas.filter(linha => linha.id !== id));
  };

  // Função para atualizar os campos de texto da linha
  const atualizarCampo = (id, campo, valor) => {
    setLinhas(linhas.map(linha => {
      if (linha.id === id) {
        return { ...linha, [campo]: valor };
      }
      return linha;
    }));
  };

  // Função para alternar o status do "OK"
  const alternarOk = (id) => {
    setLinhas(linhas.map(linha => {
      if (linha.id === id) {
        return { ...linha, statusOk: !linha.statusOk };
      }
      return linha;
    }));
  };

  // Função para formatar a exibição da data (ex: Segunda-Feira)
  const formatarDiaSemana = (dataStr) => {
    if (!dataStr) return '';
    const [ano, mes, dia] = dataStr.split('-');
    const data = new Date(ano, mes - 1, dia);
    if (isNaN(data.getTime())) return '';
    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    return dias[data.getDay()];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-wide text-gray-900 uppercase">
            Plano de Ensino & Cronograma
          </h2>
          <p className="text-sm text-gray-500">
            Planejamento detalhado das aulas e carga horária
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={adicionarLinha}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm"
          >
            <Plus size={18} />
            INCLUIR LINHA
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-red-500/20 text-sm"
          >
            <Printer size={18} />
            IMPRIMIR CRONOGRAMA
          </button>
        </div>
      </div>

      {/* Tabela de Planejamento */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold w-36">Data</th>
                <th className="py-3 px-4 font-semibold w-20">Horas</th>
                <th className="py-3 px-4 font-semibold">Capacidades</th>
                <th className="py-3 px-4 font-semibold">Conhecimentos</th>
                <th className="py-3 px-4 font-semibold">Estratégias / Metodologia</th>
                <th className="py-3 px-4 font-semibold">Recursos</th>
                <th className="py-3 px-4 font-semibold text-center w-20">OK</th>
                <th className="py-3 px-4 font-semibold text-center w-24">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {linhas.map((linha) => (
                <tr key={linha.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Data */}
                  <td className="py-3 px-4 align-top">
                    <div className="flex flex-col gap-1">
                      <input
                        type="date"
                        value={linha.data}
                        onChange={(e) => atualizarCampo(linha.id, 'data', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <span className="text-[10px] text-gray-400 capitalize px-1">
                        {formatarDiaSemana(linha.data)}
                      </span>
                    </div>
                  </td>

                  {/* Horas */}
                  <td className="py-3 px-4 align-top">
                    <input
                      type="number"
                      value={linha.horas}
                      onChange={(e) => atualizarCampo(linha.id, 'horas', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-center"
                    />
                  </td>

                  {/* Capacidades */}
                  <td className="py-3 px-4 align-top">
                    <textarea
                      rows="2"
                      value={linha.capacidades}
                      onChange={(e) => atualizarCampo(linha.id, 'capacidades', e.target.value)}
                      placeholder="Capacidades..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  </td>

                  {/* Conhecimentos */}
                  <td className="py-3 px-4 align-top">
                    <textarea
                      rows="2"
                      value={linha.conhecimentos}
                      onChange={(e) => atualizarCampo(linha.id, 'conhecimentos', e.target.value)}
                      placeholder="Conhecimentos..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  </td>

                  {/* Estratégias / Metodologia */}
                  <td className="py-3 px-4 align-top">
                    <textarea
                      rows="2"
                      value={linha.estrategias}
                      onChange={(e) => atualizarCampo(linha.id, 'estrategias', e.target.value)}
                      placeholder="Estratégias..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  </td>

                  {/* Recursos */}
                  <td className="py-3 px-4 align-top">
                    <textarea
                      rows="2"
                      value={linha.recursos}
                      onChange={(e) => atualizarCampo(linha.id, 'recursos', e.target.value)}
                      placeholder="Recursos..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  </td>

                  {/* Campo OK (Clicável) */}
                  <td className="py-3 px-4 align-middle text-center">
                    <button
                      type="button"
                      onClick={() => alternarOk(linha.id)}
                      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        linha.statusOk
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm shadow-emerald-500/30'
                          : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {linha.statusOk ? (
                        <span className="flex items-center gap-1">
                          <Check size={14} /> OK
                        </span>
                      ) : (
                        'OK'
                      )}
                    </button>
                  </td>

                  {/* Ações */}
                  <td className="py-3 px-4 align-middle text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={adicionarLinha}
                        title="Adicionar linha abaixo"
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removerLinha(linha.id)}
                        title="Remover linha"
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {linhas.length === 0 && (
            <div className="py-8 text-center text-gray-400 text-sm">
              Nenhuma linha cadastrada. Clique em "Incluir Linha" para começar.
            </div>
          )}
        </div>
    </div>
  );
}
