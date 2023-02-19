import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not show list of products. Error: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not show product. Error: ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [product.name, product.price]);

      const createdProduct = result.rows[0];
      conn.release();
      return createdProduct;
    } catch (error) {
      throw new Error(`Could not create a new product. Error: ${error}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const deletedProduct = result.rows[0];

      conn.release();

      return deletedProduct;
    } catch (err) {
      throw new Error(`Could not delete product with id: ${id}. Error: ${err}`);
    }
  }

  async update(id: string, product: Product): Promise<Product> {
    try {
      const sql = `UPDATE products SET name = $1 , price = $2 WHERE id = ${id} RETURNING *`;
      const connection = await client.connect();
      const result = await connection.query(sql, [product.name, product.price]);
      const updatedProduct = result.rows[0];
      connection.release();
      return updatedProduct;
    } catch (error) {
      throw new Error(`Could not update product. Error: ${error}`);
    }
  }
}
