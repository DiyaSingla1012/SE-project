import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // ✅ Add this line for custom CSS

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product");
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (image) formData.append("image", image);

      if (editingProduct) {
        await axios.put(
          `http://localhost:8080/api/v1/product/${editingProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("✅ Product updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8080/api/v1/product/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("✅ Product added successfully!");
      }

      setForm({ name: "", description: "", price: "", category: "", stock: "" });
      setImage(null);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("❌ Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Error deleting product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", category: "", stock: "" });
    setImage(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1 className="admin-title">🛍️ Admin Dashboard</h1>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <select
  value={form.category}
  onChange={(e) => setForm({ ...form, category: e.target.value })}
  required
>
  <option value="">Select Category</option>
  <option value="Dairy">Dairy</option>
  <option value="Fresh">Fresh</option>
  <option value="Frozen">Frozen</option>
  <option value="Bakery">Bakery</option>
  <option value="Snacks">Snacks</option>
  <option value="Beverages">Beverages</option>
  <option value="Household">Household</option>
</select>

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="button-group">
            <button type="submit" className="btn primary">
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                className="btn secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product Table */}
      <div className="table-card">
        <h2>📦 Products List</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">No products available</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.image ? (
                      <img
                        src={`http://localhost:8080/${p.image}`}
                        alt={p.name}
                        width="70"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="btn small edit"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn small delete"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
