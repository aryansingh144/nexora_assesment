import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { rupees } from "../utils/format";
import { checkout, getItems } from "../api/api";
import CartRow from "../components/CartRow";
import CheckoutForm from "../components/CheckoutForm";
import ReceiptModal from "../components/ReceiptModal";

export default function CartPage() {
  const { cart, total, loading, refresh } = useCart();
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [open, setOpen] = useState(false);
  const [imgMap, setImgMap] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const items = await getItems();
        const map = {};
        (items || []).forEach((it) => (map[String(it.id)] = it.image));
        setImgMap(map);
      } catch {}
    })();
  }, []);

  const empty = useMemo(() => !loading && cart.length === 0, [loading, cart]);

  async function onCheckout(name, email) {
    setBusy(true);
    try {
      const r = await checkout(name, email);
      setReceipt(r);
      setOpen(true);
      await refresh();
    } catch (e) {
      alert(e.message || "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* page container to constrain width */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="pt-20">
          <div className="inline-flex gap-2 items-center text-[30px] md:text-[35px] font-bold mb-2">
            <p
              className="text-black bg-[#a2a2a2] px-6 py-3 rounded-2xl shadow-xl uppercase"
              style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
            >
              YOUR <span>BUCKET</span>
            </p>
          </div>
        </div>

        {/* GRID LAYOUT: 1 col on mobile, 12 cols on lg */}
        <div className="mt-8 border-t border-white/20 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-8 min-w-0">
            <div className="bg-white/80 rounded-2xl shadow-lg p-5">
              {loading && (
                <div className="text-black/70 bg-white rounded-xl p-6">Loading cart…</div>
              )}

              {empty && !loading && (
                <div className="text-black/80 bg-white rounded-xl p-6">
                  Your cart is empty.
                </div>
              )}

              {!loading && !empty && (
                <div className="space-y-4">
                  {cart.map((line) => (
                    <CartRow
                      key={line.id}
                      line={line}
                      image={imgMap[String(line.id)]}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 min-w-0">
            <div className="bg-white/80 rounded-2xl shadow-xl px-4 pt-4 pb-5
                            lg:sticky lg:top-24">
              <div className="py-4 px-2">
                <div className="text-black text-lg font-semibold">Summary</div>
                <div className="mt-3 text-black/80 text-sm flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{rupees(total)}</span>
                </div>
                <div className="text-xs text-black/60 mt-1">
                  Taxes included in mock total. No shipping in demo.
                </div>
              </div>

              <div className="mt-4">
                <CheckoutForm onSubmit={onCheckout} loading={busy} />
              </div>
            </div>
          </div>
        </div>

        <ReceiptModal open={open} receipt={receipt} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
