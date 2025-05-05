import { Entity } from "@/core/entity";
import { UniqueEntityID } from "@/core/unique-entity-id";

interface ProductProps {
    productId: UniqueEntityID
    nome: string
    quantity: number;
    minimumQuantity: number;
    createdAt: Date;
}

export class Product extends Entity<ProductProps> {
    get productId(): UniqueEntityID {
        return this.props.productId;
    }

    get nome(): string {
        return this.props.nome;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    get minimumQuantity(): number {
        return this.props.minimumQuantity;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    public lowStock() {
        return this.props.quantity <= this.props.minimumQuantity
    }

    static create(props: Omit<ProductProps, 'createdAt'>): Product {

        if (props.quantity < 0 || props.minimumQuantity < 0) {
            throw new Error('Quantidades não podem ser negativas.');
        }
        const product = new Product({
            ...props,
            createdAt: new Date(),
        });
        
        return product;
    }
}