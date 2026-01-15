import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Signup.css";

function SignupPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    location.state?.backgroundLocation?.pathname || location.state?.from || "/";

  const handleClose = () => {
    navigate(from, { replace: true });
  };

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      handleError("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://phishguard-server-ffti.onrender.com/signup",
        {
          username: form.username,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      handleSuccess(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      handleError(error.response?.data?.message || "Signup failed");
    }

    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="signup-overlay">
      <div className="signup-card">
        <button className="close-btn" onClick={handleClose} aria-label="Close">
          ✕
        </button>
        <h2>Create Account</h2>
        <p>Join us to stay protected from phishing threats</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="john45"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>

          <p className="signin-text">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              }}
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
