import React, { useState } from "react";
import axios from "axios";
import "./WeMart.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
      email, // backend expects email
      password,
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);
       if (res.data.user.role === 1) {
    window.location.href = "/admin";
  } else {
    window.location.href = "/welcome";
  }
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Incorrect Email or Password");
  }
};


  return (
    <main className="page" aria-label="Login page">
      <section className="card" aria-label="Login form">
        <div className="brand">
          <img src="weMart/Images/logo1.png" alt="WeMart logo" className="logo" />
          <h1 id="signin-title">Sign in to WeMart</h1>
          <p className="subtitle">
            Fresh groceries · Fast delivery · Great prices
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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
            Sign in
          </button>
        </form>

        <p className="signup">
          New to WeMart? <a href="/register">Create an account</a>
        </p>
      </section>
    </main>
  );
};

export default SignIn;
