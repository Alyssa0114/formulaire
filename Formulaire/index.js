const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
const progressBar = document.querySelector("#progress-bar")
const form = document.querySelector("form");
let pseudo, email, password, confirmPass;
function errorDisplay(tag, message, valid) {
    const container = document.querySelector(`.${tag}-container`);
    const span = document.querySelector(`.${tag}-container > span`);
    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    }
    else {
        container.classList.remove("error");
        span.textContent = message;
    }

}
function pseudoController(value) {
    const tag = "pseudo";
    if (value.length === 0) {
        errorDisplay(tag, "le pseudo est vide");
    }
    else if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay(tag, "le pseudo doit faire entre 3 et 20 caractéres");
        pseudo = null;
    }
    else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        pseudo = null;
        errorDisplay(tag, "le pseudo ne doit pas contenir de caractere spécieaux ");
    }
    else {
        pseudo = value;
        errorDisplay(tag, "", true);
    }
}



function emailController(value) {
    const tag = "email"
    if (value.length === 0) {
        errorDisplay(tag, "le pseudo est vide");
    }
    else if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        errorDisplay(tag, "l'email n'est pas valide")
        email = null;
    }
    else {
        errorDisplay(tag, "", true);
        email = value;
    }
}
function passwordController(value) {
    const tag = "password"
    progressBar.classList = "";
    if (value.length === 0) {
        errorDisplay(tag, "le pseudo est vide");
    }
    if (
        !value.match(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
    ) {
        errorDisplay(tag, "min 8 cara 1 Maj 1 chiffre et 1carac spé");
        password = null;
        progressBar.classList.add("progressRed");
    }
    else if (value.length <= 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay(tag, "", true);
        password = value;
    }
    else {
        progressBar.classList.add("progressGreen");
        errorDisplay(tag, "", true)
        password = value
    }
    if (confirmPass) confirmController(confirmPass);
}
function confirmController(value) {
    const tag = "confirm";

    if (value.length === 0) {
        errorDisplay(tag, "le pseudo est vide");
    }
    else if (!(value === password)) {
        errorDisplay(tag, "les deux mots de passe ne sont pas identique");
        confirmPass = false;
    }
    else {
        errorDisplay(tag, "", true);
        confirmPass = true
    }

}

inputs.forEach((input) => {
    input.addEventListener('input', (e) => {

        switch (e.target.id) {
            case "pseudo":
                pseudoController(e.target.value);
                break;
            case "email":
                emailController(e.target.value);
                break;
            case "password":
                passwordController(e.target.value);
                break;
            case "confirm":
                confirmController(e.target.value);
                break;
            default: null
        }

    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pseudo && email && password && confirmPass) {

        const data = {
            pseudo: pseudo,
            email: email,
            password: password,
        }
        inputs.forEach((input) => input.value = "");
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        progressBar.classList = "";
        console.log(data);
    }
    else {
        alert("erreur");
    }
})