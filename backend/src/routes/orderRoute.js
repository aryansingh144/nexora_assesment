import { Router } from 'express';
import { CART } from '../data/cart.js';
import { calcTotal } from '../utils/calcTotal.js';

const router = Router();


// POST /api/checkout
router.post('/checkout', (req, res) => {
  const { name,email} = req.body;
  if (!name || !email)
    return res.status(400).json(
      { error: 'Name and email not found' }
    );

  const total = calcTotal(CART);

  const receipt = {
    buyer: { name, email },
    items: CART,
    total,
    time: new Date().toISOString()
  };
  CART.length = 0; 

  return res.json(receipt);
});

export default router;
