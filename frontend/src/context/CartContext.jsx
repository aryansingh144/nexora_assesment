import { createContext, useContext, useEffect, useState } from 'react';
import { getCart, updateCart, removeFromCart } from '../api/api';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data.cart || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }


async function addOne(item) {
  const existing = cart.find(c => c.id === item.id);
  const nextQty = (existing?.qty || 0) + 1;


  const data = await updateCart(item.id, nextQty, {
    name: item.name,
    price: item.price,
    image: item.image,
  });

    setCart(data.cart);
   setTotal(data.total);
}


  async function setQty(id, qty, meta) {

  if (qty <= 0) return remove(id);


  const line = cart.find(c => c.id === id);

  const name  = line?.name  ?? meta?.name;
  const price = line?.price ?? meta?.price;
  const image = line?.image ?? meta?.image;

  const extras = {};
  if (typeof name === "string" && name.trim()) extras.name = name;
  if (Number.isFinite(price)) extras.price = price;
  if (image) extras.image = image;

  const data = await updateCart(id, Math.floor(qty), extras);
  setCart(data.cart);
  setTotal(data.total);
}

  async function remove(id) {
    const data = await removeFromCart(id);
    setCart(data.cart);
    setTotal(data.total);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <CartCtx.Provider value={{ cart, total, loading, refresh, addOne, setQty, remove }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  return useContext(CartCtx);
}
