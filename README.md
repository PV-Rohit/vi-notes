# Vi-Notes Platform

Vi-Notes is an authenticity verification platform that ensures genuine human writing through keyboard activity monitoring. 

This repository contains the minimum viable product (MVP) implementing the following key features:
1. **Basic Writing Editor**: Distraction-free interface capturing typing data.
2. **User Login & Registration**: Account creation to bind sessions.
3. **Capture Keystroke Timing**: Captures exact dwell times and flight times during composition without storing individual characters prior to save.
4. **Detect Pasted Text**: Counts paste events and lengths.
5. **Save Session Data**: Stores the entire typing metadata to a MongoDB database for future statistical analysis.

## Prerequisites

- **Node.js**: v18 or newer recommended.
- **MongoDB**: A running instance on `mongodb://127.0.0.1:27017` or configured via `.env`.

## Installation & Running

The project consists of a `backend` and a `frontend`.

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

This will run the Express API on `http://localhost:5000` connected to MongoDB. 
**Note**: It requires MongoDB to be running locally. If using a remote instance, create a `.env` file in `backend/` and set `MONGO_URI=your_connection_string`.

### 2. Start the Frontend Application

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

This will run the Vite-React app on `http://localhost:5173/`.

## Architecture Details

- **Backend (Node.js + Express + TypeScript)**
  - RESTful APIs for Auth and Session recording.
  - Data models: `User` and `Session`.
  - Sessions store non-PII keystrokes like duration and time gaps. Sensitive keys are stripped.

- **Frontend (React + Vite + TailwindCSS)**
  - `Login` / `Register` forms managed through Context API.
  - `EditorPage`: Contains the `<textarea>`. It measures exact timestamp deltas using `onKeyDown` and `onKeyUp`, discarding `e.key` payload mapping in the final JSON array to preserve privacy.
