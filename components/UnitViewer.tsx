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
        <div className="space-y-6">
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
                              : 'text-slate-700 hover:bg-slate-100'
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
