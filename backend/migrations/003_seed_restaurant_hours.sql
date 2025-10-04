-- Insert sample restaurant hours for all restaurants
-- Monday to Friday: 11:00 AM - 10:00 PM, Saturday-Sunday: 10:00 AM - 11:00 PM

INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed) VALUES
-- Restaurant 1 - Mughal Darbar
(1, 1, '11:00', '22:00', false), -- Monday
(1, 2, '11:00', '22:00', false), -- Tuesday  
(1, 3, '11:00', '22:00', false), -- Wednesday
(1, 4, '11:00', '22:00', false), -- Thursday
(1, 5, '11:00', '22:00', false), -- Friday
(1, 6, '10:00', '23:00', false), -- Saturday
(1, 0, '10:00', '23:00', false), -- Sunday

-- Restaurant 2 - Kashmir Crown
(2, 1, '11:00', '22:00', false),
(2, 2, '11:00', '22:00', false),
(2, 3, '11:00', '22:00', false),
(2, 4, '11:00', '22:00', false),
(2, 5, '11:00', '22:00', false),
(2, 6, '10:00', '23:00', false),
(2, 0, '10:00', '23:00', false),

-- Restaurant 3 - Shalimar Restaurant
(3, 1, '11:00', '22:00', false),
(3, 2, '11:00', '22:00', false),
(3, 3, '11:00', '22:00', false),
(3, 4, '11:00', '22:00', false),
(3, 5, '11:00', '22:00', false),
(3, 6, '10:00', '23:00', false),
(3, 0, '10:00', '23:00', false),

-- Restaurant 4 - Ahdoos Restaurant
(4, 1, '11:00', '22:00', false),
(4, 2, '11:00', '22:00', false),
(4, 3, '11:00', '22:00', false),
(4, 4, '11:00', '22:00', false),
(4, 5, '11:00', '22:00', false),
(4, 6, '10:00', '23:00', false),
(4, 0, '10:00', '23:00', false),

-- Restaurant 5 - Shamyana Restaurant
(5, 1, '11:00', '22:00', false),
(5, 2, '11:00', '22:00', false),
(5, 3, '11:00', '22:00', false),
(5, 4, '11:00', '22:00', false),
(5, 5, '11:00', '22:00', false),
(5, 6, '10:00', '23:00', false),
(5, 0, '10:00', '23:00', false),

-- Restaurant 6 - The Chinar
(6, 1, '11:00', '22:00', false),
(6, 2, '11:00', '22:00', false),
(6, 3, '11:00', '22:00', false),
(6, 4, '11:00', '22:00', false),
(6, 5, '11:00', '22:00', false),
(6, 6, '10:00', '23:00', false),
(6, 0, '10:00', '23:00', false)
ON CONFLICT DO NOTHING;