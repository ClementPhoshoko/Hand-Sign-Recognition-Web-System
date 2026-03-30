# ✋ Hand Sign Recognition Web System

A real-time web-based system that detects hand signs from a live camera feed and maps them to emojis, symbols, or predefined meanings. This project combines modern web technologies with computer vision to deliver a fast, scalable, and interactive user experience.

---

## 🚀 Overview

This system captures hand gestures via a webcam, processes them using a computer vision model, and returns meaningful outputs such as emojis or labels (e.g., 👍, ✋, ✊).

It is designed with a **microservice architecture** to ensure performance, scalability, and maintainability.

---

## 🧠 Architecture

The system is divided into three main components:

### 1. Frontend (Client)

* Built with React
* Captures live camera feed
* Sends image frames to backend
* Displays detected gestures and corresponding outputs

### 2. Backend API (Gateway)

* Built with Node.js (Express)
* Handles communication between frontend and AI service
* Manages request routing and response handling

### 3. AI Service (Computer Vision Engine)

* Built with Python (FastAPI)
* Performs hand detection and gesture recognition
* Returns predictions to backend

---

## ⚙️ Tech Stack

| Layer         | Technology           |
| ------------- | -------------------- |
| Frontend      | React, Webcam API    |
| Backend       | Node.js, Express     |
| AI Service    | Python, FastAPI      |
| CV Library    | MediaPipe, OpenCV    |
| ML (Optional) | TensorFlow / PyTorch |

---

## 👁️ Core Functionality

* Real-time webcam capture
* Hand detection using landmark tracking
* Gesture recognition
* Mapping gestures to:

  * Emojis (👍 ✋ ✊)
  * Text labels
  * Custom images

---

## 🔍 Recognition Approach

### ✅ Recommended Hybrid Approach

This project uses a combination of:

#### 1. Hand Landmark Detection

* MediaPipe extracts 21 key points from the hand
* Provides fast and efficient tracking

#### 2. Gesture Classification

* Landmarks are used as input features
* Classification can be:

  * Rule-based (for simple gestures)
  * ML-based (for advanced recognition)

---

## 🔄 System Flow

```
[ React Frontend ]
        ↓
Capture frame (Webcam)
        ↓
Send image to Node.js API
        ↓
Forward to Python AI Service
        ↓
Hand detection (MediaPipe)
        ↓
Gesture classification
        ↓
Return result (e.g., "thumbs_up")
        ↓
Display emoji in UI
```

---

## 📦 Features (MVP)

* Detect hand in real-time
* Recognize basic gestures:

  * ✊ Fist
  * ✋ Open hand
  * 👍 Thumbs up
* Display corresponding emoji on UI

---

## 📁 Project Structure

```
project-root/
│
├── frontend/              # React application
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/              # Node.js API
│   ├── routes/
│   ├── controllers/
│   └── services/
│
├── ai-service/           # Python FastAPI service
│   ├── models/
│   ├── utils/
│   └── main.py
│
└── README.md
```

---

## ⚡ Performance Considerations

To ensure real-time responsiveness:

* Send frames at intervals (200–500ms)
* Resize images before processing (e.g., 224x224)
* Use lightweight models for inference
* Deploy AI service close to backend
* Optionally use WebSockets for streaming

---

## 📚 Data & Training (Optional)

For advanced gesture recognition:

* Use publicly available sign language datasets (e.g., ASL)
* Train models using:

  * TensorFlow
  * PyTorch

Note:
Some gestures depend on motion, not just static images.

---

## 🧪 Future Improvements

* Full sign language translation (words/sentences)
* Real-time video streaming (WebRTC)
* Voice output (text-to-speech)
* Mobile support (React Native)
* Custom gesture training interface

---

## 🛠️ Getting Started

### Prerequisites

* Node.js
* Python 3.9+
* pip / virtualenv

---

### 1. Clone Repository

```
git clone https://github.com/your-username/hand-sign-recognition.git
cd hand-sign-recognition
```

---

### 2. Start AI Service

```
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3. Start Backend

```
cd backend
npm install
npm run dev
```

---

### 4. Start Frontend

```
cd frontend
npm install
npm start
```

---

## 🎯 Use Cases

* Accessibility tools for hearing-impaired users
* Human-computer interaction systems
* Smart interfaces and gesture control
* Educational tools for sign language learning

---

## 🤝 Contribution

Contributions are welcome. Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Author

Built by Ndaedzo Phoshoko
Passionate about AI, full-stack development, and building impactful systems.

---
