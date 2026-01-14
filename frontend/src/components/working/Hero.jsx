import React from "react";

function Hero() {
  return (
    <div className="working">
      <div className="working-heading">
        <h1>How It Works</h1>
        <p>
          Our four-step process makes it easy to verify any website's
          authenticity in seconds.
        </p>
      </div>
      <div className="working-steps">
        <div className="step">
          <span className="step-number">1</span>
          <div className="step-icon">
            <img src="media/images/check-icon.svg" alt="Enter URL" />
          </div>
          <h3>Enter URL</h3>
          <p>
            Paste the website URL you want to verify into our secure checker.
          </p>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <div className="step-icon">
            <img src="media/images/search.svg" alt="search-icon" />
          </div>
          <h3>Feature Extraction</h3>
          <p>
            Our system extracts important URL features such as length, domain
            structure, HTTPS usage, and suspicious keywords.
          </p>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <div className="step-icon">
            <img src="media/images/adguard.svg" alt="adguard-icon" />
          </div>
          <h3>AI-Based Detection</h3>
          <p>
            A trained machine learning model analyzes these features to identify
            phishing patterns and potential threats.
          </p>
        </div>
        <div className="step">
          <span className="step-number">4</span>
          <div className="step-icon">
            <img src="media/images/check-mark.svg" alt="check-mark" />
          </div>
          <h3>Security Result</h3>
          <p>
            Get an instant result showing whether the website is Safe or
            Phishing, along with a confidence score.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
