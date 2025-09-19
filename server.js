// Configure o servidor (server.js): Adicione este código ao arquivo.
// Ele cria uma API simples que recebe a categoria e faz a busca na NewsAPI no lado do servidor.
import('dotenv').config();
const express = import('express');
const fetch = import('node-fetch');
const cors = import('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWS_API_KEY;

app.use(cors());

app.get('/api/noticias', async (req, res) => {
  const { categoria = 'tecnologia' } = req.query;
  const url = `https://newsapi.org/v2/everything?q=${categoria}&sortBy=publishedAt&language=pt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.articles);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro ao carregar notícias.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});