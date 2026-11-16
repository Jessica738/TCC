
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

// ===============================================================
// ATUALIZAÇÃO 16/11 — LOGIN E CADASTRO DIDÁTICOS
// JSON é usado ao abrir por HTTP/HTTPS. Quando o aluno abre index.html
// diretamente (file://), os dados de exemplo vêm do arquivo .js auxiliar.
// Senhas são fictícias. Não usar para pessoas/relatos reais.
// ===============================================================
const CHAVE_CADASTROS_DEMO = "vozativa_cadastros_ficticios_v1";

function lerCadastrosDemo() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_CADASTROS_DEMO) || "[]");
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}

async function carregarUsuariosDemo() {
    if (location.protocol === "file:") {
        return window.VOZATIVA_USUARIOS_EXEMPLO || [];
    }
    try {
        const resposta = await fetch("dados/usuarios.json", { cache: "no-store" });
        if (!resposta.ok) throw new Error("Falha ao carregar usuarios.json");
        const dados = await resposta.json();
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.warn("ATUALIZAÇÃO 16/11: JSON indisponível.", erro);
        throw new Error("Não foi possível ler o JSON de usuários fictícios.");
    }
}

// SHA-256 aqui serve apenas à atividade local; não é autenticação segura.
// Um login verdadeiro exige servidor, armazenamento e hash de senhas adequado.
async function resumoSenhaDemo(senha) {
    if (!window.crypto || !crypto.subtle) {
        throw new Error("Este navegador não permite o cadastro local de demonstração.");
    }
    const bytes = new TextEncoder().encode(senha);
    const resumo = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(resumo))
        .map(parte => parte.toString(16).padStart(2, "0")).join("");
}

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = campoSenha.value;

    if (modoCadastro && !nome) {
        mostrarMensagem("Digite seu nome completo.");
        return;
    }
    if (senha.length < 6) {
        mostrarMensagem("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    botaoEnviar.disabled = true;
    try {
        const exemplos = await carregarUsuariosDemo();
        const cadastrados = lerCadastrosDemo();

        if (modoCadastro) {
            if (exemplos.some(u => u.email.toLowerCase() === email) ||
                cadastrados.some(u => u.email === email)) {
                mostrarMensagem("Este e-mail já está cadastrado.");
                return;
            }
            const senhaHash = await resumoSenhaDemo(senha);
            cadastrados.push({ id: "demo-" + Date.now(), nome, email, senhaHash });
            localStorage.setItem(CHAVE_CADASTROS_DEMO, JSON.stringify(cadastrados));
            mostrarMensagem("Cadastro de teste criado! Clique em Já tenho uma conta para entrar.");
            return;
        }

        const usuarioLocal = cadastrados.find(u => u.email === email);
        let usuario = null;
        if (usuarioLocal && usuarioLocal.senhaHash === await resumoSenhaDemo(senha)) {
            usuario = usuarioLocal;
        } else if (!usuarioLocal) {
            usuario = exemplos.find(u => u.email.toLowerCase() === email && u.senha === senha);
        }
        if (!usuario) {
            mostrarMensagem("E-mail ou senha incorretos.");
            return;
        }
        // Guarda somente o primeiro nome fictício para esta demonstração.
        // ATUALIZAÇÃO 16/11 — guarda os dados mínimos para exibir o perfil.
        sessionStorage.setItem("vozativa_demo_usuario", JSON.stringify({
            nome: usuario.nome,
            email: usuario.email
        }));
        sessionStorage.setItem("vozativa_demo_nome", usuario.nome);
        mostrarMensagem("Bem-vindo(a), " + usuario.nome + "! Redirecionando...");
        setTimeout(() => { window.location.href = "index.html"; }, 550);
    } catch (erro) {
        mostrarMensagem(erro.message || "Erro ao verificar os dados de teste.");
        console.error("ATUALIZAÇÃO 16/11 — erro no login:", erro);
    } finally {
        botaoEnviar.disabled = false;
    }
});
