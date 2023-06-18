class Game {

    turn = 0;

    constructor(grid, diff) {
        this.grid = grid;
        this.diff = diff;
    }

    newGame() {
        board.innerHTML = '';
        this.board = new Board(this.grid);
        this.board.createSpaces();
        
        // random player turn
        // this.turn = Math.round(Math.random());
        this.turn = 0;

        if (this.turn == 0) {
            notiText.textContent = 'You go first!';
            this.nextMove();
        }
    }

    nextMove() {
        if (this.turn == 0) {
            this.playerMove();
        } else {
            this.computerMove();
        }
        this.checkResult();
    }

    playerMove() {
        board.addEventListener('click', handlePlayerMove);
        function handlePlayerMove(e) {
            let clickedSpaceIndex = e.target.dataset.index;
            if (game.board.spaceArray[clickedSpaceIndex].marked === undefined) {
                e.target.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                game.board.spaceArray[e.target.dataset.index].marked = 0;
                notiText.textContent = '';
                board.removeEventListener('click', handlePlayerMove);
                game.turn = 1;
                game.nextMove();
                //
                //
                //
                //
                // THERE'S A LITTLE PROBLEM HERE. 'THIS' IS LOST.
                //
                //
                //
                //
            }
        }
    }

    computerMove() {
        //this should be the place for the algorithm
        //but now it's just random
        let availableSlots = game.board.spaceArray.filter(slot => slot.marked === undefined);
        let randomIndex = Math.floor(Math.random() * (availableSlots.length + 1));
        this.board.spaceArray[availableSlots[randomIndex].index].marked = 1;
        document.querySelectorAll('.space')[availableSlots[randomIndex].index].innerHTML = '<i class="fa-sharp fa-solid fa-o"></i>';
        this.turn = 1;

    }

    checkResult() {

    }
}