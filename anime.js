// ========================================
// BANCO DE DADOS DOS ANIMES
// ========================================

const animes = {

    naruto: {
        nome: "Naruto",
        imagem: "imagens/naruto.jpg",
        nota: "⭐ 9.1",
        ano: "📅 2002",
        genero: "🎬 Ação • Aventura",

        descricao:
            "Naruto Uzumaki é um jovem ninja que sonha em se tornar Hokage e conquistar o respeito de sua vila."
    },

    "solo-leveling": {
        nome: "Solo Leveling",
        imagem: "imagens/solo-leveling.jpg",
        nota: "⭐ 9.4",
        ano: "📅 2024",
        genero: "🎬 Ação • Fantasia",

        descricao:
            "Sung Jinwoo era considerado o caçador mais fraco, até receber uma habilidade misteriosa que permite aumentar seu poder."
    },

    bleach: {
        nome: "Bleach",
        imagem: "imagens/bleach.jpg",
        nota: "⭐ 8.9",
        ano: "📅 2004",
        genero: "🎬 Ação • Sobrenatural",

        descricao:
            "Ichigo Kurosaki recebe poderes de um Shinigami e passa a proteger humanos de espíritos malignos."
    },

    "demon-slayer": {
        nome: "Demon Slayer",
        imagem: "imagens/demon-slayer.jpg",
        nota: "⭐ 9.0",
        ano: "📅 2019",
        genero: "🎬 Ação • Fantasia",

        descricao:
            "Tanjiro Kamado inicia uma perigosa jornada para enfrentar demônios e encontrar uma maneira de salvar sua irmã Nezuko."
    },

    "jujutsu-kaisen": {
        nome: "Jujutsu Kaisen",
        imagem: "imagens/jujutsu-kaisen.jpg",
        nota: "⭐ 8.8",
        ano: "📅 2020",
        genero: "🎬 Ação • Sobrenatural",

        descricao:
            "Yuji Itadori entra no mundo da feitiçaria depois de se envolver com uma poderosa maldição."
    }

};


// ========================================
// DESCOBRIR QUAL ANIME FOI ESCOLHIDO
// ========================================

const parametros =
    new URLSearchParams(window.location.search);


const animeEscolhido =
    parametros.get("anime") || "demon-slayer";


const anime =
    animes[animeEscolhido] ||
    animes["demon-slayer"];


// ========================================
// MOSTRAR AS INFORMAÇÕES
// ========================================

document.getElementById("animeNome")
    .textContent = anime.nome;


document.getElementById("animeImagem")
    .src = anime.imagem;


document.getElementById("animeNota")
    .textContent = anime.nota;


document.getElementById("animeAno")
    .textContent = anime.ano;


document.getElementById("animeGenero")
    .textContent = anime.genero;


document.getElementById("animeDescricao")
    .textContent = anime.descricao;


document.title =
    anime.nome + " | Otaku";


// ========================================
// BOTÃO ASSISTIR
// ========================================

const assistir =
    document.getElementById("assistirAnime");


assistir.addEventListener(
    "click",
    function () {

        window.location.href =
            "player.html?anime=" +
            animeEscolhido +
            "&ep=1";

    }
);


// ========================================
// FAVORITOS SALVOS
// ========================================

const favorito =
    document.getElementById("favorito");


// Pega os favoritos que já estavam salvos
let favoritos =
    JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];


// Verifica se este anime já está favoritado
function atualizarFavorito() {

    if (
        favoritos.includes(animeEscolhido)
    ) {

        favorito.classList.add(
            "favoritado"
        );

        favorito.textContent =
            "♥ Favoritado";

    } else {

        favorito.classList.remove(
            "favoritado"
        );

        favorito.textContent =
            "♡ Favoritar";

    }

}


// Quando clicar no coração
favorito.addEventListener(
    "click",
    function () {

        if (
            favoritos.includes(
                animeEscolhido
            )
        ) {

            // Remove dos favoritos

            favoritos =
                favoritos.filter(
                    function (item) {

                        return item !==
                            animeEscolhido;

                    }
                );

        } else {

            // Adiciona aos favoritos

            favoritos.push(
                animeEscolhido
            );

        }


        // Salva no navegador

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );


        // Atualiza o botão

        atualizarFavorito();

    }
);


// Executa quando abrir a página
atualizarFavorito();


// ========================================
// EPISÓDIOS
// ========================================

const episodios =
    document.querySelectorAll(
        ".episodio-anime"
    );


episodios.forEach(
    function (episodio, indice) {

        episodio.addEventListener(
            "click",
            function () {

                const numero =
                    indice + 1;


                window.location.href =
                    "player.html?anime=" +
                    animeEscolhido +
                    "&ep=" +
                    numero;

            }
        );

    }
);