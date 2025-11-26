document.addEventListener("DOMContentLoaded", () => {

  // Ajuste: se o site estiver hospedado no github.io, usar o backend do Vercel.
  const VERCEL_API_ORIGIN = 'https://meu-portfolio-dez-gilt.vercel.app'; // <-- seu domínio Vercel
  const isGithubPages = window.location.hostname.includes('github.io');
  const API_BASE = isGithubPages ? VERCEL_API_ORIGIN : ''; // '' = mesmo host (dev ou deploy em Vercel)

  const noticiasContainer = document.getElementById('lista-noticias');
  const filtroSelect = document.getElementById('filtroNoticias'); // dropdown ou botões

  async function carregarNoticias(categoria = 'tecnologia') {
    try {
      noticiasContainer.innerHTML = '<p class="loading">Carregando notícias...</p>';

      const apiUrl = `${API_BASE}/api/noticias?categoria=${encodeURIComponent(categoria)}`;
      console.debug('[noticias] fetch ->', apiUrl); // log útil para debug
      const resp = await fetch(apiUrl);
      const data = await resp.json();

      noticiasContainer.innerHTML = '';

      if (!data || (!data.articles && !Array.isArray(data))) {
        noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada no momento.</p>';
        return;
      }

      const noticias = data.articles || data;

      if (!noticias || noticias.length === 0) {
        noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada no momento.</p>';
        return;
      }

      noticias.forEach((noticia) => {
        const item = document.createElement('article');
        item.classList.add('noticia-item');

        item.innerHTML = `
          ${noticia.urlToImage ? `<img src="${noticia.urlToImage}" alt="Imagem da notícia" class="noticia-img"/>` : ''}
          <h3>${noticia.title || ''}</h3>
          <p>${noticia.description || 'Sem descrição disponível.'}</p>
          <a href="${noticia.url}" target="_blank" rel="noopener noreferrer">Leia mais →</a>
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
