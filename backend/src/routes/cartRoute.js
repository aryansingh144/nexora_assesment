import { Router } from 'express';
import items from '../data/items.js';
import { CART } from '../data/cart.js';
import { calcTotal } from '../utils/calcTotal.js';

const router = Router();

function normalizeId(x) {
  return String(x);
}
function findProduct(id) {
  return items.find((p) => p.id === id);
}

// POST /api/cart  { id, qty }  → upsert (set qty)
router.post('/cart', (req, res) => {
  const id = normalizeId(req.body?.id);
  const q = Number(req.body?.qty);

  if (!id || !Number.isInteger(q) || q < 1) {
    return res.status(400).json({ error: 'Data is invalid' });
  }

  const product = findProduct(id);
  if (!product) return res.status(404).json({ error: 'Item not found' });

  const existing = CART.find((line) => line.id === id);
  if (existing) {
    existing.qty = q;
    // refresh price from catalog to avoid stale values
    existing.price = product.price;
    existing.name = product.name;
  } else {
    CART.push({ id, name: product.name, price: product.price, qty: q });
  }

  return res.json({ cart: CART, total: calcTotal(CART) });
});

// GET /api/cart
router.get('/cart', (_req, res) => {
  return res.json({ cart: CART, total: calcTotal(CART) });
});

// DELETE /api/cart/:id
router.delete('/cart/:id', (req, res) => {
  const id = normalizeId(req.params.id);
  const idx = CART.findIndex((line) => line.id === id);
  if (idx !== -1) CART.splice(idx, 1);

  return res.json({ cart: CART, total: calcTotal(CART) });
});

export default router;
