'use client';
import { X, Printer } from 'lucide-react';

export default function ViewInvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs z-50 animate-fade-in print:bg-white print:p-0 print:static print:block">

    
      <style jsx global>{`
        @media print {
          /* 2. Completely hide the dashboard header and main body layout from print calculations */
          header, main, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
     <div className="thermal-receipt-slip bg-white rounded-xl shadow-2xl max-w-xl w-full flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 print:shadow-none print:max-w-none print:w-[80mm] print:mx-auto print:bg-white print:text-black print:overflow-visible print:border-none">
        
  {/* Header Action Bar — Hidden completely when executing window print commands */}
  <div className="flex justify-between items-center px-6 py-4 border-b print:hidden bg-slate-50">
    <h3 className="text-sm font-bold text-slate-800">Review Invoice #{invoice.id}</h3>
    <div className="flex items-center gap-3">
      <button 
        onClick={() => window.print()} 
        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
      >
        <Printer size={14}/> Print Invoice
      </button>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
    </div>
  </div>

  {/* Main Receipt Sheet Body Canvas */}
  <div className="p-8 space-y-6 overflow-y-auto flex-1 text-slate-800 print:p-4 print:space-y-4 print:text-[13px] print:font-mono print:overflow-visible print:text-black print:w-full">
    
    {/* Section 1: Branded Identity Center-Aligned Hub Header */}
    <div className="text-center pb-2 border-b border-slate-100 flex flex-col items-center justify-center print:border-none print:pb-0 print:mb-2 print:w-full">
      <div className="flex items-center justify-center gap-2 mb-1 print:mb-0.5">
        <span className="text-2xl print:hidden">💎</span>
        <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase print:text-[16px] print:font-bold print:text-black print:tracking-wider">
          Milestone Gems Lab
        </h2>
      </div>
      <p className="text-xs text-slate-400 font-mono print:text-[13px] print:text-black font-semibold">
        Ph: {invoice.seller_number || "03010544620"}
      </p>
      
      {/* Dynamic Receipt Time-stamp Logs metadata Row */}
      <div className="w-full text-center mt-3 pt-2 border-t border-slate-100 border-dashed print:border-black print:mt-2 print:pt-2 font-mono text-xs print:text-[12px] print:space-y-0.5">
        <p className="print:text-black">Date: {new Date(invoice.created_at).toLocaleString()}</p>
        <p className="print:text-black">Payment Mode: CASH</p>
      </div>
    </div>

    {/* Section 2: Desktop Screen Only Client Address Row Component Block */}
    <div className="grid grid-cols-2 gap-6 bg-slate-50 rounded-xl p-4 border border-slate-100 print:hidden">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">Issued By (Seller):</span>
        <h4 className="text-sm font-bold text-slate-900">{invoice.seller_name}</h4>
        <p className="text-xs font-mono text-slate-500 mt-0.5">Contact: {invoice.seller_number}</p>
      </div>
      <div className="text-right">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">Prepared For (Customer):</span>
        <h4 className="text-sm font-bold text-slate-900">{invoice.customer_name}</h4>
        <p className="text-xs font-mono text-slate-500 mt-0.5">Contact: {invoice.customer_number}</p>
      </div>
    </div>

    {/* Section 3: High Contrast Customer Data Registry Profile (Thermal Print View Only) */}
    <div className="hidden print:block text-[13px] border-t border-b border-dashed border-black py-2.5 my-3 space-y-1 w-full font-mono">
      <p className="print:text-black"><b>INVOICE ID :</b> #{invoice.id}</p>
      <p className="print:text-black"><b>CUSTOMER   :</b> {invoice.customer_name}</p>
      <p className="print:text-black"><b>CONTACT    :</b> {invoice.customer_number}</p>
    </div>

    {/* Section 4: Spacious Horizontal Line Item Grid Asset Table */}
    <div className="space-y-2 print:space-y-0 print:w-full print:mb-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block print:hidden">Transaction Item Details</span>
      <div className="border border-slate-200 rounded-lg overflow-hidden print:border-none print:rounded-none print:w-full">
        <table className="w-full text-left border-collapse print:text-[13px] print:w-full">
          
          {/* Table Headings Columns Configuration */}
          <thead className="bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-600 print:bg-transparent print:border-b print:border-black print:text-black print:font-bold">
            <tr>
              <th className="p-3 print:py-1.5 print:px-0 print:text-left print:font-bold w-[55%]">ITEM</th>
              <th className="p-3 print:py-1.5 print:px-0 text-center print:text-center print:font-bold w-[15%]">QTY</th>
              <th className="p-3 print:py-1.5 print:px-0 text-right print:text-right print:font-bold w-[30%]">TOTAL</th>
            </tr>
          </thead>
          
          {/* Table Body Row Elements */}
          <tbody className="text-xs divide-y divide-slate-100 print:divide-y-0 print:text-black font-mono">
            <tr className="print:border-b print:border-dashed print:border-black">
              <td className="p-3 print:py-2 print:px-0 font-bold text-slate-900 print:text-black print:text-left">
                <span className="block font-bold print:font-bold text-sm print:text-[13px] mb-0.5">{invoice.gem_name}</span>
                <span className="block text-[11px] text-slate-500 font-normal print:text-[12px] print:text-black print:block mt-1">
                   Specs: {invoice.weight}/{invoice.price_unit || 'Piece'} ({invoice.dimensions})
                </span>
              </td>
              <td className="p-3 print:py-2 print:px-0 text-center font-medium print:text-black print:text-center">
                {invoice.sold_quantity}
              </td>
              <td className="p-3 print:py-2 print:px-0 text-right font-bold text-slate-900 print:font-bold print:text-black print:text-right">
                Rs. {Number(invoice.sold_price).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Section 5: Formatted Pricing Calculations Column Blocks */}
    <div className="flex justify-end pt-1 print:pt-0 print:w-full print:block">
      <div className="w-64 border-t border-slate-200 pt-3 space-y-1.5 text-right print:w-full print:border-t-0 print:pt-0 print:space-y-1">
        
        <div className="flex justify-between text-xs text-slate-500 print:text-[13px] print:text-black print:w-full font-mono">
          <span>Subtotal:</span>
          <span>Rs. {Number(invoice.sold_price).toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-xs text-slate-500 print:text-[13px] print:text-black print:w-full font-mono">
          <span>Tax (Excluded):</span>
          <span>+ Rs. 0</span>
        </div>
        
        {/* Net Invoice Grand Value Box */}
        <div className="flex justify-between items-center text-sm font-bold text-slate-900 border-t border-dashed border-slate-200 pt-2 mt-2 print:text-[14px] print:text-black print:border-t print:border-black print:pt-2 print:mt-1.5 font-mono">
          <span className="uppercase font-bold print:font-bold">NET TOTAL:</span>
          <span className="text-lg font-black text-emerald-700 font-mono print:text-[14px] print:font-bold print:text-black">
            Rs. {Number(invoice.sold_price).toLocaleString()}
          </span>
        </div>
        
      </div>
    </div>


    <div className="text-center pt-8 border-t border-slate-100 print:pt-4 print:border-t print:border-dashed print:border-black print:mt-5 print:text-center print:w-full print:flex print:flex-col print:items-center print:justify-center">
      

      <p className="text-xs uppercase font-bold tracking-wider text-slate-800 print:text-[13px] print:text-black print:font-bold print:text-center print:block print:mb-2">
        THANK YOU !!
      </p>
      <p className="text-[10px] text-slate-400 font-mono mt-1 hidden print:block print:text-[12px] print:text-black print:text-center print:leading-normal print:mb-3">
        Please make sure to check your Product before Purchasing otherwise we are not responsible for any damage.
      </p>
      
      <p className="text-[10px] text-slate-400 font-mono mt-1 hidden print:block print:text-[11px] print:text-slate-700 print:text-center">
        Software By Saad Mirza
      </p>
      <p className="text-[10px] text-slate-400 italic print:hidden">
        This is a system-generated electronic certification invoice recorded securely inside Gems Lab database systems.
      </p>
    </div>
    
  </div>
</div>

    </div>
  );
}
