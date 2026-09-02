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


  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-xs">
              <span className="text-xl text-white">💎</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">Gemstone Lab Panel</h1>
              <p className="text-xs text-slate-500">Internal Inventory System</p>
            </div>
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
            
            {/* Nav Tabs Selector Button Deck */}
            <div className="flex border-b border-slate-200 gap-6 print:hidden">
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`pb-3 text-sm font-semibold flex items-center gap-2 transition border-b-2 outline-hidden ${activeTab === 'inventory' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <Layers size={16}/> Live Stock Inventory ({gems.length})
              </button>
              <button 
                onClick={() => setActiveTab('sales')}
                className={`pb-3 text-sm font-semibold flex items-center gap-2 transition border-b-2 outline-hidden ${activeTab === 'sales' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <History size={16}/> Sold Invoices History ({invoices.length})
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
              <InvoiceList invoices={invoices} onViewClick={(invoice) => setViewingInvoice(invoice)} />
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
