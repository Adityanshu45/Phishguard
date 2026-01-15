import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true; //This tells the browser:“Always send cookies with requests”
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  Get logged-in user
        const userRes = await axios.get(
          "https://phishguard-server-ffti.onrender.com/me",
          {
            withCredentials: true,
          }
        );
        setUser(userRes.data.user);

        //  Get scan history
        const scanRes = await axios.get(
          "https://phishguard-server-ffti.onrender.com/scan/history",
          {
            withCredentials: true,
          }
        );
        setScans(scanRes.data);

        setLoading(false);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;

  // 📊 Activity stats
  const totalScans = scans.length;
  const safeSites = scans.filter((s) => s.result === "0").length;
  const threats = scans.filter((s) => s.result === "1").length;

  return (
    <div className="profile-wrapper">
      {/* TOP BANNER */}
      <div className="profile-banner">
        <h1>My Profile</h1>
        <p>Manage your account and view your security scan history</p>
      </div>

      {/* MAIN GRID */}
      <div className="profile-grid">
        {/* LEFT COLUMN */}
        <div className="profile-left">
          {/* PROFILE CARD */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            <h3>{user.username}</h3>
            <p className="email">{user.email}</p>

            <div className="profile-info">
              <p>
                <strong>Email</strong>
                <br />
                {user.email}
              </p>
              <p>
                <strong>Member Since</strong>
                <br />
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <strong>Account Status</strong>
                <br />
                <span className="active">Active</span>
              </p>
            </div>
          </div>

          {/* ACTIVITY STATS */}
          <div className="activity-card">
            <h4>Activity Stats</h4>

            <div className="stat blue">
              <span>Total Scans</span>
              <strong>{totalScans}</strong>
            </div>

            <div className="stat green">
              <span>Safe Sites</span>
              <strong>{safeSites}</strong>
            </div>

            <div className="stat red">
              <span>Threats Detected</span>
              <strong>{threats}</strong>
            </div>

            <div className="badge">🏅 Security Champion</div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="scan-card">
          <h3>Recent Scan History</h3>

          {scans.length === 0 ? (
            <div className="empty-state">
              <div className="shield">🛡️</div>
              <p className="title">No scans yet</p>
              <p className="sub">
                Start scanning URLs to see your history here
              </p>
            </div>
          ) : (
            <div className="scan-list">
              {scans.slice(0, 9).map((scan) => (
                <div className="scan-item" key={scan._id}>
                  <span className="scan-url">{scan.url}</span>
                  <span
                    className={`scan-result ${
                      scan.result === "1" ? "danger" : "safe"
                    }`}
                  >
                    {scan.result === "1" ? "Phishing" : "Safe"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
