import React, { useState } from 'react';

interface LoginProps {
  onLogin: (password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aceita tanto a senha de usuário quanto a do administrador
    if (password === 'ianes662' || password === 'bere662') {
      onLogin(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[380px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden animate-fadeIn relative">
        <div className="h-1.5 bg-[#E30613] w-1/4 mx-auto rounded-b-full"></div>

        <div className="p-6 sm:p-10 flex flex-col items-center">
          {/* Logo SENAI: Apenas fundo vermelho sem faixas */}
          <div className="mb-6 w-[160px]">
            <div className="relative w-full aspect-[2.8/1] bg-[#E30613] flex items-center justify-center overflow-hidden shadow-md rounded-sm">
              <h2 className="text-white font-[1000] italic text-3xl sm:text-4xl tracking-[-0.08em] leading-none select-none transform skew-x-[-4deg]">
                SENAI
              </h2>
            </div>
          </div>

          <div className="text-center mb-6 space-y-1.5">
            <h1 className="text-[#1e293b] font-black italic text-lg sm:text-xl tracking-tight leading-tight uppercase">
              Mecânico de Usinagem<br />Convencional
            </h1>
            <p className="text-[#64748b] font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.12em]">
              Plano de Aula / Cronograma
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-1">
              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className={`w-full bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-100'} rounded-xl py-3 px-6 text-center text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-lg tracking-widest`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E30613] hover:bg-[#c40510] text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-[10px]"
            >
              Acessar
            </button>
          </form>
          
          {error && (
            <p className="mt-4 text-red-500 text-[9px] font-black uppercase tracking-widest animate-pulse">
              Senha incorreta
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
