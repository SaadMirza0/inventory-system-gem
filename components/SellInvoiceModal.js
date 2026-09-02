'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { createInvoiceAndSell } from '@/app/actions/gemActions';

export default function SellInvoiceModal({ gem, onClose, onSellSuccess }) {
  // Pass the item price unit as state to auto append inside text fields
  const [form, setForm] = useState({ 
    customer_name: '', 
    customer_number: '+92', 
    seller_name: '', 
    seller_number: '0308 9110070', 
    sold_price: '', 
    sold_quantity: 1, 
    weight: '', 
    dimensions: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Auto formatting the weight metric input box to include the gem's dynamic storage unit 
      const finalWeightString = form.weight.toLowerCase().includes(gem.price_unit.toLowerCase()) 
        ? form.weight 
        : `${form.weight} ${gem.price_unit}`;

      const dbResponse = await createInvoiceAndSell({
        gemstone_id: gem.id,
        gem_name: gem.name,
        price_unit: gem.price_unit, // Pass tracking unit
        weight: finalWeightString,
        ...form
      });

      const invoiceId = dbResponse?.id || 'N/A';
      const orderDate = dbResponse?.created_at ? new Date(dbResponse.created_at).toLocaleString() : new Date().toLocaleString();

      const textTemplate = `✨ *GEMS LAB INVOICE* ✨\n` +
        `----------------------------------------\n` +
        `🧾 *Invoice ID:* #${invoiceId}\n` +
        `📅 *Date/Time:* ${orderDate}\n\n` +
        `👤 *Customer:* ${form.customer_name} (${form.customer_number})\n` +
        `🤵 *Seller:* ${form.seller_name} (${form.seller_number})\n` +
        `----------------------------------------\n` +
        `💎 *Gemstone:* ${gem.name}\n` +
        `📦 *Quantity Sold:* ${form.sold_quantity} unit(s)\n` +
        `⚖️ *Weight Metric:* ${finalWeightString}\n` +
        `📏 *Dimensions:* ${form.dimensions}\n` +
        `💰 *Total Price:* PKR ${form.sold_price} (Calculated per ${gem.price_unit})\n` +
        `----------------------------------------\n` +
        `Thank you for choosing Gems Lab!`;

      const cleanPhone = form.customer_number.replace(/\D/g, "");
      window.open(`https://wa.me{cleanPhone}?text=${encodeURIComponent(textTemplate)}`, '_blank');
      
      onSellSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-sm text-slate-700">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-bold text-slate-900">Process Bill: {gem.name}</h3>
          <button type="button" onClick={onClose}><X size={20}/></button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Customer Name</label>
            <input required type="text" value={form.customer_name} onChange={(e) => setForm({...form, customer_name: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Customer Number</label>
            <input required type="text" placeholder="923001234567" value={form.customer_number} onChange={(e) => setForm({...form, customer_number: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Seller Name</label>
            <input required type="text" value={form.seller_name} onChange={(e) => setForm({...form, seller_name: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Seller Phone Number</label>
            <input required type="text" value={form.seller_number} onChange={(e) => setForm({...form, seller_number: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Total Price (PKR)</label>
            <input required type="number" step="0.01" placeholder={`Range: ${gem.min_sale_price}-${gem.max_sale_price}`} value={form.sold_price} onChange={(e) => setForm({...form, sold_price: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Quantity Sold</label>
            <input required type="number" min="1" max={gem.quantity} value={form.sold_quantity} onChange={(e) => setForm({...form, sold_quantity: parseInt(e.target.value, 10)})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
          <div>
         
            <label className="text-xs font-semibold block text-slate-600 mb-1">Gem Weight (Unit: {gem.price_unit})</label>
            <input required type="text" placeholder={`e.g. 4.2 ( ${gem.price_unit} )`} value={form.weight} onChange={(e) => setForm({...form, weight: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-slate-600 mb-1">Dimensions (e.g. 10x8x4 mm)</label>
            <input required type="text" placeholder="10x8x4 mm" value={form.dimensions} onChange={(e) => setForm({...form, dimensions: e.target.value})} className="border p-2 w-full rounded-lg border-slate-200 outline-hidden" />
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-500 transition mt-2">
          Create Invoice & Open WhatsApp
        </button>
      </form>
    </div>
  );
}

