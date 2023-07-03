class Space {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    let space = document.createElement("div");
    space.classList.add("space");
    space.setAttribute("data-x", this.x);
    space.setAttribute("data-y", this.y);
    document.querySelector(".board").appendChild(space);
  }
}
