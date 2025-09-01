const pool = require('../config/db.js');

class Review {
  static async create(reviewData) {
    const { user_id, restaurant_id, reservation_id, rating, comment } = reviewData;

    const query = `
      INSERT INTO reviews (user_id, restaurant_id, reservation_id, rating, comment)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(query, [user_id, restaurant_id, reservation_id, rating, comment]);
    return result.rows[0];
  }

  static async findByRestaurantId(restaurantId, limit = 50, offset = 0) {
    const query = `
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.restaurant_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [restaurantId, limit, offset]);
    return result.rows;
  }

  static async findByUserId(userId) {
    const query = `
      SELECT r.*, rest.name as restaurant_name
      FROM reviews r
      JOIN restaurants rest ON r.restaurant_id = rest.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getAverageRating(restaurantId) {
    const query = `
      SELECT 
        COALESCE(AVG(rating), 0) as average_rating,
        COUNT(*) as total_reviews
      FROM reviews 
      WHERE restaurant_id = $1
    `;
    const result = await pool.query(query, [restaurantId]);
    return result.rows[0];
  }

  static async update(id, userId, updateData) {
    const { rating, comment } = updateData;
    const query = `
      UPDATE reviews 
      SET rating = $1, comment = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [rating, comment, id, userId]);
    return result.rows[0];
  }

  static async delete(id, userId) {
    const query = `
      DELETE FROM reviews 
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async checkUserReview(userId, restaurantId, reservationId) {
    const query = `
      SELECT id FROM reviews 
      WHERE user_id = $1 AND restaurant_id = $2 AND reservation_id = $3
    `;
    const result = await pool.query(query, [userId, restaurantId, reservationId]);
    return result.rows[0];
  }
}

module.exports = Review;
