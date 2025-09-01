import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

// Initialize SQLite database (for testing without PostgreSQL)
const initSQLite = async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'customer',
      is_verified BOOLEAN DEFAULT false,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      cuisine TEXT,
      phone TEXT,
      street_address TEXT,
      city TEXT,
      state TEXT,
      price_range TEXT,
      images TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      restaurant_id INTEGER,
      reservation_date DATE NOT NULL,
      reservation_time TIME NOT NULL,
      party_size INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      special_requests TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
    );

    -- Insert sample data
    INSERT OR IGNORE INTO restaurants (name, description, cuisine, phone, street_address, city, state, price_range, images) VALUES
    ('The Gourmet Bistro', 'Fine dining experience with fresh, locally sourced ingredients', 'French', '555-0101', '123 Main Street', 'New York', 'NY', '$$$', '["gourmet1.jpg", "gourmet2.jpg"]'),
    ('Mario''s Pizza Palace', 'Authentic Italian pizza made with traditional wood-fired ovens', 'Italian', '555-0202', '456 Oak Avenue', 'New York', 'NY', '$$', '["pizza1.jpg", "pizza2.jpg"]'),
    ('Sakura Sushi', 'Fresh sushi and sashimi prepared by master chefs', 'Japanese', '555-0303', '789 Pine Street', 'New York', 'NY', '$$$$', '["sushi1.jpg", "sushi2.jpg"]');
  `);

  console.log('SQLite database initialized with sample data');
  return db;
};

export default initSQLite;
