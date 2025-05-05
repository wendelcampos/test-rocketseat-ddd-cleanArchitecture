import { Entity } from "@/core/entity";
import { UniqueEntityID } from "@/core/unique-entity-id";

interface OrderItem {
  productId: UniqueEntityID;
  quantity: number;
  unitCost: number;
  subtotal: number; // quantity * unitCost
}

type OrderStatus = 'PENDENTE' | 'EM_PROCESSAMENTO' | 'ENTREGUE' | 'CANCELADA';

interface PurchaseOrderProps {
  supplierId: UniqueEntityID;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  expectedDeliveryDate?: Date;
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
  get supplierId(): UniqueEntityID {
    return this.props.supplierId;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  get total(): number {
    return this.props.total;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get expectedDeliveryDate(): Date | undefined {
    return this.props.expectedDeliveryDate;
  }

  public markAsDelivered() {
    this.props.status = 'ENTREGUE';
  }

  static create(props: Omit<PurchaseOrderProps, 'total' | 'createdAt'>): PurchaseOrder {
    const total = props.items.reduce((sum, item) => sum + item.subtotal, 0);

    return new PurchaseOrder({
      ...props,
      total,
      createdAt: new Date()
    });
  }
}
