import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* PROJECT INFO */}
        <div className="footer-section footer-project">
          <div className="footer-brand">
            <img
              src="/media/images/brand-logo.svg"
              alt="PhishGuard Logo"
              className="brand-logo"
            />
            <h3>PhishGuard</h3>
          </div>

          <p>
            PhishGuard is an AI-based phishing website detection system
            developed as part of an internship project. The system analyzes URLs
            to help identify potentially malicious or unsafe websites.
          </p>
        </div>

        {/* FEATURES */}
        <div className="footer-section">
          <h4>Project Features</h4>
          <ul>
            <li>Phishing URL Detection</li>
            <li>Machine Learning Model</li>
            <li>Real-time URL Analysis</li>
            <li>Confidence-based Risk Output</li>
          </ul>
        </div>

        {/* TECHNOLOGY */}
        <div className="footer-section">
          <h4>Technologies Used</h4>
          <ul>
            <li>Frontend: React.js</li>
            <li>Backend: Node.js & Express.js</li>
            <li>ML Service: Python (Flask + Scikit-learn)</li>
            <li>Languages: JavaScript, Python</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 PhishGuard</p>
      </div>
    </footer>
  );
}

export default Footer;
