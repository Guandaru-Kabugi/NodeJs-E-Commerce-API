import pool from "../db/connect.js";
import bcrypt from "bcrypt";

class UserModel {
  static async createUser(userData) {
    const { first_name, last_name, role, email, password, country, profilePicture } =
      userData;

    const query = `
      INSERT INTO users (first_name, last_name, role, email, password, country, profile_picture)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id, first_name, last_name, role, email, country, profile_picture
    `;

    const values = [
      first_name,
      last_name,
      role,
      email,
      password,
      country,
      profilePicture,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      "SELECT id, first_name, last_name, role, email, country, profile_picture FROM users WHERE id = $1",
      [id],
    );
    return result.rows[0];
  }

  // stores refresh token in DB so we can invalidate it on logout
  static async saveRefreshToken(userId, refreshToken) {
    await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      userId,
    ]);
  }

  static async findByRefreshToken(refreshToken) {
    const result = await pool.query(
      "SELECT * FROM users WHERE refresh_token = $1",
      [refreshToken],
    );
    return result.rows[0];
  }

  static async isValidPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default UserModel;
