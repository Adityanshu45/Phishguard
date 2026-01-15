# 🔐 PhishGuard — Phishing Website Detection System

**Live Demo:** https://phishguard-blond.vercel.app/

PhishGuard is a **machine learning–powered phishing website detection system** that analyzes URL-based features to classify websites as **Safe or Malicious**.  
The project focuses strongly on **ML model development**, **feature engineering**, and **presenting predictions through a clean, user-friendly web interface**.

---

## 🧭 Table of Contents

- Overview
- Demo
- Features
- System Architecture
- Tech Stack
- Machine Learning Workflow
- Feature Engineering
- Model Performance
- API Usage
- Installation
- Environment Variables
- Usage
- Future Improvements
- What I Learned
- Author

---

## 📖 Overview

PhishGuard helps users quickly identify potentially harmful websites before visiting them.  
Users enter a URL, and the system evaluates multiple characteristics of the URL using a trained **XGBoost machine learning model** to determine phishing risk.

The project combines:

- Practical **machine learning workflow**
- Real-time prediction via REST API
- A simple and responsive frontend for end users

---

## 🎥 Demo

🔗 **Live Application:** https://phishguard-blond.vercel.app/

Users can:

- Enter a URL
- Instantly receive a prediction (Safe / Malicious)
- View confidence percentage and risk level

---

## ✨ Features

- 🔍 **Real-time phishing detection**
- 🤖 **ML-based classification**
- 📊 **Confidence percentage & risk level**
- 🎨 **Clean and responsive UI**
- 🔐 **User authentication**
- 🌐 **Deployed on cloud platforms**

---

## 🏗️ System Architecture

User  
↓  
React Frontend  
↓  
Node.js Backend  
↓  
Flask ML API  
↓  
XGBoost Model  
↓  
Prediction Result

---

## 🧰 Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React (Vite), HTML, CSS, JavaScript  |
| Backend    | Node.js, Express.js                  |
| ML API     | Python, Flask                        |
| Database   | MongoDB                              |
| ML         | Pandas, NumPy, Scikit-learn, XGBoost |
| Deployment | Vercel, Render                       |

---

## 🔄 Machine Learning Workflow

The ML pipeline (implemented in the Jupyter Notebook) includes:

1. Dataset loading and inspection
2. Data cleaning and preprocessing
3. Label encoding
4. URL normalization
5. Feature extraction
6. Train-test split
7. Model training
8. Model evaluation
9. Model selection
10. Model serialization

---

## 🧠 Feature Engineering

The following features are extracted from URLs:

- URL length
- Hostname length
- Number of dots
- HTTPS usage
- Presence of IP address
- Suspicious keyword count
- Domain age (WHOIS data)

---

## 🤖 Model Training & Selection

The following models were trained and evaluated:

- Logistic Regression
- Random Forest
- XGBoost

### Final Model

**XGBoost** was selected due to its superior accuracy and balanced performance.

---

## 📊 Model Performance

- **Model:** XGBoost
- **Accuracy:** ~81%
- **Metrics:** Precision, Recall, Confusion Matrix

---

## 🔌 API Usage

### Predict URL

**Endpoint**

```
POST /predict
```

**Request**

```json
{
  "url": "https://example.com"
}
```

**Response**

```json
{
  "url": "https://example.com",
  "prediction": 1,
  "result": "Malicious",
  "confidence_percent": 93.94,
  "confidence_label": "High",
  "risk_level": "High Risk"
}
```

---

## ⚙️ Installation

```bash
git clone https://github.com/Adityanshu45/Phishguard
cd Phishguard
```

### Backend & ML API

```bash
pip install -r requirements.txt
python app.py
npm install
Nodemon app.js
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file and configure:

```
TOKEN_KEY=your_jwt_secret
ATLAS_DB_URL=your_mongodb_url
```

---

## 🚀 Usage

- Open the frontend in browser
- Login to the application
- Enter a URL
- View phishing prediction instantly

---

## 🏗️ Future Improvements

- [ ] Expand dataset for higher accuracy
- [ ] Admin dashboard for analytics

---

## 📚 What I Learned

- End-to-end ML workflow implementation
- Feature engineering from real-world URLs
- Model evaluation and selection
- Integrating ML models with REST APIs
- Frontend design for ML-based applications
- Cloud deployment and debugging

---

## 👤 Author

**Aditya Chaudhary**  
BN College of Engineering and Technology, Lucknow  
CSE (AI & ML)

- 📧 Email: adityanshu45@gmail.com
- 🌐 GitHub: https://github.com/Adityanshu45
