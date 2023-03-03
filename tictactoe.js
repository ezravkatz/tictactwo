var board = new Board();
const player = new humanPlayer(board);
const cpu = new cpuPlayer(board);
var turn = 0;

startTicTacToeGame();

function startTicTacToeGame() {
  this.start = function () {
    //observe change of turn with observer
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board?.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  };

  function takeTurn() {
    // if (board.checkWinner()) {
    //   return;
    // }
    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      cpuPlayer.takeTurn();
    }
    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll(".col"));
  this.checkWinner = function () {
    let winner = false;
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

    const positions = this.positions;

    winningCombos.forEach((winningCombo) => {
      //cycle through winning combos, retrieve the inner text for each position
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      //evaluate for a win
      const isWinningCombo =
        pos0InnerText !== "" &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;

      if (isWinningCombo) {
        winner = true;
        winningCombo.forEach((index) => {
          positions[index].className += "winner";
        });
      }
    });

    return winner;
  };
}

function humanPlayer(board) {
  this.takeTurn = function () {
    board.positions.forEach((el) => el.addEventListener("click", turnTaken));
  };

  function turnTaken(event) {
    console.log("turn taken");
    event.target.innerText = "X";
    board.positions.forEach((el) => el.removeEventListener("click", turnTaken));
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
