const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, draw: 0 };

function updateScores() {
  scoreX.textContent = String(scores.X);
  scoreO.textContent = String(scores.O);
  scoreDraw.textContent = String(scores.draw);
}

function setStatus(message) {
  statusText.textContent = message;
}

function clearHighlights() {
  cells.forEach((cell) => {
    cell.classList.remove('win');
  });
}

function getWinnerLine() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function finishRound(winner) {
  gameOver = true;
  const winningLine = getWinnerLine();

  if (winningLine) {
    winningLine.forEach((index) => {
      cells[index].classList.add('win');
    });
    scores[winner] += 1;
    setStatus(`${winner} の勝ち！`);
  } else {
    scores.draw += 1;
    setStatus('引き分けです！');
  }

  updateScores();
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (board[index] || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winnerLine = getWinnerLine();
  if (winnerLine) {
    finishRound(currentPlayer);
    return;
  }

  if (board.every((value) => value !== '')) {
    finishRound(null);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`${currentPlayer} の番です`);
}

function resetBoard() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'win');
  });

  clearHighlights();
  setStatus('X の番です');
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetBoard);

updateScores();
setStatus('X の番です');
