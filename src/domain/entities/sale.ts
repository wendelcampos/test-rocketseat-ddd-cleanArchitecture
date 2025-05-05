import { Entity } from "@/core/entity";
import { UniqueEntityID } from "@/core/unique-entity-id";

interface SaleItem {
  productId: UniqueEntityID;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}[]

interface SaleProps {
  items: SaleItem[];
  total: number;
  createdAt: Date;
}

export class Sale extends Entity<SaleProps> {
  get items(): SaleItem[] {
    return this.props.items;
  }

  get total(): number {
    return this.props.total;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: Omit<SaleProps, 'createdAt'>, items: SaleItem[]): Sale {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return new Sale({
        ...props,
        total,
        createdAt: new Date()
    });
  }
}