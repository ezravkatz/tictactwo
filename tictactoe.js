var currentPlayer = "X";
var playedBoxes = [];
var turnNum = 0;
var gameMode = "PvP";

document.querySelectorAll(".box").forEach((value, key) => {
  value.addEventListener("click", () => {
    onSelectBox(value);
  });
});

function onChangeGameMode(mode, _el) {
  if (_el.classList.contains("mode-selected")) return;
  _el.classList.add("mode-selected");

  if (mode == "PvP") {
    document.querySelector(`.mode.PvC`).classList.remove("mode-selected");
  } else if (mode == "PvC") {
    document.querySelector(`.mode.PvP`).classList.remove("mode-selected");
  }
  gameMode = mode;
  startGame();
}

function onSelectBox(element) {
  selectedBoxes.push({ box: element.id, player: currentPlayer });
  checkElement(element);
  turnNum++;
  var gameStat = checkWin();
  changePlayer();
  if (
    turnNum % 2 == 1 &&
    gameStat != "Game Over!" &&
    gameStat != "Game Draw!" &&
    gameMode == "PvC"
  ) {
    cpuPlays();
  }
}

function onUnselectBox(element, isImplicit = false) {
  selectedBoxes = selectedBoxes.filter((b) => b.box != element.id);
  if (!isImplicit) {
    element.value = "";
    element.removeAttribute("disabled");
    turnNum--;
    changePlayer();
  }
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  document.querySelector(".current-player").textContent = currentPlayer;
}

function checkWin(isCheckOnly = false) {
  if (currentPlayer == "X") {
    var xs = selectedBoxes
      .filter((item) => {
        return item.player == "X";
      })
      .map((value) => {
        return {
          x: Number(value.box.split("-")[0]),
          y: Number(value.box.split("-")[1]),
        };
      });
    return findScore(xs, isCheckOnly);
  } else if (currentPlayer == "O") {
    var os = selectedBoxes
      .filter((item) => {
        return item.player == "O";
      })
      .map((value) => {
        return {
          x: Number(value.box.split("-")[0]),
          y: Number(value.box.split("-")[1]),
        };
      });
    return findScore(os, isCheckOnly);
  }
}

function findScore(positions, isCheckOnly) {
  if (
    positions.filter((i) => {
      return i.x == i.y;
    }).length == 3
  ) {
    if (!isCheckOnly) displayWinner();
    return "game over";
  }

  if (
    positions.filter((i) => {
      return (
        (i.x == 0 && i.y == 2) ||
        (i.x == 1 && i.y == 1) ||
        (i.x == 2 && i.y == 0)
      );
    }).length == 3
  ) {
    if (!isCheckOnly) displayWinner();
    return "game over";
  }

  for (var i = 0; i < 3; i++) {
    var horizontalWin = positions.filter((p) => {
      return p.x == i;
    });
    if (horizontalWin.length == 3) {
      if (!isCheckOnly) displayWinner();
      return "game over";
    }
    var verticalWin = positions.filter((p) => {
      return p.y == i;
    });
    if (verticalWin.length == 3) {
      if (!isCheckOnly) displayWinner();
      return "game over";
    }
  }
  if (positions.length == 5) {
    if (!isCheckOnly) displayWinner(true);
    return "game drawn";
  }
  return "game on";
}
