import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  //  Check login status when Navbar loads
  useEffect(() => {
    axios
      .get("https://phishguard-server-ffti.onrender.com/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUser(res.data.user); // ✅ IMPORTANT
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🚪 Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://phishguard-server-ffti.onrender.com/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  // Avoid flicker while checking login
  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src="media/images/brand-logo.svg" alt="PhishGuard Logo" />
            <h1>PhishGuard</h1>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active me-5" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active me-5" to="/working">
                How It Works
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active me-5" to="/features">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active me-5" to="/about">
                About
              </Link>
            </li>

            {/* --- UPDATED LINKS BELOW --- */}

            {/*  AUTH BUTTONS */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link me-5"
                    to="/login"
                    state={{ backgroundLocation: location }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link register-btn"
                    to="/signup"
                    state={{ backgroundLocation: location }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item profile-menu">
                <button
                  className="profile-btn"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <div className="avatar-circle">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="username">{user?.username}</span>
                </button>

                {showMenu && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <strong>{user.username}</strong>
                      <span>{user.email}</span>
                    </div>

                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setShowMenu(false)}
                    >
                      <i class="fa-solid fa-user"></i> Profile
                    </Link>

                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
