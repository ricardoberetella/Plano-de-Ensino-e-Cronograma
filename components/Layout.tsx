import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Menu lateral mais estreito (w-56) para ganhar espaço à direita */}
      <aside className="w-56 bg-[#0B1120] text-white flex flex-col justify-between p-4 shrink-0 shadow-xl">
        <div className="space-y-8">
          {/* Logo SENAI */}
          <div className="bg-red-600 text-white font-black text-center py-2.5 rounded-xl text-lg tracking-wider shadow-md">
            SENAI
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('painel')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'painel' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              📊 Painel / Cursos
            </button>
            <button
              onClick={() => setActiveTab('plano')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'plano' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              📄 Plano de Curso
            </button>
            <button
              onClick={() => setActiveTab('unidades')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'unidades' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              📚 Unidades Curriculares
            </button>
            <button
              onClick={() => setActiveTab('calendario')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'calendario' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              📅 Calendário Escolar
            </button>
          </nav>
        </div>

        {/* Rodapé do Menu Lateral */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
              Professor Ativo
            </span>
            <span className="text-xs font-bold text-blue-400 block truncate">
              Ricardo Beretella
            </span>
          </div>

          <button className="w-full text-center text-red-400 hover:text-red-300 text-xs font-black uppercase tracking-wider py-2 transition">
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal com espaço maximizado */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
