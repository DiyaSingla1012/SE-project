import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dishes from "./data/dish";
import "./AiDish.css";

export default function AiDishSuggestor() {
  const [selectedDish, setSelectedDish] = useState(null);
  const navigate = useNavigate();

  const handleSuggest = () => {
    if (selectedDish) {
      navigate(`/dish/${selectedDish.name}`);
    }
  };

  return (
    <div className="ai-container">
      <h2>Smart Dish Suggestor</h2>

      <div className="dish-grid">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className={`dish-card ${
              selectedDish?.name === dish.name ? "active" : ""
            }`}
            onClick={() => setSelectedDish(dish)}
          >
            <img src={dish.image} alt={dish.name} />

            <p>{dish.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleSuggest}
        disabled={!selectedDish}
        className="suggest-btn"
      >
        View Dish Details
      </button>
    </div>
  );
}
