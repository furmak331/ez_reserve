#!/bin/bash

echo "Starting EZ Reserve Backend Setup..."
echo

echo "1. Starting PostgreSQL with Docker..."
docker-compose up -d postgres

echo
echo "2. Waiting for PostgreSQL to be ready..."
sleep 10

echo
echo "3. Testing database connection..."
cd backend
node scripts/testConnection.js

echo
echo "4. Running database migrations..."
node scripts/migrate.js

echo
echo "5. Seeding sample data..."
node scripts/seedData.js

echo
echo "6. Starting backend server..."
npm run dev
