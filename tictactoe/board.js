class Board {
    spaceArray = [];
    
    constructor(grid) {
        this.grid = grid;
    }

    createSpaces() {
        for (let x = 0; x < Math.pow(this.grid, 2); x++) {
            let space = new Space(x);
            this.spaceArray.push(space);
            space.draw();
        }
    }
}