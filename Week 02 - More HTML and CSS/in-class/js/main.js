/*
In JavaScript (JS) we typically use:
    * `var` to declate global variables (never used anymore);
    * `let` to declare local variables;
    * `const` to declare constants, i.e., variables whose value cannot change.
*/

const ROWS = 10;
const COLS = 10;
const N_MINES = 10; // Number of mines

const GRID = Array(ROWS); // 2D Array containing information about the game grid.
/*
Beware! `const GRID` means that once we declare and assign
the variable GRID, we cannot assign nothing to this variable.
However, we can assign things to its contents!
*/

function createGrid() {
    /*
    We agree that:
        * 0     -> No neighbouring mine
        * 1 - 8 -> Number of neighbouring mines
        * 9     -> Mine!
    */
    placeMines();
    computeNumbers();
}

function computeNumbers() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (GRID[i][j] != 9) {
                GRID[i][j] = minesCount(i, j);
            }
        }
    }
}

function minesCount(i, j) {
    const LEFT = Math.max(0, j - 1);
    /*
    if (j == 0) {
        LEFT = 0
    } else {
        LEFT = j - 1;
    }
    */
    const TOP = Math.max(0, i - 1);
    const RIGHT = Math.min(COLS - 1, j + 1);
    const BOT = Math.min(ROWS - 1, i + 1);
    let mines = 0;
    for (let r = TOP; r <= BOT; r++) {
        for (let c = LEFT; c <= RIGHT; c++) {
            if ((r != i || c != j) && GRID[r][c] == 9) {
                mines++;
            }
        }
    }
    return mines;
}

function placeMines() {
    let minesRemaining = N_MINES;
    let cellsRemaining = ROWS * COLS;
    let p;
    for (let i = 0; i < ROWS; i++) {
        GRID[i] = Array(COLS);
        for (let j = 0; j < COLS; j++) {
            p = minesRemaining / cellsRemaining;
            if (coinToss(p)) {
                GRID[i][j] = 9; // Place a mine
                minesRemaining--; // Update the mines counter
            } else {
                GRID[i][j] = 0; // Empty for now...
            }
            cellsRemaining--;
        }
    }
    console.log(GRID);
}

function coinToss(p) {
    // Gets the probability (as a number in [0,1)) with which the coin returns Heads and returns true if so, false otherwise.
    const r = Math.random();
    return r < p;
}

function loadMSGrid() {
    // `document` is a built-in variable that points to the page DOM Tree (i.e., the HTML file, roughly, organised as a tree).
    // document.getElementById(<id>) returns an element
    // with a given id (or `null`, if no such element exists).
    const msGrid = document.getElementById("ms-grid");
    for (let i = 0; i < ROWS; i++) {
        // i++ is a shorthand for i = i + 1;
        for (let j = 0; j < COLS; j++) {
            // Create a div
            const msCell = document.createElement("div");
            // Add some CSS class to style the newly born <div>
            msCell.classList.add("ms-grid-cell");
            // Append our newly born <div> as a child to our MS grid container.
            msGrid.appendChild(msCell);
        }
    }
}

/*
In JS we heavily use Event-Driven Programming.
    * Events are, virtually anything that might happen on the page.
    * Listeners are things that listen to those events, if asked to, and execute a function each time this event might occur.
    * Typically, event listeners are attached on some element or the page / window itself.
    * Observe that we pass as a second argument the function name and not a call to it (i.e., no parentheses!).
*/

function onWindowLoad() {
    // Things to do once the page has been fully loaded.
    loadMSGrid();
    createGrid();
}

window.addEventListener("load", onWindowLoad);

/*
An example of a DOM Tree:

```html
<html>
    <head>
        <link rel="stylesheet" href="css/styles.css">
    <head>
    <body>
        <nav>
            Navigation
        </nav>
        <main>
            <p>
                Hello, World!
            </p>
        </main>
    </body>
</html>
```

This can be represented as a tree as follows:

```
html
|
|___head
|   |___link
|
|___body
    |
    |___nav
        |___"Navigation""
    |
    |___main
        |___p
            |___"Hello, World!"
```

This is what is kept in the `document` variable.
*/