import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  activeProfileId: string;
  onProfileChange: (profileId: string) => void;
  activeSemester?: number; // Propriedade opcional adicionada
  onSemesterChange?: (semester: number) => void; // Função de mudança adicionada
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  onViewChange,
  onLogout,
  activeProfileId,
  onProfileChange,
  activeSemester = 1,
  onSemesterChange
}) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-600">
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-80 bg-slate-900 text-white flex flex-col justify-between p-8 z-20 shadow-2xl relative">
        <div className="space-y-12">
          {/* LOGO SENAI */}
          <div className="flex items-center justify-center p-4 bg-[#E30613] rounded-2xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl font-black tracking-tighter text-white italic">SENAI</span>
          </div>

          {/* MENU DE NAVEGAÇÃO */}
          <nav className="space-y-3">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 translate-x-2'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Menu</span>
            </button>

            <button
              onClick={() => onViewChange('plano-curso')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'plano-curso'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 translate-x-2'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Plano de Curso</span>
            </button>

            <button
              onClick={() => onViewChange('calendario')}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeView === 'calendario'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 translate-x-2'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Calendário Escolar</span>
            </button>
          </nav>
        </div>

        {/* CONTROLE DE PERFIL ATIVO / PROFESSOR */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Professor Ativo</p>
          <div className="space-y-2">
            <button
              onClick={() => onProfileChange('beretella')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-left ${
                activeProfileId === 'beretella' ? 'bg-slate-800 border border-slate-700' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs">RB</div>
              <div className="text-xs font-bold truncate">Ricardo Beretella</div>
            </button>
            <button
              onClick={() => onProfileChange('gea')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-left ${
                activeProfileId === 'gea' ? 'bg-slate-800 border border-slate-700' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-xs">RG</div>
              <div className="text-xs font-bold truncate">Ricardo Gea</div>
            </button>
          </div>

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-rose-400 hover:bg-rose-950/30 transition-all"
          >
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (COM HEADER SUPERIOR) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* CABEÇALHO SUPERIOR (TOPBAR) */}
        <header className="h-24 bg-white border-b border-slate-200 px-12 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center space-x-6">
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-900">
              {activeView === 'dashboard' && 'Meus Planos'}
              {activeView === 'plano-curso' && 'Plano de Curso'}
              {activeView === 'plano-ensino' && 'Plano de Ensino'}
              {activeView === 'calendario' && 'Calendário'}
              {activeView === 'editor' && 'Editor de Plano'}
            </h1>
            <span className="h-4 w-px bg-slate-200"></span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Mecânico de Usinagem Convencional
            </span>
          </div>

          {/* BOTÕES DE SELEÇÃO DE SEMESTRE CORRIGIDOS */}
          <div className="flex items-center space-x-6">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex space-x-1 border border-slate-200/60 shadow-inner">
              <button
                type="button"
                onClick={() => onSemesterChange && onSemesterChange(1)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                  activeSemester === 1
                    ? 'bg-white text-slate-900 shadow-md scale-100'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                1º Sem
              </button>
              <button
                type="button"
                onClick={() => onSemesterChange && onSemesterChange(2)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                  activeSemester === 2
                    ? 'bg-white text-slate-900 shadow-md scale-100'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                2º Sem
              </button>
            </div>

            <span className="h-4 w-px bg-slate-200"></span>

            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Firebase Cloud Online</span>
            </div>

            <span className="h-4 w-px bg-slate-200"></span>

            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center space-x-2">
              <span className="text-[9px] font-black text-slate-400 uppercase">Perfil:</span>
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wide">{activeProfileId}</span>
            </div>
          </div>
        </header>

        {/* CONTAINER DINÂMICO DOS COMPONENTES INTERNOS */}
        <main className="flex-1 overflow-y-auto p-12 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
