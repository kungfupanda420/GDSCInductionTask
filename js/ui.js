// UI management
function updateCell(cell, value, isFixed = false, isInvalid = false) {
    cell.textContent = value || '';
    cell.className = 'cell';
    if (isFixed) cell.classList.add('fixed');
    if (isInvalid) cell.classList.add('invalid');
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function updateGameInfo(time, hintsLeft, wrongAttempts) {
    document.getElementById('time').textContent = formatTime(time);
    document.getElementById('hintsCount').textContent = hintsLeft;
    document.getElementById('wrongAttempts').textContent = wrongAttempts;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

function updateHistoryDisplay(history) {
    const historyContent = document.getElementById('historyContent');
    if (history.length === 0) {
        historyContent.innerHTML = '<p>No games played yet.</p>';
        return;
    }

    const historyHTML = history.map((game, index) => `
        <div class="history-item">
            <h3>Game ${index + 1}</h3>
            <p>Score: ${game.score}</p>
            <p>Time: ${formatTime(game.time)}</p>
            <p>Wrong Attempts: ${game.wrongAttempts}</p>
            <p>Hints Used: ${game.hintsUsed}</p>
            <p>Date: ${new Date(game.date).toLocaleString()}</p>
        </div>
    `).join('');

    historyContent.innerHTML = historyHTML;
}

export { 
    updateCell, 
    showModal, 
    hideModal, 
    updateGameInfo, 
    updateHistoryDisplay 
};