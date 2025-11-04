# 3D News Word Cloud

This project is an interactive website that generates a 3D word cloud from a news article's URL.

It consists of:
* **Backend**: A Python/FastAPI server that fetches article text and performs topic modeling.
* **Frontend**: A React/React Three Fiber application that visualizes the topics in 3D.

---

## Part 1: Backend API Skeleton & Text Fetching

### Features Implemented:
* **FastAPI Server**: (`backend/main.py`) Basic app setup using FastAPI.
* **CORS Middleware**: Added `CORSMiddleware` to allow requests from our future frontend.
* **`/analyze` Endpoint**: Created a `POST` endpoint that accepts `{ "url": "..." }`.
* **Article Fetching**: Uses `newspaper3k` to download and parse text.
* **Scraping Fallback**: Uses `requests` and `BeautifulSoup` if `newspaper3k` fails.
* **JSON Response**: Returns a JSON object with the fetched text: `{"status": "success", "text": "..."}`.

---

## Part 2: Backend Topic Modeling (TF-IDF)

### Features Implemented:
* **TF-IDF Analysis**: Added `scikit-learn` to the project.
* **Keyword Extraction**: The `/analyze` endpoint now processes the raw text using `TfidfVectorizer` to find the top 30 most relevant keywords.
* **Updated Response Format**: The API now returns the final data structure required by the frontend: `{"status": "success", "words": [{"word": "...", "weight": 0.8}, ...]}`.

---

## Part 3: React Frontend UI & API Call

### Features Implemented:
* **React Setup**: Added a `frontend` folder with a standard Vite + React project.
* **UI Components**: (`src/App.jsx`) Created the main UI with a URL input field and an "Analyze" button.
* **API Call**: Uses `axios` to send the URL to the `http://localhost:8000/analyze` backend endpoint.
* **State Management**: Handles `loading` and `error` states to give user feedback.
* **3D Visualization**: (`src/WordCloud3D.jsx`) Renders the word data in a 3D scene using React Three Fiber and Drei.

---

## 🚀 How to Run the Full Application (Frontend + Backend)

You will need **two terminals** running at the same time.

### Terminal 1: Run the Backend
1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  (If not already done) Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate 
    # On Windows: .\venv\Scripts\activate
    ```
3.  Install the Python dependencies (includes `scikit-learn` now):
    ```bash
    pip install -r requirements.txt
    ```
4.  Start the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
    > **✅ Backend will be running at `http://127.0.0.1:8000`**

### Terminal 2: Run the Frontend
1.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm run dev
    ```
    > **✅ Frontend will be running at `http://localhost:5173` (or a similar port).**

You can now open `http://localhost:5173` in your browser to use the app.
