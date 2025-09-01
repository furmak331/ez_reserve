@echo off
echo 🎬 EZ Reserve Demo Script
echo ========================
echo.

echo 1. Testing Backend Health...
curl -s http://localhost:5000/api/health > temp_health.json
if %errorlevel% equ 0 (
    echo ✓ Backend is running
    type temp_health.json
    del temp_health.json
) else (
    echo ✗ Backend is not running
    echo Please start backend with: cd backend ^&^& npm run dev
    pause
    exit /b 1
)

echo.
echo 2. Testing Restaurant Endpoints...
curl -s http://localhost:5000/api/restaurants > temp_restaurants.json
if %errorlevel% equ 0 (
    echo ✓ Restaurants endpoint working
    echo Response saved to temp_restaurants.json
) else (
    echo ✗ Restaurants endpoint failed
)

echo.
echo 3. Testing User Registration...
curl -s -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Demo User\",\"email\":\"demo@example.com\",\"password\":\"password123\",\"phone\":\"1234567890\"}" ^
  > temp_register.json

if %errorlevel% equ 0 (
    echo ✓ Registration request sent
    echo Response saved to temp_register.json
) else (
    echo ✗ Registration failed
)

echo.
echo 4. Testing Login...
curl -s -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"demo@example.com\",\"password\":\"password123\"}" ^
  > temp_login.json

if %errorlevel% equ 0 (
    echo ✓ Login request sent
    echo Response saved to temp_login.json
) else (
    echo ✗ Login failed
)

echo.
echo 5. Frontend Check...
curl -s http://localhost:5173 > nul
if %errorlevel% equ 0 (
    echo ✓ Frontend is accessible
    echo ✓ Visit: http://localhost:5173
) else (
    echo ℹ Frontend not running
    echo Start frontend with: cd my-restaurant-app1 ^&^& npm run dev
)

echo.
echo 🎯 Demo URLs:
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000/api
echo Health Check: http://localhost:5000/api/health
echo.

echo Demo setup complete! 🎉
echo.
echo Demo Flow Suggestions:
echo 1. Show homepage (http://localhost:5173)
echo 2. Register/Login a user
echo 3. Browse restaurants  
echo 4. Make a reservation
echo 5. View reservations in profile
echo 6. Show API endpoints with Postman/curl

echo.
echo Cleaning up temp files...
if exist temp_*.json del temp_*.json

pause
