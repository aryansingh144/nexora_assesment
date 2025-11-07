import { useEffect, useState } from "react";
import { getItems } from "../api/api";
import ItemCard from "../components/ItemCard";


export default function ItemPage() {
  

  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("local");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load(m = mode) {
    setLoading(true);
    setErr("");
    try {
      const list = await getItems(m);
      setItems(list || []);
    } catch (e) {
      setErr(e?.message || "Failed to load");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(mode);
  }, [mode]);

  return (
    <div className="w-full min-h-screen bg-black text-white p-5">
      {/* header and toggle  */}
      <div className="mt-20 flex items-center justify-between gap-4">
        <div className="inline-flex gap-2 items-center text-[30px] md:text-[35px] font-bold">
          <p
            className="text-black bg-[#1a1919] px-6 py-3 rounded-2xl shadow-xl uppercase"
            style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
          >
            SHOP <span>NOW</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("local")}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition ${
              mode === "local"
                ? "bg-white text-black"
                : "bg-white/10 border border-white/30 hover:bg-white/20"
            }`}
          >
            Local
          </button>
          <button
            onClick={() => setMode("live")}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition ${
              mode === "live"
                ? "bg-white text-black"
                : "bg-white/10 border border-white/30 hover:bg-white/20"
            }`}
          >
            Live
          </button>

        </div>
      </div>


      {err && (
        <div className="mt-6 bg-red-500/20 border border-red-400/40 text-red-200 rounded-xl px-4 py-3">
          {err}
        </div>
      )}


      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/80 rounded-2xl shadow-lg h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {items.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}
