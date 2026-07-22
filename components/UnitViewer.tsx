// Continuação do componente UnitViewer...
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row?.par || ''}
                        onChange={(val) => updateRubric(i, 'par', val)}
                        rows={1}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-blue-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-top h-1">
                      <EditableArea
                        value={row?.aut || ''}
                        onChange={(val) => updateRubric(i, 'aut', val)}
                        rows={1}
                        className="bg-slate-50/60 border border-slate-100 rounded p-1 text-slate-600 italic text-[9.5px] leading-tight focus:outline-none focus:border-green-300 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border border-slate-200 align-middle text-center">
                      <button
                        type="button"
                        onClick={() => removeRubric(i)}
                        className="text-slate-400 hover:text-red-600 font-bold p-1 transition-all"
                        title="Excluir Rubrica"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ABA CRONOGRAMA / PLANO DE AULA */}
      {activeTab === 'cronograma' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center no-print">
            <div>
              <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Plano de Aula & Cronograma</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Organização das aulas, capacidades, conteúdos e estratégias</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => addScheduleEntry()} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all">
                + Adicionar Aula
              </button>
              <button onClick={handlePrint} className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 hover:bg-blue-600 transition-all">
                Imprimir Plano
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {localSchedule.map((entry, index) => (
              <div key={entry.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-300 transition-all">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xs font-black">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <DebouncedInput
                        value={entry.date}
                        onChange={(val) => updateEntry(entry.id, 'date', val)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 w-32 focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {getDayOfWeek(entry.date)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-slate-400">Horas:</span>
                      <input
                        type="number"
                        value={entry.hours}
                        onChange={(e) => updateEntry(entry.id, 'hours', Number(e.target.value))}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 w-20 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 no-print">
                      <button onClick={() => addScheduleEntry(index)} className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        + Abaixo
                      </button>
                      <button onClick={() => removeScheduleEntry(entry.id)} className="text-slate-300 hover:text-red-500 p-1.5 text-xs font-bold transition-all" title="Excluir linha">
                        ✕
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Capacidades</label>
                    <EditableArea
                      value={entry.capacities}
                      onChange={(val) => updateEntry(entry.id, 'capacities', val)}
                      rows={2}
                      placeholder="Capacidades trabalhadas..."
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Conhecimentos</label>
                    <EditableArea
                      value={entry.knowledges}
                      onChange={(val) => updateEntry(entry.id, 'knowledges', val)}
                      rows={2}
                      placeholder="Conhecimentos abordados..."
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Estratégias / Metodologia</label>
                    <EditableArea
                      value={entry.strategies}
                      onChange={(val) => updateEntry(entry.id, 'strategies', val)}
                      rows={2}
                      placeholder="Estratégias didáticas..."
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Recursos Didáticos</label>
                    <EditableArea
                      value={entry.resources}
                      onChange={(val) => updateEntry(entry.id, 'resources', val)}
                      rows={2}
                      placeholder="Recursos utilizados..."
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA CALENDÁRIO */}
      {activeTab === 'calendario' && (
        <div className="space-y-6 no-print">
          <div>
            <h3 className="text-3xl font-[1000] text-slate-900 uppercase italic">Calendário de Aulas</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Visualização dos dias letivos mapeados no cronograma</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthsInRange.map(monthStr => {
              const [year, month] = monthStr.split('-').map(Number);
              const firstDay = new Date(year, month - 1, 1);
              const lastDay = new Date(year, month, 0);
              const daysInMonth = lastDay.getDate();
              const startingDayOfWeek = firstDay.getDay();

              const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

              return (
                <div key={monthStr} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-4 text-center">
                    {monthNames[month - 1]} / {year}
                  </h4>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                      <span key={i} className="text-[9px] font-black text-slate-400">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dateFormatted = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isScheduled = scheduleDates[dateFormatted];

                      return (
                        <div
                          key={day}
                          className={`h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                            isScheduled
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {day}
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
