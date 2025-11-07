import { rupees } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function CartRow({ line }) {
  const { setQty, remove } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-none">
      {/* thumbnail placeholder (can swap to product image later) */}
      <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
        {line.name?.split(' ')?.[0] || 'Item'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{line.name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{rupees(line.price)}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="h-8 w-8 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={() => setQty(line.id, Math.max(1, line.qty - 1))}
          aria-label="decrease quantity"
        >
          −
        </button>
        <input
          className="w-12 h-8 text-center border border-gray-300 rounded-lg"
          type="number"
          min="1"
          value={line.qty}
          onChange={(e) => {
            const v = Math.max(1, parseInt(e.target.value || '1', 10));
            setQty(line.id, v);
          }}
        />
        <button
          className="h-8 w-8 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={() => setQty(line.id, line.qty + 1)}
          aria-label="increase quantity"
        >
          +
        </button>
      </div>

      <div className="w-28 text-right text-sm font-medium text-gray-900">
        {rupees(line.price * line.qty)}
      </div>

      <button
        className="text-xs text-red-600 hover:text-red-700 px-2"
        onClick={() => remove(line.id)}
      >
        Remove
      </button>
    </div>
  );
}
