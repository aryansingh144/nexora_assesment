const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function j(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}
//extra stuff to manage both local and api items 
// mode: 'local' -> /api/items, 
//'live' -> /api/products/live

export async function getItems(mode = "local") {
  if (mode === "live") {
    const res = await fetch(`${BASE}/api/products/live`);
    return res.json();
  }
  const data = await j('GET', '/api/items');
  return Array.isArray(data) ? data : data.items;
}



export async function getCart() {
  return j('GET', '/api/cart');
}

export async function updateCart(id, qty, extra = {}) {
  return j('POST', '/api/cart', { id: String(id), qty: Number(qty), ...extra });
}


export async function removeFromCart(id) {
  return j('DELETE', `/api/cart/${encodeURIComponent(String(id))}`);
}

export async function checkout(name, email) {
  return j('POST', '/api/checkout', { name, email });
}
