
import React from "react";
import "./RestaurantCard.css";

const RestaurantCard = ({ name, cuisine, rating }) => {
  return (
    <div className="restaurant-card">
      <h3>{name}</h3>
      <p>{cuisine} Cuisine</p>
      <p>Rating: {rating} ⭐</p>
      <button className="reserve-button">Reserve Now</button>
    </div>
  );
};

export default RestaurantCard;
