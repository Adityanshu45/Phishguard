import React, { useState, useEffect } from "react";
import Result from "./result";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const [predictionResult, setPredictionResult] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let handleInputChange = (event) => {
    setUrl(() => {
      return event.target.value;
    });
  };

  const handleCheckUrlButton = async () => {
    try {
      const authRes = await axios.get("http://localhost:8080/me", {
        withCredentials: true,
      });

      if (!authRes.data.isAuthenticated) {
        toast.error("Please login first", { position: "bottom-left" });
        navigate("/login", { state: { backgroundLocation: location } });
        return;
      }

      if (!url) {
        setError("Please enter a URL");
        return;
      }

      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/predict",
        { url },
        { headers: { "Content-Type": "application/json" } }
      );

      await axios.post(
        "http://localhost:8080/scan/save",
        {
          url: url,
          result: response.data.prediction, // or response.data.result
        },
        {
          withCredentials: true,
        }
      );

      setPredictionResult(response.data);
      setUrl("");
    } catch (err) {
      setLoading(false);
      toast.error("Please login first", { position: "bottom-left" });
      navigate("/login", { state: { backgroundLocation: location } });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResult = () => {
    setPredictionResult(null);
  };

  return (
    <div className="hero pt-5 pb-5">
      <div className="hero-icon">
        <img src="media/images/adguard.svg" alt="Shield" />
      </div>
      <div className="hero-heading">
        <h1>Detect Phishing Websites Instantly</h1>
        <p>
          Protect yourself from online scams. Our advanced AI-powered detection
          system analyzes URLs <br /> in real-time to identify potential
          phishing threats.
        </p>
      </div>
      <div>
        <div className="hero-search">
          <div className="hero-input">
            <span className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              placeholder="Enter URL to check (e.g., https://example.com)"
              onChange={handleInputChange}
              value={url}
            />
          </div>
          <div className="hero-button">
            <button type="Submit" onClick={handleCheckUrlButton}>
              {loading ? "Checking..." : "Check URL"}
            </button>
          </div>
        </div>
      </div>
      {predictionResult && (
        <Result data={predictionResult} onClose={handleCloseResult} />
      )}
    </div>
  );
}

export default Hero;
