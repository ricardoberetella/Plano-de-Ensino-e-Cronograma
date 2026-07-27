import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  activeProfileId: string;
  onProfileChange: (profileId: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  activeView,
  onViewChange,
  onLogout,
  activeProfileId,
  onProfileChange,
  children
}) => {
  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden font-sans">
      {/* Menu Lateral Esquerdo */}
      <aside className="w-72 bg-[#0b1329] border-r border-slate-800 flex flex-col justify-between p-6 select-none">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-[#E30613] text-white px-4 py-2 rounded-xl font-black text-lg tracking-wider">
              SENAI
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>🏠</span> Painel / Cursos
            </button>

            <button
              onClick={() => onViewChange('plano-curso')}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'plano-curso'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>📋</span> Plano de Curso
            </button>

            <button
              onClick={() => onViewChange('unidades-curriculares' as ViewType)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === ('unidades-curriculares' as ViewType)
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>📖</span> Unidades Curriculares
            </button>

            <button
              onClick={() => onViewChange('calendario')}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'calendario'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>📅</span> Calendário Escolar
            </button>
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
            <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-2">
              Professor Ativo
            </p>
            <div className="space-y-1.5">
              <button
                onClick={() => onProfileChange('beretella')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeProfileId === 'beretella'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Ricardo Beretella
              </button>
              <button
                onClick={() => onProfileChange('gea')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeProfileId === 'gea'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-500" /> Ricardo Gea
              </button>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 bg-slate-100 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              Firebase Cloud Online
            </span>
          </div>
          <div className="bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
              Perfil: {activeProfileId === 'beretella' ? 'Beretella' : 'Gea'}
            </span>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
