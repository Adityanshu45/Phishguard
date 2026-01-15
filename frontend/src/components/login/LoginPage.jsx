import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./Login.css";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    location.state?.backgroundLocation?.pathname || location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://phishguard-server-ffti.onrender.com/login",
        {
          ...form,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate((window.location.href = from));
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid email or password";
      handleError(msg);
    }
    setForm({
      ...form,
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="signup-overlay">
      <div className="signup-card">
        <button className="close-btn" onClick={handleClose} aria-label="Close">
          ✕
        </button>
        <h2>Welcome Back</h2>
        <p>Sign in to your account to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign In
          </button>

          <p className="signin-text">
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              }}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
