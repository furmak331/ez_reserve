// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Foodie Reservations</h1>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Restaurants</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
