// src/pages/Home.jsx
import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import "./Home.css";

const restaurants = [
  { id: 1, name: "Spicy Villa", cuisine: "Indian", rating: 4.5 },
  { id: 2, name: "Pasta Palace", cuisine: "Italian", rating: 4.7 },
  { id: 3, name: "Sushi Corner", cuisine: "Japanese", rating: 4.9 },
];

const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <h1>Book Your Table Instantly</h1>
        <p>Avoid the wait. Reserve your table now.</p>
      </div>
      <section className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            cuisine={restaurant.cuisine}
            rating={restaurant.rating}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
