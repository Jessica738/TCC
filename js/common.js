/* =========================================================
   VOZATIVA - JAVASCRIPT GERAL
   ========================================================= */


/* =========================================================
   NAVEGAÇÃO ENTRE PÁGINAS E SEÇÕES
   ========================================================= */

   function navigateTo(page) {

    /* Páginas que possuem arquivo próprio */
    var paginasExternas = {
        noticias: "noticias.html",
        denuncias: "denuncias.html",
        mapa: "mapa.html",
        chat: "assistente.html"
    };

    /* Seções que ficam dentro do index.html */
    var secoesHome = {
        home: "page-home",
        ajuda: "page-ajuda",
        psicologico: "page-psicologico",
        faq: "page-faq",
        historias: "page-historias",
        contatos: "page-contatos",
        materiais: "page-materiais",
        estatisticas: "page-estatisticas",
        campanhas: "page-campanhas"
    };


    /* ---------------------------------------------------------
       PÁGINAS EXTERNAS
       --------------------------------------------------------- */

    if (paginasExternas[page]) {

        fecharMenuMobile();

        /*
         * replace() substitui a página atual
         * e não cria uma nova entrada no histórico.
         */
        window.location.replace(paginasExternas[page]);

        return;
    }


    /* ---------------------------------------------------------
       SEÇÕES DO INDEX
       --------------------------------------------------------- */

    if (secoesHome[page]) {

        var secaoId = secoesHome[page];

        /*
         * Se já estamos no index.html,
         * mostra a seção diretamente.
         */
        var secaoExiste = document.getElementById(secaoId);

        if (secaoExiste) {

            mostrarSecao(secaoId);

            fecharMenuMobile();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return;
        }


        /*
         * Se estamos em outra página,
         * salva qual seção deve aparecer
         * quando o index.html abrir.
         */
        sessionStorage.setItem(
            "vozativa_secao",
            secaoId
        );

        fecharMenuMobile();

        /*
         * replace() para não adicionar ao histórico.
         */
        window.location.replace("index.html");

        return;
    }


    /* ---------------------------------------------------------
       CASO NÃO ENCONTRE A PÁGINA
       --------------------------------------------------------- */

    console.warn("Página não encontrada:", page);

    fecharMenuMobile();
}


/* =========================================================
   MOSTRAR UMA SEÇÃO DO INDEX
   ========================================================= */

function mostrarSecao(secaoId) {

    /*
     * Pega todas as seções que possuem a classe .page
     */
    var secoes = document.querySelectorAll("main .page");


    /*
     * Esconde todas
     */
    secoes.forEach(function (secao) {
        secao.classList.add("hidden");
    });


    /*
     * Mostra somente a escolhida
     */
    var secao = document.getElementById(secaoId);

    if (secao) {

        secao.classList.remove("hidden");

    } else {

        console.warn(
            "A seção não foi encontrada:",
            secaoId
        );
    }
}


/* =========================================================
   ABRIR SEÇÃO SALVA AO CARREGAR O INDEX
   ========================================================= */

function carregarSecaoSalva() {

    var secaoSalva = sessionStorage.getItem(
        "vozativa_secao"
    );


    if (secaoSalva) {

        /*
         * Remove primeiro para não abrir novamente
         * em um próximo acesso ao index.
         */
        sessionStorage.removeItem(
            "vozativa_secao"
        );


        mostrarSecao(secaoSalva);


        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

        return;
    }


    /*
     * Se nenhuma seção foi escolhida,
     * mostra a página inicial.
     */
    var home = document.getElementById("page-home");

    if (home) {

        mostrarSecao("page-home");

    }
}


/* =========================================================
   MENU "MAIS"
   ========================================================= */

