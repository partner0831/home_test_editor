import { Product, DeliveryRule, Offer } from "../types/types";

export const products: Product[] = [
  { code: "R01", name: "Red Widget", price: 32.95 },
  { code: "G01", name: "Green Widget", price: 24.95 },
  { code: "B01", name: "Blue Widget", price: 7.95 },
];

export const deliveryRules: DeliveryRule[] = [
  { minSpend: 90, charge: 0 },
  { minSpend: 50, charge: 2.95 },
  { minSpend: 0, charge: 4.95 },
];

export const offers: Offer[] = [
  {
    name: "Buy one red widget, get the second half price",
    apply: (items: Product[]) => {
      const redWidgets = items.filter((item) => item.code === "R01");
      const pairsCount = Math.floor(redWidgets.length / 2);
      return pairsCount * (redWidgets[0]?.price / 2 || 0);
    },
  },
];
