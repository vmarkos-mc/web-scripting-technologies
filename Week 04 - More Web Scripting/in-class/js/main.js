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
            // Give an id to each cell based on its coordinates
            // This is the equivalent of Python f-strings.
            msCell.id = `${i}-${j}`; // ` is the backtick character.
            // Add an event listener on cell click.
            msCell.addEventListener("click", onCellClick);
            // Add some CSS class to style the newly born <div>
            msCell.classList.add("ms-grid-cell");
            // Append our newly born <div> as a child to our MS grid container.
            msGrid.appendChild(msCell);
        }
    }
}

function onCellClick(event) {
    // Stuff that happens when a cell is clicked
    // event is a complex JS object that contains information about the event that has
    // triggered this function.
    // console.log(event);
    const msCell = event.target; // This returns the HTML element clicked
    const msCellId = msCell.id; // This is the cell id
    // console.log(msCellId);
    const coordinates = msCellId.split("-").map(parseFloat); // Split cell id on '-'
    // const i = parseInt(coordinates[0]), j = parseInt(coordinates [1]); // coordinates = { i, j }
    const i = coordinates[0], j = coordinates[1];
    const number = GRID[i][j]; // Get the corresponding number from the GRID variable
    // console.log(number, typeof i, typeof j); // And log it
    msCell.classList.add("visited");
    if (number == 0) {
        expandCells(i, j);
    } else if (number == 9) {
        gameOver();
    } else {
        msCell.textContent = number; // Set the number as a value for the HTML cell element
        msCell.classList.add(`cell-${number}`);
    }
}

function expandCells(row, col) {
    /*
    This function uses the Depth-First Search (DFS) algorithm to explore all cells around
    a cell until cells that contain numbers are found.
    */
    const root = [row, col]; // The starting cell
    const visited = new Set(); // The cells we have visited - we use set, as we just need unique values
    const frontier = [root]; // Cells to be explored
    let neighbours, number, msCell; // Auxilliary variables
    while (frontier.length > 0) { // While there is stuff to explore...
        const current = frontier.pop(); // This gets the last element of the array
        visited.add(current.join("-"));
        number = GRID[current[0]][current[1]];
        msCell = document.getElementById(current.join("-"));
        msCell.classList.add("visited");
        if (number === 0) {
            neighbours = getNeighbours(current);
            console.log(neighbours);
            frontier.push(...(neighbours.filter(
                // Array.filter() filters an array using a boolean function executed for each Array element
                // Anonymous function.
                neighbour => !visited.has(neighbour.join("-")) // <input value> => <output value>
            )));
            console.log(frontier);
        } else {
            msCell.textContent = number;
            msCell.classList.add(`cell-${number}`);
        }
    }
}

/*
In JS all objects besides primitives (numbers, strings, booleans) are passed by **reference**,
i.e., when we pass them as arguments in functions, only a reference to their location in memory
is passed, and not the actual value. So, when it comes to comparisons, primitives are compared by
**value** while all other objects are compared by **reference**. That is, two objects are by default
equal if they live in the same place in memory.

One simple way to circumvent this is to define a sort of "id" (a hash values in this case).
*/

function getNeighbours(node) {
    // Computes all (at most 8) neighbouring cells of `node`.
    const neighbours = [];
    const row = node[0], col = node[1];
    // console.log(row, col);
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            // The first four conditions ensure that [i, j] is within the game grid
            // The last condition ensures that [i, j] !== node (which is not a neighbour of itself)
            console.log(i, j);
            if (i >= 0 && i < ROWS && j >= 0 && j < COLS && (i !== row || j !== col)) {
                neighbours.push([i, j]);
            }
        }
    }
    return neighbours;
}

function gameOver() {
    // This works just in case the player hits a mine!
    alert("Game Over! Loser!");
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

/*
Formatted strings in JS

Syntax

```js
`${variable1}characters${variable2}more characters`
```

So, each variable we want to cast into a string should be enclosed in ${...}.

Also, the string is bounded by backticks (`) and not quotemarks (neither ' nor ").
*/

/*
On JS and autocasting

JS by default tries to cast anything to the type it needs to work properly.

This is why above the line:

```js
GRID[i][j]
```

is valid, even if `i` and `j` are both strings! What happens in the background is that the 
JS Virtual Machine (VM) **casts** those strings to integers - successfully.

However, this is, in general, a bad practice, as JS conventions might change from version to version.
*/