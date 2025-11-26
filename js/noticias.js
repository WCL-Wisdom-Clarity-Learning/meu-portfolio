document.addEventListener("DOMContentLoaded", () => {

  const noticiasContainer = document.getElementById('lista-noticias');
  const filtroSelect = document.getElementById('filtroNoticias');

  async function carregarNoticias(categoria = 'tecnologia') {
    try {
      noticiasContainer.innerHTML = '<p class="loading">Carregando notícias...</p>';

      const resposta = await fetch(`https://meu-portfolio-ten-gilt.vercel.app/api/noticias?categoria=${categoria}`);

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const data = await resposta.json();

      noticiasContainer.innerHTML = '';

      const noticias = Array.isArray(data)
        ? data
        : data.noticias || data.articles || [];

      if (!Array.isArray(noticias) || noticias.length === 0) {
        noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
      }

      noticias.forEach(noticia => {
        const artigo = document.createElement('article');
        artigo.classList.add('noticia-item');

        // ✅ Correção de URLs HTTP para HTTPS (evita bloqueio do navegador)
        const imagem = noticia.urlToImage
          ? noticia.urlToImage.replace('http://', 'https://')
          : '';

        artigo.innerHTML = `
          ${imagem ? `<img src="${imagem}" alt="${noticia.title || 'Notícia'}" class="noticia-img" loading="lazy" onerror="this.style.display='none'">` : ''}
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

  // ✅ Listener do filtro
if (filtroSelect) {
  filtroSelect.addEventListener('change', () => {
    carregarNoticias(filtroSelect.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  
    // ✅ Carregamento inicial respeitando o select
    carregarNoticias(filtroSelect.value);
  } else {
    // fallback seguro caso o select não exista
    carregarNoticias();
  }

});
