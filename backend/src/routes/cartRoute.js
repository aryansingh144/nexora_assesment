import { Router } from "express";
import items from "../data/items.js";
import { CART } from "../data/cart.js";
import { calcTotal } from "../utils/calcTotal.js";

const router = Router();

const findLocal = (id) => items.find((p) => p.id === id);
const normId = (x) => String(x);

// POST /api/cart
router.post("/cart", (req, res) => {
  const rawId = req.body?.productId ?? req.body?.id;
  const id = normId(rawId);
  const qty = Number(req.body?.qty);

  if (!id || !Number.isInteger(qty) || qty < 1) {
    return res.status(400).json({ error: "Data is invalid" });
  }

  const local = findLocal(id);

  // Fallbacks for live items
  const name = local?.name ?? req.body?.name;
  const price = local?.price ?? Number(req.body?.price); // expect paise (integer)

  // Explicit validation (allow 0, disallow NaN/undefined/null/negatives)
  const badName = typeof name !== "string" || name.trim() === "";
  const badPrice = !Number.isFinite(price) || price < 0;

  if (badName || badPrice) {
    return res.status(404).json({ error: "Item not found" });
  }

  const existing = CART.find((line) => line.id === id);
  if (existing) {
    existing.qty = qty;
    existing.name = name;
    existing.price = price;
  } else {
    CART.push({ id, name, price, qty });
  }

  return res.json({ cart: CART, total: calcTotal(CART) });
});

// GET /api/cart
router.get("/cart", (_req, res) => {
  return res.json({ cart: CART, total: calcTotal(CART) });
});

// DELETE /api/cart/:id
router.delete("/cart/:id", (req, res) => {
  const id = normId(req.params.id);
  const idx = CART.findIndex((line) => line.id === id);
  if (idx !== -1) CART.splice(idx, 1);
  return res.json({ cart: CART, total: calcTotal(CART) });
});

export default router;
