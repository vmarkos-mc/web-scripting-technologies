function initialiseCells(n = 16) {
    // When needing access to a DOM element, prefer to store it into a variable to avoid interacting with the DOM tree all the time, as it is time consuming.
    const gridContainer = document.getElementById("grid-container");
    let cell;
    for (let i = 0; i < n; i++) {
        cell = document.createElement("div"); // This creates a DOM element, a div in our case.
        // cell.className = "minesweeper-cell"; // This overwrites any pre-existing classes!
        cell.classList.add("minesweeper-cell"); // This "appends" to list of classes a DOM element has.
        gridContainer.appendChild(cell);
    }
}

function onPageLoad() {
    initialiseCells();
}

window.addEventListener("load", onPageLoad);

/*
A few notes about scope in JS:

* `var` declares a variable in the *global scope*. So, avoid using it!
* `let` declares a variable in the *local scope*. So, prefer using this!
* `const` declares a variable as a constant in the *local scope*. So, prefer using this for things you would like to be immutable!
* If you do not include any of the above, you most probably declare it to the global scope (just don't do it!).

Also, a note on semicolons: Use them as in C!
Even if the interpreter actually fills-in any missing semicolons, it is not always correct in its guesses, so just to mess with it!

*/