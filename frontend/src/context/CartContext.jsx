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
    const existing = cart.find((c) => c.id === item.id);
    const nextQty = (existing?.qty || 0) + 1;
    const data = await updateCart(item.id, nextQty);
    setCart(data.cart);
    setTotal(data.total);
  }

  async function setQty(id, qty) {
    const data = await updateCart(id, qty);
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
