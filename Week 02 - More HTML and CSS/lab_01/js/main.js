const SIZE = 8;
const N_BOMBS = 10;
let BOARD, VISIBLE;

function loadGrid(size = 8) {
    const gridContainer = document.getElementById("grid-container");
    let cell;
    BOARD = [];
    VISIBLE = [];
    for (let i = 0; i < size; i++) {
        BOARD.push([]);
        VISIBLE.push([]);
        for (let j = 0; j < size; j++) {
            BOARD[i][j] = 0;
            VISIBLE[i][j] = false;
            cell = document.createElement("div");
            cell.id = i + "-" + j; // Just a dummy way to identify each cell.
            cell.classList.add("minesweeper-cell");
            cell.addEventListener("click", flipCell);
            gridContainer.appendChild(cell);
        }        
    }
}

function generateBoard(nBombs, size) { // Assumes `BOARD` has been initiliased.
    placeBombs(nBombs, size);
    let cellElement, cellSpan;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (BOARD[i][j] === 0) {
                BOARD[i][j] = computeCellValue(i, j);
                if (BOARD[i][j] !== 0) {
                    cellElement = document.getElementById(i + "-" + j);
                    cellSpan = document.createElement("span");
                    cellSpan.textContent = BOARD[i][j];
                    cellSpan.setAttribute("data-value", BOARD[i][j]);
                    cellElement.appendChild(cellSpan);
                }
            }
        }
    }
}

function computeCellValue(row, col) { // Assumes `BOARD has been initiliased.
    const boundaries = getBoundaries(row, col);
    let value = 0;
    for (let i = boundaries["top"]; i < boundaries["bot"]; i++) {
        for (let j = boundaries["left"]; j < boundaries["right"]; j++) {
            if ((i !== row || j !== col) && BOARD[i][j] === -1) {
                value++;
            }
        }
    }
    return value;
}

function getBoundaries(row, col) { // top, left: inclusive; bottom, right: exclusive
    return {
        "left": Math.max(0, col - 1), 
        "right": Math.min(SIZE - 1, col + 1) + 1,
        "top": Math.max(0, row - 1),
        "bot": Math.min(SIZE - 1, row + 1) + 1,
    };
}

function placeBombs(nBombs, size) { // Assuming tha `BOARD` has been properly initialised.
    const rows = [], cols = []; // Question Why don't we keep both in the same array?
    let row, col;
    for (let i = 0; i < nBombs; i++) {
        row = Math.floor(size * Math.random());
        col = Math.floor(size * Math.random());
        while (rows.includes(row) && cols.includes(col)) {
            row = Math.floor(size * Math.random());
            col = Math.floor(size * Math.random());
        }
        BOARD[row][col] = -1;
    }
}

function flipCell(event) {
    const targetId = event.currentTarget.id; // Do not use event.target at this point, since this might return the span.
    const toBeFlipped = [targetId];
    let cellId, cellElement, coordinates, neighbour;
    while (toBeFlipped.length > 0) {
        cellId = toBeFlipped.pop();
        cellElement = document.getElementById(cellId);
        cellElement.classList.add("explored");
        coordinates = cellId.split("-").map(x => parseInt(x));
        VISIBLE[coordinates[0]][coordinates[1]] = true;
        if (BOARD[coordinates[0]][coordinates[1]] !== 0) {
            continue;
        }
        for (const n of getEmptyNeighbours(...coordinates)) {
            neighbour = n.join("-");
            if (!toBeFlipped.includes(neighbour) && !VISIBLE[n[0]][n[1]]) {
                toBeFlipped.push(neighbour);
            }
        }
    }
}

function getEmptyNeighbours(row, col) { // Returns cell ids of empty neighbours, if any.
    const emptyNeighbours = [];
    const boundaries = getBoundaries(row, col);
    for (let i = boundaries["top"]; i < boundaries["bot"]; i++) {
        for (let j = boundaries["left"]; j < boundaries["right"]; j++) {
            if ((i !== row || j !== col)) {
                emptyNeighbours.push([i, j]);
            }
        }
    }
    return emptyNeighbours;
}

function windowOnLoad() {
    loadGrid(SIZE);
    generateBoard(N_BOMBS, SIZE);
}

window.addEventListener("load", windowOnLoad);