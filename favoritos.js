// ========================================
// DADOS DOS ANIMES
// ========================================

const animes = {

    naruto: {

        nome: "Naruto",

        imagem:
            "imagens/naruto.jpg",

        nota: "⭐ 9.1",

        genero:
            "Ação • Aventura"

    },


    "solo-leveling": {

        nome: "Solo Leveling",

        imagem:
            "imagens/solo-leveling.jpg",

        nota: "⭐ 9.4",

        genero:
            "Ação • Fantasia"

    },


    bleach: {

        nome: "Bleach",

        imagem:
            "imagens/bleach.jpg",

        nota: "⭐ 8.9",

        genero:
            "Ação • Sobrenatural"

    },


    "demon-slayer": {

        nome: "Demon Slayer",

        imagem:
            "imagens/demon-slayer.jpg",

        nota: "⭐ 9.0",

        genero:
            "Ação • Fantasia"

    },


    "jujutsu-kaisen": {

        nome: "Jujutsu Kaisen",

        imagem:
            "imagens/jujutsu-kaisen.jpg",

        nota: "⭐ 8.8",

        genero:
            "Ação • Sobrenatural"

    }

};


// ========================================
// PEGAR FAVORITOS SALVOS
// ========================================

let favoritos =
    JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const lista =
    document.getElementById(
        "listaFavoritos"
    );


const vazio =
    document.getElementById(
        "favoritosVazio"
    );


// ========================================
// MOSTRAR FAVORITOS
// ========================================

function mostrarFavoritos() {

    lista.innerHTML = "";


    // SE NÃO EXISTIR NENHUM

    if (favoritos.length === 0) {

        vazio.style.display = "block";

        return;

    }


    vazio.style.display = "none";


    // CRIAR OS CARDS

    favoritos.forEach(
        function (idAnime) {

            const anime =
                animes[idAnime];


            if (!anime) {
                return;
            }


            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "favorito-card"
            );


            card.innerHTML = `

                <div class="favorito-imagem">

                    <img
                        src="${anime.imagem}"
                        alt="${anime.nome}"
                    >

                    <span>
                        ${anime.nota}
                    </span>

                </div>


                <div class="favorito-info">

                    <h2>
                        ${anime.nome}
                    </h2>

                    <p>
                        ${anime.genero}
                    </p>


                    <div class="favorito-botoes">

                        <button
                            class="abrir-anime"
                        >
                            ▶ Ver anime
                        </button>


                        <button
                            class="remover-favorito"
                        >
                            ♥ Remover
                        </button>

                    </div>

                </div>

            `;


            // ABRIR ANIME

            const abrir =
                card.querySelector(
                    ".abrir-anime"
                );


            abrir.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "anime.html?anime=" +
                        idAnime;

                }
            );


            // REMOVER

            const remover =
                card.querySelector(
                    ".remover-favorito"
                );


            remover.addEventListener(
                "click",
                function () {

                    favoritos =
                        favoritos.filter(
                            function (item) {

                                return item !==
                                    idAnime;

                            }
                        );


                    localStorage.setItem(
                        "favoritos",
                        JSON.stringify(
                            favoritos
                        )
                    );


                    mostrarFavoritos();

                }
            );


            lista.appendChild(card);

        }
    );

}


// ========================================
// INICIAR
// ========================================

mostrarFavoritos();