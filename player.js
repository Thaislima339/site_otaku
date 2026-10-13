// ==========================================
// DADOS DOS ANIMES
// ==========================================

const dadosAnimes = {

    naruto: {
        nome: "Naruto",
        imagem: "imagens/naruto.jpg"
    },

    "solo-leveling": {
        nome: "Solo Leveling",
        imagem: "imagens/solo-leveling.jpg"
    },

    bleach: {
        nome: "Bleach",
        imagem: "imagens/bleach.jpg"
    },

    "demon-slayer": {
        nome: "Demon Slayer",
        imagem: "imagens/demon-slayer.jpg"
    },

    "jujutsu-kaisen": {
        nome: "Jujutsu Kaisen",
        imagem: "imagens/jujutsu-kaisen.jpg"
    }

};


// ==========================================
// DESCOBRIR ANIME E EPISÓDIO
// ==========================================

const parametros =
    new URLSearchParams(window.location.search);

const animeId =
    parametros.get("anime") || "demon-slayer";

let episodioAtual =
    Number(parametros.get("ep")) || 1;

const anime =
    dadosAnimes[animeId] ||
    dadosAnimes["demon-slayer"];

const totalEpisodios = 12;


// ==========================================
// SALVAR "CONTINUE ASSISTINDO"
// ==========================================

function salvarProgresso() {
    const novoProgresso = {
        id: animeId,
        nome: anime.nome,
        imagem: anime.imagem,
        episodio: episodioAtual
    };

    let historico = JSON.parse(localStorage.getItem("continueAssistindo")) || [];

    // Compatibilidade com a versão anterior, que salvava apenas um objeto.
    if (!Array.isArray(historico)) {
        historico = [historico];
    }

    // Remove a versão antiga deste anime e coloca a atualização em primeiro.
    historico = historico.filter(function (item) {
        return item && item.id !== animeId;
    });

    historico.unshift(novoProgresso);

    localStorage.setItem(
        "continueAssistindo",
        JSON.stringify(historico)
    );
}

// Salva assim que abrir o player.
salvarProgresso();


// ==========================================
// ELEMENTOS
// ==========================================

const playerNome =
    document.getElementById("playerNome");

const playerEpisodio =
    document.getElementById("playerEpisodio");

const videoTitulo =
    document.getElementById("videoTitulo");

const videoStatus =
    document.getElementById("videoStatus");

const tituloAbaixo =
    document.getElementById("tituloAbaixo");

const descricaoAbaixo =
    document.getElementById("descricaoAbaixo");

const videoFundo =
    document.querySelector(".video-fundo");

const voltarAnime =
    document.getElementById("voltarAnime");


// ==========================================
// ATUALIZAR TELA
// ==========================================

function atualizarTela() {

    playerNome.textContent =
        anime.nome;

    playerEpisodio.textContent =
        "Episódio " + episodioAtual;

    videoTitulo.textContent =
        anime.nome;

    tituloAbaixo.textContent =
        anime.nome;

    descricaoAbaixo.textContent =
        "Episódio " +
        episodioAtual +
        " • Legendado";


    document.title =
        anime.nome +
        " - Episódio " +
        episodioAtual +
        " | Otaku";


    videoFundo.style.backgroundImage =
        "linear-gradient(" +
        "rgba(0,0,0,0.50)," +
        "rgba(0,0,0,0.85)" +
        "), url('" +
        anime.imagem +
        "')";


    voltarAnime.href =
        "anime.html?anime=" +
        animeId;


    atualizarBotoes();

    criarListaEpisodios();
}


// ==========================================
// PLAY
// ==========================================

const playGigante =
    document.getElementById("playGigante");

const playControle =
    document.getElementById("playControle");

const progresso =
    document.getElementById("progresso");

const tempoVideo =
    document.getElementById("tempoVideo");


let reproduzindo = false;

let segundos = 0;

let intervalo;


function alternarPlay() {

    reproduzindo = !reproduzindo;


    if (reproduzindo) {

        playGigante.textContent = "❚❚";

        playControle.textContent = "❚❚";

        videoStatus.textContent =
            "Reproduzindo episódio " +
            episodioAtual;


        intervalo =
            setInterval(function () {

                segundos++;


                const porcentagem =
                    Math.min(
                        (segundos / 1440) * 100,
                        100
                    );


                progresso.style.width =
                    porcentagem + "%";


                const minutos =
                    Math.floor(segundos / 60);


                const segundosRestantes =
                    segundos % 60;


                const tempoFormatado =
                    String(minutos)
                        .padStart(2, "0")
                    +
                    ":"
                    +
                    String(segundosRestantes)
                        .padStart(2, "0");


                tempoVideo.textContent =
                    tempoFormatado +
                    " / 24:00";


                if (segundos >= 1440) {

                    clearInterval(intervalo);

                    reproduzindo = false;

                }

            }, 1000);


    } else {

        playGigante.textContent = "▶";

        playControle.textContent = "▶";

        videoStatus.textContent =
            "Pausado";

        clearInterval(intervalo);

    }

}


playGigante.addEventListener(
    "click",
    alternarPlay
);


playControle.addEventListener(
    "click",
    alternarPlay
);


// ==========================================
// ABRIR EPISÓDIO
// ==========================================

function abrirEpisodio(numero) {

    window.location.href =
        "player.html?anime=" +
        animeId +
        "&ep=" +
        numero;

}


// ==========================================
// ANTERIOR / PRÓXIMO
// ==========================================

const anterior =
    document.getElementById(
        "episodioAnterior"
    );


const proximo =
    document.getElementById(
        "proximoEpisodio"
    );


anterior.addEventListener(
    "click",
    function () {

        if (episodioAtual > 1) {

            abrirEpisodio(
                episodioAtual - 1
            );

        }

    }
);


proximo.addEventListener(
    "click",
    function () {

        if (
            episodioAtual <
            totalEpisodios
        ) {

            abrirEpisodio(
                episodioAtual + 1
            );

        }

    }
);


function atualizarBotoes() {

    anterior.disabled =
        episodioAtual === 1;


    proximo.disabled =
        episodioAtual ===
        totalEpisodios;

}


// ==========================================
// LISTA DE EPISÓDIOS
// ==========================================

const miniEpisodios =
    document.getElementById(
        "miniEpisodios"
    );


function criarListaEpisodios() {

    miniEpisodios.innerHTML = "";


    for (
        let numero = 1;
        numero <= totalEpisodios;
        numero++
    ) {

        const botao =
            document.createElement(
                "button"
            );


        botao.textContent =
            "Episódio " + numero;


        if (
            numero === episodioAtual
        ) {

            botao.classList.add(
                "episodio-ativo"
            );

        }


        botao.addEventListener(
            "click",
            function () {

                abrirEpisodio(numero);

            }
        );


        miniEpisodios.appendChild(
            botao
        );

    }

}


// ==========================================
// TELA CHEIA
// ==========================================

const telaCheia =
    document.getElementById(
        "telaCheia"
    );


telaCheia.addEventListener(
    "click",
    function () {

        const player =
            document.querySelector(
                ".video-player"
            );


        if (
            !document.fullscreenElement
        ) {

            player.requestFullscreen();

        } else {

            document.exitFullscreen();

        }

    }
);


// ==========================================
// INICIAR
// ==========================================

atualizarTela();