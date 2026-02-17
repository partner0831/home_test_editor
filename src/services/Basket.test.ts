import { products, deliveryRules, offers } from "../constants/catalogue";
import { calculateTotal, calculateSubtotal, calculateDiscount, calculateDelivery, formatPrice } from "./Basket";
import { Product } from "../types/types";

// helper to look up products by code
function getProducts(...codes: string[]): Product[] {
  return codes.map(code => {
    const p = products.find(item => item.code === code);
    if (!p) throw new Error(`Product "${code}" not found`);
    return p;
  });
}

describe("basketUtils", () => {
  it("B01 + G01 = $37.85", () => {
    const items = getProducts("B01", "G01");
    const total = calculateTotal(items, offers, deliveryRules);
    expect(formatPrice(total)).toBe("$37.85");
  });

  it("R01 + R01 = $54.37 (second red half price)", () => {
    const items = getProducts("R01", "R01");
    const total = calculateTotal(items, offers, deliveryRules);
    expect(formatPrice(total)).toBe("$54.37");
  });

  it("R01 + G01 = $60.85 (no offer applied)", () => {
    const items = getProducts("R01", "G01");
    const total = calculateTotal(items, offers, deliveryRules);
    expect(formatPrice(total)).toBe("$60.85");
  });

  it("B01 B01 R01 R01 R01 = $98.27 (free delivery + offer)", () => {
    const items = getProducts("B01", "B01", "R01", "R01", "R01");
    const total = calculateTotal(items, offers, deliveryRules);
    expect(formatPrice(total)).toBe("$98.27");
  });

  it("empty basket just has delivery charge", () => {
    const total = calculateTotal([], offers, deliveryRules);
    expect(formatPrice(total)).toBe("$4.95");
  });

  it("calculates subtotal correctly", () => {
    const items = getProducts("R01", "G01");
    expect(calculateSubtotal(items)).toBeCloseTo(57.90);
  });

  it("calculates discount for red widget offer", () => {
    const items = getProducts("R01", "R01");
    expect(calculateDiscount(items, offers)).toBeCloseTo(16.475);
  });

  it("no discount when only one red widget", () => {
    const items = getProducts("R01");
    expect(calculateDiscount(items, offers)).toBe(0);
  });

  it("free delivery for orders >= $90", () => {
    expect(calculateDelivery(95, deliveryRules)).toBe(0);
  });

  it("$2.95 delivery for orders >= $50", () => {
    expect(calculateDelivery(60, deliveryRules)).toBe(2.95);
  });

  it("$4.95 delivery for orders < $50", () => {
    expect(calculateDelivery(30, deliveryRules)).toBe(4.95);
  });
});
