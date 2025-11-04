from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from newspaper import Article
from sklearn.feature_extraction.text import TfidfVectorizer
import re, uvicorn, requests
from bs4 import BeautifulSoup

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

def clean_text(text):
    text = re.sub(r'[^A-Za-z\s]', '', text).lower()
    return text

@app.post("/analyze")
async def analyze(req: URLRequest):
    try:
        
        article = Article(req.url)
        article.download()
        article.parse()
        text = clean_text(article.text)

       
        if len(text) < 100:
            raise Exception("Text too short, trying fallback")

    except Exception:
       
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                              "AppleWebKit/537.36 (KHTML, like Gecko) "
                              "Chrome/123.0 Safari/537.36"
            }
            page = requests.get(req.url, headers=headers, timeout=10)
            soup = BeautifulSoup(page.text, "html.parser")
            paragraphs = soup.find_all("p")
            text = clean_text(" ".join([p.get_text() for p in paragraphs]))
        except Exception as e:
            print("Error fetching article:", e)
            return {"status": "error", "message": str(e)}

    
    try:
        if len(text) < 100:
             return {"status": "error", "message": "Could not extract sufficient text from URL."}

        vectorizer = TfidfVectorizer(max_features=30, stop_words='english')
        X = vectorizer.fit_transform([text])
        feature_names = vectorizer.get_feature_names_out()
        scores = X.toarray()[0]

        words = [
            {"word": w, "weight": float(s)}
            for w, s in sorted(zip(feature_names, scores), key=lambda x: x[1], reverse=True)
        ]

        print("Extracted words:", words)

        return {"status": "success", "words": words}

    except Exception as e:
        print("Error analyzing text:", e)
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)