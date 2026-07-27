import React from 'react';
import { TeachingPlan } from '../types';

interface DashboardProps {
  plans: TeachingPlan[];
  onEdit: (plan: TeachingPlan) => void;
  onView: (plan: TeachingPlan) => void;
  onRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plans, onEdit, onView, onRefresh }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn p-6 pb-20">
      <div className="flex justify-between items-center bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Painel SENAI</span>
          <h2 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tight">Planos de Curso</h2>
        </div>
        <button
          onClick={onRefresh}
          className="bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Atualizar Dados
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider">
                  {plan.modality || 'Presencial'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {plan.totalHours || 0} HORas
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                {plan.courseName}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 font-medium">
                {plan.objective}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => onView(plan)}
                className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg text-center"
              >
                Visualizar Curso
              </button>
              <button
                onClick={() => onEdit(plan)}
                className="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-blue-100"
              >
                Ações / Unidades
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
