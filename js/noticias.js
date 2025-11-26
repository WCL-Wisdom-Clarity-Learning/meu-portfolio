document.addEventListener("DOMContentLoaded", () => {

  const noticiasContainer = document.getElementById('lista-noticias');
  const filtroSelect = document.getElementById('filtroNoticias');

  async function carregarNoticias(categoria = 'tecnologia') {
    try {
      noticiasContainer.innerHTML = '<p class="loading">Carregando notícias...</p>';

      const resp = await fetch(`/api/noticias?categoria=${categoria}`);
      const data = await resp.json();

      noticiasContainer.innerHTML = '';

      if (!data.articles || data.articles.length === 0) {
        noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada no momento.</p>';
        return;
      }

      data.articles.forEach((noticia) => {
        const item = document.createElement('article');
        item.classList.add('noticia-item');

        item.innerHTML = `
          ${noticia.urlToImage ? `<img src="${noticia.urlToImage}" alt="Imagem da notícia" class="noticia-img"/>` : ''}
          <h3>${noticia.title}</h3>
          <p>${noticia.description || 'Sem descrição disponível.'}</p>
          <a href="${noticia.url}" target="_blank">Leia mais →</a>
        `;

        noticiasContainer.appendChild(item);
      });

    } catch (error) {
      noticiasContainer.innerHTML = '<p>Erro ao carregar notícias.</p>';
      console.error("Erro ao carregar notícias:", error);
    }
  }

  if (filtroSelect) {
    filtroSelect.addEventListener('change', e => carregarNoticias(e.target.value));
  }

  carregarNoticias();

});
