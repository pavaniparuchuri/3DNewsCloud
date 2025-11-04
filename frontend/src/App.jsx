import React, { useState } from "react";
import axios from "axios";
import WordCloud3D from "./WordCloud3D";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/analyze", { url });
      if (res.data.status === "success") setData(res.data.words);
      else setError(res.data.message);
    } catch {
      setError("Error fetching data. Try another URL.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>🧠 3D News Word Cloud</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter article URL..."
        style={{ width: "400px", padding: "8px" }}
      />
      <button onClick={analyze} style={{ marginLeft: 10, padding: "8px 16px" }}>
        Analyze
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ height: "600px" }}>
        <WordCloud3D words={data} />
      </div>
    </div>
  );
}

export default App;
