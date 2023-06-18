let option = document.querySelector('.options-ctn');
let errorMessage = document.querySelector('p.error');
const notiText = document.querySelector('p.noti-text');
const board = document.querySelector('.board');
let game;

document.querySelector('form').addEventListener('submit', start);

function start(e) {
    e.preventDefault();
    try {
        const grid = +document.querySelector('input[name="grid"]:checked').value.match(/\d*/)[0]; //returns 3 or 15
        const diff = document.querySelector('input[name="difficulty"]:checked').value;
        option.style.display = 'none';
        board.style.gridTemplateColumns = `repeat(${grid}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${grid}, 1fr)`;
        game = new Game(grid, diff);
        game.newGame();
    } catch (err) {
        console.log(err);
        errorMessage.textContent = 'Please select the options!'
    }   
}

