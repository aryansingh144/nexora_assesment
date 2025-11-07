import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { rupees } from '../utils/format';
import { checkout } from '../api/api';
import CartRow from '../components/CartRow';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';

export default function CartPage() {
  const { cart, total, loading, refresh } = useCart();
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [open, setOpen] = useState(false);

  const empty = !loading && cart.length === 0;

  async function onCheckout(name, email) {
    setBusy(true);
    try {
      const r = await checkout(name, email);
      setReceipt(r);
      setOpen(true);
      await refresh();
    } catch (e) {
      alert(e.message || 'Checkout failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {loading && (
        <div className="bg-white shadow-sm rounded-xl p-6">Loading cart…</div>
      )}

      {empty && (
        <div className="bg-white shadow-sm rounded-xl p-6 text-gray-500">
          Your cart is empty.
        </div>
      )}

      {!loading && !empty && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: items list */}
          <div className="lg:col-span-2 bg-white shadow-sm rounded-xl p-4 sm:p-6">
            {cart.map((line) => (
              <CartRow key={line.id} line={line} />
            ))}
          </div>

          {/* Right: sticky summary & checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-xl p-4 sm:p-6 lg:sticky lg:top-20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-base font-semibold text-gray-900">
                  {rupees(total)}
                </span>
              </div>

              <div className="mt-1 text-xs text-gray-500">
                Taxes are included in mock total (no shipping in demo).
              </div>

              <div className="mt-5 border-t border-gray-200 pt-5">
                <h3 className="text-sm font-semibold mb-3">Checkout</h3>
                <CheckoutForm onSubmit={onCheckout} loading={busy} />
              </div>
            </div>
          </div>
        </div>
      )}

      <ReceiptModal open={open} receipt={receipt} onClose={() => setOpen(false)} />
    </div>
  );
}
