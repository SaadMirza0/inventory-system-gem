'use client';
import { useState } from 'react';
import { Calendar, User, Tag, Layers, Maximize, Search, Eye, Trash2 } from 'lucide-react'; // 👈 Added Trash2 icon
import { deleteInvoice } from '@/app/actions/gemActions'; // 👈 Imported our new delete action

export default function InvoiceList({ invoices, onViewClick, onActionSuccess }) {
  const [invoiceSearch, setInvoiceSearch] = useState('');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesName = inv.customer_name.toLowerCase().includes(invoiceSearch.toLowerCase());
    const matchesId = inv.id.toString().includes(invoiceSearch);
    return matchesName || matchesId;
  });

  // ✅ HANDLER TO CONFIRM AND REMOVE RECORD FROM DB
  const handleDeleteInvoice = async (id) => {
    if (confirm('Are you sure you want to permanently delete this invoice record from history?')) {
      try {
        await deleteInvoice(id);
        if (onActionSuccess) onActionSuccess(); // Triggers real-time re-fetch state update
      } catch (err) {
        alert('Error removing record: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="relative flex items-center rounded-lg border border-slate-200 bg-white px-3 shadow-2xs focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition">
        <Search size={16} className="text-slate-400 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search history by Customer Name or Invoice ID..." 
          value={invoiceSearch} 
          onChange={(e) => setInvoiceSearch(e.target.value)} 
          className="w-full bg-transparent border-0 px-2 py-2.5 text-sm text-slate-900 outline-hidden placeholder:text-slate-400" 
        />
      </div>

      {/* History Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">Completed Sales History</h3>
          <p className="text-xs text-slate-500 mt-0.5">Logs of all gemstone transactions recorded in the database.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3">Invoice & Date</th>
                <th className="px-5 py-3">Gemstone Profile</th>
                <th className="px-5 py-3">Customer Details</th>
                <th className="px-5 py-3">Seller Details</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-slate-400 text-xs">
                    No matching sales invoices found in the database.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/40 transition duration-75">
                    
                    {/* Invoice ID & Date */}
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-900 block">#{inv.id}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar size={12}/> {new Date(inv.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    
                    {/* Gemstone Product Details */}
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-indigo-950 block">{inv.gem_name}</span>
                      <div className="flex gap-2 text-xs text-slate-500 mt-1 font-mono">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5"><Layers size={10}/> Qty: {inv.sold_quantity}</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5"><Tag size={10}/> {inv.weight}</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5"><Maximize size={10}/> {inv.dimensions}</span>
                      </div>
                    </td>
                    
                    {/* Customer Info */}
                    <td className="px-5 py-3.5">
                      <span className="text-slate-800 font-medium block flex items-center gap-1"><User size={13} className="text-slate-400"/> {inv.customer_name}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5">{inv.customer_number}</span>
                    </td>
                    
                    {/* Seller Info */}
                    <td className="px-5 py-3.5">
                      <span className="text-slate-700 block">{inv.seller_name}</span>
                      <span className="text-xs text-slate-400 font-mono">{inv.seller_number}</span>
                    </td>
                    
                    {/* Actions Controller Column Area */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-emerald-700 font-mono text-sm">
                          Rs. {Number(inv.sold_price).toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => onViewClick(inv)} 
                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 shadow-3xs hover:bg-slate-50 transition"
                          >
                            <Eye size={12}/> View
                          </button>
                          {/* ✅ NEW HIGH-CONTRAST DELETE BUTTON AS REQUESTED */}
                          <button 
                            onClick={() => handleDeleteInvoice(inv.id)} 
                            className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-white px-2 py-1 text-xs font-semibold text-rose-600 shadow-3xs hover:bg-rose-50 hover:text-rose-700 transition"
                            title="Delete Invoice Entry"
                          >
                            <Trash2 size={12}/> Delete
                          </button>
                        </div>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

