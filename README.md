# 🍽️ Ez Reserve


![Demo GIF](./my-restaurant-app/src/assets/giphy.gif)

Welcome to the **Ez reserve**! This web app lets you browse through multiple restaurants, check their availability, and book a table—making sure you never have to wait in line for a table again! 🚀

---

### ✨ Features

- **Modern UI/UX** with smooth animations and a responsive layout.
- **Real-time table availability** to ensure you can reserve a spot.
- **Dynamic Routing** for a seamless experience.
- Built using **React**, **Material UI**, and **Framer Motion** for a stunning, interactive user interface.
- Powered by **Vite** for super-fast development and build times.

---

### 🌟 Preview

![Restaurant List Preview](./assets/restaurant-preview.gif)



---

### 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-17.0.2-blue)
![Vite](https://img.shields.io/badge/Vite-2.0-green)
![Material UI](https://img.shields.io/badge/Material%20UI-5.0-purple)
![Framer Motion](https://img.shields.io/badge/FramerMotion-5.0-red)

- **React**: Frontend framework for creating interactive UIs.
- **Vite**: Lightning-fast development environment.
- **Material UI**: Modern React UI components for fast and easy design.
- **Framer Motion**: Stunning animations for delightful user interactions.

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

### 🛠️ Backend Setup (Node.js + PostgreSQL)

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```
2. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your local database credentials and secrets.
   - **Never commit your real `.env` file!** (It's gitignored for safety.)
3. **Set up PostgreSQL**
   - Make sure PostgreSQL is running locally.
   - Create a database named `ez_reserve`.
   - Run the SQL scripts in `backend/migrations/` to create tables and seed data.
4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000` by default.

---

### ⚠️ Security Note
- `.env` and any file with secrets are excluded from git by default (see `.gitignore`).
- **Never share your real `.env` or database passwords.**

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

