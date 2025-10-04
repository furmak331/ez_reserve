# 🍽️ Ez Reserve

A restaurant reservation system that lets you browse restaurants, check availability, and book tables seamlessly.

## 🛠️ Tech Stack

**Frontend:** React + Vite, Material UI, Framer Motion  
**Backend:** Node.js + Express  
**Database:** PostgreSQL  

## ✨ Features

- Browse restaurants with detailed information
- Real-time table availability checking
- User authentication and reservation management
- Responsive design with smooth animations

---

### 🧭 How to Run the App Locally

1. Clone the Repository

   ```bash
   git clone https://github.com/your-username/restaurant-reservation-app.git

    Navigate to the projects directory:

    bash

cd restaurant-reservation-app

Install all dependencies:

bash

npm install

Run the development server:

bash

    npm run dev

    Open your browser at http://localhost:3000 and start booking tables! 🎉

---

## � Setup Instructions

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd my-restaurant-app1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your database credentials
   - **Never commit your real `.env` file!** (It's gitignored for safety)

4. **Set up PostgreSQL**
   - Make sure PostgreSQL is running locally
   - Create a database named `ez_reserve`
   - Run the migration scripts:
     ```bash
     psql -U postgres -d ez_reserve -f migrations/001_create_tables.sql
     psql -U postgres -d ez_reserve -f migrations/002_seed_restaurants.sql
     ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

## 🔒 Security
- `.env` files are gitignored to protect sensitive information
- Never share database passwords or JWT secrets

## 📄 License
This project is licensed under the MIT License.

📸 Screenshots
Home Page - Browse Restaurants

Restaurant Details and Booking Page

🎨 Design Principles

    Minimalist yet Elegant: Clean and easy-to-navigate interface.
    User-first Approach: Simple and efficient booking process.
    Responsive Design: Optimized for mobile, tablet, and desktop devices.

🤝 Contributions

Feel free to fork this repository and create new feature . Feel free to report bugs. Contributions are always welcomed!
📄 License

This project is licensed under the MIT License.

🚀 Enjoy reserving tables without the hassle of waiting!

