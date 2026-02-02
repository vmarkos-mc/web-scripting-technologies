const CELL_GRID = [];
const ROWS = 4;
const COLS = 4;
const NUMBER_OF_MINES = 4;
const MINES = [];

const utils = {
    randInt: (a, b) => {
        // Returns a pseudo-random integer in [a,b] (int a, int b)
        // return Math.round(a + Math.random() * (b - a)); // Simple, yet not uniform regarding a, b.
        return Math.round(a - 0.5 + Math.random() * (b - a + 1)); // Simple, and uniform regarding a, b.
    },
    getCellId: (cellId) => {return cellId.split("-").map(parseInt)},
    logGrid: (grid, rows, cols) => {
        gridString = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j ++) {
                gridString += grid[i][j] === -1 ? "x " : grid[i][j] + " ";
            }
            gridString += "\n";
        }
        console.log(gridString);
    },
};

function initialiseGrid(grid = CELL_GRID) {
    for (let i = 0; i < ROWS; i++) {
        grid[i] = [];
        // grid.push([]); // Alternative, equally functional
        for (let j = 0; j < COLS; j++) {
            grid[i][j] = 0;
            // grid.push(0); // Alternative, equally functional
        }
    }
    // console.log(grid);
}

function generateMines(numberOfMines = NUMBER_OF_MINES, grid = CELL_GRID, mines = MINES) {
    let i, j, mine;
    while (mines.length < numberOfMines) {
        i = utils.randInt(0, ROWS - 1);
        j = utils.randInt(0, COLS - 1);
        mine = [i, j];
        if (grid[i][j] !== -1) {
            mines.push(mine);
            grid[i][j] = -1;
        }
    }
    // console.log(mines);
    // console.log(grid);
}

function generateProximities(grid = CELL_GRID, mines = MINES) {
    for (const mine of mines) {
        updateProximities(grid, mine);
    }
    utils.logGrid(grid, ROWS, COLS);
}

function updateProximities(grid, mine, rows = ROWS, cols = COLS) {
    // `mine === [i, j]`, where `i` and `j` are the row and col of the mine
    const top = Math.max(mine[0] - 1, 0); // Make sure we don't cross the top-boundary
    const bot = Math.min(mine[0] + 2, rows); // Make sure we don't cross the bot-boundary
    const left = Math.max(mine[1] - 1, 0); // Make sure we don't cross the left-boundary
    const right = Math.min(mine[1] + 2, cols); // Make sure we don't cross the right-boundary
    // console.log(mine, top, bot, left, right);
    for (let i = top; i < bot; i++) {
        for (let j = left; j < right; j++) {
            if (grid[i][j] !== -1 && (i !== mine[0] || j !== mine[1])) {
                grid[i][j]++;
            }
        }
    }
}

function initialiseCells(grid = CELL_GRID, rows = ROWS, cols = COLS) {
    // When needing access to a DOM element, prefer to store it into a variable to avoid interacting with the DOM tree all the time, as it is time consuming.
    const gridContainer = document.getElementById("grid-container");
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    let cell, row, col;
    for (let i = 0; i < rows * cols; i++) {
        row = Math.floor(i / rows);
        col = i % cols;
        cell = document.createElement("div"); // This creates a DOM element, a div in our case.
        cell.id = `${row}-${col}`;
        // cell.className = "minesweeper-cell"; // This overwrites any pre-existing classes!
        cell.classList.add("minesweeper-cell"); // This "appends" to list of classes a DOM element has.
        cell.innerText = grid[row][col];
        gridContainer.appendChild(cell);
    }
}

function onPageLoad() {
    initialiseGrid();
    generateMines();
    generateProximities();
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

/*
On shallow and deep checks:

Conside this script:

```js
let i, j, mine;
while (mines.length < numberOfMines) {
    i = utils.randInt(0, ROWS - 1);
    j = utils.randInt(0, COLS - 1);
    mine = [i, j];
    if (!mines.includes(mine)) {
        mines.push(mine);
        grid[i][j] = -1;
    }
}
```

In this case, `mines.includes(mine)` will check for the **references** included in `mines` and 
not the contents of each entry. So, we end up with duplicates, since in each iteration we 
assign `mine` with a new array (so, different references).
*/

/* 
When using JS loops, we have two ways to loop over an iterable (e.g., ArrayObject or JSONObject):

```js
for (const i in iterable) {
    // This iterates over the keys / indices of the iterable
}
```

```js
for (const i ofn iterable) {
    // This iterates over the values / "contents" of the iterable
}
```

So, for instance:

```js
const a = [2, 5, 1];
for (const i in iterable) {
    console.log(i); // Logs: 0, 1, 2
}
```

but:

```js
const a = [2, 5, 1];
for (const i of iterable) {
    console.log(i); // Logs: 2, 5, 1
}
```
*/