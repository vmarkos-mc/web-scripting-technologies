let CAPTCHA;

function updateCaptcha() {
    CAPTCHA = getCaptcha();
    const captchaCanvas = document.getElementById("captcha-canvas");
    const ctx = captchaCanvas.getContext("2d");
    ctx.fillStyle = "white";
    const width = captchaCanvas.width;
    const height = captchaCanvas.height;
    ctx.fillRect(0, 0, width, height);
    ctx.font = "14pt serif";
    ctx.fillStyle = "black";
    let randChar, y, x = width / 4;
    CAPTCHA.forEach((c) => {
        y = 0.5 + 0.5 * Math.random();
        ctx.fillText(c, x, y * height);
        x += width / 8;
    });
}


function isCaptchaValid() {
    const captchaInput = document.getElementById("captcha");
    const captchaText = captchaInput.value;
    return captchaText == CAPTCHA.join("");
}


function getCaptcha() {
    const captcha = [];
    for (let i = 0; i < 5; i++) {
        captcha.push(getRandomALNUM());
    }
    return captcha;
}


function getRandomALNUM() {
    // 0-9: 48-57   --> 10 chars
    // A-Z: 65-90   --> 26 chars
    // a-z: 97-122  --> 26 chars
    // In total:    --> 62 chars
    const i = randomInt(0, 61); // There are 62 integers in [0, 61]
    let charCode;
    if (i < 10) {
        charCode = 48 + i; // ASCII digit char code.
    } else if (i < 36) {
        charCode =  65 + (i - 10); // ASCII A-Z char code.
    } else {
        charCode = 97 + (i - 36); // ASCII a-z char code.
    }
    return String.fromCharCode(charCode);
}


function randomInt(a, b) {
    // Quick and dirty, but incorrect, since a and b have half 
    // the probability of the rest integers in the interval.
    // return Math.round(a + (b - a) * Math.random());

    // Example: a = 3, b = 7.
    // a - b + 1 = 7 - 3 + 1 = 5.
    // (a - b) * Math.random() --> random float in [0,5).
    // a - 0.5 = 2.5.
    // a - 0.5 + (b - a + 1) * Math.random() --> [2.5,7.5)
    // So, rounding, this means: [3, 7] (since 7.5 is not included)
    // [2.5,3.5) --> 3
    // [3.5,4.5) --> 4
    // [4.5,5.5) --> 5
    // [5.5,6.5) --> 6
    // [6.5,7.5) --> 7
    return Math.round(a - 0.5 + (b - a + 1) * Math.random());
}


function onWindowLoad() {
    updateCaptcha();
}

window.addEventListener("load", onWindowLoad);