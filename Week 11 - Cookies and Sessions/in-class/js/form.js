function preprocessForm(form) {
    const formData = new FormData(form);
    const password = formData.get("password");
    const cipher = encrypt(password);
    formData.set("password", cipher);
    if (!isCaptchaValid()) {
        location.reload();
    }
    const registered = registerUser(formData.get("email"), cipher);
    if (!registered) {
        return false;
    }
    return true;
}


function registerUser(username, password) {
    let user = localStorage.getItem(username);
    if (user !== null) {
        return false;
    }
    localStorage.setItem(username, password);
    return true;
}


function interceptForm(formId) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", (event) => {
        // event.preventDefault();
        const preprocessed = preprocessForm(form);
        console.log(preprocessed);
        if (!preprocessed) {
            // In case user already exists, reload page (bad practice)
            alert("User already exists!");
            event.preventDefault();
            location.reload();
        }
    });
}

function onWindowLoad() {
    interceptForm("signup-form");
}

window.addEventListener("load", onWindowLoad);