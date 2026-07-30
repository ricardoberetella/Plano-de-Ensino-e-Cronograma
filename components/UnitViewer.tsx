import React, { useState } from 'react';

import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';



interface RubricCriterion {

  id: string;

  reference: string;

  nsa: string;

  apo: string;

  par: string;

  aut: string;

}



export function UnitViewer() {

  const [criteria, setCriteria] = useState<RubricCriterion[]>([

    {

      id: '1',

      reference: 'effefefeef',

      nsa: 'fefefefefefef',

      apo: '',

      par: '',

      aut: '',

    },

  ]);



  const [editingId, setEditingId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState<RubricCriterion>({

    id: '',

    reference: '',

    nsa: '',

    apo: '',

    par: '',

    aut: '',

  });



  const [isAdding, setIsAdding] = useState(false);

  const [newCriterion, setNewCriterion] = useState<Omit<RubricCriterion, 'id'>>({

    reference: '',

    nsa: '',

    apo: '',

    par: '',

    aut: '',

  });



  const handleEdit = (item: RubricCriterion) => {

    setEditingId(item.id);

    setEditForm(item);

  };



  const handleSaveEdit = () => {

    setCriteria(criteria.map((c) => (c.id === editingId ? editForm : c)));

    setEditingId(null);

  };



  const handleDelete = (id: string) => {

    setCriteria(criteria.filter((c) => c.id !== id));

  };



  const handleAdd = () => {

    if (!newCriterion.reference) return;

    setCriteria([

      ...criteria,

      {

        id: Date.now().toString(),

        ...newCriterion,

      },

    ]);

    setNewCriterion({ reference: '', nsa: '', apo: '', par: '', aut: '' });

    setIsAdding(false);

  };



  return (

    <div className="w-full space-y-4 p-4 bg-slate-50 min-h-screen">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">

        <h2 className="text-xl font-bold italic text-slate-900 uppercase tracking-wide">

          Matriz de Rubricas de Avaliação

        </h2>

        <button

          onClick={() => setIsAdding(true)}

          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-sm"

        >

          <Plus size={16} /> ADICIONAR CRITÉRIO DE RUBRICA

        </button>

      </div>



      {isAdding && (

        <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 space-y-3">

          <h3 className="text-sm font-bold text-slate-900 uppercase">Novo Critério de Rubrica</h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

            <textarea
              rows={1}
              placeholder="Referência / Critério"
              value={newCriterion.reference}
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setNewCriterion({ ...newCriterion, reference: e.target.value });
              }}
              className="p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none overflow-hidden break-all whitespace-pre-wrap"
            />

            <textarea
              rows={1}
              placeholder="NSA (Não Satisfatório)"
              value={newCriterion.nsa}
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setNewCriterion({ ...newCriterion, nsa: e.target.value });
              }}
              className="p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none overflow-hidden break-all whitespace-pre-wrap"
            />

            <textarea
              rows={1}
              placeholder="APO (Atende Parcialmente)"
              value={newCriterion.apo}
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setNewCriterion({ ...newCriterion, apo: e.target.value });
              }}
              className="p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none overflow-hidden break-all whitespace-pre-wrap"
            />

            <textarea
              rows={1}
              placeholder="PAR (Atende Plenamente)"
              value={newCriterion.par}
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setNewCriterion({ ...newCriterion, par: e.target.value });
              }}
              className="p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none overflow-hidden break-all whitespace-pre-wrap"
            />

            <textarea
              rows={1}
              placeholder="AUT (Atende com Autonomia)"
              value={newCriterion.aut}
              onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                setNewCriterion({ ...newCriterion, aut: e.target.value });
              }}
              className="p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none overflow-hidden break-all whitespace-pre-wrap"
            />

          </div>

          <div className="flex justify-end gap-2 pt-2">

            <button

              onClick={() => setIsAdding(false)}

              className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"

            >

              <X size={14} /> Cancelar

            </button>

            <button

              onClick={handleAdd}

              className="px-3 py-1.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"

            >

              <Save size={14} /> Salvar

            </button>

          </div>

        </div>

      )}



      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full table-fixed text-left border-collapse">

            <thead>

              <tr className="bg-slate-900 text-white">

                <th className="w-1/6 p-3 text-sm font-bold">REFERÊNCIA / CRITÉRIO</th>

                <th className="w-1/6 p-3 text-sm font-bold">

                  <span className="text-red-400 font-extrabold">NSA</span>

                </th>

                <th className="w-1/6 p-3 text-sm font-bold">

                  <span className="text-amber-400 font-extrabold">APO</span>

                </th>

                <th className="w-1/6 p-3 text-sm font-bold">

                  <span className="text-blue-400 font-extrabold">PAR</span>

                </th>

                <th className="w-1/6 p-3 text-sm font-bold">

                  <span className="text-emerald-400 font-extrabold">AUT</span>

                </th>

                <th className="w-1/6 p-3 text-sm font-bold text-center">AÇÕES</th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-200">

              {criteria.map((item) => {

                const isEditing = editingId === item.id;



                if (isEditing) {

                  return (

                    <tr key={item.id} className="bg-slate-50">

                      <td className="p-3">

                        <input

                          type="text"

                          value={editForm.reference}

                          onChange={(e) => setEditForm({ ...editForm, reference: e.target.value })}

                          className="w-full p-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                        />

                      </td>

                      <td className="p-3">

                        <input

                          type="text"

                          value={editForm.nsa}

                          onChange={(e) => setEditForm({ ...editForm, nsa: e.target.value })}

                          className="w-full p-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                        />

                      </td>

                      <td className="p-3">

                        <input

                          type="text"

                          value={editForm.apo}

                          onChange={(e) => setEditForm({ ...editForm, apo: e.target.value })}

                          className="w-full p-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                        />

                      </td>

                      <td className="p-3">

                        <input

                          type="text"

                          value={editForm.par}

                          onChange={(e) => setEditForm({ ...editForm, par: e.target.value })}

                          className="w-full p-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                        />

                      </td>

                      <td className="p-3">

                        <input

                          type="text"

                          value={editForm.aut}

                          onChange={(e) => setEditForm({ ...editForm, aut: e.target.value })}

                          className="w-full p-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"

                        />

                      </td>

                      <td className="p-3 text-center">

                        <div className="flex items-center justify-center gap-1">

                          <button

                            onClick={handleSaveEdit}

                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"

                            title="Salvar"

                          >

                            <Save size={16} />

                          </button>

                          <button

                            onClick={() => setEditingId(null)}

                            className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"

                            title="Cancelar"

                          >

                            <X size={16} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                }



                return (

                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">

                    <td className="p-3 text-sm font-medium text-slate-800 align-top break-all whitespace-pre-wrap">{item.reference}</td>

                    <td className="p-3 text-sm text-slate-700 align-top break-all whitespace-pre-wrap">

                      {item.nsa && (

                        <div>

                          <span className="inline-block font-bold text-red-500 mr-1.5">NSA</span>

                          {item.nsa}

                        </div>

                      )}

                    </td>

                    <td className="p-3 text-sm text-slate-700 align-top break-all whitespace-pre-wrap">

                      {item.apo && (

                        <div>

                          <span className="inline-block font-bold text-amber-500 mr-1.5">APO</span>

                          {item.apo}

                        </div>

                      )}

                    </td>

                    <td className="p-3 text-sm text-slate-700 align-top break-all whitespace-pre-wrap">

                      {item.par && (

                        <div>

                          <span className="inline-block font-bold text-blue-500 mr-1.5">PAR</span>

                          {item.par}

                        </div>

                      )}

                    </td>

                    <td className="p-3 text-sm text-slate-700 align-top break-all whitespace-pre-wrap">

                      {item.aut && (

                        <div>

                          <span className="inline-block font-bold text-emerald-500 mr-1.5">AUT</span>

                          {item.aut}

                        </div>

                      )}

                    </td>

                    <td className="p-3 text-center">

                      <div className="flex items-center justify-center gap-1">

                        <button

                          onClick={() => handleEdit(item)}

                          className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"

                          title="Editar"

                        >

                          <Edit2 size={16} />

                        </button>

                        <button

                          onClick={() => handleDelete(item.id)}

                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"

                          title="Excluir"

                        >

                          <Trash2 size={16} />

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })}

              {criteria.length === 0 && (

                <tr>

                  <td colSpan={6} className="p-6 text-center text-sm text-slate-500">

                    Nenhum critério cadastrado.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}



export default UnitViewer;
