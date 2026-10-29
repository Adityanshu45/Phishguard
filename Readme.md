# 🔐 PhishGuard — Phishing Website Detection System

**Live Application:** [https://phishguard-blond.vercel.app/](https://phishguard-blond.vercel.app/)

PhishGuard is an end-to-end, machine learning-powered cybersecurity web platform designed to detect and classify phishing and malicious URLs in real time. The system leverages an optimized XGBoost classifier trained on over 600,000 URLs to analyze structural, lexical, and statistical characteristics of links. Built on a decoupled microservices architecture, PhishGuard pairs a modern React frontend with a Node.js/Express authentication and persistence service alongside a dedicated Python/Flask inference engine.

---

## 🧭 Table of Contents
- [Overview](#-overview)
- [System Architecture & Request Lifecycle](#-system-architecture--request-lifecycle)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Machine Learning Pipeline](#-machine-learning-pipeline)
- [Feature Engineering](#-feature-engineering)
- [Model Evaluation & Selection](#-model-evaluation--selection)
- [API Specifications](#-api-specifications)
- [Project Directory Structure](#-project-directory-structure)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Configuration](#-environment-configuration)
- [Future Enhancements](#-future-enhancements)
- [Author & Acknowledgments](#-author--acknowledgments)

---

## 📖 Overview
Phishing remains one of the primary vectors for identity theft, credential harvesting, and financial fraud. PhishGuard protects end users by conducting real-time heuristic and statistical feature inspection on candidate URLs before interaction occurs.

Instead of relying on slow web crawlers or delayed third-party blacklist feeds, PhishGuard extracts numerical vectors directly from the URL anatomy (hostname patterns, domain length, keyword presence, IP redirection). Predictions are returned with dynamic risk levels and confidence metrics.

---

## 🏗️ System Architecture & Request Lifecycle

The system utilizes a decoupled microservice pattern separating client interactions, user data persistence, and machine learning inference:

```
                    ┌────────────────────────────────────────┐
                    │          React (Vite) Client           │
                    │   (https://phishguard-blond.vercel.app)│
                    └───────┬────────────────────────┬───────┘
                            │                        │
      1. GET /me (Verify Session)                    │
      3. POST /scan/save (Persist Record)            │ 2. POST /predict (Inference)
                            │                        │
                            ▼                        ▼
               ┌─────────────────────────┐    ┌─────────────────────────┐
               │   Node.js / Express     │    │   Python Flask API      │
               │   (Render Backend)      │    │   (Render ML Service)   │
               └────────────┬────────────┘    └────────────┬────────────┘
                            │                              │
                            ▼                              ▼
                    [( MongoDB Atlas )]           [ XGBoost Classifier ]
```

### End-to-End Execution Sequence
1. **Session Handshake (`React -> Node.js`):** On clicking "Check URL", the React client queries `GET /me` with `withCredentials: true` to confirm the user possesses a valid authenticated JWT session cookie.
2. **Inference Request (`React -> Flask`):** Once verified, the client sends the URL string via `POST /predict` directly to the Flask ML microservice.
3. **Feature Extraction & Classification (`Flask -> XGBoost`):** Flask passes the URL to `extract_feature()`, converts the extracted attributes into a single-row Pandas DataFrame, and runs it against the serialized `phishing_model.pkl` artifact. It evaluates `predict_proba()` and `predict()`, mapping the results to confidence percentages and risk tiers (`Low Risk`, `Medium Risk`, `High Risk`).
4. **Scan History Logging (`React -> Node.js -> MongoDB`):** React takes the resulting prediction and posts it to `POST /scan/save` on the Node.js server. Express extracts the authenticated `userId` from the JWT and writes the scan log to MongoDB Atlas.
5. **State Rendering:** React sets the prediction response state and displays the verdict badge, confidence meter, and risk indicator to the user.

---

## ✨ Key Features
- **Real-Time Heuristic Detection:** Rapid sub-second URL classification driven by gradient-boosted decision trees.
- **Granular Risk & Confidence Metrics:** Computes a continuous probability score and labels results into intuitive risk categories (`Low Risk`, `Medium Risk`, `High Risk`).
- **Decoupled Microservice Design:** Isolates heavy ML computations in Python from Node.js database and session operations.
- **Session Authentication & Persistent Scans:** JWT-based user authentication using secure HTTP-only cookies and complete scan history tracking in MongoDB Atlas.
- **Responsive Web UI:** Interactive dashboard built using modern React, Vite, and React Router.

---

## 🧰 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Axios, React Router, React Toastify, CSS3 |
| **Application Backend** | Node.js, Express.js, Mongoose, Cookie-Parser, CORS, JWT |
| **Machine Learning Service** | Python, Flask, Flask-CORS, Pandas, Scikit-Learn, Pickle |
| **ML & Data Science** | XGBoost, Scikit-Learn, Pandas, NumPy, Urllib, Validators |
| **Database** | MongoDB Atlas |
| **Deployment Platforms** | Vercel (Frontend), Render (Node.js API & Flask Microservice) |

---

## 🔄 Machine Learning Pipeline

1. **Dataset Sourcing:** Sourced from the Kaggle Malicious URLs dataset (`malicious_phish.csv`) consisting of 651,191 raw labeled URLs.
2. **Binary Problem Formulation:**
   - Consolidated hostile categories (`defacement`: 96,457, `phishing`: 94,111, `malware`: 32,520) into class `1` (**Malicious**).
   - Mapped `benign` (428,103) into class `0` (**Safe**).
3. **Data Preprocessing & Normalization:**
   - Stripped 10,066 duplicate URL records.
   - Applied lowercase conversion and trailing slash removal.
   - Normalized schemes using automatic `http://` prefixing.
   - Executed URL validation checks with `validators.url`, stripping 11,613 malformed entries to retain 629,512 verified rows.
4. **Data Splitting:** Applied stratified splits across Train (70%), Validation (15%), and Test (15%) partitions to prevent data leakage and preserve class distribution.
5. **Hyperparameter Tuning:** Performed cross-validated `RandomizedSearchCV` across tree estimators, maximum depth, learning rate, and subsample ratios.

---

## 🧠 Feature Engineering

Each candidate URL is parsed into a 7-dimensional numerical and lexical feature vector:

| Feature Name | Type | Description |
| :--- | :---: | :--- |
| `url_length` | Integer | Total character count of the full URL string. |
| `hostname_length` | Integer | Length of the parsed network location (`netloc`). |
| `num_dots` | Integer | Number of dots (`.`) in the URL, identifying nested subdomain cloaking. |
| `has_https` | Binary (0/1) | Verifies if the scheme leverages SSL/TLS encryption. |
| `has_ip` | Binary (0/1) | Detects whether the domain relies on a raw IP address instead of a registered domain. |
| `keyword_counts` | Integer | Frequency count of common deceptive keywords (`login`, `secure`, `bank`, `update`, `account`, `free`, `verify`). |
| `domain_age` | Integer | Days since domain registration obtained through WHOIS queries (with non-blocking fallback). |

---

## 📊 Model Evaluation & Selection

Three supervised learning models were evaluated on identical validation datasets:

| Model | Accuracy | Malicious Precision | Malicious Recall | Malicious F1-Score |
| :--- | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 70% | 0.68 | 0.18 | 0.29 |
| **Random Forest** | 80% | 0.75 | 0.62 | 0.68 |
| **XGBoost (Tuned)** | **81%** | **0.75** | **0.62** | **0.68** |

### Optimized XGBoost Parameters
```python
XGBClassifier(
    n_estimators=200,
    max_depth=12,
    learning_rate=0.1,
    subsample=0.8,
    eval_metric='logloss',
    random_state=42
)
```

**Selection Rationale:** XGBoost delivered the highest overall accuracy (81%) and a strong F1-score on malicious samples, while providing low inference latency and compact memory footprint when loaded in production.

---

## 🔌 API Specifications

### 1. Flask Machine Learning Service

#### Predict URL Risk
- **Route:** `POST /predict`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "url": "https://secure-account-verification.com/update"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "url": "https://secure-account-verification.com/update",
    "prediction": 1,
    "result": "Malicious",
    "confidence_percent": 93.94,
    "confidence_label": "High",
    "risk_level": "High Risk",
    "https_enabled": true
  }
  ```

---

### 2. Node.js Backend API

#### User Status Check
- **Route:** `GET /me`
- **Headers:** `Cookie: token=<jwt_token>`
- **Response (`200 OK`):**
  ```json
  {
    "isAuthenticated": true,
    "user": {
      "id": "6718a2bc...",
      "email": "user@example.com"
    }
  }
  ```

#### Save Scan Record
- **Route:** `POST /scan/save`
- **Headers:** `Cookie: token=<jwt_token>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "url": "https://example.com",
    "result": "Malicious"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "scan": {
      "_id": "6720f18c...",
      "userId": "6718a2bc...",
      "url": "https://example.com",
      "result": "Malicious",
      "createdAt": "2026-10-29T03:45:00.000Z"
    }
  }
  ```

#### Fetch Scan History
- **Route:** `GET /scan`
- **Headers:** `Cookie: token=<jwt_token>`
- **Response (`200 OK`):** Returns an array of historical scans for the active user sorted chronologically descending.

---

## 📁 Project Directory Structure

```text
Phishguard/
├── backend/                  # Node.js & Express REST API
│   ├── controller/           # ScanController.js, AuthController.js
│   ├── model/                # Mongoose Schemas (User.js, Scan.js)
│   ├── routes/               # ScanRoute.js, AuthRoute.js
│   ├── app.js                # Server setup, middleware, database connection
│   └── package.json
├── frontend/                 # React (Vite) Single Page Application
│   ├── src/
│   │   ├── components/       # Hero.jsx, Result.jsx, Navbar.jsx, ScanHistory.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── ml/                       # Machine Learning & Flask Inference Service
│   ├── data/                 # Raw and cleaned dataset CSVs
│   ├── models/               # Serialized models (phishing_model.pkl, scaler.pkl)
│   ├── notebooks/            # phishing_website_detection.ipynb
│   ├── utils/                # feature_extraction.py
│   ├── app.py                # Flask microservice serving /predict
│   └── requirements.txt      # Python runtime dependencies
└── README.md
```

---

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.9 - v3.11)
- MongoDB instance (Local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Adityanshu45/Phishguard.git
cd Phishguard
```

### 2. Set Up the Flask ML Service
```bash
cd ml
python -m venv venv

# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
python app.py
```
*The Flask ML API will run on `http://localhost:5000`.*

### 3. Set Up the Node.js Backend
```bash
cd ../backend
npm install
npm run dev # or nodemon app.js
```
*The Node.js server will run on `http://localhost:5000` (or configured PORT).*

### 4. Set Up the React Frontend
```bash
cd ../frontend
npm install
npm run dev
```
*The Vite development server will start on `http://localhost:5173`.*

---

## 🔐 Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
ATLAS_DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/phishguard?retryWrites=true&w=majority
TOKEN_KEY=your_secure_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 🏗️ Future Enhancements
- **Consolidated Node.js API Gateway:** Route ML inference requests through the Node.js server to restrict the Flask service inside a private VPC.
- **Deep Content Analysis:** Extend lexical URL analysis to inspect dynamic DOM artifacts, favicon hashes, and SSL certificate validity.
- **Threat Intelligence Integration:** Implement fallback lookups against Google Safe Browsing and PhishTank APIs for hybrid classification.
- **Browser Extension:** Package detection logic into a Chrome/Firefox extension for active browsing protection.

---

## 👤 Author & Acknowledgments

**Aditya Chaudhary**  
- **Degree:** B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)  
- **College:** BN College of Engineering and Technology, Lucknow  
- **Email:** [adityanshu45@gmail.com](mailto:adityanshu45@gmail.com)  
- **GitHub:** [@Adityanshu45](https://github.com/Adityanshu45)  
- **Live Demo:** [PhishGuard Web App](https://phishguard-blond.vercel.app/)
