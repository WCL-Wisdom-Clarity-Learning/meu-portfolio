const API_KEY = '3d3809c9003b46eca98981784bfcc876';
const noticiasContainer = document.getElementById('noticias');
const filtroSelect = document.getElementById('filtroNoticias'); // dropdown ou botões

// ====== Busca de Notícias ======
async function carregarNoticias(categoria = 'tecnologia') {
  try {
    noticiasContainer.innerHTML = '<p class="loading">Carregando notícias...</p>';

    const resp = await fetch(`http://localhost:5000/api/noticias?categoria=${categoria}`);
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
        <a href="${noticia.url}" target="_blank" rel="noopener noreferrer">Leia mais →</a>
      `;
      noticiasContainer.appendChild(item);
    });
  } catch (error) {
    noticiasContainer.innerHTML = '<p>Erro ao carregar notícias.</p>';
    console.error('Erro ao buscar notícias:', error);
  }
}

// ====== Filtro de Categorias ======
if (filtroSelect) {
  filtroSelect.addEventListener('change', (e) => {
    const categoria = e.target.value;
    carregarNoticias(categoria);
  });
}

// Carregar a primeira vez (padrão: tecnologia)
carregarNoticias();

// ====== Menu Hamburguer ======
(function () {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('primary-menu');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
    btn.classList.toggle('active', !isOpen);
  });

  // Fecha ao clicar em um link do menu (mobile)
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    btn.classList.remove('active');
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      btn.classList.remove('active');
    }
  });
})();
