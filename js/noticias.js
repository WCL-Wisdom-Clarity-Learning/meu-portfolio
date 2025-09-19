
// API CHAVE PARA BUSCAR NOTÍCIAS
const noticiasContainer = document.getElementById('noticias');
const filtroSelect = document.getElementById('filtroNoticias'); // dropdown ou botões

// ====== CarregarNotícias ======
async function carregarNoticias(categoria = 'tecnologia') {
  try {
    noticiasContainer.innerHTML = '<p class="loading">Carregando notícias...</p>';

    const resp = await fetch(`http://localhost:5000/api/noticias?categoria=${categoria}`);
    const articles = await resp.json();

    noticiasContainer.innerHTML = '';

    if (!articles || articles.length === 0) {
      noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada no momento.</p>';
      return;
    }

    articles.forEach((noticia) => {
      // ... (Resto do seu código para criar o item de notícia)
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
  const menuLinks = nav.querySelectorAll('a');
  menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Ação de fechar o menu
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    btn.classList.remove('active');
     });
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
