import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/product/category/${category}`);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <main className="page">
      <h1>{category} Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={`http://localhost:8080/${p.image}`} alt={p.name} />
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
