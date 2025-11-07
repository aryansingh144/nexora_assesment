import { rupees } from "../utils/format";

export default function ReceiptModal({ open, onClose, receipt }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-6 max-w-md w-full text-black">
        <h2 className="text-lg font-semibold mb-2">Receipt</h2>
        <div className="text-sm text-black/70 mb-3">
          {receipt?.buyer?.name} • {receipt?.buyer?.email}
        </div>
        <div className="space-y-2 max-h-56 overflow-auto">
          {(receipt?.items|| []).map((it) => (
            <div key={it.id} className="flex justify-between text-sm">
              <div>
                {it.name} × {it.qty}
              </div>
              <div>{rupees(it.lineTotal)}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>{rupees(receipt?.total || 0)}</span>
        </div>
        <div className="text-xs text-black/60 mt-1">{receipt?.time}</div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-black text-white py-2 font-medium hover:opacity-90"
        >
          Close
        </button>
      </div>
    </div>
  );
}
