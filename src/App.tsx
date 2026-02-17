import { useState, useRef } from "react";
import { Basket } from "./services/Basket";
import { products, deliveryRules, offers } from "./constants/catalogue";
import ProductCard from "./components/ProductCard";
import BasketSummary from "./components/BasketSummary";
import "./App.css";

function App() {
  const basketRef = useRef(new Basket(products, deliveryRules, offers));
  const [, forceUpdate] = useState(0);

  function handleAdd(code: string) {
    basketRef.current.add(code);
    forceUpdate((n) => n + 1);
  }

  function handleClear() {
    basketRef.current.clear();
    forceUpdate((n) => n + 1);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Acme Widget Co</h1>
        <p>Premium widgets for every occasion</p>
      </header>

      <main className="app-content">
        <section className="products-section">
          <h2>Our Products</h2>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.code} product={p} onAdd={handleAdd} />
            ))}
          </div>

          {offers.length > 0 && (
            <div className="offers-banner">
              <strong>Special Offer:</strong>{" "}
              {offers.map((o) => o.name).join(" | ")}
            </div>
          )}
        </section>

        <aside className="basket-section">
          <BasketSummary basket={basketRef.current} onClear={handleClear} />
        </aside>
      </main>
    </div>
  );
}

export default App;
