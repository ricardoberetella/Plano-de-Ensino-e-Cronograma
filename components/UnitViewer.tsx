import React, { useState } from 'react';
import { CurricularUnit } from '../types';

interface UnitViewerProps {
  unit: CurricularUnit;
  onBack: () => void;
}

export default function UnitViewer({ unit, onBack }: UnitViewerProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'matriz' | 'situacao' | 'cronograma' | 'calendario'>('matriz');
  
  // Estados editáveis da Matriz
  const [capacidadesTecnicas, setCapacidadesTecnicas] = useState<string[]>([
    'Aplicar normas técnicas de desenho mecânico',
    'Interpretar tolerâncias geométricas'
  ]);
  const [capacidadesSocioemocionais, setCapacidadesSocioemocionais] = useState<string[]>([
    'Demonstrar organização e atenção aos detalhes'
  ]);
  const [conhecimentos, setConhecimentos] = useState<string[]>([
    'Sistemas de tolerâncias e ajustes',
    'Simbologia de soldagem e acabamento'
  ]);

  // Estados editáveis da Situação de Aprendizagem
  const [situacoes, setSituacoes] = useState([
    { id: 1, titulo: 'Desafio 1: Leitura de Planta Complexa', descricao: 'Análise de conjunto mecânico aplicado à indústria.', cargaHoraria: '20h' }
  ]);

  // Estados editáveis do Cronograma / Calendário
  const [cronogramaAulas, setCronogramaAulas] = useState([
    { id: 1, semana: 'Semana 1', conteudo: 'Apresentação da disciplina e fundamentos', aulas: '4h' },
    { id: 2, semana: 'Semana 2', conteudo: 'Exercícios práticos de interpretação', aulas: '4h' }
  ]);

  // Funções de manipulação (Incluir, Editar, Excluir)
  const adicionarItemMatriz = (tipo: 'tecnica' | 'socioemocional' | 'conhecimento') => {
    if (tipo === 'tecnica') {
      const valor = prompt('Digite a nova Capacidade Técnica:');
      if (valor) setCapacidadesTecnicas([...capacidadesTecnicas, valor]);
    } else if (tipo === 'socioemocional') {
      const valor = prompt('Digite a nova Capacidade Socioemocional:');
      if (valor) setCapacidadesSocioemocionais([...capacidadesSocioemocionais, valor]);
    } else if (tipo === 'conhecimento') {
      const valor = prompt('Digite o novo Conhecimento:');
      if (valor) setConhecimentos([...conhecimentos, valor]);
    }
    setModalAberto(false);
  };

  const excluirItemMatriz = (tipo: 'tecnica' | 'socioemocional' | 'conhecimento', index: number) => {
    if (confirm('Deseja realmente excluir este item?')) {
      if (tipo === 'tecnica') {
        setCapacidadesTecnicas(capacidadesTecnicas.filter((_, i) => i !== index));
      } else if (tipo === 'socioemocional') {
        setCapacidadesSocioemocionais(capacidadesSocioemocionais.filter((_, i) => i !== index));
      } else if (tipo === 'conhecimento') {
        setConhecimentos(conhecimentos.filter((_, i) => i !== index));
      }
    }
  };

  const editarItemMatriz = (tipo: 'tecnica' | 'socioemocional' | 'conhecimento', index: number, valorAtual: string) => {
    const novoValor = prompt('Edite o valor:', valorAtual);
    if (novoValor !== null && novoValor.trim() !== '') {
      if (tipo === 'tecnica') {
        const arr = [...capacidadesTecnicas];
        arr[index] = novoValor;
        setCapacidadesTecnicas(arr);
      } else if (tipo === 'socioemocional') {
        const arr = [...capacidadesSocioemocionais];
        arr[index] = novoValor;
        setCapacidadesSocioemocionais(arr);
      } else if (tipo === 'conhecimento') {
        const arr = [...conhecimentos];
        arr[index] = novoValor;
        setConhecimentos(arr);
      }
    }
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

      {/* Abas Internas completas (Matriz, Situação, Cronograma, Calendário) */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
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
        <button
          onClick={() => setAbaAtiva('calendario')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            abaAtiva === 'calendario' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Calendário Escolar
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
                    onClick={() => adicionarItemMatriz('tecnica')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Capacidade Técnica
                  </button>
                  <button 
                    onClick={() => adicionarItemMatriz('socioemocional')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
                  >
                    Capacidade Socioemocional
                  </button>
                  <button 
                    onClick={() => adicionarItemMatriz('conhecimento')}
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
              {/* Capacidades */}
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
                        <div key={index} className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-base font-medium text-slate-800 shadow-sm flex items-center justify-between gap-3">
                          <span>{item}</span>
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => editarItemMatriz('tecnica', index, item)} className="text-xs bg-slate-100 hover:bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold">Editar</button>
                            <button onClick={() => excluirItemMatriz('tecnica', index)} className="text-xs bg-slate-100 hover:bg-red-50 text-red-600 px-2 py-1 rounded-lg font-bold">Excluir</button>
                          </div>
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
                        <div key={index} className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-base font-medium text-slate-800 shadow-sm flex items-center justify-between gap-3">
                          <span>{item}</span>
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => editarItemMatriz('socioemocional', index, item)} className="text-xs bg-slate-100 hover:bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold">Editar</button>
                            <button onClick={() => excluirItemMatriz('socioemocional', index)} className="text-xs bg-slate-100 hover:bg-red-50 text-red-600 px-2 py-1 rounded-lg font-bold">Excluir</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Conhecimentos */}
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
                        <div key={index} className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-base font-medium text-slate-800 shadow-sm flex items-center justify-between gap-3">
                          <span>{item}</span>
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => editarItemMatriz('conhecimento', index, item)} className="text-xs bg-slate-100 hover:bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold">Editar</button>
                            <button onClick={() => excluirItemMatriz('conhecimento', index)} className="text-xs bg-slate-100 hover:bg-red-50 text-red-600 px-2 py-1 rounded-lg font-bold">Excluir</button>
                          </div>
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
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-800 uppercase">Situações de Aprendizagem</h3>
            <button 
              onClick={() => {
                const titulo = prompt('Título da Situação:');
                const descricao = prompt('Descrição:');
                const carga = prompt('Carga Horária (ex: 20h):');
                if (titulo) setSituacoes([...situacoes, { id: Date.now(), titulo, descricao: descricao || '', cargaHoraria: carga || '' }]);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md transition"
            >
              + Adicionar Situação
            </button>
          </div>
          <div className="space-y-3">
            {situacoes.map((sit, idx) => (
              <div key={sit.id} className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base text-slate-900">{sit.titulo}</h4>
                  <p className="text-sm text-slate-600">{sit.descricao}</p>
                  <span className="text-xs font-semibold text-blue-600 mt-1 block">Carga: {sit.cargaHoraria}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    const novoT = prompt('Editar Título:', sit.titulo);
                    if (novoT) {
                      const copia = [...situacoes];
                      copia[idx].titulo = novoT;
                      setSituacoes(copia);
                    }
                  }} className="text-xs bg-slate-100 text-blue-600 px-3 py-1.5 rounded-lg font-bold">Editar</button>
                  <button onClick={() => setSituacoes(situacoes.filter(s => s.id !== sit.id))} className="text-xs bg-slate-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba: Cronograma */}
      {abaAtiva === 'cronograma' && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-800 uppercase">Cronograma de Aulas</h3>
            <button 
              onClick={() => {
                const semana = prompt('Semana (ex: Semana 3):');
                const conteudo = prompt('Conteúdo programado:');
                const aulas = prompt('Carga horária (ex: 4h):');
                if (semana) setCronogramaAulas([...cronogramaAulas, { id: Date.now(), semana, conteudo: conteudo || '', aulas: aulas || '' }]);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md transition"
            >
              + Adicionar Aula
            </button>
          </div>
          <div className="space-y-3">
            {cronogramaAulas.map((cron, idx) => (
              <div key={cron.id} className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <span className="text-xs font-black text-blue-600 uppercase tracking-wider">{cron.semana}</span>
                  <h4 className="font-bold text-base text-slate-900">{cron.conteudo}</h4>
                  <span className="text-xs text-slate-500">Aulas: {cron.aulas}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    const novoC = prompt('Editar Conteúdo:', cron.conteudo);
                    if (novoC) {
                      const copia = [...cronogramaAulas];
                      copia[idx].conteudo = novoC;
                      setCronogramaAulas(copia);
                    }
                  }} className="text-xs bg-slate-100 text-blue-600 px-3 py-1.5 rounded-lg font-bold">Editar</button>
                  <button onClick={() => setCronogramaAulas(cronogramaAulas.filter(c => c.id !== cron.id))} className="text-xs bg-slate-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba: Calendário Escolar */}
      {abaAtiva === 'calendario' && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h3 className="text-sm font-black text-slate-800 uppercase">Calendário Escolar e Prazos</h3>
          <p className="text-sm text-slate-600">Visualize abaixo os períodos letivos, feriados e datas de avaliações programadas para o semestre.</p>
          <div className="bg-white p-5 border border-slate-200 rounded-xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-bold text-slate-800">Início do Semestre Letivo</span>
              <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">02/02/2026</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm font-bold text-slate-800">Avaliação Intermediária</span>
              <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">15/04/2026</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-800">Encerramento das Atividades</span>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">30/06/2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
