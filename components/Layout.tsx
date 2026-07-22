import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onSelectView: (view: string) => void;
  userProfile: 'admin' | 'parallel';
  onSwitchProfile: (profile: 'admin' | 'parallel') => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentView,
  onSelectView,
  userProfile,
  onSwitchProfile
}) => {
  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* BARRA LATERAL (SIDEBAR) RECOLHIDA / COM LARGURA AJUSTADA (w-56) */}
      <aside className="w-56 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 select-none shrink-0 min-h-screen">
        <div className="space-y-6">
          {/* LOGO SENAI */}
          <div className="flex justify-center pt-2">
            <div className="bg-[#E30613] text-white px-5 py-2 rounded-xl font-[1000] italic text-xl tracking-tighter shadow-lg shadow-red-600/20">
              SENAI
            </div>
          </div>

          {/* NAVEGAÇÃO PRINCIPAL */}
          <nav className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-2 block mb-1">
              Menu / Início
            </span>

            <button
              onClick={() => onSelectView('plano')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                currentView === 'plano'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              Plano de Curso
            </button>

            <button
              onClick={() => onSelectView('calendario')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                currentView === 'calendario'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              Calendário Escolar
            </button>
          </nav>
        </div>

        {/* SEÇÃO DE PERFIS ATIVOS / TROCA DE USUÁRIO */}
        <div className="space-y-3 pt-4 border-t border-slate-900">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-2 block">
            Professor Ativo
          </span>

          <div className="space-y-2">
            {/* PERFIL 1: RICARDO BERETELLA */}
            <button
              onClick={() => onSwitchProfile('admin')}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 ${
                userProfile === 'admin'
                  ? 'bg-slate-900 border-blue-500/50 shadow-md'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-[10px] shrink-0 shadow-md">
                RB
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-black text-white uppercase tracking-tight truncate">Ricardo Beretella</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Administrador</p>
              </div>
            </button>

            {/* PERFIL 2: RICARDO GEA */}
            <button
              onClick={() => onSwitchProfile('parallel')}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 ${
                userProfile === 'parallel'
                  ? 'bg-slate-900 border-blue-500/50 shadow-md'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 font-black flex items-center justify-center text-[10px] shrink-0">
                RG
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-black text-white uppercase tracking-tight truncate">Ricardo Gea</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Perfil Paralelo</p>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
