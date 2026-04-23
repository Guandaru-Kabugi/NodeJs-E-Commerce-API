import pool from "../../db/connect.js";

class ProductModel {
  // CREATE
  static async createProduct(productData) {
    const { title, description, product_serial, tag, image_url } = productData;

    const query = `
      INSERT INTO products (title, description, product_serial, tag, image_url)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

    const values = [title, description, product_serial, tag, image_url];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // READ ALL
  static async getAllProducts() {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );

    return result.rows;
  }

  // READ ONE
  static async getProductById(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    return result.rows[0];
  }

  // UPDATE
  static async updateProduct(id, data) {
    // 1. Fetch existing product
    const existing = await ProductModel.getProductById(id);
    if (!existing) return null;

    // 2. Merge — keep existing values for anything not sent
    const title = data.title ?? existing.title;
    const description = data.description ?? existing.description;
    const tag = data.tag ?? existing.tag;
    const product_serial = data.product_serial ?? existing.product_serial;
    const image_url = data.image_url ?? existing.image_url;
    

    const query = `
    UPDATE products
    SET title=$1, description=$2, tag=$3, product_serial=$4, updated_at=NOW(), image_url=$5
    WHERE id=$6
    RETURNING *
  `;

    const values = [title, description, tag, product_serial, image_url, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // DELETE
  static async deleteProduct(id) {
    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id],
    );

    return result.rows[0];
  }
}

export default ProductModel;
