'use client';
import { Search } from 'lucide-react';

export default function FilterBar({ searchTerm, setSearchTerm, qtyFilter, setQtyFilter, priceFilter, setPriceFilter }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center">
      
      {/* Optimized Keyword Search Input */}
      <div className="relative flex flex-1 items-center rounded-lg border border-slate-200 bg-slate-50/50 px-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-indigo-500 transition">
        <Search size={16} className="text-slate-400 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search gemstones by name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full bg-transparent border-0 px-2 py-2.5 text-sm text-slate-900 outline-hidden placeholder:text-slate-400" 
        />
      </div>
      
      {/* Clean Dropdown Filters Bar */}
      <div className="flex items-center gap-3">
        {/* Stock Availability Dropdown */}
        <select 
          value={qtyFilter} 
          onChange={(e) => setQtyFilter(e.target.value)} 
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-hidden focus:border-indigo-500 transition"
        >
          <option value="all">All Stocks</option>
          <option value="instock">In Stock Only</option>
          <option value="out">Out of Stock</option>
        </select>
        
        {/* PKR Pricing Valuation Dropdown */}
        <select 
          value={priceFilter} 
          onChange={(e) => setPriceFilter(e.target.value)} 
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-hidden focus:border-indigo-500 transition"
        >
          <option value="all">All Prices (PKR)</option>
          <option value="low">Under Rs. 50,000</option>
          <option value="mid">Rs. 50,000 - Rs. 2,000,000</option>
          <option value="high">Premium Over Rs. 2,000,000</option>
        </select>
      </div>
    </div>
  );
}
