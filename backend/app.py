#import required libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from urllib.parse import urlparse
from utils.feature_extraction import extract_feature

# Initialize Flask application
app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {
        "origins": ["https://phishguard-blond.vercel.app"]
    }},
    supports_credentials=True
)



# Load model
model = pickle.load(open("models/phishing_model.pkl", "rb"))


#api route
@app.route("/predict", methods=["POST"])

def predict():
    data = request.json
    url = data.get("url")

    features = extract_feature(url)

    #convert features into dataframe
    df = pd.DataFrame([features])

    #xgBoost prediction
    
    phishing_prob = float(model.predict_proba(df)[0][1])
    prediction = int(model.predict(df)[0])

    # confidence based on predicted class
    if prediction == 1:
        confidence_percent = round(phishing_prob * 100, 2)
    else:
        confidence_percent = round((1 - phishing_prob) * 100, 2)


     # Confidence label
    if confidence_percent >= 80:
        confidence_label = "High"
    elif confidence_percent >= 60:
        confidence_label = "Medium"
    else:
        confidence_label = "Low"

    # Risk level
    if phishing_prob < 0.3:
        risk_level = "Low Risk"
    elif phishing_prob < 0.6:
        risk_level = "Medium Risk"
    else:
        risk_level = "High Risk"

    return jsonify({
        "url":url,
        "prediction": int(prediction),
        "result": "Safe" if prediction == 0 else "Malicious",
        "confidence_percent": confidence_percent,
        "confidence_label": confidence_label,
        "risk_level": risk_level,
        "https_enabled": bool(int(features["has_https"])),
        
    })

# Run the Flask application on port 5000
if __name__ == "__main__":
    app.run()
