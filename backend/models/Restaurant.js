const pool = require('../config/db.js');

class Restaurant {
  static async create(restaurantData) {
    const {
      name, description, cuisine, phone, email, website,
      street_address, city, state, zip_code, country = 'USA',
      latitude, longitude, price_range, images = []
    } = restaurantData;
    
    const query = `
      INSERT INTO restaurants (
        name, description, cuisine, phone, email, website,
        street_address, city, state, zip_code, country,
        latitude, longitude, price_range, images
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      name, description, cuisine, phone, email, website,
      street_address, city, state, zip_code, country,
      latitude, longitude, price_range, images
    ]);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT r.*, 
             COALESCE(AVG(rv.rating), 0) as avg_rating,
             COUNT(rv.id) as review_count
      FROM restaurants r
      LEFT JOIN reviews rv ON r.id = rv.restaurant_id
      WHERE r.is_active = true
    `;
    
    const params = [];
    let paramCount = 0;

    if (filters.cuisine) {
      paramCount++;
      query += ` AND r.cuisine ILIKE $${paramCount}`;
      params.push(`%${filters.cuisine}%`);
    }

    if (filters.city) {
      paramCount++;
      query += ` AND r.city ILIKE $${paramCount}`;
      params.push(`%${filters.city}%`);
    }

    if (filters.search) {
      paramCount++;
      query += ` AND (r.name ILIKE $${paramCount} OR r.description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
    }

    query += ` GROUP BY r.id ORDER BY r.created_at DESC`;

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
    }

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT r.*, 
             COALESCE(AVG(rv.rating), 0) as avg_rating,
             COUNT(rv.id) as review_count
      FROM restaurants r
      LEFT JOIN reviews rv ON r.id = rv.restaurant_id
      WHERE r.id = $1 AND r.is_active = true
      GROUP BY r.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 0;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
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
      UPDATE restaurants 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'UPDATE restaurants SET is_active = false WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getHours(restaurantId) {
    const query = `
      SELECT * FROM restaurant_hours 
      WHERE restaurant_id = $1 
      ORDER BY day_of_week
    `;
    const result = await pool.query(query, [restaurantId]);
    return result.rows;
  }

  static async setHours(restaurantId, hours) {
    // Delete existing hours
    await pool.query('DELETE FROM restaurant_hours WHERE restaurant_id = $1', [restaurantId]);
    
    // Insert new hours
    for (const hour of hours) {
      const query = `
        INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await pool.query(query, [
        restaurantId, hour.day_of_week, hour.open_time, hour.close_time, hour.is_closed
      ]);
    }
  }

  static async getTables(restaurantId) {
    const query = `
      SELECT * FROM restaurant_tables 
      WHERE restaurant_id = $1 AND is_available = true
      ORDER BY table_number
    `;
    const result = await pool.query(query, [restaurantId]);
    return result.rows;
  }

  static async addTable(restaurantId, tableData) {
    const { table_number, capacity } = tableData;
    const query = `
      INSERT INTO restaurant_tables (restaurant_id, table_number, capacity)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [restaurantId, table_number, capacity]);
    return result.rows[0];
  }

  static async getAvailableTables(restaurantId, date, time, partySize) {
    const query = `
      SELECT rt.* FROM restaurant_tables rt
      WHERE rt.restaurant_id = $1 
        AND rt.capacity >= $4
        AND rt.is_available = true
        AND rt.id NOT IN (
          SELECT COALESCE(r.table_id, 0) FROM reservations r
          WHERE r.restaurant_id = $1 
            AND r.reservation_date = $2 
            AND r.reservation_time = $3
            AND r.status IN ('confirmed', 'pending')
            AND r.table_id IS NOT NULL
        )
      ORDER BY rt.capacity ASC
    `;
    const result = await pool.query(query, [restaurantId, date, time, partySize]);
    return result.rows;
  }

  static async searchNearby(latitude, longitude, radius = 10) {
    const query = `
      SELECT r.*, 
             COALESCE(AVG(rv.rating), 0) as avg_rating,
             COUNT(rv.id) as review_count,
             (6371 * acos(cos(radians($1)) * cos(radians(r.latitude)) * 
              cos(radians(r.longitude) - radians($2)) + sin(radians($1)) * 
              sin(radians(r.latitude)))) AS distance
      FROM restaurants r
      LEFT JOIN reviews rv ON r.id = rv.restaurant_id
      WHERE r.is_active = true 
        AND r.latitude IS NOT NULL 
        AND r.longitude IS NOT NULL
      GROUP BY r.id
      HAVING distance <= $3
      ORDER BY distance
    `;
    const result = await pool.query(query, [latitude, longitude, radius]);
    return result.rows;
  }
}

module.exports = Restaurant;