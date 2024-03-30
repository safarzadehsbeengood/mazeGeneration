class Cell {
  constructor(i, j) {
    this.j = i;
    this.i = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  checkNeighbors(maze) {
    let i = this.i;
    let j = this.j;
    let neighbors = [];
    // down
    if (j < DIM - 1 && !maze[j + 1][i].visited) {
      neighbors.push(maze[j + 1][i]);
    }
    // right
    if (i < DIM - 1 && !maze[j][i + 1].visited) {
      neighbors.push(maze[j][i + 1]);
    }
    // up
    if (j > 0 && !maze[j - 1][i].visited) {
      neighbors.push(maze[j - 1][i]);
    }
    // left
    if (i > 0 && !maze[j][i - 1].visited) {
      neighbors.push(maze[j][i - 1]);
    }
    if (neighbors) {
      let r = floor(random(neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  show() {
    if (colorBtn.checked()) {
    if (this.visited) {
      stroke(255, 50, 100);
      fill(255, 50, 100);
      square(this.j * w, this.i * w, w);
    }
    if (this.visited && !stack.includes(this)) {
        stroke(100, 200, 100);
        fill(100, 200, 100);
        square(this.j * w, this.i * w, w);
    }
}
    if (this == current) {
      noStroke();
      fill(0, 0, 255);
      square(this.j * w, this.i * w, w);
    }
    stroke(0);
    strokeWeight(2);
    // top
    if (this.walls[0]) {
      line(this.j * w, this.i * w, this.j * w + w, this.i * w);
    }
    // right
    if (this.walls[1]) {
      line(this.j * w + w, this.i * w, this.j * w + w, this.i * w + w);
    }
    // bottom
    if (this.walls[2]) {
      line(this.j * w + w, this.i * w + w, this.j * w, this.i * w + w);
    }
    // left
    if (this.walls[3]) {
      line(this.j * w, this.i * w, this.j * w, this.i * w + w);
    }
  }
}
