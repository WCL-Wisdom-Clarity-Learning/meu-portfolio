// Botão de modo escuro
const btnDark = document.getElementById("darkModeToggle");
btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnDark.textContent = document.body.classList.contains("dark")
    ? "☀️ "
    : "🌙 ";
});
