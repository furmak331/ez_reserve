# EZ Reserve - Restaurant Reservation System Setup Guide

## Quick Start Options

### Option 1: Using Docker (Recommended)

1. **Install Docker Desktop:**
   - Download from https://www.docker.com/products/docker-desktop/
   - Follow installation instructions for Windows

2. **Start the database:**
   ```bash
   cd ez_reserve
   docker compose up -d postgres
   ```

3. **Wait for database to be ready (30 seconds), then run:**
   ```bash
   cd backend
   npm run migrate
   node scripts/seedData.js
   npm run dev
   ```

### Option 2: Using Local PostgreSQL

1. **Install PostgreSQL:**
   - Download from https://www.postgresql.org/download/windows/
   - Set password during installation (remember this!)

2. **Create database:**
   ```sql
   -- Open pgAdmin or psql
   CREATE DATABASE ez_reserve;
   ```

3. **Update .env file:**
   ```env
   DB_PASSWORD=your_postgres_password
   ```

4. **Run setup:**
   ```bash
   cd backend
   npm run migrate
   node scripts/seedData.js
   npm run dev
   ```

### Option 3: Using Cloud Database (ElephantSQL - Free)

1. **Sign up at ElephantSQL:**
   - Go to https://www.elephantsql.com/
   - Create free account
   - Create new instance (Tiny Turtle - Free)

2. **Get connection details:**
   - Copy Server, User, Password, Database from dashboard

3. **Update .env file:**
   ```env
   DB_HOST=your-elephant-server.db.elephantsql.com
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=your-database
   ```

4. **Run setup:**
   ```bash
   cd backend
   npm run migrate
   node scripts/seedData.js
   npm run dev
   ```

## Starting the Full Application

### Backend (Terminal 1):
```bash
cd ez_reserve/backend
npm install
npm run dev
```

### Frontend (Terminal 2):
```bash
cd ez_reserve/my-restaurant-app1
npm install
npm run dev
```

## Test the API

Once the backend is running, you can test the endpoints:

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Register a User:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Restaurants:
```bash
curl http://localhost:5000/api/restaurants
```

## Database Schema

The system creates the following tables:
- `users` - User accounts with authentication
- `restaurants` - Restaurant information
- `restaurant_hours` - Operating hours for each restaurant
- `restaurant_tables` - Table capacity and availability
- `reservations` - Booking records
- `reviews` - Customer reviews and ratings
- `menu_categories` - Menu organization
- `menu_items` - Individual menu items

## Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (customer/admin)
- Password reset functionality
- Profile management

### ✅ Restaurant Management
- Restaurant CRUD operations
- Search and filtering
- Location-based search (nearby restaurants)
- Operating hours management
- Table management
- Image support

### ✅ Reservation System
- Real-time availability checking
- Booking creation and management
- Status tracking (pending, confirmed, cancelled, completed, no-show)
- Modification and cancellation
- Conflict prevention

### ✅ Review System
- Customer reviews and ratings
- Average rating calculation
- Review management

### ✅ Database Features
- PostgreSQL with proper relationships
- Foreign key constraints
- Indexes for performance
- Data validation
- Transaction support

### ✅ Security & Performance
- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- SQL injection prevention
- Error handling with proper status codes

### ✅ Frontend Integration
- React context for state management
- API service layer
- Authentication flow
- Reservation management
- Responsive design

## API Documentation

The API follows RESTful conventions and returns JSON responses with this structure:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {...} // Response data
}
```

All protected endpoints require an Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```
