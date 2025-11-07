export function calcTotal(list) {
  let total = 0;
  for (const item of list) {
    total += item.price * item.qty; //in paise
  }
  return total;
}
