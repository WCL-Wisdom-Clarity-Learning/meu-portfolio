// Envio assíncrono para o Formspree + feedback na página
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


