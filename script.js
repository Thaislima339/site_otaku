// ==========================================
// ELEMENTOS PRINCIPAIS
// ==========================================

const campoPesquisa =
    document.querySelector(".pesquisa input");

const cards =
    document.querySelectorAll(".card");


// ==========================================
// LINKS DOS ANIMES
// ==========================================

const linksAnimes = {

    "Naruto":
        "naruto",

    "Solo Leveling":
        "solo-leveling",

    "Bleach":
        "bleach",

    "Demon Slayer":
        "demon-slayer",

    "Jujutsu Kaisen":
        "jujutsu-kaisen"

};


// ==========================================
// PESQUISA
// ==========================================

campoPesquisa.addEventListener(
    "input",
    function () {

        const texto =
            campoPesquisa
                .value
                .toLowerCase()
                .trim();


        cards.forEach(
            function (card) {

                const nome =
                    card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();


                if (
                    nome.includes(texto)
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);


// ==========================================
// CARDS
// ==========================================

// Cada card possui seu próprio ID no HTML.
// Assim o clique não depende do texto/nome exibido.
function abrirCardAnime(card) {
    const animeId = card.dataset.anime;

    if (animeId) {
        window.location.href =
            "anime.html?anime=" + animeId;
    }
}

cards.forEach(function (card) {
    card.addEventListener("click", function () {
        abrirCardAnime(card);
    });

    // Também permite abrir com Enter no teclado.
    card.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            abrirCardAnime(card);
        }
    });
});


// ==========================================
// BANNER
// ==========================================

const assistir =
    document.querySelector(".assistir");


const detalhes =
    document.querySelector(".detalhes");


assistir.addEventListener(
    "click",
    function () {

        window.location.href =
            "anime.html?anime=demon-slayer";

    }
);


detalhes.addEventListener(
    "click",
    function () {

        window.location.href =
            "anime.html?anime=demon-slayer";

    }
);


// ==========================================
// EPISÓDIOS DA HOME
// ==========================================

const botoesEpisodios =
    document.querySelectorAll(
        ".episodio button"
    );


botoesEpisodios.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const episodio =
                    botao.closest(
                        ".episodio"
                    );


                const nome =
                    episodio
                        .querySelector("h3")
                        .textContent;


                const link =
                    linksAnimes[nome];


                if (link) {

                    window.location.href =
                        "anime.html?anime=" +
                        link;

                }

            }
        );

    }
);


// ==========================================
// SISTEMA DE USUÁRIO
// ==========================================

const botaoLogin =
    document.getElementById(
        "botaoLogin"
    );


const usuarioLogadoArea =
    document.getElementById(
        "usuarioLogado"
    );


const botaoUsuario =
    document.getElementById(
        "botaoUsuario"
    );


const menuUsuario =
    document.getElementById(
        "menuUsuario"
    );


const nomeUsuario =
    document.getElementById(
        "nomeUsuario"
    );


const nomeMenu =
    document.getElementById(
        "nomeMenu"
    );


const emailMenu =
    document.getElementById(
        "emailMenu"
    );


const botaoSair =
    document.getElementById(
        "botaoSair"
    );


// ==========================================
// VERIFICAR LOGIN
// ==========================================

const usuario =
    JSON.parse(
        localStorage.getItem(
            "usuarioLogado"
        )
    );


if (usuario) {

    // ESCONDE LOGIN

    botaoLogin.style.display =
        "none";


    // MOSTRA USUÁRIO

    usuarioLogadoArea.style.display =
        "block";


    // PRIMEIRO NOME

    const primeiroNome =
        usuario.nome
            .split(" ")[0];


    nomeUsuario.textContent =
        "Olá, " + primeiroNome;


    nomeMenu.textContent =
        usuario.nome;


    emailMenu.textContent =
        usuario.email;


} else {

    botaoLogin.style.display =
        "block";


    usuarioLogadoArea.style.display =
        "none";

}


// ==========================================
// BOTÃO LOGIN
// ==========================================

botaoLogin.addEventListener(
    "click",
    function () {

        window.location.href =
            "login.html";

    }
);


// ==========================================
// ABRIR MENU DO USUÁRIO
// ==========================================

