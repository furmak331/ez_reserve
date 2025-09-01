# 🎬 EZ Reserve - Complete Demo Guide

## 🚀 How to Demonstrate Frontend & Backend Properly

This guide will walk you through setting up and demonstrating your complete restaurant reservation system.

## 📋 Prerequisites

Before starting the demo:

1. **Node.js** installed (v16 or higher)
2. **PostgreSQL** database (choose one option below)
3. **Two terminal windows** (one for backend, one for frontend)

## 🗄️ Database Setup (Choose One Option)

### Option A: ElephantSQL (Free Cloud Database) - **Recommended for Demo**

1. Go to [ElephantSQL](https://www.elephantsql.com/)
2. Create free account
3. Create new instance (Tiny Turtle - Free)
4. Copy connection details
5. Update `backend/.env`:
```env
DB_HOST=your-server.db.elephantsql.com
DB_PORT=5432
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

### Option B: Local PostgreSQL

1. Install PostgreSQL
2. Create database: `CREATE DATABASE ez_reserve;`
3. Update `backend/.env` with your local credentials

### Option C: Docker (if available)

```bash
cd ez_reserve
docker compose up -d postgres
```

## 🎯 Step-by-Step Demo

### Step 1: Start the Backend

```bash
# Terminal 1
cd ez_reserve/backend
npm install
npm run migrate    # Creates database tables
npm run seed      # Adds sample data
npm run dev       # Starts backend server
```

**Expected Output:**
```
🚀 EZ Reserve API Server Running!
📍 Port: 5000
🌍 Environment: development
🕐 Started at: [timestamp]
Database connected successfully
```

### Step 2: Test Backend API

Keep backend running and open **new terminal**:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test restaurants endpoint
curl http://localhost:5000/api/restaurants

# Register a test user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo User",
    "email": "demo@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

### Step 3: Start the Frontend

```bash
# Terminal 2 (new terminal)
cd ez_reserve/my-restaurant-app1
npm install
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xxxx ms
  
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open Browser Demo

1. **Open browser:** `http://localhost:5173`
2. **You should see:** The restaurant homepage with hero section

## 🎭 Demo Flow - What to Show

### 1. **Homepage Tour**
- Show the hero section with restaurant images
- Demonstrate responsive design (resize browser)
- Navigate through different sections

### 2. **User Authentication**
```bash
# Go to: http://localhost:5173/signup
# Register new user:
Name: "John Doe"
Email: "john@demo.com" 
Password: "demo123"
Phone: "555-0123"

# Then login with same credentials
```

### 3. **Restaurant Browsing**
```bash
# Go to: http://localhost:5173/restaurants
# Show:
- List of restaurants from seed data
- Search functionality
- Filter by cuisine
- Click on restaurant for details
```

### 4. **Make a Reservation**
```bash
# Click on any restaurant
# Click "Make Reservation"
# Fill out form:
Date: Tomorrow's date
Time: 7:00 PM
Party Size: 4
Special Requests: "Window seat please"

# Show reservation confirmation
```

### 5. **View Reservations**
```bash
# Go to: Profile/My Reservations
# Show the reservation just created
# Demonstrate:
- Reservation details
- Cancel reservation
- Modify reservation
```

## 🧪 Backend API Demo (via Postman/curl)

### Authentication Flow
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"API User","email":"api@test.com","password":"test123"}'

# 2. Login (save the token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"test123"}'

# Copy the token from response
TOKEN="your-jwt-token-here"
```

### Restaurant Operations
```bash
# Get all restaurants
curl http://localhost:5000/api/restaurants

# Get specific restaurant
curl http://localhost:5000/api/restaurants/1

# Check availability
curl "http://localhost:5000/api/restaurants/1/availability?date=2025-09-01&time=19:00&partySize=4"
```

### Reservation Operations
```bash
# Create reservation (use your token)
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "restaurant_id": 1,
    "reservation_date": "2025-09-01",
    "reservation_time": "19:00",
    "party_size": 4,
    "special_requests": "Birthday celebration"
  }'

# Get my reservations
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/reservations/my-reservations
```

## 🎨 Frontend Features to Highlight

### 1. **Modern React Architecture**
- Show developer tools (React components)
- Demonstrate state management
- Show API integration

### 2. **Responsive Design**
- Desktop view
- Tablet view (resize browser)
- Mobile view (dev tools device toolbar)

### 3. **User Experience**
- Loading states
- Error handling
- Form validation
- Success notifications

### 4. **Real-time Features**
- Availability checking
- Reservation conflicts
- Status updates

## 🔧 Database Demo (Optional)

If you want to show the database:

### Using Adminer (if Docker is available)
```bash
# Start Adminer
docker compose up -d adminer
# Go to: http://localhost:8080
# Login with your database credentials
```

### Using pgAdmin or any PostgreSQL client
- Connect to your database
- Show the tables and relationships
- Demonstrate data integrity

## 🐛 Troubleshooting Demo Issues

### Backend Won't Start
```bash
# Check if PostgreSQL is running
npm run test-connection

# Check logs
tail -f logs/error.log
```

### Frontend API Errors
- Check if backend is running on port 5000
- Verify CORS settings
- Check browser network tab for errors

### Database Connection Issues
- Verify `.env` file configuration
- Test connection: `npm run test-connection`
- Check PostgreSQL service status

## 📊 What Your Demo Shows

### Technical Excellence
✅ **Full-stack JavaScript** (Node.js + React)
✅ **PostgreSQL** with proper relationships
✅ **JWT Authentication** with security
✅ **RESTful API** design
✅ **Real-time availability** checking
✅ **Responsive design**
✅ **Error handling** and validation
✅ **Modern development practices**

### Business Features
✅ **User registration/login**
✅ **Restaurant browsing**
✅ **Table reservation system**
✅ **Booking management**
✅ **Conflict prevention**
✅ **Status tracking**
✅ **Review system**

## 🎬 Demo Script

### Opening (2 minutes)
"Today I'll demonstrate EZ Reserve, a complete restaurant reservation system built with Node.js, PostgreSQL, and React. This system handles user authentication, real-time table availability, and booking management."

### Backend Demo (5 minutes)
1. Show server startup and database connection
2. Demonstrate API endpoints with curl/Postman
3. Show authentication flow and JWT tokens
4. Demonstrate reservation creation and conflict handling

### Frontend Demo (8 minutes)
1. Tour the responsive homepage
2. User registration and login process
3. Restaurant browsing and search
4. Complete reservation flow
5. Profile and reservation management

### Technical Highlights (5 minutes)
1. Show database schema and relationships
2. Demonstrate real-time availability checking
3. Show error handling and validation
4. Highlight security features

## 🚀 Quick Start Commands

```bash
# Terminal 1 - Backend
cd ez_reserve/backend && npm install && npm run migrate && npm run seed && npm run dev

# Terminal 2 - Frontend  
cd ez_reserve/my-restaurant-app1 && npm install && npm run dev

# Browser
open http://localhost:5173
```

## 📝 Demo Checklist

Before your demo:
- [ ] Database is set up and accessible
- [ ] Backend starts without errors
- [ ] Frontend builds and runs successfully
- [ ] Sample data is loaded
- [ ] Browser opens to correct URL
- [ ] API endpoints respond correctly
- [ ] Authentication flow works
- [ ] Reservation system functions properly

Your complete restaurant reservation system is now ready for demonstration! 🎉
