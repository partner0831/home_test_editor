import { Product } from "../types/types";
import { useBasketContext } from "../context/BasketContext";
import { formatPrice } from "../services/Basket";

const COLORS: { [code: string]: string } = {
  R01: "#e74c3c",
  G01: "#27ae60",
  B01: "#3498db",
};

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { addItem } = useBasketContext();

  return (
    <div className="product-card">
      <div
        className="product-color"
        style={{ backgroundColor: COLORS[product.code] || "#ccc" }}
      />
      <h3>{product.name}</h3>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button onClick={() => addItem(product.code)}>Add to Basket</button>
    </div>
  );
}

export default ProductCard;
