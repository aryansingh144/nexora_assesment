export function rupees(paise) {
  const n = Number(paise || 0) / 100;
  return n.toLocaleString('en-IN', 
    { 
        style: 'currency', currency: 'INR', maximumFractionDigits: 2 
    });
}
