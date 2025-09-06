// Botão de modo escuro
const btnDark = document.getElementById("darkModeToggle");
btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnDark.textContent = document.body.classList.contains("dark")
    ? "☀️ "
    : "🌙 ";
});

// ====== Menu Hamburguer ======
(function () {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('primary-menu');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
  });

  // Fecha ao clicar em um link do menu (mobile)
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
})();
