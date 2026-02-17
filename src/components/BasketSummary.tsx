import { Product } from "../types/types";
import { useBasketContext } from "../context/BasketContext";
import { formatPrice } from "../services/Basket";

function BasketSummary() {
  const { items, subtotal, discount, delivery, total, removeItem, clearBasket } = useBasketContext();

  // group items by code, track indices for individual removal
  const grouped: { [code: string]: { product: Product; qty: number; indices: number[] } } = {};
  items.forEach((item, i) => {
    if (!grouped[item.code]) {
      grouped[item.code] = { product: item, qty: 0, indices: [] };
    }
    grouped[item.code].qty++;
    grouped[item.code].indices.push(i);
  });

  if (items.length === 0) {
    return (
      <div className="basket-summary">
        <h2>Your Basket</h2>
        <p className="basket-empty">Your basket is empty</p>
      </div>
    );
  }

  return (
    <div className="basket-summary">
      <h2>Your Basket</h2>

      <ul className="basket-items">
        {Object.values(grouped).map(({ product, qty, indices }) => (
          <li key={product.code}>
            <span>{product.name} × {qty}</span>
            <div className="basket-item-actions">
              <span>{formatPrice(product.price * qty)}</span>
              <button
                className="remove-btn"
                onClick={() => removeItem(indices[indices.length - 1])}
                title={`Remove one ${product.name}`}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="basket-breakdown">
        <div className="basket-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="basket-row discount">
            <span>Offer Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="basket-row">
          <span>Delivery</span>
          <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span>
        </div>
        <div className="basket-row total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <button className="clear-btn" onClick={clearBasket}>Clear Basket</button>
    </div>
  );
}

export default BasketSummary;
