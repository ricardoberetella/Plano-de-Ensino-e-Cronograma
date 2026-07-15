
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout?: () => void;
  activeProfileId?: string;
  onProfileChange?: (id: string) => void;
}

interface Profile {
  id: string;
  name: string;
  initials: string;
  tags: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onViewChange, 
  onLogout, 
  activeProfileId = 'beretella',
  onProfileChange 
}) => {
  const profiles: Profile[] = [
    { id: 'beretella', name: 'Ricardo Beretella', initials: 'RB', tags: 'LIDT | CRD | FUSI' },
    { id: 'gea', name: 'Ricardo Gea', initials: 'RG', tags: 'METAL | USIN | CNC' }
  ];

  const menuItems: { id: ViewType; label: string; icon: React.RefObject<any> | React.ReactNode; external?: string }[] = [
    { id: 'dashboard', label: 'Menu', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
    { id: 'plano-curso', label: 'Plano de Curso', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
    { id: 'plano-ensino', label: 'Plano de Ensino', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg> },
    { id: 'calendario', label: 'Calendário Escolar', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.external) {
      window.open(item.external, '_blank');
    } else {
      onViewChange(item.id);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <aside className="w-16 md:w-52 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-2xl transition-all duration-300">
        <div className="p-3 md:p-4 flex-1">
          <div className="mb-8 text-center">
            <div className="inline-block bg-[#E30613] px-2 py-1.5 md:px-4 md:py-2 rounded-sm shadow-md cursor-pointer" onClick={() => onViewChange('dashboard')}>
              <h2 className="text-white font-[1000] italic text-xl md:text-3xl tracking-[-0.08em] leading-none select-none transform skew-x-[-4deg]">
                SENAI
              </h2>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-2 md:px-4 py-3 rounded-xl flex items-center justify-center md:justify-start gap-3 transition-all duration-200 ${activeView === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                title={item.label}
              >
                <div className="flex-shrink-0 scale-90 md:scale-100">{item.icon}</div>
                <span className="hidden md:block text-[10px] font-black uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-2 md:p-3 m-2 space-y-2">
          <div className="bg-slate-800/40 rounded-xl border border-slate-700/30 p-1.5">
             <p className="text-[7px] font-black uppercase text-slate-500 mb-1 ml-1 hidden md:block tracking-widest">Professor Ativo</p>
            <div className="space-y-1.5">
              {profiles.map((profile) => (
                <button 
                  key={profile.id}
                  onClick={() => onProfileChange?.(profile.id)}
                  className={`w-full flex items-center justify-center md:justify-start gap-2 p-1 rounded-lg transition-all duration-300 ${
                    activeProfileId === profile.id ? 'bg-blue-600/20 border border-blue-500/30 shadow-inner' : 'border border-transparent hover:bg-slate-800'
                  }`}
                  title={profile.name}
                >
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[9px] md:text-[10px] shrink-0 ${
                    activeProfileId === profile.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {profile.initials}
                  </div>
                  <div className="hidden md:block text-left min-w-0">
                    <p className={`text-[9px] font-bold truncate ${activeProfileId === profile.id ? 'text-white' : 'text-slate-400'}`}>
                      {profile.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-3 rounded-xl text-red-400 hover:bg-red-600/10 hover:text-red-500 transition-all duration-200 border border-transparent hover:border-red-600/20"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span className="hidden md:block text-[10px] font-black uppercase tracking-tight">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 md:px-8 justify-between z-10 shadow-sm">
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            <h1 className="text-[9px] md:text-xs font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
              {menuItems.find(i => i.id === activeView)?.label || 'Painel'}
            </h1>
            <span className="h-3 w-px bg-slate-200 flex-shrink-0"></span>
            <span className="text-[8px] md:text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tight truncate">
              Mecânico de Usinagem Convencional
            </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Firebase Cloud Online</span>
             </div>
             <div className="bg-slate-100 px-3 py-1 rounded-full hidden md:flex items-center gap-2">
                <span className="text-[8px] font-black text-slate-500 uppercase">Perfil:</span>
                <span className="text-[8px] font-black text-slate-800 uppercase">{activeProfileId === 'beretella' ? 'Beretella' : 'Gea'}</span>
             </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto bg-slate-50 p-3 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Layout;
