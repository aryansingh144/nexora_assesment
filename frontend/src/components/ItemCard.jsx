import { rupees } from "../utils/format";
import { useCart } from "../context/CartContext";

export default function ItemCard({ item }) {
  const { addOne } = useCart();

  return (
    <div className="bg-white/80 rounded-2xl shadow-lg p-4 flex flex-col transition-all duration-300 hover:scale-[1.01]">
      <div className="w-full aspect-4/3 overflow-hidden rounded-xl bg-black/10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex-1">
        <div className="text-black text-base font-semibold">{item.name}</div>
        <div className="text-black/70 text-sm mt-1">{rupees(item.price)}</div>
      </div>

      <button
        onClick={() => addOne(item)}
        className="mt-4 w-full bg-black active:scale-95 text-white py-2 rounded-xl font-medium hover:opacity-90"
      >
        Add to Bucket
      </button>
    </div>
  );
}
