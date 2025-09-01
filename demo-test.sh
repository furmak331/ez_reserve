#!/bin/bash

echo "🎬 EZ Reserve Demo Script"
echo "========================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo -e "${BLUE}1. Testing Backend Health...${NC}"
HEALTH_CHECK=$(curl -s http://localhost:5000/api/health)
if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✓ Backend is running${NC}"
    echo "$HEALTH_CHECK" | jq .
else
    echo -e "${RED}✗ Backend is not running${NC}"
    echo "Please start backend with: cd backend && npm run dev"
    exit 1
fi

echo
echo -e "${BLUE}2. Testing Restaurant Endpoints...${NC}"
RESTAURANTS=$(curl -s http://localhost:5000/api/restaurants)
if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✓ Restaurants endpoint working${NC}"
    echo "$RESTAURANTS" | jq '.count'
else
    echo -e "${RED}✗ Restaurants endpoint failed${NC}"
fi

echo
echo -e "${BLUE}3. Testing User Registration...${NC}"
REGISTER_DATA='{
  "name": "Demo User",
  "email": "demo@example.com", 
  "password": "password123",
  "phone": "1234567890"
}'

REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "$REGISTER_DATA")

if [[ $? -eq 0 ]]; then
    SUCCESS=$(echo "$REGISTER_RESPONSE" | jq -r '.success')
    if [[ "$SUCCESS" == "true" ]]; then
        echo -e "${GREEN}✓ User registration successful${NC}"
        TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.token')
        echo "Token received: ${TOKEN:0:20}..."
    else
        echo -e "${YELLOW}ℹ User might already exist${NC}"
        # Try login instead
        echo -e "${BLUE}   Trying login...${NC}"
        LOGIN_DATA='{"email": "demo@example.com", "password": "password123"}'
        LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
          -H "Content-Type: application/json" \
          -d "$LOGIN_DATA")
        TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token')
        if [[ "$TOKEN" != "null" ]]; then
            echo -e "${GREEN}✓ Login successful${NC}"
        fi
    fi
else
    echo -e "${RED}✗ Registration failed${NC}"
fi

echo
echo -e "${BLUE}4. Testing Authenticated Endpoints...${NC}"
if [[ -n "$TOKEN" && "$TOKEN" != "null" ]]; then
    USER_INFO=$(curl -s -H "Authorization: Bearer $TOKEN" \
      http://localhost:5000/api/auth/me)
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✓ Authentication working${NC}"
        echo "$USER_INFO" | jq '.data.user.name'
    else
        echo -e "${RED}✗ Authentication failed${NC}"
    fi
else
    echo -e "${YELLOW}ℹ Skipping authenticated tests (no token)${NC}"
fi

echo
echo -e "${BLUE}5. Testing Reservation Creation...${NC}"
if [[ -n "$TOKEN" && "$TOKEN" != "null" ]]; then
    # Get tomorrow's date
    TOMORROW=$(date -d "tomorrow" +%Y-%m-%d 2>/dev/null || date -v+1d +%Y-%m-%d 2>/dev/null || echo "2025-09-01")
    
    RESERVATION_DATA="{
      \"restaurant_id\": 1,
      \"reservation_date\": \"$TOMORROW\",
      \"reservation_time\": \"19:00\",
      \"party_size\": 4,
      \"special_requests\": \"Demo reservation\"
    }"
    
    RESERVATION_RESPONSE=$(curl -s -X POST http://localhost:5000/api/reservations \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d "$RESERVATION_DATA")
    
    if [[ $? -eq 0 ]]; then
        SUCCESS=$(echo "$RESERVATION_RESPONSE" | jq -r '.success')
        if [[ "$SUCCESS" == "true" ]]; then
            echo -e "${GREEN}✓ Reservation created successfully${NC}"
            RESERVATION_ID=$(echo "$RESERVATION_RESPONSE" | jq -r '.data.id')
            echo "Reservation ID: $RESERVATION_ID"
        else
            echo -e "${YELLOW}ℹ Reservation creation issue:${NC}"
            echo "$RESERVATION_RESPONSE" | jq '.message'
        fi
    else
        echo -e "${RED}✗ Reservation creation failed${NC}"
    fi
else
    echo -e "${YELLOW}ℹ Skipping reservation test (no token)${NC}"
fi

echo
echo -e "${BLUE}6. Frontend Check...${NC}"
FRONTEND_CHECK=$(curl -s http://localhost:5173)
if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✓ Frontend is accessible${NC}"
    echo "✓ Visit: http://localhost:5173"
else
    echo -e "${YELLOW}ℹ Frontend not running${NC}"
    echo "Start frontend with: cd my-restaurant-app1 && npm run dev"
fi

echo
echo -e "${BLUE}🎯 Demo URLs:${NC}"
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5000/api"
echo "Health Check: http://localhost:5000/api/health"
echo

echo -e "${GREEN}Demo setup complete! 🎉${NC}"
echo
echo -e "${YELLOW}Demo Flow Suggestions:${NC}"
echo "1. Show homepage (http://localhost:5173)"
echo "2. Register/Login a user"
echo "3. Browse restaurants"
echo "4. Make a reservation"
echo "5. View reservations in profile"
echo "6. Show API endpoints with Postman/curl"
