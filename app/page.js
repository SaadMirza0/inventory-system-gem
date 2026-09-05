'use client';
import { useState, useEffect } from 'react';
import { getGemstones, getInvoices } from './actions/gemActions';
import AddGemstoneForm from '@/components/AddGemstoneForm';
import FilterBar from '@/components/FilterBar';
import InventoryList from '@/components/InventoryList';
import InvoiceList from '@/components/InvoiceList';
import ViewInvoiceModal from '@/components/ViewInvoiceModal'; // ✅ Imported view modal component
import dynamic from 'next/dynamic';
import { Layers, History } from 'lucide-react';
import { LogOut, ShieldAlert } from 'lucide-react';
const SellInvoiceModal = dynamic(() => import('@/components/SellInvoiceModal'), {
  ssr: false,
});

export default function Home() {
  const [gems, setGems] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [qtyFilter, setQtyFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sellingGem, setSellingGem] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null); // ✅ Added state to track active inspected file record

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const gemData = await getGemstones();
    const invoiceData = await getInvoices();
    setGems(gemData);
    setInvoices(invoiceData);
  };

// Inside your Home() function in app/page.js:

const filteredGems = gems.filter(gem => {
  const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesQty = qtyFilter === 'all' ? true : qtyFilter === 'out' ? gem.quantity === 0 : gem.quantity > 0;
  
  // ✅ UPDATED MATCHING CONDITION FOR PKR VALUES
  const matchesPrice = priceFilter === 'all' ? true :
                       priceFilter === 'low' ? gem.max_sale_price < 50000 :
                       priceFilter === 'mid' ? (gem.max_sale_price >= 50000 && gem.max_sale_price <= 200000) :
                       priceFilter === 'high' ? gem.max_sale_price > 200000 : true;

  return matchesSearch && matchesQty && matchesPrice;
});

  const handleLogout = () => {

    const ajax = new XMLHttpRequest();
    ajax.open("GET", window.location.href, true, "logout_user", "wrong_password_trigger");
    ajax.send();
    
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {

        window.location.reload();
      }
    };
  };
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
   <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md print:hidden shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Brand Panel */}
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
              Milestone Gems Lab
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                Inventory 
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: High-Contrast Premium Logout Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-600 shadow-2xs hover:bg-rose-600 hover:text-white transition duration-150 outline-hidden cursor-pointer"
            title="Securely Lock Terminal"
          >
            <LogOut size={14} strokeWidth={2.5} />
            <span>Lock Terminal</span>
          </button>
        </div>

      </div>
    </header>


      {/* Main Workspace Dashboard Grid layout container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 print:p-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column Input Panel Form - Auto hides when printing documents */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 print:hidden">
            <AddGemstoneForm onAddSuccess={loadData} />
          </div>

          {/* Right Column Grid logs data tracking workspace */}
          <div className="lg:col-span-8 space-y-5 print:w-full print:block">
            
                 {/* Premium, High-Contrast Tab Selector Button Deck */}
            <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60 gap-2 print:hidden items-center shadow-2xs">
              
              {/* Tab 1: Live Stock Inventory */}
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition duration-200 outline-hidden tracking-wide ${
                  activeTab === 'inventory' 
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/40' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <Layers size={16} strokeWidth={2.5} className={activeTab === 'inventory' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Live Stock Inventory</span>
                <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-black font-mono leading-none tracking-wide ${
                  activeTab === 'inventory' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {gems.length}
                </span>
              </button>

              {/* Tab 2: Sold Invoices History */}
              <button 
                onClick={() => setActiveTab('sales')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition duration-200 outline-hidden tracking-wide ${
                  activeTab === 'sales' 
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/40' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <History size={16} strokeWidth={2.5} className={activeTab === 'sales' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Sold Invoices History</span>
                <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-black font-mono leading-none tracking-wide ${
                  activeTab === 'sales' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {invoices.length}
                </span>
              </button>
              
            </div>


            {/* Dynamic View Condition Switcher Render Deck */}
            {activeTab === 'inventory' ? (
              <div className="space-y-4 print:hidden">
                <FilterBar 
                  searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                  qtyFilter={qtyFilter} setQtyFilter={setQtyFilter}
                  priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                />
                <InventoryList 
                  gems={filteredGems} 
                  onActionSuccess={loadData} 
                  onSellClick={(gem) => setSellingGem(gem)} 
                />
              </div>
            ) : (
              // ✅ Passed the click handler to display the view modal
             <InvoiceList 
    invoices={invoices} 
    onViewClick={(invoice) => setViewingInvoice(invoice)} 
    onActionSuccess={loadData} 
  />
            )}

          </div>
        </div>
      </main>

      {/* Transaction billing form popup overlay view */}
      {sellingGem && (
        <SellInvoiceModal 
          gem={sellingGem} 
          onClose={() => setSellingGem(null)} 
          onSellSuccess={() => {
            setSellingGem(null);
            loadData();
          }} 
        />
      )}

      {/* ✅ Clean invoice document inspector overlay popup sheet */}
      {viewingInvoice && (
        <ViewInvoiceModal 
          invoice={viewingInvoice} 
          onClose={() => setViewingInvoice(null)} 
        />
      )}
    </div>
  );
}
