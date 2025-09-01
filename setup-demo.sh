#!/bin/bash

echo "🚀 EZ Reserve - Complete Demo Setup"
echo "===================================="
echo

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Setting up your restaurant reservation system demo...${NC}"
echo

# Check Node.js
echo -e "${BLUE}1. Checking Node.js...${NC}"
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check npm
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi

echo

# Backend setup
echo -e "${BLUE}2. Setting up Backend...${NC}"
cd backend

if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ Backend package.json not found${NC}"
    exit 1
fi

echo "   Installing backend dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}   ✗ Backend installation failed${NC}"
    exit 1
fi

# Check .env file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}   ⚠ .env file not found, creating from template...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}   Please update .env with your database credentials${NC}"
fi

cd ..

# Frontend setup
echo -e "${BLUE}3. Setting up Frontend...${NC}"
cd my-restaurant-app1

if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ Frontend package.json not found${NC}"
    exit 1
fi

echo "   Installing frontend dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}   ✗ Frontend installation failed${NC}"
    exit 1
fi

cd ..

echo

# Database setup instructions
echo -e "${BLUE}4. Database Setup Options:${NC}"
echo -e "${YELLOW}   Choose one of the following:${NC}"
echo
echo -e "${BLUE}   Option A - ElephantSQL (Free Cloud Database):${NC}"
echo "   1. Go to https://www.elephantsql.com/"
echo "   2. Create free account"
echo "   3. Create new instance (Tiny Turtle - Free)"
echo "   4. Update backend/.env with connection details"
echo
echo -e "${BLUE}   Option B - Local PostgreSQL:${NC}"
echo "   1. Install PostgreSQL locally"
echo "   2. Create database: CREATE DATABASE ez_reserve;"
echo "   3. Update backend/.env with local credentials"
echo
echo -e "${BLUE}   Option C - Docker (if available):${NC}"
echo "   1. Run: docker compose up -d postgres"
echo "   2. Database will be ready on port 5432"

echo

# Final instructions
echo -e "${GREEN}5. Ready to Demo!${NC}"
echo -e "${BLUE}   Start Backend (Terminal 1):${NC}"
echo "   cd ez_reserve/backend"
echo "   npm run migrate  # After database setup"
echo "   npm run seed     # After database setup"
echo "   npm run dev"
echo
echo -e "${BLUE}   Start Frontend (Terminal 2):${NC}"
echo "   cd ez_reserve/my-restaurant-app1"  
echo "   npm run dev"
echo
echo -e "${BLUE}   Test Demo:${NC}"
echo "   ./demo-test.sh"
echo

echo -e "${GREEN}Demo URLs:${NC}"
echo "Frontend: ${BLUE}http://localhost:5173${NC}"
echo "Backend:  ${BLUE}http://localhost:5000${NC}"
echo "Health:   ${BLUE}http://localhost:5000/api/health${NC}"

echo
echo -e "${GREEN}🎯 Your EZ Reserve demo is ready!${NC}"
echo
echo -e "${YELLOW}Demo Flow:${NC}"
echo "1. Show homepage with hero section"
echo "2. Register/Login user"  
echo "3. Browse restaurants"
echo "4. Make a reservation"
echo "5. View profile/reservations"
echo "6. Show API with Postman/curl"
echo
echo -e "${BLUE}For detailed demo guide, see: DEMO_GUIDE.md${NC}"
echo -e "${BLUE}For quick demo setup, see: QUICK_DEMO.md${NC}"
