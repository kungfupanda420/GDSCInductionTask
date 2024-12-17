import { generateSudoku, isValid } from './js/sudokuGenerator.js';
import { saveGame, getGameHistory, calculateScore } from './js/storage.js';
import { playSuccessSound, playErrorSound } from './js/audio.js';
import { updateCell, showModal, hideModal, updateGameInfo, updateHistoryDisplay } from './js/ui.js';

let gameBoard = Array(9).fill().map(() => Array(9).fill(0));
let solution = Array(9).fill().map(() => Array(9).fill(0));
let timer = 0;
let timerInterval;
let hintsLeft = 3;
let wrongAttempts = 0;
let hintsUsed = 0;
let isGameComplete = false;

// Initialize game
function initializeGame() {
    createGrid();
    generateNewGame();
    startTimer();
    loadGameHistory();
    setupEventListeners();
}

// Create grid with inline input
function createGrid() {
    const grid = document.getElementById('sudokuGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;

            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'cell-input';

            input.addEventListener('input', () => handleInputChange(input, i, j));

            cell.appendChild(input);
            grid.appendChild(cell);
        }
    }
}

// Handle inline input changes
function handleInputChange(input, row, col) {
    if (isGameComplete) return;

    const value = input.value;
    if (!/^[1-9]$/.test(value)) {
        input.value = '';
        return;
    }

    const number = parseInt(value);
    if (solution[row][col] !== number) {
        wrongAttempts++;
        playErrorSound();
        input.style.color = 'red';
    } else {
        gameBoard[row][col] = number;
        input.style.color = 'black';
    }

    updateGameInfo(timer, hintsLeft, wrongAttempts);
    if (checkCompletion()) handleGameComplete();
}

// Generate a new game
function generateNewGame() {
    const newGame = generateSudoku();
    gameBoard = newGame.puzzle;
    solution = newGame.solution;
    isGameComplete = false;
    updateDisplay();
}

function updateDisplay() {
    document.querySelectorAll('.cell-input').forEach(input => {
        const row = parseInt(input.parentElement.dataset.row);
        const col = parseInt(input.parentElement.dataset.col);
        const value = gameBoard[row][col];

        input.value = value === 0 ? '' : value;
        input.disabled = value !== 0;
    });
}

// Check for completion
function checkCompletion() {
    return gameBoard.every((row, i) => row.every((val, j) => val === solution[i][j]));
}

function handleGameComplete() {
    isGameComplete = true;
    clearInterval(timerInterval);
    playSuccessSound();
    alert('Congratulations! You solved the puzzle!');
}

// Timer functions
function startTimer() {
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        updateGameInfo(timer, hintsLeft, wrongAttempts);
    }, 1000);
}

function setupEventListeners() {
    document.getElementById('newGame').addEventListener('click', () => {
        generateNewGame();
        startTimer();
        hintsLeft = 3;
        wrongAttempts = 0;
        hintsUsed = 0;
        updateGameInfo(timer, hintsLeft, wrongAttempts);
    });

    document.getElementById('checkSolution').addEventListener('click', () => {
        if (checkCompletion()) handleGameComplete();
        else alert('Solution is incorrect. Keep trying!');
    });

    document.getElementById('hint').addEventListener('click', handleHint);
}

function handleHint() {
    if (hintsLeft <= 0 || isGameComplete) return;

    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (gameBoard[i][j] === 0) emptyCells.push([i, j]);
        }
    }

    if (emptyCells.length === 0) return;
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[row][col] = solution[row][col];
    hintsLeft--;
    hintsUsed++;
    updateDisplay();
}

function loadGameHistory() {
    updateHistoryDisplay(getGameHistory());
}

// Start the game
window.onload = initializeGame;
