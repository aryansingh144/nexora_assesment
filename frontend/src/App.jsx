import { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import ItemsPage from './pages/ItemPage';
import CartPage from './pages/CartPage';

function TopBar({ tab, setTab }) {
  const { cart } = useCart();
  const count = cart.reduce((a, b) => a + (b.qty || 0), 0);

  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-widest">Vibe Cart</div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg text-sm ${
              tab === 'items' ? 'bg-black text-white' : 'border'
            }`}
            onClick={() => setTab('items')}
          >
            Home
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
              tab === 'cart' ? 'bg-black text-white' : 'border'
            }`}
            onClick={() => setTab('cart')}
          >
            Cart
            <span className="inline-flex items-center justify-center h-5 min-w-5 text-xs px-1 rounded-full bg-gray-900 text-white">
              {count}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Shell() {
  const [tab,setTab] = useState('items');
  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar tab={tab} setTab={setTab} />
      <main className="max-w-6xl mx-auto">
        {tab === 'items' ?<ItemsPage/> :<CartPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
