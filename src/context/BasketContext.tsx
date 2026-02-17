import { createContext, useContext } from "react";
import { useBasket } from "../hooks/useBasket";

type BasketContextType = ReturnType<typeof useBasket>;

const BasketContext = createContext<BasketContextType | null>(null);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const basket = useBasket();

  return (
    <BasketContext.Provider value={basket}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasketContext() {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasketContext must be used within BasketProvider");
  return ctx;
}
