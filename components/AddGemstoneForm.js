'use client';
import { addGemstone } from '@/app/actions/gemActions';

export default function AddGemstoneForm({ onAddSuccess }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGemstone(new FormData(e.target));
    e.target.reset();
    onAddSuccess();
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <h2 className="text-base font-semibold leading-6 text-slate-900">Register Stone</h2>
      <p className="mt-1 text-xs text-slate-500 mb-5">Append fresh master item details into warehouse logs.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Gemstone Name</label>
          <input name="name" required placeholder="e.g. Kashmiri Blue Sapphire" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden focus:border-indigo-500 transition" />
        </div>

        {/* Price and Slide Down Unit select panel grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">Buy Price (PKR)</label>
            <input name="buy_price" type="number" step="1" required placeholder="e.g. 50000" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden focus:border-indigo-500 transition" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Unit Type</label>
            <select name="price_unit" className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm bg-white outline-hidden focus:border-indigo-500 transition">
              <option value="Carat">Carat</option>
              <option value="gram">gram</option>
              <option value="Piece">Piece</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Min Sale Price (PKR)</label>
            <input name="min_sale_price" type="number" step="1" required placeholder="Min (Rs.)" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden focus:border-indigo-500 transition" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Max Sale Price (PKR)</label>
            <input name="max_sale_price" type="number" step="1" required placeholder="Max (Rs.)" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden focus:border-indigo-500 transition" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Total Stock Quantity</label>
          <input name="quantity" type="number" required placeholder="1" defaultValue="1" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden focus:border-indigo-500 transition" />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Log Date & Time <span className="text-slate-400 font-normal">(Optional)</span></label>
          <input name="created_at" type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-hidden focus:border-indigo-500 transition text-slate-500" />
        </div>

        <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition duration-150">
          Add Gemstone Profile
        </button>
      </form>
    </div>
  );
}

