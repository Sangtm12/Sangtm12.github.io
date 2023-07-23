class Game {
  turn = 0;

  constructor(grid, diff) {
    this.grid = grid;
    this.diff = diff;
  }

  newGame() {
    board.innerHTML = "";
    notiText.textContent = "";
    this.board = new Board(this.grid);
    this.board.createSpaces();

    // random player turn
    this.turn = Math.round(Math.random());

    if (this.turn == 0) {
      notiText.textContent = "You go first!";
      this.nextMove();
    } else {
      this.nextMove();
    }
  }

  nextMove() {
    if (this.turn == 0) {
      this.playerMove();
    } else {
      this.computerMove();
    }
  }

  playerMove() {
    const handlePlayerMove = (e) => {
      let clickedSpaceX = +e.target.dataset.x;
      let clickedSpaceY = +e.target.dataset.y;

      if (
        this.board.spaceArray.find(
          (item) => item.x === clickedSpaceX && item.y === clickedSpaceY
        ).marked === undefined
      ) {
        e.target.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        this.board.spaceArray.find(
          (item) => item.x === clickedSpaceX && item.y === clickedSpaceY
        ).marked = "player";
        notiText.textContent = "";
        board.removeEventListener("click", handlePlayerMove);
        this.turn = 1;
        this.checkResult();
      }
    };
    board.addEventListener("click", handlePlayerMove);
  }

  computerMove() {
    //this should be the place for the algorithm
    //but now it's just random
    let availableSlots = this.board.spaceArray.filter(
      (slot) => slot.marked === undefined
    );

    function minimax() {}

    //start of the RANDOM bullshit
    let randomIndex = Math.floor(Math.random() * availableSlots.length);
    this.board.spaceArray.find(
      (item) =>
        item.x === availableSlots[randomIndex].x &&
        item.y === availableSlots[randomIndex].y
    ).marked = "computer";
    [...document.querySelectorAll(".space")].find(
      (item) =>
        +item.dataset.x === availableSlots[randomIndex].x &&
        +item.dataset.y === availableSlots[randomIndex].y
    ).innerHTML = '<i class="fa-sharp fa-solid fa-o"></i>';
    this.turn = 0;
    this.checkResult();
  }

  checkResult() {
    let availableSlots = this.board.spaceArray.filter(
      (slot) => slot.marked === undefined
    );
    if (availableSlots.length == 0) {
      notiText.textContent = "Draw!";
    }

    let win = "";
    let winArray = [];

    this.board.spaceArray.forEach((item) => {
      let hor = [];
      let dia = [];
      let ver = [];
      for (let i = item.x; i <= Math.min(item.x + 2, this.grid - 1); i += 1) {
        if (
          item.marked &&
          this.board.spaceArray.find((p) => p.x == i && p.y == item.y)
            .marked === item.marked
        ) {
          hor.push(
            this.board.spaceArray.find((p) => p.x == i && p.y == item.y)
          );
        }
      }

      for (let i = item.y; i <= Math.min(item.y + 2, this.grid - 1); i += 1) {
        if (
          item.marked &&
          this.board.spaceArray.find((p) => p.y == i && p.x == item.x)
            .marked === item.marked
        ) {
          ver.push(
            this.board.spaceArray.find((p) => p.y == i && p.x == item.x)
          );
        }
      }

      for (let i = 0; i <= 2; i++) {
        if (
          item.marked &&
          this.board.spaceArray.find(
            (p) => p.x == item.x + i && p.y == item.y + i
          )?.marked == item.marked
        ) {
          dia.push(
            this.board.spaceArray.find(
              (p) => p.x == item.x + i && p.y == item.y + i
            )
          );
        }
      }

      if (hor.length == 3 || ver.length == 3 || dia.length == 3) {
        winArray =
          hor.length === 3 ? [...hor] : ver.length === 3 ? [...ver] : [...dia];
        win = winArray[0].marked;
      }
    });

    switch (win) {
      case "":
        this.nextMove();
        break;
      case "player":
        this.playerWins(winArray);
        break;
      case "computer":
        this.computerWins(winArray);
        break;
    }
  }

  playerWins(winArray) {
    notiText.textContent = "Player wins!";
    winArray.forEach((item) => {
      document.querySelector(
        `.space[data-x="${item.x}"][data-y="${item.y}"]`
      ).style.border = "1px solid white";
    });
  }

  computerWins(winArray) {
    notiText.textContent = "Computer wins!";
    winArray.forEach((item) => {
      document.querySelector(
        `.space[data-x="${item.x}"][data-y="${item.y}"]`
      ).style.border = "1px solid white";
    });
  }
}
