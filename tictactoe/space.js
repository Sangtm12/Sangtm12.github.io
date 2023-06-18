class Space {
    constructor(x) {
        this.index = x;
    }

    draw() {
        let space = document.createElement('div');
        space.classList.add('space');
        space.setAttribute('data-index',this.index);
        document.querySelector('.board').appendChild(space);
    }
}