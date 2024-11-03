import client from "../database"
import { Product } from "../models/product";

export class Dashboard {
    async getExpensiveProducts(topAmt: number = 5) : Promise<Product []> {

    }

    async getProductsInCarts() : Promise<{name: string, id: number, price:number}> {
        const sql:string = "select id, name, price from products INNER JOIN on product.id = order_products.order_id"
    }
}