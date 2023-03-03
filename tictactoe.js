const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function ticTacToeGame() {
  const board = new Board();
  const player = new Player(board);
  const cpu = new CPU(board);
  let turn = 0;

  this.start = function () {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  };
  function takeTurn() {
    if (board.checkWinner()) {
      return;
    }
    if (turn % 2 === 0) {
      player.takeTurn();
    } else {
      cpu.takeTurn();
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
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
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

function Player(board) {
  this.takeTurn = function () {
    board.positions.forEach((el) => el.addEventListener("click", turnTaken));
  };

  function turnTaken(event) {
    event.target.innerText = "X";
    board.positions.forEach((el) => el.removeEventListener("click", turnTaken));
  }
}

function CPU(board) {
  this.takeTurn = function () {
    const openPositions = board.positions.filter((p) => p.innerText === "");
    const move = Math.floor(Math.random() * openPositions.length);
    openPositions[move].innerText = "O";
  };
}
