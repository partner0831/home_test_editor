import { Product, DeliveryRule, Offer } from "../types/types";

export function calculateSubtotal(items: Product[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

export function calculateDiscount(items: Product[], offers: Offer[]): number {
  return offers.reduce((acc, offer) => acc + offer.apply(items), 0);
}

export function calculateDelivery(amount: number, rules: DeliveryRule[]): number {
  const rule = rules.find(r => amount >= r.minSpend);
  return rule?.charge ?? 0;
}

// floor to 2dp to avoid floating point rounding up (e.g. 54.375 -> 54.37 not 54.38)
export function calculateTotal(
  items: Product[],
  offers: Offer[],
  rules: DeliveryRule[]
): number {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(items, offers);
  const net = subtotal - discount;
  const delivery = calculateDelivery(net, rules);
  return Math.floor((net + delivery) * 100) / 100;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
