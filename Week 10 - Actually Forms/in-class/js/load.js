function loadNavbar() {
    const body = document.body; // We can skip this, if we want to.
    const main = body.firstChild;
    insertComponent("html/navbar.html", body, main);// Somehow load navbar html
}


function insertComponent(path, parent, child) {
    const request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.addEventListener("readystatechange", () => {
        // Basic exception handling
        if (this.status !== 200) {
            console.log(this.status);
            return;
        }
        console.log("status 200");
        const componentHTML = this.responseText;
        parent.insertBefore(componentHTML, child)
    });
    request.send();
}


function onPageLoad() {
    loadNavbar();
}


window.addEventListener("load", onPageLoad);