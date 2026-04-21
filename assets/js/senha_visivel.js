const senhaCapturada = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const icon = toggleSenha.querySelector("i");

toggleSenha.addEventListener("click", function () {
    if (senhaCapturada.type === "password") {
        senhaCapturada.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        senhaCapturada.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});