function toggleMore(event) {

    if (event) {
        event.stopPropagation();
    }

    var menu = document.getElementById("moreMenu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("hidden");
}


/* Fecha o menu "Mais" quando clicar fora */
document.addEventListener("click", function (event) {

    var dropdown = document.querySelector(".dropdown");

    var menu = document.getElementById("moreMenu");

    if (!dropdown || !menu) {
        return;
    }


    if (!dropdown.contains(event.target)) {

        menu.classList.add("hidden");

    }

});


/* =========================================================
   MENU HAMBÚRGUER
   ========================================================= */

function toggleMobileMenu() {

    var navLinks = document.getElementById("navLinks");

    var menuToggle = document.getElementById("menuToggle");

    if (!navLinks || !menuToggle) {
        return;
    }


    navLinks.classList.toggle("menu-aberto");


    if (navLinks.classList.contains("menu-aberto")) {

        menuToggle.innerHTML = "✕";
        menuToggle.setAttribute(
            "aria-label",
            "Fechar menu"
        );

    } else {

        menuToggle.innerHTML = "☰";
        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        var moreMenu = document.getElementById("moreMenu");

        if (moreMenu) {
            moreMenu.classList.add("hidden");
        }
    }
}


/* =========================================================
   FECHAR MENU MOBILE
   ========================================================= */

function fecharMenuMobile() {

    var navLinks = document.getElementById("navLinks");

    var menuToggle = document.getElementById("menuToggle");

    var moreMenu = document.getElementById("moreMenu");


    if (navLinks) {

        navLinks.classList.remove("menu-aberto");

    }


    if (menuToggle) {

        menuToggle.innerHTML = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }


    if (moreMenu) {

        moreMenu.classList.add("hidden");

    }
}


/* =========================================================
   ESC FECHA MENU MOBILE
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }


    var navLinks = document.getElementById("navLinks");

    if (
        navLinks &&
        navLinks.classList.contains("menu-aberto")
    ) {

        fecharMenuMobile();

    }

});


/* =========================================================
   CRIAR BOTÃO DO MENU MOBILE
   ========================================================= */

function criarBotaoMenuMobile() {

    /*
     * Não cria outro botão se já existir.
     */
    if (document.getElementById("menuToggle")) {
        return;
    }


    var navRight = document.querySelector(".nav-right");

    var navLinks = document.getElementById("navLinks");


    if (!navRight || !navLinks) {
        return;
    }


    var botao = document.createElement("button");

    botao.type = "button";

    botao.id = "menuToggle";

    botao.className = "menu-toggle";

    botao.innerHTML = "☰";

    botao.setAttribute(
        "aria-label",
        "Abrir menu"
    );


    botao.addEventListener(
        "click",
        toggleMobileMenu
    );


    navRight.insertBefore(
        botao,
        navRight.firstChild
    );
}


/* =========================================================
   FECHAR MENU AO REDIMENSIONAR
   ========================================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        fecharMenuMobile();

    }

});


/* =========================================================
   TEMA CLARO / ESCURO
   ========================================================= */

function aplicarTema() {

    var tema = localStorage.getItem("theme");


    if (tema !== "dark" && tema !== "light") {

        tema = "light";

    }


    document.documentElement.setAttribute(
        "data-theme",
        tema
    );


    document.body.setAttribute(
        "data-theme",
        tema
    );
}


function toggleTheme() {

    var temaAtual =
        document.documentElement.getAttribute(
            "data-theme"
        );


    var novoTema =
        temaAtual === "dark"
            ? "light"
            : "dark";


    localStorage.setItem(
        "theme",
        novoTema
    );


    aplicarTema();
}


/* =========================================================
   MARCAR BOTÃO DA PÁGINA ATUAL
   ========================================================= */

function marcarPaginaAtual() {

    var paginaAtual =
        document.body.dataset.page;


    if (!paginaAtual) {
        return;
    }


    var botoes =
        document.querySelectorAll(
            ".nav-links button[data-page]"
        );


    botoes.forEach(function (botao) {

        botao.classList.remove("active");


        if (
            botao.dataset.page === paginaAtual
        ) {

            botao.classList.add("active");

        }

    });
}


/* =========================================================
   SAÍDA RÁPIDA
   ========================================================= */

function quickExit() {

    /*
     * replace() impede que a página atual
     * fique como página anterior no histórico.
     */
    window.location.replace(
        "https://www.google.com/"
    );
}


/* =========================================================
   ESC - SAÍDA RÁPIDA
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }


    var navLinks =
        document.getElementById("navLinks");


    /*
     * Se o menu estiver aberto,
     * o primeiro ESC apenas fecha o menu.
     */
    if (
        navLinks &&
        navLinks.classList.contains("menu-aberto")
    ) {

        return;
    }


    quickExit();

});


/* =========================================================
   MODAL DE EMERGÊNCIA
   ========================================================= */

function openEmergency() {

    var modal =
        document.getElementById(
            "emergencyModal"
        );


    if (modal) {

        modal.classList.add("open");

    }
}


function closeEmergency() {

    var modal =
        document.getElementById(
            "emergencyModal"
        );


    if (modal) {

        modal.classList.remove("open");

    }
}


/* Fecha emergência clicando fora */
document.addEventListener("click", function (event) {

    var modal =
        document.getElementById(
            "emergencyModal"
        );


    if (!modal) {
        return;
    }


    if (
        event.target === modal
    ) {

        closeEmergency();

    }

});


/* =========================================================
   LOGIN
   ========================================================= */

function openLogin() {

    var modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.add("open");

    }
}


/* =========================================================
   ESC PARA FECHAR MODAIS
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }


    closeEmergency();


    var loginModal =
        document.getElementById(
            "loginModal"
        );


    if (loginModal) {

        loginModal.classList.remove("open");

    }

});


/* =========================================================
   CARREGAMENTO INICIAL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Aplica o tema salvo.
         */
        aplicarTema();


        /*
         * Marca o botão correspondente
         * à página atual.
         */
        marcarPaginaAtual();


        /*
         * Cria o botão do menu hambúrguer.
         */
        criarBotaoMenuMobile();


        /*
         * Abre a seção correta do index,
         * caso tenha vindo de outra página.
         */
        carregarSecaoSalva();

    }
);