import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  activeProfileId: string;
  onProfileCardChange: (profileId: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  activeView,
  onViewChange,
  onLogout,
  activeProfileId,
  onProfileCardChange,
  children,
}) => {
  const isGeaActive = activeProfileId === 'gea';

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* SIDEBAR LATERAL ESQUERDA */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col justify-between p-6 shadow-2xl z-20">
        <div>
          {/* LOGO SENAI */}
          <div className="mb-10 pt-2 flex items-center justify-center">
            <div className="bg-[#E30613] text-white px-6 py-3 rounded-2xl font-[1000] text-2xl tracking-tighter uppercase shadow-lg">
              SENAI
            </div>
          </div>

          {/* MENU DE NAVEGAÇÃO */}
          <nav className="space-y-2">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-xl scale-[1.02]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Menu / Início</span>
            </button>

            <button
              onClick={() => onViewChange('plano-curso' as ViewType)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === ('plano-curso' as ViewType) || activeView === ('plano-ensino' as ViewType)
                  ? 'bg-blue-600 text-white shadow-xl scale-[1.02]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Plano de Curso</span>
            </button>

            <button
              onClick={() => onViewChange('calendario' as ViewType)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === ('calendario' as ViewType)
                  ? 'bg-blue-600 text-white shadow-xl scale-[1.02]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Calendário Escolar</span>
            </button>
          </nav>
        </div>

        {/* PERFIS DOS PROFESSORES NA LATERAL */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-2">
            Professor Ativo
          </p>

          <div className="space-y-2">
            {/* Perfil Ricardo Beretella */}
            <button
              onClick={() => onProfileCardChange('beretella')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border text-left ${
                !isGeaActive
                  ? 'bg-blue-600/20 border-blue-500 text-white'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs text-white shadow-md">
                RB
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black uppercase truncate">Ricardo Beretella</p>
                <p className="text-[9px] font-bold text-slate-400">Administrador</p>
              </div>
            </button>

            {/* Perfil Ricardo Gea */}
            <button
              onClick={() => onProfileCardChange('gea')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border text-left ${
                isGeaActive
                  ? 'bg-blue-600/20 border-blue-500 text-white'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center font-black text-xs text-white shadow-md">
                RG
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black uppercase truncate">Ricardo Gea</p>
                <p className="text-[9px] font-bold text-slate-400">Perfil Paralelo</p>
              </div>
            </button>
          </div>

          {/* BOTÃO SAIR DO SISTEMA */}
          <button
            onClick={onLogout}
            className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA TELA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* BARRA SUPERIOR */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-[1000] uppercase text-slate-900 tracking-wider">
              {activeView === 'dashboard' && 'Menu Inicial'}
              {activeView === ('plano-curso' as ViewType) && 'Plano de Curso'}
              {activeView === ('plano-ensino' as ViewType) && 'Unidades Curriculares'}
              {activeView === ('calendario' as ViewType) && 'Calendário Geral'}
              {activeView === ('editor' as ViewType) && 'Editor de Plano'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Firebase Cloud Online
            </span>
            <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-black uppercase text-slate-700 tracking-wider border border-slate-200">
              Perfil: {isGeaActive ? 'Ricardo Gea' : 'Ricardo Beretella'}
            </div>
          </div>
        </header>

        {/* CONTAINER DINÂMICO */}
        <div className="flex-1 p-8 md:p-12 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
