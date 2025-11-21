import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.NEWS_API_KEY;

app.use(cors());

// Mapeamento de categorias PT → EN (NewsAPI)
const categoryMap = {
  tecnologia: "technology",
  ciencia: "science",
  saude: "health",
  negocios: "business",
  esportes: "sports"
};

app.get('/api/noticias', async (req, res) => {
  const categoriaPT = req.query.categoria || 'tecnologia';
  const categoriaEN = categoryMap[categoriaPT.toLowerCase()] || "technology";

  const url = `https://newsapi.org/v2/everything?q=${categoriaEN}&sortBy=publishedAt&language=pt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles) return res.json([]);
    res.json(data.articles);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro ao carregar notícias.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
