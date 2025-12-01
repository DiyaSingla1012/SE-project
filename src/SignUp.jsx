import React, { useState } from "react";
import axios from "axios";
import "./WeMart.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // call backend register API
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert("Account created successfully! Please login now.");
        window.location.href = "/login"; // redirect to sign-in page
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error or network issue");
    }
  };

  return (
    <main className="page" aria-label="Signup page">
      <section className="card" aria-label="Signup form">
        <div className="brand">
          <img src="weMart/Images/logo1.png" alt="WeMart logo" className="logo" />
          <h1 id="signup-title">Create your WeMart account</h1>
          <p className="subtitle">
            Fresh groceries · Fast delivery · Great prices
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="label">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="pwd-toggle"
              onClick={togglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="btn primary" type="submit">
            Sign Up
          </button>
        </form>

        <p className="signup">
          Already have an account? <a href="/login">Sign in here</a>
        </p>
      </section>
    </main>
  );
};

export default SignUp;
