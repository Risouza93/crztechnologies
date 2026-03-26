// pega o botão pelo ID
const botao = document.getElementById("btnContato");

// adiciona ação de clique
botao.addEventListener("click", () => {
  document.getElementById("contato").scrollIntoView({
    behavior: "smooth"
});
});

//Formulário de contato

const form = document.getElementById("formContato");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // impede recarregar a página

  const nome = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;

  if (nome === "" || email === "") {
    alert("Preencha todos os campos!");
    return;
  }

  alert("Mensagem enviada com sucesso! 🚀");
});

//SEÇÕES*

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;

    if (top < window.innerHeight - 50) {
      sec.classList.add("show");
    }
  });
});