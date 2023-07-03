class Board {
  spaceArray = [];

  constructor(grid) {
    this.grid = grid;
  }

  createSpaces() {
    for (let y = 0; y < this.grid; y++) {
      for (let x = 0; x < this.grid; x++) {
        let space = new Space(x, y);
        this.spaceArray.push(space);
        space.draw();
      }
    }
  }
}
