const express = require('express');
const cors = require('cors');
const scrapeMedium = require('./scraper');
const app = express();
const PORT = process.env.PORT || 3000;

let articles = [];

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).send({ error: 'Topic is required' });
  }

  try {
    articles = await scrapeMedium(topic);
    // console.log(articles)
    res.status(200).send(articles);
  } catch (error) {
    console.error('Error during scraping:', error); 
    res.status(500).send({ error: 'Failed to scrape articles' });
  }
});

app.get('/articles', (req, res) => {
  res.status(200).send(articles);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});