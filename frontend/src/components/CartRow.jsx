import { rupees } from "../utils/format";
import { useCart } from "../context/CartContext";

export default function CartRow({ line, image }) {
  const { setQty, remove } = useCart();

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow-md mb-4 transition-all duration-300 hover:scale-[1.01] mx-2">
      <div className="flex items-center gap-4">

        {image ? (
          <img
            src={image}
            alt={line.name}
            className="w-[88px] h-[88px] object-cover rounded-lg border border-white/20"
            loading="lazy"
          />
        ) : (
          <div className="w-[88px] h-[88px] rounded-lg bg-white/90 text-black flex items-center justify-center text-xs uppercase">
            {line.name?.split(" ")?.[0] || "Item"}
          </div>
        )}

        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-semibold text-lg truncate">{line.name}</p>
          <p className="text-sm">Price: {rupees(line.price)}</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="h-8 w-8 rounded-lg border border-white/40 hover:bg-white/10"
            onClick={() => setQty(line.id, Math.max(1, line.qty - 1))}
            aria-label="decrease"
          >
            −
          </button>

          <input
            type="number"
            min={1}
            value={line.qty}
            onChange={(e) => {
              const v = Math.max(1, parseInt(e.target.value || "1", 10));
              setQty(line.id, v);
            }}
            className="w-16 px-2 py-1 text-black text-center rounded border border-white bg-white/80 backdrop-blur"
          />

          <button
            className="h-8 w-8 rounded-lg border border-white/40 hover:bg-white/10"
            onClick={() => setQty(line.id, line.qty + 1)}
            aria-label="increase"
          >
            +
          </button>

          <button
            className="ml-2 text-white/80 hover:text-red-500"
            onClick={() => remove(line.id)}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-3 text-right text-sm">
        Line Total: <span className="font-semibold">{rupees(line.price * line.qty)}</span>
      </div>
    </div>
  );
}
