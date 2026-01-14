import React from "react";

function Result({ data, onClose }) {
  return (
    <div
      className={`result-card ${
        data.risk_level === "Low Risk"
          ? "low"
          : data.risk_level === "Medium Risk"
          ? "medium"
          : "high"
      }`}
    >
      <div className="result-header">
        <div className="result-left">
          <div className="result-logo">
            <img
              src={
                data.result === "Safe"
                  ? "./media/images/safe.svg"
                  : "./media/images/danger.svg"
              }
              alt="status"
            />
          </div>

          <div className="result-status">
            <h3>
              {data.result === "Safe" ? "Safe Website" : "Phishing Website"}
            </h3>

            <div className="confidence">
              {data.confidence_label} | {data.confidence_percent}%
            </div>

            <div className="progress-wrapper">
              <span className="progress-label">{data.risk_level}</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${data.confidence_percent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <button className="result-close" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="result-details">
        <div className="detail-item">
          <b>URL:</b> {data.url}
        </div>
        <div className="detail-item">
          <b>Confidence:</b> {data.confidence_label}
        </div>
        <div className="detail-item">
          <b>HTTPS Enabled:</b> {data.https_enabled ? "Yes" : "No"}
        </div>
        <div className="detail-item">
          <b>Prediction:</b> {data.result}
        </div>
      </div>
    </div>
  );
}

export default Result;
