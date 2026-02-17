export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface DeliveryRule {
  minSpend: number;
  charge: number;
}

export interface Offer {
  name: string;
  apply: (items: Product[]) => number;
}
