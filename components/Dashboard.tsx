import React from 'react';
import { TeachingPlan } from '../types';

interface DashboardProps {
  plans: TeachingPlan[];
  isAdmin: boolean;
  onEdit: (plan: TeachingPlan) => void;
  onView: (plan: TeachingPlan) => void;
  onRefresh: () => void;
  onDeletePlan?: (planId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  plans,
  isAdmin,
  onEdit,
  onView,
  onRefresh,
  onDeletePlan,
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* HEADER DE ESTATÍSTICAS E AÇÕES */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200">
        <div>
          <span className="bg-slate-900 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-2 inline-block">
            Gestão Pedagógica MSEP
          </span>
          <h2 className="text-3xl font-[1000] text-slate-900 uppercase italic tracking-tight">
            Meus Planos de Curso
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
            Painel de controle unificado para matrizes curriculares
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onRefresh}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <span>Sincronizar Nuvem</span>
          </button>
        </div>
      </div>

      {/* CARDS RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 flex flex-col justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
            Planos Totais
          </p>
          <p className="text-4xl font-[1000] text-slate-900 italic">
            {plans.length}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 flex flex-col justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
            Serviço de Dados
          </p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Nuvem Online
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 flex flex-col justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
            IA Assistente
          </p>
          <p className="text-2xl font-[1000] text-blue-600 italic tracking-tight">
            Proeducador
          </p>
        </div>
      </div>

      {/* TABELA DE PLANOS */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
            Cursos Disponíveis no Perfil
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Curso / Unidade
                </th>
                <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Carga
                </th>
                <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Sincronizado
                </th>
                <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="py-6 px-8">
                    <p className="font-[1000] text-slate-900 uppercase text-base group-hover:text-blue-600 transition-colors">
                      {plan.courseName}
                    </p>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      {plan.modality || 'Presencial'}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-xs font-black text-slate-700">
                    {plan.totalHours}h
                  </td>
                  <td className="py-6 px-8 text-xs font-bold text-slate-500">
                    {plan.updatedAt
                      ? new Date(plan.updatedAt).toLocaleString('pt-BR')
                      : 'Não sincronizado'}
                  </td>
                  <td className="py-6 px-8 text-right space-x-2">
                    <button
                      onClick={() => onView(plan)}
                      className="px-4 py-2 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      title="Visualizar Plano"
                    >
                      Visualizar
                    </button>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => onEdit(plan)}
                          className="px-4 py-2 rounded-xl text-xs font-black uppercase bg-blue-50 text-blue-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                          title="Editar Plano"
                        >
                          Editar
                        </button>
                        {onDeletePlan && (
                          <button
                            onClick={() => onDeletePlan(plan.id)}
                            className="px-4 py-2 rounded-xl text-xs font-black uppercase bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            title="Excluir Plano"
                          >
                            Excluir
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {plans.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Nenhum plano cadastrado neste perfil.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
