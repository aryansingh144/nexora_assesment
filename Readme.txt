// Mock E-Com Cart (Internship Assignment)

This is a small full-stack cart system built for the Vibe Commerce assignment.  
Main aim: **show product listing → add to cart → update qty → remove → checkout (receipt only).**  
No real payments. Cart is kept in-memory. Simple and clean.

---

 Frontend - React + Vite + TailwindCSS 
 Backend - Node.js + Express 
 Data - In-Memory (DB ready structure exists)
 Bonus- Fake Store API mode for live product fetch |

---

## ✅ Features
- Products grid
- Add to Cart
- Remove from Cart
- Change qty in cart
- Cart total updates live
- Checkout form
- Receipt popup
- Resposive

### Bonus Done
- Live product mode (`Fake Store API`)
- Normalized data so image, price, id match our format
- Made the Cart logic which works the same in both modes 


cd backend
npm install
npm run dev

Server → `http://localhost:8000`

cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000
" > .env
npm run dev

App → `http://localhost:5173`




