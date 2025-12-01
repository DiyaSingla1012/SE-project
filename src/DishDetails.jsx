import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dishes from "./data/dish";
import "./DishDetails.css";

export default function DishDetails() {
  const { dishName } = useParams();
  const navigate = useNavigate();

  const dish = dishes.find((d) => d.name === dishName);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/product")
      .then((res) => {
        if (res.data.success) {
          setAllProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // CART STATE
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || {};
  });

  const cartCount = Object.values(cart).reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const updateCart = (id, product, qty) => {
    id = id.toString();
    let newCart = { ...cart };

    if (qty === 0) {
      delete newCart[id];
    } else {
      newCart[id] = {
        id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty,
      };
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getProductByName = (name) => {
    return allProducts.find(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
  };

  if (!dish) return <h2>Dish Not Found!</h2>;

  return (
    <div className="details-page">

      {/* 🔥 CART BUTTON ONLY (TOP RIGHT) */}
      <div className="details-cart-header">
        <div
          className="cart-wrapper"
          onClick={() => navigate("/cart")}
        >
          <button className="btn cart">🛒 Cart</button>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="details-container">

        <button className="back-btn" onClick={() => navigate("/aiDish")}>
          ⬅ Back
        </button>

        <h1>{dish.name}</h1>

        <img
          src={dish.image}
          alt={dish.name}
          className="details-img"
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />

        <h3>Recipe</h3>
        <p className="recipe-text">{dish.recipe}</p>

        <h3>Ingredients</h3>

        <ul className="ingredient-list">
          {dish.ingredients.map((ingredient, index) => {
            const product = getProductByName(ingredient);

            return (
              <li key={index}>
                <span>{ingredient}</span>

                {product ? (
                  cart[product._id] ? (
                    <div className="qty-box">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateCart(
                            product._id,
                            product,
                            cart[product._id].qty - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span className="qty">{cart[product._id].qty}</span>

                      <button
                        className="qty-btn"
                        disabled={cart[product._id].qty >= product.stock}
                        onClick={() =>
                          updateCart(
                            product._id,
                            product,
                            cart[product._id].qty + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="cart-btn"
                      disabled={product.stock === 0}
                      onClick={() => updateCart(product._id, product, 1)}
                    >
                      Add to Cart
                    </button>
                  )
                ) : (
                  <button className="cart-btn disabled">Not Available</button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
