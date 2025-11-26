document.addEventListener("DOMContentLoaded", () => {

  const noticiasContainer = document.getElementById('lista-noticias');
  const filtroSelect = document.getElementById('filtroNoticias');

  async function carregarNoticias(categoria) {
    try {
      noticiasContainer.innerHTML = '<p class="loading">Carregando notícias...</p>';

      const resposta = await fetch(`https://meu-portfolio-ten-gilt.vercel.app/api/noticias?categoria=${categoria}`);

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const data = await resposta.json();

      noticiasContainer.innerHTML = '';

      const noticias = data.noticias || data.articles || data;

      if (!Array.isArray(noticias) || noticias.length === 0) {
        noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
      }

      noticias.forEach(noticia => {
        const artigo = document.createElement('article');
        artigo.classList.add('noticia-item');

        artigo.innerHTML = `
          ${noticia.urlToImage ? `<img src="${noticia.urlToImage}" alt="${noticia.title}" class="noticia-img" loading="lazy">` : ''}
          <h3>${noticia.title || 'Título indisponível'}</h3>
          <p>${noticia.description || 'Sem descrição disponível.'}</p>
          <a href="${noticia.url}" target="_blank" rel="noopener noreferrer">Leia mais →</a>
        `;

        noticiasContainer.appendChild(artigo);
      });

    } catch (erro) {
      console.error('Erro ao carregar notícias:', erro);
      noticiasContainer.innerHTML = '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
    }
  }

  // Listener do filtro
  if (filtroSelect) {
    filtroSelect.addEventListener('change', () => {
      carregarNoticias(filtroSelect.value);
    });

    // Carrega respeitando o valor inicial do select
    carregarNoticias(filtroSelect.value);
  }

});
