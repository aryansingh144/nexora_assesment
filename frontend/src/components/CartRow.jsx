import { rupees } from "../utils/format";
import { useCart } from "../context/CartContext";

export default function CartRow({ line, image }) {
  const { setQty, remove } = useCart();

  if (!line) return null;

  const imgSrc =
    image ||
    line?.image ||
    line?.imageUrl ||
    (Array.isArray(line?.images) ? line.images[0] : undefined);

  return (
    <div className="bg-black text-white p-3 sm:p-4 rounded-xl shadow-md mb-4 transition-all duration-300 hover:scale-[1.01] mx-2">
      {/* top section: image + basic info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* image check if there is image show that else show name initials */}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={line?.name || "Item"}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg border border-white/20 shrink-0"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "";
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-white/90 text-black flex items-center justify-center text-[10px] sm:text-xs uppercase shrink-0">
            {line?.name?.split(" ")?.[0] || "Item"}
          </div>
        )}

        {/* name + price */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base sm:text-lg truncate">
            {line.name}
          </p>
          <p className="text-xs sm:text-sm mt-0.5">
            Price: {rupees(line.price)}
          </p>
        </div>

        {/* quantity controls  */}
        <div className="sm:ml-auto order-last sm:order-none">
          <div className="mt-2 sm:mt-0 flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <button
                className="h-9 w-9 sm:h-8 sm:w-8 rounded-lg border border-white/40 hover:bg-white/10"
                onClick={() => {
                  if (line.qty <= 1) remove(line.id);
                  else setQty(line.id, line.qty - 1);
                }}
                aria-label="decrease quantity"
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
                onWheel={(e) => e.currentTarget.blur()} // prevent accidental wheel changes
                className="w-20 sm:w-16 px-2 py-2 sm:py-1 text-black text-center rounded border border-white bg-white/90"
                inputMode="numeric"
                aria-label="quantity"
              />

              <button
                className="h-9 w-9 sm:h-8 sm:w-8 rounded-lg border border-white/40 hover:bg-white/10"
                onClick={() => setQty(line.id, line.qty + 1)}
                aria-label="increase quantity"
              >
                +
              </button>
            </div>

            <button
              className="ml-0 sm:ml-2 text-white/80 hover:text-red-500 text-sm"
              onClick={() => remove(line.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* line total */}
      <div className="mt-3 text-sm text-left sm:text-right">
        Line Total:{" "}
        <span className="font-semibold">
          {rupees(line.price * Math.max(1, line.qty || 1))}
        </span>
      </div>
    </div>
  );
}
