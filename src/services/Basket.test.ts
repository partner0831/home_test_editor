import { Basket } from "./Basket";
import { products, deliveryRules, offers } from "../constants/catalogue";

describe("Basket", () => {
  let basket: Basket;

  beforeEach(() => {
    basket = new Basket(products, deliveryRules, offers);
  });

  test("B01, G01 should total $37.85", () => {
    basket.add("B01");
    basket.add("G01");
    expect(basket.total()).toBe("$37.85");
  });

  test("R01, R01 should total $54.37", () => {
    basket.add("R01");
    basket.add("R01");
    expect(basket.total()).toBe("$54.37");
  });

  test("R01, G01 should total $60.85", () => {
    basket.add("R01");
    basket.add("G01");
    expect(basket.total()).toBe("$60.85");
  });

  test("B01, B01, R01, R01, R01 should total $98.27", () => {
    basket.add("B01");
    basket.add("B01");
    basket.add("R01");
    basket.add("R01");
    basket.add("R01");
    expect(basket.total()).toBe("$98.27");
  });

  test("throws error for invalid product code", () => {
    expect(() => basket.add("INVALID")).toThrow(
      'Product with code "INVALID" not found',
    );
  });

  test("empty basket should total $0.00 with delivery", () => {
    expect(basket.total()).toBe("$4.95");
  });
});
