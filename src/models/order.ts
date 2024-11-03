import { PoolClient } from "pg";
import client from "../database"
import { Product } from "./product";

import dotenv from 'dotenv'

dotenv.config();

export type Order = {
    id?: number;
    status: string,
    user_id: number;
};

// is this right (OrderProduct, but not really)
export type OrderProduct = {
    id?: number; // is this necessary?
    quantity: number;
    order_id?: number;
    product_id: number;
}



export class OrderStore {
    async create(user_id: number) : Promise<Order> {
        // in this context, an order can be "empty"
        // then we start adding to it

        // for this, creating order will also
        // create at least one item in cart

        // todo: user should only be able to create
        // order for themselves
        const conn = await client.connect();

        const orderSql: string = "INSERT INTO orders (status, user_id) VALUES ($1, $2) returning id;";
        
        try
        {
            // i don't know enough about capturing returned stuff with transactions
            // so i'll revisit this later.
            //await client.query("BEGIN;");
            const orderResult = await client.query(orderSql, ["active", user_id]);
            conn.release();
            const orderId : number = orderResult.rows[0].id;
            // i am not sure if the above will work with BEGIN
            // will try out and see
            return {
                id: orderId,
                user_id: user_id,
                status: "active"
            };
            //const addToCartResult = await this.addToOrderHelper(orderId, productId, qty);
            
            // will see if this has to be done as one giant
            // sql statement...
            //await client.query("COMMIT;");
        }
        catch(err)
        {
            console.log("Error in creating order, rolling back.");
            await client.query("ROLLBACK;");
            conn.release();
            return {
                id: -1,
                status: "",
                user_id: -1 
            };
        }

    }


    // convention for func names?
    async addToOrder(orderId: number, productId: number, qty: number) : Promise<OrderProduct> {
        const conn = await client.connect();

        let addedProduct = await this.addToOrderHelper(orderId, productId, qty);

        conn.release();

        return addedProduct;

    }

    async addToOrderHelper(orderId: number, productId: number, qty: number) : Promise<OrderProduct> {
        const addToOrderSql: string = "INSERT INTO order_products (order_id, product_id, quantuty) VALUES ($1, $2, $3) returning *;"
        const insertResult = await client.query(addToOrderSql, [orderId, productId, qty]);
        let addedOrderProduct : OrderProduct = {
            id: insertResult.rows[0].id,
            quantity: insertResult.rows[0].quantity,
            order_id: insertResult.rows[0].order_id,
            product_id: insertResult.rows[0].product_id

        };

        return addedOrderProduct;
    }
    // i don't need a model
    // but how do i return a list of order_products without a model?

    async getOrder(orderId: number) : Promise<OrderProduct []> {
        // get all order items using sql
        // return into array

        // fields could be optimized, we know all products have
        const getOrderSql = "SELECT product_id, quantity FROM order_products WHERE order_id=$1;"

        const conn = await client.connect();
        
        const queryResult = await client.query(getOrderSql, [orderId]);

        const results = queryResult.rows;

        conn.release();

        return results;
    }

    async updateOrderStatus(orderId: number, newStatus: string): Promise<void> {

    }
}