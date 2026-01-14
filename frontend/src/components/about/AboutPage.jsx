import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about">
      <div className="about-header">
        <div className="about-icon">🛡️</div>
        <h2>About PhishGuard</h2>
        <p>
          PhishGuard is a machine learning–based phishing URL detection system
          developed as an internship project using modern web and AI
          technologies.
        </p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>650K+</h3>
          <span>URLs in Dataset</span>
        </div>
        <div className="stat-card">
          <h3>81%</h3>
          <span>Model Accuracy</span>
        </div>
        <div className="stat-card">
          <h3>ML + MERN</h3>
          <span>Tech Stack</span>
        </div>
        <div className="stat-card">
          <h3>Real-Time</h3>
          <span>URL Analysis</span>
        </div>
      </div>

      <div className="about-content">
        <div className="story">
          <h3>Our Story</h3>
          <p>
            PhishGuard was developed as part of an internship program with the
            objective of gaining hands-on experience in applying machine
            learning techniques to real-world cybersecurity challenges,
            particularly phishing attack detection.
          </p>
          <p>
            The system utilizes a trained machine learning model to analyze URLs
            and classify them as phishing or legitimate. The backend is
            responsible for model inference and API handling, while the frontend
            provides a clean, responsive, and user-friendly interface for
            real-time URL analysis.
          </p>
        </div>

        <div className="mission-vision">
          <div className="info-card">
            <h4>🎯 Project Objective</h4>
            <p>
              To design and implement a phishing URL detection system using
              machine learning and full-stack web development.
            </p>
          </div>

          <div className="info-card">
            <h4>👁️ Learning Outcome</h4>
            <p>
              Gaining practical experience in ML model training, API
              integration, and frontend-backend communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
