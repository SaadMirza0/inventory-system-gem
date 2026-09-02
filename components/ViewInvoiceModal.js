'use client';
import { X, Printer } from 'lucide-react';

export default function ViewInvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs z-50 animate-fade-in print:bg-white print:p-0 print:static print:block">

      {/* 🛠️ Left-Aligned Thermal Printer Optimization: Explicit 80mm Alignment Calibration */}
           {/* 🛠️ Left-Aligned Thermal Printer Optimization: Explicit 80mm Alignment & Increased Font Sizing */}
      <style jsx global>{`
        @media print {
          /* 1. Force the print engine to assume a custom 80mm rolling format */
          @page {
            size: 80mm auto;
            margin: 0mm;
          }

          /* 2. Completely hide the dashboard header and main body layout from print calculations */
          header, main, .print\\:hidden {
            display: none !important;
          }
          
          /* 3. Reset the modal overlay wrapper container completely */
          .fixed.inset-0 {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            background: transparent !important;
            padding: 0 !important;
            display: block !important;
            backdrop-filter: none !important;
          }

          /* 4. Force the receipt block to lock tightly against the left roll margin edge */
          .invoice-card-canvas {
            display: block !important;
            box-shadow: none !important;
            border: none !important;
            width: 80mm !important;
            max-w: 80mm !important;
            margin: 0 !important; /* 👈 Forces the canvas alignment completely to the left */
            padding: 2mm 4mm 2mm 2mm !important; /* 👈 Keeps padding minimum on the left edge for the printer head */
            background: white !important;
            color: black !important;
            page-break-inside: avoid !important;
            
            /* 🔥 INCREASED TOTAL BASE FONT SIZE FOR THERMAL PAPER READABILITY */
            font-size: 14px !important; 
            line-height: 1.4 !important;
          }

          /* 5. Force all internal headers, summaries, blocks, and text layouts to align left */
          .invoice-card-canvas * {
            text-align: left !important;
            justify-content: flex-start !important;
            align-items: flex-start !important;
          }

          /* 🔥 SCALE UP ALL SPECIFIC CHILD TEXT LABELS AND PRICES FOR HIGH CONTRAST */
          .invoice-card-canvas h1, 
          .invoice-card-canvas h2 {
            font-size: 20px !important; /* Larger Shop/Lab Title Header */
            font-weight: 900 !important;
          }
          
          .invoice-card-canvas h3, 
          .invoice-card-canvas h4 {
            font-size: 16px !important; /* Larger section titles */
            font-weight: 800 !important;
          }

          .invoice-card-canvas p, 
          .invoice-card-canvas span, 
          .invoice-card-canvas label {
            font-size: 13px !important; /* Clean readable body and contact line text size */
          }

          /* 6. Enforce specific alignment and typography parameters inside layout cells */
          th {
            text-align: left !important;
            padding-left: 0px !important;
            font-size: 13px !important;
            font-weight: 800 !important;
          }
          
          td {
            text-align: left !important;
            padding-left: 0px !important;
            font-size: 13px !important;
          }

          /* Scale up the final net totals block text explicitly */
          .invoice-card-canvas [class*="text-lg"], 
          .invoice-card-canvas [class*="text-xl"],
          .invoice-card-canvas .font-black {
            font-size: 18px !important; /* Pkr Grand Total Price text size emphasis */
            font-weight: 900 !important;
          }

          /* 7. Clean up scrollbars or maximum heights meant for web viewing */
          .overflow-y-auto {
            overflow: visible !important;
            max-height: none !important;
          }
        }
      `}</style>







      {/* Core Slip Box */}
      <div className="thermal-receipt-slip bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden print:shadow-none print:max-w-none print:w-[80mm] print:mx-auto print:bg-white print:text-black print:overflow-visible">
        
        {/* Header Controller Bar - Hidden when printing */}
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

        {/* Core Invoice Receipt Sheet Document Area */}
        <div className="p-8 space-y-6 overflow-y-auto flex-1 text-slate-800 print:p-4 print:space-y-3 print:text-[11px] print:font-mono print:overflow-visible print:text-black">
          
          {/* Document Header Branding */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-5 print:flex-col print:items-center print:text-center print:border-b-0 print:pb-0 print:w-full">
            <div className="print:w-full">
              <div className="flex items-center gap-2 mb-1 print:justify-center">
                <span className="text-2xl print:hidden">💎</span>
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase print:text-base print:font-bold">Milestone gems Lab</h2>
              </div>

              <p className="text-xs text-slate-400 font-mono print:text-[11px] print:text-black">Ph: {invoice.seller_number || "03010544620"}</p>
            </div>
            <div className="text-right print:text-left print:w-full print:mt-2 print:border-b print:border-dashed print:border-black print:pb-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block print:hidden">Official Invoice</span>
              <p className="text-xs text-slate-500 font-mono print:text-[11px] print:text-black">Date: {new Date(invoice.created_at).toLocaleString()}</p>
              <p className="text-xs text-slate-500 font-mono print:text-[11px] print:text-black">Payment Method: CASH</p>
            </div>
          </div>

          {/* Stakeholder Directory Address Section */}
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

          {/* Print Only Simple Customer Info Block */}
          <div className="hidden print:block text-[11px] border-b border-dashed border-black pb-2 space-y-0.5">
            <p><b>CUSTOMER:</b> {invoice.customer_name}</p>
            <p><b>CONTACT:</b> {invoice.customer_number}</p>
            <p><b>INVOICE ID:</b> #{invoice.id}</p>
          </div>

          {/* Line Item Asset Table */}
          <div className="space-y-2 print:space-y-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block print:hidden">Transaction Item Details</span>
            <div className="border border-slate-200 rounded-lg overflow-hidden print:border-none print:rounded-none">
              <table className="w-full text-left border-collapse print:text-[11px]">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-600 print:bg-transparent print:border-b print:border-black print:text-black print:font-bold">
                  <tr>
                    <th className="p-3 print:py-1 print:px-0">ITEM</th>
                    <th className="p-3 print:py-1 print:px-0 text-center">QTY</th>
                    <th className="p-3 print:py-1 print:px-0 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100 print:divide-y-0">
                  <tr className="print:border-b print:border-slate-200">
                    <td className="p-3 print:py-1 print:px-0 font-bold text-slate-900 print:font-normal print:text-black">
                      <span className="block">{invoice.gem_name}</span>
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5 print:text-[10px] print:text-slate-700">
                        Specs: {invoice.weight} / {invoice.price_unit || 'Piece'} ({invoice.dimensions})
                      </span>
                    </td>
                    <td className="p-3 print:py-1 print:px-0 text-center font-medium">{invoice.sold_quantity}</td>
                    <td className="p-3 print:py-1 print:px-0 text-right font-bold text-slate-900 print:font-normal">Rs. {Number(invoice.sold_price).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Totals Section */}
          <div className="flex justify-end pt-2 print:pt-0">
            <div className="w-64 border-t border-slate-200 pt-3 space-y-1.5 text-right print:w-full print:border-t-0 print:pt-0 print:space-y-0.5">
              <div className="flex justify-between text-xs text-slate-500 print:text-[11px] print:text-black">
                <span>Subtotal:</span>
                <span>Rs. {Number(invoice.sold_price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 print:text-[11px] print:text-black">
                <span>Tax (Excluded):</span>
                <span>+ Rs. 0</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-900 border-t border-dashed border-slate-200 pt-2 mt-2 print:text-[12px] print:text-black print:border-t print:border-black print:pt-1 print:mt-1">
                <span className="uppercase">Net Total:</span>
                <span className="text-lg font-black text-emerald-700 font-mono print:text-xs print:font-bold print:text-black">Rs. {Number(invoice.sold_price).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Document Footer Notice */}
          <div className="text-center pt-8 border-t border-slate-100 print:pt-3 print:border-t print:border-dashed print:border-black print:mt-3">
            <p className="text-xs uppercase font-bold tracking-wider text-slate-800 print:text-xs print:text-black">THANK YOU !!</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1 hidden print:block print:text-[6px] print:text-slate-600">Please make sure to check you Product before Purchasing otherwise we are not responsible for any damage </p>
             <p className="text-[10px] text-slate-400 font-mono mt-1 hidden print:block print:text-[6px] print:text-slate-600">Software By Saad Mirza</p>
            <p className="text-[10px] text-slate-400 italic print:hidden">This is a system-generated electronic certification invoice recorded securely inside Gems Lab database systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

