{/* ABA CRONOGRAMA */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center gap-6 border-b border-slate-200 pb-4 no-print">
              <div>
                <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic">Plano de aula | Cronograma</h3>
                <p className="text-xs text-slate-500 font-semibold">Visualização e edição no formato padrão de tabela pedagógica</p>
              </div>
              <div className="flex gap-3">
                {isAdmin && (
                  <button 
                    onClick={addScheduleEntry}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all"
                  >
                    <span>+ Adicionar Linha</span>
                  </button>
                )}
                <button 
                  onClick={handlePrint} 
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-2 hover:bg-slate-900 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  Imprimir Cronograma
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-lg border-2 border-black overflow-hidden shadow-sm">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-black text-slate-900">
                    <th className="p-3 w-[15%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Horas/Aulas/Data
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Capacidades
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Conhecimentos
                    </th>
                    <th className="p-3 w-[25%] text-xs font-black uppercase border-r border-black text-center align-middle">
                      Estratégias / Atividades
                    </th>
                    <th className="p-3 w-[20%] text-xs font-black uppercase text-center align-middle">
                      Recursos / Avaliação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black text-xs font-medium">
                  {localSchedule.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 group relative">
                      <td className="p-2 border-r border-black align-top text-center bg-slate-50/30">
                        <div className="px-1 overflow-hidden">
                          <DebouncedInput
                            value={entry.date}
                            onChange={(val) => updateEntry(entry.id, 'date', val)}
                            disabled={!isAdmin}
                            className="w-full text-center font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none text-xs break-words"
                            placeholder="DD/MM/AAAA"
                          />
                          <div className="text-[10px] text-slate-400 font-semibold mt-1 uppercase truncate">
                            {getDayOfWeek(entry.date)}
                          </div>
                          <div className="mt-2 flex items-center justify-center gap-1">
                            <DebouncedInput
                              value={String(entry.hours || '')}
                              onChange={(val) => updateEntry(entry.id, 'hours', Number(val) || 0)}
                              disabled={!isAdmin}
                              className="w-12 text-center font-black text-blue-600 bg-blue-50 border border-blue-100 rounded p-0.5 text-xs"
                            />
                            <span className="text-[10px] text-slate-500 font-bold">h</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea
                          value={entry.capacities}
                          onChange={(val) => updateEntry(entry.id, 'capacities', val)}
                          placeholder="Capacidades..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed"
                          rows={3}
                        />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea
                          value={entry.knowledges}
                          onChange={(val) => updateEntry(entry.id, 'knowledges', val)}
                          placeholder="Conhecimentos..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed"
                          rows={3}
                        />
                      </td>
                      <td className="p-2 border-r border-black align-top">
                        <EditableArea
                          value={entry.strategy}
                          onChange={(val) => updateEntry(entry.id, 'strategy', val)}
                          placeholder="Estratégias / Atividades..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed"
                          rows={3}
                        />
                      </td>
                      <td className="p-2 align-top relative">
                        <EditableArea
                          value={entry.resources}
                          onChange={(val) => updateEntry(entry.id, 'resources', val)}
                          placeholder="Recursos / Avaliação..."
                          disabled={!isAdmin}
                          className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-xs leading-relaxed pr-6"
                          rows={3}
                        />
                        {isAdmin && (
                          <button
                            onClick={() => removeScheduleEntry(entry.id)}
                            className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            title="Excluir linha"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
