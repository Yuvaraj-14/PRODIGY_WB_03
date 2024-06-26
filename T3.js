const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const aiButton = document.getElementById('aiButton');
const winningMessage = document.getElementById('winningMessage');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isAiOpponent = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);
aiButton.addEventListener('click', () => {
    isAiOpponent = true;
    restartGame();
});

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '') return;

    placeMark(cell, cellIndex);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        if (isAiOpponent && currentPlayer === 'O') {
            aiMove();
        }
    }
}

function placeMark(cell, index) {
    cell.textContent = currentPlayer;
    board[index] = currentPlayer;
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function isDraw() {
    return board.every(cell => cell !== '');
}

function endGame(draw) {
    if (draw) {
        winningMessage.textContent = "It's a Draw!";
    } else {
        winningMessage.textContent = `${currentPlayer} Wins!`;
    }
    winningMessage.style.display = 'block';
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessage.style.display = 'none';
    currentPlayer = 'X';
}

function aiMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    placeMark(cells[randomIndex], randomIndex);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

