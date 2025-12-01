import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(savedCart);
  }, []);

  const updateLocal = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increment = (key) => {
    const updated = {
      ...cart,
      [key]: { ...cart[key], qty: cart[key].qty + 1 },
    };
    updateLocal(updated);
  };

  const decrement = (key) => {
    if (cart[key].qty === 1) {
      removeItem(key);
      return;
    }

    const updated = {
      ...cart,
      [key]: { ...cart[key], qty: cart[key].qty - 1 },
    };
    updateLocal(updated);
  };

  const removeItem = (key) => {
    const updated = { ...cart };
    delete updated[key];
    updateLocal(updated);
  };

  const totalAmount = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/home")}>Go back to Products</button>
        </div>
      ) : (
        <div className="cart-container">
          {/* LEFT SIDE: ITEMS */}
          <div className="cart-items">
            {Object.entries(cart).map(([key, item]) => (
              <div className="cart-card" key={key}>
                <img
                  src={`http://localhost:8080/${item.image}`}
                  alt={item.name}
                  onError={(e) => (e.target.src = "/images/default.jpg")}
                />

                <div className="details">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => decrement(key)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(key)}>+</button>
                  </div>

                  <button className="remove-btn" onClick={() => removeItem(key)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE BILL */}
          <div className="bill-box">
            <h2>Bill Summary</h2>

            <div className="line">
              <span>Total Items:</span>
              <span>{Object.values(cart).length}</span>
            </div>

            <div className="line">
              <span>Total Amount:</span>
              <span>₹ {totalAmount}</span>
            </div>

            <button 
  className="checkout-btn"
  onClick={() => navigate("/payment")}
>
  Checkout
</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
