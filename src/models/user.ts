import client from "../database";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not show list of users. Error: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not show user with id: ${id}. Error: ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const hashedPassword = await bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashedPassword,
      ]);

      const row = result.rows[0];
      conn.release();
      return row;
    } catch (error) {
      throw new Error(`Could not create a new user. Error: ${error}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const deletedUser = result.rows[0];

      conn.release();

      return deletedUser;
    } catch (error) {
      throw new Error(`Could not delete book ${id}. Error: ${error}`);
    }
  }

  async update(id: string, u: User): Promise<User> {
    try {
      const sql = `UPDATE users SET firstname = $1 , lastname = $2, password = $3 WHERE id = ${id} RETURNING *`;
      const connection = await client.connect();
      const hashedPassword = await bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        hashedPassword,
      ]);
      const row = result.rows[0];
      console.log(result);
      console.log(result.rows);
      connection.release();
      return row;
    } catch (error) {
      throw new Error(`Could not update user. Error: ${error}`);
    }
  }

  async authenticate(id: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE id=($1)";

    const result = await conn.query(sql, [id]);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        console.log("comparison Succeful");
        return user;
      }
    }
    console.log("password comparison failed");
    return null;
  }
}
