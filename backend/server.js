import express from 'express';
import {fetchNews} from './controllers/newsController.js';
import cors from 'cors'

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'], 
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));

const PORT = process.env.PORT || 3000;

app.get('/news', async (req, res) => {
  try {
    const articles = await fetchNews();
    res.json(articles);
  } catch (error) {
    console.error('Error in getNews controller:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
