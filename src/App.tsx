import { products } from "./constants/catalogue";
import { offers } from "./constants/catalogue";
import { BasketProvider } from "./context/BasketContext";
import ProductCard from "./components/ProductCard";
import BasketSummary from "./components/BasketSummary";
import "./App.css";

function App() {
  return (
    <BasketProvider>
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
                <ProductCard key={p.code} product={p} />
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
            <BasketSummary />
          </aside>
        </main>
      </div>
    </BasketProvider>
  );
}

export default App;
