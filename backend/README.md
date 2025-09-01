# EZ Reserve - Restaurant Reservation System

## Database Setup Instructions

### Option 1: Install PostgreSQL locally

1. **Install PostgreSQL:**
   - Download and install PostgreSQL from https://www.postgresql.org/download/
   - During installation, set a password for the 'postgres' user
   - Note the port (default: 5432)

2. **Create Database:**
   ```sql
   -- Connect to PostgreSQL as postgres user
   psql -U postgres
   
   -- Create database
   CREATE DATABASE ez_reserve;
   
   -- Create user (optional)
   CREATE USER ez_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE ez_reserve TO ez_user;
   ```

3. **Update .env file:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   DB_NAME=ez_reserve
   ```

### Option 2: Use Docker (Recommended for Development)

1. **Create docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:15
       container_name: ez_reserve_db
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: password
         POSTGRES_DB: ez_reserve
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

2. **Run with Docker:**
   ```bash
   docker-compose up -d
   ```

### Option 3: Use Online PostgreSQL Service

1. **ElephantSQL (Free tier):**
   - Sign up at https://www.elephantsql.com/
   - Create a new instance
   - Copy the connection URL

2. **Railway (Free tier):**
   - Sign up at https://railway.app/
   - Create PostgreSQL service
   - Copy connection details

3. **Update .env with remote connection:**
   ```env
   DB_HOST=your-remote-host
   DB_PORT=5432
   DB_USER=your-remote-user
   DB_PASSWORD=your-remote-password
   DB_NAME=your-remote-db
   ```

## Running the Application

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Run database migrations:**
   ```bash
   npm run migrate
   ```

4. **Seed sample data (optional):**
   ```bash
   node scripts/seedData.js
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

6. **Start the frontend:**
   ```bash
   cd ../my-restaurant-app1
   npm install
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/search/nearby` - Search nearby restaurants
- `GET /api/restaurants/:id/availability` - Check availability
- `GET /api/restaurants/:id/reviews` - Get restaurant reviews

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my-reservations` - Get user's reservations
- `GET /api/reservations/:id` - Get reservation by ID
- `PUT /api/reservations/:id` - Update reservation
- `PUT /api/reservations/:id/cancel` - Cancel reservation

## Features

✅ **Complete Authentication System**
- JWT-based authentication
- Password hashing with bcrypt
- Password reset functionality
- Role-based access control

✅ **Restaurant Management**
- Restaurant listing with filtering
- Detailed restaurant information
- Operating hours management
- Table management
- Location-based search

✅ **Reservation System**
- Real-time availability checking
- Booking confirmation
- Reservation modifications
- Cancellation handling
- Status management (pending, confirmed, cancelled, completed, no-show)

✅ **Review System**
- User reviews and ratings
- Average rating calculation
- Review management

✅ **Database Features**
- PostgreSQL with proper relationships
- Indexes for performance
- Data validation
- ACID compliance

✅ **Security Features**
- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention

✅ **Error Handling**
- Comprehensive error handling
- Proper HTTP status codes
- Detailed error messages
- Logging
