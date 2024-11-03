import client from "../database"

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    // in future need to auth certain routes
    // use middlewear?

    async create(product: Product) : Promise<number> {

    }

    async update(product: Product) : Promise<void> {
        
    }
};