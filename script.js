const X_CLASS = 'x';
const O_CLASS = 'o';
const SHOW_CLASS = 'show';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningModal = document.getElementById('winning-modal');
const winningMsg = document.querySelector('[data-winning-message]');
const restartBtn = document.getElementById('restart-btn');
let oTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', performTurn);
    cell.addEventListener('click', performTurn, { once: true });
  });
  setBoardHoverClass();
  winningModal.classList.remove(SHOW_CLASS);
}


function performTurn(e) {
  // Place mark
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  // Check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {    // Check for draw 
    endGame(true);
  } else {    // Switch turns  
    switchTurns();
    setBoardHoverClass();
  }  
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
};

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  })
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  })
}

function endGame(draw) {
  if (draw) {
    winningMsg.innerText = 'Draw!';
  } else {
    winningMsg.innerText = `${oTurn ? "O's" : "X's"} Win!`;
  }
  winningModal.classList.add(SHOW_CLASS);
}