const X_CLASS = "x";
const CIRLCE_CLASS = "circle";
const WINNING_COMIBNATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 7],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "data-winning-message-text"
);
let circleTurn;

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }

  swapTurns();
  setBoardHoverClass;
}

function endGame(draw) {
  if (draw) {
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
  }
  winningMessageTextElement.classList.add("winningMessage.show");
}

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass;
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRLCE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRLCE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRLCE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMIBNATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
