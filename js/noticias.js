
/* =========================================================
   NOTÍCIAS
========================================================= */

const news = [

    {
        tag: "NACIONAL · 10/08/2026",
        title: "Homem é preso suspeito de arremessar copo de vidro contra a companheira durante discussão em Porangaba",
        text: "Apesar da tentativa, o copo não atingiu a mulher, que relatou já ter sofrido violência doméstica pelo marido anteriormente.",
        image: "img/img1.jpg"
    },

    {
        tag: "NACIONAL · 31/07/2026",
        title: "Homem acusado de crimes contra 20 mulheres é preso após irmã expor os casos",
        text: "Homem de 47 anos é investigado por violência doméstica e sexual no RS; página criada pela irmã fez surgir dezenas de novos relatos.",
        image: "img/img2.jpg"
    },

    {
        tag: "NACIONAL · 05/08/2026",
        title: "Mulher denuncia violência doméstica durante atendimento médico e homem é preso em Marília",
        text: "Vítima com ferimentos graves no rosto conseguiu pedir ajuda a funcionários longe do suspeito, na noite de sábado (12). Agressor foi detido na sala de espera de hospital. Ele responderá por violência doméstica, lesão corporal e ameaça.",
        image: "img/img3.avif"
    },

    {
        tag: "NACIONAL · 23/04/2024",
        title: "Médico é condenado a 10 anos de prisão por violação sexual de três mulheres durante exames ginecológicos",
        text: "O juiz Marcio Soares da Cunha, da 3ª Vara Criminal de Palmas, condenou a 10 anos e seis meses de prisão, em regime fechado, o médico de 65 anos acusado do crime de violação sexual mediante fraude contra três vítimas mulheres, durante exames ginecológicos realizados entre 2016 e 2022.",
        image: "img/img4.jpg"
    },

    {
        tag: "NACIONAL · 12/04/2019",
        title: "Homem é condenado a 100 anos de prisão por abuso sexual de filhas e enteada em Itapoá",
        text: "Um homem de 47 anos foi condenado, esta semana, a 100 anos, quatro meses e 15 dias de reclusão por abusar, ao longo de diversos anos, de duas filhas biológicas e uma enteada no município de Itapoá, norte de Santa Catarina.",
        image: "img/img5.jpg"
    },

    {
        tag: "NACIONAL · 08/08/2026",
        title: "Homem é preso após quebrar móveis e agredir companheira na frente dos filhos no interior de SP",
        text: "Segundo a Polícia Militar, os cinco filhos da vítima presenciaram as agressões na casa da família em Registro (SP). Ela possuía medida protetiva contra ele.",
        image: "img/img6.png"
    }

];


/* =========================================================
   RENDERIZAR NOTÍCIAS
========================================================= */

function renderNews() {

    const newsGrid = document.getElementById("newsGrid");

    if (!newsGrid) return;

    newsGrid.innerHTML = news.map((item, index) => 

        <div class="card news-card">

            <div class="news-thumb">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    onerror="this.style.display='none';"
                >

            </div>

            <div class="news-body">

                <div class="news-meta">
                    ${item.tag}
                </div>

                <h4>
                    ${item.title}
                </h4>

                <p>
                    ${item.text}
                </p>

                <div class="news-actions">

                    <button
                        class="chip-btn"
                        type="button"
                        onclick="toggleComments(${index})"
                    >
                        💬 Comentários
                    </button>

                    <button
                        class="chip-btn"
                        type="button"
                        onclick="shareNews(${index})"
                    >
                        ↗ Compartilhar
                    </button>

                </div>


                <div
                    class="comments hidden"
                    id="comments-${index}"
                >

                    <div class="comment">

                        <div class="avatar">
                            MC
                        </div>

                        <div>

                            <div class="comment-name">
                                Maria C.
                            </div>

                            <div class="comment-body">
                                Bom ficarmos atentas!
                            </div>

                        </div>

                    </div>


                    <div class="comment">

                        <div class="avatar">
                            JR
                        </div>

                        <div>

                            <div class="comment-name">
                                Julia R.
                            </div>

                            <div class="comment-body">
                                Obrigada por divulgar.
                            </div>

                        </div>

                    </div>


                    <div class="comment-form">

                        <input
                            type="text"
                            placeholder="Escrever um comentário..."
                            aria-label="Escrever um comentário"
                            maxlength="300"
                        >

                        <button
                            type="button"
                            onclick="sendComment(${index})"
                        >
                            Enviar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    ).join("");

}


/* =========================================================
   COMENTÁRIOS
========================================================= */

function toggleComments(index) {

    const comments = document.getElementById(`comments-${index}`);

    if (!comments) return;

    comments.classList.toggle("hidden");

}


/* =========================================================
   COMPARTILHAR
========================================================= */

function shareNews(index) {

    const item = news[index];

    if (!item) return;

    const text = `${item.title}\n\n${item.text}`;

    if (navigator.share) {

        navigator.share({
            title: item.title,
            text: text,
            url: window.location.href
        }).catch(() => {});

        return;
    }

    if (navigator.clipboard) {

        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Texto da notícia copiado!");
            })
            .catch(() => {
                alert("Não foi possível copiar a notícia.");
            });

        return;
    }

    alert("Não foi possível compartilhar a notícia.");

}


/* =========================================================
   ENVIAR COMENTÁRIO
========================================================= */

function sendComment(index) {

    const container = document.getElementById(`comments-${index}`);

    if (!container) return;

    const input = container.querySelector(".comment-form input");

    if (!input) return;

    const value = input.value.trim();

    if (!value) {

        alert("Digite um comentário antes de enviar.");

        input.focus();

        return;
    }

    const comment = document.createElement("div");

    comment.className = "comment";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "VC";

    const content = document.createElement("div");

    const name = document.createElement("div");
    name.className = "comment-name";
    name.textContent = "Você";

    const body = document.createElement("div");
    body.className = "comment-body";
    body.textContent = value;

    content.appendChild(name);
    content.appendChild(body);

    comment.appendChild(avatar);
    comment.appendChild(content);

    const form = container.querySelector(".comment-form");

    container.insertBefore(comment, form);

    input.value = "";

    input.focus();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderNews();

});

