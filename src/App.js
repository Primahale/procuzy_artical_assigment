import React, { useState } from 'react';
import './App.css';
import ArticleList from './components/articalList';
import Loader from './components/loader';


function App() {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleScrape = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Topic is required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://procuzy-artical-assigment-1.onrender.com/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scrape articles');
      }

      const data = await response.json();
      console.log(data)

      setArticles(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Medium Article Scraper</h1>
        <form onSubmit={handleScrape}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
          />
          <button type="submit">Scrape Articles</button>
        </form>
        {loading && <Loader/>}
        {error && <p className="error">{error}</p>}
        <ArticleList articles={articles} />
      </header>
    </div>
  );
}

export default App;
