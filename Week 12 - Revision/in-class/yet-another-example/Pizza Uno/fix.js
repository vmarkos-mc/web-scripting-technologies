function isPasswordValid(password) {
    if (password.length < 8)
        return false;
    let containsLetter = false, containsNumber = false, containsSpecial = false;
    let c;
    for (let i = 0; i < password.length; i++) {
        c = password.charCodeAt(i);
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122))
            containsLetter = true;
        else if (c >= 48 && c <= 57)
            containsNumber = true;
        else if ((c >= 58 && c <= 64) || (c >= 33 && c <= 47) || (c >= 91 && c <= 96))
            containsSpecial = true;
        if (containsLetter && containsNumber && containsSpecial)
            return true;
    }
    return false;
}


function prohibitSubmission() {
    const submitButton = document.getElementById("submit-registration");
    submitButton.disabled = true;
    submitButton.classList.add("faded");
}


function allowSubmission() {
    const submitButton = document.getElementById("submit-registration");
    submitButton.disabled = false;
    submitButton.classList.remove("faded");
}


function validatePassword(event) {
    const passwordElement = event.target;
    const password = passwordElement.value;
    if (isPasswordValid(password))
        allowSubmission();
    else
        prohibitSubmission();
}


function attachEventListeners() {
    document.getElementById("password").addEventListener("keyup", validatePassword);
}


function loadFixes() {
    // Load any fixes implemented
    attachEventListeners()
}

window.addEventListener("load", loadFixes);