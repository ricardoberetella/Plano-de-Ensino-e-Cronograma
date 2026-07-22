import React, { useState } from 'react';

interface CronogramaRow {
  horas: number;
  data: string;
  capacidades: string;
  conhecimentos: string;
  estrategias: string;
  recursos: string;
  concluido: boolean;
}

export default function PlanForm() {
  const [linhas, setLinhas] = useState<CronogramaRow[]>([
    {
      horas: 4,
      data: '2026-02-10',
      capacidades: '',
      conhecimentos: '',
      estrategias: '',
      recursos: '',
      concluido: false,
    },
  ]);

  const adicionarLinha = () => {
    setLinhas([
      ...linhas,
      {
        horas: 4,
        data: '',
        capacidades: '',
        conhecimentos: '',
        estrategias: '',
        recursos: '',
        concluido: false,
      },
    ]);
  };

  const removerLinha = (index: number) => {
    if (linhas.length > 1) {
      setLinhas(linhas.filter((_, i) => i !== index));
    } else {
      alert('A tabela precisa ter pelo menos uma linha.');
    }
  };

  const alternarOk = (index: number) => {
    setLinhas(
      linhas.map((linha, i) =>
        i === index ? { ...linha, concluido: !linha.concluido } : linha
      )
    );
  };

  const atualizarCampo = (index: number, campo: keyof CronogramaRow, valor: any) => {
    setLinhas(
      linhas.map((linha, i) => (i === index ? { ...linha, [campo]: valor } : linha))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 md:p-10 bg-slate-50 min-h-screen">
      {/* Cabeçalho Principal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            PLANO DE AULA <span className="text-slate-400 font-light">|</span> <span className="text-blue-600">CRONOGRAMA</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Visualização e edição no formato padrão de tabela pedagógica</p>
        </div>
        <div className="flex items-center gap-3 no-print">
          <button
            onClick={adicionarLinha}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow"
          >
            + INCLUIR LINHA
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow"
          >
            IMPRIMIR CRONOGRAMA
          </button>
        </div>
      </div>

      {/* Container da Tabela */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-4 w-44 text-center">Horas / Aulas / Data</th>
                <th className="py-4 px-4">Capacidades</th>
                <th className="py-4 px-4">Conhecimentos</th>
                <th className="py-4 px-4">Estratégias</th>
                <th className="py-4 px-4">Recursos / Ambientes</th>
                <th className="py-4 px-4 text-center w-36">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
              {linhas.map((linha, index) => (
                <tr
                  key={index}
                  className={`transition-colors ${linha.concluido ? 'bg-green-50/60' : ''}`}
                >
                  <td className="py-4 px-4 align-middle bg-slate-50/40">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-2xs">
                        <input
                          type="number"
                          value={linha.horas}
                          onChange={(e) => atualizarCampo(index, 'horas', Number(e.target.value))}
                          className="w-10 text-center font-bold text-slate-800 focus:outline-none bg-transparent text-sm"
                        />
                        <span className="text-[10px] uppercase font-bold text-slate-400">Horas</span>
                      </div>
                      <input
                        type="date"
                        value={linha.data}
                        onChange={(e) => atualizarCampo(index, 'data', e.target.value)}
                        className="w-32 text-center text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg p-1 bg-white focus:outline-none"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <textarea
                      value={linha.capacidades}
                      onChange={(e) => atualizarCampo(index, 'capacidades', e.target.value)}
                      className="w-full h-32 p-2.5 text-slate-700 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded-lg resize-none focus:outline-none transition-all"
                      placeholder="Capacidades..."
                    />
                  </td>
                  <td className="py-4 px-4 align-top">
                    <textarea
                      value={linha.conhecimentos}
                      onChange={(e) => atualizarCampo(index, 'conhecimentos', e.target.value)}
                      className="w-full h-32 p-2.5 text-slate-700 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded-lg resize-none focus:outline-none transition-all"
                      placeholder="Conhecimentos..."
                    />
                  </td>
                  <td className="py-4 px-4 align-top">
                    <textarea
                      value={linha.estrategias}
                      onChange={(e) => atualizarCampo(index, 'estrategias', e.target.value)}
                      className="w-full h-32 p-2.5 text-slate-700 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded-lg resize-none focus:outline-none transition-all"
                      placeholder="Estratégias pedagógicas..."
                    />
                  </td>
                  <td className="py-4 px-4 align-top">
                    <textarea
                      value={linha.recursos}
                      onChange={(e) => atualizarCampo(index, 'recursos', e.target.value)}
                      className="w-full h-32 p-2.5 text-slate-700 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded-lg resize-none focus:outline-none transition-all"
                      placeholder="Recursos / Ambientes..."
                    />
                  </td>
                  <td className="py-4 px-4 align-middle text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => removerLinha(index)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-bold text-lg"
                        title="Excluir linha"
                      >
                        ×
                      </button>
                      <button
                        onClick={() => alternarOk(index)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                          linha.concluido
                            ? 'bg-green-600 text-white border-green-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-green-50 hover:text-green-700 hover:border-green-300'
                        }`}
                        title="Marcar conteúdo como dado (OK)"
                      >
                        {linha.concluido ? '✓ OK' : 'OK'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
