const pool = require('../config/db.js');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, phone, role = 'customer' } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO users (name, email, password, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, phone, role, created_at
    `;
    
    const result = await pool.query(query, [name, email, hashedPassword, phone, role]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const query = `
      UPDATE users 
      SET password = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2
      RETURNING id
    `;
    const result = await pool.query(query, [hashedPassword, userId]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateProfile(userId, updateData) {
    const { name, phone } = updateData;
    const query = `
      UPDATE users 
      SET name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3
      RETURNING id, name, email, phone, role
    `;
    const result = await pool.query(query, [name, phone, userId]);
    return result.rows[0];
  }

  static async setVerificationToken(email, token) {
    const query = `
      UPDATE users 
      SET verification_token = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE email = $2
    `;
    await pool.query(query, [token, email]);
  }

  static async verifyUser(token) {
    const query = `
      UPDATE users 
      SET is_verified = true, verification_token = null, updated_at = CURRENT_TIMESTAMP 
      WHERE verification_token = $1
      RETURNING id, name, email
    `;
    const result = await pool.query(query, [token]);
    return result.rows[0];
  }

  static async setResetToken(email, token, expires) {
    const query = `
      UPDATE users 
      SET reset_password_token = $1, reset_password_expires = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE email = $3
    `;
    await pool.query(query, [token, expires, email]);
  }

  static async findByResetToken(token) {
    const query = `
      SELECT * FROM users 
      WHERE reset_password_token = $1 AND reset_password_expires > CURRENT_TIMESTAMP
    `;
    const result = await pool.query(query, [token]);
    return result.rows[0];
  }

  static async clearResetToken(userId) {
    const query = `
      UPDATE users 
      SET reset_password_token = null, reset_password_expires = null, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `;
    await pool.query(query, [userId]);
  }
}

module.exports = User;
