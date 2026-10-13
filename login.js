const formulario =
    document.getElementById("formLogin");

const mensagem =
    document.getElementById("mensagemLogin");


formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


        const senha =
            document
                .getElementById("loginSenha")
                .value;


        // PEGAR USUÁRIOS

        const usuarios =
            JSON.parse(
                localStorage.getItem("usuarios")
            ) || [];


        // PROCURAR USUÁRIO

        const usuarioEncontrado =
            usuarios.find(
                function (usuario) {

                    return (
                        usuario.email === email &&
                        usuario.senha === senha
                    );

                }
            );


        // NÃO ENCONTROU

        if (!usuarioEncontrado) {

            mensagem.textContent =
                "❌ E-mail ou senha incorretos.";

            mensagem.className =
                "mensagem-login erro";

            return;

        }


        // SALVAR QUEM ESTÁ LOGADO

        const usuarioLogado = {

            nome:
                usuarioEncontrado.nome,

            email:
                usuarioEncontrado.email

        };


        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioLogado)
        );


        mensagem.textContent =
            "✅ Login realizado!";

        mensagem.className =
            "mensagem-login sucesso";


        // VOLTAR PARA HOME

        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            800
        );

    }
);