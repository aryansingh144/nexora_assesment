import { Router } from 'express';
import items from '../data/items.js';

const router = Router();


// GET /api/items
router.get('/items', (req, res) => {
  res.json({ items });
});

export default router;