botaoUsuario.addEventListener(
    "click",
    function (evento) {

        evento.stopPropagation();


        menuUsuario.classList.toggle(
            "aberto"
        );

    }
);


// ==========================================
// FECHAR MENU CLICANDO FORA
// ==========================================

document.addEventListener(
    "click",
    function () {

        menuUsuario.classList.remove(
            "aberto"
        );

    }
);


// ==========================================
// SAIR
// ==========================================

botaoSair.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "usuarioLogado"
        );


        window.location.href =
            "index.html";

    }
);


console.log(
    "🎌 Otaku carregado!"
);
// ==========================================
// CONTINUE ASSISTINDO
// ==========================================

const secaoContinue = document.getElementById("continueAssistindo");
const continueLista = document.getElementById("continueLista");

function carregarHistorico() {
    let historico = JSON.parse(localStorage.getItem("continueAssistindo")) || [];

    // Converte automaticamente o formato antigo para o novo.
    if (!Array.isArray(historico)) {
        historico = [historico];
        localStorage.setItem("continueAssistindo", JSON.stringify(historico));
    }

    historico = historico.filter(function (item) {
        return item && item.id && item.nome;
    });

    continueLista.innerHTML = "";

    if (historico.length === 0) {
        secaoContinue.style.display = "none";
        return;
    }

    secaoContinue.style.display = "block";

    historico.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "continue-card";

        const imagem = document.createElement("div");
        imagem.className = "continue-imagem";
        imagem.style.backgroundImage =
            "linear-gradient(0deg, rgba(0,0,0,.75), rgba(0,0,0,.08)), url('" +
            item.imagem +
            "')";

        const remover = document.createElement("button");
        remover.className = "remover-historico";
        remover.type = "button";
        remover.title = "Remover do histórico";
        remover.textContent = "✕";

        remover.addEventListener("click", function (evento) {
            evento.stopPropagation();

            const atualizado = historico.filter(function (animeSalvo) {
                return animeSalvo.id !== item.id;
            });

            localStorage.setItem("continueAssistindo", JSON.stringify(atualizado));
            carregarHistorico();
        });

        imagem.appendChild(remover);

        const info = document.createElement("div");
        info.className = "continue-info";

        const etiqueta = document.createElement("span");
        etiqueta.textContent = "CONTINUE DE ONDE PAROU";

        const nome = document.createElement("h3");
        nome.textContent = item.nome;

        const episodio = document.createElement("p");
        episodio.textContent = "Episódio " + item.episodio;

        const continuar = document.createElement("button");
        continuar.type = "button";
        continuar.textContent = "▶ Continuar";

        continuar.addEventListener("click", function () {
            window.location.href =
                "player.html?anime=" + item.id + "&ep=" + item.episodio;
        });

        info.append(etiqueta, nome, episodio, continuar);
        card.append(imagem, info);
        continueLista.appendChild(card);
    });
}

carregarHistorico();


// ==========================================
// MENU LATERAL (BOTÃO ☰)
// ==========================================
const abrirMenuLateral = document.getElementById("abrirMenuLateral");
const fecharMenuLateral = document.getElementById("fecharMenuLateral");
const menuLateral = document.getElementById("menuLateral");
const menuOverlay = document.getElementById("menuOverlay");
const linkContaLateral = document.getElementById("linkContaLateral");

function abrirMenu() {
    menuLateral.classList.add("aberto");
    menuOverlay.classList.add("aberto");
    menuLateral.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-aberto");
}

function fecharMenu() {
    menuLateral.classList.remove("aberto");
    menuOverlay.classList.remove("aberto");
    menuLateral.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-aberto");
}

abrirMenuLateral.addEventListener("click", abrirMenu);
fecharMenuLateral.addEventListener("click", fecharMenu);
menuOverlay.addEventListener("click", fecharMenu);

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fecharMenu();
});

menuLateral.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

const usuarioMenuLateral = JSON.parse(localStorage.getItem("usuarioLogado"));
if (usuarioMenuLateral) {
    const primeiroNomeLateral = usuarioMenuLateral.nome.split(" ")[0];
    linkContaLateral.textContent = "👤 Olá, " + primeiroNomeLateral;
    linkContaLateral.href = "favoritos.html";
}
