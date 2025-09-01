// Mock Database for Demo Purposes
const bcrypt = require('bcryptjs');

// Mock data storage
let mockData = {
  users: [
    {
      id: 1,
      email: 'demo@example.com',
      password: '$2a$12$xpXA1871h1QBBZJZpNfDfejlEh7ybODFKaBndocqETBQJ5WkIDwXy', // password: 'demo123'
      name: 'Demo User',
      first_name: 'Demo',
      last_name: 'User',
      phone: '123-456-7890',
      role: 'customer',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      email: 'admin@restaurant.com',
      password: '$2a$12$xpXA1871h1QBBZJZpNfDfejlEh7ybODFKaBndocqETBQJ5WkIDwXy', // password: 'demo123'
      name: 'Admin User',
      first_name: 'Admin',
      last_name: 'User',
      phone: '987-654-3210',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  restaurants: [
    {
      id: 1,
      name: 'Ahdoos Restaurant',
      description: 'Iconic multi-cuisine restaurant serving authentic Kashmiri Wazwan, North Indian, and Continental dishes since 1918. Famous for their traditional Kashmiri hospitality.',
      cuisine: 'Kashmiri',
      address: 'Residency Road, Lal Chowk, Srinagar, Kashmir 190001',
      phone: '+91-194-2452692',
      email: 'info@ahdoosrestaurant.com',
      hours: '7:00 AM - 11:00 PM',
      capacity: 120,
      rating: 4.6,
      price_range: '₹₹₹',
      image_url: '/assets/hero-image1.png',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Mughal Darbar',
      description: 'Renowned for authentic Kashmiri Wazwan cuisine and traditional Mughlai dishes. Experience the royal taste of Kashmir with their famous Rogan Josh and Yakhni.',
      cuisine: 'Kashmiri',
      address: 'Polo View, Srinagar, Kashmir 190001',
      phone: '+91-194-2501635',
      email: 'info@mughaldarbar.com',
      hours: '12:00 PM - 11:00 PM',
      capacity: 80,
      rating: 4.8,
      price_range: '₹₹₹₹',
      image_url: '/assets/hero-image3.jpg',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Stream Restaurant',
      description: 'Fine dining restaurant with stunning views of Dal Lake. Specializing in Kashmiri, Continental, and Chinese cuisine with fresh local ingredients.',
      cuisine: 'Multi-Cuisine',
      address: 'The Lalit Grand Palace, Gupkar Road, Srinagar, Kashmir 190001',
      phone: '+91-194-2501001',
      email: 'info@streamrestaurant.com',
      hours: '6:30 AM - 11:30 PM',
      capacity: 150,
      rating: 4.7,
      price_range: '₹₹₹₹',
      image_url: '/assets/hero-image5.jpg',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Shamyana Restaurant',
      description: 'Popular local eatery famous for authentic Kashmiri breakfast, traditional bread (Tsot and Girda), and aromatic Kashmiri tea (Kahwa). A favorite among locals.',
      cuisine: 'Kashmiri',
      address: 'Karan Nagar, Srinagar, Kashmir 190010',
      phone: '+91-194-2311524',
      email: 'info@shamyanarestaurant.com',
      hours: '6:00 AM - 10:00 PM',
      capacity: 60,
      rating: 4.4,
      price_range: '₹₹',
      image_url: '/assets/hero-image2.png',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'Clove Restaurant',
      description: 'Modern restaurant offering fusion of traditional Kashmiri flavors with contemporary cooking techniques. Known for their innovative take on Wazwan dishes.',
      cuisine: 'Indian',
      address: 'Boulevard Road, Dal Lake, Srinagar, Kashmir 190001',
      phone: '+91-194-2501888',
      email: 'info@cloverestaurant.com',
      hours: '11:00 AM - 11:00 PM',
      capacity: 90,
      rating: 4.5,
      price_range: '₹₹₹',
      image_url: '/assets/hero-image4.jpg',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      name: 'Wazwan Corner',
      description: 'Authentic Wazwan specialist offering traditional 36-course Kashmiri feast. Experience the rich culinary heritage of Kashmir with master chefs trained in royal kitchens.',
      cuisine: 'Kashmiri',
      address: 'Rajbagh, Srinagar, Kashmir 190008',
      phone: '+91-194-2420101',
      email: 'info@wazwancorner.com',
      hours: '1:00 PM - 10:00 PM',
      capacity: 100,
      rating: 4.9,
      price_range: '₹₹₹₹₹',
      image_url: '/assets/hero-image6.jpg',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  reservations: [],
  reviews: []
};

// Mock database client
class MockDatabase {
  async query(text, params) {
    console.log('Mock DB Query:', text, params || '');
    
    // Handle authentication queries
    if (text.includes('SELECT * FROM users WHERE email')) {
      const email = params[0];
      const user = mockData.users.find(u => u.email === email);
      return { rows: user ? [user] : [] };
    }
    
    // Handle user lookup by ID (for auth middleware)
    if (text.includes('SELECT id, name, email, phone, role, created_at FROM users WHERE id')) {
      const id = params[0];
      const user = mockData.users.find(u => u.id === parseInt(id));
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return { rows: [userWithoutPassword] };
      }
      return { rows: [] };
    }
    
    // Handle user registration
    if (text.includes('INSERT INTO users')) {
      const [email, hashedPassword, firstName, lastName, phone] = params;
      const newUser = {
        id: mockData.users.length + 1,
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        phone,
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date()
      };
      mockData.users.push(newUser);
      return { rows: [newUser] };
    }
    
    // Handle restaurant queries
    if (text.includes('SELECT r.*') && text.includes('FROM restaurants r')) {
      if (text.includes('WHERE id = $1')) {
        const id = params[0];
        const restaurant = mockData.restaurants.find(r => r.id === parseInt(id));
        return { rows: restaurant ? [restaurant] : [] };
      }
      
      // Handle complex restaurant query with reviews
      if (text.includes('LEFT JOIN reviews')) {
        const restaurantsWithRatings = mockData.restaurants.map(r => ({
          ...r,
          avg_rating: r.rating || 0,
          review_count: 0 // Mock review count
        }));
        return { rows: restaurantsWithRatings };
      }
      
      // Return all restaurants
      return { rows: mockData.restaurants };
    }
    
    if (text.includes('SELECT * FROM restaurants')) {
      if (text.includes('WHERE id = $1')) {
        const id = params[0];
        const restaurant = mockData.restaurants.find(r => r.id === parseInt(id));
        return { rows: restaurant ? [restaurant] : [] };
      }
      // Return all restaurants
      return { rows: mockData.restaurants };
    }
    
    // Handle reservation creation
    if (text.includes('INSERT INTO reservations')) {
      const userId = params[0];
      const restaurantId = params[1];
      const reservationDate = params[2];
      const reservationTime = params[3];
      const partySize = params[4];
      const specialRequests = params[5];
      const tableId = params[6] || null;
      
      const newReservation = {
        id: mockData.reservations.length + 1,
        user_id: userId,
        restaurant_id: restaurantId,
        reservation_date: reservationDate,
        reservation_time: reservationTime,
        party_size: partySize,
        special_requests: specialRequests,
        table_id: tableId,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date()
      };
      mockData.reservations.push(newReservation);
      return { rows: [newReservation] };
    }
    
    // Handle specific reservation queries by user (must come before table checks)
    if (text.includes('rest.name as restaurant_name, rest.street_address, rest.city, rest.images')) {
      let reservations = mockData.reservations;
      
      // Filter by user if userId parameter is provided
      if (params && params.length > 0) {
        const userId = params[0];
        reservations = reservations.filter(r => r.user_id === userId);
      }
      
      // Add restaurant and table information
      const reservationsWithDetails = reservations.map(r => {
        const restaurant = mockData.restaurants.find(rest => rest.id === r.restaurant_id);
        return {
          ...r,
          restaurant_name: restaurant ? restaurant.name : 'Unknown Restaurant',
          street_address: restaurant ? restaurant.address : '',
          city: restaurant ? 'Downtown' : '',
          images: restaurant ? [restaurant.image_url] : [],
          table_number: r.table_id ? `Table ${r.table_id}` : null
        };
      });
      
      return { rows: reservationsWithDetails };
    }
    
    // Handle availability checks (always return no conflicts for demo)
    if (text.includes('conflicting_reservations')) {
      return { rows: [{ conflicting_reservations: 0 }] };
    }
    
    // Handle table availability checks
    if (text.includes('available_tables') || text.includes('restaurant_tables')) {
      return { rows: [{ available_tables: 10 }] }; // Always have tables available for demo
    }
    
    // Handle table selection queries
    if (text.includes('FROM restaurant_tables rt')) {
      return { rows: [] }; // No specific table assigned for demo
    }
    
    // Handle specific reservation queries by user
    if (text.includes('rest.name as restaurant_name, rest.street_address, rest.city, rest.images')) {
      let reservations = mockData.reservations;
      
      // Filter by user if userId parameter is provided
      if (params && params.length > 0) {
        const userId = params[0];
        reservations = reservations.filter(r => r.user_id === userId);
      }
      
      // Add restaurant and table information
      const reservationsWithDetails = reservations.map(r => {
        const restaurant = mockData.restaurants.find(rest => rest.id === r.restaurant_id);
        return {
          ...r,
          restaurant_name: restaurant ? restaurant.name : 'Unknown Restaurant',
          street_address: restaurant ? restaurant.address : '',
          city: restaurant ? 'Downtown' : '',
          images: restaurant ? [restaurant.image_url] : [],
          table_number: r.table_id ? `Table ${r.table_id}` : null
        };
      });
      
      return { rows: reservationsWithDetails };
    }
    
    // Handle reservation queries with complex joins
    if (text.includes('SELECT r.*') && text.includes('FROM reservations r')) {
      let reservations = mockData.reservations;
      
      // Filter by user if userId parameter is provided
      if (params && params.length > 0) {
        const userId = params[0];
        reservations = reservations.filter(r => r.user_id === userId);
      }
      
      // Add restaurant and table information
      const reservationsWithDetails = reservations.map(r => {
        const restaurant = mockData.restaurants.find(rest => rest.id === r.restaurant_id);
        return {
          ...r,
          restaurant_name: restaurant ? restaurant.name : 'Unknown Restaurant',
          street_address: restaurant ? restaurant.address : '',
          city: restaurant ? 'City' : '',
          images: restaurant ? [restaurant.image_url] : [],
          table_number: r.table_id ? `Table ${r.table_id}` : null,
          user_name: 'Demo User',
          user_email: 'demo@example.com',
          user_phone: '123-456-7890',
          table_capacity: 4
        };
      });
      
      return { rows: reservationsWithDetails };
    }
    
    // Default empty result
    return { rows: [] };
  }
  
  async connect() {
    console.log('Mock DB: Connected successfully');
  }
  
  async end() {
    console.log('Mock DB: Connection closed');
  }
}

const mockPool = new MockDatabase();

// Mock the connection events
setTimeout(() => {
  console.log('🟢 Mock Database connected successfully for demo');
}, 100);

module.exports = mockPool;
