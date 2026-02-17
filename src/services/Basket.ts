import { Product, DeliveryRule, Offer } from "../types/types";

export class Basket {
  private catalogue: Product[];
  private deliveryRules: DeliveryRule[];
  private offers: Offer[];
  private items: Product[] = [];

  constructor(
    catalogue: Product[],
    deliveryRules: DeliveryRule[],
    offers: Offer[]
  ) {
    this.catalogue = catalogue;
    this.deliveryRules = deliveryRules;
    this.offers = offers;
  }

  add(productCode: string): void {
    const product = this.catalogue.find((p) => p.code === productCode);
    if (!product) {
      throw new Error(`Product with code "${productCode}" not found`);
    }
    this.items.push(product);
  }

  getItems(): Product[] {
    return [...this.items];
  }

  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getDiscount(): number {
    return this.offers.reduce((total, offer) => total + offer.apply(this.items), 0);
  }

  getDeliveryCharge(amountAfterDiscount: number): number {
    const rule = this.deliveryRules.find(
      (rule) => amountAfterDiscount >= rule.minSpend
    );
    return rule ? rule.charge : 0;
  }

  total(): string {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscount();
    const afterDiscount = subtotal - discount;
    const delivery = this.getDeliveryCharge(afterDiscount);
    const total = afterDiscount + delivery;

    return `$${(Math.floor(total * 100) / 100).toFixed(2)}`;
  }

  clear(): void {
    this.items = [];
  }
}
