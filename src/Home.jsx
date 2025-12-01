import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/product");

      if (res.data.success) {
        setAllProducts(res.data.products);
        setFilteredProducts(res.data.products);

        const uniq = [...new Set(res.data.products.map((p) => p.category))];
        setCategories(uniq);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const filterByCategory = (cat) => {
    setSelectedCat(cat);

    if (cat === "All") {
      applySearch(allProducts, searchQuery);
    } else {
      applySearch(
        allProducts.filter(
          (p) => p.category && p.category.toLowerCase() === cat.toLowerCase()
        ),
        searchQuery
      );
    }
  };

  const applySearch = (products, query) => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((p) => {
      if (!p.name) return false;

      const name = p.name.toLowerCase();

      if (name.charAt(0) !== q.charAt(0)) return false;

      return name.includes(q);
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    let productsToFilter =
      selectedCat === "All"
        ? allProducts
        : allProducts.filter(
            (p) =>
              p.category &&
              p.category.toLowerCase() === selectedCat.toLowerCase()
          );

    applySearch(productsToFilter, value);
  };

  // ---------------- CART ----------------
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || {};
  });

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

  const cartCount = Object.values(cart).reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="home-page">

      {/* ------------ HEADER (FIXED) ---------- */}
      <header className="header">
        <div className="logo">WeMart</div>

        <div className="search-wrapper">
          
          <input
            type="text"
            className="search-bar"
            placeholder="Search for fresh groceries..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="header-btns">
          <button 
  className="btn smart" 
  onClick={() => navigate("/aiDish")}
>
  💡 Smart Dish
</button>


          <div className="cart-wrapper" onClick={() => navigate("/cart")}>
            <button className="btn cart">🛒 Cart</button>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          <button
            className="btn logout"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                navigate("/login");
              }
            }}
          >
            🔓 Logout
          </button>
        </div>
      </header>

      {/* ------------ CATEGORY BAR (FIXED) ---------- */}
      <div className="department-bar">
        <h1>Departments</h1>

        <div className="categories">
          <button
            className={`cat-btn ${selectedCat === "All" ? "active" : ""}`}
            onClick={() => filterByCategory("All")}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCat === cat ? "active" : ""}`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ------------ PRODUCTS AREA (SCROLLABLE) ---------- */}
      <div className="products-area">
        <h1>
          {selectedCat === "All" ? "All Products" : `${selectedCat} Products`}
        </h1>

        <div className="grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={`http://localhost:8080/${p.image}`}
                  alt={p.name}
                  onError={(e) => (e.target.src = "/images/default.jpg")}
                />
                <h1>{p.name}</h1>
                <p className="price">₹ {p.price}</p>

                {cart[p._id] ? (
                  <div className="qty-box">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateCart(p._id, p, cart[p._id].qty - 1)
                      }
                    >
                      -
                    </button>

                    <span className="qty">{cart[p._id].qty}</span>

                    <button
                      className="qty-btn"
                      disabled={cart[p._id].qty >= p.stock}
                      onClick={() =>
                        updateCart(p._id, p, cart[p._id].qty + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="AddCart">
                  <button
                    className="add-btn"
                    disabled={p.stock === 0}
                    onClick={() => updateCart(p._id, p, 1)}
                  >
                    <h3>Add to Cart</h3>
                  </button></div>
                )}


                {p.stock === 0 && (
                  <p className="out-of-stock">Stock Out</p>
                )}
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
