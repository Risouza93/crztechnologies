document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // 🔥 SCROLL SUAVE (TODOS OS CTAs)
  // ==============================
  const botoesContato = [
    document.getElementById("btnContato"),
    document.getElementById("btnContato2")
  ];

  botoesContato.forEach((botao) => {
    if (botao) {
      botao.addEventListener("click", () => {
        document.getElementById("contato").scrollIntoView({
          behavior: "smooth"
        });
      });
    }
  });

  // ==============================
  // 🧠 ANIMAÇÃO AO SCROLL (WOW)
  // ==============================
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

  // ==============================
  // 🧾 FORMULÁRIO PROFISSIONAL
  // ==============================
  const form = document.getElementById("formContato");
  const mensagem = document.getElementById("mensagemStatus");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = form.querySelector("input[type='text']").value.trim();
      const email = form.querySelector("input[type='email']").value.trim();
      const botao = form.querySelector("button");

      // ==============================
      // ❌ VALIDAÇÃO
      // ==============================
      if (!nome || !email) {
        mostrarMensagem("⚠️ Preencha todos os campos!", "erro");
        return;
      }

      if (!email.includes("@")) {
        mostrarMensagem("⚠️ Email inválido!", "erro");
        return;
      }

      // ==============================
      // ⏳ LOADING (UX REAL)
      // ==============================
      botao.classList.add("loading");
      botao.textContent = "Enviando...";
      botao.disabled = true;

      mensagem.textContent = "";

      // ==============================
      // 🚀 SIMULAÇÃO DE ENVIO
      // ==============================
      setTimeout(() => {

        mostrarMensagem("✅ Mensagem enviada com sucesso!", "sucesso");

        botao.classList.remove("loading");
        botao.textContent = "🚀 Enviar mensagem";
        botao.disabled = false;

        form.reset();

      }, 2000);
    });
  }

  // ==============================
  // 💬 FUNÇÃO REUTILIZÁVEL
  // ==============================
  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
  }

  // ==============================
  // 💡 EFEITO MICRO-INTERAÇÃO (TOP)
  // ==============================
  const botoes = document.querySelectorAll(".cta-button");

  botoes.forEach((btn) => {
    btn.addEventListener("mousedown", () => {
      btn.style.transform = "scale(0.95)";
    });

    btn.addEventListener("mouseup", () => {
      btn.style.transform = "scale(1)";
    });
  });

});

  // ==============================
  // 💡 CURSOR PERSONALIZADO
  // ==============================
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

  // ==============================
  // 💡 EFEITO DE SCROLL
  // ==============================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scroll = window.scrollY;

  header.style.transform = `translateY(${scroll * 0.3}px)`;
});

  // ==============================
  // 💡 EFEITO DE MOUSE
  // ==============================
document.addEventListener("mousemove", (e) => {
  const glow = document.body;

  glow.style.setProperty("--x", e.clientX + "px");
  glow.style.setProperty("--y", e.clientY + "px");
});