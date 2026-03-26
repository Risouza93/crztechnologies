//SEÇÕES

//Formulário de contato

const form = document.getElementById("formContato");
const mensagem = document.getElementById("mensagemStatus");
const btnContato = document.querySelector("button");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;

  // validação
  if (nome === "" || email === "") {
    mensagem.textContent = "⚠️ Preencha todos os campos!";
    mensagem.className = "erro";
    return;
  }

  // estado loading
  btnContato.classList.add("loading");
  btnContato.textContent = "Enviando...";
  btnContato.disabled = true;

  mensagem.textContent = "";
  
  // simulação de envio (2 segundos)
  setTimeout(() => {
    mensagem.textContent = "✅ Mensagem enviada com sucesso!";
    mensagem.className = "sucesso";

    btnContato.classList.remove("loading");
    btnContato.textContent = "Enviar mensagem";
    btnContato.disabled = false;

    form.reset();
  }, 2000);
});