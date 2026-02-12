
import React from 'react';
import { TeachingPlan } from '../types';
import { FirebaseService } from '../services/firebase';

interface DashboardProps {
  plans: TeachingPlan[];
  onEdit: (plan: TeachingPlan) => void;
  onView: (plan: TeachingPlan) => void;
  onRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plans, onEdit, onView, onRefresh }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Meus Planos</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Gestão Pedagógica MSEP</p>
        </div>
        <button 
          onClick={onRefresh}
          className="bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Sincronizar Nuvem
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Planos Totais</p>
          <h3 className="text-3xl font-black mt-1 text-slate-800">{plans.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-b-4 border-b-blue-500">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Serviço de Dados</p>
          <div className="flex items-center gap-2 mt-1">
             <h3 className="text-3xl font-black text-slate-800">Nuvem</h3>
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <p className="mt-1 text-slate-400 text-[9px] font-bold uppercase">Firebase: Conectado</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">IA Assistente</p>
          <h3 className="text-3xl font-black mt-1 text-blue-600">Proeducador</h3>
          <p className="mt-1 text-slate-400 text-[9px] font-bold uppercase">Base Oficial Ativa</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Curso / Unidade</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Carga</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Sincronizado</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {plans.map(plan => (
              <tr key={plan.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-black text-slate-800 text-sm uppercase">{plan.courseName}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{plan.modality}</p>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm font-bold">{plan.totalHours}h</td>
                <td className="px-6 py-4 text-slate-500 text-[10px] font-bold uppercase">
                  {new Date(plan.updatedAt || plan.createdAt).toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => onView(plan)}
                      title="Visualizar Unidades"
                      className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                    <button 
                      onClick={() => onEdit(plan)}
                      title="Editar Informações"
                      className="p-2.5 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button 
                      onClick={async () => {
                        await FirebaseService.deletePlan(plan.id);
                        onRefresh();
                      }}
                      title="Excluir Plano"
                      className="p-2.5 bg-red-50 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">Aguardando planos do Firebase Cloud...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
