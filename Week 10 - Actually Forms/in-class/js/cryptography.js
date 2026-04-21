const OFFSET = 4; // Arbitrary

function encrypt(message) {
    const cipher = [...message].map(
        (c) => String.fromCharCode((c.charCodeAt(0) + OFFSET) % 65536)
    ).join("");
    return cipher;
}

function decrypt(cipher) {
    const message = [...cipher].map(
        (c) => String.fromCharCode((c.charCodeAt() - OFFSET) % 65536)
    ).join("");
    return message;
}