'use client';
import { X, Printer } from 'lucide-react';

export default function ViewInvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const unit = invoice.price_unit || 'Piece';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs z-50 animate-fade-in print:bg-white print:p-0 print:static print:block">
      
      {/* 🛠️ Specialized Continuous Thermal Roll Spacing Overrides */}
      <style jsx global>{`
        @media print {
          /* 1. Prevent standard browser layout pagination breaks */
          @page {
            size: 80mm auto;
            margin: 0mm;
          }

          /* 2. Hide web dashboard background layers completely */
          header, main, .print\\:hidden, button {
            display: none !important;
          }
          
          /* 3. Drop modal fixed windows positioning rules */
          .fixed.inset-0 {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            background: transparent !important;
            padding: 0 !important;
            display: block !important;
            backdrop-filter: none !important;
          }

          /* 4. Thermal Paper Sheet Canvas Adjustment */
          .invoice-card-canvas {
            display: block !important;
            box-shadow: none !important;
            border: none !important;
            width: 80mm !important;
            max-width: 80mm !important;
            margin: 0 !important;
            padding: 6mm 5mm 6mm 4mm !important;
            background: white !important;
            color: black !important;
            page-break-inside: avoid !important;
            font-family: 'Courier New', Courier, monospace !important;
            font-size: 13px !important; 
            line-height: 1.5 !important;
          }

          /* 5. Center align header and footer block segments natively */
          .thermal-header-block, .thermal-footer-block {
            text-align: center !important;
            width: 100% !important;
          }
          
          .thermal-header-block *, .thermal-footer-block * {
            text-align: center !important;
          }

          /* 6. Enforce crisp layout parameter alignment inside columns tracking grid */
          table {
            width: 100% !important;
            table-layout: fixed !important;
            margin-top: 3mm !important;
            margin-bottom: 3mm !important;
          }
          
          th, td {
            font-family: 'Courier New', Courier, monospace !important;
            font-size: 13px !important;
            padding: 4px 0px !important;
          }

          /* 7. Ensure layout text lines look distinct and do not stack close together */
          .meta-info-row {
            margin-bottom: 2mm !important;
          }
        }
      `}</style>

      {/* Main Core Invoice Box container */}
      <div className="invoice-card-canvas bg-white rounded-xl shadow-2xl max-w-xl w-full flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 print:shadow-none print:max-w-none print:w-[80mm] print:mx-auto print:bg-white print:text-black print:overflow-visible print:border-none">
        
        {/* Interactive Top Actions Controller Bar — Hidden when executing window printing */}
        <div className="flex justify-between items-center px-6 py-4 border-b print:hidden bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800">Review Invoice #{invoice.id}</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()} 
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Printer size={14}/> Print Invoice
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
          </div>
        </div>

        {/* Core Invoice Receipt Sheet Document Area */}
        <div className="p-8 space-y-6 overflow-y-auto flex-1 text-slate-800 print:p-0 print:space-y-4 print:text-[13px] print:font-mono print:overflow-visible print:text-black print:w-full">
          
          {/* Section 1: Center-Aligned Branded Header Hub */}
          <div className="thermal-header-block border-b border-slate-100 pb-2 text-center flex flex-col items-center justify-center print:border-none print:pb-0 print:mb-1 print:w-full">
            <div className="flex items-center justify-center gap-2 mb-1 print:mb-0">
              <span className="text-2xl print:hidden">💎</span>
              <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase print:text-[16px] print:font-bold print:text-black print:tracking-wider">
                Milestone Gems Lab
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono print:text-[13px] print:text-black font-bold">
              Ph: {invoice.seller_number || "0308 9110070"}
            </p>
            
            {/* Dashed Separator break line */}
            <div className="w-full text-center mt-3 pt-2 border-t border-slate-100 border-dashed print:border-black print:mt-2 print:pt-2 font-mono text-xs print:text-[13px] print:space-y-0.5">
              <p className="print:text-black">Date: {new Date(invoice.created_at).toLocaleString()}</p>
              <p className="print:text-black">Payment Mode: CASH</p>
            </div>
          </div>

          {/* Section 2: Desktop Screen View Only Address Blocks */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 rounded-xl p-4 border border-slate-100 print:hidden">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">Issued By:</span>
              <h4 className="text-sm font-bold text-slate-900">{invoice.seller_name}</h4>
              <p className="text-xs font-mono text-slate-500">Contact: {invoice.seller_number}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">Prepared For:</span>
              <h4 className="text-sm font-bold text-slate-900">{invoice.customer_name}</h4>
              <p className="text-xs font-mono text-slate-500">Contact: {invoice.customer_number}</p>
            </div>
          </div>

          {/* Section 3: Clean Metadata Specifications Grid (Thermal Print View Only) */}
          <div className="hidden print:block text-[13px] border-t border-b border-dashed border-black py-3 my-2 space-y-1.5 w-full font-mono text-left">
            <div className="meta-info-row"><b>INVOICE ID :</b> #{invoice.id}</div>
            <div className="meta-info-row"><b>CUSTOMER   :</b> {invoice.customer_name}</div>
            <div className="meta-info-row"><b>CONTACT    :</b> {invoice.customer_number}</div>
          </div>

          {/* Section 4: High-Contrast Asset Item Table */}
          <div className="space-y-2 print:space-y-0 print:w-full print:text-left print:mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block print:hidden">Transaction Item Details</span>
            <div className="border border-slate-200 rounded-lg overflow-hidden print:border-none print:rounded-none print:w-full">
              <table className="w-full text-left border-collapse print:text-[13px] print:w-full">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-600 print:bg-transparent print:border-b print:border-black print:text-black print:font-bold">
                  <tr>
                    <th className="p-3 print:py-1.5 print:px-0 print:text-left print:font-bold w-[55%]">ITEM</th>
                    <th className="p-3 print:py-1.5 print:px-0 text-center print:text-center print:font-bold w-[15%]">QTY</th>
                    <th className="p-3 print:py-1.5 print:px-0 text-right print:text-right print:font-bold w-[30%]">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100 print:divide-y-0 print:text-black font-mono">
                  <tr className="print:border-b print:border-dashed print:border-black">
                    <td className="p-3 print:py-2 print:px-0 font-bold text-slate-900 print:text-black print:text-left">
                      <span className="block font-bold print:font-bold text-sm print:text-[13px] mb-0.5">{invoice.gem_name}</span>
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5 print:text-[12px] print:text-black print:block">
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

          {/* Section 5: Formatted Billing Calculations Sheet */}
          <div className="flex flex-col items-end border-t border-slate-200 pt-4 print:border-t print:border-black print:pt-2 print:mt-2">
            <div className="w-64 space-y-2 print:w-full">
              <div className="flex justify-between text-sm print:text-[13px]">
                <span className="font-medium text-slate-500 print:text-black">Subtotal:</span>
                <span className="font-bold">Rs. {Number(invoice.sold_price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm print:text-[13px] border-b border-slate-100 pb-2 print:border-b print:border-black">
                <span className="font-medium text-slate-500 print:text-black">Tax (Excluded):</span>
                <span className="font-bold">+ Rs. 0</span>
              </div>
              <div className="flex justify-between text-base font-black print:text-[15px] pt-1">
                <span>NET TOTAL:</span>
                <span className="text-indigo-700 print:text-black">Rs. {Number(invoice.sold_price).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Section 6: Spaced Center-Aligned Receipt Footer Notice */}
          <div className="thermal-footer-block text-center text-xs space-y-1 pt-4 border-t border-slate-200 print:border-t print:border-black print:pt-3 print:mt-3">
            <p className="font-bold text-slate-700 print:text-black text-sm">THANK YOU !!</p>
            <p className="text-slate-400 print:text-black text-[10px] print:text-[11px]">
              Please make sure to check your Product before Purchasing otherwise we are not responsible for any damage.
            </p>
            <p className="text-slate-300 print:text-black text-[9px] print:text-[10px] print:font-bold">Software By Saad Mirza</p>
       
          </div>
        </div>
      </div>
    </div>
  );
}
