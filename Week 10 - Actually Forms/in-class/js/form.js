function preprocessForm(form) {
    const formData = new FormData(form);
    const password = formData.get("password");
    const cipher = encrypt(password);
    formData.set("password", cipher);
    console.log(password, cipher);
}

function interceptForm(formId) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        preprocessForm(form);
    });
}

function onWindowLoad() {
    interceptForm("signup-form");
}

window.addEventListener("load", onWindowLoad);