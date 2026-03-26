document.addEventListener("DOMContentLoaded", () => {

  // ===== BOTÃO DO TOPO =====
  const botaoTopo = document.getElementById("btnContato");

  if (botaoTopo) {
    botaoTopo.addEventListener("click", () => {
      document.getElementById("contato").scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  // ===== FORMULÁRIO =====
  const form = document.getElementById("formContato");
  const mensagem = document.getElementById("mensagemStatus");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = form.querySelector("input[type='text']").value;
      const email = form.querySelector("input[type='email']").value;
      const botao = form.querySelector("button");

      // validação
      if (nome === "" || email === "") {
        mensagem.textContent = "⚠️ Preencha todos os campos!";
        mensagem.className = "erro";
        return;
      }

      // loading
      botao.classList.add("loading");
      botao.textContent = "Enviando...";
      botao.disabled = true;

      mensagem.textContent = "";

      // simulação envio
      setTimeout(() => {
        mensagem.textContent = "✅ Mensagem enviada com sucesso!";
        mensagem.className = "sucesso";

        botao.classList.remove("loading");
        botao.textContent = "🚀 Enviar mensagem";
        botao.disabled = false;

        form.reset();
      }, 2000);
    });
  }

});