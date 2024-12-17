// Local storage management
const HISTORY_KEY = 'sudokuGameHistory';
const MAX_HISTORY = 10;

function saveGame(gameData) {
    const history = getGameHistory();
    history.unshift(gameData);
    
    if (history.length > MAX_HISTORY) {
        history.pop();
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getGameHistory() {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

function calculateScore(time, wrongAttempts, hintsUsed) {
    const baseScore = 1000;
    const timeDeduction = Math.floor(time / 60) * 10;
    const wrongDeduction = wrongAttempts * 20;
    const hintDeduction = hintsUsed * 50;
    
    return Math.max(0, baseScore - timeDeduction - wrongDeduction - hintDeduction);
}

export { saveGame, getGameHistory, calculateScore };