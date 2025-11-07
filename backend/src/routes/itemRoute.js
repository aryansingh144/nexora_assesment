import { Router } from 'express';
import items from '../data/items.js';
import axios from 'axios';

const router = Router();


// GET /api/items
router.get('/items', (req, res) => {
  res.json({items});
});

//api calling
router.get("/products/live", async (_req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products?limit=8");
    const mapped = data.map(p => ({
      id: String(p.id),
      name: p.title,
      price: Math.round(p.price * 100),
      image: p.image
    }));
    res.json(mapped);
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});



export default router;
