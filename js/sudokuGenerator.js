// Sudoku puzzle generator
function generateSudoku() {
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    fillDiagonal(grid);
    solveSudoku(grid);
    return removeNumbers(grid);
}

function fillDiagonal(grid) {
    for (let box = 0; box < 9; box += 3) {
        fillBox(grid, box, box);
    }
}

function fillBox(grid, row, col) {
    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[row + i][col + j] = numbers[index++];
        }
    }
}

function solveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true;

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = 0;
        }
    }
    return false;
}

function removeNumbers(grid) {
    const puzzle = JSON.parse(JSON.stringify(grid));
    const solution = JSON.parse(JSON.stringify(grid));
    const cellsToRemove = 40 + Math.floor(Math.random() * 15); // Remove 40-55 numbers

    for (let i = 0; i < cellsToRemove; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (puzzle[row][col] === 0);
        puzzle[row][col] = 0;
    }

    return { puzzle, solution };
}

function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) return [row, col];
        }
    }
    return null;
}

function isValid(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[boxRow + i][boxCol + j] === num) return false;
        }
    }

    return true;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { generateSudoku, isValid };