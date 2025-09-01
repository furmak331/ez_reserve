@echo off
echo 🚀 EZ Reserve - Complete Demo Setup
echo ====================================
echo.

echo Setting up your restaurant reservation system demo...
echo.

echo 1. Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✓ Node.js installed: %NODE_VERSION%
) else (
    echo ✗ Node.js not found. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✓ npm installed: %NPM_VERSION%
) else (
    echo ✗ npm not found
    pause
    exit /b 1
)

echo.
echo 2. Setting up Backend...
cd backend

if not exist "package.json" (
    echo ✗ Backend package.json not found
    pause
    exit /b 1
)

echo    Installing backend dependencies...
npm install --silent
if %errorlevel% equ 0 (
    echo    ✓ Backend dependencies installed
) else (
    echo    ✗ Backend installation failed
    pause
    exit /b 1
)

if not exist ".env" (
    echo    ⚠ .env file not found, creating from template...
    copy .env.example .env >nul
    echo    Please update .env with your database credentials
)

cd ..

echo.
echo 3. Setting up Frontend...
cd my-restaurant-app1

if not exist "package.json" (
    echo ✗ Frontend package.json not found
    pause
    exit /b 1
)

echo    Installing frontend dependencies...
npm install --silent
if %errorlevel% equ 0 (
    echo    ✓ Frontend dependencies installed
) else (
    echo    ✗ Frontend installation failed
    pause
    exit /b 1
)

cd ..

echo.
echo 4. Database Setup Options:
echo    Choose one of the following:
echo.
echo    Option A - ElephantSQL (Free Cloud Database):
echo    1. Go to https://www.elephantsql.com/
echo    2. Create free account
echo    3. Create new instance (Tiny Turtle - Free)
echo    4. Update backend/.env with connection details
echo.
echo    Option B - Local PostgreSQL:
echo    1. Install PostgreSQL locally
echo    2. Create database: CREATE DATABASE ez_reserve;
echo    3. Update backend/.env with local credentials
echo.
echo    Option C - Docker (if available):
echo    1. Run: docker compose up -d postgres
echo    2. Database will be ready on port 5432

echo.
echo 5. Ready to Demo!
echo    Start Backend (Terminal 1):
echo    cd ez_reserve/backend
echo    npm run migrate  # After database setup
echo    npm run seed     # After database setup  
echo    npm run dev
echo.
echo    Start Frontend (Terminal 2):
echo    cd ez_reserve/my-restaurant-app1
echo    npm run dev
echo.
echo    Test Demo:
echo    demo-test.bat

echo.
echo Demo URLs:
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo Health:   http://localhost:5000/api/health

echo.
echo 🎯 Your EZ Reserve demo is ready!
echo.
echo Demo Flow:
echo 1. Show homepage with hero section
echo 2. Register/Login user
echo 3. Browse restaurants
echo 4. Make a reservation
echo 5. View profile/reservations
echo 6. Show API with Postman/curl
echo.
echo For detailed demo guide, see: DEMO_GUIDE.md
echo For quick demo setup, see: QUICK_DEMO.md

pause
