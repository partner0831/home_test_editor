import { Basket } from "../services/Basket";
import { Product } from "../types/types";

interface Props {
  basket: Basket;
  onClear: () => void;
}

function BasketSummary({ basket, onClear }: Props) {
  const items = basket.getItems();
  const subtotal = basket.getSubtotal();
  const discount = basket.getDiscount();
  const net = subtotal - discount;
  const delivery = basket.getDeliveryCharge(net);

  // group items by product code so we show "Red Widget x 2" instead of separate lines
  const grouped: { [code: string]: { product: Product; qty: number } } = {};
  items.forEach(item => {
    if (!grouped[item.code]) {
      grouped[item.code] = { product: item, qty: 0 };
    }
    grouped[item.code].qty++;
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
        {Object.values(grouped).map(({ product, qty }) => (
          <li key={product.code}>
            <span>{product.name} × {qty}</span>
            <span>${(product.price * qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="basket-breakdown">
        <div className="basket-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="basket-row discount">
            <span>Offer Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="basket-row">
          <span>Delivery</span>
          <span>{delivery === 0 ? "FREE" : `$${delivery.toFixed(2)}`}</span>
        </div>
        <div className="basket-row total">
          <span>Total</span>
          <span>{basket.total()}</span>
        </div>
      </div>

      <button className="clear-btn" onClick={onClear}>Clear Basket</button>
    </div>
  );
}

export default BasketSummary;
