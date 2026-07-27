{/* SEÇÃO III: ESTRUTURA DE UNIDADES */}
<div className="border-t border-slate-100 pt-6 space-y-4">
  <div className="flex justify-between items-center">
    <div>
      <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em]">
        III. Estrutura de Unidades
      </h4>
      <p className="text-xs text-slate-400 font-medium">
        Cadastre e ajuste a sigla, nome, carga horária e semestre de cada unidade.
      </p>
    </div>
    <button
      type="button"
      onClick={handleOpenAddUnit}
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-md flex items-center gap-1 shrink-0"
    >
      + Nova UC
    </button>
  </div>

  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
    {editingPlan.units?.map((unit, idx) => (
      <div
        key={unit.id || idx}
        className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-slate-300"
      >
        <div className="flex items-center gap-3 flex-1 w-full">
          {/* Sigla / Código */}
          <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-center shrink-0">
            <span className="text-[10px] font-[1000] uppercase block">
              {unit.code || `UC-${idx + 1}`}
            </span>
          </div>

          {/* Nome e Detalhes */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-[1000] text-slate-900 uppercase truncate">
              {unit.name}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                {unit.semester || 1}º Semestre
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">
                {unit.totalHours || 0}h
              </span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
          <button
            type="button"
            onClick={() => handleOpenEditUnit(unit)}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => handleDeleteUnit(unit.id)}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all shadow-sm"
          >
            Excluir
          </button>
        </div>
      </div>
    ))}

    {(!editingPlan.units || editingPlan.units.length === 0) && (
      <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase">
          Nenhuma unidade curricular cadastrada neste plano.
        </p>
      </div>
    )}
  </div>
</div>
