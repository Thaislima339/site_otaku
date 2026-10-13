const formulario =
    document.getElementById("formCadastro");

const mensagem =
    document.getElementById("mensagemCadastro");


formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const nome =
            document
                .getElementById("cadastroNome")
                .value
                .trim();


        const email =
            document
                .getElementById("cadastroEmail")
                .value
                .trim()
                .toLowerCase();


        const senha =
            document
                .getElementById("cadastroSenha")
                .value;


        const confirmar =
            document
                .getElementById("confirmarSenha")
                .value;


        // CONFERE AS SENHAS

        if (senha !== confirmar) {

            mensagem.textContent =
                "❌ As senhas não são iguais.";

            mensagem.className =
                "mensagem-login erro";

            return;

        }


        // PEGAR USUÁRIOS SALVOS

        let usuarios =
            JSON.parse(
                localStorage.getItem("usuarios")
            ) || [];


        // VERIFICAR E-MAIL

        const emailExiste =
            usuarios.some(
                function (usuario) {

                    return usuario.email === email;

                }
            );


        if (emailExiste) {

            mensagem.textContent =
                "❌ Já existe uma conta com este e-mail.";

            mensagem.className =
                "mensagem-login erro";

            return;

        }


        // CRIAR USUÁRIO

        const novoUsuario = {

            nome: nome,

            email: email,

            senha: senha

        };


        usuarios.push(novoUsuario);


        // SALVAR

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        mensagem.textContent =
            "✅ Conta criada! Redirecionando...";

        mensagem.className =
            "mensagem-login sucesso";


        // IR PARA LOGIN

        setTimeout(
            function () {

                window.location.href =
                    "login.html";

            },
            1200
        );

    }
);