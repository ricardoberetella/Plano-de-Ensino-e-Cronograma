import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  AlertCircle,
  Layers,
  ChevronRight,
  Edit3
} from 'lucide-react';

// Componente simples para área editável in-line
const EditableArea = ({ value, onChange, placeholder, className }: { value: string; onChange: (val: string) => void; placeholder?: string; className?: string }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className={`w-full resize-y p-1 text-xs bg-transparent focus:bg-white focus:ring-1 focus:ring-blue-500 rounded border border-transparent hover:border-slate-200 transition-all ${className || ''}`}
    />
  );
};

interface ScheduleEntry {
  id: string;
  date: string;
  hours: number;
  capacities: string;
  knowledges: string;
  activities: string;
  resources: string;
}

interface UnitViewerProps {
  unitData?: {
    title?: string;
    code?: string;
    totalHours?: number;
    objective?: string;
    schedule?: ScheduleEntry[];
    calendar?: {
      startDate: string;
      endDate: string;
    };
  };
}

const UnitViewer: React.FC<UnitViewerProps> = ({ unitData }) => {
  const [activeTab, setActiveTab] = useState<'plano' | 'calendario'>('plano');

  // Estado local para permitir edição na UI
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>(
    unitData?.schedule || [
      {
        id: '1',
        date: '2026-03-01',
        hours: 4,
        capacities: 'Compreender os fundamentos da operação.',
        knowledges: 'Terminologia técnica e normas de segurança.',
        activities: 'Apresentação expositiva e debate inicial.',
        resources: 'Projetor, Apostila técnica, Quadro branco.'
      },
      {
        id: '2',
        date: '2026-03-03',
        hours: 4,
        capacities: 'Aplicar medições básicas com instrumentos.',
        knowledges: 'Paquímetro e micrômetro: leitura e conservação.',
        activities: 'Exercícios práticos de medição em bancada.',
        resources: 'Instrumentos de medição, Peças de teste.'
      }
    ]
  );

  const [calendar] = useState({
    startDate: unitData?.calendar?.startDate || '2026-03-01',
    endDate: unitData?.calendar?.endDate || '2026-06-30'
  });

  const updateEntry = (id: string, field: keyof ScheduleEntry, val: string | number) => {
    setLocalSchedule(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const getDayOfWeek = (dateString: string) => {
    try {
      const [y, m, d] = dateString.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date);
    } catch {
      return '';
    }
  };

  const scheduleDates = useMemo(() => {
    const map: Record<string, boolean> = {};
    localSchedule.forEach(entry => {
      if (entry.date) map[entry.date] = true;
    });
    return map;
  }, [localSchedule]);

  const monthsInRange = useMemo(() => {
    try {
      const [startY, startM] = calendar.startDate.split('-').map(Number);
      const [endY, endM] = calendar.endDate.split('-').map(Number);
      
      const months = [];
      let currY = startY;
      let currM = startM;

      while (currY < endY || (currY === endY && currM <= endM)) {
        months.push(`${currY}-${String(currM).padStart(2, '0')}`);
        currM++;
        if (currM > 12) {
          currM = 1;
          currY++;
        }
      }
      return months;
    } catch {
      return ['2026-03', '2026-04', '2026-05', '2026-06'];
    }
  }, [calendar]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* HEADER DE CONTROLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers size={14} />
            <span>Planejamento Curricular</span>
          </div>
          <h1 className="text-2xl font-[1000] text-slate-900 tracking-tight">
            {unitData?.title || 'Unidade Curricular: Mecânica e Processos'}
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Código: <span className="text-slate-700 font-bold">{unitData?.code || 'MDU-01'}</span> | Carga Horária Total: <span className="text-slate-700 font-bold">{unitData?.totalHours || 80}h</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
          >
            <Printer size={15} />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* ABAS DE NAVEGAÇÃO */}
      <div className="flex border-b border-slate-200 gap-8 no-print">
        <button
          onClick={() => setActiveTab('plano')}
          className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'plano'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText size={16} />
          <span>Plano de Aulas / Cronograma</span>
        </button>
        <button
          onClick={() => setActiveTab('calendario')}
          className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'calendario'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <CalendarIcon size={16} />
          <span>Calendário da Unidade</span>
        </button>
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {activeTab === 'plano' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 no-print">
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase">Detalhamento das Aulas</h3>
                <p className="text-xs text-slate-500 font-medium">Edite os campos diretamente nas células da tabela abaixo se necessário.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={14} />
                <span>Pronto para uso</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-black rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-black text-slate-900">
                    <th className="p-3 w-[15%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Data / Horas
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Capacidades
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Conhecimentos
                    </th>
                    <th className="p-3 w-[25%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Atividades Previstas / Metodologia
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase text-center align-middle">
                      Recursos / Avaliação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black text-xs font-medium text-slate-900">
                  {localSchedule.map((entry) => {
                    const dayName = getDayOfWeek(entry.date);
                    return (
                      <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 border-r border-black align-top text-center bg-slate-50/50">
                          <div className="font-black text-slate-900">{entry.date}</div>
                          {dayName && <div className="text-[10px] text-slate-500 uppercase font-bold">{dayName}</div>}
                          <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                            {entry.hours}h
                          </div>
                        </td>
                        <td className="p-3 border-r border-black align-top">
                          <EditableArea
                            value={entry.capacities}
                            onChange={(val) => updateEntry(entry.id, 'capacities', val)}
                            placeholder="Capacidades..."
                            className="bg-transparent border-none text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1"
                          />
                        </td>
                        <td className="p-3 border-r border-black align-top">
                          <EditableArea
                            value={entry.knowledges}
                            onChange={(val) => updateEntry(entry.id, 'knowledges', val)}
                            placeholder="Conhecimentos..."
                            className="bg-transparent border-none text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1"
                          />
                        </td>
                        <td className="p-3 border-r border-black align-top">
                          <EditableArea
                            value={entry.activities}
                            onChange={(val) => updateEntry(entry.id, 'activities', val)}
                            placeholder="Atividades..."
                            className="bg-transparent border-none text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1"
                          />
                        </td>
                        <td className="p-3 align-top">
                          <EditableArea
                            value={entry.resources}
                            onChange={(val) => updateEntry(entry.id, 'resources', val)}
                            placeholder="Recursos e Avaliação..."
                            className="bg-transparent border-none text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA CALENDÁRIO */}
        {activeTab === 'calendario' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 no-print">
              <div>
                <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic">Calendário da Unidade</h3>
                <p className="text-xs text-slate-500 font-semibold">Período de vigência e marcações de aulas</p>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl">
                Início: <span className="text-slate-900 font-black">{calendar.startDate}</span> | Fim: <span className="text-slate-900 font-black">{calendar.endDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthsInRange.map((yearMonth) => {
                const [y, m] = yearMonth.split('-').map(Number);
                const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date(y, m - 1, 1));
                const firstDayIndex = new Date(y, m - 1, 1).getDay();
                const daysInMonth = new Date(y, m, 0).getDate();

                const daysArray = [];
                for (let i = 0; i < firstDayIndex; i++) {
                  daysArray.push(null);
                }
                for (let d = 1; d <= daysInMonth; d++) {
                  daysArray.push(new Date(y, m - 1, d));
                }

                return (
                  <div key={yearMonth} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 capitalize text-center border-b border-slate-100 pb-2">
                      {monthName}
                    </h4>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, idx) => (
                        <span key={idx} className="text-[10px] font-black text-slate-400">{d}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {daysArray.map((dateObj, idx) => {
                        if (!dateObj) {
                          return <div key={`empty-${idx}`} className="h-8"></div>;
                        }
                        const dateIso = dateObj.toISOString().substring(0, 10);
                        const hasSchedule = scheduleDates[dateIso];
                        
                        return (
                          <div
                            key={dateIso}
                            className={`h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                              hasSchedule
                                ? 'bg-blue-600 text-white shadow-sm font-black'
                                : 'text-slate-700 hover:bg-slate-150'
                            }`}
                          >
                            {dateObj.getDate()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitViewer;
