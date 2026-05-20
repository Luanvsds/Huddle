const form = document.getElementById("meu-form");

const dataNascimento = document.getElementById("dataNascimento");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const requisitosSenha = document.getElementById("requisitosSenha");



dataNascimento.addEventListener("input", validarIdade);
email.addEventListener("input", validarEmailCampo);
senha.addEventListener("input", validarSenha);



form.addEventListener("submit", function (event) {
    event.preventDefault();

    const valido =
        validarIdade() &&
        validarEmailCampo() &&
        validarSenha();

    if (valido) {
        form.submit();
    }
});


function validarEmailCampo() {
    const valor = email.value.trim();

    if (valor === "" || !validarEmail(valor)) {
        email.classList.add("is-invalid");
        return false;
    }

    email.classList.remove("is-invalid");
    return true;
}


function validarSenha() {
    const valor = senha.value;

    let valido = true;

    if (valor.length >= 12) {
        marcarValido(reqTamanho);
    } else {
        marcarInvalido(reqTamanho);
        valido = false;
    }

    if (/[A-Z]/.test(valor)) {
        marcarValido(reqMaiuscula);
    } else {
        marcarInvalido(reqMaiuscula);
        valido = false;
    }

    if (/[a-z]/.test(valor)) {
        marcarValido(reqMinuscula);
    } else {
        marcarInvalido(reqMinuscula);
        valido = false;
    }

    if (/[0-9]/.test(valor)) {
        marcarValido(reqNumero);
    } else {
        marcarInvalido(reqNumero);
        valido = false;
    }

    if (/[^A-Za-z0-9]/.test(valor)) {
        marcarValido(reqEspecial);
    } else {
        marcarInvalido(reqEspecial);
        valido = false;
    }


    if (valido) {
        senha.classList.remove("is-invalid");
        requisitosSenha.classList.add("d-none");
    } else {
        senha.classList.add("is-invalid");
        requisitosSenha.classList.remove("d-none");
    }


    return valido;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


function validarIdade() {
    if (!dataNascimento.value) {
        dataNascimento.classList.add("is-invalid");
        return false;
    }

    const hoje = new Date();
    const nascimento = new Date(dataNascimento.value);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {
        dataNascimento.classList.add("is-invalid");
        return false;
    }

    dataNascimento.classList.remove("is-invalid");
    return true;
}

function marcarValido(elemento) {
    elemento.classList.remove("text-danger");
    elemento.classList.add("text-success");
    elemento.textContent = elemento.textContent.replace("✖", "✔");
}

function marcarInvalido(elemento) {
    elemento.classList.remove("text-success");
    elemento.classList.add("text-danger");
    elemento.textContent = elemento.textContent.replace("✔", "✖");
}
