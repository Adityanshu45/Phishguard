import React from "react";

function Features() {
  return (
    <div className="features">
      <div className="features-heading">
        <h1>Why Choose PhishGuard?</h1>
        <p>
          Our AI-powered phishing detection system helps you identify malicious
          websites quickly and accurately using machine learning and real-time
          analysis.
        </p>
      </div>
      <div className="features-list">
        <div className="feature-content">
          <div className="feature-icon">
            <img src="media/images/adguard.svg" alt="adguard logo" />
          </div>
          <h3>AI-Powered Detection</h3>
          <p>
            Uses a trained machine learning model to analyze URL features and
            identify phishing and malicious websites.
          </p>
        </div>
        <div className="feature-content">
          <div className="feature-icon">
            <img src="media/images/lightning.svg" alt="lightning logo" />
          </div>
          <h3>Fast Analysis</h3>
          <p>
            Delivers instant results by processing URLs efficiently through an
            optimized detection pipeline.
          </p>
        </div>
        <div className="feature-content">
          <div className="feature-icon">
            <img
              src="media/images/internet-world.svg"
              alt="internet-world logo"
            />
          </div>
          <h3>Feature-Based URL Analysis</h3>
          <p>
            Examines URL structure, domain patterns, HTTPS usage, and suspicious
            keywords to detect threats.
          </p>
        </div>
        <div className="feature-content">
          <div className="feature-icon">
            <img src="media/images/privacy.svg" alt="privacy logo" />
          </div>
          <h3>Privacy Focused</h3>
          <p>
            User-submitted URLs are not stored or shared. All analysis is
            performed securely and in real time.
          </p>
        </div>
        <div className="feature-content">
          <div className="feature-icon">
            <img src="media/images/report.svg" alt="report logo" />
          </div>
          <h3>Clear Results & Confidence Score</h3>
          <p>
            Provides an easy-to-understand verdict (Safe or Phishing) along with
            a prediction confidence.
          </p>
        </div>
        <div className="feature-content">
          <div className="feature-icon">
            <img src="media/images/alert.svg" alt="alert logo" />
          </div>
          <h3>Threat Awareness</h3>
          <p>
            Helps users stay alert by identifying potentially dangerous websites
            before they can cause harm.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
