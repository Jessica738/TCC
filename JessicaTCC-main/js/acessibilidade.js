/* =========================================================
   ACESSIBILIDADE - VOZATIVA
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURAÇÃO
       ===================================================== */

    const STORAGE_KEY = "vozativa_acessibilidade";


    let configuracao = {
        fonte: 1,
        leituraMouse: false,
        leituraSelecao: true,
        espacamento: false,
        contraste: false,
        movimento: false
    };


    /* =====================================================
       CARREGAR CONFIGURAÇÕES
       ===================================================== */

    function carregarConfiguracao() {

        try {

            const salvo =
                localStorage.getItem(STORAGE_KEY);

            if (salvo) {

                const dados = JSON.parse(salvo);

                configuracao = {
                    ...configuracao,
                    ...dados
                };

            }

        } catch (erro) {

            console.warn(
                "Erro ao carregar acessibilidade:",
                erro
            );

        }

    }


    /* =====================================================
       SALVAR
       ===================================================== */

    function salvarConfiguracao() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(configuracao)
            );

        } catch (erro) {

            console.warn(
                "Erro ao salvar acessibilidade:",
                erro
            );

        }

    }


    /* =====================================================
       BOTÃO DE ACESSIBILIDADE
       ===================================================== */

    function criarBotao() {

        const botao =
            document.createElement("button");

        botao.id = "accessibilityButton";

        botao.className =
            "accessibility-button";

        botao.type = "button";

        botao.setAttribute(
            "aria-label",
            "Abrir opções de acessibilidade"
        );

        botao.setAttribute(
            "aria-expanded",
            "false"
        );

        botao.innerHTML = "♿";


        botao.addEventListener(
            "click",
            alternarPainel
        );


        document.body.appendChild(botao);

    }


    /* =====================================================
       PAINEL
       ===================================================== */

    function criarPainel() {

        const painel =
            document.createElement("aside");

        painel.id =
            "accessibilityPanel";

        painel.className =
            "accessibility-panel";

        painel.setAttribute(
            "aria-label",
            "Opções de acessibilidade"
        );


        painel.innerHTML = `

            <div class="accessibility-header">

                <h3>Acessibilidade</h3>

                <button
                    type="button"
                    class="accessibility-close"
                    id="accessibilityClose"
                    aria-label="Fechar acessibilidade"
                >
                    ×
                </button>

            </div>


            <p class="accessibility-description">
                Personalize a página para facilitar
                a leitura e a navegação.
            </p>


            <!-- TAMANHO -->

            <div class="accessibility-section">

                <span class="accessibility-section-title">
                    Tamanho do texto
                </span>


                <div class="accessibility-font-controls">

                    <button
                        type="button"
                        id="fontDecrease"
                        aria-label="Diminuir texto"
                    >
                        A−
                    </button>


                    <button
                        type="button"
                        id="fontNormal"
                        aria-label="Tamanho normal"
                    >
                        A
                    </button>


                    <button
                        type="button"
                        id="fontIncrease"
                        aria-label="Aumentar texto"
                    >
                        A+
                    </button>

                </div>

            </div>


            <!-- LEITURA -->

            <div class="accessibility-section">

                <span class="accessibility-section-title">
                    Leitura
                </span>


                <div class="accessibility-options">

                    <button
                        type="button"
                        class="accessibility-option"
                        id="mouseReading"
                    >

                        <span class="accessibility-icon">
                            🔊
                        </span>

                        <span>
                            Ler ao passar o mouse
                        </span>

                    </button>


                    <button
                        type="button"
                        class="accessibility-option"
                        id="selectionReading"
                    >

                        <span class="accessibility-icon">
                            🖱️
                        </span>

                        <span>
                            Ler texto selecionado
                        </span>

                    </button>


                    <button
                        type="button"
                        class="accessibility-option"
                        id="stopReading"
                    >

                        <span class="accessibility-icon">
                            ⏹️
                        </span>

                        <span>
                            Parar leitura
                        </span>

                    </button>

                </div>

            </div>


            <!-- VISUAL -->

            <div class="accessibility-section">

                <span class="accessibility-section-title">
                    Visual
                </span>


                <div class="accessibility-options">

                    <button
                        type="button"
                        class="accessibility-option"
                        id="spacingButton"
                    >

                        <span class="accessibility-icon">
                            ↔️
                        </span>

                        <span>
                            Aumentar espaçamento
                        </span>

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(painel);

    }


    /* =====================================================
       INDICADOR DE LEITURA
       ===================================================== */

    function criarIndicador() {

        const indicador =
            document.createElement("div");

        indicador.id =
            "accessibilityReading";

        indicador.className =
            "accessibility-reading";

        indicador.setAttribute(
            "aria-live",
            "polite"
        );

        indicador.textContent =
            "🔊 Lendo...";


        document.body.appendChild(indicador);

    }


    /* =====================================================
       ABRIR / FECHAR
       ===================================================== */

    function alternarPainel() {

        const painel =
            document.getElementById(
                "accessibilityPanel"
            );

        const botao =
            document.getElementById(
                "accessibilityButton"
            );


        if (!painel) return;


        const aberto =
            painel.classList.toggle("open");


        if (botao) {

            botao.setAttribute(
                "aria-expanded",
                aberto
                    ? "true"
                    : "false"
            );

        }

    }


    /* =====================================================
       FONTE
       ===================================================== */

    function aplicarFonte() {

        let escala = 1;


        if (configuracao.fonte === 0.9) {

            escala = 0.9;

        } else if (configuracao.fonte === 1.15) {

            escala = 1.15;

        } else if (configuracao.fonte === 1.3) {

            escala = 1.3;

        }


        document.documentElement.style.setProperty(
            "--accessibility-scale",
            escala
        );

    }


    function diminuirFonte() {

        if (configuracao.fonte === 1) {

            configuracao.fonte = 0.9;

        } else if (configuracao.fonte === 1.15) {

            configuracao.fonte = 1;

        } else if (configuracao.fonte === 1.3) {

            configuracao.fonte = 1.15;

        }


        aplicarFonte();

        salvarConfiguracao();

    }


    function fonteNormal() {

        configuracao.fonte = 1;

        aplicarFonte();

        salvarConfiguracao();

    }


    function aumentarFonte() {

        if (configuracao.fonte === 0.9) {

            configuracao.fonte = 1;

        } else if (configuracao.fonte === 1) {

            configuracao.fonte = 1.15;

        } else if (configuracao.fonte === 1.15) {

            configuracao.fonte = 1.3;

        }


        aplicarFonte();

        salvarConfiguracao();

    }


    /* =====================================================
       LEITURA
       ===================================================== */

    function falar(texto) {

        if (
            !texto ||
            !("speechSynthesis" in window)
        ) {

            return;

        }


        texto =
            texto
            .replace(/\s+/g, " ")
            .trim();


        if (!texto) return;


        window.speechSynthesis.cancel();


        const fala =
            new SpeechSynthesisUtterance(
                texto
            );


        fala.lang = "pt-BR";

        fala.rate = 0.95;

        fala.pitch = 1;

        fala.volume = 1;


        const indicador =
            document.getElementById(
                "accessibilityReading"
            );


        if (indicador) {

            indicador.classList.add("show");

        }


        fala.onend = function () {

            if (indicador) {

                indicador.classList.remove(
                    "show"
                );

            }

        };


        fala.onerror = function () {

            if (indicador) {

                indicador.classList.remove(
                    "show"
                );

            }

        };


        window.speechSynthesis.speak(
            fala
        );

    }


    /* =====================================================
       PARAR LEITURA
       ===================================================== */

    function pararLeitura() {

        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis.cancel();

        }


        const indicador =
            document.getElementById(
                "accessibilityReading"
            );


        if (indicador) {

            indicador.classList.remove(
                "show"
            );

        }

    }


    /* =====================================================
       TEXTO SELECIONADO
       ===================================================== */

    function configurarSelecao() {

        document.addEventListener(
            "mouseup",
            function () {

                if (
                    !configuracao.leituraSelecao
                ) {

                    return;

                }


                const selecao =
                    window.getSelection();


                if (!selecao) return;


                const texto =
                    selecao.toString().trim();


                if (
                    texto.length > 0
                ) {

                    falar(texto);

                }

            }
        );

    }


    /* =====================================================
       LEITURA AO PASSAR MOUSE
       ===================================================== */

    function configurarLeituraMouse() {

        document.addEventListener(
            "mouseover",
            function (event) {

                if (
                    !configuracao.leituraMouse
                ) {

                    return;

                }


                const elemento =
                    event.target.closest(
                        "p, h1, h2, h3, h4, h5, h6, label, a, button, li"
                    );


                if (!elemento) return;


                if (
                    elemento.closest(
                        ".accessibility-panel"
                    )
                ) {

                    return;

                }


                const texto =
                    elemento.innerText ||
                    elemento.textContent;


                if (!texto) return;


                falar(
                    texto.trim()
                );

            }
        );

    }


    /* =====================================================
       DESTAQUE
       ===================================================== */

    function configurarDestaque() {

        document.addEventListener(
            "mouseover",
            function (event) {

                if (
                    !configuracao.leituraMouse
                ) {

                    return;

                }


                const elemento =
                    event.target.closest(
                        "p, h1, h2, h3, h4, h5, h6, label, a, button, li"
                    );


                if (!elemento) return;


                elemento.classList.add(
                    "accessibility-reading-highlight"
                );

            }
        );


        document.addEventListener(
            "mouseout",
            function (event) {

                const elemento =
                    event.target.closest(
                        "p, h1, h2, h3, h4, h5, h6, label, a, button, li"
                    );


                if (!elemento) return;


                elemento.classList.remove(
                    "accessibility-reading-highlight"
                );

            }
        );

    }


    /* =====================================================
       ESPAÇAMENTO
       ===================================================== */

    function alternarEspacamento() {

        configuracao.espacamento =
            !configuracao.espacamento;


        document.documentElement.classList.toggle(
            "accessibility-spacing",
            configuracao.espacamento
        );


        salvarConfiguracao();

        atualizarBotoes();

    }


    /* =====================================================
       CONTRASTE
       ===================================================== */

    function alternarContraste() {

        configuracao.contraste =
            !configuracao.contraste;


        document.documentElement.classList.toggle(
            "accessibility-contrast",
            configuracao.contraste
        );


        salvarConfiguracao();

        atualizarBotoes();

    }


    /* =====================================================
       ANIMAÇÕES
       ===================================================== */

    function alternarMovimento() {

        configuracao.movimento =
            !configuracao.movimento;


        document.documentElement.classList.toggle(
            "accessibility-no-motion",
            configuracao.movimento
        );


        salvarConfiguracao();

        atualizarBotoes();

    }


    /* =====================================================
       ATUALIZAR BOTÕES
       ===================================================== */

    function atualizarBotoes() {

        const mouse =
            document.getElementById(
                "mouseReading"
            );

        const selection =
            document.getElementById(
                "selectionReading"
            );

        const spacing =
            document.getElementById(
                "spacingButton"
            );

        const contrast =
            document.getElementById(
                "contrastButton"
            );

        const motion =
            document.getElementById(
                "motionButton"
            );


        if (mouse) {

            mouse.classList.toggle(
                "active",
                configuracao.leituraMouse
            );

        }


        if (selection) {

            selection.classList.toggle(
                "active",
                configuracao.leituraSelecao
            );

        }


        if (spacing) {

            spacing.classList.toggle(
                "active",
                configuracao.espacamento
            );

        }


        if (contrast) {

            contrast.classList.toggle(
                "active",
                configuracao.contraste
            );

        }


        if (motion) {

            motion.classList.toggle(
                "active",
                configuracao.movimento
            );

        }

    }


    /* =====================================================
       APLICAR CONFIGURAÇÕES
       ===================================================== */

    function aplicarConfiguracao() {

        aplicarFonte();


        document.documentElement.classList.toggle(
            "accessibility-spacing",
            configuracao.espacamento
        );


        document.documentElement.classList.toggle(
            "accessibility-contrast",
            configuracao.contraste
        );


        document.documentElement.classList.toggle(
            "accessibility-no-motion",
            configuracao.movimento
        );

    }


    /* =====================================================
       EVENTOS
       ===================================================== */

    function configurarEventos() {

        const close =
            document.getElementById(
                "accessibilityClose"
            );

        const decrease =
            document.getElementById(
                "fontDecrease"
            );

        const normal =
            document.getElementById(
                "fontNormal"
            );

        const increase =
            document.getElementById(
                "fontIncrease"
            );

        const mouse =
            document.getElementById(
                "mouseReading"
            );

        const selection =
            document.getElementById(
                "selectionReading"
            );

        const stop =
            document.getElementById(
                "stopReading"
            );

        const spacing =
            document.getElementById(
                "spacingButton"
            );

        const contrast =
            document.getElementById(
                "contrastButton"
            );

        const motion =
            document.getElementById(
                "motionButton"
            );


        if (close) {

            close.addEventListener(
                "click",
                alternarPainel
            );

        }


        if (decrease) {

            decrease.addEventListener(
                "click",
                diminuirFonte
            );

        }


        if (normal) {

            normal.addEventListener(
                "click",
                fonteNormal
            );

        }


        if (increase) {

            increase.addEventListener(
                "click",
                aumentarFonte
            );

        }


        if (mouse) {

            mouse.addEventListener(
                "click",
                function () {

                    configuracao.leituraMouse =
                        !configuracao.leituraMouse;


                    salvarConfiguracao();

                    atualizarBotoes();

                }
            );

        }


        if (selection) {

            selection.addEventListener(
                "click",
                function () {

                    configuracao.leituraSelecao =
                        !configuracao.leituraSelecao;


                    salvarConfiguracao();

                    atualizarBotoes();

                }
            );

        }


        if (stop) {

            stop.addEventListener(
                "click",
                pararLeitura
            );

        }


        if (spacing) {

            spacing.addEventListener(
                "click",
                alternarEspacamento
            );

        }


        if (contrast) {

            contrast.addEventListener(
                "click",
                alternarContraste
            );

        }


        if (motion) {

            motion.addEventListener(
                "click",
                alternarMovimento
            );

        }


        /* ESC */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    const painel =
                        document.getElementById(
                            "accessibilityPanel"
                        );


                    if (
                        painel &&
                        painel.classList.contains(
                            "open"
                        )
                    ) {

                        alternarPainel();

                    }

                }

            }
        );


        /* Foco pelo teclado */

        document.addEventListener(
            "keydown",
            function () {

                document.body.classList.add(
                    "accessibility-keyboard"
                );

            }
        );


        document.addEventListener(
            "mousedown",
            function () {

                document.body.classList.remove(
                    "accessibility-keyboard"
                );

            }
        );

    }


    /* =====================================================
       INICIAR
       ===================================================== */

    function iniciar() {

        carregarConfiguracao();

        criarBotao();

        criarPainel();

        criarIndicador();

        aplicarConfiguracao();

        configurarEventos();

        configurarSelecao();

        configurarLeituraMouse();

        configurarDestaque();

        atualizarBotoes();

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciar
        );

    } else {

        iniciar();

    }

})();