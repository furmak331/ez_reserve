-- Create restaurant_tables table
CREATE TABLE IF NOT EXISTS restaurant_tables (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  table_number INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample tables for each restaurant
INSERT INTO restaurant_tables (restaurant_id, table_number, capacity, is_available) VALUES
-- Restaurant 1 tables
(1, 1, 2, true),
(1, 2, 2, true),
(1, 3, 4, true),
(1, 4, 4, true),
(1, 5, 6, true),
(1, 6, 8, true),

-- Restaurant 2 tables
(2, 1, 2, true),
(2, 2, 2, true),
(2, 3, 4, true),
(2, 4, 4, true),
(2, 5, 6, true),
(2, 6, 8, true),

-- Restaurant 3 tables
(3, 1, 2, true),
(3, 2, 2, true),
(3, 3, 4, true),
(3, 4, 4, true),
(3, 5, 6, true),
(3, 6, 8, true),

-- Restaurant 4 tables
(4, 1, 2, true),
(4, 2, 2, true),
(4, 3, 4, true),
(4, 4, 4, true),
(4, 5, 6, true),
(4, 6, 8, true),

-- Restaurant 5 tables
(5, 1, 2, true),
(5, 2, 2, true),
(5, 3, 4, true),
(5, 4, 4, true),
(5, 5, 6, true),
(5, 6, 8, true),

-- Restaurant 6 tables
(6, 1, 2, true),
(6, 2, 2, true),
(6, 3, 4, true),
(6, 4, 4, true),
(6, 5, 6, true),
(6, 6, 8, true)
ON CONFLICT DO NOTHING;