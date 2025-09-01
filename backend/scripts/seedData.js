import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const insertSampleData = async () => {
  try {
    // Insert sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    // Admin user
    await pool.query(`
      INSERT INTO users (name, email, password, phone, role, is_verified) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      ON CONFLICT (email) DO NOTHING
    `, ['Admin User', 'admin@ezreserve.com', hashedPassword, '1234567890', 'admin', true]);

    // Regular user
    await pool.query(`
      INSERT INTO users (name, email, password, phone, role, is_verified) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      ON CONFLICT (email) DO NOTHING
    `, ['John Doe', 'john@example.com', hashedPassword, '9876543210', 'customer', true]);

    // Insert sample restaurants
    const restaurants = [
      {
        name: 'The Gourmet Bistro',
        description: 'Fine dining experience with fresh, locally sourced ingredients',
        cuisine: 'French',
        phone: '555-0101',
        email: 'contact@gourmetbistro.com',
        street_address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip_code: '10001',
        price_range: '$$$',
        images: ['/images/gourmet-bistro-1.jpg', '/images/gourmet-bistro-2.jpg']
      },
      {
        name: 'Mario\'s Pizza Palace',
        description: 'Authentic Italian pizza made with traditional wood-fired ovens',
        cuisine: 'Italian',
        phone: '555-0202',
        email: 'info@mariospizza.com',
        street_address: '456 Oak Avenue',
        city: 'New York',
        state: 'NY',
        zip_code: '10002',
        price_range: '$$',
        images: ['/images/marios-pizza-1.jpg', '/images/marios-pizza-2.jpg']
      },
      {
        name: 'Sakura Sushi',
        description: 'Fresh sushi and sashimi prepared by master chefs',
        cuisine: 'Japanese',
        phone: '555-0303',
        email: 'hello@sakurasushi.com',
        street_address: '789 Pine Street',
        city: 'New York',
        state: 'NY',
        zip_code: '10003',
        price_range: '$$$$',
        images: ['/images/sakura-sushi-1.jpg', '/images/sakura-sushi-2.jpg']
      }
    ];

    for (const restaurant of restaurants) {
      const result = await pool.query(`
        INSERT INTO restaurants (
          name, description, cuisine, phone, email, 
          street_address, city, state, zip_code, price_range, images
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT DO NOTHING
        RETURNING id
      `, [
        restaurant.name, restaurant.description, restaurant.cuisine,
        restaurant.phone, restaurant.email, restaurant.street_address,
        restaurant.city, restaurant.state, restaurant.zip_code,
        restaurant.price_range, restaurant.images
      ]);

      if (result.rows.length > 0) {
        const restaurantId = result.rows[0].id;

        // Insert restaurant hours (open 5 PM to 10 PM, closed on Mondays)
        const hours = [
          { day: 1, open: null, close: null, closed: true }, // Monday - Closed
          { day: 2, open: '17:00', close: '22:00', closed: false },
          { day: 3, open: '17:00', close: '22:00', closed: false },
          { day: 4, open: '17:00', close: '22:00', closed: false },
          { day: 5, open: '17:00', close: '23:00', closed: false },
          { day: 6, open: '16:00', close: '23:00', closed: false },
          { day: 0, open: '16:00', close: '22:00', closed: false }, // Sunday
        ];

        for (const hour of hours) {
          await pool.query(`
            INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT DO NOTHING
          `, [restaurantId, hour.day, hour.open, hour.close, hour.closed]);
        }

        // Insert sample tables
        const tables = [
          { number: 'T1', capacity: 2 },
          { number: 'T2', capacity: 2 },
          { number: 'T3', capacity: 4 },
          { number: 'T4', capacity: 4 },
          { number: 'T5', capacity: 6 },
          { number: 'T6', capacity: 6 },
          { number: 'T7', capacity: 8 },
        ];

        for (const table of tables) {
          await pool.query(`
            INSERT INTO restaurant_tables (restaurant_id, table_number, capacity)
            VALUES ($1, $2, $3)
            ON CONFLICT DO NOTHING
          `, [restaurantId, table.number, table.capacity]);
        }

        console.log(`Sample data inserted for ${restaurant.name}`);
      }
    }

    console.log('Sample data insertion completed!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await pool.end();
  }
};

insertSampleData();
