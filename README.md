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

### To Run This Part (Backend Only):
1.  `cd backend`
2.  `python -m venv venv`
3.  `source venv/bin/activate` (or `.\venv\Scripts\activate` on Windows)
4.  `pip install -r requirements.txt`
5.  `uvicorn main:app --reload`

The server will be running at `http://127.0.0.1:8000`.  
