// ====== Envio assíncrono para o Formspree + feedback ======
const form = document.getElementById('contatoForm');
const statusEl = document.getElementById('formStatus');

if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    statusEl.textContent = 'Enviando...';
    statusEl.className = 'status info'; // reset status anterior

    try {
      const data = new FormData(form);
      const resp = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        form.reset();
        statusEl.textContent = 'Mensagem enviada com sucesso! ✅';
        statusEl.className = 'status sucesso';
      } else {
        statusEl.textContent = 'Não foi possível enviar. Tente novamente.';
        statusEl.className = 'status erro';
      }
    } catch (err) {
      statusEl.textContent = 'Erro de conexão. Tente novamente.';
      statusEl.className = 'status erro';
      console.error(err);
    }
  });
}

// ====== Menu Hamburguer ======
(function () {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('primary-menu');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
    btn.classList.toggle('active', !isOpen); // 🔥 animação no botão
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
