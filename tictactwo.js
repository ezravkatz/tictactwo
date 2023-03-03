const X_CLASS = "x";
const CIRLCE_CLASS = "circle";
var currentPlayer = "X";
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 7],
  [0, 4, 8],
  [2, 4, 6],
];
const boxElements = document.querySelectorAll(".box");
const board = document.getElementById(".board");
const winningMessageElement = document.getElementById("winner-screen");
const winningMessageTextElement = document.querySelector(".message box body");
let circleTurn;

boxElements.forEach((box) => {
  box.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const box = e.target;
  const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS;
  placeMark(box, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }

  swapTurns();
}

function endGame(draw) {
  if (draw) {
  } else {
    showWinner();
  }
  showWinner();
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function startGame() {
  circleTurn = false;
  boxElements.forEach((box) => {
    box.addEventListener("click", handleClick, { once: true });
  });
}

function isDraw() {
  return [...boxElements].every((box) => {
    return (
      box.classList.contains(X_CLASS) || box.classList.contains(CIRLCE_CLASS)
    );
  });
}

function placeMark(box) {
  const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS;
  box.classList.add(currentClass);
}

function humanPlayer(board) {
  this.takeTurn = function () {
    board.positions.forEach((el) => el.addEventListener("click", swapTurns));
  };

  function swapTurns() {
    circleTurn = !circleTurn;
  }
}

function cpuPlayer(board) {
  console.log("cpu turn");
  this.takeTurn = function () {
    //filter for positions where there is no inner text and the position is open
    const openPositions = board.positions.filter((p) => p.innerText === "");
    //get a random integer and multiply that by the open positions to create a random computer move choice
    const move = Math.floor(Math.random() * openPositions.length);
    openPositions[move].innerText = "O";
  };
}

function checkWin(currentClass) {
  return winningCombos.some((combination) => {
    return combination.every((index) => {
      return boxElements[index].classList.contains(currentClass);
    });
  });
}

function showWinner(noWinner = false) {
  if (noWinner) {
    document.querySelector(".winner-screen .body").innerHTML = "Its a Draw!";
    document.querySelector(".winner-screen").classList.toggle("fade-in");
    document.querySelector(".winner-screen").classList.toggle("fade-out");
    //updateModel('draw');
    return;
  } else {
    document.querySelector(".winner-screen .body").innerHTML =
      "Player " + currentPlayer + " Won!";
    document.querySelector(".winner-screen").classList.toggle("fade-in");
    document.querySelector(".winner-screen").classList.toggle("fade-out");
    document.querySelector("#score-" + currentPlayer).textContent =
      Number(document.querySelector("#score-" + currentPlayer).textContent) + 1;
    return;
  }
}

document.querySelectorAll(".okay-button").forEach((value, key) => {
  value.addEventListener("click", () => {
    newGame();
  });
});

function newGame() {
  showLoader();
  clearBoard();
  document.querySelector(".winner-screen").classList.remove("fade-in");
  document.querySelector(".winner-screen").classList.add("fade-out");
  switchPlayer();
  setTimeout(hideLoader, 500);
}
