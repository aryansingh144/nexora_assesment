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

  if (!id || !Number.isInteger(qty) ||qty < 1) {
    return res.status(400).json({ error: "Data is invalid" });
  }

  
  const local = findLocal(id);
  
  
  // trying local item first otherwise using fields sent
 const name  = local?.name  ?? req.body?.name;
const price = local?.price ?? Number(req.body?.price);
const image = local?.image ?? req.body?.image;

const badName  = typeof name !== "string" || name.trim() === "";
const badPrice = !Number.isFinite(price) || price < 0;
if (badName || badPrice) return res.status(404).json({ error: "Item not found" });

const existing = CART.find(l => l.id === id);
if (existing) {
  existing.qty = qty;
    if (name)  existing.name  = name;
    if (Number.isFinite(price)) existing.price = price;
    if (image) existing.image = image;
} else {
  CART.push({ id, name, price, qty, image });
}
return res.json({ cart: CART, total: calcTotal(CART) });

});



// GET /api/cart
// read cart + total
router.get("/cart", (_req, res) => {
  return res.json({ cart: CART, total: calcTotal(CART) });
});

// DELETE /api/cart/:id
// remove element or line
router.delete("/cart/:id", (req, res) => {
  const id = normId(req.params.id);
  const idx = CART.findIndex((line) => line.id === id);
  if (idx !== -1) CART.splice(idx, 1);
  return res.json({ cart: CART, total: calcTotal(CART) });
});



export default router;
