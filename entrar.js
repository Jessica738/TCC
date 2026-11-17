
const formulario = document.getElementById("loginForm");
const titulo = document.getElementById("formTitulo");
const descricao = document.getElementById("formDescricao");
const campoNome = document.getElementById("nome");
const campoSenha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrarSenha");
const botaoCadastro = document.getElementById("alternarCadastro");
const botaoEnviar = document.getElementById("enviarForm");
const recuperarSenha = document.getElementById("recuperarSenha");
const mensagem = document.getElementById("mensagem");
const lembrarLabel = document.getElementById("lembrarLabel");

let modoCadastro = false;

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

botaoCadastro.addEventListener("click", function () {
    modoCadastro = !modoCadastro;

    campoNome.hidden = !modoCadastro;
    campoNome.required = modoCadastro;

    document.querySelector('label[for="nome"]').hidden = !modoCadastro;

    titulo.textContent = modoCadastro
        ? "Crie sua conta"
        : "Boas-vindas!";

    descricao.textContent = modoCadastro
        ? "Preencha seus dados para se cadastrar."
        : "Entre na sua conta para continuar.";

    botaoEnviar.textContent = modoCadastro
        ? "Criar minha conta"
        : "Entrar na conta";

    botaoCadastro.textContent = modoCadastro
        ? "Já tenho uma conta"
        : "Criar conta";

    recuperarSenha.hidden = modoCadastro;
    lembrarLabel.hidden = modoCadastro;

    campoSenha.autocomplete = modoCadastro
        ? "new-password"
        : "current-password";

    mostrarMensagem("");
});

mostrarSenha.addEventListener("click", function () {
    const senhaVisivel = campoSenha.type === "text";

    campoSenha.type = senhaVisivel ? "password" : "text";
    mostrarSenha.textContent = senhaVisivel ? "Mostrar" : "Ocultar";
    mostrarSenha.setAttribute(
        "aria-label",
        senhaVisivel ? "Mostrar senha" : "Ocultar senha"
    );
});

recuperarSenha.addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();

    if (!email) {
        mostrarMensagem("Digite seu e-mail para solicitar a recuperação.");
        document.getElementById("email").focus();
        return;
    }

    mostrarMensagem(
        "A recuperação de senha precisa ser configurada com um serviço de autenticação."
    );
});

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = campoSenha.value;

    if (modoCadastro && !nome) {
        mostrarMensagem("Digite seu nome completo.");
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (modoCadastro) {
        mostrarMensagem(
            "Formulário validado! Falta conectar o cadastro ao servidor."
        );
        return;
    }

    mostrarMensagem(
        "Formulário validado! Falta conectar o login ao servidor."
    );
});

function toggleMobileMenu() {
    const menu = document.getElementById("navLinks");
    const botao = document.getElementById("menuToggle");

    if (!menu || !botao) return;

    menu.classList.toggle("menu-aberto");

    const aberto = menu.classList.contains("menu-aberto");

    botao.textContent = aberto ? "✕" : "☰";
    botao.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
}

// Fecha o menu ao escolher uma página
document.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("navLinks");
    const botao = document.getElementById("menuToggle");

    if (!menu) return;

    menu.querySelectorAll("button").forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 900) {
                menu.classList.remove("menu-aberto");

                if (botao) {
                    botao.textContent = "☰";
                    botao.setAttribute("aria-label", "Abrir menu");
                }
            }

        });

    });

});
