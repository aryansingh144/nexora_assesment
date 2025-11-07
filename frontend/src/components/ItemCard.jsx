import { rupees } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function ItemCard({ item }) {
  const { addOne } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
      <div className="aspect-4/3 w-full overflow-hidden rounded-lg mb-3 bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{rupees(item.price)}</p>
      </div>

      <button
        onClick={() => addOne(item)}
        className="mt-4 w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
}
