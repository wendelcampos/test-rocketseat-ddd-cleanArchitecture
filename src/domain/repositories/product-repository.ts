import { Product } from "../entities/product";

export interface ProductRepository {
    create(product: Product): Promise<void>;
}