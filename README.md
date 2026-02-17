# Acme Widget Co — Sales Basket System

A proof of concept shopping basket for Acme Widget Co, built with React and TypeScript.

## Getting Started

```bash
npm install
npm start       # runs on http://localhost:3000
npm test        # runs all unit tests
npm run build   # production build
```

## What It Does

- Displays three widget products (Red, Green, Blue) with add-to-basket functionality
- Applies tiered delivery charges: $4.95 (under $50), $2.95 (under $90), free ($90+)
- Applies special offers — currently "buy one red widget, get the second half price"
- Basket persists across page refreshes via localStorage
- Individual item removal and full basket clearing

## Project Structure

```
src/
├── types/          # TypeScript interfaces (Product, DeliveryRule, Offer, BasketState)
├── constants/      # Product catalogue, delivery rules, offer definitions
├── services/       # Pure business logic functions (pricing, discounts, delivery)
├── hooks/          # useBasket — custom hook with useReducer + useEffect
├── context/        # BasketContext — shared basket state via React Context
├── components/     # ProductCard, BasketSummary
├── App.tsx         # Main layout wiring everything together
└── App.css         # All styling
```

## Where to Look

### Business Logic — `src/services/Basket.ts`
All pricing logic lives here as **pure functions** — `calculateSubtotal`, `calculateDiscount`, `calculateDelivery`, `calculateTotal`. These are fully testable without any React dependency. The rounding approach uses `Math.floor` (truncate to 2dp) rather than standard rounding, which matters when half-price discounts produce 3-decimal-place totals like $54.375.

### State Management — `src/hooks/useBasket.ts`
The custom `useBasket` hook uses `useReducer` for immutable state updates with a discriminated union action type. Calculated values (subtotal, discount, delivery, total) are derived via `useMemo` so they only recompute when items change. The basket is persisted to localStorage through `useEffect`, and restored on page load via the reducer's lazy initializer.

### Offer System — `src/constants/catalogue.ts`
Offers are defined as objects with an `apply` function, making the system extensible. Adding a new offer (e.g. "buy 2 blue widgets get 1 free") is just adding another object to the array — no changes to the basket or UI code needed.

### Context — `src/context/BasketContext.tsx`
Basket state is shared across components through React Context, so `ProductCard` and `BasketSummary` can consume it independently without prop drilling.

## Assumptions

- Prices are in USD
- The "half price" discount on the second red widget applies per pair (3 red widgets = 1 discounted, 4 = 2 discounted)
- Delivery charge is calculated on the subtotal **after** discounts are applied
- Final total is floored to 2 decimal places (not rounded), matching the expected test outputs
- An empty basket still incurs the minimum delivery charge
