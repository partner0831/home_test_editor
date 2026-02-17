import { Product } from "../types/types";

// just a simple map for the widget colour indicators
const COLORS: { [code: string]: string } = {
  R01: "#e74c3c",
  G01: "#27ae60",
  B01: "#3498db",
};

interface Props {
  product: Product;
  onAdd: (code: string) => void;
}

function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="product-card">
      <div
        className="product-color"
        style={{ backgroundColor: COLORS[product.code] || "#ccc" }}
      />
      <h3>{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button onClick={() => onAdd(product.code)}>Add to Basket</button>
    </div>
  );
}

export default ProductCard;
