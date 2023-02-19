import client from "../database";

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export type ProductOrder = {
  id?: number;
  product_id?: string;
  order_id?: string;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get list of orders. Error: ${error}`);
    }
  }

  async showByOrderID(id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not show order by id. Error: ${error}`);
    }
  }

  async showByUserID(id: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not show order by user id. Error: ${error}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id,status) VALUES($1, $2) RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [order.user_id, order.status]);

      const createdOrder = result.rows[0];
      connection.release();
      return createdOrder;
    } catch (error) {
      throw new Error(`Could not create a new order. Error: ${error}`);
    }
  }

  async deleteOrder(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      const deletedOrder = result.rows[0];
      connection.release();
      return deletedOrder;
    } catch (err) {
      throw new Error(`Could not delete order with id:${id}. Error: ${err}`);
    }
  }

  async createProductOrder(order: ProductOrder): Promise<ProductOrder> {
    try {
      const sql =
        "INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [
        order.quantity,
        order.order_id,
        order.product_id,
      ]);

      const createdOrder = result.rows[0];
      connection.release();
      return createdOrder;
    } catch (error) {
      throw new Error(`Could not create a new order. Error: ${error}`);
    }
  }
  async deleteProductOrder(id: string): Promise<ProductOrder> {
    try {
      const sql = "DELETE FROM order_products WHERE id=($1) RETURNING *";
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      const deletedOrder = result.rows[0];
      connection.release();
      return deletedOrder;
    } catch (err) {
      throw new Error(`Could not delete order with id:${id}. Error: ${err}`);
    }
  }
}
