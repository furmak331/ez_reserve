const pool = require('../config/db.js');

class Reservation {
  static async create(reservationData) {
    const {
      user_id, restaurant_id, reservation_date, reservation_time,
      party_size, special_requests, table_id
    } = reservationData;

    const query = `
      INSERT INTO reservations (
        user_id, restaurant_id, reservation_date, reservation_time,
        party_size, special_requests, table_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const result = await pool.query(query, [
      user_id, restaurant_id, reservation_date, reservation_time,
      party_size, special_requests, table_id
    ]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT r.*, 
             u.name as user_name, u.email as user_email, u.phone as user_phone,
             rest.name as restaurant_name, rest.street_address, rest.city,
             rt.table_number, rt.capacity as table_capacity
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN restaurants rest ON r.restaurant_id = rest.id
      LEFT JOIN restaurant_tables rt ON r.table_id = rt.id
      WHERE r.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId, filters = {}) {
    let query = `
      SELECT r.*, 
             rest.name as restaurant_name, rest.street_address, rest.city, rest.images,
             rt.table_number
      FROM reservations r
      JOIN restaurants rest ON r.restaurant_id = rest.id
      LEFT JOIN restaurant_tables rt ON r.table_id = rt.id
      WHERE r.user_id = $1
    `;

    const params = [userId];
    let paramCount = 1;

    if (filters.status) {
      paramCount++;
      query += ` AND r.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.upcoming) {
      query += ` AND r.reservation_date >= CURRENT_DATE`;
    }

    query += ` ORDER BY r.reservation_date DESC, r.reservation_time DESC`;

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findByRestaurantId(restaurantId, filters = {}) {
    let query = `
      SELECT r.*, 
             u.name as user_name, u.email as user_email, u.phone as user_phone,
             rt.table_number
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      LEFT JOIN restaurant_tables rt ON r.table_id = rt.id
      WHERE r.restaurant_id = $1
    `;

    const params = [restaurantId];
    let paramCount = 1;

    if (filters.status) {
      paramCount++;
      query += ` AND r.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.date) {
      paramCount++;
      query += ` AND r.reservation_date = $${paramCount}`;
      params.push(filters.date);
    }

    query += ` ORDER BY r.reservation_date ASC, r.reservation_time ASC`;

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE reservations 
      SET status = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 0;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined && key !== 'id') {
        paramCount++;
        fields.push(`${key} = $${paramCount}`);
        values.push(updateData[key]);
      }
    });

    if (fields.length === 0) return null;

    paramCount++;
    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE reservations 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async cancel(id) {
    const query = `
      UPDATE reservations 
      SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async checkAvailability(restaurantId, date, time, partySize, excludeReservationId = null) {
    let query = `
      SELECT COUNT(*) as conflicting_reservations
      FROM reservations r
      WHERE r.restaurant_id = $1 
        AND r.reservation_date = $2 
        AND r.reservation_time = $3
        AND r.status IN ('confirmed', 'pending')
    `;

    const params = [restaurantId, date, time];
    let paramCount = 3;

    if (excludeReservationId) {
      paramCount++;
      query += ` AND r.id != $${paramCount}`;
      params.push(excludeReservationId);
    }

    const result = await pool.query(query, params);
    const conflictCount = parseInt(result.rows[0].conflicting_reservations);

    // Check available tables for this party size
    const tableQuery = `
      SELECT COUNT(*) as available_tables
      FROM restaurant_tables rt
      WHERE rt.restaurant_id = $1 
        AND rt.capacity >= $2
        AND rt.is_available = true
    `;
    
    const tableResult = await pool.query(tableQuery, [restaurantId, partySize]);
    const availableTables = parseInt(tableResult.rows[0].available_tables);

    return availableTables > conflictCount;
  }

  static async getUpcoming(limit = 10) {
    const query = `
      SELECT r.*, 
             u.name as user_name, u.email as user_email,
             rest.name as restaurant_name
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN restaurants rest ON r.restaurant_id = rest.id
      WHERE r.reservation_date >= CURRENT_DATE
        AND r.status IN ('confirmed', 'pending')
      ORDER BY r.reservation_date ASC, r.reservation_time ASC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  static async getStatistics(restaurantId, startDate, endDate) {
    const query = `
      SELECT 
        COUNT(*) as total_reservations,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_reservations,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_reservations,
        COUNT(CASE WHEN status = 'no_show' THEN 1 END) as no_show_reservations,
        AVG(party_size) as avg_party_size
      FROM reservations 
      WHERE restaurant_id = $1 
        AND reservation_date BETWEEN $2 AND $3
    `;
    const result = await pool.query(query, [restaurantId, startDate, endDate]);
    return result.rows[0];
  }
}

module.exports = Reservation;