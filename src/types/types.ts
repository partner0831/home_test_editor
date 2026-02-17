export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface DeliveryRule {
  minSpend: number;
  charge: number;
}

// offers are function-based so we can easily add new ones later
export interface Offer {
  name: string;
  apply(items: Product[]): number;
}

// state shape for the basket reducer
export interface BasketState {
  items: Product[];
}

export type BasketAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; index: number }
  | { type: "CLEAR" };
