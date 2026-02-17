import { useReducer, useCallback, useMemo, useEffect } from "react";
import { Product, BasketState, BasketAction } from "../types/types";
import { products, deliveryRules, offers } from "../constants/catalogue";
import {
  calculateSubtotal,
  calculateDiscount,
  calculateDelivery,
  calculateTotal,
} from "../services/Basket";

const STORAGE_KEY = "acme-basket";

function loadInitialState(): BasketState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const codes: string[] = JSON.parse(saved);
      const items = codes
        .map(code => products.find(p => p.code === code))
        .filter((p): p is Product => p !== undefined);
      return { items };
    }
  } catch {
    // ignore corrupted storage
  }
  return { items: [] };
}

function basketReducer(state: BasketState, action: BasketAction): BasketState {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.product] };
    case "REMOVE_ITEM":
      return { items: state.items.filter((_, i) => i !== action.index) };
    case "CLEAR":
      return { items: [] };
  }
}

export function useBasket() {
  const [state, dispatch] = useReducer(basketReducer, undefined, loadInitialState);

  // persist basket to localStorage whenever items change
  useEffect(() => {
    const codes = state.items.map(item => item.code);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  }, [state.items]);

  const addItem = useCallback((code: string) => {
    const product = products.find(p => p.code === code);
    if (!product) throw new Error(`Product "${code}" not found`);
    dispatch({ type: "ADD_ITEM", product });
  }, []);

  const removeItem = useCallback((index: number) => {
    dispatch({ type: "REMOVE_ITEM", index });
  }, []);

  const clearBasket = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const subtotal = useMemo(() => calculateSubtotal(state.items), [state.items]);
  const discount = useMemo(() => calculateDiscount(state.items, offers), [state.items]);
  const net = subtotal - discount;
  const delivery = useMemo(() => calculateDelivery(net, deliveryRules), [net]);
  const total = useMemo(() => calculateTotal(state.items, offers, deliveryRules), [state.items]);

  return {
    items: state.items,
    subtotal,
    discount,
    delivery,
    total,
    addItem,
    removeItem,
    clearBasket,
  };
}
