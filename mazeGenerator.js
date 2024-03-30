function generateMaze() {
    let stack = [];
    let maze = new Array(DIM);
    let next;
  for (let i = 0; i < DIM; i++) {
    maze[i] = new Array(DIM);
    for (let j = 0; j < DIM; j++) {
        maze[i][j] = new Cell(i, j);
    }
  }
  let current = maze[0][0];
  stack.push(current);
  while (stack.length > 0) {
    current = stack.pop();
    next = current.checkNeighbors(maze);
    if (next) {
        stack.push(current);
        removeWalls(current, next);
        next.visited = true;
        stack.push(next);
    }
  }
  for (let i = 0; i < DIM; i++) {
    for(let j = 0; j < DIM; j++) {
      maze[i][j].visited = false;
    }
  }
  return maze;

}
