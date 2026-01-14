import React from "react";

function Behind() {
  return (
    <div className="behind">
      <h1>Behind the Scenes</h1>
      <p>
        Our advanced phishing detection process works in seconds to keep you
        safe
      </p>
      <div className="behind-list">
        <div className="behind-content">
          <h3>Extensive Dataset</h3>
          <p>Trained on thousands of phishing and legitimate websites.</p>
        </div>
        <div className="behind-content">
          <h3>AI/ML Model</h3>
          <p>
            Utilizes advanced machine learning algorithms for accurate
            detection.
          </p>
        </div>
        <div className="behind-content">
          <h3>Real-Time Processing</h3>
          <p>Analyzes websites in real time, typically in under one second.</p>
        </div>
        <div className="behind-content">
          <h3>Privacy First</h3>
          <p>No URLs or personal data are shared.</p>
        </div>
      </div>
    </div>
  );
}

export default Behind;
