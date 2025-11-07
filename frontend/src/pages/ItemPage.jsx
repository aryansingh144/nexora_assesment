import { useEffect, useState } from 'react';
import { getItems } from '../api/api';
import ItemCard from '../components/ItemCard';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await getItems();
        setItems(list || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl font-semibold mb-4">Shop</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}
