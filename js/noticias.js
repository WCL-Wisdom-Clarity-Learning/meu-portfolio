const API_KEY = '3d3809c9003b46eca98981784bfcc876';

const noticiasContainer = document.getElementById('noticias');

fetch(`https://newsapi.org/v2/everything?q=tecnologia&sortBy=publishedAt&language=pt&apiKey=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    noticiasContainer.innerHTML = '';

    if (!data.articles || data.articles.length === 0) {
      noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada no momento.</p>';
      return;
    }

    data.articles.forEach(noticia => {
      const item = document.createElement('article');
      item.innerHTML = `
  <img src="${noticia.urlToImage}" alt="Imagem da notícia" style="max-width:100%; height:auto; margin-bottom:10px;" />
  <h3>${noticia.title}</h3>
  <p>${noticia.description || 'Sem descrição disponível.'}</p>
  <a href="${noticia.url}" target="_blank">Leia mais →</a>
  <hr>
`;
      noticiasContainer.appendChild(item);
    });
  })
  .catch(error => {
    noticiasContainer.innerHTML = '<p>Erro ao carregar notícias.</p>';
    console.error(error);
  });
