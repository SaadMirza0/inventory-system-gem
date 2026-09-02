'use client';
import { useState } from 'react';
import { Trash2, Edit2, Check, X, ArrowUpRight } from 'lucide-react';
import { deleteGemstone, updateGemstone } from '@/app/actions/gemActions';

export default function InventoryList({ gems, onActionSuccess, onSellClick }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', buy_price: '', max_sale_price: '', min_sale_price: '', quantity: '', price_unit: '' });

  const startEdit = (gem) => {
    setEditingId(gem.id);
    setEditForm({ name: gem.name, buy_price: gem.buy_price, max_sale_price: gem.max_sale_price, min_sale_price: gem.min_sale_price, quantity: gem.quantity, price_unit: gem.price_unit });
  };

  const handleSave = async (id) => {
    await updateGemstone(id, editForm);
    setEditingId(null);
    onActionSuccess();
  };

  const handleDelete = async (id) => {
    if (confirm('Permanently delete this stone profile?')) {
      await deleteGemstone(id);
      onActionSuccess();
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold tracking-wider text-slate-500 uppercase">
            <tr>
              <th className="px-5 py-3.5">Gemstone Details</th>
              <th className="px-5 py-3.5">Availability</th>
              <th className="px-5 py-3.5">Cost Basis</th>
              <th className="px-5 py-3.5">Sale Guardrails (Rs.)</th>
              <th className="px-5 py-3.5 text-right">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {gems.map((gem) => (
              <tr key={gem.id} className="hover:bg-slate-50/50 transition duration-75">
                {editingId === gem.id ? (
                  <>
                    <td className="p-3"><input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="border rounded px-2 py-1 text-xs w-full border-indigo-500" /></td>
                    <td className="p-3"><input type="number" value={editForm.quantity} onChange={(e) => setEditForm({...editForm, quantity: e.target.value})} className="border rounded px-2 py-1 text-xs w-16 border-indigo-500" /></td>
                    <td className="p-3 flex gap-1">
                      <input type="number" value={editForm.buy_price} onChange={(e) => setEditForm({...editForm, buy_price: e.target.value})} className="border rounded px-1 py-1 text-xs w-20 border-indigo-500" />
                      <select value={editForm.price_unit} onChange={(e) => setEditForm({...editForm, price_unit: e.target.value})} className="border rounded text-xs">
                        <option value="Carat">Carat</option>
                        <option value="gram">gram</option>
                        <option value="Piece">Piece</option>
                      </select>
                    </td>
                    <td className="p-3 flex items-center gap-1.5">
                      <input type="number" value={editForm.min_sale_price} onChange={(e) => setEditForm({...editForm, min_sale_price: e.target.value})} className="border rounded px-2 py-1 text-xs w-16 border-indigo-500" />
                      <span>/</span>
                      <input type="number" value={editForm.max_sale_price} onChange={(e) => setEditForm({...editForm, max_sale_price: e.target.value})} className="border rounded px-2 py-1 text-xs w-16 border-indigo-500" />
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => handleSave(gem.id)} className="text-emerald-600 mr-2"><Check size={16} /></button>
                      <button onClick={() => setEditingId(null)} className="text-slate-400"><X size={16} /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-5 py-3.5 font-medium text-slate-900">{gem.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide ${gem.quantity === 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                        {gem.quantity} units
                      </span>
                    </td>
                    {/* ✅ SHOWS DYNAMIC UNITS e.g. Rs. 2,000/gram */}
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">Rs. {Number(gem.buy_price).toLocaleString()}/{gem.price_unit}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600">Rs. {Number(gem.min_sale_price).toLocaleString()} - Rs. {Number(gem.max_sale_price).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <button onClick={() => onSellClick(gem)} disabled={gem.quantity === 0} className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-30">
                          Sell <ArrowUpRight size={12}/>
                        </button>
                        <button onClick={() => startEdit(gem)} className="text-slate-400 hover:text-indigo-600"><Edit2 size={14}/></button>
                        <button onClick={() => handleDelete(gem.id)} className="text-slate-400 hover:text-rose-600"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

